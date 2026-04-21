import { useState } from "react";
import {
  X, Calendar, Users, Tag, Send, Save, Sparkles,
  Search as SearchIcon, Check, Plus, Star, ListChecks, UserCheck
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { useQuacks, type Quack } from "@/hooks/useQuacks";
import { toast } from "sonner";

const categories = [
  { value: "anime", label: "Anime", emoji: "🎌" },
  { value: "estudo", label: "Estudo", emoji: "📚" },
  { value: "fitness", label: "Fitness", emoji: "💪" },
  { value: "filmes", label: "Filmes", emoji: "🎬" },
  { value: "jogos", label: "Jogos", emoji: "🎮" },
  { value: "musica", label: "Música", emoji: "🎵" },
  { value: "culinaria", label: "Culinária", emoji: "🍳" },
  { value: "trabalho", label: "Trabalho", emoji: "💼" },
  { value: "role", label: "Rolê", emoji: "🎉" },
  { value: "outro", label: "Outro", emoji: "🦆" },
];

const fakeFriends = [
  { id: 1, name: "DuckSlayer", username: "@duckslayer" },
  { id: 2, name: "QuackQueen", username: "@quackqueen" },
  { id: 3, name: "PatoNinja", username: "@patoninja" },
  { id: 4, name: "DuckMaster", username: "@duckmaster" },
  { id: 5, name: "PatoGamer", username: "@patogamer" },
];

export type QuackStatus = "quero_fazer" | "fazendo" | "feito";

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

interface CreateQuackModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (quack: Quack) => void;
  editingQuack?: Quack | null;
}

// Re-export for legacy imports
export type QuackData = Quack;

const statusOptions: { value: QuackStatus; label: string; emoji: string; color: string }[] = [
  { value: "quero_fazer", label: "Quero fazer", emoji: "📌", color: "bg-primary/15 text-primary border-primary/30" },
  { value: "fazendo", label: "Fazendo", emoji: "⏳", color: "bg-accent/15 text-accent-foreground border-accent/30" },
  { value: "feito", label: "Feito", emoji: "✅", color: "bg-success/15 text-success border-success/30" },
];

