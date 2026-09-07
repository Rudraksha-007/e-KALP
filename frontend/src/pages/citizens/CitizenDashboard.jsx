import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard";
import { problemApi } from "../../services/api";

export default function CitizenDashboard() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    problemApi
      .list()
      .then((res) => setProblems(res.data.items ?? []))
      .catch(() => setProblems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Citizen Dashboard" accent="text-blue-600">
      <h2 className="mb-1 text-xl font-semibold text-slate-900">Community problem statements</h2>
      <p className="mb-6 text-sm text-slate-500">
        Browse issues raised in your area and track how universities and industry partners are solving them.
      </p>

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : problems.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No problem statements yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <article key={p.id} className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
              <span className="mb-2 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                {p.category}
              </span>
              <h3 className="mb-1 font-semibold text-slate-900">{p.title}</h3>
              <p className="line-clamp-3 text-sm text-slate-500">{p.description}</p>
            </article>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
