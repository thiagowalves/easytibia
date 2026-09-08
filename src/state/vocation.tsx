import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { VOCATIONS, type Vocation, type VocationId } from "../lib/tibia/vocations";

interface VocationValue {
  vocationId: VocationId;
  vocation: Vocation;
  setVocation: (id: VocationId) => void;
}

const VocationContext = createContext<VocationValue | null>(null);

export function VocationProvider({ children }: { children: ReactNode }) {
  const [vocationId, setVocation] = useState<VocationId>("knight");
  const value = useMemo<VocationValue>(
    () => ({ vocationId, vocation: VOCATIONS[vocationId], setVocation }),
    [vocationId],
  );
  return <VocationContext.Provider value={value}>{children}</VocationContext.Provider>;
}

export function useVocation(): VocationValue {
  const ctx = useContext(VocationContext);
  if (!ctx) throw new Error("useVocation precisa estar dentro de <VocationProvider>");
  return ctx;
}
