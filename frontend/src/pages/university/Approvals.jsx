import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, UserCheck, AlertCircle } from "lucide-react";
import Layout from "./Layout";
import { univApi } from "../../services/api";

/**
 * ------------------------------------------------------------------
 *  TEAM ASSIGNMENTS (SPOC "allow" flow)
 *
 *  Backend endpoints wired here:
 *    GET  /problems           → open problem statements (NO_BIDDERS)
 *    GET  /univ/team-leads    → team leads registered to this university
 *    GET  /univ/evaluate      → this SPOC's current pitches
 *    POST /univ/pitch         → assign a team lead to a problem; the backend
 *                               sets ProblemStatement.assigned_to and moves
 *                               it out of NO_BIDDERS.
 *
 *  Response types (schemas/schemas.py):
 *    TeamLeadBrief { id, token, name, email, uni_id }
 *    PitchResponse { id, spoc_id,
 *                    problem: { id, token_number, title, status, date_reported, categories },
 *                    team_lead: { id, token, name, email, uni_id } }
 * ------------------------------------------------------------------
 */

const STATUS_STYLES = {
  NO_BIDDERS: { dot: "bg-neutral-400", text: "text-neutral-600", chip: "bg-neutral-100 text-neutral-600" },
  ASSIGNED: { dot: "bg-sky-500", text: "text-sky-700", chip: "bg-sky-50 text-sky-700" },
  IN_PROGRESS: { dot: "bg-amber-500", text: "text-amber-600", chip: "bg-amber-50 text-amber-600" },
  RESOLVED: { dot: "bg-emerald-500", text: "text-emerald-600", chip: "bg-emerald-50 text-emerald-600" },
  CLOSED: { dot: "bg-red-500", text: "text-red-600", chip: "bg-red-50 text-red-600" },
};

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-CA");
  } catch {
    return "—";
  }
}

