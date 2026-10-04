// Global variables
const typedText = ""
const isTyping = true
let skillsAnimated = false

// ===== LIVE DATA FROM ADMIN PANEL (Firebase) =====

// Fallback skills (used only if admin panel has never been opened)
const DEFAULT_SKILLS = [
  { category: "cybersecurity", name: "Ethical Hacking", level: 92, description: "Penetration testing and vulnerability assessment", icon: "shield" },
  { category: "cybersecurity", name: "Penetration Testing", level: 88, description: "Security testing and exploitation techniques", icon: "shield" },
  { category: "cybersecurity", name: "Vulnerability Assessment", level: 85, description: "Security scanning and risk analysis", icon: "shield" },
  { category: "cybersecurity", name: "Incident Response", level: 80, description: "Security incident handling and forensics", icon: "shield" },
  { category: "network", name: "Network Fundamentals", level: 85, description: "TCP/IP, OSI model, and networking protocols", icon: "network" },
  { category: "network", name: "Routing & Switching", level: 82, description: "Cisco networking and infrastructure", icon: "network" },
  { category: "network", name: "Firewall Configuration", level: 80, description: "Network security appliances", icon: "network" },
  { category: "network", name: "Red Hat Linux", level: 80, description: "Red Hat Enterprise Linux administration and configuration", icon: "network" },
  { category: "network", name: "Linux Administration", level: 78, description: "Linux system administration, shell scripting and open-source tools", icon: "network" },
  { category: "cloud", name: "Kubernetes Security", level: 88, description: "Container orchestration security", icon: "cloud" },
  { category: "cloud", name: "Container Security", level: 85, description: "Docker and container hardening", icon: "cloud" },
  { category: "cloud", name: "DevSecOps", level: 82, description: "Security in CI/CD pipelines", icon: "cloud" },
  { category: "cloud", name: "Cloud Architecture", level: 84, description: "Designing scalable and secure cloud infrastructure on AWS", icon: "cloud" },
  { category: "cloud", name: "AWS Services", level: 82, description: "EC2, S3, VPC, IAM, RDS and core AWS service management", icon: "cloud" },
  { category: "programming", name: "Object-Oriented Programming", level: 85, description: "Java, C++, and OOP principles", icon: "code" },
  { category: "programming", name: "Python Scripting", level: 82, description: "Automation and security scripting", icon: "code" },
  { category: "programming", name: "Web Development", level: 80, description: "HTML, CSS, JavaScript, and frameworks", icon: "code" },
]

let skillsData = DEFAULT_SKILLS

