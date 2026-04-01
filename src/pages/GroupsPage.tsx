import { useState } from "react";
import { Search, Plus, ArrowLeft, Users, Lock, Globe, LogOut, MessageSquare, Send, Edit, Trash2, MoreHorizontal, Heart, MessageCircle, Image as ImageIcon } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import GroupCard from "@/components/groups/GroupCard";
import CreateGroupModal from "@/components/groups/CreateGroupModal";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const allGroups = [
  { id: "1", name: "Turma do Cinema", description: "Discussões sobre filmes, séries e maratonas semanais", emoji: "🎬", cover: "🎬🍿🎥", members: 12, posts: 48, isPublic: true, isMember: true },
  { id: "2", name: "Board Gamers", description: "Noites de jogos de tabuleiro e card games", emoji: "🎲", cover: "🎲♟️🃏", members: 8, posts: 23, isPublic: true, isMember: true },
  { id: "3", name: "Foodies SP", description: "Os melhores restaurantes e receitas da cidade", emoji: "🍕", cover: "🍕🍣🍰", members: 24, posts: 89, isPublic: true, isMember: false },
  { id: "4", name: "Anime Gang", description: "Debates, recomendações e watchlists de anime", emoji: "🎌", cover: "🎌⛩️🌸", members: 15, posts: 67, isPublic: false, isMember: true },
  { id: "5", name: "Dev Ducks", description: "Programadores patos trocando experiências", emoji: "💻", cover: "💻🦆⌨️", members: 9, posts: 34, isPublic: true, isMember: false },
  { id: "6", name: "Rolê Raiz", description: "Trilhas, camping e aventuras ao ar livre", emoji: "🏕️", cover: "🏕️🌲🏔️", members: 6, posts: 12, isPublic: true, isMember: false },
];

