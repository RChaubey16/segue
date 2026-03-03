"use client"

import { useState } from "react"

interface LiveDemoProps {
  slug: string
  animOutClass: string
  animInClass: string
}

export function LiveDemo({ slug, animOutClass, animInClass }: LiveDemoProps) {
  const [screen, setScreen] = useState<"a" | "b">("a")
  const [aClass, setAClass] = useState("")
  const [bClass, setBClass] = useState("")

  const navigate = (to: "a" | "b") => {
    if (to === "b") {
      setAClass(animOutClass)
      setTimeout(() => {
        setScreen("b")
        setBClass(animInClass)
        setAClass("")
      }, 0)
    } else {
      setBClass(animOutClass)
      setTimeout(() => {
        setScreen("a")
        setAClass(animInClass)
        setBClass("")
      }, 0)
    }
  }

  const replay = () => {
    setScreen("a")
    setAClass("")
    setBClass("")
    setTimeout(() => navigate("b"), 80)
  }

  return (
    <div className="bg-card border-border overflow-hidden rounded-xl border">
      {/* Toolbar */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <div className="flex gap-1.5">
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
        </div>
        <span className="text-muted-foreground bg-background border-border rounded-md border px-3 py-1 font-mono text-[11px]">
          segue.dev/demo/{slug}
        </span>
        <button
          onClick={replay}
          className="text-muted-foreground border-border hover:border-accent hover:text-accent cursor-pointer rounded-md border bg-transparent px-2.5 py-1 font-mono text-[11px] transition-colors duration-150"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div className="relative h-80 overflow-hidden">
        {screen === "a" && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#111] ${aClass}`}
          >
            <span className="text-muted-foreground font-mono text-[11px] tracking-wider">
              page one
            </span>
            <span className="font-serif text-[28px] font-extrabold">Home</span>
            <button
              onClick={() => navigate("b")}
              className="bg-accent text-background mt-2 cursor-pointer rounded-md border-none px-5 py-2 font-mono text-[12px] font-medium"
            >
              Navigate →
            </button>
          </div>
        )}
        {screen === "b" && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0f1e] ${bClass}`}
          >
            <span className="text-muted-foreground font-mono text-[11px] tracking-wider">
              page two
            </span>
            <span className="font-serif text-[28px] font-extrabold">About</span>
            <button
              onClick={() => navigate("a")}
              className="bg-accent text-background mt-2 cursor-pointer rounded-md border-none px-5 py-2 font-mono text-[12px] font-medium"
            >
              ← Go back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
