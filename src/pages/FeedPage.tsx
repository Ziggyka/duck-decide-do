import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Star, Award, X, Instagram, ListChecks, Send } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";
import AppLayout from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type PostType = "quack_update" | "achievement";

interface Comment {
  user: string;
  avatar: string;
  text: string;
}

interface FeedPost {
  id: number;
  user: string;
  avatar: string;
  type: PostType;
  content?: string;
  quackTitle?: string;
  quackCategory?: string;
  quackStatus?: string;
  quackRating?: number;
  quackTags?: string[];
  quackChecklist?: { done: number; total: number };
  quackIcon?: string;
  achievement?: {
    name: string;
    description: string;
    xp: number;
    date: string;
    icon: string;
  };
  likes: number;
  comments: Comment[];
  time: string;
  liked?: boolean;
  saved?: boolean;
}

const statusMeta: Record<string, { label: string; emoji: string; color: string }> = {
  quero_fazer: { label: "Quero fazer", emoji: "📌", color: "bg-primary/15 text-primary" },
  fazendo: { label: "Fazendo", emoji: "⏳", color: "bg-accent/20 text-accent-foreground" },
  feito: { label: "Feito", emoji: "✅", color: "bg-success/15 text-success" },
};

const initialPosts: FeedPost[] = [
  {
    id: 2, user: "QuackQueen", avatar: duckAvatar3, type: "quack_update",
    quackTitle: "Frieren", quackCategory: "Anime", quackStatus: "fazendo",
    quackTags: ["fantasia", "shounen"], quackChecklist: { done: 5, total: 10 }, quackIcon: "🎌",
    likes: 18, time: "3h atrás",
    comments: [
      { user: "DuckSlayer", avatar: duckAvatar2, text: "Esse anime é incrível! Tô na metade tbm 🔥" },
      { user: "PatoNinja", avatar: duckAvatar2, text: "A trilha sonora é maravilhosa!" },
    ],
  },
  {
    id: 3, user: "QuackQueen", avatar: duckAvatar3, type: "achievement",
    achievement: {
      name: "Patochef",
      description: "Aprendeu 10 novas receitas!",
      xp: 250, date: "Hoje, 14:32", icon: "👨‍🍳",
    },
    likes: 42, time: "4h atrás",
    comments: [
      { user: "DuckMaster", avatar: duckAvatar3, text: "Parabéns! 🎉🎉" },
      { user: "DuckSlayer", avatar: duckAvatar2, text: "Manda essas receitas aí 🦆" },
    ],
  },
  {
    id: 4, user: "PatoNinja", avatar: duckAvatar2, type: "quack_update",
    quackTitle: "Treino de Corrida C25K", quackCategory: "Fitness", quackStatus: "feito",
    quackRating: 5, quackTags: ["saude", "cardio"], quackIcon: "💪",
    likes: 33, time: "5h atrás",
    comments: [
      { user: "QuackMaster", avatar: duckAvatar1, text: "Top demais! Bora correr juntos?" },
    ],
  },
  {
    id: 5, user: "DuckMaster", avatar: duckAvatar3, type: "achievement",
    achievement: { name: "Maratonista", description: "Concluiu 5 séries no mês!", xp: 400, date: "Ontem, 22:10", icon: "🎬" },
    likes: 56, time: "1d atrás",
    comments: [
      { user: "QuackQueen", avatar: duckAvatar3, text: "Esse aí virou bicho! 👏" },
    ],
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={cn("w-3.5 h-3.5", s <= rating ? "fill-accent text-accent" : "text-muted")} />
    ))}
  </div>
);

