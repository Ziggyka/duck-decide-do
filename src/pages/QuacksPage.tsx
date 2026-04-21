import { useState } from "react";
import { Plus, Image as ImageIcon, AtSign, Smile, Send, MoreHorizontal, Heart, MessageCircle, Edit, Trash2, Star, Check, Users, ListChecks } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import QuackSummaryChart from "@/components/quack/QuackSummaryChart";
import CreateQuackModal from "@/components/quack/CreateQuackModal";
import type { QuackData } from "@/components/quack/CreateQuackModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import duckAvatar1 from "@/assets/duck-avatar-1.png";

const statusMeta: Record<string, { label: string; emoji: string; color: string }> = {
  quero_fazer: { label: "Quero fazer", emoji: "📌", color: "bg-primary/15 text-primary" },
  fazendo: { label: "Fazendo", emoji: "⏳", color: "bg-accent/15 text-accent-foreground" },
  feito: { label: "Feito", emoji: "✅", color: "bg-success/15 text-success" },
};

const catMeta: Record<string, { emoji: string }> = {
  anime: { emoji: "🎌" }, estudo: { emoji: "📚" }, fitness: { emoji: "💪" },
  filmes: { emoji: "🎬" }, jogos: { emoji: "🎮" }, musica: { emoji: "🎵" },
  culinaria: { emoji: "🍳" }, trabalho: { emoji: "💼" }, role: { emoji: "🎉" },
  outro: { emoji: "🦆" },
};

interface SimplePost {
  id: string;
  text: string;
  likes: number;
  comments: number;
  createdAt: Date;
  liked: boolean;
  type: "simple";
}

type FeedItem = SimplePost | (QuackData & { type: "quack" });

