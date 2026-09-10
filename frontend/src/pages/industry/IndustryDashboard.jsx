import React, { useState } from "react";
import {
  LayoutGrid, Search, Users, Bell, ChevronRight, ChevronLeft, ChevronDown,
  Hourglass, FileText, Package, ArrowRight, CheckCircle2, Circle, Clock,
  MapPin, GraduationCap, Cpu, ArrowUpRight
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock data (unchanged)                                                */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: "hydro-sense",
    stage: "Prototype",
    stageColor: "bg-orange-50 text-orange-600 border border-orange-200",
    domain: "Water & IoT",
    techTags: ["IoT", "Sensor Networks", "Mobile App"],
    title: "Smart Water Quality Monitoring",
    university: "Birsa Institute of Technology",
    location: "Gumla, Jharkhand",
    match: 91,
    problem:
      "Rural communities in Jharkhand lack access to real-time water quality data, leading to preventable waterborne diseases affecting over 2 lakh people annually.",
    solution:
      "An IoT-based sensor network with a mobile dashboard that continuously monitors pH, turbidity, and bacterial load in water sources, alerting local authorities in real time.",
    seeking: ["Hardware", "Field Testing", "Technical Mentoring"],
    team: { name: "HydroSense", members: [{ i: "PK", n: "Priya Kumari" }, { i: "RO", n: "Rajan Oraon" }, { i: "SM", n: "Sushant Minz" }] },
    mentor: { name: "Dr. S.K. Mahato", dept: "Electronics Engineering", org: "Birsa Institute of Technology" },
    progressStages: ["Research", "Prototype", "Testing", "Deployment"],
    progressIndex: 1,
    outcomes: {
      impact: "Real-time water monitoring for 12 rural villages",
      beneficiaries: "2,00,000+ rural residents in Jharkhand",
    },
  },
  {
    id: "ai-crop",
    stage: "Testing",
    stageColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    domain: "AgriTech & AI",
    techTags: ["Machine Learning", "Computer Vision", "Mobile"],
    title: "AI Crop Disease Detection",
    university: "NIT Jamshedpur",
    location: "Jamshedpur, Jharkhand",
    match: 78,
    problem:
      "Farmers in Jharkhand lose 30–40% of their crop yield annually due to late identification of plant diseases, with limited access to agricultural experts in remote areas.",
    solution:
      "A smartphone-based ML model that identifies crop diseases from leaf images with 94% accuracy, providing treatment recommendations in Hindi and tribal languages.",
    seeking: ["ML Mentoring", "Cloud Support", "Deployment"],
    team: { name: "AgroVision", members: [{ i: "AK", n: "Ankit Kumar" }, { i: "SD", n: "Shreya Das" }] },
    mentor: { name: "Dr. R. Prasad", dept: "Computer Science & Engg.", org: "NIT Jamshedpur" },
    progressStages: ["Research", "Prototype", "Testing", "Deployment"],
    progressIndex: 2,
    outcomes: {
      impact: "Disease detection support for 5,000+ smallholder farms",
      beneficiaries: "18,000+ farmers across three districts",
    },
  },
  {
    id: "micro-solar",
    stage: "Prototype",
    stageColor: "bg-orange-50 text-orange-600 border border-orange-200",
    domain: "Energy & Sustainability",
    techTags: ["Embedded Systems", "Cloud Dashboard", "Power Electronics"],
    title: "Micro Solar Grid Management",
    university: "IIT (ISM) Dhanbad",
    location: "Dhanbad, Jharkhand",
    match: 68,
    problem:
      "Village micro-grids waste up to 40% of generated solar power due to unmanaged load balancing and no visibility into battery health or usage patterns.",
    solution:
      "An embedded controller and cloud dashboard that optimises solar power distribution across micro-grids, reducing waste and extending battery life.",
    seeking: ["Funding", "Hardware", "Pilot Sites"],
    team: { name: "SunGrid Labs", members: [{ i: "MT", n: "Manav Tiwari" }, { i: "NR", n: "Nisha Rani" }] },
    mentor: { name: "Dr. A. Bhattacharya", dept: "Electrical Engineering", org: "IIT (ISM) Dhanbad" },
    progressStages: ["Research", "Prototype", "Testing", "Deployment"],
    progressIndex: 1,
    outcomes: {
      impact: "Optimised power delivery for 6 village micro-grids",
      beneficiaries: "3,400+ households in off-grid clusters",
    },
  },
  {
    id: "e-dispensary",
    stage: "Deployment",
    stageColor: "bg-slate-100 text-slate-600 border border-slate-200",
    domain: "Healthcare",
    techTags: ["Cold Chain", "IoT", "Solar"],
    title: "Solar Vaccine Cold Chain",
    university: "NIT Jamshedpur",
    location: "Lowadih, Jharkhand",
    match: 54,
    problem:
      "Anganwadi vaccine stock in Lowadih Sub-Centre faces frequent spoilage from 6-hour daily grid outages, with no early-warning system for temperature excursions.",
    solution:
      "A solar-powered cold chain unit with IoT temperature logging and SMS alerts for health workers when storage drifts outside the safe range.",
    seeking: ["Deployment", "Maintenance Partner"],
    team: { name: "CoolCare", members: [{ i: "VS", n: "Vikram Singh" }] },
    mentor: { name: "Dr. P. Sinha", dept: "Electrical Engineering", org: "NIT Jamshedpur" },
    progressStages: ["Research", "Prototype", "Testing", "Deployment"],
    progressIndex: 3,
    outcomes: {
      impact: "Zero cold-chain spoilage across 3 pilot PHCs",
      beneficiaries: "1,200+ infants covered under immunisation drive",
    },
  },
];

