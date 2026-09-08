import type { GuideChapter } from "../types";

/* ---------------------------------------------------------------------------
   Capítulo 1 — Conta e personagem.
   Base: tibia.com e TibiaWiki BR ("Servidores").
--------------------------------------------------------------------------- */

export const conta: GuideChapter = {
  id: "conta",
  order: 1,
  title: "Conta e personagem",
  subtitle: "Mundo, tipo de PvP e o e-mail que você não pode esquecer",
  levelRange: "—",
  estimatedTime: "10–15 min",
  status: "ready",

  intro: [
    "Antes de entrar no jogo você toma três decisões que dão trabalho para desfazer: em qual mundo jogar, o nome do personagem e — logo depois — a vocação.",
    "Este capítulo cuida das duas primeiras. A vocação é o próximo capítulo.",
  ],

  sections: [
    {
      heading: "Criar a conta",
      blocks: [
        {
          kind: "steps",
          items: [
            "Baixe o cliente oficial em tibia.com (ou pela Epic Games / Steam — a mesma conta serve).",
            "Crie a conta com um e-mail que você realmente acessa.",
            "Confirme o e-mail pelo link que a CipSoft envia.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          text: "O e-mail é o passo mais esquecido. Sem a confirmação, você chega ao nível 8 em Newhaven e não consegue sair da ilha. Confirme antes de começar a jogar.",
        },
      ],
    },

    {
      heading: "Escolher o mundo (servidor)",
      blocks: [
        {
          kind: "text",
          text: "Todo mundo novo é protegido por BattlEye (anti-cheat). O que muda entre eles é o tipo de PvP, a localização (ping) e a população.",
        },
        {
          kind: "table",
          columns: ["Tipo de PvP", "Como é"],
          rows: [
            ["Optional PvP", "Ninguém te ataca sem os dois consentirem. Recomendado para começar."],
            ["Open PvP", "Qualquer um pode te atacar; há punição por matar sem motivo."],
            ["Retro Open PvP", "Como Open, mas com as regras antigas (menos proteções)."],
            ["Hardcore / Retro Hardcore", "PvP livre e punições fracas. Evite no começo."],
          ],
        },
        {
          kind: "table",
          columns: ["Final do nome do mundo", "Localização"],
          rows: [
            ["…bra", "Brasil — melhor ping para brasileiros"],
            ["…era", "Estados Unidos"],
            ["…a", "Reino Unido"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Para o primeiro personagem: mundo Optional PvP, terminado em \"bra\", de população média — economia ativa e spawns livres. A lista com a população de cada mundo está em tibia.com › Worlds.",
        },
        {
          kind: "callout",
          tone: "info",
          text: "\"Premia\" é um mundo só para Premium. Trocar de mundo depois exige o serviço pago Character World Transfer.",
        },
      ],
    },

    {
      heading: "Criar o personagem",
      blocks: [
        {
          kind: "text",
          text: "Escolha nome e sexo. O sexo você troca de graça quando quiser; o nome só com o serviço pago Name Change — então capriche.",
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Nomes com palavrão, marca famosa ou termos como \"GM\", \"CM\" e \"Tibia\" são recusados ou renomeados à força.",
        },
      ],
    },

    {
      heading: "Configurar os controles",
      blocks: [
        {
          kind: "text",
          text: "No primeiro login o cliente pergunta o esquema de controle: Classic (anda com setas/clique, age com o mouse) ou WASD (anda no teclado, mais moderno). Dá para trocar depois em Options › Controls.",
        },
        {
          kind: "callout",
          tone: "tip",
          text: "WASD é o padrão de quem vem de outros MMOs; Classic é a tradição do Tibia. Teste os dois nas primeiras horas.",
        },
      ],
    },
  ],

  pitfalls: [
    "Não confirmar o e-mail da conta.",
    "Escolher um mundo Hardcore ou Retro achando que é \"mais desafiador\" — no começo só atrapalha.",
    "Cair num mundo lotado (spawn disputado) ou fantasma (economia morta) — mire população média.",
    "Não pensar no nome e depois ter que pagar para trocar.",
  ],

  checklist: [
    "Cliente oficial instalado",
    "Conta criada e e-mail confirmado",
    "Mundo escolhido (PvP + localização + população)",
    "Personagem criado",
    "Esquema de controle definido (Classic ou WASD)",
  ],

  sources: [
    { label: "Servidores — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Mundos" },
    { label: "Como começar a jogar Tibia em 2026 — GameOverDrive", url: "https://gameoverdrive.com.br/como-comecar-jogar-tibia-guia-iniciantes/" },
  ],
};
