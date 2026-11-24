export interface ProjectItem {
  id: string
  code: string
  title: string
  subtitle: string
  category: "Security & Infra" | "AI & ML" | "Software & Web" | "Systems & Hardware"
  description: string
  highlights?: string[]
  tech: string[]
  details: { label: string; value: string }[]
  github: string
  hasDedicatedRepo: boolean
  visualType?: "voice" | "churn" | "linux" | "campus" | "portfolio"
}

export interface CapabilityPillar {
  number: string
  title: string
  subtitle: string
  tone: "platinum" | "verdigris" | "obsidian"
  focusLabel: string
  description: string
  tags: string[]
}

export interface SkillDomainCard {
  id: string
  number: string
  title: string
  summary: string
  highlights: string[]
  featured?: boolean
}

export interface SkillCategory {
  name: string
  domain: "Security & Infra" | "AI & Data" | "Engineering" | "Foundations"
  items: string[]
}

export interface ExperienceItem {
  id: string
  type: "education" | "trajectory"
  period: string
  title: string
  organization: string
  location: string
  summary: string
  highlights: string[]
  tags: string[]
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  category: "Security" | "Cloud & Linux" | "Networking" | "AI & Professional"
  date: string
  credentialId?: string
  verifyUrl?: string
  assetPath: string
  assetType: "pdf" | "image"
  featured?: boolean
  note?: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const IDENTITY = {
  displayName: "Youssef Elsayed",
  fullName: "Youssef Elsayed Abdelaziz",
  monogram: "YE",
  stylizedBrandLeft: "Y",
  stylizedBrandRight: "Elsayed",
  brandSubline: "Systems / Security / AI",
  heroEyebrow: "// Building Secure, Intelligent Systems",
  heroDomainPill: "CS / Cyber / AI",
  portraitCaption: "Computer Science Student",
  systemStatus: "SYS.STATUS // NORMAL",
  legacyTagline: "Securing the digital future, one system at a time.",
  email: "Youssefelsayed5520055@gmail.com",
  phone: "+20 1208682811",
  phoneRaw: "201208682811",
  locationPrimary: "Obour City, Qalyubia",
  locationSecondary: "Cairo, Egypt",
  timezoneLabel: "CAI, EET",
  linkedin: "https://linkedin.com/in/youssef-elsayed-543695344",
  github: "https://github.com/youssef5520055",
  resumePath: "/CV/Youssef_Elsayed_Abdelaziz.pdf",
  emailHref:
    "mailto:Youssefelsayed5520055@gmail.com?subject=Professional%20Inquiry%3A%20Software%20Engineering%20%26%20Security&body=Hello%20Youssef%2C%0D%0A%0D%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20highly%20impressed%20by%20your%20expertise%20in%20software%20architecture%2C%20cybersecurity%2C%20and%20AI.%0D%0A%0D%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20would%20love%20to%20connect.%0D%0A%0D%0ABest%20regards%2C%0D%0A%5BYour%20Name%5D",
  whatsappHref:
    "https://wa.me/201208682811?text=Hello%20Youssef%2C%20I%20recently%20viewed%20your%20portfolio%20and%20I%20am%20interested%20in%20discussing%20a%20potential%20collaboration%20or%20opportunity.",
  heroSubtitle:
    "I build secure, scalable and intelligent systems — from machine learning models to real-world applications, with a focus on cybersecurity and modern software engineering.",
  manifestoText:
    "I engineer resilient software, hardened network architectures, and intelligent ML systems — uniting cybersecurity rigor, full-stack depth, and refined design craft so digital products are both protected and polished.",
  aboutHeading:
    "Computer Science student passionate about building secure and intelligent systems.",
  aboutParagraphs: [
    "I'm a Freshman Computer Science student at Misr International University, specializing in Cybersecurity and Network Security. I'm deeply passionate about Linux system administration, network security, secure software development, and the integration of machine learning into complex architectures.",
    "My engineering approach focuses on building resilient web applications, deploying secure Linux server infrastructures, and developing AI-based solutions — while bringing a graphic designer's eye for clarity and polish. I'm certified by Cisco, ISC2, AWS Academy, Red Hat, IBM, and Google, and I continuously apply modern security protocols to real-world software challenges.",
  ],
  education: {
    degree: "B.Sc. Computer Science",
    institution: "Misr International University",
    standing: "Freshman · Cybersecurity Specialization",
    period: "Present",
  },
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "B2 / Professional" },
  ],
} as const

