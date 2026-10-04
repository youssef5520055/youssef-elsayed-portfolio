/* ====================================================
   ADMIN JS — Full Portfolio Control Panel Logic
   Connected to index.html via localStorage bridge
   ==================================================== */

// ========== DEFAULT DATA (mirrors script.js) ==========
const DEFAULT_SKILLS = [
  { id: uid(), category: "cybersecurity", name: "Ethical Hacking", level: 92, description: "Penetration testing and vulnerability assessment", icon: "shield" },
  { id: uid(), category: "cybersecurity", name: "Penetration Testing", level: 88, description: "Security testing and exploitation techniques", icon: "shield" },
  { id: uid(), category: "cybersecurity", name: "Vulnerability Assessment", level: 85, description: "Security scanning and risk analysis", icon: "shield" },
  { id: uid(), category: "cybersecurity", name: "Incident Response", level: 80, description: "Security incident handling and forensics", icon: "shield" },
  { id: uid(), category: "network", name: "Network Fundamentals", level: 85, description: "TCP/IP, OSI model, and networking protocols", icon: "network" },
  { id: uid(), category: "network", name: "Routing & Switching", level: 82, description: "Cisco networking and infrastructure", icon: "network" },
  { id: uid(), category: "network", name: "Firewall Configuration", level: 80, description: "Network security appliances", icon: "network" },
  { id: uid(), category: "network", name: "Red Hat Linux", level: 80, description: "Red Hat Enterprise Linux administration and configuration", icon: "network" },
  { id: uid(), category: "network", name: "Linux Administration", level: 78, description: "Linux system administration, shell scripting and open-source tools", icon: "network" },
  { id: uid(), category: "cloud", name: "Kubernetes Security", level: 88, description: "Container orchestration security", icon: "cloud" },
  { id: uid(), category: "cloud", name: "Container Security", level: 85, description: "Docker and container hardening", icon: "cloud" },
  { id: uid(), category: "cloud", name: "DevSecOps", level: 82, description: "Security in CI/CD pipelines", icon: "cloud" },
  { id: uid(), category: "cloud", name: "Cloud Architecture", level: 84, description: "Designing scalable and secure cloud infrastructure on AWS", icon: "cloud" },
  { id: uid(), category: "cloud", name: "AWS Services", level: 82, description: "EC2, S3, VPC, IAM, RDS and core AWS service management", icon: "cloud" },
  { id: uid(), category: "programming", name: "Object-Oriented Programming", level: 85, description: "Java, C++, and OOP principles", icon: "code" },
  { id: uid(), category: "programming", name: "Python Scripting", level: 82, description: "Automation and security scripting", icon: "code" },
  { id: uid(), category: "programming", name: "Web Development", level: 80, description: "HTML, CSS, JavaScript, and frameworks", icon: "code" },
];

