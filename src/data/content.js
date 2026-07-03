import {
  Clock, AlertTriangle, LayoutGrid, HelpCircle,
  Layout, Users, Bell, Globe,
  Star,
} from "lucide-react";

import flow1 from "../assets/screenshots/studio-1-profissional.jpg";
import flow2 from "../assets/screenshots/studio-2-servico.jpg";
import flow3 from "../assets/screenshots/studio-3-horario.jpg";
import flow4 from "../assets/screenshots/studio-4-dados.jpg";
import flow5 from "../assets/screenshots/studio-5-revisar.jpg";
import temaNavalha from "../assets/screenshots/navalha-1-profissional.jpg";
import temaStudio from "../assets/screenshots/studio-1-profissional.jpg";
import inicioStudioBeauty from "../assets/screenshots/studio-beauty-inicio.jpg";
import inicioByaMarcondes from "../assets/screenshots/bya-marcondes-inicio.jpg";

import segManicures from "../assets/segments/manicures.jpg";
import segCabeleireiras from "../assets/segments/cabeleireiras.jpg";
import segBarbearias from "../assets/segments/barbearias.jpg";
import segEsteticistas from "../assets/segments/esteticistas.jpg";
import segLash from "../assets/segments/lash-designers.jpg";
import segMaquiadoras from "../assets/segments/maquiadoras.jpg";
import segDepiladoras from "../assets/segments/depiladoras.jpg";
import segMasso from "../assets/segments/massoterapeutas.jpg";
import segPodologas from "../assets/segments/podologas.jpg";

/* Marca / config global */
export const brand = {
  name: "SlotMe",
  tagline: "Agendamento + Google Calendar",
  domain: "slotme.agendamentos.app.br",
};

export const whatsapp = {
  phone: "5522981290841",
  message: "Oi! Quero saber mais sobre o SlotMe.",
};

/* Navegação (Header / Footer) */
export const navLinks = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#recursos", label: "Recursos" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
];

/* Hero */
export const hero = {
  eyebrow: "Agendamento online + Google Calendar",
  title: "Sua agenda organizada sozinha.",
  highlight: "Seus clientes marcam online",
  titleEnd: ", você só confere no Google Calendar.",
  subtitle:
    "O SlotMe é a página de agendamento do seu salão ou barbearia. O cliente escolhe serviço, profissional e horário — e o compromisso cai direto na sua agenda Google, a mesma que você já usa hoje no celular. Sem sistema novo pra aprender, sem plantão respondendo mensagem.",
  note: "Sem fidelidade. Cancele quando quiser.",
};

/* Carrossel do fluxo de agendamento no Hero — telas reais de um cliente SlotMe
   (Studio Beleza), capturadas em formato mobile direto da página em produção. */
export const flowSteps = [
  { image: flow1, step: "1. Profissional", caption: "O cliente escolhe quem vai atender." },
  { image: flow2, step: "2. Serviço", caption: "Serviços e preços, sempre atualizados." },
  { image: flow3, step: "3. Horário", caption: "Só aparece o que está realmente livre." },
  { image: flow4, step: "4. Dados", caption: "Nome e WhatsApp, pra confirmar o agendamento." },
  { image: flow5, step: "5. Confirmar", caption: "Revisa tudo e confirma — pronto." },
];

/* Comparação visual: cada cliente com a cara do próprio salão (usada para sustentar
   o diferencial da landing page personalizada do plano Completo). */
export const themeComparison = [
  { image: temaNavalha, name: "Navalha de Ouro", vibe: "Masculino, preto e dourado" },
  { image: temaStudio, name: "Studio Beleza", vibe: "Delicado, rosa e branco" },
];

/* Clientes reais com página de agendamento SlotMe já no ar. */
export const clients = [
  { name: "Studio Beauty", service: "Sobrancelhas e cílios", url: "https://studiobeauty.myvisual.com.br/", image: inicioStudioBeauty },
  { name: "Bya Marcondes", service: "Designer de unhas", url: "https://byamarcondes.myvisual.com.br/", image: inicioByaMarcondes },
];

/* Segmentos de público (cards de foto logo após o Hero) */
export const segmentsData = [
  { name: "Manicures", image: segManicures },
  { name: "Cabeleireiras", image: segCabeleireiras },
  { name: "Barbearias", image: segBarbearias },
  { name: "Esteticistas", image: segEsteticistas },
  { name: "Lash designers", image: segLash },
  { name: "Maquiadoras", image: segMaquiadoras },
  { name: "Depiladoras", image: segDepiladoras },
  { name: "Massoterapeutas", image: segMasso },
  { name: "Podólogas", image: segPodologas },
];

