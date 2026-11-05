import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, Loader2, RotateCcw } from "lucide-react";
import { Logo } from "../../ui/Logo/Logo";
import { etapas, navTextos as N, rascunhoTextos } from "../../../data/cadastro";
import { estadoInicial, listarPessoas, reducer } from "../../../lib/cadastro/estado";
import { primeiraEtapaComErro, validarEtapa } from "../../../lib/cadastro/validacao";
import { apagarRascunho, lerRascunho, rascunhoTemConteudo, salvarRascunho } from "../../../lib/cadastro/rascunho";
import { gerarProtocolo } from "../../../lib/cadastro/formatos";
import { montarPedido } from "../../../lib/cadastro/pedido";
import { lerOrigem } from "../../../lib/cadastro/origem";
import { enviarPedido } from "../../../lib/cadastro/enviar";
import { trackLpEvent } from "../../../lib/track";
import { EtapaVoce } from "../etapas/EtapaVoce/EtapaVoce";
import { EtapaNegocio } from "../etapas/EtapaNegocio/EtapaNegocio";
import { EtapaServicos } from "../etapas/EtapaServicos/EtapaServicos";
import { EtapaEquipe } from "../etapas/EtapaEquipe/EtapaEquipe";
import { EtapaHorarios } from "../etapas/EtapaHorarios/EtapaHorarios";
import { EtapaVisual } from "../etapas/EtapaVisual/EtapaVisual";
import { EtapaRevisao } from "../etapas/EtapaRevisao/EtapaRevisao";
import { Sucesso } from "../Sucesso/Sucesso";
import "../../ui/Button/Button.css";
import "./Cadastro.css";

const COMPONENTES = {
  voce: EtapaVoce, negocio: EtapaNegocio, servicos: EtapaServicos, equipe: EtapaEquipe,
  horarios: EtapaHorarios, visual: EtapaVisual, revisao: EtapaRevisao,
};
const IDS = etapas.map((e) => e.id);
const INDICE = Object.fromEntries(IDS.map((id, i) => [id, i]));

// Leva o foco (e a tela) para o primeiro campo com erro.
function focarPrimeiroErro() {
  requestAnimationFrame(() => {
    const el = document.querySelector('.cadastro__corpo [aria-invalid="true"], .cadastro__corpo .campo__erro--grupo');
    if (!el) return;
    const alvo = el.tagName === "FIELDSET" ? el.querySelector("input") : el;
    el.scrollIntoView({ block: "center", behavior: "smooth" });
    if (alvo && typeof alvo.focus === "function") alvo.focus({ preventScroll: true });
  });
}

