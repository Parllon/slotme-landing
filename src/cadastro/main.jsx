import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Cadastro } from "../components/cadastro/Cadastro/Cadastro";
import "../styles/theme.css";
import { trackLpEvent } from "../lib/track";
import { capturarOrigem } from "../lib/cadastro/origem";

capturarOrigem();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Cadastro />
  </StrictMode>
);

trackLpEvent("cad_vista");
