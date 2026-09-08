import type { GuideChapter } from "./types";
import { newhaven } from "./chapters/newhaven";
import { targuna } from "./chapters/targuna";
import { continente } from "./chapters/continente";

/* ---------------------------------------------------------------------------
   Registro dos capítulos do Guia do Novato.

   Capítulos "soon" ainda não têm conteúdo — aparecem na lista como a trilha
   completa da jornada, mas não abrem.
--------------------------------------------------------------------------- */

const soon = (
  id: string,
  order: number,
  title: string,
  subtitle: string,
  levelRange: string,
): GuideChapter => ({
  id,
  order,
  title,
  subtitle,
  levelRange,
  status: "soon",
  intro: [],
  sections: [],
  pitfalls: [],
  checklist: [],
  sources: [],
});

export const CHAPTERS: GuideChapter[] = [
  soon("conta", 1, "Conta e personagem", "Mundo, tipo de PvP e o e-mail que você não pode esquecer", "—"),
  soon("tutorial", 2, "Tutorial e vocação", "O novo tutorial e como escolher entre as cinco vocações", "1"),
  newhaven,
  targuna,
  continente,
  soon("hunts-20-50", 6, "Do 20 ao 50", "Spots seguros por vocação, com XP/h e lucro esperado", "20–50"),
  soon("tasks", 7, "Tasks do Grizzly Adams", "A quest Killing in the Name of e a ordem que compensa", "8+"),
  soon("sistemas", 8, "Sistemas que ninguém te explica", "Stamina, imbuement, charms, prey e a Wheel of Destiny", "todos"),
].sort((a, b) => a.order - b.order);

export function getChapter(id: string): GuideChapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export type { GuideChapter } from "./types";
