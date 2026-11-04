import { Trash2 } from "lucide-react";
import { cadastroConfig, equipeTextos as T } from "../../../../data/cadastro";
import { Campo, ErroGrupo, ariaCampo } from "../../ui/Campo/Campo";
import { Opcoes } from "../../ui/Opcoes/Opcoes";
import { Alternador } from "../../ui/Alternador/Alternador";
import { FotoPerfil } from "../../ui/FotoPerfil/FotoPerfil";
import "./EtapaEquipe.css";

/** Parte comum a "você" e a cada profissional: quais serviços + horário diferente. */
function ServicosEHorario({ idBase, pessoa, servicos, alterar, erroServicos, erroHorario }) {
  return (
    <>
      <Alternador id={`${idBase}-todos`} label={T.todosServicos} checked={pessoa.todos} onChange={(v) => alterar("todos", v)} compacto />
      {!pessoa.todos && (
        <Opcoes
          nome={`${idBase}-servicos`} legenda={T.quaisServicos} multiplo
          opcoes={servicos.map((s) => ({ valor: s.id, rotulo: s.nome || "—" }))}
          valor={pessoa.servicos} onChange={(v) => alterar("servicos", v)}
          erro={erroServicos} idErro={`${idBase}-servicos-erro`}
        />
      )}
      <Alternador id={`${idBase}-horario`} label={T.horarioDiferente} checked={pessoa.horarioDiferente} onChange={(v) => alterar("horarioDiferente", v)} compacto />
      {pessoa.horarioDiferente && (
        <Campo id={`${idBase}-horario-obs`} label={T.horarioObs.label} erro={erroHorario}>
          <input
            className="cad-input" type="text" placeholder={T.horarioObs.placeholder}
            value={pessoa.horarioObs} onChange={(e) => alterar("horarioObs", e.target.value)}
            {...ariaCampo(`${idBase}-horario-obs`, erroHorario)}
          />
        </Campo>
      )}
    </>
  );
}

export function EtapaEquipe({ estado, dispatch, erros }) {
  const { equipe, servicos, voce } = estado;
  const total = (equipe.donoAtende ? 1 : 0) + equipe.profissionais.length;
  const limite = total >= cadastroConfig.maxProfissionais;

  return (
    <div className="etapa-equipe">
      <Alternador
        id="equipe-dono" label={T.donoAtende.label} hint={T.donoAtende.hint}
        checked={equipe.donoAtende} onChange={(valor) => dispatch({ tipo: "equipeDonoAtende", valor })}
      />

      <ErroGrupo id="equipe-erro">{erros.equipe}</ErroGrupo>

      {equipe.donoAtende && (
        <section className="etapa-equipe__pessoa" aria-label={voce.nome || T.voceMarcador}>
          <div className="etapa-equipe__topo">
            <FotoPerfil
              id="dono-foto" nome={voce.nome} titulo={voce.nome || T.voceMarcador}
              subtitulo={`${T.voceMarcador} · ${voce.email}`}
              valor={equipe.dono.foto || ""} onChange={(valor) => dispatch({ tipo: "equipeDonoAlterar", campo: "foto", valor })}
            />
          </div>
          <ServicosEHorario
            idBase="dono" pessoa={equipe.dono} servicos={servicos}
            alterar={(campo, valor) => dispatch({ tipo: "equipeDonoAlterar", campo, valor })}
            erroServicos={erros["dono.servicos"]} erroHorario={erros["dono.horarioObs"]}
          />
        </section>
      )}

      {equipe.profissionais.map((p, i) => {
        const idBase = `prof-${p.id}`;
        const alterar = (campo, valor) => dispatch({ tipo: "profAlterar", id: p.id, campo, valor });
        const eNome = erros[`prof.${p.id}.nome`];
        const eEmail = erros[`prof.${p.id}.email`];
        return (
          <section key={p.id} className="etapa-equipe__pessoa" aria-label={p.nome || `Profissional ${i + 1}`}>
            <div className="etapa-equipe__topo">
              <FotoPerfil
                id={`${idBase}-foto`} nome={p.nome} titulo={p.nome.trim() || T.semNome(i + 1)}
                subtitulo={T.fotoOpcional} valor={p.foto || ""} onChange={(valor) => alterar("foto", valor)}
              />
              <button
                type="button" className="etapa-equipe__remover"
                onClick={() => dispatch({ tipo: "profRemover", id: p.id })}
                aria-label={`${T.remover} ${p.nome || `profissional ${i + 1}`}`}
              >
                <Trash2 size={17} aria-hidden="true" />
              </button>
            </div>
            <Campo id={`${idBase}-nome`} label={T.nome.label} erro={eNome}>
              <input
                className="cad-input" type="text" autoCapitalize="words" placeholder={T.nome.placeholder}
                value={p.nome} onChange={(e) => alterar("nome", e.target.value)} {...ariaCampo(`${idBase}-nome`, eNome)}
              />
            </Campo>
            <Campo id={`${idBase}-email`} label={T.email.label} hint={T.email.hint} erro={eEmail}>
              <input
                className="cad-input" type="email" inputMode="email" autoCapitalize="none" spellCheck={false}
                placeholder={T.email.placeholder} value={p.email} onChange={(e) => alterar("email", e.target.value.trim())}
                {...ariaCampo(`${idBase}-email`, eEmail, T.email.hint)}
              />
            </Campo>
            <ServicosEHorario
              idBase={idBase} pessoa={p} servicos={servicos} alterar={alterar}
              erroServicos={erros[`prof.${p.id}.servicos`]} erroHorario={erros[`prof.${p.id}.horarioObs`]}
            />
          </section>
        );
      })}

      {!limite && (
        <button type="button" className="cad-adicionar" onClick={() => dispatch({ tipo: "profAdicionar" })}>{T.adicionar}</button>
      )}
      {total > 1 && <p className="etapa-equipe__custo">{T.custoExtra(total)}</p>}
    </div>
  );
}
