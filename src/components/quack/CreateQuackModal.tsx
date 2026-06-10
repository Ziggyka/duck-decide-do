import { useState } from "react";
import {
  X, Calendar, Users, Tag, Send, Save, Sparkles,
  Search as SearchIcon, Check, Plus, Star, ListChecks, UserCheck,
  Link2, Image as ImageIcon, Lock, Flag, FileText, AlignLeft, LayoutGrid
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";

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

const priorities = [
  { value: "low", label: "Baixa", color: "bg-success/15 text-success border-success/30" },
  { value: "med", label: "Média", color: "bg-accent/20 text-accent-foreground border-accent/40" },
  { value: "high", label: "Alta", color: "bg-destructive/15 text-destructive border-destructive/30" },
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
  onSave: (quack: QuackData) => void;
  editingQuack?: QuackData | null;
}

export interface QuackData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: QuackStatus;
  rating: number;
  taggedFriends: typeof fakeFriends;
  responsiblePeople: typeof fakeFriends;
  checklist: ChecklistItem[];
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updates: { text: string; date: Date }[];
  progress: number;
  priority?: string;
  link?: string;
  cover?: string;
  icon?: string;
  privacy?: "public" | "friends" | "private";
}

const statusOptions: { value: QuackStatus; label: string; emoji: string; color: string }[] = [
  { value: "quero_fazer", label: "Quero fazer", emoji: "📌", color: "bg-primary/15 text-primary border-primary/30" },
  { value: "fazendo", label: "Fazendo", emoji: "⏳", color: "bg-accent/15 text-accent-foreground border-accent/30" },
  { value: "feito", label: "Feito", emoji: "✅", color: "bg-success/15 text-success border-success/30" },
];

const privacyOptions = [
  { value: "public", label: "Público", icon: "🌍" },
  { value: "friends", label: "Amigos", icon: "🦆" },
  { value: "private", label: "Privado", icon: "🔒" },
];

const SectionLabel = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
    <Icon className="w-3.5 h-3.5" />
    {children}
  </div>
);

const SideAction = ({ icon: Icon, label, onClick, active }: { icon: any; label: string; onClick?: () => void; active?: boolean }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left",
      active
        ? "bg-primary/10 border-primary/30 text-primary"
        : "bg-muted/50 border-border text-foreground hover:bg-muted hover:border-primary/30"
    )}
  >
    <Icon className="w-4 h-4 flex-shrink-0" />
    <span className="truncate">{label}</span>
  </button>
);

const ICON_LIBRARY: { category: string; icons: { emoji: string; name: string }[] }[] = [
  { category: "📚 Estudos", icons: [{ emoji: "📚", name: "livro estudo" }, { emoji: "✏️", name: "lapis" }, { emoji: "🎓", name: "formatura" }, { emoji: "📝", name: "anotacao" }, { emoji: "🧪", name: "ciencia" }] },
  { category: "💪 Exercícios", icons: [{ emoji: "💪", name: "musculo treino" }, { emoji: "🏃", name: "corrida" }, { emoji: "🧘", name: "yoga" }, { emoji: "🚴", name: "bike" }, { emoji: "🏋️", name: "academia" }] },
  { category: "🎮 Games", icons: [{ emoji: "🎮", name: "game console" }, { emoji: "🕹️", name: "arcade" }, { emoji: "👾", name: "pixel" }, { emoji: "🎲", name: "dado" }] },
  { category: "🎵 Música", icons: [{ emoji: "🎵", name: "musica nota" }, { emoji: "🎸", name: "guitarra" }, { emoji: "🎧", name: "fone" }, { emoji: "🎤", name: "microfone" }] },
  { category: "🎬 Filmes", icons: [{ emoji: "🎬", name: "filme cinema" }, { emoji: "🍿", name: "pipoca" }, { emoji: "📺", name: "tv serie" }, { emoji: "🎌", name: "anime" }] },
  { category: "✈️ Viagens", icons: [{ emoji: "✈️", name: "aviao" }, { emoji: "🗺️", name: "mapa" }, { emoji: "🏖️", name: "praia" }, { emoji: "🏔️", name: "montanha" }] },
  { category: "🍔 Gastronomia", icons: [{ emoji: "🍔", name: "hamburguer" }, { emoji: "🍕", name: "pizza" }, { emoji: "🍣", name: "sushi" }, { emoji: "🍜", name: "ramen" }, { emoji: "🍳", name: "cozinhar" }] },
  { category: "🧠 Desenvolvimento", icons: [{ emoji: "🧠", name: "cerebro mente" }, { emoji: "💡", name: "ideia" }, { emoji: "📖", name: "leitura" }] },
  { category: "💼 Trabalho", icons: [{ emoji: "💼", name: "trabalho" }, { emoji: "💻", name: "laptop" }, { emoji: "📊", name: "grafico" }] },
  { category: "🎨 Arte", icons: [{ emoji: "🎨", name: "arte pintura" }, { emoji: "🖌️", name: "pincel" }, { emoji: "✂️", name: "diy" }] },
  { category: "📸 Fotografia", icons: [{ emoji: "📸", name: "camera foto" }, { emoji: "🌄", name: "paisagem" }] },
  { category: "🏆 Conquistas", icons: [{ emoji: "🏆", name: "trofeu" }, { emoji: "🥇", name: "medalha ouro" }, { emoji: "⭐", name: "estrela" }] },
  { category: "❤️ Bem-estar", icons: [{ emoji: "❤️", name: "coracao saude" }, { emoji: "🌱", name: "natureza" }, { emoji: "🧘‍♀️", name: "meditacao" }] },
  { category: "🦆 Pato", icons: [{ emoji: "🦆", name: "pato duck" }, { emoji: "🐤", name: "patinho" }, { emoji: "🥚", name: "ovo" }] },
];