interface GroupPost {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const initialGroupFeed: GroupPost[] = [
  { id: "gp1", user: "DuckSlayer", avatar: duckAvatar2, text: "Vamos assistir Dune 2 nesse fim de semana?", time: "1h atrás", likes: 5, comments: 3, liked: false },
  { id: "gp2", user: "QuackQueen", avatar: duckAvatar3, text: "Adicionei 3 filmes novos à lista do grupo!", time: "3h atrás", likes: 8, comments: 2, liked: true },
  { id: "gp3", user: "QuackMaster", avatar: duckAvatar1, text: "Quem topa cinema sexta?", time: "5h atrás", likes: 12, comments: 6, liked: false },
];

const groupMembers = [
  { name: "QuackMaster", avatar: duckAvatar1, role: "Admin" },
  { name: "DuckSlayer", avatar: duckAvatar2, role: "Membro" },
  { name: "QuackQueen", avatar: duckAvatar3, role: "Membro" },
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

  const filtered = allGroups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
  const myGroups = allGroups.filter(g => g.isMember);
  const exploreGroups = filtered.filter(g => !g.isMember);
  const selectedGroup = allGroups.find(g => g.id === selectedGroupId);

  const handleJoin = (id: string) => {
    toast.success("Você entrou no grupo! 🦆");
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost: GroupPost = {
      id: crypto.randomUUID(), user: "QuackMaster", avatar: duckAvatar1,
      text: newPostText, time: "Agora", likes: 0, comments: 0, liked: false,
    };
    setGroupPosts([newPost, ...groupPosts]);
    setNewPostText("");
    toast.success("Publicado no grupo! 🦆");
  };

  const handleLikePost = (id: string) => {
    setGroupPosts(groupPosts.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
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

  if (selectedGroup) {
    return (
      <AppLayout hideRightSidebar>
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <button onClick={() => setSelectedGroupId(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para grupos
          </button>

          {/* Cover */}
          <div className="h-40 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl relative overflow-hidden">
            {selectedGroup.cover}
          </div>

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border-4 border-card -mt-10 relative z-10 flex items-center justify-center text-3xl shadow-lg">
                {selectedGroup.emoji}
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
            <button onClick={() => { setSelectedGroupId(null); toast("Você saiu do grupo"); }} className="flex items-center gap-2 text-sm text-destructive border border-destructive/30 px-4 py-2 rounded-xl hover:bg-destructive/5 transition-colors">
              <LogOut className="w-4 h-4" /> Sair do grupo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Feed */}
            <div className="col-span-2 space-y-4">
              {/* Create post in group */}
              <div className="pato-card p-4">
                <div className="flex gap-3">
                  <img src={duckAvatar1} alt="" className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-primary flex-shrink-0" />
                  <div className="flex-1">
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder={`Postar em ${selectedGroup.name}...`}
                      rows={2}
                      className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none leading-relaxed"
                    />
                    <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors"><ImageIcon className="w-4 h-4 text-primary" /></button>
                      <button
                        onClick={handleCreatePost}
                        disabled={!newPostText.trim()}
                        className={cn("flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-bold transition-all",
                          newPostText.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                      >
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
                        {post.user === "QuackMaster" && (
                          <div className="relative">
                            <button onClick={() => setOpenMenuId(openMenuId === post.id ? null : post.id)} className="p-1 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                            </button>
                            {openMenuId === post.id && (
                              <div className="absolute right-0 top-7 bg-card border border-border rounded-xl shadow-lg z-20 py-1 min-w-[120px] animate-fade-in">
                                <button onClick={() => { setEditingPost(post); setEditText(post.text); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted transition-colors">
                                  <Edit className="w-3.5 h-3.5" /> Editar
                                </button>
                                <button onClick={() => { setDeleteConfirm(post.id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-muted transition-colors text-destructive">
                                  <Trash2 className="w-3.5 h-3.5" /> Excluir
                                </button>
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
                <h3 className="font-display font-semibold text-sm mb-3">Membros ({selectedGroup.members})</h3>
                <div className="space-y-3">
                  {groupMembers.map(m => (
                    <div key={m.name} className="flex items-center gap-2.5">
                      <img src={m.avatar} alt="" className="w-8 h-8 rounded-full bg-duck-yellow-light border border-border" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground">{m.role}</p>
                      </div>
                    </div>
                  ))}
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
            <DialogHeader>
              <DialogTitle>✏️ Editar post</DialogTitle>
              <DialogDescription>Edite o conteúdo do seu post no grupo</DialogDescription>
            </DialogHeader>
            <textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setEditingPost(null)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={handleSaveEditPost} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">Salvar</button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirm */}
        <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
          <DialogContent className="bg-card border-border rounded-2xl max-w-sm">
            <DialogHeader>
              <DialogTitle>🦆💔 Excluir post?</DialogTitle>
              <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 justify-end pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={() => deleteConfirm && handleDeletePost(deleteConfirm)} className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors">Excluir</button>
            </div>
          </DialogContent>
        </Dialog>

        <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} />
      </AppLayout>
    );
  }

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Grupos 🦆</h1>
          <button onClick={() => setShowCreate(true)} className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl text-sm font-bold">
            <Plus className="w-4 h-4" /> Criar Grupo
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar grupo..." className="pl-10 rounded-2xl" />
        </div>

        {/* My Groups */}
        <section>
          <h2 className="font-display font-bold text-lg mb-4">Meus Grupos</h2>
          <div className="grid grid-cols-3 gap-4">
            {myGroups.map(g => (
              <GroupCard key={g.id} group={g} onOpen={setSelectedGroupId} onJoin={handleJoin} />
            ))}
          </div>
        </section>

        {/* Explore */}
        {exploreGroups.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-lg mb-4">Explorar</h2>
            <div className="grid grid-cols-3 gap-4">
              {exploreGroups.map(g => (
                <GroupCard key={g.id} group={g} onOpen={setSelectedGroupId} onJoin={handleJoin} />
              ))}
            </div>
          </section>
        )}
      </div>

      <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} />
    </AppLayout>
  );
};

export default GroupsPage;