// Default certifications fallback (used when admin panel hasn't been opened yet)
const DEFAULT_CERTS = [
  { name: "Certified Kubernetes Security Specialist Masterclass", issuer: "Udemy", date: "Jul 29, 2025", category: "Container Security", skills: ["Kubernetes Security", "Container Security", "DevSecOps", "Cloud Security"], credentialId: "UC-faeef1b2-ab28-4db7-8b84-cf2c7d5f9458", color: "teal-cyan", pdfFile: "UC-faeef1b2-ab28-4db7-8b84-cf2c7d5f9458.pdf" },
  { name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", date: "Aug 01, 2025", category: "Networking", skills: ["Network Fundamentals", "Routing", "Switching"], credentialId: "CCNA-6ac89b23-bf0b-423e-ad2e-d569d54c0f25", color: "blue-cyan", pdfFile: "CCNA-_Introduction_to_Networks_certificate_youssefelsayed5520055-gmail-com_6ac89b23-bf0b-423e-ad2e-d569d54c0f25.pdf" },
  { name: "CC Certified in Cybersecurity", issuer: "ISC2 / Cisco Networking Academy", date: "Jan 08, 2025", category: "Cybersecurity", skills: ["Security Principles", "Risk Management", "Incident Response"], credentialId: "CC-Cybersecurity-2025", color: "red-pink", pdfFile: "CC Certified in Cybersecurity.pdf" },
  { name: "Foundations of Cybersecurity", issuer: "Google via Coursera", date: "Jan 21, 2025", category: "Cybersecurity", skills: ["Security Frameworks", "Threat Analysis", "Compliance"], credentialId: "ZW3R6BDVMNZZ", color: "red-pink", pdfFile: "Coursera ZW3R6BDVMNZZ.pdf" },
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy", date: "Feb 10, 2025", category: "Penetration Testing", skills: ["Vulnerability Assessment", "Penetration Testing", "Security Auditing"], credentialId: "CISCO-EH-2025", color: "orange-red", pdfFile: "EthicalHackerUpdate20250210-27-vsm7vm.pdf" },
  { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Jan 12, 2025", category: "Cybersecurity", skills: ["Security Fundamentals", "Threat Landscape", "Defense Strategies"], credentialId: "CISCO-INTRO-2025", color: "red-pink", pdfFile: "Introduction_to_Cybersecurity_Badge20250112-26-st37nf.pdf" },
  { name: "Cybersecurity Awareness: Cybersecurity Terminology PROJECT", issuer: "LinkedIn Learning", date: "Jan 04, 2025", category: "Security Awareness", skills: ["Security Terminology", "Project Apply", "Information Security Awareness"], credentialId: "LI-CyberProject-2025", color: "green-emerald", pdfFile: "CertificateOfCompletion_Cybersecurity Awareness Cybersecurity Terminology PROJECT.pdf" },
  { name: "Cybersecurity Awareness: Cybersecurity Terminology", issuer: "LinkedIn Learning", date: "Jan 04, 2025", category: "Security Awareness", skills: ["Security Terminology", "Information Security Awareness"], credentialId: "LI-CyberTerm-2025", color: "green-emerald", pdfFile: "CertificateOfCompletion_Cybersecurity Awareness Cybersecurity Terminology.pdf" },
  { name: "Developing Your Emotional Intelligence", issuer: "LinkedIn Learning", date: "Jan 03, 2025", category: "Soft Skills", skills: ["Emotional Intelligence", "Leadership", "Communication"], credentialId: "LI-EI-2025", color: "purple-violet", pdfFile: "CertificateOfCompletion_Developing Your Emotional Intelligence.pdf" },
  { name: "What Is Generative AI?", issuer: "LinkedIn Learning", date: "Jan 04, 2025", category: "Artificial Intelligence", skills: ["Generative AI", "AI Tools", "Machine Learning"], credentialId: "LI-GenAI-2025", color: "indigo-purple", pdfFile: "CertificateOfCompletion_What Is Generative AI.pdf" },
  { name: "Cybersecurity Basics", issuer: "IBM / SkillsBuild", date: "2025", category: "Cybersecurity", skills: ["Cyber Threats", "Security Basics", "Risk Awareness"], credentialId: "IBM-CyberBasics-2025", color: "red-pink", pdfFile: "cybersecurity basics.pdf" },
  { name: "IBM Design Thinking Practitioner", issuer: "IBM", date: "Jan 02, 2026", category: "Design Thinking", skills: ["Design Thinking", "Problem Solving", "User-Centric Design"], credentialId: "IBM-Design-2026", color: "yellow-orange", pdfFile: "IBMDesign20260102-29-8xwhsz.pdf" },
  { name: "IBM SkillsBuild Certificate", issuer: "IBM", date: "2025", category: "Technology", skills: ["Digital Skills", "Technology Fundamentals"], credentialId: "IBM-SB-2025", color: "yellow-orange", pdfFile: "IBM.pdf" },
  { name: "AWS Academy Graduate — Cloud Architecting", issuer: "AWS Academy (Amazon Web Services)", date: "Apr 11, 2026", category: "Cloud Computing", skills: ["Cloud Architecture", "AWS Services", "EC2 & VPC", "IAM Security", "Cloud Infrastructure Design"], credentialId: "AWS-CloudArch-20260411", color: "yellow-orange", pdfFile: "AWS_Academy_Graduate___Cloud_Architecting___Training_Badge_Badge20260411-32-hwygn6.pdf" },
  { name: "Red Hat Course Attendance", issuer: "Red Hat", date: "Mar 24, 2026", category: "Linux & Open Source", skills: ["Red Hat Linux", "Linux Administration", "Enterprise Linux", "Open Source Technologies"], credentialId: "RH-CourseAttendance-20260324", color: "orange-red", pdfFile: "CourseAttendance20260324-32-8zw82c.pdf" },
]

// Live data from admin panel (falls back to defaults)
let certificationsData = DEFAULT_CERTS

// Projects live data
let projectsData = null

async function loadFirebaseData() {
  try {
    const docRef = window.firebaseDoc(window.firebaseDB, "portfolio", "data");
    const docSnap = await window.firebaseGetDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.skills) skillsData = data.skills;
      if (data.certs) certificationsData = data.certs;
      if (data.projects) projectsData = data.projects;
      if (data.bio) localStorage.setItem('portfolio_bio', data.bio);
      if (data.profileImage) localStorage.setItem('portfolio_profile_image', data.profileImage);
      return true;
    }
  } catch (e) {
    console.warn("Could not load from Firebase, falling back to defaults.", e);
  }
  return false;
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    if (window.firebaseDB) {
        loadFirebaseData().then(() => initializeApp());
    } else {
        window.addEventListener("firebase-ready", () => {
            loadFirebaseData().then(() => initializeApp());
        });
    }
})

