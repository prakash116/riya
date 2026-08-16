/**
 * Screenshot harness for the landing page.
 *
 * Uses a real viewport per device tier so 100svh-based sections measure the way
 * they do on a real device, scrolls the whole page once so scroll-triggered
 * reveals have fired, then captures beyond the viewport for a full-page image.
 *
 * Usage: node scripts/shoot.mjs [--url=http://localhost:3210] [tier ...]
 */
import { mkdirSync } from "node:fs";
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const TIERS = {
  desktop: { width: 1440, height: 900, dsf: 1 },
  laptop: { width: 1280, height: 800, dsf: 1 },
  tablet: { width: 820, height: 1180, dsf: 1 },
  mobile: { width: 390, height: 844, dsf: 2 },
};

const args = process.argv.slice(2);
const urlArg = args.find((a) => a.startsWith("--url="));
const url = urlArg ? urlArg.split("=").slice(1).join("=") : "http://localhost:3210";
const wanted = args.filter((a) => !a.startsWith("--"));
const tiers = wanted.length ? wanted : Object.keys(TIERS);

mkdirSync("shots", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  protocolTimeout: 120_000,
  args: ["--hide-scrollbars", "--disable-gpu"],
});

for (const name of tiers) {
  const tier = TIERS[name];
  if (!tier) {
    console.error(`unknown tier: ${name}`);
    continue;
  }

  const page = await browser.newPage();
  await page.setViewport({
    width: tier.width,
    height: tier.height,
    deviceScaleFactor: tier.dsf,
    isMobile: tier.width < 900,
    hasTouch: tier.width < 900,
  });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90_000 });
  console.log(`${name}: loaded`);

  // Walk the page so whileInView reveals fire, then return to the top.
  const steps = Math.ceil(
    (await page.evaluate(() => document.body.scrollHeight)) /
      (tier.height * 0.7),
  );
  for (let i = 0; i <= steps; i += 1) {
    await page.evaluate((y) => window.scrollTo(0, y), i * tier.height * 0.7);
    await new Promise((r) => setTimeout(r, 150));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  console.log(`${name}: scrolled (${steps} steps)`);

  // Let images and the hero entrance settle before capturing.
  await new Promise((r) => setTimeout(r, 2500));

  await page.screenshot({
    path: `shots/${name}.png`,
    fullPage: true,
    captureBeyondViewport: true,
  });

  const height = await page.evaluate(() => document.body.scrollHeight);
  console.log(`${name}: ${tier.width}x${tier.height} → page height ${height}px`);
  await page.close();
}

await browser.close();
