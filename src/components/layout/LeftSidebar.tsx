import { 
  Newspaper, ListChecks, Shuffle, Users, Swords, Trophy, 
  Camera, User, Package, Settings, Flame, Sparkles 
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Newspaper, label: "Feed", path: "/" },
  { icon: Sparkles, label: "Pato Vidente", path: "/pato-vidente" },
  { icon: ListChecks, label: "Meus Quacks", path: "/quacks" },
  { icon: ListChecks, label: "Minhas Listas", path: "/lists" },
  { icon: Shuffle, label: "Sorteio", path: "/draw" },
  { icon: Users, label: "Grupos", path: "/groups" },
  { icon: Swords, label: "Desafios", path: "/challenges" },
  { icon: Trophy, label: "Ranking", path: "/ranking" },
  { icon: Camera, label: "Memórias", path: "/memories" },
  { icon: User, label: "Perfil", path: "/profile" },
  { icon: Package, label: "Inventário", path: "/inventory" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];

const LeftSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar-left py-4 px-3 flex flex-col gap-1">
      {/* Streak Banner */}
      <div className="mb-3 flex items-center gap-3 rounded-2xl bg-primary/10 border border-primary/20 p-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Flame className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-secondary-foreground/50">Streak</p>
          <p className="font-display font-bold text-lg leading-none text-secondary-foreground">12 dias 🔥</p>
        </div>
      </div>

      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isVidente = item.path === "/pato-vidente";
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"} ${isVidente && !isActive ? "text-accent hover:text-accent" : ""}`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${isVidente ? "text-accent" : ""}`} />
            <span>{item.label}</span>
            {isVidente && (
              <span className="ml-auto text-[10px] font-bold bg-accent text-accent-foreground px-1.5 py-0.5 rounded-md">AI</span>
            )}
          </button>
        );
      })}

      {/* Level indicator */}
      <div className="mt-auto pt-4 px-2">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-display font-semibold text-secondary-foreground">Nível 24</span>
          <span className="text-secondary-foreground/50">2.450 / 3.000 XP</span>
        </div>
        <div className="h-3 rounded-full bg-secondary-foreground/10 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out" style={{ width: "82%" }} />
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
