import { useState } from "react";
import { Check, Link2Off } from "lucide-react";
import { toast } from "sonner";

const platforms = [
  { id: "spotify", name: "Spotify", icon: "🎵", color: "bg-green-500/15 text-green-600" },
  { id: "instagram", name: "Instagram", icon: "📸", color: "bg-pink-500/15 text-pink-600" },
  { id: "youtube", name: "YouTube", icon: "▶️", color: "bg-red-500/15 text-red-600" },
  { id: "steam", name: "Steam", icon: "🎮", color: "bg-blue-600/15 text-blue-600" },
  { id: "epic", name: "Epic Games", icon: "🏔️", color: "bg-slate-500/15 text-slate-600" },
  { id: "crunchyroll", name: "Crunchyroll", icon: "🍥", color: "bg-orange-500/15 text-orange-600" },
  { id: "blizzard", name: "Blizzard", icon: "❄️", color: "bg-blue-400/15 text-blue-500" },
  { id: "xbox", name: "Xbox", icon: "🟢", color: "bg-green-600/15 text-green-700" },
  { id: "github", name: "GitHub", icon: "🐙", color: "bg-gray-500/15 text-gray-700" },
  { id: "x", name: "X (Twitter)", icon: "𝕏", color: "bg-slate-800/15 text-slate-800" },
  { id: "pinterest", name: "Pinterest", icon: "📌", color: "bg-red-600/15 text-red-700" },
  { id: "twitch", name: "Twitch", icon: "💜", color: "bg-purple-500/15 text-purple-600" },
];

const ConnectionsTab = () => {
  const [connected, setConnected] = useState<Record<string, boolean>>({ spotify: true, github: true });

  const toggle = (id: string) => {
    const isConnected = connected[id];
    setConnected(prev => ({ ...prev, [id]: !isConnected }));
    toast.success(isConnected ? `${platforms.find(p => p.id === id)?.name} desconectado` : `${platforms.find(p => p.id === id)?.name} conectado com sucesso! ✅`);
  };

  return (
    <div className="pato-card p-6 space-y-5 animate-fade-in">
      <div>
        <h2 className="text-lg font-display">Conexões</h2>
        <p className="text-sm text-muted-foreground mt-1">Conecte suas contas de outras plataformas</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {platforms.map((p) => {
          const isConn = connected[p.id];
          return (
            <div
              key={p.id}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md ${
                isConn ? "border-success/40 bg-success/5" : "border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${p.color}`}>
                {p.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{p.name}</p>
                <p className={`text-xs ${isConn ? "text-success font-medium" : "text-muted-foreground"}`}>
                  {isConn ? "Conectado" : "Não conectado"}
                </p>
              </div>
              <button
                onClick={() => toggle(p.id)}
                className={`pato-btn-bounce px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isConn
                    ? "border border-destructive/30 text-destructive hover:bg-destructive/10"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {isConn ? (
                  <span className="flex items-center gap-1"><Link2Off className="w-3 h-3" /> Desconectar</span>
                ) : (
                  "Conectar"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectionsTab;
