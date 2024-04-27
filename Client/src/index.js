import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.js";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import "./index.css";
import { GlobalStyles } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";
import { BrowserRouter } from "react-router-dom";
import { Provider as ProviderRedux } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProviderRedux store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer />
      </ConfirmProvider>
    </CssVarsProvider>
  </ProviderRedux>
);
