import { useState } from "react";
import { Star, Edit, Shuffle, Search } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";

const statuses = ["Todos", "Quero Fazer", "Fazendo", "Feito", "Descartado"];

interface Activity {
  id: number;
  name: string;
  category: string;
  tags: string[];
  rating: number;
  status: string;
}

const allActivities: Activity[] = [
  { id: 1, name: "Interstellar", category: "Filmes", tags: ["Ficção Científica", "Drama"], rating: 5, status: "Feito" },
  { id: 2, name: "Catan", category: "Jogos", tags: ["Board Game", "Estratégia"], rating: 4, status: "Feito" },
  { id: 3, name: "Attack on Titan", category: "Animes", tags: ["Ação", "Fantasia"], rating: 5, status: "Fazendo" },
  { id: 4, name: "Escape Room VR", category: "Eventos", tags: ["VR", "Aventura"], rating: 0, status: "Quero Fazer" },
  { id: 5, name: "Sushi Leblon", category: "Restaurantes", tags: ["Japonês", "Premium"], rating: 5, status: "Feito" },
  { id: 6, name: "The Last of Us", category: "Séries", tags: ["Drama", "Pós-Apocalíptico"], rating: 4, status: "Feito" },
  { id: 7, name: "Trilha da Pedra Bonita", category: "Lugares", tags: ["Natureza", "Trilha"], rating: 0, status: "Quero Fazer" },
  { id: 8, name: "Elden Ring", category: "Jogos", tags: ["RPG", "Souls-like"], rating: 5, status: "Fazendo" },
  { id: 9, name: "One Piece", category: "Animes", tags: ["Aventura", "Ação"], rating: 4, status: "Fazendo" },
  { id: 10, name: "Paris", category: "Viagens", tags: ["Europa", "Cultura"], rating: 0, status: "Quero Fazer" },
  { id: 11, name: "Stranger Things", category: "Séries", tags: ["Ficção", "Terror"], rating: 4, status: "Feito" },
  { id: 12, name: "Burguer Artesanal", category: "Restaurantes", tags: ["Hambúrguer", "Gourmet"], rating: 3, status: "Descartado" },
];

const statusColor: Record<string, string> = {
  "Quero Fazer": "bg-primary/15 text-primary",
  "Fazendo": "bg-accent/20 text-accent-foreground",
  "Feito": "bg-success/15 text-success",
  "Descartado": "bg-muted text-muted-foreground",
};

const catEmoji: Record<string, string> = {
  Jogos: "🎮", Filmes: "🎬", Séries: "📺", Animes: "🎌",
  Lugares: "📍", Restaurantes: "🍽️", Eventos: "🎪", Viagens: "✈️",
};

const ListsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = allActivities.filter((a) => {
    if (selectedStatus !== "Todos" && a.status !== selectedStatus) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Minhas Listas</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar Quack..."
              className="pl-10 pr-4 py-2 rounded-2xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Status filters (pink-active style matching sidebar nav) */}
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={cn(
                "px-4 py-2 rounded-2xl text-sm font-semibold transition-all hover:scale-[1.03]",
                selectedStatus === s
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((a, i) => (
            <div key={a.id} className="pato-card flex gap-4 animate-fade-in hover:-translate-y-0.5 transition-transform" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                {catEmoji[a.category] || "📌"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-semibold text-sm truncate">{a.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor[a.status]}`}>{a.status}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{a.category}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {a.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px]">#{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  {a.rating > 0 ? (
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3 h-3 ${s <= a.rating ? "fill-accent text-accent" : "text-muted"}`} />
                      ))}
                    </div>
                  ) : <span />}
                  <div className="flex gap-1">
                    <button className="p-1 rounded-lg hover:bg-muted transition-colors" title="Editar">
                      <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1 rounded-lg hover:bg-muted transition-colors" title="Sortear">
                      <Shuffle className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ListsPage;
