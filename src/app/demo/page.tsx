import { SlideRightLink } from "@/transitions/slide-right"

export default function Demo() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Slide Right ✓</h1>
        <SlideRightLink href="/" className="underline">
          ← Go back
        </SlideRightLink>
      </div>
    </main>
  )
}
