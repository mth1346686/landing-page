"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dumbbell,
  Flame,
  Trophy,
  ShieldCheck,
  MapPin,
  Phone,
  Check,
  ChevronRight,
  X,
  Loader2,
  Sparkles,
  Clock,
  Zap,
  ArrowRight,
  Menu,
  Activity,
  Award,
  QrCode,
  Lock,
  MessageSquare
} from "lucide-react";

// -------------------------------------------------------------
// CORE DATA STRUCTURES
// -------------------------------------------------------------
interface Program {
  id: string;
  title: string;
  category: string;
  badge: string;
  duration: string;
  intensity: string;
  description: string;
  target: string;
  image: string;
}

const PROGRAMS: Program[] = [
  {
    id: "prog-1",
    title: "IRON HYPERTROPHY PROTOCOL",
    category: "Hypertrophy",
    badge: "High Volume",
    duration: "60-75 Min",
    intensity: "Max Overload (RPE 9)",
    description: "High-volume eccentric overloading targeting pure muscle fiber recruitment. Built around heavy multi-joint barbells and custom calibrated isolation cables.",
    target: "Chest, Delts & Back Thickness",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-2",
    title: "APEX POWERLIFTING SQUAD",
    category: "Powerlifting",
    badge: "Sub-Max Strength",
    duration: "90 Min",
    intensity: "1-3 Rep Max Effort",
    description: "Chalk-heavy platform lifting on competition Eleiko benches and calibrated Texas power bars. Structured periodization for Squat, Bench, and Deadlift PRs.",
    target: "Posterior Chain, Grip & Absolute Force",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-3",
    title: "METABOLIC CONDITIONING RUSH",
    category: "Conditioning",
    badge: "Fat Shred",
    duration: "45 Min",
    intensity: "Zone 4-5 Anaerobic",
    description: "Brutal full-body conditioning featuring heavy sled pushes, battle ropes, assault bikes, and kettlebell clean-and-press complexes.",
    target: "Cardiovascular Stamina & Body Fat Cut",
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prog-4",
    title: "GLADIATOR COMBAT STRENGTH",
    category: "Combat Strength",
    badge: "Striking Power",
    duration: "60 Min",
    intensity: "Explosive Torque",
    description: "Rotational core development, neck bridging, sandbag carries, and explosive hip thrusts engineered for combat sports athletes and heavy hitters.",
    target: "Rotational Kinetic Chain & Neck Stability",
    image: "https://images.unsplash.com/photo-1545015477-a190725df01b?auto=format&fit=crop&w=800&q=80"
  }
];

const HUBS = [
  {
    name: "New Cairo Flagship",
    badge: "FLAGSHIP COMPOUND",
    address: "North 90th Street, 5th Settlement (Opposite Dusit)",
    specs: [
      "2,400 m² across 3 specialized lifting floors",
      "16 Calibrated Olympic Squat Racks",
      "Finnish Sauna & Ice-Water Plunge Tanks",
      "24/7 Biometric Keycard Access"
    ],
    hours: "24/7 OPEN",
    phone: "+20 102 334 9901",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Maadi Iron Bunker",
    badge: "RAW POWER CELLAR",
    address: "Degla Street 218, Road 9 Extended Area",
    specs: [
      "1,800 m² Underground Hardcore Compound",
      "Chalk-Allowed Deadlift Platforms & Texas Bars",
      "Heavy Dumbbells Up to 75 KG",
      "24/7 Biometric Keycard Access"
    ],
    hours: "24/7 OPEN",
    phone: "+20 102 334 9902",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Tanta Delta Mega Arena",
    badge: "DELTA EPICENTER",
    address: "Al-Geish Street, Near Stadium District",
    specs: [
      "1,500 m² Calibrated Lifting Floor",
      "Arsenal Strength Iso-Lateral Chest & Back",
      "Clinical InBody Assessment Station",
      "06:00 AM – 02:00 AM Daily"
    ],
    hours: "06:00 - 02:00",
    phone: "+20 102 334 9903",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=800&q=80"
  }
];

