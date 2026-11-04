/* =========================================================
   CADASTRO (teste grátis) — TODO o texto e as opções do fluxo
   em /cadastro/. Mesma regra do content.js: nenhum texto fixo
   dentro dos componentes.
   ========================================================= */

/* Configuração geral */
export const cadastroConfig = {
  diasTeste: 30,
  prazoRetorno: "até 24 horas úteis",
  // Página da política de privacidade (LGPD). PENDENTE: a página ainda não existe.
  politicaUrl: "/privacidade/",
  // Versão do texto do termo do teste — vai junto no pedido, para saber qual
  // versão a pessoa aceitou se o texto mudar no futuro.
  versaoTermo: "2026-11",
  dominioPaginas: "agendamentos.app.br",
  maxServicos: 30,
  maxProfissionais: 10,
};

/* Etapas (a ordem aqui é a ordem do fluxo) */
export const etapas = [
  { id: "voce", rotulo: "Você", titulo: "Vamos começar por você", subtitulo: "É por aqui que eu falo com você durante o teste." },
  { id: "negocio", rotulo: "Negócio", titulo: "Sobre o seu negócio", subtitulo: "Isso vai para a sua página de agendamento." },
  { id: "servicos", rotulo: "Serviços", titulo: "O que você oferece", subtitulo: "Cadastre cada serviço uma vez só. Na próxima etapa você diz quem faz o quê." },
  { id: "equipe", rotulo: "Equipe", titulo: "Quem atende", subtitulo: "Cada pessoa ganha a própria agenda no Google." },
  { id: "horarios", rotulo: "Horários", titulo: "Quando você atende", subtitulo: "Seus clientes só vão ver horários livres dentro deste período." },
  { id: "visual", rotulo: "Visual", titulo: "A cara da sua página", subtitulo: "Escolha o estilo que mais combina com o seu negócio. Dá pra trocar depois." },
  { id: "revisao", rotulo: "Revisão", titulo: "Confira antes de enviar", subtitulo: "Toque em “Editar” para corrigir qualquer parte." },
];

/* Topo da primeira etapa */
export const intro = {
  selo: "Teste grátis por 30 dias",
  destaques: ["Sem cartão de crédito", "Sem cobrança automática", "Leva uns 5 minutos"],
  tenhaEmMaos: "Tenha em mãos: seus serviços (com duração e preço) e seus horários de atendimento.",
};

/* Rascunho salvo no aparelho */
export const rascunhoTextos = {
  aviso: "Continuamos de onde você parou.",
  recomecar: "Começar do zero",
};

/* Navegação */
export const navTextos = {
  voltar: "Voltar",
  continuar: "Continuar",
  enviar: "Enviar cadastro",
  enviando: "Enviando...",
  etapaDe: (atual, total) => `Etapa ${atual} de ${total}`,
  corrigir: "Falta pouco: confira os campos destacados.",
};

/* Etapa 1 — Você */
export const voceTextos = {
  nome: { label: "Seu nome", placeholder: "Como você gosta de ser chamada(o)" },
  whatsapp: { label: "Seu WhatsApp", placeholder: "(21) 98888-7777", hint: "Vou te mandar o link da sua página por aqui." },
  email: {
    label: "Seu e-mail do Google",
    placeholder: "voce@gmail.com",
    hint: "Use o e-mail da conta Google do seu celular. A sua agenda vai aparecer nele.",
  },
  emailConfirma: { label: "Repita o e-mail", placeholder: "Só pra evitar erro de digitação" },
  emailSugestao: (sugestao) => `Você quis dizer ${sugestao}?`,
  emailSugestaoBotao: "Sim, corrigir",
  emailNaoGmail: "Confirme que esse e-mail tem conta Google: é nele que o convite da agenda vai chegar.",
  origem: { label: "Como você conheceu o SlotMe?", outroPlaceholder: "Conta pra gente" },
};

export const origens = [
  { valor: "instagram", rotulo: "Instagram" },
  { valor: "facebook", rotulo: "Facebook" },
  { valor: "indicacao", rotulo: "Indicação" },
  { valor: "google", rotulo: "Google" },
  { valor: "olx", rotulo: "OLX" },
  { valor: "outro", rotulo: "Outro" },
];

/* Etapa 2 — Negócio */
export const negocioTextos = {
  nome: { label: "Nome do salão, estúdio ou barbearia", placeholder: "ex.: Studio Bella Mãos" },
  especialidade: { label: "Qual é a sua especialidade?" },
  cidade: { label: "Cidade", placeholder: "ex.: Duque de Caxias" },
  bairro: { label: "Bairro (opcional)", placeholder: "ex.: Centro" },
  instagram: { label: "Instagram do negócio (opcional)", placeholder: "@seunegocio" },
  linkPreview: "Seu link vai ficar parecido com:",
  linkNota: "Eu confirmo o endereço final com você.",
};

