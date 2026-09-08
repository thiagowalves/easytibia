import type { GuideChapter } from "../../lib/tibia/guide";
import { tibiaMapUrl, type Coord } from "../../lib/tibia/guide/map";
import { SectionCap } from "../../components/ui";

/* ---------------------------------------------------------------------------
   Mapa esquemático do capítulo: junta todos os pontos com coordenada
   (NPCs de blocos "places" e diálogos) e mostra a posição relativa entre
   eles. Não é o mapa do jogo — as distâncias são aproximadas. Cada ponto
   abre o mapa comentado do TibiaMaps na coordenada exata.
--------------------------------------------------------------------------- */

interface Pin {
  name: string;
  coord: Coord;
}

function collectPins(chapter: GuideChapter): Pin[] {
  const pins: Pin[] = [];
  const seen = new Set<string>();
  const add = (name: string, coord?: Coord) => {
    if (!coord || seen.has(name)) return;
    seen.add(name);
    pins.push({ name, coord });
  };
  for (const section of chapter.sections) {
    for (const block of section.blocks) {
      if (block.kind === "places") block.items.forEach((it) => add(it.name, it.coord));
      else if (block.kind === "dialogue") add(block.npc, block.coord);
    }
  }
  return pins;
}

export function ChapterMap({ chapter }: { chapter: GuideChapter }) {
  const pins = collectPins(chapter);
  if (pins.length < 2) return null;

  const xs = pins.map((p) => p.coord[0]);
  const ys = pins.map((p) => p.coord[1]);
  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);
  if (maxX - minX < 1) (minX -= 5), (maxX += 5);
  if (maxY - minY < 1) (minY -= 5), (maxY += 5);

  // Usa o maior vão nos dois eixos para preservar a proporção das distâncias.
  const span = Math.max(maxX - minX, maxY - minY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const half = span / 2 + span * 0.28;
  const px = (x: number) => ((x - (cx - half)) / (2 * half)) * 100;
  const py = (y: number) => ((y - (cy - half)) / (2 * half)) * 100; // y do Tibia cresce para o sul = para baixo

  const floors = [...new Set(pins.map((p) => p.coord[2]))];

  return (
    <div className="rounded-[4px] border border-[#15100a] bg-parch p-[16px_18px] shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
      <SectionCap tone="ink" className="mb-3">
        Mapa do capítulo
      </SectionCap>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <svg
          viewBox="0 0 100 100"
          className="w-full max-w-[220px] shrink-0 self-center rounded-[4px] border border-[#c6b489] bg-[repeating-linear-gradient(0deg,#e4d8b8_0_1px,transparent_1px_14px),repeating-linear-gradient(90deg,#e4d8b8_0_1px,transparent_1px_14px),#efe4c8]"
        >
          <text x="50" y="7" textAnchor="middle" className="fill-ink-faint text-[6px] font-bold">
            N
          </text>
          {pins.map((p, i) => (
            <g key={p.name}>
              <circle cx={px(p.coord[0])} cy={py(p.coord[1])} r="4.2" className="fill-seal" />
              <text
                x={px(p.coord[0])}
                y={py(p.coord[1]) + 2.1}
                textAnchor="middle"
                className="fill-[#f0e3c6] text-[5px] font-bold"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>

        <ol className="flex min-w-0 flex-1 flex-col gap-1.5">
          {pins.map((p, i) => (
            <li key={p.name} className="flex items-baseline gap-2 text-[12px]">
              <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-seal font-mono text-[10px] font-bold text-[#f0e3c6]">
                {i + 1}
              </span>
              <span className="text-ink">{p.name}</span>
              <a
                href={tibiaMapUrl(p.coord)}
                target="_blank"
                rel="noreferrer"
                className="ml-auto whitespace-nowrap text-[11px] text-num underline decoration-dotted underline-offset-2 hover:text-seal"
              >
                ver no mapa ↗
              </a>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-3 text-[10.5px] leading-relaxed text-ink-faint">
        Esquema de posição relativa {floors.length === 1 ? `(andar ${floors[0]})` : ""} — as
        distâncias são aproximadas. Toque em um ponto para abrir o mapa comentado do TibiaMaps.
      </p>
    </div>
  );
}