function StatusPill({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.NO_BIDDERS;
  return (
    <span className={`flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${style.chip}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function ProblemRow({ problem, isSelected, onClick }) {
  return (
    <div
      onClick={() => onClick(problem)}
      className={`py-5 px-4 border-b border-neutral-100 last:border-none cursor-pointer border-l-2 ${
        isSelected ? "border-l-orange-500 bg-orange-50/40" : "border-l-transparent hover:bg-neutral-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5">
              #{problem.token_number}
            </span>
            <span className="text-xs text-neutral-400 font-mono truncate">
              {(problem.categories ?? []).join(", ") || "General"}
            </span>
          </div>
          <p className="text-sm font-semibold text-neutral-900">{problem.title}</p>
          <p className="text-xs text-neutral-500 mt-1 font-mono">
            Reported {formatDate(problem.date_reported)}
          </p>
        </div>
        <StatusPill status={problem.status} />
      </div>
    </div>
  );
}

function AssignmentRow({ pitch, onOpen }) {
  return (
    <div
      onClick={() => onOpen(pitch)}
      className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-none cursor-pointer hover:bg-neutral-50 px-2"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5">
            #{pitch.problem.token_number}
          </span>
          <StatusPill status={pitch.problem.status} />
        </div>
        <p className="text-sm font-semibold text-neutral-900 truncate">{pitch.problem.title}</p>
        <p className="text-xs text-neutral-500 mt-1 font-mono">
          Team Lead: {pitch.team_lead.name} · Token #{pitch.team_lead.token}
        </p>
      </div>
      <span className="text-xs font-bold text-orange-600 shrink-0">View →</span>
    </div>
  );
}

export default function Approvals() {
  const navigate = useNavigate();

  const [openProblems, setOpenProblems] = useState([]);
  const [teamLeads, setTeamLeads] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [selectedToken, setSelectedToken] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function fetchAll() {
    const [problemsRes, leadsRes, evaluateRes] = await Promise.all([
      univApi.problems({ limit: 200 }),
      univApi.teamLeads(),
      univApi.evaluate(),
    ]);
    const items = problemsRes.data?.items ?? [];
    return {
      open: items.filter((p) => p.status === "NO_BIDDERS"),
      leads: Array.isArray(leadsRes.data) ? leadsRes.data : [],
      assignments: Array.isArray(evaluateRes.data) ? evaluateRes.data : [],
    };
  }

  function apply(data) {
    setOpenProblems(data.open);
    setTeamLeads(data.leads);
    setAssignments(data.assignments);
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAll()
      .then((data) => {
        if (!cancelled) apply(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load assignments.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedProblem = openProblems.find((p) => p.id === selectedProblemId) ?? null;

  async function handleAssign() {
    if (!selectedProblem || !selectedToken) return;
    setSubmitting(true);
    setActionError(null);
    setSuccess(null);

    try {
      const { data } = await univApi.pitch({
        problem_id: selectedProblem.id,
        team_lead_token: Number(selectedToken),
      });
      setSuccess(data);
      setSelectedProblemId(null);
      setSelectedToken("");
      const refreshed = await fetchAll();
      apply(refreshed);
    } catch (err) {
      setActionError(
        err?.response?.data?.detail ?? err?.message ?? "Could not assign this team lead."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout pageTitle="Team Assignments">
      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-emerald-800">
              Assigned “{success.problem.title}” to {success.team_lead.name}.
            </p>
            <p className="text-xs text-emerald-700 mt-0.5 font-mono">
              assigned_to set · token #{success.team_lead.token} · status {success.problem.status}
            </p>
          </div>
        </div>
      )}

      {actionError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700">{actionError}</p>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-neutral-500">Loading assignments…</p>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          {error}
        </div>
      ) : (
        <div className={`grid gap-6 ${selectedProblem ? "grid-cols-[380px_1fr]" : "grid-cols-1"}`}>
          <div className={selectedProblem ? "" : "max-w-3xl"}>
            <div className="px-1 pb-4">
              <h2 className="text-lg font-black text-neutral-950 tracking-tight">
                Open Problem Statements
              </h2>
              <p className="text-sm text-neutral-500 mt-1 font-mono">
                {openProblems.length} open · select one to assign a team lead
              </p>
            </div>
            <div className="border-t border-neutral-100">
              {openProblems.length === 0 ? (
                <p className="text-sm text-neutral-500 px-1 py-6">
                  No open problem statements to assign right now.
                </p>
              ) : (
                openProblems.map((problem) => (
                  <ProblemRow
                    key={problem.id}
                    problem={problem}
                    isSelected={problem.id === selectedProblemId}
                    onClick={() => {
                      setSelectedProblemId(problem.id);
                      setSelectedToken("");
                      setActionError(null);
                    }}
                  />
                ))
              )}
            </div>
          </div>

          {selectedProblem && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5">
                        #{selectedProblem.token_number}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        Reported {formatDate(selectedProblem.date_reported)}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-neutral-950">{selectedProblem.title}</h2>
                  </div>
                  <StatusPill status={selectedProblem.status} />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {(selectedProblem.categories ?? []).length === 0 ? (
                    <span className="text-xs text-neutral-500">No categories tagged.</span>
                  ) : (
                    (selectedProblem.categories ?? []).map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-medium text-neutral-600 bg-neutral-100 rounded-full px-2.5 py-1"
                      >
                        {cat}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
                <p className="text-[11px] font-mono font-bold tracking-[0.1em] text-neutral-400 mb-3">
                  ASSIGN TEAM LEAD
                </p>

                {teamLeads.length === 0 ? (
                  <p className="text-sm text-neutral-500">
                    No team leads are registered with your university yet.
                  </p>
                ) : (
                  <div className="flex items-end gap-3">
                    <label className="flex-1 min-w-0">
                      <span className="block text-xs text-neutral-500 mb-1.5">Team lead</span>
                      <select
                        value={selectedToken}
                        onChange={(e) => setSelectedToken(e.target.value)}
                        className="w-full text-sm border border-neutral-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
                      >
                        <option value="">Select a team lead…</option>
                        {teamLeads.map((lead) => (
                          <option key={lead.id} value={lead.token}>
                            {lead.name} — Token #{lead.token}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      onClick={handleAssign}
                      disabled={!selectedToken || submitting}
                      className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                      <UserCheck className="w-4 h-4" />
                      {submitting ? "Assigning…" : "Assign Team"}
                    </button>
                  </div>
                )}

                <p className="text-xs text-neutral-400 mt-3 font-mono">
                  This sets <span className="text-neutral-600">assigned_to</span> on the problem
                  statement via POST /univ/pitch.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-neutral-950">Current Assignments</h3>
          <span className="text-xs text-neutral-500 font-mono">{assignments.length} total</span>
        </div>
        {assignments.length === 0 ? (
          <p className="text-sm text-neutral-500 py-2">
            You haven't assigned any team leads yet. Assign one from an open problem statement above.
          </p>
        ) : (
          <div>
            {assignments.map((pitch) => (
              <AssignmentRow
                key={pitch.id}
                pitch={pitch}
                onOpen={() => navigate(`/university/projects/${pitch.problem.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}