const DEFAULT_CERTS = [
  { id: uid(), name: "Certified Kubernetes Security Specialist Masterclass", issuer: "Udemy", date: "Jul 29, 2025", category: "Container Security", skills: ["Kubernetes Security", "Container Security", "DevSecOps", "Cloud Security"], credentialId: "UC-faeef1b2-ab28-4db7-8b84-cf2c7d5f9458", color: "teal-cyan", pdfFile: "UC-faeef1b2-ab28-4db7-8b84-cf2c7d5f9458.pdf" },
  { id: uid(), name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", date: "Aug 01, 2025", category: "Networking", skills: ["Network Fundamentals", "Routing", "Switching"], credentialId: "CCNA-6ac89b23-bf0b-423e-ad2e-d569d54c0f25", color: "blue-cyan", pdfFile: "CCNA-_Introduction_to_Networks_certificate_youssefelsayed5520055-gmail-com_6ac89b23-bf0b-423e-ad2e-d569d54c0f25.pdf" },
  { id: uid(), name: "CC Certified in Cybersecurity", issuer: "ISC2 / Cisco Networking Academy", date: "Jan 08, 2025", category: "Cybersecurity", skills: ["Security Principles", "Risk Management", "Incident Response"], credentialId: "CC-Cybersecurity-2025", color: "red-pink", pdfFile: "CC Certified in Cybersecurity.pdf" },
  { id: uid(), name: "Foundations of Cybersecurity", issuer: "Google via Coursera", date: "Jan 21, 2025", category: "Cybersecurity", skills: ["Security Frameworks", "Threat Analysis", "Compliance"], credentialId: "ZW3R6BDVMNZZ", color: "red-pink", pdfFile: "Coursera ZW3R6BDVMNZZ.pdf" },
  { id: uid(), name: "Ethical Hacker", issuer: "Cisco Networking Academy", date: "Feb 10, 2025", category: "Penetration Testing", skills: ["Vulnerability Assessment", "Penetration Testing", "Security Auditing"], credentialId: "CISCO-EH-2025", color: "orange-red", pdfFile: "EthicalHackerUpdate20250210-27-vsm7vm.pdf" },
  { id: uid(), name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Jan 12, 2025", category: "Cybersecurity", skills: ["Security Fundamentals", "Threat Landscape", "Defense Strategies"], credentialId: "CISCO-INTRO-2025", color: "red-pink", pdfFile: "Introduction_to_Cybersecurity_Badge20250112-26-st37nf.pdf" },
  { id: uid(), name: "Cybersecurity Awareness: Cybersecurity Terminology PROJECT", issuer: "LinkedIn Learning", date: "Jan 04, 2025", category: "Security Awareness", skills: ["Security Terminology", "Project Apply", "Information Security Awareness"], credentialId: "LI-CyberProject-2025", color: "green-emerald", pdfFile: "CertificateOfCompletion_Cybersecurity Awareness Cybersecurity Terminology PROJECT.pdf" },
  { id: uid(), name: "Cybersecurity Awareness: Cybersecurity Terminology", issuer: "LinkedIn Learning", date: "Jan 04, 2025", category: "Security Awareness", skills: ["Security Terminology", "Information Security Awareness"], credentialId: "LI-CyberTerm-2025", color: "green-emerald", pdfFile: "CertificateOfCompletion_Cybersecurity Awareness Cybersecurity Terminology.pdf" },
  { id: uid(), name: "Developing Your Emotional Intelligence", issuer: "LinkedIn Learning", date: "Jan 03, 2025", category: "Soft Skills", skills: ["Emotional Intelligence", "Leadership", "Communication"], credentialId: "LI-EI-2025", color: "purple-violet", pdfFile: "CertificateOfCompletion_Developing Your Emotional Intelligence.pdf" },
  { id: uid(), name: "What Is Generative AI?", issuer: "LinkedIn Learning", date: "Jan 04, 2025", category: "Artificial Intelligence", skills: ["Generative AI", "AI Tools", "Machine Learning"], credentialId: "LI-GenAI-2025", color: "indigo-purple", pdfFile: "CertificateOfCompletion_What Is Generative AI.pdf" },
  { id: uid(), name: "Cybersecurity Basics", issuer: "IBM / SkillsBuild", date: "2025", category: "Cybersecurity", skills: ["Cyber Threats", "Security Basics", "Risk Awareness"], credentialId: "IBM-CyberBasics-2025", color: "red-pink", pdfFile: "cybersecurity basics.pdf" },
  { id: uid(), name: "IBM Design Thinking Practitioner", issuer: "IBM", date: "Jan 02, 2026", category: "Design Thinking", skills: ["Design Thinking", "Problem Solving", "User-Centric Design"], credentialId: "IBM-Design-2026", color: "yellow-orange", pdfFile: "IBMDesign20260102-29-8xwhsz.pdf" },
  { id: uid(), name: "IBM SkillsBuild Certificate", issuer: "IBM", date: "2025", category: "Technology", skills: ["Digital Skills", "Technology Fundamentals"], credentialId: "IBM-SB-2025", color: "yellow-orange", pdfFile: "IBM.pdf" },
  { id: uid(), name: "AWS Academy Graduate — Cloud Architecting", issuer: "AWS Academy (Amazon Web Services)", date: "Apr 11, 2026", category: "Cloud Computing", skills: ["Cloud Architecture", "AWS Services", "EC2 & VPC", "IAM Security", "Cloud Infrastructure Design"], credentialId: "AWS-CloudArch-20260411", color: "yellow-orange", pdfFile: "AWS_Academy_Graduate___Cloud_Architecting___Training_Badge_Badge20260411-32-hwygn6.pdf" },
  { id: uid(), name: "Red Hat Course Attendance", issuer: "Red Hat", date: "Mar 24, 2026", category: "Linux & Open Source", skills: ["Red Hat Linux", "Linux Administration", "Enterprise Linux", "Open Source Technologies"], credentialId: "RH-CourseAttendance-20260324", color: "orange-red", pdfFile: "CourseAttendance20260324-32-8zw82c.pdf" },
];

const DEFAULT_PROJECTS = [
  { id: uid(), title: "MIU Campus Network Infrastructure", description: "Complete university network design and configuration using Cisco Packet Tracer, implementing VLANs, routing protocols, security policies, and redundancy for 5000+ users across multiple buildings", icon: "network", color: "blue-cyan", tags: ["Cisco Packet Tracer", "VLAN Configuration", "OSPF Routing", "Network Security", "Redundancy Design"], link: "" },
  { id: uid(), title: "MIU QuickBit", description: "Food ordering website for university showcasing web development skills", icon: "globe", color: "cyan-blue", tags: ["Web Development", "Database", "UI/UX"], link: "" },
  { id: uid(), title: "16-bit Adder & 2's Complement", description: "Hardware device demonstrating digital circuit design expertise", icon: "cpu", color: "purple-pink", tags: ["Hardware Design", "Digital Circuits", "Logic Gates"], link: "" },
  { id: uid(), title: "Student Grades Management", description: "Program using data structures highlighting algorithm optimization", icon: "database", color: "green-cyan", tags: ["Data Structures", "Algorithms", "Programming"], link: "" },
  { id: uid(), title: "Phone Store Management", description: "Comprehensive program using OOP reflecting software design capabilities", icon: "terminal", color: "orange-red", tags: ["OOP", "Software Design", "Database Management"], link: "" },
];

// ========== STATE ==========
let skills = [];
let certs = [];
let projects = [];
let currentModal = null;
let editingId = null;
let deleteCallback = null;
let currentSkillFilter = 'all';
let tagInputValues = {};

function uid() {
  return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// ========== STORAGE ==========
const KEYS = {
  skills: 'portfolio_skills',
  certs: 'portfolio_certs',
  projects: 'portfolio_projects',
  password: 'admin_password',
  loggedIn: 'admin_logged_in',
};

async function saveData() {
  localStorage.setItem(KEYS.skills, JSON.stringify(skills));
  localStorage.setItem(KEYS.certs, JSON.stringify(certs));
  localStorage.setItem(KEYS.projects, JSON.stringify(projects));
  
  if (window.firebaseDB) {
      try {
          const docRef = window.firebaseDoc(window.firebaseDB, "portfolio", "data");
          await window.firebaseSetDoc(docRef, {
              skills,
              certs,
              projects,
              bio: localStorage.getItem('portfolio_bio') || '',
              profileImage: localStorage.getItem('portfolio_profile_image') || ''
          }, { merge: true });
          flashSync();
      } catch(e) {
          console.error("Firebase sync error:", e);
      }
  } else {
      flashSync();
  }
}

async function loadData() {
  if (window.firebaseDB) {
      try {
          const docRef = window.firebaseDoc(window.firebaseDB, "portfolio", "data");
          const docSnap = await window.firebaseGetDoc(docRef);
          if (docSnap.exists()) {
              const data = docSnap.data();
              if (data.skills) skills = data.skills;
              if (data.certs) certs = data.certs;
              if (data.projects) projects = data.projects;
              if (data.bio) localStorage.setItem('portfolio_bio', data.bio);
              if (data.profileImage) localStorage.setItem('portfolio_profile_image', data.profileImage);
          }
      } catch (e) {
          console.error("Failed to load from Firebase:", e);
      }
  }
  
  if (!skills.length) skills = localStorage.getItem(KEYS.skills) ? JSON.parse(localStorage.getItem(KEYS.skills)) : DEFAULT_SKILLS.map(x => ({...x, id: uid()}));
  if (!certs.length) certs = localStorage.getItem(KEYS.certs) ? JSON.parse(localStorage.getItem(KEYS.certs)) : DEFAULT_CERTS.map(x => ({...x, id: uid()}));
  if (!projects.length) projects = localStorage.getItem(KEYS.projects) ? JSON.parse(localStorage.getItem(KEYS.projects)) : DEFAULT_PROJECTS.map(x => ({...x, id: uid()}));

  // === SMART MERGE: add any new default certs/skills not yet in localStorage ===
  let merged = false;

  DEFAULT_CERTS.forEach(def => {
    const alreadyIn = certs.some(c => c.credentialId === def.credentialId);
    if (!alreadyIn) {
      certs.push({ ...def, id: uid() });
      merged = true;
    }
  });

  DEFAULT_SKILLS.forEach(def => {
    const alreadyIn = skills.some(s => s.name === def.name);
    if (!alreadyIn) {
      skills.push({ ...def, id: uid() });
      merged = true;
    }
  });

  if (merged) saveData();
}

function flashSync() {
  const el = document.getElementById('syncStatus');
  if (!el) return;
  el.style.color = '#10b981';
  setTimeout(() => { el.style.color = ''; }, 1500);
}

// ========== AUTH ==========
function getPassword() {
  return localStorage.getItem(KEYS.password) || 'Youssef552005***';
}

function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err = document.getElementById('loginError');

  if (user === 'youssef' && pass === getPassword()) {
    localStorage.setItem(KEYS.loggedIn, '1');
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').classList.remove('hidden');
    initDashboard();
  } else {
    err.textContent = 'Invalid username or password.';
    document.getElementById('loginPass').value = '';
  }
}

function logout() {
  localStorage.removeItem(KEYS.loggedIn);
  location.reload();
}

function changePassword() {
  const cur = document.getElementById('currentPass').value;
  const nw = document.getElementById('newPass').value;
  const cf = document.getElementById('confirmPass').value;

  if (cur !== getPassword()) { showToast('Current password is wrong', 'error'); return; }
  if (nw.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
  if (nw !== cf) { showToast('Passwords do not match', 'error'); return; }

  localStorage.setItem(KEYS.password, nw);
  document.getElementById('currentPass').value = '';
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
  showToast('Password updated successfully!', 'success');
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  // Check if already logged in
  if (localStorage.getItem(KEYS.loggedIn) === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').classList.remove('hidden');
    initDashboard();
  }
});

async function initDashboard() {
  await loadData();
  renderAll();
  initNavigation();
  updateDashboard();
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const section = item.getAttribute('data-section');
      switchSection(section);
    });
  });
}

