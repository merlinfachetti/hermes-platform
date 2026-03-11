# Hermes Platform

> Hermes is an operational interface for integrations, not the system that executes the integrations.

**Live:** https://hermes-platform-app.vercel.app

Monitor connector health, inspect sync jobs, investigate failures — a simulated B2B SaaS dashboard for managing API integrations.

---

## Why

Modern SaaS products integrate with dozens of external providers (Salesforce, HubSpot, Slack...). These integrations break in subtle ways: tokens expire, rate limits get hit, payload schemas drift, syncs time out. Hermes Platform simulates the interface teams use to manage these concerns.

Built as a portfolio project to demonstrate: React architecture, API-driven UI design, and developer tooling UX.

---

## Features

| Page | What it shows |
|------|---------------|
| Dashboard | KPI cards, active connector health, recent incidents, alert banners |
| Connectors | Table of all integrations with status, auth, health score, last sync |
| Connector Detail | Per-connector: auth state, rate limits, sync history, errors, payload samples |
| Sync Jobs | Full run history — status, duration, retries, trigger type |
| Logs | Filterable error/warning stream with expandable details |
| Docs | Auth reference, retry policy, rate limit table, payload format |

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript (strict, no `any`) |
| Build | Vite |
| Routing | React Router v6 |
| Data fetching | TanStack Query v5 |
| Styling | Tailwind CSS v3 + inline styles for dynamic values |
| API mocking | MSW v2 (browser service worker) |
| Deploy | Vercel (auto-deploy on push to `main`) |

---

## Running locally

```bash
npm install
npm run dev
```

App at `http://localhost:5173`. MSW intercepts all `/api/*` requests in dev mode — no backend needed.

---

## Architecture

```
src/
├── app/          # Router, QueryClient provider, layout shell (Sidebar, Header)
├── pages/        # Route-level views — thin, delegate to components
├── components/   # Reusable primitives: Card, StatusBadge, HealthBar, Skeleton, CodeBlock
├── services/     # api/ fetch layer + queries/ TanStack Query hooks
├── mocks/        # MSW handlers + typed fixtures (5 connectors, 6 jobs, 5 error logs)
├── types/        # Domain interfaces: Connector, SyncJob, ErrorLog, Provider...
└── lib/          # format.ts (dates, durations, numbers), cn.ts
```

All mock data flows through the same API surface that a real backend would expose. Replacing MSW with real endpoints requires changing only `src/services/api/index.ts`.

---

## Future work (v2)

- Real backend — Fastify + SQLite
- Authentication + session management  
- Real-time updates via Server-Sent Events
- Connector re-auth and retry actions
- Connector configuration forms
- Audit trail

