import Header from "@modules/Shared/layout/Header";
import { HeroSection } from "./features/heroSection";

export function Home() {
  return (
    <div className="h-full w-full flex flex-col gap-10">
      <Header />
      <main className="w-full h-[90%]">
        <HeroSection />
      </main>
    </div>
  );
}
