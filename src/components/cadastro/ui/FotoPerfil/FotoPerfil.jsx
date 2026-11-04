import { useRef, useState } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { equipeTextos } from "../../../../data/cadastro";
import { ErroFoto, prepararFoto } from "../../../../lib/cadastro/imagem";
import "./FotoPerfil.css";

const T = equipeTextos.foto;

/**
 * Foto de perfil opcional: avatar redondo (foto ou inicial) + botões.
 * valor = data URL da foto já reduzida ("" = sem foto).
 */
export function FotoPerfil({ id, nome, titulo, subtitulo, valor, onChange }) {
  const input = useRef(null);
  const [preparando, setPreparando] = useState(false);
  const [erro, setErro] = useState("");
  const inicial = (nome || "?").trim()[0]?.toUpperCase() || "?";

  const escolher = async (e) => {
    const arquivo = e.target.files && e.target.files[0];
    e.target.value = ""; // permite escolher o mesmo arquivo de novo
    if (!arquivo) return;
    setErro("");
    setPreparando(true);
    try {
      onChange(await prepararFoto(arquivo));
    } catch (err) {
      setErro(err instanceof ErroFoto ? T.erros[err.codigo] : T.erros.ler);
    } finally {
      setPreparando(false);
    }
  };

  return (
    <div className="foto-perfil">
      <button
        type="button" className="foto-perfil__avatar" onClick={() => input.current?.click()}
        aria-label={valor ? T.trocarDe(nome) : T.adicionarDe(nome)} disabled={preparando}
      >
        {valor ? <img src={valor} alt="" /> : <span aria-hidden="true">{inicial}</span>}
        <span className="foto-perfil__camera" aria-hidden="true">
          {preparando ? <Loader2 size={14} className="foto-perfil__girando" /> : <Camera size={14} />}
        </span>
      </button>

      <div className="foto-perfil__info">
        {titulo && <strong>{titulo}</strong>}
        {subtitulo && <small>{subtitulo}</small>}
        <div className="foto-perfil__acoes">
          <button type="button" onClick={() => input.current?.click()} disabled={preparando}>
            {preparando ? T.preparando : valor ? T.trocar : T.adicionar}
          </button>
          {valor && !preparando && (
            <button type="button" className="foto-perfil__remover" onClick={() => { onChange(""); setErro(""); }} aria-label={T.removerDe(nome)}>
              <X size={13} aria-hidden="true" />{T.remover}
            </button>
          )}
        </div>
        {erro && <p className="campo__erro" role="alert" id={`${id}-erro`}>{erro}</p>}
      </div>

      <input ref={input} id={id} type="file" accept="image/*" hidden onChange={escolher} />
    </div>
  );
}
