import { useState } from "react";
import { Clock, Users, User, Zap, Check, X, Target, Star } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const mainChallenge = {
  title: "Experimente um restaurante novo essa semana",
  description: "Saia da rotina gastronômica! Encontre um restaurante que nunca visitou e compartilhe a experiência.",
  difficulty: "Médio" as const,
  xp: 100,
  progress: 40,
  icon: "🍽️",
};

const groupChallenges = [
  {
    id: 1, group: "Turma do Cinema", title: "Assistam 3 filmes juntos essa semana",
    participants: [duckAvatar1, duckAvatar2, duckAvatar3], participantCount: 5,
    difficulty: "Médio" as const, xp: 300, progress: 66, icon: "🎬",
  },
  {
    id: 2, group: "Galera do Board Game", title: "Testem um jogo novo de tabuleiro",
    participants: [duckAvatar2, duckAvatar3], participantCount: 4,
    difficulty: "Fácil" as const, xp: 150, progress: 25, icon: "🎲",
  },
  {
    id: 3, group: "Squad Fitness", title: "Completem 5 treinos juntos",
    participants: [duckAvatar1, duckAvatar3], participantCount: 6,
    difficulty: "Difícil" as const, xp: 500, progress: 80, icon: "💪",
  },
];

const history = [
  { title: "Visite um museu na sua cidade", date: "10 Mar 2026", xp: 100 },
  { title: "Faça um piquenique no parque", date: "05 Mar 2026", xp: 50 },
  { title: "Maratona Stranger Things (grupo)", date: "01 Mar 2026", xp: 300 },
  { title: "Assista um documentário", date: "20 Fev 2026", xp: 100 },
];

const difficultyColors: Record<string, string> = {
  "Fácil": "bg-success/15 text-success border-success/30",
  "Médio": "bg-accent/20 text-accent-foreground border-accent/30",
  "Difícil": "bg-destructive/15 text-destructive border-destructive/30",
};

const ChallengesPage = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl">Meus Desafios 🦆</h1>
          <p className="text-muted-foreground mt-1">Acompanhe seus desafios individuais e em grupo</p>
        </div>

        {/* Main Challenge */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" /> Desafio Principal
          </h2>
          <div className="rounded-[20px] bg-card border-2 border-primary/30 shadow-md p-6 relative overflow-hidden hover:shadow-lg transition-all">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/5 blur-2xl" />
            <div className="flex gap-6 relative z-10">
              <div className="w-28 h-28 rounded-[20px] bg-accent/15 flex items-center justify-center text-6xl flex-shrink-0">
                {mainChallenge.icon}
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <Badge variant="outline" className="mb-2 text-primary border-primary/30 text-[10px]">Recomendado para você</Badge>
                  <h3 className="text-2xl font-display font-bold">{mainChallenge.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{mainChallenge.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", difficultyColors[mainChallenge.difficulty])}>
                    {mainChallenge.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-primary flex items-center gap-1">
                    <Zap className="w-3 h-3" /> +{mainChallenge.xp} XP
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold">Progresso</span>
                    <span className="text-muted-foreground">{mainChallenge.progress}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${mainChallenge.progress}%` }} />
                  </div>
                </div>
                <div className="pt-1">
                  {accepted ? (
                    <Button disabled className="gap-2 bg-success text-success-foreground"><Check className="w-4 h-4" /> Desafio Aceito</Button>
                  ) : (
                    <Button onClick={() => { setAccepted(true); toast.success("Desafio aceito! 🦆🔥"); }} className="gap-2 hover:scale-105 transition-transform">
                      <Target className="w-4 h-4" /> Aceitar desafio
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Group Challenges */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Desafios em Grupo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupChallenges.map((g) => (
              <div key={g.id} className="rounded-[20px] bg-card border border-border shadow-sm p-5 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0">{g.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-muted-foreground font-medium">{g.group}</p>
                    <h3 className="font-display font-bold text-sm truncate">{g.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                    <Users className="w-3 h-3" /> {g.participantCount} patos
                  </span>
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-semibold border", difficultyColors[g.difficulty])}>
                    {g.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3" /> +{g.xp} XP
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">Progresso do grupo</span>
                    <span className="font-bold">{g.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${g.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex -space-x-2">
                    {g.participants.map((a, i) => (
                      <img key={i} src={a} alt="" className="w-7 h-7 rounded-full border-2 border-card bg-duck-yellow-light" />
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="gap-1 text-xs hover:scale-105 transition-transform">
                    <Users className="w-3.5 h-3.5" /> Participar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            Desafios em grupo concedem mais XP — Fácil 150 / Médio 300 / Difícil 500
          </p>
        </section>

        {/* History */}
        <section>
          <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" /> Histórico
          </h2>
          <div className="rounded-[20px] bg-card border border-border shadow-sm divide-y divide-border overflow-hidden">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-success/15 flex items-center justify-center">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{h.title}</p>
                    <p className="text-xs text-muted-foreground">{h.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-[10px] text-success border-success/30">Concluído</Badge>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <Zap className="w-3 h-3" /> +{h.xp} XP
                  </span>
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
