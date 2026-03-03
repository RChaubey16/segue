"use client"

import { useState } from "react"
import { CodeBlock } from "./code-block"

interface InstallSectionProps {
  slug: string
  manualFiles: { name: string; code: string }[]
}

export function InstallSection({ slug, manualFiles }: InstallSectionProps) {
  const [tab, setTab] = useState<"npx" | "manual">("npx")
  const [copied, setCopied] = useState(false)

  const npxCommand = `npx shft add ${slug}`

  const copy = () => {
    navigator.clipboard.writeText(npxCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0.5">
        {(["npx", "manual"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-mono text-[12px] px-4 py-1.5 rounded-t-md border border-b-0 cursor-pointer transition-colors duration-150
              ${tab === t
                ? "bg-surface text-text border-border"
                : "bg-transparent text-muted border-border hover:text-text"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* npx tab */}
      {tab === "npx" && (
        <div className="bg-surface border border-border rounded-tr-lg rounded-b-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
            <span className="font-mono text-[11px] text-muted">terminal</span>
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
          <pre className="p-5 font-mono text-[13px] leading-[1.7] text-[#c9d1d9]">{npxCommand}</pre>
        </div>
      )}

      {/* manual tab */}
      {tab === "manual" && (
        <div className="flex flex-col gap-3">
          {manualFiles.map((f) => (
            <CodeBlock key={f.name} filename={f.name} code={f.code} />
          ))}
        </div>
      )}
    </div>
  )
}
