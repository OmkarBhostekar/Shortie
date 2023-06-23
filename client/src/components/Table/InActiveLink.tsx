import { LinkIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {};

const InActiveLink = (props: Props) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="text-[#B0901E] mr-3 text-xs">Inactive</div>
      <div className="rounded-full p-1.5 bg-[#B0901E]/20">
        <img src="/unlink.svg" className="w-3.5 h-3.5 opacity-80" />
      </div>
    </div>
  );
};

export default InActiveLink;
