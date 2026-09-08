import type { GuideChapter } from "./types";
import { conta } from "./chapters/conta";
import { tutorial } from "./chapters/tutorial";
import { newhaven } from "./chapters/newhaven";
import { targuna } from "./chapters/targuna";
import { continente } from "./chapters/continente";
import { hunts2050 } from "./chapters/hunts-20-50";
import { tasks } from "./chapters/tasks";
import { sistemas } from "./chapters/sistemas";

/* ---------------------------------------------------------------------------
   Registro dos capítulos do Guia do Novato.
--------------------------------------------------------------------------- */

export const CHAPTERS: GuideChapter[] = [
  conta,
  tutorial,
  newhaven,
  targuna,
  continente,
  hunts2050,
  tasks,
  sistemas,
].sort((a, b) => a.order - b.order);

export function getChapter(id: string): GuideChapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export type { GuideChapter } from "./types";
