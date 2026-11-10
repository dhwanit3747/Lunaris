import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

// Always dark — remove any stale light-theme class and clear the pref
document.documentElement.classList.remove("light-theme");
localStorage.removeItem("lunaris-theme");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
