/* =========================================================
   POLÍTICA DE PRIVACIDADE (/privacidade/) — RASCUNHO PARA REVISÃO.
   Escrito para refletir o que o SlotMe faz hoje. Não substitui a
   revisão de um advogado. Ao mudar o texto, atualize "atualizadoEm".
   ========================================================= */

export const privacidade = {
  titulo: "Política de Privacidade",
  atualizadoEm: "4 de novembro de 2026",
  // PENDENTE: preencher antes de publicar. Campos vazios não aparecem na página.
  controlador: {
    nome: "SlotMe",
    responsavel: "Parllon",
    cnpj: "",
    email: "",
  },
  voltar: { rotulo: "Voltar para o site", href: "/" },
  sumarioTitulo: "Nesta página",
  ultimaAtualizacao: "Última atualização:",
  resumo: {
    titulo: "Em poucas palavras",
    itens: [
      "Usamos seus dados para criar e manter a sua página de agendamento e para falar com você sobre o serviço.",
      "Não vendemos seus dados e não usamos para propaganda de terceiros.",
      "Os dados dos clientes do seu salão são seus: nós só guardamos e processamos para o sistema funcionar.",
      "Você pode pedir para ver, corrigir ou apagar seus dados a qualquer momento.",
    ],
  },
};

/* Link no rodapé da home */
export const linkRodape = { href: "/privacidade/", label: "Política de privacidade" };

