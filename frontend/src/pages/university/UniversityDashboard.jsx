import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import Layout from "./Layout";

/**
 * ------------------------------------------------------------------
 *  DUMMY DATA
 *  Shaped the way a real API response would look, so that swapping
 *  this out for a fetch('/api/dashboard') call later only means
 *  replacing the useState initializers below with data from the
 *  response — no changes needed to the JSX/rendering logic.
 * ------------------------------------------------------------------
 */

const CURRENT_USER = {
  name: "Dr. Meera Rao",
  greeting: "Good morning",
  institute: "VJTI Mumbai",
  semester: "Autumn Semester 2024",
};

const ATTENTION_ITEMS_COUNT = 6;

const STAT_CARDS = [
  { id: "active-projects", label: "Active Projects", value: 3, badge: 3, caption: "across 4 departments" },
  { id: "pending-approvals", label: "Pending Team Approvals", value: 3, badge: 3, badgeTone: "danger", caption: "awaiting review" },
  { id: "industry-requests", label: "Industry Requests", value: 3, badge: 3, caption: "pending decision" },
  { id: "completed-projects", label: "Completed Projects", value: 1, badge: 1, badgeTone: "info", caption: "this semester" },
];

const RECOMMENDED_PROBLEM_STATEMENTS = [
  {
    id: "AGR-2024-017",
    code: "AGR-2024-017",
    domain: "AgriTech / AI",
    title: "Real-Time Crop Disease Detection Using Edge AI",
    sponsor: "Ministry of Agriculture, GoI",
    teamsApplying: 4,
    deadline: "Dec 15, 2024",
    matchPercent: 96,
    starred: true,
  },
  {
    id: "HLT-2024-032",
    code: "HLT-2024-032",
    domain: "HealthTech / Assistive Tech",
    title: "Accessible Communication Device for Non-Verbal Autism Patients",
    sponsor: "National Health Mission",
    teamsApplying: 2,
    deadline: "Dec 20, 2024",
    matchPercent: 91,
    starred: true,
  },
  {
    id: "FIN-2024-011",
    code: "FIN-2024-011",
    domain: "FinTech / ML",
    title: "Micro-Lending Risk Assessment for Rural Borrowers",
    sponsor: "NABARD",
    teamsApplying: 1,
    deadline: "Jan 20, 2025",
    matchPercent: 84,
    starred: false,
  },
  {
    id: "MFG-2024-022",
    code: "MFG-2024-022",
    domain: "Manufacturing / IoT",
    title: "Predictive Maintenance for CNC Machining Centers",
    sponsor: "MSME Ministry",
    teamsApplying: 5,
    deadline: "Feb 1, 2025",
    matchPercent: 79,
    starred: false,
  },
];

const PENDING_TEAM_APPROVALS = [
  {
    id: "innovision",
    teamName: "InnoVision",
    status: "Pending",
    title: "Real-Time Crop Disease Detection Using Edge AI",
    department: "Computer Science & Engineering",
    members: 4,
    submittedOn: "2024-11-28",
  },
  {
    id: "neurobridge",
    teamName: "NeuroBridge",
    status: "Pending",
    title: "Accessible Communication Device for Non-Verbal Autism Patients",
    department: "Electronics & Communication Engineering",
    members: 3,
    submittedOn: "2024-11-25",
  },
];

const ACTIVE_PROJECTS = [
  {
    id: "edge-ai-crop",
    title: "Edge AI Crop Disease Detection",
    team: "InnoVision",
    department: "CSE",
    mentor: "Dr. Ramesh Krishnamurthy",
    status: "On Track",
    progress: 68,
  },
  {
    id: "accessible-comm",
    title: "Accessible Communication Device for Non-Verbal Autism Patients",
    team: "NeuroBridge",
    department: "ECE",
    mentor: "Prof. Meena Sundaram",
    status: "Needs Attention",
    progress: 42,
  },
  {
    id: "smart-water",
    title: "Smart Water Distribution Network",
    team: "GreenFlow",
    department: "Civil",
    mentor: "Dr. Suresh Pillai",
    status: "Delayed",
    progress: 15,
  },
];

const INDUSTRY_REQUESTS = [
  {
    id: "agribot",
    company: "Agribot Solutions Pvt. Ltd.",
    initials: "AS",
    offer: "Technical Mentorship + Seed Funding",
    value: "₹4,50,000",
  },
  {
    id: "medtech",
    company: "MedTech Innovations Ltd.",
    initials: "MI",
    offer: "Research Collaboration + Equipment Grant",
    value: "₹2,00,000",
  },
  {
    id: "cloudsync",
    company: "CloudSync Infrastructure",
    initials: "CI",
    offer: "Cloud Credits + Internship Pipeline",
    value: "$5,000 credits",
  },
];

