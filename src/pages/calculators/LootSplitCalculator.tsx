import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { CalcNav } from "./CalcNav";
import { Card, PageSub, PageTitle, ResultRow, SectionCap } from "../../components/ui";
import { computeSplit, parseHuntSession } from "../../lib/tibia/lootsplit";
import { fmtInt } from "../../lib/format";

const EXAMPLE = `Session data: From 2026-09-08, 20:04:11 to 2026-09-08, 22:37:52
Session: 02:33h
Loot Type: Market
Loot: 2,904,336
Supplies: 1,438,150
Balance: 1,466,186
Healing: 0
Damage: 7,180,225
Damage/h: 2,815,382

Aventureiro Iniciante
\tLoot: 1,502,110
\tSupplies: 812,400
\tBalance: 689,710
\tDamage: 3,910,120
\tHealing: 0
Druida da Guilda
\tLoot: 1,402,226
\tSupplies: 625,750
\tBalance: 776,476
\tDamage: 3,270,105
\tHealing: 0`;

export function LootSplitCalculator() {
  const [text, setText] = useState("");

  const session = useMemo(() => (text.trim() ? parseHuntSession(text) : null), [text]);
  const split = useMemo(
    () => (session && session.members.length > 1 ? computeSplit(session.members) : null),
    [session],
  );

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Loot Split" />}>
      <PageTitle>Loot Split</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Cole o texto do <b>Party Hunt Analyser</b> do cliente (botão de copiar) e veja quem
          transfere quanto para quem.
        </PageSub>
      </div>

      <CalcNav />

      <div className="grid grid-cols-[minmax(0,460px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-3 p-5">
          <textarea
            rows={16}
            style={{ minHeight: 320 }}
            className="field-input resize-y font-mono text-[11.5px] leading-[1.5]"
            placeholder="Cole aqui o resultado da sessão de caça…"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            spellCheck={false}
          />
          <div className="flex items-center justify-between">
            <button
              onClick={() => setText(EXAMPLE)}
              className="rounded-[3px] border border-parch-line bg-parch-2 px-[11px] py-[7px] text-[11.5px] text-ink transition-colors hover:border-brass hover:text-num"
            >
              Colar exemplo
            </button>
            {text && (
              <button
                onClick={() => setText("")}
                className="text-[11.5px] text-ink-faint underline decoration-dotted underline-offset-2 hover:text-seal"
              >
                Limpar
              </button>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-ink-faint">
            No cliente: janela <b>Analytics</b> → aba <b>Party Hunt</b> → ícone de copiar. Funciona
            com o texto em inglês ou português.
          </p>
        </Card>

        <div className="flex flex-col gap-[22px]">
          {!text.trim() && (
            <Card className="p-[22px]">
              <p className="text-[12.5px] text-ink-dim">
                Aguardando o texto da sessão. Use “Colar exemplo” para ver o formato.
              </p>
            </Card>
          )}

          {text.trim() && !session && (
            <Card className="p-[22px]">
              <p className="text-[12.5px] text-seal">
                Não consegui ler a sessão. Confira se colou o texto completo do Party Hunt Analyser
                (com o nome e o Balance de cada participante).
              </p>
            </Card>
          )}

          {session && (
            <Card className="p-[22px]">
              <SectionCap tone="ink">
                Sessão {session.sessionLength ? `· ${session.sessionLength}` : ""}
              </SectionCap>
              <ResultRow first label="Loot total" value={`${fmtInt(session.totalLoot)} gp`} />
              <ResultRow label="Suprimentos (waste)" value={`${fmtInt(session.totalSupplies)} gp`} />
              <ResultRow
                label="Balance total"
                value={`${fmtInt(session.totalBalance)} gp`}
                tone={session.totalBalance >= 0 ? "positive" : "default"}
              />
              {split && (
                <ResultRow
                  label={`Por pessoa (${session.members.length})`}
                  value={`${fmtInt(split.perPerson)} gp`}
                />
              )}
            </Card>
          )}

          {session && split && (
            <>
              <Card className="p-[16px_18px]">
                <SectionCap tone="ink" className="mb-2.5">
                  Por participante
                </SectionCap>
                <table className="w-full border-collapse text-[12.5px]">
                  <thead>
                    <tr className="text-ink-faint">
                      {["Nome", "Balance", "Diferença"].map((h) => (
                        <th
                          key={h}
                          className="border-b-2 border-[#c6b489] px-2.5 py-[9px] text-left text-[10px] font-bold uppercase tracking-[0.08em] first:pl-0.5"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {split.rows.map((row) => (
                      <tr key={row.name} className="hover:bg-[rgba(90,66,33,0.06)]">
                        <td className="border-b border-parch-line py-[9px] pl-0.5 pr-2.5 text-ink">
                          {row.name}
                        </td>
                        <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                          {fmtInt(row.balance)}
                        </td>
                        <td
                          className={
                            "border-b border-parch-line px-2.5 py-[9px] font-mono " +
                            (row.diff > 0
                              ? "text-herb"
                              : row.diff < 0
                                ? "text-seal"
                                : "text-ink-faint")
                          }
                        >
                          {row.diff > 0 ? "recebe " : row.diff < 0 ? "paga " : ""}
                          {fmtInt(Math.abs(row.diff))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              <Card className="p-[16px_18px]">
                <SectionCap tone="ink" className="mb-2.5">
                  Transferências
                </SectionCap>
                {split.transfers.length === 0 ? (
                  <p className="text-[12.5px] text-ink-dim">
                    Já está tudo equilibrado — ninguém precisa transferir.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {split.transfers.map((t, i) => (
                      <li
                        key={i}
                        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-ink"
                      >
                        <b className="font-semibold">{t.from}</b>
                        <span className="text-ink-faint">envia a</span>
                        <b className="font-semibold">{t.to}</b>
                        <code className="ml-auto rounded-[3px] bg-[#2a1d0e] px-2 py-0.5 font-mono text-[11.5px] text-brass-hi">
                          transfer {t.amount} to {t.to}
                        </code>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
                  Digite o comando no chat padrão, perto do banco, com o dinheiro na mochila.
                </p>
              </Card>
            </>
          )}

          {session && !split && (
            <Card className="p-[22px]">
              <p className="text-[12.5px] text-ink-dim">
                Só encontrei um participante — a divisão precisa de dois ou mais.
              </p>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}
