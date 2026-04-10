import profilePhoto from "./photo.jpg";

// ╔══════════════════════════════════════════════════════╗
// ║  APNI DETAILS YAHAN BHARO — BAS YE EK FILE EDIT KARO ║
// ╚══════════════════════════════════════════════════════╝

export const portfolioData = {

  // ── PERSONAL INFO ──────────────────────────────────────
  name:        "Aditya maurya",          // ← Apna naam
  tagline:     "Software Developer",  // ← Apna role
  subtitle:    "& AI Enthusiast",       // ← Subtitle
  email:       "adityamaurya00599@gmail.com",    // ← Email
  phone:       "+91 6386159377",       // ← Phone
  location:    "Lucknow, India",        // ← City

  // ── ABOUT ME ───────────────────────────────────────────
  about: `I am an enthusiastic and dedicated web developer who loves crafting clean, responsive, and interactive user interfaces. With a strong foundation in modern web technologies, I focus on creating seamless digital experiences that combine creativity with functionality.

I am driven by curiosity and a constant desire to learn, which helps me adapt quickly to new challenges and technologies. I enjoy solving problems, building projects from scratch, and turning ideas into meaningful solutions.

My aim is not just to write code, but to build products that make a difference. I believe in continuous growth, attention to detail, and delivering work that truly stands out.
`,

  // ── SOCIAL LINKS ───────────────────────────────────────
  social: {
    github:    "https://github.com/aadi000666",     // ← GitHub
    linkedin:  "https://www.linkedin.com/in/aditya-maurya-04477035a?utm_source=share_via&utm_content=profile&utm_medium=member_android",// ← LinkedIn
    twitter:   "https://twitter.com/yourusername",    // ← Twitter (optional)
    instagram: "https://www.instagram.com/shiningone666?igsh=OHRsM2Uxd3Q4czk0",  // ← Instagram (optional)
  },

  // ── PROFILE PHOTO ──────────────────────────────────────
  // Apni photo src/assets/ mein rakho aur naam yahan likho
  // Ya koi online URL bhi daal sakte ho
  photo: profilePhoto,  // ← Imported above
  // photo: "/your-photo.jpg",

  // ── TYPEWRITER WORDS (Hero section mein cycle hote hain) ──
  typewriterWords: [
    "Full Stack Developer",   // ← Change karo
    "AI Enthusiast",
    "Problem Solver",
    "Tech Creator",
    "Open Source Lover",
  ],

  // ── SKILLS ─────────────────────────────────────────────
  skills: [
    // { name: "Skill Name", level: 0-100, category: "Frontend/Backend/AI/Tools" }
    { name: "Python",       level: 90, category: "Backend"  },
    { name: "JavaScript",   level: 80, category: "Frontend" },
    { name: "React",        level: 75, category: "Frontend" },
    { name: "Node.js",      level: 70, category: "Backend"  },
    { name: "AI / ML",      level: 85, category: "AI"       },
    { name: "MongoDB",      level: 65, category: "Backend"  },
    { name: "OpenCV",       level: 80, category: "AI"       },
    { name: "FastAPI",      level: 75, category: "Backend"  },
    { name: "Git",          level: 85, category: "Tools"    },
    { name: "C / C++",      level: 70, category: "Backend"  },
    // ← Aur add karo jaise chahiye
  ],

  // ── PROJECTS ───────────────────────────────────────────
  projects: [
    {
      title:       "Siya AI Assistant",                      // ← Project naam
      description: "A full-featured AI personal assistant with voice control, computer vision, NLP.",
      tags:        ["Python", "Gemini AI", "React","Node.js", "FastAPI","MongoDB"],
      github:      "https://github.com/aadi000666/siya",   // ← GitHub link
      live:        null,                                      // ← Live demo URL (ya null)
      featured:    true,                                      // ← Featured = bada dikhega
      color:       "#00c8ff",                                 // ← Card accent color
    },
    {
      title:       "MUSIC PLAYER",
      description: "Apne doosre project ki description yahan likho. Kya bana, kaise bana.",
      tags:        ["html", "JavaScript", "CSS"],
      github:      "https://github.com/aadi000666/project2",
      live:        "https://aadi000666.github.io/MYMUSIC/",
      featured:    true,
      color:       "#ff6b9d",
    },
    {
      title:       "TODO APP",
      description: "Teesre project ki description. Technology stack aur features.",
      tags:        ["html", "JavaScript", "CSS"],
      github:      "https://github.com/aadi000666/project3",
      live:        "https://aadi000666.github.io/todo2.0/",
      featured:    false,
      color:       "#a78bfa",
    },
    {
      title:       "TICTACTOE GAME",
      description: "Chautha project. Add karo ya hatao.",
      tags:        ["html", "JavaScript", "CSS"],
      github:      "https://github.com/aadi000666/project4",
      live:        "https://aadi000666.github.io/TICTACTOE/",
      featured:    false,
      color:       "#34d399",
    },
    {
      title:       "TypingHere01",
      description: "Chautha project. Add karo ya hatao.",
      tags:        ["html", "JavaScript", "CSS"],
      github:      "https://github.com/aadi000666/project5",
      live:        "https://aadi000666.github.io/typingHere01/",
      featured:    false,
      color:       "#4934d3",
    },
    {
      title:       "WHITE_BOARD",
      description: "Chautha project. Add karo ya hatao.",
      tags:        ["html", "JavaScript", "CSS"],
      github:      "https://github.com/aadi000666/project6",
      live:        "https://aadi000666.github.io/WHITE_BOARD/",
      featured:    false,
      color:       "#d37934",
    },
    // ← Aur projects add karo
  ],

  // ── EXPERIENCE (optional — hata sakte ho agar nahi chahiye) ──
  experience: [
    {
      role:     "Your Role",                 // ← Job title
      company:  "Company Name",             // ← Company
      period:   "2024 — Present",           // ← Duration
      desc:     "Kya kaam kiya describe karo.",
    },
    {
      role:     "Intern",
      company:  "Another Company",
      period:   "2023 — 2024",
      desc:     "Internship description yahan.",
    },
    // ← Aur add karo
  ],

  // ── EDUCATION ──────────────────────────────────────────
  education: [
    {
      degree:  "Diploma — Computer Science",  // ← Degree
      Collage:  "SRMU, Lucknow",              // ← College
      period:  "2024 — 2026",                // ← Years
      grade:   "8.5 CGPA",                  // ← Grade (optional)
    },
    {
      degree:  "iNtermediate — Science",
      School:  "Maharaj Singh Inter College, Bahraich",
      period:  "2022 — 2023",
      grade:   "60%",              
    },
    {
      degree:  "High School",
      School:  "Maharaj Singh Inter College, Bahraich",
      period:  "2020 — 2021",
      grade:   "73%",
    }
    // ← Aur add karo
  ],

  // ── STATS (Hero section mein dikhte hain) ──────────────
  stats: [
    { value: "5+",  label: "Projects Built"   },  // ← Change karo
    { value: "1.5+",   label: "Years Coding"     },
    { value: "5+",   label: "Technologies"     },
    { value: "100%", label: "Dedication"       },
  ],

};