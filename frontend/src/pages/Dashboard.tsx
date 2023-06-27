import UrlsTable from "../components/Table/UrlsTable";
import TopBar from "../components/TopBar";
import { User } from "../utils/types/User";

type Props = {
  user: User | null;
};

const Home = ({ user }: Props) => {
  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar user={user} />
      <UrlsTable user={user} />
    </div>
  );
};

export default Home;
