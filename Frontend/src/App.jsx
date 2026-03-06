import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Loader from "./components/common/Loader";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // loader for 1 second

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <GoogleOAuthProvider clientId="1234567890-abc123.apps.googleusercontent.com">
      <RouterProvider router={AppRoutes} />
    </GoogleOAuthProvider>
  );
}

export default App;