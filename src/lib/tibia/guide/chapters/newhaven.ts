import type { GuideChapter } from "../types";
import { sprite, TIBIAWIKI_CREDIT } from "../sprites";

/* ---------------------------------------------------------------------------
   Capítulo 3 — Newhaven, a ilha inicial.

   Base: atualização "Uma Nova Mão Amiga" (out/2025), que aposentou Dawnport,
   mais "Greater Lessons for Young Tibians" (mar/2026), que passou a mandar
   todo personagem para Targuna ao nível 8.
--------------------------------------------------------------------------- */

export const newhaven: GuideChapter = {
  id: "newhaven",
  order: 3,
  title: "Newhaven, a ilha inicial",
  subtitle: "Do nascimento ao nível 8: os NPCs, a quest de introdução e o barco",
  levelRange: "1–8",
  estimatedTime: "40–90 min",
  status: "ready",

  intro: [
    "Newhaven é a vila onde todo personagem novo começa depois do tutorial. Ela substituiu a antiga Dawnport em outubro de 2025 — se um guia fala em \"Dawnport\" ou manda você \"terminar Rookgaard\", ele está desatualizado.",
    "É uma zona segura: não existe PvP, o nível máximo na ilha é 20 e a saída é só de ida. A ideia é você aprender o básico, chegar ao nível 8 e pegar o barco para Targuna.",
  ],

  sections: [
    {
      heading: "Antes de tudo: confirme o e-mail",
      blocks: [
        {
          kind: "callout",
          tone: "warn",
          text: "A porta de saída de Newhaven exige nível 8 E e-mail da conta confirmado. Se você não clicou no link que a CipSoft mandou no cadastro, vai chegar ao nível 8 e ficar preso na ilha. Confirme agora em tibia.com › Account Management.",
        },
      ],
    },

    {
      heading: "Saindo do tutorial",
      blocks: [
        {
          kind: "text",
          text: "O tutorial novo é linear e curto: ensina a andar, atacar e conversar com NPC. No fim ele te dá duas opções — ir para Rookgaard (o começo antigo, mais cru) ou pegar o portal para Newhaven e escolher a vocação num pop-up.",
        },
        {
          kind: "callout",
          tone: "tip",
          text: "No seu primeiro personagem, vá para Newhaven. Rookgaard não tem as facilidades novas (ícones de NPC, caça guiada, a quest de introdução) e é mais fácil se perder lá.",
        },
        {
          kind: "callout",
          tone: "info",
          text: "A vocação escolhida no pop-up é definitiva — dá para trocar de ideia enquanto o pop-up está aberto, mas não depois de confirmar. Veja o capítulo \"Tutorial e vocação\" antes de decidir.",
        },
      ],
    },

    {
      heading: "A vila e seus NPCs",
      blocks: [
        {
          kind: "text",
          text: "Newhaven é pequena e dá para atravessar a pé em segundos. Os NPCs úteis têm um ícone acima da cabeça indicando a função (Vendedor, Transporte, Hireling). Toque em \"ver no mapa\" para abrir a localização no mapa comentado.",
        },
        {
          kind: "places",
          iconCredit: TIBIAWIKI_CREDIT,
          items: [
            {
              name: "Avriel",
              meta: "Comerciante",
              detail: "Compra o loot que cai na ilha e vende suprimentos: potions e munição.",
              coord: [32554, 32505, 7],
              icon: sprite("Avriel"),
            },
            {
              name: "Flavius",
              meta: "Banqueiro",
              detail: "Guarda seu ouro. Fale hi › deposit all › yes para depositar tudo.",
              coord: [32566, 32489, 7],
              icon: sprite("Flavius"),
            },
            {
              name: "Viola",
              meta: "Magias",
              detail: "Vende as magias básicas de todas as vocações.",
              coord: [32571, 32507, 7],
              icon: sprite("Viola"),
            },
            {
              name: "Gustavo, the Guard",
              meta: "Quest",
              detail: "Dá a Newhaven Quest, a missão de introdução da ilha.",
              coord: [32560, 32488, 7],
              icon: sprite("Gustavo, the Guard"),
            },
            {
              name: "Anna",
              meta: "Barco",
              detail: "Leva você ao continente quando chegar ao nível 8.",
              coord: [32553, 32497, 7],
              icon: sprite("Anna"),
            },
          ],
        },
        {
          kind: "image",
          src: "https://static.tibia.com/images/library/map_newhaven.jpg",
          alt: "Mapa da ilha de Newhaven: a vila no centro, o Muglex Camp a noroeste e as Corrupted Mines a nordeste.",
          caption: "Mapa oficial de Newhaven. A vila fica no centro; o Muglex Camp é a noroeste e as Corrupted Mines a nordeste; o barco da Anna fica na saída oeste (porta de nível 8).",
          credit: "Tibia Official Library — CipSoft GmbH",
          creditUrl: "https://www.tibia.com/library/?subtopic=maps&region=newhaven",
          maxWidth: 300,
          pixelated: true,
        },
      ],
    },

    {
      heading: "A Newhaven Quest",
      blocks: [
        {
          kind: "text",
          text: "É a missão de introdução da ilha e a forma mais rápida de ganhar experiência aqui. Começa com o Gustavo e leva você às duas áreas de caça: o Muglex Camp (noroeste), tomado por goblins do Muglex Clan, e as Corrupted Mines (nordeste), com esqueletos e fantasmas.",
        },
        {
          kind: "dialogue",
          npc: "Gustavo, the Guard",
          role: "Guarda",
          location: "Na vila de Newhaven",
          coord: [32560, 32488, 7],
          lines: [
            { say: "hi", reply: "Ele cumprimenta e fala das ameaças à volta da vila." },
            { say: "goblins", reply: "Explica a situação no Muglex Camp." },
            { say: "yes", reply: "Aceita a missão. O quest log passa a guiar os próximos passos." },
          ],
          note: "As keywords exatas podem variar; se travar, fale hi e siga as dicas do quest log e do próprio Gustavo. A quest continua depois nas Corrupted Mines.",
        },
        {
          kind: "steps",
          items: [
            "Vá ao Muglex Camp (noroeste da vila) e limpe os goblins do Muglex Clan; enfrente o mini-boss Muglex Clan Chief.",
            "Volte ao Gustavo para reportar e receber a próxima etapa.",
            "Vá às Corrupted Mines (nordeste) e enfrente os Corrupted Skeleton/Ghost e o mini-boss The Corruptor.",
            "Recompensa: Guardian Ring, 1.600 de experiência, Legion Helmet e um Scarf (ou 1 Platinum Coin).",
          ],
        },
        {
          kind: "bestiary",
          credit: TIBIAWIKI_CREDIT.label,
          creditUrl: TIBIAWIKI_CREDIT.url,
          creatures: [
            { name: "Muglex Clan Footman", sprite: sprite("Muglex Clan Footman"), hp: 30, exp: 24, note: "Muglex Camp" },
            { name: "Muglex Clan Assassin", sprite: sprite("Muglex Clan Assassin"), hp: 45, exp: 34, note: "Muglex Camp" },
            { name: "Muglex Clan Chief", sprite: sprite("Muglex Clan Chief"), hp: 100, exp: 175, note: "mini-boss" },
            { name: "Corrupted Ghost", sprite: sprite("Corrupted Ghost"), hp: 30, exp: 29, note: "Corrupted Mines" },
            { name: "Corrupted Skeleton", sprite: sprite("Corrupted Skeleton"), hp: 45, exp: 34, note: "Corrupted Mines" },
            { name: "The Corruptor", sprite: sprite("The Corruptor"), hp: 100, exp: 170, note: "mini-boss" },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          text: "Os mini-bosses Muglex Clan Chief e The Corruptor dropam, uma única vez, um kit de equipamento inicial da sua vocação. Vale matar os dois antes de sair da ilha.",
        },
      ],
    },

    {
      heading: "Subindo até o nível 8",
      blocks: [
        {
          kind: "text",
          text: "Além da quest, as duas áreas (Muglex Camp e Corrupted Mines) servem de caça até o nível 8. Alterne entre caçar e voltar à vila para se reabastecer.",
        },
        {
          kind: "steps",
          items: [
            "Cace em sessões curtas; volte à vila quando a mochila encher ou a vida ficar baixa.",
            "Na vila: venda o loot no Avriel e deposite o ouro no Flavius (hi › deposit all › yes).",
            "Compre as magias básicas da sua vocação com a Viola — pelo menos a de cura e a de ataque.",
            "Repita até o nível 8.",
          ],
        },
        {
          kind: "callout",
          tone: "info",
          text: "Dá para ficar em Newhaven até o nível 20, mas não vale a pena. Targuna e o continente dão muito mais experiência. Assim que bater 8, siga em frente.",
        },
      ],
    },

    {
      heading: "Pegando o barco",
      blocks: [
        {
          kind: "text",
          text: "Com nível 8 e o e-mail confirmado, a porta oeste abre. Atrás dela está a Anna, que embarca você para Targuna — uma ilha-tutorial estendida para os níveis 8 a 20 (é o próximo capítulo).",
        },
        {
          kind: "dialogue",
          npc: "Anna",
          role: "Transporte",
          location: "Depois da porta de nível 8, na saída oeste",
          coord: [32553, 32497, 7],
          lines: [
            { say: "hi", reply: "Cumprimenta e se oferece para levar você adiante." },
            { say: "yes", reply: "Embarca você. A viagem é só de ida." },
          ],
          note: "Se ela pedir uma palavra-chave (\"passage\", \"mainland\", \"targuna\"), responda e confirme com \"yes\".",
        },
        {
          kind: "callout",
          tone: "warn",
          text: "A saída é definitiva: você nunca mais volta a Newhaven. Antes de embarcar, confira que vendeu o loot, depositou o ouro e comprou suas magias.",
        },
        {
          kind: "callout",
          tone: "info",
          text: "Fontes mais antigas (e a ficha da Anna na wiki) dizem que o barco vai direto para a Península de Thais, e Monks para Blue Valley. A atualização de março de 2026 mudou isso: todas as vocações passam por Targuna primeiro, e de lá se libera a passagem para Thais.",
        },
      ],
    },
  ],

  pitfalls: [
    "Não confirmar o e-mail e travar na porta de nível 8.",
    "Escolher Rookgaard no fim do tutorial achando que é igual a Newhaven — é mais cru e sem a caça guiada.",
    "Sair da ilha sem matar os dois mini-bosses (Muglex Clan Chief e The Corruptor) — o kit inicial de vocação é dropado uma única vez.",
    "Vender o Guardian Ring da quest.",
    "Ficar farmando Newhaven até o nível 20 — perda de tempo.",
    "Embarcar sem antes vender loot, depositar ouro e comprar as magias básicas.",
  ],

  checklist: [
    "E-mail da conta confirmado",
    "Vocação escolhida no pop-up",
    "Newhaven Quest concluída (Muglex Camp + Corrupted Mines)",
    "Mini-bosses Muglex Clan Chief e The Corruptor derrotados",
    "Nível 8 alcançado",
    "Loot vendido, ouro depositado, magias básicas compradas",
    "Falou com a Anna e embarcou para Targuna",
  ],

  sources: [
    { label: "Newhaven — Tibia Official Library", url: "https://www.tibia.com/library/?subtopic=maps&region=newhaven" },
    { label: "Newhaven — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Newhaven" },
    { label: "Newhaven Quest — TibiaWiki BR", url: "https://www.tibiawiki.com.br/wiki/Newhaven_Quest" },
    { label: "Greater Lessons for Young Tibians — TibiaRoute", url: "https://tibiaroute.com/news/Greater-Lessons-for-Young-Tibians-8733-lozF" },
    { label: "A New Helping Hand — TibiaRoute", url: "https://tibiaroute.com/news/A-New-Helping-Hand-8541-E7se" },
  ],
};
