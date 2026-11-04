# SlotMe — Landing Page (React + Vite + Tailwind v4)

Landing page comercial do SlotMe, SaaS de agendamento online integrado ao Google
Calendar para salões e barbearias de pequeno porte. Mesmo padrão modular dos outros
projetos em `Projetos_Pages`: cada componente na própria pasta com `Componente.jsx`
+ `Componente.css` juntos.

## Rodar no VS Code
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de produção
npm run preview
```
Requer Node.js 20.19+ (ou 22.12+).

## Arquitetura
```
src/
├── App.jsx · main.jsx
├── styles/theme.css        # tokens v4 (@import "tailwindcss" + @theme inline) + base + layout
├── data/content.js         # TODO o conteúdo (marca, nav, hero, dores, planos, FAQ, etc.)
├── lib/track.js            # eventos de funil (mesma coleta usada nos sites de cliente)
└── components/
    ├── ui/                 # Button, Card, SectionHeader, Reveal, Logo, FloatingWhatsApp, PhoneFrame
    └── sections/           # Header, Hero(+FlowCarousel), PainPoints(+PainCard),
                            # HowItWorks(+StepCard), Differential, Services(+ServiceCard),
                            # Pricing(+PricingCard), Personalization, Faq(+FaqItem), Contact, Footer
```

## Imagens reais do produto
`FlowCarousel` e `Personalization` usam screenshots reais (mobile) capturados
diretamente das páginas de agendamento em produção via `scripts/capture-flow.mjs`
(puppeteer-core). Rodar de novo se as telas dos clientes de referência mudarem:
```bash
node scripts/capture-flow.mjs
```

## Tema
Fundo chumbo quase preto `#0e1013`, texto claro, destaque violeta `#6c5ce7` (proposital
diferente do tema de qualquer cliente — o SlotMe vende a ferramenta, não uma
identidade de salão específica). Títulos em Sora, corpo em Inter.

## Personalizar
- Textos, planos, FAQ e links: `src/data/content.js`.
- WhatsApp: `whatsapp.phone` / `whatsapp.message` no `content.js` (placeholder
  `55XXXXXXXXXXX` — trocar pelo número comercial real).
- CNPJ: `footerData.cnpj` no `content.js`.
- Métricas: copiar `.env.local.example` para `.env.local` e preencher
  `VITE_METRICS_TOKEN` real.
- Cores/fontes: variáveis em `src/styles/theme.css`.

## Placeholders pendentes
- Número de WhatsApp (`55XXXXXXXXXXX`)
- `[CNPJ — preencher]` no rodapé
- `public/og-image.jpg` (1200×630, ainda não gerada)
- `VITE_METRICS_TOKEN` real em `.env.local`

## Cadastro do teste grátis (`/cadastro/`)
Segunda página do site (Vite multi-página: `cadastro/index.html`). Fluxo em 7 etapas:
Você → Negócio → Serviços → Equipe → Horários → Visual → Revisão → tela de sucesso.

**Onde mexer**
- Textos, opções, especialidades, temas, durações: `src/data/cadastro.js`.
- Regras de validação: `src/lib/cadastro/validacao.js`.
- Formato do pedido (contrato v1) e conversão para `dados.json` + `.env` do painel: `src/lib/cadastro/pedido.js`.
- Para onde envia: `src/lib/cadastro/enviar.js`.
- Telas: `src/components/cadastro/` (`Cadastro/` é a moldura; `etapas/` uma pasta por etapa; `ui/` campos).

**Para onde o cadastro vai hoje**
Sem `VITE_CADASTRO_ENDPOINT`, vai pelo Web3Forms (mesma chave do formulário da home) e
chega no e-mail com: resumo legível, avisos do que o sistema ainda não suporta, `dados.json`
e `.env` prontos para colar no painel, e o pedido completo em JSON.
Quando o sistema tiver a rota de pedidos, preencha `VITE_CADASTRO_ENDPOINT` no `.env.local`
e o pedido passa a ir em JSON para lá, sem mexer nas telas.

**Outros detalhes**
- Rascunho salvo no aparelho (`localStorage`, 14 dias); aceites nunca voltam marcados.
- UTM/fbclid/referrer capturados na home e no cadastro (`src/lib/cadastro/origem.js`).
- Eventos de funil (`cad_vista`, `cad_etapa_<id>`, `cad_enviado`, `cad_erro_envio`) vão pelo
  mesmo coletor das métricas — o dashboard do painel ainda precisa listar esses tipos.
- Armadilha anti-robô (campo invisível `botcheck`). Quando houver backend próprio, somar Turnstile.

**Pendências**
- Linkar o `/cadastro/` nos botões da home quando a oferta de teste grátis for oficial.
- Conferir se o servidor do site entrega `/cadastro/` (pasta `dist/cadastro/index.html`).

## Política de privacidade (`/privacidade/`)
Terceira página do site (`privacidade/index.html`). Texto em `src/data/privacidade.js` —
é um RASCUNHO escrito para refletir o que o SlotMe faz hoje; vale revisão de um advogado.
Linkada no aceite LGPD do cadastro e no rodapé da home.
- Antes de publicar: preencher `controlador.cnpj` e `controlador.email` (campos vazios não aparecem).
- Se instalar Meta Pixel / Google Analytics para os anúncios, atualizar a seção 2 ("não usamos
  cookies de rastreamento nem pixels") e a seção 4 (fornecedores).
- Mudou o texto? Atualize `atualizadoEm`.