const CoverIconPicker = ({ cover, icon, setCover, setIcon, iconSearch, setIconSearch, handleFileUpload }: {
  cover?: string; icon?: string;
  setCover: (v?: string) => void;
  setIcon: (v?: string) => void;
  iconSearch: string;
  setIconSearch: (v: string) => void;
  handleFileUpload: (f?: File) => void;
}) => {
  const [dragOver, setDragOver] = useState(false);

  const filteredCategories = ICON_LIBRARY.map(cat => ({
    ...cat,
    icons: iconSearch
      ? cat.icons.filter(i => i.name.toLowerCase().includes(iconSearch.toLowerCase()))
      : cat.icons,
  })).filter(c => c.icons.length > 0);

  return (
    <div className="rounded-2xl border border-border bg-background/50 p-4 animate-fade-in space-y-4">
      <SectionLabel icon={ImageIcon}>Imagem da atividade</SectionLabel>

      {/* Preview */}
      {(cover || icon) && (
        <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
          {cover ? (
            <img src={cover} alt="capa" className="w-full h-full object-cover" />
          ) : (
            <span className="text-7xl">{icon}</span>
          )}
          <button
            onClick={() => { setCover(undefined); setIcon(undefined); }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-foreground/60 text-white hover:bg-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload area */}
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFileUpload(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "block w-full h-28 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-2",
          dragOver ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40 text-muted-foreground hover:text-primary"
        )}
      >
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e.target.files?.[0])} />
        <ImageIcon className="w-6 h-6" />
        <span className="text-xs font-semibold">Arraste, solte ou clique para fazer upload</span>
        <span className="text-[10px]">PNG, JPG, GIF</span>
      </label>

      {/* Icon picker */}
      <div className="rounded-2xl border border-border bg-card p-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Escolha um ícone para representar seu Quack</p>
        <div className="relative mb-3">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            value={iconSearch}
            onChange={(e) => setIconSearch(e.target.value)}
            placeholder="Buscar ícones..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
          {filteredCategories.map((cat) => (
            <div key={cat.category}>
              <p className="text-[11px] font-semibold text-muted-foreground mb-1.5">{cat.category}</p>
              <div className="grid grid-cols-8 gap-1.5">
                {cat.icons.map((ic) => (
                  <button
                    key={ic.emoji}
                    onClick={() => { setIcon(ic.emoji); setCover(undefined); }}
                    title={ic.name}
                    className={cn(
                      "aspect-square rounded-xl flex items-center justify-center text-xl transition-all hover:scale-110 hover:bg-muted",
                      icon === ic.emoji ? "border-2 border-primary bg-primary/10" : "border border-transparent"
                    )}
                  >
                    {ic.emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreateQuackModal = ({ open, onClose, onSave, editingQuack }: CreateQuackModalProps) => {
  const [title, setTitle] = useState(editingQuack?.title || "");
  const [description, setDescription] = useState(editingQuack?.description || "");
  const [category, setCategory] = useState(editingQuack?.category || "");
  const [priority, setPriority] = useState<string>(editingQuack?.priority || "med");
  const [tags, setTags] = useState<string[]>(editingQuack?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState<QuackStatus>(editingQuack?.status || "quero_fazer");
  const [rating, setRating] = useState(editingQuack?.rating || 0);
  const [startDate, setStartDate] = useState<Date | undefined>(editingQuack?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(editingQuack?.endDate);
  const [taggedFriends, setTaggedFriends] = useState<typeof fakeFriends>(editingQuack?.taggedFriends || []);
  const [responsiblePeople, setResponsiblePeople] = useState<typeof fakeFriends>(editingQuack?.responsiblePeople || []);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(editingQuack?.checklist || []);
  const [checklistInput, setChecklistInput] = useState("");
  const [link, setLink] = useState(editingQuack?.link || "");
  const [cover, setCover] = useState<string | undefined>(editingQuack?.cover);
  const [icon, setIcon] = useState<string | undefined>(editingQuack?.icon);
  const [iconSearch, setIconSearch] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "friends" | "private">(editingQuack?.privacy || "friends");
  const [friendSearch, setFriendSearch] = useState("");
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [friendPickerMode, setFriendPickerMode] = useState<"tag" | "responsible">("tag");
  const [hoverRating, setHoverRating] = useState(0);

  // Inline panel toggles (right column actions)
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const togglePanel = (p: string) => setOpenPanel(openPanel === p ? null : p);

  const filteredFriends = fakeFriends.filter((f) => {
    const alreadySelected = friendPickerMode === "tag"
      ? taggedFriends.find((tf) => tf.id === f.id)
      : responsiblePeople.find((tf) => tf.id === f.id);
    return !alreadySelected &&
      (f.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
        f.username.toLowerCase().includes(friendSearch.toLowerCase()));
  });

  const handleAddTag = () => {
    const cleaned = tagInput.trim().replace(/^#/, "");
    if (cleaned && !tags.includes(cleaned)) setTags([...tags, cleaned]);
    setTagInput("");
  };

  const handleAddChecklistItem = () => {
    if (!checklistInput.trim()) return;
    setChecklist([...checklist, { id: crypto.randomUUID(), text: checklistInput.trim(), done: false }]);
    setChecklistInput("");
  };

  const toggleChecklistItem = (id: string) =>
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  const removeChecklistItem = (id: string) =>
    setChecklist(checklist.filter(item => item.id !== id));

  const handleSave = (saveStatus?: QuackStatus) => {
    if (!title.trim()) return;
    const finalStatus = saveStatus || status;
    onSave({
      id: editingQuack?.id || crypto.randomUUID(),
      title, description, category, tags,
      status: finalStatus,
      rating: finalStatus === "feito" ? rating : 0,
      taggedFriends, responsiblePeople, checklist, startDate, endDate,
      createdAt: editingQuack?.createdAt || new Date(),
      updates: editingQuack?.updates || [],
      progress: finalStatus === "feito" ? 100 : finalStatus === "fazendo" ? 50 : 0,
      priority, link, cover, icon, privacy,
    });
    onClose();
  };

  const handleFileUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setCover(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const openFriendPicker = (mode: "tag" | "responsible") => {
    setFriendPickerMode(mode);
    setShowFriendPicker(true);
    setFriendSearch("");
    setOpenPanel(mode === "tag" ? "friends" : "responsible");
  };

  const addFriend = (f: typeof fakeFriends[0]) => {
    if (friendPickerMode === "tag") setTaggedFriends([...taggedFriends, f]);
    else setResponsiblePeople([...responsiblePeople, f]);
    setFriendSearch("");
  };

  const checklistDone = checklist.filter(c => c.done).length;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl min-w-0 md:min-w-[640px] max-h-[92vh] bg-card rounded-3xl border border-border shadow-2xl animate-fade-in flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-bold">{editingQuack ? "Editar Quack" : "Novo Quack"}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Body: two columns */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-0">
            {/* Main column */}
            <div className="p-6 space-y-5 min-w-0">
              {/* Title */}
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <SectionLabel icon={FileText}>Título</SectionLabel>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Frieren, Treino na academia..."
                  className="w-full bg-transparent text-base font-semibold focus:outline-none placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Description */}
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <SectionLabel icon={AlignLeft}>Descrição</SectionLabel>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva detalhes desta atividade..."
                  rows={3}
                  className="w-full bg-transparent text-sm focus:outline-none resize-none placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Category */}
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <SectionLabel icon={LayoutGrid}>Categoria</SectionLabel>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        "pato-btn-bounce tag-pill py-1.5 px-3 text-xs border transition-all",
                        category === cat.value
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      )}
                    >
                      <span className="mr-1">{cat.emoji}</span>{cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <SectionLabel icon={Flag}>Prioridade</SectionLabel>
                <div className="flex gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setPriority(p.value)}
                      className={cn(
                        "flex-1 py-2 rounded-xl text-xs font-semibold border transition-all",
                        priority === p.value ? p.color : "bg-card border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist */}
              <div className="rounded-2xl border border-border bg-background/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <SectionLabel icon={ListChecks}>Checklist de tarefas</SectionLabel>
                  {checklist.length > 0 && (
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {checklistDone}/{checklist.length}
                    </span>
                  )}
                </div>
                {checklist.length > 0 && (
                  <>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3">
                      <div className="h-full bg-success transition-all" style={{ width: `${(checklistDone / checklist.length) * 100}%` }} />
                    </div>
                    <div className="space-y-1.5 mb-3">
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
                  </>
                )}
                <div className="flex gap-2">
                  <input
                    value={checklistInput}
                    onChange={(e) => setChecklistInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddChecklistItem())}
                    placeholder="Adicionar tarefa..."
                    className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button onClick={handleAddChecklistItem} className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Inline panels triggered from right column */}
              {openPanel === "tags" && (
                <div className="rounded-2xl border border-border bg-background/50 p-4 animate-fade-in">
                  <SectionLabel icon={Tag}>Tags</SectionLabel>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      placeholder="#fantasia"
                      className="flex-1 px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <button onClick={handleAddTag} className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="tag-pill bg-primary/10 text-primary flex items-center gap-1 py-1 px-3 text-xs">
                        #{tag}
                        <button onClick={() => setTags(tags.filter(t => t !== tag))}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(openPanel === "friends" || openPanel === "responsible") && (
                <div className="rounded-2xl border border-border bg-background/50 p-4 animate-fade-in">
                  <SectionLabel icon={openPanel === "friends" ? Users : UserCheck}>
                    {openPanel === "friends" ? "Marcar amigos" : "Responsáveis"}
                  </SectionLabel>
                  {(openPanel === "friends" ? taggedFriends : responsiblePeople).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(openPanel === "friends" ? taggedFriends : responsiblePeople).map((f) => (
                        <span key={f.id} className="tag-pill bg-primary/15 text-primary flex items-center gap-1 py-1 px-3 text-xs">
                          🦆 {f.name}
                          <button onClick={() => openPanel === "friends"
                            ? setTaggedFriends(taggedFriends.filter(tf => tf.id !== f.id))
                            : setResponsiblePeople(responsiblePeople.filter(tf => tf.id !== f.id))
                          }><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="relative mb-2">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      value={friendSearch}
                      onChange={(e) => { setFriendSearch(e.target.value); setFriendPickerMode(openPanel === "friends" ? "tag" : "responsible"); }}
                      placeholder="Buscar pato..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {filteredFriends.map((f) => (
                      <button key={f.id} onClick={() => addFriend(f)} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors text-left">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs">🦆</div>
                        <div>
                          <p className="text-sm font-medium">{f.name}</p>
                          <p className="text-xs text-muted-foreground">{f.username}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {openPanel === "link" && (
                <div className="rounded-2xl border border-border bg-background/50 p-4 animate-fade-in">
                  <SectionLabel icon={Link2}>Adicionar link</SectionLabel>
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              )}

              {openPanel === "status" && (
                <div className="rounded-2xl border border-border bg-background/50 p-4 animate-fade-in">
                  <SectionLabel icon={Sparkles}>Status</SectionLabel>
                  <div className="flex gap-2">
                    {statusOptions.map((opt) => (
                      <button key={opt.value} onClick={() => setStatus(opt.value)}
                        className={cn("flex-1 py-2 rounded-xl text-xs font-semibold border transition-all",
                          status === opt.value ? opt.color : "bg-card border-border text-muted-foreground hover:bg-muted"
                        )}>
                        {opt.emoji} {opt.label}
                      </button>
                    ))}
                  </div>
                  {status === "feito" && (
                    <div className="mt-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button key={s} onClick={() => setRating(s)} onMouseEnter={() => setHoverRating(s)} onMouseLeave={() => setHoverRating(0)} className="p-1 transition-transform hover:scale-125">
                            <Star className={cn("w-6 h-6", s <= (hoverRating || rating) ? "fill-accent text-accent" : "text-muted")} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {openPanel === "cover" && (
                <CoverIconPicker
                  cover={cover}
                  icon={icon}
                  setCover={setCover}
                  setIcon={setIcon}
                  iconSearch={iconSearch}
                  setIconSearch={setIconSearch}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {openPanel === "privacy" && (
                <div className="rounded-2xl border border-border bg-background/50 p-4 animate-fade-in">
                  <SectionLabel icon={Lock}>Privacidade</SectionLabel>
                  <div className="flex gap-2">
                    {privacyOptions.map((p) => (
                      <button key={p.value} onClick={() => setPrivacy(p.value as any)}
                        className={cn("flex-1 py-2 rounded-xl text-xs font-semibold border transition-all",
                          privacy === p.value ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border text-muted-foreground hover:bg-muted"
                        )}>
                        {p.icon} {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {openPanel === "dates" && (
                <div className="rounded-2xl border border-border bg-background/50 p-4 animate-fade-in">
                  <SectionLabel icon={Calendar}>Datas</SectionLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Início", date: startDate, set: setStartDate },
                      { label: "Final", date: endDate, set: setEndDate },
                    ].map((d) => (
                      <Popover key={d.label}>
                        <PopoverTrigger asChild>
                          <button className="w-full px-3 py-2 rounded-xl border border-border bg-card text-sm text-left hover:border-primary/50">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">{d.label}</p>
                            {d.date ? format(d.date, "dd/MM/yyyy") : "Selecionar"}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarPicker mode="single" selected={d.date} onSelect={d.set} className="p-3 pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column: actions */}
            <div className="bg-muted/30 border-t md:border-t-0 md:border-l border-border p-4 space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Adicionar ao Quack</p>
                <div className="space-y-1.5">
                  <SideAction icon={Tag} label={tags.length ? `Tags (${tags.length})` : "Tags"} active={openPanel === "tags"} onClick={() => togglePanel("tags")} />
                  <SideAction icon={Users} label={taggedFriends.length ? `Amigos (${taggedFriends.length})` : "Marcar amigos"} active={openPanel === "friends"} onClick={() => togglePanel("friends")} />
                  <SideAction icon={UserCheck} label={responsiblePeople.length ? `Responsáveis (${responsiblePeople.length})` : "Responsáveis"} active={openPanel === "responsible"} onClick={() => togglePanel("responsible")} />
                  <SideAction icon={Link2} label={link ? "Link adicionado" : "Adicionar link"} active={openPanel === "link"} onClick={() => togglePanel("link")} />
                  <SideAction icon={Calendar} label={startDate || endDate ? "Datas definidas" : "Datas"} active={openPanel === "dates"} onClick={() => togglePanel("dates")} />
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Atividade</p>
                <div className="space-y-1.5">
                  <SideAction icon={Sparkles} label={`Status: ${statusOptions.find(s => s.value === status)?.label}`} active={openPanel === "status"} onClick={() => togglePanel("status")} />
                  <SideAction icon={ImageIcon} label="Capa" active={openPanel === "cover"} onClick={() => togglePanel("cover")} />
                  <SideAction icon={Lock} label={`Privacidade: ${privacyOptions.find(p => p.value === privacy)?.label}`} active={openPanel === "privacy"} onClick={() => togglePanel("privacy")} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card border-t border-border px-6 py-4 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => handleSave("quero_fazer")}
            className="pato-btn-bounce flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <Save className="w-4 h-4" /> Rascunho
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
            <Send className="w-4 h-4" /> Publicar Quack
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuackModal;
