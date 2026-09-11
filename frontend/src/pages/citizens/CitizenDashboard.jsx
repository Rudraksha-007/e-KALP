// // import React, { useState } from "react";
// // import {
// //   ArrowLeft, MapPin, Camera, Upload, Search, Bell, ChevronRight, ChevronDown,
// //   ThumbsUp, MessageSquare, FlaskConical, Building2, Landmark, Download,
// //   Plus, Radio, Award, CheckCircle2, Users, Tractor, Zap, GraduationCap,
// //   Droplet, Shield, ExternalLink, Lock, Mail, Phone, Languages, Navigation,
// //   ThumbsUp as VoiceIcon, Bookmark, Share2, Clock, TrendingUp, Target, Flag,
// //   LayoutGrid
// // } from "lucide-react";

// // /* ------------------------------------------------------------------ */
// // /* Shared chrome                                                       */
// // /* ------------------------------------------------------------------ */

// // const Sidebar = ({ active, go, brand = "SocioLens" }) => {
// //   const links = [
// //     { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
// //     { key: "explore", label: "Discover Projects", icon: Search },
// //     { key: "report", label: "Report Problem", icon: Plus },
// //     { key: "myreports", label: "My Reports", icon: Flag },
// //     { key: "profile", label: "Profile", icon: Users },
// //   ];

// //   return (
// //     <aside className="w-64 shrink-0 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col overflow-hidden">
// //       {/* Brand */}
// //       <div className="px-5 py-5 flex items-center gap-2.5 border-b border-slate-100 shrink-0">
// //         <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
// //           <Search size={16} className="text-white" strokeWidth={2.5} />
// //         </div>
// //         <div className="min-w-0">
// //           <p className="font-bold text-[15px] leading-tight text-slate-900 truncate">{brand}</p>
// //           <p className="text-[10px] font-semibold tracking-wide text-orange-500">JHARKHAND INNOVATION</p>
// //         </div>
// //       </div>

// //       {/* Nav links */}
// //       <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
// //         {links.map((l) => (
// //           <button
// //             key={l.key}
// //             onClick={() => go(l.key)}
// //             className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
// //               l.key === active
// //                 ? "bg-orange-50 text-orange-600 border border-orange-200"
// //                 : "text-slate-500 hover:bg-slate-50 border border-transparent"
// //             }`}
// //           >
// //             <l.icon size={16} />
// //             {l.label}
// //           </button>
// //         ))}
// //       </nav>

// //       {/* Location + CTA */}
// //       <div className="px-3 pb-4 space-y-2.5 shrink-0">
// //         <button className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-slate-100 transition-colors">
// //           <MapPin size={13} className="text-orange-500 shrink-0" />
// //           <span className="leading-tight text-left flex-1 truncate">
// //             Namkum, Ranchi (Jharkhand)
// //           </span>
// //           <span className="text-orange-500 font-medium shrink-0">Change</span>
// //         </button>
// //         <button
// //           onClick={() => go("report")}
// //           className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-lg"
// //         >
// //           <Plus size={15} strokeWidth={2.5} /> Report a Problem
// //         </button>
// //       </div>

// //       {/* Profile footer */}
// //       <button
// //         onClick={() => go("profile")}
// //         className="flex items-center gap-3 px-5 py-4 border-t border-slate-100 text-left hover:bg-slate-50 transition-colors shrink-0"
// //       >
// //         <img
// //           src="https://i.pravatar.cc/64?img=13"
// //           className="w-9 h-9 rounded-full object-cover shrink-0"
// //           alt="Amit Verma"
// //         />
// //         <span className="flex-1 leading-tight min-w-0">
// //           <span className="block text-[13px] font-semibold text-slate-900 truncate">Amit Verma</span>
// //           <span className="block text-[11px] text-orange-500 font-medium">Active Citizen</span>
// //         </span>
// //         <span className="relative text-slate-400 shrink-0">
// //           <Bell size={16} />
// //           <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
// //             3
// //           </span>
// //         </span>
// //       </button>
// //     </aside>
// //   );
// // };

// // const Footer = () => (
// //   <footer className="mt-16 bg-white border-t border-slate-200">
// //     <div className="mx-auto max-w-[1290px] px-6 py-8">
// //       <p className="text-xs font-bold tracking-wide text-orange-500 mb-3">
// //         JHARKHAND CIVIC INNOVATION ALLIANCE
// //       </p>
// //       <div className="flex flex-wrap items-center justify-between gap-4">
// //         <p className="text-xs text-slate-500">
// //           Co-developed under the aegis of State Societal R&amp;D Framework.
// //         </p>
// //         <div className="flex flex-wrap gap-4 text-xs text-slate-600">
// //           <span className="flex items-center gap-1.5"><Landmark size={13}/> Govt of Jharkhand</span>
// //           <span className="flex items-center gap-1.5"><GraduationCap size={13}/> BIT Mesra</span>
// //           <span className="flex items-center gap-1.5"><FlaskConical size={13}/> IIT ISM Dhanbad</span>
// //           <span className="flex items-center gap-1.5"><Building2 size={13}/> Tata Steel Foundation</span>
// //         </div>
// //       </div>
// //       <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap justify-between text-xs text-slate-400">
// //         <p>© 2025 SocioLens Jharkhand. Citizen-first Public Innovation Registry.</p>
// //         <div className="flex gap-5">
// //           <span>Civic Guidelines</span>
// //           <span>State Data Transparency</span>
// //           <span>API Portal</span>
// //         </div>
// //       </div>
// //     </div>
// //   </footer>
// // );

// // const Progress = ({ stages, currentIndex, color = "orange" }) => (
// //   <div>
// //     <div className="flex gap-1">
// //       {stages.map((s, i) => (
// //         <div
// //           key={s}
// //           className={`h-1.5 flex-1 rounded-full ${
// //             i < currentIndex
// //               ? "bg-slate-900"
// //               : i === currentIndex
// //               ? `bg-${color}-500`
// //               : "bg-slate-200"
// //           }`}
// //         />
// //       ))}
// //     </div>
// //     <div className="flex justify-between mt-1.5">
// //       {stages.map((s, i) => (
// //         <span
// //           key={s}
// //           className={`text-[10px] flex-1 text-center first:text-left last:text-right ${
// //             i === currentIndex ? `text-${color}-600 font-semibold` : "text-slate-400"
// //           }`}
// //         >
// //           {s}
// //         </span>
// //       ))}
// //     </div>
// //   </div>
// // );

// // /* ------------------------------------------------------------------ */
// // /* Data                                                                 */
// // /* ------------------------------------------------------------------ */

// // const PROBLEMS = [
// //   {
// //     id: "SL-108",
// //     trackId: "#SL-108",
// //     tag: "WATER GOVERNANCE",
// //     tagColor: "bg-sky-50 text-sky-700",
// //     severity: "Critical Severity",
// //     severityColor: "bg-red-50 text-red-600",
// //     location: "Namkum Basti, Ward 14, Namkum Block",
// //     title: "High Fluoride & Iron Contamination in Deep Borewells Impacting Tribal Settlements",
// //     fullTitle: "Arsenic and Iron Groundwater Filtration in Namkum Lowland Aquifers",
// //     desc:
// //       "Hydro-geological assessment detected fluoride levels at 3.2 mg/L (safe limit: 1.0 mg/L) in 12 shared hand pumps across Namkum Basti. Symptoms of early fluorosis reported among school children.",
// //     stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
// //     stageIndex: 3,
// //     stageLabel: "Stage 4 of 6: Prototype Validation",
// //     metricLabel: "Citizens At Risk",
// //     metricValue: "640",
// //     uniLabel: "Participating Universities",
// //     uniValue: "142",
// //     icon: Droplet,
// //     difficulty: "Hard",
// //     difficultyColor: "text-red-500 bg-red-50",
// //     upvotes: 342,
// //     notes: 18,
// //     samples: 5,
// //     universities: [
// //       { name: "BIT Mesra", dept: "Dept. of Chemical Engineering", role: "Lead Research Partner", scholars: 6 },
// //       { name: "Tata Steel Rural Development Society (TSRDS)", dept: "Field Deployment Partner", role: "Implementation Partner", scholars: 3 },
// //     ],
// //     funders: [
// //       { name: "Jharkhand Dept. of Drinking Water & Sanitation", amount: "₹42 L", type: "State Grant" },
// //       { name: "Tata Steel Foundation", amount: "₹18 L", type: "CSR Fund" },
// //     ],
// //     constraints: [
// //       "Solution must operate off-grid or on solar in Namkum Basti (frequent 6hr+ outages).",
// //       "Filtration cost per household must stay under ₹1,500 recurring / year.",
// //       "Must remove fluoride to below 1.0 mg/L and iron to below 0.3 mg/L per BIS 10500.",
// //     ],
// //     examples: [
// //       { input: "Fluoride = 3.2 mg/L, Iron = 2.1 mg/L, Households = 4,200", output: "Fluoride ≤ 1.0 mg/L, Iron ≤ 0.3 mg/L", explanation: "Multi-tier bio-sand + activated alumina filter achieved 96.4% purity in prototype field test at Namkum Well #2." },
// //     ],
// //     updates: [
// //       { date: "2 days ago", text: "Prototype field test passed 96.4% purity test at Namkum Well 2. Multi-tier bio-sand filter activated." },
// //       { date: "1 week ago", text: "BIT Mesra Chemical Eng. dept completed lab-scale bio-sand column trials with 91% fluoride reduction." },
// //     ],
// //   },
// //   {
// //     id: "SL-142",
// //     trackId: "#SL-142",
// //     tag: "AGRICULTURE & COLD CHAIN",
// //     tagColor: "bg-lime-50 text-lime-700",
// //     severity: "High Priority Call",
// //     severityColor: "bg-orange-50 text-orange-600",
// //     location: "Rampur Panchayat Mandi, Namkum",
// //     title: "35–40% Distress Spoilage in Peak Tomato Yield Due to Zero Decentralized Pre-Cooling",
// //     fullTitle: "Post-Harvest Cold Storage Loss for Smallholder Vegetable Farmers in Rampur",
// //     desc:
// //       "Over 320 smallholders in the Rampur green-belt dump bumper tomato crops at ₹2–3/kg during November-February. Lack of micro-phase change material (PCM) cold hubs causes ₹1.8 Cr seasonal community loss.",
// //     stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
// //     stageIndex: 4,
// //     stageLabel: "Stage 5 of 6: Pilot Field Deployment",
// //     metricLabel: "Farmers Mobilized",
// //     metricValue: "320",
// //     uniLabel: "Participating Universities",
// //     uniValue: "289",
// //     icon: Tractor,
// //     difficulty: "Medium",
// //     difficultyColor: "text-amber-600 bg-amber-50",
// //     upvotes: 189,
// //     notes: 12,
// //     samples: 3,
// //     universities: [
// //       { name: "Birsa Agricultural University (BAU) Kanke", dept: "Dept. of Post-Harvest Technology", role: "Lead Research Partner", scholars: 9 },
// //     ],
// //     funders: [
// //       { name: "NABARD Ranchi District Cell", amount: "₹60 L", type: "Rural Infra Grant" },
// //     ],
// //     constraints: [
// //       "Cooling chamber must run without grid electricity (evaporative / PCM based).",
// //       "Payback period for a shared cold hub must be under 18 months for a 30-farmer cluster.",
// //     ],
// //     examples: [
// //       { input: "Spoilage rate = 28-40%, Distance to hub = 2km avg", output: "Spoilage ≤ 8%", explanation: "Thermal survey completed; passive evaporative cool chamber blueprint drafted for zero-electricity operation." },
// //     ],
// //     updates: [
// //       { date: "5 days ago", text: "Thermal survey completed; passive evaporative cool chamber blueprint drafted for zero-electricity operation." },
// //     ],
// //   },
// //   {
// //     id: "SL-089",
// //     trackId: "#SL-089",
// //     tag: "RURAL ELECTRIFICATION",
// //     tagColor: "bg-violet-50 text-violet-700",
// //     severity: "University Working",
// //     severityColor: "bg-slate-100 text-slate-600",
// //     location: "Kalyanpur Cluster, Lowadih Road",
// //     title: "Low-Voltage Terminal Fluctuations Haulting Semi-Automated Tussar Silk Looms",
// //     fullTitle: "Solar Powered Micro-Cold Chain for Anganwadi Vaccine Storage (Lowadih)",
// //     desc:
// //       "Voltage drops below 160V for 6 hours daily during afternoon production shifts, burning out motor inverters for 110 indigenous silk weaving households.",
// //     stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
// //     stageIndex: 2,
// //     stageLabel: "Stage 3 of 6: University Bench Engineering",
// //     metricLabel: "Weaving Units",
// //     metricValue: "110",
// //     uniLabel: "Participating Universities",
// //     uniValue: "96",
// //     icon: Zap,
// //     difficulty: "Medium",
// //     difficultyColor: "text-amber-600 bg-amber-50",
// //     upvotes: 480,
// //     notes: 9,
// //     samples: 2,
// //     universities: [
// //       { name: "NIT Jamshedpur", dept: "Dept. of Electrical Engineering", role: "Lead Research Partner", scholars: 5 },
// //     ],
// //     funders: [
// //       { name: "Jharkhand Dept. of Health", amount: "₹25 L", type: "State Endorsement" },
// //     ],
// //     constraints: [
// //       "Vaccine cold-chain must maintain 2-8°C for 15+ days without grid power.",
// //     ],
// //     examples: [
// //       { input: "Power outage duration = 6hrs/day", output: "0 temperature excursions below spec", explanation: "3 prototype units operational in Namkum PHC since 15 days; zero temperature excursions below threshold." },
// //     ],
// //     updates: [
// //       { date: "Yesterday", text: "3 prototype units operational in Namkum PHC since 15 days; zero temperature excursions below threshold." },
// //     ],
// //   },
// // ];

// // /* ------------------------------------------------------------------ */
// // /* 1. Report a Problem                                                  */
// // /* ------------------------------------------------------------------ */

// // const ReportProblem = ({ go }) => (
// //   <div className="min-h-screen bg-slate-50 flex">
// //     <Sidebar active="report" go={go} brand="e-KALP" />
// //     <div className="flex-1 min-w-0 flex flex-col">
// //       <div className="border-b border-slate-200 bg-white">
// //         <div className="max-w-[1040px] mx-auto px-6 py-4 flex items-center justify-between">
// //           <button onClick={() => go("dashboard")} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
// //             <ArrowLeft size={16} /> Cancel Submission
// //           </button>
// //           {/* <h1 className="text-lg font-bold text-emerald-800">Jharkhand Innovation Portal</h1> */}
// //           <div className="w-32" />
// //         </div>
// //       </div>

// //       <div className="flex-1 max-w-[1040px] w-full mx-auto px-6 py-10">
// //         <h2 className="text-3xl font-extrabold text-slate-900">Report a Challenge</h2>
// //         <p className="mt-2 text-slate-500 max-w-xl">
// //           Provide details about the local issue to help authorities and innovators understand and
// //           address it effectively.
// //         </p>

// //         <section className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
// //           <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
// //             <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center">
// //               <MapPin size={15} />
// //             </span>
// //             <h3 className="text-xs font-bold tracking-wide text-orange-600">1. PINPOINT THE LOCATION</h3>
// //           </div>
// //           <div className="mt-5 rounded-lg overflow-hidden border border-slate-200">
// //             <div className="relative h-64 bg-gradient-to-br from-emerald-100 via-teal-50 to-amber-50">
// //               <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow flex items-center gap-2 px-4 py-3">
// //                 <Search size={16} className="text-slate-400" />
// //                 <input
// //                   className="flex-1 outline-none text-sm text-slate-700"
// //                   defaultValue="Main Road, Ranchi"
// //                 />
// //                 <Navigation size={16} className="text-orange-500" />
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         <section className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
// //           <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
// //             <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center">
// //               <MessageSquare size={15} />
// //             </span>
// //             <h3 className="text-xs font-bold tracking-wide text-orange-600">2. CHALLENGE DETAILS</h3>
// //           </div>

// //           <div className="mt-5 space-y-6">
// //             <div>
// //               <p className="font-semibold text-slate-900 text-sm">What is the problem?</p>
// //               <p className="text-xs text-slate-500 mt-0.5">Describe the issue clearly. Be specific about what is happening.</p>
// //               <textarea
// //                 rows={3}
// //                 placeholder="E.g., The public water dispenser at the main square has been broken for 3 weeks..."
// //                 className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-200"
// //               />
// //             </div>
// //             <div>
// //               <p className="font-semibold text-slate-900 text-sm">Who is affected?</p>
// //               <p className="text-xs text-slate-500 mt-0.5">Identify the community, demographics, or groups impacted by this.</p>
// //               <textarea
// //                 rows={2}
// //                 placeholder="E.g., Daily commuters, local street vendors, and elderly residents..."
// //                 className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-200"
// //               />
// //             </div>
// //             <div>
// //               <p className="font-semibold text-slate-900 text-sm">Desired Outcome</p>
// //               <p className="text-xs text-slate-500 mt-0.5">What does a successful resolution look like to you?</p>
// //               <textarea
// //                 rows={3}
// //                 placeholder="E.g., Repair the dispenser or replace it with a modern purification unit..."
// //                 className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-200"
// //               />
// //             </div>
// //           </div>
// //         </section>

// //         <section className="mt-6 bg-white border border-slate-200 rounded-xl p-6">
// //           <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
// //             <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center">
// //               <Camera size={15} />
// //             </span>
// //             <h3 className="text-xs font-bold tracking-wide text-orange-600">3. SUPPORTING MEDIA (OPTIONAL)</h3>
// //           </div>
// //           <div className="mt-5 border-2 border-dashed border-slate-200 rounded-lg py-12 flex flex-col items-center gap-3">
// //             <span className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center">
// //               <Upload size={18} className="text-sky-500" />
// //             </span>
// //             <p className="text-sm font-semibold text-slate-800">Click to upload or drag and drop</p>
// //             <p className="text-xs text-slate-400">SVG, PNG, JPG or MP4 (max. 10MB)</p>
// //           </div>
// //         </section>

// //         <div className="mt-8 flex justify-end gap-3">
// //           <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">
// //             Save as Draft
// //           </button>
// //           <button
// //             onClick={() => go("myreports")}
// //             className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5"
// //           >
// //             Submit Challenge <ChevronRight size={16} />
// //           </button>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   </div>
// // );

// // /* ------------------------------------------------------------------ */
// // /* 2. Dashboard                                                         */
// // /* ------------------------------------------------------------------ */

// // const Dashboard = ({ go, openProblem }) => {
// //   const [filter, setFilter] = useState("All");
// //   const cats = [
// //     { label: "All", count: 34 },
// //     { label: "Water", count: 8, icon: Droplet },
// //     { label: "Agriculture", count: 7, icon: Tractor },
// //     { label: "Healthcare", count: 5, icon: Shield },
// //     { label: "Infrastructure", count: 6, icon: Zap },
// //     { label: "Education", count: 8, icon: GraduationCap },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-slate-50 flex">
// //       <Sidebar active="dashboard" go={go} brand="e-KALP" />

