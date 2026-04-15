import { useState } from "react";
import { Sparkles, Calendar, UserPlus, Zap, MoreVertical, MessageCircle, EyeOff, UserMinus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const initialFriends = [
  { name: "DuckSlayer", avatar: duckAvatar2, status: "Jogando" },
  { name: "QuackQueen", avatar: duckAvatar3, status: "Online" },
  { name: "PatoNinja", avatar: duckAvatar2, status: "Em sorteio" },
  { name: "DuckMaster", avatar: duckAvatar3, status: "Online" },
];

const RightSidebar = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [hidden, setHidden] = useState<string[]>([]);

  const visibleFriends = friends.filter(f => !hidden.includes(f.name));

  const handleChat = (name: string) => toast.success(`Chat com ${name} aberto! 💬`);
  const handleHide = (name: string) => { setHidden(prev => [...prev, name]); toast(`${name} ocultado`); };
  const handleUnfriend = (name: string) => { setFriends(prev => prev.filter(f => f.name !== name)); toast(`Amizade com ${name} desfeita`); };

  // Right sidebar uses yellow theme
  const cardClass = "rounded-2xl border p-4 shadow-sm hover:shadow-md transition-shadow duration-200";
  const cardBg = "bg-white/20 border-white/20";
  const textMain = "text-[hsl(var(--sidebar-right-fg))]";
  const textMuted = "text-[hsl(var(--sidebar-right-fg))]/60";

  return (
    <aside className="sidebar-right py-4 px-3 flex flex-col gap-4">
      {/* AI Suggestion */}
      <div className={`${cardClass} bg-white/30 border-white/30`}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[hsl(var(--sidebar-right-fg))]" />
          <span className={`text-xs font-semibold ${textMain}`}>Sugestão da IA</span>
        </div>
        <p className={`text-sm font-medium ${textMain}`}>"Hoje é um bom dia para maratonar um anime com amigos! 🍿"</p>
        <button className={`mt-3 w-full text-xs font-semibold ${textMain} hover:underline`}>
          Ver sugestões →
        </button>
      </div>

      {/* Online Friends */}
      <div className={`${cardClass} ${cardBg}`}>
        <h3 className={`font-display text-sm font-semibold mb-3 flex items-center gap-2 ${textMain}`}>
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Amigos Online
        </h3>
        <div className="space-y-2.5">
          {visibleFriends.map((f) => (
            <div key={f.name} className="flex items-center gap-2.5 group">
              <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full bg-white/40 border border-white/30" />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${textMain}`}>{f.name}</p>
                <p className={`text-xs ${textMuted}`}>{f.status}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-white/20 transition-all">
                    <MoreVertical className={`w-4 h-4 ${textMuted}`} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => handleChat(f.name)} className="gap-2 cursor-pointer">
                    <MessageCircle className="w-4 h-4" /> Chamar para chat
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleHide(f.name)} className="gap-2 cursor-pointer">
                    <EyeOff className="w-4 h-4" /> Ocultar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUnfriend(f.name)} className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <UserMinus className="w-4 h-4" /> Desfazer amizade
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      {/* Group Invites */}
      <div className={`${cardClass} ${cardBg}`}>
        <h3 className={`font-display text-sm font-semibold mb-3 flex items-center gap-2 ${textMain}`}>
          <UserPlus className={`w-4 h-4 ${textMain}`} />
          Convites
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/15">
            <div>
              <p className={`text-sm font-medium ${textMain}`}>Turma do Cinema</p>
              <p className={`text-xs ${textMuted}`}>5 membros</p>
            </div>
            <button className="pato-btn-bounce px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-semibold">
              Entrar
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Event */}
      <div className={`${cardClass} ${cardBg}`}>
        <h3 className={`font-display text-sm font-semibold mb-3 flex items-center gap-2 ${textMain}`}>
          <Calendar className={`w-4 h-4 ${textMain}`} />
          Próximo Evento
        </h3>
        <div className="p-3 rounded-xl bg-white/15">
          <p className={`text-sm font-semibold ${textMain}`}>Noite de Board Games</p>
          <p className={`text-xs ${textMuted} mt-1`}>Sábado, 20:00 • 6 participantes</p>
          <div className="flex -space-x-2 mt-2">
            {[duckAvatar2, duckAvatar3, duckAvatar2].map((a, i) => (
              <img key={i} src={a} alt="" className="w-6 h-6 rounded-full border-2 border-white/30 bg-white/40" />
            ))}
            <span className={`w-6 h-6 rounded-full border-2 border-white/30 bg-white/30 flex items-center justify-center text-[10px] font-bold ${textMain}`}>+3</span>
          </div>
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className={`${cardClass} bg-white/30 border-white/30`}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className={`w-4 h-4 ${textMain}`} />
          <span className={`text-xs font-semibold ${textMain}`}>Desafio Semanal</span>
        </div>
        <p className={`text-sm font-medium ${textMain}`}>Complete 3 atividades em grupo</p>
        <div className="mt-2">
          <div className={`flex justify-between text-xs mb-1 ${textMain}`}>
            <span>1/3 completas</span>
            <span className="font-semibold">+150 XP</span>
          </div>
          <div className="h-3 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full rounded-full bg-secondary transition-all duration-700 ease-out" style={{ width: "33%" }} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
