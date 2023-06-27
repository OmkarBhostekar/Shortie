import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw Error("Using AuthContext outside the AuthContextProvider");
  }

  return context;
}
