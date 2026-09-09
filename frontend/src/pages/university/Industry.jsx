import React, { useState, useMemo } from "react";
import { X } from "lucide-react";
import Layout from "./Layout";

/**
 * ------------------------------------------------------------------
 *  DUMMY DATA
 *  Shaped the way a real API response would look, so that swapping
 *  this out for a fetch('/api/industry-requests') call later only
 *  means replacing the useState initializer below — no JSX changes
 *  needed. Each request now also carries the detail fields the
 *  right-hand panel needs (projectTitle, supportOffered, description,
 *  linkedProblemStatement). In a real app you might lazy-load these
 *  per-request on selection instead of shipping them all up front —
 *  swap the `useState` below for a `useEffect` fetch keyed on
 *  `selectedId` when you get there.
 * ------------------------------------------------------------------
 */
const PARTNERSHIP_REQUESTS = [
  {
    id: "agribot",
    company: "Agribot Solutions Pvt. Ltd.",
    initials: "AS",
    contactName: "Rajendra Mistry",
    contactRole: "Chief Technology Officer",
    offer: "Technical Mentorship + Seed Funding",
    value: "₹4,50,000",
    status: "Approved",
    submittedOn: "2024-11-22",
    projectTitle: "Edge AI for Precision Agriculture",
    partnershipType: "Technical Mentorship + Seed Funding",
    duration: "8 months",
    supportOffered: "₹4,50,000 seed funding · 2 dedicated engineer mentors · Proprietary drone & sensor kit",
    description:
      "Agribot Solutions proposes co-developing AI-powered crop monitoring systems with student teams. They will provide proprietary drone hardware, IoT sensor kits, twice-weekly technical mentoring, and seed funding for prototype manufacturing and field deployment.",
    linkedProblemStatement: { code: "AGR-2024-017", domain: "AgriTech" },
    decisionNote: "Decision recorded. Partner has been notified.",
  },
  {
    id: "medtech",
    company: "MedTech Innovations Ltd.",
    initials: "MI",
    contactName: "Dr. Pradeep Joshi",
    contactRole: "Head of R&D",
    offer: "Research Collaboration + Equipment Grant",
    value: "₹2,00,000",
    status: "Pending",
    submittedOn: "2024-11-20",
    projectTitle: "Assistive Communication Hardware Research",
    partnershipType: "Research Collaboration + Equipment Grant",
    duration: "10 months",
    supportOffered: "₹2,00,000 equipment grant · Lab access · Clinical validation support",
    description:
      "MedTech Innovations proposes a joint research collaboration to validate assistive-communication hardware prototypes. They will provide lab access, clinical trial coordination with partner hospitals, and equipment funding for sensor and enclosure prototyping.",
    linkedProblemStatement: { code: "HLT-2024-032", domain: "HealthTech / Assistive Tech" },
    decisionNote: null,
  },
  {
    id: "jaltech",
    company: "Jal Tech Corp",
    initials: "JT",
    contactName: "Snehal Kothari",
    contactRole: "VP Engineering",
    offer: "Pilot Deployment + Full Funding",
    value: "₹6,00,000",
    status: "Approved",
    submittedOn: "2024-11-15",
    projectTitle: "Municipal Smart Water Pilot",
    partnershipType: "Pilot Deployment + Full Funding",
    duration: "9 months",
    supportOffered: "₹6,00,000 full funding · Field deployment across 3 wards · Dedicated site engineer",
    description:
      "Jal Tech Corp proposes fully funding a pilot deployment of the smart water distribution network across 3 municipal wards in Mumbai, providing field installation support, a dedicated site engineer, and ongoing maintenance data access for the student team.",
    linkedProblemStatement: { code: "ENV-2024-008", domain: "Smart Cities / IoT" },
    decisionNote: "Decision recorded. Partner has been notified.",
  },
  {
    id: "cloudsync",
    company: "CloudSync Infrastructure",
    initials: "CI",
    contactName: "Anita Bose",
    contactRole: "Head of Partnerships",
    offer: "Cloud Credits + Internship Pipeline",
    value: "$5,000 credits",
    status: "Pending",
    submittedOn: "2024-11-10",
    projectTitle: "Offline-First LMS Cloud Infrastructure",
    partnershipType: "Cloud Credits + Internship Pipeline",
    duration: "6 months",
    supportOffered: "$5,000 cloud credits · Priority internship pipeline · DevOps mentoring",
    description:
      "CloudSync Infrastructure proposes supporting the offline-first LMS project with cloud hosting credits for the sync backend, DevOps mentoring for scaling to more schools, and a priority internship pipeline for graduating team members.",
    linkedProblemStatement: { code: "EDU-2024-045", domain: "EdTech" },
    decisionNote: null,
  },
];

/** ------------------------------------------------------------------
 *  STATUS STYLE HELPERS
 * ------------------------------------------------------------------ */
