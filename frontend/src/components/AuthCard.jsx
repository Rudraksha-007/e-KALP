import { Link } from "react-router-dom";

/**
 * Shared visual shell for every login/register page so CitizenLogin,
 * UniversityRegister, etc. only need to supply their form fields.
 */
export default function AuthCard({ title, subtitle, footer, error, children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <div className="w-full max-w-md rounded-[20px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-900/5">
        <Link to="/" className="mb-6 inline-block text-sm text-slate-500 hover:text-slate-900">
          ← Choose a different account type
        </Link>

        <h1 className="mb-1 text-2xl font-semibold text-slate-900">{title}</h1>
        {subtitle && <p className="mb-7 text-sm text-slate-500">{subtitle}</p>}

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
            {error}
          </div>
        )}

        {children}

        {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
      </div>
    </main>
  );
}

export function FormField({ label, ...inputProps }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-900">
      {label}
      <input
        {...inputProps}
        className="rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </label>
  );
}

export function SubmitButton({ children, submitting }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="mt-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {submitting ? "Please wait…" : children}
    </button>
  );
}
