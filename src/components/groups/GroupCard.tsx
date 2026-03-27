import { Users, Lock, Globe, MessageSquare } from "lucide-react";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    description: string;
    emoji: string;
    cover: string;
    members: number;
    posts: number;
    isPublic: boolean;
    isMember: boolean;
  };
  onOpen: (id: string) => void;
  onJoin: (id: string) => void;
}

const GroupCard = ({ group, onOpen, onJoin }: GroupCardProps) => {
  return (
    <div className="pato-card p-0 overflow-hidden group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/30" onClick={() => group.isMember ? onOpen(group.id) : undefined}>
      {/* Cover */}
      <div className="h-28 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl relative overflow-hidden">
        {group.cover}
        <div className="absolute top-2 right-2">
          {group.isPublic ? (
            <span className="tag-pill bg-card/80 backdrop-blur text-muted-foreground text-[10px] flex items-center gap-1"><Globe className="w-3 h-3" /> Público</span>
          ) : (
            <span className="tag-pill bg-card/80 backdrop-blur text-muted-foreground text-[10px] flex items-center gap-1"><Lock className="w-3 h-3" /> Privado</span>
          )}
        </div>
      </div>
      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{group.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-sm truncate">{group.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{group.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {group.members}</span>
          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {group.posts} posts</span>
        </div>
        {group.isMember ? (
          <button onClick={(e) => { e.stopPropagation(); onOpen(group.id); }} className="w-full py-2 rounded-xl text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition-colors pato-btn-bounce">
            Abrir grupo
          </button>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); onJoin(group.id); }} className="w-full py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground pato-btn-bounce">
            Entrar
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
