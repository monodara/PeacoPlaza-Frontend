import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./index.css";
import "./output.css";
import store from "./redux/store";

// const apiKey = process.env.REACT_APP_GOOGLE_AUTH_API_KEY;
const apiKey =
  "694819720098-elb8eeg8le4499s7q42hv36dudd9tgau.apps.googleusercontent.com";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <ThemeProvider> */}
        <GoogleOAuthProvider clientId={apiKey}>
          <App />
        </GoogleOAuthProvider>

        {/* </ThemeProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
