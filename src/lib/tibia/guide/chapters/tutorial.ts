import type { GuideChapter } from "../types";

/* ---------------------------------------------------------------------------
   Capítulo 2 — Tutorial e vocação.
   Base: TibiaWiki BR ("Vocação", "Monk").
--------------------------------------------------------------------------- */

export const tutorial: GuideChapter = {
  id: "tutorial",
  order: 2,
  title: "Tutorial e vocação",
  subtitle: "O novo tutorial e como escolher entre as cinco vocações",
  levelRange: "1",
  estimatedTime: "15–20 min",
  status: "ready",

  intro: [
    "Ao entrar pela primeira vez você faz um tutorial curto e, no fim dele, escolhe a vocação — a decisão mais definitiva do jogo.",
    "Aqui está o que cada vocação faz e qual escolher no primeiro personagem.",
  ],

  sections: [
    {
      heading: "O tutorial",
      blocks: [
        {
          kind: "text",
          text: "O tutorial novo é linear e rápido: ensina a andar, atacar e conversar com NPC em poucos minutos. No fim, duas opções — ir para Rookgaard (o começo antigo) ou pegar o portal para Newhaven e escolher a vocação num pop-up.",
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Escolha Newhaven. Rookgaard é mais cru, sem a caça guiada e sem as facilidades novas (ícones de NPC, missão de introdução). É o assunto do próximo capítulo.",
        },
      ],
    },

    {
      heading: "As cinco vocações",
      blocks: [
        {
          kind: "text",
          text: "Cada vocação sobe rápido em habilidades diferentes e tem um papel próprio. A escolha é definitiva — dá para mudar de ideia só enquanto o pop-up está aberto.",
        },
        {
          kind: "table",
          columns: ["Vocação", "Estilo", "HP / Mana / Cap por nível", "Sobe rápido em", "Promoção"],
          rows: [
            ["Knight", "Corpo a corpo, tanque", "15 / 5 / 25", "Sword, Axe, Club", "Elite Knight"],
            ["Paladin", "Ataque à distância + cura leve", "10 / 15 / 20", "Distance", "Royal Paladin"],
            ["Druid", "Cura e gelo/terra", "5 / 30 / 10", "Magic Level", "Elder Druid"],
            ["Sorcerer", "Magia ofensiva, fogo/energia", "5 / 30 / 10", "Magic Level", "Master Sorcerer"],
            ["Monk", "Punho + cura (nova, abr/2025)", "10 / 10 / 25", "Fist Fighting", "Exalted Monk"],
          ],
        },
        {
          kind: "table",
          columns: ["Vocação", "Bom", "Ruim", "Para iniciante"],
          rows: [
            [
              "Knight",
              "Vida alta perdoa erro de posição; barato de manter",
              "Dano baixo, mata devagar sozinho",
              "Fácil",
            ],
            [
              "Paladin",
              "Ataca de longe (mais seguro), se vira sozinho",
              "Munição custa; frágil se for cercado",
              "Fácil–Médio",
            ],
            [
              "Sorcerer",
              "Dano altíssimo, limpa a tela",
              "Vida baixíssima, mana cara, pune qualquer erro",
              "Difícil",
            ],
            [
              "Druid",
              "Melhor cura do jogo, forte em grupo",
              "Sozinho é mais lento; mana cara",
              "Médio",
            ],
            [
              "Monk",
              "Bom sozinho, cura própria, resiste a elementos com Mantra",
              "Vocação nova: menos conteúdo e guias, magias limitadas",
              "Médio",
            ],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Para o primeiro personagem: Knight ou Paladin. O Knight sobrevive a erros; o Paladin ensina a jogar em movimento e é autossuficiente. Sorcerer e Druid rendem mais em grupo e punem descuido.",
        },
      ],
    },

    {
      heading: "Depois de escolher",
      blocks: [
        {
          kind: "text",
          text: "Confirmada a vocação, você vai para Newhaven já com o kit inicial dela. A partir daí, siga o capítulo \"Newhaven, a ilha inicial\".",
        },
        {
          kind: "callout",
          tone: "info",
          text: "A promoção (Elite Knight, Master Sorcerer, etc.) fica disponível no nível 20, custa 20.000 gp e exige Premium. Ela melhora a regeneração e reduz a perda de morte em 30%.",
        },
      ],
    },
  ],

  pitfalls: [
    "Confirmar a vocação no pop-up sem ler o que cada uma faz.",
    "Escolher Sorcerer ou Druid de primeira achando \"mago é mais forte\" — são os que mais punem erro no começo.",
    "Ir para Rookgaard sem querer.",
    "Contar com trocar de vocação depois — não dá, é permanente.",
  ],

  checklist: [
    "Tutorial concluído",
    "Diferença entre as 5 vocações entendida",
    "Vocação escolhida no pop-up",
    "Enviado para Newhaven (não Rookgaard)",
  ],

  sources: [
    { label: "Vocação — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Voca%C3%A7%C3%A3o" },
    { label: "Monk — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Monk" },
  ],
};
