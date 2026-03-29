import { useState } from "react";
import { Heart, MessageCircle, ListPlus, Star, Award, Image as ImageIcon, Smile, AtSign, Send } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";

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

const initialPosts: FeedPost[] = [
  {
    id: 1,
    user: "DuckSlayer",
    avatar: duckAvatar2,
    type: "activity",
    content: "Acabei de assistir Interstellar com a galera! 🚀 Filme incrível, recomendo demais!",
    activity: "Interstellar",
    rating: 5,
    likes: 24,
    comments: 8,
    time: "2h atrás",
    tags: ["Filmes", "Ficção Científica"],
    liked: true,
  },
  {
    id: 2,
    user: "QuackQueen",
    avatar: duckAvatar3,
    type: "achievement",
    content: "Desbloqueou a conquista Explorador — visitou 10 restaurantes diferentes! 🏆",
    likes: 42,
    comments: 12,
    time: "4h atrás",
    tags: ["Conquista"],
  },
  {
    id: 3,
    user: "PatoNinja",
    avatar: duckAvatar2,
    type: "review",
    content: "Review do novo board game Catan! Jogamos no sábado e foi muito divertido.",
    activity: "Catan",
    rating: 4,
    likes: 15,
    comments: 5,
    time: "6h atrás",
    tags: ["Jogos", "Board Games"],
  },
  {
    id: 4,
    user: "DuckMaster",
    avatar: duckAvatar3,
    type: "list",
    content: "Adicionou 5 novos animes à lista 'Maratona de Verão' 📋",
    likes: 8,
    comments: 3,
    time: "8h atrás",
    tags: ["Animes", "Lista"],
  },
  {
    id: 5,
    user: "QuackMaster",
    avatar: duckAvatar1,
    type: "photo",
    content: "Noite de pizza com a turma! 🍕🎉 Melhor rolê da semana!",
    activity: "Pizzaria do Zé",
    rating: 5,
    likes: 56,
    comments: 18,
    time: "1d atrás",
    tags: ["Restaurantes", "Amigos"],
  },
];

const typeColors: Record<PostType, { bg: string; text: string; label: string }> = {
  activity: { bg: "bg-accent/15", text: "text-accent", label: "Quack" },
  review: { bg: "bg-primary/15", text: "text-primary-foreground", label: "Avaliação" },
  achievement: { bg: "bg-success/15", text: "text-success", label: "Conquista" },
  list: { bg: "bg-muted", text: "text-muted-foreground", label: "Lista" },
  photo: { bg: "bg-streak/15", text: "text-streak", label: "Foto" },
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-4 h-4 ${s <= rating ? "fill-primary text-primary" : "text-muted"}`}
      />
    ))}
  </div>
);

const FeedPage = () => {
  const [postText, setPostText] = useState("");
  const [posts] = useState(initialPosts);

  const handleQuackar = () => {
    if (!postText.trim()) return;
    toast.success("Quack publicado! 🦆🎉");
    setPostText("");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Create post - Twitter-style */}
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
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border" />
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
                <div className="flex items-center gap-3 mb-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    {post.type === "photo" ? (
                      <ImageIcon className="w-5 h-5 text-primary" />
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
                <div className="flex items-center gap-3 mb-3 p-3 rounded-xl bg-success/10 border border-success/20">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-success">Conquista Desbloqueada!</p>
                    <p className="text-xs text-muted-foreground">+200 XP</p>
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
                <button className={`pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${post.liked ? "text-destructive" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  <Heart className={`w-4 h-4 ${post.liked ? "fill-destructive" : ""}`} />
                  {post.likes}
                </button>
                <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
                <button className="pato-btn-bounce flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-auto">
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
