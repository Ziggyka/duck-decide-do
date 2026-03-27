import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = ["Cinema", "Jogos", "Música", "Esportes", "Culinária", "Viagens", "Anime", "Tech", "Geral"];

const CreateGroupModal = ({ open, onClose }: CreateGroupModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [category, setCategory] = useState("Geral");

  const handleCreate = () => {
    if (!name.trim()) { toast.error("Dê um nome ao grupo!"); return; }
    toast.success(`Grupo "${name}" criado com sucesso! 🦆`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">🦆 Criar Grupo</DialogTitle>
          <DialogDescription>Configure seu novo grupo</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Nome do grupo</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Turma do Cinema" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Do que é esse grupo?" className="rounded-xl resize-none" rows={3} />
          </div>
          <div className="space-y-2">
            <Label>Tipo</Label>
            <div className="flex gap-2">
              <button onClick={() => setIsPublic(true)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${isPublic ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}>
                🌐 Público
              </button>
              <button onClick={() => setIsPublic(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${!isPublic ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}>
                🔒 Privado
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`tag-pill py-1.5 px-3 text-xs transition-all ${category === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleCreate} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm pato-btn-bounce">
            Criar Grupo 🎉
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