const COLLABORATIONS = {
  pending: [
    {
      project: "AI Crop Disease Detection",
      university: "NIT Jamshedpur",
      note: "Awaiting university approval for ML mentoring collaboration.",
      requested: "3 days ago",
    },
  ],
  active: [
    {
      project: "Smart Water Quality Monitoring",
      university: "Birsa Institute of Technology",
      contribution: "Hardware + Field Testing",
      stage: "Testing Phase",
      updated: "2 days ago",
    },
  ],
  completed: [
    {
      project: "Solar Vaccine Cold Chain",
      university: "NIT Jamshedpur",
      contribution: "Deployment + Maintenance",
      stage: "Deployed",
      updated: "1 month ago",
    },
  ],
};

const WORKSPACE = {
  project: "Smart Water Quality Monitoring",
  university: "Birsa Institute of Technology",
  partner: "JH IoT Labs",
  milestones: ["Prototype", "Industry Validation", "Field Testing", "Deployment", "Outcome"],
  milestoneIndex: 2,
  fieldProgress: { done: 2, total: 3 },
  status: {
    title: "Field Testing",
    text: "Prototype successfully completed laboratory testing. Field validation begins next week at Location 1 (Gumla). All 8 water quality parameters within acceptable accuracy thresholds.",
  },
  contributions: [
    { title: "Hardware", sub: "10 IoT sensor units (IP67)", status: "In Progress", color: "bg-amber-50 text-amber-700 border border-amber-200" },
    { title: "Technical Mentoring", sub: "IoT calibration & deployment", status: "Active", color: "bg-sky-50 text-sky-700 border border-sky-200" },
    { title: "Testing Facility", sub: "Lab access for pre-deployment tests", status: "Complete", color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  ],
  readiness: [
    { label: "Field Testing", detail: "2 of 3 locations", status: "In Progress", color: "bg-amber-50 text-amber-700 border border-amber-200" },
    { label: "Industry Validation", detail: "Completed", status: "Done", color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    { label: "Deployment", detail: "Not started", status: "Pending", color: "bg-slate-100 text-slate-500 border border-slate-200" },
    { label: "Outcome Documentation", detail: "Not started", status: "Pending", color: "bg-slate-100 text-slate-500 border border-slate-200" },
  ],
};

const NEEDS_ATTENTION = [
  { icon: Hourglass, iconColor: "text-amber-600 bg-amber-50 border border-amber-200", text: "Collaboration request for Smart Water Quality Monitoring awaiting university approval", tag: "PENDING", tagColor: "bg-amber-50 text-amber-700 border border-amber-200" },
  { icon: FileText, iconColor: "text-sky-600 bg-sky-50 border border-sky-200", text: "HydroSense team shared a new progress update", tag: "NEW UPDATE", tagColor: "bg-sky-50 text-sky-700 border border-sky-200" },
  { icon: Package, iconColor: "text-orange-600 bg-orange-50 border border-orange-200", text: "Contribution due this week: Sensor unit delivery (10 units)", tag: "DUE SOON", tagColor: "bg-red-50 text-red-700 border border-red-200" },
];

/* ------------------------------------------------------------------ */
/* Design tokens (mirrors the e-KALP citizen portal)                    */
/* ------------------------------------------------------------------ */

const mono = "font-mono tracking-wide";

/* ------------------------------------------------------------------ */
/* Shared chrome                                                        */
/* ------------------------------------------------------------------ */

const Sidebar = ({ active, go }) => {
  const links = [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "discover", label: "Discover Projects", icon: Search },
    { key: "collaborations", label: "Collaborations", icon: Users },
  ];
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col overflow-hidden">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-slate-100 shrink-0">
        <div className="relative w-9 h-9 shrink-0">
          <div className="absolute top-0 left-0 w-6 h-6 bg-slate-900" />
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-orange-500" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-[16px] leading-tight text-slate-900 truncate">e-KALP</p>
          <p className={`text-[10px] font-semibold text-orange-500 ${mono}`}>INDUSTRY PORTAL</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((l) => (
          <button
            key={l.key}
            onClick={() => go(l.key)}
            className={`w-full flex items-center gap-3 pl-3 pr-3 py-2.5 text-sm font-semibold transition-colors border-l-2 ${
              l.key === active
                ? "bg-orange-50 text-orange-600 border-orange-500"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 border-transparent"
            }`}
          >
            <l.icon size={17} strokeWidth={2} />
            {l.label}
          </button>
        ))}
      </nav>

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 border border-slate-200 rounded-md px-3 py-2 bg-slate-50">
          <MapPin size={13} className="text-orange-500 shrink-0" />
          <span className={`text-[11px] text-slate-500 truncate flex-1 ${mono}`}>Ranchi, Jharkhand</span>
        </div>
      </div>

      <button
        onClick={() => go("dashboard")}
        className="flex items-center gap-3 px-5 py-4 border-t border-slate-100 text-left hover:bg-slate-50 transition-colors shrink-0"
      >
        <span className="w-9 h-9 bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
          JH
        </span>
        <span className="flex-1 leading-tight min-w-0">
          <span className="block text-[13px] font-semibold text-slate-900 truncate">JH IoT Labs</span>
          <span className={`block text-[10px] text-orange-500 font-semibold ${mono}`}>INDUSTRY PARTNER</span>
        </span>
      </button>
    </aside>
  );
};

