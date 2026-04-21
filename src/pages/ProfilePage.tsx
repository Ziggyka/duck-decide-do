import { useState } from "react";
import { UserPlus, Star, ListChecks, ExternalLink, Plus, UserMinus, Ban, Check, X, MoreHorizontal, Loader2, Edit, Trash2 } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";
import AppLayout from "@/components/layout/AppLayout";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import AvatarCustomizeModal from "@/components/profile/AvatarCustomizeModal";
import CreateQuackModal from "@/components/quack/CreateQuackModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProfile } from "@/hooks/useProfile";
import { useQuacks, type Quack } from "@/hooks/useQuacks";

const badges = [
  { name: "Curador do Mês", icon: "🏅", desc: "Top curador em Março" },
  { name: "Streak Master", icon: "🔥", desc: "30 dias consecutivos" },
  { name: "Explorador", icon: "🗺️", desc: "Visitou 10 lugares" },
  { name: "Crítico de Ouro", icon: "⭐", desc: "50 avaliações" },
  { name: "Social Butterfly", icon: "🦋", desc: "100 amigos" },
  { name: "Vencedor", icon: "🏆", desc: "Ganhou 20 sorteios" },
  { name: "Fotógrafo", icon: "📸", desc: "50 fotos postadas" },
  { name: "Líder", icon: "👑", desc: "Criou 5 grupos" },
];

const photoGrid = [
  "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=300&fit=crop",
];

const friendsList = [
  { name: "DuckSlayer", level: 18, avatar: duckAvatar2, status: "friend" as const },
  { name: "QuackQueen", level: 22, avatar: duckAvatar3, status: "friend" as const },
  { name: "PatoNinja", level: 15, avatar: duckAvatar2, status: "friend" as const },
  { name: "DuckMaster", level: 30, avatar: duckAvatar3, status: "friend" as const },
  { name: "PatolinoX", level: 8, avatar: duckAvatar2, status: "pending" as const },
  { name: "QuackZilla", level: 12, avatar: duckAvatar3, status: "pending" as const },
];

const tabs = ["Atividades", "Listas", "Conquistas", "Fotos", "Amigos"];

const statusMeta: Record<string, { label: string; emoji: string; color: string }> = {
  quero_fazer: { label: "Quero fazer", emoji: "📌", color: "bg-primary/15 text-primary" },
  fazendo: { label: "Fazendo", emoji: "⏳", color: "bg-accent/15 text-accent-foreground" },
  feito: { label: "Feito", emoji: "✅", color: "bg-success/15 text-success" },
};

