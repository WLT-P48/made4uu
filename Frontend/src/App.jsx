import React from "react";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <GoogleOAuthProvider clientId="198473426738-d0o59tf5mr4q7jpl4lgae0qh13mi7ilh.apps.googleusercontent.com">
      <RouterProvider router={AppRoutes} />
    </GoogleOAuthProvider>
  );
}

export default App;