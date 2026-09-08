import type { GuideChapter } from "../../lib/tibia/guide";
import { tibiaMapUrl, type Coord } from "../../lib/tibia/guide/map";
import { SectionCap } from "../../components/ui";

/* ---------------------------------------------------------------------------
   Mapa do capítulo: recorte real do mapa do jogo (tiles do TibiaMaps, 1 tile
   do jogo = 1 pixel) com os pontos do capítulo marcados por cima. Cada ponto
   também abre o mapa comentado do TibiaMaps na coordenada exata.
--------------------------------------------------------------------------- */

const TILE = 256;
const TILE_BASE = "https://tibiamaps.github.io/tibia-map-data/mapper/Minimap_Color_";

interface Group {
  names: string[];
  coord: Coord;
}

function collectGroups(chapter: GuideChapter): Group[] {
  const byKey = new Map<string, Group>();
  const seenName = new Set<string>();
  const add = (name: string, coord?: Coord) => {
    if (!coord || seenName.has(name)) return;
    seenName.add(name);
    const key = coord.join(",");
    const g = byKey.get(key);
    if (g) g.names.push(name);
    else byKey.set(key, { names: [name], coord });
  };
  for (const section of chapter.sections) {
    for (const block of section.blocks) {
      if (block.kind === "places") block.items.forEach((it) => add(it.name, it.coord));
      else if (block.kind === "dialogue") add(block.npc, block.coord);
    }
  }
  return [...byKey.values()];
}

function mode<T>(arr: T[]): T {
  const count = new Map<T, number>();
  let best = arr[0];
  let bestN = 0;
  for (const v of arr) {
    const n = (count.get(v) ?? 0) + 1;
    count.set(v, n);
    if (n > bestN) {
      bestN = n;
      best = v;
    }
  }
  return best;
}

export function ChapterMap({ chapter }: { chapter: GuideChapter }) {
  const groups = collectGroups(chapter);
  if (groups.length < 1) return null;

  const xs = groups.map((g) => g.coord[0]);
  const ys = groups.map((g) => g.coord[1]);
  // 7 é o andar de superfície do Tibia — prefira-o quando algum ponto estiver nele.
  const allFloors = groups.map((g) => g.coord[2]);
  const floor = allFloors.includes(7) ? 7 : mode(allFloors);

  // Viewport em coordenadas do jogo: bounding box + margem generosa (dá
  // contexto e deixa os pinos pequenos), com teto de vão.
  const pad = 60;
  const clampSpan = (a0: number, a1: number): [number, number] => {
    if (a1 - a0 <= 460) return [a0, a1];
    const c = (a0 + a1) / 2;
    return [Math.round(c - 230), Math.round(c + 230)];
  };
  let [vx0, vx1] = clampSpan(Math.min(...xs) - pad, Math.max(...xs) + pad);
  let [vy0, vy1] = clampSpan(Math.min(...ys) - pad, Math.max(...ys) + pad);
  // Não deixa o recorte ficar muito esticado: expande o eixo curto.
  const balance = () => {
    const w = vx1 - vx0;
    const h = vy1 - vy0;
    if (h > w * 1.5) {
      const g = (h / 1.5 - w) / 2;
      vx0 -= g;
      vx1 += g;
    } else if (w > h * 1.5) {
      const g = (w / 1.5 - h) / 2;
      vy0 -= g;
      vy1 += g;
    }
  };
  balance();
  const vw = Math.round(vx1 - vx0);
  const vh = Math.round(vy1 - vy0);

  const tiles: { tx: number; ty: number }[] = [];
  for (let tx = Math.floor(vx0 / TILE) * TILE; tx < vx1; tx += TILE) {
    for (let ty = Math.floor(vy0 / TILE) * TILE; ty < vy1; ty += TILE) {
      tiles.push({ tx, ty });
    }
  }

  // Raio ~ constante na tela (o SVG é exibido com ~360 px de largura).
  const r = Math.max(2.8, Math.min(7, vw / 46));

  return (
    <div className="parch-card p-[16px_18px]">
      <SectionCap tone="ink" className="mb-3">
        Mapa do capítulo
      </SectionCap>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <svg
          viewBox={`0 0 ${vw} ${vh}`}
          className="w-full max-w-[360px] shrink-0 self-center rounded-[4px] border border-[#15100a] bg-[#0d0d0d] [image-rendering:pixelated]"
        >
          {tiles.map(({ tx, ty }) => (
            <image
              key={`${tx}_${ty}`}
              href={`${TILE_BASE}${tx}_${ty}_${floor}.png`}
              x={tx - vx0}
              y={ty - vy0}
              width={TILE}
              height={TILE}
            />
          ))}
          {groups.map((g, i) => {
            const cx = g.coord[0] - vx0 + 0.5;
            const cy = g.coord[1] - vy0 + 0.5;
            return (
              <g key={g.coord.join(",")}>
                <circle cx={cx} cy={cy} r={r} fill="#8f3a2f" stroke="#f0e3c6" strokeWidth={r * 0.26} />
                <text
                  x={cx}
                  y={cy + r * 0.4}
                  textAnchor="middle"
                  fill="#f0e3c6"
                  fontSize={r * 1.15}
                  fontWeight="bold"
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>

        <ol className="flex min-w-0 flex-1 flex-col gap-1.5">
          {groups.map((g, i) => (
            <li key={g.coord.join(",")} className="flex items-baseline gap-2 text-[12px]">
              <span className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-seal font-mono text-[10px] font-bold text-[#f0e3c6]">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-ink">
                {g.names.join(", ")}
                {g.coord[2] !== floor && (
                  <span className="text-ink-faint"> · andar {g.coord[2]}</span>
                )}
              </span>
              <a
                href={tibiaMapUrl(g.coord)}
                target="_blank"
                rel="noreferrer"
                className="whitespace-nowrap text-[11px] text-num underline decoration-dotted underline-offset-2 hover:text-seal"
              >
                ver no mapa ↗
              </a>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-3 text-[10.5px] leading-relaxed text-ink-faint">
        Recorte do andar {floor}. Mapa:{" "}
        <a
          href="https://tibiamaps.io/"
          target="_blank"
          rel="noreferrer"
          className="text-num underline decoration-dotted underline-offset-2 hover:text-seal"
        >
          TibiaMaps.io
        </a>{" "}
        (dados CC0). Toque em um ponto na lista para abrir o mapa comentado.
      </p>
    </div>
  );
}