// //       <div className="flex-1 min-w-0">
// //         <div className="max-w-[1290px] mx-auto px-6 py-8">
// //           <div className="flex items-center gap-2 text-xs font-semibold text-orange-600 mb-2">
// //             <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> NAMKUM CIVIC INNOVATION HUB • RANCHI CENTRAL
// //             <span className="text-slate-400 font-mono ml-1">ID: JH-RAN-NK-014</span>
// //           </div>
// //           <div className="flex items-start justify-between flex-wrap gap-4">
// //             <div>
// //               <h1 className="text-3xl font-extrabold text-slate-900">
// //                 Welcome back, <span className="text-orange-500">Amit Verma</span>
// //               </h1>
// //               <p className="mt-1.5 text-sm text-slate-500 flex items-center gap-1.5">
// //                 <Shield size={14} className="text-orange-400" /> Citizen Contributor • Ward 14, Namkum, Ranchi District • Impact Level: Regional Pioneer (Tier 3)
// //               </p>
// //             </div>
// //             <button onClick={() => go("report")} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-lg">
// //               <Plus size={16}/> Report a Societal Problem
// //             </button>
// //           </div>

// //           <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
// //             <div>
// //               {/* Map card */}
// //               <div className="bg-white border border-slate-200 rounded-xl p-5">
// //                 <div className="flex items-center justify-between flex-wrap gap-3">
// //                   <div>
// //                     <p className="font-bold text-slate-900 flex items-center gap-2"><MapPin size={16} className="text-orange-500"/> Namkum & Ranchi Micro-Geography Hotspots</p>
// //                     <p className="text-xs text-slate-400 mt-0.5">Verified physical problem telemetry across ward boundaries</p>
// //                   </div>
// //                   <div className="flex gap-2 text-xs font-medium">
// //                     <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500">All Wards (Ranchi)</span>
// //                     <span className="px-3 py-1.5 rounded-lg bg-orange-500 text-white">Namkum Only (Selected)</span>
// //                     <span className="px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500">Radius 5km</span>
// //                   </div>
// //                 </div>
// //                 <div className="mt-4 h-72 rounded-lg bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 relative overflow-hidden border border-slate-100">
// //                   <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm">Interactive ward map</div>
// //                   {[
// //                     { n: 1, top: "35%", left: "22%" },
// //                     { n: 2, top: "55%", left: "55%" },
// //                     { n: 3, top: "35%", left: "45%" },
// //                     { n: 4, top: "50%", left: "26%" },
// //                   ].map((p) => (
// //                     <span key={p.n} style={{ top: p.top, left: p.left }} className="absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow">
// //                       {p.n}
// //                     </span>
// //                   ))}
// //                 </div>
// //                 <div className="mt-4 flex flex-wrap gap-2">
// //                   {cats.map((c) => (
// //                     <button
// //                       key={c.label}
// //                       onClick={() => setFilter(c.label)}
// //                       className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg ${
// //                         filter === c.label ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600"
// //                       }`}
// //                     >
// //                       {c.icon && <c.icon size={13} />} {c.label} ({c.count})
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Problem cards */}
// //               <div className="mt-6 space-y-5">
// //                 {PROBLEMS.map((p) => (
// //                   <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-orange-200 transition-colors">
// //                     <div className="flex items-center justify-between flex-wrap gap-2">
// //                       <div className="flex items-center gap-2 flex-wrap">
// //                         <span className={`text-[10px] font-bold px-2 py-1 rounded ${p.tagColor}`}>{p.tag}</span>
// //                         <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11}/> {p.location}</span>
// //                       </div>
// //                       <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${p.severityColor}`}>
// //                         <span className="w-1.5 h-1.5 rounded-full bg-current" /> {p.severity}
// //                       </span>
// //                     </div>
// //                     <button onClick={() => openProblem(p.id)} className="text-left mt-3 text-lg font-bold text-slate-900 leading-snug hover:text-orange-600">
// //                       {p.title}
// //                     </button>
// //                     <div className="mt-4">
// //                       <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
// //                         <span>SOLUTION PROGRESS TRACKER</span>
// //                         <span className="text-orange-600">{p.stageLabel}</span>
// //                       </div>
// //                       <Progress stages={p.stages} currentIndex={p.stageIndex} />
// //                     </div>
// //                     <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
// //                       <div className="flex gap-6 text-sm">
// //                         <span className="flex items-center gap-1.5 text-slate-600"><Users size={15} className="text-slate-400"/> <b>{p.metricValue}</b> {p.metricLabel}</span>
// //                         <span className="flex items-center gap-1.5 text-slate-600"><GraduationCap size={15} className="text-slate-400"/> <b>{p.uniValue}</b> {p.uniLabel}</span>
// //                       </div>
// //                       <div className="flex gap-2">
// //                         <button className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-50 text-slate-600 flex items-center gap-1.5">
// //                           <ThumbsUp size={13} /> Add My Voice
// //                         </button>
// //                         <button onClick={() => openProblem(p.id)} className="text-xs font-semibold px-3 py-2 rounded-lg bg-orange-500 text-white flex items-center gap-1.5">
// //                           View Solution &amp; Progress <ChevronRight size={13} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Sidebar widgets */}
// //             <div className="space-y-6">
// //               <div className="bg-white border border-slate-200 rounded-xl p-5">
// //                 <p className="font-bold text-slate-900 flex items-center gap-2 text-sm">
// //                   <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> Real-time Civic Pulse
// //                   <span className="ml-auto text-[10px] text-slate-400 font-semibold">LIVE FEED</span>
// //                 </p>
// //                 <div className="mt-4 space-y-4">
// //                   {[
// //                     { icon: Radio, color: "text-sky-500 bg-sky-50", text: "BIT Mesra team deployed automated water filtration telemetry sensor at Namkum Ward 4.", time: "2 hours ago • Field Milestone" },
// //                     { icon: FlaskConical, color: "text-violet-500 bg-violet-50", text: "IIT ISM Dhanbad published open prototype test results for Solar Soil Moisture Array.", time: "Yesterday • Research Repo" },
// //                     { icon: Shield, color: "text-emerald-500 bg-emerald-50", text: "Jharkhand Health Dept approved pilot scale for Lowadih Sub-Centre e-dispensary.", time: "2 days ago • State Endorsement" },
// //                     { icon: Users, color: "text-orange-500 bg-orange-50", text: "84 Citizens added community validation to the Rampur Tomato Cold Chain proposal.", time: "3 days ago • Civic Momentum" },
// //                   ].map((f, i) => (
// //                     <div key={i} className="flex gap-3">
// //                       <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}>
// //                         <f.icon size={13} />
// //                       </span>
// //                       <div>
// //                         <p className="text-xs text-slate-700 leading-snug"><b className="font-semibold">{f.text.split(" ").slice(0,3).join(" ")}</b> {f.text.split(" ").slice(3).join(" ")}</p>
// //                         <p className="text-[10px] text-slate-400 mt-1">{f.time}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <button className="mt-4 text-xs font-semibold text-orange-600 flex items-center gap-1">
// //                   Explore All State-wide Milestones <ChevronRight size={12} />
// //                 </button>
// //               </div>

// //               <div className="bg-white border border-slate-200 rounded-xl p-5">
// //                 <p className="font-bold text-slate-900 text-sm">Participating Hub Institutions</p>
// //                 <p className="text-xs text-slate-400 mt-1">Accredited R&amp;D bodies solving Ranchi regional civic briefs</p>
// //                 <div className="mt-4 space-y-2">
// //                   {[
// //                     { i: "BIT", n: "BIT Mesra, Ranchi", d: "14 Active Engineering Pilots" },
// //                     { i: "NIT", n: "NIT Jamshedpur", d: "9 Rural Renewable Grants" },
// //                     { i: "ISM", n: "IIT (ISM) Dhanbad", d: "7 Hydro & Geological Studies" },
// //                     { i: "ICR", n: "ICAR-IINRG Namkum", d: "Horticulture Cluster Lead" },
// //                   ].map((h) => (
// //                     <div key={h.i} className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2.5">
// //                       <span className="text-[10px] font-bold text-slate-500 w-7">{h.i}</span>
// //                       <div className="flex-1">
// //                         <p className="text-xs font-semibold text-slate-800">{h.n}</p>
// //                         <p className="text-[10px] text-slate-400">{h.d}</p>
// //                       </div>
// //                       <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* 3. My Reports                                                        */
// // /* ------------------------------------------------------------------ */

// // const MyReports = ({ go, openProblem }) => {
// //   const [tab, setTab] = useState("All Activity (8)");
// //   const tabs = ["All Activity (8)", "Reported by Me (2)", "My Voices & Supported (6)", "Successfully Deployed (1)"];
// //   return (
// //     <div className="min-h-screen bg-slate-50 flex">
// //       <Sidebar active="myreports" go={go} brand="e-KALP" />
// //       <div className="flex-1 min-w-0">
// //         <div className="max-w-[1290px] mx-auto px-6 py-8">
// //           <div className="bg-gradient-to-r from-orange-50 to-white border border-slate-200 rounded-xl p-6 flex items-start justify-between flex-wrap gap-4">
// //             <div>
// //               <p className="text-[10px] font-bold text-orange-500 tracking-wide">CITIZEN REGISTRY • UID-JH-NAM-8421 • Live Sync with Ranchi Civic Cell</p>
// //               <h1 className="text-2xl font-extrabold text-slate-900 mt-1">My Civic Innovation Hub & Tracked Problems</h1>
// //               <p className="text-sm text-slate-500 mt-1 max-w-xl">
// //                 Monitor verified progress, university field pilots, and municipal milestones for issues you reported or supported in the Namkum & Greater Ranchi corridor.
// //               </p>
// //             </div>
// //             <div className="flex gap-2">
// //               <button className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-600 flex items-center gap-1.5">
// //                 <Download size={13} /> Civic Impact Certificate
// //               </button>
// //               <button onClick={() => go("report")} className="text-xs font-semibold px-4 py-2.5 rounded-lg bg-orange-500 text-white flex items-center gap-1.5">
// //                 <Plus size={13} /> Report New Issue
// //               </button>
// //             </div>
// //           </div>

// //           <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
// //             <div className="bg-white border border-slate-200 rounded-xl p-5">
// //               <p className="text-[11px] font-bold text-slate-400 tracking-wide">REPORTED BY YOU</p>
// //               <p className="text-3xl font-extrabold text-slate-900 mt-2">2 <span className="text-sm font-semibold text-orange-500">Active Cases</span></p>
// //               <p className="text-xs text-slate-400 mt-1">• 1 in Prototype • 1 in Lab Validation</p>
// //               <div className="h-1.5 bg-slate-100 rounded-full mt-3"><div className="h-1.5 w-1/2 bg-orange-500 rounded-full" /></div>
// //             </div>
// //             <div className="bg-white border border-slate-200 rounded-xl p-5">
// //               <p className="text-[11px] font-bold text-slate-400 tracking-wide">VOICES & SUPPORTED</p>
// //               <p className="text-3xl font-extrabold text-slate-900 mt-2">6 <span className="text-sm font-semibold text-slate-500">Initiatives</span></p>
// //               <p className="text-xs text-slate-400 mt-1">Active civic momentum across Ranchi district wards</p>
// //               <div className="flex gap-1 mt-3">
// //                 {["R","N","B"].map(x => <span key={x} className="w-6 h-6 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center">{x}</span>)}
// //                 <span className="text-[10px] text-slate-400 self-center ml-1">+3 Wards</span>
// //               </div>
// //             </div>
// //             <div className="bg-white border border-slate-200 rounded-xl p-5">
// //               <p className="text-[11px] font-bold text-slate-400 tracking-wide">UNIVERSITIES ENGAGED</p>
// //               <p className="text-3xl font-extrabold text-slate-900 mt-2">4 <span className="text-sm font-semibold text-slate-500">Lead Labs</span></p>
// //               <p className="text-xs text-slate-400 mt-1">BIT Mesra, NIT Jsr, RU, BAU Kanke</p>
// //               <p className="text-[10px] text-slate-400 mt-3">9 Research Scholars Active</p>
// //             </div>
// //           </div>

// //           <div className="mt-6 flex flex-wrap items-center gap-3">
// //             {tabs.map((t) => (
// //               <button key={t} onClick={() => setTab(t)} className={`text-xs font-semibold px-4 py-2.5 rounded-lg ${tab === t ? "bg-orange-500 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
// //                 {t}
// //               </button>
// //             ))}
// //             <div className="ml-auto flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
// //               <Search size={13} className="text-slate-400" />
// //               <input placeholder="Search track ID or keywords..." className="text-xs outline-none w-48 text-slate-600" />
// //             </div>
// //           </div>

// //           <div className="mt-5 space-y-5">
// //             {PROBLEMS.map((p) => (
// //               <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-6">
// //                 <div className="flex justify-between flex-wrap gap-3">
// //                   <div className="flex items-center gap-2 flex-wrap text-xs">
// //                     <span className="font-bold text-orange-500">{p.trackId}</span>
// //                     <span className={`font-bold px-2 py-1 rounded ${p.tagColor}`}>{p.tag}</span>
// //                     <span className="text-slate-400">• Reported by You on Nov 12, 2024</span>
// //                   </div>
// //                   <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-600 flex items-center gap-1">
// //                     <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> {p.stageLabel.toUpperCase()}
// //                   </span>
// //                 </div>
// //                 <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
// //                   <div>
// //                     <button onClick={() => openProblem(p.id)} className="text-left text-xl font-bold text-slate-900 hover:text-orange-600">{p.fullTitle}</button>
// //                     <p className="text-sm text-slate-500 mt-2">{p.desc}</p>
// //                     <div className="flex flex-wrap gap-2 mt-3">
// //                       {p.universities.map((u) => (
// //                         <span key={u.name} className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 flex items-center gap-1.5"><GraduationCap size={12}/> {u.name}</span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
// //                       <span>Validation Progress</span>
// //                       <span className="text-orange-600">{Math.round(((p.stageIndex+1)/6)*100)}% Complete</span>
// //                     </div>
// //                     <Progress stages={["Log","Review","Lab","Prototype","Pilot","Deploy"]} currentIndex={p.stageIndex} />
// //                     <div className="mt-3 bg-slate-50 rounded-lg p-3">
// //                       <p className="text-[10px] font-semibold text-orange-600">Latest Update • {p.updates[0].date}</p>
// //                       <p className="text-xs text-slate-600 mt-1 italic">"{p.updates[0].text}"</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between flex-wrap gap-3">
// //                   <div className="flex gap-4 text-xs text-slate-500">
// //                     <span className="flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes} Upvotes</span>
// //                     <span className="flex items-center gap-1"><MessageSquare size={13}/> {p.notes} Community Notes</span>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600">Share Dossier</button>
// //                     <button onClick={() => openProblem(p.id)} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500 text-white">View Workspace ›</button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         <Footer />
// //       </div>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* 4. Profile                                                           */
// // /* ------------------------------------------------------------------ */

// // const Profile = ({ go }) => (
// //   <div className="min-h-screen bg-slate-50 flex">
// //     <Sidebar active="profile" go={go} brand="e-KALP" />
// //     <div className="flex-1 min-w-0">
// //       <div className="max-w-[1290px] mx-auto px-6 py-8">
// //         <p className="text-xs text-slate-400 flex items-center gap-1">Dashboard <ChevronRight size={12}/> Citizen Profile
// //           <span className="ml-auto flex items-center gap-4 text-[11px] font-semibold">
// //             <span className="text-orange-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"/> PORTAL STATUS: ACTIVE CITIZEN</span>
// //             <span className="text-slate-400 font-mono">UID: JHK-834010-04419</span>
// //           </span>
// //         </p>

// //         <div className="mt-4 bg-white border border-slate-200 rounded-xl p-6 flex flex-wrap items-center gap-6 justify-between">
// //           <div className="flex items-center gap-5">
// //             <div className="relative">
// //               <img src="https://i.pravatar.cc/120?img=13" className="w-20 h-20 rounded-2xl object-cover" alt="" />
// //               <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center">
// //                 <Shield size={11} className="text-white" />
// //               </span>
// //             </div>
// //             <div>
// //               <p className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
// //                 Amit Verma
// //                 <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-sky-50 text-sky-600 flex items-center gap-1">
// //                   <CheckCircle2 size={11}/> Aadhaar / Ward 14 Verified Resident
// //                 </span>
// //               </p>
// //               <p className="text-sm text-slate-500 mt-1">Community Citizen Contributor & Neighborhood Volunteer</p>
// //               <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-3">
// //                 <span>Member since August 2024</span> •
// //                 <span>Namkum, Ranchi (Jharkhand)</span> •
// //                 <span className="font-mono">ID: VERMA-RNC-14</span>
// //               </p>
// //             </div>
// //           </div>
// //           <div className="bg-orange-50 rounded-xl px-5 py-4 flex items-center gap-3">
// //             <Award size={22} className="text-orange-500" />
// //             <div>
// //               <p className="text-2xl font-extrabold text-slate-900">840 <span className="text-sm text-orange-500 font-semibold">CIVIC POINTS</span></p>
// //               <p className="text-xs text-slate-400">Top 5% Contributor in Ranchi East</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
// //           <div className="space-y-6 max-w-[640px]">
// //             <div className="bg-white border border-slate-200 rounded-xl p-6">
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <p className="font-bold text-slate-900 flex items-center gap-2"><Users size={15} className="text-slate-400"/> Personal Information</p>
// //                   <p className="text-xs text-slate-400 mt-1">Verified identity details recognized by municipal coordinators</p>
// //                 </div>
// //                 <Lock size={14} className="text-slate-300 mt-1" />
// //               </div>
// //               <div className="mt-5 space-y-4">
// //                 <div>
// //                   <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Full Legal Name</span><span className="text-slate-400">Matches Govt ID</span></div>
// //                   <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Amit Verma <CheckCircle2 size={15} className="text-emerald-500"/></div>
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Email Address</span><span className="text-emerald-500 font-semibold">Verified</span></div>
// //                     <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700"><span className="truncate">amit.verma.ranchi@gmail.com</span><Mail size={14} className="text-slate-400 shrink-0"/></div>
// //                   </div>
// //                   <div>
// //                     <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Phone Number</span><span className="text-slate-400">SMS alerts enabled</span></div>
// //                     <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">+91 94311 XXXXX <Phone size={14} className="text-slate-400"/></div>
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-slate-600">Preferred Civic Language</span><span className="text-slate-400">Used in alerts & surveys</span></div>
// //                   <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">English & हिन्दी (Bilingual) <Languages size={14} className="text-slate-400"/></div>
// //                 </div>
// //                 <p className="text-xs text-slate-400">Jharkhand State Multi-lingual Civic Inclusivity standard compliant.</p>
// //               </div>
// //             </div>