function switchSection(name) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(i => {
    i.classList.toggle('active', i.getAttribute('data-section') === name);
  });

  // Update sections
  document.querySelectorAll('.content-section').forEach(s => {
    s.classList.toggle('active', s.id === 'section-' + name);
  });

  // Update breadcrumb
  const labels = { dashboard: 'Dashboard', skills: 'Skills', certifications: 'Certifications', projects: 'Projects', settings: 'Settings' };
  document.getElementById('currentSection').textContent = labels[name] || name;

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');

  // Load settings values when settings tab is opened
  if (name === 'settings') loadSettingsValues();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ========== RENDER ALL ==========
function renderAll() {
  renderSkills();
  renderCerts();
  renderProjects();
  updateCounts();
  updateDashboard();
}

function updateCounts() {
  document.getElementById('skillsCount').textContent = skills.length;
  document.getElementById('certsCount').textContent = certs.length;
  document.getElementById('projectsCount').textContent = projects.length;
  document.getElementById('statSkills').textContent = skills.length;
  document.getElementById('statCerts').textContent = certs.length;
  document.getElementById('statProjects').textContent = projects.length;

  const avg = skills.length ? Math.round(skills.reduce((a, s) => a + s.level, 0) / skills.length) : 0;
  document.getElementById('statAvg').textContent = avg + '%';
}

