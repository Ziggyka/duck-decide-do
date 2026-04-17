import { RefreshCw, ThumbsUp, ThumbsDown, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "spotify", name: "Spotify", img: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", connected: true },
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

type MatchTone = "yellow" | "pink" | "violet";

const mockRecommendations: Array<{
  title: string;
  category: string;
  source: string;
  reason: string;
  match: number;
  matchLabel: string;
  tone: MatchTone;
  img: string;
}> = [
  {
    title: "Arcane: Season 2",
    category: "Série",
    source: "Netflix · Riot Games",
    reason: "Você joga League of Legends e assistiu 1 temporada",
    match: 97,
    matchLabel: "super match",
    tone: "yellow",
    img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=240&h=240&fit=crop",
  },
  {
    title: "Hollow Knight: Silksong",
    category: "Jogo",
    source: "Steam · Nintendo",
    reason: "Você tem 120h em Hollow Knight e gosta de metroidvanias",
    match: 96,
    matchLabel: "match",
    tone: "pink",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=240&h=240&fit=crop",
  },
  {
    title: "Chainsaw Man",
    category: "Anime",
    source: "Crunchyroll",
    reason: "Você assistiu Jujutsu Kaisen e gosta de shonen dark",
    match: 91,
    matchLabel: "match",
    tone: "violet",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=240&h=240&fit=crop",
  },
  {
    title: "Sushi Yasuda",
    category: "Restaurante",
    source: "Google Maps",
    reason: "Baseado nos restaurantes japoneses que você frequenta",
    match: 94,
    matchLabel: "match",
    tone: "yellow",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=240&h=240&fit=crop",
  },
  {
    title: "Radiohead — OK Computer",
    category: "Álbum",
    source: "Spotify",
    reason: "Baseado no seu gosto por art rock e alt-rock",
    match: 89,
    matchLabel: "match",
    tone: "pink",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=240&h=240&fit=crop",
  },
  {
    title: "Escape Room — Fuga Impossível",
    category: "Evento",
    source: "Google Maps",
    reason: "Atividade em grupo perto de você, alta avaliação",
    match: 85,
    matchLabel: "match",
    tone: "violet",
    img: "https://images.unsplash.com/photo-1582845512747-e42001c95638?w=240&h=240&fit=crop",
  },
];

const toneStyles: Record<MatchTone, string> = {
  yellow: "bg-gradient-to-br from-[#ffd400] to-[#ffb800] text-foreground",
  pink: "bg-gradient-to-br from-[#ff2d9a] to-[#e600a8] text-white",
  violet: "bg-gradient-to-br from-[#7c6cff] to-[#5b4cf0] text-white",
};

const PatoVidenteTab = () => {
  const [loading, setLoading] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(true);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1100px] mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm">
        <div className="relative bg-gradient-to-r from-[#ff2d9a] via-[#d633b8] to-[#7c4dd6] p-8 md:p-10">
          {/* Left duck illustration */}
          <div className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-7xl md:text-8xl select-none pointer-events-none drop-shadow-lg">
            🦆
          </div>
          {/* Right crystal ball */}
          <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-6xl md:text-7xl select-none pointer-events-none drop-shadow-lg">
            🔮
          </div>
          {/* Decorative stars */}
          <span className="absolute left-[28%] top-6 text-2xl">⭐</span>
          <span className="absolute right-[30%] bottom-6 text-xl">✨</span>

          <div className="relative z-10 text-center max-w-2xl mx-auto px-16 md:px-24">
            <h1 className="font-display font-extrabold text-white text-3xl md:text-5xl tracking-wide mb-2 drop-shadow-md">
              PATO VIDENTE
            </h1>
            <p className="text-white/90 text-xs md:text-sm">
              Recomendações personalizadas baseadas<br className="hidden md:block" />
              nas suas plataformas conectadas
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={handleRefresh}
          className={cn(
            "pato-btn-bounce inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 transition-all",
            loading && "opacity-70"
          )}
        >
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          Gerar novas recomendações
        </button>
        <button
          onClick={() => setShowPlatforms((v) => !v)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted text-muted-foreground font-semibold text-sm hover:bg-muted/70 transition-all"
        >
          Plataformas conectadas
        </button>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {mockRecommendations.map((rec, i) => (
          <div
            key={rec.title}
            className="bg-card rounded-2xl p-4 md:p-5 flex items-center gap-4 md:gap-5 shadow-sm border border-border/40 hover:shadow-md hover:-translate-y-0.5 transition-all animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Cover */}
            <img
              src={rec.img}
              alt={rec.title}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover flex-shrink-0"
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-display font-bold text-lg md:text-xl truncate">{rec.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px] font-medium">
                  {rec.category}
                </span>
              </div>
              <p className="text-sm text-foreground/80 mb-1">{rec.reason}</p>
              <p className="text-xs text-muted-foreground mb-2">Via {rec.source}</p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <button className="hover:text-primary transition-colors" aria-label="Curtir">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="hover:text-primary transition-colors" aria-label="Não curtir">
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-1 text-xs font-medium hover:text-primary transition-colors underline-offset-2 hover:underline">
                  <Plus className="w-3.5 h-3.5" />
                  Criar um quack
                </button>
              </div>
            </div>

            {/* Match Badge */}
            <div
              className={cn(
                "w-24 h-24 md:w-28 md:h-28 rounded-2xl flex flex-col items-center justify-center shadow-md flex-shrink-0",
                toneStyles[rec.tone]
              )}
            >
              <p className="font-display font-extrabold text-2xl md:text-3xl leading-none">{rec.match}%</p>
              <p className="text-[10px] md:text-xs font-medium mt-1 opacity-90">{rec.matchLabel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Connected Platforms */}
      {showPlatforms && (
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/40">
          <h3 className="font-display font-bold text-base mb-5">Plataformas Conectadas</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-5 justify-items-center">
            {platforms.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-2 group cursor-pointer" title={p.name}>
                <div
                  className={cn(
                    "w-14 h-14 rounded-full border-2 flex items-center justify-center bg-card overflow-hidden transition-all duration-200",
                    p.connected
                      ? "border-primary shadow-sm group-hover:scale-110 group-hover:shadow-md"
                      : "border-border bg-muted/50 opacity-40 grayscale group-hover:opacity-60"
                  )}
                >
                  <img src={p.img} alt={p.name} className="w-7 h-7 object-contain" />
                </div>
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    p.connected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatoVidenteTab;