function initializeApp() {
  // Initialize Lucide icons
  lucide.createIcons()

  // Start typing animation
  startTypingAnimation()

  // Initialize mouse follower
  initializeMouseFollower()

  // Initialize tabs
  initializeTabs()

  // Initialize skills
  initializeSkills()

  // Initialize certifications
  initializeCertifications()

  // Initialize projects
  initializeProjects()

  // Update all dynamic content (numbers, bio, image)
  updateDynamicContent()

  // Initialize scroll observer for skills animation
  initializeScrollObserver()

  // Add event listeners
  addEventListeners()
}

function startTypingAnimation() {
  const fullText = "Cybersecurity Engineer"
  const typedTextElement = document.getElementById("typedText")
  const cursor = document.getElementById("cursor")
  let i = 0

  const typeTimer = setInterval(() => {
    if (i < fullText.length) {
      typedTextElement.textContent = fullText.slice(0, i + 1)
      i++
    } else {
      clearInterval(typeTimer)
    }
  }, 150)

  // Cursor blinking
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0"
  }, 500)
}

function initializeMouseFollower() {
  const mouseFollower = document.getElementById("mouseFollower")

  // Throttle function for performance
  function throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  const handleMouseMove = throttle((e) => {
    mouseFollower.style.left = e.clientX - 12 + "px"
    mouseFollower.style.top = e.clientY - 12 + "px"
  }, 16)

  document.addEventListener("mousemove", handleMouseMove)
}

function initializeTabs() {
  const tabTriggers = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const targetTab = trigger.getAttribute("data-tab")

      // Remove active class from all triggers and contents
      tabTriggers.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked trigger and corresponding content
      trigger.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

function initializeSkills() {
  renderSkills("all")

  // Add filter event listeners
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category")

      // Update active filter button
      filterButtons.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Render filtered skills
      renderSkills(category)
    })
  })
}

function renderSkills(category) {
  const skillsGrid = document.getElementById("skillsGrid")
  const filteredSkills = category === "all" ? skillsData : skillsData.filter((skill) => skill.category === category)

  skillsGrid.innerHTML = filteredSkills
    .map(
      (skill, index) => `
        <div class="skill-item">
            <div class="skill-header">
                <div class="skill-name">
                    <i data-lucide="${skill.icon}"></i>
                    <span>${skill.name}</span>
                </div>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-progress">
                <div class="skill-progress-fill" style="--progress: ${skill.level}%" data-delay="${index * 50}"></div>
            </div>
            <p class="skill-description">${skill.description}</p>
        </div>
    `,
    )
    .join("")

  // Re-initialize Lucide icons
  lucide.createIcons()

  // Animate skill bars if skills section is visible
  if (skillsAnimated) {
    animateSkillBars()
  }
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress-fill")
  skillBars.forEach((bar, index) => {
    setTimeout(
      () => {
        bar.classList.add("animate")
      },
      Number.parseInt(bar.getAttribute("data-delay")) || 0,
    )
  })
}

