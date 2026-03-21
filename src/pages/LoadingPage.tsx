import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const messages = [
  "Preparando seu próximo rolê...",
  "Consultando a sabedoria dos patos...",
  "Montando suas sugestões...",
  "Carregando memórias incríveis...",
  "Organizando seus quacks...",
];

const LoadingPage = () => {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(dotInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15 + 5;
      });
    }, 400);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => navigate("/"), 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Subtle gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Duck animation */}
        <div className="relative">
          <div className="absolute inset-0 w-32 h-32 rounded-full bg-accent/20 blur-xl animate-pulse" />
          <div className="relative w-32 h-32 flex items-center justify-center">
            <span
              className="text-8xl drop-shadow-lg"
              style={{
                animation: "duckWalk 0.6s ease-in-out infinite alternate",
              }}
            >
              🦆
            </span>
          </div>
          {/* Shadow */}
          <div
            className="mx-auto w-20 h-3 rounded-full bg-foreground/10 blur-sm"
            style={{
              animation: "duckShadow 0.6s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="font-display font-semibold text-lg text-foreground animate-fade-in" key={msgIndex}>
            {messages[msgIndex]}{dots}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64">
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>
      </div>

      <style>{`
        @keyframes duckWalk {
          0% { transform: translateX(-8px) rotate(-5deg); }
          100% { transform: translateX(8px) rotate(5deg); }
        }
        @keyframes duckShadow {
          0% { transform: translateX(-8px) scaleX(0.8); }
          100% { transform: translateX(8px) scaleX(1.2); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
