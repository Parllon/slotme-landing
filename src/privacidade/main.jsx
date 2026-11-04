import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Privacidade } from "../components/privacidade/Privacidade/Privacidade";
import "../styles/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Privacidade />
  </StrictMode>
);
