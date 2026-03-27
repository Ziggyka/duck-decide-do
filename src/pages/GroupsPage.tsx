import { useState } from "react";
import { Search, Plus, ArrowLeft, Users, Lock, Globe, LogOut, MessageSquare } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import GroupCard from "@/components/groups/GroupCard";
import CreateGroupModal from "@/components/groups/CreateGroupModal";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const allGroups = [
  { id: "1", name: "Turma do Cinema", description: "Discussões sobre filmes, séries e maratonas semanais", emoji: "🎬", cover: "🎬🍿🎥", members: 12, posts: 48, isPublic: true, isMember: true },
  { id: "2", name: "Board Gamers", description: "Noites de jogos de tabuleiro e card games", emoji: "🎲", cover: "🎲♟️🃏", members: 8, posts: 23, isPublic: true, isMember: true },
  { id: "3", name: "Foodies SP", description: "Os melhores restaurantes e receitas da cidade", emoji: "🍕", cover: "🍕🍣🍰", members: 24, posts: 89, isPublic: true, isMember: false },
  { id: "4", name: "Anime Gang", description: "Debates, recomendações e watchlists de anime", emoji: "🎌", cover: "🎌⛩️🌸", members: 15, posts: 67, isPublic: false, isMember: true },
  { id: "5", name: "Dev Ducks", description: "Programadores patos trocando experiências", emoji: "💻", cover: "💻🦆⌨️", members: 9, posts: 34, isPublic: true, isMember: false },
  { id: "6", name: "Rolê Raiz", description: "Trilhas, camping e aventuras ao ar livre", emoji: "🏕️", cover: "🏕️🌲🏔️", members: 6, posts: 12, isPublic: true, isMember: false },
];

const groupFeed = [
  { user: "DuckSlayer", avatar: duckAvatar2, text: "Vamos assistir Dune 2 nesse fim de semana?", time: "1h atrás" },
  { user: "QuackQueen", avatar: duckAvatar3, text: "Adicionei 3 filmes novos à lista do grupo!", time: "3h atrás" },
  { user: "QuackMaster", avatar: duckAvatar1, text: "Quem topa cinema sexta?", time: "5h atrás" },
];

const groupMembers = [
  { name: "QuackMaster", avatar: duckAvatar1, role: "Admin" },
  { name: "DuckSlayer", avatar: duckAvatar2, role: "Membro" },
  { name: "QuackQueen", avatar: duckAvatar3, role: "Membro" },
];

const GroupsPage = () => {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const filtered = allGroups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
  const myGroups = allGroups.filter(g => g.isMember);
  const exploreGroups = filtered.filter(g => !g.isMember);
  const selectedGroup = allGroups.find(g => g.id === selectedGroupId);

  const handleJoin = (id: string) => {
    toast.success("Você entrou no grupo! 🦆");
  };

  if (selectedGroup) {
    return (
      <AppLayout hideRightSidebar>
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <button onClick={() => setSelectedGroupId(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para grupos
          </button>

          {/* Cover */}
          <div className="h-40 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl relative overflow-hidden">
            {selectedGroup.cover}
          </div>

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selectedGroup.emoji}</span>
              <div>
                <h1 className="text-2xl font-display flex items-center gap-2">
                  {selectedGroup.name}
                  {selectedGroup.isPublic ? <Globe className="w-4 h-4 text-muted-foreground" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">{selectedGroup.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {selectedGroup.members} membros</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {selectedGroup.posts} posts</span>
                </div>
              </div>
            </div>
            <button onClick={() => { setSelectedGroupId(null); toast("Você saiu do grupo"); }} className="flex items-center gap-2 text-sm text-destructive border border-destructive/30 px-4 py-2 rounded-xl hover:bg-destructive/5 transition-colors">
              <LogOut className="w-4 h-4" /> Sair do grupo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Feed */}
            <div className="col-span-2 space-y-3">
              <h2 className="font-display font-bold text-lg">Feed</h2>
              {groupFeed.map((post, i) => (
                <div key={i} className="pato-card flex items-start gap-3">
                  <img src={post.avatar} alt="" className="w-9 h-9 rounded-full bg-duck-yellow-light border-2 border-border" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{post.user}</span>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <p className="text-sm mt-1">{post.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Members sidebar */}
            <div className="space-y-4">
              <div className="pato-card">
                <h3 className="font-display font-semibold text-sm mb-3">Membros ({selectedGroup.members})</h3>
                <div className="space-y-3">
                  {groupMembers.map(m => (
                    <div key={m.name} className="flex items-center gap-2.5">
                      <img src={m.avatar} alt="" className="w-8 h-8 rounded-full bg-duck-yellow-light border border-border" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pato-card">
                <h3 className="font-display font-semibold text-sm mb-2">Informações</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>Criado em: 15 Jan 2026</p>
                  <p>Tipo: {selectedGroup.isPublic ? "Público" : "Privado"}</p>
                  <p>Posts esta semana: 12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Grupos 🦆</h1>
          <button onClick={() => setShowCreate(true)} className="pato-btn-bounce flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl text-sm font-bold">
            <Plus className="w-4 h-4" /> Criar Grupo
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar grupo..." className="pl-10 rounded-2xl" />
        </div>

        {/* My Groups */}
        <section>
          <h2 className="font-display font-bold text-lg mb-4">Meus Grupos</h2>
          <div className="grid grid-cols-3 gap-4">
            {myGroups.map(g => (
              <GroupCard key={g.id} group={g} onOpen={setSelectedGroupId} onJoin={handleJoin} />
            ))}
          </div>
        </section>

        {/* Explore */}
        {exploreGroups.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-lg mb-4">Explorar</h2>
            <div className="grid grid-cols-3 gap-4">
              {exploreGroups.map(g => (
                <GroupCard key={g.id} group={g} onOpen={setSelectedGroupId} onJoin={handleJoin} />
              ))}
            </div>
          </section>
        )}
      </div>

      <CreateGroupModal open={showCreate} onClose={() => setShowCreate(false)} />
    </AppLayout>
  );
};

export default GroupsPage;
