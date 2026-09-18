import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Layout from "./Layout";
import { univApi } from "../../services/api";

/**
 * ------------------------------------------------------------------
 *  REAL DATA
 *  Detail page for one of this SPOC's pitched projects. Looks up the
 *  matching PitchResponse (GET /univ/evaluate) by problem id, so only
 *  fields modelled in the backend are shown — everything else renders
 *  an empty state.
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

function EmptySection({ children }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-200 bg-white px-6 py-8 text-sm text-neutral-500">
      {children}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    univApi
      .evaluate()
      .then((res) => {
        if (cancelled) return;
        const pitches = Array.isArray(res.data) ? res.data : [];
        const found = pitches.find((p) => String(p.problem?.id) === String(id)) ?? null;
        setPitch(found);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load project.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Layout pageTitle="Project Detail">
        <p className="text-sm text-neutral-500">Loading project…</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout pageTitle="Project Detail">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          {error}
        </div>
      </Layout>
    );
  }

  if (!pitch) {
    return (
      <Layout pageTitle="Project Detail">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center text-sm text-neutral-500">
          This project isn't part of your team lead assignments.
        </div>
      </Layout>
    );
  }

  const problem = pitch.problem;
  const teamLead = pitch.team_lead;
  const statusStyle = STATUS_STYLES[problem.status] ?? STATUS_STYLES.NO_BIDDERS;

  return (
    <Layout pageTitle="Project Detail">
      <button
        onClick={() => navigate("/university/projects")}
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to projects
      </button>

      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-neutral-500 bg-neutral-100 rounded px-1.5 py-0.5">
                Problem #{problem.token_number}
              </span>
              <span className="text-xs text-neutral-400">Reported {formatDate(problem.date_reported)}</span>
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">{problem.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className={`flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${statusStyle.chip}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {problem.status}
              </span>
              {(problem.categories ?? []).map((cat) => (
                <span key={cat} className="text-xs text-neutral-600 bg-neutral-100 rounded-full px-2.5 py-1">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-1">PROBLEM DETAILS</p>
            <p className="text-sm text-neutral-500">
              Full problem description ({`pd`} field), media and location aren't exposed through the SPOC
              endpoint yet — only the brief above is available in this build.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-3">MILESTONES</p>
            <p className="text-sm text-neutral-500">
              Milestones aren't tracked in this build yet.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
            <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-3">TEAM LEAD</p>
            {teamLead ? (
              <div className="space-y-1.5">
                <p className="text-base font-semibold text-neutral-900">{teamLead.name}</p>
                <p className="text-xs text-neutral-500">{teamLead.email}</p>
                <p className="text-xs font-mono text-neutral-500">Token # {teamLead.token}</p>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">No team lead assigned yet.</p>
            )}
          </div>

          <EmptySection>Progress updates aren't tracked in this build yet.</EmptySection>
          <EmptySection>No documents uploaded yet.</EmptySection>
        </div>
      </div>
    </Layout>
  );
}