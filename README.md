# InventoryFlow

A modern, multi-tenant inventory management app built with Next.js 14 (App Router), Prisma, and GraphQL. Manage products, users, and sales with insightful dashboards, rich charts, and role‑based views for Admin, Manager, and Staff. Includes a polished landing page and light/dark theme with persistence.

## Features

- **Landing page**: Marketing homepage with feature highlights and CTAs (Sign up, Log in)
- **Authentication and roles**: `admin`, `manager`, `staff` protected areas under `src/app/(auth-group)`
- **Multi-tenant**: Tenant-aware entities and APIs
- **Products & sales**: CRUD, analytics, and charts (sales trends, stock by category, top products)
- **Users**: Manage users with dialogs and actions
- **GraphQL API**: Apollo-style schema in `src/app/api/graphql` with resolvers for `product`, `sale`, `tenant`, `user`
- **Prisma**: Database access with `prisma/schema.prisma` and seed script
- **File uploads**: API route at `src/app/api/upload/route.ts`
- **Theming**: Light and dark themes via Radix Themes and CSS variables, persisted to `localStorage`

## Tech Stack

- Next.js 14 (App Router) + React 18
- TypeScript
- Prisma ORM
- GraphQL (Apollo Server on Next.js route handler)
- Radix UI + Tailwind CSS

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Environment variables**

Create a `.env` file at project root:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/inventory?schema=public"
# Add any other required secrets here
```

3. **Database setup**

```bash
npx prisma migrate dev
npx prisma db seed
```

4. **Run the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Project Structure

- `src/app` — App Router pages, layouts, and API routes
  - `(auth-group)` — Protected layouts and role dashboards
  - `api/graphql` — GraphQL schema, resolvers, and route handler
  - `api/upload` — File upload route
  - `products` — Public product list and detail views
  - `login`, `signup` — Auth screens
- `src/components` — UI components (cards, charts, buttons)
- `src/contexts` — `ThemeContextProvider`, `UserContextProvider`
- `src/hooks` — Data hooks for products, users, and sales
- `src/lib` — Auth helpers, GraphQL queries/mutations, types, utilities
- `src/services` — Prisma client and GraphQL client
- `prisma` — Prisma schema and seed

## Theming (Light/Dark)

- Theme state lives in `src/contexts/ThemeContextProvider.tsx`
- Uses Radix Themes for base appearance and Tailwind/CSS variables for background/foreground

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run prisma:studio` — Open Prisma Studio (add this script if you need it)

## Deployment

- Any platform that supports Next.js 14 (Vercel recommended)
- Ensure `DATABASE_URL` and other secrets are configured in your host
- Run `prisma migrate deploy` during deploy

## License

MIT © InventoryFlow Contributors
