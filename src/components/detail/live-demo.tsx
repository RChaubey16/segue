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
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
        </div>
        <span className="rounded-md border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
          segue.dev/demo/{slug}
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-md border border-border bg-transparent px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div className="relative h-80 overflow-hidden bg-background">
        {/* Page A — Home */}
        {screen === "a" && (
          <div
            className={`absolute inset-0 flex flex-col bg-background ${aClass}`}
          >
            {/* Mini nav */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <span className="font-serif text-sm font-bold text-foreground">
                myapp
              </span>
              <div className="flex gap-4 font-mono text-[11px] text-muted-foreground">
                <span className="text-foreground">Home</span>
                <button
                  onClick={() => navigate("b")}
                  className="cursor-pointer border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Home
              </span>
              <span className="font-serif text-2xl font-extrabold text-foreground">
                Welcome
              </span>
              <p className="max-w-[280px] text-center text-xs leading-relaxed text-muted-foreground">
                This is the home page. Click About to see the transition.
              </p>
              <button
                onClick={() => navigate("b")}
                className="mt-2 cursor-pointer rounded-md border-none bg-accent px-5 py-2 font-mono text-[12px] font-medium text-accent-foreground"
              >
                Go to About
              </button>
            </div>
          </div>
        )}

        {/* Page B — About */}
        {screen === "b" && (
          <div
            className={`absolute inset-0 flex flex-col bg-background ${bClass}`}
          >
            {/* Mini nav */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <span className="font-serif text-sm font-bold text-foreground">
                myapp
              </span>
              <div className="flex gap-4 font-mono text-[11px] text-muted-foreground">
                <button
                  onClick={() => navigate("a")}
                  className="cursor-pointer border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </button>
                <span className="text-foreground">About</span>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                About
              </span>
              <span className="font-serif text-2xl font-extrabold text-foreground">
                Our Story
              </span>
              <p className="max-w-[280px] text-center text-xs leading-relaxed text-muted-foreground">
                This is the about page. The transition you saw is what your
                users will experience.
              </p>
              <button
                onClick={() => navigate("a")}
                className="mt-2 cursor-pointer rounded-md border-none bg-accent px-5 py-2 font-mono text-[12px] font-medium text-accent-foreground"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