const QUICK_ACTIONS = [
  { id: "team-requests", label: "Review 3 Team Requests", tone: "primary", path: "/university/approvals" },
  { id: "industry-requests", label: "Review 3 Industry Requests", tone: "secondary", path: "/university/industry" },
  { id: "monitor-projects", label: "Monitor All Projects", tone: "ghost", path: "/university/projects" },
];

/** ------------------------------------------------------------------
 *  STATUS STYLE HELPERS
 * ------------------------------------------------------------------ */
const STATUS_STYLES = {
  "On Track": { dot: "bg-emerald-500", text: "text-emerald-600" },
  "Needs Attention": { dot: "bg-amber-500", text: "text-amber-600" },
  Delayed: { dot: "bg-red-500", text: "text-red-600" },
};

const PROGRESS_BAR_COLOR = {
  "On Track": "bg-orange-500",
  "Needs Attention": "bg-amber-500",
  Delayed: "bg-red-500",
};

const BADGE_TONE_CLASSES = {
  default: "bg-orange-100 text-orange-600",
  danger: "bg-red-100 text-red-600",
  info: "bg-blue-100 text-blue-600",
};

/** ------------------------------------------------------------------
 *  SMALL PRESENTATIONAL COMPONENTS
 * ------------------------------------------------------------------ */

function GreetingBanner({ user, attentionCount, onIndustryClick, onApprovalsClick, industryCount, approvalsCount }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">
          {user.greeting}, {user.name}
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          {user.institute} · {user.semester} ·{" "}
          <span className="text-orange-600 font-medium">
            {attentionCount} items need your attention
          </span>
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onIndustryClick}
          className="px-4 py-2 rounded-lg bg-orange-50 text-orange-600 text-sm font-medium hover:bg-orange-100 transition-colors"
        >
          Industry ({industryCount})
        </button>
        <button
          onClick={onApprovalsClick}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Team Approvals ({approvalsCount})
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, badge, badgeTone = "default", caption }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-neutral-400 tracking-wide">
          {label.toUpperCase()}
        </span>
        {badge != null && (
          <span
            className={`text-xs font-semibold rounded-full min-w-[22px] h-[22px] px-1.5 flex items-center justify-center ${BADGE_TONE_CLASSES[badgeTone]}`}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-3xl font-semibold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500 mt-1">{caption}</p>
    </div>
  );
}

function ProblemStatementRow({ item }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-none">
      <div className="flex items-start gap-3 min-w-0">
        <Star
          className={`w-4 h-4 mt-1 shrink-0 ${
            item.starred ? "text-orange-500 fill-orange-500" : "text-neutral-300"
          }`}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-neutral-500 bg-neutral-100 rounded px-1.5 py-0.5">
              {item.code}
            </span>
            <span className="text-xs text-neutral-400">{item.domain}</span>
          </div>
          <p className="text-sm font-medium text-neutral-900">{item.title}</p>
          <p className="text-xs text-neutral-500 mt-1 truncate">
            {item.sponsor} · {item.teamsApplying} team{item.teamsApplying !== 1 ? "s" : ""} applying · Deadline{" "}
            {item.deadline}
          </p>
        </div>
      </div>
      <div className="text-right shrink-0 pl-4">
        <p className="text-lg font-semibold text-orange-500">{item.matchPercent}%</p>
        <p className="text-xs text-neutral-400 border-t border-orange-300 pt-0.5 mt-0.5">match</p>
      </div>
    </div>
  );
}

