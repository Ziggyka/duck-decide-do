import { useState } from "react";
import { Zap, Wind, Magnet, Droplets, Bomb } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

const modes = [
  { name: "Roleta", emoji: "🎰", desc: "Gire a roleta e descubra" },
  { name: "Corrida de Patos", emoji: "🏁", desc: "Corrida com sabotagens!", active: true },
  { name: "Torneio", emoji: "⚔️", desc: "Eliminatórias 1v1" },
  { name: "Modo Veto", emoji: "🚫", desc: "Elimine até sobrar um" },
  { name: "Surpresa", emoji: "🎁", desc: "Aleatório total" },
];

const raceItems = [
  { name: "Banana", icon: "🍌", qty: 3 },
  { name: "Ímã", icon: "🧲", qty: 2 },
  { name: "Bomba d'Água", icon: "💣", qty: 1 },
  { name: "Ventania", icon: "🌪️", qty: 2 },
  { name: "Skate Turbo", icon: "🛹", qty: 1 },
  { name: "Bola de Lama", icon: "🟤", qty: 2 },
  { name: "Inversão", icon: "🔄", qty: 1 },
];

const racers = [
  { name: "Interstellar", avatar: duckAvatar1, progress: 75, user: "QuackMaster" },
  { name: "Catan", avatar: duckAvatar2, progress: 60, user: "DuckSlayer" },
  { name: "Sushi Leblon", avatar: duckAvatar3, progress: 85, user: "QuackQueen" },
  { name: "Escape Room", avatar: duckAvatar2, progress: 40, user: "PatoNinja" },
];

const DrawPage = () => {
  const [selectedMode, setSelectedMode] = useState("Corrida de Patos");

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl">Sistema de Sorteio</h1>

        {/* Mode Selection */}
        <div className="grid grid-cols-5 gap-3">
          {modes.map((m) => (
            <button
              key={m.name}
              onClick={() => setSelectedMode(m.name)}
              className={`pato-card text-center pato-btn-bounce p-4 ${
                selectedMode === m.name ? "border-primary glow-duck" : ""
              }`}
            >
              <span className="text-3xl block mb-2">{m.emoji}</span>
              <p className="font-display font-semibold text-sm">{m.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
            </button>
          ))}
        </div>

        {selectedMode === "Corrida de Patos" && (
          <div className="flex gap-4">
            {/* Race Track */}
            <div className="flex-1 pato-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold">🏁 Corrida de Patos</h2>
                <button className="pato-btn-bounce bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold">
                  Iniciar Corrida!
                </button>
              </div>

              {/* Race Lanes */}
              <div className="space-y-4">
                {racers.map((r, i) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                    <img src={r.avatar} alt="" className="w-10 h-10 rounded-full bg-duck-yellow-light border-2 border-border flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold">{r.name}</span>
                        <span className="text-muted-foreground">{r.user}</span>
                      </div>
                      <div className="h-8 rounded-full bg-muted relative overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-duck-yellow-dark transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                          style={{ width: `${r.progress}%` }}
                        >
                          <span className="text-xs font-bold">🦆</span>
                        </div>
                        {/* Finish line */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-foreground/20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Panel */}
            <div className="w-64 space-y-4">
              {/* Participants */}
              <div className="pato-card">
                <h3 className="font-display text-sm font-semibold mb-3">Participantes</h3>
                <div className="space-y-2">
                  {racers.map(r => (
                    <div key={r.name} className="flex items-center gap-2 text-sm">
                      <img src={r.avatar} alt="" className="w-6 h-6 rounded-full bg-duck-yellow-light" />
                      <span className="truncate">{r.user}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div className="pato-card">
                <h3 className="font-display text-sm font-semibold mb-3">🎒 Itens</h3>
                <div className="grid grid-cols-2 gap-2">
                  {raceItems.map((item) => (
                    <button
                      key={item.name}
                      className="item-card p-3 pato-btn-bounce"
                      title={item.name}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[10px] font-medium text-muted-foreground">{item.name}</span>
                      <span className="tag-pill bg-muted text-muted-foreground text-[10px]">x{item.qty}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DrawPage;
