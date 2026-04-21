import { useState } from "react";
import { Search, Bell, Plus, ChevronDown, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logotipo from "@/assets/logotipo.svg";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import CreateQuackModal from "@/components/quack/CreateQuackModal";
import type { QuackData } from "@/components/quack/CreateQuackModal";
import { toast } from "sonner";

const TopNav = () => {
  const navigate = useNavigate();
  const [showCreateQuack, setShowCreateQuack] = useState(false);
  const unreadCount = 3;

  const handleSaveQuack = (quack: QuackData) => {
    toast.success("Quack criado! 🦆🎉");
  };

  return (
    <>
      <nav className="nav-top">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
          <img src={logotipo} alt="Pato App" className="h-8 w-auto" />
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
          <button
            onClick={() => setShowCreateQuack(true)}
            className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Criar Quack
          </button>

          {/* Notifications - navigate to page */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-2 rounded-xl hover:bg-secondary-foreground/10 transition-colors"
          >
            <Bell className="w-5 h-5 text-secondary-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-destructive rounded-full border-2 border-secondary flex items-center justify-center text-[10px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
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
            <img src={duckAvatar1} alt="avatar" className="w-8 h-8 rounded-full bg-duck-yellow-light border-2 border-primary" />
            <span className="text-sm font-medium text-secondary-foreground">QuackMaster</span>
            <ChevronDown className="w-3 h-3 text-secondary-foreground/60" />
          </button>
        </div>
      </nav>

      <CreateQuackModal
        open={showCreateQuack}
        onClose={() => setShowCreateQuack(false)}
        onSave={handleSaveQuack}
        editingQuack={null}
      />
    </>
  );
};

export default TopNav;
