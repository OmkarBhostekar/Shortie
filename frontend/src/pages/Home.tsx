import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Alert } from "@material-tailwind/react";
import Hero from "../components/Hero";
import TopBar from "../components/TopBar";
import { useAppContext } from "../utils/hooks/useAppContext";

type Props = {};

const Home = (props: Props) => {
  const { noti, setNoti, fetchUrls, showNotification } = useAppContext();
  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar user={null} />
      <Hero />
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
