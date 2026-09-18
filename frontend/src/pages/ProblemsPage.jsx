import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { problemApi } from "../services/api";

/**
 * ------------------------------------------------------------------
 *  EXPLORE PROBLEMS
 *  Public feed of problem statements from GET /problems (paginated:
 *  limit + offset). Infinite scroll: a sentinel at the bottom triggers
 *  the next page whenever it enters the viewport.
 * ------------------------------------------------------------------
 */

const PAGE_SIZE = 20;

const STATUS_STYLES = {
  NO_BIDDERS: { dot: "bg-neutral-400", chip: "bg-neutral-100 text-neutral-600" },
  ASSIGNED: { dot: "bg-sky-500", chip: "bg-sky-100 text-sky-700" },
  IN_PROGRESS: { dot: "bg-amber-500", chip: "bg-amber-100 text-amber-700" },
  RESOLVED: { dot: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700" },
  CLOSED: { dot: "bg-rose-500", chip: "bg-rose-100 text-rose-700" },
};

// One distinct color per backend category (services/nlp/category_prototypes.py).
const CATEGORY_COLORS = {
  EDUCATION: "bg-violet-100 text-violet-700 ring-violet-200",
  HEALTHCARE: "bg-rose-100 text-rose-700 ring-rose-200",
  AGRICULTURE: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  WATER_MANAGEMENT: "bg-sky-100 text-sky-700 ring-sky-200",
  SANITATION: "bg-amber-100 text-amber-700 ring-amber-200",
  ENVIRONMENT: "bg-lime-100 text-lime-700 ring-lime-200",
  RURAL_LIVELIHOODS: "bg-teal-100 text-teal-700 ring-teal-200",
  ACCESSIBILITY: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  URBAN_INFRASTRUCTURE: "bg-orange-100 text-orange-700 ring-orange-200",
  PUBLIC_SERVICE_DELIVERY: "bg-cyan-100 text-cyan-700 ring-cyan-200",
};

function categoryColor(cat) {
  return CATEGORY_COLORS[cat] ?? "bg-neutral-100 text-neutral-600 ring-neutral-200";
}

const TOKEN_COLORS = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-violet-500",
];

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

function StatusPill({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.NO_BIDDERS;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold rounded-full px-2.5 py-1 ${style.chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function ProblemCard({ problem, index }) {
  const categories = problem.categories ?? [];
  const accent = categories[0] || problem.status || "";
  const tokenColor = TOKEN_COLORS[(problem.token_number ?? index) % TOKEN_COLORS.length];

  return (
    <div className="relative rounded-xl border border-black/10 bg-white px-5 py-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <span
        className="absolute left-0 top-0 bottom-0 w-1.5"
        style={{
          background: accent
            ? "linear-gradient(180deg, #fb7185, #f97316, #f59e0b)"
            : "transparent",
        }}
      />
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`shrink-0 inline-flex items-center justify-center h-7 px-2 text-[11px] font-mono font-bold text-white rounded-md ${tokenColor}`}
          >
            #{problem.token_number}
          </span>
          <StatusPill status={problem.status} />
        </div>
        <span className="shrink-0 text-[11px] font-mono font-semibold text-neutral-700 bg-neutral-200 rounded-full px-2 py-1">
          {formatDate(problem.date_reported)}
        </span>
      </div>

      <p className="text-[15px] font-bold text-neutral-900 leading-snug">{problem.title}</p>

      {problem.pd && (
        <p className="mt-2 text-sm text-neutral-700 leading-relaxed whitespace-pre-line">{problem.pd}</p>
      )}

      {categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`text-[10px] font-mono font-bold tracking-wide uppercase rounded-full px-2.5 py-1 ring-1 ${categoryColor(cat)}`}
            >
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProblemsPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);

  // First page.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    problemApi
      .list({ limit: PAGE_SIZE, offset: 0 })
      .then((res) => {
        if (cancelled) return;
        setItems(res.data.items ?? []);
        setTotal(res.data.total);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load problems.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Infinite scroll — load the next page when the sentinel becomes visible.
  useEffect(() => {
    if (total === null || items.length >= total) return;
    const sentinel = sentinelRef.current;
    if (!sentinel || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setLoadingMore(true);
        problemApi
          .list({ limit: PAGE_SIZE, offset: items.length })
          .then((res) => {
            setItems((prev) => [...prev, ...(res.data.items ?? [])]);
            setTotal(res.data.total);
          })
          .catch(() => {
            /* keep existing items; user can scroll again to retry */
          })
          .finally(() => setLoadingMore(false));
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items.length, total, loadingMore]);

  const done = total !== null && items.length >= total;

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#111111]">
      <header className="relative overflow-hidden bg-neutral-950 text-white">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(700px 380px at 8% -20%, rgba(244,63,94,0.5), transparent 60%),
              radial-gradient(700px 380px at 96% -10%, rgba(56,189,248,0.4), transparent 60%),
              radial-gradient(600px 320px at 50% 130%, rgba(249,115,22,0.4), transparent 60%),
              linear-gradient(180deg, #0a0a0b 0%, #121317 100%)
            `,
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-[11px] font-mono font-bold tracking-[0.15em] text-white hover:text-orange-300 transition-colors"
          >
            ← BACK
          </Link>
          <h1 className="text-lg font-black tracking-tight">EXPLORE PROBLEMS</h1>
          {total !== null && (
            <span className="text-[11px] font-mono font-bold bg-white text-neutral-950 rounded-full px-3 py-1">
              {total} TOTAL
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 space-y-3">
        {loading ? (
          <p className="text-sm text-neutral-700">Loading problems…</p>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-neutral-700">No problems found.</p>
        ) : (
          items.map((problem, index) => (
            <ProblemCard key={problem.id} problem={problem} index={index} />
          ))
        )}

        {/* Sentinel that triggers the next page */}
        {!loading && !error && items.length > 0 && !done && (
          <div ref={sentinelRef} className="flex justify-center py-6">
            {loadingMore ? (
              <span className="text-xs font-mono font-bold text-neutral-700">LOADING MORE…</span>
            ) : (
              <span className="text-xs font-mono font-bold text-neutral-700">SCROLL TO LOAD MORE</span>
            )}
          </div>
        )}

        {done && (
          <p className="flex justify-center text-xs font-mono font-bold text-neutral-700">
            END OF FEED · {total} PROBLEMS
          </p>
        )}
      </main>
    </div>
  );
}