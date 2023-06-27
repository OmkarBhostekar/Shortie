import InputBox from "./InputBox";
import UserTile from "./UserTile";
import { GoogleLogin } from "@react-oauth/google";
import useLogin from "../utils/hooks/useLogin";
import { User } from "../utils/types/User";

type Props = {
  user: User | null;
};

const TopBar = ({ user }: Props) => {
  const { login } = useLogin();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <img src="/logo.svg" className="h-6 mb-2" />
        {user && (
          <div className="flex-grow justify-center hidden md:flex">
            <InputBox user={user} />
          </div>
        )}
        {user && (
          <UserTile name={user.name as string} img={user.image as string} />
        )}
        {!user && (
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
      <div className={`md:hidden w-full md:mt-0 mt-6 ${user ? "" : "hidden"}`}>
        <InputBox user={user} />
      </div>
    </div>
  );
};

export default TopBar;
