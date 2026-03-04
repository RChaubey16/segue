"use client"

import { useRef, useState } from "react"

const items = [
  {
    slug: "luna",
    name: "Luna Chen",
    role: "Design Lead",
    emoji: "L",
    bg: "bg-accent/20",
  },
  {
    slug: "alex",
    name: "Alex Rivera",
    role: "Engineer",
    emoji: "A",
    bg: "bg-accent/30",
  },
  { slug: "sam", name: "Sam Patel", role: "PM", emoji: "S", bg: "bg-accent/15" },
  { slug: "jo", name: "Jo Kim", role: "Researcher", emoji: "J", bg: "bg-accent/25" },
]

export function SharedElementDemo() {
  const [screen, setScreen] = useState<"list" | "detail">("list")
  const [phase, setPhase] = useState<"idle" | "morphing" | "collapsing">("idle")
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [cardStyle, setCardStyle] = useState<React.CSSProperties>({})
  const listRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  const morph = (slug: string) => {
    if (phase !== "idle") return
    setActiveSlug(slug)

    const card = listRef.current?.querySelector(
      `[data-slug="${slug}"]`
    ) as HTMLElement | null
    const viewport = viewportRef.current

    if (card && viewport) {
      const cardRect = card.getBoundingClientRect()
      const viewportRect = viewport.getBoundingClientRect()

      // Starting position — match the card exactly
      setCardStyle({
        position: "absolute",
        top: cardRect.top - viewportRect.top,
        left: cardRect.left - viewportRect.left,
        width: cardRect.width,
        height: cardRect.height,
        borderRadius: "0.75rem",
        zIndex: 20,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      })

      setPhase("morphing")

      // Animate to the hero position
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCardStyle((prev) => ({
            ...prev,
            top: 37,
            left: 0,
            width: "100%",
            height: 96,
            borderRadius: 0,
          }))
        })
      })

      setTimeout(() => {
        setScreen("detail")
        setPhase("idle")
        setCardStyle({})
      }, 420)
    }
  }

  const collapse = () => {
    if (phase !== "idle") return
    setPhase("collapsing")
    setTimeout(() => {
      setScreen("list")
      setPhase("idle")
      setActiveSlug(null)
    }, 350)
  }

  const replay = () => {
    setScreen("list")
    setPhase("idle")
    setActiveSlug(null)
    setCardStyle({})
    setTimeout(() => morph("alex"), 80)
  }

  const active = items.find((i) => i.slug === activeSlug)

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
          segue.dev/demo/shared-element
        </span>
        <button
          onClick={replay}
          className="border-border text-muted-foreground hover:border-accent hover:text-accent cursor-pointer rounded-md border bg-transparent px-2.5 py-1 font-mono text-[11px] transition-colors duration-150"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="bg-background relative h-80 overflow-hidden">
        {/* List view */}
        {screen === "list" && (
          <div
            ref={listRef}
            className={`bg-background absolute inset-0 flex flex-col ${
              phase === "morphing" ? "se-grid-fade" : ""
            }`}
          >
            {/* Mini nav */}
            <div className="border-border flex items-center justify-between border-b px-6 py-3">
              <span className="text-foreground font-serif text-sm font-bold">
                myapp
              </span>
              <span className="text-foreground font-mono text-[11px]">Team</span>
            </div>

            {/* Card list */}
            <div className="flex flex-1 flex-col gap-2.5 overflow-auto p-4">
              {items.map((item) => (
                <button
                  key={item.slug}
                  data-slug={item.slug}
                  onClick={() => morph(item.slug)}
                  className="border-border bg-background hover:border-accent flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors"
                >
                  <div
                    className={`${item.bg} text-accent flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold`}
                  >
                    {item.emoji}
                  </div>
                  <div className="min-w-0">
                    <span className="text-foreground block truncate font-mono text-[12px] font-medium">
                      {item.name}
                    </span>
                    <span className="text-muted-foreground block truncate font-mono text-[10px]">
                      {item.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Flying card during morph */}
        {phase === "morphing" && active && (
          <div
            className={`${active.bg} flex items-center justify-center`}
            style={cardStyle}
          >
            <span className="text-accent font-mono text-lg font-bold">
              {active.emoji}
            </span>
          </div>
        )}

        {/* Detail view */}
        {screen === "detail" && (
          <div
            className={`bg-background absolute inset-0 flex flex-col ${
              phase === "collapsing" ? "se-detail-exit" : ""
            }`}
          >
            {/* Mini nav */}
            <div className="border-border flex items-center justify-between border-b px-6 py-3">
              <span className="text-foreground font-serif text-sm font-bold">
                myapp
              </span>
              <button
                onClick={collapse}
                className="text-muted-foreground hover:text-foreground cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] transition-colors"
              >
                ← Back
              </button>
            </div>

            {/* Hero — where the card landed */}
            <div className={`${active?.bg} flex h-24 items-center justify-center`}>
              <span className="text-accent font-mono text-2xl font-bold">
                {active?.emoji}
              </span>
            </div>

            {/* Detail content */}
            <div className="se-detail-enter flex flex-1 flex-col items-center justify-center gap-2 px-6">
              <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
                Profile
              </span>
              <span className="text-foreground font-serif text-lg font-bold">
                {active?.name}
              </span>
              <span className="text-muted-foreground font-mono text-[11px]">
                {active?.role}
              </span>
              <p className="text-muted-foreground mt-1 max-w-60 text-center text-xs leading-relaxed">
                The card morphed into this hero — the browser interpolated position,
                size, and shape automatically.
              </p>
              <button
                onClick={collapse}
                className="bg-accent text-accent-foreground mt-2 mb-2 cursor-pointer rounded-md border-none px-5 py-2 font-mono text-[12px] font-medium"
              >
                Back to Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