const CreateQuackModal = ({ open, onClose, onCreated, editingQuack }: CreateQuackModalProps) => {
  const { createQuack, updateQuack } = useQuacks("self");
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(editingQuack?.title || "");
  const [description, setDescription] = useState(editingQuack?.description || "");
  const [category, setCategory] = useState(editingQuack?.category || "");
  const [tags, setTags] = useState<string[]>(editingQuack?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<QuackStatus>(editingQuack?.status || "quero_fazer");
  const [rating, setRating] = useState(editingQuack?.rating || 0);
  const [startDate, setStartDate] = useState<Date | undefined>(editingQuack?.start_date ? new Date(editingQuack.start_date) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(editingQuack?.end_date ? new Date(editingQuack.end_date) : undefined);
  const [taggedFriends, setTaggedFriends] = useState<typeof fakeFriends>((editingQuack?.tagged_friends as typeof fakeFriends) || []);
  const [responsiblePeople, setResponsiblePeople] = useState<typeof fakeFriends>((editingQuack?.responsible_people as typeof fakeFriends) || []);
  const [checklist, setChecklist] = useState<ChecklistItem[]>((editingQuack?.checklist as ChecklistItem[]) || []);
  const [checklistInput, setChecklistInput] = useState("");
  const [friendSearch, setFriendSearch] = useState("");
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [friendPickerMode, setFriendPickerMode] = useState<"tag" | "responsible">("tag");
  const [hoverRating, setHoverRating] = useState(0);

  const filteredFriends = fakeFriends.filter(
    (f) => {
      const alreadySelected = friendPickerMode === "tag"
        ? taggedFriends.find((tf) => tf.id === f.id)
        : responsiblePeople.find((tf) => tf.id === f.id);
      return !alreadySelected &&
        (f.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
          f.username.toLowerCase().includes(friendSearch.toLowerCase()));
    }
  );

  const handleAddTag = () => {
    const cleaned = tagInput.trim().replace(/^#/, "");
    if (cleaned && !tags.includes(cleaned)) {
      setTags([...tags, cleaned]);
    }
    setTagInput("");
  };

  const handleAddChecklistItem = () => {
    if (!checklistInput.trim()) return;
    setChecklist([...checklist, { id: crypto.randomUUID(), text: checklistInput.trim(), done: false }]);
    setChecklistInput("");
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const removeChecklistItem = (id: string) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const handleSave = async (saveStatus?: QuackStatus) => {
    if (!title.trim()) {
      toast.error("Adicione um título");
      return;
    }
    if (saving) return;
    setSaving(true);
    const finalStatus = saveStatus || status;
    const payload = {
      title,
      description,
      category,
      tags,
      status: finalStatus,
      rating: finalStatus === "feito" ? rating : 0,
      tagged_friends: taggedFriends,
      responsible_people: responsiblePeople,
      checklist,
      start_date: startDate ? startDate.toISOString().slice(0, 10) : null,
      end_date: endDate ? endDate.toISOString().slice(0, 10) : null,
      progress: finalStatus === "feito" ? 100 : finalStatus === "fazendo" ? 50 : 0,
    };
    try {
      if (editingQuack) {
        const { data, error } = await updateQuack(editingQuack.id, payload);
        if (error) throw error;
        toast.success("Quack atualizado! ✨");
        if (data) onCreated?.(data as unknown as Quack);
      } else {
        const { data, error } = await createQuack(payload);
        if (error) throw error;
        toast.success("Quack publicado! 🦆🎉");
        if (data) onCreated?.(data as unknown as Quack);
      }
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const openFriendPicker = (mode: "tag" | "responsible") => {
    setFriendPickerMode(mode);
    setShowFriendPicker(true);
    setFriendSearch("");
  };

  const addFriend = (f: typeof fakeFriends[0]) => {
    if (friendPickerMode === "tag") {
      setTaggedFriends([...taggedFriends, f]);
    } else {
      setResponsiblePeople([...responsiblePeople, f]);
    }
    setFriendSearch("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto bg-card rounded-3xl border border-border shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-card rounded-t-3xl border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-bold">{editingQuack ? "Editar Quack" : "Novo Quack"}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">🦆 Título da atividade</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Frieren, Treino na academia, Estudar React..."
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">Descrição detalhada</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o que está rolando..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground resize-none transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> Categoria
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "pato-btn-bounce tag-pill py-2 px-4 text-sm border transition-all",
                    category === cat.value
                      ? "bg-primary text-primary-foreground border-primary shadow-md"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  <span className="mr-1">{cat.emoji}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">🏷️ Tags</label>
            <div className="flex gap-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                placeholder="#fantasia, #shounen..."
                className="flex-1 px-4 py-2.5 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={handleAddTag} className="px-3 py-2 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <span key={tag} className="tag-pill bg-primary/10 text-primary flex items-center gap-1 py-1 px-3">
                    #{tag}
                    <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">📊 Status</label>
            <div className="flex gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-sm font-semibold border transition-all",
                    status === opt.value ? opt.color : "bg-card border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Star Rating (only when status = feito) */}
          {status === "feito" && (
            <div className="animate-fade-in">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">⭐ Avaliação</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125"
                  >
                    <Star className={cn("w-7 h-7 transition-colors",
                      s <= (hoverRating || rating) ? "fill-accent text-accent" : "text-muted"
                    )} />
                  </button>
                ))}
                {rating > 0 && <span className="ml-2 text-sm font-bold text-accent self-center">{rating}/5</span>}
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Início
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full px-4 py-2.5 rounded-2xl border border-border bg-background text-sm text-left hover:border-primary/50 transition-colors">
                    {startDate ? format(startDate, "dd/MM/yyyy") : "Selecionar data"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarPicker mode="single" selected={startDate} onSelect={setStartDate} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Final
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full px-4 py-2.5 rounded-2xl border border-border bg-background text-sm text-left hover:border-primary/50 transition-colors">
                    {endDate ? format(endDate, "dd/MM/yyyy") : "Selecionar data"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarPicker mode="single" selected={endDate} onSelect={setEndDate} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Tagged Friends */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Marcar amigos
            </label>
            {taggedFriends.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {taggedFriends.map((f) => (
                  <span key={f.id} className="tag-pill bg-primary/15 text-primary flex items-center gap-1 py-1 px-3">
                    🦆 {f.name}
                    <button onClick={() => setTaggedFriends(taggedFriends.filter((tf) => tf.id !== f.id))} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <button onClick={() => openFriendPicker("tag")} className="pato-btn-bounce flex items-center gap-2 px-4 py-2 rounded-2xl border border-dashed border-primary/40 text-primary text-sm hover:bg-primary/5 transition-colors">
              <Plus className="w-4 h-4" /> Marcar amigo
            </button>
          </div>

          {/* Responsible People */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" /> Participantes 
            </label>
            {responsiblePeople.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {responsiblePeople.map((f) => (
                  <span key={f.id} className="tag-pill bg-accent/15 text-accent-foreground flex items-center gap-1 py-1 px-3">
                    👤 {f.name}
                    <button onClick={() => setResponsiblePeople(responsiblePeople.filter((tf) => tf.id !== f.id))} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <button onClick={() => openFriendPicker("responsible")} className="pato-btn-bounce flex items-center gap-2 px-4 py-2 rounded-2xl border border-dashed border-accent/40 text-accent-foreground text-sm hover:bg-accent/5 transition-colors">
              <Plus className="w-4 h-4" /> Adicionar responsável
            </button>
          </div>

          {/* Friend Picker (shared) */}
          {showFriendPicker && (
            <div className="rounded-2xl border border-border bg-background p-3 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-muted-foreground">
                  {friendPickerMode === "tag" ? "Marcar amigo" : "Adicionar responsável"}
                </span>
                <button onClick={() => setShowFriendPicker(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                  placeholder="Buscar pato..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {filteredFriends.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => addFriend(f)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs">🦆</div>
                    <div>
                      <p className="text-sm font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.username}</p>
                    </div>
                  </button>
                ))}
                {filteredFriends.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-2">Nenhum pato encontrado</p>
                )}
              </div>
            </div>
          )}

          {/* Checklist */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <ListChecks className="w-4 h-4" /> Lista de tarefas
            </label>
            {checklist.length > 0 && (
              <div className="space-y-1.5 mb-2">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 group">
                    <button onClick={() => toggleChecklistItem(item.id)} className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0",
                      item.done ? "bg-success border-success" : "border-border hover:border-primary"
                    )}>
                      {item.done && <Check className="w-3 h-3 text-success-foreground" />}
                    </button>
                    <span className={cn("text-sm flex-1", item.done && "line-through text-muted-foreground")}>{item.text}</span>
                    <button onClick={() => removeChecklistItem(item.id)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                value={checklistInput}
                onChange={(e) => setChecklistInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddChecklistItem())}
                placeholder="Adicionar tarefa..."
                className="flex-1 px-4 py-2 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={handleAddChecklistItem} className="px-3 py-2 rounded-2xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card rounded-b-3xl border-t border-border px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => handleSave("quero_fazer")}
            className="pato-btn-bounce flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <Save className="w-4 h-4" />
            Salvar
          </button>
          <button
            onClick={() => handleSave()}
            disabled={!title.trim()}
            className={cn(
              "pato-btn-bounce flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold ml-auto transition-all",
              title.trim()
                ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg glow-pink"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <Send className="w-4 h-4" />
            Publicar Quack
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuackModal;
