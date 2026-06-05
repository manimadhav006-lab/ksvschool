import React from "react";

interface SchoolLogoProps {
  schoolId: string;
  className?: string;
  size?: number;
}

export default function SchoolLogo({ schoolId, className = "", size = 200 }: SchoolLogoProps) {
  // We will draw high-fidelity SVG crests representing each emblem beautifully and professionally.
  // Each emblem captures the specific text, ribbon shapes, and colors shown in the snapshots.
  
  const getLogoColors = () => {
    switch (schoolId) {
      case "nursery-and-primary":
        return {
          ribbon: "#F59E0B", // Amber / Gold
          text: "#B45309",   // Dark Amber
          accent: "#FBBF24",
          lightAccent: "#FEF3C7",
          border: "#D97706",
          badgeText: "KSV",
          pathText1: "KARUR SARASWATHI NURSERY",
          pathText2: "NURSERY & PRIMARY SCHOOL",
          subText: "KARUR - 639 118"
        };
      case "higher-secondary":
        return {
          ribbon: "#EC4899", // Pink
          text: "#BE185D",   // Deep Pink
          accent: "#F472B6",
          lightAccent: "#FCE7F3",
          border: "#DB2777",
          badgeText: "KSVHS",
          pathText1: "KARUR SARASWATHI VIDHYALAYA",
          pathText2: "HIGH SEC. SCHOOL",
          subText: "Jegadhabi, Karur - 639 118"
        };
      case "cbse":
      default:
        return {
          ribbon: "#0EA5E9", // Sky Blue
          text: "#0369A1",   // Deep Sky Blue
          accent: "#38BDF8",
          lightAccent: "#E0F2FE",
          border: "#0284C7",
          badgeText: "KSVM",
          pathText1: "KARUR SARASWATHI",
          pathText2: "VIDHYA MANDHIRR",
          subText: "KARUR - 639 118"
        };
    }
  };

  const colors = getLogoColors();

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 400 400"
        width="100%"
        height="100%"
        className="drop-shadow-lg transition-transform duration-500 hover:scale-[1.05]"
      >
        <defs>
          {/* Radial glow background */}
          <radialGradient id={`glow-${schoolId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.lightAccent} stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </radialGradient>

          {/* Golden outline gradient */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Path for upper text arch */}
          <path
            id={`textPathUpper-${schoolId}`}
            d="M 60,200 A 140,140 0 0,1 340,200"
            fill="none"
          />
          {/* Path for lower text arch */}
          <path
            id={`textPathLower-${schoolId}`}
            d="M 340,200 A 140,140 0 0,1 60,200"
            fill="none"
          />
        </defs>

        {/* Outer subtle shadow circle */}
        <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        
        {/* Base Crest Circle */}
        <circle cx="200" cy="200" r="175" fill={`url(#glow-${schoolId})`} stroke={colors.border} strokeWidth="4" />
        <circle cx="200" cy="200" r="167" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="5,3" />
        <circle cx="200" cy="200" r="130" fill="none" stroke={colors.border} strokeWidth="2" />

        {/* Arced Top Ribbon/Text */}
        <text className="font-bold tracking-widest fill-slate-800" style={{ fontSize: "14px", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
          <textPath href={`#textPathUpper-${schoolId}`} startOffset="50%" textAnchor="middle">
            {colors.pathText1.toUpperCase()}
          </textPath>
        </text>

        {/* Arced Bottom Ribbon/Text */}
        <text className="font-semibold tracking-wider fill-slate-700" style={{ fontSize: "12.5px" }}>
          <textPath href={`#textPathLower-${schoolId}`} startOffset="50%" textAnchor="middle">
            {colors.pathText2.toUpperCase()}
          </textPath>
        </text>

        {/* Inner Goddess Saraswati Artistic Representation */}
        <g transform="translate(130, 115) scale(0.7)">
          {/* Lotus Pod Seat */}
          <path
            d="M 25 150 C 40 180, 160 180, 175 150 C 190 135, 200 120, 175 125 C 135 130, 65 130, 25 125 C 0 120, 10 135, 25 150 Z"
            fill="#FFAEAE"
            stroke="#EC4899"
            strokeWidth="3"
          />
          {/* Lotus Petals Front Rows */}
          <path d="M 40 145 C 50 165, 80 165, 90 145 C 100 165, 130 165, 140 145" fill="none" stroke="#EC4899" strokeWidth="3" />
          <path d="M 20 135 C 35 155, 65 160, 80 140" fill="none" stroke="#EC4899" strokeWidth="2.5" />
          <path d="M 180 135 C 165 155, 135 160, 120 140" fill="none" stroke="#EC4899" strokeWidth="2.5" />

          {/* Saraswati Silhouette Seated - Elegant Artistic Stroke */}
          {/* Head & Crown */}
          <circle cx="100" cy="40" r="14" fill="#FFE5D9" stroke="#E28743" strokeWidth="2" />
          {/* Kireetam (Crown) */}
          <path d="M 90 30 L 100 5 L 110 30 Z" fill="#FBCEB1" stroke="#D97706" strokeWidth="2.5" />
          <circle cx="100" cy="3" r="3" fill="#FBBF24" />
          
          {/* Torso & Saree */}
          <path
            d="M 90 54 C 80 75, 75 90, 75 120 C 75 135, 125 135, 125 120 C 125 90, 120 75, 110 54 Z"
            fill="#FFFFFF"
            stroke="#9333EA"
            strokeWidth="2.5"
          />
          {/* Shawl across torso */}
          <path d="M 80 70 C 95 85, 115 100, 125 110" fill="none" stroke="#F59E0B" strokeWidth="4" />

          {/* Golden Halo */}
          <circle cx="100" cy="40" r="28" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.8" />

          {/* The Lute (Veena) */}
          {/* Main sound box at bottom left */}
          <circle cx="55" cy="115" r="15" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
          {/* Fingerboard shaft running diagonally upward-right */}
          <path d="M 50 115 L 145 75" fill="none" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
          <path d="M 52 112 L 143 73" fill="none" stroke="#FBBF24" strokeWidth="2" />
          {/* Small gourd ornament at top right */}
          <circle cx="132" cy="78" r="8" fill="#B45309" stroke="#78350F" strokeWidth="2" />
          {/* Small peacock head or scroll tip on the Veena */}
          <path d="M 145 75 C 150 72, 153 65, 149 61 C 145 58, 140 63, 140 68" fill="none" stroke="#B45309" strokeWidth="2.5" />

          {/* Hands holding Veena */}
          {/* Left Hand */}
          <path d="M 75 75 C 65 85, 60 95, 66 100" fill="none" stroke="#FFE5D9" strokeWidth="4.5" strokeLinecap="round" />
          {/* Right Hand */}
          <path d="M 115 85 C 120 95, 128 100, 122 105" fill="none" stroke="#FFE5D9" strokeWidth="4.5" strokeLinecap="round" />

          {/* Sacred Book in left lower space symbol */}
          <rect x="125" y="115" width="22" height="11" rx="1.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" transform="rotate(-5 125 115)" />
          <line x1="129" y1="120" x2="143" y2="120" stroke="#78350F" strokeWidth="1" />
        </g>

        {/* Decorative Stars inside */}
        <path d="M 120 200 L 123 203 L 126 200 L 123 197 Z" fill={colors.border} />
        <path d="M 280 200 L 283 203 L 286 200 L 283 197 Z" fill={colors.border} />

        {/* Ribbon Scroll at the bottom with School Main Initials Badge */}
        <g transform="translate(0, 20)">
          {/* Outer Ribbon Ends */}
          <path d="M 85,310 L 110,290 L 110,325 Z M 315,310 L 290,290 L 290,325 Z" fill={colors.text} opacity="0.9" />
          {/* Ribbon Base Arch */}
          <path
            d="M 100,300 C 150,320, 250,320, 300,300 L 290,330 C 240,350, 160,350, 110,330 Z"
            fill={colors.ribbon}
            stroke={colors.border}
            strokeWidth="2.5"
          />
          
          {/* Ribbon Outline Accent */}
          <path d="M 104,305 C 152,324, 248,324, 296,305" fill="none" stroke={colors.lightAccent} strokeWidth="1" opacity="0.6" />

          {/* Ribbon Text: Subtext Address Location */}
          <text
            x="200"
            y="323"
            textAnchor="middle"
            fill="#FFFFFF"
            className="font-bold tracking-widest uppercase drop-shadow-sm"
            style={{ fontSize: "11px", fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {colors.subText}
          </text>
        </g>

        {/* Bold Initials Center Badge hanging on bottom ribbon curve */}
        <g transform="translate(160, 335)">
          <rect
            x="0"
            y="0"
            width="80"
            height="32"
            rx="6"
            fill="#FFFFFF"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            className="shadow-sm"
          />
          <text
            x="40"
            y="21"
            textAnchor="middle"
            fill={colors.text}
            className="font-black tracking-widest"
            style={{ fontSize: "16px", fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {colors.badgeText}
          </text>
        </g>
      </svg>
    </div>
  );
}
