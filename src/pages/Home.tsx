import { Page } from "../components/Page";
import { Crumb } from "../components/Topbar";
import { PageSub, PageTitle, SectionCap } from "../components/ui";
import { ArrowRightIcon, NAV_ICON, VOCATION_FIGURE } from "../components/icons";
import { useRouter, type RouteId } from "../state/router";
import { useVocation } from "../state/vocation";

const STEPS = [
  { n: "I", title: "Escolha sua vocação", text: "Cada uma joga de um jeito. Veja pontos fortes, fracos e papel na party." },
  { n: "II", title: "Complete Rookgaard", text: "A ilha inicial ensina o básico e te deixa com skill 10+." },
  { n: "III", title: "Primeiras tasks", text: "As tasks do Grizzly Adams pagam bem e guiam sua progressão." },
  { n: "IV", title: "Suba de nível", text: "Hunts seguras para o seu nível, com XP/h e lucro previsíveis." },
];

const QUICK: { id: RouteId; label: string; tag: string; text: string }[] = [
  { id: "guides", label: "Guias", tag: "em breve", text: "Do personagem recém-criado até o primeiro boss." },
  { id: "builds", label: "Builds", tag: "em breve", text: "Distribuição de pontos e equipamento por faixa de nível." },
  { id: "hunts", label: "Hunts", tag: "em breve", text: "Spots seguros com XP/h e lucro esperado por vocação." },
  { id: "tasks", label: "Tasks", tag: "em breve", text: "Ordem recomendada das tasks de Grizzly Adams e dos Gnomes." },
  { id: "quests", label: "Quests", tag: "em breve", text: "Passo a passo das quests que valem a pena logo cedo." },
  { id: "calc-level", label: "Calculadoras", tag: "pronto", text: "Nível, skill e magic level — planeje sua próxima meta." },
];

export function Home() {
  const { navigate } = useRouter();
  const { vocation } = useVocation();
  const Figure = VOCATION_FIGURE[vocation.id];

  return (
    <Page crumb={<Crumb current="Salão da Guilda" />}>
      <PageTitle>Bem-vindo, aventureiro</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Tudo que um jogador novato precisa para dar os primeiros passos em Tibia — sem se perder no
          caminho.
        </PageSub>
      </div>

      <div className="mb-6 mt-[22px] rounded-[4px] border border-[#15100a] bg-parch p-[16px_18px] shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <SectionCap tone="ink">Comece por aqui</SectionCap>
        <div className="mt-3 grid grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex items-start gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-seal font-display text-[13px] font-bold text-[#f0e3c6]">
                {s.n}
              </span>
              <div>
                <b className="mb-0.5 block text-[13px] font-bold text-ink">{s.title}</b>
                <span className="text-[11.5px] leading-[1.45] text-ink-dim">{s.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_322px] gap-[22px]">
        <div>
          <SectionCap>Acesso rápido</SectionCap>
          <div className="grid grid-cols-3 gap-[13px]">
            {QUICK.map((q) => {
              const Icon = NAV_ICON[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => navigate(q.id)}
                  className="flex flex-col gap-2.5 rounded-[4px] border border-[#15100a] bg-parch p-3.5 text-left shadow-[0_2px_5px_rgba(0,0,0,0.35)] transition-colors hover:border-brass"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[radial-gradient(circle_at_38%_32%,#e6b45c,#b9863a)] text-[#2a1d0e] shadow-[inset_0_1px_1px_rgba(255,240,200,0.5)]">
                    <Icon />
                  </span>
                  <span className="flex items-center justify-between">
                    <b className="font-display text-[13.5px] font-bold tracking-[0.3px] text-ink">
                      {q.label}
                    </b>
                    <span className="rounded-[3px] border border-[#b7a071] px-[5px] py-px text-[10px] text-ink-faint">
                      {q.tag}
                    </span>
                  </span>
                  <p className="m-0 text-[11.5px] leading-[1.5] text-ink-dim">{q.text}</p>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[4px] border border-[#15100a] bg-parch p-4 shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
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
