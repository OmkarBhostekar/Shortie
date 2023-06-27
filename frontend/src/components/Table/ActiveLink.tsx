import { LinkIcon } from "@heroicons/react/24/outline";

type Props = {};

const ActiveLink = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="text-[#1EB036] mr-3 text-xs">Active</div>
      <div className="rounded-full p-1.5 bg-[#1EB036]/20">
        <LinkIcon className="w-3.5 h-3.5 opacity-80" />
      </div>
    </div>
  );
};

export default ActiveLink;
