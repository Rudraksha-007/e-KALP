import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../src/assets/bg.png";
import CTA_IMG from "../../src/assets/cta1.png";
import Logo from "../components/Logo";

const THEMATIC_DOMAINS = [
  "Education",
  "Healthcare",
  "Agriculture",
  "Water Management",
  "Sanitation",
  "Environment",
  "Rural Livelihoods",
  "Accessibility",
  "Urban Infrastructure",
  "Public Service Delivery",
];

const STEPS = [
  {
    num: "01",
    title: "REPORT",
    desc: "Citizens submit problems via web, mobile, voice assistant, or Telegram — with photos, videos, and precise location.",
    tag: "INGEST",
  },
  {
    num: "02",
    title: "AI ANALYZE",
    desc: "AI automatically categorizes across 10 thematic domains, prioritizes by impact, and deduplicates submissions.",
    tag: "PROCESS",
  },
  {
    num: "03",
    title: "ASSIGN",
    desc: "Validated problems are routed to universities based on academic expertise, research capabilities, and faculty specialization.",
    tag: "ROUTE",
  },
  {
    num: "04",
    title: "COLLABORATE",
    desc: "University teams evaluate challenges, form multidisciplinary groups, and partner with industry for mentoring and prototyping.",
    tag: "EXECUTE",
  },
  {
    num: "05",
    title: "DEPLOY",
    desc: "Track milestones, validate outcomes, and measure community impact through analytics dashboards.",
    tag: "IMPACT",
  },
];

