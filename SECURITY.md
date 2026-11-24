# Security Policy

## Supported Versions

Only the active production branch (`main`, Next.js `2.x`) receives security updates and dependency patches.

| Version | Branch | Supported |
| ------- | ------ | --------- |
| 2.x     | `main` | Yes       |
| < 2.0   | Legacy | No        |

## Reporting a Vulnerability

If you discover a security issue in this portfolio or repository, please disclose it responsibly:

1. **GitHub Private Security Advisory (Preferred):** Use the **Security → Advisories → Report a vulnerability** workflow on [this repository](https://github.com/youssef5520055/youssef-elsayed-portfolio/security/advisories).
2. **Direct Email:** Send details to `youssefelsayed5520055@gmail.com` with subject `[SECURITY] Portfolio Vulnerability Report`.
3. **RFC 9116 Endpoint:** See `/.well-known/security.txt` on the live site.

Please include:
- A clear description of the vulnerability and potential impact.
- Reproduction steps, proof-of-concept request/URL, or affected file path.
- Any suggested remediation (optional).

### Response Targets
- **Initial acknowledgment:** within 48 hours.
- **Triage & fix timeline:** critical/high issues prioritized within 7 days.

Please avoid publicly disclosing vulnerabilities before a fix is deployed, and do not perform destructive testing, denial-of-service attacks, or social engineering.

## Security Architecture & Hardening Controls

This application is a statically generated Next.js portfolio designed with defense-in-depth:

- **Zero Backend Secrets / Zero Database Attack Surface:** All portfolio data is statically typed and bundled at build time; no unauthenticated admin endpoints, client-side passwords, or embedded API keys exist in the codebase.
- **HTTP Security Headers (`next.config.mjs`):**
  - Strict `Content-Security-Policy` (no `unsafe-eval` in production, `connect-src 'self'`, `media-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'` on app routes with `SAMEORIGIN` scoped strictly to `/certificates/*` and `/CV/*` for in-modal PDF previews).
  - `Strict-Transport-Security` (`max-age=63072000; includeSubDomains; preload`).
  - `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (default), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-origin`, `X-Permitted-Cross-Domain-Policies: none`, `X-DNS-Prefetch-Control: off`, and `X-Powered-By` disabled.
- **Supply-Chain Hygiene:** Minimal dependency footprint with pinned versions, `pnpm-lock.yaml` frozen installs, `pnpm run audit:deps` + `pnpm run security:check` guardrails, Dependabot vulnerability alerts & updates, and GitHub secret scanning with push protection.
- **Link & DOM Safety:** Zero `dangerouslySetInnerHTML` / `eval` / `innerHTML` sinks; all external links enforce `rel="noopener noreferrer"`.
