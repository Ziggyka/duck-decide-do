import { Heart, MessageCircle, ListPlus, Star, Award, Image as ImageIcon } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";
import AppLayout from "@/components/layout/AppLayout";

type PostType = "activity" | "review" | "achievement" | "list" | "photo";

interface FeedPost {
  id: number;
  user: string;
  avatar: string;
  type: PostType;
  content: string;
  activity?: string;
  rating?: number;
  likes: number;
  comments: number;
  time: string;
  tags?: string[];
  liked?: boolean;
}

const posts: FeedPost[] = [
  { id: 1, user: "DuckSlayer", avatar: duckAvatar2, type: "activity", content: "Acabei de assistir Interstellar com a galera! 🚀 Filme incrível, recomendo demais!", activity: "Interstellar", rating: 5, likes: 24, comments: 8, time: "2h atrás", tags: ["Filmes", "Ficção Científica"], liked: true },
  { id: 2, user: "QuackQueen", avatar: duckAvatar3, type: "achievement", content: "Desbloqueou a conquista Explorador — visitou 10 restaurantes diferentes! 🏆", likes: 42, comments: 12, time: "4h atrás", tags: ["Conquista"] },
  { id: 3, user: "PatoNinja", avatar: duckAvatar2, type: "review", content: "Review do novo board game Catan! Jogamos no sábado e foi muito divertido.", activity: "Catan", rating: 4, likes: 15, comments: 5, time: "6h atrás", tags: ["Jogos", "Board Games"] },
  { id: 4, user: "DuckMaster", avatar: duckAvatar3, type: "list", content: "Adicionou 5 novos animes à lista 'Maratona de Verão' 📋", likes: 8, comments: 3, time: "8h atrás", tags: ["Animes", "Lista"] },
  { id: 5, user: "QuackMaster", avatar: duckAvatar1, type: "photo", content: "Noite de pizza com a turma! 🍕🎉 Melhor rolê da semana!", activity: "Pizzaria do Zé", rating: 5, likes: 56, comments: 18, time: "1d atrás", tags: ["Restaurantes", "Amigos"] },
];

const typeColors: Record<PostType, { bg: string; text: string; label: string }> = {
  activity: { bg: "bg-neon-cyan/15", text: "text-neon-cyan", label: "Atividade" },
  review: { bg: "bg-primary/15", text: "text-primary", label: "Avaliação" },
  achievement: { bg: "bg-neon-green/15", text: "text-neon-green", label: "Conquista" },
  list: { bg: "bg-neon-purple/15", text: "text-neon-purple", label: "Lista" },
  photo: { bg: "bg-neon-pink/15", text: "text-neon-pink", label: "Foto" },
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`w-4 h-4 ${s <= rating ? "fill-primary text-primary" : "text-muted"}`} />
    ))}
  </div>
);

const FeedPage = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Create post */}
        <div className="pato-card flex items-center gap-3 border-neon-purple/20">
          <img src={duckAvatar1} alt="" className="w-10 h-10 rounded-full border-2 border-primary glow-duck" />
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors">
            O que você fez hoje, QuackMaster? 🦆
          </div>
        </div>

        {/* Posts */}
        {posts.map((post, i) => {
          const typeStyle = typeColors[post.type];
          return (
            <div
              key={post.id}
              className="pato-card animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border-2 border-border" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-sm">{post.user}</span>
                    <span className={`tag-pill ${typeStyle.bg} ${typeStyle.text}`}>
                      {typeStyle.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm mb-3 leading-relaxed">{post.content}</p>

              {/* Activity + Rating */}
              {post.activity && (
                <div className="flex items-center gap-3 mb-3 p-3 rounded-xl bg-muted/50 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    {post.type === "photo" ? (
                      <ImageIcon className="w-5 h-5 text-neon-pink" />
                    ) : (
                      <Star className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{post.activity}</p>
                    {post.rating && <StarRating rating={post.rating} />}
                  </div>
                </div>
              )}

              {/* Achievement badge */}
              {post.type === "achievement" && (
                <div className="flex items-center gap-3 mb-3 p-3 rounded-xl border border-neon-green/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-neon-cyan/5" />
                  <div className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center glow-green">
                      <Award className="w-5 h-5 text-neon-green" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neon-green">Conquista Desbloqueada!</p>
                      <p className="text-xs text-muted-foreground">+200 XP</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-pill bg-muted text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-1 pt-2 border-t border-border">
                <button className={`pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${post.liked ? "text-neon-pink" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  <Heart className={`w-4 h-4 ${post.liked ? "fill-neon-pink" : ""}`} />
                  {post.likes}
                </button>
                <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-neon-cyan hover:bg-muted transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
                <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-neon-purple hover:bg-muted transition-colors ml-auto">
                  <ListPlus className="w-4 h-4" />
                  Minha Lista
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default FeedPage;
