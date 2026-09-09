// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "./Layout";

// /**
//  * ------------------------------------------------------------------
//  *  DUMMY DATA
//  *  Shaped the way a real API response would look, so that swapping
//  *  this out for a fetch('/api/approvals') call later only means
//  *  replacing the useState initializer below — no JSX changes needed.
//  * ------------------------------------------------------------------
//  */
// const TEAM_APPROVAL_REQUESTS = [
//   {
//     id: "ST001",
//     teamName: "InnoVision",
//     teamCode: "ST001",
//     status: "Pending",
//     title: "Real-Time Crop Disease Detection Using Edge AI",
//     department: "Computer Science & Engineering",
//     members: 4,
//     submittedOn: "2024-11-28",
//   },
//   {
//     id: "ST002",
//     teamName: "NeuroBridge",
//     teamCode: "ST002",
//     status: "Pending",
//     title: "Accessible Communication Device for Non-Verbal Autism Patients",
//     department: "Electronics & Communication Engineering",
//     members: 3,
//     submittedOn: "2024-11-25",
//   },
//   {
//     id: "ST003",
//     teamName: "GreenFlow",
//     teamCode: "ST003",
//     status: "Changes Requested",
//     title: "Smart Water Distribution Network for Urban Areas",
//     department: "Civil Engineering",
//     members: 4,
//     submittedOn: "2024-11-20",
//   },
//   {
//     id: "ST004",
//     teamName: "EduReach",
//     teamCode: "ST004",
//     status: "Pending",
//     title: "Offline-First Learning Management System for Rural Schools",
//     department: "Information Technology",
//     members: 3,
//     submittedOn: "2024-11-18",
//   },
// ];

// /** ------------------------------------------------------------------
//  *  STATUS STYLE HELPERS
//  * ------------------------------------------------------------------ */
// const STATUS_STYLES = {
//   Pending: { dot: "bg-orange-500", text: "text-orange-600" },
//   "Changes Requested": { dot: "bg-amber-500", text: "text-amber-600" },
//   Approved: { dot: "bg-emerald-500", text: "text-emerald-600" },
//   Rejected: { dot: "bg-red-500", text: "text-red-600" },
// };

// function StatusPill({ status }) {
//   const style = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
//   return (
//     <span className={`flex items-center gap-1.5 text-sm font-medium ${style.text} shrink-0`}>
//       <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
//       {status}
//     </span>
//   );
// }

// function TeamApprovalRow({ request, onClick }) {
//   return (
//     <div
//       onClick={() => onClick(request)}
//       className="flex items-start justify-between py-6 border-b border-neutral-100 last:border-none cursor-pointer group"
//     >
//       <div className="flex items-start gap-3 min-w-0">
//         <div className="w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 text-sm font-semibold flex items-center justify-center shrink-0">
//           {request.teamName.slice(0, 2).toUpperCase()}
//         </div>
//         <div className="min-w-0">
//           <p className="text-base font-semibold text-neutral-900 group-hover:text-orange-600 transition-colors">
//             {request.teamName}
//           </p>
//           <p className="text-xs text-neutral-400 mb-2">{request.teamCode}</p>
//           <p className="text-sm text-neutral-700">{request.title}</p>
//           <p className="text-xs text-neutral-500 mt-1.5">
//             {request.department} · {request.members} members ·{" "}
//             {new Date(request.submittedOn).toLocaleDateString("en-CA")}
//           </p>
//         </div>
//       </div>
//       <StatusPill status={request.status} />
//     </div>
//   );
// }

// /** ------------------------------------------------------------------
//  *  MAIN APPROVALS PAGE
//  * ------------------------------------------------------------------
//  *  To wire this up to a real backend:
//  *    1. Replace `useState(TEAM_APPROVAL_REQUESTS)` with `useState([])`.
//  *    2. Add a `useEffect` that fetches '/api/approvals' and calls
//  *       `setRequests(data)`.
//  *    3. Everything else — filtering, counts, JSX — stays the same,
//  *       since it's all derived from `requests`.
//  *
//  *  This file is mounted at "/approvals" by <AppRoutes /> — see App.jsx.
//  *  Clicking a row navigates to "/approvals/:id" (detail page not yet
//  *  built — add a route + component for it whenever that page is ready).
//  * ------------------------------------------------------------------ */
// export default function Approvals() {
//   const navigate = useNavigate();
//   const [requests] = useState(TEAM_APPROVAL_REQUESTS);

