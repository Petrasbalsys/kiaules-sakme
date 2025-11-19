import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.querySelector("#root") || document.createElement("div");

if (!document.querySelector("#root")) {
  rootElement.id = "root";
  document.body.appendChild(rootElement);
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);