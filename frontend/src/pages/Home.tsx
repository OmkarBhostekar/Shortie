import Hero from "../components/Hero";
import TopBar from "../components/TopBar";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar user={null} />
      <Hero />
    </div>
  );
};

export default Home;