//   const pendingCount = useMemo(
//     () => requests.filter((r) => r.status === "Pending").length,
//     [requests]
//   );
//   const totalCount = requests.length;

//   const handleRowClick = (request) => {
//     navigate(`/approvals/${request.id}`);
//   };

//   return (
//     <Layout pageTitle="Student Team Approvals">
//       <div>
//         <h2 className="text-lg font-semibold text-neutral-900">All Requests</h2>
//         <p className="text-sm text-neutral-500 mt-1">
//           {pendingCount} pending · {totalCount} total
//         </p>
//       </div>

//       <div className="border-t border-neutral-100">
//         {requests.map((request) => (
//           <TeamApprovalRow key={request.id} request={request} onClick={handleRowClick} />
//         ))}
//       </div>
//     </Layout>
//   );
// }

import React, { useState, useMemo } from "react";
import { X } from "lucide-react";
import Layout from "./Layout";

/**
 * ------------------------------------------------------------------
 *  DUMMY DATA
 *  Shaped the way a real API response would look, so that swapping
 *  this out for a fetch('/api/approvals') call later only means
 *  replacing the useState initializer below — no JSX changes needed.
 *  Each request now carries the extra detail fields the right-hand
 *  panel needs (abstract, tech stack, team, mentor, etc). In a real
 *  app you'd likely lazy-load these per-request on selection instead
 *  of shipping them all up front — swap the `useState` below for a
 *  `useEffect` fetch keyed on `selectedId` when you get there.
 * ------------------------------------------------------------------
 */