/* Barra de dores */
export const painPoints = [
  {
    icon: Clock,
    title: "Horas perdidas no WhatsApp",
    description: "Você para o que está fazendo o dia inteiro pra confirmar, remarcar ou responder \"tem horário às 15h?\".",
  },
  {
    icon: AlertTriangle,
    title: "Cliente que falta sem avisar",
    description: "O horário fica reservado, ninguém aparece, e aquele espaço da agenda vira prejuízo.",
  },
  {
    icon: LayoutGrid,
    title: "Agenda bagunçada",
    description: "Caderno rasurado, dois clientes marcados no mesmo horário, compromisso esquecido.",
  },
  {
    icon: HelpCircle,
    title: "Medo de sistema complicado",
    description: "Você já tentou um app cheio de tela e desistiu porque não tinha tempo de aprender algo novo.",
  },
];

/* Como funciona */
export const howItWorks = [
  {
    title: "Seu cliente acessa seu link",
    description: "Ele escolhe o serviço, o profissional e o horário disponível direto na sua página de agendamento — sem precisar te mandar mensagem.",
  },
  {
    title: "Cai direto no seu Google Calendar",
    description: "O horário aparece automaticamente na agenda que você já usa no celular, com os dados do cliente e do serviço.",
  },
  {
    title: "Lembrete automático antes do horário",
    description: "Pra reduzir as faltas, o cliente recebe um lembrete pelo Telegram — e, como bônus, também pelo WhatsApp — antes de ir.",
  },
];

/* Diferencial central */
export const differential = {
  eyebrow: "O diferencial do SlotMe",
  title: "Você não precisa aprender nada novo.",
  subtitle:
    "Enquanto outros sistemas pedem pra você migrar tudo pra um painel novo, o SlotMe entra na ferramenta que você já usa: o Google Calendar. Você continua enxergando sua agenda do jeito que sempre viu — só que agora ela se preenche sozinha.",
  bullets: [
    "Você já sabe usar — é a mesma agenda de sempre",
    "Sem tela nova pra decorar, sem treinamento",
    "Funciona no Google Calendar do seu celular ou computador",
  ],
  /* Painel ilustrativo: agenda do dia se preenchendo sozinha (eventos fictícios) */
  panel: {
    title: "Google Calendar",
    events: [
      { title: "Corte + barba — João", sub: "Hoje · 14:00", tone: "primary" },
      { title: "Escova — Mariana", sub: "Hoje · 15:30", tone: "accent" },
      { title: "Sobrancelha — Ana", sub: "Hoje · 16:00", tone: "primary" },
    ],
    note: "Agendamentos entram sozinhos, em tempo real",
  },
};

/* Recursos — blocos editoriais alternados ("O que você ganha").
   `image` é opcional: quando não houver captura real ainda, o bloco mostra um
   placeholder listrado com a legenda `placeholder`. */
export const featureRows = [
  {
    icon: Layout,
    tag: "Página 24h",
    title: "Cliente marca sozinho, a qualquer hora",
    description: "Coloque o link da sua página no WhatsApp e na bio do Instagram. O cliente escolhe serviço, profissional e horário em segundos, sem te interromper.",
    visual: "phone",
    image: flow1,
    imageAlt: "Página de agendamento do SlotMe no celular",
  },
  {
    icon: Bell,
    tag: "Lembrete automático",
    title: "Telegram avisa por você, no automático",
    description: "Lembrete automático pelo Telegram antes do horário — e, como bônus, também pelo WhatsApp. Você não precisa abrir o app pra avisar ninguém.",
    visual: "chat",
    /* Bolhas ilustrativas — espelham as mensagens reais de confirmação e lembrete */
    chat: [
      {
        heading: "Confirme sua presença! ✅",
        body: [
          { t: "Olá, Maria! Passando pra confirmar seu horário de " },
          { t: "Corte + escova", b: true },
          { t: " — " },
          { t: "quinta, 09/07 às 14:00", b: true },
          { t: ". Responda " },
          { t: "1", b: true },
          { t: " pra confirmar. 💇‍♀️" },
        ],
        time: "09:00",
        side: "left",
      },
      {
        heading: "⏰ Corte + escova começa em 1h!",
        body: [
          { t: "Olá, Maria! Lembrando que seu horário é " },
          { t: "hoje às 14:00", b: true },
          { t: " com a Ana. Até já!" },
        ],
        time: "13:00",
        side: "right",
      },
    ],
  },
  {
    icon: Users,
    tag: "Equipe",
    title: "Cada profissional, sua própria agenda",
    description: "Cada integrante da equipe tem sua própria agenda, seus próprios horários e sua própria disponibilidade — sem sobreposição.",
    placeholder: "screenshot: agenda da equipe",
  },
  {
    icon: Globe,
    tag: "Sem instalar nada",
    title: "Funciona direto no navegador",
    description: "Sem app pra baixar, sem conta pra criar. Funciona no celular ou no computador — pra você e pros seus clientes.",
    placeholder: "screenshot: acesso pelo navegador",
  },
];

