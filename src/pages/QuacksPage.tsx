import { useState } from "react";
import { Plus, Star, ListChecks, Users, Heart, MessageCircle, Edit, Trash2, MoreHorizontal, Loader2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import QuackSummaryChart from "@/components/quack/QuackSummaryChart";
import CreateQuackModal from "@/components/quack/CreateQuackModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useQuacks, type Quack } from "@/hooks/useQuacks";
import { useProfile } from "@/hooks/useProfile";
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

const QuacksPage = () => {
  const { quacks, loading, deleteQuack, refetch } = useQuacks("self");
  const { profile } = useProfile();
  const [showCreateQuack, setShowCreateQuack] = useState(false);
  const [editingQuack, setEditingQuack] = useState<Quack | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const avatar = profile?.avatar_url || duckAvatar1;
  const username = profile?.display_name || profile?.username || "Pato";

  const handleDelete = async (id: string) => {
    const { error } = await deleteQuack(id);
    setDeleteConfirm(null);
    if (error) toast.error("Erro ao excluir");
    else toast.success("Quack excluído 💨");
  };

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

        {loading && (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!loading && quacks.length === 0 && (
          <div className="pato-card p-10 text-center">
            <p className="text-4xl mb-3">🦆</p>
            <p className="font-display font-bold text-lg mb-1">Nenhum Quack ainda</p>
            <p className="text-sm text-muted-foreground mb-4">Crie sua primeira atividade!</p>
            <button onClick={() => setShowCreateQuack(true)} className="pato-btn-bounce inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold">
              <Plus className="w-4 h-4" /> Criar Quack
            </button>
          </div>
        )}

        <div className="space-y-3">
          {quacks.map((q, i) => {
            const sm = statusMeta[q.status] || statusMeta.quero_fazer;
            const cm = catMeta[q.category || "outro"] || catMeta.outro;
            const checkDone = q.checklist?.filter(c => c.done).length || 0;
            const checkTotal = q.checklist?.length || 0;

            return (
              <div key={q.id} className="pato-card group animate-fade-in border-l-4 border-l-primary/40" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl">{cm.emoji}</span>
                    <span className={cn("tag-pill text-[11px] font-semibold", sm.color)}>{sm.emoji} {sm.label}</span>
                    {q.category && <span className="tag-pill bg-muted text-muted-foreground text-[11px] capitalize">{q.category}</span>}
                  </div>
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

                <h3 className="font-display font-bold text-base mb-1">{q.title}</h3>
                {q.description && <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{q.description}</p>}

                {q.tags && q.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {q.tags.map((tag) => <span key={tag} className="tag-pill bg-primary/10 text-primary text-[11px]">#{tag}</span>)}
                  </div>
                )}

                {checkTotal > 0 && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                    <ListChecks className="w-3.5 h-3.5" />
                    <span>{checkDone}/{checkTotal} tarefas</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-success transition-all" style={{ width: `${(checkDone / checkTotal) * 100}%` }} />
                    </div>
                  </div>
                )}

                {q.tagged_friends && q.tagged_friends.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" /> {q.tagged_friends.map(f => f.name).join(", ")}
                  </div>
                )}

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
                  <span className="ml-auto text-[11px] text-muted-foreground">{new Date(q.created_at).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {quacks.length > 0 && (
          <div className="pt-8">
            <QuackSummaryChart />
          </div>
        )}
      </div>

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
