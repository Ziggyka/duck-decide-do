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
  { title: "Arcane: Season 2", category: "Série", source: "Netflix + Steam", reason: "Você joga League of Legends e assistiu a temporada 1", match: 97, emoji: "🎬" },
  { title: "Sushi Yasuda", category: "Restaurante", source: "Google Maps", reason: "Baseado nos restaurantes japoneses que você frequenta", match: 94, emoji: "🍣" },
  { title: "Hollow Knight: Silksong", category: "Jogo", source: "Steam", reason: "Você tem 120h em Hollow Knight e gosta de metroidvanias", match: 96, emoji: "🎮" },
  { title: "Chainsaw Man", category: "Anime", source: "Crunchyroll", reason: "Você assistiu Jujutsu Kaisen e gosta de shonen dark", match: 91, emoji: "⚔️" },
  { title: "Radiohead — OK Computer", category: "Álbum", source: "Spotify", reason: "Baseado no seu gosto por art rock e alt-rock", match: 89, emoji: "🎵" },
  { title: "Escape Room — Fuga Impossível", category: "Evento", source: "Google Maps", reason: "Atividade em grupo perto de você, alta avaliação", match: 85, emoji: "🔐" },
];

const PatoVidenteTab = () => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="pato-card p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              🔮 Pato Vidente
            </h2>
            <p className="text-sm text-muted-foreground">
              Recomendações personalizadas baseadas nas suas plataformas
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className={cn("ml-auto pato-btn-bounce p-2 rounded-xl border border-border hover:bg-muted transition-colors", loading && "animate-spin")}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 gap-3">
        {mockRecommendations.map((rec) => (
          <div key={rec.title} className="pato-card flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {rec.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-sm truncate">{rec.title}</p>
                <span className="tag-pill bg-accent/15 text-accent text-[10px] shrink-0">{rec.category}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{rec.reason}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-0.5">via {rec.source}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-display font-bold text-lg text-primary">{rec.match}%</p>
              <p className="text-[10px] text-muted-foreground">match</p>
            </div>
          </div>
        ))}
      </div>

      {/* Connected Platforms - Icons in circles */}
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
        <p className="text-xs text-muted-foreground">
          Quanto mais plataformas conectadas, melhores as recomendações do Pato Vidente.
        </p>
      </div>
    </div>
  );
};

export default PatoVidenteTab;
