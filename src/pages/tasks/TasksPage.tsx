import { useEffect, useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { Card, PageSub, PageTitle, SectionCap } from "../../components/ui";
import { GTASKS, RANKS, rankForPoints, type GTask } from "../../lib/tibia/gtasks";
import { fmtInt } from "../../lib/format";

const STORAGE_KEY = "easytibia.tasks";
const MAX_ACTIVE = 3;

interface State {
  points: number;
  done: string[];
  active: { id: string; kills: number }[];
}

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as State;
      return { points: p.points ?? 0, done: p.done ?? [], active: p.active ?? [] };
    }
  } catch {
    /* ignore */
  }
  return { points: 0, done: [], active: [] };
}

function save(s: State) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

export function TasksPage() {
  const [state, setState] = useState<State>(load);
  useEffect(() => save(state), [state]);

  const { current, next } = rankForPoints(state.points);
  const pct = next
    ? Math.min(100, Math.round((state.points / next.points) * 100))
    : 100;

  const doneSet = new Set(state.done);

  const groups = useMemo(
    () => [
      { label: "Edron — Daniel Steelsoul (não dá pontos de rank)", tasks: GTASKS.filter((t) => t.giver === "Daniel Steelsoul") },
      { label: "Grizzly Adams — nível 6–49", tasks: GTASKS.filter((t) => t.giver === "Grizzly Adams" && t.level[0] === 6) },
      { label: "Grizzly Adams — nível 50–79", tasks: GTASKS.filter((t) => t.giver === "Grizzly Adams" && t.level[0] === 50) },
    ],
    [],
  );

  function activate(id: string) {
    setState((s) =>
      s.active.length >= MAX_ACTIVE || s.active.some((a) => a.id === id)
        ? s
        : { ...s, active: [...s.active, { id, kills: 0 }] },
    );
  }
  function setKills(id: string, kills: number) {
    setState((s) => ({
      ...s,
      active: s.active.map((a) => (a.id === id ? { ...a, kills: Math.max(0, kills) } : a)),
    }));
  }
  function cancel(id: string) {
    setState((s) => ({ ...s, active: s.active.filter((a) => a.id !== id) }));
  }
  function complete(task: GTask) {
    setState((s) => ({
      points: s.points + task.points,
      done: s.done.includes(task.id) ? s.done : [...s.done, task.id],
      active: s.active.filter((a) => a.id !== task.id),
    }));
  }
  function undo(task: GTask) {
    setState((s) => ({
      ...s,
      points: Math.max(0, s.points - task.points),
      done: s.done.filter((d) => d !== task.id),
    }));
  }
  function reset() {
    setState({ points: 0, done: [], active: [] });
  }

  return (
    <Page crumb={<Crumb current="Tasks" />}>
      <PageTitle>Tracker de Tasks</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Ative até 3 tasks do Grizzly Adams, conte os kills e acompanhe seus pontos rumo ao próximo
          rank. O progresso fica salvo neste computador.
        </PageSub>
      </div>

      <Card className="mb-5 mt-[22px] p-[18px_20px]">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <SectionCap tone="ink">
            {current ? `Rank: ${current.name}` : "Sem rank ainda"} · {state.points} pontos
          </SectionCap>
          <button
            onClick={reset}
            className="text-[11px] text-ink-faint underline decoration-dotted underline-offset-2 hover:text-seal"
          >
            zerar
          </button>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-parch-2">
          <div className="h-full rounded-full bg-seal" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1.5 text-[11px] text-ink-faint">
          {next
            ? `Faltam ${next.points - state.points} pontos para ${next.name} (precisa de nível ${next.minLevel}).`
            : "Rank máximo alcançado."}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {RANKS.map((r) => (
            <span
              key={r.name}
              className={
                "rounded-[3px] border px-[6px] py-px text-[10px] " +
                (state.points >= r.points
                  ? "border-[#a9701f] bg-[#d8a24a] text-[#3a2b16]"
                  : "border-parch-line text-ink-faint")
              }
            >
              {r.name} · {r.points}
            </span>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-5">
        {groups.map((g) => (
          <section
            key={g.label}
            className="rounded-[4px] border border-[#15100a] bg-parch p-[6px_18px_12px] shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
          >
            <SectionCap tone="ink" className="mb-1 mt-3">
              {g.label}
            </SectionCap>
            <table className="w-full border-collapse text-[12.5px]">
              <tbody>
                {g.tasks.map((t) => {
                  const act = state.active.find((a) => a.id === t.id);
                  const isDone = doneSet.has(t.id);
                  return (
                    <tr key={t.id} className="align-middle">
                      <td className="w-full border-b border-parch-line py-[10px] pl-0.5 pr-2.5">
                        <b className="font-semibold text-ink">
                          {t.count} {t.creature}
                        </b>
                        <span className="ml-2 text-[11px] text-ink-faint">
                          {t.points > 0 && `${t.points} pt · `}
                          {fmtInt(t.exp)} exp
                          {t.boss && ` · boss: ${t.boss}`}
                        </span>
                      </td>
                      <td className="border-b border-parch-line px-2.5 py-[10px] text-right whitespace-nowrap">
                        {act ? (
                          <span className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setKills(t.id, act.kills - 10)}
                              className="h-[22px] w-[22px] rounded-[3px] border border-parch-line bg-parch-2 font-mono text-[12px] text-ink hover:border-brass"
                            >
                              −
                            </button>
                            <input
                              value={act.kills}
                              onChange={(e) =>
                                setKills(t.id, Math.floor(Number(e.currentTarget.value) || 0))
                              }
                              inputMode="numeric"
                              className="w-[52px] rounded-[3px] border border-[#b39a6d] bg-parch-2 px-1 py-0.5 text-center font-mono text-[12px] text-ink"
                            />
                            <button
                              onClick={() => setKills(t.id, act.kills + 10)}
                              className="h-[22px] w-[22px] rounded-[3px] border border-parch-line bg-parch-2 font-mono text-[12px] text-ink hover:border-brass"
                            >
                              +
                            </button>
                            <span className="ml-0.5 text-[11px] text-ink-faint">/ {t.count}</span>
                            {act.kills >= t.count ? (
                              <button
                                onClick={() => complete(t)}
                                className="ml-1 rounded-[3px] border border-herb bg-[#e6e6c8] px-2 py-0.5 text-[11px] font-semibold text-herb"
                              >
                                concluir
                              </button>
                            ) : (
                              <button
                                onClick={() => cancel(t.id)}
                                className="ml-1 text-[11px] text-ink-faint underline decoration-dotted hover:text-seal"
                              >
                                cancelar
                              </button>
                            )}
                          </span>
                        ) : isDone ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-herb">✓ concluída</span>
                            <button
                              onClick={() => undo(t)}
                              className="text-[11px] text-ink-faint underline decoration-dotted hover:text-seal"
                            >
                              refazer
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => activate(t.id)}
                            disabled={state.active.length >= MAX_ACTIVE}
                            className={
                              "rounded-[3px] border px-2.5 py-1 text-[11px] font-medium " +
                              (state.active.length >= MAX_ACTIVE
                                ? "cursor-not-allowed border-parch-line text-ink-faint"
                                : "border-parch-line bg-parch-2 text-ink hover:border-brass hover:text-num")
                            }
                          >
                            ativar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-ink-faint">
        {state.active.length}/{MAX_ACTIVE} tasks ativas · {state.done.length} concluídas. As tasks são
        repetíveis (até 3 vezes na faixa de nível). Veja a mecânica completa no capítulo “Tasks do
        Grizzly Adams”.
      </p>
    </Page>
  );
}
