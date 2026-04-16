import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin from "@/assets/bg-login.svg";
import simbSvg from "@/assets/simb.svg";

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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Same background as login */}
      <img src={bgLogin} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Duck SVG with animations */}
        <div className="relative">
          <div className="absolute inset-0 w-40 h-40 rounded-full bg-primary/20 blur-2xl animate-pulse" />
          <img
            src={simbSvg}
            alt="Pato"
            className="relative w-40 h-40 drop-shadow-2xl"
            style={{
              animation: "duckBounce 1.5s ease-in-out infinite, duckFadeIn 0.8s ease-out",
            }}
          />
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="font-display font-semibold text-lg text-white drop-shadow-lg animate-fade-in" key={msgIndex}>
            {messages[msgIndex]}{dots}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64">
          <div className="h-2 rounded-full bg-white/20 overflow-hidden backdrop-blur-sm">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-xs text-white/70 text-center mt-2 font-medium">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>
      </div>

      <style>{`
        @keyframes duckBounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes duckFadeIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
