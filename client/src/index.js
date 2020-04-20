import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./app";

import ApplicationContextProvider from "./contexts";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApplicationContextProvider>
        <App />
      </ApplicationContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