export function Cadastro() {
  const [estado, dispatch] = useReducer(reducer, null, () => lerRascunho() || estadoInicial());
  const [avisoRascunho, setAvisoRascunho] = useState(() => rascunhoTemConteudo(estado));
  const [tentou, setTentou] = useState({}); // etapas em que a pessoa já tentou avançar
  const [envio, setEnvio] = useState({ status: "ocioso" }); // ocioso | enviando | erro | ok
  const titulo = useRef(null);
  const primeiraRender = useRef(true);
  const etapasVistas = useRef(new Set());
  const protocoloRef = useRef(null);

  const etapa = etapas[estado.etapa] || etapas[0];
  const Componente = COMPONENTES[etapa.id];
  const errosEtapa = useMemo(() => validarEtapa(etapa.id, estado), [etapa.id, estado]);
  const errosVisiveis = tentou[etapa.id] ? errosEtapa : {};
  const temErroVisivel = Object.keys(errosVisiveis).length > 0;
  const ehUltima = estado.etapa === etapas.length - 1;

  // Salva o rascunho a cada mudança (até o envio dar certo).
  useEffect(() => { if (envio.status !== "ok") salvarRascunho(estado); }, [estado, envio.status]);

  // Troca de etapa: volta ao topo, foca o título e registra no funil.
  useEffect(() => {
    if (!etapasVistas.current.has(etapa.id)) {
      etapasVistas.current.add(etapa.id);
      trackLpEvent(`cad_etapa_${etapa.id}`);
    }
    if (primeiraRender.current) { primeiraRender.current = false; return; }
    window.scrollTo(0, 0);
    titulo.current?.focus({ preventScroll: true });
  }, [etapa.id]);

  const irPara = (i) => dispatch({ tipo: "irPara", etapa: i });

  const voltar = () => { if (estado.etapa > 0) irPara(estado.etapa - 1); };

  const avancar = () => {
    if (Object.keys(errosEtapa).length) {
      setTentou((t) => ({ ...t, [etapa.id]: true }));
      focarPrimeiroErro();
      return;
    }
    setAvisoRascunho(false);
    irPara(estado.etapa + 1);
  };

  const enviar = async () => {
    // Confere TODAS as etapas: um rascunho antigo pode ter chegado incompleto.
    const comErro = primeiraEtapaComErro(IDS, estado);
    if (comErro !== -1) {
      setTentou((t) => ({ ...t, [IDS[comErro]]: true }));
      if (comErro !== estado.etapa) irPara(comErro);
      focarPrimeiroErro();
      return;
    }
    // Mesmo protocolo em todas as tentativas: se a resposta se perdeu mas o
    // servidor recebeu, o reenvio devolve o mesmo cadastro em vez de duplicar.
    if (!protocoloRef.current) protocoloRef.current = gerarProtocolo();
    const protocolo = protocoloRef.current;
    const fotos = listarPessoas(estado).filter((p) => p.foto).map((p) => ({ nome: p.nome, foto: p.foto }));
    const resumoSucesso = { protocolo, nome: estado.voce.nome, email: estado.voce.email, negocio: estado.negocio.nome, fotos };
    // Robô marcou a armadilha: finge que deu certo e não envia nada.
    if (estado.revisao.botcheck) { setEnvio({ status: "ok", ...resumoSucesso }); return; }

    setEnvio({ status: "enviando" });
    try {
      const pedido = montarPedido(estado, { protocolo, utm: lerOrigem() });
      const sistema = await enviarPedido(pedido, { botcheck: false });
      trackLpEvent("cad_enviado");
      apagarRascunho();
      setEnvio({ status: "ok", ...resumoSucesso, pagina: sistema });
    } catch (e) {
      console.error("[cadastro] falha no envio:", e);
      trackLpEvent("cad_erro_envio");
      setEnvio({ status: "erro", codigo: e.codigo || "rede" });
    }
  };

  const aoSubmeter = (e) => {
    e.preventDefault();
    if (envio.status === "enviando") return;
    if (ehUltima) enviar(); else avancar();
  };

  const recomecar = () => {
    apagarRascunho();
    protocoloRef.current = null;
    dispatch({ tipo: "reiniciar" });
    setTentou({});
    setAvisoRascunho(false);
  };

  if (envio.status === "ok") {
    return (
      <div className="cadastro">
        <header className="cadastro__topo"><div className="cadastro__topo-interno"><a href="/" className="cadastro__logo"><Logo /></a></div></header>
        <main className="cadastro__corpo"><Sucesso {...envio} /></main>
      </div>
    );
  }

  const progresso = Math.round(((estado.etapa + 1) / etapas.length) * 100);

  return (
    <div className="cadastro">
      <header className="cadastro__topo">
        <div className="cadastro__topo-interno">
          <a href="/" className="cadastro__logo"><Logo /></a>
          <span className="cadastro__contador">{N.etapaDe(estado.etapa + 1, etapas.length)}</span>
        </div>
        <div
          className="cadastro__barra" role="progressbar" aria-label={N.etapaDe(estado.etapa + 1, etapas.length)}
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={progresso}
        >
          <span style={{ width: `${progresso}%` }} />
        </div>
      </header>

      <form className="cadastro__form" onSubmit={aoSubmeter} noValidate>
        <main className="cadastro__corpo">
          {avisoRascunho && (
            <div className="cadastro__rascunho" role="status">
              <span>{rascunhoTextos.aviso}</span>
              <button type="button" onClick={recomecar}><RotateCcw size={14} aria-hidden="true" />{rascunhoTextos.recomecar}</button>
            </div>
          )}

          <p className="cadastro__eyebrow">{etapa.rotulo}</p>
          <h1 ref={titulo} tabIndex={-1} className="cadastro__titulo">{etapa.titulo}</h1>
          <p className="cadastro__subtitulo">{etapa.subtitulo}</p>

          {temErroVisivel && <p className="cadastro__alerta" role="status">{N.corrigir}</p>}

          <Componente
            estado={estado} dispatch={dispatch} erros={errosVisiveis}
            irPara={irPara} indice={INDICE} erroEnvio={envio.status === "erro" ? envio.codigo : null}
          />
        </main>

        <footer className="cadastro__rodape">
          <div className="cadastro__rodape-interno">
            {estado.etapa > 0 && (
              <button type="button" className="btn btn--outline cadastro__voltar" onClick={voltar} disabled={envio.status === "enviando"}>
                <ChevronLeft size={18} aria-hidden="true" />{N.voltar}
              </button>
            )}
            <button type="submit" className="btn btn--primary cadastro__avancar" disabled={envio.status === "enviando"}>
              {envio.status === "enviando"
                ? <><Loader2 size={18} className="cadastro__girando" aria-hidden="true" />{N.enviando}</>
                : <>{ehUltima ? N.enviar : N.continuar}<ArrowRight size={18} aria-hidden="true" /></>}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