const TopBar = ({ title }) => (
  <div className="sticky top-0 z-20 bg-white border-b border-slate-200">
    <div className="flex items-center justify-between px-8 py-4">
      <h1 className="text-lg font-bold text-slate-900">{title}</h1>
      <div className="flex items-center gap-5">
        <button className="relative text-slate-400 hover:text-slate-600">
          <Bell size={19} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>
        <button className="flex items-center gap-2.5">
          <span className="w-9 h-9 bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
            AR
          </span>
          <span className="text-left leading-tight hidden sm:block">
            <span className="block text-[13px] font-semibold text-slate-900">Arjun Rao</span>
            <span className={`block text-[10px] text-orange-500 font-semibold ${mono}`}>JH IOT LABS</span>
          </span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </div>
  </div>
);

const Page = ({ title, children }) => (
  <div className="flex-1 min-w-0">
    <TopBar title={title} />
    <div className="max-w-[1290px] mx-auto px-8 py-8">{children}</div>
  </div>
);

const MatchBadge = ({ value, size = "md" }) => (
  <div
    className={`shrink-0 bg-orange-50 border border-orange-200 text-center ${
      size === "lg" ? "px-6 py-4" : "px-4 py-3"
    }`}
  >
    <p className={`font-bold text-orange-600 ${size === "lg" ? "text-2xl" : "text-xl"}`}>{value}%</p>
    <p className={`text-[9px] text-orange-500 leading-tight mt-0.5 max-w-[80px] ${mono}`}>
      RELEVANT TO YOUR EXPERTISE
    </p>
  </div>
);

