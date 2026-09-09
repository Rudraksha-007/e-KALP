import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Paperclip, Download, FileText } from "lucide-react";
import Layout from "./Layout";

/**
 * ------------------------------------------------------------------
 *  DUMMY DATA
 *  Shaped the way a real API response would look, so that swapping
 *  this out for a fetch(`/api/projects/${id}`) call later only means
 *  replacing the useState initializer below — no JSX changes needed.
 *  Keyed by project id so <ProjectDetail /> can look itself up from
 *  the :id route param (see App.jsx).
 * ------------------------------------------------------------------
 */
const PROJECT_DETAILS = {
  "edge-ai-crop": {
    id: "edge-ai-crop",
    code: "AGR-2024-017",
    domain: "AgriTech / AI",
    title: "Edge AI Crop Disease Detection",
    status: "On Track",
    startDate: "2024-08-01",
    endDate: "2025-04-30",
    progress: 68,
    milestonesDone: 3,
    milestonesTotal: 7,
    team: { name: "InnoVision", members: 4, leader: "Arjun Sharma" },
    department: { name: "CSE", subtitle: "AgriTech / AI" },
    facultyMentor: { name: "Dr. Ramesh Krishnamurthy", subtitle: "Academic oversight" },
    industryPartner: { name: "Agribot Solutions Pvt. Ltd.", subtitle: "Strategic partner" },
    objectives: [
      "Design a lightweight CNN model deployable on Raspberry Pi 4 with <500ms inference latency",
      "Achieve ≥92% accuracy across 18 disease categories in 5 major crops",
      "Build farmer-facing mobile app with offline support and regional language alerts",
      "Complete field pilot across 3 farms in Maharashtra with Agribot hardware kit",
    ],
    teamMembers: [
      { id: "AS", name: "Arjun Sharma", role: "Team Leader", isLead: true },
      { id: "PM", name: "Priya Menon", role: "AI Engineer", isLead: false },
      { id: "RD", name: "Rohit Das", role: "Hardware Lead", isLead: false },
      { id: "SI", name: "Sneha Iyer", role: "Backend Developer", isLead: false },
    ],
    milestones: [
      {
        id: "m1",
        title: "Problem Analysis & Literature Review",
        due: "2024-09-01",
        description: "Review 40+ papers on edge ML, crop disease classification, and drone deployment patterns.",
        status: "Completed",
      },
      {
        id: "m2",
        title: "Dataset Collection & Annotation",
        due: "2024-10-15",
        description: "Collect and annotate 12,000+ field images across 18 disease categories.",
        status: "Completed",
      },
      {
        id: "m3",
        title: "Model Training v1 (MobileNetV3)",
        due: "2024-11-30",
        description: "Train baseline model, achieve >88% validation accuracy.",
        status: "Completed",
      },
      {
        id: "m4",
        title: "Edge Deployment on Raspberry Pi",
        due: "2024-12-31",
        description: "Optimize with TFLite, benchmark latency under 500ms.",
        status: "Upcoming",
      },
      {
        id: "m5",
        title: "Drone Integration & Field Testing",
        due: "2025-02-15",
        description: "Mount camera module, run autonomous scan of 2-acre test plot.",
        status: "Upcoming",
      },
      {
        id: "m6",
        title: "Farmer App (Android + Marathi)",
        due: "2025-03-15",
        description: "React Native app with push alerts and offline disease library.",
        status: "Upcoming",
      },
      {
        id: "m7",
        title: "Pilot Deployment & Evaluation",
        due: "2025-04-30",
        description: "Deploy across 3 partner farms and evaluate field accuracy vs lab accuracy.",
        status: "Upcoming",
      },
    ],
    progressUpdates: [
      {
        id: "u1",
        author: "Arjun Sharma",
        role: "Team Leader",
        date: "2024-11-28",
        text: "MobileNetV3 training complete — achieved 94.2% validation accuracy on 12,400 annotated images. Starting TFLite quantization this week. First edge inference benchmarks expected by Dec 5.",
        attachment: "model_metrics_v3.pdf",
      },
      {
        id: "u2",
        author: "Rohit Das",
        role: "Hardware Lead",
        date: "2024-11-14",
        text: "Received the Agribot hardware kit — 2× Raspberry Pi 4B (8GB), camera modules, and 6 IoT soil sensors. Initial unquantized inference: 1.2s per frame. Post-quantization target is <400ms.",
        attachment: null,
      },
      {
        id: "u3",
        author: "Priya Menon",
        role: "AI Engineer",
        date: "2024-10-30",
        text: "Dataset annotation complete. Final count: 12,400 images, 18 categories, 5 crops. Class balance maintained via augmentation. Validation split: 80/10/10 train/val/test.",
        attachment: "dataset_summary_v2.xlsx",
      },
    ],
    documents: [
      { id: "d1", name: "Project Proposal v2.pdf", type: "PDF", uploadedOn: "2024-08-15" },
      { id: "d2", name: "Dataset Annotation Guide.xlsx", type: "Excel", uploadedOn: "2024-09-30" },
      { id: "d3", name: "Model Training Report v3.pdf", type: "PDF", uploadedOn: "2024-11-28" },
      { id: "d4", name: "Hardware Setup Guide.pdf", type: "PDF", uploadedOn: "2024-11-14" },
    ],
  },

  "accessible-comm": {
    id: "accessible-comm",
    code: "HLT-2024-032",
    domain: "HealthTech",
    title: "Accessible Communication Device for Non-Verbal Autism Patients",
    status: "Needs Attention",
    startDate: "2024-09-01",
    endDate: "2025-06-30",
    progress: 42,
    milestonesDone: 2,
    milestonesTotal: 6,
    team: { name: "NeuroBridge", members: 3, leader: "Kavya Nair" },
    department: { name: "ECE", subtitle: "HealthTech / Assistive Tech" },
    facultyMentor: { name: "Prof. Meena Sundaram", subtitle: "Academic oversight" },
    industryPartner: { name: "MedTech Innovations Ltd.", subtitle: "Strategic partner" },
    objectives: [
      "Build a wearable gesture + eye-tracking input device with <200ms response time",
      "Achieve ≥90% gesture recognition accuracy across 25 pre-set commands",
      "Develop caregiver companion app for vocabulary customization and usage tracking",
      "Complete clinical pilot with 10 patients in partnership with MedTech Innovations",
    ],
    teamMembers: [
      { id: "KN", name: "Kavya Nair", role: "Team Leader", isLead: true },
      { id: "AR", name: "Aditya Rao", role: "Embedded Systems Lead", isLead: false },
      { id: "FS", name: "Fatima Sheikh", role: "App Developer", isLead: false },
    ],
    milestones: [
      {
        id: "m1",
        title: "Requirements & Clinical Consultation",
        due: "2024-09-20",
        description: "Consult with speech therapists and 3 partner families to finalize gesture vocabulary.",
        status: "Completed",
      },
      {
        id: "m2",
        title: "Sensor Prototype v1",
        due: "2024-11-05",
        description: "Assemble ESP32 + IMU gesture sensor prototype, calibrate against 25 gestures.",
        status: "Completed",
      },
      {
        id: "m3",
        title: "Speech Synthesis Integration",
        due: "2024-12-20",
        description: "Integrate on-device text-to-speech with regional language support.",
        status: "Upcoming",
      },
      {
        id: "m4",
        title: "Caregiver App (Flutter)",
        due: "2025-02-10",
        description: "Build vocabulary customization and usage analytics dashboard.",
        status: "Upcoming",
      },
      {
        id: "m5",
        title: "Wearable Enclosure & Field Testing",
        due: "2025-04-15",
        description: "3D-print enclosure, run comfort and durability testing with 5 volunteers.",
        status: "Upcoming",
      },
      {
        id: "m6",
        title: "Clinical Pilot & Evaluation",
        due: "2025-06-30",
        description: "10-patient clinical pilot with MedTech Innovations, gather outcome data.",
        status: "Upcoming",
      },
    ],
    progressUpdates: [
      {
        id: "u1",
        author: "Aditya Rao",
        role: "Embedded Systems Lead",
        date: "2024-11-20",
        text: "Sensor prototype v1 assembled and calibrated. Gesture recognition currently at 86% — below our 90% target. Investigating IMU noise filtering to improve accuracy before the next milestone review.",
        attachment: "gesture_calibration_log.pdf",
      },
      {
        id: "u2",
        author: "Kavya Nair",
        role: "Team Leader",
        date: "2024-11-02",
        text: "Completed clinical consultations with 3 partner families and 2 speech therapists. Finalized a 25-gesture vocabulary covering essential needs, emotions, and social phrases.",
        attachment: null,
      },
    ],
    documents: [
      { id: "d1", name: "Project Proposal v1.pdf", type: "PDF", uploadedOn: "2024-09-05" },
      { id: "d2", name: "Gesture Vocabulary Spec.pdf", type: "PDF", uploadedOn: "2024-11-02" },
    ],
  },

  "smart-water": {
    id: "smart-water",
    code: "ENV-2024-008",
    domain: "Smart Cities / IoT",
    title: "Smart Water Distribution Network",
    status: "Delayed",
    startDate: "2024-10-01",
    endDate: "2025-07-31",
    progress: 15,
    milestonesDone: 1,
    milestonesTotal: 4,
    team: { name: "GreenFlow", members: 4, leader: "Vikram Deshmukh" },
    department: { name: "Civil", subtitle: "Smart Cities / IoT" },
    facultyMentor: { name: "Dr. Suresh Pillai", subtitle: "Academic oversight" },
    industryPartner: { name: "Jal Tech Corp", subtitle: "Strategic partner" },
    objectives: [
      "Deploy LoRaWAN sensor network across 3 municipal wards for leak and pressure detection",
      "Build central dashboard with real-time contamination and pressure anomaly alerts",
      "Reduce average leak-response time from 5 days to under 24 hours in pilot wards",
      "Complete pilot deployment and handover documentation with Jal Tech Corp",
    ],
    teamMembers: [
      { id: "VD", name: "Vikram Deshmukh", role: "Team Leader", isLead: true },
      { id: "AG", name: "Ananya Ghosh", role: "GIS & Data Lead", isLead: false },
      { id: "YP", name: "Yash Patil", role: "Firmware Engineer", isLead: false },
      { id: "RJ", name: "Ritika Jain", role: "Backend Developer", isLead: false },
    ],
    milestones: [
      {
        id: "m1",
        title: "Site Survey & Sensor Placement Plan",
        due: "2024-10-25",
        description: "Survey pilot wards, finalize 40 sensor placement points with Jal Tech Corp.",
        status: "Completed",
      },
      {
        id: "m2",
        title: "LoRaWAN Network Deployment",
        due: "2025-01-15",
        description: "Install gateways and sensor nodes across pilot wards.",
        status: "Upcoming",
      },
      {
        id: "m3",
        title: "Central Dashboard (v1)",
        due: "2025-04-01",
        description: "Build Django + React dashboard for leak, pressure, and contamination alerts.",
        status: "Upcoming",
      },
      {
        id: "m4",
        title: "Pilot Evaluation & Handover",
        due: "2025-07-31",
        description: "Evaluate response-time improvement, hand over system to municipal operators.",
        status: "Upcoming",
      },
    ],
    progressUpdates: [
      {
        id: "u1",
        author: "Vikram Deshmukh",
        role: "Team Leader",
        date: "2024-11-18",
        text: "Sensor procurement delayed by ~3 weeks due to a supplier issue on Jal Tech's side. Site survey is complete, but LoRaWAN deployment (Milestone 2) is now at risk of slipping into February. Flagging for mentor review.",
        attachment: null,
      },
      {
        id: "u2",
        author: "Ananya Ghosh",
        role: "GIS & Data Lead",
        date: "2024-10-28",
        text: "Completed GIS survey of all 3 pilot wards and finalized 40 candidate sensor placement points based on pipeline age and historical complaint density.",
        attachment: "sensor_placement_map.pdf",
      },
    ],
    documents: [
      { id: "d1", name: "Site Survey Report.pdf", type: "PDF", uploadedOn: "2024-10-28" },
      { id: "d2", name: "Sensor Placement Map.pdf", type: "PDF", uploadedOn: "2024-10-28" },
    ],
  },

  "offline-lms": {
    id: "offline-lms",
    code: "EDU-2024-045",
    domain: "EdTech",
    title: "Offline-First LMS for Rural Schools",
    status: "Completed",
    startDate: "2024-05-01",
    endDate: "2024-11-30",
    progress: 100,
    milestonesDone: 6,
    milestonesTotal: 6,
    team: { name: "EduReach", members: 3, leader: "Neha Kulkarni" },
    department: { name: "IT", subtitle: "EdTech" },
    facultyMentor: { name: "Prof. Anand Rajan", subtitle: "Academic oversight" },
    industryPartner: { name: "EduTech Foundation", subtitle: "Strategic partner" },
    objectives: [
      "Build offline-first LMS running on low-cost Android tablets for grades 6–10",
      "Support opportunistic sync when connectivity becomes available",
      "Deploy across 5 rural schools with intermittent connectivity",
      "Achieve ≥85% weekly active usage among enrolled students during pilot",
    ],
    teamMembers: [
      { id: "NK", name: "Neha Kulkarni", role: "Team Leader", isLead: true },
      { id: "DM", name: "Devansh Mehta", role: "Mobile Developer", isLead: false },
      { id: "SK", name: "Sara Khan", role: "Backend Developer", isLead: false },
    ],
    milestones: [
      { id: "m1", title: "Requirements & School Onboarding", due: "2024-05-25", description: "Onboard 5 partner schools, gather curriculum and device constraints.", status: "Completed" },
      { id: "m2", title: "Offline Storage Architecture", due: "2024-07-01", description: "Design SQLite-based offline content and progress storage.", status: "Completed" },
      { id: "m3", title: "Sync Engine (v1)", due: "2024-08-15", description: "Build opportunistic sync engine with conflict resolution.", status: "Completed" },
      { id: "m4", title: "Teacher & Student App", due: "2024-09-30", description: "Kotlin app for grades 6–10, core subjects.", status: "Completed" },
      { id: "m5", title: "Pilot Deployment", due: "2024-11-01", description: "Deploy tablets and content across 5 rural schools.", status: "Completed" },
      { id: "m6", title: "Evaluation & Handover", due: "2024-11-30", description: "Measure usage, gather feedback, hand over to EduTech Foundation.", status: "Completed" },
    ],
    progressUpdates: [
      {
        id: "u1",
        author: "Neha Kulkarni",
        role: "Team Leader",
        date: "2024-11-30",
        text: "Pilot complete across all 5 schools. Final weekly active usage: 89%, ahead of our 85% target. Handover documentation and training materials delivered to EduTech Foundation.",
        attachment: "pilot_evaluation_report.pdf",
      },
    ],
    documents: [
      { id: "d1", name: "Final Evaluation Report.pdf", type: "PDF", uploadedOn: "2024-11-30" },
      { id: "d2", name: "Deployment Guide.pdf", type: "PDF", uploadedOn: "2024-11-01" },
    ],
  },
};

