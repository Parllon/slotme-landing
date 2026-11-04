import { useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { cadastroConfig, duracoes, especialidades, servicosTextos as T } from "../../../../data/cadastro";
import { formatarDuracao } from "../../../../lib/cadastro/formatos";
import { Campo, ErroGrupo, ariaCampo } from "../../ui/Campo/Campo";
import "./EtapaServicos.css";

export function EtapaServicos({ estado, dispatch, erros }) {
  const { servicos, negocio } = estado;
  const esp = especialidades.find((e) => e.valor === negocio.especialidade);
  const jaTem = new Set(servicos.map((s) => s.nome.trim().toLowerCase()));
  const sugestoes = (esp ? esp.sugestoes : []).filter((s) => !jaTem.has(s.nome.toLowerCase()));
  const limite = servicos.length >= cadastroConfig.maxServicos;

  // Ao adicionar um serviço em branco, leva o foco para o nome dele.
  const qtdAnterior = useRef(servicos.length);
  const focarNovo = useRef(false);
  useEffect(() => {
    if (servicos.length > qtdAnterior.current && focarNovo.current) {
      const ultimo = servicos[servicos.length - 1];
      document.getElementById(`serv-${ultimo.id}-nome`)?.focus();
    }
    focarNovo.current = false;
    qtdAnterior.current = servicos.length;
  }, [servicos]);

  const alterar = (id, campo) => (e) => dispatch({ tipo: "servicoAlterar", id, campo, valor: e.target.value });

  return (
    <div className="etapa-servicos">
      {sugestoes.length > 0 && !limite && (
        <div className="etapa-servicos__sugestoes">
          <p>{T.sugestoesTitulo}</p>
          <div>
            {sugestoes.map((s) => (
              <button
                key={s.nome} type="button" className="etapa-servicos__sugestao"
                onClick={() => dispatch({ tipo: "servicoAdicionar", dados: { nome: s.nome, duracao: s.duracao } })}
              >
                <Plus size={15} aria-hidden="true" />{s.nome}
              </button>
            ))}
          </div>
        </div>
      )}

      <ErroGrupo id="servicos-erro">{erros.servicos}</ErroGrupo>
      {!servicos.length && !erros.servicos && <p className="etapa-servicos__vazio">{T.vazio}</p>}

      <ol className="etapa-servicos__lista">
        {servicos.map((s, i) => {
          const idBase = `serv-${s.id}`;
          const eNome = erros[`servico.${s.id}.nome`];
          const ePreco = erros[`servico.${s.id}.preco`];
          return (
            <li key={s.id} className="etapa-servicos__item">
              <div className="etapa-servicos__topo">
                <span className="etapa-servicos__num">{i + 1}</span>
                <button
                  type="button" className="etapa-servicos__remover"
                  onClick={() => dispatch({ tipo: "servicoRemover", id: s.id })}
                  aria-label={`${T.remover} ${s.nome || `serviço ${i + 1}`}`}
                >
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </div>
              <Campo id={`${idBase}-nome`} label={T.nome.label} erro={eNome}>
                <input
                  className="cad-input" type="text" autoCapitalize="sentences" placeholder={T.nome.placeholder}
                  value={s.nome} onChange={alterar(s.id, "nome")} {...ariaCampo(`${idBase}-nome`, eNome)}
                />
              </Campo>
              <div className="etapa-servicos__linha">
                <Campo id={`${idBase}-duracao`} label={T.duracao.label}>
                  <select className="cad-select" id={`${idBase}-duracao`} value={s.duracao} onChange={(e) => dispatch({ tipo: "servicoAlterar", id: s.id, campo: "duracao", valor: Number(e.target.value) })}>
                    {duracoes.map((d) => <option key={d} value={d}>{formatarDuracao(d)}</option>)}
                  </select>
                </Campo>
                <Campo id={`${idBase}-preco`} label={T.preco.label} erro={ePreco}>
                  <div className="cad-prefixo">
                    <span aria-hidden="true">R$</span>
                    <input
                      className="cad-input" type="text" inputMode="decimal" placeholder={T.preco.placeholder}
                      value={s.preco} onChange={alterar(s.id, "preco")} {...ariaCampo(`${idBase}-preco`, ePreco)}
                    />
                  </div>
                </Campo>
              </div>
            </li>
          );
        })}
      </ol>

      {!limite && (
        <button
          type="button" className="cad-adicionar"
          onClick={() => { focarNovo.current = true; dispatch({ tipo: "servicoAdicionar" }); }}
        >
          {T.adicionar}
        </button>
      )}
    </div>
  );
}