/* Especialidades: definem o vocabulário da página (perfil), o tema sugerido e
   as sugestões de serviço. Os valores de "perfil" e "tema" são os mesmos do
   sistema de agendamento (app/temas.js). */
export const especialidades = [
  {
    valor: "unhas", rotulo: "Manicure / Nail designer", perfil: "profissional", tema: "tema_1",
    sugestoes: [
      { nome: "Mão", duracao: 45 }, { nome: "Pé", duracao: 45 }, { nome: "Pé e mão", duracao: 90 },
      { nome: "Esmaltação em gel", duracao: 60 }, { nome: "Alongamento em gel", duracao: 150 },
      { nome: "Manutenção de alongamento", duracao: 120 },
    ],
  },
  {
    valor: "barbearia", rotulo: "Barbearia", perfil: "barbeiro", tema: "tema_2",
    sugestoes: [
      { nome: "Corte", duracao: 30 }, { nome: "Barba", duracao: 30 }, { nome: "Corte + barba", duracao: 60 },
      { nome: "Pezinho", duracao: 15 }, { nome: "Sobrancelha", duracao: 15 }, { nome: "Pigmentação", duracao: 45 },
    ],
  },
  {
    valor: "cabelo", rotulo: "Cabeleireiro(a)", perfil: "cabeleireiro", tema: "tema_4",
    sugestoes: [
      { nome: "Corte feminino", duracao: 60 }, { nome: "Escova", duracao: 45 }, { nome: "Coloração", duracao: 120 },
      { nome: "Mechas", duracao: 180 }, { nome: "Hidratação", duracao: 60 }, { nome: "Progressiva", duracao: 180 },
    ],
  },
  {
    valor: "sobrancelha", rotulo: "Sobrancelhas e cílios", perfil: "designer", tema: "tema_5",
    sugestoes: [
      { nome: "Design de sobrancelha", duracao: 30 }, { nome: "Design com henna", duracao: 45 },
      { nome: "Brow lamination", duracao: 60 }, { nome: "Extensão de cílios", duracao: 120 },
      { nome: "Manutenção de cílios", duracao: 90 }, { nome: "Lash lifting", duracao: 60 },
    ],
  },
  {
    valor: "estetica", rotulo: "Estética, spa ou massagem", perfil: "terapeuta", tema: "tema_3",
    sugestoes: [
      { nome: "Limpeza de pele", duracao: 90 }, { nome: "Massagem relaxante", duracao: 60 },
      { nome: "Drenagem linfática", duracao: 60 }, { nome: "Peeling", duracao: 45 },
    ],
  },
  {
    valor: "depilacao", rotulo: "Depilação", perfil: "especialista", tema: "tema_7",
    sugestoes: [
      { nome: "Buço", duracao: 15 }, { nome: "Axila", duracao: 15 }, { nome: "Virilha", duracao: 30 },
      { nome: "Perna inteira", duracao: 45 },
    ],
  },
  {
    valor: "tatuagem", rotulo: "Tatuagem ou piercing", perfil: "tatuador", tema: "tema_6",
    sugestoes: [
      { nome: "Orçamento", duracao: 30 }, { nome: "Sessão de tatuagem", duracao: 180 }, { nome: "Piercing", duracao: 30 },
    ],
  },
  { valor: "outro", rotulo: "Outra", perfil: "profissional", tema: "tema_8", sugestoes: [] },
];

/* Etapa 3 — Serviços */
export const servicosTextos = {
  sugestoesTitulo: "Toque para adicionar rápido:",
  nome: { label: "Nome do serviço", placeholder: "ex.: Pé e mão" },
  duracao: { label: "Duração" },
  preco: { label: "Preço", placeholder: "0,00" },
  remover: "Remover",
  adicionar: "+ Adicionar serviço",
  vazio: "Adicione pelo menos um serviço. Você pode usar as sugestões acima.",
};

/* Durações aceitas (minutos). Cobre de sobrancelha (15) a mega hair (4h). */
export const duracoes = [15, 20, 30, 40, 45, 50, 60, 75, 90, 105, 120, 150, 180, 210, 240];

