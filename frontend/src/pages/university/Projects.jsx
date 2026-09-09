import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

/**
 * ------------------------------------------------------------------
 *  DUMMY DATA
 *  Shaped the way a real API response would look, so swapping this
 *  out for a fetch('/api/projects') call later only means replacing
 *  the useState initializer below — no JSX changes needed.
 * ------------------------------------------------------------------
 */
const PROJECTS = [
  {
    id: "edge-ai-crop",
    code: "AGR-2024-017",
    domain: "AgriTech / AI",
    title: "Edge AI Crop Disease Detection",
    team: "InnoVision",
    department: "CSE",
    mentor: "Dr. Ramesh Krishnamurthy",
    partner: "Agribot Solutions Pvt. Ltd.",
    status: "On Track",
    progress: 68,
    startDate: "2024-08-01",
    endDate: "2025-04-30",
    milestonesDone: 3,
    milestonesTotal: 7,
    lastActivity: "2 days ago",
  },
  {
    id: "accessible-comm",
    code: "HLT-2024-032",
    domain: "HealthTech",
    title: "Accessible Communication Device for Non-Verbal Autism Patients",
    team: "NeuroBridge",
    department: "ECE",
    mentor: "Prof. Meena Sundaram",
    partner: "MedTech Innovations Ltd.",
    status: "Needs Attention",
    progress: 42,
    startDate: "2024-09-01",
    endDate: "2025-06-30",
    milestonesDone: 2,
    milestonesTotal: 6,
    lastActivity: "5 days ago",
  },
  {
    id: "smart-water",
    code: "ENV-2024-008",
    domain: "Smart Cities / IoT",
    title: "Smart Water Distribution Network",
    team: "GreenFlow",
    department: "Civil",
    mentor: "Dr. Suresh Pillai",
    partner: "Jal Tech Corp",
    status: "Delayed",
    progress: 15,
    startDate: "2024-10-01",
    endDate: "2025-07-31",
    milestonesDone: 1,
    milestonesTotal: 4,
    lastActivity: "12 days ago",
  },
  {
    id: "offline-lms",
    code: "EDU-2024-045",
    domain: "EdTech",
    title: "Offline-First LMS for Rural Schools",
    team: "EduReach",
    department: "IT",
    mentor: "Prof. Anand Rajan",
    partner: "EduTech Foundation",
    status: "Completed",
    progress: 100,
    startDate: "2024-05-01",
    endDate: "2024-11-30",
    milestonesDone: 6,
    milestonesTotal: 6,
    lastActivity: "1 day ago",
  },
];

const STATUS_FILTERS = ["On Track", "Needs Attention", "Delayed", "Completed"];

/** ------------------------------------------------------------------
 *  STATUS STYLE HELPERS
 * ------------------------------------------------------------------ */
const STATUS_STYLES = {
  "On Track": { dot: "bg-emerald-500", text: "text-emerald-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
  "Needs Attention": { dot: "bg-amber-500", text: "text-amber-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
  Delayed: { dot: "bg-red-500", text: "text-red-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
  Completed: { dot: "bg-blue-500", text: "text-blue-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
};

const PROGRESS_BAR_COLOR = {
  "On Track": "bg-orange-500",
  "Needs Attention": "bg-amber-500",
  Delayed: "bg-red-500",
  Completed: "bg-blue-500",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-CA");
}

function StatusFilterChip({ status, count, active, onClick }) {
  const style = STATUS_STYLES[status];
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
        active
          ? "border-orange-300 bg-orange-50 text-orange-700"
          : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${style.dot}`} />
      {status}
      <span
        className={`text-xs font-semibold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center ${
          active ? "bg-orange-200 text-orange-700" : "bg-neutral-100 text-neutral-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function MilestoneDots({ done, total }) {
  return (
    <span className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < done ? "bg-orange-500" : "bg-neutral-200"}`}
        />
      ))}
    </span>
  );
}

function ProjectCard({ project, onClick }) {
  const style = STATUS_STYLES[project.status] ?? STATUS_STYLES["On Track"];
  return (
    <div
      onClick={() => onClick(project)}
      className="rounded-2xl border border-neutral-200 bg-white px-6 py-5 hover:border-orange-200 transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-neutral-500 bg-neutral-100 rounded px-1.5 py-0.5">
            {project.code}
          </span>
          <span className="text-xs text-neutral-400">{project.domain}</span>
        </div>
        <span className={`flex items-center gap-1.5 text-sm font-medium ${style.text} shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {project.status}
        </span>
      </div>

      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-neutral-900">{project.title}</h3>
          <p className="text-sm text-neutral-500 mt-1.5">
            Team: <span className="text-neutral-700">{project.team}</span> · Dept:{" "}
            <span className="text-neutral-700">{project.department}</span> · Mentor:{" "}
            <span className="text-neutral-700">{project.mentor}</span> · Partner:{" "}
            <span className="text-neutral-700">{project.partner}</span>
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-semibold text-neutral-900">{project.progress}%</p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {formatDate(project.startDate)} → {formatDate(project.endDate)}
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${PROGRESS_BAR_COLOR[project.status]}`}
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
        <MilestoneDots done={project.milestonesDone} total={project.milestonesTotal} />
        <span>
          {project.milestonesDone}/{project.milestonesTotal} milestones · last activity{" "}
          {project.lastActivity}
        </span>
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  MAIN PROJECTS PAGE
 * ------------------------------------------------------------------
 *  To wire this up to a real backend:
 *    1. Replace `useState(PROJECTS)` with `useState([])`.
 *    2. Add a `useEffect` that fetches '/api/projects' and calls
 *       `setProjects(data)`. Consider moving search/dept/status
 *       filtering server-side once the list gets large.
 *    3. Everything else — filter chips, counts, cards — stays the
 *       same, since it's all derived from `projects`.
 *
 *  Mounted at "/projects" — see App.jsx.
 * ------------------------------------------------------------------ */
export default function Projects() {
  const navigate = useNavigate();
  const [projects] = useState(PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeChip, setActiveChip] = useState(null);

  const departments = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.department)))],
    [projects]
  );

  const statusCounts = useMemo(() => {
    const counts = {};
    STATUS_FILTERS.forEach((s) => {
      counts[s] = projects.filter((p) => p.status === s).length;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        [p.title, p.team, p.domain, p.mentor]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesDept = deptFilter === "All" || p.department === deptFilter;
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesChip = activeChip === null || p.status === activeChip;
      return matchesSearch && matchesDept && matchesStatus && matchesChip;
    });
  }, [projects, searchTerm, deptFilter, statusFilter, activeChip]);

  const toggleChip = (status) => {
    setActiveChip((prev) => (prev === status ? null : status));
    setStatusFilter((prev) => (prev === status ? "All" : status));
  };

  return (
    <Layout pageTitle="University Projects">
      <div className="rounded-2xl border border-neutral-200 bg-white px-5 py-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by project, team, domain, mentor..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-neutral-500">Dept.</span>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-sm border border-neutral-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-neutral-500">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setActiveChip(e.target.value === "All" ? null : e.target.value);
            }}
            className="text-sm border border-neutral-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            <option value="All">All</option>
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <span className="text-sm text-neutral-500 shrink-0">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {STATUS_FILTERS.map((status) => (
          <StatusFilterChip
            key={status}
            status={status}
            count={statusCounts[status]}
            active={activeChip === status}
            onClick={() => toggleChip(status)}
          />
        ))}
      </div>

      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center text-sm text-neutral-500">
            No projects match your filters.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={(p) => navigate(`/university/projects/${p.id}`)} />
          ))
        )}
      </div>
    </Layout>
  );
}
