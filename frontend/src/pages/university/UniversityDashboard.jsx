import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard";
import { problemApi, workspaceApi, studentApi } from "../../services/api";

export default function UniversityDashboard() {
  const [problems, setProblems] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([problemApi.list(), workspaceApi.list(), studentApi.list()]).then(
      ([problemsRes, workspacesRes, studentsRes]) => {
        if (problemsRes.status === "fulfilled") setProblems(problemsRes.value.data.items ?? []);
        if (workspacesRes.status === "fulfilled") setWorkspaces(workspacesRes.value.data.items ?? []);
        if (studentsRes.status === "fulfilled") setStudents(studentsRes.value.data.items ?? []);
        setLoading(false);
      }
    );
  }, []);

  return (
    <DashboardLayout title="University Dashboard" accent="text-violet-600">
      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <div className="flex flex-col gap-10">
          <section>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <StatCard label="Assigned problem statements" value={problems.length} accent="text-violet-600" />
              <StatCard label="Active project workspaces" value={workspaces.length} accent="text-violet-600" />
              <StatCard label="Registered students" value={students.length} accent="text-violet-600" />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Project workspaces</h2>
            {workspaces.length === 0 ? (
              <EmptyState text="No project workspaces yet." />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {workspaces.map((w) => (
                  <article key={w.id} className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-1 font-semibold text-slate-900">Workspace #{w.id}</h3>
                    <p className="line-clamp-3 text-sm text-slate-500">{w.sol_description}</p>
                    {w.proposed_mvp && (
                      <p className="mt-2 text-xs font-medium text-violet-600">MVP: {w.proposed_mvp}</p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Students</h2>
            {students.length === 0 ? (
              <EmptyState text="No students registered yet." />
            ) : (
              <ul className="divide-y divide-slate-200 rounded-[16px] border border-slate-200 bg-white">
                {students.map((s) => (
                  <li key={s.id} className="px-5 py-3 text-sm text-slate-700">
                    {s.name ?? `Student #${s.id}`}
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