function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-6">
      <div className="flex items-center gap-3">
        <Logo height={44} />
        <span className="hidden sm:inline text-[10px] tracking-[0.2em] text-white/50 font-mono border-l border-white/20 pl-3 ml-1">
          CIVIC · INTELLIGENCE
        </span>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/select-role")}
          className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-[11px] tracking-[0.15em] font-mono px-4 py-2.5 flex items-center gap-2"
        >
          GET STARTED <span>→</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt=""
          className="h-full w-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40" />
      </div>

      <Navbar />

      <div className="relative z-10 px-10 pt-32 pb-10">
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] font-mono text-white/40 mb-8">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
            BUILT FOR BETTER COMMUNITIES
          </span>
          <span className="hidden md:flex items-center gap-2">
            CIVIC / 04 ARCHIVE
            <span className="text-white/20">———</span>
            <span className="text-orange-500">NODE 08: LIVE</span>
          </span>
        </div>

        <h1 className="text-white font-black leading-[0.95] tracking-tight text-[2.6rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[5.7rem] max-w-5xl">
          TURNING REAL-WORLD PROBLEMS INTO MEANINGFUL CHANGE.
        </h1>

        <p className="mt-8 max-w-xl text-white/70 text-base leading-relaxed">
          A digital platform connecting citizens, universities, industry, and
          government to transform local challenges into innovation-driven
          solutions.
        </p>

        <div className="mt-9 flex items-center gap-8 flex-wrap">
          <button
            onClick={() => navigate("/auth/citizen/login")}
            className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-[11px] tracking-[0.15em] font-mono px-6 py-4 flex items-center gap-2"
          >
            REPORT A PROBLEM <span>→</span>
          </button>
          <button
            onClick={() => navigate("/problems")}
            className="text-white text-[11px] tracking-[0.15em] font-mono flex items-center gap-2 border-b border-white/40 pb-1 hover:border-white transition-colors"
          >
            EXPLORE PROBLEMS <span>→</span>
          </button>
        </div>

        <div className="mt-24 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] tracking-[0.15em] font-mono text-white/40">
          <span>
            COOPERATIVE MODEL: QUADRUPLE HELIX &nbsp;/&nbsp; SCALE: METROPOLITAN
            &amp; REGIONAL
          </span>
          <span className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            SYSTEM DISPATCH ONLINE
          </span>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="bg-white px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
          <span className="text-[10px] tracking-[0.2em] font-mono text-orange-500">
            THE CHALLENGE
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-[0.98] tracking-tight mb-8 max-w-3xl">
          THOUSANDS OF ISSUES. NO CENTRALIZED PATH TO RESOLUTION.
        </h2>

        <p className="text-neutral-500 leading-relaxed max-w-2xl mb-12">
          Every year, citizens across Jharkhand identify thousands of local
          issues that remain unresolved. There is no structured mechanism for
          systematic evaluation and innovation-driven resolution. Meanwhile,
          universities hold the research expertise, and industries hold the
          resources — but collaboration remains fragmented.
        </p>

        <div className="flex flex-wrap gap-2">
          {THEMATIC_DOMAINS.map((domain) => (
            <span
              key={domain}
              className="px-3 py-1.5 text-[10px] tracking-[0.1em] font-mono text-neutral-600 border border-neutral-200 bg-neutral-50"
            >
              {domain.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ num, title, desc, tag }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex items-center justify-between text-[10px] tracking-[0.15em] font-mono mb-4">
        <span className="text-orange-500">{num}</span>
        <span className="text-white/30">{tag}</span>
      </div>
      <h3 className="text-xl font-black text-white mb-3">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="bg-neutral-900 px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
          <span className="text-[10px] tracking-[0.2em] font-mono text-orange-500">
            HOW IT WORKS
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.98] tracking-tight">
            FROM PROBLEM TO PROGRESS.
          </h2>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            Five steps from community issue to deployed solution.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {STEPS.map((step) => (
            <Step key={step.num} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AIAccess() {
  return (
    <section className="bg-white px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
          <span className="text-[10px] tracking-[0.2em] font-mono text-orange-500">
            AI-POWERED ACCESS
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-neutral-900 leading-[0.98] tracking-tight">
            REPORT FROM ANYWHERE.
          </h2>
          <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
            Multiple channels. Multiple languages. One platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-neutral-200 p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
              <span className="text-[10px] tracking-[0.15em] font-mono text-orange-500">
                VOICE ASSISTANT
              </span>
            </div>
            <h3 className="text-2xl font-black text-neutral-900 mb-3">
              SPEAK YOUR PROBLEM.
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Our AI voice assistant registers you and your issue in seconds.
              Speak in any language — the assistant understands and processes
              your report automatically.
            </p>
          </div>

          <div className="border border-neutral-200 p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
              <span className="text-[10px] tracking-[0.15em] font-mono text-orange-500">
                TELEGRAM BOT
              </span>
            </div>
            <h3 className="text-2xl font-black text-neutral-900 mb-3">
              CHAT TO REGISTER.
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Chat with our bot on Telegram to report problems. Available in
              multiple languages, accessible from any device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-neutral-300 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={CTA_IMG}
          alt=""
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 px-10 pt-5 pb-10">
        <span className="text-[10px] tracking-[0.15em] font-mono text-white/30">
          SYS.DISPATCH // CALL TO ACTION
        </span>

        <div className="text-left mt-10 mb-10">
          <div className="flex items-left gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
            <span className="text-left text-[10px] tracking-[0.2em] font-mono text-orange-500">
              JOIN THE PLATFORM
            </span>
          </div>
          <h2 className="text-white font-black leading-[1.02] tracking-tight text-4xl sm:text-5xl md:text-6xl">
            YOUR COMMUNITY STARTS
            <br />
            WITH YOU.
          </h2>
          <p className="text-white/60 mt-6 text-base">
            See a problem. Report it. Be part of the solution.
          </p>

          <button
            onClick={() => navigate("/select-role")}
            className="mt-10 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-[11px] tracking-[0.15em] font-mono px-7 py-4 inline-flex items-center gap-2"
          >
            GET STARTED <span>→</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[9px] tracking-[0.15em] font-mono text-white/30 pt-4">
          <span>NO SUBSCRIPTIONS · OPEN ACCESS · CIVIC GOVERNANCE</span>
          <span className="hidden md:inline">PUBLIC INFRASTRUCTURE COMMONS</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black px-10 py-6 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-6">
        <Logo height={30} />
        <span className="hidden sm:inline text-[10px] tracking-[0.15em] font-mono text-white/40">
          CITIZENS × UNIVERSITIES × INDUSTRY × GOVERNMENT
        </span>
      </div>
      <div className="flex items-center gap-6 text-[10px] tracking-[0.15em] font-mono text-white/40">
        <span>ABOUT</span>
        <span>HOW IT WORKS</span>
        <span>IMPACT</span>
        <span>© 2025 e-KALP INITIATIVE</span>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <AIAccess />
      <CallToAction />
      <Footer />
    </div>
  );
}