/* Planos e preços */
export const plans = [
  {
    name: "Básico",
    price: "R$ 49,90",
    features: [
      "Página de agendamento online",
      "Integração com Google Calendar",
      "Lembretes automáticos por Telegram",
      "Notificações bônus por WhatsApp",
      "1 profissional incluído",
    ],
  },
  {
    name: "Completo",
    price: "R$ 89,90",
    popular: true,
    features: [
      "Tudo do plano Básico",
      "Landing page personalizada com a cara do seu salão",
      "Suporte prioritário",
      "1 profissional incluído",
    ],
  },
];

export const pricingNote = {
  addOn: { highlight: "+ R$ 9,90/mês", text: "por profissional adicional, em qualquer plano." },
  loyalty: { highlight: "Sem fidelidade.", text: "Cancele quando quiser." },
};

/* FAQ */
export const faqData = [
  {
    question: "Preciso instalar algum aplicativo?",
    answer: "Não. O SlotMe funciona direto no navegador, tanto pra você quanto pros seus clientes. Não tem app pra baixar nem espaço pra ocupar no celular.",
  },
  {
    question: "Preciso aprender um sistema novo?",
    answer: "Não. Você continua usando o Google Calendar que já tem no celular. Os agendamentos feitos pelos clientes aparecem lá automaticamente.",
  },
  {
    question: "E se eu não usar Google Calendar ainda?",
    answer: "Sem problema. A conta do Google Calendar é gratuita e a gente te ajuda a deixar tudo pronto. Depois disso, é só continuar usando a agenda normalmente.",
  },
  {
    question: "Meus clientes precisam criar conta?",
    answer: "Não. Eles acessam o seu link, escolhem o horário e pronto. Sem cadastro, sem senha pra lembrar.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim. Não tem fidelidade nem multa de cancelamento. Você cancela quando quiser, sem burocracia.",
  },
  {
    question: "Como funciona para mais de um profissional?",
    answer: "Cada profissional tem sua própria agenda dentro do SlotMe, ligada ao Google Calendar dele. O cliente escolhe com quem quer marcar o horário.",
  },
  {
    question: "O lembrete por WhatsApp é garantido?",
    answer: "O lembrete oficial, incluso em todos os planos, é feito por Telegram. O aviso por WhatsApp é um recurso bônus e complementar, sem garantia de funcionamento.",
  },
  {
    question: "Qual a real diferença entre o plano Básico e o Completo?",
    answer: "Os dois têm agendamento com Google Calendar, lembretes por Telegram e o bônus de WhatsApp. A diferença é a página: no Completo, o link de agendamento é personalizado com as cores, fontes e fotos do seu salão — no Básico, ela usa um layout pronto.",
  },
];

/* CTA final */
export const ctaFinal = {
  title: "Pronto pra parar de agendar por mensagem?",
  subtitle: "Me chama e eu te mostro como fica a sua página de agendamento — sem compromisso.",
  // Chave gratuita do https://web3forms.com — o formulário chega por e-mail.
  web3formsKey: "2439a2ec-3c3b-4999-b53d-3dfe18d5e67b",
  formNote: "Sem spam: seus dados chegam direto pra mim e eu retorno em até 1 dia útil.",
  formSuccess: "Recebi seu contato! Te chamo em breve. 👍",
  formError: "Não consegui enviar agora. Tente de novo ou me chame direto no WhatsApp.",
};

/* Rodapé */
export const footerData = {
  about: "Agendamento online integrado ao Google Calendar, feito para salões e barbearias de pequeno porte.",
  cnpj: "[CNPJ — preencher]",
};

/* Ícone reaproveitado no ribbon de plano recomendado */
export const starIcon = Star;