function initializeCertifications() {
  const certificationsGrid = document.querySelector(".certifications-grid")

  certificationsGrid.innerHTML = certificationsData
    .map(
      (cert, index) => `
        <div class="card cert-card">
            <div class="project-overlay"></div>
            <div class="card-header">
                <div class="cert-header">
                    <div class="cert-info">
                        <h3 class="cert-title">
                            <i data-lucide="shield"></i>
                            ${cert.name}
                        </h3>
                        <div class="cert-details">
                            <div class="cert-detail">
                                <i data-lucide="building"></i>
                                ${cert.issuer}
                            </div>
                            <div class="cert-detail">
                                <i data-lucide="calendar"></i>
                                ${cert.date}
                            </div>
                        </div>
                    </div>
                    <span class="cert-category" style="background: linear-gradient(45deg, #${getCategoryColors(cert.category)})">
                        ${cert.category}
                    </span>
                </div>
            </div>
            <div class="card-content">
                <div class="skills-covered">
                    <h4>Skills Covered:</h4>
                    <div class="skills-tags">
                        ${cert.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
                    </div>
                </div>
                <div class="cert-actions">
                    <div class="cert-id">ID: ${cert.credentialId.slice(0, 12)}...</div>
                    <div class="cert-buttons">
                        <button class="btn btn-outline btn-sm cert-view-btn" data-index="${index}">
                            <i data-lucide="file-text"></i>
                            View Certificate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")

  // Re-initialize Lucide icons
  lucide.createIcons()

  // Attach event listeners using event delegation (bulletproof)
  certificationsGrid.addEventListener("click", (e) => {
    // Find closest button
    const viewBtn = e.target.closest(".cert-view-btn");

    if (viewBtn) {
      const cert = certificationsData[parseInt(viewBtn.getAttribute("data-index"))]
      viewCertificate(cert)
    }
  });
}

function getCategoryColors(category) {
  const colors = {
    Cybersecurity: "ef4444, ec4899",
    "Container Security": "14b8a6, 06b6d4",
    Networking: "3b82f6, 06b6d4",
    "Penetration Testing": "f97316, ef4444",
    "Security Awareness": "10b981, 059669",
    "Soft Skills": "8b5cf6, 7c3aed",
    "Artificial Intelligence": "6366f1, 8b5cf6",
    "Infrastructure Security": "eab308, f97316",
  }
  return colors[category] || "6b7280, 4b5563"
}

function initializeScrollObserver() {
  const skillsSection = document.getElementById("skills")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true
          animateSkillBars()
        }
      })
    },
    { threshold: 0.3 },
  )

  if (skillsSection) {
    observer.observe(skillsSection)
  }
}

function addEventListeners() {
  // Scroll handler for header effects
  let isScrolled = false
  const handleScroll = throttle(() => {
    const scrolled = window.scrollY > 50
    if (scrolled !== isScrolled) {
      isScrolled = scrolled
      // Add any scroll-based effects here
    }
  }, 100)

  window.addEventListener("scroll", handleScroll)
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

function initializeProjects() {
  const grid = document.getElementById("projectsGrid")
  if (!grid) return

  // Use live data from admin, else use DEFAULT_PROJECTS fallback
  const DEFAULT_PROJECTS = [
    { title: "MIU Campus Network Infrastructure", description: "Complete university network design and configuration using Cisco Packet Tracer, implementing VLANs, routing protocols, security policies, and redundancy for 5000+ users across multiple buildings", icon: "network", color: "blue-cyan", tags: ["Cisco Packet Tracer", "VLAN Configuration", "OSPF Routing", "Network Security", "Redundancy Design"], link: "" },
    { title: "MIU QuickBit", description: "Food ordering website for university showcasing web development skills", icon: "globe", color: "cyan-blue", tags: ["Web Development", "Database", "UI/UX"], link: "" },
    { title: "16-bit Adder & 2's Complement", description: "Hardware device demonstrating digital circuit design expertise", icon: "cpu", color: "purple-pink", tags: ["Hardware Design", "Digital Circuits", "Logic Gates"], link: "" },
    { title: "Student Grades Management", description: "Program using data structures highlighting algorithm optimization", icon: "database", color: "green-cyan", tags: ["Data Structures", "Algorithms", "Programming"], link: "" },
    { title: "Phone Store Management", description: "Comprehensive program using OOP reflecting software design capabilities", icon: "terminal", color: "orange-red", tags: ["OOP", "Software Design", "Database Management"], link: "" },
  ]

  const data = projectsData || DEFAULT_PROJECTS

  grid.innerHTML = data.map(p => `
    <div class="card project-card" data-color="${p.color || 'blue-cyan'}">
      <div class="project-overlay"></div>
      <div class="card-header">
        <h3 class="card-title">
          <i data-lucide="${p.icon || 'code'}"></i>
          ${p.title}
        </h3>
        <p class="card-description">${p.description}</p>
      </div>
      <div class="card-content">
        <div class="tech-tags">
          ${(p.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        ${p.link ? `<a href="${p.link}" target="_blank" class="btn btn-outline btn-sm" style="margin-top:0.75rem;display:inline-flex;align-items:center;gap:0.4rem;font-size:0.8rem;text-decoration:none;"><i data-lucide="external-link"></i> View Project</a>` : ''}
      </div>
    </div>
  `).join('')

  lucide.createIcons()
}


// ========== AUTO-UPDATE DYNAMIC CONTENT ==========
function updateDynamicContent() {
  // --- Profile Image ---
  const savedImage = localStorage.getItem('portfolio_profile_image')
  if (savedImage) {
    const img = document.getElementById('profilePhoto')
    if (img) img.src = savedImage
  }

  // --- Bio Text ---
  const savedBio = localStorage.getItem('portfolio_bio')
  if (savedBio) {
    const heroBio = document.getElementById('heroBio')
    const aboutBio = document.getElementById('aboutBio')
    if (heroBio) heroBio.textContent = savedBio
    if (aboutBio) aboutBio.textContent = savedBio
  }

  // --- Skills Analytics ---
  const total = skillsData.length
  const expert = skillsData.filter(s => s.level >= 80).length
  const avg = total ? Math.round(skillsData.reduce((a, s) => a + s.level, 0) / total) : 0
  const cats = [...new Set(skillsData.map(s => s.category))].length

  const el = (id) => document.getElementById(id)
  if (el('statTotalSkills')) el('statTotalSkills').textContent = total
  if (el('statExpertSkills')) el('statExpertSkills').textContent = expert
  if (el('statAvgProficiency')) el('statAvgProficiency').textContent = avg + '%'
  if (el('statCategories')) el('statCategories').textContent = cats

  // --- Cert Analytics ---
  const certsArr = certificationsData
  const certTotal = certsArr.length
  const cyberCount = certsArr.filter(c =>
    c.category && (c.category.toLowerCase().includes('cyber') || c.category.toLowerCase().includes('security') || c.category.toLowerCase().includes('penetration') || c.category.toLowerCase().includes('ethical'))
  ).length
  const providers = [...new Set(certsArr.map(c => c.issuer))].length
  const latestYear = certsArr.reduce((max, c) => {
    const y = parseInt(c.date?.match(/\d{4}/)?.[0] || 0)
    return y > max ? y : max
  }, 0)

  if (el('certCountSubtitle')) el('certCountSubtitle').textContent = certTotal + ' verified certifications from industry-leading organizations'
  if (el('statTotalCerts')) el('statTotalCerts').textContent = certTotal
  if (el('statCyberCerts')) el('statCyberCerts').textContent = cyberCount
  if (el('statLatestYear')) el('statLatestYear').textContent = latestYear || '—'
  if (el('statProviders')) el('statProviders').textContent = providers
}


function viewCertificate(cert) {
  const modal = document.getElementById("certificateModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const modalDetails = document.getElementById("modalDetails")

  modalTitle.innerHTML = `<i data-lucide="shield"></i> ${cert.name}`
  modalDescription.textContent = `Issued by ${cert.issuer} · ${cert.date}`
  const pdfUrl = cert.pdfFile && cert.pdfFile.startsWith('http') ? cert.pdfFile : `public/certificates/${cert.pdfFile}`;
  
  modalDetails.innerHTML = `
    <p><strong>Credential ID:</strong> ${cert.credentialId}</p>
    <div style="margin-top:1rem; position: relative;">
      <iframe src="${pdfUrl}#view=FitH" width="100%" height="600px" style="border-radius: 8px; border: none; background: #1a1a2e;"></iframe>
    </div>
    <div style="margin-top:0.75rem; text-align: right;">
      <a href="${pdfUrl}" target="_blank" class="btn btn-outline btn-sm" style="display:inline-flex; align-items:center; gap:0.4rem; font-size:0.8rem; text-decoration:none;">
        <i data-lucide="external-link"></i> Open Fullscreen
      </a>
    </div>
  `

  modal.classList.add("show")
  lucide.createIcons()
}

function closeModal() {
  const modal = document.getElementById("certificateModal")
  modal.classList.remove("show")
  const modalDetails = document.getElementById("modalDetails")
  if (modalDetails) modalDetails.innerHTML = ""
}

function openEmail() {
  window.open(
    "mailto:Youssefelsayed5520055@gmail.com?subject=Portfolio Contact&body=Hello Youssef, I found your portfolio and would like to get in touch.",
    "_blank",
  )
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
  const modal = document.getElementById("certificateModal")
  if (e.target === modal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})
