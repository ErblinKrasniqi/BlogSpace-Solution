import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/css/bootstrap-icons.css";
import "./Assets/css/templatemo-tiya-golf-club.css";
import { AuthProvider } from "./Auth/is-auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
