"use client"

import { CodeBlock } from "./code-block"

interface UsageSectionProps {
  usageCode: string
  reactUsageCode?: string
  framework: "nextjs" | "react"
}

export function UsageSection({ usageCode, reactUsageCode, framework }: UsageSectionProps) {
  const code = framework === "react" && reactUsageCode ? reactUsageCode : usageCode
  const filename = framework === "react" ? "App.tsx" : "app/page.tsx"

  return <CodeBlock filename={filename} code={code} />
}