const QuacksPage = () => {
  const [postText, setPostText] = useState("");
  const [showCreateQuack, setShowCreateQuack] = useState(false);
  const [editingQuack, setEditingQuack] = useState<QuackData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [simplePosts, setSimplePosts] = useState<SimplePost[]>([
    { id: "s1", text: "Preparando PPT da noite de apresentações 🎤", likes: 12, comments: 4, createdAt: new Date(2026, 2, 20), liked: false, type: "simple" },
  ]);

  const [quacks, setQuacks] = useState<QuackData[]>([
    {
      id: "q1", title: "Frieren", description: "Assistir o anime completo", category: "anime",
      tags: ["fantasia", "shounen"], status: "fazendo", rating: 0,
      taggedFriends: [{ id: 1, name: "DuckSlayer", username: "@duckslayer" }],
      responsiblePeople: [], checklist: [
        { id: "c1", text: "Episódios 1-10", done: true },
        { id: "c2", text: "Episódios 11-20", done: false },
      ],
      startDate: new Date(2026, 2, 15), createdAt: new Date(2026, 2, 15), updates: [], progress: 50,
    },
    {
      id: "q2", title: "Treino de Corrida", description: "Completar programa C25K", category: "fitness",
      tags: ["saude", "cardio"], status: "feito", rating: 4,
      taggedFriends: [], responsiblePeople: [], checklist: [],
      createdAt: new Date(2026, 2, 10), updates: [], progress: 100,
    },
  ]);

  const handleQuackar = () => {
    if (!postText.trim()) return;
    const newPost: SimplePost = {
      id: crypto.randomUUID(), text: postText, likes: 0, comments: 0,
      createdAt: new Date(), liked: false, type: "simple",
    };
    setSimplePosts((prev) => [newPost, ...prev]);
    setPostText("");
    toast.success("Quack publicado! 🦆🎉");
  };

  const handleSaveQuack = (quack: QuackData) => {
    if (editingQuack) {
      setQuacks((prev) => prev.map((q) => (q.id === quack.id ? quack : q)));
      setEditingQuack(null);
      toast.success("Quack atualizado! ✨");
    } else {
      setQuacks((prev) => [quack, ...prev]);
      toast.success("Quack criado! 🦆🎉");
    }
  };

  const handleDelete = (id: string) => {
    setQuacks((prev) => prev.filter((q) => q.id !== id));
    setSimplePosts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    toast.success("Excluído com sucesso 💨");
  };

  const handleLike = (id: string) => {
    setSimplePosts((prev) =>
      prev.map((q) => q.id === id ? { ...q, liked: !q.liked, likes: q.liked ? q.likes - 1 : q.likes + 1 } : q)
    );
  };

  const allItems: FeedItem[] = [
    ...simplePosts.map(p => ({ ...p, type: "simple" as const })),
    ...quacks.map(q => ({ ...q, type: "quack" as const })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Meus Quacks 🦆</h1>
          <button
            onClick={() => { setEditingQuack(null); setShowCreateQuack(true); }}
            className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold"
          >
            <Plus className="w-4 h-4" /> Criar Quack
          </button>
        </div>

        {/* Simple post box */}
        <div className="pato-card p-4">
          <div className="flex gap-3">
            <img src={duckAvatar1} alt="" className="w-11 h-11 rounded-full bg-duck-yellow-light border-2 border-primary flex-shrink-0" />
            <div className="flex-1">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="O que você fez hoje? 🦆"
                rows={3}
                className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none leading-relaxed"
                autoFocus
              />
              <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><ImageIcon className="w-4 h-4 text-primary" /></button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><AtSign className="w-4 h-4 text-primary" /></button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><Smile className="w-4 h-4 text-primary" /></button>
                </div>
                <button
                  onClick={handleQuackar}
                  disabled={!postText.trim()}
                  className={cn("pato-btn-bounce flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all",
                    postText.trim() ? "bg-primary text-primary-foreground glow-pink" : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4" /> Quackar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed items */}
        <div className="space-y-3">
          {allItems.map((item, i) => {
            if (item.type === "simple") {
              const p = item as SimplePost;
              return (
                <div key={p.id} className="pato-card group animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex gap-3">
                    <img src={duckAvatar1} alt="" className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-semibold text-sm">QuackMaster</span>
                          <span className="text-xs text-muted-foreground">{p.createdAt.toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="relative">
                          <button onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)} className="p-1.5 rounded-xl hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                          </button>
                          {openMenuId === p.id && (
                            <div className="absolute right-0 top-8 bg-card border border-border rounded-xl shadow-lg z-20 py-1 min-w-[140px] animate-fade-in">
                              <button onClick={() => { setDeleteConfirm(p.id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                                <Trash2 className="w-4 h-4" /> Excluir
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm mt-1 leading-relaxed">{p.text}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button onClick={() => handleLike(p.id)} className={cn("flex items-center gap-1.5 text-xs font-medium transition-colors", p.liked ? "text-destructive" : "text-muted-foreground hover:text-destructive")}>
                          <Heart className={cn("w-4 h-4", p.liked && "fill-destructive")} /> {p.likes}
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                          <MessageCircle className="w-4 h-4" /> {p.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Quack activity card
            const q = item as QuackData & { type: "quack" };
            const sm = statusMeta[q.status] || statusMeta.quero_fazer;
            const cm = catMeta[q.category] || catMeta.outro;
            const checkDone = q.checklist.filter(c => c.done).length;

            return (
              <div key={q.id} className="pato-card group animate-fade-in border-l-4 border-l-primary/40" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl">{cm.emoji}</span>
                    <span className={cn("tag-pill text-[11px] font-semibold", sm.color)}>{sm.emoji} {sm.label}</span>
                    {q.category && <span className="tag-pill bg-muted text-muted-foreground text-[11px] capitalize">{q.category}</span>}
                  </div>
                  <div className="relative">
                    <button onClick={() => setOpenMenuId(openMenuId === q.id ? null : q.id)} className="p-1.5 rounded-xl hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {openMenuId === q.id && (
                      <div className="absolute right-0 top-8 bg-card border border-border rounded-xl shadow-lg z-20 py-1 min-w-[140px] animate-fade-in">
                        <button onClick={() => { setEditingQuack(q); setShowCreateQuack(true); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">
                          <Edit className="w-4 h-4" /> Editar
                        </button>
                        <button onClick={() => { setDeleteConfirm(q.id); setOpenMenuId(null); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                          <Trash2 className="w-4 h-4" /> Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-bold text-base mb-1">{q.title}</h3>
                {q.description && <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{q.description}</p>}

                {/* Tags */}
                {q.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {q.tags.map((tag) => <span key={tag} className="tag-pill bg-primary/10 text-primary text-[11px]">#{tag}</span>)}
                  </div>
                )}

                {/* Checklist summary */}
                {q.checklist.length > 0 && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                    <ListChecks className="w-3.5 h-3.5" />
                    <span>{checkDone}/{q.checklist.length} tarefas</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-success transition-all" style={{ width: `${(checkDone / q.checklist.length) * 100}%` }} />
                    </div>
                  </div>
                )}

                {/* Tagged friends */}
                {q.taggedFriends.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" /> {q.taggedFriends.map(f => f.name).join(", ")}
                  </div>
                )}

                {/* Rating */}
                {q.status === "feito" && q.rating > 0 && (
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={cn("w-4 h-4", s <= q.rating ? "fill-accent text-accent" : "text-muted")} />
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 mt-2 pt-2 border-t border-border">
                  <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors">
                    <Heart className="w-4 h-4" /> 0
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="w-4 h-4" /> 0
                  </button>
                  <span className="ml-auto text-[11px] text-muted-foreground">{q.createdAt.toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart at bottom */}
        <div className="pt-8">
          <QuackSummaryChart />
        </div>
      </div>

      {/* Create/Edit Quack Modal */}
      <CreateQuackModal
        open={showCreateQuack}
        onClose={() => { setShowCreateQuack(false); setEditingQuack(null); }}
        onSave={handleSaveQuack}
        editingQuack={editingQuack}
      />

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-border rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>🦆💔 Excluir Quack?</DialogTitle>
            <DialogDescription>Tem certeza que deseja excluir? Essa ação não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
            <button onClick={() => deleteConfirm && handleDelete(deleteConfirm)} className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors">Excluir</button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default QuacksPage;