export default function SharkGymLandingPage() {
  // Navigation & Interactive States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Claim 7-Day Shark Pass");
  const [athleteName, setAthleteName] = useState("");
  const [athletePhone, setAthletePhone] = useState("+20 ");
  const [athleteHub, setAthleteHub] = useState("New Cairo Flagship (North 90th)");
  const [athleteGoal, setAthleteGoal] = useState("Raw Hypertrophy & Muscle Mass");

  // Submission Simulation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPassId, setGeneratedPassId] = useState("SHARK-EGY-9842");

  // Stats Counters
  const [statMembers, setStatMembers] = useState(0);
  const [statRacks, setStatRacks] = useState(0);
  const [statSuccess, setStatSuccess] = useState(0);

  // Canvas Reference for Particles
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // -----------------------------------------------------------
  // 60FPS Canvas Sparks & Chalk Dust Particle Loop
  // -----------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || 800;
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      isSpark: boolean;
    }> = [];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.9 + 0.4),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.7 + 0.2,
        isSpark: Math.random() > 0.35
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isSpark) {
          ctx.fillStyle = `rgba(255, 23, 68, ${p.opacity})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#ff1744";
        } else {
          ctx.fillStyle = `rgba(240, 240, 245, ${p.opacity * 0.5})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // -----------------------------------------------------------
  // Auto-Incrementing Stats Ticker
  // -----------------------------------------------------------
  useEffect(() => {
    let currentStep = 0;
    const totalSteps = 60;
    const intervalTime = 30;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;

      setStatMembers(Math.floor(progress * 9400));
      setStatRacks(Math.floor(progress * 42));
      setStatSuccess(parseFloat((progress * 99.4).toFixed(1)));

      if (currentStep >= totalSteps) {
        setStatMembers(9400);
        setStatRacks(42);
        setStatSuccess(99.4);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // -----------------------------------------------------------
  // Egyptian Mobile Live Mask Formatter (+20 1X XXXX XXXX)
  // -----------------------------------------------------------
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");

    // Strip leading international prefix or zero
    if (raw.startsWith("20")) {
      raw = raw.substring(2);
    } else if (raw.startsWith("0")) {
      raw = raw.substring(1);
    }

    raw = raw.substring(0, 10);

    let formatted = "+20";
    if (raw.length > 0) {
      formatted += " " + raw.substring(0, 2);
    }
    if (raw.length > 2) {
      formatted += " " + raw.substring(2, 6);
    }
    if (raw.length > 6) {
      formatted += " " + raw.substring(6, 10);
    }

    setAthletePhone(formatted);
  };

  // -----------------------------------------------------------
  // Open / Close Modal Handlers
  // -----------------------------------------------------------
  const handleOpenModal = (title?: string) => {
    if (title) setModalTitle(title);
    setIsSubmitting(false);
    setIsSuccess(false);
    setSubmitStep(0);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  // -----------------------------------------------------------
  // Handle Trial Form Submission Simulation
  // -----------------------------------------------------------
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanDigits = athletePhone.replace(/\D/g, "");
    if (cleanDigits.length < 11) {
      alert("Please enter a valid Egyptian mobile number formatted as +20 1X XXXX XXXX.");
      return;
    }

    // Step 1: Start Loading Animation
    setIsSubmitting(true);
    setSubmitStep(1);

    setTimeout(() => {
      setSubmitStep(2);
    }, 700);

    setTimeout(() => {
      setSubmitStep(3);
    }, 1400);

    setTimeout(() => {
      // Step 2: Show Verified Checkmark Screen
      const randomCode = "SHARK-EGY-" + Math.floor(1000 + Math.random() * 9000);
      setGeneratedPassId(randomCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2100);
  };

  const filteredPrograms =
    activeCategory === "All"
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#050505] text-[#F8FAFC] min-h-screen relative font-sans selection:bg-[#e11d48] selection:text-white">
      
      {/* --------------------------------------------------------- */}
      {/* TOP ANNOUNCEMENT BAR */}
      {/* --------------------------------------------------------- */}
      <div className="bg-[#0e0e11] border-b border-[#1f1f23] text-[11px] py-2 px-4 text-center tracking-wider uppercase text-zinc-400 font-bold flex items-center justify-center gap-3">
        <span className="inline-block w-2 h-2 rounded-full bg-[#e11d48] animate-ping"></span>
        <span>EGYPTIAN COMPOUND ACCESS: NEW CAIRO • MAADI • TANTA DELTA HUB</span>
        <span className="text-[#ff1744] font-black hidden sm:inline">24/7 BIOMETRIC ENTRY</span>
      </div>

      {/* --------------------------------------------------------- */}
      {/* MAIN NAVIGATION HEADER */}
      {/* --------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with Geometric Shark Fin */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#9f1239] p-2 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.6)] group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white">
                <path d="M3 21L12 3C12 3 14 10 21 15C17 17 14 17.5 12 17.5C8 17.5 4.5 19.5 3 21Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-black text-2xl tracking-tighter text-white uppercase leading-none group-hover:text-[#ff1744] transition-colors">
                SHARK <span className="text-[#ff1744]">GYM</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 mt-1">
                ELITE ATHLETIC COMPOUND
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-widest">
            <a href="#hero" className="text-zinc-300 hover:text-white transition-colors relative py-2 group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#programs" className="text-zinc-300 hover:text-white transition-colors relative py-2 group">
              Programs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#pricing" className="text-zinc-300 hover:text-white transition-colors relative py-2 group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#hubs" className="text-zinc-300 hover:text-white transition-colors relative py-2 group">
              Egyptian Hubs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e11d48] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => handleOpenModal("Claim 7-Day Pass")}
              className="px-5 py-2.5 rounded-full bg-[#e11d48] hover:bg-[#ff1744] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.45)] hover:shadow-[0_0_28px_rgba(225,29,72,0.7)] hover:scale-105"
            >
              CLAIM 7-DAY PASS
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c0e] border-b border-[#27272a] px-6 py-5 space-y-4">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#e11d48]"
            >
              Home
            </a>
            <a
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#e11d48]"
            >
              Programs
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#e11d48]"
            >
              Pricing
            </a>
            <a
              href="#hubs"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-300 hover:text-[#e11d48]"
            >
              Egyptian Hubs
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenModal("Claim 7-Day Pass");
                }}
                className="w-full py-3 rounded-xl bg-[#e11d48] text-white font-black text-xs uppercase tracking-wider"
              >
                CLAIM 7-DAY FREE TRIAL
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --------------------------------------------------------- */}
      {/* HERO SECTION WITH PARTICLES & JAGGED LASER SLASH */}
      {/* --------------------------------------------------------- */}
      <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden border-b border-[#27272a]">
        
        {/* 60FPS Canvas Sparks & Chalk Dust */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#e11d48]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#e11d48]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Live Indicator Badge with Pulsing Radar Ring */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#161619] border border-[#2b2b30] shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1744] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff1744]"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-zinc-200">
                PREMIUM MALE ATHLETIC FACILITY
              </span>
            </div>

            {/* 2-Line Headline */}
            <h1 className="font-mono font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight uppercase leading-[0.92] text-white">
              <span className="block">BE STRONG BUILD</span>
              <span className="block text-[#ff1744] drop-shadow-[0_0_25px_rgba(255,23,68,0.7)]">
                YOUR DREAM BODY
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed font-medium">
              Egypt's premier male athletic compound engineered for heavy barbell mastery, calibrated hypertrophy, and elite metabolic conditioning. Leave weakness at the door and forge competition-level physical dominance.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleOpenModal("Hero Start Free Trial")}
                className="px-8 py-4 rounded-full bg-[#e11d48] hover:bg-[#ff1744] text-white font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:shadow-[0_0_40px_rgba(225,29,72,0.8)] hover:scale-105 flex items-center gap-3"
              >
                <span>START FREE TRIAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#programs"
                className="px-8 py-4 rounded-full bg-transparent hover:bg-[#121214] text-zinc-200 hover:text-white border border-[#3f3f46] hover:border-[#e11d48] font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                EXPLORE PROGRAMS
              </a>
            </div>

            {/* Stats Ticker & 6x3 Dot Matrix */}
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-8 border-t border-[#1e1e24]">
              
              <div className="grid grid-cols-3 gap-6 sm:gap-10">
                <div>
                  <div className="font-mono text-3xl sm:text-4xl font-black text-white">
                    {statMembers.toLocaleString()}+
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mt-1">
                    Active Members
                  </div>
                </div>
                <div>
                  <div className="font-mono text-3xl sm:text-4xl font-black text-[#ff1744]">
                    {statRacks}+
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mt-1">
                    Heavy Racks
                  </div>
                </div>
                <div>
                  <div className="font-mono text-3xl sm:text-4xl font-black text-white">
                    {statSuccess}%
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 mt-1">
                    Success Rate
                  </div>
                </div>
              </div>

              {/* 6x3 Dot Matrix Graphic */}
              <div className="grid grid-cols-6 gap-1.5 opacity-60 self-start sm:self-center">
                {Array.from({ length: 18 }).map((_, idx) => (
                  <div key={idx} className="w-1.5 h-1.5 rounded-full bg-[#e11d48]" />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Torn Slash & Laser Beam */}
          <div className="lg:col-span-5 relative h-[520px] sm:h-[620px] lg:h-[720px] flex items-center justify-center">
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#27272a] shadow-2xl bg-[#0a0a0a] group">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80"
                alt="Intense Bodybuilder Lifting Barbells at Shark Gym Egypt"
                className="w-full h-full object-cover object-top filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/40" />

              {/* THE JAGGED/TORN RIPPED SLASH DIAGONAL OVERLAY */}
              <svg className="absolute top-0 left-0 h-full w-28 sm:w-36 pointer-events-none z-20" viewBox="0 0 100 1000" preserveAspectRatio="none">
                <defs>
                  <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <polygon points="0,0 75,0 25,180 85,340 18,520 70,710 20,860 65,1000 0,1000" fill="#050505" />
                <polyline points="75,0 25,180 85,340 18,520 70,710 20,860 65,1000" stroke="#ff1744" strokeWidth="4" fill="none" filter="url(#neon-glow)" />
              </svg>

              {/* VERTICAL SCANNING LASER BEAM ALONG SEAM */}
              <div className="absolute top-0 left-16 sm:left-24 w-[3px] h-32 bg-gradient-to-b from-transparent via-[#ff1744] to-transparent shadow-[0_0_15px_#ff1744] animate-pulse z-25 pointer-events-none" />

              {/* Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between z-30">
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-[#ff1744] block">
                    CALIBRATED FACILITY
                  </span>
                  <span className="font-mono font-bold text-sm text-white">
                    ELEIKO &amp; ARSENAL EQUIPMENT
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#e11d48]/20 border border-[#e11d48]/50 text-[#ff1744] text-xs font-black uppercase">
                  PRO GRADE
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* TRAINING PROGRAMS SECTION */}
      {/* --------------------------------------------------------- */}
      <section id="programs" className="py-24 bg-[#0a0a0a] relative border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff1744]">
              UNCOMPROMISING DISCIPLINES
            </span>
            <h2 className="font-mono font-black text-4xl sm:text-5xl uppercase tracking-tight text-white">
              PRECISION <span className="text-[#ff1744]">TRAINING PROTOCOLS</span>
            </h2>
            <p className="text-zinc-400 text-sm">
              Select your battlefield. Every program is calibrated with scientific periodization, progressive mechanical tension, and strict biometric feedback.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-6">
              {["All", "Hypertrophy", "Powerlifting", "Conditioning", "Combat Strength"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? "bg-[#e11d48] text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]"
                      : "bg-[#121214] text-zinc-400 hover:text-white hover:bg-[#18181b] border border-[#27272a]"
                  }`}
                >
                  {cat === "All" ? "All Protocols" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-14">
            {filteredPrograms.map((p) => (
              <div
                key={p.id}
                className="bg-[#121214] rounded-2xl overflow-hidden border border-[#27272a] hover:border-[#e11d48] transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_0_30px_rgba(225,29,72,0.3)] hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-125"
                  />
                  <div className="absolute top-3 left-3 bg-[#e11d48] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                    {p.badge}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#ff1744]" />
                    {p.duration}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff1744]">
                      {p.intensity}
                    </span>
                    <h3 className="font-mono font-black text-xl text-white uppercase group-hover:text-[#ff1744] transition-colors mt-0.5">
                      {p.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1e1e24] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-zinc-300">{p.target}</span>
                    <button
                      onClick={() => handleOpenModal(`Program: ${p.title}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#18181b] hover:bg-[#e11d48] text-white text-xs font-bold uppercase transition-colors"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* MEMBERSHIP PRICING SECTION */}
      {/* --------------------------------------------------------- */}
      <section id="pricing" className="py-24 bg-[#050505] relative border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff1744]">
              TRANSPARENT VALUE
            </span>
            <h2 className="font-mono font-black text-4xl sm:text-5xl uppercase tracking-tight text-white">
              CHOOSE YOUR <span className="text-[#ff1744]">STRENGTH TIER</span>
            </h2>
            <p className="text-zinc-400 text-sm">
              No hidden fees or locked contracts. All plans include 24/7 keycard privileges and full access to calibrated Olympic platforms.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-[#121214] border border-[#27272a] mt-6">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[#e11d48] text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("quarterly")}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  billingCycle === "quarterly"
                    ? "bg-[#e11d48] text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>Quarterly</span>
                <span className="bg-red-950 text-[#ff1744] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#e11d48]/40">
                  SAVE 15%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-14">
            
            {/* Predator Pass */}
            <div className="bg-[#121214] rounded-2xl p-8 border border-[#27272a] flex flex-col justify-between transition-all duration-300 hover:border-[#e11d48]">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Entry Level</span>
                <h3 className="font-mono font-black text-2xl text-white mt-1 uppercase">PREDATOR PASS</h3>
                
                <div className="mt-6 mb-6 pb-6 border-b border-[#222226]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-black text-4xl sm:text-5xl text-white">
                      {billingCycle === "monthly" ? "850" : "2,165"}
                    </span>
                    <span className="text-[#ff1744] font-mono text-xl font-black">L.E</span>
                    <span className="text-xs text-zinc-400">
                      {billingCycle === "monthly" ? "/ month" : "/ 3 months"}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {billingCycle === "monthly" ? "Billed monthly in Egyptian currency" : "Billed quarterly with 15% discount applied"}
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Access to 1 Selected Egyptian Hub</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Standard Open Gym Hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Dumbbells up to 60 KG &amp; Cable Zone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Locker Rooms &amp; Steam Sauna</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Free Parking Access</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6">
                <button
                  onClick={() => handleOpenModal("Plan: PREDATOR PASS")}
                  className="w-full py-4 rounded-xl bg-[#18181b] hover:bg-[#e11d48] hover:text-white text-zinc-200 border border-[#27272a] font-black text-xs uppercase tracking-wider transition-all duration-300"
                >
                  Select Plan &rarr;
                </button>
              </div>
            </div>

            {/* Apex Pro (Featured / Best Value) */}
            <div className="bg-[#121214] rounded-2xl p-8 border border-[#e11d48] shadow-[0_0_35px_rgba(225,29,72,0.35)] relative scale-105 z-20 flex flex-col justify-between transition-all duration-300 hover:border-[#e11d48]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#e11d48] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                BEST VALUE • MOST POPULAR
              </div>

              <div>
                <span className="text-xs font-bold text-[#ff1744] uppercase tracking-widest">Competition Athlete</span>
                <h3 className="font-mono font-black text-2xl text-white mt-1 uppercase">APEX PRO</h3>
                
                <div className="mt-6 mb-6 pb-6 border-b border-[#222226]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-black text-4xl sm:text-5xl text-white">
                      {billingCycle === "monthly" ? "1,500" : "3,825"}
                    </span>
                    <span className="text-[#ff1744] font-mono text-xl font-black">L.E</span>
                    <span className="text-xs text-zinc-400">
                      {billingCycle === "monthly" ? "/ month" : "/ 3 months"}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {billingCycle === "monthly" ? "Billed monthly in Egyptian currency" : "Billed quarterly with 15% discount applied"}
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs text-zinc-200">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span className="font-bold text-white">All 3 Egyptian Hubs (New Cairo, Maadi, Tanta)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span className="font-bold text-white">24/7 Biometric Keycard Access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Calibrated Eleiko &amp; Arsenal Platforms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Monthly InBody 770 Clinical Body Scan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Finnish Sauna &amp; Ice Cold Plunge Recovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>15% Discount on In-House Shark Supplements</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6">
                <button
                  onClick={() => handleOpenModal("Plan: APEX PRO")}
                  className="w-full py-4 rounded-xl bg-[#e11d48] hover:bg-[#ff1744] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(225,29,72,0.6)]"
                >
                  Claim Apex Pro &rarr;
                </button>
              </div>
            </div>

            {/* Great White VIP */}
            <div className="bg-[#121214] rounded-2xl p-8 border border-[#27272a] flex flex-col justify-between transition-all duration-300 hover:border-[#e11d48]">
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Executive Tier</span>
                <h3 className="font-mono font-black text-2xl text-white mt-1 uppercase">GREAT WHITE VIP</h3>
                
                <div className="mt-6 mb-6 pb-6 border-b border-[#222226]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-black text-4xl sm:text-5xl text-white">
                      {billingCycle === "monthly" ? "2,800" : "7,140"}
                    </span>
                    <span className="text-[#ff1744] font-mono text-xl font-black">L.E</span>
                    <span className="text-xs text-zinc-400">
                      {billingCycle === "monthly" ? "/ month" : "/ 3 months"}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {billingCycle === "monthly" ? "Billed monthly in Egyptian currency" : "Billed quarterly with 15% discount applied"}
                  </p>
                </div>

                <ul className="space-y-3.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span className="font-bold text-white">Full All-Branch Unrestricted 24/7 Access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>8 Dedicated 1-on-1 Master Trainer Sessions/mo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Private Reserved Permanent Locker + Laundry</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>Daily Whey Isolate Protein Shake at Shark Bar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#ff1744] shrink-0 mt-0.5" />
                    <span>VIP Guest Passes (2 per month included)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8 mt-6">
                <button
                  onClick={() => handleOpenModal("Plan: GREAT WHITE VIP")}
                  className="w-full py-4 rounded-xl bg-[#18181b] hover:bg-[#e11d48] hover:text-white text-zinc-200 border border-[#27272a] font-black text-xs uppercase tracking-wider transition-all duration-300"
                >
                  Select Plan &rarr;
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* EGYPTIAN HUBS SECTION */}
      {/* --------------------------------------------------------- */}
      <section id="hubs" className="py-24 bg-[#0a0a0a] relative border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff1744]">
              STRATEGIC COMPOUNDS
            </span>
            <h2 className="font-mono font-black text-4xl sm:text-5xl uppercase tracking-tight text-white">
              EGYPTIAN <span className="text-[#ff1744]">STRENGTH HUBS</span>
            </h2>
            <p className="text-zinc-400 text-sm">
              High-ceiling industrial sanctuaries constructed exclusively for heavy lifting, chalk-filled platforms, and optimal athlete biomechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-14">
            {HUBS.map((hub, idx) => (
              <div
                key={idx}
                className="bg-[#121214] rounded-2xl overflow-hidden border border-[#27272a] hover:border-[#e11d48] transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={hub.image}
                    alt={hub.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-125 brightness-90"
                  />
                  <div className="absolute top-3 right-3 bg-[#e11d48] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow">
                    {hub.hours}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff1744]">
                      {hub.badge}
                    </span>
                    <h3 className="font-mono font-black text-xl text-white uppercase mt-0.5">
                      {hub.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ff1744] shrink-0" />
                      {hub.address}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300">
                    {hub.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <span className="text-[#ff1744] font-bold">✓</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#1e1e24] flex items-center justify-between">
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#ff1744]" />
                      {hub.phone}
                    </span>
                    <button
                      onClick={() => handleOpenModal(`Hub: ${hub.name}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#e11d48] hover:bg-[#ff1744] text-white text-xs font-bold uppercase transition-colors"
                    >
                      Tour Hub
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --------------------------------------------------------- */}
      {/* FOOTER */}
      {/* --------------------------------------------------------- */}
      <footer className="bg-[#050505] border-t border-[#27272a] py-14 text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e11d48] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M3 21L12 3C12 3 14 10 21 15C17 17 14 17.5 12 17.5C8 17.5 4.5 19.5 3 21Z" />
                </svg>
              </div>
              <span className="font-mono font-black text-xl text-white uppercase tracking-tight">SHARK GYM</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Egypt's premier athletic compound dedicated to raw hypertrophy, competition strength, and disciplined physical dominance.
            </p>
            <p className="text-[11px] text-zinc-500">&copy; 2026 SHARK GYM EGYPT. All Rights Reserved.</p>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Training Tracks</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#programs" className="hover:text-[#e11d48] transition-colors">Hypertrophy Protocol</a></li>
              <li><a href="#programs" className="hover:text-[#e11d48] transition-colors">Apex Powerlifting Squad</a></li>
              <li><a href="#programs" className="hover:text-[#e11d48] transition-colors">Metabolic Conditioning</a></li>
              <li><a href="#programs" className="hover:text-[#e11d48] transition-colors">Gladiator Combat Power</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Egyptian Compounds</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#hubs" className="hover:text-[#e11d48] transition-colors">New Cairo Flagship (North 90th)</a></li>
              <li><a href="#hubs" className="hover:text-[#e11d48] transition-colors">Maadi Iron Bunker (Degla 218)</a></li>
              <li><a href="#hubs" className="hover:text-[#e11d48] transition-colors">Tanta Delta Arena (Al-Geish St)</a></li>
              <li><a href="#pricing" className="hover:text-[#e11d48] transition-colors">All-Access National Keycard</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-4">WhatsApp &amp; Support</h5>
            <p className="text-xs text-zinc-400">Direct Athlete Hotline:</p>
            <p className="text-base font-bold text-[#ff1744] mt-0.5">+20 102 334 9900</p>
            <p className="text-xs text-zinc-500 mt-2">Biometric Pass Desk: Open 24/7</p>
          </div>

        </div>
      </footer>

      {/* --------------------------------------------------------- */}
      {/* 7-DAY FREE TRIAL MODAL (WITH SIMULATED SPINNER & VERIFICATION) */}
      {/* --------------------------------------------------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={handleCloseModal}
          />

          <div className="relative bg-[#121214] border border-[#e11d48] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(225,29,72,0.45)] z-10 space-y-6">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 text-2xl leading-none"
            >
              <X className="w-6 h-6" />
            </button>

            {/* VIEW 1: REGISTRATION FORM */}
            {!isSubmitting && !isSuccess && (
              <div>
                <div className="border-b border-[#27272a] pb-4 mb-5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ff1744]">
                    UNRESTRICTED ATHLETE PRIVILEGE
                  </span>
                  <h3 className="font-mono font-black text-2xl text-white uppercase mt-0.5">
                    {modalTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Experience calibrated platforms, Eleiko equipment, and recovery saunas for 7 consecutive days.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                      Full Athlete Name <span className="text-[#ff1744]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={athleteName}
                      onChange={(e) => setAthleteName(e.target.value)}
                      placeholder="e.g. Captain Ahmed Hassan"
                      className="w-full px-4 py-3 rounded-xl bg-[#08080a] border border-[#27272a] focus:border-[#e11d48] text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Field 2: Egyptian Mobile Number (+20 1X XXXX XXXX) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300">
                        Egyptian Mobile Number <span className="text-[#ff1744]">*</span>
                      </label>
                      <span className="text-[10px] font-bold text-zinc-500">FORMAT: +20 1X XXXX XXXX</span>
                    </div>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={athletePhone}
                        onChange={handlePhoneChange}
                        placeholder="+20 10 1234 5678"
                        className="w-full px-4 py-3 rounded-xl bg-[#08080a] border border-[#27272a] focus:border-[#e11d48] text-white text-sm font-mono tracking-wide focus:outline-none transition-colors"
                      />
                      <span className="absolute right-3 top-3 text-[10px] uppercase font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                        EGY (+20)
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Supports Vodafone (010), Orange (012), Etisalat (011), WE (015)
                    </p>
                  </div>

                  {/* Fields 3 & 4: Branch & Goal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                        Preferred Hub
                      </label>
                      <select
                        value={athleteHub}
                        onChange={(e) => setAthleteHub(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl bg-[#08080a] border border-[#27272a] focus:border-[#e11d48] text-white text-xs focus:outline-none"
                      >
                        <option value="New Cairo Flagship (North 90th)">New Cairo Flagship (North 90th)</option>
                        <option value="Maadi Iron Bunker (Degla 218)">Maadi Iron Bunker (Degla 218)</option>
                        <option value="Tanta Delta Mega Arena">Tanta Delta Mega Arena</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                        Training Goal
                      </label>
                      <select
                        value={athleteGoal}
                        onChange={(e) => setAthleteGoal(e.target.value)}
                        className="w-full px-3 py-3 rounded-xl bg-[#08080a] border border-[#27272a] focus:border-[#e11d48] text-white text-xs focus:outline-none"
                      >
                        <option value="Raw Hypertrophy & Muscle Mass">Raw Hypertrophy</option>
                        <option value="Apex Heavy Powerlifting (S/B/D)">Heavy Powerlifting</option>
                        <option value="Metabolic Conditioning & Fat Shred">Metabolic Conditioning</option>
                        <option value="Combat Power & Athletic Grip">Combat Strength</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#e11d48] hover:bg-[#ff1744] text-white font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(225,29,72,0.6)] flex items-center justify-center gap-2"
                    >
                      <span>CONFIRM PASS &amp; ACTIVATE VIA WHATSAPP</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-zinc-500">
                    🔒 By submitting, your WhatsApp will receive your encrypted QR Keycard instantly.
                  </p>
                </form>
              </div>
            )}

            {/* VIEW 2: ANIMATED SUBMISSION LOADING SPINNER */}
            {isSubmitting && (
              <div className="py-8 text-center space-y-6">
                <div className="relative w-16 h-16 mx-auto">
                  <Loader2 className="w-16 h-16 text-[#e11d48] animate-spin" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono font-black text-xl text-white uppercase tracking-wider">
                    AUTHENTICATING ATHLETE CREDENTIALS
                  </h4>
                  <p className="text-xs text-[#ff1744] font-mono animate-pulse">
                    {submitStep === 1 && "Connecting to Egyptian telecom network (+20)..."}
                    {submitStep === 2 && "Allocating 7-day biometric QR access key..."}
                    {submitStep === 3 && "Dispatching credentials via WhatsApp..."}
                  </p>
                </div>

                {/* Simulated Loading Progress Bar */}
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#e11d48] h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: submitStep === 1 ? "30%" : submitStep === 2 ? "65%" : "95%"
                    }}
                  />
                </div>
              </div>
            )}

            {/* VIEW 3: GREEN VERIFIED CHECKMARK SCREEN (WHATSAPP CONFIRMATION) */}
            {isSuccess && (
              <div className="text-center space-y-6">
                {/* Glowing Green Checkmark Circle */}
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.45)]">
                  <Check className="w-10 h-10 text-emerald-400" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    VERIFICATION SUCCESSFUL
                  </span>
                  <h4 className="font-mono font-black text-2xl text-white uppercase tracking-tight">
                    7-DAY PASS ACTIVATED!
                  </h4>
                  <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                    Your official guest pass has been generated and queued for dispatch to your Egyptian WhatsApp number.
                  </p>
                </div>

                {/* Athlete Dossier Card */}
                <div className="bg-[#09090b] border border-emerald-800/40 rounded-xl p-4 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                    <span className="text-zinc-500 uppercase font-bold text-[10px]">Biometric Pass ID:</span>
                    <span className="font-mono font-bold text-emerald-400 tracking-wider">
                      {generatedPassId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-medium">Athlete:</span>
                    <span className="font-bold text-white">{athleteName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-medium">WhatsApp:</span>
                    <span className="font-mono text-zinc-200">{athletePhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-medium">Assigned Hub:</span>
                    <span className="font-bold text-[#ff1744]">{athleteHub}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-medium">Training Track:</span>
                    <span className="text-zinc-300">{athleteGoal}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-[11px]">
                    <span className="text-zinc-500">Access Status:</span>
                    <span className="text-emerald-400 font-black flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      VALID FOR 7 CONSECUTIVE DAYS
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-1">
                  <a
                    href={`https://wa.me/201023349900?text=${encodeURIComponent(
                      `Hello Shark Gym Egypt! I have activated my 7-Day Guest Pass.\n\nPass Code: ${generatedPassId}\nAthlete: ${athleteName}\nHub: ${athleteHub}\nGoal: ${athleteGoal}\n\nPlease send my biometric QR Code.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>CONFIRM ON WHATSAPP &amp; GET QR CODE</span>
                  </a>

                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase transition-colors"
                  >
                    Close &amp; Return to Compound
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
