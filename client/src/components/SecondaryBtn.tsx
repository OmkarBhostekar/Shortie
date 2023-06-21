"use client";
import React from "react";

type Props = {
  title?: string;
};

const SecondaryBtn = (props: Props) => {
  return (
    <div className="flex flex-row flex-wrap">
      <div className="relative inline-flex  group">
        <a
          href="#"
          className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm text-white transition-all duration-200 bg-[#181E29] stroke-[#353C4A] border outline-0 rounded-full focus:outline-none"
          role="button"
        >
          {props.title || "Login"}
        </a>
      </div>
    </div>
  );
};

export default SecondaryBtn;
