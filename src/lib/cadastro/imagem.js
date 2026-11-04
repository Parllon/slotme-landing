// imagem.js — prepara a foto de perfil NO PRÓPRIO APARELHO antes de guardar:
// corta em quadrado (centro), reduz para LADO x LADO e salva como JPEG leve.
// Uma foto de celular de 4 MB vira algo em torno de 30–60 KB.

const LADO = 480;
const QUALIDADE = 0.82;
const MAX_ORIGINAL_MB = 20;

export class ErroFoto extends Error {
  constructor(codigo) { super(codigo); this.codigo = codigo; } // "tipo" | "grande" | "ler"
}

function carregar(arquivo) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(arquivo);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new ErroFoto("ler")); };
    img.src = url;
  });
}

export async function prepararFoto(arquivo) {
  if (!arquivo || !arquivo.type.startsWith("image/")) throw new ErroFoto("tipo");
  if (arquivo.size > MAX_ORIGINAL_MB * 1024 * 1024) throw new ErroFoto("grande");
  const img = await carregar(arquivo); // HEIC em navegador que não lê HEIC cai aqui ("ler")
  const lado = Math.min(img.naturalWidth, img.naturalHeight);
  if (!lado) throw new ErroFoto("ler");
  const sx = (img.naturalWidth - lado) / 2;
  const sy = (img.naturalHeight - lado) / 2;
  const destino = Math.min(LADO, lado);
  const canvas = document.createElement("canvas");
  canvas.width = destino;
  canvas.height = destino;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff"; // PNG transparente não vira fundo preto no JPEG
  ctx.fillRect(0, 0, destino, destino);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, sy, lado, lado, 0, 0, destino, destino);
  return canvas.toDataURL("image/jpeg", QUALIDADE);
}

// Tamanho aproximado (KB) de uma foto em data URL — para o resumo do e-mail.
export function tamanhoKb(dataUrl) {
  if (!dataUrl) return 0;
  const base64 = dataUrl.split(",")[1] || "";
  return Math.round((base64.length * 3) / 4 / 1024);
}