export const VERIFIED_ISSUERS = [
  "Cisco Networking Academy",
  "ISC2",
  "AWS Academy",
  "Red Hat",
  "IBM SkillsBuild",
  "Google / Coursera",
  "OPSWAT Academy",
  "Huawei ICT Academy",
  "Udemy",
  "LinkedIn Learning",
  "Edraak",
] as const

export const FOCUS_PILLARS: CapabilityPillar[] = [
  {
    number: "01",
    title: "Cybersecurity &\nNetwork Defense",
    subtitle: "Security • Linux • Networking",
    tone: "platinum",
    focusLabel: "CURRENT FOCUS // 01",
    description:
      "Hardening Ubuntu & Red Hat Linux servers, designing segmented campus networks with VLANs and OSPF, performing vulnerability assessments, and applying defensive & ethical hacking principles.",
    tags: ["Network Security", "Linux Hardening", "ISC2 CC", "Ethical Hacking"],
  },
  {
    number: "02",
    title: "AI & Machine\nLearning",
    subtitle: "Models • Data • Solutions",
    tone: "verdigris",
    focusLabel: "CURRENT FOCUS // 02",
    description:
      "Building end-to-end predictive pipelines with Python and Scikit-learn — from data preprocessing and feature engineering to multi-model classification and speech recognition interfaces.",
    tags: ["Python", "Scikit-learn", "Voice Detection", "Churn Prediction"],
  },
  {
    number: "03",
    title: "Software Engineering\n& Interface Craft",
    subtitle: "Web • Backend • Systems",
    tone: "obsidian",
    focusLabel: "CURRENT FOCUS // 03",
    description:
      "Architecting full-stack web apps, object-oriented C++ & Java systems, and clean visual experiences — delivering software that performs reliably and feels unmistakable in craft.",
    tags: ["Next.js & React", "C++ / Java / PHP", "MySQL", "UI & Visual Craft"],
  },
]

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "miu-campus-network",
    code: "ID: PRJ_100",
    title: "MIU Campus Network Infrastructure",
    subtitle: "Enterprise Networking / Security Architecture",
    category: "Security & Infra",
    description:
      "Complete university network design and configuration using Cisco Packet Tracer, implementing VLANs, routing protocols, security policies, and redundancy for 5,000+ users across multiple buildings.",
    highlights: [
      "Multi-building segmented VLAN topology supporting 5,000+ concurrent campus users",
      "OSPF dynamic routing with failover redundancy and inter-VLAN access policies",
    ],
    tech: ["Cisco Packet Tracer", "VLANs", "OSPF Routing", "Network Security", "Redundancy"],
    details: [
      { label: "Scale", value: "5,000+ Campus Users" },
      { label: "Architecture", value: "Multi-Building OSPF & VLANs" },
    ],
    github: "https://github.com/youssef5520055",
    hasDedicatedRepo: false,
    visualType: "campus",
  },
  {
    id: "app-voice-detection",
    code: "ID: PRJ_101",
    title: "App Voice Detection",
    subtitle: "AI / Audio Processing",
    category: "AI & ML",
    description:
      "A voice detection application designed to recognize and process voice input using advanced speech-related technologies and intelligent signal processing workflows.",
    highlights: [
      "Real-time voice capture and speech recognition pipeline",
      "Modular AI audio classification & processing architecture",
    ],
    tech: ["Voice Processing", "Speech Recognition", "AI Algorithms"],
    details: [
      { label: "Focus", value: "Audio Recognition" },
      { label: "Platform", value: "Application" },
    ],
    github: "https://github.com/youssef5520055/app_voice_detection",
    hasDedicatedRepo: true,
    visualType: "voice",
  },
  {
    id: "customer-retention-prediction",
    code: "ID: PRJ_102",
    title: "Customer Retention Prediction",
    subtitle: "Machine Learning / Data Science",
    category: "AI & ML",
    description:
      "Developed and evaluated multiple machine learning classification models to predict customer churn. Performed extensive data preprocessing, feature engineering, and comparative evaluation across five core algorithms.",
    highlights: [
      "Benchmarked Random Forest, Decision Tree, SVM, KNN, and Naive Bayes models",
      "End-to-end feature engineering, cleaning, and accuracy/recall comparison",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest", "SVM", "KNN"],
    details: [
      { label: "Objective", value: "Predict Customer Churn" },
      { label: "Algorithms", value: "5 Classification Models" },
    ],
    github: "https://github.com/youssef5520055",
    hasDedicatedRepo: false,
    visualType: "churn",
  },
  {
    id: "linux-server-deployment",
    code: "ID: PRJ_103",
    title: "Linux Server Infrastructure Deployment",
    subtitle: "System Administration / Cybersecurity",
    category: "Security & Infra",
    description:
      "Enterprise network services deployment using Ubuntu Server. Included complete configuration of Apache web hosting, hardened SSH access, MariaDB, networking, monitoring, and strict user/group permission management.",
    highlights: [
      "Configured Apache, MariaDB, hardened SSH, and granular POSIX permissions",
      "Implemented system monitoring, firewall rules, and Linux troubleshooting playbooks",
    ],
    tech: ["Ubuntu Server", "Linux", "Bash", "Apache", "MariaDB", "SSH", "TCP/IP"],
    details: [
      { label: "Environment", value: "Ubuntu Server" },
      { label: "Focus", value: "Hardened Infrastructure" },
    ],
    github: "https://github.com/youssef5520055",
    hasDedicatedRepo: false,
    visualType: "linux",
  },
  {
    id: "personal-portfolio-system",
    code: "ID: PRJ_104",
    title: "Personal Portfolio System",
    subtitle: "Full-Stack Design Engineering",
    category: "Software & Web",
    description:
      "A full-stack personal portfolio platform showcasing my skills, projects, operational trajectory, and verified credentials — engineered with custom WebGL2 shaders, precision typography, and WCAG-verified dark architecture.",
    highlights: [
      "Custom WebGL2 Etched Accretion GLSL shader with pointer parallax and reduced-motion safety",
      "Next.js 15 App Router + Framer Motion tactile interactions + live credential vault",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WebGL2"],
    details: [
      { label: "Type", value: "Digital Monograph" },
      { label: "Design", value: "Obsidian / Verdigris OS" },
    ],
    github: "https://github.com/youssef5520055/youssef-elsayed-portfolio",
    hasDedicatedRepo: true,
    visualType: "portfolio",
  },
]

export const ADDITIONAL_PROJECTS: ProjectItem[] = [
  {
    id: "popstream",
    code: "ID: PRJ_201",
    title: "PopStream",
    subtitle: "Full-Stack Web Platform",
    category: "Software & Web",
    description:
      "A child-friendly movie streaming website where users can explore curated films and enjoy an organized, responsive online viewing experience backed by PHP and MySQL.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    details: [{ label: "Audience", value: "Child-Friendly Streaming" }],
    github: "https://github.com/youssef5520055/popstream",
    hasDedicatedRepo: true,
  },
  {
    id: "phone-stock-market",
    code: "ID: PRJ_202",
    title: "Phone Stock Market",
    subtitle: "Object-Oriented Systems",
    category: "Systems & Hardware",
    description:
      "A complete object-oriented phone inventory and stock management application for tracking mobile devices, customers, products, and sales records using clean C++ data structures and file handling.",
    tech: ["C++", "OOP", "Data Structures", "File Handling"],
    details: [{ label: "Architecture", value: "Modular OOP" }],
    github: "https://github.com/youssef5520055/phone-stock-market",
    hasDedicatedRepo: true,
  },
  {
    id: "billing-management-system",
    code: "ID: PRJ_203",
    title: "Billing Management System",
    subtitle: "Java Desktop Application",
    category: "Software & Web",
    description:
      "A Java desktop application built for mobile retail stores to manage invoices, product sales, real-time inventory records, and customer billing transactions.",
    tech: ["Java", "Desktop App", "Database"],
    details: [{ label: "Runtime", value: "Java Desktop" }],
    github: "https://github.com/youssef5520055/billing-management-system",
    hasDedicatedRepo: true,
  },
  {
    id: "miu-quickbit",
    code: "ID: PRJ_204",
    title: "MIU QuickBit",
    subtitle: "Campus Food Ordering Web App",
    category: "Software & Web",
    description:
      "Designed and developed a complete food ordering platform for university students featuring authentication, order management workflows, responsive UI, and secure MySQL database integration.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap"],
    details: [{ label: "Focus", value: "Auth & Order Flow" }],
    github: "https://github.com/youssef5520055",
    hasDedicatedRepo: false,
  },
  {
    id: "tourism-platform",
    code: "ID: PRJ_205",
    title: "Tourism Platform",
    subtitle: "Destination Discovery UI",
    category: "Software & Web",
    description:
      "A tourism discovery website helping travelers explore destinations, uncover notable landmarks, and navigate structured travel guides with responsive visual hierarchy.",
    tech: ["Web Development", "UI/UX"],
    details: [{ label: "Focus", value: "Visual Discovery" }],
    github: "https://github.com/youssef5520055/tourism",
    hasDedicatedRepo: true,
  },
  {
    id: "plastiq",
    code: "ID: PRJ_206",
    title: "Plastiq",
    subtitle: "Product Catalog Experience",
    category: "Software & Web",
    description:
      "A modern digital platform concept focused on organizing and presenting plastic-industry products and services through clean visual architecture and intuitive browsing.",
    tech: ["Frontend Development", "UI/UX"],
    details: [{ label: "Focus", value: "Modern Product UI" }],
    github: "https://github.com/youssef5520055/plastiq",
    hasDedicatedRepo: true,
  },
  {
    id: "student-grades-management",
    code: "ID: PRJ_207",
    title: "Student Grades Management",
    subtitle: "Algorithms & Data Structures",
    category: "Systems & Hardware",
    description:
      "A C++ academic record system implementing efficient searching, sorting, and structured file storage algorithms for fast student grade retrieval and management.",
    tech: ["C++", "Data Structures", "Algorithms", "File Handling"],
    details: [{ label: "Focus", value: "Fast Retrieval & Sorting" }],
    github: "https://github.com/youssef5520055",
    hasDedicatedRepo: false,
  },
  {
    id: "16-bit-adder-twos-complement",
    code: "ID: PRJ_208",
    title: "16-bit Adder & Two's Complement",
    subtitle: "Digital Logic & Hardware Design",
    category: "Systems & Hardware",
    description:
      "Designed, built, and simulation-verified a 16-bit arithmetic adder and two's complement combinational digital logic circuit from fundamental logic gates.",
    tech: ["Digital Logic Design", "Logic Gates", "Hardware Simulation"],
    details: [{ label: "Focus", value: "Combinational Arithmetic" }],
    github: "https://github.com/youssef5520055",
    hasDedicatedRepo: false,
  },
]

