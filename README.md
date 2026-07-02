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
