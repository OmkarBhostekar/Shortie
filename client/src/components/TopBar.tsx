"use client";
import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import InputBox from "./InputBox";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import UserTile from "./UserTile";

type Props = {
  isLoggedIn: boolean;
};

const TopBar = (props: Props) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <img src="/logo.svg" className="h-6 mb-2" />
      {props.isLoggedIn && (
        <div className="flex flex-grow justify-center">
          <InputBox />
        </div>
      )}
      {props.isLoggedIn && <UserTile />}
      {!props.isLoggedIn && (
        <div className="flex flex-row flex-wrap">
          <SecondaryBtn title="Login" />
          <div className="w-6"></div>
          <PrimaryBtn title="Register Now" />
        </div>
      )}
    </div>
  );
};

export default TopBar;
