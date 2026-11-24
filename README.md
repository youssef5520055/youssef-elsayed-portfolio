# Youssef Elsayed — Software Engineer & Cybersecurity Specialist

Personal portfolio showcasing cybersecurity, network security, AI/ML, cloud & Linux infrastructure, and full-stack software engineering work.

- **Live Production:** https://youssef-elsayed-portfolio.vercel.app
- **Security Policy:** [SECURITY.md](./SECURITY.md) · `/.well-known/security.txt`

## Tech Stack

- **Framework:** Next.js 16 (App Router, static prerendering) + React 19 + TypeScript 5
- **Styling & Motion:** Tailwind CSS v4 + Framer Motion + Sonner + Lucide Icons
- **Typography:** Instrument Serif (`next/font/google` self-hosted), Geist Sans, Geist Mono
- **Visuals:** Custom WebGL2 procedural shader (`EtchedAccretion`), bespoke `YE` monogram & wordmark kit, preserved handwritten SVG signature

## Security Hardening

- **HTTP Security Headers:** Strict Content-Security-Policy (zero `unsafe-eval` in production), HSTS (`includeSubDomains; preload`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (with `SAMEORIGIN` scoped strictly to local `/certificates/*` and `/CV/*` PDF previews), `Referrer-Policy`, `Permissions-Policy`, `COOP`, and `CORP`.
- **Minimal Supply Chain:** Pruned unused dependencies, pinned Next.js version, enforced `pnpm-lock.yaml` frozen installs, and `pnpm.overrides` for transitive security patches.
- **Automated Monitoring & Static Guardrails:** Dependabot weekly security updates (`.github/dependabot.yml`), GitHub secret scanning + push protection, CodeQL static analysis, and a built-in static security check (`pnpm run security:check`) verifying zero hardcoded keys, zero `dangerouslySetInnerHTML`/`eval` sinks, and `rel="noopener noreferrer"` on all external links. A ready-to-enable GitHub Actions CI template is included at `docs/github-actions-security.yml`.
- **Zero Client Secrets:** Strictly static architecture with no exposed API keys, passwords, or unauthenticated admin surfaces.

## Local Development

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Verification Commands

```bash
pnpm run audit:deps     # Dependency CVE audit
pnpm run security:check # Static secret, DOM-sink & link safety check
pnpm run typecheck      # Strict TypeScript check
pnpm run build          # Production build
```

## License

See [LICENSE](./LICENSE).
