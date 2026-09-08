import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { PageSub, PageTitle, SectionCap } from "../../components/ui";
import { ArrowRightIcon } from "../../components/icons";
import { CHAPTERS, type GuideChapter } from "../../lib/tibia/guide";
import { sprite } from "../../lib/tibia/guide/sprites";
import { Block } from "./GuideBlocks";
import { ChapterMap } from "./ChapterMap";

/** Um sprite representativo por capítulo (quando existe). */
const CHAPTER_SPRITE: Record<string, string | undefined> = {
  newhaven: sprite("Gustavo, the Guard"),
  targuna: sprite("Herald of Fire"),
  continente: sprite("Norf"),
  tasks: sprite("Grizzly Adams"),
};

/* ---------------------------------------------------------------------------
   Guia do Novato — lista de capítulos + leitura de um capítulo.
   O progresso do checklist fica no localStorage (por capítulo).
--------------------------------------------------------------------------- */

const STORAGE_KEY = "easytibia.guide.progress";

type Progress = Record<string, number[]>; // chapterId -> índices marcados

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

function saveProgress(p: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* modo privado / storage bloqueado — ignora */
  }
}

export function GuidesPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => saveProgress(progress), [progress]);

  const chapter = openId ? CHAPTERS.find((c) => c.id === openId) ?? null : null;

  if (chapter) {
    return (
      <ChapterView
        chapter={chapter}
        done={progress[chapter.id] ?? []}
        onToggle={(idx) =>
          setProgress((prev) => {
            const cur = new Set(prev[chapter.id] ?? []);
            if (cur.has(idx)) cur.delete(idx);
            else cur.add(idx);
            return { ...prev, [chapter.id]: [...cur].sort((a, b) => a - b) };
          })
        }
        onBack={() => setOpenId(null)}
      />
    );
  }

  return (
    <Page crumb={<Crumb current="Guia do Novato" />}>
      <PageTitle>Guia do Novato</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          A jornada do personagem recém-criado até o continente, em capítulos. Quem falar, o que
          dizer e para onde ir — passo a passo.
        </PageSub>
      </div>

      <ol className="mt-[22px] flex flex-col gap-2.5">
        {CHAPTERS.map((c) => {
          const total = c.checklist.length;
          const done = (progress[c.id] ?? []).length;
          const ready = c.status === "ready";
          return (
            <li key={c.id}>
              <button
                disabled={!ready}
                onClick={() => ready && setOpenId(c.id)}
                className={
                  "parch-card flex w-full items-center gap-3.5 p-[13px_16px] text-left transition-all duration-150 " +
                  (ready
                    ? "hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,247,224,0.55),inset_0_0_0_1px_rgba(194,137,43,0.6),0_8px_18px_rgba(0,0,0,0.45)]"
                    : "cursor-not-allowed opacity-55")
                }
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#7a2f27] bg-[radial-gradient(circle_at_38%_30%,#b0463a,#7a2f27)] font-display text-[14px] font-bold text-[#f6e4b6] shadow-[0_2px_5px_rgba(0,0,0,0.35)]">
                  {c.order}
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                  {CHAPTER_SPRITE[c.id] && (
                    <img
                      src={CHAPTER_SPRITE[c.id]}
                      alt=""
                      className="h-full w-full rounded-[5px] border border-[#b7a271] bg-[radial-gradient(circle_at_38%_30%,#f3ecd6,#e0d3ac)] p-0.5 object-contain"
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <b className="font-display text-[15px] font-bold tracking-[0.3px] text-ink">
                      {c.title}
                    </b>
                    {c.levelRange && c.levelRange !== "—" && (
                      <span className="text-[11px] text-ink-faint">nível {c.levelRange}</span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-[1.45] text-ink-dim">
                    {c.subtitle}
                  </span>
                </span>
                {ready ? (
                  <span className="flex shrink-0 items-center gap-2.5">
                    {done > 0 && (
                      <span className="text-[10.5px] text-ink-faint">
                        {done}/{total}
                      </span>
                    )}
                    <span className="text-num">
                      <ArrowRightIcon />
                    </span>
                  </span>
                ) : (
                  <span className="shrink-0 rounded-[3px] border border-[#b7a071] px-[6px] py-px text-[10px] text-ink-faint">
                    em breve
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </Page>
  );
}

function ChapterView({
  chapter,
  done,
  onToggle,
  onBack,
}: {
  chapter: GuideChapter;
  done: number[];
  onToggle: (idx: number) => void;
  onBack: () => void;
}) {
  const doneSet = useMemo(() => new Set(done), [done]);

  return (
    <Page crumb={<Crumb path="Guia do Novato" current={chapter.title} />}>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-[12px] text-cream-dim transition-colors hover:text-cream"
      >
        <span className="rotate-180">
          <ArrowRightIcon />
        </span>
        Todos os capítulos
      </button>

      <PageTitle>{chapter.title}</PageTitle>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <PageSub>{chapter.subtitle}</PageSub>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {chapter.levelRange && chapter.levelRange !== "—" && (
          <Tag>nível {chapter.levelRange}</Tag>
        )}
        {chapter.estimatedTime && <Tag>{chapter.estimatedTime}</Tag>}
        <Tag>capítulo {chapter.order}</Tag>
      </div>

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_300px] items-start gap-[22px]">
        <div className="flex flex-col gap-5">
          {chapter.intro.length > 0 && (
            <div className="parch-card p-[16px_18px]">
              {chapter.intro.map((p, i) => (
                <p
                  key={i}
                  className="m-0 text-[13px] leading-[1.65] text-ink-dim [&+p]:mt-2.5"
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          <ChapterMap chapter={chapter} />

          {chapter.sections.map((s, i) => (
            <section
              key={i}
              className="parch-card p-[16px_18px]"
            >
              <SectionCap tone="ink" className="mb-3">
                {s.heading}
              </SectionCap>
              <div className="flex flex-col gap-3">
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </div>
            </section>
          ))}

          {chapter.pitfalls.length > 0 && (
            <section className="parch-card p-[16px_18px]">
              <SectionCap tone="ink" className="mb-3">
                Erros comuns
              </SectionCap>
              <ul className="flex flex-col gap-2">
                {chapter.pitfalls.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12.5px] leading-[1.55] text-ink-dim">
                    <span className="mt-[3px] text-seal">✕</span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {chapter.sources.length > 0 && (
            <div className="parch-card p-[14px_18px]">
              <SectionCap tone="ink" className="mb-2">
                Fontes
              </SectionCap>
              <ul className="flex flex-col gap-1">
                {chapter.sources.map((src) => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11.5px] text-num underline decoration-dotted underline-offset-2 hover:text-seal"
                    >
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="sticky top-0 parch-card p-4">
          <SectionCap tone="ink" className="mb-3">
            Checklist do capítulo
          </SectionCap>
          <div className="flex flex-col gap-2">
            {chapter.checklist.map((item, i) => {
              const checked = doneSet.has(i);
              return (
                <button
                  key={i}
                  onClick={() => onToggle(i)}
                  className="flex items-start gap-2.5 text-left"
                >
                  <span
                    className={
                      "mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border text-[11px] font-bold transition-colors " +
                      (checked
                        ? "border-[#a9701f] bg-[#d8a24a] text-[#3a2b16]"
                        : "border-[#a98f60] bg-parch-2 text-transparent")
                    }
                  >
                    ✓
                  </span>
                  <span
                    className={
                      "text-[12px] leading-[1.45] " +
                      (checked ? "text-ink-faint line-through" : "text-ink-dim")
                    }
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 border-t border-parch-line pt-2.5 text-[10.5px] text-ink-faint">
            {doneSet.size} de {chapter.checklist.length} concluídos — o progresso fica salvo neste
            computador.
          </p>
        </aside>
      </div>
    </Page>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[3px] border border-oak-line px-[7px] py-px text-[10.5px] text-cream-faint">
      {children}
    </span>
  );
}
