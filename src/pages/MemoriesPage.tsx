import { Camera, Star, Users } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const memories = [
  { date: "Mar 2025", title: "Noite de Pizza", participants: ["QuackMaster", "DuckSlayer", "QuackQueen"], rating: 5, desc: "Melhor pizza da cidade com a turma toda!" },
  { date: "Fev 2025", title: "Maratona Harry Potter", participants: ["QuackMaster", "PatoNinja"], rating: 5, desc: "24h de magia pura ✨" },
  { date: "Jan 2025", title: "Board Game Night", participants: ["QuackMaster", "DuckSlayer", "DuckMaster", "QuackQueen"], rating: 4, desc: "Catan ficou épico!" },
  { date: "Dez 2024", title: "Ano Novo na Praia", participants: ["QuackMaster", "DuckSlayer", "PatoNinja"], rating: 5, desc: "Fogos de artifício e muita diversão 🎆" },
  { date: "Nov 2024", title: "Escape Room VR", participants: ["QuackMaster", "QuackQueen"], rating: 4, desc: "Quase ficamos presos! 😂" },
];

const MemoriesPage = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Memórias</h1>
          <button className="pato-btn-bounce tag-pill text-sm py-2 px-4 bg-primary text-primary-foreground font-semibold">
            📦 Cápsula do Tempo
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {memories.map((m, i) => (
              <div key={i} className="relative pl-16 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                {/* Dot */}
                <div className="absolute left-[18px] top-4 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                {/* Date */}
                <span className="absolute left-0 top-4 text-[10px] font-bold text-muted-foreground -translate-x-full pr-6 hidden" />

                <div className="pato-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="tag-pill bg-muted text-muted-foreground text-xs">{m.date}</span>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3 h-3 ${s <= m.rating ? "fill-primary text-primary" : "text-muted"}`} />
                      ))}
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-1">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
                  
                  {/* Photo placeholder */}
                  <div className="h-32 rounded-xl bg-muted/50 flex items-center justify-center mb-3">
                    <Camera className="w-8 h-8 text-muted-foreground/50" />
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{m.participants.join(", ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MemoriesPage;
