import PrimaryBtn from "./PrimaryBtn";
import { User } from "../utils/types/User";
import axios from "axios";
import { useAppContext } from "../utils/hooks/useAppContext";
import { useState } from "react";

type Props = {
  user: User | null;
};

const InputBox = ({ user }: Props) => {
  const { fetchUrls, showNotification } = useAppContext();
  const [url, seturl] = useState<string>("");

  const onSubmit = async () => {
    if (!user) return showNotification("Please login to shorten the url");
    if (url === "") return;
    await axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls`, {
        uid: user?.id,
        longUrl: url,
      })
      .then((response) => {
        seturl("");
        showNotification("Url Shortened successfully!");
        fetchUrls(user?.id as string);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-row border-2 border-[#353C4A] rounded-full bg-[#181E29]">
      <div className="flex flex-row flex-grow">
        <img src="/export.svg" className="ml-4" />
        <input
          type="text"
          className="md:w-[22rem] h-12 px-4 rounded-s-full text-sm text-[#C9CED6] bg-[#181E29] border-0 outline-none "
          placeholder="Enter the link here"
          onChange={(e) => seturl(e.target.value)}
          value={url}
        />
      </div>
      <div className="my-1 mr-1">
        <PrimaryBtn title="Shorten Now!" onclick={onSubmit} />
      </div>
    </div>
  );
};

export default InputBox;
