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
      setTimeout(() => { setScreen("b"); setBClass(animInClass); setAClass("") }, 0)
    } else {
      setBClass(animOutClass)
      setTimeout(() => { setScreen("a"); setAClass(animInClass); setBClass("") }, 0)
    }
  }

  const replay = () => {
    setScreen("a"); setAClass(""); setBClass("")
    setTimeout(() => navigate("b"), 80)
  }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex gap-1.5">
          <i className="block w-2.5 h-2.5 rounded-full bg-border not-italic" />
          <i className="block w-2.5 h-2.5 rounded-full bg-border not-italic" />
          <i className="block w-2.5 h-2.5 rounded-full bg-border not-italic" />
        </div>
        <span className="font-mono text-[11px] text-muted bg-bg border border-border px-3 py-1 rounded-md">
          shft.dev/demo/{slug}
        </span>
        <button
          onClick={replay}
          className="font-mono text-[11px] text-muted border border-border px-2.5 py-1 rounded-md cursor-pointer transition-colors duration-150 hover:border-accent hover:text-accent bg-transparent"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div className="relative h-80 overflow-hidden">
        {screen === "a" && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#111] ${aClass}`}>
            <span className="font-mono text-[11px] text-muted tracking-wider">page one</span>
            <span className="font-display text-[28px] font-extrabold">Home</span>
            <button
              onClick={() => navigate("b")}
              className="mt-2 font-mono text-[12px] bg-accent text-bg font-medium px-5 py-2 rounded-md border-none cursor-pointer"
            >
              Navigate →
            </button>
          </div>
        )}
        {screen === "b" && (
          <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0f1e] ${bClass}`}>
            <span className="font-mono text-[11px] text-muted tracking-wider">page two</span>
            <span className="font-display text-[28px] font-extrabold">About</span>
            <button
              onClick={() => navigate("a")}
              className="mt-2 font-mono text-[12px] bg-accent text-bg font-medium px-5 py-2 rounded-md border-none cursor-pointer"
            >
              ← Go back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
