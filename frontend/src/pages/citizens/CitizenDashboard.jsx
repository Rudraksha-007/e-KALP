// import { useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CitizenLayout from "./CitizenLayout";
// import CategoryFilterBar from "./CategoryFilter";
// import ProblemCard from "./ProblemCard";
// import { useAuth } from "../../context/AuthContext";
// import { DUMMY_PROBLEMS, DUMMY_USER } from "./dummyProblems";

// const SORT_OPTIONS = [
//   { value: "priority", label: "Priority" },
//   { value: "recent", label: "Most recent" },
//   { value: "affected", label: "Most affected" },
// ];

// const PRIORITY_RANK = { critical: 0, high: 1, medium: 2 };

// export default function CitizenDashboard() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [category, setCategory] = useState("all");
//   const [sort, setSort] = useState("priority");

//   const firstName = (user?.name ?? DUMMY_USER.name).split(" ")[0];
//   const location = `${DUMMY_USER.village}, ${DUMMY_USER.district}`;

//   const problems = useMemo(() => {
//     let list = DUMMY_PROBLEMS.filter((p) => category === "all" || p.category === category);
//     list = [...list].sort((a, b) => {
//       if (sort === "priority") return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
//       if (sort === "affected") return b.affected - a.affected;
//       return 0; // "recent" — dummy data has no real timestamp to sort by
//     });
//     return list;
//   }, [category, sort]);

//   const totalAffected = DUMMY_PROBLEMS.reduce((sum, p) => sum + p.affected, 0);
//   const activeSolutions = DUMMY_PROBLEMS.filter((p) => p.stage >= 3).length;

//   return (
//     <CitizenLayout>
//       <div className="mx-auto max-w-7xl px-6 py-8">
//         {/* Header */}
//         <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
//           <div>
//             <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-600">Citizen Portal</p>
//             <h1 className="mb-1 text-2xl font-bold text-neutral-900 sm:text-3xl">
//               Namaskaar, {firstName} 👋
//             </h1>
//             <p className="flex items-center gap-1 text-sm text-neutral-500">
//               <LocationIcon className="h-4 w-4" />
//               {location}
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/citizen/report")}
//             className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
//           >
//             <PlusIcon className="h-4 w-4" />
//             Report a Problem
//           </button>
//         </div>

//         {/* Stat cards */}
//         <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <StatCard value={DUMMY_PROBLEMS.length} label="Active Problems" sub="in your region" />
//           <StatCard value={totalAffected.toLocaleString()} label="Citizens Affected" sub="across Jharkhand" />
//           <StatCard value={activeSolutions} label="Solutions Active" sub="university-led" />
//         </div>

//         {/* Map placeholder */}
//         <section className="mb-8 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
//           <h2 className="mb-4 text-sm font-semibold text-neutral-900">Problems Near You</h2>
//           <MapPlaceholder />
//         </section>

//         {/* Filters + sort */}
//         <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//           <CategoryFilterBar active={category} onChange={setCategory} />
//           <div className="flex items-center gap-2">
//             <label className="text-xs text-neutral-500">Sort:</label>
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 outline-none focus:border-orange-500"
//             >
//               {SORT_OPTIONS.map((opt) => (
//                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <p className="mb-4 text-sm text-neutral-500">
//           <span className="font-semibold text-neutral-900">{problems.length}</span> problems in your area
//         </p>

//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {problems.map((problem) => (
//             <ProblemCard key={problem.id} problem={problem} />
//           ))}
//         </div>
//       </div>
//     </CitizenLayout>
//   );
// }

// function StatCard({ value, label, sub }) {
//   return (
//     <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
//       <p className="text-2xl font-bold text-neutral-900">{value}</p>
//       <p className="text-sm font-medium text-neutral-700">{label}</p>
//       <p className="text-xs text-neutral-400">{sub}</p>
//     </div>
//   );
// }

// // Dummy points positioned by percentage over a placeholder "map" —
// // swap for a real map (Leaflet / Google Maps) later; layout stays identical.
// const MAP_POINTS = [
//   { label: "Palamu", top: "18%", left: "30%", severity: "medium" },
//   { label: "Lohardaga", top: "42%", left: "38%", severity: "critical" },
//   { label: "You", top: "48%", left: "58%", severity: "you" },
//   { label: "Khunti", top: "58%", left: "56%", severity: "high" },
//   { label: "Simdega", top: "82%", left: "36%", severity: "high" },
// ];

// const SEVERITY_DOT = {
//   critical: "bg-red-500",
//   high: "bg-orange-500",
//   medium: "bg-amber-400",
//   you: "bg-orange-500 ring-4 ring-orange-100",
// };

// function MapPlaceholder() {
//   return (
//     <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-xl border border-neutral-100 bg-gradient-to-br from-neutral-50 to-neutral-100">
//       <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-500 shadow-sm">
//         Jharkhand — Problem Map
//       </span>
//       <span className="absolute right-3 top-3 flex flex-col gap-1 rounded-md bg-white px-3 py-2 text-[11px] text-neutral-500 shadow-sm">
//         <LegendDot color="bg-red-500" label="Critical" />
//         <LegendDot color="bg-orange-500" label="High" />
//         <LegendDot color="bg-amber-400" label="Medium" />
//       </span>

