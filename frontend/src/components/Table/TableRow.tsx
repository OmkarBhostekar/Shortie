import {
  DocumentDuplicateIcon,
  QrCodeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import InActiveLink from "./InActiveLink";
import ActiveLink from "./ActiveLink";
import { Url } from "../../utils/types/Url";
import { useAppContext } from "../../utils/hooks/useAppContext";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useState } from "react";
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
      : `https://${window.location.hostname}`
  }/${url.shortUrl}`;

  const triggers = {
    // onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <tr className="bg-[#181E29]/25 text-[#C9CED6] text-xs dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <div className="flex flex-row items-center">
          <div>{shortUrl}</div>
          <Popover
            placement="bottom"
            open={openPopover}
            handler={(clicked: boolean) => {
              if (clicked) {
                navigator.clipboard.writeText(shortUrl);
                setOpenPopover(clicked);
              }
            }}
          >
            <PopoverHandler {...triggers}>
              <div className="ml-4 p-2 bg-[#1C283F] rounded-full flex items-center justify-center cursor-pointer">
                <DocumentDuplicateIcon className="w-3 h-3" />
              </div>
            </PopoverHandler>
            <PopoverContent
              {...triggers}
              className="p-2 mt-1 bg-[#1C283F] text-[#C9CED6]"
            >
              Shorrtie copied to clipboard!
            </PopoverContent>
          </Popover>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-row items-center max-w-xl">
          <img
            src={`https://www.google.com/s2/favicons?domain=${url.longUrl}&sz=128`}
            alt=""
            className="w-8 h-8 p-1 mr-2"
          />
          <div className="">{url.longUrl}</div>
        </div>
      </td>
      <td className="px-6 py-4 cursor-pointer flex items-center justify-center">
        <QrCodeIcon
          className="w-8 h-8 opacity-70"
          onClick={() => onQr(shortUrl)}
        />
      </td>
      <td className="px-6 py-4 text-center">{url.clicks}</td>
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
