import type { TransitionMeta } from "@/lib/registry"
import Link from "next/link"

export function TransitionCard({ transition }: { transition: TransitionMeta }) {
  return (
    <Link
      href={`/transitions/${transition.slug}`}
      className="group border-border bg-card hover:border-accent block rounded-xl border p-6 no-underline transition-colors"
    >
      <h3 className="text-foreground font-serif text-xl font-bold">
        {transition.name}
      </h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {transition.description}
      </p>
      <div className="mt-4 flex gap-2">
        <span className="border-border bg-background text-muted-foreground rounded-full border px-2.5 py-1 font-mono text-[11px]">
          {transition.duration}
        </span>
        <span className="border-border bg-background text-muted-foreground rounded-full border px-2.5 py-1 font-mono text-[11px]">
          {transition.easing}
        </span>
      </div>
    </Link>
  )
}
