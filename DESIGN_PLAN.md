# DESIGN_PLAN.md — Youssef Elsayed Hybrid Portfolio Redesign

> **Branch:** `redesign/hybrid-portfolio`  
> **Safety Backup:** Git branch `backup/pre-redesign` + local snapshot `_backup/original-site/` & `_backup/original-assets/` (all original assets, images, CVs, and certificates untouched).  
> **Stack:** Next.js 15.2.4 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Framer Motion 12, `next/font` (`Instrument Serif` + `GeistSans` + `GeistMono`), Lucide React, Sonner, custom WebGL2 GLSL shader (`EtchedAccretion`).

---

## 1. Professional Identity Summary (Holistic Analysis of Youssef Elsayed)

Youssef Elsayed Abdelaziz is a **multidisciplinary Third-Year B.Sc. Computer Science undergraduate (2023–2027)** at **Misr International University (MIU), Cairo, Egypt**, specializing in **Cybersecurity & Network Security** while building across five interconnected disciplines:

1. **Software Engineering & Full-Stack Architecture** — Builds modern web platforms (`Next.js`, `React`, `Tailwind CSS`, `TypeScript`, `PHP`, `MySQL`, `Bootstrap`), desktop applications (`Java`), and data-structure-driven systems (`C++`, OOP, file handling, REST APIs).
2. **Cybersecurity, Infrastructure Defense & SecOps** — Hands-on security engineering spanning network security, vulnerability assessment, web application security, SIEM fundamentals, firewall configuration, ethical hacking/penetration testing fundamentals, critical infrastructure protection (`OPSWAT ICIP`), and Kubernetes/container security.
3. **AI & Machine Learning** — Data preprocessing, feature engineering, multi-algorithm churn classification (`Random Forest`, `Decision Tree`, `SVM`, `KNN`, `Naive Bayes` via `Python`/`Pandas`/`NumPy`/`Scikit-learn`), speech/voice recognition applications (`App Voice Detection`), and Generative AI literacy.
4. **Systems Administration, Networking & Cloud** — Hardened `Ubuntu Server` and `Red Hat Enterprise Linux (RH124 Ver. 10)` administration (`Bash`, `Apache`, `MariaDB`, `SSH`), enterprise multi-building campus networking (`5,000+` users modeled in Cisco Packet Tracer with VLANs, OSPF, redundancy, and security policies; `CCNA: Intro to Networks`; `Huawei Computer Networks V1.0`), and `AWS Academy Cloud Architecting` (60-hour graduate).
5. **Visual & Interface Craft** — Explicitly identifies with visual polish alongside engineering depth (*"systems that are both protected and polished"*; `docs/creative-direction.md`: *"Technical, Precise, Sophisticated — not cliché hacker. Calm confidence. Trustworthy. Mathematically precise."*).

**Voice & Personality:** Confident, calm, architectural, technically precise, and human — never gimmicky "matrix hacker" clichés, never empty marketing buzzwords.

---

## 2. Deep Reference Template Teardown

Both live reference templates were inspected in Playwright across Desktop (`1440×900`) and Mobile (`390×844`) viewports, including computed styles, font faces, stylesheets, keyframes, scroll choreography, and hover states.

### Reference 1 — Crimson Reach (`crimson-dark-agency-portfolio-landing-page-v1.21st.app`)
- **Structure & Flow:** Framed inset hero (`32px` gutter, `16px` radius) with integrated nav that morphs on scroll into a centered floating glass pill (`cr-pill`, `770px` max-width, `backdrop-filter: blur(14px)`), followed by a sticky scroll-scrubbed editorial manifesto (`cr-dots` 22px dot grid + word-by-word opacity reveal + marquee strip), 3D perspective stacked pillar cards (`Going Zero to One` / `One to N` / `Quick Solutions` in 3 tonal surfaces: brushed silver, accent, obsidian), editorial numbered capabilities rows (`(01)`–`(06)`), horizontal/stage featured work carousel with circular arrows, quote carousel, dual tilted editorial contact cards paired with rolling odometer stats, and a framed full-bleed atmospheric closing CTA panel housing the minimal footer.
- **Typography:** High-contrast editorial serif (`CrSerif`, italic accents, tight `-0.04em` tracking, regular 400 weight, subtle ambient text-glow) paired with clean geometric sans (`CrSans`).
- **Signature Interactions:**
  - **Morphing pill navigation** (`width`, `top`, `border-radius`, `backdrop-filter` ease `cubic-bezier(0.22, 1, 0.36, 1)`).
  - **Vertical slot-roll text hover** (duplicated label spans sliding seamlessly on hover).
  - **Scroll-scrubbed word illumination** on dotted obsidian canvas.
  - **Dual tilted identity + contact cards** alongside hairline-divided rolling numeric metrics.
