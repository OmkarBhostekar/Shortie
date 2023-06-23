import TopBar from "@/components/TopBar";
import Hero from "@/components/Hero";
import UrlsTable from "@/components/Table/UrlsTable";

export default function Home() {
  const isLoggedIn = false;
  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar isLoggedIn={isLoggedIn} />
      {!isLoggedIn && <Hero />}
      {isLoggedIn && <UrlsTable />}
    </div>
  );
}