/* Etapa 4 — Equipe */
export const equipeTextos = {
  donoAtende: { label: "Eu também atendo clientes", hint: "Desmarque se você só administra e não atende." },
  voceMarcador: "Você",
  nome: { label: "Nome", placeholder: "ex.: Ana Souza" },
  email: {
    label: "E-mail do Google (opcional)",
    placeholder: "ana@gmail.com",
    hint: "Se preencher, a pessoa também recebe a própria agenda no celular dela.",
  },
  todosServicos: "Faz todos os serviços",
  quaisServicos: "Quais serviços essa pessoa faz?",
  horarioDiferente: "Tem horário diferente do salão",
  horarioObs: { label: "Descreva o horário", placeholder: "ex.: só terças e quintas, das 13h às 19h" },
  adicionar: "+ Adicionar profissional",
  remover: "Remover",
  vazio: "Adicione pelo menos uma pessoa que atende.",
  semNome: (n) => `Profissional ${n}`,
  fotoOpcional: "Foto opcional · aparece na sua página",
  foto: {
    adicionar: "Adicionar foto",
    trocar: "Trocar foto",
    remover: "Remover",
    preparando: "Preparando...",
    adicionarDe: (nome) => `Adicionar foto${nome ? ` de ${nome}` : ""}`,
    trocarDe: (nome) => `Trocar foto${nome ? ` de ${nome}` : ""}`,
    removerDe: (nome) => `Remover foto${nome ? ` de ${nome}` : ""}`,
    erros: {
      tipo: "Escolha um arquivo de imagem (JPG ou PNG).",
      grande: "Essa imagem é grande demais. Escolha uma de até 20 MB.",
      ler: "Não consegui abrir essa imagem. Tente uma foto em JPG ou PNG.",
    },
  },
  custoExtra: (n) => `${n} profissionais: no plano, cada profissional além do primeiro custa + R$ 9,90/mês. No teste é tudo grátis.`,
};

/* Etapa 5 — Horários */
export const horariosTextos = {
  aberto: "Aberto",
  fechado: "Fechado",
  abre: "Abre",
  fecha: "Fecha",
  ate: "às",
  copiar: "Usar o horário de segunda em todos os dias abertos",
  pausa: {
    label: "Fazer uma pausa todo dia (ex.: almoço)",
    inicio: "Início",
    fim: "Fim",
    modoLegenda: "A pausa é no mesmo horário para todos?",
    modos: [
      { valor: "todos", rotulo: "Mesmo horário para todos" },
      { valor: "individual", rotulo: "Cada profissional tem o seu" },
    ],
    pessoaFaz: "Faz pausa",
    pessoaNaoFaz: "Sem pausa",
    semNome: (n) => `Profissional ${n}`,
  },
};

export const diasSemana = [
  { dia: 1, curto: "Seg", nome: "Segunda" },
  { dia: 2, curto: "Ter", nome: "Terça" },
  { dia: 3, curto: "Qua", nome: "Quarta" },
  { dia: 4, curto: "Qui", nome: "Quinta" },
  { dia: 5, curto: "Sex", nome: "Sexta" },
  { dia: 6, curto: "Sáb", nome: "Sábado" },
  { dia: 0, curto: "Dom", nome: "Domingo" },
];

/* Etapa 6 — Visual. Cores convertidas de app/temas.js (ivory/wine/card/clay/blush). */
export const visualTextos = {
  sugerido: "Sugerido",
  automatico: { rotulo: "Escolham por mim", descricao: "Eu escolho o estilo que mais combina com o seu negócio." },
  legenda: "Estilo da página",
  previewBotao: "Agendar",
  previewNegocio: "Seu negócio",
  planoTitulo: "Depois do teste, qual plano te interessa?",
  planoHint: "Não é compromisso: no fim dos 30 dias você decide se continua.",
};

export const temas = [
  { id: "tema_1", nome: "Feminino clássico", vibe: "Vinho e marfim", fundo: "#fbf6f0", primaria: "#5c2330", cartao: "#ffffff", texto2: "#c98a8e", borda: "#e6b9bc", serifa: true },
  { id: "tema_2", nome: "Masculino clássico", vibe: "Preto e dourado", fundo: "#121110", primaria: "#c6a04a", cartao: "#1e1c18", texto2: "#a09680", borda: "#5c4e2c", serifa: false },
  { id: "tema_3", nome: "Spa e estética", vibe: "Verde e branco", fundo: "#f2f8f4", primaria: "#266e59", cartao: "#ffffff", texto2: "#5f917d", borda: "#9bd0b9", serifa: true },
  { id: "tema_4", nome: "Hair salon", vibe: "Rosa e branco", fundo: "#fcf6fa", primaria: "#c83462", cartao: "#ffffff", texto2: "#ac738e", borda: "#f0b6d0", serifa: true },
  { id: "tema_5", nome: "Beauty studio", vibe: "Nude e caramelo", fundo: "#fcf7f0", primaria: "#94663e", cartao: "#fffcf7", texto2: "#b29473", borda: "#e1c8aa", serifa: true },
  { id: "tema_6", nome: "Ink & art", vibe: "Preto e vermelho", fundo: "#0e0d0c", primaria: "#d22d2d", cartao: "#1a1616", texto2: "#a28282", borda: "#581616", serifa: false },
  { id: "tema_7", nome: "Luxo premium", vibe: "Pérola e champanhe", fundo: "#fcfaf4", primaria: "#ac8c52", cartao: "#fffefa", texto2: "#b6a58a", borda: "#e4d4b4", serifa: true },
  { id: "tema_8", nome: "Minimalista", vibe: "Branco e preto", fundo: "#fafafa", primaria: "#18181b", cartao: "#ffffff", texto2: "#71717a", borda: "#d4d4d8", serifa: false },
];

