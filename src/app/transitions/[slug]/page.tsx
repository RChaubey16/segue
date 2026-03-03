import { notFound } from "next/navigation"
import Link from "next/link"
import { LiveDemo } from "@/components/detail/live-demo"
import { InstallSection } from "@/components/detail/install-section"
import { CodeBlock } from "@/components/detail/code-block"

async function getTransition(slug: string) {
  try {
    const data = await import(`@/registry/${slug}.json`)
    return data.default
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  return [
    { slug: "slide-up" },
    { slug: "slide-down" },
    { slug: "slide-left" },
    { slug: "slide-right" },
    { slug: "scale" },
  ]
}

export default async function TransitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const transition = await getTransition(slug)
  if (!transition) notFound()

  const words = transition.name.split(" ")
  const firstWords = words.slice(0, -1).join(" ")
  const lastWord = words[words.length - 1]

  return (
    <div className="max-w-[860px] mx-auto px-6 pt-12 pb-28">

      {/* Inject demo keyframe animations */}
      <style>{transition.demoAnimations}</style>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground mb-14 animate-fade-up">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline">segue</Link>
        <span className="text-border">/</span>
        <Link href="/transitions" className="text-muted-foreground hover:text-foreground transition-colors duration-150 no-underline">transitions</Link>
        <span className="text-border">/</span>
        <span>{slug}</span>
      </nav>

      {/* Hero */}
      <div className="mb-10 animate-fade-up [animation-delay:50ms]">
        <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-accent bg-accent/8 border border-accent/20 px-2.5 py-1 rounded-full mb-5 tracking-widest uppercase">
          <i className="block w-1.5 h-1.5 rounded-full bg-accent not-italic" />
          Page Transition
        </div>
        <h1 className="font-serif text-[clamp(48px,8vw,80px)] font-extrabold leading-none tracking-[-0.03em] mb-5">
          {firstWords}{firstWords ? " " : ""}
          <em className="not-italic text-accent">{lastWord}</em>
        </h1>
        <p className="text-[17px] text-muted-foreground leading-relaxed max-w-[520px]">
          {transition.description}
        </p>
      </div>

      {/* Metadata pills */}
      <div className="flex gap-2.5 flex-wrap mb-14 animate-fade-up [animation-delay:100ms]">
        {[
          ["Duration",   transition.duration],
          ["Easing",     transition.easing],
          ["API",        "View Transition"],
          ["Works with", "Next.js · React"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground bg-card border border-border px-3.5 py-1.5 rounded-full">
            {label} <strong className="text-foreground font-medium">{value}</strong>
          </div>
        ))}
      </div>

      {/* Demo */}
      <section className="mb-14 animate-fade-up [animation-delay:120ms]">
        <div className="section-label flex items-center gap-2.5 font-mono text-[11px] font-medium text-muted-foreground tracking-[0.12em] uppercase mb-4">
          Demo
        </div>
        <LiveDemo slug={slug} animOutClass={transition.animOutClass} animInClass={transition.animInClass} />
      </section>

      {/* Install */}
      <section className="mb-14 animate-fade-up [animation-delay:160ms]">
        <div className="section-label flex items-center gap-2.5 font-mono text-[11px] font-medium text-muted-foreground tracking-[0.12em] uppercase mb-4">
          Install
        </div>
        <InstallSection slug={slug} manualFiles={transition.manualFiles} />
      </section>

      {/* Usage */}
      <section className="mb-14 animate-fade-up [animation-delay:200ms]">
        <div className="section-label flex items-center gap-2.5 font-mono text-[11px] font-medium text-muted-foreground tracking-[0.12em] uppercase mb-4">
          Usage
        </div>
        <CodeBlock filename="app/page.tsx" code={transition.usageCode} />
      </section>

    </div>
  )
}
