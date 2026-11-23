"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion, useInView } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Layers,
  Terminal,
} from "lucide-react"
import {
  FEATURED_PROJECTS,
  ADDITIONAL_PROJECTS,
  type ProjectItem,
} from "@/lib/portfolio-data"
import { ease, spring } from "@/lib/motion"
import SlotText from "@/components/portfolio/SlotText"
import { cn } from "@/lib/utils"

type AdditionalFilter = "All" | "Software & Web" | "Systems & Hardware"

const ADDITIONAL_FILTERS: AdditionalFilter[] = [
  "All",
  "Software & Web",
  "Systems & Hardware",
]

function ProjectSchematic({
  type,
}: {
  type: ProjectItem["visualType"]
}) {
  switch (type) {
    case "campus":
      return (
        <svg
          viewBox="0 0 640 360"
          className="w-full h-full select-none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-campus"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                stroke="#F0F4F2"
                strokeOpacity="0.04"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="glow-campus" cx="50%" cy="46%" r="48%">
              <stop offset="0%" stopColor="#26D0A8" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#0A5243" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#070B0E" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="640" height="360" fill="#070B0E" />
          <rect width="640" height="360" fill="url(#grid-campus)" />
          <rect width="640" height="360" fill="url(#glow-campus)" />

          {/* Concentric 5,000+ node rings */}
          <circle
            cx="320"
            cy="170"
            r="138"
            stroke="#26D0A8"
            strokeOpacity="0.12"
            strokeDasharray="3 6"
          />
          <circle
            cx="320"
            cy="170"
            r="96"
            stroke="#26D0A8"
            strokeOpacity="0.2"
            strokeDasharray="6 6"
          />
          <circle
            cx="320"
            cy="170"
            r="56"
            stroke="#D4A359"
            strokeOpacity="0.24"
          />

          {/* Redundant OSPF Core Links */}
          <line
            x1="274"
            y1="146"
            x2="366"
            y2="146"
            stroke="#26D0A8"
            strokeWidth="2"
          />
          <line
            x1="274"
            y1="154"
            x2="366"
            y2="154"
            stroke="#D4A359"
            strokeWidth="1.25"
            strokeDasharray="4 4"
          />

          {/* Distribution trunks from Core Routers to 4 Campus Buildings */}
          <path
            d="M250 166 L142 232 M258 170 L254 246 M382 170 L386 246 M390 166 L498 232"
            stroke="#26D0A8"
            strokeOpacity="0.6"
            strokeWidth="1.4"
          />
          {/* Cross-failover mesh */}
          <path
            d="M266 170 L386 246 M374 170 L254 246"
            stroke="#F0F4F2"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          {/* Firewall / ACL Policy Gate above Core */}
          <line
            x1="320"
            y1="88"
            x2="262"
            y2="132"
            stroke="#D4A359"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <line
            x1="320"
            y1="88"
            x2="378"
            y2="132"
            stroke="#D4A359"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <rect
            x="252"
            y="60"
            width="136"
            height="30"
            rx="6"
            fill="#0D1216"
            stroke="#D4A359"
            strokeOpacity="0.6"
          />
          <circle cx="268" cy="75" r="3" fill="#D4A359" />
          <text
            x="280"
            y="79"
            fill="#F0F4F2"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            EDGE FW · ACL
          </text>

          {/* Core Router 1 */}
          <rect
            x="206"
            y="130"
            width="80"
            height="40"
            rx="8"
            fill="#0A5243"
            fillOpacity="0.4"
            stroke="#26D0A8"
            strokeWidth="1.4"
          />
          <text
            x="246"
            y="148"
            textAnchor="middle"
            fill="#F0F4F2"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="600"
          >
            CORE-R1
          </text>
          <text
            x="246"
            y="161"
            textAnchor="middle"
            fill="#26D0A8"
            fontSize="8.5"
            fontFamily="monospace"
          >
            OSPF AREA 0
          </text>

          {/* Core Router 2 */}
          <rect
            x="354"
            y="130"
            width="80"
            height="40"
            rx="8"
            fill="#0A5243"
            fillOpacity="0.4"
            stroke="#26D0A8"
            strokeWidth="1.4"
          />
          <text
            x="394"
            y="148"
            textAnchor="middle"
            fill="#F0F4F2"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="600"
          >
            CORE-R2
          </text>
          <text
            x="394"
            y="161"
            textAnchor="middle"
            fill="#26D0A8"
            fontSize="8.5"
            fontFamily="monospace"
          >
            HA STANDBY
          </text>

          {/* Campus Building VLAN Nodes */}
          {[
            { x: 78, y: 232, label: "BLDG A", vlan: "VLAN 10 · CS", accent: "#26D0A8" },
            { x: 200, y: 246, label: "BLDG B", vlan: "VLAN 20 · LABS", accent: "#26D0A8" },
            { x: 332, y: 246, label: "BLDG C", vlan: "VLAN 30 · ADMIN", accent: "#26D0A8" },
            { x: 454, y: 232, label: "CORE DMZ", vlan: "VLAN 99 · SRV", accent: "#D4A359" },
          ].map((node) => (
            <g key={node.label}>
              <rect
                x={node.x}
                y={node.y}
                width="108"
                height="48"
                rx="8"
                fill="#0D1216"
                stroke={node.accent}
                strokeOpacity="0.45"
              />
              <circle cx={node.x + 14} cy={node.y + 18} r="3" fill={node.accent} />
              <text
                x={node.x + 24}
                y={node.y + 21}
                fill="#F0F4F2"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="600"
              >
                {node.label}
              </text>
              <text
                x={node.x + 14}
                y={node.y + 37}
                fill="#A6B5B0"
                fontSize="8.5"
                fontFamily="monospace"
              >
                {node.vlan}
              </text>
            </g>
          ))}

          {/* Bottom Architectural Telemetry Bar */}
          <line x1="40" y1="318" x2="600" y2="318" stroke="#F0F4F2" strokeOpacity="0.08" />
          <text
            x="40"
            y="338"
            fill="#7E908A"
            fontSize="9.5"
            fontFamily="monospace"
            letterSpacing="1.4"
          >
            TOPOLOGY // CISCO PACKET TRACER · 5,000+ CAMPUS ENDPOINTS
          </text>
          <text
            x="600"
            y="338"
            textAnchor="end"
            fill="#26D0A8"
            fontSize="9.5"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            FAILOVER: ACTIVE
          </text>
        </svg>
      )

    case "voice":
      return (
        <svg
          viewBox="0 0 640 360"
          className="w-full h-full select-none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-voice"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                stroke="#F0F4F2"
                strokeOpacity="0.04"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#26D0A8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#26D0A8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="640" height="360" fill="#070B0E" />
          <rect width="640" height="360" fill="url(#grid-voice)" />

          {/* Acoustic frame */}
          <rect
            x="40"
            y="74"
            width="560"
            height="140"
            rx="12"
            fill="#0D1216"
            stroke="#F0F4F2"
            strokeOpacity="0.09"
          />
          <line
            x1="40"
            y1="144"
            x2="600"
            y2="144"
            stroke="#F0F4F2"
            strokeOpacity="0.08"
            strokeDasharray="4 4"
          />

          {/* Spectral Frequency Bars */}
          {[
            18, 28, 42, 30, 56, 74, 48, 86, 102, 68, 92, 108, 78, 60, 94, 104,
            72, 52, 84, 62, 44, 58, 36, 26, 38, 24, 18, 22,
          ].map((h, i) => {
            const x = 66 + i * 18.5
            const half = h / 2
            const isPeak = h >= 84
            return (
              <rect
                key={i}
                x={x}
                y={144 - half}
                width="6"
                height={h}
                rx="3"
                fill={isPeak ? "#26D0A8" : "#0A5243"}
                fillOpacity={isPeak ? 0.9 : 0.65}
              />
            )
          })}

          {/* Primary Harmonic Envelope */}
          <path
            d="M56 144 C105 114, 145 92, 196 144 C240 188, 274 82, 322 144 C368 198, 412 94, 464 144 C505 180, 545 128, 584 144"
            stroke="#F0F4F2"
            strokeOpacity="0.72"
            strokeWidth="1.6"
          />
          {/* Secondary Brass Formant Curve */}
          <path
            d="M56 144 C120 166, 168 108, 232 144 C286 176, 344 112, 404 144 C460 174, 524 122, 584 144"
            stroke="#D4A359"
            strokeOpacity="0.7"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />

          <text
            x="58"
            y="95"
            fill="#7E908A"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            ACOUSTIC SPECTRUM // VAD SIGNAL CAPTURE
          </text>
          <text
            x="582"
            y="95"
            textAnchor="end"
            fill="#26D0A8"
            fontSize="9"
            fontFamily="monospace"
          >
            STREAM: LIVE
          </text>

          {/* Modular Speech Pipeline Blocks */}
          {[
            { x: 40, title: "01 · INPUT", sub: "Audio Capture", active: false },
            { x: 184, title: "02 · SIGNAL", sub: "Noise Filter", active: false },
            { x: 328, title: "03 · AI MODEL", sub: "Voice Classify", active: true },
            { x: 472, title: "04 · OUTPUT", sub: "Speech Action", active: false },
          ].map((stage, i) => (
            <g key={stage.title}>
              <rect
                x={stage.x}
                y="236"
                width="128"
                height="56"
                rx="10"
                fill={stage.active ? "#0A5243" : "#0D1216"}
                fillOpacity={stage.active ? 0.55 : 1}
                stroke={stage.active ? "#26D0A8" : "#F0F4F2"}
                strokeOpacity={stage.active ? 0.85 : 0.12}
                strokeWidth={stage.active ? 1.5 : 1}
              />
              <text
                x={stage.x + 14}
                y="259"
                fill={stage.active ? "#26D0A8" : "#7E908A"}
                fontSize="9"
                fontFamily="monospace"
                letterSpacing="1"
              >
                {stage.title}
              </text>
              <text
                x={stage.x + 14}
                y="277"
                fill="#F0F4F2"
                fontSize="11"
                fontFamily="sans-serif"
                fontWeight="600"
              >
                {stage.sub}
              </text>
              {i < 3 && (
                <path
                  d={`M${stage.x + 130} 264 L${stage.x + 142} 264 M${stage.x + 138} 260 L${stage.x + 142} 264 L${stage.x + 138} 268`}
                  stroke="#26D0A8"
                  strokeOpacity="0.65"
                  strokeWidth="1.4"
                />
              )}
            </g>
          ))}

          <line x1="40" y1="318" x2="600" y2="318" stroke="#F0F4F2" strokeOpacity="0.08" />
          <text
            x="40"
            y="338"
            fill="#7E908A"
            fontSize="9.5"
            fontFamily="monospace"
            letterSpacing="1.4"
          >
            PIPELINE // SPEECH RECOGNITION &amp; AI AUDIO WORKFLOW
          </text>
        </svg>
      )

    case "churn":
      return (
        <svg
          viewBox="0 0 640 360"
          className="w-full h-full select-none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-churn"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                stroke="#F0F4F2"
                strokeOpacity="0.04"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="640" height="360" fill="#070B0E" />
          <rect width="640" height="360" fill="url(#grid-churn)" />

          {/* Left Main Panel: 5-Model Comparative Classification Matrix */}
          <rect
            x="40"
            y="74"
            width="372"
            height="224"
            rx="12"
            fill="#0D1216"
            stroke="#F0F4F2"
            strokeOpacity="0.09"
          />
          <text
            x="60"
            y="98"
            fill="#A6B5B0"
            fontSize="9.5"
            fontFamily="monospace"
            letterSpacing="1.3"
          >
            5-MODEL CLASSIFICATION BENCHMARK
          </text>

          {/* Subtle horizontal grid guides */}
          {[128, 164, 200, 236, 272].map((y) => (
            <line
              key={y}
              x1="60"
              y1={y}
              x2="392"
              y2={y}
              stroke="#F0F4F2"
              strokeOpacity="0.05"
            />
          ))}

          {/* Comparative visual bars (no invented numeric percentages) */}
          {[
            { label: "RF", name: "Random Forest", w: 238, accent: "#26D0A8", primary: true },
            { label: "SVM", name: "Support Vector", w: 214, accent: "#26D0A8", primary: false },
            { label: "KNN", name: "K-Nearest", w: 192, accent: "#D4A359", primary: false },
            { label: "DT", name: "Decision Tree", w: 184, accent: "#A6B5B0", primary: false },
            { label: "NB", name: "Naive Bayes", w: 162, accent: "#7E908A", primary: false },
          ].map((m, idx) => {
            const y = 114 + idx * 35
            return (
              <g key={m.label}>
                <text
                  x="60"
                  y={y + 15}
                  fill={m.primary ? "#26D0A8" : "#F0F4F2"}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {m.label}
                </text>
                <rect
                  x="104"
                  y={y + 4}
                  width="278"
                  height="14"
                  rx="4"
                  fill="#141C21"
                />
                <rect
                  x="104"
                  y={y + 4}
                  width={m.w}
                  height="14"
                  rx="4"
                  fill={m.accent}
                  fillOpacity={m.primary ? 0.9 : 0.45}
                />
                <circle
                  cx={104 + m.w}
                  cy={y + 11}
                  r="2.5"
                  fill="#F0F4F2"
                />
              </g>
            )
          })}

          {/* Right Panel Top: 2x2 Confusion Matrix Schematic */}
          <rect
            x="430"
            y="74"
            width="170"
            height="124"
            rx="12"
            fill="#0D1216"
            stroke="#F0F4F2"
            strokeOpacity="0.09"
          />
          <text
            x="448"
            y="96"
            fill="#7E908A"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1.1"
          >
            EVALUATION MATRIX
          </text>
          {[
            { x: 448, y: 108, tag: "TP", fill: "#0A5243", stroke: "#26D0A8" },
            { x: 520, y: 108, tag: "FP", fill: "#141C21", stroke: "#D4A359" },
            { x: 448, y: 148, tag: "FN", fill: "#141C21", stroke: "#7E908A" },
            { x: 520, y: 148, tag: "TN", fill: "#0A5243", stroke: "#26D0A8" },
          ].map((cell) => (
            <g key={cell.tag}>
              <rect
                x={cell.x}
                y={cell.y}
                width="62"
                height="32"
                rx="6"
                fill={cell.fill}
                fillOpacity="0.65"
                stroke={cell.stroke}
                strokeOpacity="0.5"
              />
              <text
                x={cell.x + 31}
                y={cell.y + 20}
                textAnchor="middle"
                fill="#F0F4F2"
                fontSize="10"
                fontFamily="monospace"
              >
                {cell.tag}
              </text>
            </g>
          ))}

          {/* Right Panel Bottom: Feature Pipeline */}
          <rect
            x="430"
            y="212"
            width="170"
            height="86"
            rx="12"
            fill="#0D1216"
            stroke="#D4A359"
            strokeOpacity="0.3"
          />
          <text
            x="448"
            y="236"
            fill="#D4A359"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1.1"
          >
            DATA PIPELINE
          </text>
          <text x="448" y="258" fill="#F0F4F2" fontSize="10.5" fontFamily="monospace">
            01. Clean &amp; Impute
          </text>
          <text x="448" y="276" fill="#A6B5B0" fontSize="10.5" fontFamily="monospace">
            02. Feature Scaling
          </text>

          <line x1="40" y1="318" x2="600" y2="318" stroke="#F0F4F2" strokeOpacity="0.08" />
          <text
            x="40"
            y="338"
            fill="#7E908A"
            fontSize="9.5"
            fontFamily="monospace"
            letterSpacing="1.4"
          >
            STACK // PYTHON · PANDAS · NUMPY · SCIKIT-LEARN
          </text>
          <text
            x="600"
            y="338"
            textAnchor="end"
            fill="#D4A359"
            fontSize="9.5"
            fontFamily="monospace"
          >
            CHURN CLASSIFIER
          </text>
        </svg>
      )

    case "linux":
      return (
        <svg
          viewBox="0 0 640 360"
          className="w-full h-full select-none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-linux"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                stroke="#F0F4F2"
                strokeOpacity="0.04"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="640" height="360" fill="#070B0E" />
          <rect width="640" height="360" fill="url(#grid-linux)" />

          {/* Left Hardened Ubuntu Server Stack Layers */}
          {[
            {
              y: 74,
              layer: "LAYER 04 // PERIMETER",
              title: "UFW Firewall & Hardened SSH",
              accent: "#26D0A8",
              highlight: true,
            },
            {
              y: 130,
              layer: "LAYER 03 // WEB & AUTOMATION",
              title: "Apache HTTP Server · Bash Playbooks",
              accent: "#26D0A8",
              highlight: false,
            },
            {
              y: 186,
              layer: "LAYER 02 // DATA ENGINE",
              title: "MariaDB · Restricted Service Accounts",
              accent: "#D4A359",
              highlight: false,
            },
            {
              y: 242,
              layer: "LAYER 01 // OS KERNEL",
              title: "Ubuntu Server · POSIX ACL & TCP/IP",
              accent: "#A6B5B0",
              highlight: false,
            },
          ].map((slab, idx) => (
            <g key={slab.layer}>
              <rect
                x="40"
                y={slab.y}
                width="336"
                height="46"
                rx="10"
                fill={slab.highlight ? "#0A5243" : "#0D1216"}
                fillOpacity={slab.highlight ? 0.52 : 1}
                stroke={slab.accent}
                strokeOpacity={slab.highlight ? 0.8 : 0.25}
                strokeWidth={slab.highlight ? 1.4 : 1}
              />
              <rect
                x="52"
                y={slab.y + 11}
                width="3"
                height="24"
                rx="1.5"
                fill={slab.accent}
              />
              <text
                x="66"
                y={slab.y + 19}
                fill={slab.highlight ? "#26D0A8" : "#7E908A"}
                fontSize="8.5"
                fontFamily="monospace"
                letterSpacing="1.2"
              >
                {slab.layer}
              </text>
              <text
                x="66"
                y={slab.y + 35}
                fill="#F0F4F2"
                fontSize="11.5"
                fontFamily="sans-serif"
                fontWeight="600"
              >
                {slab.title}
              </text>
              {idx < 3 && (
                <line
                  x1="208"
                  y1={slab.y + 46}
                  x2="208"
                  y2={slab.y + 56}
                  stroke="#26D0A8"
                  strokeOpacity="0.4"
                  strokeDasharray="2 2"
                />
              )}
            </g>
          ))}

          {/* Right Live Daemon / Telemetry Panel */}
          <rect
            x="398"
            y="74"
            width="202"
            height="214"
            rx="12"
            fill="#0D1216"
            stroke="#F0F4F2"
            strokeOpacity="0.1"
          />
          <text
            x="416"
            y="98"
            fill="#A6B5B0"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            SYSTEMD // DAEMONS
          </text>
          <line
            x1="416"
            y1="110"
            x2="582"
            y2="110"
            stroke="#F0F4F2"
            strokeOpacity="0.08"
          />

          {[
            { unit: "sshd.service", state: "KEY-ONLY" },
            { unit: "ufw.service", state: "ENFORCED" },
            { unit: "apache2.service", state: "ACTIVE" },
            { unit: "mariadb.service", state: "ACTIVE" },
            { unit: "auditd.service", state: "LOGGING" },
          ].map((svc, idx) => {
            const y = 132 + idx * 31
            return (
              <g key={svc.unit}>
                <circle cx="422" cy={y - 3} r="3" fill="#34D399" />
                <text
                  x="434"
                  y={y}
                  fill="#F0F4F2"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {svc.unit}
                </text>
                <text
                  x="582"
                  y={y}
                  textAnchor="end"
                  fill="#26D0A8"
                  fontSize="8.5"
                  fontFamily="monospace"
                >
                  {svc.state}
                </text>
              </g>
            )
          })}

          <line x1="40" y1="318" x2="600" y2="318" stroke="#F0F4F2" strokeOpacity="0.08" />
          <text
            x="40"
            y="338"
            fill="#7E908A"
            fontSize="9.5"
            fontFamily="monospace"
            letterSpacing="1.4"
          >
            HOST // UBUNTU SERVER HARDENED STACK
          </text>
          <text
            x="600"
            y="338"
            textAnchor="end"
            fill="#34D399"
            fontSize="9.5"
            fontFamily="monospace"
          >
            PERMISSIONS: STRICT
          </text>
        </svg>
      )

    case "portfolio":
    default:
      return (
        <svg
          viewBox="0 0 640 360"
          className="w-full h-full select-none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-port"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                stroke="#F0F4F2"
                strokeOpacity="0.04"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="accretion-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06090B" stopOpacity="1" />
              <stop offset="45%" stopColor="#06090B" stopOpacity="1" />
              <stop offset="62%" stopColor="#26D0A8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#070B0E" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="640" height="360" fill="#070B0E" />
          <rect width="640" height="360" fill="url(#grid-port)" />

          {/* Left: WebGL2 Orbital Accretion Blueprint */}
          <rect
            x="40"
            y="74"
            width="284"
            height="222"
            rx="12"
            fill="#0D1216"
            stroke="#F0F4F2"
            strokeOpacity="0.09"
          />
          <circle cx="182" cy="186" r="84" fill="url(#accretion-core)" />
          <ellipse
            cx="182"
            cy="186"
            rx="106"
            ry="32"
            transform="rotate(-14 182 186)"
            stroke="#26D0A8"
            strokeOpacity="0.7"
            strokeWidth="1.4"
          />
          <ellipse
            cx="182"
            cy="186"
            rx="82"
            ry="23"
            transform="rotate(-14 182 186)"
            stroke="#F0F4F2"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <ellipse
            cx="182"
            cy="186"
            rx="120"
            ry="42"
            transform="rotate(-14 182 186)"
            stroke="#D4A359"
            strokeOpacity="0.32"
            strokeDasharray="4 6"
          />
          <circle
            cx="182"
            cy="186"
            r="29"
            fill="#06090B"
            stroke="#26D0A8"
            strokeOpacity="0.75"
            strokeWidth="1.5"
          />
          <text
            x="56"
            y="96"
            fill="#7E908A"
            fontSize="8.5"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            WEBGL2 // GLSL SHADER
          </text>
          <text
            x="56"
            y="282"
            fill="#26D0A8"
            fontSize="8.5"
            fontFamily="monospace"
          >
            ETCHED_ACCRETION.FRAG
          </text>

          {/* Right: Next.js Architecture Wireframe */}
          <rect
            x="344"
            y="74"
            width="256"
            height="222"
            rx="12"
            fill="#0D1216"
            stroke="#F0F4F2"
            strokeOpacity="0.09"
          />
          <text
            x="362"
            y="96"
            fill="#A6B5B0"
            fontSize="9"
            fontFamily="monospace"
            letterSpacing="1.2"
          >
            NEXT.JS 15 // COMPONENT TREE
          </text>

          {[
            { y: 112, tag: "APP/LAYOUT", desc: "Geist + Instrument Serif + WCAG", accent: "#26D0A8" },
            { y: 156, tag: "HERO + GLSL", desc: "Etched Accretion + Cipher FX", accent: "#26D0A8" },
            { y: 200, tag: "MOTION OS", desc: "Framer Springs + Reduced Motion", accent: "#D4A359" },
            { y: 244, tag: "CRED VAULT", desc: "21 Verified Badges & PDF Viewer", accent: "#A6B5B0" },
          ].map((node) => (
            <g key={node.tag}>
              <rect
                x="362"
                y={node.y}
                width="220"
                height="36"
                rx="7"
                fill="#141C21"
                stroke={node.accent}
                strokeOpacity="0.32"
              />
              <circle cx="376" cy={node.y + 18} r="3" fill={node.accent} />
              <text
                x="388"
                y={node.y + 15}
                fill="#F0F4F2"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="600"
              >
                {node.tag}
              </text>
              <text
                x="388"
                y={node.y + 28}
                fill="#A6B5B0"
                fontSize="8.5"
                fontFamily="sans-serif"
              >
                {node.desc}
              </text>
            </g>
          ))}

          <line x1="40" y1="318" x2="600" y2="318" stroke="#F0F4F2" strokeOpacity="0.08" />
          <text
            x="40"
            y="338"
            fill="#7E908A"
            fontSize="9.5"
            fontFamily="monospace"
            letterSpacing="1.4"
          >
            SYSTEM // OBSIDIAN &amp; GLACIAL VERDIGRIS DESIGN OS
          </text>
          <text
            x="600"
            y="338"
            textAnchor="end"
            fill="#26D0A8"
            fontSize="9.5"
            fontFamily="monospace"
          >
            TYPESCRIPT · TAILWIND
          </text>
        </svg>
      )
  }
}

