// ─────────────────────────────────────────────────────────────────────────────
// GRID PAGE — app/products/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { SharedCard } from "@/transitions/shared-element"

const products = [
  { slug: "apple",  title: "Apple",  description: "A red fruit" },
  { slug: "banana", title: "Banana", description: "A yellow fruit" },
]

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {products.map((product) => (
        <SharedCard
          key={product.slug}
          href={`/products/${product.slug}`}
          className="rounded-xl bg-white shadow-md p-6"
        >
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="text-gray-500">{product.description}</p>
        </SharedCard>
      ))}
    </div>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PAGE — app/products/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { SharedTarget } from "@/transitions/shared-element"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className="p-8">
      {/*
        SharedTarget is the element the card morphs into.
        Both SharedCard and SharedTarget use the same transitionName
        (defaults to "shared-element").
      */}
      <SharedTarget
        className="rounded-xl bg-white shadow-md p-10 mb-8"
      >
        <h1 className="text-4xl font-bold capitalize">{slug}</h1>
        <p className="text-gray-500 mt-2">This is the detail page for {slug}.</p>
      </SharedTarget>

      {/*
        Everything outside SharedTarget fades in after the morph completes.
        No extra setup needed — transition.css handles it automatically.
      */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold">More details</h2>
        <p className="text-gray-500 mt-2">This content fades in after the card morphs.</p>
      </section>
    </div>
  )
}
