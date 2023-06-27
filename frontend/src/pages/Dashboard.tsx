import { Alert } from "@material-tailwind/react";
import UrlsTable from "../components/Table/UrlsTable";
import TopBar from "../components/TopBar";
import { User } from "../utils/types/User";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../utils/hooks/useAppContext";

type Props = {
  user: User | null;
};

const Home = ({ user }: Props) => {
  const { noti, setNoti } = useAppContext();

  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar user={user} />
      <UrlsTable user={user} />
      <div className="absolute bottom-0 right-0 m-4">
        {noti !== "" ? (
          <Alert
            variant="outlined"
            icon={<CheckBadgeIcon strokeWidth={2} className="h-6 w-6" />}
            onClose={() => setNoti("")}
          >
            {noti}
          </Alert>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
