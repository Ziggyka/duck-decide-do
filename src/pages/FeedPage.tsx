import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Star, ListChecks, Loader2, Plus } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import AppLayout from "@/components/layout/AppLayout";
import CreateQuackModal from "@/components/quack/CreateQuackModal";
import { cn } from "@/lib/utils";
import { useQuacks, type Quack } from "@/hooks/useQuacks";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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

const QuackFeedCard = ({ quack, onLike, liked, saved, onSave }: { quack: Quack; onLike: () => void; liked: boolean; saved: boolean; onSave: () => void }) => {
  const sm = statusMeta[quack.status] || statusMeta.quero_fazer;
  const cm = catMeta[quack.category || "outro"] || catMeta.outro;
  const checkDone = quack.checklist?.filter(c => c.done).length || 0;
  const checkTotal = quack.checklist?.length || 0;
  const author = quack.author;
  const authorName = author?.display_name || author?.username || "Pato";
  const avatar = author?.avatar_url || duckAvatar1;

  return (
    <div className="pato-card animate-fade-in">
      <div className="flex items-start gap-3 mb-3">
        <img src={avatar} alt={authorName} className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border object-cover" />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-semibold text-sm">{authorName}</span>
            <span className="tag-pill bg-primary/15 text-primary text-[10px]">Quack</span>
            <span className={cn("tag-pill text-[10px] font-semibold", sm.color)}>{sm.emoji} {sm.label}</span>
          </div>
          <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(quack.created_at), { addSuffix: true, locale: ptBR })}</p>
        </div>
      </div>

      <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border mb-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
          {cm.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{quack.title}</p>
          {quack.category && <p className="text-xs text-muted-foreground capitalize">{quack.category}</p>}
          {quack.description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{quack.description}</p>}
          {quack.tags && quack.tags.length > 0 && (
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {quack.tags.map(tag => <span key={tag} className="tag-pill bg-primary/10 text-primary text-[10px]">#{tag}</span>)}
            </div>
          )}
          {checkTotal > 0 && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <ListChecks className="w-3.5 h-3.5" />
              <span>{checkDone}/{checkTotal} tarefas</span>
              <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-[120px]">
                <div className="h-full rounded-full bg-success" style={{ width: `${(checkDone / checkTotal) * 100}%` }} />
              </div>
            </div>
          )}
          {quack.status === "feito" && quack.rating > 0 && (
            <div className="flex gap-0.5 mt-2">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={cn("w-3.5 h-3.5", s <= quack.rating ? "fill-primary text-primary" : "text-muted")} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 pt-2 border-t border-border">
        <button onClick={onLike} className={cn("pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors", liked ? "text-destructive" : "text-muted-foreground hover:text-destructive hover:bg-muted")}>
          <Heart className={cn("w-4 h-4", liked && "fill-destructive")} /> {liked ? 1 : 0}
        </button>
        <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <MessageCircle className="w-4 h-4" /> 0
        </button>
        <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
        <button onClick={onSave} className={cn("pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ml-auto", saved ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
          <Bookmark className={cn("w-4 h-4", saved && "fill-accent")} />
        </button>
      </div>
    </div>
  );
};

const FeedPage = () => {
  const { quacks, loading, refetch } = useQuacks("feed");
  const [showCreate, setShowCreate] = useState(false);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [saves, setSaves] = useState<Record<string, boolean>>({});

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Feed 🦆</h1>
          <button
            onClick={() => setShowCreate(true)}
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
            <p className="font-display font-bold text-lg mb-1">Nada por aqui ainda</p>
            <p className="text-sm text-muted-foreground mb-4">Crie um Quack ou adicione amigos para ver atividades no feed.</p>
            <button onClick={() => setShowCreate(true)} className="pato-btn-bounce inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold">
              <Plus className="w-4 h-4" /> Criar Quack
            </button>
          </div>
        )}

        {quacks.map(q => (
          <QuackFeedCard
            key={q.id}
            quack={q}
            liked={!!likes[q.id]}
            saved={!!saves[q.id]}
            onLike={() => setLikes(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
            onSave={() => setSaves(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
          />
        ))}
      </div>

      <CreateQuackModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={() => { setShowCreate(false); refetch(); }}
        editingQuack={null}
      />
    </AppLayout>
  );
};

export default FeedPage;
