import { Sparkles, Music, Tv, Film, MapPin, Gamepad2, Eye, RefreshCw, Link2 } from "lucide-react";
import { useState } from "react";

const platforms = [
  { id: "spotify", name: "Spotify", icon: Music, color: "bg-[hsl(141,73%,42%)]/15 text-[hsl(141,73%,42%)]", connected: true },
  { id: "netflix", name: "Netflix", icon: Tv, color: "bg-[hsl(0,75%,50%)]/15 text-[hsl(0,75%,50%)]", connected: true },
  { id: "letterboxd", name: "Letterboxd", icon: Film, color: "bg-[hsl(30,90%,55%)]/15 text-[hsl(30,90%,55%)]", connected: false },
  { id: "crunchyroll", name: "Crunchyroll", icon: Tv, color: "bg-[hsl(30,90%,55%)]/15 text-[hsl(30,90%,55%)]", connected: true },
  { id: "steam", name: "Steam", icon: Gamepad2, color: "bg-[hsl(215,50%,45%)]/15 text-[hsl(215,50%,45%)]", connected: true },
  { id: "epic", name: "Epic Games", icon: Gamepad2, color: "bg-muted text-foreground", connected: false },
  { id: "twitch", name: "Twitch", icon: Eye, color: "bg-[hsl(264,100%,64%)]/15 text-[hsl(264,100%,64%)]", connected: false },
  { id: "google_maps", name: "Google Maps", icon: MapPin, color: "bg-[hsl(145,63%,42%)]/15 text-[hsl(145,63%,42%)]", connected: true },
];

const mockRecommendations = [
  {
    title: "Arcane: Season 2",
    category: "Série",
    source: "Netflix + Steam",
    reason: "Você joga League of Legends e assistiu a temporada 1",
    match: 97,
    emoji: "🎬",
  },
  {
    title: "Sushi Yasuda",
    category: "Restaurante",
    source: "Google Maps",
    reason: "Baseado nos restaurantes japoneses que você frequenta",
    match: 94,
    emoji: "🍣",
  },
  {
    title: "Hollow Knight: Silksong",
    category: "Jogo",
    source: "Steam",
    reason: "Você tem 120h em Hollow Knight e gosta de metroidvanias",
    match: 96,
    emoji: "🎮",
  },
  {
    title: "Chainsaw Man",
    category: "Anime",
    source: "Crunchyroll",
    reason: "Você assistiu Jujutsu Kaisen e gosta de shonen dark",
    match: 91,
    emoji: "⚔️",
  },
  {
    title: "Radiohead — OK Computer",
    category: "Álbum",
    source: "Spotify",
    reason: "Baseado no seu gosto por art rock e alt-rock",
    match: 89,
    emoji: "🎵",
  },
  {
    title: "Escape Room — Fuga Impossível",
    category: "Evento",
    source: "Google Maps",
    reason: "Atividade em grupo perto de você, alta avaliação",
    match: 85,
    emoji: "🔐",
  },
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
            className={`ml-auto pato-btn-bounce p-2 rounded-xl border border-border hover:bg-muted transition-colors ${loading ? "animate-spin" : ""}`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Connected platforms */}
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  p.connected
                    ? `${p.color} border-transparent`
                    : "border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {p.connected ? (
                  <Icon className="w-3.5 h-3.5" />
                ) : (
                  <Link2 className="w-3.5 h-3.5" />
                )}
                {p.name}
                {!p.connected && <span className="text-[10px] opacity-60">conectar</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 gap-3">
        {mockRecommendations.map((rec) => (
          <div
            key={rec.title}
            className="pato-card flex items-center gap-4 hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {rec.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-sm truncate">{rec.title}</p>
                <span className="tag-pill bg-accent/15 text-accent text-[10px] shrink-0">
                  {rec.category}
                </span>
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
