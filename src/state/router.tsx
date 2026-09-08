import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type RouteId =
  | "home"
  | "guides"
  | "builds"
  | "hunts"
  | "tasks"
  | "quests"
  | "calc-level"
  | "calc-skill"
  | "calc-magic"
  | "calc-death"
  | "calc-exercise"
  | "calc-lootsplit";

interface RouterValue {
  route: RouteId;
  navigate: (to: RouteId) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<RouteId>("home");
  const value = useMemo<RouterValue>(() => ({ route, navigate: setRoute }), [route]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter precisa estar dentro de <RouterProvider>");
  return ctx;
}
