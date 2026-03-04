"use client"

import { useCallback, useRef, useState } from "react"

interface LiveDemoProps {
  slug: string
  animOutClass: string
  animInClass: string
}

type Speed = 0.5 | 1 | 2
const speeds: Speed[] = [0.5, 1, 2]

export function LiveDemo({ slug, animOutClass, animInClass }: LiveDemoProps) {
  const [screen, setScreen] = useState<"a" | "b">("a")
  const [aClass, setAClass] = useState("")
  const [bClass, setBClass] = useState("")
  const [transitioning, setTransitioning] = useState(false)
  const [speed, setSpeed] = useState<Speed>(1)

  const viewportRef = useRef<HTMLDivElement>(null)
  const transitioningRef = useRef(false)

  const applyPlaybackRate = useCallback(
    (rate: number) => {
      if (!viewportRef.current) return
      const animations = viewportRef.current.getAnimations({ subtree: true })
      animations.forEach((a) => {
        a.playbackRate = rate
      })
    },
    []
  )

  const navigate = useCallback(
    (to: "a" | "b") => {
      if (transitioningRef.current) return
      transitioningRef.current = true
      setTransitioning(true)

      const isForward = to === "b"

      // Apply animation classes — outgoing gets exit, incoming gets enter
      if (isForward) {
        setAClass(animOutClass)
        setBClass(animInClass)
      } else {
        setBClass(animOutClass)
        setAClass(animInClass)
      }

      // Apply playback rate after animations start
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          applyPlaybackRate(speed)
        })
      })

      // Listen for incoming screen's animation to end
      const checkEnd = () => {
        if (!viewportRef.current) return
        const incomingScreen = viewportRef.current.querySelector(
          isForward ? "[data-screen='b']" : "[data-screen='a']"
        ) as HTMLElement | null
        if (!incomingScreen) return

        const onEnd = (e: AnimationEvent) => {
          // Only respond to our transition animation, not child animations
          if (e.target !== incomingScreen) return
          incomingScreen.removeEventListener("animationend", onEnd)
          setScreen(to)
          setAClass("")
          setBClass("")
          setTransitioning(false)
          transitioningRef.current = false
        }
        incomingScreen.addEventListener("animationend", onEnd)
      }

      requestAnimationFrame(checkEnd)
    },
    [animOutClass, animInClass, speed, applyPlaybackRate]
  )

  const replay = useCallback(() => {
    // Reset to screen A with no animations
    transitioningRef.current = false
    setTransitioning(false)
    setScreen("a")
    setAClass("")
    setBClass("")
    setTimeout(() => navigate("b"), 80 / speed)
  }, [navigate, speed])

  // Determine visibility and z-index for each screen
  const isAVisible = screen === "a" || transitioning
  const isBVisible = screen === "b" || transitioning
  const aZ = transitioning && screen === "a" ? "z-20" : screen === "a" ? "z-10" : "z-0"
  const bZ = transitioning && screen === "b" ? "z-20" : screen === "b" ? "z-10" : "z-0"

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
        <div className="flex items-center gap-2">
          {/* Speed controls */}
          <div className="flex overflow-hidden rounded-md">
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`cursor-pointer border px-2 py-1 font-mono text-[10px] transition-colors duration-150 ${
                  speed === s
                    ? "bg-accent/10 text-accent border-accent/30"
                    : "border-border text-muted-foreground hover:text-foreground bg-transparent"
                } ${s === 0.5 ? "rounded-l-md border-r-0" : s === 2 ? "rounded-r-md border-l-0" : ""}`}
              >
                {s}x
              </button>
            ))}
          </div>
          {/* Replay */}
          <button
            onClick={replay}
            aria-label="Replay transition"
            className="border-border text-muted-foreground hover:border-accent hover:text-accent cursor-pointer rounded-md border bg-transparent px-2.5 py-1 font-mono text-[11px] transition-colors duration-150"
          >
            ↺ replay
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="bg-background relative h-80 overflow-hidden">
        {/* Page A — Home */}
        <div
          data-screen="a"
          className={`bg-background absolute inset-0 flex flex-col ${aZ} ${aClass} ${
            isAVisible ? "" : "invisible"
          }`}
        >
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
            <p className="text-muted-foreground max-w-70 text-center text-xs leading-relaxed">
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

        {/* Page B — About */}
        <div
          data-screen="b"
          className={`bg-background absolute inset-0 flex flex-col ${bZ} ${bClass} ${
            isBVisible ? "" : "invisible"
          }`}
        >
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
            <p className="text-muted-foreground max-w-70 text-center text-xs leading-relaxed">
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
      </div>
    </div>
  )
}
