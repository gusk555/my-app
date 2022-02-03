import React from "react";
import ReactDOM from "react-dom";
import TaskProvider from "./hooks.js";
import App from "./App.js";

ReactDOM.render(
  <TaskProvider>
    <App />
  </TaskProvider>,
  document.getElementById("root")
);
