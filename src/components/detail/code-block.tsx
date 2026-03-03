"use client"

import { useState } from "react"

interface CodeBlockProps {
  filename: string
  code: string
}

function highlight(code: string): string {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Tokenize into parts that should NOT be highlighted (strings, comments)
  // and parts that should have keyword highlighting applied.
  // Process strings and comments first so keywords inside them are left alone.
  const tokens: { text: string; type: "raw" | "string" | "comment" | "keyword" }[] = []
  // Match double-quoted strings and single-line comments
  const re = /("(?:[^"\\]|\\.)*")|(\/\/.+)/g
  let last = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(escaped)) !== null) {
    if (match.index > last) {
      tokens.push({ text: escaped.slice(last, match.index), type: "raw" })
    }
    if (match[1]) {
      tokens.push({ text: match[1], type: "string" })
    } else if (match[2]) {
      tokens.push({ text: match[2], type: "comment" })
    }
    last = re.lastIndex
  }
  if (last < escaped.length) {
    tokens.push({ text: escaped.slice(last), type: "raw" })
  }

  // Apply keyword highlighting only to raw tokens
  return tokens
    .map((t) => {
      if (t.type === "string") return `<span class="hl-st">${t.text}</span>`
      if (t.type === "comment") return `<span class="hl-cm">${t.text}</span>`
      // Highlight keywords in raw code
      return t.text
        .replace(
          /\b(import|from|export|default|function|return|const|let|var)\b/g,
          '<span class="hl-kw">$1</span>',
        )
        .replace(
          /(@keyframes|@import|animation:|transform:|opacity:|html\.)/g,
          '<span class="hl-kw">$1</span>',
        )
    })
    .join("")
}

export function CodeBlock({ filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="overflow-hidden rounded-tr-lg rounded-b-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">{filename}</span>
        <button
          onClick={copy}
          className={`cursor-pointer rounded border px-2.5 py-0.5 font-mono text-[11px] transition-colors duration-150 ${
            copied
              ? "border-accent text-accent"
              : "border-border text-muted-foreground hover:border-accent hover:text-accent"
          }`}
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-foreground"
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </div>
  )
}