// //             <div className="bg-white border border-slate-200 rounded-xl p-6">
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <p className="font-bold text-slate-900 flex items-center gap-2"><Building2 size={15} className="text-slate-400"/> Jharkhand Residential & Ward Details</p>
// //                   <p className="text-xs text-slate-400 mt-1">Local civic jurisdiction determines your regional vote weight & pilot trials</p>
// //                 </div>
// //                 <span className="text-[10px] font-bold px-2 py-1 rounded bg-orange-50 text-orange-600">RMC ZONE 4</span>
// //               </div>
// //               <div className="mt-5 space-y-4">
// //                 <div>
// //                   <p className="text-xs font-semibold text-slate-600 mb-1">Address Line / Landmark</p>
// //                   <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Quarter 4B, Near Old Railway Colony Road</div>
// //                 </div>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <p className="text-xs font-semibold text-slate-600 mb-1">Locality / Village</p>
// //                     <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Namkum Basti, Namkum</div>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs font-semibold text-slate-600 mb-1">Gram Panchayat / Municipal Ward</p>
// //                     <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Ward 14, Namkum Block</div>
// //                   </div>
// //                 </div>
// //                 <div className="grid grid-cols-3 gap-4">
// //                   <div>
// //                     <p className="text-xs font-semibold text-slate-600 mb-1">District</p>
// //                     <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Ranchi</div>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs font-semibold text-slate-600 mb-1">State</p>
// //                     <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">Jharkhand</div>
// //                   </div>
// //                   <div>
// //                     <p className="text-xs font-semibold text-slate-600 mb-1">Pincode</p>
// //                     <div className="bg-slate-50 rounded-lg px-3 py-2.5 text-sm text-slate-700">834010</div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2.5">
// //                   <span className="text-xs text-slate-500 flex items-center gap-1.5"><Navigation size={13}/> Geo-Coordinates: 23.3421° N, 85.3852° E (Namkum Sub-division)</span>
// //                   <span className="text-xs font-semibold text-orange-500">Re-pin on Map</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="flex justify-end gap-3">
// //               <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel Changes</button>
// //               <button className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-orange-500 text-white">Save Profile Changes</button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   </div>
// // );

// // /* ------------------------------------------------------------------ */
// // /* 5. Problem Detail — LeetCode-style problem statement page            */
// // /* ------------------------------------------------------------------ */

// // const ProblemDetail = ({ id, go }) => {
// //   const p = PROBLEMS.find((x) => x.id === id) || PROBLEMS[0];
// //   const [tab, setTab] = useState("description");
// //   const idx = PROBLEMS.findIndex((x) => x.id === p.id);

// //   const tabs = [
// //     { key: "description", label: "Description" },
// //     { key: "partners", label: "Partners & Funding" },
// //     { key: "solution", label: "Solution Log" },
// //     { key: "discussion", label: `Discussion (${p.notes})` },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-slate-50 flex flex-col">
// //       {/* top strip nav, leetcode-style */}
// //       <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
// //         <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <button onClick={() => go("dashboard")} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600">
// //               <ArrowLeft size={16} />
// //             </button>
// //             <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
// //               <Search size={14} className="text-orange-500"/> SocioLens
// //             </span>
// //             <span className="text-slate-300">/</span>
// //             <button className="text-sm text-slate-500 hover:text-slate-800">Problem List</button>
// //           </div>
// //           <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
// //             <button
// //               disabled={idx <= 0}
// //               onClick={() => go("problem", PROBLEMS[idx - 1]?.id)}
// //               className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
// //             >
// //               <ArrowLeft size={14} />
// //             </button>
// //             <span className="px-2">{idx + 1} / {PROBLEMS.length}</span>
// //             <button
// //               disabled={idx >= PROBLEMS.length - 1}
// //               onClick={() => go("problem", PROBLEMS[idx + 1]?.id)}
// //               className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 rotate-180"
// //             >
// //               <ArrowLeft size={14} />
// //             </button>
// //           </div>
// //           <div className="flex items-center gap-2">
// //             <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 flex items-center gap-1.5"><Share2 size={13}/> Share</button>
// //             <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500 text-white flex items-center gap-1.5"><ThumbsUp size={13}/> Add My Voice</button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="flex-1 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
// //         {/* Left: problem statement */}
// //         <div className="border-r border-slate-200 bg-white">
// //           <div className="flex items-center gap-5 px-6 pt-4 border-b border-slate-200 text-sm font-semibold text-slate-500">
// //             {tabs.map((t) => (
// //               <button
// //                 key={t.key}
// //                 onClick={() => setTab(t.key)}
// //                 className={`pb-3 border-b-2 ${tab === t.key ? "border-orange-500 text-slate-900" : "border-transparent hover:text-slate-700"}`}
// //               >
// //                 {t.label}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="px-6 py-6">
// //             {tab === "description" && (
// //               <>
// //                 <h1 className="text-xl font-bold text-slate-900">{idx + 1}. {p.fullTitle}</h1>
// //                 <div className="flex items-center gap-3 mt-3">
// //                   <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.difficultyColor}`}>{p.difficulty}</span>
// //                   <span className="text-xs text-slate-400 flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes}</span>
// //                   <span className="text-xs text-slate-400 flex items-center gap-1"><MessageSquare size={13}/> {p.notes}</span>
// //                   <span className="text-xs text-slate-400 flex items-center gap-1"><Bookmark size={13}/></span>
// //                 </div>

// //                 <p className="mt-5 text-[15px] leading-7 text-slate-700">{p.desc}</p>

// //                 <div className="mt-5 space-y-2">
// //                   <p className="text-sm font-semibold text-slate-800">Constraints:</p>
// //                   <ul className="space-y-1.5">
// //                     {p.constraints.map((c, i) => (
// //                       <li key={i} className="text-sm text-slate-600 flex gap-2">
// //                         <span className="text-slate-300 mt-1.5 w-1 h-1 rounded-full bg-slate-300 shrink-0" /> {c}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 {p.examples.map((ex, i) => (
// //                   <div key={i} className="mt-5 bg-slate-50 rounded-lg p-4 font-mono text-xs">
// //                     <p className="font-sans font-semibold text-slate-800 text-sm mb-2">Example {i + 1}:</p>
// //                     <p><span className="text-slate-400">Input:</span> {ex.input}</p>
// //                     <p className="mt-1"><span className="text-slate-400">Output:</span> {ex.output}</p>
// //                     <p className="mt-1 font-sans text-slate-500"><span className="text-slate-400 font-mono">Explanation:</span> {ex.explanation}</p>
// //                   </div>
// //                 ))}

// //                 <div className="mt-6">
// //                   <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
// //                     <span>SOLUTION PROGRESS</span>
// //                     <span className="text-orange-600">{p.stageLabel}</span>
// //                   </div>
// //                   <Progress stages={p.stages} currentIndex={p.stageIndex} />
// //                 </div>

// //                 <div className="mt-6 flex gap-2 flex-wrap">
// //                   <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">{p.location}</span>
// //                   <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">Track ID {p.trackId}</span>
// //                 </div>
// //               </>
// //             )}

// //             {tab === "partners" && (
// //               <div className="space-y-8">
// //                 <div>
// //                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3"><GraduationCap size={16} className="text-sky-500"/> Universities Participating</p>
// //                   <div className="space-y-3">
// //                     {p.universities.map((u) => (
// //                       <div key={u.name} className="border border-slate-200 rounded-lg p-4">
// //                         <div className="flex justify-between items-start">
// //                           <div>
// //                             <p className="font-semibold text-slate-900 text-sm">{u.name}</p>
// //                             <p className="text-xs text-slate-500 mt-0.5">{u.dept}</p>
// //                           </div>
// //                           <span className="text-[10px] font-bold px-2 py-1 rounded bg-sky-50 text-sky-600">{u.role}</span>
// //                         </div>
// //                         <p className="text-xs text-slate-400 mt-2">{u.scholars} research scholars actively contributing</p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3"><Building2 size={16} className="text-emerald-500"/> Funding & Industry Partners</p>
// //                   <div className="space-y-3">
// //                     {p.funders.map((f) => (
// //                       <div key={f.name} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center">
// //                         <div>
// //                           <p className="font-semibold text-slate-900 text-sm">{f.name}</p>
// //                           <p className="text-xs text-slate-500 mt-0.5">{f.type}</p>
// //                         </div>
// //                         <span className="text-sm font-bold text-emerald-600">{f.amount}</span>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {tab === "solution" && (
// //               <div className="space-y-4">
// //                 {p.updates.map((u, i) => (
// //                   <div key={i} className="border-l-2 border-orange-300 pl-4 pb-4 relative">
// //                     <span className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-orange-500" />
// //                     <p className="text-xs font-semibold text-orange-600 flex items-center gap-1"><Clock size={11}/> {u.date}</p>
// //                     <p className="text-sm text-slate-700 mt-1">{u.text}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {tab === "discussion" && (
// //               <div className="text-sm text-slate-400 flex flex-col items-center py-16 gap-2">
// //                 <MessageSquare size={28} className="text-slate-200" />
// //                 {p.notes} community notes — sign in to view and add your comment.
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Right: stats / workbench-style panel */}
// //         <div className="bg-slate-50 px-6 py-6">
// //           <div className="bg-white border border-slate-200 rounded-xl p-5">
// //             <p className="text-xs font-bold text-slate-400 tracking-wide">CASE SUMMARY</p>
// //             <div className="mt-3 grid grid-cols-2 gap-4">
// //               <div>
// //                 <p className="text-2xl font-extrabold text-slate-900">{p.metricValue}</p>
// //                 <p className="text-xs text-slate-500">{p.metricLabel}</p>
// //               </div>
// //               <div>
// //                 <p className="text-2xl font-extrabold text-slate-900">{p.uniValue}</p>
// //                 <p className="text-xs text-slate-500">{p.uniLabel}</p>
// //               </div>
// //               <div>
// //                 <p className="text-2xl font-extrabold text-slate-900">{p.upvotes}</p>
// //                 <p className="text-xs text-slate-500">Community Upvotes</p>
// //               </div>
// //               <div>
// //                 <p className="text-2xl font-extrabold text-slate-900">{p.samples}</p>
// //                 <p className="text-xs text-slate-500">Lab Samples Logged</p>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="mt-5 bg-white border border-slate-200 rounded-xl p-5">
// //             <p className="text-xs font-bold text-slate-400 tracking-wide flex items-center gap-1.5"><Target size={12}/> RESOLUTION STAGES</p>
// //             <div className="mt-4 space-y-3">
// //               {p.stages.map((s, i) => (
// //                 <div key={s} className="flex items-center gap-3">
// //                   <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
// //                     i < p.stageIndex ? "bg-slate-900 text-white" : i === p.stageIndex ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"
// //                   }`}>
// //                     {i < p.stageIndex ? <CheckCircle2 size={13} /> : i + 1}
// //                   </span>
// //                   <span className={`text-sm ${i === p.stageIndex ? "font-semibold text-slate-900" : "text-slate-500"}`}>{s}</span>
// //                   {i === p.stageIndex && <span className="ml-auto text-[10px] font-bold text-orange-500">IN PROGRESS</span>}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="mt-5 bg-white border border-slate-200 rounded-xl p-5">
// //             <p className="text-xs font-bold text-slate-400 tracking-wide flex items-center gap-1.5"><TrendingUp size={12}/> IMPACT METER</p>
// //             <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
// //               <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600" style={{ width: `${((p.stageIndex + 1) / 6) * 100}%` }} />
// //             </div>
// //             <p className="text-xs text-slate-500 mt-2">{Math.round(((p.stageIndex + 1) / 6) * 100)}% of resolution roadmap complete</p>
// //           </div>

// //           <button onClick={() => go("myreports")} className="mt-5 w-full text-sm font-semibold px-4 py-3 rounded-lg bg-slate-900 text-white flex items-center justify-center gap-2">
// //             <Flag size={14}/> View in My Reports
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ------------------------------------------------------------------ */
// // /* App shell / router                                                   */
// // /* ------------------------------------------------------------------ */

// // export default function App() {
// //   const [page, setPage] = useState("dashboard");
// //   const [activeProblem, setActiveProblem] = useState(PROBLEMS[0].id);

// //   const go = (key, problemId) => {
// //     if (key === "problem" && problemId) setActiveProblem(problemId);
// //     setPage(key === "problem" ? "problem" : key);
// //     window.scrollTo(0, 0);
// //   };
// //   const openProblem = (id) => go("problem", id);

// //   if (page === "report") return <ReportProblem go={go} />;
// //   if (page === "myreports") return <MyReports go={go} openProblem={openProblem} />;
// //   if (page === "profile") return <Profile go={go} />;
// //   if (page === "problem") return <ProblemDetail id={activeProblem} go={go} />;
// //   if (page === "explore") return <Dashboard go={go} openProblem={openProblem} />;
// //   return <Dashboard go={go} openProblem={openProblem} />;
// // }




// import React, { useState, useEffect, useRef } from "react";
// import {
//   ArrowLeft, MapPin, Camera, Upload, Search, Bell, ChevronRight, ChevronDown,
//   ThumbsUp, MessageSquare, FlaskConical, Building2, Landmark, Download,
//   Plus, Radio, Award, CheckCircle2, Users, Tractor, Zap, GraduationCap,
//   Droplet, Shield, ExternalLink, Lock, Mail, Phone, Languages, Navigation,
//   ThumbsUp as VoiceIcon, Bookmark, Share2, Clock, TrendingUp, Target, Flag,
//   LayoutGrid
// } from "lucide-react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// /*
//   Requires: npm install leaflet
//   OpenStreetMap tiles are free and require no API key — just attribution,
//   which is included in the tile layer below.
// */

// // Marker icon fix: Leaflet's default marker assets don't resolve under
// // most bundlers (Vite/CRA), so we build a lightweight custom pin instead
// // of relying on the shipped PNG icons.
// const buildPin = (color = "#F5720B", label) =>
//   L.divIcon({
//     className: "ekalp-map-pin",
//     html: `<div style="
//       width:26px;height:26px;background:${color};display:flex;
//       align-items:center;justify-content:center;color:#fff;font:700 11px monospace;
//       border:2px solid #0B0B0C;box-shadow:0 1px 3px rgba(0,0,0,.35);
//     ">${label ?? ""}</div>`,
//     iconSize: [26, 26],
//     iconAnchor: [13, 13],
//   });

// /* ------------------------------------------------------------------ */
// /* Shared chrome                                                       */
// /* ------------------------------------------------------------------ */

// const Logo = ({ size = 36 }) => (
//   <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect width="40" height="40" fill="#0B0B0C" />
//     <rect x="6" y="6" width="10" height="10" fill="#F5720B" />
//     <rect x="18" y="6" width="10" height="10" fill="#F5F4F0" fillOpacity="0.15" />
//     <rect x="6" y="18" width="10" height="10" fill="#F5F4F0" fillOpacity="0.15" />
//     <rect x="18" y="18" width="10" height="10" fill="#F5F4F0" />
//     <rect x="24" y="24" width="10" height="10" fill="#F5720B" />
//   </svg>
// );

// /* ------------------------------------------------------------------ */
// /* OpenStreetMap view (Leaflet)                                        */
// /* ------------------------------------------------------------------ */

// // Dummy Namkum / Ranchi coordinates standing in for real problem geolocation.
// const DUMMY_MAP_POINTS = [
//   { n: 1, id: "SL-108", label: "Namkum Basti", lat: 23.3479, lng: 85.3986 },
//   { n: 2, id: "SL-142", label: "Rampur Mandi", lat: 23.3388, lng: 85.4102 },
//   { n: 3, id: "SL-089", label: "Kalyanpur Cluster", lat: 23.3512, lng: 85.4041 },
//   { n: 4, id: "SL-000", label: "Lowadih Road", lat: 23.3441, lng: 85.3927 },
// ];

// const RANCHI_CENTER = { lat: 23.3441, lng: 85.4009 };

// /**
//  * MapView renders a real OpenStreetMap (via Leaflet) with no API key.
//  * - markers: [{ lat, lng, label, id }] plotted as pins
//  * - pinMode: renders a single draggable pin at `center`, calls onPick(latlng)
//  *            on click/drag — used for the "pinpoint the location" flow
//  */
// const MapView = ({
//   markers = [],
//   center = RANCHI_CENTER,
//   zoom = 13,
//   pinMode = false,
//   onPick,
//   onMarkerClick,
//   heightClass = "h-72",
// }) => {
//   const containerRef = useRef(null);
//   const mapRef = useRef(null);
//   const pinRef = useRef(null);

//   useEffect(() => {
//     if (!containerRef.current || mapRef.current) return;

//     const map = L.map(containerRef.current, {
//       center: [center.lat, center.lng],
//       zoom,
//       scrollWheelZoom: false,
//     });
//     mapRef.current = map;

