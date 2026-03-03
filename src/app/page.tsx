import { SlideRightLink } from "@/transitions/slide-right";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <SlideRightLink href="/demo">
        <div className="border p-8 rounded-xl cursor-pointer hover:bg-gray-50">
          Slide Right →
        </div>
      </SlideRightLink>
    </main>
  );
}
