import type { GuideChapter } from "../../lib/tibia/guide";
import { tibiaMapUrl, type Coord } from "../../lib/tibia/guide/map";
import { SectionCap } from "../../components/ui";

/* ---------------------------------------------------------------------------
   Mapa esquemático do capítulo: junta os pontos com coordenada (NPCs de
   blocos "places" e diálogos), agrupa os que estão no mesmo lugar e mostra
   a posição relativa entre os grupos. Não é o mapa do jogo — as distâncias
   são aproximadas. Cada ponto abre o mapa comentado do TibiaMaps.

   Só aparece quando há pelo menos 3 lugares distintos.
--------------------------------------------------------------------------- */

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

const SIZE = 100;
const GRID = 12.5;

export function ChapterMap({ chapter }: { chapter: GuideChapter }) {
  const groups = collectGroups(chapter);
  if (groups.length < 3) return null;

  const xs = groups.map((g) => g.coord[0]);
  const ys = groups.map((g) => g.coord[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const spanX = Math.max(...xs) - Math.min(...xs);
  const spanY = Math.max(...ys) - Math.min(...ys);
  // Usa o maior vão para preservar a proporção; com piso, para um vilarejo
  // pequeno não esticar de ponta a ponta.
  const half = Math.max(55, Math.max(spanX, spanY) / 2 + 12);
  const px = (x: number) => ((x - (cx - half)) / (2 * half)) * SIZE;
  const py = (y: number) => ((y - (cy - half)) / (2 * half)) * SIZE; // y do Tibia cresce para o sul = para baixo

  const gridLines = [];
  for (let v = GRID; v < SIZE; v += GRID) {
    gridLines.push(<line key={`h${v}`} x1={0} y1={v} x2={SIZE} y2={v} stroke="#dccca1" strokeWidth={0.5} />);
    gridLines.push(<line key={`v${v}`} x1={v} y1={0} x2={v} y2={SIZE} stroke="#dccca1" strokeWidth={0.5} />);
  }

  const floors = [...new Set(groups.map((g) => g.coord[2]))];

  return (
    <div className="rounded-[4px] border border-[#15100a] bg-parch p-[16px_18px] shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
      <SectionCap tone="ink" className="mb-3">
        Mapa do capítulo
      </SectionCap>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full max-w-[220px] shrink-0 self-center rounded-[4px]"
        >
          <rect x={0} y={0} width={SIZE} height={SIZE} fill="#efe4c8" />
          {gridLines}
          <rect x={0.5} y={0.5} width={SIZE - 1} height={SIZE - 1} fill="none" stroke="#c6b489" strokeWidth={1} />
          <path d="M50 4 L47 10 L50 8 L53 10 Z" fill="#8b7952" />
          <text x={50} y={17} textAnchor="middle" fill="#8b7952" fontSize={5} fontWeight="bold">
            N
          </text>
          {groups.map((g, i) => (
            <g key={g.coord.join(",")}>
              <circle cx={px(g.coord[0])} cy={py(g.coord[1])} r={4.6} fill="#8f3a2f" />
              <text
                x={px(g.coord[0])}
                y={py(g.coord[1]) + 2.1}
                textAnchor="middle"
                fill="#f0e3c6"
                fontSize={5}
                fontWeight="bold"
              >
                {i + 1}
              </text>
            </g>
          ))}
        </svg>

        <ol className="flex min-w-0 flex-1 flex-col gap-1.5">
          {groups.map((g, i) => (
            <li key={g.coord.join(",")} className="flex items-baseline gap-2 text-[12px]">
              <span className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full bg-seal font-mono text-[10px] font-bold text-[#f0e3c6]">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-ink">{g.names.join(", ")}</span>
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
        Esquema de posição relativa {floors.length === 1 ? `(andar ${floors[0]})` : ""} — as
        distâncias são aproximadas. Toque em um ponto para abrir o mapa comentado do TibiaMaps.
      </p>
    </div>
  );
}
