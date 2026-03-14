import { 
  Newspaper, ListChecks, Shuffle, Users, Swords, Trophy, 
  Camera, User, Package, Settings, Flame 
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Newspaper, label: "Feed", path: "/", color: "text-neon-pink" },
  { icon: ListChecks, label: "Minhas Listas", path: "/lists", color: "text-neon-cyan" },
  { icon: Shuffle, label: "Sorteio", path: "/draw", color: "text-primary" },
  { icon: Users, label: "Grupos", path: "/groups", color: "text-neon-purple" },
  { icon: Swords, label: "Desafios", path: "/challenges", color: "text-neon-orange" },
  { icon: Trophy, label: "Ranking", path: "/ranking", color: "text-primary" },
  { icon: Camera, label: "Memórias", path: "/memories", color: "text-neon-green" },
  { icon: User, label: "Perfil", path: "/profile", color: "text-neon-cyan" },
  { icon: Package, label: "Inventário", path: "/inventory", color: "text-neon-pink" },
  { icon: Settings, label: "Configurações", path: "/settings", color: "text-muted-foreground" },
];

const LeftSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar-left py-4 px-3 flex flex-col gap-1">
      {/* Streak Banner */}
      <div className="mb-3 p-4 rounded-2xl border border-neon-orange/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-orange/10 to-primary/10" />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neon-orange/20 flex items-center justify-center glow-duck">
            <Flame className="w-5 h-5 text-streak" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Streak</p>
            <p className="font-display font-bold text-lg leading-none text-gradient-duck">12 dias 🔥</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${isActive ? "nav-item-active" : "nav-item-inactive"}`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "" : item.color}`} />
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* Level indicator */}
      <div className="mt-auto pt-4 px-2">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-display font-semibold text-gradient-cyber">Nível 24</span>
          <span className="text-muted-foreground">2.450 / 3.000 XP</span>
        </div>
        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: "82%" }} />
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