const ShareModal = ({ open, onClose, title }: { open: boolean; onClose: () => void; title: string }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-card rounded-[20px] shadow-2xl border border-border p-6 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        <h3 className="font-display font-bold text-lg mb-1">Compartilhar Quack</h3>
        <p className="text-xs text-muted-foreground mb-5">{title}</p>
        <div className="space-y-3">
          <button
            onClick={() => { toast.success("Abrindo Stories do Instagram..."); onClose(); }}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:scale-[1.02] transition-transform shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Instagram className="w-6 h-6" />
            </div>
            <div className="text-left flex-1">
              <p className="font-bold">Stories do Instagram</p>
              <p className="text-xs opacity-90">Compartilhe nos seus Stories</p>
            </div>
          </button>
          <button
            onClick={() => { toast.success("Abrindo WhatsApp..."); onClose(); }}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#25D366] text-white hover:scale-[1.02] transition-transform shadow-md"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">💬</div>
            <div className="text-left flex-1">
              <p className="font-bold">WhatsApp</p>
              <p className="text-xs opacity-90">Envie diretamente para um amigo</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [shareOpen, setShareOpen] = useState<{ open: boolean; title: string }>({ open: false, title: "" });
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  const handleLike = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleSave = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
    toast.success("Salvo na sua lista! 🔖");
  };

  const toggleComments = (id: number) => {
    setExpandedComments(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const addComment = (id: number) => {
    const text = (commentInputs[id] || "").trim();
    if (!text) return;
    setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, { user: "QuackMaster", avatar: duckAvatar1, text }] } : p));
    setCommentInputs(prev => ({ ...prev, [id]: "" }));
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-5">
        {posts.map((post, i) => {
          const isAchievement = post.type === "achievement";
          const showComments = expandedComments.has(post.id);

          return (
            <article
              key={post.id}
              className={cn(
                "rounded-[20px] border shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in overflow-hidden hover:-translate-y-0.5",
                isAchievement ? "bg-[#FFC400] border-[#FFC400]" : "bg-card border-border"
              )}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Header */}
              <div className="flex items-start gap-3 p-5 pb-3">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-secondary" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-display font-bold text-sm", isAchievement && "text-secondary")}>{post.user}</span>
                    {isAchievement ? (
                      <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold uppercase">Conquista</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase">Quack</span>
                    )}
                  </div>
                  <p className={cn("text-xs", isAchievement ? "text-secondary/70" : "text-muted-foreground")}>{post.time}</p>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 pb-4">
                {post.type === "quack_update" && post.quackTitle && (
                  <div className="rounded-2xl bg-muted/50 border border-border p-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0">
                      {post.quackIcon || "🦆"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-base">{post.quackTitle}</p>
                      <p className="text-xs text-muted-foreground">{post.quackCategory}</p>
                      {post.quackTags && post.quackTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {post.quackTags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">#{t}</span>)}
                        </div>
                      )}
                      {post.quackChecklist && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                          <ListChecks className="w-3.5 h-3.5" />
                          <span>{post.quackChecklist.done}/{post.quackChecklist.total}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-[120px]">
                            <div className="h-full rounded-full bg-success" style={{ width: `${(post.quackChecklist.done / post.quackChecklist.total) * 100}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {post.quackStatus && (
                        <span className={cn("text-[10px] font-semibold px-2 py-1 rounded-full", statusMeta[post.quackStatus]?.color)}>
                          {statusMeta[post.quackStatus]?.emoji} {statusMeta[post.quackStatus]?.label}
                        </span>
                      )}
                      {post.quackRating ? <StarRating rating={post.quackRating} /> : null}
                    </div>
                  </div>
                )}

                {isAchievement && post.achievement && (
                  <div className="rounded-2xl bg-secondary text-white p-5 flex items-center gap-4 shadow-inner">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFC400] flex items-center justify-center text-4xl flex-shrink-0 shadow-lg">
                      {post.achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFC400] mb-0.5">Conquista Desbloqueada!</p>
                      <p className="font-display font-bold text-lg leading-tight">{post.achievement.name}</p>
                      <p className="text-xs text-white/70 mt-0.5">{post.achievement.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FFC400] text-secondary flex items-center gap-1">
                          <Award className="w-3 h-3" /> +{post.achievement.xp} XP
                        </span>
                        <span className="text-[11px] text-white/60">{post.achievement.date}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className={cn("flex items-center gap-1 px-4 py-2 border-t", isAchievement ? "border-secondary/15" : "border-border")}>
                <button
                  onClick={() => handleLike(post.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105",
                    post.liked ? "text-destructive" : isAchievement ? "text-secondary hover:bg-secondary/10" : "text-muted-foreground hover:text-destructive hover:bg-muted"
                  )}
                >
                  <Heart className={cn("w-4 h-4", post.liked && "fill-destructive")} /> {post.likes}
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105",
                    isAchievement ? "text-secondary hover:bg-secondary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <MessageCircle className="w-4 h-4" /> {post.comments.length}
                </button>
                <button
                  onClick={() => setShareOpen({ open: true, title: post.quackTitle || post.achievement?.name || "Quack" })}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105",
                    isAchievement ? "text-secondary hover:bg-secondary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSave(post.id)}
                  className={cn(
                    "ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-105",
                    post.saved ? "text-primary" : isAchievement ? "text-secondary hover:bg-secondary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Bookmark className={cn("w-4 h-4", post.saved && "fill-primary")} />
                </button>
              </div>

              {/* Comments */}
              {showComments && (
                <div className={cn("border-t px-5 py-4 space-y-3 animate-fade-in", isAchievement ? "border-secondary/15 bg-[#FFC400]/30" : "border-border bg-muted/30")}>
                  {post.comments.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full bg-duck-yellow-light border border-border flex-shrink-0" />
                      <div className={cn("rounded-2xl px-3 py-2 flex-1", isAchievement ? "bg-white" : "bg-card")}>
                        <p className="text-xs font-bold text-foreground">{c.user}</p>
                        <p className="text-xs text-foreground/80 mt-0.5">{c.text}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <img src={duckAvatar1} alt="" className="w-8 h-8 rounded-full bg-duck-yellow-light border border-border" />
                    <input
                      value={commentInputs[post.id] || ""}
                      onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === "Enter" && addComment(post.id)}
                      placeholder="Escreva um comentário..."
                      className="flex-1 px-3 py-2 rounded-full border border-border bg-card text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button onClick={() => addComment(post.id)} className="p-2 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <ShareModal open={shareOpen.open} onClose={() => setShareOpen({ open: false, title: "" })} title={shareOpen.title} />
    </AppLayout>
  );
};

export default FeedPage;
