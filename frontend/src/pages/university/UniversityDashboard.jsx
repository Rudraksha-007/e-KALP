import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import Layout from "./Layout";
import { useAuth } from "../../context/AuthContext";
import { problemApi, univApi } from "../../services/api";

/**
 * ------------------------------------------------------------------
 *  REAL DATA
 *  This dashboard is fed by the live backend:
 *    - GET /problems        → open problem statements
 *    - GET /univ/evaluate   → this SPOC's pitches (problem + team lead)
 *  Sections that have no backend endpoint yet (team-approval workflow,
 *  industry-partnership requests) render an empty state instead of
 *  fake content.
 * ------------------------------------------------------------------
 */

/** ------------------------------------------------------------------
 *  STATUS STYLE HELPERS (real ProblemStatus enum values)
 * ------------------------------------------------------------------ */
const STATUS_STYLES = {
  NO_BIDDERS: { dot: "bg-neutral-400", text: "text-neutral-600" },
  ASSIGNED: { dot: "bg-sky-500", text: "text-sky-700" },
  IN_PROGRESS: { dot: "bg-amber-500", text: "text-amber-600" },
  RESOLVED: { dot: "bg-emerald-500", text: "text-emerald-600" },
  CLOSED: { dot: "bg-red-500", text: "text-red-600" },
};

const BADGE_TONE_CLASSES = {
  default: "bg-orange-50 text-orange-600",
  danger: "bg-red-50 text-red-600",
  info: "bg-sky-50 text-sky-700",
};

const EMPTY_LIST = {
  recommended: "No open problem statements match your subject expertise yet.",
  projects: "No team leads assigned yet. Assign one from an open problem statement.",
  approvals: "The team approval workflow is not available in this build yet.",
  industry: "The industry partnership workflow is not available in this build yet.",
};

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

/** Overlap of the SPOC's subject_expertise with a problem's categories. */
function matchPercent(expertise, categories) {
  if (!expertise?.length || !categories?.length) return null;
  const set = new Set(expertise.map((e) => e.toLowerCase()));
  const matched = categories.filter((c) => set.has(c.toLowerCase())).length;
  return Math.round((matched / categories.length) * 100);
}

/** ------------------------------------------------------------------
 *  SMALL PRESENTATIONAL COMPONENTS
 * ------------------------------------------------------------------ */

