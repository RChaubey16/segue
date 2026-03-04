import { getTransitions } from "@/lib/registry"
import type { MetadataRoute } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://segue.dev"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const transitions = await getTransitions()

  const transitionPages = transitions.map((t) => ({
    url: `${siteUrl}/transitions/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/transitions`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...transitionPages,
  ]
}
