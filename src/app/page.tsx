import { QuickStart } from "@/components/quick-start"
import { TransitionCard } from "@/components/transition-card"
import { getTransitions } from "@/lib/registry"

export default async function Home() {
  const transitions = await getTransitions()

  return (
    <div className="mx-auto max-w-[860px] px-6 pt-12 pb-28">
      {/* Hero */}
      <div className="animate-fade-up mb-16">
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/8 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-accent">
          <i className="block h-1.5 w-1.5 rounded-full bg-accent not-italic" />
          Open Source
        </div>
        <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-extrabold leading-none tracking-[-0.03em]">
          Segue
        </h1>
        <p className="mt-3 text-[clamp(20px,3vw,28px)] font-medium leading-snug text-muted-foreground">
          Page transitions,{" "}
          <span className="text-accent">ready to drop in.</span>
        </p>
        <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-muted-foreground">
          Segue is a collection of animated page transitions for Next.js and React, built
          on the native{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            View Transition API
          </a>
          . No animation libraries. No layout thrashing. Just CSS.
        </p>
      </div>

      {/* Why Segue exists */}
      <div className="animate-fade-up mb-16 [animation-delay:80ms]">
        <div className="section-label mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Why Segue exists
        </div>
        <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            The{" "}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
            >
              View Transition API
            </a>{" "}
            ships in every major browser. It&apos;s the platform-native way to animate between
            pages — no JavaScript animation runtime, no layout recalculations, no jank. But wiring
            it into a React or Next.js app still means writing boilerplate:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px]">
              startViewTransition
            </code>{" "}
            calls, CSS pseudo-element rules, router integration, and cleanup logic.
          </p>
          <p>
            Animation libraries like Framer Motion and GSAP are powerful, but they solve a broader
            problem. Pulling in a full animation runtime just for page transitions adds bundle
            weight and API surface you don&apos;t need.
          </p>
          <p>
            Segue sits in the gap.{" "}
            <span className="text-foreground font-medium">
              Pre-built transitions that use the native API, installed as source code you own.
            </span>{" "}
            One command adds a component and a CSS file to your project — no dependency, no lock-in.
            Think{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
            >
              shadcn/ui
            </a>
            , but for page transitions.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="animate-fade-up mb-16 [animation-delay:120ms]">
        <div className="section-label mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          How it works
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick a transition",
              desc: "Browse the collection and find the motion that fits your app.",
            },
            {
              step: "02",
              title: "Install it",
              desc: "One npx command copies the component and CSS into your project.",
            },
            {
              step: "03",
              title: "Wrap your links",
              desc: "Replace your Link with the transition component. Done.",
            },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-border bg-card p-5">
              <span className="font-mono text-[11px] text-accent">
                {item.step}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <div className="animate-fade-up mb-16 [animation-delay:160ms]">
        <div className="section-label mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Quick start
        </div>
        <QuickStart />
      </div>

      {/* Transitions */}
      <div className="animate-fade-up [animation-delay:200ms]">
        <div className="section-label mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
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
