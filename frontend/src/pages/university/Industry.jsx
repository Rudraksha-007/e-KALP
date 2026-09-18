import React, { useState, useMemo } from "react";
import { X } from "lucide-react";
import Layout from "./Layout";

/**
 * ------------------------------------------------------------------
 *  INDUSTRY PARTNERSHIPS
 *  The backend does not currently expose industry-partnership requests.
 *  This page keeps the master–detail UI but renders an empty state
 *  until that endpoint exists.
 * ------------------------------------------------------------------
 */

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
          {requests.length === 0
            ? "No requests yet"
            : `${pendingCount} pending · ${totalCount} total`}
        </p>
      </div>
      <div className="border-t border-neutral-100">
        {requests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-neutral-500">
              The industry partnership workflow is not available in this build yet.
            </p>
          </div>
        ) : (
          requests.map((request) => (
            <PartnershipRequestRow
              key={request.id}
              request={request}
              isSelected={request.id === selectedId}
              onClick={() => onSelect(request.id)}
            />
          ))
        )}
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
 * ------------------------------------------------------------------ */
export default function Industry() {
  const [requests, setRequests] = useState([]);
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