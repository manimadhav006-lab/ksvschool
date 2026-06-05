import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Multi-mock durable-like store in memory
const STATE_DB = {
  students: [
    {
      id: "STD001",
      name: "Arjun Kumar",
      class: "Grade 10 - CBSE",
      divisionId: "cbse",
      feesDue: 18500,
      feesPaid: 32000,
      feesLog: [
        { item: "Admission Fee", amount: 15000, date: "2026-04-10", method: "UPI-Bank" },
        { item: "Term 1 School Fee", amount: 17000, date: "2026-05-15", method: "Credit Card" }
      ],
      timetable: [
        { day: "Monday", periods: ["Mathematics", "English Literature", "Physics Lab", "Lunch break", "Social Sciences", "Civics"] },
        { day: "Tuesday", periods: ["Chemistry", "Mathematics", "English Literature", "Lunch break", "Computer Coding", "Creative Writing"] },
        { day: "Wednesday", periods: ["Yogic Mindfulness", "Biology", "Physics Lab", "Lunch break", "Mathematics", "Club Activities"] },
        { day: "Thursday", periods: ["Social Sciences", "Chemistry", "English Literature", "Lunch break", "Mathematics", "Physical Education"] },
        { day: "Friday", periods: ["Robotic Science", "Mathematics", "Languages Practice", "Lunch break", "Art & Craft", "Library Hours"] }
      ],
      attendancePercent: 94
    },
    {
      id: "STD002",
      name: "Deepika Raj",
      class: "Grade 12 - Higher Secondary",
      divisionId: "higher-secondary",
      feesDue: 8000,
      feesPaid: 45000,
      feesLog: [
        { item: "Term 1 Board Registration", amount: 20000, date: "2026-04-05", method: "Netbanking" },
        { item: "Laboratory Charges", amount: 25000, date: "2026-05-20", method: "UPI-GPAY" }
      ],
      timetable: [
        { day: "Monday", periods: ["Pure Physics", "Organic Chemistry", "Higher Mathematics", "Lunch break", "Bio-Botany", "Sanskrit/Tamil"] },
        { day: "Tuesday", periods: ["Organic Chemistry", "Environmental Prep", "Pure Physics", "Lunch break", "Higher Mathematics", "Athletics training"] },
        { day: "Wednesday", periods: ["Advanced Zoology", "Higher Mathematics", "Seminar Room", "Lunch break", "Organic Chemistry", "Revision tests"] },
        { day: "Thursday", periods: ["Pure Physics", "Bio-Botany", "Higher Mathematics", "Lunch break", "Mock Entrance Coach", "Sports Track"] },
        { day: "Friday", periods: ["General English", "Higher Mathematics", "Advanced Physics Lab", "Lunch break", "Organic Chemistry", "Yogic Session"] }
      ],
      attendancePercent: 98
    }
  ],
  staff: [
    {
      id: "STF001",
      name: "Mrs. Lakshmi Swamy",
      department: "Mathematics & Programming",
      classesCovered: ["Grade 10 - CBSE", "Grade 12 - Higher Secondary"],
      timetable: [
        { day: "Monday", periods: ["Grade 10 Math", "Grade 12 Algebra", "Faculty Prep", "Lunch break", "Grade 10 Lab Coordinator", "Counseling Session"] },
        { day: "Tuesday", periods: ["Free Period", "Grade 10 Geometry", "Grade 12 Complex Numbers", "Lunch break", "General Staff Meeting", "Remedial Coaching"] },
        { day: "Wednesday", periods: ["Grade 10 Math", "Grade 12 Trigonometry", "Special Seminar", "Lunch break", "Grade 10 Math", "Faculty Prep"] },
        { day: "Thursday", periods: ["Grade 10 Geometry", "Grade 12 Limits", "Remedial Help", "Lunch break", "Grade 10 Lab Coordinator", "Athletic supervisor"] },
        { day: "Friday", periods: ["Grade 10 Math", "Grade 12 Probability", "Grade 10 Coding class", "Lunch break", "Staff Circle Evaluation", "Free Hours"] }
      ],
      attendanceBook: [
        { date: "2026-06-03", className: "Grade 10 - CBSE", present: 28, absentCount: 2, absentees: ["Rahul", "Sreya"] },
        { date: "2026-06-04", className: "Grade 10 - CBSE", present: 29, absentCount: 1, absentees: ["Rahul"] }
      ]
    },
    {
      id: "STF002",
      name: "Mr. Vijay Raman",
      department: "Sciences & Sports",
      classesCovered: ["Grade 9 - CBSE", "Grade 12 - Higher Secondary"],
      timetable: [
        { day: "Monday", periods: ["Grade 12 Physics", "Grade 9 Chemistry", "Faculty Assembly", "Lunch break", "Board Board Lab Duty", "Coaching Track"] },
        { day: "Tuesday", periods: ["Grade 9 Physics", "Grade 12 Physical Prep", "Remedial Group", "Lunch break", "Board Physics", "Practical Exam Duty"] },
        { day: "Wednesday", periods: ["Grade 12 Laboratory", "Grade 12 Chemistry", "Staff Board Meeting", "Lunch break", "Track and Field Training", "Sports Club Room"] },
        { day: "Thursday", periods: ["Grade 9 Assembly", "Grade 12 Physics", "Remedial Hour", "Lunch break", "Practical Evaluation", "Board Physics"] },
        { day: "Friday", periods: ["Grade 9 Chemistry", "Grade 12 Physics Lab", "Club Organizer", "Lunch break", "Track and Field Training", "Evaluation Day"] }
      ],
      attendanceBook: [
        { date: "2026-06-04", className: "Grade 12 - Higher Secondary", present: 45, absentCount: 0, absentees: [] }
      ]
    }
  ],
  admin: {
    id: "ADM001",
    name: "Principal Vignesh",
    roles: ["Superintendent", "Academic Council Coordinator"],
    alerts: [
      "Annual Board Syllabus approval pending from Tamil Nadu Directorate.",
      "CBSE Affiliation extension survey scheduled on June 18, 2026.",
      "Sports Ground upgradation proposal needs budget approval."
    ]
  }
};

