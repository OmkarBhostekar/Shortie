import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";

type Props = {
  name: string;
  img: string;
};

const UserTile = ({ name, img }: Props) => {
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-row flex-wrap">
            <div className="relative inline-flex  group">
              <a
                href="#"
                className="relative inline-flex items-center justify-center pl-2 pr-5 py-1.5 text-sm text-white transition-all duration-200 bg-[#181E29] stroke-[#353C4A] border outline-0 rounded-full focus:outline-none"
                role="button"
              >
                <div className="flex flex-row items-center justify-center">
                  <img src={img} className="w-9 h-9 rounded-full mr-2" />
                  <div className="flex flex-col">
                    <div className="text-[9px]">Welcome</div>
                    <div className="text-xs font-semibold">{name}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </MenuHandler>
      <MenuList className="bg-[#0e131e]">
        <MenuItem
          className="flex items-center gap-2 bg-[#0e131e] hover:bg-[#0e131e]"
          onClick={logOut}
        >
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserTile;
