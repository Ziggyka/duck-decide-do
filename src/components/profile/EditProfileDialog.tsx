import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Pencil } from "lucide-react";

interface ProfileData {
  name: string;
  bio: string;
  avatarUrl: string;
}

interface EditProfileDialogProps {
  profile: ProfileData;
  onSave: (data: ProfileData) => void;
}

const EditProfileDialog = ({ profile, onSave }: EditProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);

  const handleSave = () => {
    onSave({ name, bio, avatarUrl });
    setOpen(false);
  };

  const handlePhotoChange = () => {
    // Placeholder: in production, this would open a file picker
    const url = prompt("Cole a URL da nova foto de perfil:");
    if (url) setAvatarUrl(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer" onClick={handlePhotoChange}>
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-24 h-24 rounded-2xl bg-duck-yellow-light border-4 border-primary object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Clique para trocar a foto</p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome de usuário</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome de usuário"
              className="rounded-xl border-border bg-muted/50"
            />
          </div>

          {/* Bio */}
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

          {/* Save */}
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Salvar alterações
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
