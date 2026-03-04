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
    <div className="border-border bg-card overflow-hidden rounded-xl border">
      {/* Browser chrome */}
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <div className="flex gap-1.5">
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
          <i className="bg-border block h-2.5 w-2.5 rounded-full not-italic" />
        </div>
        <span className="border-border bg-background text-muted-foreground rounded-md border px-3 py-1 font-mono text-[11px]">
          segue.dev/demo/{slug}
        </span>
        <button
          onClick={replay}
          className="border-border text-muted-foreground hover:border-accent hover:text-accent cursor-pointer rounded-md border bg-transparent px-2.5 py-1 font-mono text-[11px] transition-colors duration-150"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div className="bg-background relative h-80 overflow-hidden">
        {/* Page A — Home */}
        {screen === "a" && (
          <div className={`bg-background absolute inset-0 flex flex-col ${aClass}`}>
            {/* Mini nav */}
            <div className="border-border flex items-center justify-between border-b px-6 py-3">
              <span className="text-foreground font-serif text-sm font-bold">
                myapp
              </span>
              <div className="text-muted-foreground flex gap-4 font-mono text-[11px]">
                <span className="text-foreground">Home</span>
                <button
                  onClick={() => navigate("b")}
                  className="text-muted-foreground hover:text-foreground cursor-pointer border-none bg-transparent p-0 transition-colors"
                >
                  About
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
              <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                Home
              </span>
              <span className="text-foreground font-serif text-2xl font-extrabold">
                Welcome
              </span>
              <p className="text-muted-foreground max-w-[280px] text-center text-xs leading-relaxed">
                This is the home page. Click About to see the transition.
              </p>
              <button
                onClick={() => navigate("b")}
                className="bg-accent text-accent-foreground mt-2 cursor-pointer rounded-md border-none px-5 py-2 font-mono text-[12px] font-medium"
              >
                Go to About
              </button>
            </div>
          </div>
        )}

        {/* Page B — About */}
        {screen === "b" && (
          <div className={`bg-background absolute inset-0 flex flex-col ${bClass}`}>
            {/* Mini nav */}
            <div className="border-border flex items-center justify-between border-b px-6 py-3">
              <span className="text-foreground font-serif text-sm font-bold">
                myapp
              </span>
              <div className="text-muted-foreground flex gap-4 font-mono text-[11px]">
                <button
                  onClick={() => navigate("a")}
                  className="text-muted-foreground hover:text-foreground cursor-pointer border-none bg-transparent p-0 transition-colors"
                >
                  Home
                </button>
                <span className="text-foreground">About</span>
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
              <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                About
              </span>
              <span className="text-foreground font-serif text-2xl font-extrabold">
                Our Story
              </span>
              <p className="text-muted-foreground max-w-[280px] text-center text-xs leading-relaxed">
                This is the about page. The transition you saw is what your users will
                experience.
              </p>
              <button
                onClick={() => navigate("a")}
                className="bg-accent text-accent-foreground mt-2 cursor-pointer rounded-md border-none px-5 py-2 font-mono text-[12px] font-medium"
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
