import { Sparkles, Calendar, UserPlus, Zap } from "lucide-react";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const onlineFriends = [
  { name: "DuckSlayer", avatar: duckAvatar2, status: "Jogando", color: "text-neon-green" },
  { name: "QuackQueen", avatar: duckAvatar3, status: "Online", color: "text-neon-cyan" },
  { name: "PatoNinja", avatar: duckAvatar2, status: "Em sorteio", color: "text-neon-purple" },
  { name: "DuckMaster", avatar: duckAvatar3, status: "Online", color: "text-neon-cyan" },
];

const RightSidebar = () => {
  return (
    <aside className="sidebar-right py-4 px-3 flex flex-col gap-4">
      {/* AI Suggestion */}
      <div className="pato-card border-neon-purple/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/5" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-neon-purple animate-neon-pulse" />
            <span className="text-xs font-semibold text-neon-purple">Sugestão da IA</span>
          </div>
          <p className="text-sm font-medium">"Hoje é um bom dia para maratonar um anime com amigos! 🍿"</p>
          <button className="mt-3 w-full text-xs font-semibold text-neon-cyan hover:underline">
            Ver sugestões →
          </button>
        </div>
      </div>

      {/* Online Friends */}
      <div className="pato-card">
        <h3 className="font-display text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          Amigos Online
        </h3>
        <div className="space-y-2.5">
          {onlineFriends.map((f) => (
            <div key={f.name} className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
              <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full border border-border" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{f.name}</p>
                <p className={`text-xs ${f.color}`}>{f.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group Invites */}
      <div className="pato-card border-neon-pink/20">
        <h3 className="font-display text-sm font-semibold mb-3 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-neon-pink" />
          Convites
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-muted/50">
            <div>
              <p className="text-sm font-medium">Turma do Cinema</p>
              <p className="text-xs text-muted-foreground">5 membros</p>
            </div>
            <button className="pato-btn-bounce px-3 py-1 rounded-lg bg-gradient-sunset text-primary-foreground text-xs font-semibold">
              Entrar
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Event */}
      <div className="pato-card border-neon-cyan/20">
        <h3 className="font-display text-sm font-semibold mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-neon-cyan" />
          Próximo Evento
        </h3>
        <div className="p-3 rounded-xl bg-muted/50">
          <p className="text-sm font-semibold">Noite de Board Games</p>
          <p className="text-xs text-muted-foreground mt-1">Sábado, 20:00 • 6 participantes</p>
          <div className="flex -space-x-2 mt-2">
            {[duckAvatar2, duckAvatar3, duckAvatar2].map((a, i) => (
              <img key={i} src={a} alt="" className="w-6 h-6 rounded-full border-2 border-card" />
            ))}
            <span className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">+3</span>
          </div>
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="pato-card border-neon-green/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-neon-cyan/5" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="text-xs font-semibold text-neon-green">Desafio Semanal</span>
          </div>
          <p className="text-sm font-medium">Complete 3 atividades em grupo</p>
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span>1/3 completas</span>
              <span className="text-neon-green font-semibold">+150 XP</span>
            </div>
            <div className="xp-bar">
              <div className="h-full rounded-full bg-neon-green transition-all" style={{ width: "33%" }} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
