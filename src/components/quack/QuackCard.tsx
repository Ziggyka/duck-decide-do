import { useState } from "react";
import { Edit, Trash2, MoreHorizontal, Calendar, Users, BarChart3, Plus, Send, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { QuackData } from "./CreateQuackModal";

const catMeta: Record<string, { emoji: string; label: string }> = {
  evento: { emoji: "🎪", label: "Evento" },
  role: { emoji: "🎉", label: "Rolê" },
  projeto: { emoji: "🚀", label: "Projeto" },
  estudo: { emoji: "📚", label: "Estudo" },
  trabalho: { emoji: "💼", label: "Trabalho" },
  outro: { emoji: "🦆", label: "Outro" },
};

interface QuackCardProps {
  quack: QuackData;
  onEdit: (quack: QuackData) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (id: string, progress: number) => void;
  onAddUpdate: (id: string, text: string) => void;
  onPublish: (id: string) => void;
}

const QuackCard = ({ quack, onEdit, onDelete, onUpdateProgress, onAddUpdate, onPublish }: QuackCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const cat = catMeta[quack.category] || catMeta.outro;

  return (
    <div className={cn(
      "pato-card relative group transition-all",
      quack.status === "draft" && "border-dashed border-primary/30 bg-card/80"
    )}>
      {/* Status badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{cat.emoji}</span>
          <span className={cn(
            "tag-pill text-[11px] font-semibold",
            quack.status === "draft"
              ? "bg-accent/15 text-accent"
              : "bg-success/15 text-success"
          )}>
            {quack.status === "draft" ? "📝 Rascunho" : "✅ Publicado"}
          </span>
          <span className="tag-pill bg-muted text-muted-foreground text-[11px]">
            {cat.label}
          </span>
        </div>

        {/* Actions menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-xl hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-card border border-border rounded-xl shadow-lg z-20 py-1 min-w-[140px] animate-fade-in">
              {quack.status === "draft" && (
                <button
                  onClick={() => { onPublish(quack.id); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-success"
                >
                  <Send className="w-4 h-4" /> Publicar
                </button>
              )}
              <button
                onClick={() => { onEdit(quack); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
              >
                <Edit className="w-4 h-4" /> Editar
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-destructive"
              >
                <Trash2 className="w-4 h-4" /> Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title & description */}
      <h3 className="font-display font-bold text-base mb-1">{quack.title}</h3>
      {quack.description && (
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{quack.description}</p>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
        {quack.startDate && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {format(quack.startDate, "dd/MM")}
            {quack.endDate && ` — ${format(quack.endDate, "dd/MM")}`}
          </span>
        )}
        {quack.taggedFriends.length > 0 && (
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {quack.taggedFriends.map((f) => f.name).join(", ")}
          </span>
        )}
      </div>

      {/* Tagged friends chips */}
      {quack.taggedFriends.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {quack.taggedFriends.map((f) => (
            <span key={f.id} className="tag-pill bg-primary/10 text-primary text-[11px]">
              🦆 {f.name}
            </span>
          ))}
        </div>
      )}

      {/* Progress */}
      {quack.progress > 0 && (
        <div className="mb-3 p-3 rounded-xl bg-muted/50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium flex items-center gap-1">
              <BarChart3 className="w-3.5 h-3.5" /> Progresso
            </span>
            <span className="text-xs font-bold text-primary">{quack.progress}%</span>
          </div>
          <Progress value={quack.progress} className="h-2.5" />
        </div>
      )}

      {/* Updates timeline */}
      {quack.updates.length > 0 && (
        <div className="mb-3 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Atualizações</p>
          {quack.updates.map((u, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-foreground">{u.text}</p>
                <p className="text-muted-foreground">{format(u.date, "dd/MM HH:mm")}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add update */}
      {quack.status === "published" && (
        <div>
          {showUpdateInput ? (
            <div className="flex gap-2 animate-fade-in">
              <input
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                placeholder="Nova atualização..."
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={() => {
                  if (updateText.trim()) {
                    onAddUpdate(quack.id, updateText);
                    setUpdateText("");
                    setShowUpdateInput(false);
                  }
                }}
                className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowUpdateInput(true)}
              className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar atualização
            </button>
          )}
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 z-10 animate-fade-in p-6">
          <p className="text-sm font-semibold text-center">Tem certeza que quer excluir esse quack? 🦆💔</p>
          <p className="text-xs text-muted-foreground text-center">Essa ação não pode ser desfeita.</p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => onDelete(quack.id)}
              className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuackCard;
