import type { GuideChapter } from "../types";
import { sprite, TIBIAWIKI_CREDIT } from "../sprites";

/* ---------------------------------------------------------------------------
   Capítulo 4 — Targuna, a ponte para o continente.

   Ilha-tutorial estendida (níveis 8–20) adicionada em 17/03/2026
   (v15.24.95dcf3), na atualização "Greater Lessons for Young Tibians".
--------------------------------------------------------------------------- */

// A vila de Targuna é compacta; os NPCs ficam todos por volta desta coordenada.
const VILA: [number, number, number] = [31942, 31902, 6];

export const targuna: GuideChapter = {
  id: "targuna",
  order: 4,
  title: "Targuna, a ponte para o continente",
  subtitle: "Níveis 8–20: a vila, três caças em ordem crescente e o primeiro boss",
  levelRange: "8–20",
  estimatedTime: "várias sessões",
  status: "ready",

  intro: [
    "Targuna é uma ilha-tutorial estendida, entre Newhaven e o continente. Você chega aqui de barco ao nível 8 e a ideia é ficar até por volta do nível 20, quando abre a passagem para Thais.",
    "É aqui que o jogo te apresenta, com calma, coisas que depois são o dia a dia: banco, depot, stash, caça em grupo e o primeiro boss de verdade.",
  ],

  sections: [
    {
      heading: "Chegando em Targuna — a vila",
      blocks: [
        {
          kind: "text",
          text: "A vila principal tem banco, depot, stash, loja de equipamento, correio, treino de skill, um santuário de imbuing e o daily reward. Missões curtas da ilha ensinam a usar o banco e o stash — vale fazê-las na ordem que aparecerem.",
        },
        {
          kind: "places",
          iconCredit: TIBIAWIKI_CREDIT,
          items: [
            {
              name: "Adrian",
              meta: "Banqueiro",
              detail: "Banco de Targuna. Fale hi › deposit all › yes.",
              coord: VILA,
              icon: sprite("Adrian"),
            },
            {
              name: "Aurelia",
              meta: "Loja",
              detail: "Compra loot (lizard, infernoid, pirata) e vende arma, munição, potion, corda e pá.",
              coord: VILA,
              icon: sprite("Aurelia"),
            },
            {
              name: "Camilla",
              meta: "Prefeita",
              detail: "Dá o contexto da ilha e aponta para onde ir primeiro.",
              coord: VILA,
              icon: sprite("Camilla"),
            },
            {
              name: "Leonora",
              meta: "Correio",
              detail: "Caixa de correio / mailbox da vila.",
              coord: VILA,
              icon: sprite("Leonora"),
            },
            {
              name: "Captain Indigo",
              meta: "Barco",
              detail: "Leva para Thais quando você estiver pronto para o continente.",
              coord: VILA,
              icon: sprite("Captain Indigo"),
            },
          ],
        },
        {
          kind: "image",
          src: "https://static.tibia.com/images/library/map_targuna.jpg",
          alt: "Mapa da ilha de Targuna: a vila ao sul, a área de floresta com os lagartos ao norte e o cais da Royal Tibia Line para Thais.",
          caption: "Mapa oficial de Targuna. A vila fica ao sul; a floresta ao norte é o Hidden Lizard Temple; o navio da Royal Tibia Line liga a ilha a Thais.",
          credit: "Tibia Official Library — CipSoft GmbH",
          creditUrl: "https://www.tibia.com/library/?subtopic=maps&region=targuna",
          maxWidth: 300,
          pixelated: true,
        },
        {
          kind: "callout",
          tone: "info",
          text: "Não sabe o que é depot ou stash? Sem problema — a ilha ensina com quests curtas, e o capítulo \"Chegada ao continente\" explica os dois em detalhe.",
        },
      ],
    },

    {
      heading: "As três áreas de caça (nesta ordem)",
      blocks: [
        {
          kind: "text",
          text: "Targuna tem três caças, cada uma para uma faixa de nível. Suba nelas em ordem conforme ganha nível.",
        },
        {
          kind: "table",
          columns: ["Área", "Nível", "Como chegar", "Inimigos"],
          rows: [
            [
              "Hidden Lizard Temple",
              "8+",
              "Escada ao norte da vila",
              "Lizards (fracos a fogo). Comece por aqui.",
            ],
            [
              "Aragonia",
              "10+",
              "Fale com o Sterling na vila para atravessar",
              "Piratas. Sea Captain (190 HP) é o mais duro.",
            ],
            [
              "Crimson Court",
              "12+",
              "Portal na casa da Emiliana",
              "Infernoids (fracos a gelo/energia). Melhor exp por HP.",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Leve corda e pá desde a primeira ida — Targuna esconde passagens atrás das duas. A Aurelia vende ambas.",
        },
        {
          kind: "bestiary",
          credit: TIBIAWIKI_CREDIT.label,
          creditUrl: TIBIAWIKI_CREDIT.url,
          creatures: [
            { name: "Lizard Henchman", sprite: sprite("Lizard Henchman"), hp: 58, exp: 70, note: "Lizard Temple" },
            { name: "Lizard Magician", sprite: sprite("Lizard Magician"), hp: 62, exp: 75, note: "Lizard Temple" },
            { name: "Lizard Swordmaster", sprite: sprite("Lizard Swordmaster"), hp: 68, exp: 80, note: "Lizard Temple" },
            { name: "Lizard Executioner", sprite: sprite("Lizard Executioner"), hp: 74, exp: 90, note: "Lizard Temple" },
            { name: "Lizard Commander", sprite: sprite("Lizard Commander"), hp: 160, exp: 240, note: "Lizard Temple" },
            { name: "Pirate Navigator", sprite: sprite("Pirate Navigator"), hp: 64, exp: 75, note: "Aragonia" },
            { name: "Pirate Gunner", sprite: sprite("Pirate Gunner"), hp: 68, exp: 80, note: "Aragonia" },
            { name: "Pirate Quartermaster", sprite: sprite("Pirate Quartermaster"), hp: 80, exp: 95, note: "Aragonia" },
            { name: "Pirate Cook", sprite: sprite("Pirate Cook"), hp: 90, exp: 105, note: "Aragonia" },
            { name: "Sea Captain", sprite: sprite("Sea Captain"), hp: 190, exp: 280, note: "Aragonia" },
            { name: "Infernoid Blob", sprite: sprite("Infernoid Blob"), hp: 85, exp: 100, note: "Crimson Court" },
            { name: "Infernoid Hound", sprite: sprite("Infernoid Hound"), hp: 86, exp: 102, note: "Crimson Court" },
            { name: "Infernoid Soul", sprite: sprite("Infernoid Soul"), hp: 95, exp: 115, note: "Crimson Court" },
            { name: "Infernoid Spiritual", sprite: sprite("Infernoid Spiritual"), hp: 102, exp: 120, note: "Crimson Court" },
          ],
        },
      ],
    },

    {
      heading: "As três quests de Targuna",
      blocks: [
        {
          kind: "text",
          text: "São três missões independentes, todas a partir do nível 8, que podem ser feitas em qualquer ordem. Cada uma casa com uma das áreas de caça. Para o passo a passo detalhado, use o link da wiki no rodapé.",
        },
        {
          kind: "places",
          iconCredit: TIBIAWIKI_CREDIT,
          items: [
            {
              name: "Lizzie",
              meta: "An Ancient Enemy",
              detail: "Hidden Lizard Temple — ajudar a pesquisadora a investigar os lagartos.",
              coord: VILA,
              icon: sprite("Lizzie"),
            },
            {
              name: "Sterling",
              meta: "A Long Lost Treasure",
              detail: "Aragonia — recuperar um tesouro no meio dos piratas.",
              coord: VILA,
              icon: sprite("Sterling"),
            },
            {
              name: "Emiliana",
              meta: "Burning Heart",
              detail: "Crimson Court — enfrentar a ameaça da corte; termina no boss.",
              coord: [31960, 31901, 6],
              icon: sprite("Emiliana"),
            },
          ],
        },
        {
          kind: "text",
          text: "Concluir as três dá, no total, cerca de 9.500 de experiência e uma Adventurer Backpack.",
        },
        {
          kind: "callout",
          tone: "info",
          text: "Monk tem uma missão extra só dela na ilha: The Way of the Monk.",
        },
      ],
    },

    {
      heading: "O primeiro boss — Herald of Fire",
      blocks: [
        {
          kind: "text",
          text: "Fica na Crimson Court e é o clímax da Burning Heart. É um boss da categoria Bane: 900 de HP, ~1.350 de experiência, cooldown de 1 hora, para 1 a 5 jogadores. Só usa dano de fogo — fique fora da linha do beam e leve antídoto/vida sobrando.",
        },
        {
          kind: "bestiary",
          credit: TIBIAWIKI_CREDIT.label,
          creditUrl: TIBIAWIKI_CREDIT.url,
          creatures: [
            { name: "Herald of Fire", sprite: sprite("Herald of Fire"), hp: 900, exp: 1350, note: "Bane · cd 1h" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Na primeira vitória ele dropa, garantido, um Lesser Proficiency Catalyst (item ligado à Wheel/proficiency). Guarde — não venda.",
        },
        {
          kind: "callout",
          tone: "info",
          text: "Dá para encarar sozinho por volta do nível 15–18, ou mais cedo com um ou dois amigos. A experiência compartilhada da party fica ligada por padrão.",
        },
      ],
    },

    {
      heading: "Saindo para o continente",
      blocks: [
        {
          kind: "text",
          text: "Perto do nível 20, fale com o Captain Indigo para viajar a Thais. A passagem permanente e gratuita é liberada de duas formas: entregando um item especial que dropa nas caças de Targuna, ou pagando uma taxa em gold. Sem isso, ainda dá para pagar a viagem avulsa.",
        },
        {
          kind: "dialogue",
          npc: "Captain Indigo",
          role: "Transporte",
          location: "No cais da vila de Targuna",
          coord: VILA,
          lines: [
            { say: "hi", reply: "Cumprimenta e oferece a viagem." },
            { say: "thais", reply: "Confirma o destino no continente." },
            { say: "yes", reply: "Embarca você para Thais." },
          ],
          note: "Keywords não confirmadas — se \"thais\" não funcionar, tente \"mainland\"/\"passage\" e confirme com \"yes\".",
        },
        {
          kind: "callout",
          tone: "info",
          text: "Chegou em Thais? O próximo capítulo (\"Chegada ao continente\") cuida de blessings, banco, depot e o primeiro refill de verdade.",
        },
      ],
    },
  ],

  pitfalls: [
    "Entrar na Crimson Court abaixo do nível 12 — os infernoids batem forte com fogo.",
    "Pular as três quests — elas dão exp e equipamento bom para o início.",
    "Não liberar a passagem permanente e ficar pagando a viagem para Thais toda vez.",
    "Encarar o Herald of Fire sozinho cedo demais.",
    "Ir para as caças sem corda e pá.",
    "Ignorar as quests-tutorial de banco e stash — esses sistemas voltam o tempo todo depois.",
  ],

  checklist: [
    "Vila de Targuna reconhecida (banco, depot, stash, loja)",
    "Hidden Lizard Temple farmado (nível 8–10)",
    "Quest An Ancient Enemy concluída (Lizzie)",
    "Aragonia liberada com o Sterling",
    "Quest A Long Lost Treasure concluída (Sterling)",
    "Crimson Court acessada pelo portal da Emiliana",
    "Quest Burning Heart + Herald of Fire derrotado",
    "Passagem para Thais liberada com o Captain Indigo",
    "Nível ~20 alcançado",
  ],

  sources: [
    { label: "Targuna — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Targuna" },
    { label: "Targuna Quest — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Targuna_Quest" },
    { label: "Hidden Lizard Temple — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Hidden_Lizard_Temple" },
    { label: "Aragonia — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Aragonia" },
    { label: "Crimson Court — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Crimson_Court" },
    { label: "Herald of Fire — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Herald_of_Fire" },
    { label: "Greater Lessons for Young Tibians — TibiaRoute", url: "https://tibiaroute.com/news/Greater-Lessons-for-Young-Tibians-8733-lozF" },
    { label: "Targuna Quest Guide 2026 — TibiaBuddy", url: "https://www.tibiabuddy.com/blog/targuna-quest-guide" },
  ],
};
