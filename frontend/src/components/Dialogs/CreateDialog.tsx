import {
  InformationCircleIcon,
  LockOpenIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Breadcrumbs,
  Input,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useAppContext } from "../../utils/hooks/useAppContext";
import axios from "axios";
import { useAuthContext } from "../../utils/hooks/useAuthContext";

type Props = {
  createModal: boolean;
  handleOpenCreate: () => void;
};

const CreateDialog = ({ createModal, handleOpenCreate }: Props) => {
  const [isPublic, setIsPublic] = useState(true);
  const [shortie, setShortie] = useState("");
  const [pass, setPass] = useState("");
  const { createUrl, setCreateUrl, showNotification, fetchUrls } =
    useAppContext();
  const { user } = useAuthContext();

  const onShorten = async () => {
    // checks

    await axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/urls`, {
        uid: user?.id,
        longUrl: createUrl,
        shortie: shortie,
        pass: isPublic ? "" : pass,
      })
      .then((response) => {
        setCreateUrl("");
        showNotification("Url Shortened successfully!");
        handleOpenCreate();
        fetchUrls(user?.id as string);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const home = `${
    window.location.hostname === "localhost"
      ? "http://localhost:5173"
      : `https://${window.location.hostname}`
  }`;

  return (
    <Dialog
      open={createModal}
      handler={handleOpenCreate}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="bg-[#181E29] p-3 rounded-xl"
    >
      <DialogHeader className="text-xl text-[#C9CED6] items-center justify-around flex">
        <div className="">Shorten you Looooong URL!</div>
      </DialogHeader>
      <DialogBody className="">
        <div
          style={{
            height: "auto",
            margin: "0 0",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <div className="flex flex-row text-sm">
            <div className="mr-2">Original: </div>
            <div className="w-full text-[#C9CED6]">{createUrl}</div>
          </div>
          <Breadcrumbs
            fullWidth
            className="bg-[#0b101b] text-[#C9CED6] p-2 rounded-lg mt-6"
          >
            <div className="text-[#C9CED6]">{home}</div>
            <Input
              color="blue"
              label="Custom shortie"
              className="text-[#fff]"
              value={shortie}
              onChange={(e) => setShortie(e.target.value)}
            />
          </Breadcrumbs>
          <div className="flex flex-row items-center text-xs">
            <InformationCircleIcon className="w-3 h-3 -mt-px mr-1" />
            Custom shorrtie is optional
          </div>
          <div className="flex flex-row items-center mt-6">
            <div
              className={`border w-16  p-2 text-[13px] text-[${
                isPublic ? "#144EE3" : "#C9CED6"
              }] border-[${
                isPublic ? "#144EE3" : "#C9CED6"
              }] rounded-lg flex flex-col items-center cursor-pointer`}
              onClick={() => setIsPublic(true)}
            >
              <LockOpenIcon className="w-4 h-4 mb-1" />
              Public
            </div>
            <div
              className={`ml-2 w-16 border p-2 text-[13px] text-[${
                !isPublic ? "#144EE3" : "#C9CED6"
              }] border-[${
                !isPublic ? "#144EE3" : "#C9CED6"
              }] rounded-lg flex flex-col items-center cursor-pointer`}
              onClick={() => setIsPublic(false)}
            >
              <LockClosedIcon className="w-4 h-4 mb-1" />
              Protected
            </div>
            {!isPublic && (
              <div className="mx-4 flex-grow h-auto flex ">
                <Input
                  color="blue"
                  label="Password"
                  className="text-[#fff]"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center items-center">
        <Button
          className="w-1/2"
          variant="gradient"
          color="blue"
          onClick={onShorten}
        >
          <span>Shorten</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreateDialog;
