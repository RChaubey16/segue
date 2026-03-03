import Link from "next/link"
import { getTransitions } from "@/lib/registry"
import { TransitionCard } from "@/components/transition-card"

export default async function TransitionsPage() {
  const transitions = await getTransitions()

  return (
    <div className="mx-auto max-w-[860px] px-6 pt-12 pb-28">
      {/* Breadcrumb */}
      <nav className="mb-14 flex animate-fade-up items-center gap-2 font-mono text-[12px] text-muted-foreground">
        <Link
          href="/"
          className="text-muted-foreground no-underline transition-colors duration-150 hover:text-foreground"
        >
          segue
        </Link>
        <span className="text-border">/</span>
        <span>transitions</span>
      </nav>

      {/* Heading */}
      <div className="mb-10 animate-fade-up [animation-delay:50ms]">
        <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-extrabold leading-none tracking-[-0.03em]">
          Transitions
        </h1>
        <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-muted-foreground">
          Drop-in page transitions for Next.js powered by the View Transition
          API.
        </p>
      </div>

      {/* Grid */}
      <div className="grid animate-fade-up gap-4 [animation-delay:100ms] sm:grid-cols-2">
        {transitions.map((t) => (
          <TransitionCard key={t.slug} transition={t} />
        ))}
      </div>
    </div>
  )
}
