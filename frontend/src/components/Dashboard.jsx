import { useAuth } from "../context/AuthContext";

/**
 * Common chrome (top bar with name + logout) for every role dashboard.
 * Pass `accent` (a Tailwind text-color class) to tint the badge per role.
 */
export default function DashboardLayout({ title, accent = "text-slate-900", children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide ${accent}`}>{title}</p>
            <p className="text-sm text-slate-500">Welcome back, {user?.name ?? "there"}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
