import { useState } from "react";
import { Send, Smile, Search } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import duckAvatar1 from "@/assets/duck-avatar-1.png";
import duckAvatar2 from "@/assets/duck-avatar-2.png";
import duckAvatar3 from "@/assets/duck-avatar-3.png";

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "DuckSlayer",
    avatar: duckAvatar2,
    lastMessage: "Bora jogar hoje à noite?",
    time: "2 min",
    unread: 2,
    messages: [
      { id: "1", text: "E aí, tudo bem?", sender: "them", time: "14:30" },
      { id: "2", text: "Tudo certo! E você?", sender: "me", time: "14:31" },
      { id: "3", text: "Bora jogar hoje à noite?", sender: "them", time: "14:32" },
    ],
  },
  {
    id: "2",
    name: "QuackQueen",
    avatar: duckAvatar3,
    lastMessage: "Amei o quack que você postou! 🦆",
    time: "15 min",
    unread: 0,
    messages: [
      { id: "1", text: "Viu meu último quack?", sender: "me", time: "13:00" },
      { id: "2", text: "Amei o quack que você postou! 🦆", sender: "them", time: "13:05" },
    ],
  },
  {
    id: "3",
    name: "PatoNinja",
    avatar: duckAvatar2,
    lastMessage: "O sorteio foi hilário kkkk",
    time: "1h",
    unread: 1,
    messages: [
      { id: "1", text: "Participou do sorteio?", sender: "them", time: "12:00" },
      { id: "2", text: "Sim! Ganhei a roleta 🎰", sender: "me", time: "12:05" },
      { id: "3", text: "O sorteio foi hilário kkkk", sender: "them", time: "12:06" },
    ],
  },
  {
    id: "4",
    name: "DuckMaster",
    avatar: duckAvatar3,
    lastMessage: "Vamos marcar o board game",
    time: "3h",
    unread: 0,
    messages: [
      { id: "1", text: "Vamos marcar o board game", sender: "them", time: "10:00" },
    ],
  },
];

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg: Message = {
      id: crypto.randomUUID(),
      text: messageText,
      sender: "me",
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setChatMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));
    setMessageText("");
  };

  const currentMessages = chatMessages[activeChat.id] || [];

  return (
    <AppLayout hideRightSidebar>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-display font-bold mb-4">💬 Chat</h1>
        <div className="flex rounded-2xl border border-border overflow-hidden bg-card" style={{ height: "calc(100vh - 12rem)" }}>
          {/* Left - Conversations */}
          <div className="w-80 border-r border-border flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar conversa..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveChat(conv)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${
                    activeChat.id === conv.id ? "bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img src={conv.avatar} alt="" className="w-10 h-10 rounded-full bg-muted border-2 border-border" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-card" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold truncate">{conv.name}</span>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Active Chat */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
              <img src={activeChat.avatar} alt="" className="w-9 h-9 rounded-full bg-muted border-2 border-border" />
              <div>
                <p className="text-sm font-semibold">{activeChat.name}</p>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl hover:bg-muted transition-colors">
                  <Smile className="w-5 h-5 text-muted-foreground" />
                </button>
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!messageText.trim()}
                  className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
