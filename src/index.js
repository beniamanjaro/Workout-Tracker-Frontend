import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { WorkoutPlansContextProvider } from "./context/WorkoutPlansContext";
import { HamburgerMenuContextProvider } from "./context/HamburgerMenuContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <WorkoutPlansContextProvider>
      <HamburgerMenuContextProvider>
        <Router>
          <ToastContainer />
          <App />
        </Router>
      </HamburgerMenuContextProvider>
    </WorkoutPlansContextProvider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
