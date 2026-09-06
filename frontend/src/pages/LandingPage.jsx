import React from "react";
import bgImage from "../../src/assets/bg.png";
import CTA_IMG from "../../src/assets/cta1.png";
import logo from "../assets/logo.png";

function NavLink({ children }) {
  return (
    <a
      href="#"
      className="text-[11px] tracking-[0.15em] text-white/80 hover:text-white transition-colors font-mono"
    >
      {children}
    </a>
  );
}

function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-6">
      <div className="flex items-center gap-3">
        <span className="w-4 h-4 border border-orange-500 flex items-center justify-center">
          <span className="w-10 h-10 bg-orange-500 block" />
          <img src={logo} alt="e-KALP Logo" className="w-full h-full object-contain" />
        </span>
        <span className="text-white font-black text-xl tracking-wide">e-KALP</span>
        <span className="hidden sm:inline text-[10px] tracking-[0.2em] text-white/50 font-mono border-l border-white/20 pl-3 ml-1">
          CIVIC · INTELLIGENCE
        </span>
      </div>

      {/* <nav className="hidden md:flex items-center gap-10">
        <NavLink>ABOUT</NavLink>
        <span className="flex items-center gap-1.5">
          <NavLink>THE NETWORK</NavLink>
          <span className="w-1 h-1 rounded-full bg-orange-500 inline-block" />
        </span>
        <NavLink>HOW IT WORKS</NavLink>
        <NavLink>IMPACT</NavLink>
      </nav> */}

      <div className="flex items-center gap-6">
        <span className="text-[11px] tracking-[0.15em] text-white/80 font-mono hidden sm:inline">
          LOGIN
        </span>
        <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-[11px] tracking-[0.15em] font-mono px-4 py-2.5 flex items-center gap-2">
          GET STARTED <span>→</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
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
          A collaborative platform connecting citizens, institutions, industry, and
          government to turn everyday civic problems into measurable, permanent
          action.
        </p>

        <div className="mt-9 flex items-center gap-8 flex-wrap">
          <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-[11px] tracking-[0.15em] font-mono px-6 py-4 flex items-center gap-2">
            REPORT A PROBLEM <span>→</span>
          </button>
          <button className="text-white text-[11px] tracking-[0.15em] font-mono flex items-center gap-2 border-b border-white/40 pb-1 hover:border-white transition-colors">
            EXPLORE PROBLEMS <span>→</span>
          </button>
        </div>

        <div className="mt-24 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] tracking-[0.15em] font-mono text-white/40">
          <span>
            COOPERATIVE MODEL: QUADRUPLE HELIX &nbsp;/&nbsp; SCALE: METROPOLITAN &amp; REGIONAL
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

function FigureStrip() {
  return (
    <div className="bg-white px-10 py-5 flex items-center justify-between text-[10px] tracking-[0.15em] font-mono text-neutral-400 border-b border-neutral-100">
      <span>FIG. 02.1 — CIVIC RELATIONAL TOPOLOGY</span>
      <span>QUAD-SECTOR CONVERGENCE</span>
    </div>
  );
}

function Quadrant({ node, title, subtitle, align = "left" }) {
  const isRight = align === "right";
  return (
    <div className={`p-8 ${isRight ? "text-right" : "text-left"}`}>
      <div className={`flex items-center gap-2 mb-3 ${isRight ? "justify-end" : ""}`}>
        {!isRight && <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />}
        <span className="text-[10px] tracking-[0.15em] font-mono text-neutral-400">
          {node}
        </span>
        {isRight && <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />}
      </div>
      <h4 className="text-xl font-black text-neutral-900 mb-1">{title}</h4>
      <p className="text-[10px] tracking-[0.15em] font-mono text-neutral-400">
        {subtitle}
      </p>
    </div>
  );
}

