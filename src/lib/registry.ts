import fs from "fs/promises"
import path from "path"

export interface TransitionMeta {
  slug: string
  name: string
  description: string
  duration: string
  easing: string
}

const registryDir = path.join(process.cwd(), "src/registry")

export async function getTransitions(): Promise<TransitionMeta[]> {
  const files = await fs.readdir(registryDir)
  const jsonFiles = files.filter((f) => f.endsWith(".json"))

  const transitions = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(registryDir, file), "utf-8")
      const data = JSON.parse(raw)
      return {
        slug: data.slug,
        name: data.name,
        description: data.description,
        duration: data.duration,
        easing: data.easing,
      } satisfies TransitionMeta
    })
  )

  return transitions.sort((a, b) => a.name.localeCompare(b.name))
}
