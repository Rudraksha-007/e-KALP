import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Unauthorized() {
  const { dashboardPath, isAuthenticated } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
          <path d="M12 9v4m0 4h.01M10.3 3.86l-8.14 14.1A1.5 1.5 0 0 0 3.5 20h17a1.5 1.5 0 0 0 1.34-2.04L13.7 3.86a1.5 1.5 0 0 0-2.6 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h1 className="text-2xl font-semibold text-slate-900">You don't have access to this page</h1>
      <p className="max-w-sm text-sm text-slate-500">
        Your account type doesn't have permission to view this page. If you think this is a mistake, contact your administrator.
      </p>
      <Link
        to={isAuthenticated ? dashboardPath : "/"}
        className="mt-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        {isAuthenticated ? "Back to my dashboard" : "Back to role selection"}
      </Link>
    </main>
  );
}
