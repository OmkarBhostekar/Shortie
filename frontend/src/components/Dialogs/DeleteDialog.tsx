import {
  Dialog,
  DialogHeader,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

type Props = {
  open: boolean;
  handleOpen: () => void;
  onDelete: () => void;
};

const DeleteDialog = ({ open, handleOpen, onDelete }: Props) => {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="bg-[#181E29]/25 p-3 rounded-xl"
    >
      <DialogHeader className="text-xl text-[#C9CED6]">
        Do you want to delete this URL?
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="blue" onClick={onDelete}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteDialog;
