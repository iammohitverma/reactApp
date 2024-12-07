import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/fonts/Maison_Neue/stylesheet.css";
import "./assets/css/theme-style.css";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
