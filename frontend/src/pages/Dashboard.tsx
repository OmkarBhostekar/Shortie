import {
  Alert,
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import UrlsTable from "../components/Table/UrlsTable";
import TopBar from "../components/TopBar";
import { User } from "../utils/types/User";
import {
  CheckBadgeIcon,
  InformationCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useAppContext } from "../utils/hooks/useAppContext";
import { useState } from "react";
import DeleteDialog from "../components/Dialogs/DeleteDialog";
import QRCode from "qrcode.react";
import QrDialog from "../components/Dialogs/QrDialog";
import CreateDialog from "../components/Dialogs/CreateDialog";

type Props = {
  user: User | null;
};

const Home = ({ user }: Props) => {
  const {
    noti,
    setNoti,
    fetchUrls,
    showNotification,
    createModal,
    setCreateModal,
    createUrl,
    setCreateUrl,
  } = useAppContext();
  const [open, setOpen] = useState(false);
  const [qrModal, setQrModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const onDelete = async () => {
    await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls/${delId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    handleOpen();
    showNotification("URL deleted successfully!");
    await fetchUrls(user?.token as string);
  };

  const handleOpen = () => setOpen(!open);
  const handleOpenQr = () => setQrModal(!qrModal);
  const handleOpenCreate = () => setCreateModal(!createModal);

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
      <CreateDialog
        createModal={createModal}
        handleOpenCreate={handleOpenCreate}
      />
      <QrDialog
        qrModal={qrModal}
        handleOpenQr={handleOpenQr}
        qrUrl={qrUrl}
        onDownload={onDownload}
      />
      <DeleteDialog open={open} handleOpen={handleOpen} onDelete={onDelete} />
    </div>
  );
};

export default Home;
