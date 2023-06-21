"use client";
import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";

type Props = {};

const TopBar = (props: Props) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <img src="/logo.svg" className="h-6 mb-2" />
      <div className="flex flex-row flex-wrap">
        <SecondaryBtn title="Login" />
        <div className="w-6"></div>
        <PrimaryBtn title="Register Now" />
      </div>
    </div>
  );
};

export default TopBar;
