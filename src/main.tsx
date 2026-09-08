import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { installExternalLinkHandler } from "./lib/openExternal";
import "./index.css";

installExternalLinkHandler();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
