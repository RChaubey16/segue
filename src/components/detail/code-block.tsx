"use client"

import { useState } from "react"

interface CodeBlockProps {
  filename: string
  code: string
}

function highlight(code: string): string {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(import|from|export|default|function|return|const|let|var)/g, '<span class="kw">$1</span>')
    .replace(/("([^"]*)")/g, '<span class="st">$1</span>')
    .replace(/(\/\/.+)/g, '<span class="cm">$1</span>')
    .replace(/(@keyframes|@import|animation:|transform:|opacity:|html\.)/g, '<span class="kw">$1</span>')
}

export function CodeBlock({ filename, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="bg-surface border border-border rounded-tr-lg rounded-b-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
        <span className="font-mono text-[11px] text-muted">{filename}</span>
        <button
          onClick={copy}
          className={`font-mono text-[11px] px-2.5 py-0.5 rounded border cursor-pointer transition-colors duration-150
            ${copied
              ? "border-accent text-accent"
              : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>
      <pre
        className="p-5 overflow-x-auto font-mono text-[13px] leading-[1.7] text-[#c9d1d9]"
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </div>
  )
}
