import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = () => {
  const { shortUrl } = useParams();
  const [msg, setMsg] = useState<string>("Redirecting...");

  const fetchOriginalUrl = async () => {
    const res = await axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls/${shortUrl}`)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
        setMsg("Invalid URL or URL has been expired!");
        return "";
      });
    if (res !== "") window.location.replace(res);
  };

  useEffect(() => {
    fetchOriginalUrl();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col text-2xl text-red-500 items-center jce">
      <div className="m-auto">{msg}</div>
    </div>
  );
};

export default RedirectPage;
