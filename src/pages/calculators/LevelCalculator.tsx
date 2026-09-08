import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { CalcNav } from "./CalcNav";
import {
  Card,
  Field,
  PageSub,
  PageTitle,
  ResultBig,
  ResultRow,
  SectionCap,
  TextInput,
  Toggle,
} from "../../components/ui";
import {
  expToNextLevel,
  totalExpForLevel,
} from "../../lib/tibia/experience";
import { fmtDuration, fmtInt, parseNumber } from "../../lib/format";

const STAMINA_MULTIPLIER = 1.5; // +50% na stamina verde
const REFERENCE_LEVELS = [20, 50, 100, 150, 200];

export function LevelCalculator() {
  const [currentLevel, setCurrentLevel] = useState("45");
  const [currentExp, setCurrentExp] = useState("");
  const [targetLevel, setTargetLevel] = useState("60");
  const [expPerHour, setExpPerHour] = useState("350.000");
  const [useStamina, setUseStamina] = useState(true);

  const r = useMemo(() => {
    const from = Math.max(1, Math.floor(parseNumber(currentLevel) || 0));
    const to = Math.max(1, Math.floor(parseNumber(targetLevel) || 0));
    const perHour = parseNumber(expPerHour);

    const baseFloor = totalExpForLevel(from);
    const typedExp = parseNumber(currentExp);
    const haveExp = Number.isFinite(typedExp) && typedExp >= baseFloor;
    const currentTotal = haveExp ? typedExp : baseFloor;

    const targetTotal = totalExpForLevel(to);
    const remaining = Math.max(0, targetTotal - currentTotal);

    const reachable = to > from && remaining > 0;
    const hasRate = Number.isFinite(perHour) && perHour > 0;

    return {
      from,
      to,
      currentTotal,
      targetTotal,
      remaining,
      reachable,
      hoursPlain: hasRate ? remaining / perHour : NaN,
      hoursStamina: hasRate ? remaining / (perHour * STAMINA_MULTIPLIER) : NaN,
    };
  }, [currentLevel, currentExp, targetLevel, expPerHour]);

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Nível" />}>
      <PageTitle>Calculadora de Nível</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Quanto de experiência falta para o seu próximo objetivo — e quanto tempo isso leva na sua
          hunt.
        </PageSub>
      </div>

      <CalcNav />

      <div className="grid grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-[15px] p-5">
          <Field label="Nível atual">
            <TextInput value={currentLevel} onChange={setCurrentLevel} />
          </Field>
          <Field label="XP atual" hint="(opcional)">
            <TextInput value={currentExp} onChange={setCurrentExp} mono />
          </Field>
          <Field label="Nível alvo">
            <TextInput value={targetLevel} onChange={setTargetLevel} />
          </Field>
          <Field label="XP por hora" hint="(média da hunt)">
            <TextInput value={expPerHour} onChange={setExpPerHour} mono />
          </Field>
          <Toggle
            checked={useStamina}
            onChange={setUseStamina}
            title="Contar bônus de Stamina"
            description="+50% de XP enquanto a stamina está verde"
          />
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-faint">
            A fórmula de XP por nível é a oficial do Tibia. A estimativa de tempo é aproximada.
          </p>
        </Card>

        <Card className="p-[22px]">
          <SectionCap tone="ink">Falta para o nível {r.to}</SectionCap>
          <ResultBig value={fmtInt(r.remaining)} unit="XP" />

          <ResultRow first label={`XP total no nível ${r.to}`} value={fmtInt(r.targetTotal)} />
          <ResultRow label={`Sua XP atual (nível ${r.from})`} value={fmtInt(r.currentTotal)} />
          <ResultRow label="Diferença" value={fmtInt(r.remaining)} tone="positive" />

          <div className="my-[18px] h-px bg-parch-line" />

          {r.reachable ? (
            <>
              <SectionCap tone="ink">
                Tempo estimado {Number.isFinite(r.hoursPlain) ? "" : "— informe a XP/h"}
              </SectionCap>
              {Number.isFinite(r.hoursPlain) && (
                <>
                  <ResultRow first label="Sem bônus" value={fmtDuration(r.hoursPlain)} />
                  {useStamina && (
                    <ResultRow
                      label="Com Stamina (+50%)"
                      value={fmtDuration(r.hoursStamina)}
                      tone="positive"
                    />
                  )}
                </>
              )}
              <p className="mt-3.5 text-[11px] leading-relaxed text-ink-faint">
                A stamina verde rende +50% de XP por cerca de 1 h por dia; depois volta ao normal e,
                abaixo de 14 h, cai para 50%.
              </p>
            </>
          ) : (
            <p className="text-[12px] text-ink-dim">
              Defina um nível alvo acima do nível atual para ver a estimativa de tempo.
            </p>
          )}
        </Card>
      </div>

      <Card className="mt-1 p-[16px_18px]">
        <SectionCap tone="ink" className="mb-2.5">
          Experiência por nível — referência
        </SectionCap>
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr className="text-ink-faint">
              <th className="border-b-2 border-[#c6b489] py-[9px] pl-0.5 pr-2.5 text-left text-[10px] font-bold uppercase tracking-[0.08em]">
                Nível
              </th>
              <th className="border-b-2 border-[#c6b489] px-2.5 py-[9px] text-left text-[10px] font-bold uppercase tracking-[0.08em]">
                XP acumulada
              </th>
              <th className="border-b-2 border-[#c6b489] px-2.5 py-[9px] text-left text-[10px] font-bold uppercase tracking-[0.08em]">
                XP para subir 1 nível
              </th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE_LEVELS.map((lvl) => (
              <tr key={lvl} className="hover:bg-[rgba(90,66,33,0.06)]">
                <td className="border-b border-parch-line py-[9px] pl-0.5 pr-2.5 text-ink">{lvl}</td>
                <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                  {fmtInt(totalExpForLevel(lvl))}
                </td>
                <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                  {fmtInt(expToNextLevel(lvl))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Page>
  );
}
