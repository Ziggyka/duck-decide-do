import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import patoLogo from "@/assets/pato-logo.png";
import duckAvatar from "@/assets/duck-avatar-1.png";

const TopNav = () => {
  return (
    <nav className="nav-top">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-4">
        <img src={patoLogo} alt="Pato App" className="w-8 h-8" />
        <span className="font-display font-bold text-lg text-gradient-neon">Pato App</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar atividades, amigos, grupos..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink/50 transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="pato-btn-bounce flex items-center gap-2 bg-gradient-vibrant text-foreground px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
          <Plus className="w-4 h-4" />
          Criar Atividade
        </button>

        <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-neon-pink rounded-full border-2 border-background animate-pulse" />
        </button>

        <button className="flex items-center gap-2 p-1 pr-3 rounded-xl hover:bg-muted transition-colors">
          <img src={duckAvatar} alt="avatar" className="w-8 h-8 rounded-full border-2 border-primary glow-duck" />
          <span className="text-sm font-medium text-foreground">QuackMaster</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
