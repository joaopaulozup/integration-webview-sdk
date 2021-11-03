import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import AuthPage from "./Pages/AuthPage/AuthPage";
import reportWebVitals from "./reportWebVitals";

const init = () => {
  ReactDOM.render(
    <React.StrictMode>
      <AuthProvider>
        <AuthPage />
      </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

init();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