function NetworkSection() {
  return (
    <section className="bg-white px-10 py-24">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
            <span className="text-[10px] tracking-[0.2em] font-mono text-orange-500">
              THE NETWORK
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-neutral-900 leading-[0.98] tracking-tight mb-10">
            ONE PROBLEM. FOUR PERSPECTIVES.
          </h2>

          <div className="border-l-2 border-orange-500 pl-5 mb-6">
            <p className="text-xl font-medium text-neutral-800 leading-snug">
              Different perspectives. Shared problems. Better outcomes.
            </p>
          </div>

          <p className="text-neutral-500 leading-relaxed max-w-md mb-10">
            Siloed civic challenges fail when tackled in isolation. PORTAL unifies
            on-the-ground human observations with scientific rigor, private
            engineering capital, and statutory policy enforcement.
          </p>

          <div className="border-t border-neutral-200 pt-6 flex gap-16">
            <div>
              <p className="text-[10px] tracking-[0.15em] font-mono text-neutral-400 mb-1">
                CONVERGENCE SPEED
              </p>
              <p className="text-sm font-bold text-neutral-900">
                REAL-TIME INGESTION
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] font-mono text-neutral-400 mb-1">
                RESOLUTION RATIO
              </p>
              <p className="text-sm font-bold text-neutral-900">84.2% ACTION RATE</p>
            </div>
          </div>
        </div>

        <div className="relative bg-neutral-50 border border-neutral-200">
          <div className="grid grid-cols-2 grid-rows-2 divide-x divide-y divide-neutral-200">
            <Quadrant node="NODE A-01" title="CITIZENS" subtitle="GROUND REALITY · LIVED EXPERIENCE" />
            <Quadrant node="NODE B-02" title="UNIVERSITIES" subtitle="RESEARCH · EMPIRICAL ANALYSIS" align="right" />
            <Quadrant node="NODE C-03" title="INDUSTRY" subtitle="ENGINEERING · SCALING CAPITAL" />
            <Quadrant node="NODE D-04" title="GOVERNMENT" subtitle="STATUTORY POLICY · CIVIC DEPLOYMENT" align="right" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white border border-neutral-300 px-8 py-7 text-center shadow-sm pointer-events-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
                <span className="text-[9px] tracking-[0.15em] font-mono text-orange-500">
                  CORE CATALYST
                </span>
              </div>
              <p className="font-black text-neutral-900 leading-tight text-base">
                REAL-WORLD
                <br />
                PROBLEM
              </p>
              <div className="w-8 h-px bg-neutral-300 mx-auto my-3" />
              <p className="text-[9px] tracking-[0.15em] font-mono text-neutral-400">
                LATENT · VERIFIED · MAPPED
              </p>
            </div>
          </div>

          <span className="absolute top-2 left-2 text-[9px] tracking-[0.15em] font-mono text-neutral-300">
            N.01-SECTOR
          </span>
          <span className="absolute bottom-2 right-2 text-[9px] tracking-[0.15em] font-mono text-neutral-300">
            SYNAPSE 2025
          </span>
        </div>
      </div>
    </section>
  );
}

function Step({ num, tag, title, desc, meta }) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className="flex items-center justify-between text-[10px] tracking-[0.15em] font-mono mb-6">
        <span className="text-orange-500">{num}</span>
        <span className="text-white/30 flex items-center gap-1.5">
          {tag.dot && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />}
          {tag.label}
        </span>
      </div>
      <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-8">{desc}</p>
      <div className="flex items-center justify-between text-[9px] tracking-[0.15em] font-mono text-white/30 border-t border-white/10 pt-4">
        <span>{meta}</span>
        {num === "04" && <span className="text-emerald-400">✓</span>}
      </div>
    </div>
  );
}

function Methodology() {
  return (
    <section className="bg-neutral-900 px-10 py-24">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1.5 h-1.5 bg-orange-500 inline-block" />
        <span className="text-[10px] tracking-[0.2em] font-mono text-orange-500">
          METHODOLOGY
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
        <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.98] tracking-tight">
          FROM PROBLEM TO PROGRESS.
        </h2>
        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
          Every report becomes structured insight. Every insight creates an
          opportunity for action.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <Step
          num="01"
          tag={{ label: "STAGE_INGEST" }}
          title="REPORT"
          desc="Citizens submit field observations with geolocation, media evidence, and real-time civic impact context."
          meta="INPUT: LOCALIZED"
        />
        <Step
          num="02"
          tag={{ label: "ACTIVE PIPELINE", dot: true }}
          title="AI ANALYZE"
          desc="Semantic parsing classifies cross-cutting dependencies, severity vectors, and empirical patterns."
          meta="SYNTHESIS: AUTOMATED"
        />
        <Step
          num="03"
          tag={{ label: "QUAD-DISPATCH" }}
          title="CONNECT"
          desc="Matched automatically to relevant university labs, industry problem-solvers, and municipal authorities."
          meta="ALIGNMENT: SECTORAL"
        />
        <Step
          num="04"
          tag={{ label: "EXECUTION" }}
          title="SOLVE"
          desc="Pilots deployed, infrastructure upgraded, and resolution verified transparently on public ledger."
          meta="OUTCOME: VERIFIED"
        />
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="relative bg-neutral-300 overflow-hidden">
      <div className="absolute inset-0">
        <img src={CTA_IMG} alt="" className="w-full h-full object-cover opacity-100" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 px-10 pt-5 pb-10">
        <span className="text-[10px] tracking-[0.15em] font-mono text-white/30">
          SYS.DISPATCH // CALL TO ACTION
        </span>

        <div className="text-left mt-10 mb-10">
          <div className="flex items-left  gap-2 mb-6">
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

          <button className="mt-10 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-[11px] tracking-[0.15em] font-mono px-7 py-4 inline-flex items-center gap-2">
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
        <span className="text-white font-black text-sm">PORTAL</span>
        <span className="hidden sm:inline text-[10px] tracking-[0.15em] font-mono text-white/40">
          CITIZENS × UNIVERSITIES × INDUSTRY × GOVERNMENT
        </span>
      </div>
      <div className="flex items-center gap-6 text-[10px] tracking-[0.15em] font-mono text-white/40">
        <span>ABOUT</span>
        <span>HOW IT WORKS</span>
        <span>IMPACT</span>
        <span>LOGIN</span>
        <span>© 2025 PORTAL INITIATIVE</span>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Hero />
      <FigureStrip />
      <NetworkSection />
      <Methodology />
      <CallToAction />
      <Footer />
    </div>
  );
}