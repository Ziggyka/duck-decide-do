import { useState } from "react";
import {
  X, Calendar, Users, Tag, BarChart3, Send, Save, Sparkles,
  Search as SearchIcon, Check, Plus
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";

const categories = [
  { value: "evento", label: "Evento", emoji: "🎪" },
  { value: "role", label: "Rolê", emoji: "🎉" },
  { value: "projeto", label: "Projeto", emoji: "🚀" },
  { value: "estudo", label: "Estudo", emoji: "📚" },
  { value: "trabalho", label: "Trabalho", emoji: "💼" },
  { value: "outro", label: "Outro", emoji: "🦆" },
];

const fakeFriends = [
  { id: 1, name: "DuckSlayer", username: "@duckslayer" },
  { id: 2, name: "QuackQueen", username: "@quackqueen" },
  { id: 3, name: "PatoNinja", username: "@patoninja" },
  { id: 4, name: "DuckMaster", username: "@duckmaster" },
  { id: 5, name: "PatoGamer", username: "@patogamer" },
];

interface CreateQuackModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (quack: QuackData) => void;
}

export interface QuackData {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate?: Date;
  endDate?: Date;
  taggedFriends: typeof fakeFriends;
  progress: number;
  status: "draft" | "published";
  updates: { text: string; date: Date }[];
  createdAt: Date;
}

const CreateQuackModal = ({ open, onClose, onSave }: CreateQuackModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [taggedFriends, setTaggedFriends] = useState<typeof fakeFriends>([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [friendSearch, setFriendSearch] = useState("");
  const [showFriendPicker, setShowFriendPicker] = useState(false);

  const filteredFriends = fakeFriends.filter(
    (f) =>
      !taggedFriends.find((tf) => tf.id === f.id) &&
      (f.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
        f.username.toLowerCase().includes(friendSearch.toLowerCase()))
  );

  const reset = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setStartDate(undefined);
    setEndDate(undefined);
    setTaggedFriends([]);
    setProgress(0);
    setShowProgress(false);
    setFriendSearch("");
    setShowFriendPicker(false);
  };

  const handleSave = (status: "draft" | "published") => {
    if (!title.trim()) return;
    const quack: QuackData = {
      id: crypto.randomUUID(),
      title,
      description,
      category,
      startDate,
      endDate,
      taggedFriends,
      progress: showProgress ? progress : 0,
      status,
      updates: [],
      createdAt: new Date(),
    };
    onSave(quack);
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto bg-card rounded-3xl border border-border shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 bg-card rounded-t-3xl border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-bold">Novo Quack</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Main question */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">
              🦆 O que você está fazendo agora?
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Preparando o PPT da noite de apresentações"
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">
              Conte mais sobre esse quack
            </label>
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

          {/* Dates row */}
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
                  <CalendarPicker
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="p-3 pointer-events-auto"
                  />
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
                  <CalendarPicker
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Add friends */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Adicionar pato
            </label>

            {/* Tagged friends chips */}
            {taggedFriends.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {taggedFriends.map((f) => (
                  <span
                    key={f.id}
                    className="tag-pill bg-primary/15 text-primary flex items-center gap-1 py-1 px-3"
                  >
                    🦆 {f.name}
                    <button
                      onClick={() => setTaggedFriends(taggedFriends.filter((tf) => tf.id !== f.id))}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowFriendPicker(!showFriendPicker)}
              className="pato-btn-bounce flex items-center gap-2 px-4 py-2 rounded-2xl border border-dashed border-primary/40 text-primary text-sm hover:bg-primary/5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Adicionar pato
            </button>

            {showFriendPicker && (
              <div className="mt-2 rounded-2xl border border-border bg-background p-3 space-y-2 animate-fade-in">
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
                      onClick={() => {
                        setTaggedFriends([...taggedFriends, f]);
                        setFriendSearch("");
                      }}
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
          </div>

          {/* Progress toggle */}
          <div>
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              {showProgress ? "Ocultar progresso" : "Acompanhar progresso"}
            </button>

            {showProgress && (
              <div className="mt-3 p-4 rounded-2xl bg-muted/50 border border-border space-y-3 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progresso do quack</span>
                  <span className="text-sm font-bold text-primary">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-card rounded-b-3xl border-t border-border px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => handleSave("draft")}
            className="pato-btn-bounce flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
          >
            <Save className="w-4 h-4" />
            Rascunho
          </button>
          <button
            onClick={() => handleSave("published")}
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