function updateDashboard() {
  // Recent skills
  const recentSkills = document.getElementById('recentSkills');
  const last5skills = [...skills].slice(-5).reverse();
  recentSkills.innerHTML = last5skills.length ? last5skills.map(s => `
    <div class="recent-item">
      <span class="recent-item-name">${esc(s.name)}</span>
      <span class="recent-item-meta">${s.level}% · ${s.category}</span>
    </div>
  `).join('') : '<p style="color:#64748b;font-size:0.85rem;">No skills yet.</p>';

  // Recent certs
  const recentCerts = document.getElementById('recentCerts');
  const last5certs = [...certs].slice(-5).reverse();
  recentCerts.innerHTML = last5certs.length ? last5certs.map(c => `
    <div class="recent-item">
      <span class="recent-item-name">${esc(c.name)}</span>
      <span class="recent-item-meta">${esc(c.issuer)}</span>
    </div>
  `).join('') : '<p style="color:#64748b;font-size:0.85rem;">No certifications yet.</p>';
}

// ========== SKILLS ==========
function filterSkills(cat, btn) {
  currentSkillFilter = cat;
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderSkills();
}

function renderSkills() {
  const grid = document.getElementById('skillsList');
  const filtered = currentSkillFilter === 'all' ? skills : skills.filter(s => s.category === currentSkillFilter);

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <p>No skills found. Click "Add Skill" to get started.</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(s => `
    <div class="item-card">
      <div class="item-card-top">
        <div class="item-card-title">${esc(s.name)}</div>
        <div class="item-card-actions">
          <button class="action-btn edit" title="Edit" onclick="editSkill('${s.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('skill', '${s.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
      <div class="category-badge" style="${catStyle(s.category)}">${s.category}</div>
      <div class="item-card-meta">${esc(s.description)}</div>
      <div class="skill-bar-wrapper">
        <div class="skill-bar-label">
          <span>Proficiency</span>
          <span>${s.level}%</span>
        </div>
        <div class="skill-bar"><div class="skill-bar-fill" style="width:${s.level}%"></div></div>
      </div>
    </div>
  `).join('');
}