const STATUS_STYLES = {
  Pending: { dot: "bg-orange-500", text: "text-orange-600", chip: "bg-orange-50 text-orange-600" },
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
function PartnershipRequestRow({ request, isSelected, onClick }) {
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
            {request.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">{request.company}</p>
            <p className="text-xs text-neutral-400 truncate">
              {request.contactName} · {request.contactRole}
            </p>
          </div>
        </div>
        <StatusPill status={request.status} />
      </div>
      <p className="text-sm text-neutral-700 mt-2">
        {request.offer} <span className="text-orange-600 font-medium">· {request.value}</span>
      </p>
      <p className="text-xs text-neutral-500 mt-1.5">
        {new Date(request.submittedOn).toLocaleDateString("en-CA")}
      </p>
    </div>
  );
}

function RequestList({ requests, selectedId, onSelect, pendingCount, totalCount }) {
  return (
    <div>
      <div className="px-1 pb-4">
        <h2 className="text-lg font-semibold text-neutral-900">Partnership Requests</h2>
        <p className="text-sm text-neutral-500 mt-1">
          {pendingCount} pending · {totalCount} total
        </p>
      </div>
      <div className="border-t border-neutral-100">
        {requests.map((request) => (
          <PartnershipRequestRow
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

function RequestDetail({ request, onClose, onApprove, onReject }) {
  if (!request) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-white h-full flex items-center justify-center text-sm text-neutral-400 px-6 py-20">
        Select a request from the list to view its details.
      </div>
    );
  }

  const decisionStyle = STATUS_STYLES[request.status] ?? STATUS_STYLES.Pending;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-neutral-100 text-neutral-600 text-sm font-semibold flex items-center justify-center shrink-0">
              {request.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-neutral-900">{request.company}</h2>
                <StatusPill status={request.status} chip />
              </div>
              <p className="text-sm text-neutral-500 mt-1">
                {request.contactName} · {request.contactRole} ·{" "}
                {new Date(request.submittedOn).toLocaleDateString("en-CA")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 shrink-0"
          >
            <X className="w-4 h-4 text-neutral-500" />
          </button>
        </div>

        <div className="flex gap-4 mt-5">
          <DetailInfoCard label="Project Title" value={request.projectTitle} />
          <DetailInfoCard label="Partnership Type" value={request.partnershipType} />
          <DetailInfoCard label="Duration" value={request.duration} />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-2">SUPPORT OFFERED</p>
        <div className="rounded-xl bg-orange-50/60 border border-orange-100 px-5 py-4">
          <p className="text-sm font-medium text-orange-700">{request.supportOffered}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-2">PARTNERSHIP DESCRIPTION</p>
        <p className="text-sm text-neutral-700 leading-relaxed">{request.description}</p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
        <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-2">LINKED PROBLEM STATEMENT</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-600 bg-neutral-100 rounded px-2 py-1">
            {request.linkedProblemStatement.code}
          </span>
          <span className="text-xs text-neutral-500">{request.linkedProblemStatement.domain}</span>
        </div>
      </div>

      {request.status === "Pending" ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onApprove(request)}
            className="flex-1 px-4 py-3 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Approve Partnership
          </button>
          <button
            onClick={() => onReject(request)}
            className="flex-1 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Reject
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-4 flex items-center gap-2.5">
          <span className={`flex items-center gap-1.5 text-sm font-medium ${decisionStyle.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${decisionStyle.dot}`} />
            {request.status}
          </span>
          <span className="text-sm text-neutral-500">
            {request.decisionNote ?? "Decision recorded. Partner has been notified."}
          </span>
        </div>
      )}
    </div>
  );
}

/** ------------------------------------------------------------------
 *  MAIN INDUSTRY PARTNERSHIPS PAGE (master–detail layout)
 * ------------------------------------------------------------------
 *  To wire this up to a real backend:
 *    1. Replace `useState(PARTNERSHIP_REQUESTS)` with `useState([])`
 *       and fetch the list from '/api/industry-requests' in a
 *       `useEffect`.
 *    2. If detail fields (description, supportOffered, etc.) are
 *       expensive to fetch, load them lazily in a `useEffect` keyed
 *       on `selectedId` instead of shipping them with the list.
 *    3. Wire `handleApprove` / `handleReject` to POST/PATCH calls,
 *       then update the matching request's `status` in state (or
 *       refetch the list).
 *
 *  Mounted at "/industry" — see App.jsx.
 * ------------------------------------------------------------------ */
export default function Industry() {
  const [requests, setRequests] = useState(PARTNERSHIP_REQUESTS);
  const [selectedId, setSelectedId] = useState(null);

  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === "Pending").length,
    [requests]
  );
  const totalCount = requests.length;
  const selectedRequest = requests.find((r) => r.id === selectedId) ?? null;

  const updateStatus = (request, status) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === request.id
          ? { ...r, status, decisionNote: "Decision recorded. Partner has been notified." }
          : r
      )
    );
  };

  const handleApprove = (request) => updateStatus(request, "Approved");
  const handleReject = (request) => updateStatus(request, "Rejected");

  return (
    <Layout pageTitle="Industry Partnerships">
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
            onReject={handleReject}
          />
        )}
      </div>
    </Layout>
  );
}
