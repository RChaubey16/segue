import { SlideRightLink } from "@/transitions/slide-right";

export default function Demo() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Slide Right ✓</h1>
        <SlideRightLink href="/" className="underline">
          ← Go back
        </SlideRightLink>
      </div>
    </main>
  );
}
