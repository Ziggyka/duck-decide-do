import { useState } from "react";
import { Package } from "lucide-react";
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

const inventoryCategories = ["Itens de Pré-Sorteio", "Itens de Corrida", "Itens Especiais"];

const inventoryItems: Record<string, Array<{ name: string; icon: string; desc: string; qty: number; rarity: string }>> = {
  "Itens de Pré-Sorteio": [
    { name: "Carta de Veto", icon: "🚫", desc: "Remove uma opção antes do sorteio", qty: 3, rarity: "Comum" },
    { name: "Duplicador", icon: "✨", desc: "Dobra suas chances na roleta", qty: 1, rarity: "Raro" },
    { name: "Espião", icon: "🕵️", desc: "Veja o que os outros votaram", qty: 2, rarity: "Comum" },
    { name: "Curinga", icon: "🃏", desc: "Adiciona opção surpresa", qty: 1, rarity: "Épico" },
  ],
  "Itens de Corrida": [
    { name: "Banana", icon: "🍌", desc: "Atrasa o pato da frente", qty: 5, rarity: "Comum" },
    { name: "Ímã", icon: "🧲", desc: "Puxa seu pato para frente", qty: 3, rarity: "Raro" },
    { name: "Bomba d'Água", icon: "💣", desc: "Atrasa todos os patos", qty: 1, rarity: "Épico" },
    { name: "Ventania", icon: "🌪️", desc: "Empurra patos aleatórios", qty: 2, rarity: "Comum" },
    { name: "Skate Turbo", icon: "🛹", desc: "Boost de velocidade", qty: 1, rarity: "Raro" },
    { name: "Bola de Lama", icon: "🟤", desc: "Reduz visão de um oponente", qty: 4, rarity: "Comum" },
    { name: "Inversão", icon: "🔄", desc: "Inverte posições 1º e último", qty: 1, rarity: "Lendário" },
  ],
  "Itens Especiais": [
    { name: "Passe VIP", icon: "🎫", desc: "Acessa sorteios exclusivos", qty: 1, rarity: "Lendário" },
    { name: "Escudo", icon: "🛡️", desc: "Protege de um item inimigo", qty: 2, rarity: "Épico" },
    { name: "Poção XP", icon: "🧪", desc: "+50% XP por 24h", qty: 1, rarity: "Raro" },
  ],
};

const rarityColor: Record<string, string> = {
  "Comum": "bg-muted text-muted-foreground",
  "Raro": "bg-accent/15 text-accent-foreground",
  "Épico": "bg-primary/15 text-primary",
  "Lendário": "bg-destructive/15 text-destructive",
};

const DrawPage = () => {
  const [selectedMode, setSelectedMode] = useState("Corrida de Patos");
  const [activeTab, setActiveTab] = useState<"sorteio" | "inventario">("sorteio");
  const [selectedCat, setSelectedCat] = useState("Itens de Corrida");

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Tab toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab("sorteio")}
            className={`font-display text-2xl font-bold transition-colors ${activeTab === "sorteio" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Sistema de Sorteio
          </button>
          <span className="text-muted-foreground/30">|</span>
          <button
            onClick={() => setActiveTab("inventario")}
            className={`flex items-center gap-2 font-display text-2xl font-bold transition-colors ${activeTab === "inventario" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Package className="w-6 h-6" />
            Inventário
          </button>
        </div>

        {activeTab === "sorteio" && (
          <>
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

                  <div className="space-y-4">
                    {racers.map((r, i) => (
                      <div key={r.name} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}</span>
                        <img src={r.avatar} alt="" className="w-10 h-10 rounded-full bg-muted border-2 border-border flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold">{r.name}</span>
                            <span className="text-muted-foreground">{r.user}</span>
                          </div>
                          <div className="h-8 rounded-full bg-muted relative overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                              style={{ width: `${r.progress}%` }}
                            >
                              <span className="text-xs font-bold">🦆</span>
                            </div>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-foreground/20" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Side Panel */}
                <div className="w-64 space-y-4">
                  <div className="pato-card">
                    <h3 className="font-display text-sm font-semibold mb-3">Participantes</h3>
                    <div className="space-y-2">
                      {racers.map(r => (
                        <div key={r.name} className="flex items-center gap-2 text-sm">
                          <img src={r.avatar} alt="" className="w-6 h-6 rounded-full bg-muted" />
                          <span className="truncate">{r.user}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pato-card">
                    <h3 className="font-display text-sm font-semibold mb-3">🎒 Itens</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {raceItems.map((item) => (
                        <button key={item.name} className="item-card p-3 pato-btn-bounce" title={item.name}>
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
          </>
        )}

        {activeTab === "inventario" && (
          <div className="space-y-5 animate-fade-in">
            {/* Category tabs */}
            <div className="flex gap-2">
              {inventoryCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCat(c)}
                  className={`tag-pill text-sm py-2 px-5 pato-btn-bounce ${
                    selectedCat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-3">
              {inventoryItems[selectedCat]?.map((item) => (
                <div key={item.name} className="item-card group">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <p className="font-display font-semibold text-sm text-center">{item.name}</p>
                  <p className="text-xs text-muted-foreground text-center">{item.desc}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`tag-pill text-[10px] ${rarityColor[item.rarity]}`}>{item.rarity}</span>
                    <span className="text-xs font-bold text-muted-foreground">x{item.qty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DrawPage;
