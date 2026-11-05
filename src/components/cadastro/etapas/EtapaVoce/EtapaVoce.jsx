import { Check, Smartphone } from "lucide-react";
import { intro, origens, voceTextos as T } from "../../../../data/cadastro";
import { apenasDigitos, mascaraTelefone, sugestaoEmail, tipoEmail } from "../../../../lib/cadastro/formatos";
import { Campo, ariaCampo } from "../../ui/Campo/Campo";
import { Opcoes } from "../../ui/Opcoes/Opcoes";
import { Alternador } from "../../ui/Alternador/Alternador";
import "./EtapaVoce.css";

// Colou "+55 21 9..."? Tira o 55 do país.
function soCelular(texto) {
  let d = apenasDigitos(texto);
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  return d.slice(0, 11);
}

export function EtapaVoce({ estado, dispatch, erros }) {
  const { voce, avisos } = estado;
  const set = (campo) => (valor) => dispatch({ tipo: "campo", secao: "voce", campo, valor });
  const setAviso = (campo) => (valor) => dispatch({ tipo: "campo", secao: "avisos", campo, valor });
  const mudarWhats = (texto) => set("whatsapp")(soCelular(texto));

  const sugestao = sugestaoEmail(voce.email);
  const icloud = !sugestao && tipoEmail(voce.email) === "icloud";

  return (
    <div className="etapa-voce">
      <div className="etapa-voce__intro">
        <span className="etapa-voce__selo">{intro.selo}</span>
        <ul className="etapa-voce__destaques">
          {intro.destaques.map((d) => (
            <li key={d}><Check size={16} strokeWidth={3} aria-hidden="true" />{d}</li>
          ))}
        </ul>
        <p className="etapa-voce__em-maos">{intro.tenhaEmMaos}</p>
      </div>

      <Campo id="voce-nome" label={T.nome.label} erro={erros["voce.nome"]}>
        <input
          className="cad-input" type="text" autoComplete="name" autoCapitalize="words"
          placeholder={T.nome.placeholder} value={voce.nome}
          onChange={(e) => set("nome")(e.target.value)}
          {...ariaCampo("voce-nome", erros["voce.nome"])}
        />
      </Campo>

      <Campo id="voce-whatsapp" label={T.whatsapp.label} hint={T.whatsapp.hint} erro={erros["voce.whatsapp"]}>
        <input
          className="cad-input" type="tel" inputMode="numeric" autoComplete="tel-national"
          placeholder={T.whatsapp.placeholder} value={mascaraTelefone(voce.whatsapp)}
          onChange={(e) => mudarWhats(e.target.value)}
          {...ariaCampo("voce-whatsapp", erros["voce.whatsapp"], T.whatsapp.hint)}
        />
      </Campo>

      <div className="etapa-voce__avisos">
        <Alternador id="avisos-ativo" label={T.avisos.label} hint={T.avisos.hint} checked={avisos.ativo} onChange={setAviso("ativo")} />
        {avisos.ativo && (
          <Alternador id="avisos-outro" compacto label={T.avisos.outro} checked={avisos.outro} onChange={setAviso("outro")} />
        )}
        {avisos.ativo && avisos.outro && (
          <Campo id="avisos-numero" label={T.avisos.numeroLabel} hint={T.avisos.numeroHint} erro={erros["avisos.numero"]}>
            <input
              className="cad-input" type="tel" inputMode="numeric" autoComplete="off"
              placeholder={T.whatsapp.placeholder} value={mascaraTelefone(avisos.numero)}
              onChange={(e) => setAviso("numero")(soCelular(e.target.value))}
              {...ariaCampo("avisos-numero", erros["avisos.numero"], T.avisos.numeroHint)}
            />
          </Campo>
        )}
      </div>

      <Campo id="voce-email" label={T.email.label} hint={T.email.hint} erro={erros["voce.email"]}>
        <input
          className="cad-input" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false}
          placeholder={T.email.placeholder} value={voce.email}
          onChange={(e) => set("email")(e.target.value.trim())}
          {...ariaCampo("voce-email", erros["voce.email"], T.email.hint)}
        />
        {sugestao && (
          <div className="etapa-voce__sugestao" role="status">
            <span>{T.emailSugestao(sugestao)}</span>
            <button type="button" onClick={() => { set("email")(sugestao); set("emailConfirma")(""); }}>{T.emailSugestaoBotao}</button>
          </div>
        )}
        {icloud && (
          <div className="etapa-voce__icloud" role="status">
            <Smartphone size={20} aria-hidden="true" />
            <p><strong>{T.emailIcloud.titulo}</strong> {T.emailIcloud.texto}</p>
          </div>
        )}
      </Campo>

      <Campo id="voce-email2" label={T.emailConfirma.label} erro={erros["voce.emailConfirma"]}>
        <input
          className="cad-input" type="email" inputMode="email" autoComplete="off" autoCapitalize="none" spellCheck={false}
          placeholder={T.emailConfirma.placeholder} value={voce.emailConfirma}
          onChange={(e) => set("emailConfirma")(e.target.value.trim())}
          {...ariaCampo("voce-email2", erros["voce.emailConfirma"])}
        />
      </Campo>

      <Opcoes
        nome="origem" legenda={T.origem.label} opcoes={origens}
        valor={voce.origem} onChange={set("origem")}
        erro={erros["voce.origem"]} idErro="voce-origem-erro"
      />
      {voce.origem === "outro" && (
        <Campo id="voce-origem-outro" erro={erros["voce.origemOutro"]}>
          <input
            className="cad-input" type="text" placeholder={T.origem.outroPlaceholder} value={voce.origemOutro}
            onChange={(e) => set("origemOutro")(e.target.value)} aria-label={T.origem.outroPlaceholder}
            {...ariaCampo("voce-origem-outro", erros["voce.origemOutro"])}
          />
        </Campo>
      )}
    </div>
  );
}
