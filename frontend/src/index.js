import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

// Set the browser tab title to your project name
document.title = "AuthentiText AI";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
