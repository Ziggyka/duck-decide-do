import { useState } from "react";
import { Trophy, Lock, Zap, Award, Share2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  category: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: { current: number; total: number };
}

const achievements: Achievement[] = [
  { id: "1", title: "Primeiro Quack", description: "Criar seu primeiro Quack", icon: "🦆", xp: 50, category: "Geral", unlocked: true, unlockedDate: "10 Mar 2026" },
  { id: "2", title: "Primeira Conclusão", description: "Concluir sua primeira atividade", icon: "✅", xp: 100, category: "Atividades", unlocked: true, unlockedDate: "12 Mar 2026" },
  { id: "3", title: "Streak Iniciante", description: "7 dias seguidos ativo na plataforma", icon: "🔥", xp: 150, category: "Streak", unlocked: true, unlockedDate: "18 Mar 2026" },
  { id: "4", title: "Quacker Veterano", description: "Finalizar 10 Quacks", icon: "🏅", xp: 300, category: "Atividades", unlocked: false, progress: { current: 7, total: 10 } },
  { id: "5", title: "Trabalho em Equipe", description: "Concluir uma atividade em grupo", icon: "👥", xp: 200, category: "Social", unlocked: true, unlockedDate: "20 Mar 2026" },
  { id: "6", title: "Crítico Exigente", description: "Manter média de avaliação acima de 4 estrelas", icon: "⭐", xp: 250, category: "Atividades", unlocked: false, progress: { current: 3, total: 5 } },
  { id: "7", title: "Social Butterfly", description: "Receber 50 curtidas nos seus quacks", icon: "🦋", xp: 200, category: "Social", unlocked: false, progress: { current: 32, total: 50 } },
  { id: "8", title: "Explorador Cultural", description: "Completar atividades em 5 categorias diferentes", icon: "🗺️", xp: 350, category: "Atividades", unlocked: false, progress: { current: 3, total: 5 } },
  { id: "9", title: "Desafiante", description: "Concluir 5 desafios semanais", icon: "🎯", xp: 250, category: "Desafios", unlocked: false, progress: { current: 2, total: 5 } },
  { id: "10", title: "Comentarista", description: "Fazer 20 comentários em quacks de amigos", icon: "💬", xp: 150, category: "Social", unlocked: false, progress: { current: 8, total: 20 } },
  { id: "11", title: "Streak Master", description: "30 dias seguidos ativo", icon: "🔥", xp: 500, category: "Streak", unlocked: false, progress: { current: 12, total: 30 } },
  { id: "12", title: "Líder de Grupo", description: "Criar e gerenciar um grupo ativo", icon: "👑", xp: 300, category: "Social", unlocked: false },
];

const categories = ["Todas", "Geral", "Atividades", "Social", "Streak", "Desafios"];

const AchievementsPage = () => {
  const [filter, setFilter] = useState("Todas");
  const [sharePreview, setSharePreview] = useState<Achievement | null>(null);

  const filtered = filter === "Todas" ? achievements : achievements.filter(a => a.category === filter);
  const unlocked = achievements.filter(a => a.unlocked).length;
  const totalXp = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);

  const handleShare = (a: Achievement) => {
    setSharePreview(a);
  };

  const shareToSocial = (platform: string) => {
    toast.success(`Compartilhado no ${platform}! 🎉`);
    setSharePreview(null);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold flex items-center gap-2">
              <Trophy className="w-7 h-7 text-accent" /> Conquistas
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Desbloqueie conquistas completando atividades e interagindo</p>
          </div>
          <div className="flex gap-3">
            <div className="pato-card p-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold">{unlocked}/{achievements.length}</span>
            </div>
            <div className="pato-card p-3 flex items-center gap-2 border-primary/30">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">+{totalXp} XP</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={cn("tag-pill py-2 px-4 text-sm font-medium transition-all whitespace-nowrap", filter === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filtered.map((a, i) => (
            <div key={a.id} className={cn("pato-card p-5 text-center transition-all animate-fade-in relative overflow-hidden group", a.unlocked ? "border-accent/30 hover:border-accent/60" : "opacity-75 hover:opacity-100")} style={{ animationDelay: `${i * 50}ms` }}>
              {a.unlocked && (
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <button onClick={() => handleShare(a)} className="p-1.5 rounded-lg hover:bg-muted transition-colors opacity-0 group-hover:opacity-100" title="Compartilhar">
                    <Share2 className="w-3.5 h-3.5 text-primary" />
                  </button>
                  <span className="tag-pill bg-success/15 text-success text-[10px] font-bold">Desbloqueado</span>
                </div>
              )}
              {!a.unlocked && <div className="absolute top-2 right-2"><Lock className="w-4 h-4 text-muted-foreground" /></div>}
              <span className={cn("text-4xl block mb-3", !a.unlocked && "grayscale opacity-50")}>{a.icon}</span>
              <h3 className="font-display font-bold text-sm mb-1">{a.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{a.description}</p>
              {a.progress && !a.unlocked && (
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>Progresso</span><span>{a.progress.current}/{a.progress.total}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(a.progress.current / a.progress.total) * 100}%` }} />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center gap-2">
                <span className="tag-pill bg-primary/15 text-primary text-[10px] font-bold">+{a.xp} XP</span>
                <span className="tag-pill bg-muted text-muted-foreground text-[10px]">{a.category}</span>
              </div>
              {a.unlocked && a.unlockedDate && <p className="text-[10px] text-muted-foreground mt-2">{a.unlockedDate}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Share Preview Modal */}
      {sharePreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSharePreview(null)}>
          <div className="bg-card rounded-2xl border border-border shadow-2xl max-w-sm w-full p-6 animate-fade-in" onClick={e => e.stopPropagation()}>
            {/* Preview card */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-6 text-center mb-4">
              <span className="text-5xl block mb-3">{sharePreview.icon}</span>
              <h3 className="font-display font-bold text-lg">{sharePreview.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{sharePreview.description}</p>
              <p className="text-[10px] text-muted-foreground mt-2">🦆 Pato App • +{sharePreview.xp} XP</p>
            </div>
            <h4 className="font-display font-semibold text-sm mb-3">Compartilhar em:</h4>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => shareToSocial("Instagram Stories")} className="pato-btn-bounce flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-sm font-medium hover:shadow-md transition-all">
                📸 Instagram
              </button>
              <button onClick={() => shareToSocial("Twitter/X")} className="pato-btn-bounce flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-muted/50 text-sm font-medium hover:shadow-md transition-all">
                🐦 Twitter/X
              </button>
              <button onClick={() => shareToSocial("WhatsApp")} className="pato-btn-bounce flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-success/10 text-sm font-medium hover:shadow-md transition-all">
                💬 WhatsApp
              </button>
              <button onClick={() => shareToSocial("Link copiado")} className="pato-btn-bounce flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-muted/50 text-sm font-medium hover:shadow-md transition-all">
                🔗 Copiar link
              </button>
            </div>
            <button onClick={() => setSharePreview(null)} className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default AchievementsPage;
