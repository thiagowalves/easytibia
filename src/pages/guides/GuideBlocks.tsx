import { useState } from "react";
import type { GuideBlock } from "../../lib/tibia/guide/types";
import { tibiaMapUrl, type Coord } from "../../lib/tibia/guide/map";

/** Link "ver no mapa" para o mapa comentado do TibiaMaps. */
function MapLink({ coord, label = "ver no mapa" }: { coord: Coord; label?: string }) {
  return (
    <a
      href={tibiaMapUrl(coord)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-0.5 whitespace-nowrap text-[11px] text-num underline decoration-dotted underline-offset-2 hover:text-seal"
      title={`${coord[0]}, ${coord[1]}, andar ${coord[2]}`}
    >
      {label} ↗
    </a>
  );
}

/**
 * Sprite da wiki num quadro de pergaminho. Os GIFs são 64x64 com bastante
 * margem transparente — exibimos grande e com downscale suave (nada de
 * `pixelated`, que "quebra" a arte em tamanhos não inteiros). Some se falhar.
 */
function SpriteImg({ src, alt, size = 46 }: { src: string; alt: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <span
      style={{ width: size, height: size }}
      className="grid shrink-0 place-items-center rounded-[4px] border border-[#cdbb90] bg-[#efe6cd] p-[2px]"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="max-h-full max-w-full object-contain [image-rendering:auto]"
      />
    </span>
  );
}

function CreditLine({ label, url }: { label: string; url: string }) {
  return (
    <p className="mt-2 text-[10.5px] text-ink-faint">
      Imagens:{" "}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-num underline decoration-dotted underline-offset-2 hover:text-seal"
      >
        {label}
      </a>
    </p>
  );
}

function Places({ items, iconCredit }: Extract<GuideBlock, { kind: "places" }>) {
  return (
    <div>
      <ul className="flex flex-col divide-y divide-parch-line">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
            {it.icon && <SpriteImg src={it.icon} alt={it.name} size={48} />}
            <div className="min-w-0 flex-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <b className="text-[12.5px] font-semibold text-ink">{it.name}</b>
                {it.meta && (
                  <span className="rounded-[3px] border border-[#b7a071] px-[5px] py-px text-[10px] text-ink-faint">
                    {it.meta}
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-[11.5px] leading-[1.5] text-ink-dim">{it.detail}</span>
            </div>
            {it.coord && (
              <span className="shrink-0 pt-0.5">
                <MapLink coord={it.coord} />
              </span>
            )}
          </li>
        ))}
      </ul>
      {iconCredit && <CreditLine {...iconCredit} />}
    </div>
  );
}

