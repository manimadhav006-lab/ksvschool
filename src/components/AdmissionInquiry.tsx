import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ClipboardList, Send, PhoneCall, Sparkles, User, Mail, ShieldAlert, X, Calendar } from "lucide-react";
import { InquiryFormData } from "../types";
import { schoolsData } from "../data";

interface AdmissionInquiryProps {
  onClose?: () => void;
  defaultSchoolId?: string;
}

export default function AdmissionInquiry({ onClose, defaultSchoolId = "" }: AdmissionInquiryProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    studentName: "",
    parentName: "",
    phoneNumber: "",
    email: "",
    selectedSchool: defaultSchoolId || "cbse",
    grade: "Grade 6",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const grades = [
    "Nursery / LKG / UKG",
    "Grade 1 - 5",
    "Grade 6 - 8",
    "Grade 9 - 10",
    "Grade 11 - 12"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.phoneNumber) {
      alert("Please fill in the required parent and student details.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API connection
    setTimeout(() => {
      const generatedTicket = "KSV-" + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      
      // Save to localStorage for durable client persistence
      const savedInquiries = JSON.parse(localStorage.getItem("ksv_inquiries") || "[]");
      savedInquiries.push({
        ...formData,
        id: generatedTicket,
        date: new Date().toLocaleDateString(),
        status: "Callback Scheduled"
      });
      localStorage.setItem("ksv_inquiries", JSON.stringify(savedInquiries));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const selectedSchoolObj = schoolsData.find(s => s.id === formData.selectedSchool) || schoolsData[2];

  return (
    <div className="w-full text-slate-100">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="inquiry-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="flex items-center space-x-3 pb-2 border-b border-white/10">
              <ClipboardList className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="font-bold text-lg text-white">Admissions & Counseling Inquiry</h3>
                <p className="text-xs text-slate-400">Request a priority callback and offline campus visit schedules</p>
              </div>
            </div>

            {/* Selecting School Division */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select School Division *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {schoolsData.map((school) => (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, selectedSchool: school.id })}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                      formData.selectedSchool === school.id
                        ? "bg-primary-900/40 border-primary-500 text-white shadow-md shadow-primary-500/10"
                        : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
                    }`}
                  >
                    <div className="font-bold text-sm leading-tight">{school.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
                      {school.type.split(" ")[0]}
                    </div>
                    {formData.selectedSchool === school.id && (
                      <div className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-primary-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Student Detail fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Student Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-500 placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Target Grade *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none"
                  >
                    {grades.map((g) => (
                      <option key={g} value={g} className="bg-slate-950 text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid of Parent Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Parent / Guardian Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter parent's name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-500 placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Mobile Number *
                </label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-500 placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Optionals */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-500 placeholder-slate-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Questions or Admission Requirements (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="List any queries about curriculum, fee setups, transport channels, etc."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-primary-500 placeholder-slate-500 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/5 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-gold-500" />
                <span>We do not sell or share contact details.</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-gold-500/20 shadow-neutral-950 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Saving Inquire Slot...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Callback Request</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success-receipt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 px-4 space-y-5"
          >
            <div className="w-16 h-16 bg-gold-400/10 border border-gold-400/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 text-gold-400" />
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-2xl text-white tracking-tight">Callback Request Registered</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for inquiring with <span className="font-semibold text-gold-400 text-gradient font-serif">{selectedSchoolObj.name}</span>. Our student counselors will contact you within the next 24 business hours.
              </p>
            </div>

            {/* Receipt Ticket Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 inline-block text-left w-full max-w-md mx-auto font-mono text-xs text-slate-300 divide-y divide-white/5 space-y-2.5">
              <div className="flex justify-between pb-2">
                <span className="text-slate-500">REQUEST TICKET</span>
                <span className="font-bold text-slate-200">{ticketId}</span>
              </div>
              <div className="flex justify-between pt-2.5 pb-2">
                <span className="text-slate-500">STUDENT NAME</span>
                <span className="text-white font-medium">{formData.studentName}</span>
              </div>
              <div className="flex justify-between pt-2.5 pb-2">
                <span className="text-slate-500">PARENT NAME</span>
                <span className="text-white font-medium">{formData.parentName}</span>
              </div>
              <div className="flex justify-between pt-2.5 pb-2">
                <span className="text-slate-500">TARGET DIVISION</span>
                <span className="text-white font-medium uppercase font-sans tracking-wide">{selectedSchoolObj.shortName}</span>
              </div>
              <div className="flex justify-between pt-2.5">
                <span className="text-slate-500">CONTACT DIAL</span>
                <span className="text-gold-400 font-semibold">{formData.phoneNumber}</span>
              </div>
            </div>

            <div className="pt-2 text-slate-400 text-xs flex flex-col justify-center items-center gap-1.5">
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-gold-400" /> Pro-tip: Copy download pin to manage status anytime</span>
              <div className="flex gap-2.5 mt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-xs font-semibold"
                >
                  Create New Inquiry
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/15 transition-colors text-xs text-white font-semibold"
                  >
                    Close Window
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
