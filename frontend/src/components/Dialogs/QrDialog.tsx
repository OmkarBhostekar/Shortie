import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import QRCode from "qrcode.react";

type Props = {
  qrModal: boolean;
  handleOpenQr: () => void;
  qrUrl: string;
  onDownload: () => void;
};

const QrDialog = ({ qrModal, handleOpenQr, qrUrl, onDownload }: Props) => {
  return (
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
  );
};

export default QrDialog;