//     // OpenStreetMap tile layer — free, no API key, attribution required.
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     if (pinMode) {
//       const pin = L.marker([center.lat, center.lng], {
//         icon: buildPin("#F5720B"),
//         draggable: true,
//       }).addTo(map);
//       pin.on("dragend", () => {
//         const { lat, lng } = pin.getLatLng();
//         onPick && onPick({ lat, lng });
//       });
//       map.on("click", (e) => {
//         pin.setLatLng(e.latlng);
//         onPick && onPick(e.latlng);
//       });
//       pinRef.current = pin;
//     } else {
//       markers.forEach((m) => {
//         const marker = L.marker([m.lat, m.lng], { icon: buildPin("#F5720B", m.n) }).addTo(map);
//         marker.bindPopup(
//           `<div style="font:700 12px monospace;color:#0B0B0C;">${m.label}</div><div style="font:11px monospace;color:#F5720B;">${m.id}</div>`
//         );
//         if (onMarkerClick) marker.on("click", () => onMarkerClick(m));
//       });
//     }

//     return () => {
//       map.remove();
//       mapRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className={`w-full ${heightClass} border border-neutral-200 z-0`}
//     />
//   );
// };

// const Sidebar = ({ active, go, brand = "e-KALP" }) => {
//   const links = [
//     { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
//     { key: "explore", label: "Discover Projects", icon: Search },
//     { key: "report", label: "Report Problem", icon: Plus },
//     { key: "myreports", label: "My Reports", icon: Flag },
//     { key: "profile", label: "Profile", icon: Users },
//   ];

//   return (
//     <aside className="w-64 shrink-0 bg-white border-r border-neutral-200 h-screen sticky top-0 flex flex-col overflow-hidden">
//       {/* Brand */}
//       <div className="px-5 py-5 flex items-center gap-3 border-b border-neutral-200 shrink-0">
//         <Logo size={34} />
//         <div className="min-w-0">
//           <p className="font-black text-[16px] leading-tight text-neutral-950 tracking-tight truncate">{brand}</p>
//           <p className="text-[9px] font-mono font-semibold tracking-[0.15em] text-orange-600">CIVIC · INTELLIGENCE</p>
//         </div>
//       </div>

//       {/* Nav links */}
//       <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
//         {links.map((l) => (
//           <button
//             key={l.key}
//             onClick={() => go(l.key)}
//             className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-colors border-l-2 ${
//               l.key === active
//                 ? "bg-orange-50 text-orange-700 border-orange-500"
//                 : "text-neutral-500 hover:bg-neutral-50 border-transparent"
//             }`}
//           >
//             <l.icon size={16} />
//             {l.label}
//           </button>
//         ))}
//       </nav>

//       {/* Location + CTA */}
//       <div className="px-3 pb-4 space-y-2.5 shrink-0">
//         <button className="w-full flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-100 transition-colors font-mono">
//           <MapPin size={13} className="text-orange-600 shrink-0" />
//           <span className="leading-tight text-left flex-1 truncate">
//             Namkum, Ranchi (Jharkhand)
//           </span>
//           <span className="text-orange-600 font-semibold shrink-0">Change</span>
//         </button>
//         <button
//           onClick={() => go("report")}
//           className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-bold px-4 py-2.5"
//         >
//           <Plus size={15} strokeWidth={2.5} /> Report a Problem
//         </button>
//       </div>

//       {/* Profile footer */}
//       <button
//         onClick={() => go("profile")}
//         className="flex items-center gap-3 px-5 py-4 border-t border-neutral-200 text-left hover:bg-neutral-50 transition-colors shrink-0"
//       >
//         <img
//           src="https://i.pravatar.cc/64?img=13"
//           className="w-9 h-9 object-cover shrink-0"
//           alt="Amit Verma"
//         />
//         <span className="flex-1 leading-tight min-w-0">
//           <span className="block text-[13px] font-semibold text-neutral-950 truncate">Amit Verma</span>
//           <span className="block text-[10px] font-mono text-orange-600 font-medium tracking-wide">ACTIVE CITIZEN</span>
//         </span>
//         <span className="relative text-neutral-400 shrink-0">
//           <Bell size={16} />
//           <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center font-bold">
//             3
//           </span>
//         </span>
//       </button>
//     </aside>
//   );
// };

// const Footer = () => (
//   <footer className="mt-16 bg-white border-t border-neutral-200">
//     <div className="mx-auto max-w-[1290px] px-6 py-8">
//       <p className="text-[10px] font-mono font-bold tracking-[0.15em] text-orange-600 mb-3">
//         JHARKHAND CIVIC INNOVATION ALLIANCE
//       </p>
//       <div className="flex flex-wrap items-center justify-between gap-4">
//         <p className="text-xs text-neutral-500">
//           Co-developed under the aegis of State Societal R&amp;D Framework.
//         </p>
//         <div className="flex flex-wrap gap-4 text-xs text-neutral-600 font-mono">
//           <span className="flex items-center gap-1.5"><Landmark size={13}/> Govt of Jharkhand</span>
//           <span className="flex items-center gap-1.5"><GraduationCap size={13}/> BIT Mesra</span>
//           <span className="flex items-center gap-1.5"><FlaskConical size={13}/> IIT ISM Dhanbad</span>
//           <span className="flex items-center gap-1.5"><Building2 size={13}/> Tata Steel Foundation</span>
//         </div>
//       </div>
//       <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-wrap justify-between text-xs text-neutral-400 font-mono">
//         <p>© 2025 e-KALP Jharkhand. Citizen-first Public Innovation Registry.</p>
//         <div className="flex gap-5">
//           <span>Civic Guidelines</span>
//           <span>State Data Transparency</span>
//           <span>API Portal</span>
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// const Progress = ({ stages, currentIndex, color = "orange" }) => (
//   <div>
//     <div className="flex gap-1">
//       {stages.map((s, i) => (
//         <div
//           key={s}
//           className={`h-1 flex-1 ${
//             i < currentIndex
//               ? "bg-neutral-950"
//               : i === currentIndex
//               ? `bg-${color}-500`
//               : "bg-neutral-200"
//           }`}
//         />
//       ))}
//     </div>
//     <div className="flex justify-between mt-1.5">
//       {stages.map((s, i) => (
//         <span
//           key={s}
//           className={`text-[9px] font-mono flex-1 text-center first:text-left last:text-right ${
//             i === currentIndex ? `text-${color}-600 font-bold` : "text-neutral-400"
//           }`}
//         >
//           {s}
//         </span>
//       ))}
//     </div>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* Data                                                                 */
// /* ------------------------------------------------------------------ */

// const PROBLEMS = [
//   {
//     id: "SL-108",
//     trackId: "#SL-108",
//     tag: "WATER GOVERNANCE",
//     tagColor: "bg-sky-50 text-sky-700",
//     severity: "Critical Severity",
//     severityColor: "bg-red-50 text-red-600",
//     location: "Namkum Basti, Ward 14, Namkum Block",
//     title: "High Fluoride & Iron Contamination in Deep Borewells Impacting Tribal Settlements",
//     fullTitle: "Arsenic and Iron Groundwater Filtration in Namkum Lowland Aquifers",
//     desc:
//       "Hydro-geological assessment detected fluoride levels at 3.2 mg/L (safe limit: 1.0 mg/L) in 12 shared hand pumps across Namkum Basti. Symptoms of early fluorosis reported among school children.",
//     stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
//     stageIndex: 3,
//     stageLabel: "Stage 4 of 6: Prototype Validation",
//     metricLabel: "Citizens At Risk",
//     metricValue: "640",
//     uniLabel: "Participating Universities",
//     uniValue: "142",
//     icon: Droplet,
//     difficulty: "Hard",
//     difficultyColor: "text-red-600 bg-red-50",
//     upvotes: 342,
//     notes: 18,
//     samples: 5,
//     universities: [
//       { name: "BIT Mesra", dept: "Dept. of Chemical Engineering", role: "Lead Research Partner", scholars: 6 },
//       { name: "Tata Steel Rural Development Society (TSRDS)", dept: "Field Deployment Partner", role: "Implementation Partner", scholars: 3 },
//     ],
//     funders: [
//       { name: "Jharkhand Dept. of Drinking Water & Sanitation", amount: "₹42 L", type: "State Grant" },
//       { name: "Tata Steel Foundation", amount: "₹18 L", type: "CSR Fund" },
//     ],
//     constraints: [
//       "Solution must operate off-grid or on solar in Namkum Basti (frequent 6hr+ outages).",
//       "Filtration cost per household must stay under ₹1,500 recurring / year.",
//       "Must remove fluoride to below 1.0 mg/L and iron to below 0.3 mg/L per BIS 10500.",
//     ],
//     examples: [
//       { input: "Fluoride = 3.2 mg/L, Iron = 2.1 mg/L, Households = 4,200", output: "Fluoride ≤ 1.0 mg/L, Iron ≤ 0.3 mg/L", explanation: "Multi-tier bio-sand + activated alumina filter achieved 96.4% purity in prototype field test at Namkum Well #2." },
//     ],
//     updates: [
//       { date: "2 days ago", text: "Prototype field test passed 96.4% purity test at Namkum Well 2. Multi-tier bio-sand filter activated." },
//       { date: "1 week ago", text: "BIT Mesra Chemical Eng. dept completed lab-scale bio-sand column trials with 91% fluoride reduction." },
//     ],
//   },
//   {
//     id: "SL-142",
//     trackId: "#SL-142",
//     tag: "AGRICULTURE & COLD CHAIN",
//     tagColor: "bg-lime-50 text-lime-700",
//     severity: "High Priority Call",
//     severityColor: "bg-orange-50 text-orange-600",
//     location: "Rampur Panchayat Mandi, Namkum",
//     title: "35–40% Distress Spoilage in Peak Tomato Yield Due to Zero Decentralized Pre-Cooling",
//     fullTitle: "Post-Harvest Cold Storage Loss for Smallholder Vegetable Farmers in Rampur",
//     desc:
//       "Over 320 smallholders in the Rampur green-belt dump bumper tomato crops at ₹2–3/kg during November-February. Lack of micro-phase change material (PCM) cold hubs causes ₹1.8 Cr seasonal community loss.",
//     stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
//     stageIndex: 4,
//     stageLabel: "Stage 5 of 6: Pilot Field Deployment",
//     metricLabel: "Farmers Mobilized",
//     metricValue: "320",
//     uniLabel: "Participating Universities",
//     uniValue: "289",
//     icon: Tractor,
//     difficulty: "Medium",
//     difficultyColor: "text-amber-700 bg-amber-50",
//     upvotes: 189,
//     notes: 12,
//     samples: 3,
//     universities: [
//       { name: "Birsa Agricultural University (BAU) Kanke", dept: "Dept. of Post-Harvest Technology", role: "Lead Research Partner", scholars: 9 },
//     ],
//     funders: [
//       { name: "NABARD Ranchi District Cell", amount: "₹60 L", type: "Rural Infra Grant" },
//     ],
//     constraints: [
//       "Cooling chamber must run without grid electricity (evaporative / PCM based).",
//       "Payback period for a shared cold hub must be under 18 months for a 30-farmer cluster.",
//     ],
//     examples: [
//       { input: "Spoilage rate = 28-40%, Distance to hub = 2km avg", output: "Spoilage ≤ 8%", explanation: "Thermal survey completed; passive evaporative cool chamber blueprint drafted for zero-electricity operation." },
//     ],
//     updates: [
//       { date: "5 days ago", text: "Thermal survey completed; passive evaporative cool chamber blueprint drafted for zero-electricity operation." },
//     ],
//   },
//   {
//     id: "SL-089",
//     trackId: "#SL-089",
//     tag: "RURAL ELECTRIFICATION",
//     tagColor: "bg-violet-50 text-violet-700",
//     severity: "University Working",
//     severityColor: "bg-neutral-100 text-neutral-600",
//     location: "Kalyanpur Cluster, Lowadih Road",
//     title: "Low-Voltage Terminal Fluctuations Haulting Semi-Automated Tussar Silk Looms",
//     fullTitle: "Solar Powered Micro-Cold Chain for Anganwadi Vaccine Storage (Lowadih)",
//     desc:
//       "Voltage drops below 160V for 6 hours daily during afternoon production shifts, burning out motor inverters for 110 indigenous silk weaving households.",
//     stages: ["Reported", "Validated", "University In", "Prototype", "Pilot Field", "Deployed"],
//     stageIndex: 2,
//     stageLabel: "Stage 3 of 6: University Bench Engineering",
//     metricLabel: "Weaving Units",
//     metricValue: "110",
//     uniLabel: "Participating Universities",
//     uniValue: "96",
//     icon: Zap,
//     difficulty: "Medium",
//     difficultyColor: "text-amber-700 bg-amber-50",
//     upvotes: 480,
//     notes: 9,
//     samples: 2,
//     universities: [
//       { name: "NIT Jamshedpur", dept: "Dept. of Electrical Engineering", role: "Lead Research Partner", scholars: 5 },
//     ],
//     funders: [
//       { name: "Jharkhand Dept. of Health", amount: "₹25 L", type: "State Endorsement" },
//     ],
//     constraints: [
//       "Vaccine cold-chain must maintain 2-8°C for 15+ days without grid power.",
//     ],
//     examples: [
//       { input: "Power outage duration = 6hrs/day", output: "0 temperature excursions below spec", explanation: "3 prototype units operational in Namkum PHC since 15 days; zero temperature excursions below threshold." },
//     ],
//     updates: [
//       { date: "Yesterday", text: "3 prototype units operational in Namkum PHC since 15 days; zero temperature excursions below threshold." },
//     ],
//   },
// ];

// /* ------------------------------------------------------------------ */
// /* 1. Report a Problem                                                  */
// /* ------------------------------------------------------------------ */

// const ReportProblem = ({ go }) => (
//   <div className="min-h-screen bg-neutral-50 flex">
//     <Sidebar active="report" go={go} brand="e-KALP" />
//     <div className="flex-1 min-w-0 flex flex-col">
//       <div className="border-b border-neutral-200 bg-white">
//         <div className="max-w-[1040px] mx-auto px-6 py-4 flex items-center justify-between">
//           <button onClick={() => go("dashboard")} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 font-medium">
//             <ArrowLeft size={16} /> Cancel Submission
//           </button>
//           <div className="w-32" />
//         </div>
//       </div>

//       <div className="flex-1 max-w-[1040px] w-full mx-auto px-6 py-10">
//         <p className="text-[10px] font-mono font-bold tracking-[0.15em] text-orange-600 mb-2 flex items-center gap-1.5">
//           <span className="w-1.5 h-1.5 bg-orange-500" /> NEW SUBMISSION
//         </p>
//         <h2 className="text-4xl font-black text-neutral-950 tracking-tight">Report a Challenge</h2>
//         <p className="mt-2 text-neutral-500 max-w-xl">
//           Provide details about the local issue to help authorities and innovators understand and
//           address it effectively.
//         </p>

//         <section className="mt-8 bg-white border border-neutral-200 p-6">
//           <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
//             <span className="w-7 h-7 bg-orange-500 text-white flex items-center justify-center">
//               <MapPin size={15} />
//             </span>
//             <h3 className="text-xs font-mono font-bold tracking-[0.1em] text-orange-600">1. PINPOINT THE LOCATION</h3>
//           </div>
//           <div className="mt-5 overflow-hidden border border-neutral-200 relative">
//             <div className="absolute top-4 left-4 right-4 z-[400] bg-white border border-neutral-200 flex items-center gap-2 px-4 py-3">
//               <Search size={16} className="text-neutral-400" />
//               <input
//                 className="flex-1 outline-none text-sm text-neutral-700"
//                 defaultValue="Main Road, Ranchi"
//               />
//               <Navigation size={16} className="text-orange-600" />
//             </div>
//             <MapView
//               pinMode
//               center={RANCHI_CENTER}
//               zoom={14}
//               heightClass="h-64"
//               onPick={(latlng) => console.log("Pinned location:", latlng)}
//             />
//           </div>
//           <p className="mt-2 text-[10px] font-mono text-neutral-400">
//             Click the map or drag the pin to set the exact problem location.
//           </p>
//         </section>

//         <section className="mt-6 bg-white border border-neutral-200 p-6">
//           <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
//             <span className="w-7 h-7 bg-orange-500 text-white flex items-center justify-center">
//               <MessageSquare size={15} />
//             </span>
//             <h3 className="text-xs font-mono font-bold tracking-[0.1em] text-orange-600">2. CHALLENGE DETAILS</h3>
//           </div>

//           <div className="mt-5 space-y-6">
//             <div>
//               <p className="font-semibold text-neutral-950 text-sm">What is the problem?</p>
//               <p className="text-xs text-neutral-500 mt-0.5">Describe the issue clearly. Be specific about what is happening.</p>
//               <textarea
//                 rows={3}
//                 placeholder="E.g., The public water dispenser at the main square has been broken for 3 weeks..."
//                 className="mt-2 w-full border border-neutral-200 px-4 py-3 text-sm text-neutral-600 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-200"
//               />
//             </div>
//             <div>
//               <p className="font-semibold text-neutral-950 text-sm">Who is affected?</p>
//               <p className="text-xs text-neutral-500 mt-0.5">Identify the community, demographics, or groups impacted by this.</p>
//               <textarea
//                 rows={2}
//                 placeholder="E.g., Daily commuters, local street vendors, and elderly residents..."
//                 className="mt-2 w-full border border-neutral-200 px-4 py-3 text-sm text-neutral-600 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-200"
//               />
//             </div>
//             <div>
//               <p className="font-semibold text-neutral-950 text-sm">Desired Outcome</p>
//               <p className="text-xs text-neutral-500 mt-0.5">What does a successful resolution look like to you?</p>
//               <textarea
//                 rows={3}
//                 placeholder="E.g., Repair the dispenser or replace it with a modern purification unit..."
//                 className="mt-2 w-full border border-neutral-200 px-4 py-3 text-sm text-neutral-600 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-200"
//               />
//             </div>
//           </div>
//         </section>

//         <section className="mt-6 bg-white border border-neutral-200 p-6">
//           <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
//             <span className="w-7 h-7 bg-orange-500 text-white flex items-center justify-center">
//               <Camera size={15} />
//             </span>
//             <h3 className="text-xs font-mono font-bold tracking-[0.1em] text-orange-600">3. SUPPORTING MEDIA (OPTIONAL)</h3>
//           </div>
//           <div className="mt-5 border-2 border-dashed border-neutral-200 py-12 flex flex-col items-center gap-3">
//             <span className="w-10 h-10 bg-sky-50 flex items-center justify-center">
//               <Upload size={18} className="text-sky-600" />
//             </span>
//             <p className="text-sm font-semibold text-neutral-800">Click to upload or drag and drop</p>
//             <p className="text-xs text-neutral-400">SVG, PNG, JPG or MP4 (max. 10MB)</p>
//           </div>
//         </section>

//         <div className="mt-8 flex justify-end gap-3">
//           <button className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100">
//             Save as Draft
//           </button>
//           <button
//             onClick={() => go("myreports")}
//             className="px-5 py-2.5 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5"
//           >
//             Submit Challenge <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* 2. Dashboard                                                         */
// /* ------------------------------------------------------------------ */

// // const Dashboard = ({ go, openProblem }) => {
// //   const [filter, setFilter] = useState("All");
// const Dashboard = ({ go, openProblem }) => {
//   const [filter, setFilter] = useState("All");
//   const [liveProblems, setLiveProblems] = useState([]);
//   const [liveLoading, setLiveLoading] = useState(true);
//   const [liveError, setLiveError] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/problems")
//       .then((res) => {
//         if (!res.ok) throw new Error(`Request failed: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         setLiveProblems(data.items || []);
//         setLiveLoading(false);
//       })
//       .catch((err) => {
//         setLiveError(err.message);
//         setLiveLoading(false);
//       });
//   }, []);
//   const cats = [
//     { label: "All", count: 34 },
//     { label: "Water", count: 8, icon: Droplet },
//     { label: "Agriculture", count: 7, icon: Tractor },
//     { label: "Healthcare", count: 5, icon: Shield },
//     { label: "Infrastructure", count: 6, icon: Zap },
//     { label: "Education", count: 8, icon: GraduationCap },
//   ];

//   return (
//     <div className="min-h-screen bg-neutral-50 flex">
//       <Sidebar active="dashboard" go={go} brand="e-KALP" />

//       <div className="flex-1 min-w-0">
//         <div className="max-w-[1290px] mx-auto px-6 py-8">
//           <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.15em] text-orange-600 mb-3">
//             <span className="w-1.5 h-1.5 bg-orange-500" /> NAMKUM CIVIC INNOVATION HUB · RANCHI CENTRAL
//             <span className="text-neutral-400 ml-1">ID: JH-RAN-NK-014</span>
//           </div>
//           <div className="flex items-start justify-between flex-wrap gap-4">
//             <div>
//               <h1 className="text-4xl font-black text-neutral-950 tracking-tight">
//                 Welcome back, <span className="text-orange-500">Amit Verma</span>
//               </h1>
//               <p className="mt-1.5 text-sm text-neutral-500 flex items-center gap-1.5">
//                 <Shield size={14} className="text-orange-500" /> Citizen Contributor · Ward 14, Namkum, Ranchi District · Impact Level: Regional Pioneer (Tier 3)
//               </p>
//             </div>
//             <button onClick={() => go("report")} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-3">
//               <Plus size={16}/> Report a Societal Problem
//             </button>
//           </div>

//           <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
//             <div>
//               {/* Map card */}
//               <div className="bg-white border border-neutral-200 p-5">
//                 <div className="flex items-center justify-between flex-wrap gap-3">
//                   <div>
//                     <p className="font-bold text-neutral-950 flex items-center gap-2"><MapPin size={16} className="text-orange-500"/> Namkum & Ranchi Micro-Geography Hotspots</p>
//                     <p className="text-xs text-neutral-400 mt-0.5 font-mono">Verified physical problem telemetry across ward boundaries</p>
//                   </div>
//                   <div className="flex gap-2 text-xs font-mono font-medium">
//                     <span className="px-3 py-1.5 bg-neutral-50 text-neutral-500 border border-neutral-200">All Wards</span>
//                     <span className="px-3 py-1.5 bg-orange-500 text-white">Namkum Only</span>
//                     <span className="px-3 py-1.5 bg-neutral-50 text-neutral-500 border border-neutral-200">Radius 5km</span>
//                   </div>
//                 </div>
//                 <div className="mt-4 relative">
//                   <MapView markers={DUMMY_MAP_POINTS} center={RANCHI_CENTER} zoom={13} heightClass="h-72" />
//                   <span className="absolute bottom-2 left-2 bg-white/95 border border-neutral-200 text-[9px] font-mono text-neutral-500 px-2 py-1 z-[400]">
//                     OPENSTREETMAP · DUMMY HOTSPOT DATA
//                   </span>
//                 </div>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {cats.map((c) => (
//                     <button
//                       key={c.label}
//                       onClick={() => setFilter(c.label)}
//                       className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 ${
//                         filter === c.label ? "bg-neutral-950 text-white" : "bg-white border border-neutral-200 text-neutral-600"
//                       }`}
//                     >
//                       {c.icon && <c.icon size={13} />} {c.label} ({c.count})
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Problem cards */}
//                             {/* Problem cards */}
//               <div className="mt-6 space-y-5">
//                 {PROBLEMS.map((p) => (
//                   <div key={p.id} className="bg-white border border-neutral-200 p-6 hover:border-orange-300 transition-colors">
//                     <div className="flex items-center justify-between flex-wrap gap-2">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className={`text-[10px] font-mono font-bold px-2 py-1 ${p.tagColor}`}>{p.tag}</span>
//                         <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono"><MapPin size={11}/> {p.location}</span>
//                       </div>
//                       <span className={`text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 ${p.severityColor}`}>
//                         <span className="w-1.5 h-1.5 bg-current" /> {p.severity}
//                       </span>
//                     </div>
//                     <button onClick={() => openProblem(p.id)} className="text-left mt-3 text-lg font-bold text-neutral-950 leading-snug hover:text-orange-600">
//                       {p.title}
//                     </button>
//                     <div className="mt-4">
//                       <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 mb-1.5 tracking-wide">
//                         <span>SOLUTION PROGRESS TRACKER</span>
//                         <span className="text-orange-600">{p.stageLabel}</span>
//                       </div>
//                       <Progress stages={p.stages} currentIndex={p.stageIndex} />
//                     </div>
//                     <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
//                       <div className="flex gap-6 text-sm">
//                         <span className="flex items-center gap-1.5 text-neutral-600"><Users size={15} className="text-neutral-400"/> <b>{p.metricValue}</b> {p.metricLabel}</span>
//                         <span className="flex items-center gap-1.5 text-neutral-600"><GraduationCap size={15} className="text-neutral-400"/> <b>{p.uniValue}</b> {p.uniLabel}</span>
//                       </div>
//                       <div className="flex gap-2">
//                         <button className="text-xs font-semibold px-3 py-2 bg-neutral-50 text-neutral-600 flex items-center gap-1.5 border border-neutral-200">
//                           <ThumbsUp size={13} /> Add My Voice
//                         </button>
//                         <button onClick={() => openProblem(p.id)} className="text-xs font-bold px-3 py-2 bg-orange-500 text-white flex items-center gap-1.5">
//                           View Solution &amp; Progress <ChevronRight size={13} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Live problems from backend */}
//               <div className="mt-8">
//                 <div className="flex items-center justify-between mb-3">
//                   <p className="text-xs font-mono font-bold text-neutral-500 tracking-[0.1em]">
//                     LIVE REPORTS · FROM BACKEND
//                   </p>
//                   {liveLoading && (
//                     <span className="text-[10px] font-mono text-neutral-400">Loading…</span>
//                   )}
//                 </div>

