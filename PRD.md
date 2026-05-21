## Problem Statement

The project needs to extend the existing jersey catalog frontend with best-practice frontend architecture and integrate a new backend that provides a secure, layered REST API. The result must demonstrate full-stack integration, clean state management, performance optimizations, and a consistent design system, while reorganizing the repo into a maintainable monorepo structure.

## Solution

Restructure the repo into a monorepo with **apps/frontend** and **apps/backend** plus shared **packages/ui** and **packages/api-client** using npm workspaces. Migrate the current frontend code into the new structure and implement **Frontend 2** improvements. Build a backend service with Express + TypeScript + Prisma + PostgreSQL, exposing `/api/v1` endpoints with authentication and authorization so **Admin** can manage **Jersey** while **Public User** can only read the **Catalog**. Use a centralized API client, TanStack Query for server state, Zustand for global state, and implement performance optimizations and a reusable design system.

## User Stories

1. As a **Public User**, I want to browse the **Catalog**, so that I can see all available **Jersey** items.
2. As a **Public User**, I want to search the **Catalog** by keyword, so that I can find a **Jersey** quickly.
3. As a **Public User**, I want to filter by league, so that I can focus on my favorite competition.
4. As a **Public User**, I want to filter by kit type, so that I can match my preferred style.
5. As a **Public User**, I want to filter by price range, so that I can stay within budget.
6. As a **Public User**, I want to sort the **Catalog**, so that I can compare jerseys easily.
7. As a **Public User**, I want to view a **Jersey** detail page, so that I can see full information.
8. As a **Public User**, I want to see **Stock** information, so that I know availability.
9. As a **Public User**, I want to mark a **Jersey** as a **Favorite**, so that I can revisit it quickly.
10. As a **Public User**, I want **Favorites** to persist in the UI, so that my marked items stay visible.
11. As a **Public User**, I want the UI to remain responsive on slow networks, so that I can keep browsing.
12. As an **Admin**, I want to log in, so that I can access management features.
13. As an **Admin**, I want to see the list of **Jersey** items, so that I can manage them.
14. As an **Admin**, I want to create a new **Jersey**, so that I can expand the **Catalog**.
15. As an **Admin**, I want to edit a **Jersey**, so that I can keep information correct.
16. As an **Admin**, I want to delete a **Jersey**, so that removed items no longer appear.
17. As an **Admin**, I want to set **Stock**, so that availability is accurate.
18. As an **Admin**, I want validation errors to be clear, so that I can fix input quickly.
19. As a developer, I want a centralized API client, so that calls are consistent and traceable.
20. As a developer, I want custom data hooks, so that components are clean and reusable.
21. As a developer, I want server state caching, so that the UI is fast and stable.
22. As a developer, I want debounced search, so that I reduce unnecessary requests.
23. As a developer, I want lazy-loaded heavy components, so that initial load is faster.
24. As a developer, I want memoized filters and lists, so that re-renders are efficient.
25. As a developer, I want a design system, so that UI styling is consistent.
26. As a developer, I want design tokens, so that colors, spacing, and typography are consistent.
27. As a developer, I want layered backend architecture, so that logic is maintainable.
28. As a developer, I want a global error handler, so that responses are consistent.
29. As a developer, I want JWT auth via HTTP-only cookies, so that security is stronger.
30. As a developer, I want role-based authorization, so that only **Admin** can modify **Jersey**.
31. As a developer, I want strict request validation, so that bad input never crashes the API.
32. As a developer, I want rate limiting, so that abuse is reduced.
33. As a developer, I want seeded **Jersey** data, so that the **Catalog** is ready immediately.
34. As a developer, I want a seeded **Admin** user, so that login works out of the box.
35. As a developer, I want a monorepo structure, so that frontend and backend are managed consistently.
36. As a developer, I want shared packages for UI and API access, so that reuse is easy and reliable.
37. As a developer, I want a single local Postgres setup, so that onboarding is fast.

## Implementation Decisions

- **Monorepo Structure**: npm workspaces with **apps/frontend** and **apps/backend** plus **packages/ui** and **packages/api-client**.
- **Migration Strategy**: move the existing Next.js app into **apps/frontend** as the baseline for Frontend 2.
- **Frontend Modules**:
  - **Catalog feature**: list, filters, sorting, search, and detail views.
  - **Admin feature**: login, CRUD UI, and protected views.
  - **Favorites feature**: client-only **Favorite** management.
  - **Shared UI**: Button, Input, Card, Badge and layout primitives built on design tokens.
- **State Management**:
  - Local state for search and filter inputs.
  - Global state via Zustand for auth session and **Favorites**.
  - Server state via TanStack Query for **Catalog** and **Jersey** data.
- **API Integration**: centralized fetch client with consistent error handling and auth cookie support; custom hooks per feature.
- **Performance**: debounce search, lazy-load detail components, memoize filters and list transformations.
- **Backend Architecture**: layered Routes → Controllers → Services → Repositories.
- **Security**: JWT auth stored in HTTP-only cookies, role-based checks for Admin-only endpoints.
- **Validation**: Zod schemas for all request bodies and query parameters.
- **Error Handling**: global error handler returns `{ success: false, message, errors[] }` for validation.
- **Database**: PostgreSQL with Prisma; schema includes **Jersey** with **Stock** and an **Admin** user table.
- **REST API**: `/api/v1` with public read endpoints and protected Admin endpoints; supports query filters for search and facets.
- **Local Infrastructure**: docker-compose for Postgres.

## Testing Decisions

- A good test verifies observable behavior, not internal implementation.
- Test **backend services** for business rules such as **Stock** constraints.
- Test **API endpoints** for public vs Admin access, validation failures, and filtering.
- If no prior tests exist in the repo, introduce minimal integration tests for API behavior.

## Out of Scope

- Multi-user registration flows beyond Admin login.
- Persistent **Favorites** in the backend.
- Payment, checkout, or order processing.
- Advanced analytics or recommendation systems.

## Further Notes

- This PRD aligns with the existing **EuroKits Catalog** context and preserves the domain terms (Jersey, Catalog, Admin, Public User, Stock, Favorite).
- README and `.env.example` must document local setup for both frontend and backend.
