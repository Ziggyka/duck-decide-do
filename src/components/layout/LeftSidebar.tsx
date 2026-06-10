import {
  Newspaper, ListChecks, Shuffle, Users, Swords, Award,
  User, Settings, Sparkles, ChevronLeft, ChevronRight, Flame
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebarCollapse } from "./AppLayout";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import duckAvatar1 from "@/assets/duck-avatar-1.png";

const navItems = [
  { icon: Newspaper, label: "Feed", path: "/" },
  { icon: Sparkles, label: "Pato Vidente", path: "/pato-vidente" },
  { icon: ListChecks, label: "Minhas Listas", path: "/lists" },
  { icon: Shuffle, label: "Sorteio", path: "/draw" },
  { icon: Users, label: "Grupos", path: "/groups" },
  { icon: Swords, label: "Meus Desafios", path: "/challenges" },
  { icon: Award, label: "Conquistas", path: "/achievements" },
  { icon: User, label: "Perfil", path: "/profile" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

const LeftSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, setCollapsed } = useSidebarCollapse();

  return (
    <aside className={`flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-4 px-3 flex flex-col gap-4 transition-all duration-300 ${collapsed ? "w-[88px]" : "w-64"}`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors self-end"
        title={collapsed ? "Expandir" : "Recolher"}
      >
        {collapsed ? <ChevronRight className="w-4 h-4 text-muted-foreground" /> : <ChevronLeft className="w-4 h-4 text-muted-foreground" />}
      </button>

      {/* Box 1: User Profile Card */}
      {!collapsed ? (
        <div className="rounded-[20px] overflow-hidden bg-secondary border border-border shadow-sm animate-fade-in">
          {/* Cover */}
          <div className="relative h-20 bg-primary">
            <span className="absolute top-2 left-3 text-accent text-xl">⭐</span>
            <span className="absolute top-3 right-4 text-accent text-2xl">⭐</span>
            <span className="absolute bottom-1 right-8 text-accent text-lg">⭐</span>
          </div>
          <div className="px-4 pb-4 -mt-8">
            <img src={duckAvatar1} alt="" className="w-16 h-16 rounded-full border-4 border-secondary bg-duck-yellow-light mx-auto" />
            <p className="text-center font-display font-bold text-base text-white mt-2">Quack Master</p>
            <div className="flex items-center justify-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">Lv.34</span>
              <span className="flex items-center gap-1 text-white text-xs font-semibold">
                <Flame className="w-3 h-3 text-accent" /> 126
              </span>
            </div>
            <p className="text-center text-white/60 text-[11px] mt-1.5">Pato lendário</p>
            {/* XP bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-white/80 font-medium">XP</span>
                <span className="text-white/50">2.450 / 3.000</span>
              </div>
              <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: "82%" }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-secondary p-2 flex flex-col items-center gap-1">
          <img src={duckAvatar1} alt="" className="w-10 h-10 rounded-full border-2 border-primary bg-duck-yellow-light" />
          <span className="text-[9px] font-bold text-white">Lv.34</span>
        </div>
      )}

      {/* Box 2: Navigation */}
      <div className="rounded-[20px] bg-secondary border border-border shadow-sm p-2 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isVidente = item.path === "/pato-vidente";

          const button = (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md font-semibold"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              } ${collapsed ? "justify-center px-0" : ""}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && isVidente && (
                <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20" : "bg-accent text-accent-foreground"}`}>AI</span>
              )}
            </button>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">{item.label}</TooltipContent>
              </Tooltip>
            );
          }
          return button;
        })}
      </div>
    </aside>
  );
};

export default LeftSidebar;
