# ConnectorHub

Integration control plane for SaaS engineering teams.

Monitor connector health, inspect sync jobs, investigate failures — all in one operational dashboard.

---

## Why

Modern SaaS products integrate with dozens of external providers (Salesforce, HubSpot, Slack...). These integrations break in subtle ways: tokens expire, rate limits get hit, payload schemas drift, syncs time out. ConnectorHub simulates the interface teams use to manage these concerns.

Built as a portfolio project to demonstrate: React architecture, API-driven UI design, and developer tooling UX.

---

## Features

| Page | Description |
|------|-------------|
| Dashboard | Platform health at a glance — KPIs, active connectors, recent incidents |
| Connectors | All configured integrations with status, health score and auth state |
| Connector Details | Per-connector deep dive: sync history, rate limits, payload samples, errors |
| Sync Jobs | Full run history with status, duration, retries and trigger type |
| Logs | Error and warning stream — filterable by severity and connector |
| Docs | Connector reference, retry policies, payload examples |

---

## Stack

- **React 18 + TypeScript** — strict mode, no `any`
- **Vite** — fast dev server and build
- **React Router v6** — client-side routing
- **TanStack Query v5** — data fetching and caching
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **MSW v2** — API mocking via service worker (no real backend in v1)

---

## Running locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. MSW intercepts all `/api/*` requests automatically.

---

## Architecture

```
src/
├── app/          # Router, providers, layout shell
├── pages/        # Route-level views (thin, delegate to features)
├── components/   # Reusable UI primitives (Badge, Card, Table...)
├── features/     # Domain components per area
├── services/     # API functions + TanStack Query hooks
├── mocks/        # MSW handlers + typed fixtures
├── types/        # Domain interfaces
└── lib/          # Shared utilities
```

No real backend in v1. The API layer is structured so swapping MSW for real endpoints requires only changing service functions — pages and components are unaffected.

---

## Development status

- [x] Phase 1 — Bootstrap and foundation
- [ ] Phase 2 — Layout and navigation
- [ ] Phase 3 — Domain data and mock API
- [ ] Phase 4 — Feature pages
- [ ] Phase 5 — UX refinement
- [ ] Phase 6 — Production deployment

---

## Future work

- Real backend (Fastify + SQLite)
- Authentication
- Real-time updates via SSE
- Retry actions
- Connector configuration forms
- Audit trail

