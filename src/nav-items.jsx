import { HomeIcon, PillIcon, ActivityIcon, BarChart3Icon, BrainCircuitIcon } from "lucide-react";
import Index from "./pages/Index";
import Supplements from "./pages/Supplements";
import Symptoms from "./pages/Symptoms";
import Analysis from "./pages/Analysis";
import Assistant from "./pages/Assistant";

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Supplements",
    to: "/supplements",
    icon: <PillIcon className="h-4 w-4" />,
    page: <Supplements />,
  },
  {
    title: "Symptome",
    to: "/symptoms",
    icon: <ActivityIcon className="h-4 w-4" />,
    page: <Symptoms />,
  },
  {
    title: "Analyse",
    to: "/analysis",
    icon: <BarChart3Icon className="h-4 w-4" />,
    page: <Analysis />,
  },
  {
    title: "KI-Assistent",
    to: "/assistant",
    icon: <BrainCircuitIcon className="h-4 w-4" />,
    page: <Assistant />,
  },
];