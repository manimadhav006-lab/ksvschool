import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Lock,
  Calendar,
  Wallet,
  ClipboardList,
  ChevronRight,
  TrendingUp,
  FileCheck,
  CreditCard,
  CheckCircle,
  LogOut,
  Send,
  AlertTriangle,
  FileText,
  UserCheck,
  Users,
  Award,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface PortalSessionProps {
  onSessionChange?: (user: any, role: string | null) => void;
}

export default function PortalSession({ onSessionChange }: PortalSessionProps) {
  // session states
  const [role, setRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [targetId, setTargetId] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Student specific interactives
  const [payAmount, setPayAmount] = useState("");
  const [feeItem, setFeeItem] = useState("Quarterly Term Fee");
  const [payMethod, setPayMethod] = useState("UPI Pay");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState<any>(null);

  // Staff specific interactives
  const [activeAttendanceClass, setActiveAttendanceClass] = useState("Grade 10 - CBSE");
  const [presentCount, setPresentCount] = useState("28");
  const [absenteesText, setAbsenteesText] = useState("Rahul, Sreya");
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);

  // Active sub-sections
  const [activeTab, setActiveTab] = useState("timetable"); // 'timetable' or 'fees' or 'attendance'
  const [activeDay, setActiveDay] = useState("Monday");

  // Suggest pre-fills for easy demo clicks
  const quickAccounts = [
    { label: "Student (CBSE)", id: "STD001", role: "student" },
    { label: "Student (State HS)", id: "STD002", role: "student" },
    { label: "Faculty (Maths)", id: "STF001", role: "staff" },
    { label: "Academic Admin", id: "ADM001", role: "admin" }
  ];

  const handleLogin = async (e: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    setErrorText("");
    setIsSubmitting(true);

    const loginId = customId || targetId;
    const loginPass = customId ? "ksv123" : password;

    if (!loginId || !loginPass) {
      setErrorText("Please enter both ID and passcode.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: loginId, password: loginPass })
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorText(data.error || "Authentication failed.");
      } else {
        setRole(data.role);
        setUserData(data.user);
        if (data.role === "student") {
          setActiveTab("timetable");
        } else if (data.role === "staff") {
          setActiveTab("attendance");
        } else {
          setActiveTab("admin");
        }
        if (onSessionChange) onSessionChange(data.user, data.role);
      }
    } catch (err) {
      setErrorText("Connecting to login microservice failed. Check if server is online.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (id: string) => {
    setTargetId(id);
    setPassword("ksv123");
    setErrorText("");
    // We execute directly
    setTimeout(() => {
      const mockEvent = { preventDefault: () => {} } as React.FormEvent;
      handleLogin(mockEvent, id);
    }, 100);
  };

  const handleLogout = () => {
    setRole(null);
    setUserData(null);
    setTargetId("");
    setPassword("");
    setErrorText("");
    setPaymentSuccess(false);
    setAttendanceSuccess(false);
    if (onSessionChange) onSessionChange(null, null);
  };

  // Pay fees endpoint
  const handlePayFees = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payAmount || parseFloat(payAmount) <= 0) {
      alert("Please specify a valid payment amount.");
      return;
    }

    try {
      const res = await fetch("/api/fees/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: userData.id,
          amount: parseFloat(payAmount),
          item: feeItem,
          method: payMethod
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUserData(data.user);
        setCopiedReceipt({
          id: "TXN-" + Math.floor(100000 + Math.random() * 900000),
          amount: payAmount,
          item: feeItem,
          method: payMethod,
          date: new Date().toLocaleDateString()
        });
        setPaymentSuccess(true);
        setPayAmount("");
      } else {
        alert(data.error || "Payment routing error.");
      }
    } catch (err) {
      alert("Payment processing network error.");
    }
  };

  // Staff Submit Attendance endpoint
  const handleSubmitAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const arr = absenteesText.split(",").map(s => s.trim()).filter(Boolean);
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffId: userData.id,
          className: activeAttendanceClass,
          absentees: arr,
          presentCount: parseInt(presentCount) || 30,
          date: new Date().toISOString().split("T")[0]
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUserData({ ...userData, attendanceBook: data.book });
        setAttendanceSuccess(true);
        setTimeout(() => setAttendanceSuccess(false), 4500);
      } else {
        alert(data.error || "Save error.");
      }
    } catch (e) {
      alert("Attendance save network error.");
    }
  };

  return (
    <div className="w-full text-slate-100 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!role ? (
          /* LOGIN FORM COMPONENT */
          <motion.div
            key="login-desk"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative"
          >
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">KSV Academic Platform</span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">Portal Gateway</h3>
              <p className="text-xs text-slate-400">Secure entry for Students, Staff coaches, and School Admins</p>
            </div>

            {errorText && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
                {errorText}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Registration / Staff ID *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. STD001, STF001, ADM001"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-gold-400 transition-colors uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Passcode PIN *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="Use default password 'ksv123'"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-gold-500/15 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? "Authenticating..." : "Sign In to Portal"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Pre-fills Grid */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">💡 Quick Login Accounts</span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {quickAccounts.map((acc, k) => (
                  <button
                    key={k}
                    onClick={() => handleQuickLogin(acc.id)}
                    className="p-2 border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 text-left text-slate-300 hover:text-white transition-all cursor-pointer font-mono"
                  >
                    <div className="font-bold text-white leading-none mb-1">{acc.label}</div>
                    <div className="text-gold-400 text-[8px] tracking-wide">ID: {acc.id} • PASS: ksv123</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* PORTAL DASHBOARDS */
          <motion.div
            key="dashboard-desk"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="w-full bg-slate-900 border border-white/10 rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Header branding */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] tracking-widest font-mono text-gold-400 uppercase">
                  Connected as {role?.toUpperCase()}
                </span>
                <h4 className="text-lg sm:text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  {userData.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {role === "student" && `Class: ${userData.class} | Register ID: ${userData.id}`}
                  {role === "staff" && `Dept: ${userData.department} | Staff Code: ${userData.id}`}
                  {role === "admin" && `Role: ${userData.roles.join(", ")} | Authority Code: ${userData.id}`}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center space-x-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>

            {/* 1. STUDENT VIEW */}
            {role === "student" && (
              <div className="space-y-6">
                {/* Navigation Tab toggler */}
                <div className="flex border-b border-white/5">
                  <button
                    onClick={() => setActiveTab("timetable")}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all col-span-1 ${
                      activeTab === "timetable"
                        ? "border-gold-500 text-gold-400"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    My Class Timetable
                  </button>
                  <button
                    onClick={() => setActiveTab("fees")}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all col-span-1 ${
                      activeTab === "fees"
                        ? "border-gold-500 text-gold-400"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    Fee Ledger & Payment Desk
                  </button>
                </div>

                {/* Sub-tab 1: Timetable */}
                {activeTab === "timetable" && (
                  <div className="space-y-4">
                    {/* Day selector tabs */}
                    <div className="flex bg-slate-950/40 p-1 rounded-xl gap-1 overflow-x-auto">
                      {userData.timetable.map((t: any) => (
                        <button
                          key={t.day}
                          onClick={() => setActiveDay(t.day)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex-1 text-center cursor-pointer ${
                            activeDay === t.day
                              ? "bg-gold-500 text-slate-950"
                              : "hover:bg-white/5 text-slate-300"
                          }`}
                        >
                          {t.day}
                        </button>
                      ))}
                    </div>

                    {/* Timeline Periods block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {(userData.timetable.find((t: any) => t.day === activeDay)?.periods || []).map((period: string, idx: number) => {
                        const isLunch = period.toLowerCase().includes("lunch");
                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border flex flex-col space-y-1 relative overflow-hidden transition-all hover:scale-[1.02] ${
                              isLunch
                                ? "bg-slate-950/20 border-white/5 opacity-55 text-center items-center justify-center"
                                : "bg-white/[0.02] border-white/10"
                            }`}
                          >
                            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">PERIOD {idx + 1}</span>
                            <span className={`font-extrabold text-sm ${isLunch ? "text-slate-400" : "text-white"}`}>{period}</span>
                            <span className="text-[10px] text-slate-400 truncate">
                              {isLunch ? "Break: 12:30PM - 1:15PM" : `Subject Section Group`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: Fees Ledger & Payment Desk */}
                {activeTab === "fees" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Ledgers and Payments Form columns */}
                    <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-4">
                      <h5 className="font-bold text-sm tracking-wide text-white uppercase border-b border-white/5 pb-2">KSV School Fee Payment Gate</h5>
                      
                      <form onSubmit={handlePayFees} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Fee Purpose / Description</label>
                            <select
                              value={feeItem}
                              onChange={(e) => setFeeItem(e.target.value)}
                              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                            >
                              <option value="Quarterly Term Fee">Quarterly Term Tuition Fee</option>
                              <option value="Special Activity & Coding Club Setup">Special Activity & Coding Club Setup</option>
                              <option value="Board Laboratory Fees">Board Laboratory Fees</option>
                              <option value="Athletic Uniforms & Equipment">Athletic Uniforms & Equipment</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Amount to settle (INR) *</label>
                            <input
                              type="number"
                              required
                              placeholder="e.g. 5000"
                              value={payAmount}
                              onChange={(e) => setPayAmount(e.target.value)}
                              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400 font-mono font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Integrated Payment Route</label>
                          <div className="grid grid-cols-3 gap-2">
                            {["UPI Pay", "GPAY UPI", "Card Settle"].map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setPayMethod(method)}
                                className={`px-2 py-2 rounded-xl border text-[10px] font-bold text-center transition-all ${
                                  payMethod === method
                                    ? "bg-primary-900/30 border-primary-500 text-white"
                                    : "bg-transparent border-white/5 text-slate-400"
                                }`}
                              >
                                {method}
                              </button>
                            ))}
                          </div>
                        </div>

                        {payMethod === "Card Settle" && (
                          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2.5 text-left">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block"><CreditCard className="inline w-3 h-3 text-gold-400 mr-1" /> Mock Card Processor</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <input
                                type="text"
                                placeholder="16 Digit card"
                                className="col-span-1 sm:col-span-2 bg-slate-950 border border-white/10 rounded-lg p-1.5 text-[10px] text-white focus:outline-none font-mono"
                              />
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="bg-slate-950 border border-white/10 rounded-lg p-1.5 text-[10px] text-white focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-green-950/20"
                        >
                          <Wallet className="w-4 h-4" />
                          <span>Authorize Simulation Settle</span>
                        </button>
                      </form>

                      {/* Payment Success Ticket */}
                      <AnimatePresence>
                        {paymentSuccess && copiedReceipt && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-emerald-500/15 border border-emerald-500/20 rounded-xl space-y-2 text-[11px] text-slate-200"
                          >
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                              <CheckCircle className="w-4 h-4" />
                              <span>Transaction Authorized and Settled!</span>
                            </div>
                            <div className="bg-slate-950/40 p-3 rounded-lg space-y-1 text-slate-300 font-mono">
                              <div className="flex justify-between">
                                <span className="text-slate-500">RECEIPT NO</span>
                                <span className="text-slate-100 font-bold">{copiedReceipt.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">PAY AMOUNT</span>
                                <span className="text-emerald-400 font-bold">₹{copiedReceipt.amount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">PURPOSE</span>
                                <span className="text-slate-100">{copiedReceipt.item}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">DATE RECORD</span>
                                <span className="text-slate-100">{copiedReceipt.date}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Dues balances right side */}
                    <div className="lg:col-span-5 space-y-4">
                      {/* Financial statistics panel */}
                      <div className="bg-indigo-950/35 border border-indigo-500/20 rounded-2xl p-5 space-y-4">
                        <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase">General Ledger Summary</span>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-bold">Paid Dues</span>
                            <span className="text-2xl font-black text-emerald-400 font-mono">₹{userData.feesPaid}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block font-bold">Outstanding</span>
                            <span className="text-2xl font-black text-rose-400 font-mono">₹{userData.feesDue}</span>
                          </div>
                        </div>

                        {/* Visual fill gauge */}
                        <div className="space-y-1 pt-2">
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>Syllabus Term Settlement</span>
                            <span className="font-bold text-white">
                              {Math.round((userData.feesPaid / (userData.feesPaid + userData.feesDue)) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-white/5">
                            <div
                              className="bg-emerald-500 h-full transition-all duration-500"
                              style={{ width: `${(userData.feesPaid / (userData.feesPaid + userData.feesDue)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Transaction Log and Receipts */}
                      <div className="border border-white/10 bg-slate-950/20 rounded-2xl p-5 space-y-3">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">Past Online Payments Logs</span>
                        <div className="space-y-2 h-[150px] overflow-y-auto pr-1">
                          {userData.feesLog.map((log: any, index: number) => (
                            <div key={index} className="p-2 bg-white/5 border border-white/5 rounded-lg flex justify-between items-center text-[10px] font-mono">
                              <div>
                                <span className="font-bold text-white block truncate max-w-[150px]">{log.item}</span>
                                <span className="text-slate-500 text-[8px]">{log.date} | Route: {log.method}</span>
                              </div>
                              <span className="font-bold text-emerald-400">₹{log.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* 2. STAFF VIEW */}
            {role === "staff" && (
              <div className="space-y-6">
                {/* Navigation Tab toggler */}
                <div className="flex border-b border-white/5">
                  <button
                    onClick={() => setActiveTab("attendance")}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all col-span-1 ${
                      activeTab === "attendance"
                        ? "border-gold-500 text-gold-400"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    Take Student Attendance
                  </button>
                  <button
                    onClick={() => setActiveTab("timetable")}
                    className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 px-4 transition-all col-span-1 ${
                      activeTab === "timetable"
                        ? "border-gold-500 text-gold-400"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    My Teaching Schedule
                  </button>
                </div>

                {/* Sub-tab 1: Take Student Attendance */}
                {activeTab === "attendance" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Interactive Register Form */}
                    <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-sm tracking-wide text-white uppercase">Daily Attendance Matrix</h5>
                        <span className="flex items-center gap-1 text-[10px] text-gold-400 font-medium">
                          <UserCheck className="w-3.5 h-3.5" /> Classroom verification desk
                        </span>
                      </div>

                      <form onSubmit={handleSubmitAttendance} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Class *</label>
                            <select
                              value={activeAttendanceClass}
                              onChange={(e) => setActiveAttendanceClass(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400"
                            >
                              {userData.classesCovered.map((cl: string) => (
                                <option key={cl} value={cl}>{cl}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Number of Present Students *</label>
                            <input
                              type="number"
                              required
                              placeholder="e.g. 29"
                              value={presentCount}
                              onChange={(e) => setPresentCount(e.target.value)}
                              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-400 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Absentees Student Names (comma separated)</label>
                          <input
                            type="text"
                            placeholder="e.g. Rahul, Sreya"
                            value={absenteesText}
                            onChange={(e) => setAbsenteesText(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Attendance Records</span>
                        </button>
                      </form>

                      {/* Instant success toast */}
                      <AnimatePresence>
                        {attendanceSuccess && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 bg-emerald-500/15 border border-emerald-500/20 rounded-xl text-[11px] text-slate-300 flex items-center gap-2"
                          >
                            <CheckCircle className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                            <span>Successfully written attendance for <span className="font-bold text-white">{activeAttendanceClass}</span> to academic database.</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Attendance past log records */}
                    <div className="lg:col-span-5 border border-white/10 bg-slate-950/20 rounded-2xl p-5 space-y-4">
                      <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold block">My Attendance Register Class History</span>
                      
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                        {userData.attendanceBook.map((log: any, idx: number) => (
                          <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white">{log.className}</span>
                              <span className="text-[9px] font-mono text-slate-500">{log.date}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-semibold pt-1 border-t border-white/5">
                              <div className="text-emerald-400">Present Count: {log.present}</div>
                              <div className="text-rose-400">Absentees: {log.absentCount}</div>
                            </div>
                            {log.absentees.length > 0 && (
                              <div className="text-[9px] text-slate-500 truncate">
                                Names: {log.absentees.join(", ")}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* Sub-tab 2: Staff Timetable */}
                {activeTab === "timetable" && (
                  <div className="space-y-4">
                    {/* Day selector tabs */}
                    <div className="flex bg-slate-950/40 p-1 rounded-xl gap-1 overflow-x-auto">
                      {userData.timetable.map((t: any) => (
                        <button
                          key={t.day}
                          onClick={() => setActiveDay(t.day)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex-1 text-center cursor-pointer ${
                            activeDay === t.day
                              ? "bg-gold-500 text-slate-950"
                              : "hover:bg-white/5 text-slate-300"
                          }`}
                        >
                          {t.day}
                        </button>
                      ))}
                    </div>

                    {/* Timeline Periods block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {(userData.timetable.find((t: any) => t.day === activeDay)?.periods || []).map((period: string, idx: number) => {
                        const isLunch = period.toLowerCase().includes("lunch");
                        const isFree = period.toLowerCase().includes("free");
                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border flex flex-col space-y-1 relative overflow-hidden transition-all hover:scale-[1.02] ${
                              isLunch || isFree
                                ? "bg-slate-950/20 border-white/5 opacity-55 text-center items-center justify-center"
                                : "bg-white/[0.02] border-white/10 shadow-md"
                            }`}
                          >
                            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">PERIOD {idx + 1}</span>
                            <span className={`font-extrabold text-sm ${isLunch || isFree ? "text-slate-400" : "text-white"}`}>{period}</span>
                            <span className="text-[10px] text-slate-400 truncate">
                              {isLunch ? "Scheduled Break" : isFree ? "Faculty Rest Period" : `Assigned Lecture Hall`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. ADMIN VIEW */}
            {role === "admin" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-3 border-b border-white/5">
                  <UserCheck className="w-5 h-5 text-gold-400" />
                  <h5 className="font-bold text-sm tracking-wide text-white uppercase">KSV Administration Core Console</h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Registered Callbacks */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Registered inquiries</span>
                    <span className="text-3xl font-black text-gold-400 font-mono">14 Callback Slots</span>
                    <span className="text-[10px] text-slate-400 block pt-1 border-t border-white/5 font-semibold">100% scheduled counseling desk</span>
                  </div>

                  {/* Card 2: Tuition Settled */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Term Tuition Settlments</span>
                    <span className="text-3xl font-black text-emerald-400 font-mono">₹77,000 INR</span>
                    <span className="text-[10px] text-slate-400 block pt-1 border-t border-white/5 font-semibold font-mono">Completed UPI/Card Authorizations</span>
                  </div>

                  {/* Card 3: Board extension status */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Accreditation Affiliation</span>
                    <span className="text-lg font-black text-white block uppercase flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500 inline" /> Dual-Board active
                    </span>
                    <span className="text-[10px] text-slate-400 block pt-1 border-t border-white/5">Affiliation: CBSE & State Secondary</span>
                  </div>
                </div>

                {/* Administration Alert Bullet Ticker */}
                <div className="border border-white/10 bg-slate-950/40 rounded-2xl p-5 space-y-3 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold block flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-indigo-400 animate-pulse" /> Board Directives & Academic Alerts
                  </span>
                  <ul className="space-y-3 text-xs text-slate-300">
                    {userData.alerts.map((alItem: string, i: number) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <span className="h-2 w-2 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                        <span className="leading-relaxed">{alItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
