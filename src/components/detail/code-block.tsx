"use client"

import { useState } from "react"

interface CodeBlockProps {
  filename: string
  code: string
}

function highlight(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /(import|from|export|default|function|return|const|let|var)/g,
      '<span class="kw">$1</span>'
    )
    .replace(/("([^"]*)")/g, '<span class="st">$1</span>')
    .replace(/(\/\/.+)/g, '<span class="cm">$1</span>')
    .replace(
      /(@keyframes|@import|animation:|transform:|opacity:|html\.)/g,
      '<span class="kw">$1</span>'
    )
}

export function CodeBlock({ filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="bg-card border-border overflow-hidden rounded-tr-lg rounded-b-lg border">
      <div className="border-border flex items-center justify-between border-b px-4 py-2.5">
        <span className="text-muted-foreground font-mono text-[11px]">{filename}</span>
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
        className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-[#c9d1d9]"
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </div>
  )
}
