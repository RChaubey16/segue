# Segue

Page transitions, ready to drop in.

Segue is a collection of animated page transitions for **Next.js** and **React**, built on the native [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API). No animation libraries. No layout thrashing. Just CSS.

## Why Segue Exists

Modern browsers now support the [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) — a native way to animate between pages without JavaScript animation runtimes or layout hacks. It allows web apps to have smooth, continuous navigation instead of abrupt page changes, bringing native-app polish to the web.

But using it in real React or Next.js apps still requires wiring together boilerplate: `startViewTransition` calls, CSS pseudo-element rules, router integration, and cleanup logic. Most teams either skip transitions entirely or reach for full animation libraries like Framer Motion or GSAP — adding bundle weight and complexity just to smooth navigation.

Segue exists to close that gap. **Production-ready navigation transitions built on the native platform API, installed as source code you own.** One command adds a component and a CSS file directly to your project — no runtime dependency, no lock-in.

Think [shadcn/ui](https://ui.shadcn.com), but for page transitions.

## Quick Start

```bash
npx segue add slide-right
```

Then use it in your app:

```tsx
import { SlideRightLink } from "@/transitions/slide-right/link"

export default function Page() {
  return <SlideRightLink href="/about">Go to About</SlideRightLink>
}
```

That's it. Your pages now transition with a slide animation.

## How It Works

1. **Pick a transition** — Browse the collection and find the motion that fits your app.
2. **Install it** — One `npx` command copies the component and CSS into your project.
3. **Wrap your links** — Replace your `<Link>` with the transition component. Done.

Under the hood, Segue uses the View Transition API:

- A click on the transition link adds a CSS class to the `<html>` element
- `document.startViewTransition()` triggers the navigation
- CSS `::view-transition-old` and `::view-transition-new` pseudo-elements handle the animation
- The class is removed after the animation completes

## Available Transitions

| Transition    | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `slide-right` | New page enters from the right, old page exits to the left     |
| `slide-up`    | New page enters from the bottom, old page exits toward the top |

## Framework Support

Segue supports both Next.js and React.

**Next.js** (App Router):

```tsx
import { SlideRightLink } from "@/transitions/slide-right/link"

;<SlideRightLink href="/about">About</SlideRightLink>
```

**React** (React Router):

```tsx
import { SlideRightLink } from "@/transitions/slide-right/link"

;<SlideRightLink to="/about">About</SlideRightLink>
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar and theme
│   ├── page.tsx                # Home page
│   ├── demo/page.tsx           # Live demo page
│   ├── registry/[slug]/        # API endpoint for CLI
│   └── transitions/
│       ├── page.tsx            # Transitions listing
│       └── [slug]/page.tsx     # Transition detail page
├── components/
│   ├── transition-link.tsx     # Core transition trigger component
│   ├── transition-card.tsx     # Transition preview card
│   ├── quick-start.tsx         # Quick start code snippets
│   ├── sidebar.tsx             # Navigation sidebar
│   └── detail/                 # Transition detail page components
├── lib/
│   ├── registry.ts             # Reads and exposes transition metadata
│   └── utils.ts                # Utility functions
├── registry/                   # Transition metadata (JSON)
│   ├── slide-right.json
│   └── slide-up.json
└── transitions/                # Transition source files
    ├── slide-right/
    │   ├── link.tsx            # Drop-in link component
    │   └── transition.css      # Animation keyframes
    └── slide-up/
        ├── link.tsx
        └── transition.css
```

## Development

**Prerequisites:** Node.js and [pnpm](https://pnpm.io/)

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Lint
pnpm lint

# Format
pnpm format
```

## Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router, React Server Components
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) — Native browser transitions
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark mode support
- [Lucide](https://lucide.dev/) — Icons

## License

Open source.