//       {MAP_POINTS.map((point) => (
//         <span
//           key={point.label}
//           className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
//           style={{ top: point.top, left: point.left }}
//         >
//           <span className={`h-3 w-3 rounded-full ${SEVERITY_DOT[point.severity]}`} />
//           <span className="whitespace-nowrap rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 shadow-sm">
//             {point.label}
//           </span>
//         </span>
//       ))}

//       <p className="z-0 text-xs text-neutral-300">Interactive map coming soon</p>
//     </div>
//   );
// }

// function LegendDot({ color, label }) {
//   return (
//     <span className="flex items-center gap-1.5">
//       <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
//       {label}
//     </span>
//   );
// }

// function LocationIcon(props) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
//       <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
//       <circle cx="12" cy="9" r="2.3" />
//     </svg>
//   );
// }
// function PlusIcon(props) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...props}>
//       <path d="M12 5v14M5 12h14" strokeLinecap="round" />
//     </svg>
//   );
// }



import React, { useState } from "react";
import {
  ArrowLeft, MapPin, Camera, Upload, Search, Bell, ChevronRight, ChevronDown,
  ThumbsUp, MessageSquare, FlaskConical, Building2, Landmark, Download,
  Plus, Radio, Award, CheckCircle2, Users, Tractor, Zap, GraduationCap,
  Droplet, Shield, ExternalLink, Lock, Mail, Phone, Languages, Navigation,
  ThumbsUp as VoiceIcon, Bookmark, Share2, Clock, TrendingUp, Target, Flag
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

const NavBar = ({ active, go, brand = "SocioLens" }) => {
  const links = [
    { key: "dashboard", label: "Dashboard" },
    { key: "explore", label: "Explore Problems" },
    { key: "report", label: "Report Problem" },
    { key: "myreports", label: "My Reports" },
    { key: "profile", label: "Profile" },
  ];
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1290px] flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <button onClick={() => go("dashboard")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Search size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[15px] leading-tight text-slate-900">
              {brand}
              <span className="block text-[10px] font-semibold tracking-wide text-orange-500 -mt-0.5">
                JHARKHAND INNOVATION
              </span>
            </span>
          </button>
          <button className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600">
            <MapPin size={13} className="text-orange-500" />
            <span className="leading-tight text-left">
              Namkum, Ranchi
              <br />
              (Jharkhand)
            </span>
            <span className="text-orange-500 font-medium ml-1">Change</span>
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-500">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => go(l.key)}
              className={
                l.key === active
                  ? "text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg"
                  : "hover:text-slate-800 transition-colors"
              }
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => go("report")}
            className="hidden sm:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            <Plus size={15} strokeWidth={2.5} /> Report a Problem
          </button>
          <button className="relative text-slate-500">
            <Bell size={19} />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>
          <button onClick={() => go("profile")} className="flex items-center gap-2 text-left">
            <img
              src="https://i.pravatar.cc/64?img=13"
              className="w-9 h-9 rounded-full object-cover"
              alt="Amit Verma"
            />
            <span className="hidden sm:block leading-tight">
              <span className="block text-[13px] font-semibold text-slate-900">Amit Verma</span>
              <span className="block text-[11px] text-orange-500 font-medium">Active Citizen</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="mt-16 bg-white border-t border-slate-200">
    <div className="mx-auto max-w-[1290px] px-6 py-8">
      <p className="text-xs font-bold tracking-wide text-orange-500 mb-3">
        JHARKHAND CIVIC INNOVATION ALLIANCE
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Co-developed under the aegis of State Societal R&amp;D Framework.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5"><Landmark size={13}/> Govt of Jharkhand</span>
          <span className="flex items-center gap-1.5"><GraduationCap size={13}/> BIT Mesra</span>
          <span className="flex items-center gap-1.5"><FlaskConical size={13}/> IIT ISM Dhanbad</span>
          <span className="flex items-center gap-1.5"><Building2 size={13}/> Tata Steel Foundation</span>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap justify-between text-xs text-slate-400">
        <p>© 2025 SocioLens Jharkhand. Citizen-first Public Innovation Registry.</p>
        <div className="flex gap-5">
          <span>Civic Guidelines</span>
          <span>State Data Transparency</span>
          <span>API Portal</span>
        </div>
      </div>
    </div>
  </footer>
);

