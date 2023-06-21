import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar />
      <Hero />
    </div>
  );
}
