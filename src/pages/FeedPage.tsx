import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Star, Award, Image as ImageIcon, Smile, AtSign, Send, ListChecks } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";
import AppLayout from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type PostType = "simple" | "quack_update" | "achievement";

interface FeedPost {
  id: number;
  user: string;
  avatar: string;
  type: PostType;
  content: string;
  quackTitle?: string;
  quackCategory?: string;
  quackStatus?: string;
  quackRating?: number;
  quackTags?: string[];
  quackChecklist?: { done: number; total: number };
  likes: number;
  comments: number;
  time: string;
  liked?: boolean;
  saved?: boolean;
}

const statusMeta: Record<string, { label: string; emoji: string; color: string }> = {
  "quero_fazer": { label: "Quero fazer", emoji: "📌", color: "bg-primary/15 text-primary" },
  "fazendo": { label: "Fazendo", emoji: "⏳", color: "bg-accent/15 text-accent-foreground" },
  "feito": { label: "Feito", emoji: "✅", color: "bg-success/15 text-success" },
};

const initialPosts: FeedPost[] = [
  { id: 1, user: "DuckSlayer", avatar: duckAvatar2, type: "simple", content: "Acabei de assistir Interstellar com a galera! 🚀 Filme incrível, recomendo demais!", likes: 24, comments: 8, time: "2h atrás", liked: true },
  { id: 2, user: "QuackQueen", avatar: duckAvatar3, type: "quack_update", content: "Atualizou o status da atividade", quackTitle: "Frieren", quackCategory: "Anime", quackStatus: "fazendo", quackTags: ["fantasia", "shounen"], quackChecklist: { done: 5, total: 10 }, likes: 18, comments: 4, time: "3h atrás" },
  { id: 3, user: "QuackQueen", avatar: duckAvatar3, type: "achievement", content: "Desbloqueou a conquista Explorador — visitou 10 restaurantes diferentes! 🏆", likes: 42, comments: 12, time: "4h atrás" },
  { id: 4, user: "PatoNinja", avatar: duckAvatar2, type: "quack_update", content: "Concluiu a atividade e avaliou!", quackTitle: "Treino de Corrida C25K", quackCategory: "Fitness", quackStatus: "feito", quackRating: 5, quackTags: ["saude", "cardio"], likes: 33, comments: 7, time: "5h atrás" },
  { id: 5, user: "DuckMaster", avatar: duckAvatar3, type: "simple", content: "Adicionou 5 novos animes à lista 'Maratona de Verão' 📋", likes: 8, comments: 3, time: "8h atrás" },
  { id: 6, user: "QuackMaster", avatar: duckAvatar1, type: "simple", content: "Noite de pizza com a turma! 🍕🎉 Melhor rolê da semana!", likes: 56, comments: 18, time: "1d atrás", liked: false },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={cn("w-3.5 h-3.5", s <= rating ? "fill-primary text-primary" : "text-muted")} />
    ))}
  </div>
);

const FeedPage = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const handleQuackar = () => {
    if (!postText.trim()) return;
    const newPost: FeedPost = { id: Date.now(), user: "QuackMaster", avatar: duckAvatar1, type: "simple", content: postText, likes: 0, comments: 0, time: "Agora", liked: false };
    setPosts([newPost, ...posts]);
    setPostText("");
    toast.success("Quack publicado! 🦆🎉");
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleSave = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
    toast.success("Salvo na sua lista! 🔖");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Create post */}
        <div className="pato-card p-4">
          <div className="flex gap-3">
            <img src={duckAvatar1} alt="" className="w-11 h-11 rounded-full bg-duck-yellow-light border-2 border-primary flex-shrink-0" />
            <div className="flex-1">
              <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="O que você fez hoje? 🦆" rows={3} className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none leading-relaxed" />
              <div className="flex items-center justify-between pt-2 border-t border-border mt-2">
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><ImageIcon className="w-4 h-4 text-primary" /></button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><AtSign className="w-4 h-4 text-primary" /></button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><Smile className="w-4 h-4 text-primary" /></button>
                </div>
                <button onClick={handleQuackar} disabled={!postText.trim()} className={cn("pato-btn-bounce flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all", postText.trim() ? "bg-primary text-primary-foreground glow-pink" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                  <Send className="w-4 h-4" /> Quackar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post, i) => (
          <div key={post.id} className="pato-card animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start gap-3 mb-3">
              <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-sm">{post.user}</span>
                  {post.type === "simple" && <span className="tag-pill bg-muted text-muted-foreground text-[10px]">Post</span>}
                  {post.type === "quack_update" && <span className="tag-pill bg-primary/15 text-primary text-[10px]">Quack</span>}
                  {post.type === "achievement" && <span className="tag-pill bg-success/15 text-success text-[10px]">Conquista</span>}
                </div>
                <p className="text-xs text-muted-foreground">{post.time}</p>
              </div>
            </div>

            {post.type === "simple" && <p className="text-sm mb-3 leading-relaxed">{post.content}</p>}

            {post.type === "quack_update" && post.quackTitle && (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{post.quackTitle}</p>
                  <p className="text-xs text-muted-foreground">{post.quackCategory}</p>
                  {post.quackTags && post.quackTags.length > 0 && (
                    <div className="flex gap-1.5 mt-1">
                      {post.quackTags.map(tag => <span key={tag} className="tag-pill bg-primary/10 text-primary text-[10px]">#{tag}</span>)}
                    </div>
                  )}
                  {post.quackChecklist && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <ListChecks className="w-3.5 h-3.5" />
                      <span>{post.quackChecklist.done}/{post.quackChecklist.total} tarefas</span>
                      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-[120px]">
                        <div className="h-full rounded-full bg-success" style={{ width: `${(post.quackChecklist.done / post.quackChecklist.total) * 100}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                {post.quackRating && post.quackRating > 0 && <StarRating rating={post.quackRating} />}
                {post.quackStatus && (
                  <span className={cn("tag-pill text-[10px] font-semibold flex-shrink-0", statusMeta[post.quackStatus]?.color)}>
                    {statusMeta[post.quackStatus]?.emoji} {statusMeta[post.quackStatus]?.label}
                  </span>
                )}
              </div>
            )}

            {post.type === "achievement" && (
              <div className="flex items-center gap-3 mb-3 p-3 rounded-xl bg-success/10 border border-success/20">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-success">Conquista Desbloqueada!</p>
                  <p className="text-xs text-muted-foreground">{post.content}</p>
                </div>
              </div>
            )}

            {/* Standardized action bar */}
            <div className="flex items-center gap-1 pt-2 border-t border-border">
              <button onClick={() => handleLike(post.id)} className={cn("pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors", post.liked ? "text-destructive" : "text-muted-foreground hover:text-destructive hover:bg-muted")}>
                <Heart className={cn("w-4 h-4", post.liked && "fill-destructive")} /> {post.likes}
              </button>
              <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <MessageCircle className="w-4 h-4" /> {post.comments}
              </button>
              <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleSave(post.id)} className={cn("pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ml-auto", post.saved ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                <Bookmark className={cn("w-4 h-4", post.saved && "fill-accent")} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default FeedPage;
