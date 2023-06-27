import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import InputBox from "./InputBox";
import UserTile from "./UserTile";
import { GoogleLogin } from "@react-oauth/google";
import useLogin from "../utils/hooks/useLogin";

type Props = {
  isLoggedIn: boolean;
};

const TopBar = ({ isLoggedIn }: Props) => {
  const { login } = useLogin();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <img src="/logo.svg" className="h-6 mb-2" />
        {isLoggedIn && (
          <div className="flex-grow justify-center hidden md:flex">
            <InputBox />
          </div>
        )}
        {isLoggedIn && <UserTile />}
        {!isLoggedIn && (
          <div className="flex flex-row flex-wrap">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                await login(credentialResponse.credential as string);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />
          </div>
        )}
      </div>
      <div
        className={`md:hidden w-full md:mt-0 mt-6 ${
          isLoggedIn ? "" : "hidden"
        }`}
      >
        <InputBox />
      </div>
    </div>
  );
};

export default TopBar;