- **Weaknesses to Avoid:** Over-tall `13,935px` scroll jacking makes quick scanning slow for technical recruiters; bright crimson glow can distract from technical credibility; placeholder client logos/quotes feel templated.

### Reference 2 — Elena Voss (`elena-voss-portfolio-template-v3.21st.app`)
- **Structure & Flow:** Full-bleed atmospheric hero with monumental grotesque display type (`108px`), clean fixed blur header with minimal pill CTA, interactive **sticky timeline-indexed showcase** (`Award Winning Work`: left vertical progress spine with active dot + 4 project entries driving a large framed stage on the right), 3-column crisp principles grid with thin top accent icons and hairline bottom rules, **horizontal capability cards** (accent primary card + dark matte neighboring cards with circular `↗` corner affordance and clean bullet specs), **minimalist hairline-separated recognition ledger** (`Awards and Industry Recognition`: title + subtle uppercase meta), testimonials switcher, **clean editorial FAQ accordion** (full-width hairline rows + circular `+` button), and a grounded rounded-card atmospheric footer.
- **Typography:** Monumental modern neo-grotesk (`Host Grotesk`, regular 400 weight, ultra-clean hierarchy) on `#050505` / `#070707` near-black surfaces.
- **Signature Interactions:**
  - **Vertical timeline-indexed project switcher** (effortless overview + instant stage swap without losing spatial orientation).
  - **Accent-led capability card row** with circular top-right `↗` markers.
  - **Hairline-ruled Recognition Ledger** (ideal for scannable certifications & academic trajectory!).
  - **Minimalist editorial Accordion** with smooth spring height + rotating `+` icon.
- **Weaknesses to Avoid:** Excessively aggressive `vw`-scaled padding (`pt-[25vw]`) creates awkward empty voids on large viewports; `15,604px` scroll traps obscure direct navigation; omits technical metadata density recruiters expect.

---

## 3. Hybrid Architecture Plan — Best of Both + Youssef's Identity

