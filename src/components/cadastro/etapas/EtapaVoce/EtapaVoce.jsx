import { Check } from "lucide-react";
import { intro, origens, voceTextos as T } from "../../../../data/cadastro";
import { apenasDigitos, ehGmail, emailValido, mascaraTelefone, sugestaoEmail } from "../../../../lib/cadastro/formatos";
import { Campo, ariaCampo } from "../../ui/Campo/Campo";
import { Opcoes } from "../../ui/Opcoes/Opcoes";
import "./EtapaVoce.css";

export function EtapaVoce({ estado, dispatch, erros }) {
  const { voce } = estado;
  const set = (campo) => (valor) => dispatch({ tipo: "campo", secao: "voce", campo, valor });

  // Colou "+55 21 9..."? Tira o 55 do país.
  const mudarWhats = (texto) => {
    let d = apenasDigitos(texto);
    if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
    set("whatsapp")(d.slice(0, 11));
  };

  const sugestao = sugestaoEmail(voce.email);
  const avisoNaoGmail = !sugestao && emailValido(voce.email) && !ehGmail(voce.email);

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
        {avisoNaoGmail && <p className="etapa-voce__aviso">{T.emailNaoGmail}</p>}
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