const ProfilePage = () => {
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { quacks, loading: quacksLoading, deleteQuack, refetch } = useQuacks("self");
  const [activeTab, setActiveTab] = useState("Atividades");
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [friends, setFriends] = useState(friendsList);
  const [editingQuack, setEditingQuack] = useState<Quack | null>(null);
  const [showCreateQuack, setShowCreateQuack] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleRemoveFriend = (name: string) => {
    setFriends(prev => prev.filter(f => f.name !== name));
    toast.success(`${name} removido dos amigos`);
  };
  const handleBlockUser = (name: string) => {
    setFriends(prev => prev.filter(f => f.name !== name));
    toast.success(`${name} bloqueado`);
  };
  const handleAcceptFriend = (name: string) => {
    setFriends(prev => prev.map(f => f.name === name ? { ...f, status: "friend" as const } : f));
    toast.success(`${name} adicionado como amigo! 🦆`);
  };
  const handleRejectFriend = (name: string) => {
    setFriends(prev => prev.filter(f => f.name !== name));
    toast(`Solicitação de ${name} recusada`);
  };

  const handleAvatarSave = async (url: string) => {
    const { error } = await updateProfile({ avatar_url: url });
    if (error) toast.error("Erro ao atualizar avatar");
    else toast.success("Avatar atualizado! 🦆");
  };

  const handleDeleteQuack = async (id: string) => {
    const { error } = await deleteQuack(id);
    setDeleteConfirm(null);
    if (error) toast.error("Erro ao excluir");
    else toast.success("Excluído 💨");
  };

  if (profileLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      </AppLayout>
    );
  }

  const displayName = profile?.display_name || profile?.username || "Pato";
  const avatar = profile?.avatar_url || duckAvatar1;
  const xpPct = profile ? Math.min(100, Math.round((profile.xp % 1000) / 10)) : 0;

  const quackCount = quacks.length;
  const doneCount = quacks.filter(q => q.status === "feito").length;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="pato-card p-6">
          <div className="flex items-start gap-6">
            <div className="relative group">
              <img src={avatar} alt="avatar" className="w-24 h-24 rounded-2xl bg-duck-yellow-light border-4 border-primary glow-duck object-cover" />
              <span className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">Lv.{profile?.level ?? 1}</span>
              <button onClick={() => setAvatarModalOpen(true)} className="absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-0.5">
                <h1 className="text-2xl">{displayName}</h1>
                <span className="tag-pill bg-primary/15 text-primary font-semibold">🦆 Pato Lendário</span>
              </div>
              <p className="text-sm text-muted-foreground mb-0.5">@{profile?.username}</p>
              {profile?.bio && <p className="text-sm text-muted-foreground mb-1">{profile.bio}</p>}
              <div className="mb-3 mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-display font-semibold">Nível {profile?.level ?? 1}</span>
                  <span className="text-muted-foreground">{profile?.xp ?? 0} XP</span>
                </div>
                <div className="xp-bar h-3"><div className="xp-bar-fill" style={{ width: `${xpPct}%` }} /></div>
              </div>
              <div className="flex gap-6 text-center">
                {[
                  { value: quackCount.toString(), label: "Quacks" },
                  { value: doneCount.toString(), label: "Concluídos" },
                  { value: friends.filter(f => f.status === "friend").length.toString(), label: "Amigos" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-bold text-lg">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <EditProfileDialog />
            </div>
          </div>
        </div>

        <div className="flex gap-1 bg-card rounded-2xl p-1 border border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap px-3 ${activeTab === tab ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Atividades" && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex justify-end">
              <button onClick={() => { setEditingQuack(null); setShowCreateQuack(true); }} className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold">
                <Plus className="w-4 h-4" /> Nova atividade
              </button>
            </div>
            {quacksLoading && (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
            )}
            {!quacksLoading && quacks.length === 0 && (
              <div className="pato-card p-8 text-center">
                <p className="text-3xl mb-2">🦆</p>
                <p className="font-display font-bold mb-1">Nenhuma atividade</p>
                <p className="text-xs text-muted-foreground">Crie seu primeiro Quack para aparecer aqui.</p>
              </div>
            )}
            {quacks.map((q) => {
              const sm = statusMeta[q.status] || statusMeta.quero_fazer;
              const checkDone = q.checklist?.filter(c => c.done).length || 0;
              const checkTotal = q.checklist?.length || 0;
              return (
                <div key={q.id} className="pato-card group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{q.title}</p>
                      {q.category && <p className="text-xs text-muted-foreground capitalize">{q.category}</p>}
                      {checkTotal > 0 && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <ListChecks className="w-3.5 h-3.5" />
                          <span>{checkDone}/{checkTotal}</span>
                        </div>
                      )}
                    </div>
                    {q.status === "feito" && q.rating > 0 && (
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={cn("w-3.5 h-3.5", s <= q.rating ? "fill-primary text-primary" : "text-muted")} />
                        ))}
                      </div>
                    )}
                    <span className={cn("tag-pill text-[11px] font-semibold", sm.color)}>{sm.emoji} {sm.label}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-xl hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={() => { setEditingQuack(q); setShowCreateQuack(true); }} className="gap-2 cursor-pointer">
                          <Edit className="w-4 h-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteConfirm(q.id)} className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                          <Trash2 className="w-4 h-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "Listas" && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {["Filmes para Assistir", "Restaurantes SP", "Board Games", "Animes 2024"].map((l, i) => (
              <div key={l} className="pato-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <ListChecks className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{l}</p>
                  <p className="text-xs text-muted-foreground">{(i + 1) * 7} itens</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Conquistas" && (
          <div className="grid grid-cols-4 gap-3 animate-fade-in">
            {badges.map((b) => (
              <div key={b.name} className="pato-card text-center p-4 hover:border-primary/50 cursor-pointer group">
                <span className="text-3xl block mb-2 group-hover:animate-bounce-in">{b.icon}</span>
                <p className="text-sm font-display font-semibold">{b.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Fotos" && (
          <div className="grid grid-cols-3 gap-2 animate-fade-in">
            {photoGrid.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Amigos" && (
          <div className="space-y-3 animate-fade-in">
            {friends.filter(f => f.status === "pending").length > 0 && (
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-sm text-muted-foreground">Solicitações pendentes</h3>
                {friends.filter(f => f.status === "pending").map(f => (
                  <div key={f.name} className="pato-card flex items-center gap-3">
                    <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{f.name}</p>
                      <p className="text-xs text-muted-foreground">Nível {f.level}</p>
                    </div>
                    <button onClick={() => handleAcceptFriend(f.name)} className="pato-btn-bounce p-2 rounded-lg bg-success/15 text-success hover:bg-success/25 transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleRejectFriend(f.name)} className="pato-btn-bounce p-2 rounded-lg bg-destructive/15 text-destructive hover:bg-destructive/25 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <h3 className="font-display font-semibold text-sm text-muted-foreground">Amigos ({friends.filter(f => f.status === "friend").length})</h3>
            {friends.filter(f => f.status === "friend").map(f => (
              <div key={f.name} className="pato-card flex items-center gap-3">
                <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{f.name}</p>
                  <p className="text-xs text-muted-foreground">Nível {f.level}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => handleRemoveFriend(f.name)} className="gap-2 cursor-pointer">
                      <UserMinus className="w-4 h-4" /> Remover amigo
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBlockUser(f.name)} className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                      <Ban className="w-4 h-4" /> Bloquear
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>

      <AvatarCustomizeModal
        open={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        currentAvatar={avatar}
        onSave={handleAvatarSave}
      />

      <CreateQuackModal
        open={showCreateQuack}
        onClose={() => { setShowCreateQuack(false); setEditingQuack(null); }}
        onCreated={() => { setShowCreateQuack(false); setEditingQuack(null); refetch(); }}
        editingQuack={editingQuack}
      />

      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-border rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>🦆💔 Excluir Quack?</DialogTitle>
            <DialogDescription>Tem certeza? Essa ação não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
            <button onClick={() => deleteConfirm && handleDeleteQuack(deleteConfirm)} className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors">Excluir</button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ProfilePage;
