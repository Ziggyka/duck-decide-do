import { useState } from "react";
import { UserPlus, Star, Camera, ListChecks, ExternalLink, MessageCircle, Plus } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";
import AppLayout from "@/components/layout/AppLayout";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import AvatarCustomizeModal from "@/components/profile/AvatarCustomizeModal";

const badges = [
  { name: "Curador do Mês", icon: "🏅", desc: "Top curador em Março" },
  { name: "Streak Master", icon: "🔥", desc: "30 dias consecutivos" },
  { name: "Explorador", icon: "🗺️", desc: "Visitou 10 lugares" },
  { name: "Crítico de Ouro", icon: "⭐", desc: "50 avaliações" },
  { name: "Social Butterfly", icon: "🦋", desc: "100 amigos" },
  { name: "Vencedor", icon: "🏆", desc: "Ganhou 20 sorteios" },
  { name: "Fotógrafo", icon: "📸", desc: "50 fotos postadas" },
  { name: "Líder", icon: "👑", desc: "Criou 5 grupos" },
];

const activities = [
  { name: "Interstellar", cat: "Filmes", rating: 5, status: "Feito" },
  { name: "Catan", cat: "Jogos", rating: 4, status: "Feito" },
  { name: "Sushi Leblon", cat: "Restaurantes", rating: 5, status: "Feito" },
  { name: "Attack on Titan", cat: "Animes", rating: 5, status: "Fazendo" },
  { name: "Escape Room", cat: "Eventos", rating: 0, status: "Quero fazer" },
];

const userPosts = [
  { id: 1, text: "Acabei de assistir Interstellar pela terceira vez. Obra-prima! 🚀", likes: 42, comments: 8, time: "2h" },
  { id: 2, text: "Noite de Catan com a galera foi épica! Quem mais joga? 🎲", likes: 28, comments: 12, time: "5h" },
  { id: 3, text: "Descobri o melhor sushi de SP. Vocês precisam ir! 🍣", likes: 67, comments: 23, time: "1d" },
];

const tabs = ["Posts", "Atividades", "Listas", "Conquistas", "Memórias", "Amigos"];

const statusColor: Record<string, string> = {
  "Feito": "bg-success/15 text-success",
  "Fazendo": "bg-accent/15 text-accent",
  "Quero fazer": "bg-primary/15 text-primary",
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Posts");
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "QuackMaster",
    bio: "Explorando o mundo uma atividade por vez! 🌍",
    avatarUrl: duckAvatar1,
  });

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="pato-card p-6">
          <div className="flex items-start gap-6">
            {/* Avatar with + overlay */}
            <div className="relative group">
              <img
                src={profile.avatarUrl}
                alt="avatar"
                className="w-24 h-24 rounded-2xl bg-duck-yellow-light border-4 border-primary glow-duck object-cover"
              />
              <span className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                Lv.24
              </span>
              <button
                onClick={() => setAvatarModalOpen(true)}
                className="absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-0.5">
                <h1 className="text-2xl">{profile.name}</h1>
                <span className="tag-pill bg-primary/15 text-primary font-semibold">🦆 Pato Lendário</span>
              </div>
              <p className="text-sm text-muted-foreground mb-0.5">@quackmaster</p>
              <p className="text-sm text-muted-foreground mb-1">{profile.bio}</p>
              <a href="#" className="inline-flex items-center gap-1 text-xs text-primary hover:underline mb-3">
                <ExternalLink className="w-3 h-3" />
                linktr.ee/quackmaster
              </a>

              {/* XP Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-display font-semibold">Nível 24</span>
                  <span className="text-muted-foreground">2.450 / 3.000 XP</span>
                </div>
                <div className="xp-bar h-3">
                  <div className="xp-bar-fill" style={{ width: "82%" }} />
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-center">
                {[
                  { value: "142", label: "Posts" },
                  { value: "1.2k", label: "Seguidores" },
                  { value: "356", label: "Seguindo" },
                  { value: "89", label: "Atividades" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-bold text-lg">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold">
                <UserPlus className="w-4 h-4" />
                Seguir
              </button>
              <button className="pato-btn-bounce flex items-center gap-2 border border-border px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                <MessageCircle className="w-4 h-4" />
                Mensagem
              </button>
              <EditProfileDialog profile={profile} onSave={setProfile} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card rounded-2xl p-1 border border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap px-3 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Posts" && (
          <div className="space-y-4 animate-fade-in">
            {userPosts.map((post) => (
              <div key={post.id} className="pato-card">
                <div className="flex items-center gap-3 mb-3">
                  <img src={profile.avatarUrl} alt="" className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-primary" />
                  <div>
                    <p className="text-sm font-semibold">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">{post.time} atrás</p>
                  </div>
                </div>
                <p className="text-sm mb-3">{post.text}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Conquistas" && (
          <div className="grid grid-cols-4 gap-3 animate-fade-in">
            {badges.map((b) => (
              <div key={b.name} className="pato-card text-center p-4 hover:border-primary/50 cursor-pointer group">
                <span className="text-3xl block mb-2 group-hover:animate-bounce-in">{b.icon}</span>
                <p className="text-sm font-display font-semibold">{b.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Atividades" && (
          <div className="space-y-3 animate-fade-in">
            {activities.map((a) => (
              <div key={a.name} className="pato-card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.cat}</p>
                </div>
                {a.rating > 0 && (
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= a.rating ? "fill-primary text-primary" : "text-muted"}`} />
                    ))}
                  </div>
                )}
                <span className={`tag-pill ${statusColor[a.status]}`}>{a.status}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Listas" && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {["Filmes para Assistir", "Restaurantes SP", "Board Games", "Animes 2024"].map((l, i) => (
              <div key={l} className="pato-card flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <ListChecks className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{l}</p>
                  <p className="text-xs text-muted-foreground">{(i + 1) * 7} itens</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Memórias" && (
          <div className="grid grid-cols-3 gap-3 animate-fade-in">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="pato-card aspect-square flex items-center justify-center bg-muted/50">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}

        {activeTab === "Amigos" && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {[
              { name: "DuckSlayer", level: 18, avatar: duckAvatar2 },
              { name: "QuackQueen", level: 22, avatar: duckAvatar3 },
              { name: "PatoNinja", level: 15, avatar: duckAvatar2 },
              { name: "DuckMaster", level: 30, avatar: duckAvatar3 },
            ].map(f => (
              <div key={f.name} className="pato-card flex items-center gap-3">
                <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border" />
                <div>
                  <p className="text-sm font-semibold">{f.name}</p>
                  <p className="text-xs text-muted-foreground">Nível {f.level}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AvatarCustomizeModal
        open={avatarModalOpen}
        onClose={() => setAvatarModalOpen(false)}
        currentAvatar={profile.avatarUrl}
        onSave={(url) => setProfile(prev => ({ ...prev, avatarUrl: url }))}
      />
    </AppLayout>
  );
};

export default ProfilePage;
