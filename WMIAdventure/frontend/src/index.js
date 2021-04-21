import React from "react";
import ReactDOM from "react-dom";

import "./main-styles/index.css";
import "./main-styles/normalize.css";

import App from "./js/App";
import reportWebVitals from "./js/reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