/** ------------------------------------------------------------------
 *  STYLE HELPERS
 * ------------------------------------------------------------------ */
const STATUS_STYLES = {
  "On Track": { dot: "bg-emerald-500", text: "text-emerald-600" },
  "Needs Attention": { dot: "bg-amber-500", text: "text-amber-600" },
  Delayed: { dot: "bg-red-500", text: "text-red-600" },
  Completed: { dot: "bg-blue-500", text: "text-blue-600" },
};

const PROGRESS_BAR_COLOR = {
  "On Track": "bg-orange-500",
  "Needs Attention": "bg-amber-500",
  Delayed: "bg-red-500",
  Completed: "bg-blue-500",
};

const MILESTONE_STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-600",
  Upcoming: "bg-neutral-100 text-neutral-500",
  "In Progress": "bg-orange-50 text-orange-600",
};

const DOC_ICON_STYLES = {
  PDF: "bg-orange-50 text-orange-600",
  Excel: "bg-emerald-50 text-emerald-600",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-CA");
}

function initialsOf(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** ------------------------------------------------------------------
 *  SECTION COMPONENTS
 * ------------------------------------------------------------------ */

function ProjectHeader({ project }) {
  const style = STATUS_STYLES[project.status] ?? STATUS_STYLES["On Track"];
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-neutral-500 bg-neutral-100 rounded px-1.5 py-0.5">
              {project.code}
            </span>
            <span className="text-xs text-neutral-400">{project.domain}</span>
            <span className={`flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {project.status}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mt-2">{project.title}</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {formatDate(project.startDate)} → {formatDate(project.endDate)}
          </p>
        </div>

        <div className="text-right shrink-0 w-48">
          <p className="text-4xl font-bold text-orange-500 leading-none">{project.progress}%</p>
          <p className="text-xs text-neutral-500 mt-1">overall progress</p>
          <div className="mt-3 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${PROGRESS_BAR_COLOR[project.status]}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            {project.milestonesDone}/{project.milestonesTotal} milestones
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3">
          <p className="text-[11px] font-medium tracking-wide text-neutral-400">TEAM</p>
          <p className="text-sm font-semibold text-neutral-900 mt-1">{project.team.name}</p>
          <p className="text-xs text-neutral-500">
            {project.team.members} members · {project.team.leader} (Leader)
          </p>
        </div>
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3">
          <p className="text-[11px] font-medium tracking-wide text-neutral-400">DEPARTMENT</p>
          <p className="text-sm font-semibold text-neutral-900 mt-1">{project.department.name}</p>
          <p className="text-xs text-neutral-500">{project.department.subtitle}</p>
        </div>
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3">
          <p className="text-[11px] font-medium tracking-wide text-neutral-400">FACULTY MENTOR</p>
          <p className="text-sm font-semibold text-neutral-900 mt-1">{project.facultyMentor.name}</p>
          <p className="text-xs text-neutral-500">{project.facultyMentor.subtitle}</p>
        </div>
        <div className="rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3">
          <p className="text-[11px] font-medium tracking-wide text-neutral-400">INDUSTRY PARTNER</p>
          <p className="text-sm font-semibold text-neutral-900 mt-1">{project.industryPartner.name}</p>
          <p className="text-xs text-neutral-500">{project.industryPartner.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectObjectives({ objectives }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-4">PROJECT OBJECTIVES</p>
      <div className="space-y-4">
        {objectives.map((objective, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-neutral-700 leading-relaxed">{objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamMembersCard({ members }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-3">TEAM MEMBERS</p>
      <div>
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold flex items-center justify-center shrink-0">
                {member.id}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">{member.name}</p>
                <p className="text-xs text-neutral-500">{member.role}</p>
              </div>
            </div>
            {member.isLead && (
              <span className="text-xs font-medium text-orange-600 bg-orange-50 rounded-full px-2.5 py-1 shrink-0">
                Lead
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestonesList({ milestones, doneCount, totalCount }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-medium tracking-wide text-neutral-400">MILESTONES</p>
        <span className="text-xs text-neutral-500">
          {doneCount}/{totalCount} complete
        </span>
      </div>
      <div>
        {milestones.map((milestone) => {
          const isCompleted = milestone.status === "Completed";
          return (
            <div
              key={milestone.id}
              className="flex items-start justify-between gap-4 py-4 border-b border-neutral-100 last:border-none"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isCompleted ? "bg-orange-500 text-white" : "border-2 border-neutral-200"
                  }`}
                >
                  {isCompleted && (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.415 0l-3.5-3.5a1 1 0 111.415-1.415L8.5 12.086l6.79-6.79a1 1 0 011.414-.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">{milestone.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Due: {milestone.due}</p>
                  <p className="text-sm text-neutral-600 mt-1.5">{milestone.description}</p>
                </div>
              </div>
              <span
                className={`text-xs font-medium rounded-full px-2.5 py-1 shrink-0 ${
                  MILESTONE_STATUS_STYLES[milestone.status] ?? MILESTONE_STATUS_STYLES.Upcoming
                }`}
              >
                {milestone.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineCard({ startDate, endDate, progress }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-3">TIMELINE</p>
      <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
        <div className="h-full rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-neutral-500">
        <span>{formatDate(startDate)}</span>
        <span>{formatDate(endDate)}</span>
      </div>
    </div>
  );
}

function SpocActions({ onAction }) {
  const actions = [
    { id: "open-workspace", label: "Open Workspace →", tone: "primary" },
    { id: "flag-review", label: "Flag for Review", tone: "ghost" },
    { id: "message-team", label: "Message Team", tone: "ghost" },
    { id: "contact-mentor", label: "Contact Mentor", tone: "ghost" },
    { id: "download-report", label: "Download Report", tone: "ghost" },
  ];
  const toneClasses = {
    primary: "bg-orange-500 text-white hover:bg-orange-600",
    ghost: "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50",
  };
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-3">SPOC ACTIONS</p>
      <div className="space-y-2.5">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className={`w-full text-left text-sm font-medium rounded-lg px-4 py-2.5 transition-colors ${toneClasses[action.tone]}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProgressUpdateRow({ update }) {
  return (
    <div className="py-5 border-b border-neutral-100 last:border-none">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold flex items-center justify-center shrink-0">
          {initialsOf(update.author)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-sm font-semibold text-neutral-900">{update.author}</p>
            <span className="text-xs text-neutral-400">{update.role}</span>
            <span className="text-xs text-neutral-400">· {update.date}</span>
          </div>
          <p className="text-sm text-neutral-700 mt-1.5 leading-relaxed">{update.text}</p>
          {update.attachment && (
            <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100 rounded-lg px-2.5 py-1.5 mt-2">
              <Paperclip className="w-3 h-3" />
              {update.attachment}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function LatestProgressUpdates({ updates }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <p className="text-[11px] font-medium tracking-wide text-neutral-400 mb-1">LATEST PROGRESS UPDATES</p>
      <div>
        {updates.map((update) => (
          <ProgressUpdateRow key={update.id} update={update} />
        ))}
      </div>
    </div>
  );
}

function DocumentRow({ document, onDownload }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-none">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 ${
            DOC_ICON_STYLES[document.type] ?? "bg-neutral-100 text-neutral-500"
          }`}
        >
          {document.type}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-neutral-900 truncate">{document.name}</p>
          <p className="text-xs text-neutral-500">Uploaded {document.uploadedOn}</p>
        </div>
      </div>
      <button
        onClick={() => onDownload(document)}
        className="w-8 h-8 rounded-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 shrink-0"
      >
        <Download className="w-4 h-4 text-neutral-500" />
      </button>
    </div>
  );
}

function DocumentsCard({ documents, onUpload, onDownload }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[11px] font-medium tracking-wide text-neutral-400">DOCUMENTS</p>
        <button onClick={onUpload} className="text-xs font-medium text-orange-600 hover:text-orange-700">
          Upload →
        </button>
      </div>
      <div>
        {documents.map((doc) => (
          <DocumentRow key={doc.id} document={doc} onDownload={onDownload} />
        ))}
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  MAIN PROJECT DETAILS PAGE
 * ------------------------------------------------------------------
 *  Reads the project id from the "/projects/:id" route param and
 *  looks it up in the dummy PROJECT_DETAILS map. To wire this up to
 *  a real backend:
 *    1. Replace `useState(PROJECT_DETAILS[id])` with `useState(null)`.
 *    2. Add a `useEffect` that fetches `/api/projects/${id}` and
 *       calls `setProject(data)` (show a loading state in between).
 *    3. Everything else — JSX, section components — stays the same,
 *       since it's all derived from `project`.
 *
 *  Mounted at "/projects/:id" — see App.jsx. Reached by clicking a
 *  project card on the Projects page (see Projects.jsx).
 * ------------------------------------------------------------------ */
export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project] = useState(PROJECT_DETAILS[id]);

  const handleSpocAction = (actionId) => {
    // Hook these up to real behaviour once the backend exists, e.g.
    // "open-workspace" -> navigate to an external workspace URL,
    // "download-report" -> trigger a report export download, etc.
    console.log("SPOC action:", actionId);
  };

  const handleUpload = () => {
    console.log("Open upload dialog for project", id);
  };

  const handleDownload = (document) => {
    console.log("Download document", document.id);
  };

  if (!project) {
    return (
      <Layout pageTitle="Project Details">
        <button
          onClick={() => navigate("/university/projects")}
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-700"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Projects
        </button>
        <div className="rounded-2xl border border-dashed border-neutral-200 bg-white px-6 py-16 text-center text-sm text-neutral-400">
          Project not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Project Details">
      <button
        onClick={() => navigate("/university/projects")}
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-700"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Projects
      </button>

      <ProjectHeader project={project} />

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2 space-y-6">
          <ProjectObjectives objectives={project.objectives} />
          <MilestonesList
            milestones={project.milestones}
            doneCount={project.milestonesDone}
            totalCount={project.milestonesTotal}
          />
          <LatestProgressUpdates updates={project.progressUpdates} />
          <DocumentsCard documents={project.documents} onUpload={handleUpload} onDownload={handleDownload} />
        </div>

        <div className="space-y-6">
          <TeamMembersCard members={project.teamMembers} />
          <TimelineCard startDate={project.startDate} endDate={project.endDate} progress={project.progress} />
          <SpocActions onAction={handleSpocAction} />
        </div>
      </div>
    </Layout>
  );
}
