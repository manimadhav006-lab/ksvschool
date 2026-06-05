import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Dribbble,
  GraduationCap,
  Inbox,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import { SchoolInfo } from "../types";
import SchoolLogo from "./SchoolLogo";
import AdmissionInquiry from "./AdmissionInquiry";

interface SchoolPageViewProps {
  school: SchoolInfo;
  onBack: () => void;
  onOpenPortal: () => void;
}

export default function SchoolPageView({ school, onBack, onOpenPortal }: SchoolPageViewProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  // Sports details custom definition based on school branch
  const getSportsDetails = (schoolId: string) => {
    switch (schoolId) {
      case "nursery-primary":
        return {
          title: "Early Years PE & Coordination Academy",
          description: "Our athletic programs are specially tailored to build foundational motor skills, coordination, and physical confidence in early learners.",
          disciplines: [
            { name: "Motor Skills Gymnastics", details: "Play-based coordination layouts, crawling hoops, soft-mats, and developmental balancing logs." },
            { name: "Animal Posture Yoga", details: "Fun, imaginative yoga stretches mirroring birds and forest animals to increase structural elasticity." },
            { name: "Soft Football & Dodge", details: "Frictionless grass play using soft inflated foam balls promoting early teamwork frameworks." },
            { name: "Creative Dance & Hops", details: "Music-synchronized hopscotch grids, rhythm clapping, and interactive speed ring hops." }
          ],
          gallery: [
            { title: "Nursery Play Yard", url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=400", desc: "Interactive playground with safety-first flooring" },
            { title: "Gymnastics Hall", url: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400", desc: "Bright sensory gym for primary motor exercises" }
          ]
        };
      case "higher-secondary":
        return {
          title: "Elite Board Athletic & Kabaddi Club",
          description: "A professional competitive sports ecosystem producing regional champions and board sports representatives.",
          disciplines: [
            { name: "State Kabaddi Champions Ring", details: "Dedicated clay court and sand yard with physical conditioning coaching for regional tournaments." },
            { name: "Professional Athletics Track", details: "Speed drills, 100m/400m sprint coaching, long-jump training vaults, and aerobic fitness tracks." },
            { name: "Vanguard Volleyball Team", details: "Tournament size court with night illumination, custom practice nets, and regional league coaches." },
            { name: "Syllabus Chess Council", details: "Brain training mental athletics, weekly board championships, and state level chess qualifiers." }
          ],
          gallery: [
            { title: "Athletic Running Track", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400", desc: "Advanced training turf for sprinters and athletic trials" },
            { title: "Volleyball Arena", url: "https://images.unsplash.com/photo-1513415277900-a62401e19be4?auto=format&fit=crop&q=80&w=400", desc: "Illuminated clay court for after-hours coaching leagues" }
          ]
        };
      case "cbse":
      default:
        return {
          title: "Saraswathi Vidhya Mandhirr Cricket & Wellness Academy",
          description: "Comprehensive central curriculum sports structure aligning intellectual focus with professional training.",
          disciplines: [
            { name: "Vidhya Mandhirr Cricket Nets", details: "Concrete and grass practice pitches, professional bowling machines, and video capture biomechanics." },
            { name: "Inter-School Football Yard", details: "Full size grass field with soccer training grids, tactical strategy workshops, and weekend tournaments." },
            { name: "Mindfulness Yoga Shala", details: "Weekly yogic mudra and deep breathing circuits directed by certified academic wellness guides." },
            { name: "Indoor Table Tennis Hub", details: "Pristine tournaments table layout with computerized ball feeders to improve reflexes." }
          ],
          gallery: [
            { title: "Cricket Practice Nets", url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400", desc: "State-of-the-art concrete bowling pitches" },
            { title: "Green Football Yard", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400", desc: "Meticulous grass soccer field of CBSE campus" }
          ]
        };
    }
  };

  const sportsInfo = getSportsDetails(school.id);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col relative">
      {/* Background glow specific to school colors */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full filter blur-[150px] pointer-events-none opacity-20 -z-10"
        style={{ background: school.colorTheme.bgGlow }}
      />

      {/* Campus Header Bar */}
      <div className="border-b border-white/5 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to main portal</span>
          </button>

          <div className="flex items-center space-x-2.5">
            <SchoolLogo schoolId={school.id} size={40} />
            <span className="font-bold text-sm tracking-tight text-white hidden md:inline font-serif">{school.name}</span>
          </div>

          <button
            onClick={onOpenPortal}
            className="text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 px-3.5 py-2 rounded-xl transition-all border border-white/10 cursor-pointer"
          >
            Branch Login
          </button>
        </div>
      </div>

      {/* Hero Cover Area */}
      <section className="py-12 md:py-16 border-b border-white/5 bg-gradient-to-b from-slate-900/40 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex justify-center">
            <SchoolLogo schoolId={school.id} size={250} />
          </div>

          <div className="md:col-span-8 space-y-5 text-center md:text-left">
            <span className={`inline-block text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase ${school.colorTheme.accent}`}>
              {school.type} Division
            </span>
            <h1 className="text-3xl md:text-5xl font-black font-serif text-white leading-tight">
              {school.name}
            </h1>
            <p className="text-gold-400 font-mono text-xs tracking-wider uppercase font-bold">
              "{school.tagline}"
            </p>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              {school.longDescription}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-400 pt-2">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-500" /> {school.id === "higher-secondary" ? "Jegadhabi, Karur" : "Karur, Tamil Nadu"}</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4 text-slate-500" /> Curriculum: {school.type}</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4 text-slate-500" /> 100% Board Pass clearance</span>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive school features & curriculum highlights */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">Syllabus Overview</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">Specific pedagogical models implemented on this campus for student enrichment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {school.highlights.map((item, id) => (
            <div key={id} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3 hover:bg-white/[0.04] transition-all">
              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-white/10">
                {id === 0 ? <BookOpen className="w-5 h-5 text-gold-400" /> : id === 1 ? <GraduationCap className="w-5 h-5 text-indigo-400" /> : <Trophy className="w-5 h-5 text-red-400" />}
              </div>
              <h4 className="font-extrabold text-sm text-white tracking-wide uppercase">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPORTS DETAILS ACADEMY (requested by user) */}
      <section className="py-12 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase flex items-center gap-1">
                <Dribbble className="w-4 h-4 text-gold-400" /> Athletics & Wellness Programs
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
                {sportsInfo.title}
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                {sportsInfo.description}
              </p>
            </div>
          </div>

          {/* Sports disciplines blocks */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            {sportsInfo.disciplines.map((d, index) => (
              <div
                key={index}
                className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col justify-between transition-all hover:bg-white/[0.04] hover:scale-[1.02]"
              >
                <div className="space-y-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: school.colorTheme.ribbonColor }} />
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">{d.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{d.details}</p>
                </div>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-4">KSV Sports division</span>
              </div>
            ))}
          </div>

          {/* PHOTOS GALLERY (requested by user) */}
          <div className="space-y-3 pt-6 border-t border-white/5">
            <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase font-semibold">Campus & Sports Gallery Photos</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sportsInfo.gallery.map((g, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/10 h-56 bg-slate-950">
                  <img
                    src={g.url}
                    alt={g.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                    <span className="text-white text-xs font-bold leading-tight uppercase font-mono">{g.title}</span>
                    <span className="text-slate-400 text-[10px] mt-1">{g.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CALLBACK SUB-SECTION */}
      <section className="py-12 max-w-4xl mx-auto px-4">
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-extrabold text-lg text-white font-serif">Apply for Spot Registration</h3>
            <p className="text-xs text-slate-400">Request phone verification counseling with {school.shortName}</p>
          </div>

          {!showInquiryForm ? (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowInquiryForm(true)}
                className="bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Launch Application Form
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setShowInquiryForm(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ← Clear registration
              </button>
              <AdmissionInquiry defaultSchoolId={school.id} onClose={() => setShowInquiryForm(false)} />
            </div>
          )}
        </div>
      </section>

      {/* Branch Contact footer */}
      <section className="py-8 border-t border-white/5 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1">
            <span className="font-bold text-white block">{school.name} Desk Contact Info:</span>
            <span>Tel: {school.contact.office} | Email: {school.contact.email}</span>
          </div>
          <span>Karur Saraswathi Vidhya Mandhirr Academics, Tamil Nadu </span>
        </div>
      </section>
    </div>
  );
}
