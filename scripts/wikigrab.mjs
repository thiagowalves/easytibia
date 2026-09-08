// Raspador de páginas de wiki do Tibia via Chrome local (CDP).
//
// Uso:
//   1) inicie o Chrome com depuração remota (ver scripts/wikigrab.ps1)
//   2) node scripts/wikigrab.mjs <out-dir> <url> [url...]
//
// Para cada URL salva <out-dir>/<slug>.txt (texto do corpo do artigo) e
// <slug>.html (HTML bruto de reserva). Não precisa de login: as páginas
// são públicas; o Chrome local só serve para passar pelo Cloudflare.

import fs from "node:fs";
import path from "node:path";

const PORT = process.env.CDP_PORT || "9260";
const BASE = `http://127.0.0.1:${PORT}`;
const [outDir, ...urls] = process.argv.slice(2);

if (!outDir || urls.length === 0) {
  console.error("uso: node scripts/wikigrab.mjs <out-dir> <url> [url...]");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function firstPageTarget() {
  for (let i = 0; i < 30; i++) {
    try {
      const list = await fetch(`${BASE}/json`).then((r) => r.json());
      const p = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(500);
  }
  throw new Error(`Chrome CDP não respondeu em ${BASE} — o Chrome está aberto com --remote-debugging-port=${PORT}?`);
}

const ws = new WebSocket(await firstPageTarget());
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }))
    .result?.result?.value;

await send("Page.enable");
await send("Runtime.enable");

const slug = (u) =>
  decodeURIComponent(u.split("/").pop().split("?")[0]).replace(/[^\w.-]+/g, "_").slice(0, 80) ||
  "page";

const results = [];
const EXPAND_AND_READ = `(() => {
  // expande spoilers / seções recolhíveis (MediaWiki + tibiawiki.com.br)
  document.querySelectorAll('.mw-collapsible.mw-collapsed').forEach((el) => el.classList.remove('mw-collapsed'));
  document.querySelectorAll('.mw-collapsible-content').forEach((el) => { el.style.display = ''; });
  [...document.querySelectorAll('a, span, .mw-customtoggle, .toccolours a')].forEach((el) => {
    const t = (el.textContent || '').trim().toLowerCase();
    if (t === 'mostrar' || t === 'sempre mostrar' || t === 'show' || t === 'expandir') {
      try { el.click(); } catch {}
    }
  });
  const node = document.querySelector('#mw-content-text') || document.querySelector('#bodyContent') || document.body;
  const cf = /just a moment|checking your browser|verify you are human/i.test(document.body?.innerText || '');
  const links = node
    ? [...node.querySelectorAll('a[href]')]
        .map((a) => ({ text: (a.textContent || '').trim().replace(/\\s+/g, ' '), href: a.href }))
        .filter((l) => l.text && !l.href.startsWith('javascript:'))
    : [];
  // coordenadas de mapa: <span class="map_frame_coord">x,y,z:zoom</span>, rotuladas
  // pelo <a> anterior (nome do local) quando houver.
  const coords = node
    ? [...node.querySelectorAll('.map_show, .map_frame_coord')]
        .map((el) => {
          const c = el.classList.contains('map_frame_coord') ? el : el.querySelector('.map_frame_coord');
          if (!c) return null;
          const scope = el.closest('td, li, p, div') || el.parentElement;
          const label = scope ? (scope.querySelector('a')?.textContent || scope.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 60) : '';
          return { label, coord: c.textContent.trim() };
        })
        .filter(Boolean)
    : [];
  return { title: document.title, cf, text: node ? node.innerText : '', links, coords };
})()`;

for (const url of urls) {
  await send("Page.navigate", { url });
  await sleep(5500); // margem para o desafio anti-bot, se houver

  let info = await evaluate(EXPAND_AND_READ);
  if (info?.cf) {
    await sleep(6000);
    info = await evaluate(EXPAND_AND_READ);
  }
  // segunda passada: alguns toggles só renderizam o conteúdo depois do clique
  await sleep(600);
  info = (await evaluate(EXPAND_AND_READ)) || info;

  const html = (await evaluate(`document.documentElement.outerHTML`)) || "";
  const s = slug(url);
  fs.writeFileSync(
    path.join(outDir, `${s}.txt`),
    `URL: ${url}\nTITLE: ${info?.title || ""}\n\n${info?.text || ""}`,
  );
  fs.writeFileSync(
    path.join(outDir, `${s}.links.txt`),
    (info?.links || []).map((l) => `${l.text}\t${l.href}`).join("\n"),
  );
  if (info?.coords?.length) {
    fs.writeFileSync(
      path.join(outDir, `${s}.coords.txt`),
      info.coords.map((c) => `${c.label}\t${c.coord}`).join("\n"),
    );
  }
  fs.writeFileSync(path.join(outDir, `${s}.html`), html);
  results.push({ url, slug: s, title: info?.title, chars: (info?.text || "").length });
  console.log(`ok  ${s}  (${(info?.text || "").length} chars)  ${info?.title || ""}`);
}

ws.close();
console.log("\n" + JSON.stringify(results, null, 2));