export const planos = [
  { valor: "basico", rotulo: "Básico", detalhe: "R$ 49,90/mês · página em layout pronto" },
  { valor: "completo", rotulo: "Completo", detalhe: "R$ 89,90/mês · página com as cores e fotos do seu salão" },
  { valor: "nao_sei", rotulo: "Ainda não sei", detalhe: "Decido durante o teste" },
];

/* Etapa 7 — Revisão */
export const revisaoTextos = {
  editar: "Editar",
  convite: {
    titulo: "O convite da sua agenda vai para:",
    texto: "Confira se está certo. Se o e-mail estiver errado, a agenda não chega até você.",
  },
  secoes: { voce: "Você", negocio: "Negócio", servicos: "Serviços", equipe: "Equipe", horarios: "Horários", visual: "Visual" },
  rotulos: {
    nome: "Nome", whatsapp: "WhatsApp", email: "E-mail Google", origem: "Conheceu por",
    negocio: "Negócio", especialidade: "Especialidade", local: "Local", instagram: "Instagram", link: "Link sugerido",
    tema: "Estilo", plano: "Plano de interesse", pausa: "Pausa", fechado: "Fechado", todos: "todos os serviços",
    pausaTodos: "(todos)", pausaDe: (nome) => `Pausa · ${nome}`, semPausa: "sem pausa", comFoto: "com foto",
  },
  observacoes: { label: "Quer contar mais alguma coisa? (opcional)", placeholder: "ex.: atendo só com hora marcada aos sábados" },
  aceiteTeste: (dias) =>
    `Entendi que o teste é grátis por ${dias} dias, sem cartão e sem cobrança automática. No fim, eu decido se quero continuar. O aviso por WhatsApp é um bônus e pode falhar; o lembrete oficial é pelo Telegram.`,
  aceiteLgpd: { antes: "Autorizo o uso dos meus dados para criar minha conta de teste e para entrarem em contato comigo, conforme a ", link: "política de privacidade", depois: "." },
  erroEnvio: "Não consegui enviar agora. Seus dados continuam salvos aqui: tente de novo ou me chame no WhatsApp.",
  whatsappErro: "Chamar no WhatsApp",
};

/* Tela final */
export const sucessoTextos = {
  titulo: (nome) => `Recebi seu cadastro${nome ? `, ${nome}` : ""}!`,
  protocolo: "Seu protocolo:",
  proximosTitulo: "O que acontece agora",
  proximos: (email, prazo) => [
    { titulo: "Eu confiro seus dados", texto: `Monto sua página em ${prazo}.` },
    { titulo: "Você aceita o convite do Google", texto: `Chega um e-mail do Google Agenda em ${email}. É só abrir e tocar em “Adicionar agenda”.` },
    { titulo: "Seu teste começa", texto: "Te mando o link da sua página pelo WhatsApp. A partir daí são 30 dias grátis." },
  ],
  whatsappBotao: "Falar comigo no WhatsApp",
  whatsappMensagem: (protocolo, negocio) => `Oi! Acabei de fazer o cadastro do teste grátis (${protocolo}) para ${negocio}.`,
  voltarSite: "Voltar para o site",
};

/* Mensagens de validação */
export const erros = {
  obrigatorio: "Preencha este campo.",
  nomeCurto: "Digite o nome completo (pelo menos 2 letras).",
  whatsapp: "Digite um celular com DDD, ex.: (21) 98888-7777.",
  email: "Esse e-mail não parece válido.",
  emailConfirma: "Os e-mails não são iguais.",
  origem: "Escolha uma opção.",
  especialidade: "Escolha a sua especialidade.",
  servicosVazio: "Adicione pelo menos um serviço.",
  servicoDuplicado: "Já existe um serviço com esse nome.",
  preco: "Digite o preço, ex.: 35 ou 35,50.",
  equipeVazia: "Adicione pelo menos uma pessoa que atende.",
  servicosDoProfissional: "Escolha pelo menos um serviço.",
  horarioObs: "Descreva o horário dessa pessoa.",
  semDiaAberto: "Deixe pelo menos um dia aberto.",
  fechaAntes: "O horário de fechar precisa ser depois do de abrir.",
  pausaInvalida: "O fim da pausa precisa ser depois do início.",
  pausaNenhuma: "Ninguém está com pausa marcada. Ligue para quem pausa ou desligue a pausa.",
  aceiteTeste: "Para continuar, confirme que entendeu como funciona o teste.",
  aceiteLgpd: "Para continuar, autorize o uso dos dados.",
};