// Lazy initialization of Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ---------------------------------------------
// backend stateful API endpoints
// ---------------------------------------------

// Account logins
app.post("/api/login", (req, res) => {
  const { id, password } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Identification ID is required." });
  }

  // Handle common bypasses/checks for easier demo
  const checkPassword = password === "ksv123" || password === "admin";

  if (!checkPassword) {
    return res.status(401).json({ error: "Invalid password credential. Please use default passcode 'ksv123' to login." });
  }

  // Check categories
  const targetId = id.toUpperCase();
  if (targetId.startsWith("STD")) {
    const studentObj = STATE_DB.students.find(s => s.id === targetId);
    if (studentObj) {
      return res.json({ role: "student", user: studentObj });
    }
  } else if (targetId.startsWith("STF")) {
    const staffObj = STATE_DB.staff.find(s => s.id === targetId);
    if (staffObj) {
      return res.json({ role: "staff", user: staffObj });
    }
  } else if (targetId === "ADM001" || targetId === "ADMIN") {
    return res.json({ role: "admin", user: STATE_DB.admin });
  }

  return res.status(404).json({ error: `No active credential matches the ID '${targetId}'. Please use standard format: Student (STD001, STD002), Staff (STF001, STF002) or Admin (ADM001).` });
});

// Pay school fees
app.post("/api/fees/pay", (req, res) => {
  const { studentId, amount, item, method } = req.body;
  if (!studentId || !amount) {
    return res.status(400).json({ error: "Missing account ID or amount details." });
  }

  const student = STATE_DB.students.find(s => s.id === studentId.toUpperCase());
  if (!student) {
    return res.status(404).json({ error: "Associated student not found." });
  }

  const payAmt = parseFloat(amount);
  if (isNaN(payAmt) || payAmt <= 0) {
    return res.status(400).json({ error: "Invalid payment denomination." });
  }

  // Update mock balance
  student.feesDue = Math.max(0, student.feesDue - payAmt);
  student.feesPaid += payAmt;
  student.feesLog.unshift({
    item: item || "Quarter Term Tuition Fee",
    amount: payAmt,
    date: new Date().toISOString().split("T")[0],
    method: method || "UPI Pay"
  });

  return res.json({ success: true, message: "Transaction processed successfully", user: student });
});

// Save school attendance sheet (Entered or updated by staffs)
app.post("/api/attendance", (req, res) => {
  const { staffId, className, absentees, presentCount, date } = req.body;
  if (!staffId || !className) {
    return res.status(400).json({ error: "Incomplete attendance manifest parameters." });
  }

  const teacher = STATE_DB.staff.find(t => t.id === staffId.toUpperCase());
  if (!teacher) {
    return res.status(404).json({ error: "Associated teacher ID not found in system registers." });
  }

  const newEntry = {
    date: date || new Date().toISOString().split("T")[0],
    className,
    present: parseInt(presentCount) || 30,
    absentCount: Array.isArray(absentees) ? absentees.length : 0,
    absentees: Array.isArray(absentees) ? absentees : []
  };

  teacher.attendanceBook.unshift(newEntry);
  return res.json({ success: true, message: "Attendance registered into records.", book: teacher.attendanceBook });
});

