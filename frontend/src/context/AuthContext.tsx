import { createContext, useReducer } from "react";
import { useEffect } from "react";
import { User } from "../utils/types/User";

export const AuthContext = createContext<{
  user: User | null;
  dispatch: Function | null;
}>({
  user: null,
  dispatch: null,
});

export function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

export function AuthContextProvider({ children }: any) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  async function fetchDetails() {
    console.log("fetching details");

    const user = await JSON.parse(localStorage.getItem("user") as string);
    console.log("stringify user", user);

    if (user) {
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    }
  }
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
