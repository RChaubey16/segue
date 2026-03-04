"use client"

import { useRef, useState } from "react"

const items = [
  { slug: "luna", name: "Luna Chen", role: "Design Lead", emoji: "L", bg: "bg-accent/20" },
  { slug: "alex", name: "Alex Rivera", role: "Engineer", emoji: "A", bg: "bg-accent/30" },
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
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Browser chrome */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
          <i className="block h-2.5 w-2.5 rounded-full bg-border not-italic" />
        </div>
        <span className="rounded-md border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
          segue.dev/demo/shared-element
        </span>
        <button
          onClick={replay}
          className="cursor-pointer rounded-md border border-border bg-transparent px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors duration-150 hover:border-accent hover:text-accent"
        >
          ↺ replay
        </button>
      </div>

      {/* Viewport */}
      <div ref={viewportRef} className="relative h-80 overflow-hidden bg-background">
        {/* List view */}
        {screen === "list" && (
          <div
            ref={listRef}
            className={`absolute inset-0 flex flex-col bg-background ${
              phase === "morphing" ? "se-grid-fade" : ""
            }`}
          >
            {/* Mini nav */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <span className="font-serif text-sm font-bold text-foreground">
                myapp
              </span>
              <span className="font-mono text-[11px] text-foreground">
                Team
              </span>
            </div>

            {/* Card list */}
            <div className="flex flex-1 flex-col gap-2.5 overflow-auto p-4">
              {items.map((item) => (
                <button
                  key={item.slug}
                  data-slug={item.slug}
                  onClick={() => morph(item.slug)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-accent"
                >
                  <div
                    className={`${item.bg} flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-accent`}
                  >
                    {item.emoji}
                  </div>
                  <div className="min-w-0">
                    <span className="block truncate font-mono text-[12px] font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="block truncate font-mono text-[10px] text-muted-foreground">
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
            <span className="font-mono text-lg font-bold text-accent">
              {active.emoji}
            </span>
          </div>
        )}

        {/* Detail view */}
        {screen === "detail" && (
          <div
            className={`absolute inset-0 flex flex-col bg-background ${
              phase === "collapsing" ? "se-detail-exit" : ""
            }`}
          >
            {/* Mini nav */}
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <span className="font-serif text-sm font-bold text-foreground">
                myapp
              </span>
              <button
                onClick={collapse}
                className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back
              </button>
            </div>

            {/* Hero — where the card landed */}
            <div
              className={`${active?.bg} flex h-24 items-center justify-center`}
            >
              <span className="font-mono text-2xl font-bold text-accent">
                {active?.emoji}
              </span>
            </div>

            {/* Detail content */}
            <div className="se-detail-enter flex flex-1 flex-col items-center justify-center gap-2 px-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Profile
              </span>
              <span className="font-serif text-lg font-bold text-foreground">
                {active?.name}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {active?.role}
              </span>
              <p className="mt-1 max-w-60 text-center text-xs leading-relaxed text-muted-foreground">
                The card morphed into this hero — the browser interpolated
                position, size, and shape automatically.
              </p>
              <button
                onClick={collapse}
                className="mt-2 mb-2 cursor-pointer rounded-md border-none bg-accent px-5 py-2 font-mono text-[12px] font-medium text-accent-foreground"
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