// ========== CERTIFICATIONS ==========
function renderCerts() {
  const grid = document.getElementById('certsList');

  if (!certs.length) {
    grid.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
      <p>No certifications yet. Click "Add Certification" to start.</p>
    </div>`;
    return;
  }

  grid.innerHTML = certs.map(c => `
    <div class="item-card">
      <div class="item-card-top">
        <div class="item-card-title">${esc(c.name)}</div>
        <div class="item-card-actions">
          <button class="action-btn edit" title="Edit" onclick="editCert('${c.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('cert', '${c.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
      <div class="category-badge" style="background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.25);">${esc(c.category)}</div>
      <div class="item-card-meta">
        <strong>${esc(c.issuer)}</strong> · ${esc(c.date)}
      </div>
      <div class="item-card-tags">
        ${(c.skills || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}
      </div>
      <div class="item-card-meta" style="margin-top:0.6rem;font-family:'JetBrains Mono',monospace;font-size:0.72rem;opacity:0.6;">
        ID: ${esc(c.credentialId)}
      </div>
    </div>
  `).join('');
}

// ========== PROJECTS ==========
function renderProjects() {
  const grid = document.getElementById('projectsList');

  if (!projects.length) {
    grid.innerHTML = `<div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      <p>No projects yet. Click "Add Project" to showcase your work.</p>
    </div>`;
    return;
  }

  grid.innerHTML = projects.map(p => `
    <div class="item-card">
      <div class="item-card-top">
        <div class="item-card-title">${esc(p.title)}</div>
        <div class="item-card-actions">
          <button class="action-btn edit" title="Edit" onclick="editProject('${p.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('project', '${p.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
          </button>
        </div>
      </div>
      <div class="item-card-meta">${esc(p.description)}</div>
      <div class="item-card-tags" style="margin-top:0.6rem;">
        ${(p.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}
      </div>
      ${p.link ? `<div style="margin-top:0.75rem;"><a href="${esc(p.link)}" target="_blank" style="color:#00c8ff;font-size:0.8rem;text-decoration:none;">🔗 View Project</a></div>` : ''}
    </div>
  `).join('');
}

// ========== MODAL SYSTEM ==========
function openModal(type, id = null) {
  currentModal = type;
  editingId = id;
  tagInputValues = {};

  const overlay = document.getElementById('modalOverlay');
  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');

  overlay.classList.remove('hidden');

  if (type === 'skill') {
    const skill = id ? skills.find(s => s.id === id) : null;
    title.textContent = id ? 'Edit Skill' : 'Add New Skill';
    body.innerHTML = buildSkillForm(skill);
    initTagInput('skillTagsInput', 'skillTagsContainer', skill ? [] : []);
    const rangeEl = document.getElementById('skillLevel');
    const valEl = document.getElementById('skillLevelVal');
    if (rangeEl) rangeEl.addEventListener('input', () => valEl.textContent = rangeEl.value + '%');
  }

  if (type === 'cert') {
    const cert = id ? certs.find(c => c.id === id) : null;
    title.textContent = id ? 'Edit Certification' : 'Add Certification';
    body.innerHTML = buildCertForm(cert);
    initTagInput('certSkillsInput', 'certSkillsContainer', cert ? cert.skills || [] : []);
  }

  if (type === 'project') {
    const project = id ? projects.find(p => p.id === id) : null;
    title.textContent = id ? 'Edit Project' : 'Add Project';
    body.innerHTML = buildProjectForm(project);
    initTagInput('projectTagsInput', 'projectTagsContainer', project ? project.tags || [] : []);
  }
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  currentModal = null;
  editingId = null;
  tagInputValues = {};
}

function saveModalItem() {
  if (currentModal === 'skill') saveSkill();
  if (currentModal === 'cert') saveCert();
  if (currentModal === 'project') saveProject();
}

// ========== SKILL FORM ==========
function buildSkillForm(skill) {
  return `
    <div class="input-group">
      <label>Skill Name *</label>
      <input type="text" id="skillName" placeholder="e.g. Ethical Hacking" value="${esc(skill?.name || '')}">
    </div>
    <div class="input-group">
      <label>Category *</label>
      <select id="skillCategory">
        ${['cybersecurity','network','cloud','programming'].map(c =>
          `<option value="${c}" ${skill?.category === c ? 'selected' : ''}>${c.charAt(0).toUpperCase()+c.slice(1)}</option>`
        ).join('')}
      </select>
    </div>
    <div class="slider-group">
      <label>Proficiency Level <span id="skillLevelVal">${skill?.level || 80}%</span></label>
      <input type="range" id="skillLevel" min="1" max="100" value="${skill?.level || 80}">
    </div>
    <div class="input-group">
      <label>Description</label>
      <textarea id="skillDesc" placeholder="Brief description of this skill...">${esc(skill?.description || '')}</textarea>
    </div>
  `;
}

function saveSkill() {
  const name = document.getElementById('skillName').value.trim();
  const category = document.getElementById('skillCategory').value;
  const level = parseInt(document.getElementById('skillLevel').value);
  const description = document.getElementById('skillDesc').value.trim();

  if (!name) { showToast('Skill name is required', 'error'); return; }

  const iconMap = { cybersecurity: 'shield', network: 'network', cloud: 'cloud', programming: 'code' };

  if (editingId) {
    const idx = skills.findIndex(s => s.id === editingId);
    if (idx > -1) skills[idx] = { ...skills[idx], name, category, level, description, icon: iconMap[category] };
    showToast('Skill updated!', 'success');
  } else {
    skills.push({ id: uid(), name, category, level, description, icon: iconMap[category] });
    showToast('Skill added!', 'success');
  }

  saveData();
  renderAll();
  closeModal();
}

function editSkill(id) { openModal('skill', id); }

// ========== CERT FORM ==========
function buildCertForm(cert) {
  return `
    <div class="input-group">
      <label>Certificate Name *</label>
      <input type="text" id="certName" placeholder="e.g. Certified Ethical Hacker" value="${esc(cert?.name || '')}">
    </div>
    <div class="input-group">
      <label>Issuer *</label>
      <input type="text" id="certIssuer" placeholder="e.g. Cisco Networking Academy" value="${esc(cert?.issuer || '')}">
    </div>
    <div class="input-group">
      <label>Date *</label>
      <input type="text" id="certDate" placeholder="e.g. Jan 08, 2025" value="${esc(cert?.date || '')}">
    </div>
    <div class="input-group">
      <label>Category</label>
      <input type="text" id="certCategory" placeholder="e.g. Cybersecurity" value="${esc(cert?.category || '')}">
    </div>
    <div class="input-group">
      <label>Credential ID</label>
      <input type="text" id="certCredId" placeholder="e.g. UC-xxxx-xxxx" value="${esc(cert?.credentialId || '')}">
    </div>
    <div class="input-group">
      <label>PDF File (Optional. Overrides existing)</label>
      <input type="file" id="certPdfFile" accept="application/pdf">
      <div style="font-size:0.8rem;color:#888;margin-top:0.4rem;">Current file: <a href="${cert?.pdfFile?.startsWith('http') ? cert.pdfFile : 'public/certificates/' + (cert?.pdfFile||'')}" target="_blank" style="color:#0ea5e9;">${esc(cert?.pdfFile || 'None')}</a></div>
      <input type="hidden" id="certPdfOriginalUrl" value="${esc(cert?.pdfFile || '')}">
    </div>
    <div class="input-group">
      <label>Skills Covered (press Enter to add)</label>
      <div class="tags-input-wrapper" id="certSkillsContainer"></div>
      <input type="text" id="certSkillsInput" placeholder="Type a skill and press Enter" style="display:none">
    </div>
  `;
}

async function saveCert() {
  const name = document.getElementById('certName').value.trim();
  const issuer = document.getElementById('certIssuer').value.trim();
  const date = document.getElementById('certDate').value.trim();
  const category = document.getElementById('certCategory').value.trim();
  const credentialId = document.getElementById('certCredId').value.trim();
  const certSkillsList = tagInputValues['certSkillsContainer'] || [];
  
  const fileInput = document.getElementById('certPdfFile').files[0];
  let pdfFile = document.getElementById('certPdfOriginalUrl').value;

  if (!name || !issuer) { showToast('Name and Issuer are required', 'error'); return; }

  const saveBtn = document.getElementById('modalSave');
  saveBtn.textContent = 'Uploading...';
  saveBtn.disabled = true;

  if (fileInput && window.firebaseStorage) {
      try {
          const storageRef = window.firebaseStorage.ref();
          const fileRef = storageRef.child('certificates/' + Date.now() + '_' + fileInput.name);
          await fileRef.put(fileInput);
          pdfFile = await fileRef.getDownloadURL();
      } catch (err) {
          console.error("PDF upload failed", err);
          showToast('Failed to upload PDF.', 'error');
          saveBtn.textContent = 'Save';
          saveBtn.disabled = false;
          return;
      }
  }

  const obj = { name, issuer, date, category, credentialId, pdfFile, skills: certSkillsList, color: 'blue-cyan' };

  if (editingId) {
    const idx = certs.findIndex(c => c.id === editingId);
    if (idx > -1) certs[idx] = { ...certs[idx], ...obj };
    showToast('Certification updated!', 'success');
  } else {
    certs.push({ id: uid(), ...obj });
    showToast('Certification added!', 'success');
  }

  saveBtn.textContent = 'Save';
  saveBtn.disabled = false;

  saveData();
  renderAll();
  closeModal();
}

function editCert(id) { openModal('cert', id); }

// ========== PROJECT FORM ==========
function buildProjectForm(project) {
  const icons = ['network','globe','cpu','database','terminal','shield','code','lock','server','monitor'];
  const colors = ['blue-cyan','cyan-blue','purple-pink','green-cyan','orange-red','red-pink','teal-cyan'];

  return `
    <div class="input-group">
      <label>Project Title *</label>
      <input type="text" id="projectTitle" placeholder="e.g. MIU Campus Network" value="${esc(project?.title || '')}">
    </div>
    <div class="input-group">
      <label>Description *</label>
      <textarea id="projectDesc" placeholder="Describe the project...">${esc(project?.description || '')}</textarea>
    </div>
    <div class="input-group">
      <label>Icon</label>
      <select id="projectIcon">
        ${icons.map(i => `<option value="${i}" ${project?.icon === i ? 'selected' : ''}>${i}</option>`).join('')}
      </select>
    </div>
    <div class="input-group">
      <label>Color Theme</label>
      <select id="projectColor">
        ${colors.map(c => `<option value="${c}" ${project?.color === c ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
    </div>
    <div class="input-group">
      <label>Project Link (optional)</label>
      <input type="url" id="projectLink" placeholder="https://..." value="${esc(project?.link || '')}">
    </div>
    <div class="input-group">
      <label>Tech Tags (press Enter to add)</label>
      <div class="tags-input-wrapper" id="projectTagsContainer"></div>
      <input type="text" id="projectTagsInput" placeholder="Type a tag and press Enter" style="display:none">
    </div>
  `;
}

function saveProject() {
  const title = document.getElementById('projectTitle').value.trim();
  const description = document.getElementById('projectDesc').value.trim();
  const icon = document.getElementById('projectIcon').value;
  const color = document.getElementById('projectColor').value;
  const link = document.getElementById('projectLink').value.trim();
  const tags = tagInputValues['projectTagsContainer'] || [];

  if (!title) { showToast('Project title is required', 'error'); return; }

  const obj = { title, description, icon, color, link, tags };

  if (editingId) {
    const idx = projects.findIndex(p => p.id === editingId);
    if (idx > -1) projects[idx] = { ...projects[idx], ...obj };
    showToast('Project updated!', 'success');
  } else {
    projects.push({ id: uid(), ...obj });
    showToast('Project added!', 'success');
  }

  saveData();
  renderAll();
  closeModal();
}

function editProject(id) { openModal('project', id); }

// ========== TAG INPUT ==========
function initTagInput(inputId, containerId, initialTags) {
  const container = document.getElementById(containerId);
  if (!container) return;

  tagInputValues[containerId] = [...initialTags];

  // Render existing tags
  function renderTags() {
    const existingTags = container.querySelectorAll('.tag');
    existingTags.forEach(t => t.remove());

    tagInputValues[containerId].forEach((tag, i) => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.innerHTML = `${esc(tag)} <span onclick="removeTag('${containerId}', ${i})">✕</span>`;
      container.insertBefore(el, fakeInput);
    });
  }

  // Fake input
  const fakeInput = document.createElement('input');
  fakeInput.placeholder = 'Type and press Enter';
  fakeInput.style.cssText = 'border:none;background:transparent;outline:none;color:#e2e8f0;font-family:Inter,sans-serif;font-size:0.85rem;min-width:80px;flex:1;padding:0.2rem 0.3rem;';
  container.appendChild(fakeInput);

  fakeInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = fakeInput.value.trim();
      if (val && !tagInputValues[containerId].includes(val)) {
        tagInputValues[containerId].push(val);
        renderTags();
      }
      fakeInput.value = '';
    }
    if (e.key === 'Backspace' && !fakeInput.value && tagInputValues[containerId].length) {
      tagInputValues[containerId].pop();
      renderTags();
    }
  });

  container.addEventListener('click', () => fakeInput.focus());
  renderTags();
}

function removeTag(containerId, index) {
  if (tagInputValues[containerId]) {
    tagInputValues[containerId].splice(index, 1);
    // Re-init to refresh
    const container = document.getElementById(containerId);
    if (!container) return;
    const tags = container.querySelectorAll('.tag');
    tags.forEach(t => t.remove());
    const input = container.querySelector('input');
    tagInputValues[containerId].forEach((tag, i) => {
      const el = document.createElement('span');
      el.className = 'tag';
      el.innerHTML = `${esc(tag)} <span onclick="removeTag('${containerId}', ${i})">✕</span>`;
      container.insertBefore(el, input);
    });
  }
}

// ========== DELETE ==========
function confirmDelete(type, id) {
  document.getElementById('deleteOverlay').classList.remove('hidden');
  document.getElementById('confirmDeleteBtn').onclick = () => {
    if (type === 'skill') {
      skills = skills.filter(s => s.id !== id);
      showToast('Skill deleted', 'success');
    }
    if (type === 'cert') {
      certs = certs.filter(c => c.id !== id);
      showToast('Certification deleted', 'success');
    }
    if (type === 'project') {
      projects = projects.filter(p => p.id !== id);
      showToast('Project deleted', 'success');
    }
    saveData();
    renderAll();
    closeDeleteModal();
  };
}

function closeDeleteModal() {
  document.getElementById('deleteOverlay').classList.add('hidden');
}

// ========== PROFILE IMAGE ==========
async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { showToast('Please select an image file', 'error'); return; }
  if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB', 'error'); return; }

  if (window.firebaseStorage) {
      showToast('Uploading photo...', 'info');
      try {
          const storageRef = window.firebaseStorage.ref();
          const fileRef = storageRef.child('profile/' + Date.now() + '_' + file.name);
          await fileRef.put(file);
          const url = await fileRef.getDownloadURL();
          
          localStorage.setItem('portfolio_profile_image', url);
          document.getElementById('adminProfilePreview').src = url;
          saveData();
          showToast('Profile photo updated!', 'success');
      } catch(e) {
          console.error("Photo upload failed", e);
          showToast('Failed to upload image.', 'error');
      }
  } else {
     const reader = new FileReader();
     reader.onload = (e) => {
       const base64 = e.target.result;
       localStorage.setItem('portfolio_profile_image', base64);
       document.getElementById('adminProfilePreview').src = base64;
       saveData();
       showToast('Profile photo updated! Refresh portfolio to see changes.', 'success');
     };
     reader.readAsDataURL(file);
  }
}

