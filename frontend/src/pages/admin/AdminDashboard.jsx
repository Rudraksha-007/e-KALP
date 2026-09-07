import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard";
import { problemApi, workspaceApi } from "../../services/api";

export default function AdminDashboard() {
  const [problems, setProblems] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([problemApi.list(), workspaceApi.list()]).then(([problemsRes, workspacesRes]) => {
      if (problemsRes.status === "fulfilled") setProblems(problemsRes.value.data.items ?? []);
      if (workspacesRes.status === "fulfilled") setWorkspaces(workspacesRes.value.data.items ?? []);
      setLoading(false);
    });
  }, []);

  const unassigned = problems.filter((p) => !p.assigned_to);

  return (
    <DashboardLayout title="Admin / Govt Dashboard" accent="text-emerald-600">
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="flex flex-col gap-10">
          <section className="grid grid-cols-3 gap-4">
            <StatCard label="Total problem statements" value={problems.length} accent="text-emerald-600" />
            <StatCard label="Unassigned" value={unassigned.length} accent="text-red-500" />
            <StatCard label="Active workspaces" value={workspaces.length} accent="text-emerald-600" />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Problem statements needing assignment</h2>
            {unassigned.length === 0 ? (
              <EmptyState text="Everything is assigned." />
            ) : (
              <ul className="divide-y divide-slate-200 rounded-[16px] border border-slate-200 bg-white">
                {unassigned.map((p) => (
                  <li key={p.id} className="flex items-center justify-between px-5 py-3 text-sm">
                    <div>
                      <p className="font-medium text-slate-900">{p.title}</p>
                      <p className="text-slate-500">{p.category}</p>
                    </div>
                    <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">
                      Unassigned
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-[16px] border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}
