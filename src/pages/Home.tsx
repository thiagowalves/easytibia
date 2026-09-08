import { Page } from "../components/Page";
import { Crumb } from "../components/Topbar";
import { SectionCap } from "../components/ui";
import { ArrowRightIcon, NAV_ICON, ShieldIcon, VOCATION_FIGURE } from "../components/icons";
import { useRouter, type RouteId } from "../state/router";
import { useVocation } from "../state/vocation";

const STEPS = [
  { n: "I", title: "Escolha sua vocação", text: "Cada uma joga de um jeito. Veja pontos fortes, fracos e papel na party." },
  { n: "II", title: "Saia de Newhaven", text: "A ilha inicial ensina o básico e te leva até o nível 8." },
  { n: "III", title: "Passe por Targuna", text: "Três caças guiadas dos níveis 8 a 20, até o primeiro boss." },
  { n: "IV", title: "Suba no continente", text: "Hunts seguras para o seu nível, com XP/h e lucro previsíveis." },
];

const QUICK: { id: RouteId; label: string; text: string }[] = [
  { id: "guides", label: "Guia do Novato", text: "8 capítulos, do personagem recém-criado ao nível 50." },
  { id: "quests", label: "Quests", text: "Lista filtrável das quests que valem a pena cedo." },
  { id: "tasks", label: "Tasks", text: "Tracker das tasks do Grizzly Adams, com pontos e rank." },
  { id: "hunts", label: "Hunts", text: "Spots por faixa de nível, com XP/h e lucro/h." },
  { id: "calc-level", label: "Calculadora de Nível", text: "Quanto de XP falta e quanto tempo pro próximo nível." },
  { id: "calc-death", label: "Bênçãos & Morte", text: "O que você perde ao morrer e o custo de se proteger." },
  { id: "calc-lootsplit", label: "Loot Split", text: "Divide o loot da party pelo texto do Hunt Analyser." },
  { id: "calc-hunt", label: "Análise de Hunt", text: "XP/h, lucro/h e o tempo até o seu nível alvo." },
  { id: "calc-exercise", label: "Exercise Weapons", text: "Quantas armas de treino e o custo em gold e Tibia Coins." },
];

