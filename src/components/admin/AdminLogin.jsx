import { useState } from "react";
import { Lock, Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin({ onBackToSite }) {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      await login(email.trim(), password);
    } catch (err) {
      console.error("Auth error:", err);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setErrorMessage("El correo electrónico o la contraseña ingresada son incorrectos.");
      } else if (err.code === "auth/too-many-requests") {
        setErrorMessage("Demasiados intentos fallidos. Por favor espera unos minutos o restablece tu clave.");
      } else {
        setErrorMessage(err.message || "No se pudo iniciar sesión. Verifica tus datos de acceso.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMessage("Por favor ingresa tu correo electrónico para enviarte las instrucciones de restablecimiento.");
      return;
    }
    setErrorMessage("");
    setIsResetting(true);
    try {
      await resetPassword(email.trim());
      setResetSent(true);
    } catch (err) {
      setErrorMessage("No se pudo enviar el correo de recuperación. Verifica que el correo sea válido.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Luces de fondo ambientales */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Botón Volver a la web */}
      <button
        type="button"
        onClick={onBackToSite}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la web</span>
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-[0.25em] uppercase text-rose-400 mb-3">
            <span className="w-4 h-px bg-rose-500/50" />
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ACCESO EXCLUSIVO ANFITRIÓN</span>
            <span className="w-4 h-px bg-rose-500/50" />
          </div>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Panel de Administración
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light">
            Domus Alquileres Temporarios · San Salvador de Jujuy
          </p>
        </div>

        <div className="bg-stone-900/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60">
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {resetSent && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>Te enviamos un correo para restablecer tu contraseña. Revisa tu bandeja de entrada o spam.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4.5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[11px] font-mono uppercase tracking-wider text-stone-300 font-medium mb-1.5"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dueño@domus.com"
                  className="w-full bg-stone-950/80 border border-stone-800 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="admin-password"
                  className="block text-[11px] font-mono uppercase tracking-wider text-stone-300 font-medium"
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isResetting}
                  className="text-[11px] text-stone-400 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  {isResetting ? "Enviando..." : "¿Olvidaste tu contraseña?"}
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-stone-950/80 border border-stone-800 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-rose-950/50 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Ingresando al sistema...</span>
                </>
              ) : (
                <span>Ingresar al Administrador</span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-stone-500 mt-6 font-mono flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3 text-stone-600" />
          <span>Acceso restringido para el propietario · Domus Jujuy</span>
        </p>
      </div>
    </div>
  );
}
