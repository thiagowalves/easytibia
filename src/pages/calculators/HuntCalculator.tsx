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
import { expBetweenLevels } from "../../lib/tibia/experience";
import { parseHuntSession, sessionHours } from "../../lib/tibia/lootsplit";
import { fmtDuration, fmtInt, parseNumber } from "../../lib/format";

const STAMINA_MULT = 1.5;

export function HuntCalculator() {
  const [paste, setPaste] = useState("");
  const [xpHour, setXpHour] = useState("300.000");
  const [profitHour, setProfitHour] = useState("50.000");
  const [level, setLevel] = useState("50");
  const [target, setTarget] = useState("60");
  const [useStamina, setUseStamina] = useState(true);

  const session = useMemo(() => (paste.trim() ? parseHuntSession(paste) : null), [paste]);

  const derived = useMemo(() => {
    if (!session) return null;
    const hrs = sessionHours(session.sessionLength);
    const xpH =
      session.xpPerHour ??
      (Number.isFinite(hrs) && hrs > 0 && session.xpGain != null ? session.xpGain / hrs : NaN);
    const profitH = Number.isFinite(hrs) && hrs > 0 ? session.totalBalance / hrs : NaN;
    return { hrs, xpH, profitH };
  }, [session]);

  const r = useMemo(() => {
    const from = Math.max(1, Math.floor(parseNumber(level) || 0));
    const to = Math.max(1, Math.floor(parseNumber(target) || 0));

    const xpH =
      derived && Number.isFinite(derived.xpH) ? derived.xpH : parseNumber(xpHour);
    const profitH =
      derived && Number.isFinite(derived.profitH) ? derived.profitH : parseNumber(profitHour);

    const xpNeeded = expBetweenLevels(from, to);
    const hasXpRate = Number.isFinite(xpH) && xpH > 0;
    const hoursPlain = hasXpRate ? xpNeeded / xpH : NaN;
    const hoursStamina = hasXpRate ? xpNeeded / (xpH * STAMINA_MULT) : NaN;
    const profitTotal =
      hasXpRate && Number.isFinite(profitH) ? profitH * hoursPlain : NaN;

    return {
      from,
      to,
      xpH,
      profitH,
      xpNeeded,
      hoursPlain,
      hoursStamina,
      profitTotal,
      reachable: to > from,
      fromSession: Boolean(derived && Number.isFinite(derived.xpH)),
    };
  }, [level, target, xpHour, profitHour, derived]);

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Análise de Hunt" />}>
      <PageTitle>Análise de Hunt</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          XP/h e lucro/h de um spot — e quanto tempo até o seu próximo nível. Cole a sessão solo do
          cliente ou preencha à mão.
        </PageSub>
      </div>

      <CalcNav />

      <div className="grid grid-cols-[minmax(0,440px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-[15px] p-5">
          <Field label="Sessão do cliente" hint="(opcional — cola aqui)">
            <textarea
              rows={6}
              className="field-input resize-y font-mono text-[11px] leading-[1.5]"
              placeholder="Cole o texto da Hunting Session (solo)…"
              value={paste}
              onChange={(e) => setPaste(e.currentTarget.value)}
              spellCheck={false}
            />
          </Field>

          {r.fromSession && (
            <p className="rounded-[3px] border border-[#bb8a3c] border-l-4 border-l-herb bg-[#e8e6c9] px-3 py-2 text-[11px] text-[#3f3a1f]">
              Usando os números da sessão colada. Os campos abaixo ficam de reserva.
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Field label="XP por hora">
              <TextInput value={xpHour} onChange={setXpHour} mono />
            </Field>
            <Field label="Lucro por hora">
              <TextInput value={profitHour} onChange={setProfitHour} mono />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Nível atual">
              <TextInput value={level} onChange={setLevel} />
            </Field>
            <Field label="Nível alvo">
              <TextInput value={target} onChange={setTarget} />
            </Field>
          </div>

          <Toggle
            checked={useStamina}
            onChange={setUseStamina}
            title="Contar bônus de Stamina"
            description="+50% de XP enquanto a stamina está verde"
          />
        </Card>

        <Card className="p-[22px]">
          <SectionCap tone="ink">Do nível {r.from} ao {r.to}</SectionCap>
          <ResultBig
            value={Number.isFinite(r.hoursPlain) ? fmtDuration(r.hoursPlain) : "—"}
            unit="de hunt"
          />

          <ResultRow first label="XP por hora" value={`${fmtInt(r.xpH)} xp`} />
          <ResultRow label="Lucro por hora" value={`${fmtInt(r.profitH)} gp`} />
          <ResultRow label={`XP faltando (${r.from} → ${r.to})`} value={fmtInt(r.xpNeeded)} />

          {r.reachable ? (
            <>
              <div className="my-[18px] h-px bg-parch-line" />
              <SectionCap tone="ink">Estimativa</SectionCap>
              <ResultRow first label="Tempo (stamina normal)" value={fmtDuration(r.hoursPlain)} />
              {useStamina && (
                <ResultRow
                  label="Tempo (stamina verde +50%)"
                  value={fmtDuration(r.hoursStamina)}
                  tone="positive"
                />
              )}
              <ResultRow
                label="Lucro no caminho"
                value={Number.isFinite(r.profitTotal) ? `${fmtInt(r.profitTotal)} gp` : "—"}
                tone={r.profitTotal >= 0 ? "positive" : "default"}
              />
              <p className="mt-3.5 text-[11px] leading-relaxed text-ink-faint">
                O lucro no caminho usa a stamina normal. A stamina verde rende ~1 h/dia de +50% de XP;
                depois volta ao normal.
              </p>
            </>
          ) : (
            <p className="mt-3.5 text-[12px] text-ink-dim">
              Defina um nível alvo acima do atual.
            </p>
          )}
        </Card>
      </div>
    </Page>
  );
}
