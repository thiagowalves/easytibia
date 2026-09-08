import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { CalcNav } from "./CalcNav";
import {
  Card,
  Field,
  PageSub,
  PageTitle,
  ProvisionalNote,
  ResultBig,
  ResultRow,
  SectionCap,
  TextInput,
  Toggle,
} from "../../components/ui";
import { WEAPON_SKILLS, type SkillKind } from "../../lib/tibia/vocations";
import { weaponTriesBetween } from "../../lib/tibia/skills";
import { EXERCISE_TIERS, exercisePlan } from "../../lib/tibia/exercise";
import { fmtDuration, fmtInt, parseNumber } from "../../lib/format";
import { useVocation } from "../../state/vocation";

const DUMMY_BONUS = 0.1; // dummy particular da Store / QG

// Só skills de arma e escudo — magic level não usa exercise weapon.
const KINDS = WEAPON_SKILLS.filter((s) => s.id !== "magic");

export function ExerciseCalculator() {
  const { vocation } = useVocation();

  const [kind, setKind] = useState<SkillKind>("sword");
  const [current, setCurrent] = useState("30");
  const [progress, setProgress] = useState("0");
  const [target, setTarget] = useState("60");
  const [dummyBonus, setDummyBonus] = useState(true);

  const factor = vocation.factors[kind];
  const skillLabel = KINDS.find((s) => s.id === kind)?.label ?? kind;

  const r = useMemo(() => {
    const from = Math.max(0, Math.floor(parseNumber(current) || 0));
    const to = Math.max(0, Math.floor(parseNumber(target) || 0));
    const pct = Math.min(100, Math.max(0, parseNumber(progress) || 0)) / 100;

    const shielding = kind === "shielding";
    const total = weaponTriesBetween(from, to, factor, { shielding });
    const oneLevel = weaponTriesBetween(from, from + 1, factor, { shielding });
    const chargesNeeded = Math.max(0, total - oneLevel * pct);

    const bonus = dummyBonus ? DUMMY_BONUS : 0;
    const plans = EXERCISE_TIERS.map((tier) => ({
      tier,
      ...exercisePlan(chargesNeeded, tier, bonus),
    }));
    const hours = (chargesNeeded * 2) / (1 + bonus) / 3600;

    return { from, to, chargesNeeded, hours, plans, reachable: to > from };
  }, [current, progress, target, dummyBonus, factor, kind]);

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Exercise Weapons" />}>
      <PageTitle>Exercise Weapons</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Quantas armas de treino de cada tipo, quanto tempo no dummy e quanto custa — em gold e em
          Tibia Coins.
        </PageSub>
      </div>

      <CalcNav />

      <div className="grid grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-[15px] p-5">
          <Field label="Habilidade">
            <select
              className="field-input"
              value={kind}
              onChange={(e) => setKind(e.currentTarget.value as SkillKind)}
            >
              {KINDS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Skill atual">
              <TextInput value={current} onChange={setCurrent} />
            </Field>
            <Field label="Progresso" hint="(%)">
              <TextInput value={progress} onChange={setProgress} />
            </Field>
          </div>

          <Field label="Skill alvo">
            <TextInput value={target} onChange={setTarget} />
          </Field>

          <Toggle
            checked={dummyBonus}
            onChange={setDummyBonus}
            title="Dummy com bônus (+10%)"
            description="Dummy particular da Store ou o do QG da guild"
          />

          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-faint">
            1 carga = 1 acerto a cada 2 s. O custo por carga é igual nas três versões — a maior só
            evita ficar trocando de arma.
          </p>

          {vocation.provisional && (
            <ProvisionalNote>
              As constantes de skill da vocação {vocation.name} ainda não foram confirmadas — trate o
              resultado como aproximado.
            </ProvisionalNote>
          )}
        </Card>

        <div className="flex flex-col gap-[22px]">
          <Card className="p-[22px]">
            <SectionCap tone="ink">
              Skill {r.from} → {r.to} · {skillLabel} · {vocation.name}
            </SectionCap>
            <ResultBig value={fmtInt(r.chargesNeeded)} unit="cargas" />
            {r.reachable ? (
              <>
                <ResultRow
                  first
                  label={`Tempo de treino${dummyBonus ? " (com +10%)" : ""}`}
                  value={fmtDuration(r.hours)}
                />
                <p className="mt-3 text-[12px] text-ink-dim">
                  Escolha a versão da arma na tabela abaixo — o tempo é o mesmo, muda só a quantidade.
                </p>
              </>
            ) : (
              <p className="text-[12px] text-ink-dim">Defina uma skill alvo acima da atual.</p>
            )}
          </Card>

          <Card className="p-[16px_18px]">
            <SectionCap tone="ink" className="mb-2.5">
              Por versão da arma
            </SectionCap>
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr className="text-ink-faint">
                  {["Versão", "Qtd.", "Tibia Coins", "Gold (NPC)"].map((h) => (
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
                {r.plans.map(({ tier, count, tibiaCoins, gold }) => (
                  <tr key={tier.id} className="hover:bg-[rgba(90,66,33,0.06)]">
                    <td className="border-b border-parch-line py-[9px] pl-0.5 pr-2.5 text-ink">
                      {tier.label}
                      <span className="text-ink-faint"> · {fmtInt(tier.charges)}c</span>
                    </td>
                    <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                      {fmtInt(count)}
                    </td>
                    <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                      {fmtInt(tibiaCoins)}
                    </td>
                    <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                      {fmtInt(gold)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
              Preços de referência da TibiaWiki (NPC Comerciante de Armas: 347.222 gp / 500 cargas). O
              preço real em gold varia com o mercado do seu mundo.
            </p>
          </Card>
        </div>
      </div>
    </Page>
  );
}
