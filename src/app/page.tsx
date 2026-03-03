import { TransitionCard } from "@/components/transition-card"
import { getTransitions } from "@/lib/registry"

export default async function Home() {
  const transitions = await getTransitions()

  return (
    <div className="mx-auto max-w-[860px] px-6 pt-12 pb-28">
      {/* Hero */}
      <div className="animate-fade-up mb-10">
        <h1 className="font-serif text-[clamp(36px,6vw,56px)] leading-none font-extrabold tracking-[-0.03em]">
          Segue
        </h1>
        <p className="text-muted-foreground mt-4 max-w-[520px] text-[17px] leading-relaxed">
          Drop-in page transitions for Next.js powered by the View Transition API.
        </p>
      </div>

      {/* Transitions section */}
      <div className="animate-fade-up [animation-delay:50ms]">
        <div className="section-label text-muted-foreground mb-4 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          Transitions
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {transitions.map((t) => (
            <TransitionCard key={t.slug} transition={t} />
          ))}
        </div>
      </div>
    </div>
  )
}
