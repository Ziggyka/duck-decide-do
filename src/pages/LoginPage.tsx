import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import bgLogin from "@/assets/bg-login.svg";
import simbSvg from "@/assets/simb.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (isSignup && !name.trim()) e.name = "Nome é obrigatório";
    if (!email.trim()) e.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Email inválido";
    if (!password) e.password = "Senha é obrigatória";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres";
    return e;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(errs).length > 0) {
      toast.error("Preencha todos os campos corretamente");
      return;
    }
    setLoading(true);
    toast.success(isSignup ? "Conta criada com sucesso! 🦆" : "Login realizado! 🦆");
    setTimeout(() => navigate("/loading"), 800);
  };

  const inputClass = (field: string) =>
    `w-full py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-muted-foreground bg-card text-foreground ${
      touched[field] && errors[field]
        ? "border-destructive focus:ring-destructive/50"
        : "border-border focus:ring-primary/50 focus:border-primary"
    }`;

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <img src={bgLogin} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* Left — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 items-center justify-center p-12">
        <div className="relative z-10 text-center space-y-8 max-w-md animate-[fadeInUp_0.8s_ease-out]">
          <img
            src={simbSvg}
            alt="Pato App"
            className="w-64 mx-auto drop-shadow-2xl animate-[fadeInUp_0.6s_ease-out]"
          />
          <p className="text-white text-xl font-bold drop-shadow-lg leading-relaxed">
            Nunca mais perca tempo decidindo o que fazer 🦆
          </p>
          <p className="text-white/80 text-sm font-medium drop-shadow">
            Seu próximo rolê começa aqui
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md space-y-7 bg-card/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50 animate-[fadeInUp_0.6s_ease-out]">
          <div className="lg:hidden text-center space-y-3">
            <img src={simbSvg} alt="Pato App" className="w-32 mx-auto" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {isSignup ? "Crie sua conta" : "Bem-vindo de volta!"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isSignup ? "Junte-se à comunidade dos patos 🦆" : "Entre e descubra seu próximo quack"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-1.5 animate-[fadeInUp_0.3s_ease-out]">
                <label className="text-sm font-medium text-foreground">Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" placeholder="Seu nome de pato" value={name} onChange={e => setName(e.target.value)} onBlur={() => handleBlur("name")} className={`${inputClass("name")} pl-10 pr-4`} />
                </div>
                {touched.name && errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="seupato@email.com" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => handleBlur("email")} className={`${inputClass("email")} pl-10 pr-4`} />
              </div>
              {touched.email && errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onBlur={() => handleBlur("password")} className={`${inputClass("password")} pl-10 pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {touched.password && errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded border-border text-primary focus:ring-primary accent-primary" />
                  <span className="text-sm text-muted-foreground">Lembrar de mim</span>
                </label>
                <button type="button" className="text-sm text-primary hover:underline font-medium">Esqueci minha senha</button>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  {isSignup ? "Criando..." : "Entrando..."}
                </>
              ) : isSignup ? "Criar conta 🦆" : "Entrar 🦆"}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou continue com</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-muted hover:shadow-md active:scale-[0.97] transition-all duration-200 text-sm font-medium text-foreground">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-muted hover:shadow-md active:scale-[0.97] transition-all duration-200 text-sm font-medium text-foreground">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Já tem conta?" : "Não tem conta?"}{" "}
            <button type="button" onClick={() => { setIsSignup(!isSignup); setErrors({}); setTouched({}); }} className="text-primary font-semibold hover:underline">
              {isSignup ? "Entrar" : "Criar conta"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
