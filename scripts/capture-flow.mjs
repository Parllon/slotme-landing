// capture-flow.mjs — captura screenshots reais (formato mobile, full-page) do fluxo
// de agendamento em produção, para usar como imagens no carrossel do site do SlotMe.
// Não envia nenhum agendamento de verdade: para antes de clicar em "Confirmar".
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../src/assets/screenshots');
mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

async function shot(page, name) {
  await esperarAssentar(350); // deixa animação de entrada assentar
  await page.screenshot({ path: resolve(OUT_DIR, `${name}.jpg`), fullPage: true, type: 'jpeg', quality: 82 });
  console.log(`  ✓ ${name}.jpg`);
}

async function esperarAssentar(ms = 500) {
  await new Promise((r) => setTimeout(r, ms));
}

// clica via JS direto (sem depender do ponto/visibilidade do mouse do puppeteer,
// que dá falso-negativo durante as transições CSS de entrada do passo)
async function clickJs(page, selector) {
  await page.$eval(selector, (el) => el.click());
}

async function waitViewVisible(page, n) {
  await page.waitForFunction(
    (num) => !document.getElementById(`view-${num}`).classList.contains('hidden'),
    { timeout: 15000 },
    n
  );
}

// avança pro próximo passo SÓ SE o botão já estiver habilitado (senão é no-op:
// alguns passos já avançam sozinhos ao selecionar, outros exigem o clique)
async function avancarSeHabilitado(page) {
  await esperarAssentar(400);
  await page.$eval('#btn-avancar', (el) => { if (!el.disabled) el.click(); });
}

async function capturarFluxoCompleto(page, prefixo) {
  // Passo 1 — profissional
  await page.waitForSelector('#lista-profissionais button', { timeout: 15000 });
  await shot(page, `${prefixo}-1-profissional`);
  await clickJs(page, '#lista-profissionais button');
  await avancarSeHabilitado(page);
  await waitViewVisible(page, 2);
  await page.waitForSelector('#lista-servicos button', { timeout: 15000 });

  // Passo 2 — serviço
  await shot(page, `${prefixo}-2-servico`);
  await clickJs(page, '#lista-servicos button');
  await avancarSeHabilitado(page); // no-op se o passo já avançou sozinho (modo 1 serviço)
  await waitViewVisible(page, 3);

  // Passo 3 — horário (calendário + grade)
  await esperarAssentar(700); // carregarDiasDisponiveis() re-renderiza o calendário
  await page.waitForSelector('#calendario .cal-dia', { timeout: 15000 });
  await clickJs(page, '#calendario .cal-dia');
  await page.waitForSelector('#grade-horarios button', { timeout: 15000 });
  await clickJs(page, '#grade-horarios button');
  await shot(page, `${prefixo}-3-horario`);
  await avancarSeHabilitado(page);
  await waitViewVisible(page, 4);

  // Passo 4 — dados (preenchidos com um exemplo fictício, só para a foto)
  await esperarAssentar();
  await page.type('#input-nome', 'Maria Fernanda');
  await page.type('#input-telefone', '21999998888');
  await shot(page, `${prefixo}-4-dados`);
  await avancarSeHabilitado(page);
  await waitViewVisible(page, 5);

  // Passo 5 — revisar e confirmar (NÃO clicamos em Confirmar — sem agendamento real)
  await shot(page, `${prefixo}-5-revisar`);
}

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  console.log('Studio Beleza — fluxo completo...');
  const page1 = await browser.newPage();
  await page1.setViewport(VIEWPORT);
  await page1.goto('https://studiobeleza.agendamentos.app.br', { waitUntil: 'networkidle0' });
  await capturarFluxoCompleto(page1, 'studio');
  await page1.close();
} finally {
  await browser.close();
}

console.log(`\nImagens salvas em: ${OUT_DIR}`);
