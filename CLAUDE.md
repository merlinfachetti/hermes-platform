# CLAUDE.md — Hermes Platform

Context file for AI-assisted development. Read this before any implementation task.

---

## Project identity

**Name:** Hermes Platform  
**Type:** Portfolio SPA — developer tool / integration control plane  
**Goal:** Demonstrate frontend engineering skills aligned with devtools/iPaaS companies (Nango, Merge, Airbyte, etc.)  
**Status:** Phase 1 complete → Phase 2 next

---

## What this is

A simulated integration platform dashboard. Engineers use it to:

- Monitor connector health and auth status
- Inspect sync job history and failures
- Investigate errors with full detail
- Review payload samples from providers
- Read connector-specific documentation

Not a landing page. Not a CRUD toy. Behaves like an internal B2B SaaS product.

---

## Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Product definition | ✅ Done |
| 1 | Bootstrap + foundation | ✅ Done |
| 2 | Layout and navigation shell | ⏳ Next |
| 3 | Domain data + mock API | ⏳ Pending |
| 4 | Feature pages | ⏳ Pending |
| 5 | UX refinement | ⏳ Pending |
| 6 | Production deployment | ✅ Done — https://hermes.aldenmerlin.com |

**Rule:** implement phases sequentially. Do not skip ahead.

---

## Tech stack

| Concern | Choice |
|---------|--------|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite |
| Routing | React Router v6 (BrowserRouter) |
| Data fetching | TanStack Query v5 |
| Styling | Tailwind CSS v3 (custom design tokens) |
| API mocking | MSW v2 (browser mode, service worker) |
| Testing | Vitest + React Testing Library |
| Deploy | Vercel |

---

## Design tokens (Tailwind custom colors)

```
surface:   0=#0a0b0d  1=#111318  2=#181b21  3=#1e222a  4=#252b35
border:    subtle=#1e2530  default=#252d3a  strong=#2e3848
accent:    blue=#3b82f6  cyan=#06b6d4  green=#22c55e  yellow=#eab308  red=#ef4444
text:      primary=#e2e8f0  secondary=#94a3b8  tertiary=#64748b
fonts:     sans=DM Sans  mono=JetBrains Mono
```

Visual reference: Stripe Dashboard, Vercel, Supabase, PostHog. Dark, dense, operational.

---

## Folder structure

```
src/
├── app/
│   ├── layout/         # RootLayout.tsx, Sidebar.tsx, Header.tsx
│   ├── router.tsx      # BrowserRouter + route definitions
│   └── providers.tsx   # QueryClientProvider
│
├── pages/              # Route-level components (thin, delegate to features)
│   ├── dashboard/
│   ├── connectors/
│   ├── connector-details/
│   ├── sync-jobs/
│   ├── logs/
│   └── docs/
│
├── components/         # Reusable UI primitives
│   ├── ui/             # Badge, Card, StatusDot, Skeleton, CodeBlock...
│   ├── tables/         # DataTable, SortableHeader...
│   └── status/         # HealthBar, StatusBadge...
│
├── features/           # Domain components (consume queries, render domain data)
│   ├── connectors/
│   ├── jobs/
│   ├── logs/
│   └── docs/
│
├── services/
│   ├── api/            # fetch wrappers per domain
│   └── queries/        # TanStack Query hooks
│
├── mocks/
│   ├── fixtures/       # index.ts — typed static data
│   ├── handlers/       # index.ts — MSW http handlers
│   └── browser.ts      # setupWorker()
│
├── types/              # index.ts — all domain interfaces
└── lib/                # format.ts, cn.ts, etc.
```

---

## Domain model

```typescript
Provider       { id, name, category, iconUrl?, status }
Connector      { id, providerId, name, environment, status, authStatus, lastSyncAt, healthScore, recordsSynced, createdAt }
SyncJob        { id, connectorId, status, startedAt, finishedAt, durationMs, recordsProcessed, retries, triggerType }
ErrorLog       { id, connectorId, code, severity, message, details, occurredAt }
PayloadSample  { id, connectorId, direction, contentType, payload, createdAt }
RateLimitWindow { connectorId, windowStart, windowEnd, used, limit }
DashboardMetrics { activeConnectors, syncRunsLast24h, successRate, failedRuns, avgLatencyMs, recentIncidents }
```

All types are in `src/types/index.ts`. No `any` anywhere.

---

## Mock API endpoints

All prefixed `/api/`. MSW intercepts in dev mode.

```
GET /api/dashboard
GET /api/providers
GET /api/connectors
GET /api/connectors/:id
GET /api/sync-jobs?connectorId=
GET /api/logs?connectorId=
GET /api/payload-samples?connectorId=
GET /api/rate-limits/:connectorId
```

---

## Coding rules

- TypeScript strict mode. No `any`. Explicit return types on service functions.
- Components: functional only. No class components.
- Styling: Tailwind utility classes. Inline styles only for dynamic values.
- State: TanStack Query for server state. `useState`/`useReducer` for local UI state.
- No Redux, Zustand or other state managers in v1.
- Naming: PascalCase for components, camelCase for functions/vars, kebab-case for files under `pages/`.
- Each page component is thin — it composes feature components, does not contain business logic.
- Loading / error / empty states are required for all data views.

---

## What is OUT OF SCOPE for v1

- Real OAuth / authentication
- Real third-party API calls
- Multi-tenant account model
- WebSockets / real-time
- Backend persistence
- Role-based access control
- Billing

Do not implement these. Do not suggest them during development.

---

## Definition of done (Phase 6)

- [ ] App runs locally with `npm run dev`
- [ ] All 6 MVP pages render real data from MSW
- [ ] Navigation works between all pages
- [ ] Loading / error / empty states exist everywhere
- [ ] TypeScript compiles with zero errors
- [ ] Deployed to Vercel with live URL
- [ ] README complete with screenshots
- [ ] GitHub repo public and clean

---

## Production URL

https://hermes.aldenmerlin.com

Deploy: Vercel — auto-deploy on every push to `main`.
