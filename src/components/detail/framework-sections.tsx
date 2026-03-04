"use client"

import { useState } from "react"
import { InstallSection } from "./install-section"
import { UsageSection } from "./usage-section"

type Framework = "nextjs" | "react"

interface FrameworkSectionsProps {
  slug: string
  manualFiles: { name: string; code: string }[]
  reactManualFiles?: { name: string; code: string }[]
  usageCode: string
  reactUsageCode?: string
}

export function FrameworkSections({
  slug,
  manualFiles,
  reactManualFiles,
  usageCode,
  reactUsageCode,
}: FrameworkSectionsProps) {
  const [framework, setFramework] = useState<Framework>("nextjs")

  return (
    <div>
      {/* Single framework selector */}
      <div className="animate-fade-up mb-8 flex gap-1.5 [animation-delay:140ms]">
        {(
          [
            ["nextjs", "Next.js"],
            ["react", "React"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFramework(key)}
            className={`cursor-pointer rounded-full border px-3 py-1 font-mono text-[11px] transition-colors duration-150 ${
              framework === key
                ? "bg-accent/10 text-accent border-accent/30"
                : "text-muted-foreground border-border hover:text-foreground bg-transparent"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Install */}
      <section className="animate-fade-up mb-14 [animation-delay:160ms]">
        <div className="section-label text-muted-foreground mb-4 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          Install
        </div>
        <InstallSection
          slug={slug}
          manualFiles={manualFiles}
          reactManualFiles={reactManualFiles}
          framework={framework}
        />
      </section>

      {/* Usage */}
      <section className="animate-fade-up mb-14 [animation-delay:200ms]">
        <div className="section-label text-muted-foreground mb-4 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          Usage
        </div>
        <UsageSection
          usageCode={usageCode}
          reactUsageCode={reactUsageCode}
          framework={framework}
        />
      </section>
    </div>
  )
}