const Chip = ({ children }) => (
  <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200">{children}</span>
);

const StageTag = ({ children, className = "" }) => (
  <span className={`text-[10px] font-bold px-2.5 py-1 ${mono} ${className}`}>{children}</span>
);

/* Segmented progress tracker matching the citizen-portal solution tracker */
const ProgressTracker = ({ stages, index, label }) => (
  <div>
    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
      <p className={`text-[10px] font-bold text-slate-400 ${mono}`}>PROJECT PROGRESS TRACKER</p>
      {label && (
        <p className="text-xs font-bold text-orange-600">
          Stage {index + 1} of {stages.length}: {label}
        </p>
      )}
    </div>
    <div className="flex items-center gap-1.5">
      {stages.map((s, i) => (
        <div
          key={s}
          className={`h-1.5 flex-1 ${
            i < index ? "bg-slate-900" : i === index ? "bg-orange-500" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
    <div className="flex items-center gap-1.5 mt-1.5">
      {stages.map((s, i) => (
        <p
          key={s}
          className={`flex-1 text-[10px] text-center ${
            i === index ? "text-orange-600 font-bold" : i < index ? "text-slate-500 font-semibold" : "text-slate-300"
          }`}
        >
          {s}
        </p>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* 1. Dashboard                                                         */
/* ------------------------------------------------------------------ */

const Dashboard = ({ go, openProject }) => {
  const featured = PROJECTS.slice(0, 3);
  const active = COLLABORATIONS.active[0];

  return (
    <Page title="Dashboard">
      <p className={`text-xs text-slate-400 ${mono}`}>GOOD MORNING, ARJUN</p>
      <h2 className="text-2xl font-bold text-slate-900 mt-1">What opportunities can you support today?</h2>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className={`text-xs font-bold text-slate-400 ${mono}`}>PROJECTS LOOKING FOR INDUSTRY SUPPORT</p>
            <button onClick={() => go("discover")} className="text-sm font-semibold text-orange-600 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-5">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className={`bg-white border rounded-none p-6 ${i === 0 ? "border-orange-400" : "border-slate-200"}`}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StageTag className={p.stageColor}>{p.stage.toUpperCase()}</StageTag>
                    <span className={`text-xs text-slate-400 ${mono}`}>{p.domain}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-orange-50 text-orange-600 border border-orange-200">
                    {p.match}% MATCH
                  </span>
                </div>
                <button onClick={() => openProject(p.id)} className="text-left mt-3 text-lg font-bold text-slate-900 hover:text-orange-600">
                  {p.title}
                </button>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{p.solution}</p>
                <p className={`text-xs text-slate-400 mt-3 flex items-center gap-1.5 ${mono}`}>
                  <MapPin size={11} /> {p.university} · {p.location}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] text-slate-400 mr-1 ${mono}`}>LOOKING FOR:</span>
                    {p.seeking.map((s) => <Chip key={s}>{s}</Chip>)}
                  </div>
                  <button
                    onClick={() => openProject(p.id)}
                    className="text-sm font-bold px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5"
                  >
                    View Project <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className={`text-xs font-bold text-slate-400 mb-3 ${mono}`}>NEEDS ATTENTION</p>
            <div className="space-y-3">
              {NEEDS_ATTENTION.map((n, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 flex gap-3">
                  <span className={`w-8 h-8 flex items-center justify-center shrink-0 ${n.iconColor}`}>
                    <n.icon size={15} />
                  </span>
                  <div>
                    <p className="text-sm text-slate-700 leading-snug">{n.text}</p>
                    <span className={`inline-block mt-2 text-[9px] font-bold px-2 py-0.5 ${mono} ${n.tagColor}`}>
                      {n.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className={`text-xs font-bold text-slate-400 ${mono}`}>YOUR COLLABORATIONS</p>
              <button onClick={() => go("collaborations")} className="text-xs font-semibold text-orange-600 flex items-center gap-1">
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="bg-white border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 ${mono}`}>ACTIVE</span>
                <span className="text-xs text-slate-400">{active.updated}</span>
              </div>
              <p className="font-bold text-slate-900 mt-2">{active.project}</p>
              <p className="text-xs text-slate-400">{active.university}</p>
              <p className="text-xs text-slate-500 mt-2">Your contribution: {active.contribution}</p>
              <p className="text-xs text-slate-400">{active.stage}</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

/* ------------------------------------------------------------------ */
/* 2. Discover Projects                                                 */
/* ------------------------------------------------------------------ */

const DiscoverProjects = ({ openProject }) => {
  const [query, setQuery] = useState("");
  const results = PROJECTS.filter((p) =>
    (p.title + p.domain + p.techTags.join(" ")).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Page title="Discover Projects">
      <h2 className="text-2xl font-bold text-slate-900">Discover Projects</h2>
      <p className="text-sm text-slate-500 mt-1">
        Explore university projects looking for industry expertise, technology, funding, testing, or deployment support.
      </p>

      <div className="mt-6 flex items-center gap-2 bg-white border border-slate-200 px-4 py-3">
        <Search size={16} className="text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, technologies, or domains"
          className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select className={`text-xs text-slate-600 bg-white border border-slate-200 px-3 py-2 outline-none ${mono}`}>
          <option>ALL DOMAINS</option>
          <option>Water & IoT</option>
          <option>AgriTech & AI</option>
          <option>Energy & Sustainability</option>
          <option>Healthcare</option>
        </select>
        <select className={`text-xs text-slate-600 bg-white border border-slate-200 px-3 py-2 outline-none ${mono}`}>
          <option>ALL STAGES</option>
          <option>Research</option>
          <option>Prototype</option>
          <option>Testing</option>
          <option>Deployment</option>
        </select>
        <select className={`text-xs text-slate-600 bg-white border border-slate-200 px-3 py-2 outline-none ${mono}`}>
          <option>ALL SUPPORT</option>
          <option>Hardware</option>
          <option>Funding</option>
          <option>Mentoring</option>
          <option>Deployment</option>
        </select>
        <span className={`text-xs text-slate-400 ml-1 ${mono}`}>{results.length} PROJECTS FOUND</span>
      </div>

      <div className="mt-6 space-y-5">
        {results.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <StageTag className={p.stageColor}>{p.stage.toUpperCase()}</StageTag>
                  <span className={`text-xs text-slate-400 ${mono}`}>{p.domain}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{p.techTags.join(", ")}</span>
                </div>
                <button onClick={() => openProject(p.id)} className="text-left mt-2 text-lg font-bold text-slate-900 hover:text-orange-600">
                  {p.title}
                </button>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={`text-[10px] font-bold text-slate-400 ${mono}`}>PROBLEM</p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-3">{p.problem}</p>
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold text-slate-400 ${mono}`}>SOLUTION</p>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-3">{p.solution}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1"><GraduationCap size={12}/> {p.university}</span>
                  <span className="flex items-center gap-1"><Users size={12}/> {p.team.name}</span>
                  <span className="flex items-center gap-1"><MapPin size={12}/> {p.location}</span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-end gap-4 w-56">
                <MatchBadge value={p.match} size="lg" />
                <div className="w-full">
                  <p className={`text-[10px] font-bold text-slate-400 mb-1.5 ${mono}`}>LOOKING FOR</p>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {p.seeking.map((s) => <Chip key={s}>{s}</Chip>)}
                  </div>
                </div>
                <button
                  onClick={() => openProject(p.id)}
                  className="w-full text-sm font-bold px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-1.5"
                >
                  View Project <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Project Details                                                   */
/* ------------------------------------------------------------------ */

const ProjectDetails = ({ id, go }) => {
  const p = PROJECTS.find((x) => x.id === id) || PROJECTS[0];

  return (
    <div className="flex-1 min-w-0">
      <TopBar title="Project Details" />
      <div className="max-w-[1290px] mx-auto px-8 py-8">
        <button onClick={() => go("discover")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <ChevronLeft size={15} /> Back to Discover
        </button>

        <div className="mt-4 bg-white border border-orange-300 p-6 flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <StageTag className={p.stageColor}>{p.stage.toUpperCase()}</StageTag>
              <span className={`text-xs text-slate-400 ${mono}`}>{p.domain}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">{p.title}</h1>
            <p className={`text-xs text-slate-400 mt-1.5 flex items-center gap-1.5 ${mono}`}>
              <MapPin size={11} /> {p.university} · {p.techTags[0]} · {p.location}
            </p>
          </div>
          <MatchBadge value={p.match} size="lg" />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6">
              <p className={`text-[10px] font-bold text-slate-400 ${mono}`}>THE PROBLEM</p>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{p.problem}</p>
            </div>
            <div className="bg-white border border-slate-200 p-6">
              <p className={`text-[10px] font-bold text-slate-400 ${mono}`}>THE SOLUTION</p>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{p.solution}</p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <ProgressTracker stages={p.progressStages} index={p.progressIndex} label={p.progressStages[p.progressIndex]} />
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <p className={`text-[10px] font-bold text-slate-400 mb-3 ${mono}`}>PROJECT OUTCOMES</p>
              <div className="space-y-2 text-sm">
                <p><span className="text-slate-400">Expected impact: </span><span className="text-slate-700">{p.outcomes.impact}</span></p>
                <p><span className="text-slate-400">Beneficiaries: </span><span className="text-slate-700">{p.outcomes.beneficiaries}</span></p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 p-5">
              <p className={`text-xs font-bold text-orange-600 mb-3 ${mono}`}>CURRENTLY SEEKING</p>
              <ul className="space-y-2">
                {p.seeking.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 bg-orange-500 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 p-5">
              <p className={`text-[10px] font-bold text-slate-400 mb-3 ${mono}`}>STUDENT TEAM</p>
              <p className="font-semibold text-slate-900 text-sm mb-2">{p.team.name}</p>
              <div className="space-y-2">
                {p.team.members.map((m) => (
                  <div key={m.n} className="flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center">
                      {m.i}
                    </span>
                    <span className="text-sm text-slate-600">{m.n}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5">
              <p className={`text-[10px] font-bold text-slate-400 mb-3 ${mono}`}>FACULTY MENTOR</p>
              <p className="font-semibold text-slate-900 text-sm">{p.mentor.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{p.mentor.dept}</p>
              <p className="text-xs text-slate-400">{p.mentor.org}</p>
            </div>

            <div className="bg-white border border-slate-200 p-5">
              <p className={`text-[10px] font-bold text-slate-400 mb-3 ${mono}`}>TECHNOLOGIES</p>
              <div className="flex flex-wrap gap-2">
                {p.techTags.map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
            </div>

            <button
              onClick={() => go("collaborations")}
              className="w-full text-sm font-bold px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-1.5"
            >
              Request Collaboration <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Collaborations                                                    */
/* ------------------------------------------------------------------ */

const Collaborations = ({ openWorkspace }) => {
  const [tab, setTab] = useState("active");
  const tabs = [
    { key: "pending", label: "Pending", count: COLLABORATIONS.pending.length },
    { key: "active", label: "Active", count: COLLABORATIONS.active.length },
    { key: "completed", label: "Completed", count: COLLABORATIONS.completed.length },
  ];
  const list = COLLABORATIONS[tab];

  return (
    <Page title="Collaborations">
      <h2 className="text-2xl font-bold text-slate-900">Collaborations</h2>
      <p className="text-sm text-slate-500 mt-1">Track all collaboration requests and active partnerships.</p>

      <div className="mt-6 flex items-center gap-6 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-sm font-bold flex items-center gap-1.5 border-b-2 -mb-px ${
              tab === t.key ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
            <span className={`text-[10px] font-bold w-4 h-4 flex items-center justify-center ${
              tab === t.key ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-500"
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {list.length === 0 && (
          <p className="text-sm text-slate-400 py-10 text-center">No collaborations in this category yet.</p>
        )}

        {tab === "pending" && list.map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className={`text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 ${mono}`}>PENDING REQUEST</span>
              <p className="font-bold text-slate-900 mt-2">{c.project}</p>
              <p className="text-xs text-slate-400">{c.university}</p>
              <p className="text-sm text-slate-500 mt-1.5">{c.note}</p>
            </div>
            <span className="text-xs text-slate-400 shrink-0">{c.requested}</span>
          </div>
        ))}

        {tab === "active" && list.map((c, i) => (
          <div key={i} className="bg-white border border-orange-300 p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 ${mono}`}>ACTIVE COLLABORATION</span>
                <span className="text-xs text-slate-400">{c.updated}</span>
              </div>
              <p className="font-bold text-slate-900 mt-2">{c.project}</p>
              <p className="text-xs text-slate-400">{c.university}</p>
              <p className="text-sm text-slate-500 mt-1.5">
                Your contribution: <span className="font-medium text-slate-700">{c.contribution}</span>
                <span className="text-slate-300 mx-2">|</span>
                Stage: <span className="font-medium text-slate-700">{c.stage}</span>
              </p>
            </div>
            <button
              onClick={openWorkspace}
              className="text-sm font-bold px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white shrink-0 flex items-center gap-1.5"
            >
              Open Workspace <ChevronRight size={14} />
            </button>
          </div>
        ))}

        {tab === "completed" && list.map((c, i) => (
          <div key={i} className="bg-white border border-slate-200 p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className={`text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 ${mono}`}>COMPLETED</span>
              <p className="font-bold text-slate-900 mt-2">{c.project}</p>
              <p className="text-xs text-slate-400">{c.university}</p>
              <p className="text-sm text-slate-500 mt-1.5">
                Your contribution: <span className="font-medium text-slate-700">{c.contribution}</span>
                <span className="text-slate-300 mx-2">|</span>
                Stage: <span className="font-medium text-slate-700">{c.stage}</span>
              </p>
            </div>
            <span className="text-xs text-slate-400 shrink-0">{c.updated}</span>
          </div>
        ))}
      </div>
    </Page>
  );
};

/* ------------------------------------------------------------------ */
/* 5. Collaboration Workspace                                           */
/* ------------------------------------------------------------------ */

const CollaborationWorkspace = ({ go }) => {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Tasks", "Documents", "Updates", "Communication"];
  const w = WORKSPACE;

  return (
    <div className="flex-1 min-w-0">
      <TopBar title="Collaboration Workspace" />
      <div className="max-w-[1290px] mx-auto px-8 py-8">
        <button onClick={() => go("collaborations")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <ChevronLeft size={15} /> Back to Collaborations
        </button>

        <div className="mt-4 flex items-start justify-between flex-wrap gap-4">
          <div>
            <span className={`text-[9px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 ${mono}`}>ACTIVE COLLABORATION</span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">{w.project}</h1>
            <p className="text-sm text-slate-400 mt-1">{w.university} <span className="text-slate-300 mx-1">×</span> {w.partner}</p>
          </div>
          <div className="text-right">
            <p className={`text-[10px] text-slate-400 ${mono}`}>PROJECT MILESTONE</p>
            <p className="text-sm font-bold text-slate-900">{w.milestones[w.milestoneIndex]}</p>
            <p className="text-xs text-orange-600 font-semibold mt-0.5">
              {w.fieldProgress.done} of {w.fieldProgress.total} locations complete
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          {w.milestones.map((m, i) => (
            <div key={m} className="flex-1">
              <div className={`h-1.5 ${i < w.milestoneIndex ? "bg-slate-900" : i === w.milestoneIndex ? "bg-orange-500" : "bg-slate-200"}`} />
              <p className={`text-xs mt-1.5 ${i === w.milestoneIndex ? "text-orange-600 font-bold flex items-center gap-1" : "text-slate-400"}`}>
                {i === w.milestoneIndex && <ChevronRight size={11} />} {m}
              </p>
            </div>
          )).reduce((acc, el, i) => acc.concat(i ? [<div key={`gap-${i}`} className="w-3" />, el] : [el]), [])}
        </div>

        <div className="mt-6 flex items-center gap-6 border-b border-slate-200">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-bold border-b-2 -mb-px ${
                tab === t ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Overview" ? (
          <div className="mt-6 space-y-6">
            <div className="bg-white border border-orange-300 p-6 flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <p className={`text-[10px] font-bold text-slate-400 ${mono}`}>CURRENT PROJECT STATUS</p>
                <p className="font-bold text-slate-900 mt-2">Milestone: {w.status.title}</p>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{w.status.text}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-5 py-4 text-center shrink-0">
                <p className={`text-[10px] text-slate-400 ${mono}`}>TESTING PROGRESS</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {w.fieldProgress.done}/{w.fieldProgress.total}
                </p>
                <p className={`text-[10px] text-slate-400 ${mono}`}>LOCATIONS</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 p-6">
                <p className={`text-[10px] font-bold text-slate-400 mb-4 ${mono}`}>YOUR CONTRIBUTIONS</p>
                <div className="space-y-4">
                  {w.contributions.map((c) => (
                    <div key={c.title} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{c.title}</p>
                        <p className="text-xs text-slate-400">{c.sub}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 shrink-0 ${mono} ${c.color}`}>{c.status.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6">
                <p className={`text-[10px] font-bold text-slate-400 mb-4 ${mono}`}>DEPLOYMENT READINESS</p>
                <div className="space-y-4">
                  {w.readiness.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{r.label}</p>
                        <p className="text-xs text-slate-400">{r.detail}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 shrink-0 ${mono} ${r.color}`}>{r.status.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-white border border-slate-200 py-16 flex flex-col items-center gap-2 text-slate-400">
            <Cpu size={26} className="text-slate-200" />
            <p className="text-sm">{tab} for this collaboration will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* App shell                                                             */
/* ------------------------------------------------------------------ */

export default function IndustryModule() {
  const [page, setPage] = useState("dashboard");
  const [activeProject, setActiveProject] = useState(PROJECTS[0].id);

  const go = (key) => {
    setPage(key);
    window.scrollTo(0, 0);
  };
  const openProject = (id) => {
    setActiveProject(id);
    setPage("project");
  };
  const openWorkspace = () => go("workspace");

  const sidebarActive = page === "project" ? "discover" : page === "workspace" ? "collaborations" : page;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar active={sidebarActive} go={go} />
      {page === "dashboard" && <Dashboard go={go} openProject={openProject} />}
      {page === "discover" && <DiscoverProjects openProject={openProject} />}
      {page === "project" && <ProjectDetails id={activeProject} go={go} />}
      {page === "collaborations" && <Collaborations openWorkspace={openWorkspace} />}
      {page === "workspace" && <CollaborationWorkspace go={go} />}
    </div>
  );
}