//                 {liveError && (
//                   <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-mono px-4 py-3">
//                     Failed to load live reports: {liveError}
//                   </div>
//                 )}

//                 <div className="space-y-5">
//                   {liveProblems.map((lp) => (
//                     <div key={lp.id} className="bg-white border border-neutral-200 p-6 hover:border-orange-300 transition-colors">
//                       <div className="flex items-center justify-between flex-wrap gap-2">
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <span className="text-[10px] font-mono font-bold px-2 py-1 bg-sky-50 text-sky-700">
//                             {lp.categories && lp.categories.length > 0 ? lp.categories.join(", ").toUpperCase() : "UNCATEGORIZED"}
//                           </span>
//                           <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
//                             <MapPin size={11}/> {lp.location || "Unknown location"}
//                           </span>
//                         </div>
//                         <span className="text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 bg-neutral-100 text-neutral-600">
//                           <span className="w-1.5 h-1.5 bg-current" /> {lp.status?.replace(/_/g, " ") || "PENDING"}
//                         </span>
//                       </div>
//                       <p className="text-left mt-3 text-lg font-bold text-neutral-950 leading-snug">
//                         {lp.title}
//                       </p>
//                       <p className="mt-2 text-sm text-neutral-500">{lp.pd}</p>
//                       <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
//                         <span className="text-xs font-mono text-neutral-400">
//                           Token #{lp.token_number} · Reported {new Date(lp.date_reported).toLocaleDateString()}
//                         </span>
//                       </div>
//                     </div>
//                   ))}

//                   {!liveLoading && !liveError && liveProblems.length === 0 && (
//                     <p className="text-sm text-neutral-400">No live reports yet.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//             </div>

//             {/* Sidebar widgets */}
//             <div className="space-y-6">
//               <div className="bg-white border border-neutral-200 p-5">
//                 <p className="font-bold text-neutral-950 flex items-center gap-2 text-sm">
//                   <span className="w-1.5 h-1.5 bg-orange-500" /> Real-time Civic Pulse
//                   <span className="ml-auto text-[9px] font-mono text-neutral-400 font-semibold tracking-wide">LIVE FEED</span>
//                 </p>
//                 <div className="mt-4 space-y-4">
//                   {[
//                     { icon: Radio, color: "text-sky-600 bg-sky-50", text: "BIT Mesra team deployed automated water filtration telemetry sensor at Namkum Ward 4.", time: "2 hours ago · Field Milestone" },
//                     { icon: FlaskConical, color: "text-violet-600 bg-violet-50", text: "IIT ISM Dhanbad published open prototype test results for Solar Soil Moisture Array.", time: "Yesterday · Research Repo" },
//                     { icon: Shield, color: "text-emerald-600 bg-emerald-50", text: "Jharkhand Health Dept approved pilot scale for Lowadih Sub-Centre e-dispensary.", time: "2 days ago · State Endorsement" },
//                     { icon: Users, color: "text-orange-600 bg-orange-50", text: "84 Citizens added community validation to the Rampur Tomato Cold Chain proposal.", time: "3 days ago · Civic Momentum" },
//                   ].map((f, i) => (
//                     <div key={i} className="flex gap-3">
//                       <span className={`w-7 h-7 flex items-center justify-center shrink-0 ${f.color}`}>
//                         <f.icon size={13} />
//                       </span>
//                       <div>
//                         <p className="text-xs text-neutral-700 leading-snug"><b className="font-semibold">{f.text.split(" ").slice(0,3).join(" ")}</b> {f.text.split(" ").slice(3).join(" ")}</p>
//                         <p className="text-[10px] text-neutral-400 mt-1 font-mono">{f.time}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="mt-4 text-xs font-bold text-orange-600 flex items-center gap-1">
//                   Explore All State-wide Milestones <ChevronRight size={12} />
//                 </button>
//               </div>

//               <div className="bg-white border border-neutral-200 p-5">
//                 <p className="font-bold text-neutral-950 text-sm">Participating Hub Institutions</p>
//                 <p className="text-xs text-neutral-400 mt-1">Accredited R&amp;D bodies solving Ranchi regional civic briefs</p>
//                 <div className="mt-4 space-y-2">
//                   {[
//                     { i: "BIT", n: "BIT Mesra, Ranchi", d: "14 Active Engineering Pilots" },
//                     { i: "NIT", n: "NIT Jamshedpur", d: "9 Rural Renewable Grants" },
//                     { i: "ISM", n: "IIT (ISM) Dhanbad", d: "7 Hydro & Geological Studies" },
//                     { i: "ICR", n: "ICAR-IINRG Namkum", d: "Horticulture Cluster Lead" },
//                   ].map((h) => (
//                     <div key={h.i} className="flex items-center gap-3 bg-neutral-50 border border-neutral-100 px-3 py-2.5">
//                       <span className="text-[10px] font-mono font-bold text-neutral-500 w-7">{h.i}</span>
//                       <div className="flex-1">
//                         <p className="text-xs font-semibold text-neutral-800">{h.n}</p>
//                         <p className="text-[10px] text-neutral-400">{h.d}</p>
//                       </div>
//                       <span className="w-1.5 h-1.5 bg-orange-400" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
    
//   );
// };

// /* ------------------------------------------------------------------ */
// /* 3. My Reports                                                        */
// /* ------------------------------------------------------------------ */

// const MyReports = ({ go, openProblem }) => {
//   const [tab, setTab] = useState("All Activity (8)");
//   const tabs = ["All Activity (8)", "Reported by Me (2)", "My Voices & Supported (6)", "Successfully Deployed (1)"];
//   return (
//     <div className="min-h-screen bg-neutral-50 flex">
//       <Sidebar active="myreports" go={go} brand="e-KALP" />
//       <div className="flex-1 min-w-0">
//         <div className="max-w-[1290px] mx-auto px-6 py-8">
//           <div className="bg-white border border-neutral-200 p-6 flex items-start justify-between flex-wrap gap-4">
//             <div>
//               <p className="text-[10px] font-mono font-bold text-orange-600 tracking-[0.1em]">CITIZEN REGISTRY · UID-JH-NAM-8421 · LIVE SYNC WITH RANCHI CIVIC CELL</p>
//               <h1 className="text-2xl font-black text-neutral-950 mt-1 tracking-tight">My Civic Innovation Hub & Tracked Problems</h1>
//               <p className="text-sm text-neutral-500 mt-1 max-w-xl">
//                 Monitor verified progress, university field pilots, and municipal milestones for issues you reported or supported in the Namkum & Greater Ranchi corridor.
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button className="text-xs font-semibold px-4 py-2.5 bg-white border border-neutral-200 text-neutral-600 flex items-center gap-1.5">
//                 <Download size={13} /> Civic Impact Certificate
//               </button>
//               <button onClick={() => go("report")} className="text-xs font-bold px-4 py-2.5 bg-orange-500 text-white flex items-center gap-1.5">
//                 <Plus size={13} /> Report New Issue
//               </button>
//             </div>
//           </div>

//           <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
//             <div className="bg-white border border-neutral-200 p-5">
//               <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">REPORTED BY YOU</p>
//               <p className="text-3xl font-black text-neutral-950 mt-2">2 <span className="text-sm font-semibold text-orange-600">Active Cases</span></p>
//               <p className="text-xs text-neutral-400 mt-1">· 1 in Prototype · 1 in Lab Validation</p>
//               <div className="h-1 bg-neutral-100 mt-3"><div className="h-1 w-1/2 bg-orange-500" /></div>
//             </div>
//             <div className="bg-white border border-neutral-200 p-5">
//               <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">VOICES & SUPPORTED</p>
//               <p className="text-3xl font-black text-neutral-950 mt-2">6 <span className="text-sm font-semibold text-neutral-500">Initiatives</span></p>
//               <p className="text-xs text-neutral-400 mt-1">Active civic momentum across Ranchi district wards</p>
//               <div className="flex gap-1 mt-3">
//                 {["R","N","B"].map(x => <span key={x} className="w-6 h-6 bg-neutral-100 text-[10px] font-bold text-neutral-500 flex items-center justify-center">{x}</span>)}
//                 <span className="text-[10px] text-neutral-400 self-center ml-1 font-mono">+3 Wards</span>
//               </div>
//             </div>
//             <div className="bg-white border border-neutral-200 p-5">
//               <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">UNIVERSITIES ENGAGED</p>
//               <p className="text-3xl font-black text-neutral-950 mt-2">4 <span className="text-sm font-semibold text-neutral-500">Lead Labs</span></p>
//               <p className="text-xs text-neutral-400 mt-1">BIT Mesra, NIT Jsr, RU, BAU Kanke</p>
//               <p className="text-[10px] text-neutral-400 mt-3 font-mono">9 Research Scholars Active</p>
//             </div>
//           </div>

//           <div className="mt-6 flex flex-wrap items-center gap-3">
//             {tabs.map((t) => (
//               <button key={t} onClick={() => setTab(t)} className={`text-xs font-semibold px-4 py-2.5 ${tab === t ? "bg-orange-500 text-white" : "bg-white border border-neutral-200 text-neutral-600"}`}>
//                 {t}
//               </button>
//             ))}
//             <div className="ml-auto flex items-center gap-2 bg-white border border-neutral-200 px-3 py-2">
//               <Search size={13} className="text-neutral-400" />
//               <input placeholder="Search track ID or keywords..." className="text-xs outline-none w-48 text-neutral-600 font-mono" />
//             </div>
//           </div>

