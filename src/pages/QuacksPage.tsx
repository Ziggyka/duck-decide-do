import { useState } from "react";
import { Plus, Image as ImageIcon, AtSign, Smile, Send, MoreHorizontal, Heart, MessageCircle, Edit, Trash2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import QuackSummaryChart from "@/components/quack/QuackSummaryChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import duckAvatar1 from "@/assets/duck-avatar-1.png";

interface SimpleQuack {
  id: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: Date;
  liked: boolean;
}

const QuacksPage = () => {
  const [quacks, setQuacks] = useState<SimpleQuack[]>([
    {
      id: "1",
      text: "Preparando PPT da noite de apresentações 🎤 Cada um apresenta um tema aleatório!",
      likes: 12,
      comments: 4,
      createdAt: new Date(2026, 2, 20),
      liked: false,
    },
    {
      id: "2",
      text: "Maratona de Attack on Titan com a galera! Última temporada, sem spoilers! 🗡️",
      likes: 24,
      comments: 8,
      createdAt: new Date(2026, 2, 19),
      liked: true,
    },
    {
      id: "3",
      text: "Estudando React Native pra criar um app de patos 🦆📱",
      likes: 6,
      comments: 2,
      createdAt: new Date(2026, 2, 18),
      liked: false,
    },
  ]);

  const [postText, setPostText] = useState("");
  const [editingQuack, setEditingQuack] = useState<SimpleQuack | null>(null);
  const [editText, setEditText] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleQuackar = () => {
    if (!postText.trim()) return;
    const newQuack: SimpleQuack = {
      id: crypto.randomUUID(),
      text: postText,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
      liked: false,
    };
    setQuacks((prev) => [newQuack, ...prev]);
    setPostText("");
    toast.success("Quack publicado! 🦆🎉");
  };

  const handleDelete = (id: string) => {
    setQuacks((prev) => prev.filter((q) => q.id !== id));
    setDeleteConfirm(null);
    toast.success("Quack excluído com sucesso 💨");
  };

  const handleSaveEdit = () => {
    if (!editingQuack || !editText.trim()) return;
    setQuacks((prev) => prev.map((q) => (q.id === editingQuack.id ? { ...q, text: editText } : q)));
    setEditingQuack(null);
    toast.success("Quack atualizado! ✨");
  };

  const handleLike = (id: string) => {
    setQuacks((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, liked: !q.liked, likes: q.liked ? q.likes - 1 : q.likes + 1 } : q
      )
    );
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <h1 className="text-2xl font-display font-bold">Meus Quacks 🦆</h1>

        {/* Create Quack - Twitter style */}
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
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors" title="Imagem">
                    <ImageIcon className="w-4 h-4 text-primary" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors" title="Marcar amigo">
                    <AtSign className="w-4 h-4 text-primary" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors" title="Emoji">
                    <Smile className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <button
                  onClick={handleQuackar}
                  disabled={!postText.trim()}
                  className={`pato-btn-bounce flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                    postText.trim()
                      ? "bg-primary text-primary-foreground glow-pink"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Quackar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quack list */}
        <div className="space-y-3">
          {quacks.map((q, i) => (
            <div key={q.id} className="pato-card group animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex gap-3">
                <img src={duckAvatar1} alt="" className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm">QuackMaster</span>
                      <span className="text-xs text-muted-foreground">
                        {q.createdAt.toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    {/* Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === q.id ? null : q.id)}
                        className="p-1.5 rounded-xl hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                      {openMenuId === q.id && (
                        <div className="absolute right-0 top-8 bg-card border border-border rounded-xl shadow-lg z-20 py-1 min-w-[140px] animate-fade-in">
                          <button
                            onClick={() => {
                              setEditingQuack(q);
                              setEditText(q.text);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                          >
                            <Edit className="w-4 h-4" /> Editar
                          </button>
                          <button
                            onClick={() => {
                              setDeleteConfirm(q.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                          >
                            <Trash2 className="w-4 h-4" /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed">{q.text}</p>
                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => handleLike(q.id)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        q.liked ? "text-destructive" : "text-muted-foreground hover:text-destructive"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${q.liked ? "fill-destructive" : ""}`} />
                      {q.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {q.comments}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary chart at the bottom */}
        <div className="pt-8">
          <QuackSummaryChart />
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingQuack} onOpenChange={(open) => !open && setEditingQuack(null)}>
        <DialogContent className="bg-card border-border rounded-2xl">
          <DialogHeader>
            <DialogTitle>✏️ Editar Quack</DialogTitle>
            <DialogDescription>Edite o conteúdo do seu quack</DialogDescription>
          </DialogHeader>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setEditingQuack(null)}
              className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Salvar
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-border rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>🦆💔 Excluir Quack?</DialogTitle>
            <DialogDescription>Tem certeza que deseja excluir este quack? Essa ação não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 rounded-xl border border-border text-sm hover:bg-muted transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="px-5 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors"
            >
              Excluir
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default QuacksPage;
