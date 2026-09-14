import { useEffect, useState } from "react";
import { MapPin, LogOut, Loader2 } from "lucide-react";
import { problemApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="#0B0B0C" />
    <rect x="6" y="6" width="10" height="10" fill="#F5720B" />
    <rect x="18" y="6" width="10" height="10" fill="#F5F4F0" fillOpacity="0.15" />
    <rect x="6" y="18" width="10" height="10" fill="#F5F4F0" fillOpacity="0.15" />
    <rect x="18" y="18" width="10" height="10" fill="#F5F4F0" />
    <rect x="24" y="24" width="10" height="10" fill="#F5720B" />
  </svg>
);

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

const statusStyles = {
  NO_BIDDERS: "bg-neutral-900 text-white",
  ASSIGNED: "bg-sky-50 text-sky-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  RESOLVED: "bg-emerald-50 text-emerald-700",
  CLOSED: "bg-neutral-100 text-neutral-500",
};

function ProblemCard({ problem }) {
  return (
    <article className="bg-white border border-neutral-200 p-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-bold px-2 py-1 bg-orange-50 text-orange-700">
            {problem.categories && problem.categories.length > 0
              ? problem.categories.join(", ").toUpperCase()
              : "UNCATEGORIZED"}
          </span>
          <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
            <MapPin size={11} /> {problem.location || "Unknown location"}
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 ${
            statusStyles[problem.status] || "bg-neutral-100 text-neutral-600"
          }`}
        >
          {(problem.status || "PENDING").replace(/_/g, " ")}
        </span>
      </div>

      <h2 className="mt-3 text-lg font-bold text-neutral-950 leading-snug">{problem.title}</h2>
      {problem.pd && <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{problem.pd}</p>}

      <div className="mt-4 flex items-center justify-between flex-wrap gap-3 text-xs font-mono text-neutral-400">
        <span>Token #{problem.token_number}</span>
        <span>Reported {formatDate(problem.date_reported)}</span>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export default function CitizenDashboard() {
  const { user, logout } = useAuth();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let active = true;
    problemApi
      .list({ limit: 50 })
      .then(({ data }) => {
        if (!active) return;
        setTotal(data.total);
        setProblems(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.detail || err.message || "Failed to load problems.");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const displayName = user?.name || "Citizen";

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-[1290px] mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={34} />
            <div className="min-w-0">
              <p className="font-black text-[16px] leading-tight text-neutral-950 tracking-tight truncate">
                e-KALP
              </p>
              <p className="text-[9px] font-mono font-semibold tracking-[0.15em] text-orange-600">
                CIVIC · INTELLIGENCE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <p className="hidden sm:block text-sm text-neutral-500">
              Welcome, <span className="font-semibold text-neutral-900">{displayName}</span>
            </p>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
            >
              <LogOut size={13} /> Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1290px] mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.15em] text-orange-600 mb-3">
          <span className="w-1.5 h-1.5 bg-orange-500" /> CIVIC PROBLEM REGISTRY
          {!loading && !error && (
            <span className="text-neutral-400 ml-1 font-semibold">· {total} REPORTED</span>
          )}
        </div>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-black text-neutral-950 tracking-tight">Problem Dashboard</h1>
            <p className="mt-1.5 text-sm text-neutral-500">
              Live problem statements reported by citizens, synced from the platform backend.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {loading && (
            <div className="flex items-center gap-3 bg-white border border-neutral-200 p-6 text-sm text-neutral-500">
              <Loader2 size={16} className="animate-spin text-orange-600" /> Loading problems…
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-mono px-4 py-3">
              Failed to load problems: {error}
            </div>
          )}

          {!loading && !error && problems.length === 0 && (
            <p className="text-sm text-neutral-400 bg-white border border-neutral-200 p-6">
              No problems reported yet.
            </p>
          )}

          {!loading &&
            !error &&
            problems.map((p) => <ProblemCard key={p.id} problem={p} />)}
        </div>
      </main>

      <footer className="mx-auto max-w-[1290px] px-6 py-8 text-center text-[10px] font-mono tracking-[0.15em] text-neutral-400 border-t border-neutral-200 mt-10">
        © 2026 e-KALP JHARKHAND · CITIZEN-FIRST PUBLIC INNOVATION REGISTRY
      </footer>
    </div>
  );
}