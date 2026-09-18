import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { univApi } from "../../services/api";

/**
 * ------------------------------------------------------------------
 *  REAL DATA
 *  Projects = this SPOC's pitches from GET /univ/evaluate
 *  (a ProblemStatement + the assigned TeamLead). Milestones, progress
 *  %, timelines and documents aren't modelled in the backend yet, so
 *  those surface as an empty/neutral state rather than fake data.
 * ------------------------------------------------------------------
 */

const PROBLEM_STATUSES = ["NO_BIDDERS", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"];

/** ------------------------------------------------------------------
 *  STATUS STYLE HELPERS
 * ------------------------------------------------------------------ */
const STATUS_STYLES = {
  NO_BIDDERS: { dot: "bg-neutral-400", text: "text-neutral-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
  ASSIGNED: { dot: "bg-sky-500", text: "text-sky-700", chipBg: "bg-white", chipBorder: "border-neutral-200" },
  IN_PROGRESS: { dot: "bg-amber-500", text: "text-amber-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
  RESOLVED: { dot: "bg-emerald-500", text: "text-emerald-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
  CLOSED: { dot: "bg-red-500", text: "text-red-600", chipBg: "bg-white", chipBorder: "border-neutral-200" },
};

function StatusFilterChip({ status, count, active, onClick }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.NO_BIDDERS;
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

function ProjectCard({ project, onClick }) {
  const style = STATUS_STYLES[project.status] ?? STATUS_STYLES.NO_BIDDERS;
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
          <span className="text-xs text-neutral-400 truncate">{project.domain}</span>
        </div>
        <span className={`flex items-center gap-1.5 text-sm font-medium ${style.text} shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {project.status}
        </span>
      </div>

      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-neutral-900">{project.title}</h3>
          {project.meta && (
            <p className="text-sm text-neutral-500 mt-1.5">{project.meta}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-neutral-500">{project.reported}</p>
        </div>
      </div>

      <p className="text-xs text-neutral-400 mt-4 font-mono">
        Milestones, progress and timeline aren't tracked in this build yet.
      </p>
    </div>
  );
}

/**
 * ------------------------------------------------------------------
 *  MAIN PROJECTS PAGE
 * ------------------------------------------------------------------ */
export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeChip, setActiveChip] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    univApi
      .evaluate()
      .then((res) => {
        if (cancelled) return;
        const pitches = Array.isArray(res.data) ? res.data : [];
        setProjects(
          pitches.map((pitch) => ({
            id: pitch.problem.id,
            code: `#${pitch.problem.token_number}`,
            domain: (pitch.problem.categories ?? []).join(", ") || "General",
            title: pitch.problem.title,
            status: pitch.problem.status,
            meta: pitch.team_lead
              ? `Team Lead: ${pitch.team_lead.name} · ${pitch.team_lead.email}`
              : "No team lead assigned yet",
            reported: pitch.problem.date_reported
              ? `Reported ${new Date(pitch.problem.date_reported).toLocaleDateString("en-CA")}`
              : "",
            categories: pitch.problem.categories ?? [],
          }))
        );
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.detail ?? err?.message ?? "Failed to load projects.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const areas = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const statusCounts = useMemo(() => {
    const counts = {};
    PROBLEM_STATUSES.forEach((s) => {
      counts[s] = projects.filter((p) => p.status === s).length;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const haystack = [p.title, p.domain, p.meta].join(" ");
      const matchesSearch =
        searchTerm.trim() === "" || haystack.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = areaFilter === "All" || p.categories.includes(areaFilter);
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesChip = activeChip === null || p.status === activeChip;
      return matchesSearch && matchesArea && matchesStatus && matchesChip;
    });
  }, [projects, searchTerm, areaFilter, statusFilter, activeChip]);

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
            placeholder="Search by title, area, team lead..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-200 bg-neutral-50 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm text-neutral-500">Area</span>
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="text-sm border border-neutral-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
          >
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
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
            {PROBLEM_STATUSES.map((s) => (
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
        {PROBLEM_STATUSES.map((status) => (
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
        {loading ? (
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center text-sm text-neutral-500">
            Loading projects…
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700">
            {error}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 text-center text-sm text-neutral-500">
            {projects.length === 0
              ? "No projects yet. Assign a team lead from an open problem statement to create one."
              : "No projects match your filters."}
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