//           <div className="mt-5 space-y-5">
//             {PROBLEMS.map((p) => (
//               <div key={p.id} className="bg-white border border-neutral-200 p-6">
//                 <div className="flex justify-between flex-wrap gap-3">
//                   <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
//                     <span className="font-bold text-orange-600">{p.trackId}</span>
//                     <span className={`font-bold px-2 py-1 ${p.tagColor}`}>{p.tag}</span>
//                     <span className="text-neutral-400">· Reported by You on Nov 12, 2024</span>
//                   </div>
//                   <span className="text-[10px] font-mono font-bold px-3 py-1 bg-orange-50 text-orange-600 flex items-center gap-1.5 tracking-wide">
//                     <span className="w-1.5 h-1.5 bg-orange-500" /> {p.stageLabel.toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
//                   <div>
//                     <button onClick={() => openProblem(p.id)} className="text-left text-xl font-bold text-neutral-950 hover:text-orange-600">{p.fullTitle}</button>
//                     <p className="text-sm text-neutral-500 mt-2">{p.desc}</p>
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       {p.universities.map((u) => (
//                         <span key={u.name} className="text-xs px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-neutral-600 flex items-center gap-1.5"><GraduationCap size={12}/> {u.name}</span>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 mb-1.5 tracking-wide">
//                       <span>VALIDATION PROGRESS</span>
//                       <span className="text-orange-600">{Math.round(((p.stageIndex+1)/6)*100)}% COMPLETE</span>
//                     </div>
//                     <Progress stages={["Log","Review","Lab","Prototype","Pilot","Deploy"]} currentIndex={p.stageIndex} />
//                     <div className="mt-3 bg-neutral-50 border border-neutral-100 p-3">
//                       <p className="text-[9px] font-mono font-bold text-orange-600 tracking-wide">LATEST UPDATE · {p.updates[0].date}</p>
//                       <p className="text-xs text-neutral-600 mt-1">{p.updates[0].text}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between flex-wrap gap-3">
//                   <div className="flex gap-4 text-xs text-neutral-500">
//                     <span className="flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes} Upvotes</span>
//                     <span className="flex items-center gap-1"><MessageSquare size={13}/> {p.notes} Community Notes</span>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="text-xs font-semibold px-3 py-1.5 bg-neutral-50 text-neutral-600 border border-neutral-200">Share Dossier</button>
//                     <button onClick={() => openProblem(p.id)} className="text-xs font-bold px-3 py-1.5 bg-orange-500 text-white">View Workspace ›</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* 4. Profile                                                           */
// /* ------------------------------------------------------------------ */

// const Profile = ({ go }) => (
//   <div className="min-h-screen bg-neutral-50 flex">
//     <Sidebar active="profile" go={go} brand="e-KALP" />
//     <div className="flex-1 min-w-0">
//       <div className="max-w-[1290px] mx-auto px-6 py-8">
//         <p className="text-xs text-neutral-400 flex items-center gap-1 font-mono">Dashboard <ChevronRight size={12}/> Citizen Profile
//           <span className="ml-auto flex items-center gap-4 text-[10px] font-mono font-semibold">
//             <span className="text-orange-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-500"/> PORTAL STATUS: ACTIVE CITIZEN</span>
//             <span className="text-neutral-400">UID: JHK-834010-04419</span>
//           </span>
//         </p>

//         <div className="mt-4 bg-white border border-neutral-200 p-6 flex flex-wrap items-center gap-6 justify-between">
//           <div className="flex items-center gap-5">
//             <div className="relative">
//               <img src="https://i.pravatar.cc/120?img=13" className="w-20 h-20 object-cover" alt="" />
//               <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 border-2 border-white flex items-center justify-center">
//                 <Shield size={11} className="text-white" />
//               </span>
//             </div>
//             <div>
//               <p className="text-xl font-black text-neutral-950 flex items-center gap-2 tracking-tight">
//                 Amit Verma
//                 <span className="text-[10px] font-mono font-semibold px-2 py-1 bg-sky-50 text-sky-700 flex items-center gap-1">
//                   <CheckCircle2 size={11}/> AADHAAR / WARD 14 VERIFIED
//                 </span>
//               </p>
//               <p className="text-sm text-neutral-500 mt-1">Community Citizen Contributor & Neighborhood Volunteer</p>
//               <p className="text-xs text-neutral-400 mt-1.5 flex items-center gap-3 font-mono">
//                 <span>Member since August 2024</span> ·
//                 <span>Namkum, Ranchi (Jharkhand)</span> ·
//                 <span>ID: VERMA-RNC-14</span>
//               </p>
//             </div>
//           </div>
//           <div className="bg-orange-50 px-5 py-4 flex items-center gap-3">
//             <Award size={22} className="text-orange-600" />
//             <div>
//               <p className="text-2xl font-black text-neutral-950">840 <span className="text-sm text-orange-600 font-mono font-semibold">CIVIC POINTS</span></p>
//               <p className="text-xs text-neutral-400">Top 5% Contributor in Ranchi East</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
//           <div className="space-y-6 max-w-[640px]">
//             <div className="bg-white border border-neutral-200 p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-neutral-950 flex items-center gap-2"><Users size={15} className="text-neutral-400"/> Personal Information</p>
//                   <p className="text-xs text-neutral-400 mt-1">Verified identity details recognized by municipal coordinators</p>
//                 </div>
//                 <Lock size={14} className="text-neutral-300 mt-1" />
//               </div>
//               <div className="mt-5 space-y-4">
//                 <div>
//                   <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Full Legal Name</span><span className="text-neutral-400 font-mono text-[10px]">MATCHES GOVT ID</span></div>
//                   <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Amit Verma <CheckCircle2 size={15} className="text-emerald-600"/></div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Email Address</span><span className="text-emerald-600 font-mono text-[10px] font-semibold">VERIFIED</span></div>
//                     <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700"><span className="truncate">amit.verma.ranchi@gmail.com</span><Mail size={14} className="text-neutral-400 shrink-0"/></div>
//                   </div>
//                   <div>
//                     <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Phone Number</span><span className="text-neutral-400 font-mono text-[10px]">SMS ALERTS ON</span></div>
//                     <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">+91 94311 XXXXX <Phone size={14} className="text-neutral-400"/></div>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Preferred Civic Language</span><span className="text-neutral-400 font-mono text-[10px]">USED IN ALERTS</span></div>
//                   <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">English & हिन्दी (Bilingual) <Languages size={14} className="text-neutral-400"/></div>
//                 </div>
//                 <p className="text-xs text-neutral-400">Jharkhand State Multi-lingual Civic Inclusivity standard compliant.</p>
//               </div>
//             </div>

//             <div className="bg-white border border-neutral-200 p-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="font-bold text-neutral-950 flex items-center gap-2"><Building2 size={15} className="text-neutral-400"/> Jharkhand Residential & Ward Details</p>
//                   <p className="text-xs text-neutral-400 mt-1">Local civic jurisdiction determines your regional vote weight & pilot trials</p>
//                 </div>
//                 <span className="text-[10px] font-mono font-bold px-2 py-1 bg-orange-50 text-orange-600">RMC ZONE 4</span>
//               </div>
//               <div className="mt-5 space-y-4">
//                 <div>
//                   <p className="text-xs font-semibold text-neutral-600 mb-1">Address Line / Landmark</p>
//                   <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Quarter 4B, Near Old Railway Colony Road</div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-xs font-semibold text-neutral-600 mb-1">Locality / Village</p>
//                     <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Namkum Basti, Namkum</div>
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold text-neutral-600 mb-1">Gram Panchayat / Municipal Ward</p>
//                     <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Ward 14, Namkum Block</div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <p className="text-xs font-semibold text-neutral-600 mb-1">District</p>
//                     <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Ranchi</div>
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold text-neutral-600 mb-1">State</p>
//                     <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Jharkhand</div>
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold text-neutral-600 mb-1">Pincode</p>
//                     <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">834010</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5">
//                   <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-mono"><Navigation size={13}/> 23.3421° N, 85.3852° E (Namkum Sub-division)</span>
//                   <span className="text-xs font-bold text-orange-600">Re-pin on Map</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <button className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100">Cancel Changes</button>
//               <button className="px-5 py-2.5 text-sm font-bold bg-orange-500 text-white">Save Profile Changes</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   </div>
// );

// /* ------------------------------------------------------------------ */
// /* 5. Problem Detail — LeetCode-style problem statement page            */
// /* ------------------------------------------------------------------ */

// const ProblemDetail = ({ id, go }) => {
//   const p = PROBLEMS.find((x) => x.id === id) || PROBLEMS[0];
//   const [tab, setTab] = useState("description");
//   const idx = PROBLEMS.findIndex((x) => x.id === p.id);

//   const tabs = [
//     { key: "description", label: "Description" },
//     { key: "partners", label: "Partners & Funding" },
//     { key: "solution", label: "Solution Log" },
//     { key: "discussion", label: `Discussion (${p.notes})` },
//   ];

//   return (
//     <div className="min-h-screen bg-neutral-50 flex flex-col">
//       {/* top strip nav */}
//       <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
//         <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button onClick={() => go("dashboard")} className="w-8 h-8 hover:bg-neutral-100 flex items-center justify-center text-neutral-600">
//               <ArrowLeft size={16} />
//             </button>
//             <span className="text-sm font-black text-neutral-950 flex items-center gap-1.5 tracking-tight">
//               <Logo size={18} /> e-KALP
//             </span>
//             <span className="text-neutral-300">/</span>
//             <button className="text-sm text-neutral-500 hover:text-neutral-800 font-mono">Problem List</button>
//           </div>
//           <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-500">
//             <button
//               disabled={idx <= 0}
//               onClick={() => go("problem", PROBLEMS[idx - 1]?.id)}
//               className="w-8 h-8 hover:bg-neutral-100 flex items-center justify-center disabled:opacity-30"
//             >
//               <ArrowLeft size={14} />
//             </button>
//             <span className="px-2">{idx + 1} / {PROBLEMS.length}</span>
//             <button
//               disabled={idx >= PROBLEMS.length - 1}
//               onClick={() => go("problem", PROBLEMS[idx + 1]?.id)}
//               className="w-8 h-8 hover:bg-neutral-100 flex items-center justify-center disabled:opacity-30 rotate-180"
//             >
//               <ArrowLeft size={14} />
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="text-xs font-semibold px-3 py-1.5 border border-neutral-200 text-neutral-600 flex items-center gap-1.5"><Share2 size={13}/> Share</button>
//             <button className="text-xs font-bold px-3 py-1.5 bg-orange-500 text-white flex items-center gap-1.5"><ThumbsUp size={13}/> Add My Voice</button>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
//         {/* Left: problem statement */}
//         <div className="border-r border-neutral-200 bg-white">
//           <div className="flex items-center gap-5 px-6 pt-4 border-b border-neutral-200 text-sm font-semibold text-neutral-500">
//             {tabs.map((t) => (
//               <button
//                 key={t.key}
//                 onClick={() => setTab(t.key)}
//                 className={`pb-3 border-b-2 ${tab === t.key ? "border-orange-500 text-neutral-950" : "border-transparent hover:text-neutral-700"}`}
//               >
//                 {t.label}
//               </button>
//             ))}
//           </div>

//           <div className="px-6 py-6">
//             {tab === "description" && (
//               <>
//                 <p className="text-[10px] font-mono font-bold text-orange-600 tracking-[0.1em] mb-2">CASE {idx + 1} OF {PROBLEMS.length}</p>
//                 <h1 className="text-xl font-black text-neutral-950 tracking-tight">{p.fullTitle}</h1>
//                 <div className="flex items-center gap-3 mt-3">
//                   <span className={`text-xs font-mono font-semibold px-2.5 py-1 ${p.difficultyColor}`}>{p.difficulty}</span>
//                   <span className="text-xs text-neutral-400 flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes}</span>
//                   <span className="text-xs text-neutral-400 flex items-center gap-1"><MessageSquare size={13}/> {p.notes}</span>
//                   <span className="text-xs text-neutral-400 flex items-center gap-1"><Bookmark size={13}/></span>
//                 </div>

//                 <p className="mt-5 text-[15px] leading-7 text-neutral-700">{p.desc}</p>

//                 <div className="mt-5 space-y-2">
//                   <p className="text-sm font-semibold text-neutral-800">Constraints:</p>
//                   <ul className="space-y-1.5">
//                     {p.constraints.map((c, i) => (
//                       <li key={i} className="text-sm text-neutral-600 flex gap-2">
//                         <span className="mt-2 w-1 h-1 bg-orange-500 shrink-0" /> {c}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {p.examples.map((ex, i) => (
//                   <div key={i} className="mt-5 bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs">
//                     <p className="font-sans font-semibold text-neutral-800 text-sm mb-2">Example {i + 1}:</p>
//                     <p><span className="text-neutral-400">Input:</span> {ex.input}</p>
//                     <p className="mt-1"><span className="text-neutral-400">Output:</span> {ex.output}</p>
//                     <p className="mt-1 font-sans text-neutral-500"><span className="text-neutral-400 font-mono">Explanation:</span> {ex.explanation}</p>
//                   </div>
//                 ))}

//                 <div className="mt-6">
//                   <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 mb-1.5 tracking-wide">
//                     <span>SOLUTION PROGRESS</span>
//                     <span className="text-orange-600">{p.stageLabel}</span>
//                   </div>
//                   <Progress stages={p.stages} currentIndex={p.stageIndex} />
//                 </div>

//                 <div className="mt-6 flex gap-2 flex-wrap">
//                   <span className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 font-mono">{p.location}</span>
//                   <span className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 font-mono">Track ID {p.trackId}</span>
//                 </div>
//               </>
//             )}

//             {tab === "partners" && (
//               <div className="space-y-8">
//                 <div>
//                   <p className="text-sm font-bold text-neutral-800 flex items-center gap-2 mb-3"><GraduationCap size={16} className="text-sky-600"/> Universities Participating</p>
//                   <div className="space-y-3">
//                     {p.universities.map((u) => (
//                       <div key={u.name} className="border border-neutral-200 p-4">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <p className="font-semibold text-neutral-950 text-sm">{u.name}</p>
//                             <p className="text-xs text-neutral-500 mt-0.5">{u.dept}</p>
//                           </div>
//                           <span className="text-[10px] font-mono font-bold px-2 py-1 bg-sky-50 text-sky-700">{u.role}</span>
//                         </div>
//                         <p className="text-xs text-neutral-400 mt-2">{u.scholars} research scholars actively contributing</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-neutral-800 flex items-center gap-2 mb-3"><Building2 size={16} className="text-emerald-600"/> Funding & Industry Partners</p>
//                   <div className="space-y-3">
//                     {p.funders.map((f) => (
//                       <div key={f.name} className="border border-neutral-200 p-4 flex justify-between items-center">
//                         <div>
//                           <p className="font-semibold text-neutral-950 text-sm">{f.name}</p>
//                           <p className="text-xs text-neutral-500 mt-0.5">{f.type}</p>
//                         </div>
//                         <span className="text-sm font-bold text-emerald-700">{f.amount}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {tab === "solution" && (
//               <div className="space-y-4">
//                 {p.updates.map((u, i) => (
//                   <div key={i} className="border-l-2 border-orange-400 pl-4 pb-4 relative">
//                     <span className="absolute -left-[5px] top-0 w-2 h-2 bg-orange-500" />
//                     <p className="text-xs font-mono font-bold text-orange-600 flex items-center gap-1"><Clock size={11}/> {u.date}</p>
//                     <p className="text-sm text-neutral-700 mt-1">{u.text}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {tab === "discussion" && (
//               <div className="text-sm text-neutral-400 flex flex-col items-center py-16 gap-2">
//                 <MessageSquare size={28} className="text-neutral-200" />
//                 {p.notes} community notes — sign in to view and add your comment.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right: stats / workbench-style panel */}
//         <div className="bg-neutral-50 px-6 py-6">
//           <div className="bg-white border border-neutral-200 p-5">
//             <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">CASE SUMMARY</p>
//             <div className="mt-3 grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-2xl font-black text-neutral-950">{p.metricValue}</p>
//                 <p className="text-xs text-neutral-500">{p.metricLabel}</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-black text-neutral-950">{p.uniValue}</p>
//                 <p className="text-xs text-neutral-500">{p.uniLabel}</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-black text-neutral-950">{p.upvotes}</p>
//                 <p className="text-xs text-neutral-500">Community Upvotes</p>
//               </div>
//               <div>
//                 <p className="text-2xl font-black text-neutral-950">{p.samples}</p>
//                 <p className="text-xs text-neutral-500">Lab Samples Logged</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5 bg-white border border-neutral-200 p-5">
//             <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em] flex items-center gap-1.5"><Target size={12}/> RESOLUTION STAGES</p>
//             <div className="mt-4 space-y-3">
//               {p.stages.map((s, i) => (
//                 <div key={s} className="flex items-center gap-3">
//                   <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold shrink-0 ${
//                     i < p.stageIndex ? "bg-neutral-950 text-white" : i === p.stageIndex ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-400"
//                   }`}>
//                     {i < p.stageIndex ? <CheckCircle2 size={13} /> : i + 1}
//                   </span>
//                   <span className={`text-sm ${i === p.stageIndex ? "font-semibold text-neutral-950" : "text-neutral-500"}`}>{s}</span>
//                   {i === p.stageIndex && <span className="ml-auto text-[9px] font-mono font-bold text-orange-600 tracking-wide">IN PROGRESS</span>}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-5 bg-white border border-neutral-200 p-5">
//             <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em] flex items-center gap-1.5"><TrendingUp size={12}/> IMPACT METER</p>
//             <div className="mt-3 h-1.5 bg-neutral-100 overflow-hidden">
//               <div className="h-full bg-orange-500" style={{ width: `${((p.stageIndex + 1) / 6) * 100}%` }} />
//             </div>
//             <p className="text-xs text-neutral-500 mt-2">{Math.round(((p.stageIndex + 1) / 6) * 100)}% of resolution roadmap complete</p>
//           </div>

//           <button onClick={() => go("myreports")} className="mt-5 w-full text-sm font-bold px-4 py-3 bg-neutral-950 text-white flex items-center justify-center gap-2">
//             <Flag size={14}/> View in My Reports
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /* App shell / router                                                   */
// /* ------------------------------------------------------------------ */

// export default function App() {
//   const [page, setPage] = useState("dashboard");
//   const [activeProblem, setActiveProblem] = useState(PROBLEMS[0].id);

//   const go = (key, problemId) => {
//     if (key === "problem" && problemId) setActiveProblem(problemId);
//     setPage(key === "problem" ? "problem" : key);
//     window.scrollTo(0, 0);
//   };
//   const openProblem = (id) => go("problem", id);

//   if (page === "report") return <ReportProblem go={go} />;
//   if (page === "myreports") return <MyReports go={go} openProblem={openProblem} />;
//   if (page === "profile") return <Profile go={go} />;
//   if (page === "problem") return <ProblemDetail id={activeProblem} go={go} />;
//   if (page === "explore") return <Dashboard go={go} openProblem={openProblem} />;
//   return <Dashboard go={go} openProblem={openProblem} />;
// }



import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft, MapPin, Camera, Upload, Search, Bell, ChevronRight, ChevronDown,
  ThumbsUp, MessageSquare, FlaskConical, Building2, Landmark, Download,
  Plus, Radio, Award, CheckCircle2, Users, Tractor, Zap, GraduationCap,
  Droplet, Shield, ExternalLink, Lock, Mail, Phone, Languages, Navigation,
  ThumbsUp as VoiceIcon, Bookmark, Share2, Clock, TrendingUp, Target, Flag,
  LayoutGrid
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/*
  Requires: npm install leaflet
  OpenStreetMap tiles are free and require no API key — just attribution,
  which is included in the tile layer below.
*/

// Marker icon fix: Leaflet's default marker assets don't resolve under
// most bundlers (Vite/CRA), so we build a lightweight custom pin instead
// of relying on the shipped PNG icons.
const buildPin = (color = "#F5720B", label) =>
  L.divIcon({
    className: "ekalp-map-pin",
    html: `<div style="
      width:26px;height:26px;background:${color};display:flex;
      align-items:center;justify-content:center;color:#fff;font:700 11px monospace;
      border:2px solid #0B0B0C;box-shadow:0 1px 3px rgba(0,0,0,.35);
    ">${label ?? ""}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="#0B0B0C" />
    <rect x="6" y="6" width="10" height="10" fill="#F5720B" />
    <rect x="18" y="6" width="10" height="10" fill="#F5F4F0" fillOpacity="0.15" />
    <rect x="6" y="18" width="10" height="10" fill="#F5F4F0" fillOpacity="0.15" />
    <rect x="18" y="18" width="10" height="10" fill="#F5F4F0" />
    <rect x="24" y="24" width="10" height="10" fill="#F5720B" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* OpenStreetMap view (Leaflet)                                        */
/* ------------------------------------------------------------------ */

// Dummy Namkum / Ranchi coordinates standing in for real problem geolocation.
const DUMMY_MAP_POINTS = [
  { n: 1, id: "SL-108", label: "Namkum Basti", lat: 23.3479, lng: 85.3986 },
  { n: 2, id: "SL-142", label: "Rampur Mandi", lat: 23.3388, lng: 85.4102 },
  { n: 3, id: "SL-089", label: "Kalyanpur Cluster", lat: 23.3512, lng: 85.4041 },
  { n: 4, id: "SL-000", label: "Lowadih Road", lat: 23.3441, lng: 85.3927 },
];

const RANCHI_CENTER = { lat: 23.3441, lng: 85.4009 };

/**
 * MapView renders a real OpenStreetMap (via Leaflet) with no API key.
 * - markers: [{ lat, lng, label, id }] plotted as pins
 * - pinMode: renders a single draggable pin at `center`, calls onPick(latlng)
 *            on click/drag — used for the "pinpoint the location" flow
 */
const MapView = ({
  markers = [],
  center = RANCHI_CENTER,
  zoom = 13,
  pinMode = false,
  onPick,
  onMarkerClick,
  heightClass = "h-72",
}) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    // OpenStreetMap tile layer — free, no API key, attribution required.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    if (pinMode) {
      const pin = L.marker([center.lat, center.lng], {
        icon: buildPin("#F5720B"),
        draggable: true,
      }).addTo(map);
      pin.on("dragend", () => {
        const { lat, lng } = pin.getLatLng();
        onPick && onPick({ lat, lng });
      });
      map.on("click", (e) => {
        pin.setLatLng(e.latlng);
        onPick && onPick(e.latlng);
      });
      pinRef.current = pin;
    } else {
      markers.forEach((m) => {
        const marker = L.marker([m.lat, m.lng], { icon: buildPin("#F5720B", m.n) }).addTo(map);
        marker.bindPopup(
          `<div style="font:700 12px monospace;color:#0B0B0C;">${m.label}</div><div style="font:11px monospace;color:#F5720B;">${m.id}</div>`
        );
        if (onMarkerClick) marker.on("click", () => onMarkerClick(m));
      });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full ${heightClass} border border-neutral-200 z-0`}
    />
  );
};

const Sidebar = ({ active, go, brand = "e-KALP" }) => {
  const links = [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "explore", label: "Discover Projects", icon: Search },
    { key: "report", label: "Report Problem", icon: Plus },
    { key: "myreports", label: "My Reports", icon: Flag },
    { key: "profile", label: "Profile", icon: Users },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-neutral-200 h-screen sticky top-0 flex flex-col overflow-hidden">
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-neutral-200 shrink-0">
        <Logo size={34} />
        <div className="min-w-0">
          <p className="font-black text-[16px] leading-tight text-neutral-950 tracking-tight truncate">{brand}</p>
          <p className="text-[9px] font-mono font-semibold tracking-[0.15em] text-orange-600">CIVIC · INTELLIGENCE</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map((l) => (
          <button
            key={l.key}
            onClick={() => go(l.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-colors border-l-2 ${
              l.key === active
                ? "bg-orange-50 text-orange-700 border-orange-500"
                : "text-neutral-500 hover:bg-neutral-50 border-transparent"
            }`}
          >
            <l.icon size={16} />
            {l.label}
          </button>
        ))}
      </nav>

      {/* Location + CTA */}
      <div className="px-3 pb-4 space-y-2.5 shrink-0">
        <button className="w-full flex items-center gap-2 bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-100 transition-colors font-mono">
          <MapPin size={13} className="text-orange-600 shrink-0" />
          <span className="leading-tight text-left flex-1 truncate">
            Namkum, Ranchi (Jharkhand)
          </span>
          <span className="text-orange-600 font-semibold shrink-0">Change</span>
        </button>
        <button
          onClick={() => go("report")}
          className="w-full flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-bold px-4 py-2.5"
        >
          <Plus size={15} strokeWidth={2.5} /> Report a Problem
        </button>
      </div>

      {/* Profile footer */}
      <button
        onClick={() => go("profile")}
        className="flex items-center gap-3 px-5 py-4 border-t border-neutral-200 text-left hover:bg-neutral-50 transition-colors shrink-0"
      >
        <img
          src="https://i.pravatar.cc/64?img=13"
          className="w-9 h-9 object-cover shrink-0"
          alt="Amit Verma"
        />
        <span className="flex-1 leading-tight min-w-0">
          <span className="block text-[13px] font-semibold text-neutral-950 truncate">Amit Verma</span>
          <span className="block text-[10px] font-mono text-orange-600 font-medium tracking-wide">ACTIVE CITIZEN</span>
        </span>
        <span className="relative text-neutral-400 shrink-0">
          <Bell size={16} />
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center font-bold">
            3
          </span>
        </span>
      </button>
    </aside>
  );
};

const Footer = () => (
  <footer className="mt-16 bg-white border-t border-neutral-200">
    <div className="mx-auto max-w-[1290px] px-6 py-8">
      <p className="text-[10px] font-mono font-bold tracking-[0.15em] text-orange-600 mb-3">
        JHARKHAND CIVIC INNOVATION ALLIANCE
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-neutral-500">
          Co-developed under the aegis of State Societal R&amp;D Framework.
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-neutral-600 font-mono">
          <span className="flex items-center gap-1.5"><Landmark size={13}/> Govt of Jharkhand</span>
          <span className="flex items-center gap-1.5"><GraduationCap size={13}/> BIT Mesra</span>
          <span className="flex items-center gap-1.5"><FlaskConical size={13}/> IIT ISM Dhanbad</span>
          <span className="flex items-center gap-1.5"><Building2 size={13}/> Tata Steel Foundation</span>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-neutral-200 flex flex-wrap justify-between text-xs text-neutral-400 font-mono">
        <p>© 2025 e-KALP Jharkhand. Citizen-first Public Innovation Registry.</p>
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
          className={`h-1 flex-1 ${
            i < currentIndex
              ? "bg-neutral-950"
              : i === currentIndex
              ? `bg-${color}-500`
              : "bg-neutral-200"
          }`}
        />
      ))}
    </div>
    <div className="flex justify-between mt-1.5">
      {stages.map((s, i) => (
        <span
          key={s}
          className={`text-[9px] font-mono flex-1 text-center first:text-left last:text-right ${
            i === currentIndex ? `text-${color}-600 font-bold` : "text-neutral-400"
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
    difficultyColor: "text-red-600 bg-red-50",
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
    difficultyColor: "text-amber-700 bg-amber-50",
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
    severityColor: "bg-neutral-100 text-neutral-600",
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
    difficultyColor: "text-amber-700 bg-amber-50",
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
  <div className="min-h-screen bg-neutral-50 flex">
    <Sidebar active="report" go={go} brand="e-KALP" />
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-[1040px] mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => go("dashboard")} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 font-medium">
            <ArrowLeft size={16} /> Cancel Submission
          </button>
          <div className="w-32" />
        </div>
      </div>

      <div className="flex-1 max-w-[1040px] w-full mx-auto px-6 py-10">
        <p className="text-[10px] font-mono font-bold tracking-[0.15em] text-orange-600 mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-orange-500" /> NEW SUBMISSION
        </p>
        <h2 className="text-4xl font-black text-neutral-950 tracking-tight">Report a Challenge</h2>
        <p className="mt-2 text-neutral-500 max-w-xl">
          Provide details about the local issue to help authorities and innovators understand and
          address it effectively.
        </p>

        <section className="mt-8 bg-white border border-neutral-200 p-6">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
            <span className="w-7 h-7 bg-orange-500 text-white flex items-center justify-center">
              <MapPin size={15} />
            </span>
            <h3 className="text-xs font-mono font-bold tracking-[0.1em] text-orange-600">1. PINPOINT THE LOCATION</h3>
          </div>
          <div className="mt-5 overflow-hidden border border-neutral-200 relative">
            <div className="absolute top-4 left-4 right-4 z-[400] bg-white border border-neutral-200 flex items-center gap-2 px-4 py-3">
              <Search size={16} className="text-neutral-400" />
              <input
                className="flex-1 outline-none text-sm text-neutral-700"
                defaultValue="Main Road, Ranchi"
              />
              <Navigation size={16} className="text-orange-600" />
            </div>
            <MapView
              pinMode
              center={RANCHI_CENTER}
              zoom={14}
              heightClass="h-64"
              onPick={(latlng) => console.log("Pinned location:", latlng)}
            />
          </div>
          <p className="mt-2 text-[10px] font-mono text-neutral-400">
            Click the map or drag the pin to set the exact problem location.
          </p>
        </section>

        <section className="mt-6 bg-white border border-neutral-200 p-6">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
            <span className="w-7 h-7 bg-orange-500 text-white flex items-center justify-center">
              <MessageSquare size={15} />
            </span>
            <h3 className="text-xs font-mono font-bold tracking-[0.1em] text-orange-600">2. CHALLENGE DETAILS</h3>
          </div>

          <div className="mt-5 space-y-6">
            <div>
              <p className="font-semibold text-neutral-950 text-sm">What is the problem?</p>
              <p className="text-xs text-neutral-500 mt-0.5">Describe the issue clearly. Be specific about what is happening.</p>
              <textarea
                rows={3}
                placeholder="E.g., The public water dispenser at the main square has been broken for 3 weeks..."
                className="mt-2 w-full border border-neutral-200 px-4 py-3 text-sm text-neutral-600 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <p className="font-semibold text-neutral-950 text-sm">Who is affected?</p>
              <p className="text-xs text-neutral-500 mt-0.5">Identify the community, demographics, or groups impacted by this.</p>
              <textarea
                rows={2}
                placeholder="E.g., Daily commuters, local street vendors, and elderly residents..."
                className="mt-2 w-full border border-neutral-200 px-4 py-3 text-sm text-neutral-600 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <p className="font-semibold text-neutral-950 text-sm">Desired Outcome</p>
              <p className="text-xs text-neutral-500 mt-0.5">What does a successful resolution look like to you?</p>
              <textarea
                rows={3}
                placeholder="E.g., Repair the dispenser or replace it with a modern purification unit..."
                className="mt-2 w-full border border-neutral-200 px-4 py-3 text-sm text-neutral-600 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 bg-white border border-neutral-200 p-6">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-200">
            <span className="w-7 h-7 bg-orange-500 text-white flex items-center justify-center">
              <Camera size={15} />
            </span>
            <h3 className="text-xs font-mono font-bold tracking-[0.1em] text-orange-600">3. SUPPORTING MEDIA (OPTIONAL)</h3>
          </div>
          <div className="mt-5 border-2 border-dashed border-neutral-200 py-12 flex flex-col items-center gap-3">
            <span className="w-10 h-10 bg-sky-50 flex items-center justify-center">
              <Upload size={18} className="text-sky-600" />
            </span>
            <p className="text-sm font-semibold text-neutral-800">Click to upload or drag and drop</p>
            <p className="text-xs text-neutral-400">SVG, PNG, JPG or MP4 (max. 10MB)</p>
          </div>
        </section>

        <div className="mt-8 flex justify-end gap-3">
          <button className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100">
            Save as Draft
          </button>
          <button
            onClick={() => go("myreports")}
            className="px-5 py-2.5 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5"
          >
            Submit Challenge <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* 2. Dashboard                                                         */
/* ------------------------------------------------------------------ */

// const Dashboard = ({ go, openProblem }) => {
//   const [filter, setFilter] = useState("All");
const Dashboard = ({ go, openProblem }) => {
  const [filter, setFilter] = useState("All");
  const [liveProblems, setLiveProblems] = useState([]);
  const [liveLoading, setLiveLoading] = useState(true);
  const [liveError, setLiveError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/problems")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLiveProblems(data.items || []);
        setLiveLoading(false);
      })
      .catch((err) => {
        setLiveError(err.message);
        setLiveLoading(false);
      });
  }, []);
  const cats = [
    { label: "All", count: 34 },
    { label: "Water", count: 8, icon: Droplet },
    { label: "Agriculture", count: 7, icon: Tractor },
    { label: "Healthcare", count: 5, icon: Shield },
    { label: "Infrastructure", count: 6, icon: Zap },
    { label: "Education", count: 8, icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar active="dashboard" go={go} brand="e-KALP" />

      <div className="flex-1 min-w-0">
        <div className="max-w-[1290px] mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.15em] text-orange-600 mb-3">
            <span className="w-1.5 h-1.5 bg-orange-500" /> NAMKUM CIVIC INNOVATION HUB · RANCHI CENTRAL
            <span className="text-neutral-400 ml-1">ID: JH-RAN-NK-014</span>
          </div>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-black text-neutral-950 tracking-tight">
                Welcome back, <span className="text-orange-500">Amit Verma</span>
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500 flex items-center gap-1.5">
                <Shield size={14} className="text-orange-500" /> Citizen Contributor · Ward 14, Namkum, Ranchi District · Impact Level: Regional Pioneer (Tier 3)
              </p>
            </div>
            <button onClick={() => go("report")} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-3">
              <Plus size={16}/> Report a Societal Problem
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            <div>
              {/* Map card */}
              <div className="bg-white border border-neutral-200 p-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="font-bold text-neutral-950 flex items-center gap-2"><MapPin size={16} className="text-orange-500"/> Namkum & Ranchi Micro-Geography Hotspots</p>
                    <p className="text-xs text-neutral-400 mt-0.5 font-mono">Verified physical problem telemetry across ward boundaries</p>
                  </div>
                  <div className="flex gap-2 text-xs font-mono font-medium">
                    <span className="px-3 py-1.5 bg-neutral-50 text-neutral-500 border border-neutral-200">All Wards</span>
                    <span className="px-3 py-1.5 bg-orange-500 text-white">Namkum Only</span>
                    <span className="px-3 py-1.5 bg-neutral-50 text-neutral-500 border border-neutral-200">Radius 5km</span>
                  </div>
                </div>
                <div className="mt-4 relative">
                  <MapView markers={DUMMY_MAP_POINTS} center={RANCHI_CENTER} zoom={13} heightClass="h-72" />
                  <span className="absolute bottom-2 left-2 bg-white/95 border border-neutral-200 text-[9px] font-mono text-neutral-500 px-2 py-1 z-[400]">
                    OPENSTREETMAP · DUMMY HOTSPOT DATA
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <button
                      key={c.label}
                      onClick={() => setFilter(c.label)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 ${
                        filter === c.label ? "bg-neutral-950 text-white" : "bg-white border border-neutral-200 text-neutral-600"
                      }`}
                    >
                      {c.icon && <c.icon size={13} />} {c.label} ({c.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem cards */}
                            {/* Problem cards */}
              <div className="mt-6 space-y-5">
                {PROBLEMS.map((p) => (
                  <div key={p.id} className="bg-white border border-neutral-200 p-6 hover:border-orange-300 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold px-2 py-1 ${p.tagColor}`}>{p.tag}</span>
                        <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono"><MapPin size={11}/> {p.location}</span>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 ${p.severityColor}`}>
                        <span className="w-1.5 h-1.5 bg-current" /> {p.severity}
                      </span>
                    </div>
                    <button onClick={() => openProblem(p.id)} className="text-left mt-3 text-lg font-bold text-neutral-950 leading-snug hover:text-orange-600">
                      {p.title}
                    </button>
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 mb-1.5 tracking-wide">
                        <span>SOLUTION PROGRESS TRACKER</span>
                        <span className="text-orange-600">{p.stageLabel}</span>
                      </div>
                      <Progress stages={p.stages} currentIndex={p.stageIndex} />
                    </div>
                    <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex gap-6 text-sm">
                        <span className="flex items-center gap-1.5 text-neutral-600"><Users size={15} className="text-neutral-400"/> <b>{p.metricValue}</b> {p.metricLabel}</span>
                        <span className="flex items-center gap-1.5 text-neutral-600"><GraduationCap size={15} className="text-neutral-400"/> <b>{p.uniValue}</b> {p.uniLabel}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs font-semibold px-3 py-2 bg-neutral-50 text-neutral-600 flex items-center gap-1.5 border border-neutral-200">
                          <ThumbsUp size={13} /> Add My Voice
                        </button>
                        <button onClick={() => openProblem(p.id)} className="text-xs font-bold px-3 py-2 bg-orange-500 text-white flex items-center gap-1.5">
                          View Solution &amp; Progress <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live problems from backend */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  {/* <p className="text-xs font-mono font-bold text-neutral-500 tracking-[0.1em]">
                    LIVE REPORTS · FROM BACKEND
                  </p> */}
                  {liveLoading && (
                    <span className="text-[10px] font-mono text-neutral-400">Loading…</span>
                  )}
                </div>

                {liveError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-mono px-4 py-3">
                    Failed to load live reports: {liveError}
                  </div>
                )}

                <div className="space-y-5">
                  {liveProblems.map((lp) => (
                    <div key={lp.id} className="bg-white border border-neutral-200 p-6 hover:border-orange-300 transition-colors">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold px-2 py-1 bg-sky-50 text-sky-700">
                            {lp.categories && lp.categories.length > 0 ? lp.categories.join(", ").toUpperCase() : "UNCATEGORIZED"}
                          </span>
                          <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
                            <MapPin size={11}/> {lp.location || "Unknown location"}
                          </span>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5 bg-neutral-100 text-neutral-600">
                          <span className="w-1.5 h-1.5 bg-current" /> {lp.status?.replace(/_/g, " ") || "PENDING"}
                        </span>
                      </div>
                      <p className="text-left mt-3 text-lg font-bold text-neutral-950 leading-snug">
                        {lp.title}
                      </p>
                      <p className="mt-2 text-sm text-neutral-500">{lp.pd}</p>
                      <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                        <span className="text-xs font-mono text-neutral-400">
                          Token #{lp.token_number} · Reported {new Date(lp.date_reported).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  {!liveLoading && !liveError && liveProblems.length === 0 && (
                    <p className="text-sm text-neutral-400">No live reports yet.</p>
                  )}
                </div>
              </div>            
            </div>

            {/* Sidebar widgets */}
            <div className="space-y-6">
              <div className="bg-white border border-neutral-200 p-5">
                <p className="font-bold text-neutral-950 flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 bg-orange-500" /> Real-time Civic Pulse
                  <span className="ml-auto text-[9px] font-mono text-neutral-400 font-semibold tracking-wide">LIVE FEED</span>
                </p>
                <div className="mt-4 space-y-4">
                  {[
                    { icon: Radio, color: "text-sky-600 bg-sky-50", text: "BIT Mesra team deployed automated water filtration telemetry sensor at Namkum Ward 4.", time: "2 hours ago · Field Milestone" },
                    { icon: FlaskConical, color: "text-violet-600 bg-violet-50", text: "IIT ISM Dhanbad published open prototype test results for Solar Soil Moisture Array.", time: "Yesterday · Research Repo" },
                    { icon: Shield, color: "text-emerald-600 bg-emerald-50", text: "Jharkhand Health Dept approved pilot scale for Lowadih Sub-Centre e-dispensary.", time: "2 days ago · State Endorsement" },
                    { icon: Users, color: "text-orange-600 bg-orange-50", text: "84 Citizens added community validation to the Rampur Tomato Cold Chain proposal.", time: "3 days ago · Civic Momentum" },
                  ].map((f, i) => (
                    <div key={i} className="flex gap-3">
                      <span className={`w-7 h-7 flex items-center justify-center shrink-0 ${f.color}`}>
                        <f.icon size={13} />
                      </span>
                      <div>
                        <p className="text-xs text-neutral-700 leading-snug"><b className="font-semibold">{f.text.split(" ").slice(0,3).join(" ")}</b> {f.text.split(" ").slice(3).join(" ")}</p>
                        <p className="text-[10px] text-neutral-400 mt-1 font-mono">{f.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-xs font-bold text-orange-600 flex items-center gap-1">
                  Explore All State-wide Milestones <ChevronRight size={12} />
                </button>
              </div>

              <div className="bg-white border border-neutral-200 p-5">
                <p className="font-bold text-neutral-950 text-sm">Participating Hub Institutions</p>
                <p className="text-xs text-neutral-400 mt-1">Accredited R&amp;D bodies solving Ranchi regional civic briefs</p>
                <div className="mt-4 space-y-2">
                  {[
                    { i: "BIT", n: "BIT Mesra, Ranchi", d: "14 Active Engineering Pilots" },
                    { i: "NIT", n: "NIT Jamshedpur", d: "9 Rural Renewable Grants" },
                    { i: "ISM", n: "IIT (ISM) Dhanbad", d: "7 Hydro & Geological Studies" },
                    { i: "ICR", n: "ICAR-IINRG Namkum", d: "Horticulture Cluster Lead" },
                  ].map((h) => (
                    <div key={h.i} className="flex items-center gap-3 bg-neutral-50 border border-neutral-100 px-3 py-2.5">
                      <span className="text-[10px] font-mono font-bold text-neutral-500 w-7">{h.i}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-neutral-800">{h.n}</p>
                        <p className="text-[10px] text-neutral-400">{h.d}</p>
                      </div>
                      <span className="w-1.5 h-1.5 bg-orange-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
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
    <div className="min-h-screen bg-neutral-50 flex">
      <Sidebar active="myreports" go={go} brand="e-KALP" />
      <div className="flex-1 min-w-0">
        <div className="max-w-[1290px] mx-auto px-6 py-8">
          <div className="bg-white border border-neutral-200 p-6 flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-mono font-bold text-orange-600 tracking-[0.1em]">CITIZEN REGISTRY · UID-JH-NAM-8421 · LIVE SYNC WITH RANCHI CIVIC CELL</p>
              <h1 className="text-2xl font-black text-neutral-950 mt-1 tracking-tight">My Civic Innovation Hub & Tracked Problems</h1>
              <p className="text-sm text-neutral-500 mt-1 max-w-xl">
                Monitor verified progress, university field pilots, and municipal milestones for issues you reported or supported in the Namkum & Greater Ranchi corridor.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="text-xs font-semibold px-4 py-2.5 bg-white border border-neutral-200 text-neutral-600 flex items-center gap-1.5">
                <Download size={13} /> Civic Impact Certificate
              </button>
              <button onClick={() => go("report")} className="text-xs font-bold px-4 py-2.5 bg-orange-500 text-white flex items-center gap-1.5">
                <Plus size={13} /> Report New Issue
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-neutral-200 p-5">
              <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">REPORTED BY YOU</p>
              <p className="text-3xl font-black text-neutral-950 mt-2">2 <span className="text-sm font-semibold text-orange-600">Active Cases</span></p>
              <p className="text-xs text-neutral-400 mt-1">· 1 in Prototype · 1 in Lab Validation</p>
              <div className="h-1 bg-neutral-100 mt-3"><div className="h-1 w-1/2 bg-orange-500" /></div>
            </div>
            <div className="bg-white border border-neutral-200 p-5">
              <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">VOICES & SUPPORTED</p>
              <p className="text-3xl font-black text-neutral-950 mt-2">6 <span className="text-sm font-semibold text-neutral-500">Initiatives</span></p>
              <p className="text-xs text-neutral-400 mt-1">Active civic momentum across Ranchi district wards</p>
              <div className="flex gap-1 mt-3">
                {["R","N","B"].map(x => <span key={x} className="w-6 h-6 bg-neutral-100 text-[10px] font-bold text-neutral-500 flex items-center justify-center">{x}</span>)}
                <span className="text-[10px] text-neutral-400 self-center ml-1 font-mono">+3 Wards</span>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 p-5">
              <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">UNIVERSITIES ENGAGED</p>
              <p className="text-3xl font-black text-neutral-950 mt-2">4 <span className="text-sm font-semibold text-neutral-500">Lead Labs</span></p>
              <p className="text-xs text-neutral-400 mt-1">BIT Mesra, NIT Jsr, RU, BAU Kanke</p>
              <p className="text-[10px] text-neutral-400 mt-3 font-mono">9 Research Scholars Active</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`text-xs font-semibold px-4 py-2.5 ${tab === t ? "bg-orange-500 text-white" : "bg-white border border-neutral-200 text-neutral-600"}`}>
                {t}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 bg-white border border-neutral-200 px-3 py-2">
              <Search size={13} className="text-neutral-400" />
              <input placeholder="Search track ID or keywords..." className="text-xs outline-none w-48 text-neutral-600 font-mono" />
            </div>
          </div>

          <div className="mt-5 space-y-5">
            {PROBLEMS.map((p) => (
              <div key={p.id} className="bg-white border border-neutral-200 p-6">
                <div className="flex justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                    <span className="font-bold text-orange-600">{p.trackId}</span>
                    <span className={`font-bold px-2 py-1 ${p.tagColor}`}>{p.tag}</span>
                    <span className="text-neutral-400">· Reported by You on Nov 12, 2024</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 bg-orange-50 text-orange-600 flex items-center gap-1.5 tracking-wide">
                    <span className="w-1.5 h-1.5 bg-orange-500" /> {p.stageLabel.toUpperCase()}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                  <div>
                    <button onClick={() => openProblem(p.id)} className="text-left text-xl font-bold text-neutral-950 hover:text-orange-600">{p.fullTitle}</button>
                    <p className="text-sm text-neutral-500 mt-2">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {p.universities.map((u) => (
                        <span key={u.name} className="text-xs px-2.5 py-1 bg-neutral-50 border border-neutral-200 text-neutral-600 flex items-center gap-1.5"><GraduationCap size={12}/> {u.name}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 mb-1.5 tracking-wide">
                      <span>VALIDATION PROGRESS</span>
                      <span className="text-orange-600">{Math.round(((p.stageIndex+1)/6)*100)}% COMPLETE</span>
                    </div>
                    <Progress stages={["Log","Review","Lab","Prototype","Pilot","Deploy"]} currentIndex={p.stageIndex} />
                    <div className="mt-3 bg-neutral-50 border border-neutral-100 p-3">
                      <p className="text-[9px] font-mono font-bold text-orange-600 tracking-wide">LATEST UPDATE · {p.updates[0].date}</p>
                      <p className="text-xs text-neutral-600 mt-1">{p.updates[0].text}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between flex-wrap gap-3">
                  <div className="flex gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes} Upvotes</span>
                    <span className="flex items-center gap-1"><MessageSquare size={13}/> {p.notes} Community Notes</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs font-semibold px-3 py-1.5 bg-neutral-50 text-neutral-600 border border-neutral-200">Share Dossier</button>
                    <button onClick={() => openProblem(p.id)} className="text-xs font-bold px-3 py-1.5 bg-orange-500 text-white">View Workspace ›</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Profile                                                           */
/* ------------------------------------------------------------------ */

const Profile = ({ go }) => (
  <div className="min-h-screen bg-neutral-50 flex">
    <Sidebar active="profile" go={go} brand="e-KALP" />
    <div className="flex-1 min-w-0">
      <div className="max-w-[1290px] mx-auto px-6 py-8">
        <p className="text-xs text-neutral-400 flex items-center gap-1 font-mono">Dashboard <ChevronRight size={12}/> Citizen Profile
          <span className="ml-auto flex items-center gap-4 text-[10px] font-mono font-semibold">
            <span className="text-orange-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-orange-500"/> PORTAL STATUS: ACTIVE CITIZEN</span>
            <span className="text-neutral-400">UID: JHK-834010-04419</span>
          </span>
        </p>

        <div className="mt-4 bg-white border border-neutral-200 p-6 flex flex-wrap items-center gap-6 justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img src="https://i.pravatar.cc/120?img=13" className="w-20 h-20 object-cover" alt="" />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 border-2 border-white flex items-center justify-center">
                <Shield size={11} className="text-white" />
              </span>
            </div>
            <div>
              <p className="text-xl font-black text-neutral-950 flex items-center gap-2 tracking-tight">
                Amit Verma
                <span className="text-[10px] font-mono font-semibold px-2 py-1 bg-sky-50 text-sky-700 flex items-center gap-1">
                  <CheckCircle2 size={11}/> AADHAAR / WARD 14 VERIFIED
                </span>
              </p>
              <p className="text-sm text-neutral-500 mt-1">Community Citizen Contributor & Neighborhood Volunteer</p>
              <p className="text-xs text-neutral-400 mt-1.5 flex items-center gap-3 font-mono">
                <span>Member since August 2024</span> ·
                <span>Namkum, Ranchi (Jharkhand)</span> ·
                <span>ID: VERMA-RNC-14</span>
              </p>
            </div>
          </div>
          <div className="bg-orange-50 px-5 py-4 flex items-center gap-3">
            <Award size={22} className="text-orange-600" />
            <div>
              <p className="text-2xl font-black text-neutral-950">840 <span className="text-sm text-orange-600 font-mono font-semibold">CIVIC POINTS</span></p>
              <p className="text-xs text-neutral-400">Top 5% Contributor in Ranchi East</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          <div className="space-y-6 max-w-[640px]">
            <div className="bg-white border border-neutral-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-neutral-950 flex items-center gap-2"><Users size={15} className="text-neutral-400"/> Personal Information</p>
                  <p className="text-xs text-neutral-400 mt-1">Verified identity details recognized by municipal coordinators</p>
                </div>
                <Lock size={14} className="text-neutral-300 mt-1" />
              </div>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Full Legal Name</span><span className="text-neutral-400 font-mono text-[10px]">MATCHES GOVT ID</span></div>
                  <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Amit Verma <CheckCircle2 size={15} className="text-emerald-600"/></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Email Address</span><span className="text-emerald-600 font-mono text-[10px] font-semibold">VERIFIED</span></div>
                    <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700"><span className="truncate">amit.verma.ranchi@gmail.com</span><Mail size={14} className="text-neutral-400 shrink-0"/></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Phone Number</span><span className="text-neutral-400 font-mono text-[10px]">SMS ALERTS ON</span></div>
                    <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">+91 94311 XXXXX <Phone size={14} className="text-neutral-400"/></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-semibold text-neutral-600">Preferred Civic Language</span><span className="text-neutral-400 font-mono text-[10px]">USED IN ALERTS</span></div>
                  <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">English & हिन्दी (Bilingual) <Languages size={14} className="text-neutral-400"/></div>
                </div>
                <p className="text-xs text-neutral-400">Jharkhand State Multi-lingual Civic Inclusivity standard compliant.</p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-neutral-950 flex items-center gap-2"><Building2 size={15} className="text-neutral-400"/> Jharkhand Residential & Ward Details</p>
                  <p className="text-xs text-neutral-400 mt-1">Local civic jurisdiction determines your regional vote weight & pilot trials</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-1 bg-orange-50 text-orange-600">RMC ZONE 4</span>
              </div>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-neutral-600 mb-1">Address Line / Landmark</p>
                  <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Quarter 4B, Near Old Railway Colony Road</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-neutral-600 mb-1">Locality / Village</p>
                    <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Namkum Basti, Namkum</div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-600 mb-1">Gram Panchayat / Municipal Ward</p>
                    <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Ward 14, Namkum Block</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-neutral-600 mb-1">District</p>
                    <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Ranchi</div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-600 mb-1">State</p>
                    <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">Jharkhand</div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-600 mb-1">Pincode</p>
                    <div className="bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-sm text-neutral-700">834010</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-neutral-50 border border-neutral-100 px-3 py-2.5">
                  <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-mono"><Navigation size={13}/> 23.3421° N, 85.3852° E (Namkum Sub-division)</span>
                  <span className="text-xs font-bold text-orange-600">Re-pin on Map</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100">Cancel Changes</button>
              <button className="px-5 py-2.5 text-sm font-bold bg-orange-500 text-white">Save Profile Changes</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
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
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* top strip nav */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => go("dashboard")} className="w-8 h-8 hover:bg-neutral-100 flex items-center justify-center text-neutral-600">
              <ArrowLeft size={16} />
            </button>
            <span className="text-sm font-black text-neutral-950 flex items-center gap-1.5 tracking-tight">
              <Logo size={18} /> e-KALP
            </span>
            <span className="text-neutral-300">/</span>
            <button className="text-sm text-neutral-500 hover:text-neutral-800 font-mono">Problem List</button>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-500">
            <button
              disabled={idx <= 0}
              onClick={() => go("problem", PROBLEMS[idx - 1]?.id)}
              className="w-8 h-8 hover:bg-neutral-100 flex items-center justify-center disabled:opacity-30"
            >
              <ArrowLeft size={14} />
            </button>
            <span className="px-2">{idx + 1} / {PROBLEMS.length}</span>
            <button
              disabled={idx >= PROBLEMS.length - 1}
              onClick={() => go("problem", PROBLEMS[idx + 1]?.id)}
              className="w-8 h-8 hover:bg-neutral-100 flex items-center justify-center disabled:opacity-30 rotate-180"
            >
              <ArrowLeft size={14} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs font-semibold px-3 py-1.5 border border-neutral-200 text-neutral-600 flex items-center gap-1.5"><Share2 size={13}/> Share</button>
            <button className="text-xs font-bold px-3 py-1.5 bg-orange-500 text-white flex items-center gap-1.5"><ThumbsUp size={13}/> Add My Voice</button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left: problem statement */}
        <div className="border-r border-neutral-200 bg-white">
          <div className="flex items-center gap-5 px-6 pt-4 border-b border-neutral-200 text-sm font-semibold text-neutral-500">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`pb-3 border-b-2 ${tab === t.key ? "border-orange-500 text-neutral-950" : "border-transparent hover:text-neutral-700"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="px-6 py-6">
            {tab === "description" && (
              <>
                <p className="text-[10px] font-mono font-bold text-orange-600 tracking-[0.1em] mb-2">CASE {idx + 1} OF {PROBLEMS.length}</p>
                <h1 className="text-xl font-black text-neutral-950 tracking-tight">{p.fullTitle}</h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className={`text-xs font-mono font-semibold px-2.5 py-1 ${p.difficultyColor}`}>{p.difficulty}</span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1"><ThumbsUp size={13}/> {p.upvotes}</span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1"><MessageSquare size={13}/> {p.notes}</span>
                  <span className="text-xs text-neutral-400 flex items-center gap-1"><Bookmark size={13}/></span>
                </div>

                <p className="mt-5 text-[15px] leading-7 text-neutral-700">{p.desc}</p>

                <div className="mt-5 space-y-2">
                  <p className="text-sm font-semibold text-neutral-800">Constraints:</p>
                  <ul className="space-y-1.5">
                    {p.constraints.map((c, i) => (
                      <li key={i} className="text-sm text-neutral-600 flex gap-2">
                        <span className="mt-2 w-1 h-1 bg-orange-500 shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {p.examples.map((ex, i) => (
                  <div key={i} className="mt-5 bg-neutral-50 border border-neutral-200 p-4 font-mono text-xs">
                    <p className="font-sans font-semibold text-neutral-800 text-sm mb-2">Example {i + 1}:</p>
                    <p><span className="text-neutral-400">Input:</span> {ex.input}</p>
                    <p className="mt-1"><span className="text-neutral-400">Output:</span> {ex.output}</p>
                    <p className="mt-1 font-sans text-neutral-500"><span className="text-neutral-400 font-mono">Explanation:</span> {ex.explanation}</p>
                  </div>
                ))}

                <div className="mt-6">
                  <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-500 mb-1.5 tracking-wide">
                    <span>SOLUTION PROGRESS</span>
                    <span className="text-orange-600">{p.stageLabel}</span>
                  </div>
                  <Progress stages={p.stages} currentIndex={p.stageIndex} />
                </div>

                <div className="mt-6 flex gap-2 flex-wrap">
                  <span className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 font-mono">{p.location}</span>
                  <span className="text-xs px-2.5 py-1 bg-neutral-100 text-neutral-600 font-mono">Track ID {p.trackId}</span>
                </div>
              </>
            )}

            {tab === "partners" && (
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-bold text-neutral-800 flex items-center gap-2 mb-3"><GraduationCap size={16} className="text-sky-600"/> Universities Participating</p>
                  <div className="space-y-3">
                    {p.universities.map((u) => (
                      <div key={u.name} className="border border-neutral-200 p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-neutral-950 text-sm">{u.name}</p>
                            <p className="text-xs text-neutral-500 mt-0.5">{u.dept}</p>
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2 py-1 bg-sky-50 text-sky-700">{u.role}</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-2">{u.scholars} research scholars actively contributing</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800 flex items-center gap-2 mb-3"><Building2 size={16} className="text-emerald-600"/> Funding & Industry Partners</p>
                  <div className="space-y-3">
                    {p.funders.map((f) => (
                      <div key={f.name} className="border border-neutral-200 p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-neutral-950 text-sm">{f.name}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{f.type}</p>
                        </div>
                        <span className="text-sm font-bold text-emerald-700">{f.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "solution" && (
              <div className="space-y-4">
                {p.updates.map((u, i) => (
                  <div key={i} className="border-l-2 border-orange-400 pl-4 pb-4 relative">
                    <span className="absolute -left-[5px] top-0 w-2 h-2 bg-orange-500" />
                    <p className="text-xs font-mono font-bold text-orange-600 flex items-center gap-1"><Clock size={11}/> {u.date}</p>
                    <p className="text-sm text-neutral-700 mt-1">{u.text}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === "discussion" && (
              <div className="text-sm text-neutral-400 flex flex-col items-center py-16 gap-2">
                <MessageSquare size={28} className="text-neutral-200" />
                {p.notes} community notes — sign in to view and add your comment.
              </div>
            )}
          </div>
        </div>

        {/* Right: stats / workbench-style panel */}
        <div className="bg-neutral-50 px-6 py-6">
          <div className="bg-white border border-neutral-200 p-5">
            <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em]">CASE SUMMARY</p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-black text-neutral-950">{p.metricValue}</p>
                <p className="text-xs text-neutral-500">{p.metricLabel}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-neutral-950">{p.uniValue}</p>
                <p className="text-xs text-neutral-500">{p.uniLabel}</p>
              </div>
              <div>
                <p className="text-2xl font-black text-neutral-950">{p.upvotes}</p>
                <p className="text-xs text-neutral-500">Community Upvotes</p>
              </div>
              <div>
                <p className="text-2xl font-black text-neutral-950">{p.samples}</p>
                <p className="text-xs text-neutral-500">Lab Samples Logged</p>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-white border border-neutral-200 p-5">
            <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em] flex items-center gap-1.5"><Target size={12}/> RESOLUTION STAGES</p>
            <div className="mt-4 space-y-3">
              {p.stages.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    i < p.stageIndex ? "bg-neutral-950 text-white" : i === p.stageIndex ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-400"
                  }`}>
                    {i < p.stageIndex ? <CheckCircle2 size={13} /> : i + 1}
                  </span>
                  <span className={`text-sm ${i === p.stageIndex ? "font-semibold text-neutral-950" : "text-neutral-500"}`}>{s}</span>
                  {i === p.stageIndex && <span className="ml-auto text-[9px] font-mono font-bold text-orange-600 tracking-wide">IN PROGRESS</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 bg-white border border-neutral-200 p-5">
            <p className="text-[10px] font-mono font-bold text-neutral-400 tracking-[0.1em] flex items-center gap-1.5"><TrendingUp size={12}/> IMPACT METER</p>
            <div className="mt-3 h-1.5 bg-neutral-100 overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: `${((p.stageIndex + 1) / 6) * 100}%` }} />
            </div>
            <p className="text-xs text-neutral-500 mt-2">{Math.round(((p.stageIndex + 1) / 6) * 100)}% of resolution roadmap complete</p>
          </div>

          <button onClick={() => go("myreports")} className="mt-5 w-full text-sm font-bold px-4 py-3 bg-neutral-950 text-white flex items-center justify-center gap-2">
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