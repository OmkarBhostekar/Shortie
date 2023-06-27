import {
  DocumentDuplicateIcon,
  QrCodeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import InActiveLink from "./InActiveLink";
import ActiveLink from "./ActiveLink";
import { Url } from "../../utils/types/Url";
import { useAppContext } from "../../utils/hooks/useAppContext";
type Props = {
  url: Url;
  onDelete: (id: string) => void;
  onQr: (url: string) => void;
};

const TableRow = ({ url, onDelete, onQr }: Props) => {
  const dateFormatted = new Date(url.created).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const { fetchUrls, showNotification } = useAppContext();

  const toggleActive = async () => {
    await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls/${url._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActive: !url.isActive,
      }),
    });
    await fetchUrls(url.user);
    showNotification(
      `URL ${url.isActive ? "deactivated" : "activated"} successfully!`
    );
  };

  // const onDelete = async () => {
  //   await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls/${url._id}`, {
  //     method: "DELETE",
  //   });
  //   await fetchUrls(url.user);
  //   showNotification("URL deleted successfully!");
  // };
  const shortUrl = `${
    window.location.hostname === "localhost"
      ? "http://localhost:5173"
      : window.location.hostname
  }/${url.shortUrl}`;

  return (
    <tr className="bg-[#181E29]/25 text-[#C9CED6] text-xs dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <div className="flex flex-row items-center">
          <div>{shortUrl}</div>
          <div className="ml-4 p-2 bg-[#1C283F] rounded-full flex items-center justify-center cursor-pointer">
            <DocumentDuplicateIcon className="w-3 h-3" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-row items-center">
          <img
            src={`https://www.google.com/s2/favicons?domain=${url.longUrl}&sz=128`}
            alt=""
            className="w-8 h-8 p-1 mr-2"
          />
          <div className="truncate">{url.longUrl}</div>
        </div>
      </td>
      <td className="px-6 py-4 cursor-pointer flex items-center justify-center">
        <QrCodeIcon
          className="w-8 h-8 opacity-70"
          onClick={() => onQr(shortUrl)}
        />
      </td>
      <td className="px-6 py-4 text-center">{url.clicks / 2}</td>
      <td
        className="px-6 py-4 text-center cursor-pointer"
        onClick={toggleActive}
      >
        {url.isActive ? <ActiveLink /> : <InActiveLink />}
      </td>
      <td className="px-6 py-4 text-center">{dateFormatted}</td>
      <td className="px-6 py-4 text-center">
        <div
          className="flex items-center justify-center py-2  cursor-pointer bg-[#181E29] border border-[#353C4A] rounded-full"
          onClick={() => onDelete(url._id)}
        >
          <TrashIcon className="w-4 h-4 opacity-70" />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