export default function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [additionalFilter, setAdditionalFilter] =
    useState<AdditionalFilter>("All")
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-80px" })

  const totalFeatured = FEATURED_PROJECTS.length
  const activeProject = FEATURED_PROJECTS[activeIdx]

  const filteredAdditional =
    additionalFilter === "All"
      ? ADDITIONAL_PROJECTS
      : ADDITIONAL_PROJECTS.filter((p) => p.category === additionalFilter)

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + totalFeatured) % totalFeatured)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % totalFeatured)
  }

  const formatIndex = (idx: number) => String(idx + 1).padStart(2, "0")

  const getCategoryCount = (filter: AdditionalFilter) => {
    if (filter === "All") return ADDITIONAL_PROJECTS.length
    return ADDITIONAL_PROJECTS.filter((p) => p.category === filter).length
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 scroll-mt-20 border-t border-[var(--border-subtle)] bg-transparent relative"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: ease.editorial }}
          className="mb-14 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--text-muted)] mb-4 flex items-center gap-3">
              <span
                className="w-6 h-[1px] bg-[var(--accent-primary)]"
                aria-hidden="true"
              />
              // Execution_Logs
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] leading-[1.06] text-[var(--text-primary)]">
              Featured{" "}
              <span className="font-serif italic font-normal text-[var(--accent-primary)] serif-luminance">
                Repositories
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7] max-w-md">
            A verified selection of complex systems, enterprise network
            architectures, ML models, and full-stack platforms sourced from
            GitHub and my CV.
          </p>
        </motion.div>

        {/* PART A — Elena-Inspired Interactive Timeline Showcase */}
        <div>
          {/* Mobile Compact Index Selector (zero horizontal overflow on 375px) */}
          <div className="lg:hidden mb-6 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 font-mono text-xs tabular-nums">
                <span className="text-[var(--accent-primary)] font-medium">
                  {formatIndex(activeIdx)}
                </span>
                <span className="text-[var(--text-muted)]">/</span>
                <span className="text-[var(--text-muted)]">
                  {formatIndex(totalFeatured - 1)}
                </span>
                <span className="text-[var(--border-strong)] mx-1">|</span>
                <span className="text-[var(--text-secondary)] tracking-wider">
                  {activeProject.code}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous featured project"
                  className="w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next featured project"
                  className="w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="grid grid-cols-5 gap-2"
              role="group"
              aria-label="Select featured project"
            >
              {FEATURED_PROJECTS.map((project, idx) => {
                const isActive = idx === activeIdx
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-pressed={isActive}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={`Select ${project.title}`}
                    className={cn(
                      "min-h-[44px] rounded-xl border font-mono text-xs tabular-nums transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 px-1",
                      isActive
                        ? "bg-[var(--accent-deep)]/55 border-[var(--border-accent)] text-[var(--text-primary)] shadow-[0_0_20px_rgba(38,208,168,0.16)]"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                    )}
                  >
                    <span className="font-semibold">{formatIndex(idx)}</span>
                    <span className="text-[9px] text-[var(--text-muted)]">
                      {project.code.replace("ID: PRJ_", "")}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Desktop Left Timeline Spine */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-6">
              {/* Crimson-inspired Prev/Next + Counter Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-baseline gap-2 font-mono tabular-nums">
                  <span className="text-lg font-medium text-[var(--text-primary)]">
                    {formatIndex(activeIdx)}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    / {formatIndex(totalFeatured - 1)}
                  </span>
                  <span className="ml-2 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Flagship Systems
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous featured project"
                    className="w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next featured project"
                    className="w-10 h-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Vertical Hairline Spine */}
              <div
                className="relative border-l border-[var(--border-subtle)] pl-7 space-y-2.5 ml-1.5"
                role="list"
                aria-label="Featured projects index"
              >
                {FEATURED_PROJECTS.map((project, idx) => {
                  const isActive = idx === activeIdx
                  return (
                    <div key={project.id} role="listitem" className="relative">
                      {/* Static track node */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -left-[33px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border transition-colors",
                          isActive
                            ? "border-transparent bg-transparent"
                            : "bg-[var(--bg-deep)] border-[var(--border-strong)]"
                        )}
                      />

                      {/* Animated glowing Verdigris node */}
                      {isActive && (
                        <motion.span
                          layoutId="active-project-node"
                          transition={spring.layout}
                          aria-hidden="true"
                          className="absolute -left-[34px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--accent-primary)] shadow-[0_0_16px_rgba(38,208,168,0.85)] ring-4 ring-[var(--accent-primary)]/20"
                        />
                      )}

                      <button
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        aria-pressed={isActive}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "w-full text-left relative rounded-xl px-5 py-4 min-h-[72px] transition-colors duration-200 cursor-pointer group",
                          isActive
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]/45"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-project-surface"
                            transition={spring.layout}
                            aria-hidden="true"
                            className="absolute inset-0 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-accent)]/60 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
                          />
                        )}

                        <span className="relative z-10 block">
                          <span className="flex items-center justify-between gap-2 mb-1.5">
                            <span
                              className={cn(
                                "font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                                isActive
                                  ? "text-[var(--accent-primary)]"
                                  : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                              )}
                            >
                              {project.code}
                            </span>
                            <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
                              {formatIndex(idx)}
                            </span>
                          </span>

                          <span
                            className={cn(
                              "block text-[17px] font-semibold leading-snug tracking-[-0.01em] transition-colors",
                              isActive
                                ? "text-[#F0F4F2]"
                                : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                            )}
                          >
                            {project.title}
                          </span>

                          <span
                            className={cn(
                              "block text-xs font-mono mt-1 transition-colors",
                              isActive
                                ? "text-[var(--text-secondary)]"
                                : "text-[var(--text-muted)]/75 group-hover:text-[var(--text-secondary)]"
                            )}
                          >
                            {project.subtitle}
                          </span>
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Framed Architectural Showcase Stage */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeProject.id}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8 }
                    }
                    transition={{ duration: 0.28, ease: ease.editorial }}
                  >
                    {/* Top Visual Stage with Bespoke SVG Schematic */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#070B0E] border-b border-[var(--border-subtle)] overflow-hidden">
                      <ProjectSchematic type={activeProject.visualType} />

                      {/* Top-left ID badge */}
                      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 inline-flex items-center gap-2 rounded-md bg-[#06090B]/85 backdrop-blur-md border border-[var(--border-strong)] px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-[var(--text-primary)]">
                        <Terminal
                          className="w-3 h-3 text-[var(--accent-primary)]"
                          aria-hidden="true"
                        />
                        {activeProject.code}
                      </div>

                      {/* Top-right Live Category Pill */}
                      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 inline-flex items-center gap-2 rounded-full bg-[#06090B]/85 backdrop-blur-md border border-[var(--border-strong)] px-3 py-1 font-mono text-[11px] tracking-[0.08em] text-[var(--text-primary)]">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            activeProject.category === "AI & ML"
                              ? "bg-[var(--accent-secondary)]"
                              : "bg-[var(--accent-primary)]"
                          )}
                        />
                        {activeProject.category}
                      </div>
                    </div>

                    {/* Bottom Detail Panel */}
                    <div className="p-6 sm:p-8 flex flex-col gap-6">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-primary)] mb-2">
                          {activeProject.subtitle}
                        </p>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-[-0.02em] leading-tight mb-3">
                          {activeProject.title}
                        </h3>
                        <p className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-[1.7]">
                          {activeProject.description}
                        </p>
                      </div>

                      {/* Bullet Highlights */}
                      {activeProject.highlights &&
                        activeProject.highlights.length > 0 && (
                          <ul className="space-y-2.5">
                            {activeProject.highlights.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-3 text-sm text-[var(--text-primary)]/90 leading-relaxed"
                              >
                                <span
                                  aria-hidden="true"
                                  className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-2 shrink-0"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                      {/* 2-Column Metadata Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-[var(--border-subtle)]">
                        {activeProject.details.map((detail) => (
                          <div
                            key={detail.label}
                            className="rounded-xl bg-[var(--bg-deep)]/65 border border-[var(--border-subtle)] px-4 py-3"
                          >
                            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)] mb-1">
                              {detail.label}
                            </span>
                            <span className="text-sm font-medium text-[var(--text-primary)]">
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-[var(--bg-elevated)]/85 border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-secondary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                        <a
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2.5 rounded-xl bg-[var(--surface-platinum)] text-[var(--ink-dark)] hover:bg-[#F0F4F2] px-5 py-3 text-sm font-medium active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <Github className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <SlotText
                            text={
                              activeProject.hasDedicatedRepo
                                ? "View on GitHub"
                                : "View GitHub Profile"
                            }
                          />
                          <ArrowUpRight
                            className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>

                        {!activeProject.hasDedicatedRepo && (
                          <span className="font-mono text-[11px] text-[var(--text-muted)]">
                            Academic &amp; Architecture Case Study
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* PART B — Filterable Additional Repositories Archive (all 8 real projects) */}
        <div className="mt-20 sm:mt-24 pt-16 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] tracking-[-0.02em]">
                  Additional Repositories
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--accent-primary)] tabular-nums">
                  {ADDITIONAL_PROJECTS.length} Projects
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Complete archive of academic platforms, desktop software, C++
                systems, and digital hardware builds.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div
              className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] self-start md:self-auto"
              role="group"
              aria-label="Filter additional repositories by category"
            >
              {ADDITIONAL_FILTERS.map((filter) => {
                const isSelected = additionalFilter === filter
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setAdditionalFilter(filter)}
                    aria-pressed={isSelected}
                    className={cn(
                      "relative px-3.5 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 min-h-[38px]",
                      isSelected
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="additional-repo-filter"
                        transition={spring.crisp}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-accent)]/60"
                      />
                    )}
                    <span className="relative z-10">{filter}</span>
                    <span
                      className={cn(
                        "relative z-10 text-[10px] tabular-nums",
                        isSelected
                          ? "text-[var(--accent-primary)]"
                          : "text-[var(--text-muted)]"
                      )}
                    >
                      {getCategoryCount(filter)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredAdditional.map((project) => (
                <motion.article
                  key={project.id}
                  layout={!prefersReducedMotion}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 8 }
                  }
                  transition={{ duration: 0.24, ease: ease.editorial }}
                  className="group rounded-2xl bg-[var(--bg-surface)]/75 border border-[var(--border-subtle)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-surface)] transition-colors duration-200 p-6 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {project.code}
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        project.hasDedicatedRepo
                          ? `Open ${project.title} repository on GitHub`
                          : `Open GitHub profile for ${project.title}`
                      }
                      className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] group-hover:border-[var(--border-accent)] bg-[var(--bg-deep)]/60 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-primary)]/90 mb-1.5 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 shrink-0" aria-hidden="true" />
                    {project.subtitle}
                  </p>

                  <h4 className="text-[17px] font-semibold text-[var(--text-primary)] leading-snug tracking-[-0.01em] mb-2.5">
                    {project.title}
                  </h4>

                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.65] mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className="px-2 py-0.5 rounded bg-[var(--bg-elevated)]/70 border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