| Order | Section | Primary DNA Source | Hybrid Upgrade & Purpose for Youssef |
|---|---|---|---|
| **Nav** | **Morphing Pill Header** (`#top`) | **Template 1 (Crimson)** + Youssef's Identity | Starts cleanly inset across the top of the hero frame, morphs smoothly on scroll into a centered frosted-obsidian pill (`backdrop-blur-md`). Features `YE` + `Youssef Elsayed` monogram, vertical slot-roll nav links (`About`, `Work`, `Skills`, `Experience`, `Certs`, `Contact`), **Youssef's Dark-Mode Lock Moon/Sun Easter Egg**, and a tactile `Get in Touch` CTA. Mobile opens a full-bleed accessible drawer. |
| **01** | **Framed Atmospheric Hero** | **Template 1 (Crimson Frame & Telemetry)** + **Template 2 (Editorial Scale)** + Youssef's WebGL2 Singularity | Inset rounded architectural frame (`rounded-2xl`) powered by Youssef's own interactive **WebGL2 `EtchedAccretion` singularity** re-tuned to Obsidian & Glacial Verdigris (with hold-to-feed interaction + reduced-motion still frame). Carries `// Building Secure, Intelligent Systems`, monumental hybrid serif/sans headline with **left-to-right Cipher Decryption on `& Cybersecurity Specialist`**, verbatim intro paragraph, `View Projects` + `Contact Me` CTAs, top-right quick cards (`EMAIL`, `LINKEDIN`, `GITHUB`, `RESUME`), and bottom telemetry bar (`Cairo, EET` live clock · `Scroll to Explore` · `CS / Cyber / AI`). |
| **02** | **Editorial Manifesto & Issuer Marquee** | **Template 1 (Crimson `cr-manifesto` + `cr-dots`)** | Dotted architectural obsidian stage (`22px` radial dots) with scroll-illuminated manifesto uniting Youssef's engineering philosophy across Security, AI, Full-Stack & Design — anchored by a continuous masked strip of his **10 REAL verified credential issuers** (Cisco, ISC2, AWS Academy, Red Hat, IBM SkillsBuild, Google, OPSWAT, Huawei ICT, Udemy, LinkedIn Learning). |
| **03** | **About & 3-Pillar Depth Showcase** (`#about`) | **Template 1 (3-Tone Tinted Perspective Cards)** + **Youssef's Portrait & Signature Frame** | Editorial 12-column split: Left features Youssef's **studio-graded editorial portrait** (backed up original untouched in `_backup/original-assets/profile.jpg`) inside an architectural frame preserving the **10-tick Tech Ruler** (tick #6 Verdigris) and frosted nameplate with his **exact 5-path handwritten SVG `<Signature />`** + `Computer Science Student`. Right presents verbatim `// About Me` copy, `View Projects` + `Download CV` actions, and clean Education / Location / Languages bar. Below sits the **3-Tone Perspective Focus Trio** (Platinum Mist · Deep Verdigris · Obsidian Graphite) elevating his `Current Focus` (`Cybersecurity`, `AI / ML`, `Software Engineering`). |
| **04** | **Interactive Work Showcase + Archive** (`#projects`) | **Template 2 (Elena Vertical Timeline Index & Stage)** + **Template 1 (Editorial Framing)** | Top flagship stage (`// Execution_Logs` — `Featured Repositories`): Left vertical progress spine lists **5 flagship projects** (`ID: PRJ_100` to `PRJ_104`, restoring **MIU Campus Network Infrastructure — 5,000+ users** alongside `App Voice Detection`, `Customer Retention Prediction`, `Linux Server Infrastructure Deployment`, and `Personal Portfolio System`). Clicking/keyboard-navigating any row transitions the right framed architectural showcase card with custom bespoke technical diagram visual, verbatim description, objective/details, tech stack, and GitHub link. Below sits a crisp, domain-filterable **Additional Repositories** grid housing all 8 remaining real projects (13 total, 0 invented). |
| **05** | **Technical Arsenal & Capabilities** (`#skills`) | **Template 2 (Elena Accent + Matte Capability Cards)** + **Template 1 (Numbered Rows `(01)`–`(06)`)** | Replaces heavy third-party Spline iframe (huge Lighthouse & stability win!) with an interactive, zero-jank **Capability & Arsenal Matrix**: Top row presents 4 signature domain cards (Elena style — Verdigris-accented active card + dark matte neighbor cards with circular `↗` indicators) covering Cybersecurity, Systems & Cloud, AI/ML, and Full-Stack Engineering, paired with an interactive filterable catalog of **all 9 verified skill categories** (63+ real skills from CV + verified credentials). |
| **06** | **Operational Trajectory** (`#experience`) | **Template 2 (Elena Hairline Editorial Ledger)** | **Fixes the broken `#experience` navbar anchor!** Renders `// Trajectory` — `Operational History` in ultra-clean hairline-divided editorial rows: Third-Year B.Sc. Computer Science at Misr International University (`01/2023 – 02/2027`) and Self-Directed Security, Cloud & Software Engineering (`2024 – Present`), with verified coursework, stack tags, and zero invented employers. |
| **07** | **Verified Certifications & Credential Vault** (`#certifications`) | **Template 2 (Elena Recognition Ledger)** + **Legacy PDF Preview Modal Upgrade** | `// Validations & Clearances` — `Professional Certifications`: Interactive domain filter pills (`All (21)`, `Security`, `Cloud & Linux`, `Networking`, `AI & Professional`). Displays **all 21 verified credentials** with **corrected issuers** (`ISC2` for CC Certified in Cybersecurity, honest `CKS Masterclass` title, restored `What Is Generative AI?`, `Interview Essentials`, and `Edraak` certs), real issue dates, credential IDs, clickable **Verify External Link** (8 direct Credly/Coursera/Udemy/OPSWAT URLs), AND a **"Preview Document"** modal that displays the actual certificate PDF/image right from `public/certificates/`. |
| **08** | **Editorial FAQ & Endorsements Placeholder** | **Template 2 (Elena FAQ Accordion)** + **Honest Placeholder Slot** | Clean hairline-separated accordion (`Engineering & Collaboration FAQ`) answering 5 authentic questions for recruiters/collaborators grounded 100% in Youssef's real profile. Accompanied by a restrained, clearly labeled **`[PLACEHOLDER]` Endorsements & Recommendations** slot ready for Youssef to drop in real quotes from professors, mentors, or teammates (zero fake testimonials!). |
| **09** | **Editorial Contact Deck + Verified Metrics** | **Template 1 (Crimson Dual Tilted Cards + Rolling Odometer Stats)** | Left: Two gently tilted overlapping editorial cards — Card 1 (Youssef's portrait medallion, `Youssef Elsayed`, `Software & Security Engineer`, `Email` + `Copy` actions) & Card 2 (`YE` Verdigris medallion, `Say Hello`, `Projects, internships & collaborations`, pre-filled `WhatsApp` + `Resume` actions). Right: 3 hairline-divided rolling counters displaying **100% real verified numbers**: `13` Engineered Systems & Repos, `21` Verified Industry Credentials, `5,000+` Campus Network Users Modeled. |
| **10** | **Framed Atmospheric CTA & Footer** (`#contact`) | **Template 1 (Crimson Framed Closing Panel)** + **Template 2 (Grounded Footer)** + **Youssef's Identity** | Rounded full-bleed atmospheric dark-verdigris closing card containing `"Let's build secure, intelligent systems."`, Youssef's **expandable `Initiate Contact` trigger** (revealing pre-filled WhatsApp + Email options), navigation & all 5 social links, **`Y.Elsayed` / `Systems / Security / AI`**, pulsing **`SYS.STATUS // NORMAL`**, his **exact 5-path handwritten SVG `<Signature />`**, copyright line + legacy tagline (`"Securing the digital future, one system at a time."`), and `Back to Top`. |

---

## 4. Custom Color Theme — "Obsidian & Glacial Verdigris" (WCAG AA/AAA Verified)

> **Why this palette?** Neither Crimson Red (`#E3241A`), Elena Fiery Orange (`#FE6E00`), Matrix Hacker Green (`#00FF41`), nor generic Neon Cyan (`#00E5FF`). **Obsidian Basalt + Glacial Verdigris + Architectural Brass** reflects the true triad of Youssef's identity: hardened systems security (cool dark basalt), intelligent AI/engineering clarity (mineral verdigris), and refined design/academic craft (subtle warm brass).

| Token Role | CSS Variable | Hex / Value | Usage | WCAG Contrast Verification |
|---|---|---|---|---|
| **Background (Deep)** | `--bg-deep` | `#06090B` | Main canvas, obsidian base tinted subtly cool-mineral | Base dark surface |
| **Surface (Panel)** | `--bg-surface` | `#0D1216` | Cards, navigation pill, modal surfaces, manifesto stage | Distinct elevation over `#06090B` |
| **Surface (Elevated)** | `--bg-elevated` | `#141C21` | Hover states, tilted cards, interactive controls | Subtle lift without heavy shadows |
| **Primary Accent** | `--accent-primary` | `#26D0A8` | Active indicators, verified links, focus rings, key highlights | **10.15:1** on `#06090B` · **9.57:1** on `#0D1216` (AAA) |
| **Primary Deep Surface** | `--accent-deep` | `#0A5243` | Featured tonal card surface, atmospheric hero/footer radial depth | **8.23:1** with `#F0F4F2` text (AAA) |
| **Secondary Accent** | `--accent-secondary` | `#D4A359` | Subtle architectural brass for academic/credential distinctions | **8.73:1** on `#06090B` (AAA) |
| **Light Tonal Card** | `--surface-platinum` | `#E4EAE7` | Brushed platinum pillar card & primary crisp pill button fill | **15.59:1** with `#0B1114` ink (AAA) |
| **Text Primary** | `--text-primary` | `#F0F4F2` | Headlines, primary copy, active nav | **18.00:1** on `#06090B` (AAA) |
| **Text Secondary** | `--text-secondary` | `#A6B5B0` | Body paragraphs, descriptions, secondary links | **9.37:1** on `#06090B` (AAA) |
| **Text Muted** | `--text-muted` | `#7E908A` | Eyebrows, mono metadata, timestamps, subtle captions | **5.94:1** on `#06090B` · **5.60:1** on `#0D1216` (AA+) |
| **Border Subtle** | `--border-subtle` | `rgba(240, 244, 242, 0.08)` | Hairline dividers, card frames | Subtle architectural separation |
| **Border Strong** | `--border-strong` | `rgba(240, 244, 242, 0.16)` | Interactive hover borders, active tabs | Clear interactive affordance |
| **Semantic Success** | `--status-success` | `#34D399` | `SYS.STATUS // NORMAL`, copy confirmation, verified badges | **10.39:1** on `#06090B` (AAA) |
| **Semantic Warning** | `--status-warning` | `#F59E0B` | Placeholder labels, expiry notices | **9.30:1** on `#06090B` (AAA) |
| **Semantic Error** | `--status-error` | `#F87171` | Dark-mode override prevented toast alert | **7.22:1** on `#06090B` (AAA) |

### Typography & Spacing System
- **Display Serif:** `Instrument Serif` (`400`, normal + italic) via `next/font/google` — editorial authority for hero accent words, manifesto, section titles (`clamp(2.5rem, 5vw, 4.5rem)`, `-0.03em` tracking, `1.05` line-height).
- **UI & Structural Sans:** `GeistSans` (self-hosted `geist/font/sans`) — crisp geometric clarity for headings, cards, navigation, body (`15px–17px`, `1.6` line-height, `65ch` max measure).
- **Technical Mono:** `GeistMono` (self-hosted `geist/font/mono`) — eyebrows (`// About Me`, `// Execution_Logs`), project IDs (`ID: PRJ_100`), status watermarks (`SYS.STATUS // NORMAL`), dates, `tabular-nums` counters.
- **Spacing Scale:** Strict 4px multiples (`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`), container capped at `max-w-[1380px]`, fluid responsive padding (`px-4 sm:px-6 lg:px-10`).
- **Motion System (`lib/motion.ts`):** Centralized spring tokens (`micro: 260/20`, `layout: 120/14`, `crisp: 0.3s bounce 0`), strong ease-out `[0.22, 1, 0.36, 1]`, `<MotionConfig reducedMotion="user">`, transform/opacity only, zero `scale(0)` entrances.

---

## 5. Complete Identity & Signature Preservation Map

| # | Original Identity Element | Original Source | New Placement in Hybrid Redesign | Styling Adaptation |
|---|---|---|---|---|
| 1 | **Handwritten 5-path SVG `<Signature />`** (`viewBox="0 0 300 120"`) | `AboutSection.tsx:8-28` & `FooterSection.tsx:7-21` | Extracted to `components/portfolio/Signature.tsx` (exact 5 paths preserved verbatim). Placed in **About Portrait Nameplate** AND **Footer Closing Panel**. | Recolored to alabaster `#F0F4F2` with subtle Verdigris hover glow + smooth stroke-draw reveal on scroll. |
| 2 | **`YE` Monogram + `Youssef Elsayed` Wordmark** | `Navbar.tsx:53-60` | **Morphing Pill Navbar** (left anchor) + **Contact Card 2 Medallion** + **Custom Favicon (`app/icon.svg`)**. | Crisp geometric `YE` monogram with hairline separator & uppercase mono name. |
| 3 | **`Y.Elsayed` / `Systems / Security / AI`** | `FooterSection.tsx:173-180` | **Footer Identity Block** (bottom-left of closing atmospheric card). | Styled with Verdigris accent dot (`Y.Elsayed`). |
| 4 | **`SYS.STATUS // NORMAL` Watermark** | `FooterSection.tsx:182-187` | **Footer Identity Block** with pulsing emerald-verdigris dot. | Semantic `#34D399` live status pulse. |
| 5 | **Dark-Mode Lock Toast Easter Egg** (`"System Override Prevented"`) | `Navbar.tsx:31-41` | **Morphing Pill Navbar** right utility cluster (Moon ↔ Sun animated toggle triggering exact Sonner toast). | Styled to match custom dark toast theme (`#F87171` semantic alert accent). |
| 6 | **Left-to-Right Cipher Decrypt** on `"& Cybersecurity Specialist"` | `HeroSection.tsx:8-68` | **Framed Atmospheric Hero H1** (with `prefers-reduced-motion` instant fallback). | Integrated seamlessly into the hybrid editorial headline. |
| 7 | **WebGL2 `EtchedAccretion` Black Hole + Hold-to-Feed** | `HeroSection.tsx` + `components/ui/etched-accretion.tsx` | **Framed Atmospheric Hero Canvas** background (hold pointer to accelerate accretion disk). | Re-parameterized to `#06090B` basalt + `#0A5243`/`#26D0A8` glacial verdigris + `#F0F4F2` photon crown. |
| 8 | **Hero Tagline & Domain Pill** (`// Building Secure, Intelligent Systems`, `CS / Cyber / AI`, intro copy) | `HeroSection.tsx:150-219` | **Hero Section** eyebrow, headline, lead paragraph, and bottom telemetry bar alongside live Cairo EET time. | Refined typographic hierarchy & contrast. |
| 9 | **Portrait Photo (`public/profile.jpg`) + 10-Tick Tech Ruler + `Computer Science Student`** | `AboutSection.tsx:60-88` | **About Section Portrait Frame** (and Contact Card 1 medallion). Untouched original backed up at `_backup/original-assets/profile.jpg`. | Studio-graded dark editorial enhancement (preserving 100% likeness) + 10-tick ruler with Verdigris tick #6. |
| 10 | **Verbatim About Bio, Focus, Education, Location, Languages** | `AboutSection.tsx:110-211` + Third-Year CV | **About Section** + **3-Tone Pillar Cards** + **Operational Trajectory (`#experience`)**. | Updated standing accurately to Third Year (`01/2023 – 02/2027`) & B2/Professional English. |
| 11 | **All 13 Real Projects + `ID: PRJ_10X` Codes** | `ProjectsSection.tsx` + Legacy `script.js` (`MIU Campus Network Infrastructure`) | **Featured Timeline Showcase (`PRJ_100`–`PRJ_104`)** + **Additional Repositories Grid (8 repos)**. | Restored `MIU Campus Network Infrastructure`; enriched CV tech tags. |
| 12 | **All 9 Skill Categories + Verified Cloud/Linux/Design Skills** | `SkillsSection.tsx` + CV + Legacy | **Technical Arsenal & Capabilities Section (`#skills`)**. | Elevated to Elena-inspired interactive cards + full filterable matrix. |
| 13 | **All 21 Verified Certifications + 8 Direct Verify URLs + Local PDFs** | `CertificationsSection.tsx` + `public/certificates/**` | **Certifications Ledger (`#certifications`)** with category filters, direct Verify links, and **Document Preview Modal**. | Fixed ISC2 misattribution bug; restored `What Is Generative AI?`, `Interview Essentials`, and `Edraak` certs. |
| 14 | **Pre-Filled Email & WhatsApp Templates + All Social & CV Links** | `HeroSection.tsx`, `FooterSection.tsx`, `index.html` | **Hero Quick Rail**, **Contact Deck** (+ 1-click Copy Email), **Footer Expandable `Initiate Contact`**, and **Footer Connect Links**. | Preserved exact `mailto:` subject/body, exact `wa.me/201208682811` message, LinkedIn, GitHub, `/CV/Youssef_Elsayed_Abdelaziz.pdf`. |
| 15 | **Copyright, Legacy Tagline, Meta Tags, Favicon & OG Social Card** | `FooterSection.tsx`, `index.html`, `app/layout.tsx` | **Footer Bottom Bar** (`© 2026 Youssef Elsayed Abdelaziz` + `"Securing the digital future, one system at a time."`), `app/layout.tsx`, new **`app/icon.svg`** & **`public/og-image.png`**. | Added missing favicon & static OG image; standardized metadata & flagged `Abdelaziz` vs `AbdelFatah` for confirmation. |
| 16 | **Classic Personal Brand Logo (`BrandLogo` + Downloadable Brand Kit)** | Requested in review iteration (`components/portfolio/BrandLogo.tsx`, `public/brand/*`) | **Navbar**, **Mobile Drawer**, **Contact Card 2 Medallion**, **Footer Identity Block**, **Favicon (`app/icon.svg`)**, and **OG Card (`public/og-image.png`)**. | Sculpted classic double-bevel `YE` monogram crest paired with `Instrument Serif` `Youssef Elsayed` wordmark; exported as dark & light SVG + transparent high-res PNG files in `public/brand/`. |

---

## 6. Tech Stack Decision & Hygiene Notes

- **Kept Existing Stack:** Next.js 15.2.4 + React 19 + TypeScript + Tailwind v4 + Framer Motion 12 + Geist + Lucide + Sonner. Zero new packages needed (Instrument Serif loads via built-in `next/font/google`).
- **Performance Upgrade:** Removed the continuous full-page `Starfield` canvas RAF loop (replaced with lightweight CSS radial dot matrix `cr-dots` from Crimson + WebGL2 hero that auto-pauses off-screen) and replaced the heavy external `@splinetool/react-spline` CDN scene in `SkillsSection` with crisp GPU-composited interactive capability cards — dramatically improving Lighthouse performance, LCP, TBT, and offline/firewall reliability.
- **Data Architecture:** Consolidated all portfolio content (bio, projects, skills, experience, 21 verified certifications with PDF & verify links, FAQ, contact templates) into a single strongly typed `lib/portfolio-data.ts` module so future edits take seconds.
- **Safety:** Legacy root HTML/JS files and unused `public/` assets are left untouched (never deleted), and `_backup/` holds untouched copies of everything original.

---

## 7. Honest Placeholders Flagged for Youssef

Zero fake data, fake metrics, or fake testimonials are invented. The following optional slots are clearly marked for Youssef to review or populate:
1. **Endorsements & Recommendations Section:** Clearly marked `[PLACEHOLDER]` card waiting for 2–3 real quotes from MIU professors (e.g., Cisco Academy instructor), project teammates, or clients — easily toggled or populated in `lib/portfolio-data.ts`.
2. **Individual GitHub Repo / Live Demo URLs:** Projects currently pointing to the GitHub profile root (`Customer Retention Prediction`, `Linux Server Infrastructure Deployment`, `MIU Campus Network Infrastructure`, `MIU QuickBit`, `Student Grades Management`, `16-bit Adder`) can be updated with dedicated repo or demo URLs in `lib/portfolio-data.ts`.
3. **Production Domain & Legal Surname:** `metadataBase` in `app/layout.tsx` uses `https://youssefelsayed.com` (update if deploying to a `.vercel.app` or custom domain), and surname is standardized to **Youssef Elsayed Abdelaziz** per both official CVs (confirm whether you prefer `Abdelaziz` or `AbdelFatah` in SEO meta tags).
