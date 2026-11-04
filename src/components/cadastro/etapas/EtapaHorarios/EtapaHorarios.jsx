import { Copy } from "lucide-react";
import { diasSemana, horariosTextos as T } from "../../../../data/cadastro";
import { opcoesHorario } from "../../../../lib/cadastro/formatos";
import { listarPessoas, pausaDaPessoa, pausaIndividual } from "../../../../lib/cadastro/estado";
import { ErroGrupo } from "../../ui/Campo/Campo";
import { Alternador } from "../../ui/Alternador/Alternador";
import { Opcoes } from "../../ui/Opcoes/Opcoes";
import "./EtapaHorarios.css";

function SeletorHora({ id, label, valor, onChange, desativado, invalido, descricao }) {
  return (
    <label className="etapa-horarios__hora" htmlFor={id}>
      <span className="sr-only">{label}</span>
      <select
        id={id} className="cad-select" value={valor} disabled={desativado}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalido ? "true" : undefined} aria-describedby={descricao}
      >
        {opcoesHorario.map((h) => <option key={h} value={h}>{h}</option>)}
      </select>
    </label>
  );
}

export function EtapaHorarios({ estado, dispatch, erros }) {
  const { dias, pausa } = estado.horarios;
  const pessoas = listarPessoas(estado);
  const individual = pausaIndividual(estado);
  const alterarDia = (dia, campo) => (valor) => dispatch({ tipo: "diaAlterar", dia, campo, valor });

  return (
    <div className="etapa-horarios">
      <ErroGrupo id="horarios-erro">{erros.horarios}</ErroGrupo>

      <ul className="etapa-horarios__dias">
        {diasSemana.map(({ dia, nome }) => {
          const d = dias[dia];
          const erro = erros[`dia.${dia}`];
          return (
            <li key={dia} className={`etapa-horarios__dia ${d.aberto ? "" : "etapa-horarios__dia--fechado"} ${erro ? "etapa-horarios__dia--erro" : ""}`}>
              <Alternador id={`dia-${dia}`} label={nome} hint={d.aberto ? T.aberto : T.fechado} checked={d.aberto} onChange={alterarDia(dia, "aberto")} compacto />
              {d.aberto && (
                <div className="etapa-horarios__faixa">
                  <SeletorHora id={`dia-${dia}-abre`} label={`${nome}: ${T.abre}`} valor={d.abre} onChange={alterarDia(dia, "abre")} invalido={!!erro} descricao={erro ? `dia-${dia}-erro` : undefined} />
                  <span className="etapa-horarios__ate" aria-hidden="true">{T.ate}</span>
                  <SeletorHora id={`dia-${dia}-fecha`} label={`${nome}: ${T.fecha}`} valor={d.fecha} onChange={alterarDia(dia, "fecha")} invalido={!!erro} descricao={erro ? `dia-${dia}-erro` : undefined} />
                </div>
              )}
              {erro && <p className="campo__erro" id={`dia-${dia}-erro`} role="alert">{erro}</p>}
            </li>
          );
        })}
      </ul>

      {dias[1].aberto && (
        <button type="button" className="etapa-horarios__copiar" onClick={() => dispatch({ tipo: "diasCopiarSegunda" })}>
          <Copy size={16} aria-hidden="true" />{T.copiar}
        </button>
      )}

      <div className={`etapa-horarios__pausa ${erros.pausa && !individual ? "etapa-horarios__dia--erro" : ""}`}>
        <Alternador id="pausa" label={T.pausa.label} checked={pausa.ativa} onChange={(valor) => dispatch({ tipo: "pausaAlterar", campo: "ativa", valor })} compacto />

        {pausa.ativa && pessoas.length > 1 && (
          <Opcoes
            nome="pausa-modo" legenda={T.pausa.modoLegenda} opcoes={T.pausa.modos}
            valor={pausa.modo} onChange={(valor) => dispatch({ tipo: "pausaAlterar", campo: "modo", valor })}
          />
        )}

        {pausa.ativa && !individual && (
          <div className="etapa-horarios__faixa">
            <SeletorHora id="pausa-inicio" label={T.pausa.inicio} valor={pausa.inicio} onChange={(valor) => dispatch({ tipo: "pausaAlterar", campo: "inicio", valor })} invalido={!!erros.pausa} descricao={erros.pausa ? "pausa-erro" : undefined} />
            <span className="etapa-horarios__ate" aria-hidden="true">{T.ate}</span>
            <SeletorHora id="pausa-fim" label={T.pausa.fim} valor={pausa.fim} onChange={(valor) => dispatch({ tipo: "pausaAlterar", campo: "fim", valor })} invalido={!!erros.pausa} descricao={erros.pausa ? "pausa-erro" : undefined} />
          </div>
        )}

        {individual && (
          <ul className="etapa-horarios__pessoas">
            {pessoas.map((pessoa, i) => {
              const p = pausaDaPessoa(pausa, pessoa.id);
              const nome = pessoa.nome.trim() || T.pausa.semNome(i + 1);
              const erro = erros[`pausa.${pessoa.id}`];
              const alterar = (campo) => (valor) => dispatch({ tipo: "pausaPessoaAlterar", id: pessoa.id, campo, valor });
              return (
                <li key={pessoa.id} className={`etapa-horarios__pessoa ${erro ? "etapa-horarios__dia--erro" : ""}`}>
                  <Alternador
                    id={`pausa-${pessoa.id}`} label={nome} hint={p.ativa ? T.pausa.pessoaFaz : T.pausa.pessoaNaoFaz}
                    checked={p.ativa} onChange={alterar("ativa")} compacto
                  />
                  {p.ativa && (
                    <div className="etapa-horarios__faixa">
                      <SeletorHora id={`pausa-${pessoa.id}-inicio`} label={`${nome}: ${T.pausa.inicio}`} valor={p.inicio} onChange={alterar("inicio")} invalido={!!erro} descricao={erro ? `pausa-${pessoa.id}-erro` : undefined} />
                      <span className="etapa-horarios__ate" aria-hidden="true">{T.ate}</span>
                      <SeletorHora id={`pausa-${pessoa.id}-fim`} label={`${nome}: ${T.pausa.fim}`} valor={p.fim} onChange={alterar("fim")} invalido={!!erro} descricao={erro ? `pausa-${pessoa.id}-erro` : undefined} />
                    </div>
                  )}
                  {erro && <p className="campo__erro" id={`pausa-${pessoa.id}-erro`} role="alert">{erro}</p>}
                </li>
              );
            })}
          </ul>
        )}

        {erros.pausa && <p className="campo__erro" id="pausa-erro" role="alert">{erros.pausa}</p>}
      </div>
    </div>
  );
}
