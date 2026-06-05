import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  School,
  GraduationCap,
  Award,
  Phone,
  MessageCircle,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  Bell,
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  Facebook,
  Instagram,
  Youtube,
  Trash2,
  Clock,
  X
} from "lucide-react";
import { schoolsData, featuresData, faqData } from "./data";
import { SchoolInfo } from "./types";
import SchoolLogo from "./components/SchoolLogo";
import SchoolDetailModal from "./components/SchoolDetailModal";
import AdmissionInquiry from "./components/AdmissionInquiry";
import AIChatBot from "./components/AIChatBot";
import PortalSession from "./components/PortalSession";
import SchoolPageView from "./components/SchoolPageView";

export default function App() {
  const [selectedSchool, setSelectedSchool] = useState<SchoolInfo | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [savedInquiries, setSavedInquiries] = useState<any[]>([]);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [quickInquirySuccess, setQuickInquirySuccess] = useState(false);
  const [activeSubPage, setActiveSubPage] = useState<SchoolInfo | null>(null);
  const [activePortalView, setActivePortalView] = useState(false);

  // Load registered inquiries to display custom parent status panel
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("ksv_inquiries");
      if (stored) {
        setSavedInquiries(JSON.parse(stored));
      }
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    
    // Interval polling for fast update
    const timer = setInterval(handleStorageChange, 1500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(timer);
    };
  }, []);

  const deleteInquiry = (id: string) => {
    const updated = savedInquiries.filter((inq) => inq.id !== id);
    localStorage.setItem("ksv_inquiries", JSON.stringify(updated));
    setSavedInquiries(updated);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  // Maps custom feature icons from data
  const renderFeatureIcon = (iconName: string, themeColor: string) => {
    switch (iconName) {
      case "School":
        return <School className="w-8 h-8 text-amber-500" />;
      case "GraduationCap":
        return <GraduationCap className="w-8 h-8 text-pink-500" />;
      case "Award":
      default:
        return <Award className="w-8 h-8 text-sky-500" />;
    }
  };

  if (activeSubPage) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-primary-500 selection:text-white relative">
        {/* Glow behind sub-page */}
        <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-primary-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10" />
        <SchoolPageView
          school={activeSubPage}
          onBack={() => {
            setActiveSubPage(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenPortal={() => {
            setActiveSubPage(null);
            setActivePortalView(true);
            window.scrollTo({ top: 0 });
          }}
        />
        <AIChatBot />
      </div>
    );
  }

  if (activePortalView) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-primary-500 selection:text-white relative animate-fade-in">
        {/* Glow behind sub-page */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary-600/10 rounded-full filter blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-500/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />
        
        {/* Portal Header Bar */}
        <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
            <button
              onClick={() => {
                setActivePortalView(false);
                window.scrollTo({ top: 0 });
              }}
              className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Campus Site</span>
            </button>

            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 bg-gradient-to-tr from-gold-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/10">
                <GraduationCap className="w-5.5 h-5.5 text-slate-950" />
              </div>
              <div>
                <div className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-white font-serif">
                  KSV SECURE PORTAL
                </div>
                <div className="text-[10px] font-mono tracking-widest text-gold-400 mt-1 uppercase">
                  Central Gateway
                </div>
              </div>
            </div>

            <div className="text-slate-500 text-[10px] font-mono tracking-widest uppercase hidden lg:block select-none font-semibold">
              SSL SECURED SECURECONN_OK //
            </div>
          </div>
        </div>

        {/* Portal Main Workspace container */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
          <div className="text-center space-y-3 mb-10">
            <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Academic Platform Access Matrix</span>
            <h2 className="text-2xl sm:text-4.5xl font-extrabold font-serif text-white tracking-tight">Student & Staff Portal Desk</h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Authenticate via your institutional keys to modify registers, check timetables, pay academic dues, or track metrics. Normal visitors can view campuses, whilst authorized profiles hold network controls.
            </p>
            <div className="h-0.5 w-12 bg-gold-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="w-full max-w-4xl">
            <PortalSession />
          </div>
        </main>

        {/* Minimal styled footer for Portal page */}
        <footer className="border-t border-white/5 py-6 text-xs text-slate-500 bg-slate-950/40 text-center font-mono">
          <div className="max-w-7xl mx-auto px-4">
            <span>© {new Date().getFullYear()} KSV Group Academic Administration Node • SSL Certificate Active</span>
          </div>
        </footer>

        <AIChatBot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-primary-500 selection:text-white relative">
      {/* Absolute top glowing ambient circles */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-primary-600/10 rounded-full filter blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-gold-500/5 rounded-full filter blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-500/5 rounded-full filter blur-[130px] pointer-events-none -z-10" />

      {/* Header & Global Ribbon */}
      <header className="border-b border-white/5 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            {/* Minimal group crest icon */}
            <div className="w-10 h-10 bg-gradient-to-tr from-gold-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/10">
              <GraduationCap className="w-5.5 h-5.5 text-slate-950" />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-white font-serif">
                KSV GROUP
              </div>
              <div className="text-[10px] font-mono tracking-widest text-gold-400 mt-1 uppercase">
                Schools Academy
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold tracking-wider uppercase text-slate-300">
            <a href="#schools" className="hover:text-gold-400 transition-colors">Pathways</a>
            <a href="#pillars" className="hover:text-gold-400 transition-colors">Our Standard</a>
            <button
              onClick={() => {
                setActivePortalView(true);
                window.scrollTo({ top: 0 });
              }}
              className="text-gold-400 hover:text-amber-300 transition-colors font-bold cursor-pointer uppercase text-xs tracking-wider bg-transparent border-0 p-0"
            >
              🔒 Secure Portal
            </button>
            <a href="#callback" className="hover:text-gold-400 transition-colors">Admissions</a>
            <a href="#faqs" className="hover:text-gold-400 transition-colors">Parent Guide</a>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => {
                setActivePortalView(true);
                window.scrollTo({ top: 0 });
              }}
              className="bg-gold-500 hover:bg-gold-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold tracking-brand transition-all flex items-center space-x-1 cursor-pointer"
            >
              <span>Portal Login</span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("callback");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden sm:flex bg-white/10 hover:bg-white/15 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold tracking-brand transition-all items-center space-x-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Inquire Admissions</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="flex-1 pb-16">
        
        {/* Dynamic Alert Banner if Inquiry exists */}
        {savedInquiries.length > 0 && (
          <div className="bg-gradient-to-r from-primary-950/90 via-slate-900 to-neutral-950 border-b border-primary-500/20 py-3.5 text-xs text-center px-4 relative flex items-center justify-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <Bell className="w-4 h-4 text-primary-400 absolute left-6 hidden sm:inline" />
            <span className="text-slate-300">
              You have <span className="text-white font-bold">{savedInquiries.length}</span> pending academic callback scheduled.
            </span>
            <a href="#callback-dashboard" className="text-gold-400 font-bold hover:underline ml-1 cursor-pointer">
              View Confirmation Ticket →
            </a>
          </div>
        )}

        {/* Hero Banner Area */}
        <section className="relative pt-16 pb-20 md:py-28 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-7 relative z-10">
            {/* Accent badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300 shadow-inner"
            >
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[10px] tracking-widest font-mono uppercase">Enrollment Open 2026-2027</span>
            </motion.div>

            {/* Giant Academic Greeting */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6.5xl font-extrabold tracking-tight font-serif text-white max-w-3xl mx-auto leading-[1.1] drop-shadow-sm"
              >
                Welcome to <span className="text-gradient">KSV Group Of Schools</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gold-400 font-medium font-mono text-xs sm:text-base tracking-[0.25em] uppercase"
              >
                Journey Towards Success
              </motion.p>
            </div>

            {/* Intro Narrative text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-slate-300 md:text-lg max-w-2.5xl mx-auto leading-relaxed"
            >
              A legacy of academic rigor, comprehensive personal growth, and values-rooted learning schemas. Discover outstanding nursery, higher secondary, and CBSE paths in Karur designed for digital age thinkers.
            </motion.p>

            {/* Core Statistics grid with custom multi-color hover effects for first 4 container boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center transition-all duration-300 hover:bg-teal-950/30 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-950/20 hover:-translate-y-1 group">
                <div className="text-2xl md:text-3xl font-black text-white font-mono group-hover:text-teal-400 transition-colors">3</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 group-hover:text-slate-300 transition-colors">Specialized Divisions</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center transition-all duration-300 hover:bg-rose-950/30 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-950/20 hover:-translate-y-1 group">
                <div className="text-2xl md:text-3xl font-black text-white font-mono group-hover:text-rose-400 transition-colors">100%</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 group-hover:text-slate-300 transition-colors">Academic Pass Rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center transition-all duration-300 hover:bg-amber-950/30 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-950/20 hover:-translate-y-1 group">
                <div className="text-2xl md:text-3xl font-black text-white font-mono group-hover:text-amber-400 transition-colors">25+ Yrs</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 group-hover:text-slate-300 transition-colors">Pedagogic Legacy</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center transition-all duration-300 hover:bg-indigo-950/30 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-950/20 hover:-translate-y-1 group">
                <div className="text-2xl md:text-3xl font-black text-white font-mono group-hover:text-indigo-400 transition-colors">1500+</div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1 group-hover:text-slate-300 transition-colors">Enrolled Alumni</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* School Path Cards section ("Choose Your Path") */}
        <section id="schools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-serif text-white">
              Choose Your Path
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
              Select the school division that best fits your educational journey
            </p>
            <div className="h-0.5 w-12 bg-gold-500 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {schoolsData.map((school, idx) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative flex flex-col justify-between bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-slate-900"
              >
                {/* Visual Glow behind card index */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none filter blur-[80px]"
                  style={{ background: `radial-gradient(circle at 50% 120px, ${school.colorTheme.bgGlow}, transparent)` }}
                />

                <div className="space-y-6 relative z-10 w-full flex flex-col items-center text-center">
                  
                  {/* Dynamic SVG Drawing School Emblem */}
                  <SchoolLogo schoolId={school.id} size={150} className="mx-auto" />

                  <div className="space-y-2">
                    {/* Tiny branch category badge */}
                    <span className={`inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase ${school.colorTheme.accent}`}>
                      {school.type}
                    </span>
                    <h3 className="font-extrabold text-xl md:text-2xl text-white tracking-tight group-hover:text-gold-400 transition-colors font-serif">
                      {school.name}
                    </h3>
                  </div>

                  {/* Division Tagline description */}
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed min-h-[40px]">
                    {school.tagline}
                  </p>

                  {/* Bullet Highlights List */}
                  <ul className="w-full text-left space-y-2.5 border-t border-white/5 pt-5 self-stretch">
                    {school.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start text-xs text-slate-300 space-x-2.5">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: school.colorTheme.ribbonColor }} />
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA actions */}
                <div className="relative z-10 pt-6 mt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500 font-mono font-semibold">BRANCH: {school.id.toUpperCase()}</div>
                  <button
                    onClick={() => {
                      setActiveSubPage(school);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center space-x-1 text-xs font-bold text-white group-hover:text-gold-400 group-hover:translate-x-1 transition-all uppercase tracking-wider cursor-pointer decoration-gold-400/30 underline-offset-4 hover:underline"
                  >
                    <span>Explore Campus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pillars / Campuses section ("Our Campus", "Expert Faculty", "Proven Results") */}
        <section id="pillars" className="border-t border-white/5 bg-slate-900/30 py-16 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Educational Core Pillars</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-serif text-white">
                Our Standard Matrix
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresData.map((feat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col space-y-4 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/10">
                    {renderFeatureIcon(feat.iconName, index === 0 ? "amber" : index === 1 ? "pink" : "sky")}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-lg text-white font-serif">{feat.title}</h3>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                      {feat.description}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                      {feat.longDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Direct Inquire Now Desk Segment */}
        <section id="callback" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-primary-950 to-indigo-950 border border-primary-500/20 rounded-3xl p-8 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 filter blur-2xl pointer-events-none"
                style={{ background: "radial-gradient(circle at 10% 10%, rgba(245, 158, 11, 0.15), transparent)" }}
              />
              <div className="space-y-6 relative z-10">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/30 text-gold-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Admissions Desk</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-white tracking-tight leading-snug">
                    Schedule Your Campus Visit Tomorrow
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    Selecting the right environment decides the trajectory of progress. Reach our academic advisors to get detailed fees outlines, documents specifications, and transportation rosters customized exactly to your neighborhood.
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5 col-span-1 text-xs text-slate-400 leading-relaxed">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    <span>Quick Callback Verification and PIN login</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    <span>One-on-One Counseling slot allocations</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    <span>Free campus and laboratory tours</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 relative z-10 mt-6 md:mt-12 flex flex-col space-y-3 font-mono text-xs text-slate-400">
                <span className="text-slate-500 uppercase">Direct Admissions Lines</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] sm:text-xs">
                  <div>
                    <div className="text-white font-bold">Nursery Contact</div>
                    <div className="text-gold-400 mt-0.5">+91 9489927662</div>
                  </div>
                  <div>
                    <div className="text-white font-bold">Higher Sec.</div>
                    <div className="text-gold-400 mt-0.5">+91 9489927665</div>
                  </div>
                  <div>
                    <div className="text-white font-bold">CBSE School</div>
                    <div className="text-gold-400 mt-0.5">+91 9489927664</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Interactive Form */}
            <div className="lg:col-span-12 xl:col-span-7 bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-center">
              <AdmissionInquiry />
            </div>
          </div>
        </section>

        {/* Dynamic Registered Inquiries Dashboard */}
        {savedInquiries.length > 0 && (
          <section id="callback-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-20">
            <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-lg md:text-xl text-white font-serif flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Track Scheduled Callbacks
                  </h3>
                  <p className="text-xs text-slate-400">Verify parents and student details registered under KSV Group portal</p>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("ksv_inquiries");
                    setSavedInquiries([]);
                  }}
                  className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Records</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedInquiries.map((inq, idx) => {
                  const correlatedSchool = schoolsData.find((s) => s.id === inq.selectedSchool) || schoolsData[2];
                  return (
                    <div key={inq.id || idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/11 space-y-3 relative hover:bg-white/[0.04] transition-colors">
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete receipt"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="flex items-center space-x-3">
                        <span className={`h-2.5 w-2.5 rounded-full bg-emerald-400`} />
                        <div>
                          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block leading-none mb-1">REFERENCE #{inq.id}</span>
                          <span className="font-bold text-sm text-white">{inq.studentName || "Prospective Student"}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-mono pt-2 border-t border-white/5">
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase font-bold">Parent Guardian</span>
                          <span className="text-slate-200">{inq.parentName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase font-bold">School Target</span>
                          <span className="text-gold-400 truncate block">{correlatedSchool.shortName}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase font-bold">Contact Dial</span>
                          <span className="text-indigo-300">{inq.phoneNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase font-bold">Class / Grade</span>
                          <span className="text-indigo-300">{inq.grade}</span>
                        </div>
                      </div>

                      <div className="pt-2 text-[10px] text-slate-500 flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-600" /> Pending verification</span>
                        <span>Scheduled: {inq.date || "Today"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic FAQ List banner */}
        <section id="faqs" className="max-w-4xl mx-auto px-4 py-12 scroll-mt-20">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-white">
              Syllabus & Admission Guide
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Quick informational answers regarding registrations, locations and curriculums
            </p>
          </div>

          <div className="space-y-3.5">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between text-white hover:bg-white/[0.01] transition-colors cursor-pointer"
                >
                  <span className="text-sm font-semibold tracking-wide pr-4">{faq.question}</span>
                  {expandedFaqIndex === index ? (
                    <ChevronUp className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {expandedFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Global Detailed Footer Section with pure white background */}
      <footer className="border-t border-slate-200 bg-white pt-16 pb-8 text-xs sm:text-sm text-slate-600 relative z-10 w-full" id="white_footer_ksv">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Main Column */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-gold-500 to-amber-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4.5 h-4.5 text-slate-950" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 font-serif tracking-tight">KSV GROUP</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A legacy of excellence in education, empowering students to lead and succeed in a global world.
            </p>

            {/* Social media anchors - perfectly styled */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4.5 h-4.5 text-slate-600" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4.5 h-4.5 text-slate-600" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-slate-950 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4.5 h-4.5 text-slate-600" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">Explore</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => {
                    setActiveSubPage(schoolsData[0]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-amber-600 transition-colors text-left font-semibold cursor-pointer"
                >
                  KSV Nursery & Primary
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSubPage(schoolsData[1]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-amber-600 transition-colors text-left font-semibold cursor-pointer"
                >
                  KSV Higher Secondary
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSubPage(schoolsData[2]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="hover:text-amber-600 transition-colors text-left font-semibold cursor-pointer"
                >
                  Karur Saraswathi Vidhya Mandhirr
                </button>
              </li>
            </ul>
          </div>

          {/* Contacts detailed matrix grouped */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Division 1 */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-[11px] text-slate-900 uppercase tracking-widest font-mono">Nursery & Primary</h5>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="font-semibold text-slate-800">OFFICE:</li>
                <li className="hover:text-slate-950 transition-colors">
                  <a href="tel:+919489927662">+91 9489927662</a>
                </li>
                <li className="font-semibold text-slate-800">WHATSAPP:</li>
                <li>
                  <a
                    href="https://wa.me/919489927662"
                    className="flex items-center space-x-1 hover:text-slate-950 transition-colors"
                  >
                    <span>+91 9489927662</span>
                  </a>
                </li>
                <li className="font-semibold text-slate-800">EMAIL:</li>
                <li className="break-all">
                  <a href="mailto:ksvnpschool@gmail.com" className="hover:text-slate-950 transition-colors">
                    ksvnpschool@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Division 2 */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-[11px] text-slate-900 uppercase tracking-widest font-mono">Higher Secondary</h5>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="font-semibold text-slate-800">OFFICE:</li>
                <li className="hover:text-slate-950 transition-colors">
                  <a href="tel:+919489927665">+91 9489927665</a>
                </li>
                <li className="font-semibold text-slate-800">WHATSAPP:</li>
                <li>
                  <a
                    href="https://wa.me/919489927665"
                    className="flex items-center space-x-1 hover:text-slate-950 transition-colors"
                  >
                    <span>+91 9489927665</span>
                  </a>
                </li>
                <li className="font-semibold text-slate-800">EMAIL:</li>
                <li className="break-all">
                  <a href="mailto:ksvschools@gmail.com" className="hover:text-slate-950 transition-colors">
                    ksvschools@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Division 3 */}
            <div className="space-y-2">
              <h5 className="font-extrabold text-[11px] text-slate-900 uppercase tracking-widest font-mono">CBSE School</h5>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="font-semibold text-slate-800">OFFICE:</li>
                <li className="hover:text-slate-950 transition-colors">
                  <a href="tel:+919489927664">+91 9489927664</a>
                </li>
                <li className="font-semibold text-slate-800">WHATSAPP:</li>
                <li>
                  <a
                    href="https://wa.me/919489927664"
                    className="flex items-center space-x-1 hover:text-slate-950 transition-colors"
                  >
                    <span>+91 9489927664</span>
                  </a>
                </li>
                <li className="font-semibold text-slate-800">EMAIL:</li>
                <li className="break-all">
                  <a href="mailto:ksvmcbse@gmail.com" className="hover:text-slate-950 transition-colors">
                    ksvmcbse@gmail.com
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Outer bottom panel */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} KSV Group Of Schools. All Rights Reserved.
          </span>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => {
                setActivePortalView(true);
                window.scrollTo({ top: 0 });
              }}
              className="font-semibold text-slate-600 hover:text-slate-950 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              Privilege Portal
            </button>
            <span>•</span>
            <span className="font-semibold text-slate-600 select-none">Academic Terms</span>
          </div>
        </div>
      </footer>

      {/* Detail Overlay Sheet Modal */}
      <AnimatePresence>
        {selectedSchool && (
          <SchoolDetailModal
            school={selectedSchool}
            onClose={() => setSelectedSchool(null)}
          />
        )}
      </AnimatePresence>

      <AIChatBot />
    </div>
  );
}