function RecommendedProblemStatements({ items }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-neutral-900">
          Recommended Problem Statements
        </h3>
        <span className="text-xs font-medium bg-orange-50 text-orange-600 rounded-full px-2.5 py-1">
          {items.length} matched
        </span>
      </div>
      <p className="text-xs text-neutral-500 mb-2">
        Matched to institute strengths in CSE, ECE, Civil, IT
      </p>
      <div>
        {items.map((item) => (
          <ProblemStatementRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ActiveProjectRow({ project, onClick }) {
  const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES["On Track"];
  return (
    <div onClick={() => onClick(project)} className="py-4 border-b border-neutral-100 last:border-none group cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-sm font-medium text-neutral-900 truncate">{project.title}</p>
          <span className={`flex items-center gap-1 text-xs font-medium ${statusStyle.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
            {project.status}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 shrink-0" />
      </div>
      <p className="text-xs text-neutral-500 mb-2">
        {project.team} · {project.department} · {project.mentor}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
          <div
            className={`h-full rounded-full ${PROGRESS_BAR_COLOR[project.status]}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="text-xs text-neutral-500 w-9 text-right">{project.progress}%</span>
      </div>
    </div>
  );
}

function ActiveProjects({ projects, onViewAll, onSelect }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-neutral-900">Active Projects</h3>
        <button onClick={onViewAll} className="text-xs font-medium text-orange-600 hover:text-orange-700">
          View all →
        </button>
      </div>
      <div>
        {projects.map((p) => (
          <ActiveProjectRow key={p.id} project={p} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
}

function PendingApprovalCard({ approval }) {
  return (
    <div className="py-4 border-b border-neutral-100 last:border-none">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold text-neutral-900">{approval.teamName}</p>
        <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          {approval.status}
        </span>
      </div>
      <p className="text-sm text-neutral-700 leading-snug">{approval.title}</p>
      <p className="text-xs text-neutral-500 mt-1">
        {approval.department} · {approval.members} members ·{" "}
        {new Date(approval.submittedOn).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
    </div>
  );
}

function PendingTeamApprovals({ approvals, onReviewAll }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-neutral-900">Pending Team Approvals</h3>
        <button onClick={onReviewAll} className="text-xs font-medium text-orange-600 hover:text-orange-700">
          Review all →
        </button>
      </div>
      <div>
        {approvals.map((a) => (
          <PendingApprovalCard key={a.id} approval={a} />
        ))}
      </div>
    </div>
  );
}

function IndustryRequestRow({ request }) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-neutral-100 last:border-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-neutral-100 text-neutral-600 text-xs font-semibold flex items-center justify-center shrink-0">
          {request.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-900 truncate">{request.company}</p>
          <p className="text-xs text-neutral-500">{request.offer}</p>
        </div>
      </div>
      <span className="text-xs font-semibold text-orange-600 bg-orange-50 rounded-full px-2.5 py-1 shrink-0">
        {request.value}
      </span>
    </div>
  );
}

function IndustryRequests({ requests, onReviewAll }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-semibold text-neutral-900">Industry Requests</h3>
        <button onClick={onReviewAll} className="text-xs font-medium text-orange-600 hover:text-orange-700">
          Review all →
        </button>
      </div>
      <div>
        {requests.map((r) => (
          <IndustryRequestRow key={r.id} request={r} />
        ))}
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
    <div className="rounded-2xl border border-orange-100 bg-orange-50/50 px-6 py-5">
      <h3 className="text-base font-semibold text-neutral-900 mb-4">Quick Actions</h3>
      <div className="space-y-2.5">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.path)}
            className={`w-full text-left text-sm font-medium rounded-lg px-4 py-2.5 transition-colors ${toneClasses[action.tone]}`}
          >
            {action.label} →
          </button>
        ))}
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  MAIN DASHBOARD PAGE
 * ------------------------------------------------------------------
 *  All the sections below read from local state seeded with the
 *  dummy data at the top of the file. When wiring this up to a real
 *  backend:
 *    1. Replace each `useState(DUMMY_DATA)` with `useState([])` / null.
 *    2. Add a `useEffect` that calls your API and calls the matching
 *       setter (setStats, setProblemStatements, etc).
 *    3. Everything else — JSX, styling, row components — stays as is.
 *
 *  Navigation uses react-router-dom's `useNavigate`, so every "view
 *  all" / quick-action button here pushes a real route. This file is
 *  mounted at "/" by <AppRoutes /> — see App.jsx.
 * ------------------------------------------------------------------ */
export default function Dashboard() {
  const navigate = useNavigate();

  const [user] = useState(CURRENT_USER);
  const [attentionCount] = useState(ATTENTION_ITEMS_COUNT);
  const [stats] = useState(STAT_CARDS);
  const [problemStatements] = useState(RECOMMENDED_PROBLEM_STATEMENTS);
  const [pendingApprovals] = useState(PENDING_TEAM_APPROVALS);
  const [activeProjects] = useState(ACTIVE_PROJECTS);
  const [industryRequests] = useState(INDUSTRY_REQUESTS);
  const [quickActions] = useState(QUICK_ACTIONS);

  const pendingApprovalsCount = pendingApprovals.length;
  const industryRequestsCount = industryRequests.length;

  return (
    <Layout pageTitle="Dashboard">
      <GreetingBanner
        user={user}
        attentionCount={attentionCount}
        industryCount={industryRequestsCount}
        approvalsCount={pendingApprovalsCount}
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
          <RecommendedProblemStatements items={problemStatements} />
          <ActiveProjects
            projects={activeProjects}
            onViewAll={() => navigate("/university/projects")}
            onSelect={(p) => navigate(`/university/projects/${p.id}`)}
          />
        </div>

        <div className="space-y-6">
          <PendingTeamApprovals approvals={pendingApprovals} onReviewAll={() => navigate("/university/approvals")} />
          <IndustryRequests requests={industryRequests} onReviewAll={() => navigate("/university/industry")} />
          <QuickActions actions={quickActions} onAction={navigate} />
        </div>
      </div>
    </Layout>
  );
}
