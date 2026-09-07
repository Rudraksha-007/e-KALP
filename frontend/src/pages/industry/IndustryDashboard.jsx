import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard";
import { workspaceApi, problemApi } from "../../services/api";

export default function IndustryDashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([workspaceApi.list(), problemApi.list()]).then(([workspacesRes, problemsRes]) => {
      if (workspacesRes.status === "fulfilled") setWorkspaces(workspacesRes.value.data.items ?? []);
      if (problemsRes.status === "fulfilled") setProblems(problemsRes.value.data.items ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout title="Industry Dashboard" accent="text-amber-600">
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Your collaborations</h2>
            {workspaces.length === 0 ? (
              <EmptyState text="You haven't partnered on any workspaces yet." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {workspaces.map((w) => (
                  <article key={w.id} className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-1 font-semibold text-slate-900">Workspace #{w.id}</h3>
                    <p className="line-clamp-3 text-sm text-slate-500">{w.sol_description}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Open problem statements</h2>
            {problems.length === 0 ? (
              <EmptyState text="No open problem statements right now." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {problems.map((p) => (
                  <article key={p.id} className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
                    <span className="mb-2 inline-block rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600">
                      {p.category}
                    </span>
                    <h3 className="mb-1 font-semibold text-slate-900">{p.title}</h3>
                    <p className="line-clamp-3 text-sm text-slate-500">{p.description}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </DashboardLayout>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-[16px] border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}
