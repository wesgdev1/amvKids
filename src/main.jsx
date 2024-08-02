import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // quitar si hay problemas
import "./theme/custom.scss";
import "./theme/index.css";
import theme from "./theme/index.js";

import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from "./auth/context/AuthProvider.jsx";
import { CartProvider } from "./store/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
