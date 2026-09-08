import { Sidebar } from "./components/Sidebar";
import { RouterProvider, useRouter } from "./state/router";
import { VocationProvider } from "./state/vocation";
import { Home } from "./pages/Home";
import { GuidesPage } from "./pages/guides/GuidesPage";
import { LevelCalculator } from "./pages/calculators/LevelCalculator";
import { SkillCalculator } from "./pages/calculators/SkillCalculator";
import { MagicCalculator } from "./pages/calculators/MagicCalculator";
import { DeathCalculator } from "./pages/calculators/DeathCalculator";
import { ExerciseCalculator } from "./pages/calculators/ExerciseCalculator";
import { LootSplitCalculator } from "./pages/calculators/LootSplitCalculator";
import { HuntCalculator } from "./pages/calculators/HuntCalculator";
import { ImbueCalculator } from "./pages/calculators/ImbueCalculator";

function Screen() {
  const { route } = useRouter();
  switch (route) {
    case "home":
      return <Home />;
    case "calc-level":
      return <LevelCalculator />;
    case "calc-skill":
      return <SkillCalculator />;
    case "calc-magic":
      return <MagicCalculator />;
    case "calc-death":
      return <DeathCalculator />;
    case "calc-exercise":
      return <ExerciseCalculator />;
    case "calc-lootsplit":
      return <LootSplitCalculator />;
    case "calc-hunt":
      return <HuntCalculator />;
    case "calc-imbue":
      return <ImbueCalculator />;
    case "guides":
      return <GuidesPage />;
    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <VocationProvider>
      <RouterProvider>
        <div className="fachwerk flex min-h-screen">
          <Sidebar />
          <Screen />
        </div>
      </RouterProvider>
    </VocationProvider>
  );
}
