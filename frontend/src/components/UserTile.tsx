import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

const UserTile = () => {
  return (
    <div className="flex flex-row flex-wrap">
      <div className="flex flex-row flex-wrap">
        <div className="relative inline-flex  group">
          <a
            href="#"
            className="relative inline-flex items-center justify-center px-5 py-1.5 text-sm text-white transition-all duration-200 bg-[#181E29] stroke-[#353C4A] border outline-0 rounded-full focus:outline-none"
            role="button"
          >
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col">
                <div className="text-[9px]">Welcome</div>
                <div className="text-xs font-semibold">Omkar Bhostekar</div>
              </div>
              <div className="flex flex-col items-center">
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserTile;
