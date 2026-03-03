import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  let { slug } = await params

  // Strip .json suffix so both /registry/slide-up and /registry/slide-up.json work
  slug = slug.replace(/\.json$/, "")

  // Only allow alphanumeric and hyphens to prevent path traversal
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }

  try {
    const data = await import(`@/registry/${slug}.json`)
    return NextResponse.json(data.default, {
      headers: {
        // Allow the CLI (and anyone) to fetch this cross-origin
        "Access-Control-Allow-Origin": "*",
        // Cache for 1 hour on CDN, revalidate in background
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch {
    return NextResponse.json(
      { error: `Transition "${slug}" not found` },
      { status: 404 }
    )
  }
}
