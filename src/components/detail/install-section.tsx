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

  const npxCommand = `npx segue add ${slug}`

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
            className={`cursor-pointer rounded-t-md border border-b-0 px-4 py-1.5 font-mono text-[12px] transition-colors duration-150 ${
              tab === t
                ? "bg-card text-foreground border-border"
                : "text-muted-foreground border-border hover:text-foreground bg-transparent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* npx tab */}
      {tab === "npx" && (
        <div className="bg-card border-border overflow-hidden rounded-tr-lg rounded-b-lg border">
          <div className="border-border flex items-center justify-between border-b px-4 py-2.5">
            <span className="text-muted-foreground font-mono text-[11px]">
              terminal
            </span>
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
          <pre className="p-5 font-mono text-[13px] leading-[1.7] text-[#c9d1d9]">
            {npxCommand}
          </pre>
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