const TEAM_APPROVAL_REQUESTS = [
  {
    id: "ST001",
    teamName: "InnoVision",
    teamCode: "ST001",
    status: "Pending",
    title: "Real-Time Crop Disease Detection Using Edge AI",
    department: "Computer Science & Engineering",
    members: 4,
    submittedOn: "2024-11-28",
    problemCode: "AGR-2024-017",
    domain: "AgriTech / AI",
    proposedTimeline: "8 months (Jan 2025 – Aug 2025)",
    industryAlignment: "Agribot Solutions Pvt. Ltd.",
    abstract:
      "We propose deploying lightweight CNN models on Raspberry Pi units mounted on drone platforms to detect crop diseases in real time without cloud dependency. The system will cover 18 disease categories across 5 major crops, enabling instant intervention and reducing agricultural loss by an estimated 30%.",
    techStack: ["TensorFlow Lite", "Raspberry Pi 4", "React Native", "FastAPI", "PostgreSQL"],
    teamMembers: [
      { id: "2022CSE0142", name: "Arjun Sharma", role: "Team Leader", year: "3rd Year" },
      { id: "2022CSE0187", name: "Priya Menon", role: "AI Engineer", year: "3rd Year" },
      { id: "2023CSE0054", name: "Rohit Das", role: "Hardware Lead", year: "2nd Year" },
      { id: "2022CSE0201", name: "Sneha Iyer", role: "Backend Developer", year: "3rd Year" },
    ],
    facultyMentor: { name: "Dr. Ramesh Krishnamurthy", department: "Computer Science & Engineering" },
    industryPartner: "Agribot Solutions Pvt. Ltd.",
  },
  {
    id: "ST002",
    teamName: "NeuroBridge",
    teamCode: "ST002",
    status: "Pending",
    title: "Accessible Communication Device for Non-Verbal Autism Patients",
    department: "Electronics & Communication Engineering",
    members: 3,
    submittedOn: "2024-11-25",
    problemCode: "HLT-2024-032",
    domain: "HealthTech / Assistive Tech",
    proposedTimeline: "10 months (Jan 2025 – Oct 2025)",
    industryAlignment: "MedTech Innovations Ltd.",
    abstract:
      "A wearable, low-cost communication aid that translates pre-set gesture and eye-tracking inputs into synthesized speech and text, designed for non-verbal autistic patients. The device pairs with a companion app so caregivers can customize vocabulary and track usage patterns over time.",
    techStack: ["OpenCV", "ESP32", "Flutter", "Node.js", "MongoDB"],
    teamMembers: [
      { id: "2022ECE0093", name: "Kavya Nair", role: "Team Leader", year: "3rd Year" },
      { id: "2022ECE0118", name: "Aditya Rao", role: "Embedded Systems Lead", year: "3rd Year" },
      { id: "2023ECE0041", name: "Fatima Sheikh", role: "App Developer", year: "2nd Year" },
    ],
    facultyMentor: { name: "Prof. Meena Sundaram", department: "Electronics & Communication Engineering" },
    industryPartner: "MedTech Innovations Ltd.",
  },
  {
    id: "ST003",
    teamName: "GreenFlow",
    teamCode: "ST003",
    status: "Changes Requested",
    title: "Smart Water Distribution Network for Urban Areas",
    department: "Civil Engineering",
    members: 4,
    submittedOn: "2024-11-20",
    problemCode: "ENV-2024-008",
    domain: "Smart Cities / IoT",
    proposedTimeline: "9 months (Feb 2025 – Oct 2025)",
    industryAlignment: "Jal Tech Corp",
    abstract:
      "An IoT-based sensor network for municipal water pipelines that detects leaks, pressure anomalies, and contamination in real time, routing alerts to a central dashboard for faster response. Pilot deployment targeted across 3 wards in Mumbai in partnership with Jal Tech Corp.",
    techStack: ["LoRaWAN", "Arduino", "Django", "React", "InfluxDB"],
    teamMembers: [
      { id: "2022CIV0076", name: "Vikram Deshmukh", role: "Team Leader", year: "3rd Year" },
      { id: "2022CIV0102", name: "Ananya Ghosh", role: "GIS & Data Lead", year: "3rd Year" },
      { id: "2023CIV0033", name: "Yash Patil", role: "Firmware Engineer", year: "2nd Year" },
      { id: "2022CIV0059", name: "Ritika Jain", role: "Backend Developer", year: "3rd Year" },
    ],
    facultyMentor: { name: "Dr. Suresh Pillai", department: "Civil Engineering" },
    industryPartner: "Jal Tech Corp",
  },
  {
    id: "ST004",
    teamName: "EduReach",
    teamCode: "ST004",
    status: "Pending",
    title: "Offline-First Learning Management System for Rural Schools",
    department: "Information Technology",
    members: 3,
    submittedOn: "2024-11-18",
    problemCode: "EDU-2024-045",
    domain: "EdTech",
    proposedTimeline: "6 months (May 2025 – Oct 2025)",
    industryAlignment: "EduTech Foundation",
    abstract:
      "A learning management system designed to function fully offline on low-cost Android tablets, syncing progress and content updates opportunistically whenever connectivity is available. Targets rural schools with intermittent or no internet access, covering grades 6–10 across core subjects.",
    techStack: ["Kotlin", "SQLite", "Firebase", "Node.js", "Docker"],
    teamMembers: [
      { id: "2022ITE0021", name: "Neha Kulkarni", role: "Team Leader", year: "3rd Year" },
      { id: "2022ITE0088", name: "Devansh Mehta", role: "Mobile Developer", year: "3rd Year" },
      { id: "2023ITE0012", name: "Sara Khan", role: "Backend Developer", year: "2nd Year" },
    ],
    facultyMentor: { name: "Prof. Anand Rajan", department: "Information Technology" },
    industryPartner: "EduTech Foundation",
  },
];

/** ------------------------------------------------------------------
 *  STATUS STYLE HELPERS
 * ------------------------------------------------------------------ */
