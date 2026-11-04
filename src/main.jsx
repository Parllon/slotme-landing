import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/theme.css";
import { trackLpEvent } from "./lib/track";
import { capturarOrigem } from "./lib/cadastro/origem";

// Guarda a UTM do anúncio na sessão: a pessoa entra pela home e só depois
// abre o /cadastro/, que envia essa origem junto com o pedido.
capturarOrigem();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

trackLpEvent("lp_vista");
