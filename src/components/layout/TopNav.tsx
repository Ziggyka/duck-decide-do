import { Search, Bell, Plus, ChevronDown, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import patoLogo from "@/assets/pato-logo.png";
import duckAvatar from "@/assets/duck-avatar-1.png";

const TopNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-top">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-4 cursor-pointer" onClick={() => navigate("/")}>
        <img src={patoLogo} alt="Pato App" className="w-8 h-8" />
        <span className="font-display font-bold text-lg text-primary">Pato App</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar quacks, patos, grupos..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus className="w-4 h-4" />
          Criar Atividade
        </button>

        <button className="relative p-2 rounded-xl hover:bg-secondary-foreground/10 transition-colors">
          <Bell className="w-5 h-5 text-secondary-foreground" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-secondary" />
        </button>

        <button
          onClick={() => navigate("/settings")}
          className="p-2 rounded-xl hover:bg-secondary-foreground/10 transition-colors"
        >
          <Settings className="w-5 h-5 text-secondary-foreground" />
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 p-1 pr-3 rounded-xl hover:bg-secondary-foreground/10 transition-colors"
        >
          <img src={duckAvatar} alt="avatar" className="w-8 h-8 rounded-full bg-duck-yellow-light border-2 border-primary" />
          <span className="text-sm font-medium text-secondary-foreground">QuackMaster</span>
          <ChevronDown className="w-3 h-3 text-secondary-foreground/60" />
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
