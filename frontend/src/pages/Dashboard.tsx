import UrlsTable from "../components/Table/UrlsTable";
import TopBar from "../components/TopBar";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar isLoggedIn={true} />
      <UrlsTable />
    </div>
  );
};

export default Home;
