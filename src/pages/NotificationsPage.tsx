import { useState } from "react";
import { Heart, MessageCircle, Users, Star, UserPlus, Bell, Check } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

type NotifType = "like" | "comment" | "follow" | "invite" | "activity";

interface Notification {
  id: number;
  avatar: string;
  user: string;
  text: string;
  time: string;
  type: NotifType;
  read: boolean;
}

const typeConfig: Record<NotifType, { icon: typeof Heart; color: string; label: string }> = {
  like: { icon: Heart, color: "text-destructive", label: "Curtidas" },
  comment: { icon: MessageCircle, color: "text-primary", label: "Comentários" },
  follow: { icon: UserPlus, color: "text-success", label: "Seguidores" },
  invite: { icon: Users, color: "text-accent-foreground", label: "Convites" },
  activity: { icon: Star, color: "text-accent", label: "Atividades" },
};

const notifications: Notification[] = [
  { id: 1, avatar: duckAvatar2, user: "DuckSlayer", text: "curtiu seu quack sobre Interstellar", time: "há 2 min", type: "like", read: false },
  { id: 2, avatar: duckAvatar3, user: "QuackQueen", text: "comentou: 'Esse anime é incrível!'", time: "há 10 min", type: "comment", read: false },
  { id: 3, avatar: duckAvatar2, user: "PatoNinja", text: "começou a seguir você", time: "há 30 min", type: "follow", read: false },
  { id: 4, avatar: duckAvatar3, user: "DuckMaster", text: "te convidou para o grupo 'Turma do Cinema'", time: "há 1h", type: "invite", read: false },
  { id: 5, avatar: duckAvatar2, user: "DuckSlayer", text: "completou Frieren e avaliou ⭐⭐⭐⭐⭐", time: "há 2h", type: "activity", read: true },
  { id: 6, avatar: duckAvatar3, user: "QuackQueen", text: "curtiu seu post 'Noite de pizza'", time: "há 3h", type: "like", read: true },
  { id: 7, avatar: duckAvatar2, user: "PatoNinja", text: "comentou no seu quack de Treino", time: "há 4h", type: "comment", read: true },
  { id: 8, avatar: duckAvatar3, user: "DuckMaster", text: "entrou no seu grupo 'Galera do Board Game'", time: "há 5h", type: "invite", read: true },
  { id: 9, avatar: duckAvatar2, user: "DuckSlayer", text: "começou a seguir você", time: "há 6h", type: "follow", read: true },
  { id: 10, avatar: duckAvatar3, user: "QuackQueen", text: "concluiu o desafio semanal e ganhou +150 XP", time: "há 8h", type: "activity", read: true },
  { id: 11, avatar: duckAvatar2, user: "PatoNinja", text: "curtiu sua conquista 'Streak Master'", time: "há 12h", type: "like", read: true },
  { id: 12, avatar: duckAvatar3, user: "DuckMaster", text: "comentou: 'Bora jogar semana que vem?'", time: "há 1d", type: "comment", read: true },
];

const filters: { key: "all" | NotifType; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "like", label: "Curtidas" },
  { key: "comment", label: "Comentários" },
  { key: "follow", label: "Seguidores" },
  { key: "invite", label: "Convites" },
  { key: "activity", label: "Atividades" },
];

const NotificationsPage = () => {
  const [filter, setFilter] = useState<"all" | NotifType>("all");
  const [readState, setReadState] = useState<Record<number, boolean>>(
    Object.fromEntries(notifications.map(n => [n.id, n.read]))
  );

  const filtered = filter === "all" ? notifications : notifications.filter(n => n.type === filter);
  const unreadCount = Object.values(readState).filter(r => !r).length;

  const markAllRead = () => {
    const updated: Record<number, boolean> = {};
    notifications.forEach(n => { updated[n.id] = true; });
    setReadState(updated);
  };

  const markRead = (id: number) => {
    setReadState(prev => ({ ...prev, [id]: true }));
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" /> Notificações
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} não lidas` : "Tudo em dia! 🦆"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="pato-btn-bounce flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              <Check className="w-4 h-4" /> Marcar todas como lidas
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "tag-pill py-2 px-4 text-sm font-medium transition-all whitespace-nowrap",
                filter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="pato-card divide-y divide-border overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-3xl mb-2">🦆</p>
              <p className="text-sm text-muted-foreground">Nenhuma notificação nesta categoria</p>
            </div>
          ) : (
            filtered.map((n, i) => {
              const config = typeConfig[n.type];
              const TypeIcon = config.icon;
              const isRead = readState[n.id];

              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "flex items-start gap-3 px-5 py-4 transition-colors cursor-pointer animate-fade-in",
                    !isRead ? "bg-primary/5 hover:bg-primary/8" : "hover:bg-muted/50"
                  )}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="relative flex-shrink-0">
                    <img src={n.avatar} alt={n.user} className="w-11 h-11 rounded-full bg-muted border-2 border-border" />
                    <div className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-card border-2 border-card flex items-center justify-center",
                    )}>
                      <TypeIcon className={cn("w-3 h-3", config.color)} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm leading-snug", !isRead && "font-semibold")}>
                      <span className="font-bold">{n.user}</span> {n.text}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                  {!isRead && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
