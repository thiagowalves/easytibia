import type { GuideChapter } from "../types";
import { sprite, TIBIAWIKI_CREDIT } from "../sprites";

/* ---------------------------------------------------------------------------
   Capítulo 7 — Tasks do Grizzly Adams ("Killing in the Name of...").
   Base: TibiaWiki BR ("Paw and Fur - Hunting Elite Quest") e
   Fandom ("Killing in the Name of... Quest/Spoiler").
--------------------------------------------------------------------------- */

export const tasks: GuideChapter = {
  id: "tasks",
  order: 7,
  title: "Tasks do Grizzly Adams",
  subtitle: "A quest Killing in the Name of e a ordem que compensa",
  levelRange: "6+",
  estimatedTime: "contínuo",
  status: "ready",

  intro: [
    "\"Killing in the Name of...\" é um conjunto de tasks: você mata X de uma criatura e ganha experiência, gold e o direito de matar um boss. A maioria é repetível e serve para guiar sua progressão — faça a task do bicho que você já ia caçar mesmo.",
    "O centro do sistema é o Grizzly Adams, em Port Hope. Algumas tasks começam com outros NPCs.",
  ],

  sections: [
    {
      heading: "Como funciona",
      blocks: [
        {
          kind: "places",
          iconCredit: TIBIAWIKI_CREDIT,
          items: [
            {
              name: "Grizzly Adams",
              meta: "Paw & Fur Society",
              detail: "Ao sul de Port Hope. Aceite o convite e peça task ou mission.",
              coord: [32694, 32772, 7],
              icon: sprite("Grizzly Adams"),
            },
          ],
        },
        {
          kind: "text",
          text: "Você pode ter no máximo 3 tasks abertas ao mesmo tempo. Cada task concluída dá Task Points (sobem o seu rank) e, se a task tiver boss, uma permissão para matar aquele boss uma vez.",
        },
        {
          kind: "dialogue",
          npc: "Grizzly Adams",
          role: "Líder",
          location: "Sul de Port Hope",
          coord: [32694, 32772, 7],
          lines: [
            { say: "hi", reply: "Dá as boas-vindas à sociedade." },
            { say: "task", reply: "Oferece uma task da sua faixa de nível." },
            { say: "yes", reply: "Aceita. Para cancelar (com 3 abertas): task › yes › nome da criatura › yes." },
          ],
        },
        {
          kind: "table",
          columns: ["Rank", "Task Points", "Nível", "Libera"],
          rows: [
            ["Huntsman", "10", "6", "Vender troféus básicos ao Grizzly, comprar Slingshot"],
            ["Ranger", "20", "6", "Viajar com o Lorek para Banuta / Chor"],
            ["Big Game Hunter", "40", "50", "Vender mais troféus"],
            ["Trophy Hunter", "70", "70", "Tarefas especiais e Demon Backpack"],
            ["Elite Hunter", "100", "100", "Tarefa dos Demons"],
          ],
        },
        {
          kind: "callout",
          tone: "info",
          text: "Você só ganha pontos fazendo tasks da sua faixa de nível, e cada task rende no máximo 3 vezes dentro dessa faixa. Acompanhe os pontos no Quest Log › Killing in the name of...",
        },
      ],
    },

    {
      heading: "As primeiras tasks (nível 6–19) — Daniel Steelsoul, em Edron",
      blocks: [
        {
          kind: "text",
          text: "Antes mesmo do Grizzly Adams, o Daniel Steelsoul em Edron dá as tasks mais acessíveis do jogo:",
        },
        {
          kind: "table",
          columns: ["Task", "Nível", "Recompensa"],
          rows: [
            ["100 Trolls (+ Troll Champions)", "6–19", "200 exp + 200 gp"],
            ["150 Goblins (+ Assassins, Scavengers)", "6–19, após os Trolls", "300 exp + 250 gp"],
            ["300 Rotworms (+ Carrion Worms)", "20–39", "1.000 exp + 400 gp"],
            ["500 Cyclopes (+ Drones, Smiths)", "40–59", "3.000 exp + 800 gp"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Trolls e Goblins ficam a oeste de Edron, na mesma passagem. São a caça padrão de quem acabou de chegar ao continente.",
        },
      ],
    },

    {
      heading: "Tasks do Grizzly Adams — nível 6–49",
      blocks: [
        {
          kind: "table",
          columns: ["Task (300 un., salvo indicado)", "Pontos", "Boss", "Exp"],
          rows: [
            ["Crocodiles", "1", "The Snapper", "800 — a mais fácil, comece por essa"],
            ["Tarantulas", "2", "Hide", "1.500"],
            ["200 Stone Golems", "3", "—", "2.000"],
            ["Mammoths", "3", "The Bloodtusk", "5.000"],
            ["150 Carniphilas", "3", "Deathbine", "2.500 — batem forte, teste antes"],
            ["Terramites", "2", "—", "2.500"],
            ["Thornback Tortoises", "2", "—", "1.500"],
            ["200 Gargoyles", "2", "—", "1.500"],
            ["Kongras / Sibangs / Merlkins (Apes)", "2", "—", "1.000 — a melhor por volta do nível 35"],
            ["Badgers", "1", "—", "500 — rende pouco, pule"],
            ["Gnarlhounds", "2", "—", "1.000 — considerada a pior"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Para o rank Huntsman você precisa de 10 pontos. Crocodiles + Tarantulas + Stone Golems + Mammoths já fecham. Combine tasks que dividem o mesmo spot (Stone Golem + Gargoyle).",
        },
        {
          kind: "callout",
          tone: "info",
          text: "Terminou uma task com boss? Volte ao Grizzly e peça o boss — ele dropa loot bom para a sua faixa de nível.",
        },
      ],
    },
  ],

  pitfalls: [
    "Aceitar 3 tasks e não conseguir trocar — você precisa das 3 abertas para poder deletar uma.",
    "Fazer task fora da sua faixa de nível — não conta ponto.",
    "Ir caçar Gnarlhound ou Badger só pela task; faça a task do bicho que você já ia caçar.",
    "Esquecer de pegar o boss depois de concluir a task.",
  ],

  checklist: [
    "Entrou na Paw & Fur Society com o Grizzly Adams",
    "Sabe pedir e cancelar task",
    "Fez as tasks de Troll e Goblin com o Daniel Steelsoul",
    "Alcançou o rank Huntsman (10 pontos)",
    "Matou pelo menos um boss de task",
  ],

  sources: [
    { label: "Paw and Fur - Hunting Elite Quest — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Paw_and_Fur_-_Hunting_Elite_Quest" },
    { label: "Killing in the Name of... / Spoiler — TibiaWiki (Fandom)", url: "https://tibia.fandom.com/wiki/Killing_in_the_Name_of..._Quest/Spoiler" },
    { label: "Grizzly Adams — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Grizzly_Adams" },
  ],
};
