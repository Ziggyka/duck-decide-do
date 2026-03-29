import { useState, useRef, useEffect } from "react";
import { Search, Bell, Plus, ChevronDown, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import patoLogo from "@/assets/pato-logo.png";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const notifications = [
  { id: 1, avatar: duckAvatar2, text: "DuckSlayer comentou no seu quack", time: "há 2 min" },
  { id: 2, avatar: duckAvatar3, text: "QuackQueen adicionou um item que você também tem", time: "há 15 min" },
  { id: 3, avatar: duckAvatar2, text: "PatoNinja entrou no seu grupo", time: "há 30 min" },
  { id: 4, avatar: duckAvatar3, text: "Seu grupo fez um sorteio", time: "há 1h" },
  { id: 5, avatar: duckAvatar2, text: "DuckMaster curtiu seu quack", time: "há 2h" },
];

const TopNav = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <button
          onClick={() => navigate("/quacks")}
          className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold"
        >
          <Plus className="w-4 h-4" />
          + Criar Quack
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl hover:bg-secondary-foreground/10 transition-colors"
          >
            <Bell className="w-5 h-5 text-secondary-foreground" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-secondary" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-2xl shadow-2xl z-[100] animate-fade-in overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="font-display font-semibold text-sm">Notificações</h3>
                <span className="tag-pill bg-primary/15 text-primary text-[10px] font-bold">{notifications.length} novas</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border/50 last:border-0"
                  >
                    <img src={n.avatar} alt="" className="w-9 h-9 rounded-full bg-muted border border-border flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug">{n.text}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-border">
                <button className="w-full text-center text-xs font-semibold text-primary hover:underline">
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

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
  );
};

export default TopNav;
