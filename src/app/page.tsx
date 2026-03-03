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
          Segue is a collection of animated page transitions for Next.js, built
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

      {/* How it works */}
      <div className="animate-fade-up mb-16 [animation-delay:80ms]">
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
              desc: "Replace your Next.js Link with the transition component. Done.",
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
      <div className="animate-fade-up mb-16 [animation-delay:120ms]">
        <div className="section-label mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Quick start
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted-foreground">
              terminal
            </span>
          </div>
          <pre className="p-5 font-mono text-[13px] leading-[1.7] text-foreground">
            npx segue add slide-right
          </pre>
        </div>
        <p className="mt-3 text-[13px] text-muted-foreground">
          Then use it in any page or layout:
        </p>
        <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted-foreground">
              app/page.tsx
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-foreground">
            <span className="hl-kw">import</span> {"{"} SlideRightLink {"}"}{" "}
            <span className="hl-kw">from</span>{" "}
            <span className="hl-st">{'"@/transitions/slide-right"'}</span>
            {"\n\n"}
            <span className="hl-kw">export default</span>{" "}
            <span className="hl-kw">function</span> Page() {"{"}
            {"\n"}
            {"  "}
            <span className="hl-kw">return</span> (
            {"\n"}
            {"    "}&lt;SlideRightLink href=
            <span className="hl-st">{'"/ about"'}</span>&gt;
            {"\n"}
            {"      "}Go to About{"\n"}
            {"    "}&lt;/SlideRightLink&gt;{"\n"}
            {"  "}){"\n"}
            {"}"}
          </pre>
        </div>
      </div>

      {/* Transitions */}
      <div className="animate-fade-up [animation-delay:160ms]">
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
