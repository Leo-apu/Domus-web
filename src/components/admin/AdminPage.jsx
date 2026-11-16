import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage({ onBackToSite }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
        <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
          Iniciando sistema de administración...
        </p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onBackToSite={onBackToSite} />;
  }

  return <AdminDashboard onBackToSite={onBackToSite} />;
}