function resetProfileImage() {
  localStorage.removeItem('portfolio_profile_image');
  document.getElementById('adminProfilePreview').src = 'public/profile.jpg';
  saveData();
  showToast('Profile photo reset to original.', 'success');
}

// ========== BIO ==========
const DEFAULT_BIO = "Hey! I'm Youssef Elsayed — a Cybersecurity Specialist, Full-Stack Developer, and Graphic Designer focused on building secure, scalable, and visually impactful digital solutions. I integrate offensive security expertise, robust software engineering, and creative design to deliver high-performance systems that are both protected and polished.";

function saveBio() {
  const bio = document.getElementById('bioEditor').value.trim();
  if (!bio) { showToast('Bio cannot be empty', 'error'); return; }
  localStorage.setItem('portfolio_bio', bio);
  saveData();
  showToast('Bio saved! Refresh portfolio to see changes.', 'success');
}

function resetBio() {
  localStorage.removeItem('portfolio_bio');
  document.getElementById('bioEditor').value = DEFAULT_BIO;
  saveData();
  showToast('Bio reset to default.', 'success');
}

function loadSettingsValues() {
  // Load saved bio into editor
  const savedBio = localStorage.getItem('portfolio_bio');
  const bioEl = document.getElementById('bioEditor');
  if (bioEl && savedBio) bioEl.value = savedBio;

  // Load saved profile image
  const savedImg = localStorage.getItem('portfolio_profile_image');
  const previewEl = document.getElementById('adminProfilePreview');
  if (previewEl && savedImg) previewEl.src = savedImg;
}

// ========== SETTINGS ==========
function exportData() {
  const data = { skills, certs, projects, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio_data_' + Date.now() + '.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Data exported!', 'success');
}

function resetToDefaults() {
  if (!confirm('This will reset ALL data to defaults. Are you absolutely sure?')) return;
  localStorage.removeItem(KEYS.skills);
  localStorage.removeItem(KEYS.certs);
  localStorage.removeItem(KEYS.projects);
  loadData();
  renderAll();
  showToast('Reset to defaults!', 'success');
}

// ========== TOAST ==========
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.className = 'toast'; }, 3500);
}

// ========== HELPERS ==========
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function catStyle(cat) {
  const styles = {
    cybersecurity: 'background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.25);',
    network: 'background:rgba(59,130,246,0.12);color:#60a5fa;border:1px solid rgba(59,130,246,0.25);',
    cloud: 'background:rgba(20,184,166,0.12);color:#2dd4bf;border:1px solid rgba(20,184,166,0.25);',
    programming: 'background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.25);',
  };
  return styles[cat] || 'background:rgba(100,116,139,0.12);color:#94a3b8;border:1px solid rgba(100,116,139,0.25);';
}

// Keyboard shortcut: Escape closes modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeDeleteModal();
  }
});
