import type { GuideChapter } from "../types";

/* ---------------------------------------------------------------------------
   Capítulo 6 — Do 20 ao 50.
   Spots clássicos e seguros por faixa. A meta muda a cada update: sempre
   confirme o lucro no seu mundo com a aba de análise do cliente.
--------------------------------------------------------------------------- */

export const hunts2050: GuideChapter = {
  id: "hunts-20-50",
  order: 6,
  title: "Do 20 ao 50",
  subtitle: "Spots seguros por faixa de nível — e como escolher o seu",
  levelRange: "20–50",
  estimatedTime: "várias sessões",
  status: "ready",

  intro: [
    "Depois de Targuna você tem o continente inteiro para caçar, e nenhuma trilha te guiando. Esta é a parte em que muito novato trava: não sabe para onde ir.",
    "Abaixo vão spots clássicos, seguros e com boa oferta de bicho. A meta de Tibia muda a cada atualização, então use sempre a aba de análise do cliente para confirmar se está dando lucro no seu mundo.",
  ],

  sections: [
    {
      heading: "Como escolher um spot",
      blocks: [
        {
          kind: "steps",
          items: [
            "Fique numa faixa em que os bichos morrem rápido mas ainda te dão risco — se você não gasta nenhuma potion, o spot está fraco para XP.",
            "Elemento importa: mago rende onde as criaturas são fracas ao seu dano; knight vai bem em corredores; paladin quer espaço para atirar e recuar.",
            "Party rende mais que solo — a experiência compartilhada dá bônus e você gasta menos suprimento por bicho.",
            "Rode ~30 min, confira lucro/h e XP/h na análise, e compare com o próximo spot.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Ferramentas como o Hunt Finder do TibiaBuddy ou do TibiaRoute listam spots por nível e vocação com XP/h e lucro estimados — bom ponto de partida antes de testar.",
        },
      ],
    },

    {
      heading: "Spots por faixa",
      blocks: [
        {
          kind: "table",
          columns: ["Faixa", "Spot", "Região", "Observação"],
          rows: [
            ["20–25", "Rotworms", "Esgotos de Darashia / sul de Edron", "Corda e pá. Task do Daniel Steelsoul cabe aqui."],
            ["20–25", "Minotaurs", "Mintwallin (Thais) ou Cyclopolis (Edron)", "Bom para knight; físico puro."],
            ["20–28", "Ghouls", "Drefia", "Fracos a fogo — ótimo para sorcerer."],
            ["20–30", "Larvae + Ancient Scarabs", "Tumbas de Ankrahmun", "Loot de gems; cuidado com o calor (sem água)."],
            ["25–35", "Cyclopes", "Cyclopolis (Edron)", "Task de 500. HP alto, dão bom físico."],
            ["25–35", "Tarantulas", "Leste de Port Hope", "Task do Grizzly (boss Hide). Leve comida; paralisam."],
            ["25–38", "Coryms", "Cavernas de Corym (vários acessos)", "Spawn grande, XP boa, loot fraco."],
            ["30–45", "Dwarves / Dwarf Guards", "Minas de Kazordoon", "Físico; loot com Iron Ore vende bem."],
            ["35–50", "Apes (Kongra/Sibang/Merlkin)", "Banuta, norte de Port Hope", "Melhor task da faixa 6–49; spawn enorme."],
            ["38–50", "Water Elementals", "Port Hope / Yalahar", "Fracos a energy — sorcerer voa; leve muita mana."],
            ["40–50", "Minotaurs (Grand Canyon)", "Norte de Edron", "Versão maior do spot de minotauro."],
          ],
        },
      ],
    },

    {
      heading: "Antes de sair para caçar",
      blocks: [
        {
          kind: "steps",
          items: [
            "Bênçãos ativas (veja o capítulo \"Chegada ao continente\").",
            "Health e mana potions suficientes para a sessão inteira.",
            "Munição (paladin) ou nada de sobra no bolso (mage/knight) — o que não for usar fica no Depot.",
            "Corda e pá na mochila.",
            "Um caminho de fuga em mente: onde é a saída se a coisa apertar.",
          ],
        },
      ],
    },
  ],

  pitfalls: [
    "Ficar num spot \"seguro demais\" onde nada te ameaça — é XP jogada fora.",
    "Entrar num spot muito acima do nível para \"ganhar mais XP\" e morrer perdendo tudo.",
    "Caçar sem bênção para economizar potion.",
    "Ignorar o elemento: mago batendo em bicho resistente ao seu dano gasta o dobro de mana.",
    "Sair sem corda e pá — metade dos spots exige as duas.",
  ],

  checklist: [
    "Escolheu um spot da sua faixa e vocação",
    "Rodou uma sessão e conferiu XP/h e lucro/h na análise",
    "Fez a rotina de refill entre as sessões",
    "Está combinando as caças com tasks do Grizzly Adams",
    "Chegou ao nível 50",
  ],

  sources: [
    { label: "Hunting Places — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Hunting_Places" },
    { label: "Hunt Finder — TibiaBuddy", url: "https://www.tibiabuddy.com/tools/hunt-finder" },
    { label: "Hunt Finder — TibiaRoute", url: "https://tibiaroute.com/hunting-places" },
  ],
};
