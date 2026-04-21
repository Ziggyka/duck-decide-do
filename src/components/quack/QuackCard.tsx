import { useState } from "react";
import { Star, MoreHorizontal, Heart, MessageCircle, Edit, Trash2, Users, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuackData } from "./CreateQuackModal";

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

interface QuackCardProps {
  quack: QuackData;
  onEdit: (quack: QuackData) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (id: string, progress: number) => void;
  onAddUpdate: (id: string, text: string) => void;
  onPublish: (id: string) => void;
}

const QuackCard = ({ quack, onEdit, onDelete }: QuackCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const sm = statusMeta[quack.status] || statusMeta.quero_fazer;
  const cm = catMeta[quack.category] || catMeta.outro;
  const checkDone = quack.checklist?.filter(c => c.done).length || 0;
  const checkTotal = quack.checklist?.length || 0;

  return (
    <div className="pato-card relative group transition-all border-l-4 border-l-primary/40">
      {/* Status & category */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xl">{cm.emoji}</span>
          <span className={cn("tag-pill text-[11px] font-semibold", sm.color)}>{sm.emoji} {sm.label}</span>
          {quack.category && <span className="tag-pill bg-muted text-muted-foreground text-[11px] capitalize">{quack.category}</span>}
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="p-1.5 rounded-xl hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-card border border-border rounded-xl shadow-lg z-20 py-1 min-w-[140px] animate-fade-in">
              <button onClick={() => { onEdit(quack); setShowMenu(false); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">
                <Edit className="w-4 h-4" /> Editar
              </button>
              <button onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                <Trash2 className="w-4 h-4" /> Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="font-display font-bold text-base mb-1">{quack.title}</h3>
      {quack.description && <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{quack.description}</p>}

      {/* Tags */}
      {quack.tags && quack.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {quack.tags.map(tag => <span key={tag} className="tag-pill bg-primary/10 text-primary text-[11px]">#{tag}</span>)}
        </div>
      )}

      {/* Checklist */}
      {checkTotal > 0 && (
        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
          <ListChecks className="w-3.5 h-3.5" />
          <span>{checkDone}/{checkTotal} tarefas</span>
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-success transition-all" style={{ width: `${(checkDone / checkTotal) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Friends */}
      {quack.tagged_friends && quack.tagged_friends.length > 0 && (
        <div className="flex items-center gap-1.5 mb-2 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" /> {quack.tagged_friends.map(f => f.name).join(", ")}
        </div>
      )}

      {/* Rating */}
      {quack.status === "feito" && quack.rating > 0 && (
        <div className="flex gap-0.5 mb-2">
          {[1,2,3,4,5].map(s => (
            <Star key={s} className={cn("w-4 h-4", s <= quack.rating ? "fill-accent text-accent" : "text-muted")} />
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
      </div>

      {/* Delete confirm overlay */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 z-10 animate-fade-in p-6">
          <p className="text-sm font-semibold text-center">Tem certeza que quer excluir esse quack? 🦆💔</p>
          <div className="flex gap-2 mt-1">
            <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors">Cancelar</button>
            <button onClick={() => onDelete(quack.id)} className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors">Excluir</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuackCard;
