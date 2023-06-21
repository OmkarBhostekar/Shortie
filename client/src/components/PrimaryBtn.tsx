"use client";
import React from "react";

type Props = {
  title?: string;
};

const PrimaryBtn = (props: Props) => {
  return (
    <div className="flex flex-row flex-wrap">
      <div className="relative inline-flex  group">
        <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#144EE3]  to-[#144EE3] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <a
          href="#"
          className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm text-white transition-all duration-200 bg-[#144EE3] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          role="button"
        >
          {props.title || "Register"}
        </a>
      </div>
    </div>
  );
};

export default PrimaryBtn;