export const SKILL_DOMAIN_CARDS: SkillDomainCard[] = [
  {
    id: "security-defense",
    number: "01",
    title: "Cybersecurity & Defense",
    summary: "Network security, SIEM monitoring, vulnerability assessment, and container/web hardening.",
    highlights: [
      "Network Security & Firewalls",
      "Vulnerability Assessment & Pentesting",
      "SIEM & Critical Infrastructure (ICIP)",
      "Kubernetes & Web App Security",
    ],
    featured: true,
  },
  {
    id: "systems-cloud",
    number: "02",
    title: "Linux, Cloud & Networking",
    summary: "Ubuntu & Red Hat server administration, AWS cloud architecture, and enterprise Cisco routing.",
    highlights: [
      "Red Hat (RH124) & Ubuntu Server",
      "AWS Academy Cloud Architecting",
      "Cisco CCNA, VLANs, OSPF & TCP/IP",
      "Apache, MariaDB, SSH & Bash",
    ],
  },
  {
    id: "ai-ml",
    number: "03",
    title: "AI & Machine Learning",
    summary: "Predictive modeling, structured preprocessing, algorithm benchmarking, and audio recognition.",
    highlights: [
      "Python, Pandas, NumPy & Scikit-learn",
      "Random Forest, SVM, KNN & Trees",
      "Feature Engineering & Evaluation",
      "Voice Processing & Generative AI",
    ],
  },
  {
    id: "software-design",
    number: "04",
    title: "Full-Stack & Visual Craft",
    summary: "Clean software architecture from low-level C++/Java to modern Next.js interfaces.",
    highlights: [
      "Next.js, React, TypeScript & Tailwind",
      "C++, Java, PHP, SQL & REST APIs",
      "OOP, Data Structures & Algorithms",
      "UI/UX & Graphic Design Precision",
    ],
  },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Cybersecurity",
    domain: "Security & Infra",
    items: [
      "Network Security",
      "Vulnerability Assessment",
      "Web Application Security",
      "SIEM Fundamentals",
      "Security Monitoring",
      "Linux Security",
      "Secure Software Development",
      "Firewall Configuration",
      "Basic Penetration Testing",
      "Critical Infrastructure Protection (ICIP)",
      "Kubernetes Security",
    ],
  },
  {
    name: "System Administration & Cloud",
    domain: "Security & Infra",
    items: [
      "Ubuntu Server",
      "Red Hat Enterprise Linux (RH124)",
      "Linux Administration",
      "Bash Scripting",
      "Apache",
      "MariaDB",
      "User & Permission Management",
      "System Monitoring",
      "AWS Cloud Architecting",
    ],
  },
  {
    name: "Networking",
    domain: "Security & Infra",
    items: [
      "TCP/IP",
      "Routing & Switching",
      "VLANs",
      "OSPF Routing",
      "Subnetting",
      "DNS",
      "DHCP",
      "SSH",
      "Network Troubleshooting",
    ],
  },
  {
    name: "Machine Learning & AI",
    domain: "AI & Data",
    items: [
      "Data Preprocessing",
      "Feature Engineering",
      "Model Evaluation",
      "Classification Algorithms",
      "Scikit-learn",
      "Pandas & NumPy",
      "Speech Recognition Workflows",
      "Generative AI Concepts",
    ],
  },
  {
    name: "Programming Languages",
    domain: "Engineering",
    items: ["Python", "C++", "Java", "SQL", "TypeScript", "JavaScript", "PHP", "HTML5", "CSS3"],
  },
  {
    name: "Development & Interface Craft",
    domain: "Engineering",
    items: [
      "Next.js & React",
      "Tailwind CSS",
      "Object-Oriented Programming",
      "Data Structures",
      "Algorithms",
      "Git & GitHub",
      "REST APIs",
      "UI/UX & Graphic Design",
    ],
  },
  {
    name: "Tools & Platforms",
    domain: "Security & Infra",
    items: [
      "Kali Linux",
      "Ubuntu",
      "Cisco Packet Tracer",
      "VMware",
      "VirtualBox",
      "Burp Suite",
      "Wireshark",
      "Nmap",
      "Git",
      "GitHub",
      "Visual Studio Code",
    ],
  },
  {
    name: "Databases",
    domain: "AI & Data",
    items: ["MySQL", "MariaDB", "SQL", "Database Design"],
  },
  {
    name: "Soft Skills & Management",
    domain: "Foundations",
    items: [
      "Problem Solving",
      "Analytical Thinking",
      "Team Collaboration",
      "Communication",
      "Time Management",
      "Adaptability",
      "Attention to Detail",
      "Project Management Fundamentals",
      "Emotional Intelligence",
    ],
  },
]

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "miu-cs",
    type: "education",
    period: "Freshman · Present",
    title: "B.Sc. in Computer Science (Freshman)",
    organization: "Misr International University (MIU)",
    location: "Cairo, Egypt",
    summary:
      "Undergraduate specialization in Cybersecurity & Network Security. Combining rigorous computer science fundamentals (C++ OOP, data structures, algorithms, digital logic, databases) with enterprise networking via Cisco Networking Academy at MIU.",
    highlights: [
      "Architected a 5,000+ user multi-building campus network topology with VLANs, OSPF, and redundancy",
      "Built full-stack university platforms (MIU QuickBit, PopStream) and multi-model ML churn pipelines",
    ],
    tags: ["Cybersecurity Specialization", "Cisco Academy @ MIU", "Systems & AI", "Freshman"],
  },
  {
    id: "self-directed-sec-cloud",
    type: "trajectory",
    period: "2024 – Present",
    title: "Independent Security, Cloud & Full-Stack Engineering",
    organization: "Hands-On Labs, Open-Source & Industry Credentials",
    location: "Obour City, Cairo, Egypt",
    summary:
      "Intensive self-directed engineering across offensive/defensive security, Red Hat & Ubuntu server hardening, AWS cloud architecture, Kubernetes security, and design-engineered web applications — validated by 21 verified certificates across 11 issuers.",
    highlights: [
      "Completed 60-hour AWS Academy Cloud Architecting & 40-hour Red Hat RH124 Ver. 10 tracks",
      "Earned ISC2 CC Certified in Cybersecurity (all 5 domains), Cisco Ethical Hacker, CCNA Intro, Google Cybersecurity, and OPSWAT ICIP",
    ],
    tags: ["SecOps & Pentesting", "AWS & Red Hat", "Kubernetes Security", "Design Engineering"],
  },
]

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "aws-cloud-architecting",
    name: "AWS Academy Graduate — Cloud Architecting",
    issuer: "AWS Academy",
    category: "Cloud & Linux",
    date: "Apr 2026 · 60 hrs",
    credentialId: "gDGMM9v0",
    verifyUrl: "https://www.credly.com/go/gDGMM9v0",
    assetPath:
      "/certificates/AMAZON AWS/AWS_Academy_Graduate___Cloud_Architecting___Training_Badge_Badge20260411-32-hwygn6.pdf",
    assetType: "pdf",
    featured: true,
  },
  {
    id: "redhat-rh124",
    name: "Red Hat System Administration I (RH124 - Ver. 10)",
    issuer: "Red Hat",
    category: "Cloud & Linux",
    date: "Mar 2026 · 40 hrs",
    credentialId: "e8630e0d-ec6a",
    verifyUrl: "https://www.credly.com/badges/e8630e0d-ec6a-48c0-a9a9-71d4844b6319",
    assetPath: "/certificates/redhat/CourseAttendance20260324-32-8zw82c.pdf",
    assetType: "pdf",
    featured: true,
  },
  {
    id: "isc2-cc",
    name: "CC Certified in Cybersecurity (Domains 1–5)",
    issuer: "ISC2",
    category: "Security",
    date: "Jan 2025",
    credentialId: "05ee6337-ae78",
    assetPath: "/certificates/ISC2/CC Certified in Cybersecurity.pdf",
    assetType: "pdf",
    featured: true,
    note: "Includes Pre-assessment & Domains 1–5 certificates",
  },
  {
    id: "udemy-cks-masterclass",
    name: "Certified Kubernetes Security Specialist Masterclass",
    issuer: "Udemy",
    category: "Security",
    date: "Jul 2025 · 12 hrs",
    credentialId: "UC-faeef1b2",
    verifyUrl: "https://ude.my/UC-faeef1b2-ab28-4db7-8b84-cf2c7d5f9458",
    assetPath:
      "/certificates/UDEMY/CYBER/Kubernetes SECURITY/UC-faeef1b2-ab28-4db7-8b84-cf2c7d5f9458.pdf",
    assetType: "pdf",
    featured: true,
  },
  {
    id: "cisco-ccna-intro",
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    category: "Networking",
    date: "Aug 2025",
    credentialId: "6ac89b23-bf0b",
    assetPath:
      "/certificates/CISCO/CCNA/CCNA-_Introduction_to_Networks_certificate_youssefelsayed5520055-gmail-com_6ac89b23-bf0b-423e-ad2e-d569d54c0f25.pdf",
    assetType: "pdf",
    featured: true,
  },
  {
    id: "cisco-ethical-hacker",
    name: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    category: "Security",
    date: "Jan 2025",
    credentialId: "43b4ba87-69e7",
    assetPath:
      "/certificates/CISCO/Ethecal haker/_certificate_youssefelsayed5520055-gmail-com_43b4ba87-69e7-4d05-a0e2-2a0856176a01.pdf",
    assetType: "pdf",
    featured: true,
  },
  {
    id: "google-foundations-cyber",
    name: "Foundations of Cybersecurity",
    issuer: "Google via Coursera",
    category: "Security",
    date: "Jan 2025",
    credentialId: "ZW3R6BDVMNZZ",
    verifyUrl: "https://coursera.org/verify/ZW3R6BDVMNZZ",
    assetPath: "/certificates/coursera/GOOGLE/Cybersecurity/Coursera ZW3R6BDVMNZZ.pdf",
    assetType: "pdf",
    featured: true,
  },
  {
    id: "opswat-icip",
    name: "Introduction to Critical Infrastructure Protection (ICIP)",
    issuer: "OPSWAT Academy",
    category: "Security",
    date: "Jan 2025",
    credentialId: "odijYszRSQ",
    verifyUrl: "https://learn.opswatacademy.com/certificate/odijYszRSQ",
    assetPath: "/certificates/others/introduction_to_cip.png",
    assetType: "image",
    featured: true,
  },
  {
    id: "ibm-cybersecurity-fundamentals",
    name: "Cybersecurity Fundamentals",
    issuer: "IBM SkillsBuild",
    category: "Security",
    date: "Apr 2026",
    credentialId: "01be4d01-2d5d",
    verifyUrl: "https://www.credly.com/badges/01be4d01-2d5d-401b-a7d7-59a68982d6e4",
    assetPath: "/certificates/IMB CERTIFICATES/cybersecurity/IBMDesign20260423-32-s1bkvx.pdf",
    assetType: "pdf",
    featured: true,
  },
  {
    id: "huawei-computer-networks",
    name: "Computer Networks V1.0",
    issuer: "Huawei ICT Academy",
    category: "Networking",
    date: "Apr 2026",
    credentialId: "ICT20260104001166",
    assetPath: "/certificates/هواوي/photo.png",
    assetType: "image",
    featured: true,
  },
  {
    id: "ibm-cloud-computing",
    name: "Cloud Computing Fundamentals",
    issuer: "IBM SkillsBuild",
    category: "Cloud & Linux",
    date: "Verified Badge",
    assetPath:
      "/certificates/IMB CERTIFICATES/cloud-computing-fundamentals/cloud-computing-fundamentals.png",
    assetType: "image",
  },
  {
    id: "cisco-intro-cyber",
    name: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    category: "Security",
    date: "Jan 2025",
    credentialId: "eec9866e-c1e3",
    assetPath:
      "/certificates/CISCO/Introduction to cybersecurity/Introduction_to_Cybersecurity_Badge20250112-26-st37nf.pdf",
    assetType: "pdf",
  },
  {
    id: "ibm-and-cybersecurity",
    name: "IBM and Cybersecurity",
    issuer: "IBM SkillsBuild",
    category: "Security",
    date: "Jan 2025",
    credentialId: "ILB-ZKDDZKYVXYEX1KVN",
    assetPath: "/certificates/others/IBM.pdf",
    assetType: "pdf",
  },
  {
    id: "ibm-it-fundamentals",
    name: "Information Technology Fundamentals",
    issuer: "IBM SkillsBuild",
    category: "Cloud & Linux",
    date: "Verified Badge",
    assetPath:
      "/certificates/IMB CERTIFICATES/information-technology-fundamentals/information-technology-fundamentals.png",
    assetType: "image",
  },
  {
    id: "linkedin-genai",
    name: "What Is Generative AI?",
    issuer: "LinkedIn Learning",
    category: "AI & Professional",
    date: "Jan 2025 · 1.60 CPE",
    credentialId: "801abcebac50",
    assetPath: "/certificates/Linked In/CertificateOfCompletion_What Is Generative AI.pdf",
    assetType: "pdf",
  },
  {
    id: "ibm-project-management",
    name: "Project Management Fundamentals",
    issuer: "IBM SkillsBuild",
    category: "AI & Professional",
    date: "May 2026",
    credentialId: "FtLnM1PO",
    verifyUrl: "https://www.credly.com/go/FtLnM1PO",
    assetPath:
      "/certificates/IMB CERTIFICATES/software projectr managment/ProjectManagementFundamentals_Badge20260520-31-pppuvh.pdf",
    assetType: "pdf",
  },
  {
    id: "ibm-digital-world",
    name: "Working in a Digital World: Professional Skills",
    issuer: "IBM SkillsBuild",
    category: "AI & Professional",
    date: "Jan 2026",
    credentialId: "6200198b-47da",
    verifyUrl: "https://www.credly.com/badges/6200198b-47da-4669-9227-6bf59f117d4d",
    assetPath: "/certificates/IMB CERTIFICATES/IBMDesign20260102-29-8xwhsz.pdf",
    assetType: "pdf",
  },
  {
    id: "linkedin-cyber-terminology",
    name: "Cybersecurity Awareness: Cybersecurity Terminology",
    issuer: "LinkedIn Learning",
    category: "Security",
    date: "Jan 2025 · PMI & NASBA",
    credentialId: "bf8937f390ab",
    assetPath:
      "/certificates/Linked In/CertificateOfCompletion_Cybersecurity Awareness Cybersecurity Terminology.pdf",
    assetType: "pdf",
  },
  {
    id: "ibm-interview-essentials",
    name: "Interview Essentials",
    issuer: "IBM SkillsBuild",
    category: "AI & Professional",
    date: "Jun 2026",
    credentialId: "PLAN-5CB0A3E2A678",
    assetPath: "/certificates/IMB CERTIFICATES/interview/Completion Certificate _ SkillsBuild.pdf",
    assetType: "pdf",
  },
  {
    id: "linkedin-emotional-intelligence",
    name: "Developing Your Emotional Intelligence",
    issuer: "LinkedIn Learning",
    category: "AI & Professional",
    date: "Jan 2025 · 0.50 PDU",
    credentialId: "ef6810a0eee2",
    assetPath:
      "/certificates/Linked In/CertificateOfCompletion_Developing Your Emotional Intelligence.pdf",
    assetType: "pdf",
  },
  {
    id: "edraak-cybersecurity-basics",
    name: "Cyber Security Basics & Introduction to Cyber Security",
    issuer: "Edraak (إدراك)",
    category: "Security",
    date: "Jan 2025 · EN & AR",
    assetPath: "/certificates/edrak/cybersecurity basics.pdf",
    assetType: "pdf",
  },
]

