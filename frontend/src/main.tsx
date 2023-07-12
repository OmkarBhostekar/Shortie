import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
