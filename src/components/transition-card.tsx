import Link from "next/link"
import type { TransitionMeta } from "@/lib/registry"

export function TransitionCard({ transition }: { transition: TransitionMeta }) {
  return (
    <Link
      href={`/transitions/${transition.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 no-underline transition-colors hover:border-accent"
    >
      <h3 className="font-serif text-xl font-bold text-foreground">
        {transition.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {transition.description}
      </p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          {transition.duration}
        </span>
        <span className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          {transition.easing}
        </span>
      </div>
    </Link>
  )
}
