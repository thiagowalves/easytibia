import type { Coord } from "./map";

/* ---------------------------------------------------------------------------
   Modelo de dados do "Guia do Novato".

   Cada capítulo é um trecho da jornada (Newhaven, Targuna, continente...).
   O conteúdo vem em blocos tipados para o renderizador montar a tela sem
   precisar de HTML solto no meio dos dados.
--------------------------------------------------------------------------- */

/** Uma linha de conversa com NPC: o que você digita e o que ele responde. */
export interface DialogueLine {
  /** Palavra ou frase que VOCÊ digita no NPC. */
  say: string;
  /** Resumo do que o NPC responde (não é a fala literal). */
  reply?: string;
}

export type GuideBlock =
  | { kind: "text"; text: string }
  /** Passos numerados, na ordem. */
  | { kind: "steps"; items: string[] }
  /** Caixa de diálogo com um NPC. */
  | {
      kind: "dialogue";
      npc: string;
      role?: string;
      location?: string;
      /** Coordenada do NPC — vira link "ver no mapa". */
      coord?: Coord;
      lines: DialogueLine[];
      /** Observação abaixo do diálogo (ex.: keyword ainda não confirmada). */
      note?: string;
    }
  /** Lista de lugares/NPCs com link para o mapa comentado. */
  | {
      kind: "places";
      items: {
        name: string;
        /** Chip curto ao lado do nome (ex.: "nível 8+", "Banco"). */
        meta?: string;
        detail: string;
        coord?: Coord;
        /** URL do sprite/retrato (embutido, creditado abaixo da lista). */
        icon?: string;
      }[];
      /** Crédito único para os sprites da lista. */
      iconCredit?: { label: string; url: string };
    }
  /** Grade de criaturas de uma área, com sprite, HP e XP. */
  | {
      kind: "bestiary";
      credit: string;
      creditUrl: string;
      creatures: {
        name: string;
        sprite?: string;
        hp?: number;
        exp?: number;
        note?: string;
      }[];
    }
  /** Imagem externa (mapa oficial, print da wiki) — sempre com crédito. */
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      credit: string;
      creditUrl: string;
      /** Largura máxima em px. Sem isso, ocupa a largura do card. */
      maxWidth?: number;
      /** Mapas em pixel-art ficam nítidos ao ampliar. */
      pixelated?: boolean;
    }
  /** Aviso destacado. */
  | { kind: "callout"; tone: "tip" | "warn" | "info"; text: string }
  /** Tabela simples. */
  | { kind: "table"; columns: string[]; rows: string[][] };

export interface GuideSection {
  heading: string;
  blocks: GuideBlock[];
}

export type ChapterStatus = "ready" | "draft" | "soon";

export interface GuideChapter {
  id: string;
  /** Posição na jornada (1 = primeiro). */
  order: number;
  title: string;
  subtitle: string;
  /** Faixa de nível que o capítulo cobre, ex.: "1–8". */
  levelRange?: string;
  /** Tempo aproximado para concluir, ex.: "30–60 min". */
  estimatedTime?: string;
  status: ChapterStatus;
  /** Parágrafos de abertura. */
  intro: string[];
  sections: GuideSection[];
  /** "Erros comuns" — o que o novato costuma fazer de errado aqui. */
  pitfalls: string[];
  /** Objetivos do capítulo — vira checklist com progresso salvo. */
  checklist: string[];
  sources: { label: string; url: string }[];
}
