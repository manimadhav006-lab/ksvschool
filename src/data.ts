import { SchoolInfo, FeatureCard } from "./types";

export const schoolsData: SchoolInfo[] = [
  {
    id: "nursery-and-primary",
    name: "KSV Nursery And Primary",
    shortName: "KSV School",
    type: "NURSERY & PRIMARY",
    tagline: "Building strong foundations for young learners with creativity and care",
    longDescription: "Our Nursery and Primary division specializes in early childhood education. We utilize creative, play-based methodologies coupled with close individual attention to ignite a lifelong passion for learning. Our campus provides a warm, nurturing environment where kids feel safe to explore, discover, and express their innate talents.",
    bulletPoints: [
      "Play-based Learning",
      "Individual Attention",
      "Creative Arts"
    ],
    highlights: [
      {
        title: "Holistic Play-based Curriculum",
        description: "Engaging interactive tasks, sensory blocks, and language games designed to stimulate cognitive growth naturally."
      },
      {
        title: "Individual Academic Portfolios",
        description: "Personalized tracking of learning benchmarks ensuring every child progresses at their optimal comfortable pace."
      },
      {
        title: "Vibrant Creative Focus",
        description: "Weekly specialized sessions in music, painting, clay modeling, and expressive crafts to inspire artistic expression."
      }
    ],
    contact: {
      office: "+91 9489927662",
      whatsapp: "+91 9489927662",
      email: "ksvnpschool@gmail.com"
    },
    colorTheme: {
      primary: "from-amber-500 to-orange-600",
      secondary: "text-amber-500",
      accent: "bg-amber-500/10 border-amber-500/30 text-amber-500",
      bgGlow: "rgba(245, 158, 11, 0.15)",
      ribbonColor: "#F59E0B"
    }
  },
  {
    id: "higher-secondary",
    name: "KSV Higher Secondary",
    shortName: "KSV Higher Secondary",
    type: "CLASSES 6 TO 12",
    tagline: "Empowering students for academic excellence and future success",
    longDescription: "KSV Higher Secondary School (Classes 6 to 12) primes students for rigorous academic benchmarks and future career pathways. We deliver state-approved and competitive preparation programs integrated with professional laboratory exposure, strong scientific foundations, and dynamic athletic infrastructure.",
    bulletPoints: [
      "Advanced Curriculum",
      "Modern Laboratories",
      "World Class Sports Facilities"
    ],
    highlights: [
      {
        title: "Comprehensive Scientific Training",
        description: "In-depth experiential curriculum backed by modern experimental infrastructure and experienced teachers."
      },
      {
        title: "High-Caliber Labs",
        description: "Dedicated high-performance physics, chemistry, biology, and computer science spaces for practical investigation."
      },
      {
        title: "Elite Athletic Ecosystem",
        description: "Expansive tracks, courts, and expert athletic coaching encouraging teamwork, endurance, and physical wellness."
      }
    ],
    contact: {
      office: "+91 9489927665",
      whatsapp: "+91 9489927665",
      email: "ksvschools@gmail.com"
    },
    colorTheme: {
      primary: "from-pink-500 to-rose-600",
      secondary: "text-pink-500",
      accent: "bg-pink-500/10 border-pink-500/30 text-pink-500",
      bgGlow: "rgba(244, 63, 94, 0.15)",
      ribbonColor: "#EC4899"
    }
  },
  {
    id: "cbse",
    name: "KSVM CBSE",
    shortName: "KSVM School",
    type: "CENTRAL BOARD OF SECONDARY EDUCATION",
    tagline: "Comprehensive education following the national curriculum framework",
    longDescription: "KSVM School (Karur Saraswathi Vidhya Mandhirr) follows the nationally recognized central board structure, promoting creative problem solving, mental agility, digital literacy, and holistic personality development. We prepare global citizens with rooted cultural ethics and futuristic competencies.",
    bulletPoints: [
      "CBSE Curriculum",
      "Smart Classrooms",
      "Holistic Development"
    ],
    highlights: [
      {
        title: "Nationally Strategic Academic Model",
        description: "CBSE curriculum framework promoting deep thematic understanding, scientific temper, and digital readiness."
      },
      {
        title: "Next-Get Smart Learning",
        description: "Fully digital classrooms featuring advanced visual projection, interactive displays, and connected workspaces."
      },
      {
        title: "Balanced Personality Growth",
        description: "Extensive co-curricular choices including public speaking, robotic code clubs, fine arts, and yogic mindfulness."
      }
    ],
    contact: {
      office: "+91 9489927664",
      whatsapp: "+91 9489927664",
      email: "ksvmcbse@gmail.com"
    },
    colorTheme: {
      primary: "from-sky-500 to-blue-600",
      secondary: "text-sky-500",
      accent: "bg-sky-500/10 border-sky-500/30 text-sky-500",
      bgGlow: "rgba(14, 165, 233, 0.15)",
      ribbonColor: "#0EA5E9"
    }
  }
];

export const featuresData: FeatureCard[] = [
  {
    title: "Our Campus",
    iconName: "School",
    description: "State-of-the-art facilities designed for comprehensive learning",
    longDescription: "Spacious, climate-controlled classrooms equipped with ergonomic furniture, digital learning aids, safe purified water systems, and security surveillance networks safeguarding continuous child development."
  },
  {
    title: "Expert Faculty",
    iconName: "GraduationCap",
    description: "Dedicated teachers committed to student excellence",
    longDescription: "Our educators hold advanced pedagogical qualifications and undergo periodical training in creative student engagement, socio-emotional coaching, and modern technological class methodologies."
  },
  {
    title: "Proven Results",
    iconName: "Award",
    description: "Consistent academic achievements and student success",
    longDescription: "Year-on-year 100% board clearance rates accompanied by top regional ranks and student selections in esteemed engineering, medicine, arts and technological degree systems."
  }
];

export const faqData = [
  {
    question: "How do I choose between State Board (Higher Secondary) and CBSE?",
    answer: "The State Board curriculum provides robust preparatory training aligned strictly to regional engineering and medical admission syllabus, while TS/CBSE emphasizes interactive problem-solving, logical schemas, and competitive aptitude structures ideal for national entrance. Our counselors can map your goals to guide you."
  },
  {
    question: "What are the school operating hours across divisions?",
    answer: "Nursery classes run from 9:00 AM to 12:30 PM. Primary operates from 9:00 AM to 3:30 PM. Higher Secondary and CBSE operate from 8:45 AM to 4:10 PM, with scheduled breaks for nutritious meals and activities."
  },
  {
    question: "Is school transportation available for kids in Karur and Jegadhabi?",
    answer: "Yes, we run a secure fleet of modern school buses covering all major residential corridors inside Karur, Jegadhabi, and regional suburban routes, managed by trained drivers and alert helpers with GPS feedback."
  },
  {
    question: "Are there immediate intake vacancies for the current academic session?",
    answer: "Vacancies vary depending on specific grades and division choice. Please fill our callback inquiry form below to obtain real-time updates regarding seat availability and document checklist."
  }
];
