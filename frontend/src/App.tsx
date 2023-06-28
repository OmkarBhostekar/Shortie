import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useAuthContext } from "./utils/hooks/useAuthContext";
import Dashboard from "./pages/Dashboard";
import RedirectPage from "./pages/RedirectPage";
function App() {
  const { user } = useAuthContext();
  console.log("user ", user);

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={user !== null ? <Dashboard user={user} /> : <Home />}
            />
            <Route path="/:shortUrl" element={<RedirectPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
