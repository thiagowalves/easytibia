import type { GuideChapter } from "../types";

/* ---------------------------------------------------------------------------
   Capítulo 8 — Sistemas que ninguém te explica.
   Glossário curto dos sistemas paralelos do Tibia.
--------------------------------------------------------------------------- */

export const sistemas: GuideChapter = {
  id: "sistemas",
  order: 8,
  title: "Sistemas que ninguém te explica",
  subtitle: "Stamina, treino offline, prey, charms e a Wheel of Destiny",
  levelRange: "todos",
  estimatedTime: "leitura de referência",
  status: "ready",

  intro: [
    "Tibia tem uma dúzia de sistemas paralelos que o jogo mal apresenta. Nenhum é obrigatório, mas ignorar os básicos custa experiência e dinheiro. Aqui vai o resumo de cada um.",
  ],

  sections: [
    {
      heading: "Stamina",
      blocks: [
        {
          kind: "text",
          text: "É o seu \"combustível\" de caça: 42 horas no total, mas só as primeiras 28 rendem 100% de XP. Entre 14 e 28 h você ganha XP normal; abaixo de 14 h cai para 50% e o loot some. A barra só desce durante luta de verdade contra bichos que dão XP.",
        },
        {
          kind: "table",
          columns: ["Faixa da barra", "Efeito"],
          rows: [
            ["42 h → 39 h (verde)", "+50% de XP por criatura (só Premium)"],
            ["39 h → 14 h (laranja)", "XP normal"],
            ["abaixo de 14 h", "50% de XP e o loot é destruído"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Regenera offline: 1 min a cada 3 min desconectado (a partir de 10 min offline). Com 4+ dias seguidos de Daily Reward, também regenera online numa Resting Area.",
        },
      ],
    },

    {
      heading: "Treino offline e Exercise Weapons",
      blocks: [
        {
          kind: "text",
          text: "Ao deslogar dentro da sua casa (Premium) você pode deixar o personagem treinando skill ou magic level offline, até 12 horas. As Exercise Weapons fazem o mesmo online, num Exercise Dummy — veja a calculadora de Exercise Weapons.",
        },
      ],
    },

    {
      heading: "Daily Reward e Loyalty",
      blocks: [
        {
          kind: "text",
          text: "Todo dia dá para pegar uma recompensa numa Reward Shrine (nos depots e templos). Pegar dias seguidos melhora o prêmio e libera a regeneração de stamina online. A Loyalty acumula por tempo de conta e dá um bônus permanente e pequeno de skill e XP.",
        },
      ],
    },

    {
      heading: "Prey",
      blocks: [
        {
          kind: "text",
          text: "Três slots onde você escolhe uma criatura e ganha um bônus contra ela por 2 horas: mais XP, mais dano, mais loot ou menos dano recebido. Os slots renovam a cada 20 h de graça, ou na hora pagando. É XP e loot fácil — use sempre.",
        },
      ],
    },

    {
      heading: "Bestiary e Charms",
      blocks: [
        {
          kind: "text",
          text: "O Bestiary (na Cyclopedia) conta quantas de cada criatura você matou. Completar uma entrada dá Charm Points e desbloqueia detalhes do bicho. Com os pontos você compra Charms — efeitos que valem contra uma criatura de bestiary 100%, como dano extra, chance de crítico ou recuperar vida ao matar.",
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Complete o bestiary do que você caça de qualquer jeito. Um Charm de dano bem colocado (ex.: no bicho do seu spot principal) rende mais XP/h de graça.",
        },
      ],
    },

    {
      heading: "Imbuements",
      blocks: [
        {
          kind: "text",
          text: "Encantamentos temporários (20 h) em equipamento com slot: mais dano elemental, roubo de vida/mana, skill, capacidade, velocidade. Custam uma taxa fixa em gold mais materiais de criatura. Detalhes e listas na calculadora de Imbuements.",
        },
      ],
    },

    {
      heading: "Wheel of Destiny",
      blocks: [
        {
          kind: "text",
          text: "A partir do nível 51, todo personagem promovido ganha 1 ponto por nível para gastar numa roda de perks da vocação (vida, mana, dano, efeitos de magia). Não custa nada distribuir nem redistribuir — só precisa estar num templo. Dá para experimentar à vontade.",
        },
      ],
    },

    {
      heading: "Hirelings e Soul Points",
      blocks: [
        {
          kind: "text",
          text: "Hirelings são NPCs comprados na Store que moram na sua casa e fazem serviços (banco, loja, cozinha, exercise). Soul Points são um recurso pequeno gasto por algumas magias de invocação e conjuração; regeneram ao matar bichos e comer.",
        },
      ],
    },
  ],

  pitfalls: [
    "Caçar com a stamina abaixo de 14 h — metade da XP e zero loot.",
    "Deixar os 3 slots de Prey vazios.",
    "Nunca completar entradas de bestiary e ficar sem Charm Points.",
    "Ter casa Premium e não usar o treino offline ao deslogar.",
  ],

  checklist: [
    "Entende a barra de stamina e o bônus verde",
    "Pega o Daily Reward com regularidade",
    "Mantém os 3 slots de Prey ativos",
    "Está completando o bestiary do que caça",
    "Usa treino offline / Exercise Weapons para skill",
  ],

  sources: [
    { label: "Stamina — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Stamina" },
    { label: "Cyclopedia (Bestiary / Charms) — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Charm" },
    { label: "Wheel of Destiny — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Wheel_of_Destiny" },
  ],
};
