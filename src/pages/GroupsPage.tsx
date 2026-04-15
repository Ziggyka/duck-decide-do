import { useState } from "react";
import { Search, Plus, ArrowLeft, Users, Lock, Globe, LogOut, MessageSquare, Send, Edit, Trash2, MoreHorizontal, Heart, MessageCircle, Image as ImageIcon, Settings, Shield, UserMinus, UserCheck, Crown, X } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import GroupCard from "@/components/groups/GroupCard";
import CreateGroupModal from "@/components/groups/CreateGroupModal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const allGroups = [
  { id: "1", name: "Turma do Cinema", description: "Discussões sobre filmes, séries e maratonas semanais", emoji: "🎬", cover: "🎬🍿🎥", coverImg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=200&fit=crop", avatarImg: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=100&h=100&fit=crop", members: 12, posts: 48, isPublic: true, isMember: true, isOwner: true },
  { id: "2", name: "Board Gamers", description: "Noites de jogos de tabuleiro e card games", emoji: "🎲", cover: "🎲♟️🃏", coverImg: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=600&h=200&fit=crop", avatarImg: "https://images.unsplash.com/photo-1606503153255-59d5e417c4ed?w=100&h=100&fit=crop", members: 8, posts: 23, isPublic: true, isMember: true, isOwner: false },
  { id: "3", name: "Foodies SP", description: "Os melhores restaurantes e receitas da cidade", emoji: "🍕", cover: "🍕🍣🍰", coverImg: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=200&fit=crop", avatarImg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop", members: 24, posts: 89, isPublic: true, isMember: false, isOwner: false },
  { id: "4", name: "Anime Gang", description: "Debates, recomendações e watchlists de anime", emoji: "🎌", cover: "🎌⛩️🌸", coverImg: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=200&fit=crop", avatarImg: "https://images.unsplash.com/photo-1607604276583-c4430dc15a3c?w=100&h=100&fit=crop", members: 15, posts: 67, isPublic: false, isMember: true, isOwner: false },
  { id: "5", name: "Dev Ducks", description: "Programadores patos trocando experiências", emoji: "💻", cover: "💻🦆⌨️", coverImg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=200&fit=crop", avatarImg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop", members: 9, posts: 34, isPublic: true, isMember: false, isOwner: false },
  { id: "6", name: "Rolê Raiz", description: "Trilhas, camping e aventuras ao ar livre", emoji: "🏕️", cover: "🏕️🌲🏔️", coverImg: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=200&fit=crop", avatarImg: "https://images.unsplash.com/photo-1533873984035-25970ab07461?w=100&h=100&fit=crop", members: 6, posts: 12, isPublic: true, isMember: false, isOwner: false },
];

interface GroupPost {
  id: string; user: string; avatar: string; text: string; time: string; likes: number; comments: number; liked: boolean;
}

const initialGroupFeed: GroupPost[] = [
  { id: "gp1", user: "DuckSlayer", avatar: duckAvatar2, text: "Vamos assistir Dune 2 nesse fim de semana?", time: "1h atrás", likes: 5, comments: 3, liked: false },
  { id: "gp2", user: "QuackQueen", avatar: duckAvatar3, text: "Adicionei 3 filmes novos à lista do grupo!", time: "3h atrás", likes: 8, comments: 2, liked: true },
  { id: "gp3", user: "QuackMaster", avatar: duckAvatar1, text: "Quem topa cinema sexta?", time: "5h atrás", likes: 12, comments: 6, liked: false },
];

interface GroupMember {
  name: string; avatar: string; role: "Dono" | "Admin" | "Membro"; joinedAt: string;
}

const initialMembers: GroupMember[] = [
  { name: "QuackMaster", avatar: duckAvatar1, role: "Dono", joinedAt: "15 Jan 2026" },
  { name: "DuckSlayer", avatar: duckAvatar2, role: "Admin", joinedAt: "20 Jan 2026" },
  { name: "QuackQueen", avatar: duckAvatar3, role: "Membro", joinedAt: "1 Fev 2026" },
  { name: "PatoNinja", avatar: duckAvatar2, role: "Membro", joinedAt: "10 Fev 2026" },
  { name: "DuckMaster", avatar: duckAvatar3, role: "Membro", joinedAt: "15 Mar 2026" },
];

const pendingRequests = [
  { name: "NovoPato", avatar: duckAvatar2, requestedAt: "há 2h" },
  { name: "DuckFan99", avatar: duckAvatar3, requestedAt: "há 1d" },
];

const GroupsPage = () => {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [groupPosts, setGroupPosts] = useState<GroupPost[]>(initialGroupFeed);
  const [newPostText, setNewPostText] = useState("");
  const [editingPost, setEditingPost] = useState<GroupPost | null>(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState<GroupMember[]>(initialMembers);
  const [settingsTab, setSettingsTab] = useState<"general" | "rules" | "privacy">("general");
  const [groupRules, setGroupRules] = useState("1. Respeite todos os membros\n2. Sem spam\n3. Mantenha o foco no tema do grupo");
  const [deleteGroupConfirm, setDeleteGroupConfirm] = useState(false);

  const filtered = allGroups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
  const myGroups = allGroups.filter(g => g.isMember);
  const exploreGroups = filtered.filter(g => !g.isMember);
  const selectedGroup = allGroups.find(g => g.id === selectedGroupId) as (typeof allGroups[0]) | undefined;

  const handleJoin = (id: string) => toast.success("Você entrou no grupo! 🦆");

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    setGroupPosts([{ id: crypto.randomUUID(), user: "QuackMaster", avatar: duckAvatar1, text: newPostText, time: "Agora", likes: 0, comments: 0, liked: false }, ...groupPosts]);
    setNewPostText("");
    toast.success("Publicado no grupo! 🦆");
  };

  const handleLikePost = (id: string) => {
    setGroupPosts(groupPosts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleDeletePost = (id: string) => {
    setGroupPosts(groupPosts.filter(p => p.id !== id));
    setDeleteConfirm(null);
    toast.success("Post excluído 💨");
  };

  const handleSaveEditPost = () => {
    if (!editingPost || !editText.trim()) return;
    setGroupPosts(groupPosts.map(p => p.id === editingPost.id ? { ...p, text: editText } : p));
    setEditingPost(null);
    toast.success("Post atualizado ✨");
  };

  const handlePromote = (name: string) => {
    setMembers(members.map(m => m.name === name ? { ...m, role: "Admin" } : m));
    toast.success(`${name} agora é Admin!`);
  };

  const handleDemote = (name: string) => {
    setMembers(members.map(m => m.name === name ? { ...m, role: "Membro" } : m));
    toast.success(`${name} agora é Membro`);
  };

  const handleRemoveMember = (name: string) => {
    setMembers(members.filter(m => m.name !== name));
    toast.success(`${name} removido do grupo`);
  };

  const handleApproveRequest = (name: string) => {
    toast.success(`${name} aprovado! 🎉`);
  };

  const handleDeleteGroup = () => {
    setDeleteGroupConfirm(false);
    setSelectedGroupId(null);
    toast.success("Grupo excluído");
  };

  // Group detail view
  if (selectedGroup) {
    const isOwner = selectedGroup.isOwner;

    return (
      <AppLayout hideRightSidebar>
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <button onClick={() => setSelectedGroupId(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para grupos
          </button>

          {/* Cover */}
          <div className="h-44 rounded-2xl relative overflow-hidden">
            {selectedGroup.coverImg ? (
              <img src={selectedGroup.coverImg} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">{selectedGroup.cover}</div>
            )}
          </div>

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-card -mt-10 relative z-10 shadow-lg overflow-hidden">
                {selectedGroup.avatarImg ? (
                  <img src={selectedGroup.avatarImg} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-3xl">{selectedGroup.emoji}</div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-display flex items-center gap-2">
                  {selectedGroup.name}
                  {selectedGroup.isPublic ? <Globe className="w-4 h-4 text-muted-foreground" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">{selectedGroup.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {selectedGroup.members} membros</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {selectedGroup.posts} posts</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {isOwner && (
                <>
                  <button onClick={() => setShowMembers(true)} className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-xl hover:bg-muted transition-colors">
                    <Users className="w-4 h-4" /> Membros
                  </button>
                  <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 text-sm border border-border px-4 py-2 rounded-xl hover:bg-muted transition-colors">
                    <Settings className="w-4 h-4" /> Gerenciar
                  </button>
                </>
              )}
              <button onClick={() => { setSelectedGroupId(null); toast("Você saiu do grupo"); }} className="flex items-center gap-2 text-sm text-destructive border border-destructive/30 px-4 py-2 rounded-xl hover:bg-destructive/5 transition-colors">
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Feed */}
            <div className="col-span-2 space-y-4">
              <div className="pato-card p-4">
                <div className="flex gap-3">
                  <img src={duckAvatar1} alt="" className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-primary flex-shrink-0" />
                  <div className="flex-1">
                    <textarea value={newPostText} onChange={(e) => setNewPostText(e.target.value)} placeholder={`Postar em ${selectedGroup.name}...`} rows={2} className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none leading-relaxed" />
                    <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><ImageIcon className="w-4 h-4 text-primary" /></button>
                      <button onClick={handleCreatePost} disabled={!newPostText.trim()} className={cn("flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-bold transition-all", newPostText.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                        <Send className="w-3.5 h-3.5" /> Publicar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="font-display font-bold text-lg">Feed</h2>
              {groupPosts.map((post) => (
                <div key={post.id} className="pato-card group">
                  <div className="flex items-start gap-3">
                    <img src={post.avatar} alt="" className="w-9 h-9 rounded-full bg-duck-yellow-light border-2 border-border" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{post.user}</span>
                          <span className="text-xs text-muted-foreground">{post.time}</span>
                        </div>
                        {(post.user === "QuackMaster" || isOwner) && (
                          <div className="relative">
                            <button onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)} className="p-1 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </button>
                            {openMenuId === post.id && (
                              <div className="absolute right-0 top-7 bg-card border border-border rounded-xl shadow-lg z-20 py-1 min-w-[120px] animate-fade-in">
                                <button onClick={() => { setEditingPost(post); setEditText(post.text); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /> Editar</button>
                                <button onClick={() => { setDeleteConfirm(post.id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted transition-colors text-destructive"><Trash2 className="w-3.5 h-3.5" /> Excluir</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-sm mt-1">{post.text}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => handleLikePost(post.id)} className={cn("flex items-center gap-1 text-xs font-medium transition-colors", post.liked ? "text-destructive" : "text-muted-foreground hover:text-destructive")}>
                          <Heart className={cn("w-3.5 h-3.5", post.liked && "fill-destructive")} /> {post.likes}
                        </button>
                        <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                          <MessageCircle className="w-3.5 h-3.5" /> {post.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Members sidebar */}
            <div className="space-y-4">
              <div className="pato-card">
                <h3 className="font-display font-semibold text-sm mb-3">Membros ({members.length})</h3>
                <div className="space-y-3">
                  {members.slice(0, 5).map(m => (
                    <div key={m.name} className="flex items-center gap-2.5">
                      <img src={m.avatar} alt="" className="w-8 h-8 rounded-full bg-duck-yellow-light border border-border" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className={cn("text-[10px]", m.role === "Dono" ? "text-primary font-semibold" : m.role === "Admin" ? "text-accent font-medium" : "text-muted-foreground")}>{m.role}</p>
                      </div>
                    </div>
                  ))}
                  {members.length > 5 && (
                    <button onClick={() => setShowMembers(true)} className="text-xs text-primary hover:underline">Ver todos ({members.length})</button>
                  )}
                </div>
              </div>
              <div className="pato-card">
                <h3 className="font-display font-semibold text-sm mb-2">Informações</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>Criado em: 15 Jan 2026</p>
                  <p>Tipo: {selectedGroup.isPublic ? "Público" : "Privado"}</p>
                  <p>Posts esta semana: 12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Post Modal */}
        <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
          <DialogContent className="bg-card border-border rounded-2xl">
            <DialogHeader><DialogTitle>✏️ Editar post</DialogTitle><DialogDescription>Edite o conteúdo do seu post</DialogDescription></DialogHeader>
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setEditingPost(null)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={handleSaveEditPost} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Salvar</button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Post Confirm */}
        <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
          <DialogContent className="bg-card border-border rounded-2xl max-w-sm">
            <DialogHeader><DialogTitle>🦆💔 Excluir post?</DialogTitle><DialogDescription>Essa ação não pode ser desfeita.</DialogDescription></DialogHeader>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={() => deleteConfirm && handleDeletePost(deleteConfirm)} className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold">Excluir</button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Members Modal */}
        <Dialog open={showMembers} onOpenChange={setShowMembers}>
          <DialogContent className="bg-card border-border rounded-2xl sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader><DialogTitle>👥 Membros do Grupo</DialogTitle><DialogDescription>{members.length} membros</DialogDescription></DialogHeader>
            <div className="overflow-y-auto space-y-2 flex-1">
              {members.map(m => (
                <div key={m.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <img src={m.avatar} alt="" className="w-10 h-10 rounded-full border border-border" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{m.name}</p>
                      {m.role === "Dono" && <Crown className="w-3.5 h-3.5 text-primary" />}
                      {m.role === "Admin" && <Shield className="w-3.5 h-3.5 text-accent" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground">Entrou em {m.joinedAt}</p>
                  </div>
                  {isOwner && m.role !== "Dono" && (
                    <div className="flex gap-1">
                      {m.role === "Membro" ? (
                        <button onClick={() => handlePromote(m.name)} className="p-1.5 rounded-lg hover:bg-accent/10 text-accent transition-colors" title="Promover a Admin"><Shield className="w-4 h-4" /></button>
                      ) : (
                        <button onClick={() => handleDemote(m.name)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors" title="Rebaixar"><Shield className="w-4 h-4" /></button>
                      )}
                      <button onClick={() => handleRemoveMember(m.name)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors" title="Remover"><UserMinus className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              ))}

              {/* Pending requests */}
              {isOwner && pendingRequests.length > 0 && (
                <>
                  <div className="pt-3 pb-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Solicitações Pendentes</p>
                  </div>
                  {pendingRequests.map(r => (
                    <div key={r.name} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <img src={r.avatar} alt="" className="w-10 h-10 rounded-full border border-border" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-[11px] text-muted-foreground">{r.requestedAt}</p>
                      </div>
                      <button onClick={() => handleApproveRequest(r.name)} className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"><UserCheck className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Group Settings Modal */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="bg-card border-border rounded-2xl sm:max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader><DialogTitle>⚙️ Gerenciar Grupo</DialogTitle><DialogDescription>Configure as opções do grupo</DialogDescription></DialogHeader>
            {/* Tabs */}
            <div className="flex gap-1 bg-muted rounded-xl p-1">
              {(["general", "rules", "privacy"] as const).map(t => (
                <button key={t} onClick={() => setSettingsTab(t)} className={cn("flex-1 py-2 rounded-lg text-xs font-medium transition-all", settingsTab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}>
                  {t === "general" ? "Geral" : t === "rules" ? "Regras" : "Privacidade"}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto flex-1 space-y-4 py-2">
              {settingsTab === "general" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome do grupo</label>
                    <Input defaultValue={selectedGroup?.name} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descrição</label>
                    <Textarea defaultValue={selectedGroup?.description} className="rounded-xl resize-none" rows={3} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Capa do grupo</label>
                    <div className="h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center text-sm text-muted-foreground hover:border-primary/50 cursor-pointer transition-colors">
                      Clique para alterar a capa
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Avatar do grupo</label>
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center text-sm text-muted-foreground hover:border-primary/50 cursor-pointer transition-colors">
                      📷
                    </div>
                  </div>
                  <button onClick={() => { setShowSettings(false); toast.success("Configurações salvas!"); }} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                    Salvar Alterações
                  </button>
                </>
              )}
              {settingsTab === "rules" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Regras do grupo</label>
                    <Textarea value={groupRules} onChange={e => setGroupRules(e.target.value)} className="rounded-xl resize-none" rows={8} />
                  </div>
                  <button onClick={() => { toast.success("Regras atualizadas!"); }} className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                    Salvar Regras
                  </button>
                </>
              )}
              {settingsTab === "privacy" && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                      <div>
                        <p className="text-sm font-medium">Grupo Público</p>
                        <p className="text-xs text-muted-foreground">Qualquer pessoa pode encontrar e entrar</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground">Ativo</button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                      <div>
                        <p className="text-sm font-medium">Aprovação de membros</p>
                        <p className="text-xs text-muted-foreground">Novos membros precisam de aprovação</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">Desativado</button>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                      <div>
                        <p className="text-sm font-medium">Apenas admins podem postar</p>
                        <p className="text-xs text-muted-foreground">Restringe publicações a admins</p>
                      </div>
                      <button className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">Desativado</button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <button onClick={() => setDeleteGroupConfirm(true)} className="w-full py-2.5 rounded-xl border border-destructive text-destructive text-sm font-semibold hover:bg-destructive/5 transition-colors">
                      🗑️ Excluir Grupo
                    </button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Group Confirm */}
        <Dialog open={deleteGroupConfirm} onOpenChange={setDeleteGroupConfirm}>
          <DialogContent className="bg-card border-border rounded-2xl max-w-sm">
            <DialogHeader><DialogTitle>⚠️ Excluir grupo?</DialogTitle><DialogDescription>Essa ação é permanente. Todos os dados do grupo serão perdidos.</DialogDescription></DialogHeader>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setDeleteGroupConfirm(false)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={handleDeleteGroup} className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold">Excluir Grupo</button>
            </div>
          </DialogContent>
        </Dialog>

        <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} />
      </AppLayout>
    );
  }

  // Group listing view
  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Grupos 🦆</h1>
          <button onClick={() => setShowCreate(true)} className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl text-sm font-bold">
            <Plus className="w-4 h-4" /> Criar Grupo
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar grupo..." className="pl-10 rounded-2xl" />
        </div>

        <section>
          <h2 className="font-display font-bold text-lg mb-4">Meus Grupos</h2>
          <div className="grid grid-cols-3 gap-4">
            {myGroups.map(g => <GroupCard key={g.id} group={g} onOpen={setSelectedGroupId} onJoin={handleJoin} />)}
          </div>
        </section>

        {exploreGroups.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-lg mb-4">Explorar</h2>
            <div className="grid grid-cols-3 gap-4">
              {exploreGroups.map(g => <GroupCard key={g.id} group={g} onOpen={setSelectedGroupId} onJoin={handleJoin} />)}
            </div>
          </section>
        )}
      </div>
      <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} />
    </AppLayout>
  );
};

export default GroupsPage;