export const VERIFIED_METRICS = [
  {
    value: 13,
    suffix: "+",
    label: "Engineered Projects",
    description:
      "Verified systems spanning AI/ML classification, voice detection, Linux server infrastructure, campus networking, and full-stack platforms.",
  },
  {
    value: 21,
    suffix: "",
    label: "Verified Certifications",
    description:
      "Independently verifiable credentials across Cisco, ISC2, AWS Academy, Red Hat, IBM SkillsBuild, Google, OPSWAT, and Huawei ICT Academy.",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Campus Users Modeled",
    description:
      "Multi-building enterprise university network architecture engineered with segmented VLANs, OSPF dynamic routing, security policies, and failover redundancy.",
  },
] as const

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "who-is-youssef",
    question: "What domains do you specialize in beyond cybersecurity?",
    answer:
      "While my B.Sc. specialization at Misr International University is Cybersecurity & Network Security, my work bridges five connected areas: defensive/offensive security, Linux & AWS infrastructure, AI/ML predictive modeling (Python & Scikit-learn), full-stack & systems engineering (Next.js, React, PHP/MySQL, C++, Java), and interface/graphic design craft.",
  },
  {
    id: "availability",
    question: "What roles or collaborations are you currently open to?",
    answer:
      "As a Freshman Computer Science undergraduate at Misr International University based in Cairo, Egypt, I am open to cybersecurity/SOC internships, junior software engineering roles, Linux/cloud infrastructure projects, and selective freelance web engineering collaborations — remote or hybrid.",
  },
  {
    id: "security-approach",
    question: "How do you combine software engineering with security?",
    answer:
      "I treat security as an architectural baseline rather than a post-launch patch — from strict Linux user/group permissions, hardened SSH, and VLAN segmentation to structured backend validation, clean database design, and reproducible system monitoring.",
  },
  {
    id: "verify-credentials",
    question: "Can recruiters verify your certifications and academic work directly?",
    answer:
      "Yes. Every credential in the Certifications Vault links directly to its local certificate document preview and — where supported by Credly, Coursera, Udemy, or OPSWAT — opens the official external verification badge. Code repositories are linked directly to my GitHub profile.",
  },
  {
    id: "reach-out",
    question: "What is the fastest way to get in touch?",
    answer:
      "Use the pre-filled Email or WhatsApp links in the Contact Deck or Footer below, or connect directly on LinkedIn. You can also download my full CV PDF in one click from the hero bar or About section.",
  },
]

// Honest, clearly flagged placeholder config — replace with real quotes when ready
export const ENDORSEMENTS_PLACEHOLDER = {
  enabled: true,
  label: "PLACEHOLDER // ENDORSEMENTS",
  heading: "Peer & Mentor Recommendations",
  note: "No fake testimonials are used. Replace these slots in lib/portfolio-data.ts with real quotes from MIU faculty (e.g., Cisco Academy instructors), project teammates, or clients — or set enabled: false to hide.",
  slots: [
    {
      role: "Academic Mentor / Instructor",
      org: "Misr International University",
      prompt: "[Placeholder: Add a verified recommendation from a professor or Cisco Academy instructor]",
    },
    {
      role: "Project Collaborator / Teammate",
      org: "Engineering Team",
      prompt: "[Placeholder: Add a real quote from a teammate on MIU QuickBit, PopStream, or ML coursework]",
    },
  ],
} as const
