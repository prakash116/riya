/** Ad-hoc DOM probe: node scripts/probe.mjs */
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  protocolTimeout: 120_000,
  args: ["--hide-scrollbars", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(process.env.PROBE_URL ?? "http://localhost:3300", { waitUntil: "domcontentloaded" });

// Scroll the story section into view deliberately (instant, not smooth) and
// give the reveal plenty of time to run.
await page.evaluate(() => {
  const el = document.querySelector("#story");
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: top - 40, behavior: "instant" });
});
await new Promise((r) => setTimeout(r, 3000));

// Does IntersectionObserver report this element at all?
const ioResult = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const el = document.querySelector(".story-section__image");
      if (!el) return resolve("element missing");
      const entries = [];
      const io = new IntersectionObserver(
        (list) =>
          list.forEach((e) =>
            entries.push({
              isIntersecting: e.isIntersecting,
              ratio: Number(e.intersectionRatio.toFixed(3)),
              rect: `${Math.round(e.intersectionRect.width)}x${Math.round(e.intersectionRect.height)}`,
            }),
          ),
        { threshold: [0, 0.2, 0.5] },
      );
      io.observe(el);
      setTimeout(() => {
        io.disconnect();
        resolve(entries);
      }, 1500);
    }),
);
console.log("IO entries:", JSON.stringify(ioResult));

const out = await page.evaluate(() => {
  const wrap = document.querySelector(".story-section__image");
  const img = wrap?.querySelector("img");
  const strong = document.querySelector(".story-section__stats strong");
  const qv = document.querySelector(".quotes__viewport");
  const card = document.querySelector(".quote-card");
  const box = (el) => (el ? el.getBoundingClientRect().toJSON() : null);
  return {
    wrapBox: box(wrap),
    wrapClip: wrap && getComputedStyle(wrap).clipPath,
    wrapOpacity: wrap && getComputedStyle(wrap).opacity,
    imgSrc: img?.currentSrc,
    imgComplete: img?.complete,
    imgNatural: img ? `${img.naturalWidth}x${img.naturalHeight}` : null,
    imgBox: box(img),
    strongText: strong?.textContent,
    strongFont: strong && getComputedStyle(strong).fontSize,
    strongFamily: strong && getComputedStyle(strong).fontFamily,
    strongBox: box(strong),
    strongInnerFont:
      strong?.firstElementChild &&
      getComputedStyle(strong.firstElementChild).fontSize,
    strongInnerTag: strong?.firstElementChild?.tagName,
    qvBox: box(qv),
    cardBox: box(card),
  };
});

console.log(JSON.stringify(out, null, 1));
await browser.close();
