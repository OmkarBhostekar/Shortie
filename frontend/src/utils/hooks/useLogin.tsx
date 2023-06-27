import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import jwt_decode from "jwt-decode";
import axios from "axios";

function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext();

  const login = async (creds: string) => {
    setIsLoading(true);
    setError(null);
    console.log(creds);

    const data: any = jwt_decode(creds);
    console.log(data);
    const email = data["email"];
    const name = data["name"];
    const image = data["picture"];

    //"101912709601801714883"
    // ""103077630317509846475""
    const response: any = await axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/login`, {
        email: email,
        name: name,
        image: image,
      })
      .catch((error) => {
        alert(error.response.data.message);
        setIsLoading(false);
      });
    const json = await response["data"];
    console.log(json);

    if (json) {
      localStorage.setItem("user", JSON.stringify(json.data));
      console.log(localStorage.getItem("user"));

      {
        dispatch && dispatch({ type: "LOGIN", payload: json });
      }
      setIsLoading(false);
      window.location.reload();
    }
  };
  return { login, isLoading, error };
}

export default useLogin;
