import { Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "spotify", name: "Spotify", img: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg", connected: true },
  { id: "netflix", name: "Netflix", img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg", connected: true },
  { id: "letterboxd", name: "Letterboxd", img: "https://a.ltrbxd.com/logos/letterboxd-mac-icon.png", connected: false },
  { id: "crunchyroll", name: "Crunchyroll", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Crunchyroll_Logo.svg/512px-Crunchyroll_Logo.svg.png", connected: true },
  { id: "steam", name: "Steam", img: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg", connected: true },
  { id: "epic", name: "Epic Games", img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg", connected: false },
  { id: "twitch", name: "Twitch", img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Twitch_Glitch_Logo_Purple.svg", connected: false },
  { id: "google_maps", name: "Google Maps", img: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg", connected: true },
  { id: "youtube", name: "YouTube", img: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", connected: false },
  { id: "instagram", name: "Instagram", img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", connected: false },
  { id: "xbox", name: "Xbox", img: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Xbox_one_logo.svg", connected: false },
  { id: "github", name: "GitHub", img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", connected: false },
];

const mockRecommendations = [
  { title: "Arcane: Season 2", category: "Série", source: "Netflix + Steam", reason: "Você joga League of Legends e assistiu a temporada 1", match: 97, img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=120&h=120&fit=crop" },
  { title: "Sushi Yasuda", category: "Restaurante", source: "Google Maps", reason: "Baseado nos restaurantes japoneses que você frequenta", match: 94, img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=120&h=120&fit=crop" },
  { title: "Hollow Knight: Silksong", category: "Jogo", source: "Steam", reason: "Você tem 120h em Hollow Knight e gosta de metroidvanias", match: 96, img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=120&h=120&fit=crop" },
  { title: "Chainsaw Man", category: "Anime", source: "Crunchyroll", reason: "Você assistiu Jujutsu Kaisen e gosta de shonen dark", match: 91, img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&h=120&fit=crop" },
  { title: "Radiohead — OK Computer", category: "Álbum", source: "Spotify", reason: "Baseado no seu gosto por art rock e alt-rock", match: 89, img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120&h=120&fit=crop" },
  { title: "Escape Room — Fuga Impossível", category: "Evento", source: "Google Maps", reason: "Atividade em grupo perto de você, alta avaliação", match: 85, img: "https://images.unsplash.com/photo-1582845512747-e42001c95638?w=120&h=120&fit=crop" },
];

const PatoVidenteTab = () => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-accent p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative z-10">
          <span className="text-5xl block mb-3">🔮</span>
          <h1 className="font-display font-bold text-3xl text-white mb-2">Pato Vidente</h1>
          <p className="text-white/80 text-sm max-w-md mx-auto mb-4">
            Recomendações personalizadas baseadas nas suas plataformas conectadas
          </p>
          <button
            onClick={handleRefresh}
            className={cn(
              "pato-btn-bounce inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-semibold text-sm border border-white/30 hover:bg-white/30 transition-all",
              loading && "opacity-70"
            )}
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            Gerar novas recomendações
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {mockRecommendations.map((rec, i) => (
          <div
            key={rec.title}
            className="pato-card flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer group animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <img
              src={rec.img}
              alt={rec.title}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-sm truncate">{rec.title}</p>
                <span className="tag-pill bg-accent/15 text-accent-foreground text-[10px] shrink-0">{rec.category}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{rec.reason}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">via {rec.source}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display font-bold text-2xl text-primary">{rec.match}%</p>
              <p className="text-[10px] text-muted-foreground">match</p>
            </div>
          </div>
        ))}
      </div>

      {/* Connected Platforms */}
      <div className="pato-card p-5">
        <h3 className="font-display font-semibold text-sm mb-4">Plataformas Conectadas</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {platforms.map((p) => (
            <div key={p.id} className="flex flex-col items-center gap-1.5 group cursor-pointer" title={p.name}>
              <div className={cn(
                "w-12 h-12 rounded-full border-2 flex items-center justify-center overflow-hidden transition-all duration-200",
                p.connected
                  ? "border-primary bg-card shadow-sm group-hover:scale-110 group-hover:shadow-md"
                  : "border-border bg-muted/50 opacity-40 grayscale group-hover:opacity-60"
              )}>
                <img src={p.img} alt={p.name} className="w-6 h-6 object-contain" />
              </div>
              <span className={cn("text-[10px] font-medium", p.connected ? "text-foreground" : "text-muted-foreground")}>{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pato-card p-5 text-center bg-gradient-to-br from-primary/5 to-accent/5">
        <p className="text-2xl mb-2">🦆✨</p>
        <p className="font-display font-semibold text-sm mb-1">Conecte mais plataformas!</p>
        <p className="text-xs text-muted-foreground">Quanto mais plataformas conectadas, melhores as recomendações.</p>
      </div>
    </div>
  );
};

export default PatoVidenteTab;