/* Cada seção: titulo + paragrafos e/ou lista. A ordem aqui é a ordem na página. */
export const secoes = [
  {
    id: "quem-somos",
    titulo: "1. Quem somos",
    paragrafos: [
      "O SlotMe é um serviço de agendamento online para salões, estúdios e barbearias, integrado ao Google Agenda. Para a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018), o SlotMe é o controlador dos dados de quem se cadastra e usa o serviço, e é operador dos dados dos clientes que agendam horário nos salões (nesse caso, o controlador é o próprio salão).",
    ],
  },
  {
    id: "quais-dados",
    titulo: "2. Quais dados coletamos",
    paragrafos: ["Coletamos apenas o necessário para o serviço funcionar:"],
    lista: [
      "Cadastro do teste grátis: seu nome, WhatsApp, e-mail da conta Google, como conheceu o SlotMe, nome e cidade do negócio, Instagram (opcional), serviços com duração e preço, horários de atendimento, pausas, estilo escolhido para a página e observações que você escrever.",
      "Dados da equipe: nome e, se você informar, o e-mail Google de cada profissional. Ao cadastrar outra pessoa, você confirma que ela concorda em ter a agenda criada no SlotMe.",
      "Origem da visita: de qual anúncio ou link você chegou (por exemplo, utm_source=instagram) e o site anterior, quando o navegador informa.",
      "Uso do site: contagem anônima de passos (por exemplo, \"abriu o cadastro\", \"enviou o cadastro\"), ligada a um código aleatório que vale só durante a visita. Não usamos cookies de rastreamento nem pixels de publicidade nestas páginas.",
      "Dados dos clientes do salão, depois que a página está no ar: nome, telefone e o horário agendado por quem marca pela sua página.",
    ],
  },
  {
    id: "para-que",
    titulo: "3. Para que usamos e com qual base legal",
    lista: [
      "Criar a sua conta de teste, montar a sua página e as agendas Google: execução de contrato e procedimentos preliminares (art. 7º, V, da LGPD).",
      "Falar com você por WhatsApp ou e-mail sobre o teste, a assinatura e o suporte: execução de contrato e o seu consentimento, dado no cadastro (art. 7º, I e V).",
      "Medir quais anúncios e páginas funcionam, prevenir fraude e manter o sistema seguro: legítimo interesse (art. 7º, IX), sempre com dados mínimos.",
      "Enviar confirmações e lembretes aos clientes do salão: em nome do salão, como operador, para executar o serviço contratado por ele.",
      "Guardar registros exigidos por lei, como os fiscais: cumprimento de obrigação legal (art. 7º, II).",
    ],
  },
  {
    id: "compartilhamento",
    titulo: "4. Com quem compartilhamos",
    paragrafos: [
      "Não vendemos nem alugamos dados. Para o serviço funcionar, usamos alguns fornecedores, que recebem apenas o necessário:",
    ],
    lista: [
      "Google: as agendas dos profissionais ficam no Google Agenda, e as fontes de texto do site são carregadas do Google Fonts.",
      "Web3Forms: recebe o formulário de cadastro e o entrega no nosso e-mail.",
      "Cloudflare: protege e entrega as páginas do site e das agendas.",
      "Telegram: envia os avisos de novos agendamentos para o salão.",
      "WhatsApp: usado como recurso bônus para mensagens de confirmação e lembrete aos clientes do salão.",
      "Mercado Pago: processa os pagamentos da assinatura, quando houver. Não guardamos dados de cartão.",
    ],
    paragrafosDepois: [
      "Alguns desses fornecedores podem tratar dados fora do Brasil. Nesses casos, escolhemos empresas que oferecem garantias de proteção compatíveis com a LGPD. Também podemos compartilhar dados quando a lei ou uma autoridade exigir.",
    ],
  },
  {
    id: "armazenamento",
    titulo: "5. Onde e por quanto tempo guardamos",
    lista: [
      "O sistema roda em servidor próprio no Brasil, com acesso restrito e cópia de segurança diária.",
      "Rascunho do cadastro: fica só no seu aparelho (no navegador) por até 14 dias, para você não perder o que digitou. Nada é enviado antes de você tocar em \"Enviar cadastro\".",
      "Cadastro que não virou assinatura: apagamos em até 6 meses depois do fim do teste.",
      "Clientes: enquanto a assinatura estiver ativa. Depois do cancelamento, você pode pedir uma exportação dos seus dados, e as cópias de segurança são apagadas em até 30 dias.",
      "Registros fiscais e de pagamento: pelo prazo que a lei exigir.",
    ],
  },
  {
    id: "direitos",
    titulo: "6. Seus direitos",
    paragrafos: ["Pela LGPD (art. 18), você pode pedir a qualquer momento:"],
    lista: [
      "Confirmação de que tratamos seus dados e acesso a eles.",
      "Correção de dados incompletos ou errados.",
      "Exportação dos seus dados (portabilidade).",
      "Exclusão dos dados tratados com o seu consentimento, ou anonimização, bloqueio ou eliminação do que for desnecessário.",
      "Informação sobre com quem compartilhamos.",
      "Revogação do consentimento, o que pode impedir a continuidade do serviço.",
    ],
    paragrafosDepois: [
      "Respondemos em até 15 dias. Se você for cliente de um salão e quiser exercer esses direitos, fale com o salão, que é o responsável pelos seus dados; nós ajudamos o salão a atender o pedido.",
      "Você também pode reclamar na Autoridade Nacional de Proteção de Dados (ANPD), em gov.br/anpd.",
    ],
  },
  {
    id: "seguranca",
    titulo: "7. Segurança",
    paragrafos: [
      "Usamos conexão segura (HTTPS), acesso restrito por senha e camadas de proteção, cópias de segurança e separação dos dados de cada salão. Nenhum sistema é 100% imune a falhas; se acontecer um incidente que possa trazer risco a você, avisaremos você e a ANPD, como manda a lei.",
    ],
  },
  {
    id: "menores",
    titulo: "8. Menores de idade",
    paragrafos: [
      "O cadastro no SlotMe é para responsáveis por negócios, maiores de 18 anos. Os salões são responsáveis por obter a autorização dos pais ou responsáveis ao agendar atendimentos de menores.",
    ],
  },
  {
    id: "mudancas",
    titulo: "9. Mudanças nesta política",
    paragrafos: [
      "Podemos atualizar este texto quando o serviço mudar. A data da última atualização fica no topo da página. Se a mudança for importante, avisaremos os clientes por WhatsApp ou e-mail.",
    ],
  },
];

/* Contato — a seção final é montada a partir de privacidade.controlador + WhatsApp do content.js */
export const contatoTextos = {
  id: "contato",
  titulo: "10. Fale com a gente",
  texto: "Para dúvidas sobre esta política ou para exercer seus direitos, fale com o responsável pelos dados:",
  responsavel: "Responsável",
  cnpj: "CNPJ",
  email: "E-mail",
  whatsapp: "WhatsApp",
  whatsappMensagem: "Oi! Tenho uma dúvida sobre privacidade e meus dados no SlotMe.",
};
