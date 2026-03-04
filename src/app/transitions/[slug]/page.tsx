import { DarkModeDemo } from "@/components/detail/dark-mode-demo"
import { FrameworkSections } from "@/components/detail/framework-sections"
import { LiveDemo } from "@/components/detail/live-demo"
import { SharedElementDemo } from "@/components/detail/shared-element-demo"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

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
    { slug: "dark-mode" },
    { slug: "shared-element" },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const transition = await getTransition(slug)
  if (!transition) return {}

  const title = transition.name
  const description = `${transition.description} — ${transition.duration}, ${transition.easing} easing.`

  return {
    title,
    description,
    openGraph: {
      title: `${transition.name} — Segue`,
      description,
      url: `/transitions/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${transition.name} — Segue`,
      description,
    },
  }
}

export default async function TransitionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const transition = await getTransition(slug)
  if (!transition) notFound()

  const category = String(transition.category + " Transition").toUpperCase()
  const words = transition.name.split(" ")
  const firstWords = words.slice(0, -1).join(" ")
  const lastWord = words[words.length - 1]

  return (
    <div className="mx-auto max-w-[860px] px-6 pt-12 pb-28">
      {/* Inject demo keyframe animations */}
      <style>{transition.demoAnimations}</style>

      {/* Breadcrumb */}
      <nav className="text-muted-foreground animate-fade-up mb-14 flex items-center gap-2 font-mono text-[12px]">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground no-underline transition-colors duration-150"
        >
          segue
        </Link>
        <span className="text-border">/</span>
        <Link
          href="/transitions"
          className="text-muted-foreground hover:text-foreground no-underline transition-colors duration-150"
        >
          transitions
        </Link>
        <span className="text-border">/</span>
        <span>{slug}</span>
      </nav>

      {/* Hero */}
      <div className="animate-fade-up mb-10 [animation-delay:50ms]">
        <div className="text-accent bg-accent/8 border-accent/20 mb-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium tracking-widest uppercase">
          <i className="bg-accent block h-1.5 w-1.5 rounded-full not-italic" />
          {category}
        </div>
        <h1 className="mb-5 font-serif text-[clamp(48px,8vw,80px)] leading-none font-extrabold tracking-[-0.03em]">
          {firstWords}
          {firstWords ? " " : ""}
          <em className="text-accent not-italic">{lastWord}</em>
        </h1>
        <p className="text-muted-foreground max-w-[520px] text-[17px] leading-relaxed">
          {transition.description}
        </p>
      </div>

      {/* Metadata pills */}
      <div className="animate-fade-up mb-14 flex flex-wrap gap-2.5 [animation-delay:100ms]">
        {[
          ["Duration", transition.duration],
          ["Easing", transition.easing],
          ["API", "View Transition"],
          ["Works with", "Next.js · React"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="text-muted-foreground bg-card border-border flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px]"
          >
            {label} <strong className="text-foreground font-medium">{value}</strong>
          </div>
        ))}
      </div>

      {/* Demo */}
      <section className="animate-fade-up mb-14 [animation-delay:120ms]">
        <div className="section-label text-muted-foreground mb-4 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          Demo
        </div>
        {transition.demoType === "dark-mode" ? (
          <DarkModeDemo />
        ) : transition.demoType === "shared-element" ? (
          <SharedElementDemo />
        ) : (
          <LiveDemo
            slug={slug}
            animOutClass={transition.animOutClass}
            animInClass={transition.animInClass}
          />
        )}
      </section>

      {/* Install + Usage (shared framework selector) */}
      <FrameworkSections
        slug={slug}
        manualFiles={transition.manualFiles}
        reactManualFiles={transition.reactManualFiles}
        usageCode={transition.usageCode}
        reactUsageCode={transition.reactUsageCode}
      />
    </div>
  )
}
