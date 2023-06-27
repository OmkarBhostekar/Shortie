import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import UrlsTable from "../components/Table/UrlsTable";
import TopBar from "../components/TopBar";
import { User } from "../utils/types/User";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../utils/hooks/useAppContext";
import { useState } from "react";
import DeleteDialog from "../components/DeleteDialog";
import QRCode from "qrcode.react";

type Props = {
  user: User | null;
};

const Home = ({ user }: Props) => {
  const { noti, setNoti, fetchUrls, showNotification } = useAppContext();
  const [open, setOpen] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const onDelete = async () => {
    await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls/${delId}`, {
      method: "DELETE",
    });
    handleOpen();
    showNotification("URL deleted successfully!");
    await fetchUrls(user?.id as string);
  };

  const handleOpen = () => setOpen(!open);
  const handleOpenQr = () => setQrModal(!qrModal);

  const onDownload = async () => {
    const canvas = document.getElementById("123456");
    if (!canvas) return;
    const pngUrl = canvas
      // @ts-ignore
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "shortie_url.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    handleOpenQr();
  };

  return (
    <div className="flex flex-col md:py-8 md:px-8 p-6">
      <TopBar user={user} />
      <UrlsTable
        user={user}
        onDelete={(id) => {
          setDelId(id);
          handleOpen();
        }}
        onQr={(url) => {
          setQrUrl(url);
          handleOpenQr();
        }}
      />
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
      <Dialog
        open={qrModal}
        handler={handleOpenQr}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-[#181E29]/25 p-3 rounded-xl"
      >
        <DialogHeader className="text-xl text-[#C9CED6] items-center justify-around flex">
          <div className="">Share this QR code to your friends!</div>
        </DialogHeader>
        <DialogBody className="">
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 256,
              width: "100%",
            }}
          >
            <QRCode
              id="123456"
              value={qrUrl}
              size={250}
              level={"H"}
              includeMargin={true}
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center items-center">
          <Button
            className="w-1/2"
            variant="gradient"
            color="blue"
            onClick={onDownload}
          >
            <span>Download</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <DeleteDialog open={open} handleOpen={handleOpen} onDelete={onDelete} />
    </div>
  );
};

export default Home;