function Bestiary({ credit, creditUrl, creatures }: Extract<GuideBlock, { kind: "bestiary" }>) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 lg:grid-cols-3">
        {creatures.map((c, i) => (
          <li
            key={i}
            className="flex items-center gap-2.5 rounded-[4px] border border-parch-line bg-parch-2/50 px-2 py-1.5"
          >
            {c.sprite ? (
              <SpriteImg src={c.sprite} alt={c.name} size={48} />
            ) : (
              <span className="h-[48px] w-[48px] shrink-0 rounded-[4px] border border-dashed border-[#c6b489]" />
            )}
            <div className="min-w-0">
              <b className="block text-[12px] font-semibold leading-tight text-ink">{c.name}</b>
              <span className="text-[10.5px] text-ink-faint">
                {c.hp != null && `${c.hp} HP`}
                {c.hp != null && c.exp != null && " · "}
                {c.exp != null && `${c.exp} XP`}
                {c.note && ` · ${c.note}`}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <CreditLine label={credit} url={creditUrl} />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Renderizadores dos blocos de um capítulo do guia.
--------------------------------------------------------------------------- */

const CALLOUT_STYLE: Record<
  "tip" | "warn" | "info",
  { border: string; bg: string; label: string; labelColor: string }
> = {
  tip: { border: "border-l-herb", bg: "bg-[#e6e6c8]", label: "Dica", labelColor: "text-herb" },
  warn: { border: "border-l-seal", bg: "bg-[#efdcc9]", label: "Atenção", labelColor: "text-seal" },
  info: { border: "border-l-brass", bg: "bg-[#ece0c0]", label: "Nota", labelColor: "text-num" },
};

function Callout({ tone, text }: { tone: "tip" | "warn" | "info"; text: string }) {
  const s = CALLOUT_STYLE[tone];
  return (
    <div className={`rounded-[3px] border border-[#c6b489] border-l-4 ${s.border} ${s.bg} px-3.5 py-2.5`}>
      <span className={`mb-0.5 block text-[10px] font-bold uppercase tracking-[0.12em] ${s.labelColor}`}>
        {s.label}
      </span>
      <p className="m-0 text-[12.5px] leading-[1.55] text-ink">{text}</p>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-col gap-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-seal font-display text-[12px] font-bold text-[#f0e3c6]">
            {i + 1}
          </span>
          <span className="text-[12.5px] leading-[1.55] text-ink-dim">{it}</span>
        </li>
      ))}
    </ol>
  );
}

function Dialogue({
  npc,
  role,
  location,
  coord,
  lines,
  note,
}: Extract<GuideBlock, { kind: "dialogue" }>) {
  return (
    <div className="rounded-[4px] border border-[#c6b489] bg-parch-2 p-3.5">
      <div className="mb-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <b className="font-display text-[15px] font-semibold tracking-[0.3px] text-ink">{npc}</b>
        {role && (
          <span className="rounded-[3px] border border-[#b7a071] px-[5px] py-px text-[10px] text-ink-faint">
            {role}
          </span>
        )}
        {location && <span className="text-[11px] text-ink-faint">· {location}</span>}
        {coord && (
          <span className="ml-auto">
            <MapLink coord={coord} />
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {lines.map((l, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="flex items-center gap-1.5">
              <span className="text-[11px] text-ink-faint">você diz</span>
              <code className="rounded-[3px] bg-[#2a1d0e] px-1.5 py-0.5 font-mono text-[12px] font-bold text-brass-hi">
                {l.say}
              </code>
            </span>
            {l.reply && (
              <span className="pl-1 text-[11.5px] italic leading-[1.5] text-ink-dim">↳ {l.reply}</span>
            )}
          </div>
        ))}
      </div>
      {note && <p className="mt-2.5 text-[10.5px] leading-relaxed text-ink-faint">{note}</p>}
    </div>
  );
}

function WikiImage({
  src,
  alt,
  caption,
  credit,
  creditUrl,
  maxWidth,
  pixelated,
}: Extract<GuideBlock, { kind: "image" }>) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="m-0" style={maxWidth ? { maxWidth } : undefined}>
      {failed ? (
        <div className="flex min-h-[120px] items-center justify-center rounded-[4px] border border-dashed border-[#b39a6d] bg-parch-2 px-4 py-6 text-center text-[11.5px] text-ink-faint">
          Imagem indisponível — {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={pixelated ? { imageRendering: "pixelated" } : undefined}
          className="w-full rounded-[4px] border border-[#15100a] shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
        />
      )}
      <figcaption className="mt-1.5 text-[11px] leading-[1.5] text-ink-faint">
        {caption && <span className="text-ink-dim">{caption} </span>}
        <span>
          Fonte:{" "}
          <a
            href={creditUrl}
            target="_blank"
            rel="noreferrer"
            className="text-num underline decoration-dotted underline-offset-2 hover:text-seal"
          >
            {credit}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}

function Table({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr className="text-ink-faint">
            {columns.map((c) => (
              <th
                key={c}
                className="border-b-2 border-[#c6b489] px-2.5 py-[9px] text-left text-[10px] font-bold uppercase tracking-[0.08em] first:pl-0.5"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-[rgba(90,66,33,0.06)]">
              {r.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-parch-line px-2.5 py-[9px] align-top leading-[1.5] text-ink first:pl-0.5 first:font-semibold"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "text":
      return <p className="m-0 text-[13px] leading-[1.65] text-ink-dim">{block.text}</p>;
    case "steps":
      return <Steps items={block.items} />;
    case "dialogue":
      return <Dialogue {...block} />;
    case "places":
      return <Places {...block} />;
    case "bestiary":
      return <Bestiary {...block} />;
    case "image":
      return <WikiImage {...block} />;
    case "callout":
      return <Callout tone={block.tone} text={block.text} />;
    case "table":
      return <Table columns={block.columns} rows={block.rows} />;
  }
}