const STATUS_STYLES = {
  Pending: { dot: "bg-orange-500", text: "text-orange-600", chip: "bg-orange-50 text-orange-600" },
  "Changes Requested": { dot: "bg-amber-500", text: "text-amber-600", chip: "bg-amber-50 text-amber-600" },
  Approved: { dot: "bg-emerald-500", text: "text-emerald-600", chip: "bg-emerald-50 text-emerald-600" },
  Rejected: { dot: "bg-red-500", text: "text-red-600", chip: "bg-red-50 text-red-600" },
};

function StatusPill({ status, chip = false }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
  if (chip) {
    return (
      <span className={`flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${style.chip}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        {status}
      </span>
    );
  }
  return (
    <span className={`flex items-center gap-1.5 text-sm font-medium ${style.text} shrink-0`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

/** ------------------------------------------------------------------
 *  LEFT COLUMN: REQUEST LIST
 * ------------------------------------------------------------------ */
function TeamApprovalRow({ request, isSelected, onClick }) {
  return (
    <div
      onClick={() => onClick(request)}
      className={`py-5 px-4 border-b border-neutral-100 last:border-none cursor-pointer border-l-2 ${
        isSelected ? "border-l-orange-500 bg-orange-50/40" : "border-l-transparent hover:bg-neutral-50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold flex items-center justify-center shrink-0">
            {request.teamName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900">{request.teamName}</p>
            <p className="text-xs text-neutral-400">{request.teamCode}</p>
          </div>
        </div>
        <StatusPill status={request.status} />
      </div>
      <p className="text-sm text-neutral-700 mt-2">{request.title}</p>
      <p className="text-xs text-neutral-500 mt-1.5">
        {request.department} · {request.members} members ·{" "}
        {new Date(request.submittedOn).toLocaleDateString("en-CA")}
      </p>
    </div>
  );
}

function RequestList({ requests, selectedId, onSelect, pendingCount, totalCount }) {
  return (
    <div>
      <div className="px-1 pb-4">
        <h2 className="text-lg font-semibold text-neutral-900">All Requests</h2>
        <p className="text-sm text-neutral-500 mt-1">
          {pendingCount} pending · {totalCount} total
        </p>
      </div>
      <div className="border-t border-neutral-100">
        {requests.map((request) => (
          <TeamApprovalRow
            key={request.id}
            request={request}
            isSelected={request.id === selectedId}
            onClick={() => onSelect(request.id)}
          />
        ))}
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  RIGHT COLUMN: REQUEST DETAIL
 * ------------------------------------------------------------------ */
function DetailInfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 flex-1 min-w-0">
      <p className="text-[11px] font-medium tracking-wide text-neutral-400">{label.toUpperCase()}</p>
      <p className="text-sm font-semibold text-neutral-900 mt-1">{value}</p>
    </div>
  );
}

function TeamMemberRow({ member }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold flex items-center justify-center shrink-0">
          {member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-900 truncate">{member.name}</p>
          <p className="text-xs text-neutral-500">
            {member.role} · {member.year}
          </p>
        </div>
      </div>
      <span className="text-xs text-neutral-400 shrink-0">{member.id}</span>
    </div>
  );
}

function RequestDetail({ request, onClose, onApprove, onRequestChanges, onReject }) {
  if (!request) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-white h-full flex items-center justify-center text-sm text-neutral-400 px-6 py-20">
        Select a request from the list to view its details.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-neutral-900">{request.teamName}</h2>
            <StatusPill status={request.status} chip />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 shrink-0"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>
        <p className="text-sm text-neutral-500 mt-1">
          {request.teamCode} · Submitted {new Date(request.submittedOn).toLocaleDateString("en-CA")}
        </p>

        <div className="mt-5 rounded-xl bg-orange-50/60 border border-orange-100 px-5 py-4">
          <p className="text-[11px] font-medium tracking-wide text-neutral-400">PROBLEM STATEMENT</p>
          <p className="text-base font-semibold text-neutral-900 mt-1">{request.title}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded px-2 py-1">
              {request.problemCode}
            </span>
            <span className="text-xs text-neutral-500">{request.domain}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <DetailInfoCard label="Department" value={request.department} />
          <DetailInfoCard label="Proposed Timeline" value={request.proposedTimeline} />
          <DetailInfoCard label="Industry Alignment" value={request.industryAlignment} />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-2">PROJECT ABSTRACT</p>
        <p className="text-sm text-neutral-700 leading-relaxed">{request.abstract}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {request.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-neutral-600 bg-neutral-100 rounded-lg px-2.5 py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-2xl border border-neutral-200 bg-white px-6 py-5">
          <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-1">TEAM MEMBERS</p>
          <div>
            {request.teamMembers.map((member) => (
              <TeamMemberRow key={member.id} member={member} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
          <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-2">FACULTY MENTOR</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold flex items-center justify-center shrink-0">
              {request.facultyMentor.name
                .replace(/^(Dr\.|Prof\.)\s*/, "")
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">{request.facultyMentor.name}</p>
              <p className="text-xs text-neutral-500">{request.facultyMentor.department}</p>
            </div>
          </div>

          <p className="text-[11px] font-medium tracking-wide text-neutral-400 mt-5 mb-1">INDUSTRY PARTNER</p>
          <p className="text-sm font-semibold text-neutral-900">{request.industryPartner}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onApprove(request)}
          className="flex-1 px-4 py-3 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Approve Team
        </button>
        <button
          onClick={() => onRequestChanges(request)}
          className="flex-1 px-4 py-3 rounded-lg bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors"
        >
          Request Changes
        </button>
        <button
          onClick={() => onReject(request)}
          className="flex-1 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  MAIN APPROVALS PAGE (master–detail layout)
 * ------------------------------------------------------------------
 *  To wire this up to a real backend:
 *    1. Replace `useState(TEAM_APPROVAL_REQUESTS)` with `useState([])`
 *       and fetch the list from '/api/approvals' in a `useEffect`.
 *    2. If detail fields (abstract, team members, etc.) are expensive
 *       to fetch, load them lazily in a `useEffect` keyed on
 *       `selectedId` instead of shipping them with the list.
 *    3. Wire `handleApprove` / `handleRequestChanges` / `handleReject`
 *       to POST/PATCH calls, then update the matching request's
 *       `status` in state (or refetch the list).
 *
 *  Mounted at "/approvals" — see App.jsx.
 * ------------------------------------------------------------------ */
export default function Approvals() {
  const [requests, setRequests] = useState(TEAM_APPROVAL_REQUESTS);
  const [selectedId, setSelectedId] = useState(null);

  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === "Pending").length,
    [requests]
  );
  const totalCount = requests.length;
  const selectedRequest = requests.find((r) => r.id === selectedId) ?? null;

  const updateStatus = (request, status) => {
    setRequests((prev) => prev.map((r) => (r.id === request.id ? { ...r, status } : r)));
  };

  const handleApprove = (request) => updateStatus(request, "Approved");
  const handleRequestChanges = (request) => updateStatus(request, "Changes Requested");
  const handleReject = (request) => updateStatus(request, "Rejected");

  return (
    <Layout pageTitle="Student Team Approvals">
      <div className={`grid gap-6 ${selectedRequest ? "grid-cols-[380px_1fr]" : "grid-cols-1"}`}>
        <div className={selectedRequest ? "" : "max-w-2xl"}>
          <RequestList
            requests={requests}
            selectedId={selectedId}
            onSelect={setSelectedId}
            pendingCount={pendingCount}
            totalCount={totalCount}
          />
        </div>

        {selectedRequest && (
          <RequestDetail
            request={selectedRequest}
            onClose={() => setSelectedId(null)}
            onApprove={handleApprove}
            onRequestChanges={handleRequestChanges}
            onReject={handleReject}
          />
        )}
      </div>
    </Layout>
  );
}
