import type { GuideChapter } from "../types";
import { sprite, TIBIAWIKI_CREDIT } from "../sprites";

/* ---------------------------------------------------------------------------
   Capítulo 5 — Chegada ao continente (Thais).

   Foco: os sistemas que a trilha guiada não ensina de verdade — bênçãos,
   locker (depot/stash/correio/market), banco e a rotina de refill.
--------------------------------------------------------------------------- */

export const continente: GuideChapter = {
  id: "continente",
  order: 5,
  title: "Chegada ao continente",
  subtitle: "Thais: bênçãos, banco, depot e o primeiro refill de verdade",
  levelRange: "20+",
  estimatedTime: "1ª visita: ~30 min",
  status: "ready",

  intro: [
    "O Captain Indigo te desembarca em Thais, a capital — cidade grande, movimentada e sem trilha guiada. A partir daqui ninguém te leva pela mão.",
    "Este capítulo é o mínimo para se virar: proteger o personagem com bênçãos, usar banco e depot, e montar a rotina de reabastecimento antes de cada caçada.",
  ],

  sections: [
    {
      heading: "Onde você chega",
      blocks: [
        {
          kind: "text",
          text: "O barco atraca no cais de Thais. Os pontos que importam agora: o templo (White Flower Temple, ao sul da cidade), o Depot, o banco e as lojas. No caminho para as caças você cruza alguns orcs e ratos — nada sério.",
        },
        {
          kind: "places",
          iconCredit: TIBIAWIKI_CREDIT,
          items: [
            {
              name: "Norf",
              meta: "Templo / Bênçãos",
              detail: "White Flower Temple. Onde você renasce ao morrer e onde compra a bênção The Spiritual Shielding.",
              coord: [32348, 32365, 6],
              icon: sprite("Norf"),
            },
            {
              name: "Naji",
              meta: "Banco",
              detail: "Deposita e saca ouro. hi › deposit all › yes.",
              coord: [32342, 32231, 7],
              icon: sprite("Naji"),
            },
            {
              name: "Gamel",
              meta: "Loja de armas",
              detail: "Armas e escudos baratos para repor o que você perder.",
              coord: [32336, 32207, 8],
              icon: sprite("Gamel"),
            },
            {
              name: "Captain Bluebear",
              meta: "Barcos",
              detail: "Viagens para Carlin, Ab'Dendriel, Edron, Port Hope e outras cidades.",
              coord: [32310, 32210, 6],
              icon: sprite("Captain Bluebear"),
            },
          ],
        },
        {
          kind: "image",
          src: "https://static.tibia.com/images/library/map_thais.jpg",
          alt: "Mapa oficial de Thais, com o castelo ao noroeste e o White Flower Temple ao sul.",
          caption: "Mapa oficial de Thais. O templo fica ao sul; o Depot e o banco, no centro da cidade.",
          credit: "Tibia Official Library — CipSoft GmbH",
          creditUrl: "https://www.tibia.com/library/?subtopic=maps&region=thais",
          maxWidth: 300,
          pixelated: true,
        },
      ],
    },

    {
      heading: "Bênçãos — faça isso antes de caçar",
      blocks: [
        {
          kind: "text",
          text: "Quando você morre em Tibia, perde uma fatia de experiência e de skill (volta para trás), pode dropar itens e até a mochila inteira. As bênçãos (blessings) cortam essa perda — é o investimento mais importante do começo.",
        },
        {
          kind: "table",
          columns: ["Bênçãos", "Perde a mochila", "Perde equipamento", "Reduz perda de XP/skill"],
          rows: [
            ["0", "100%", "10%", "0%"],
            ["1", "70%", "7%", "8%"],
            ["2", "45%", "4,5%", "16%"],
            ["3", "25%", "2,5%", "24%"],
            ["4", "10%", "1%", "32%"],
            ["5", "0%", "0%", "40%"],
          ],
        },
        {
          kind: "text",
          text: "As 5 bênçãos básicas custam 2.000 gp cada até o nível 30 (10.000 no total). O problema: cada uma é vendida numa cidade diferente.",
        },
        {
          kind: "table",
          columns: ["Bênção", "Cidade", "NPC"],
          rows: [
            ["The Spiritual Shielding", "Thais (White Flower Temple)", "Norf"],
            ["The Embrace of Tibia", "Carlin", "Humphrey"],
            ["The Fire of the Suns", "Ab'Dendriel", "Edala"],
            ["The Spark of the Phoenix", "Kazordoon", "Kawill + Pydar"],
            ["The Wisdom of Solitude", "Edron", "Eremo"],
          ],
        },
        {
          kind: "dialogue",
          npc: "Norf",
          role: "Abençoador",
          location: "White Flower Temple, ao sul de Thais",
          coord: [32348, 32365, 6],
          lines: [
            { say: "hi", reply: "Cumprimenta." },
            { say: "bless", reply: "Oferece a bênção que ele vende (The Spiritual Shielding)." },
            { say: "yes", reply: "Cobra o preço conforme seu nível e aplica a bênção." },
          ],
          note: "Se \"bless\" não abrir a compra, tente \"spiritual shielding\". As bênçãos ficam salvas até você morrer.",
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Não dá para comprar todas num lugar só. Pegue a do Norf agora — mesmo 1 ou 2 bênçãos já reduzem muito a perda. As outras você junta conforme viaja, ou compra o pacote pela Store. Abaixo do nível 24, a Pilgrimage of Ashes Quest deixa as bênçãos mais baratas.",
        },
        {
          kind: "callout",
          tone: "info",
          text: "A Adventurer's Blessing só existe em servidores Open PvP e só protege morte em PvP até o nível 20. Em Optional PvP (recomendado para começar) ela não muda nada — e nenhuma bênção reduz perda quando quem te mata é um monstro e você está com Red/Black Skull.",
        },
      ],
    },

    {
      heading: "O locker: depot, stash, correio e market",
      blocks: [
        {
          kind: "text",
          text: "Toda cidade (menos Rookgaard) tem um Depot cheio de lockers. Abra qualquer locker e encontra quatro coisas:",
        },
        {
          kind: "table",
          columns: ["No locker", "Para que serve"],
          rows: [
            ["Depot", "Seu baú de itens, um por cidade. O que você guarda em Thais, pega em Thais."],
            ["Stash", "Só itens novos e empilháveis (poções, runas, produtos de criatura). Abastece os imbuing shrines sozinho."],
            ["Correio (Inbox)", "Pacotes e cartas enviados a você."],
            ["Market", "Compra e venda de itens entre jogadores."],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Guarde no Depot tudo que não vai usar na caçada. Leve só suprimento e o equipamento em uso. Assim, se morrer, perde pouco.",
        },
      ],
    },

    {
      heading: "Banco e magias",
      blocks: [
        {
          kind: "text",
          text: "O ouro do banco é da conta inteira — qualquer banqueiro, em qualquer cidade, acessa o mesmo saldo. Deposite sempre que voltar de uma caçada.",
        },
        {
          kind: "dialogue",
          npc: "Naji",
          role: "Banqueiro",
          location: "No centro de Thais",
          coord: [32342, 32231, 7],
          lines: [
            { say: "hi", reply: "Cumprimenta." },
            { say: "deposit all", reply: "Deposita todo o ouro da mochila." },
            { say: "yes", reply: "Confirma. Para sacar: hi › withdraw <quantia> › yes." },
          ],
        },
        {
          kind: "callout",
          tone: "info",
          text: "Você não compra mais magias de NPC. Desde a atualização de janeiro de 2026, cada magia é aprendida sozinha ao atingir o nível dela. Os antigos NPCs de guild (Gregor, Elane, Muriel, Marvik) viraram só cenário.",
        },
      ],
    },

    {
      heading: "A rotina de refill (repita toda vez)",
      blocks: [
        {
          kind: "steps",
          items: [
            "Volte para a cidade (de barco, ou deslogando perto do Depot).",
            "Deposite o ouro no banco.",
            "Venda o loot — no NPC certo para cada item, ou pelo Market.",
            "Compre suprimento: health e mana potions, munição e comida.",
            "Confira as bênçãos ativas no ícone acima do inventário.",
            "Guarde no Depot o que não vai levar.",
            "Volte para a caçada.",
          ],
        },
      ],
    },

    {
      heading: "Free ou Premium?",
      blocks: [
        {
          kind: "text",
          text: "Conta Free joga de graça para sempre, mas trava bastante coisa: só algumas cidades, sem promoção de vocação, sem treino offline, sem casa e sem as 2 bênçãos melhoradas.",
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Para testar o jogo, Free serve. Se pegar gosto, 1 mês de Premium no começo compensa muito só pelo treino offline. Mais para a frente dá para bancar Premium com ouro do próprio jogo.",
        },
      ],
    },

    {
      heading: "Viajando pelo continente",
      blocks: [
        {
          kind: "text",
          text: "O Captain Bluebear, no cais de Thais, leva de barco para outras cidades. Fale hi › nome da cidade › yes.",
        },
        {
          kind: "table",
          columns: ["Destino", "Preço"],
          rows: [
            ["Carlin", "110 gp"],
            ["Ab'Dendriel", "130 gp"],
            ["Oramond", "150 gp"],
            ["Edron", "160 gp"],
            ["Port Hope", "160 gp"],
            ["Liberty Bay", "180 gp"],
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Ande sempre com corda e pá na mochila — o continente esconde passagens, buracos e atalhos atrás das duas.",
        },
      ],
    },
  ],

  pitfalls: [
    "Caçar sem nenhuma bênção \"para economizar\" — a primeira morte custa mais do que as bênçãos.",
    "Levar tudo para a caçada em vez de deixar no Depot — morreu, perdeu o que nem precisava.",
    "Procurar NPC para comprar magia — não existe mais desde jan/2026.",
    "Esquecer de depositar o ouro e morrer com tudo no bolso.",
    "Achar que a Adventurer's Blessing protege morte para monstro (não protege).",
    "Sair de Thais sem corda e pá.",
  ],

  checklist: [
    "Desembarcou em Thais e localizou templo, banco e Depot",
    "Entendeu a penalidade de morte e o que as bênçãos reduzem",
    "Comprou pelo menos a The Spiritual Shielding com o Norf",
    "Sabe usar o locker (depot, stash, correio, market)",
    "Fez o primeiro ciclo completo de refill",
    "Decidiu entre Free e Premium",
  ],

  sources: [
    { label: "Bênçãos — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Blessings" },
    { label: "Depot Chest — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Depot" },
    { label: "Stash — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Stash" },
    { label: "Thais — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Thais" },
    { label: "Norf — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Norf" },
    { label: "Captain Bluebear — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Captain_Bluebear" },
    { label: "Como começar a jogar Tibia em 2026 — GameOverDrive", url: "https://gameoverdrive.com.br/como-comecar-jogar-tibia-guia-iniciantes/" },
  ],
};
