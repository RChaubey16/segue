import { TransitionCard } from "@/components/transition-card"
import { getTransitions } from "@/lib/registry"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Transitions",
  description:
    "Browse all available Segue transitions — drop-in page transitions for Next.js powered by the View Transition API.",
  openGraph: {
    title: "Transitions — Segue",
    description:
      "Browse all available Segue transitions — drop-in page transitions for Next.js powered by the View Transition API.",
    url: "/transitions",
  },
}

export default async function TransitionsPage() {
  const transitions = await getTransitions()

  return (
    <div className="mx-auto max-w-[860px] px-6 pt-12 pb-28">
      {/* Breadcrumb */}
      <nav className="animate-fade-up text-muted-foreground mb-14 flex items-center gap-2 font-mono text-[12px]">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground no-underline transition-colors duration-150"
        >
          segue
        </Link>
        <span className="text-border">/</span>
        <span>transitions</span>
      </nav>

      {/* Heading */}
      <div className="animate-fade-up mb-10 [animation-delay:50ms]">
        <h1 className="font-serif text-[clamp(36px,6vw,56px)] leading-none font-extrabold tracking-[-0.03em]">
          Transitions
        </h1>
        <p className="text-muted-foreground mt-4 max-w-[520px] text-[17px] leading-relaxed">
          Drop-in page transitions for Next.js powered by the View Transition API.
        </p>
      </div>

      {/* Grid */}
      <div className="animate-fade-up grid gap-4 [animation-delay:100ms] sm:grid-cols-2">
        {transitions.map((t) => (
          <TransitionCard key={t.slug} transition={t} />
        ))}
      </div>
    </div>
  )
}
