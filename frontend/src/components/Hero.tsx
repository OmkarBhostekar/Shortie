"use client";
import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import InputBox from "./InputBox";
import { Switch } from "@material-tailwind/react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="flex flex-col items-center md:pt-32 pt-24">
      <div className="text-transparent bg-clip-text btn-gradient text-[3rem] font-bold mx-auto text-center">
        Shorten Your Loooong Links :)
      </div>
      <div className="text-sm font-extralight text-[#C9CED6] whitespace-pre-wrap text-center mt-2 mb-8">
        Shortie is an efficient and easy-to-use URL shortening service <br />
        that streamlines your online experience.
      </div>
      <InputBox user={null} />
      <div className="mt-4"></div>
      <Switch
        color="blue"
        className="bg-[#181E29] py-2"
        ripple={true}
        defaultChecked
        label={
          <div className="text-xs font-extralight text-[#C9CED6]">
            Auto Paste from Clipboard
          </div>
        }
      />
    </div>
  );
};

export default Hero;
