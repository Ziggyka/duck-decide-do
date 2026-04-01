import { useState } from "react";
import {
  Sparkles, Clock, Users, User, Zap, Trophy, Gift, Star,
  Check, Flame, HelpCircle, Calendar, Target,
  Bookmark, X, Loader2, ChevronDown, ChevronUp
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const mainChallenge = {
  title: "Experimente um restaurante novo com seu grupo",
  description: "Saia da rotina gastronômica! Encontre um restaurante que ninguém do grupo conhece e compartilhem a experiência.",
  difficulty: "Médio" as const,
  time: "2–3 horas",
  type: "Grupo" as const,
  xp: 300,
  reason: "Baseado no seu histórico: você adora rolês gastronômicos, mas sempre vai nos mesmos lugares!",
};

const weeklyChallenges = [
  { id: 1, title: "Jogue um jogo cooperativo com amigos", icon: "🎮", desc: "Escolha um jogo co-op e jogue pelo menos 1 hora", type: "Grupo", xp: 150, item: "Carta Dourada" },
  { id: 2, title: "Conheça um lugar novo na sua cidade", icon: "📍", desc: "Explore um bairro ou ponto que nunca visitou", type: "Solo", xp: 120, item: "Mapa Secreto" },
  { id: 3, title: "Veja um anime curto de comédia", icon: "🍿", desc: "Assista algo fora do seu gênero habitual", type: "Solo", xp: 100, item: "Ticket VIP" },
  { id: 4, title: "Monte uma playlist para um rolê", icon: "🎵", desc: "Crie uma playlist temática e compartilhe", type: "Grupo", xp: 80, item: "Microfone Dourado" },
  { id: 5, title: "Organize uma noite de jogos de tabuleiro", icon: "🎲", desc: "Reúna a galera para jogar presencialmente", type: "Grupo", xp: 200, item: "Dado Mágico" },
  { id: 6, title: "Descubra uma receita nova e cozinhe", icon: "🍳", desc: "Faça algo que nunca cozinhou antes", type: "Solo", xp: 100, item: "Chapéu de Chef" },
];

const rewards = [
  { name: "Carta Dourada", icon: "🃏", rarity: "Raro", color: "text-accent" },
  { name: "Mapa Secreto", icon: "🗺️", rarity: "Épico", color: "text-primary" },
  { name: "Ticket VIP", icon: "🎟️", rarity: "Comum", color: "text-muted-foreground" },
  { name: "Dado Mágico", icon: "🎲", rarity: "Épico", color: "text-primary" },
];

const groupChallenges = [
  { group: "Turma do Cinema", challenge: "Assistam 3 filmes juntos essa semana", participants: [duckAvatar1, duckAvatar2, duckAvatar3], status: "Em andamento" },
  { group: "Galera do Board Game", challenge: "Testem um jogo novo que ninguém jogou", participants: [duckAvatar2, duckAvatar3], status: "Pendente" },
];

const history = [
  { title: "Visite um museu na sua cidade", status: "Completo" as const, date: "10 Mar 2026", xp: 150 },
  { title: "Faça um piquenique no parque", status: "Completo" as const, date: "05 Mar 2026", xp: 120 },
  { title: "Participe de um karaokê", status: "Falhou" as const, date: "28 Fev 2026", xp: 0 },
  { title: "Assista um documentário", status: "Completo" as const, date: "20 Fev 2026", xp: 100 },
];

const difficultyColors: Record<string, string> = {
  "Fácil": "bg-success/15 text-success",
  "Médio": "bg-accent/15 text-accent-foreground",
  "Difícil": "bg-destructive/15 text-destructive",
};

const rarityColors: Record<string, string> = {
  "Comum": "border-muted-foreground/30 bg-muted/50",
  "Raro": "border-accent/40 bg-accent/10",
  "Épico": "border-primary/40 bg-primary/10",
};

type ChallengeStatus = "done" | "in_progress" | "not_started" | null;

const statusConfig = {
  done: { label: "Concluído", className: "bg-success/15 text-success border-success/30", icon: Check },
  in_progress: { label: "Em andamento", className: "bg-accent/15 text-accent-foreground border-accent/30", icon: Loader2 },
  not_started: { label: "Não iniciado", className: "bg-muted text-muted-foreground border-border", icon: Clock },
};

const ChallengesPage = () => {
  const [acceptedMain, setAcceptedMain] = useState(false);
  const [savedMain, setSavedMain] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [challengeStates, setChallengeStates] = useState<Record<number, ChallengeStatus>>({});
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);

  const setStatus = (id: number, status: ChallengeStatus, xp: number) => {
    setChallengeStates(prev => ({ ...prev, [id]: status }));
    if (status === "done") {
      setEarnedXp(prev => prev + xp);
      toast.success(`+${xp} XP ganhos! 🎉`);
    } else if (status === "in_progress") {
      toast.success("Desafio em andamento! 🦆");
    }
  };

  const doneCount = Object.values(challengeStates).filter(s => s === "done").length;

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl flex items-center gap-2">Meus Desafios 🦆</h1>
            <p className="text-muted-foreground mt-1">Desafios semanais personalizados para você</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="pato-card p-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-destructive" />
              <span className="text-sm font-bold">Streak: 3 semanas 🔥</span>
            </div>
            <div className="pato-card p-3 flex items-center gap-2 border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">+{earnedXp} XP</span>
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Atualiza em: 4 dias
            </span>
            <Button className="gap-2 pato-btn-bounce">
              <Sparkles className="w-4 h-4" /> Gerar novos
            </Button>
          </div>
        </div>

        {/* Quick Widgets */}
        <div className="grid grid-cols-3 gap-4">
          <div className="pato-card flex items-center gap-3 border-accent/30">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-xl">⚡</div>
            <div>
              <p className="text-xs text-muted-foreground">Desafio do dia</p>
              <p className="text-sm font-semibold">Faça algo inesperado hoje!</p>
            </div>
          </div>
          <div className="pato-card flex items-center gap-3 border-primary/30">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xl">🤖</div>
            <div>
              <p className="text-xs text-muted-foreground">Sugestão da IA</p>
              <p className="text-sm font-semibold">Seus amigos jogaram bastante essa semana</p>
            </div>
          </div>
          <div className="pato-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">🔥</div>
            <div>
              <p className="text-xs text-muted-foreground">Feitos esta semana</p>
              <p className="text-sm font-semibold">{doneCount} de {weeklyChallenges.length} desafios</p>
            </div>
          </div>
        </div>

        {/* Main Challenge */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" /> Desafio Principal da Semana
          </h2>
          <div className="pato-card p-6 border-primary/30 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
            <div className="flex gap-6 relative z-10">
              <div className="w-24 h-24 rounded-2xl bg-accent/15 flex items-center justify-center text-5xl flex-shrink-0">🍽️</div>
              <div className="flex-1 space-y-3">
                <div>
                  <Badge variant="outline" className="mb-2 text-primary border-primary/30 text-[10px]">Recomendado para você</Badge>
                  <h3 className="text-xl font-display font-bold">{mainChallenge.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{mainChallenge.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className={`tag-pill ${difficultyColors[mainChallenge.difficulty]}`}>{mainChallenge.difficulty}</span>
                  <span className="tag-pill bg-muted text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {mainChallenge.time}</span>
                  <span className="tag-pill bg-muted text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" /> {mainChallenge.type}</span>
                  <span className="tag-pill bg-primary/15 text-primary font-semibold flex items-center gap-1"><Zap className="w-3 h-3" /> +{mainChallenge.xp} XP</span>
                </div>
                <button onClick={() => setShowReason(!showReason)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  <HelpCircle className="w-3.5 h-3.5" /> Por que estou vendo isso?
                </button>
                {showReason && (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 animate-fade-in">💡 {mainChallenge.reason}</p>
                )}
                <div className="flex gap-2 pt-1">
                  {acceptedMain ? (
                    <Button disabled className="gap-2 bg-success text-success-foreground"><Check className="w-4 h-4" /> Desafio Aceito!</Button>
                  ) : (
                    <Button onClick={() => { setAcceptedMain(true); toast.success("Desafio aceito! 🦆🔥"); }} className="gap-2 pato-btn-bounce"><Target className="w-4 h-4" /> Aceitar desafio</Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => toast("Desafio ignorado")}><X className="w-3.5 h-3.5" /> Ignorar</Button>
                  <Button variant="ghost" size="sm" className={`gap-1 ${savedMain ? "text-accent" : ""}`} onClick={() => { setSavedMain(!savedMain); toast(savedMain ? "Removido" : "Salvo! 🔖"); }}>
                    <Bookmark className={`w-3.5 h-3.5 ${savedMain ? "fill-accent" : ""}`} /> {savedMain ? "Salvo" : "Salvar"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Challenges - Click to reveal status */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Desafios da Semana
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {weeklyChallenges.map((c) => {
              const state = challengeStates[c.id];
              const config = state ? statusConfig[state] : null;
              const isExpanded = expandedChallenge === c.id;

              return (
                <div
                  key={c.id}
                  className={cn(
                    "pato-card p-5 flex flex-col gap-3 transition-all duration-300 animate-fade-in cursor-pointer",
                    state === "done" ? "border-success/40" : state === "in_progress" ? "border-accent/40" : ""
                  )}
                  onClick={() => setExpandedChallenge(isExpanded ? null : c.id)}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{c.icon}</span>
                    <div className="flex items-center gap-1.5">
                      {config && (
                        <Badge className={`${config.className} border text-[10px] gap-1`}>
                          <config.icon className="w-3 h-3" /> {config.label}
                        </Badge>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-sm leading-tight">{c.title}</h3>
                  <p className="text-xs text-muted-foreground flex-1">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="tag-pill bg-muted text-muted-foreground text-[10px] flex items-center gap-1">
                      {c.type === "Grupo" ? <Users className="w-3 h-3" /> : <User className="w-3 h-3" />} {c.type}
                    </span>
                    <span className="tag-pill bg-primary/15 text-primary text-[10px] font-semibold">+{c.xp} XP</span>
                    <span className="tag-pill bg-accent/15 text-accent-foreground text-[10px]">🎁 {c.item}</span>
                  </div>

                  {/* Status actions - only show when expanded */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-border space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                      <p className="text-[11px] font-semibold text-muted-foreground">Atualizar status:</p>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setStatus(c.id, "not_started", 0)}
                          className={cn("flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-colors",
                            state === "not_started" ? "bg-muted text-foreground ring-2 ring-border" : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          ⏸ Não iniciado
                        </button>
                        <button
                          onClick={() => setStatus(c.id, "in_progress", 0)}
                          className={cn("flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-colors",
                            state === "in_progress" ? "bg-accent/25 text-accent-foreground ring-2 ring-accent/40" : "bg-accent/10 text-accent-foreground hover:bg-accent/20"
                          )}
                        >
                          ⏳ Andamento
                        </button>
                        <button
                          onClick={() => setStatus(c.id, "done", c.xp)}
                          className={cn("flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-colors",
                            state === "done" ? "bg-success/25 text-success ring-2 ring-success/40" : "bg-success/10 text-success hover:bg-success/20"
                          )}
                        >
                          ✓ Concluído
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Rewards */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" /> Recompensas
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {rewards.map((r) => (
              <div key={r.name} className={`pato-card p-5 text-center border ${rarityColors[r.rarity]}`}>
                <span className="text-4xl block mb-3">{r.icon}</span>
                <p className="font-display font-semibold text-sm">{r.name}</p>
                <span className={`text-[10px] font-bold uppercase ${r.color}`}>{r.rarity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Group Challenges */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Desafios em Grupo
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {groupChallenges.map((g) => (
              <div key={g.group} className="pato-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold">{g.group}</h3>
                  <div className="flex -space-x-2">
                    {g.participants.map((a, i) => (
                      <img key={i} src={a} alt="" className="w-7 h-7 rounded-full border-2 border-card bg-muted" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{g.challenge}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">{g.status}</Badge>
                  <Button size="sm" variant="outline" className="gap-1 pato-btn-bounce text-xs">
                    <Users className="w-3.5 h-3.5" /> Participar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" /> Histórico
          </h2>
          <div className="pato-card divide-y divide-border">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${h.status === "Completo" ? "bg-success/15" : "bg-destructive/15"}`}>
                    {h.status === "Completo" ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{h.title}</p>
                    <p className="text-xs text-muted-foreground">{h.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={`text-[10px] ${h.status === "Completo" ? "text-success border-success/30" : "text-destructive border-destructive/30"}`}>{h.status}</Badge>
                  {h.xp > 0 && <span className="text-xs font-semibold text-primary">+{h.xp} XP</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default ChallengesPage;