export function Home() {
  const { navigate } = useRouter();
  const { vocation } = useVocation();
  const Figure = VOCATION_FIGURE[vocation.id];

  return (
    <Page crumb={<Crumb current="Salão da Guilda" />}>
      {/* Herói */}
      <div className="relative overflow-hidden rounded-[6px] border border-[#120c06] bg-[radial-gradient(120%_150%_at_15%_-20%,rgba(224,169,74,0.22),rgba(0,0,0,0)_55%),linear-gradient(180deg,#2c2013,#1c130b)] p-[22px_24px] shadow-[inset_0_1px_0_rgba(255,236,190,0.08),inset_0_-30px_50px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute -right-6 -top-8 text-[150px] leading-none text-[rgba(224,169,74,0.06)]">
          <ShieldIcon width={150} height={150} />
        </div>
        <div className="relative flex items-start gap-4">
          <span className="mt-0.5 flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[8px] border border-[#5a4023] bg-[radial-gradient(circle_at_36%_28%,#eebd66,#8a5e26)] text-[#241a0e] shadow-[inset_0_1px_2px_rgba(255,244,214,0.7),0_2px_6px_rgba(0,0,0,0.4)] [&_svg]:h-[26px] [&_svg]:w-[26px]">
            <ShieldIcon />
          </span>
          <div>
            <h1 className="m-0 font-display text-[30px] font-semibold leading-[1.05] tracking-[0.5px] text-[#f4e6bd] [text-shadow:0_2px_0_rgba(0,0,0,0.5)]">
              Bem-vindo ao EasyTibia
            </h1>
            <p className="mt-1.5 max-w-[560px] text-[13px] leading-[1.55] text-cream-dim">
              O companion para quem está começando: guia passo a passo, quests, tasks, spots de caça e
              calculadoras — sem se perder no caminho.
            </p>
          </div>
        </div>

        {/* Trilha "comece por aqui" */}
        <div className="relative mt-5 grid grid-cols-4 gap-3">
          <div className="pointer-events-none absolute left-[9%] right-[9%] top-[13px] h-px bg-[linear-gradient(90deg,transparent,rgba(224,169,74,0.35),transparent)]" />
          {STEPS.map((s) => (
            <button
              key={s.n}
              onClick={() => navigate("guides")}
              className="group relative flex flex-col items-center gap-1.5 rounded-[5px] px-2 py-2 text-center transition-colors hover:bg-[rgba(224,169,74,0.08)]"
            >
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#7a5a2e] bg-[radial-gradient(circle_at_38%_30%,#b0463a,#7a2f27)] font-display text-[13px] font-bold text-[#f6e4b6] shadow-[0_2px_5px_rgba(0,0,0,0.4)]">
                {s.n}
              </span>
              <b className="text-[12px] font-bold leading-tight text-[#f0e0b6]">{s.title}</b>
              <span className="text-[10.5px] leading-[1.4] text-cream-faint group-hover:text-cream-dim">
                {s.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6" />

      <div className="grid grid-cols-[minmax(0,1fr)_322px] gap-[22px]">
        <div>
          <SectionCap>Acesso rápido</SectionCap>
          <div className="grid grid-cols-2 gap-[13px] sm:grid-cols-4">
            {QUICK.map((q) => {
              const Icon = NAV_ICON[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => navigate(q.id)}
                  className="parch-card group flex flex-col gap-2 p-3.5 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,247,224,0.55),inset_0_0_0_1px_rgba(194,137,43,0.6),0_8px_18px_rgba(0,0,0,0.45)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-[7px] border border-[#a9701f] bg-[radial-gradient(circle_at_38%_30%,#eebd66,#b9863a)] text-[#2a1d0e] shadow-[inset_0_1px_1px_rgba(255,244,214,0.7),0_1px_3px_rgba(60,44,22,0.3)] [&_svg]:h-[19px] [&_svg]:w-[19px]">
                    <Icon />
                  </span>
                  <b className="font-display text-[13.5px] font-bold tracking-[0.3px] text-ink group-hover:text-num">
                    {q.label}
                  </b>
                  <p className="m-0 text-[11.5px] leading-[1.5] text-ink-dim">{q.text}</p>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="parch-card self-start p-4">
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-[#17100a] bg-[radial-gradient(circle_at_36%_30%,#6a4d2f,#2b2013)] text-[#e9d4a8] [&_svg]:h-[18px] [&_svg]:w-[18px]">
              <Figure />
            </span>
            <b className="font-display text-[16px] font-semibold tracking-[0.3px] text-ink">
              {vocation.name}
            </b>
            <span className="ml-auto text-[9.5px] uppercase tracking-[0.1em] text-ink-faint">
              sua vocação
            </span>
          </div>

          <div className="flex flex-col border-t border-parch-line">
            {[
              ["HP por nível", `+${vocation.hpPerLevel}`],
              ["Mana por nível", `+${vocation.manaPerLevel}`],
              ["Capacidade por nível", `+${vocation.capPerLevel}`],
              ["Fator de Magic Level", vocation.factors.magic.toLocaleString("pt-BR")],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between border-b border-parch-line py-2 text-[12px]"
              >
                <span className="text-ink-dim">{k}</span>
                <b className="font-mono text-[12px] font-bold text-ink">{v}</b>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("calc-level")}
            className="mt-3.5 flex w-full items-center justify-between gap-2 rounded-[3px] border border-parch-line bg-parch-2 px-[11px] py-[9px] text-[12px] text-ink transition-colors hover:border-brass hover:text-num [&_svg]:text-num"
          >
            <span>Abrir Calculadora de Nível</span>
            <ArrowRightIcon />
          </button>
          {vocation.provisional && (
            <p className="mt-2.5 text-[10.5px] leading-relaxed text-ink-faint">
              Dados da vocação {vocation.name} ainda não confirmados.
            </p>
          )}
        </aside>
      </div>
    </Page>
  );
}
