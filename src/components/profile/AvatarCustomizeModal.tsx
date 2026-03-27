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

const skins = [
  { id: "classic", label: "Pato Clássico", color: "bg-accent", filter: "none" },
  { id: "pink", label: "Pato Rosa", color: "bg-primary", filter: "hue-rotate(280deg) saturate(1.3)" },
  { id: "blue", label: "Pato Oceano", color: "hsl(210, 70%, 55%)", filter: "hue-rotate(180deg) saturate(1.2)" },
  { id: "green", label: "Pato Selva", color: "hsl(142, 60%, 50%)", filter: "hue-rotate(100deg) saturate(1.1)" },
  { id: "purple", label: "Pato Galáxia", color: "hsl(280, 70%, 55%)", filter: "hue-rotate(240deg) saturate(1.4)" },
  { id: "gold", label: "Pato Dourado", color: "hsl(46, 100%, 50%)", filter: "sepia(0.6) saturate(2) brightness(1.1)" },
  { id: "red", label: "Pato Fogo", color: "hsl(0, 80%, 55%)", filter: "hue-rotate(330deg) saturate(1.5)" },
  { id: "teal", label: "Pato Cristal", color: "hsl(180, 60%, 45%)", filter: "hue-rotate(150deg) saturate(1.2) brightness(1.05)" },
];

const colorMap: Record<string, string> = {
  classic: "hsl(46, 100%, 49%)",
  pink: "hsl(316, 100%, 45%)",
  blue: "hsl(210, 70%, 55%)",
  green: "hsl(142, 60%, 50%)",
  purple: "hsl(280, 70%, 55%)",
  gold: "hsl(46, 100%, 50%)",
  red: "hsl(0, 80%, 55%)",
  teal: "hsl(180, 60%, 45%)",
};

const duckPresets = [
  { id: "1", src: duckAvatar1 },
  { id: "2", src: duckAvatar2 },
  { id: "3", src: duckAvatar3 },
];

const AvatarCustomizeModal = ({ open, onClose, currentAvatar, onSave }: AvatarCustomizeModalProps) => {
  const [mode, setMode] = useState<"choose" | "photo" | "customize">("choose");
  const [selectedPreset, setSelectedPreset] = useState(currentAvatar);
  const [selectedSkin, setSelectedSkin] = useState("classic");

  const currentSkin = skins.find(s => s.id === selectedSkin);

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
            <button onClick={() => setMode("photo")} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Enviar foto</p>
                <p className="text-xs text-muted-foreground">Faça upload de uma imagem</p>
              </div>
            </button>
            <button onClick={() => setMode("customize")} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-accent/50 hover:bg-accent/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">Personalizar Pato 🦆</p>
                <p className="text-xs text-muted-foreground">Escolha a cor do seu pato de borracha</p>
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
              <button onClick={() => setMode("choose")} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">Voltar</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold pato-btn-bounce">Salvar</button>
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
          <DialogTitle className="font-display text-xl">🦆 Personalizar Pato de Borracha</DialogTitle>
          <DialogDescription>Escolha o modelo e a cor do seu pato</DialogDescription>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {/* Preview */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl border-4 border-primary glow-duck overflow-hidden flex items-center justify-center" style={{ backgroundColor: colorMap[selectedSkin] + "33" }}>
                <img
                  src={selectedPreset}
                  alt="Duck preview"
                  className="w-28 h-28 object-cover rounded-xl"
                  style={{ filter: currentSkin?.filter || "none" }}
                />
              </div>
            </div>
            <p className="text-sm font-display font-semibold text-primary">{currentSkin?.label}</p>
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

          {/* Skins/Colors */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-3">COR / SKIN</p>
            <div className="grid grid-cols-4 gap-2">
              {skins.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSkin(s.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                    selectedSkin === s.id ? "border-primary bg-primary/10 shadow-sm" : "border-border hover:border-primary/30 hover:bg-muted/50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full border-2 transition-all" style={{ backgroundColor: colorMap[s.id], borderColor: selectedSkin === s.id ? "hsl(var(--foreground))" : "transparent" }} />
                  <span className="text-[10px] font-medium text-center leading-tight">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => setMode("choose")} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors">Voltar</button>
            <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold pato-btn-bounce">Salvar Avatar 🦆</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCustomizeModal;
