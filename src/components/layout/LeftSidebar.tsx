import { 
  Newspaper, ListChecks, Shuffle, Users, Swords, Trophy, Award,
  Camera, User, Settings, Flame, Sparkles, MessageCircle, ChevronLeft, ChevronRight, MessagesSquare
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebarCollapse } from "./AppLayout";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { icon: Newspaper, label: "Feed", path: "/" },
  { icon: Sparkles, label: "Pato Vidente", path: "/pato-vidente" },
  { icon: MessageCircle, label: "Meus Quacks", path: "/quacks" },
  { icon: MessagesSquare, label: "Chat", path: "/chat" },
  { icon: ListChecks, label: "Minhas Listas", path: "/lists" },
  { icon: Shuffle, label: "Sorteio", path: "/draw" },
  { icon: Users, label: "Grupos", path: "/groups" },
  { icon: Swords, label: "Meus Desafios", path: "/challenges" },
  { icon: Award, label: "Conquistas", path: "/achievements" },
  { icon: Trophy, label: "Ranking", path: "/ranking" },
  { icon: Camera, label: "Memórias", path: "/memories" },
  { icon: User, label: "Perfil", path: "/profile" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

const LeftSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, setCollapsed } = useSidebarCollapse();

  return (
    <aside className={`bg-secondary text-secondary-foreground border-r border-sidebar-border flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto py-4 px-3 flex flex-col gap-1 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-60"}`}>
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-secondary-foreground/10 transition-colors mb-2 self-end"
        title={collapsed ? "Expandir" : "Recolher"}
      >
        {collapsed ? <ChevronRight className="w-4 h-4 text-secondary-foreground/60" /> : <ChevronLeft className="w-4 h-4 text-secondary-foreground/60" />}
      </button>

      {/* Streak Banner */}
      {!collapsed && (
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-primary/10 border border-primary/20 p-4 animate-fade-in">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-secondary-foreground/50">Streak</p>
            <p className="font-display font-bold text-lg leading-none text-secondary-foreground">12 dias 🔥</p>
          </div>
        </div>
      )}
      {collapsed && (
        <div className="mb-3 flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary" />
          </div>
        </div>
      )}

      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isVidente = item.path === "/pato-vidente";

        const button = (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item transition-all duration-200 ${isActive ? "nav-item-active" : "nav-item-inactive"} ${isVidente && !isActive ? "text-accent hover:text-accent" : ""} ${collapsed ? "justify-center px-0" : ""}`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 hover:scale-110 ${isVidente ? "text-accent" : ""}`} />
            {!collapsed && <span>{item.label}</span>}
            {!collapsed && isVidente && (
              <span className="ml-auto text-[10px] font-bold bg-accent text-accent-foreground px-1.5 py-0.5 rounded-md">AI</span>
            )}
          </button>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.path} delayDuration={0}>
              <TooltipTrigger asChild>{button}</TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        }
        return button;
      })}

      {/* Level indicator */}
      <div className="mt-auto pt-4 px-2">
        {!collapsed ? (
          <>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-display font-semibold text-secondary-foreground">Nível 24</span>
              <span className="text-secondary-foreground/50">2.450 / 3.000 XP</span>
            </div>
            <div className="h-3 rounded-full bg-secondary-foreground/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out" style={{ width: "82%" }} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-secondary-foreground/50">Lv 24</span>
            <div className="w-8 h-2 rounded-full bg-secondary-foreground/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: "82%" }} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