const Progress = ({ stages, currentIndex, color = "orange" }) => (
  <div>
    <div className="flex gap-1">
      {stages.map((s, i) => (
        <div
          key={s}
          className={`h-1.5 flex-1 rounded-full ${
            i < currentIndex
              ? "bg-slate-900"
              : i === currentIndex
              ? `bg-${color}-500`
              : "bg-slate-200"
          }`}
        />
      ))}
    </div>
    <div className="flex justify-between mt-1.5">
      {stages.map((s, i) => (
        <span
          key={s}
          className={`text-[10px] flex-1 text-center first:text-left last:text-right ${
            i === currentIndex ? `text-${color}-600 font-semibold` : "text-slate-400"
          }`}
        >
          {s}
        </span>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  {
    id: "SL-108",
    trackId: "#SL-108",
    tag: "WATER GOVERNANCE",
    tagColor: "bg-sky-50 text-sky-700",
    severity: "Critical Severity",
    severityColor: "bg-red-50 text-red-600",
    location: "Namkum Basti, Ward 14, Namkum Block",
    title: "High Fluoride & Iron Contamination in Deep Borewells Impacting Tribal Settlements",
    fullTitle: "Arsenic and Iron Groundwater Filtration in Namkum Lowland Aquifers",
    desc:
      "Hydro-geological assessment detected fluoride levels at 3.2 mg/L (safe limit: 1.0 mg/L) in 12 shared hand pumps across Namkum Basti. Symptoms of early fluorosis reported among school children.",
    stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
    stageIndex: 3,
    stageLabel: "Stage 4 of 6: Prototype Validation",
    metricLabel: "Citizens At Risk",
    metricValue: "640",
    uniLabel: "Participating Universities",
    uniValue: "142",
    icon: Droplet,
    difficulty: "Hard",
    difficultyColor: "text-red-500 bg-red-50",
    upvotes: 342,
    notes: 18,
    samples: 5,
    universities: [
      { name: "BIT Mesra", dept: "Dept. of Chemical Engineering", role: "Lead Research Partner", scholars: 6 },
      { name: "Tata Steel Rural Development Society (TSRDS)", dept: "Field Deployment Partner", role: "Implementation Partner", scholars: 3 },
    ],
    funders: [
      { name: "Jharkhand Dept. of Drinking Water & Sanitation", amount: "₹42 L", type: "State Grant" },
      { name: "Tata Steel Foundation", amount: "₹18 L", type: "CSR Fund" },
    ],
    constraints: [
      "Solution must operate off-grid or on solar in Namkum Basti (frequent 6hr+ outages).",
      "Filtration cost per household must stay under ₹1,500 recurring / year.",
      "Must remove fluoride to below 1.0 mg/L and iron to below 0.3 mg/L per BIS 10500.",
    ],
    examples: [
      { input: "Fluoride = 3.2 mg/L, Iron = 2.1 mg/L, Households = 4,200", output: "Fluoride ≤ 1.0 mg/L, Iron ≤ 0.3 mg/L", explanation: "Multi-tier bio-sand + activated alumina filter achieved 96.4% purity in prototype field test at Namkum Well #2." },
    ],
    updates: [
      { date: "2 days ago", text: "Prototype field test passed 96.4% purity test at Namkum Well 2. Multi-tier bio-sand filter activated." },
      { date: "1 week ago", text: "BIT Mesra Chemical Eng. dept completed lab-scale bio-sand column trials with 91% fluoride reduction." },
    ],
  },
  {
    id: "SL-142",
    trackId: "#SL-142",
    tag: "AGRICULTURE & COLD CHAIN",
    tagColor: "bg-lime-50 text-lime-700",
    severity: "High Priority Call",
    severityColor: "bg-orange-50 text-orange-600",
    location: "Rampur Panchayat Mandi, Namkum",
    title: "35–40% Distress Spoilage in Peak Tomato Yield Due to Zero Decentralized Pre-Cooling",
    fullTitle: "Post-Harvest Cold Storage Loss for Smallholder Vegetable Farmers in Rampur",
    desc:
      "Over 320 smallholders in the Rampur green-belt dump bumper tomato crops at ₹2–3/kg during November-February. Lack of micro-phase change material (PCM) cold hubs causes ₹1.8 Cr seasonal community loss.",
    stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
    stageIndex: 4,
    stageLabel: "Stage 5 of 6: Pilot Field Deployment",
    metricLabel: "Farmers Mobilized",
    metricValue: "320",
    uniLabel: "Participating Universities",
    uniValue: "289",
    icon: Tractor,
    difficulty: "Medium",
    difficultyColor: "text-amber-600 bg-amber-50",
    upvotes: 189,
    notes: 12,
    samples: 3,
    universities: [
      { name: "Birsa Agricultural University (BAU) Kanke", dept: "Dept. of Post-Harvest Technology", role: "Lead Research Partner", scholars: 9 },
    ],
    funders: [
      { name: "NABARD Ranchi District Cell", amount: "₹60 L", type: "Rural Infra Grant" },
    ],
    constraints: [
      "Cooling chamber must run without grid electricity (evaporative / PCM based).",
      "Payback period for a shared cold hub must be under 18 months for a 30-farmer cluster.",
    ],
    examples: [
      { input: "Spoilage rate = 28-40%, Distance to hub = 2km avg", output: "Spoilage ≤ 8%", explanation: "Thermal survey completed; passive evaporative cool chamber blueprint drafted for zero-electricity operation." },
    ],
    updates: [
      { date: "5 days ago", text: "Thermal survey completed; passive evaporative cool chamber blueprint drafted for zero-electricity operation." },
    ],
  },
  {
    id: "SL-089",
    trackId: "#SL-089",
    tag: "RURAL ELECTRIFICATION",
    tagColor: "bg-violet-50 text-violet-700",
    severity: "University Working",
    severityColor: "bg-slate-100 text-slate-600",
    location: "Kalyanpur Cluster, Lowadih Road",
    title: "Low-Voltage Terminal Fluctuations Haulting Semi-Automated Tussar Silk Looms",
    fullTitle: "Solar Powered Micro-Cold Chain for Anganwadi Vaccine Storage (Lowadih)",
    desc:
      "Voltage drops below 160V for 6 hours daily during afternoon production shifts, burning out motor inverters for 110 indigenous silk weaving households.",
    stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
    stageIndex: 2,
    stageLabel: "Stage 3 of 6: University Bench Engineering",
    metricLabel: "Weaving Units",
    metricValue: "110",
    uniLabel: "Participating Universities",
    uniValue: "96",
    icon: Zap,
    difficulty: "Medium",
    difficultyColor: "text-amber-600 bg-amber-50",
    upvotes: 480,
    notes: 9,
    samples: 2,
    universities: [
      { name: "NIT Jamshedpur", dept: "Dept. of Electrical Engineering", role: "Lead Research Partner", scholars: 5 },
    ],
    funders: [
      { name: "Jharkhand Dept. of Health", amount: "₹25 L", type: "State Endorsement" },
    ],
    constraints: [
      "Vaccine cold-chain must maintain 2-8°C for 15+ days without grid power.",
    ],
    examples: [
      { input: "Power outage duration = 6hrs/day", output: "0 temperature excursions below spec", explanation: "3 prototype units operational in Namkum PHC since 15 days; zero temperature excursions below threshold." },
    ],
    updates: [
      { date: "Yesterday", text: "3 prototype units operational in Namkum PHC since 15 days; zero temperature excursions below threshold." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 1. Report a Problem                                                  */
/* ------------------------------------------------------------------ */

const ReportProblem = ({ go }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <div className="border-b border-slate-200 bg-white">
      <div className="max-w-[1040px] mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => go("dashboard")} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
          <ArrowLeft size={16} /> Cancel Submission
        </button>
        <h1 className="text-lg font-bold text-emerald-800">Jharkhand Innovation Portal</h1>
        <div className="w-32" />
      </div>
    </div>

    <div className="flex-1 max-w-[1040px] w-full mx-auto px-6 py-10">
      <h2 className="text-3xl font-extrabold text-slate-900">Report a Challenge</h2>
      <p className="mt-2 text-slate-500 max-w-xl">
        Provide details about the local issue to help authorities and innovators understand and
        address it effectively.
      </p>

      <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center">
            <MapPin size={15} />
          </span>
          <h3 className="text-xs font-bold tracking-wide text-orange-600">1. PINPOINT THE LOCATION</h3>
        </div>
        <div className="mt-5 rounded-lg overflow-hidden border border-slate-200">
          <div className="relative h-64 bg-gradient-to-br from-emerald-100 via-teal-50 to-amber-50">
            <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow flex items-center gap-2 px-4 py-3">
              <Search size={16} className="text-slate-400" />
              <input
                className="flex-1 outline-none text-sm text-slate-700"
                defaultValue="Main Road, Ranchi"
              />
              <Navigation size={16} className="text-orange-500" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center">
            <MessageSquare size={15} />
          </span>
          <h3 className="text-xs font-bold tracking-wide text-orange-600">2. CHALLENGE DETAILS</h3>
        </div>

        <div className="mt-5 space-y-6">
          <div>
            <p className="font-semibold text-slate-900 text-sm">What is the problem?</p>
            <p className="text-xs text-slate-500 mt-0.5">Describe the issue clearly. Be specific about what is happening.</p>
            <textarea
              rows={3}
              placeholder="E.g., The public water dispenser at the main square has been broken for 3 weeks..."
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Who is affected?</p>
            <p className="text-xs text-slate-500 mt-0.5">Identify the community, demographics, or groups impacted by this.</p>
            <textarea
              rows={2}
              placeholder="E.g., Daily commuters, local street vendors, and elderly residents..."
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Desired Outcome</p>
            <p className="text-xs text-slate-500 mt-0.5">What does a successful resolution look like to you?</p>
            <textarea
              rows={3}
              placeholder="E.g., Repair the dispenser or replace it with a modern purification unit..."
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>
      </section>

      <section className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center">
            <Camera size={15} />
          </span>
          <h3 className="text-xs font-bold tracking-wide text-orange-600">3. SUPPORTING MEDIA (OPTIONAL)</h3>
        </div>
        <div className="mt-5 border-2 border-dashed border-slate-200 rounded-lg py-12 flex flex-col items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center">
            <Upload size={18} className="text-sky-500" />
          </span>
          <p className="text-sm font-semibold text-slate-800">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-400">SVG, PNG, JPG or MP4 (max. 10MB)</p>
        </div>
      </section>

      <div className="mt-8 flex justify-end gap-3">
        <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">
          Save as Draft
        </button>
        <button
          onClick={() => go("myreports")}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5"
        >
          Submit Challenge <ChevronRight size={16} />
        </button>
      </div>
    </div>
    <Footer />
  </div>
);

/* ------------------------------------------------------------------ */
/* 2. Dashboard                                                         */
/* ------------------------------------------------------------------ */

const Dashboard = ({ go, openProblem }) => {
  const [filter, setFilter] = useState("All");
  const cats = [
    { label: "All", count: 34 },
    { label: "Water", count: 8, icon: Droplet },
    { label: "Agriculture", count: 7, icon: Tractor },
    { label: "Healthcare", count: 5, icon: Shield },
    { label: "Infrastructure", count: 6, icon: Zap },
    { label: "Education", count: 8, icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar active="dashboard" go={go} brand="e-KALP" />

      <div className="max-w-[1290px] mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-2">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> NAMKUM CIVIC INNOVATION HUB • RANCHI CENTRAL
          <span className="text-slate-400 font-mono ml-1">ID: JH-RAN-NK-014</span>
        </div>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Welcome back, <span className="text-orange-500">Amit Verma</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 flex items-center gap-1.5">
              <Shield size={14} className="text-orange-400" /> Citizen Contributor • Ward 14, Namkum, Ranchi District • Impact Level: Regional Pioneer (Tier 3)
            </p>
          </div>
          <button onClick={() => go("report")} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-lg">
            <Plus size={16}/> Report a Societal Problem
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div>
            {/* Map card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-bold text-slate-900 flex items-center gap-2"><MapPin size={16} className="text-orange-500"/> Namkum & Ranchi Micro-Geography Hotspots</p>
                  <p className="text-xs text-slate-400 mt-0.5">Verified physical problem telemetry across ward boundaries</p>
                </div>
                <div className="flex gap-2 text-xs font-medium">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500">All Wards (Ranchi)</span>
                  <span className="px-3 py-1.5 rounded-lg bg-orange-500 text-white">Namkum Only (Selected)</span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500">Radius 5km</span>
                </div>
              </div>
              <div className="mt-4 h-72 rounded-lg bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 relative overflow-hidden border border-slate-100">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm">Interactive ward map</div>
                {[
                  { n: 1, top: "35%", left: "22%" },
                  { n: 2, top: "55%", left: "55%" },
                  { n: 3, top: "35%", left: "45%" },
                  { n: 4, top: "50%", left: "26%" },
                ].map((p) => (
                  <span key={p.n} style={{ top: p.top, left: p.left }} className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow">
                    {p.n}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {cats.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setFilter(c.label)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg ${
                      filter === c.label ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"
                    }`}
                  >
                    {c.icon && <c.icon size={13} />} {c.label} ({c.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Problem cards */}
            <div className="mt-6 space-y-5">
              {PROBLEMS.map((p) => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-orange-200 transition-colors">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded ${p.tagColor}`}>{p.tag}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11}/> {p.location}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${p.severityColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" /> {p.severity}
                    </span>
                  </div>
                  <button onClick={() => openProblem(p.id)} className="text-left mt-3 text-lg font-bold text-slate-900 leading-snug hover:text-orange-600">
                    {p.title}
                  </button>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                      <span>SOLUTION PROGRESS TRACKER</span>
                      <span className="text-orange-600">{p.stageLabel}</span>
                    </div>
                    <Progress stages={p.stages} currentIndex={p.stageIndex} />
                  </div>
                  <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex gap-6 text-sm">
                      <span className="flex items-center gap-1.5 text-slate-600"><Users size={15} className="text-slate-400"/> <b>{p.metricValue}</b> {p.metricLabel}</span>
                      <span className="flex items-center gap-1.5 text-slate-600"><GraduationCap size={15} className="text-slate-400"/> <b>{p.uniValue}</b> {p.uniLabel}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-50 text-slate-600 flex items-center gap-1.5">
                        <ThumbsUp size={13} /> Add My Voice
                      </button>
                      <button onClick={() => openProblem(p.id)} className="text-xs font-semibold px-3 py-2 rounded-lg bg-orange-500 text-white flex items-center gap-1.5">
                        View Solution &amp; Progress <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> Real-time Civic Pulse
                <span className="ml-auto text-[10px] text-slate-400 font-semibold">LIVE FEED</span>
              </p>
              <div className="mt-4 space-y-4">
                {[
                  { icon: Radio, color: "text-sky-500 bg-sky-50", text: "BIT Mesra team deployed automated water filtration telemetry sensor at Namkum Ward 4.", time: "2 hours ago • Field Milestone" },
                  { icon: FlaskConical, color: "text-violet-500 bg-violet-50", text: "IIT ISM Dhanbad published open prototype test results for Solar Soil Moisture Array.", time: "Yesterday • Research Repo" },
                  { icon: Shield, color: "text-emerald-500 bg-emerald-50", text: "Jharkhand Health Dept approved pilot scale for Lowadih Sub-Centre e-dispensary.", time: "2 days ago • State Endorsement" },
                  { icon: Users, color: "text-orange-500 bg-orange-50", text: "84 Citizens added community validation to the Rampur Tomato Cold Chain proposal.", time: "3 days ago • Civic Momentum" },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}>
                      <f.icon size={13} />
                    </span>
                    <div>
                      <p className="text-xs text-slate-700 leading-snug"><b className="font-semibold">{f.text.split(" ").slice(0,3).join(" ")}</b> {f.text.split(" ").slice(3).join(" ")}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{f.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-xs font-semibold text-orange-600 flex items-center gap-1">
                Explore All State-wide Milestones <ChevronRight size={12} />
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-bold text-slate-900 text-sm">Participating Hub Institutions</p>
              <p className="text-xs text-slate-400 mt-1">Accredited R&amp;D bodies solving Ranchi regional civic briefs</p>
              <div className="mt-4 space-y-2">
                {[
                  { i: "BIT", n: "BIT Mesra, Ranchi", d: "14 Active Engineering Pilots" },
                  { i: "NIT", n: "NIT Jamshedpur", d: "9 Rural Renewable Grants" },
                  { i: "ISM", n: "IIT (ISM) Dhanbad", d: "7 Hydro & Geological Studies" },
                  { i: "ICR", n: "ICAR-IINRG Namkum", d: "Horticulture Cluster Lead" },
                ].map((h) => (
                  <div key={h.i} className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2.5">
                    <span className="text-[10px] font-bold text-slate-500 w-7">{h.i}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-800">{h.n}</p>
                      <p className="text-[10px] text-slate-400">{h.d}</p>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 3. My Reports                                                        */
/* ------------------------------------------------------------------ */

const MyReports = ({ go, openProblem }) => {
  const [tab, setTab] = useState("All Activity (8)");
  const tabs = ["All Activity (8)", "Reported by Me (2)", "My Voices & Supported (6)", "Successfully Deployed (1)"];
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar active="myreports" go={go} />
      <div className="max-w-[1290px] mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-orange-50 to-white border border-slate-200 rounded-xl p-6 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-bold text-orange-500 tracking-wide">CITIZEN REGISTRY • UID-JH-NAM-8421 • Live Sync with Ranchi Civic Cell</p>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">My Civic Innovation Hub & Tracked Problems</h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Monitor verified progress, university field pilots, and municipal milestones for issues you reported or supported in the Namkum & Greater Ranchi corridor.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center gap-1.5">
              <Download size={13} /> Civic Impact Certificate
            </button>
            <button onClick={() => go("report")} className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-orange-500 text-white flex items-center gap-1.5">
              <Plus size={13} /> Report New Issue
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-slate-400 tracking-wide">REPORTED BY YOU</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">2 <span className="text-sm font-semibold text-orange-500">Active Cases</span></p>
            <p className="text-xs text-slate-400 mt-1">• 1 in Prototype • 1 in Lab Validation</p>
            <div className="h-1.5 bg-slate-100 rounded-full mt-3"><div className="h-1.5 w-1/2 bg-orange-500 rounded-full" /></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-slate-400 tracking-wide">VOICES & SUPPORTED</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">6 <span className="text-sm font-semibold text-slate-500">Initiatives</span></p>
            <p className="text-xs text-slate-400 mt-1">Active civic momentum across Ranchi district wards</p>
            <div className="flex gap-1 mt-3">
              {["R","N","B"].map(x => <span key={x} className="w-6 h-6 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center">{x}</span>)}
              <span className="text-[10px] text-slate-400 self-center ml-1">+3 Wards</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-[11px] font-bold text-slate-400 tracking-wide">UNIVERSITIES ENGAGED</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-2">4 <span className="text-sm font-semibold text-slate-500">Lead Labs</span></p>
            <p className="text-xs text-slate-400 mt-1">BIT Mesra, NIT Jsr, RU, BAU Kanke</p>
            <p className="text-[10px] text-slate-400 mt-3">9 Research Scholars Active</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`text-xs font-semibold px-4 py-2.5 rounded-lg ${tab === t ? "bg-orange-500 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
            <Search size={13} className="text-slate-400" />
            <input placeholder="Search track ID or keywords..." className="text-xs outline-none w-48 text-slate-600" />
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {PROBLEMS.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-bold text-orange-500">{p.trackId}</span>
                  <span className={`font-bold px-2 py-1 rounded ${p.tagColor}`}>{p.tag}</span>
                  <span className="text-slate-400">• Reported by You on Nov 12, 2024</span>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> {p.stageLabel.toUpperCase()}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                <div>
                  <button onClick={() => openProblem(p.id)} className="text-left text-xl font-bold text-slate-900 hover:text-orange-600">{p.fullTitle}</button>
                  <p className="text-sm text-slate-500 mt-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.universities.map((u) => (
                      <span key={u.name} className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 flex items-center gap-1.5"><GraduationCap size={12}/> {u.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>Validation Progress</span>
                    <span className="text-orange-600">{Math.round(((p.stageIndex+1)/6)*100)}% Complete</span>
                  </div>
                  <Progress stages={["Log","Review","Lab","Prototype","Pilot","Deploy"]} currentIndex={p.stageIndex} />
                  <div className="mt-3 bg-slate-50 rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-orange-600">Latest Update • {p.updates[0].date}</p>
                    <p className="text-xs text-slate-600 mt-1 italic">"{p.updates[0].text}"</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between flex-wrap gap-3">
                <div className="flex gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes} Upvotes</span>
                  <span className="flex items-center gap-1"><MessageSquare size={13}/> {p.notes} Community Notes</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600">Share Dossier</button>
                  <button onClick={() => openProblem(p.id)} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500 text-white">View Workspace ›</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Profile                                                           */
/* ------------------------------------------------------------------ */

const Profile = ({ go }) => (
  <div className="min-h-screen bg-slate-50">
    <NavBar active="profile" go={go} />
    <div className="max-w-[1290px] mx-auto px-6 py-8">
      <p className="text-xs text-slate-400 flex items-center gap-1">Dashboard <ChevronRight size={12}/> Citizen Profile
        <span className="ml-auto flex items-center gap-4 text-[11px] font-semibold">
          <span className="text-orange-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"/> PORTAL STATUS: ACTIVE CITIZEN</span>
          <span className="text-slate-400 font-mono">UID: JHK-834010-04419</span>
        </span>
      </p>

      <div className="mt-4 bg-white border border-slate-200 rounded-xl p-6 flex flex-wrap items-center gap-6 justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src="https://i.pravatar.cc/120?img=13" className="w-20 h-20 rounded-2xl object-cover" alt="" />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center">
              <Shield size={11} className="text-white" />
            </span>
          </div>
          <div>
            <p className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              Amit Verma
              <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-sky-50 text-sky-600 flex items-center gap-1">
                <CheckCircle2 size={11}/> Aadhaar / Ward 14 Verified Resident
              </span>
            </p>
            <p className="text-sm text-slate-500 mt-1">Community Citizen Contributor & Neighborhood Volunteer</p>
            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-3">
              <span>Member since August 2024</span> •
              <span>Namkum, Ranchi (Jharkhand)</span> •
              <span className="font-mono">ID: VERMA-RNC-14</span>
            </p>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl px-5 py-4 flex items-center gap-3">
          <Award size={22} className="text-orange-500" />
          <div>
            <p className="text-2xl font-extrabold text-slate-900">840 <span className="text-sm text-orange-500 font-semibold">CIVIC POINTS</span></p>
            <p className="text-xs text-slate-400">Top 5% Contributor in Ranchi East</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
        <div className="space-y-6 max-w-[640px]">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-slate-900 flex items-center gap-2"><Users size={15} className="text-slate-400"/> Personal Information</p>
                <p className="text-xs text-slate-400 mt-1">Verified identity details recognized by municipal coordinators</p>
              </div>
              <Lock size={14} className="text-slate-300 mt-1" />
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Full Legal Name</span><span className="text-slate-400">Matches Govt ID</span></div>
                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Amit Verma <CheckCircle2 size={15} className="text-emerald-500"/></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Email Address</span><span className="text-emerald-500 font-semibold">Verified</span></div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700"><span className="truncate">amit.verma.ranchi@gmail.com</span><Mail size={14} className="text-slate-400 shrink-0"/></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Phone Number</span><span className="text-slate-400">SMS alerts enabled</span></div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">+91 94311 XXXXX <Phone size={14} className="text-slate-400"/></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Preferred Civic Language</span><span className="text-slate-400">Used in alerts & surveys</span></div>
                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">English & हिन्दी (Bilingual) <Languages size={14} className="text-slate-400"/></div>
              </div>
              <p className="text-xs text-slate-400">Jharkhand State Multi-lingual Civic Inclusivity standard compliant.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-slate-900 flex items-center gap-2"><Building2 size={15} className="text-slate-400"/> Jharkhand Residential & Ward Details</p>
                <p className="text-xs text-slate-400 mt-1">Local civic jurisdiction determines your regional vote weight & pilot trials</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-orange-50 text-orange-600">RMC ZONE 4</span>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-1">Address Line / Landmark</p>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Quarter 4B, Near Old Railway Colony Road</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Locality / Village</p>
                  <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Namkum Basti, Namkum</div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Gram Panchayat / Municipal Ward</p>
                  <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Ward 14, Namkum Block</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">District</p>
                  <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Ranchi</div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">State</p>
                  <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Jharkhand</div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Pincode</p>
                  <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">834010</div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5">
                <span className="text-xs text-slate-500 flex items-center gap-1.5"><Navigation size={13}/> Geo-Coordinates: 23.3421° N, 85.3852° E (Namkum Sub-division)</span>
                <span className="text-xs font-semibold text-orange-500">Re-pin on Map</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel Changes</button>
            <button className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 text-white">Save Profile Changes</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

/* ------------------------------------------------------------------ */
/* 5. Problem Detail — LeetCode-style problem statement page            */
/* ------------------------------------------------------------------ */

const ProblemDetail = ({ id, go }) => {
  const p = PROBLEMS.find((x) => x.id === id) || PROBLEMS[0];
  const [tab, setTab] = useState("description");
  const idx = PROBLEMS.findIndex((x) => x.id === p.id);

  const tabs = [
    { key: "description", label: "Description" },
    { key: "partners", label: "Partners & Funding" },
    { key: "solution", label: "Solution Log" },
    { key: "discussion", label: `Discussion (${p.notes})` },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* top strip nav, leetcode-style */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => go("dashboard")} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600">
              <ArrowLeft size={16} />
            </button>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Search size={14} className="text-orange-500"/> SocioLens
            </span>
            <span className="text-slate-300">/</span>
            <button className="text-sm text-slate-500 hover:text-slate-800">Problem List</button>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <button
              disabled={idx <= 0}
              onClick={() => go("problem", PROBLEMS[idx - 1]?.id)}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
            >
              <ArrowLeft size={14} />
            </button>
            <span className="px-2">{idx + 1} / {PROBLEMS.length}</span>
            <button
              disabled={idx >= PROBLEMS.length - 1}
              onClick={() => go("problem", PROBLEMS[idx + 1]?.id)}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 rotate-180"
            >
              <ArrowLeft size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-1.5"><Share2 size={13}/> Share</button>
            <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500 text-white flex items-center gap-1.5"><ThumbsUp size={13}/> Add My Voice</button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: problem statement */}
        <div className="border-r border-slate-200 bg-white">
          <div className="flex items-center gap-5 px-6 pt-4 border-b border-slate-200 text-sm font-semibold text-slate-500">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`pb-3 border-b-2 ${tab === t.key ? "border-orange-500 text-slate-900" : "border-transparent hover:text-slate-700"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="px-6 py-6">
            {tab === "description" && (
              <>
                <h1 className="text-xl font-bold text-slate-900">{idx + 1}. {p.fullTitle}</h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.difficultyColor}`}>{p.difficulty}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><MessageSquare size={13}/> {p.notes}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Bookmark size={13}/></span>
                </div>

                <p className="mt-5 text-[15px] leading-7 text-slate-700">{p.desc}</p>

                <div className="mt-5 space-y-2">
                  <p className="text-sm font-semibold text-slate-800">Constraints:</p>
                  <ul className="space-y-1.5">
                    {p.constraints.map((c, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-slate-300 mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {p.examples.map((ex, i) => (
                  <div key={i} className="mt-5 bg-slate-50 rounded-lg p-4 font-mono text-xs">
                    <p className="font-sans font-semibold text-slate-800 text-sm mb-2">Example {i + 1}:</p>
                    <p><span className="text-slate-400">Input:</span> {ex.input}</p>
                    <p className="mt-1"><span className="text-slate-400">Output:</span> {ex.output}</p>
                    <p className="mt-1 font-sans text-slate-500"><span className="text-slate-400 font-mono">Explanation:</span> {ex.explanation}</p>
                  </div>
                ))}

                <div className="mt-6">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>SOLUTION PROGRESS</span>
                    <span className="text-orange-600">{p.stageLabel}</span>
                  </div>
                  <Progress stages={p.stages} currentIndex={p.stageIndex} />
                </div>

                <div className="mt-6 flex gap-2 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">{p.location}</span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">Track ID {p.trackId}</span>
                </div>
              </>
            )}

            {tab === "partners" && (
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3"><GraduationCap size={16} className="text-sky-500"/> Universities Participating</p>
                  <div className="space-y-3">
                    {p.universities.map((u) => (
                      <div key={u.name} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{u.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{u.dept}</p>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-1 rounded bg-sky-50 text-sky-600">{u.role}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{u.scholars} research scholars actively contributing</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3"><Building2 size={16} className="text-emerald-500"/> Funding & Industry Partners</p>
                  <div className="space-y-3">
                    {p.funders.map((f) => (
                      <div key={f.name} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{f.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{f.type}</p>
                        </div>
                        <span className="text-sm font-bold text-emerald-600">{f.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "solution" && (
              <div className="space-y-4">
                {p.updates.map((u, i) => (
                  <div key={i} className="border-l-2 border-orange-300 pl-4 pb-4 relative">
                    <span className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-orange-500" />
                    <p className="text-xs font-semibold text-orange-600 flex items-center gap-1"><Clock size={11}/> {u.date}</p>
                    <p className="text-sm text-slate-700 mt-1">{u.text}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "discussion" && (
              <div className="text-sm text-slate-400 flex flex-col items-center py-16 gap-2">
                <MessageSquare size={28} className="text-slate-200" />
                {p.notes} community notes — sign in to view and add your comment.
              </div>
            )}
          </div>
        </div>

        {/* Right: stats / workbench-style panel */}
        <div className="bg-slate-50 px-6 py-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-400 tracking-wide">CASE SUMMARY</p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-extrabold text-slate-900">{p.metricValue}</p>
                <p className="text-xs text-slate-500">{p.metricLabel}</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">{p.uniValue}</p>
                <p className="text-xs text-slate-500">{p.uniLabel}</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">{p.upvotes}</p>
                <p className="text-xs text-slate-500">Community Upvotes</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900">{p.samples}</p>
                <p className="text-xs text-slate-500">Lab Samples Logged</p>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-400 tracking-wide flex items-center gap-1.5"><Target size={12}/> RESOLUTION STAGES</p>
            <div className="mt-4 space-y-3">
              {p.stages.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    i < p.stageIndex ? "bg-slate-900 text-white" : i === p.stageIndex ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"
                  }`}>
                    {i < p.stageIndex ? <CheckCircle2 size={13} /> : i + 1}
                  </span>
                  <span className={`text-sm ${i === p.stageIndex ? "font-semibold text-slate-900" : "text-slate-500"}`}>{s}</span>
                  {i === p.stageIndex && <span className="ml-auto text-[10px] font-bold text-orange-500">IN PROGRESS</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold text-slate-400 tracking-wide flex items-center gap-1.5"><TrendingUp size={12}/> IMPACT METER</p>
            <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600" style={{ width: `${((p.stageIndex + 1) / 6) * 100}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">{Math.round(((p.stageIndex + 1) / 6) * 100)}% of resolution roadmap complete</p>
          </div>

          <button onClick={() => go("myreports")} className="mt-5 w-full text-sm font-semibold px-4 py-3 rounded-lg bg-slate-900 text-white flex items-center justify-center gap-2">
            <Flag size={14}/> View in My Reports
          </button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* App shell / router                                                   */
/* ------------------------------------------------------------------ */

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [activeProblem, setActiveProblem] = useState(PROBLEMS[0].id);

  const go = (key, problemId) => {
    if (key === "problem" && problemId) setActiveProblem(problemId);
    setPage(key === "problem" ? "problem" : key);
    window.scrollTo(0, 0);
  };
  const openProblem = (id) => go("problem", id);

  if (page === "report") return <ReportProblem go={go} />;
  if (page === "myreports") return <MyReports go={go} openProblem={openProblem} />;
  if (page === "profile") return <Profile go={go} />;
  if (page === "problem") return <ProblemDetail id={activeProblem} go={go} />;
  if (page === "explore") return <Dashboard go={go} openProblem={openProblem} />;
  return <Dashboard go={go} openProblem={openProblem} />;
}