// IA Chatbot proxy
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Instruction messages block is required." });
  }

  const lastUserText = messages[messages.length - 1]?.content || "";

  // Check if real API key is ready
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key === "MOCK_KEY") {
    // Elegant fallback with educational context-aware rule when API key isn't provided
    const textLower = lastUserText.toLowerCase();
    let mockReplyByPrincipal = "Greetings from KSV Academic Counselor. How may I support your child's educational roadmap?";
    if (textLower.includes("fee") || textLower.includes("payment")) {
      mockReplyByPrincipal = "Regarding school fees: Term structures can easily be viewed and settled in real-time by logging into our Student Portal with ID 'STD001' or 'STD002' using default credentials. For custom schedules, please query our desks.";
    } else if (textLower.includes("admission") || textLower.includes("join") || textLower.includes("vacancy")) {
      mockReplyByPrincipal = "General admissions are currently open for 2026-2027! Please fill out our Callback Slot Inquiry form in the Admissions section. You will receive an immediate counselor ticket.";
    } else if (textLower.includes("syllabus") || textLower.includes("cbse") || textLower.includes("class")) {
      mockReplyByPrincipal = "Excellent query. KSV Group provides dual curricula across divisions: CBSE (Karur) focusing on comprehensive STEM preparedness and State Secondary (Jegadhabi) covering Board excellence.";
    } else if (textLower.includes("sports") || textLower.includes("game") || textLower.includes("coach")) {
      mockReplyByPrincipal = "Our athletic ecosystem includes professional cricket academies, volleyball/kabaddi setups, expansive running tracks, and weekly yogic wellness session frameworks across all three campuses.";
    } else if (textLower.includes("transport") || textLower.includes("bus")) {
      mockReplyByPrincipal = "Yes, KSV houses a secure bus fleet covering the entire residential corridor of Karur, Jgadhabi, and neighborhood sectors. Our staff helpers secure child tracking on every trip.";
    } else if (textLower.includes("login") || textLower.includes("timetable") || textLower.includes("attendance")) {
      mockReplyByPrincipal = "Students and teaching staff have specialized credentials. Login as student using 'STD001' (CBSE Grade 10) or staff using 'STF001' (Mrs. Lakshmi Swamy) with default passcode 'ksv123'.";
    }

    return res.json({
      text: mockReplyByPrincipal + " (Offline Advisor simulation mode active. Connect your Gemini API Key in Settings > Secrets to activate real-time intelligence!)"
    });
  }

  try {
    const client = getGeminiClient();
    
    // Construct rich system prompt outlining KSV context
    const ksvSystemBackground = `You are "Aditya", the expert AI Academic Counselor and Assistant representing the prestigious KSV Group Of Schools in Karur and Jegadhabi, Tamil Nadu. 
Your tone is professional, inviting, reassuring, and highly supportive.

Here is the exact information of KSV Group of Schools you represent:
1. Three Specialized divisions to select:
   - KSV Nursery And Primary (Karur): Play-based exploration, music, clay modeling, creative arts, and individual portfolios. Focuses on young learners with care. Contact: +91 9489927662. Email: ksvnpschool@gmail.com.
   - KSV Higher Secondary (Jegadhabi, Karur): Classes 6 to 12. State board curriculum, scientific training prep, elite athletics coaching, modern biology/chemistry/physics labs. Contact: +91 9489927665. Email: ksvschools@gmail.com.
   - KSVM CBSE (Karur): Karur Saraswathi Vidhya Mandhirr. CBSE Central curriculum framework, smart digital projection classrooms, robotic coding clubs, yogic mindfulness, public speaking. Contact: +91 9489927664. Email: ksvmcbse@gmail.com.
2. Core Values & Infrastructure standard: Spacious clean campuses, 100% board clearance records, top regional selections, expert staff.
3. Admissions of 2026-2027 are fully active and users can register callbacks on the website's admissions panel easily.
4. Portal details:
   - Student login is possible using Register ID 'STD001' or 'STD002' with pass 'ksv123'. They can view timetables and settle tuition fees online.
   - Staff login is possible using Teacher ID 'STF001' or 'STF002' with pass 'ksv123'. They can take student attendance or review teaching schedules.

Respond to parent and student queries precisely, professionally, and in structured bullet points where needed. Do not mention system paths, codes, or mock databases unless requested. Offer warm support for Tamil Nadu region education. Keep answers concise.`;

    const recentChatList = messages.map(m => {
      return `${m.role === "user" ? "User" : "Counselor"}: ${m.content}`;
    }).join("\n");

    const promptMessage = `System Background Context:
${ksvSystemBackground}

Recent Chat Conversation:
${recentChatList}

Counselor Aditya:`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptMessage,
      config: {
        temperature: 0.7,
        systemInstruction: "You are Aditya, the virtual counselor of KSV Group of Schools."
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini processing error:", error);
    return res.status(500).json({ error: "Gemini server endpoint failed. Fallback simulation available." });
  }
});


// Vite Dev configuration / Production Static Distribution flow
async function startAppServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[KSV Server] Active and routing from port ${PORT}`);
  });
}

startAppServer();
