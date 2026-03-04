import { QuickStart } from "@/components/quick-start"
import { CircleCheck, CircleX } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const browsers = [
  { name: "Chrome", icon: "/icons/browsers/chrome.svg", supported: true },
  { name: "Edge", icon: "/icons/browsers/edge.svg", supported: true },
  { name: "Safari", icon: "/icons/browsers/safari.svg", supported: true },
  { name: "Firefox", icon: "/icons/browsers/firefox.svg", supported: true },
  { name: "Opera", icon: "/icons/browsers/opera.svg", supported: true },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-[860px] px-6 pt-12 pb-28">
      {/* Hero */}
      <div className="animate-fade-up mb-16">
        <div className="border-accent/20 bg-accent/8 text-accent mb-5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium tracking-widest uppercase">
          <i className="bg-accent block h-1.5 w-1.5 rounded-full not-italic" />
          Open Source
        </div>
        <h1 className="font-serif text-[clamp(36px,6vw,56px)] leading-none font-extrabold tracking-[-0.03em]">
          Segue
        </h1>
        <p className="text-muted-foreground mt-3 text-[clamp(20px,3vw,28px)] leading-snug font-medium">
          Page transitions, <span className="text-accent">ready to drop in.</span>
        </p>
        <p className="text-muted-foreground mt-5 max-w-[520px] text-[17px] leading-relaxed">
          Segue is a collection of animated page transitions for Next.js and React,
          built on the native{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground decoration-border hover:decoration-accent underline underline-offset-4 transition-colors"
          >
            View Transition API
          </a>
          . No animation libraries. No layout thrashing. Just CSS.
        </p>
      </div>

      {/* Why Segue exists */}
      <div className="animate-fade-up mb-16 [animation-delay:80ms]">
        <div className="section-label text-muted-foreground mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          Why Segue exists
        </div>

        <div className="text-muted-foreground space-y-4 text-[15px] leading-relaxed">
          <p>
            Modern browsers now support the{" "}
            <Link
              href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground decoration-border hover:decoration-accent underline underline-offset-4 transition-colors"
            >
              View Transition API
            </Link>{" "}
            — a native way to animate between pages without JavaScript animation
            runtimes or layout hacks. It makes navigation feel continuous instead of
            abrupt, bringing native-app polish to the web.
          </p>

          <p>
            But using it in real React or Next.js apps still means wiring together
            boilerplate:{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[13px]">
              startViewTransition
            </code>{" "}
            calls, CSS pseudo-element rules, router integration, and cleanup logic. Most
            teams either skip transitions entirely or reach for full animation libraries
            like Framer Motion or GSAP — adding bundle weight and complexity just to
            smooth page navigation.
          </p>

          <p>
            Segue exists to close that gap.{" "}
            <span className="text-foreground font-medium">
              Production-ready navigation transitions built on the native platform API,
              installed as source code you own.
            </span>{" "}
            One command adds a component and a CSS file to your project — no runtime
            dependency, no lock-in. Think{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground decoration-border hover:decoration-accent underline underline-offset-4 transition-colors"
            >
              shadcn/ui
            </Link>{" "}
            , but for page transitions.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="animate-fade-up mb-16 [animation-delay:120ms]">
        <div className="section-label text-muted-foreground mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
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
            <div
              key={item.step}
              className="border-border bg-card rounded-xl border p-5"
            >
              <span className="text-accent font-mono text-[11px]">{item.step}</span>
              <h3 className="text-foreground mt-2 text-sm font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-1.5 text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <div className="animate-fade-up mb-16 [animation-delay:160ms]">
        <div className="section-label text-muted-foreground mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          Quick start
        </div>
        <QuickStart />
      </div>

      {/* Browser support */}
      <div className="animate-fade-up mb-16 [animation-delay:200ms]">
        <div className="section-label text-muted-foreground mb-6 flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase">
          Browser support
        </div>
        <div className="border-border bg-card grid grid-cols-5 overflow-hidden rounded-xl border">
          {browsers.map((b) => (
            <div
              key={b.name}
              className="border-border flex flex-col items-center gap-3 border-r p-5 last:border-r-0"
            >
              <Image src={b.icon} alt={b.name} width={32} height={32} />
              <span className="text-foreground text-center text-[12px] leading-tight font-medium">
                {b.name}
              </span>
              {b.supported ? (
                <CircleCheck className="h-4 w-4 text-emerald-500" />
              ) : (
                <CircleX className="h-4 w-4 text-red-500" />
              )}
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mt-3 text-[12px]">
          Source:{" "}
          <a
            href="https://caniuse.com/view-transitions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground decoration-border hover:decoration-accent underline underline-offset-4 transition-colors"
          >
            caniuse.com
          </a>
        </p>
      </div>

      {/* Browse transitions link */}
      <div className="animate-fade-up flex justify-end [animation-delay:240ms]">
        <Link
          href="/transitions/fade-in"
          className="text-accent hover:text-accent/80 text-sm font-medium no-underline transition-colors"
        >
          Fade In &rarr;
        </Link>
      </div>
    </div>
  )
}
