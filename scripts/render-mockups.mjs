// render-mockups.mjs — renderiza as ilustrações dos cards "Equipe" e "Sem instalar nada"
// (HTML em scripts/mockups/) para imagens em src/assets/features/.
// Uso: node scripts/render-mockups.mjs
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../src/assets/features');
mkdirSync(OUT_DIR, { recursive: true });

const jobs = [
  // tela de celular → exibida dentro do PhoneFrame
  { html: 'equipe.html', out: 'equipe-agenda.jpg', viewport: { width: 390, height: 844, deviceScaleFactor: 2 }, type: 'jpeg' },
  // cena computador + celular com fundo transparente → exibida solta no card
  { html: 'navegador.html', out: 'sem-instalar.webp', viewport: { width: 1000, height: 680, deviceScaleFactor: 2 }, type: 'webp' },
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox'],
});
try {
  for (const job of jobs) {
    const page = await browser.newPage();
    await page.setViewport(job.viewport);
    await page.goto(pathToFileURL(resolve(__dirname, 'mockups', job.html)).href, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: resolve(OUT_DIR, job.out),
      type: job.type,
      quality: 85,
      ...(job.type === 'webp' ? { omitBackground: true } : {}),
    });
    console.log(`  ✓ ${job.out}`);
    await page.close();
  }
} finally {
  await browser.close();
}
