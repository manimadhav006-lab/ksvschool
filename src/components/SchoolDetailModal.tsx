import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Phone, Mail, Award, Clock, ArrowRight, BookOpen, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { SchoolInfo } from "../types";
import SchoolLogo from "./SchoolLogo";
import AdmissionInquiry from "./AdmissionInquiry";

interface SchoolDetailModalProps {
  school: SchoolInfo;
  onClose: () => void;
}

export default function SchoolDetailModal({ school, onClose }: SchoolDetailModalProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  // Icon mapping helper
  const getHighlightIcon = (index: number) => {
    switch (index) {
      case 0:
        return <BookOpen className={`w-5 h-5 ${school.colorTheme.secondary}`} />;
      case 1:
        return <GraduationCap className={`w-5 h-5 ${school.colorTheme.secondary}`} />;
      default:
        return <Award className={`w-5 h-5 ${school.colorTheme.secondary}`} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Modal Card content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 shadow-2xl z-10 flex flex-col md:flex-row"
      >
        {/* Decorative background glow */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-[100px] pointer-events-none opacity-40 -z-10"
          style={{ background: school.colorTheme.bgGlow }}
        />

        {/* Left column / Top cover: Visual Branding */}
        <div className="w-full md:w-[35%] bg-slate-950/40 p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 relative">
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <SchoolLogo schoolId={school.id} size={230} className="mb-6" />

          <div className="text-center space-y-2">
            <span className={`inline-block text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full ${school.colorTheme.accent}`}>
              {school.type}
            </span>
            <h3 className="font-extrabold text-xl text-white font-serif">{school.name}</h3>
            <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {school.id === "higher-secondary" ? "Jegadhabi, Karur" : "Karur, Tamil Nadu"}
            </p>
          </div>
        </div>

        {/* Right column: Details and interactive sections */}
        <div className="flex-1 p-6 md:p-8 flex flex-col">
          {/* Desktop close button */}
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            {!showInquiryForm ? (
              <motion.div
                key="details-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col"
              >
                {/* Header */}
                <div className="space-y-2">
                  <h4 className="text-lg md:text-xl font-bold font-serif text-white tracking-tight">
                    "{school.tagline}"
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {school.longDescription}
                  </p>
                </div>

                {/* Core Bullet points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {school.bulletPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center space-x-2.5"
                    >
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: school.colorTheme.ribbonColor }} />
                      <span className="text-xs font-bold text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Academic highlights / Features specific to school */}
                <div className="space-y-3">
                  <h5 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Syllabus & Curriculum Highlights
                  </h5>
                  <div className="grid grid-cols-1 gap-3">
                    {school.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex space-x-3.5 hover:bg-white/[0.05] transition-colors"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getHighlightIcon(index)}
                        </div>
                        <div>
                          <h6 className="text-sm font-semibold text-white">{highlight.title}</h6>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contacts quick action line */}
                <div className="pt-4 border-t border-white/5 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex gap-4 w-full sm:w-auto overflow-x-auto py-1">
                    <a
                      href={`tel:${school.contact.office}`}
                      className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{school.contact.office}</span>
                    </a>
                    <a
                      href={`mailto:${school.contact.email}`}
                      className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span>{school.contact.email}</span>
                    </a>
                  </div>

                  <button
                    onClick={() => setShowInquiryForm(true)}
                    className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 px-6 py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-gold-500/20 cursor-pointer"
                  >
                    <span>Inquire Admissions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="inquiry-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowInquiryForm(false)}
                    className="text-xs flex items-center space-x-1.5 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <span>← Back to details</span>
                  </button>
                  <span className="flex items-center gap-1 text-[11px] text-gold-400 font-medium">
                    <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" /> Live Enrollment Portal
                  </span>
                </div>

                <AdmissionInquiry
                  defaultSchoolId={school.id}
                  onClose={() => setShowInquiryForm(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