function GreetingBanner({ user, attentionCount, onIndustryClick, onApprovalsClick, industryCount, approvalsCount }) {
  return (
    <div className="border border-neutral-200 bg-white px-6 py-5 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-black text-neutral-950 tracking-tight">
          {user.greeting}, {user.name}
        </h2>
        <p className="text-sm text-neutral-500 mt-1 font-mono">
          {user.institute} · {user.semester} ·{" "}
          <span className="text-orange-600 font-semibold">
            {attentionCount} item{attentionCount !== 1 ? "s" : ""} need{attentionCount === 1 ? "s" : ""} your attention
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onIndustryClick}
          className="px-4 py-2 bg-orange-50 text-orange-600 text-sm font-semibold hover:bg-orange-100 transition-colors"
        >
          Industry ({industryCount})
        </button>
        <button
          onClick={onApprovalsClick}
          className="px-4 py-2 bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors"
        >
          Team Approvals ({approvalsCount})
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, badge, badgeTone = "default", caption }) {
  return (
    <div className="border border-neutral-200 bg-white px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">
          {label.toUpperCase()}
        </span>
        {badge != null && (
          <span
            className={`text-[10px] font-mono font-bold min-w-[22px] h-[22px] px-1.5 flex items-center justify-center ${BADGE_TONE_CLASSES[badgeTone]}`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-neutral-950">{value}</p>
      <p className="text-xs text-neutral-500 mt-1">{caption}</p>
    </div>
  );
}

function ProblemStatementRow({ item }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-none">
      <div className="flex items-start gap-3 min-w-0">
        <Star className="w-4 h-4 mt-1 shrink-0 text-neutral-300" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5">
              {item.code}
            </span>
            <span className="text-xs text-neutral-400 font-mono truncate">{item.domain}</span>
          </div>
          <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
          <p className="text-xs text-neutral-500 mt-1 truncate font-mono">{item.meta}</p>
        </div>
      </div>
      <div className="text-right shrink-0 pl-4">
        <p className="text-lg font-black text-orange-500">{item.matchPercent ?? "—"}</p>
        <p className="text-[9px] font-mono text-neutral-400 border-t border-orange-300 pt-0.5 mt-0.5 tracking-wide">
          {item.matchPercent != null ? "MATCH" : "NO MATCH"}
        </p>
      </div>
    </div>
  );
}

function RecommendedProblemStatements({ items }) {
  return (
    <div className="border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-neutral-950">
          Open Problem Statements
        </h3>
        <span className="text-[10px] font-mono font-bold bg-orange-50 text-orange-600 px-2.5 py-1">
          {items.length} OPEN
        </span>
      </div>
      <p className="text-xs text-neutral-500 mb-2 font-mono">
        Matched to your subject expertise
      </p>
      <div>
        {items.length === 0 ? (
          <p className="text-sm text-neutral-500 py-4">{EMPTY_LIST.recommended}</p>
        ) : (
          items.map((item) => (
            <ProblemStatementRow key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}

function ActiveProjectRow({ project, onClick }) {
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES.NO_BIDDERS;
  return (
    <div onClick={() => onClick(project)} className="py-4 border-b border-neutral-100 last:border-none group cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-sm font-semibold text-neutral-900 truncate">{project.title}</p>
          <span className={`flex items-center gap-1 text-xs font-semibold ${statusStyle.text}`}>
            <span className={`w-1.5 h-1.5 ${statusStyle.dot}`} />
            {project.status}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 shrink-0" />
      </div>
      {project.meta && (
        <p className="text-xs text-neutral-500 mb-2 font-mono">{project.meta}</p>
      )}
      {project.progress != null ? (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1 bg-neutral-100 overflow-hidden">
            <div
              className="h-full bg-orange-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-xs text-neutral-500 w-9 text-right font-mono">{project.progress}%</span>
        </div>
      ) : (
        <p className="text-xs text-neutral-400 font-mono">No progress data available yet.</p>
      )}
    </div>
  );
}

function ActiveProjects({ projects, onViewAll, onSelect }) {
  return (
    <div className="border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-neutral-950">Team Lead Assignments</h3>
        <button onClick={onViewAll} className="text-xs font-bold text-orange-600 hover:text-orange-700">
          View all →
        </button>
      </div>
      <div>
        {projects.length === 0 ? (
          <p className="text-sm text-neutral-500 py-4">{EMPTY_LIST.projects}</p>
        ) : (
          projects.map((p) => (
            <ActiveProjectRow key={p.id} project={p} onClick={onSelect} />
          ))
        )}
      </div>
    </div>
  );
}

function PendingApprovalCard({ approval }) {
  return (
    <div className="py-4 border-b border-neutral-100 last:border-none">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-bold text-neutral-900">{approval.teamName}</p>
        <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
          <span className="w-1.5 h-1.5 bg-amber-500" />
          {approval.status}
        </span>
      </div>
      <p className="text-sm text-neutral-700 leading-snug">{approval.title}</p>
      <p className="text-xs text-neutral-500 mt-1 font-mono">
        {approval.department} · {approval.members} members
      </p>
    </div>
  );
}

function PendingTeamApprovals({ approvals, onReviewAll }) {
  return (
    <div className="border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-neutral-950">Pending Team Approvals</h3>
        <button onClick={onReviewAll} className="text-xs font-bold text-orange-600 hover:text-orange-700">
          Review →
        </button>
      </div>
      <div>
        {approvals.length === 0 ? (
          <p className="text-sm text-neutral-500 py-4">{EMPTY_LIST.approvals}</p>
        ) : (
          approvals.map((a) => (
            <PendingApprovalCard key={a.id} approval={a} />
          ))
        )}
      </div>
    </div>
  );
}

function IndustryRequests({ requests, onReviewAll }) {
  return (
    <div className="border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-neutral-950">Industry Requests</h3>
        <button onClick={onReviewAll} className="text-xs font-bold text-orange-600 hover:text-orange-700">
          Review →
        </button>
      </div>
      <div>
        {requests.length === 0 ? (
          <p className="text-sm text-neutral-500 py-4">{EMPTY_LIST.industry}</p>
        ) : (
          requests.map((r) => (
            <div key={r.id} className="py-3.5 border-b border-neutral-100 last:border-none">
              <p className="text-sm font-semibold text-neutral-900">{r.company}</p>
              <p className="text-xs text-neutral-500">{r.offer}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function QuickActions({ actions, onAction }) {
  const toneClasses = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    secondary: "bg-white text-orange-600 border border-orange-200 hover:bg-orange-50",
    ghost: "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50",
  };
  return (
    <div className="border border-orange-100 bg-orange-50/50 px-6 py-5">
      <h3 className="text-base font-bold text-neutral-950 mb-4">Quick Actions</h3>
      <div className="space-y-2.5">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.path)}
            className={`w-full text-left text-sm font-semibold px-4 py-2.5 transition-colors ${toneClasses[action.tone]}`}
          >
            {action.label} →
          </button>
        ))}
      </div>
    </div>
  );
}

const QUICK_ACTIONS = [
  { id: "team-requests", label: "Review Team Assignments", tone: "primary", path: "/university/approvals" },
  { id: "industry-requests", label: "Industry Partnerships", tone: "secondary", path: "/university/industry" },
  { id: "monitor-projects", label: "Monitor All Projects", tone: "ghost", path: "/university/projects" },
];

/** ------------------------------------------------------------------
 *  MAIN DASHBOARD PAGE
 * ------------------------------------------------------------------ */
export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [problems, setProblems] = useState([]);
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([problemApi.list({ limit: 200 }), univApi.evaluate()])
      .then(([problemsRes, evaluateRes]) => {
        if (cancelled) return;
        setProblems(problemsRes.data?.items ?? []);
        setPitches(Array.isArray(evaluateRes.data) ? evaluateRes.data : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load dashboard.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const expertise = user?.subject_expertise ?? [];

  const openStatements = problems.filter((p) => p.status === "NO_BIDDERS");

  const recommended = openStatements.map((p) => {
    const match = matchPercent(expertise, p.categories);
    const metaParts = [];
    if (match != null) {
      metaParts.push(
        `${p.categories.filter((c) => expertise.some((e) => e.toLowerCase() === c.toLowerCase())).length}/${p.categories.length} expertise tags`
      );
    }
    if (!expertise.length && p.categories.length) {
      metaParts.push(`${p.categories.length} categories`);
    }
    metaParts.push(`Reported ${formatDate(p.date_reported)}`);
    return {
      id: p.id,
      code: `#${p.token_number}`,
      domain: p.categories.join(", ") || "General",
      title: p.title,
      meta: metaParts.join(" · "),
      matchPercent: match,
    };
  });

  const activeProjects = pitches.map((pitch) => ({
    id: pitch.problem.id,
    title: pitch.problem.title,
    status: pitch.problem.status,
    teamLead: pitch.team_lead?.name ?? null,
    meta: pitch.team_lead
      ? `Team: ${pitch.team_lead.name} · Token #${pitch.team_lead.token}`
      : "No team lead assigned yet",
    progress: null,
  }));

  const stats = [
    { id: "open-problems", label: "Open Problem Statements", value: openStatements.length, badge: null, caption: "awaiting bids" },
    { id: "team-assignments", label: "Team Lead Assignments", value: pitches.length, badge: null, caption: "pitched to your teams" },
    { id: "pending-approvals", label: "Pending Team Approvals", value: 0, badge: 0, badgeTone: "danger", caption: "workflow not available" },
    { id: "industry-requests", label: "Industry Requests", value: 0, badge: 0, caption: "workflow not available" },
  ];

  if (loading) {
    return (
      <Layout pageTitle="Dashboard">
        <p className="text-sm text-neutral-500">Loading dashboard…</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout pageTitle="Dashboard">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          {error}
        </div>
      </Layout>
    );
  }

  const bannerUser = {
    name: user?.name ?? "—",
    greeting: "Welcome back",
    institute: user?.registration_number ? `University #${user.registration_number}` : "SPOC Dashboard",
    semester: expertise.length ? expertise.join(", ") : "Subject expertise not set",
  };

  return (
    <Layout pageTitle="Dashboard">
      <GreetingBanner
        user={bannerUser}
        attentionCount={openStatements.length}
        industryCount={0}
        approvalsCount={0}
        onIndustryClick={() => navigate("/university/industry")}
        onApprovalsClick={() => navigate("/university/approvals")}
      />

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 space-y-6">
          <RecommendedProblemStatements items={recommended} />
          <ActiveProjects
            projects={activeProjects}
            onViewAll={() => navigate("/university/projects")}
            onSelect={(p) => navigate(`/university/projects/${p.id}`)}
          />
        </div>

        <div className="space-y-6">
          <PendingTeamApprovals approvals={[]} onReviewAll={() => navigate("/university/approvals")} />
          <IndustryRequests requests={[]} onReviewAll={() => navigate("/university/industry")} />
          <QuickActions actions={QUICK_ACTIONS} onAction={navigate} />
        </div>
      </div>
    </Layout>
  );
}