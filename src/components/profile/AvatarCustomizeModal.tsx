import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Camera, Upload, Sparkles, Check } from "lucide-react";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

interface AvatarCustomizeModalProps {
  open: boolean;
  onClose: () => void;
  currentAvatar: string;
  onSave: (avatarUrl: string) => void;
}

const accessories = [
  { id: "none", label: "Nenhum", emoji: "🚫" },
  { id: "sunglasses", label: "Óculos de sol", emoji: "🕶️" },
  { id: "tophat", label: "Cartola", emoji: "🎩" },
  { id: "crown", label: "Coroa", emoji: "👑" },
  { id: "headphones", label: "Fones", emoji: "🎧" },
  { id: "cap", label: "Boné", emoji: "🧢" },
  { id: "bow", label: "Gravata", emoji: "🎀" },
  { id: "star", label: "Estrela", emoji: "⭐" },
];

const skins = [
  { id: "classic", label: "Clássico", color: "bg-accent" },
  { id: "pink", label: "Rosa", color: "bg-primary" },
  { id: "blue", label: "Azul", color: "bg-blue-400" },
  { id: "green", label: "Verde", color: "bg-emerald-400" },
  { id: "purple", label: "Roxo", color: "bg-purple-400" },
  { id: "gold", label: "Dourado", color: "bg-yellow-500" },
];

const duckPresets = [
  { id: "1", src: duckAvatar1 },
  { id: "2", src: duckAvatar2 },
  { id: "3", src: duckAvatar3 },
];

const AvatarCustomizeModal = ({ open, onClose, currentAvatar, onSave }: AvatarCustomizeModalProps) => {
  const [mode, setMode] = useState<"choose" | "photo" | "customize">("choose");
  const [selectedPreset, setSelectedPreset] = useState(currentAvatar);
  const [selectedAccessory, setSelectedAccessory] = useState("none");
  const [selectedSkin, setSelectedSkin] = useState("classic");

  const handleSave = () => {
    onSave(selectedPreset);
    onClose();
  };

  if (mode === "choose") {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Alterar Avatar</DialogTitle>
            <DialogDescription>Escolha como personalizar seu avatar</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setMode("photo")}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Enviar foto</p>
                <p className="text-xs text-muted-foreground">Faça upload de uma imagem</p>
              </div>
            </button>
            <button
              onClick={() => setMode("customize")}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Personalizar Pato 🦆</p>
                <p className="text-xs text-muted-foreground">Crie seu avatar de pato único</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (mode === "photo") {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">📸 Enviar Foto</DialogTitle>
            <DialogDescription>Escolha uma imagem para usar como avatar</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Camera className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Clique para enviar</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setMode("choose")} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
                Voltar
              </button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold pato-btn-bounce">
                Salvar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">🦆 Personalizar Pato</DialogTitle>
          <DialogDescription>Monte seu pato único com acessórios e cores</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={selectedPreset}
                alt="Duck preview"
                className="w-28 h-28 rounded-2xl border-4 border-primary glow-duck bg-duck-yellow-light object-cover"
              />
              {selectedAccessory !== "none" && (
                <span className="absolute -top-2 -right-2 text-2xl">
                  {accessories.find(a => a.id === selectedAccessory)?.emoji}
                </span>
              )}
            </div>
          </div>

          {/* Preset selection */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">MODELO BASE</p>
            <div className="flex gap-3 justify-center">
              {duckPresets.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedPreset(d.src)}
                  className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden transition-all ${
                    selectedPreset === d.src ? "border-primary glow-duck" : "border-border hover:border-primary/30"
                  }`}
                >
                  <img src={d.src} alt="" className="w-full h-full object-cover bg-duck-yellow-light" />
                  {selectedPreset === d.src && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">ACESSÓRIOS</p>
            <div className="grid grid-cols-4 gap-2">
              {accessories.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAccessory(a.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-center ${
                    selectedAccessory === a.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="text-lg">{a.emoji}</span>
                  <span className="text-[10px] text-muted-foreground">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skins */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">COR / SKIN</p>
            <div className="flex gap-2 justify-center">
              {skins.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSkin(s.id)}
                  className={`w-8 h-8 rounded-full ${s.color} border-2 transition-all ${
                    selectedSkin === s.id ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                  }`}
                  title={s.label}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => setMode("choose")} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">
              Voltar
            </button>
            <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold pato-btn-bounce">
              Salvar Avatar 🦆
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCustomizeModal;
