"use client"

import { useState } from "react"

type Framework = "nextjs" | "react"

export function QuickStart() {
  const [framework, setFramework] = useState<Framework>("nextjs")

  return (
    <div>
      {/* Framework selector */}
      <div className="mb-3 flex gap-1.5">
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

      <div className="border-border bg-card overflow-hidden rounded-xl border">
        <div className="border-border border-b px-4 py-2.5">
          <span className="text-muted-foreground font-mono text-[11px]">terminal</span>
        </div>
        <pre className="text-foreground p-5 font-mono text-[13px] leading-[1.7]">
          npx segue add slide-right
        </pre>
      </div>
      <p className="text-muted-foreground mt-3 text-[13px]">
        Then use it in any page or layout:
      </p>
      <div className="border-border bg-card mt-3 overflow-hidden rounded-xl border">
        <div className="border-border border-b px-4 py-2.5">
          <span className="text-muted-foreground font-mono text-[11px]">
            {framework === "react" ? "App.tsx" : "app/page.tsx"}
          </span>
        </div>
        {framework === "nextjs" ? (
          <pre className="text-foreground overflow-x-auto p-5 font-mono text-[13px] leading-[1.7]">
            <span className="hl-kw">import</span> {"{"} SlideRightLink {"}"}{" "}
            <span className="hl-kw">from</span>{" "}
            <span className="hl-st">{'"@/transitions/slide-right"'}</span>
            {"\n\n"}
            <span className="hl-kw">export default</span>{" "}
            <span className="hl-kw">function</span> Page() {"{"}
            {"\n"}
            {"  "}
            <span className="hl-kw">return</span> ({"\n"}
            {"    "}&lt;SlideRightLink href=
            <span className="hl-st">{'"/about"'}</span>&gt;
            {"\n"}
            {"      "}Go to About{"\n"}
            {"    "}&lt;/SlideRightLink&gt;{"\n"}
            {"  "}){"\n"}
            {"}"}
          </pre>
        ) : (
          <pre className="text-foreground overflow-x-auto p-5 font-mono text-[13px] leading-[1.7]">
            <span className="hl-kw">import</span> {"{"} SlideRightLink {"}"}{" "}
            <span className="hl-kw">from</span>{" "}
            <span className="hl-st">{'"./transitions/slide-right"'}</span>
            {"\n\n"}
            <span className="hl-kw">function</span> App() {"{"}
            {"\n"}
            {"  "}
            <span className="hl-kw">return</span> ({"\n"}
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
