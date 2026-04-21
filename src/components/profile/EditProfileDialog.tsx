import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import duckAvatar1 from "@/assets/duck-avatar-1.png";

const EditProfileDialog = () => {
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile?.display_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [saving, setSaving] = useState(false);

  const handleOpen = (o: boolean) => {
    if (o) {
      setName(profile?.display_name || "");
      setBio(profile?.bio || "");
      setAvatarUrl(profile?.avatar_url || "");
    }
    setOpen(o);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile({
      display_name: name.trim() || null,
      bio: bio.trim() || null,
      avatar_url: avatarUrl.trim() || null,
    });
    setSaving(false);
    if (error) toast.error("Erro ao salvar perfil");
    else { toast.success("Perfil atualizado! 🦆"); setOpen(false); }
  };

  const handlePhotoChange = () => {
    const url = prompt("Cole a URL da nova foto de perfil:");
    if (url) setAvatarUrl(url);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <button className="pato-btn-bounce flex items-center gap-2 border border-border px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
          <Pencil className="w-4 h-4" />
          Editar Perfil
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Editar Perfil</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer" onClick={handlePhotoChange}>
              <img
                src={avatarUrl || duckAvatar1}
                alt="avatar"
                className="w-24 h-24 rounded-2xl bg-duck-yellow-light border-4 border-primary object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Clique para trocar a foto</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome de exibição</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="rounded-xl border-border bg-muted/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-bio">Bio</Label>
            <Textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você..."
              className="rounded-xl border-border bg-muted/50 resize-none"
              rows={3}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Salvar alterações
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
