"use client"

import { useState } from "react"

type Framework = "nextjs" | "react"

export function QuickStart() {
  const [framework, setFramework] = useState<Framework>("nextjs")

  return (
    <div>
      {/* Framework selector */}
      <div className="mb-3 flex gap-1.5">
        {([["nextjs", "Next.js"], ["react", "React"]] as const).map(([key, label]) => (
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

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-2.5">
          <span className="font-mono text-[11px] text-muted-foreground">
            terminal
          </span>
        </div>
        <pre className="p-5 font-mono text-[13px] leading-[1.7] text-foreground">
          npx segue add slide-right
        </pre>
      </div>
      <p className="mt-3 text-[13px] text-muted-foreground">
        Then use it in any page or layout:
      </p>
      <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-2.5">
          <span className="font-mono text-[11px] text-muted-foreground">
            {framework === "react" ? "App.tsx" : "app/page.tsx"}
          </span>
        </div>
        {framework === "nextjs" ? (
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-foreground">
            <span className="hl-kw">import</span> {"{"} SlideRightLink {"}"}{" "}
            <span className="hl-kw">from</span>{" "}
            <span className="hl-st">{'"@/transitions/slide-right"'}</span>
            {"\n\n"}
            <span className="hl-kw">export default</span>{" "}
            <span className="hl-kw">function</span> Page() {"{"}
            {"\n"}
            {"  "}
            <span className="hl-kw">return</span> (
            {"\n"}
            {"    "}&lt;SlideRightLink href=
            <span className="hl-st">{'"/about"'}</span>&gt;
            {"\n"}
            {"      "}Go to About{"\n"}
            {"    "}&lt;/SlideRightLink&gt;{"\n"}
            {"  "}){"\n"}
            {"}"}
          </pre>
        ) : (
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-foreground">
            <span className="hl-kw">import</span> {"{"} SlideRightLink {"}"}{" "}
            <span className="hl-kw">from</span>{" "}
            <span className="hl-st">{'"./transitions/slide-right"'}</span>
            {"\n\n"}
            <span className="hl-kw">function</span> App() {"{"}
            {"\n"}
            {"  "}
            <span className="hl-kw">return</span> (
            {"\n"}
            {"    "}&lt;SlideRightLink to=
            <span className="hl-st">{'"/about"'}</span>&gt;
            {"\n"}
            {"      "}Go to About{"\n"}
            {"    "}&lt;/SlideRightLink&gt;{"\n"}
            {"  "}){"\n"}
            {"}"}
          </pre>
        )}
      </div>
    </div>
  )
}
