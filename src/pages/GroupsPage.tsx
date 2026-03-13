import { useState } from "react";
import { Users, ListChecks, Camera, Trophy, BarChart3, Hash } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const groups = [
  { name: "Turma do Cinema", members: 8, avatar: "🎬", active: true },
  { name: "Board Gamers", members: 5, avatar: "🎲", active: false },
  { name: "Foodies SP", members: 12, avatar: "🍕", active: false },
  { name: "Anime Gang", members: 6, avatar: "🎌", active: false },
];

const groupTabs = ["Feed", "Lista Compartilhada", "Sorteio", "Álbum", "Torneios", "Estatísticas"];

const groupFeed = [
  { user: "DuckSlayer", avatar: duckAvatar2, text: "Vamos assistir Dune 2 nesse fim de semana?", time: "1h atrás" },
  { user: "QuackQueen", avatar: duckAvatar3, text: "Adicionei 3 filmes novos à lista do grupo!", time: "3h atrás" },
  { user: "QuackMaster", avatar: duckAvatar1, text: "Quem topa cinema sexta?", time: "5h atrás" },
];

const GroupsPage = () => {
  const [selectedGroup, setSelectedGroup] = useState("Turma do Cinema");
  const [activeTab, setActiveTab] = useState("Feed");

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl mb-5">Grupos</h1>
        <div className="flex gap-4">
          {/* Group List */}
          <div className="w-60 space-y-2 flex-shrink-0">
            {groups.map((g) => (
              <button
                key={g.name}
                onClick={() => setSelectedGroup(g.name)}
                className={`w-full pato-card flex items-center gap-3 pato-btn-bounce ${
                  selectedGroup === g.name ? "border-primary" : ""
                }`}
              >
                <span className="text-2xl">{g.avatar}</span>
                <div className="text-left">
                  <p className="text-sm font-semibold">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.members} membros</p>
                </div>
              </button>
            ))}
            <button className="w-full pato-card flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground pato-btn-bounce">
              <span className="text-lg">+</span> Criar Grupo
            </button>
          </div>

          {/* Group Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex gap-1 bg-card rounded-2xl p-1 border border-border mb-4">
              {groupTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Feed" && (
              <div className="space-y-3 animate-fade-in">
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
            )}

            {activeTab !== "Feed" && (
              <div className="pato-card flex items-center justify-center h-48 text-muted-foreground text-sm animate-fade-in">
                Conteúdo de "{activeTab}" para {selectedGroup}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GroupsPage;
