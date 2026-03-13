import { useState } from "react";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const rankCategories = ["Mais Atividades", "Mais Avaliações", "Presença em Grupos", "Prêmios Mensais"];

const rankings = [
  { rank: 1, user: "QuackMaster", avatar: duckAvatar1, score: 142, level: 24, medal: "🥇" },
  { rank: 2, user: "QuackQueen", avatar: duckAvatar3, score: 128, level: 22, medal: "🥈" },
  { rank: 3, user: "DuckSlayer", avatar: duckAvatar2, score: 115, level: 18, medal: "🥉" },
  { rank: 4, user: "DuckMaster", avatar: duckAvatar3, score: 98, level: 30, medal: "" },
  { rank: 5, user: "PatoNinja", avatar: duckAvatar2, score: 87, level: 15, medal: "" },
  { rank: 6, user: "QuackLord", avatar: duckAvatar1, score: 72, level: 12, medal: "" },
  { rank: 7, user: "DuckKnight", avatar: duckAvatar3, score: 65, level: 10, medal: "" },
  { rank: 8, user: "PatoVoador", avatar: duckAvatar2, score: 54, level: 9, medal: "" },
];

const RankingPage = () => {
  const [selectedCat, setSelectedCat] = useState("Mais Atividades");

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-primary" />
          <h1 className="text-2xl">Ranking</h1>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap">
          {rankCategories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`tag-pill text-sm py-2 px-4 pato-btn-bounce ${
                selectedCat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 py-6">
          {[rankings[1], rankings[0], rankings[2]].map((r, i) => {
            const heights = ["h-28", "h-36", "h-24"];
            const sizes = ["w-14 h-14", "w-18 h-18", "w-14 h-14"];
            return (
              <div key={r.user} className="flex flex-col items-center">
                <img src={r.avatar} alt="" className={`${i === 1 ? "w-20 h-20" : "w-14 h-14"} rounded-full bg-duck-yellow-light border-4 ${i === 1 ? "border-primary glow-duck" : "border-border"} mb-2`} />
                <span className="text-2xl">{r.medal}</span>
                <p className="font-display font-bold text-sm">{r.user}</p>
                <p className="text-xs text-muted-foreground">{r.score} pts</p>
                <div className={`${heights[i]} w-24 mt-2 rounded-t-xl ${i === 1 ? "bg-primary/20" : "bg-muted"} flex items-end justify-center pb-2`}>
                  <span className="font-display font-bold text-lg text-muted-foreground">#{r.rank}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="space-y-2">
          {rankings.slice(3).map((r, i) => (
            <div key={r.user} className="pato-card flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="font-display font-bold text-lg text-muted-foreground w-8 text-center">#{r.rank}</span>
              <img src={r.avatar} alt="" className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{r.user}</p>
                <p className="text-xs text-muted-foreground">Nível {r.level}</p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="font-display font-bold text-sm">{r.score}</span>
                <span className="text-xs text-muted-foreground">pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default RankingPage;
