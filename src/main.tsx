import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Use HashRouter for GitHub Pages to avoid 404 errors
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
