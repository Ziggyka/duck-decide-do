import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

const categories = ["Itens de Pré-Sorteio", "Itens de Corrida", "Itens Especiais"];

const items: Record<string, Array<{ name: string; icon: string; desc: string; qty: number; rarity: string }>> = {
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
  "Raro": "bg-accent/15 text-accent",
  "Épico": "bg-primary/15 text-primary-foreground",
  "Lendário": "bg-streak/15 text-streak",
};

const InventoryPage = () => {
  const [selectedCat, setSelectedCat] = useState("Itens de Corrida");

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-5">
        <h1 className="text-2xl">Inventário</h1>

        {/* Category tabs */}
        <div className="flex gap-2">
          {categories.map((c) => (
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

        {/* Items Grid */}
        <div className="grid grid-cols-4 gap-3 animate-fade-in">
          {items[selectedCat]?.map((item) => (
            <div key={item.name} className="item-card group">
              <span className="text-4xl group-hover:animate-float">{item.icon}</span>
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
    </AppLayout>
  );
};

export default InventoryPage;
