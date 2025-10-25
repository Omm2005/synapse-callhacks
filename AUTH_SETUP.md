# Authentication Setup Guide

This project uses **Better Auth** with **Drizzle ORM** and **Google OAuth**.

## Prerequisites

1. PostgreSQL database
2. Google Cloud Console project

## Setup Steps

### 1. Database Setup

Create a PostgreSQL database and get the connection URL.

### 2. Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the following variables:

- `DATABASE_URL`: Your PostgreSQL connection string
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
- `BETTER_AUTH_SECRET`: Generate a random string (e.g., using `openssl rand -base64 32`)

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen
6. Create an OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret to your `.env.local`

### 4. Run Database Migrations

Push the schema to your database:

```bash
bun run db:push
```

Or generate and run migrations:

```bash
bun run db:generate
bun run db:migrate
```

### 5. Start the Development Server

```bash
bun run dev
```

## Usage

### Client-Side Authentication

```typescript
import { signIn, signOut, useSession } from "@/lib/auth-client";

// Sign in with Google
await signIn.social({ provider: "google" });

// Sign out
await signOut();

// Use session in a component
function MyComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  return <div>Hello {session.user.name}</div>;
}
```

## Database Scripts

- `bun run db:generate` - Generate migrations from schema
- `bun run db:migrate` - Run migrations
- `bun run db:push` - Push schema directly to database (development)
- `bun run db:studio` - Open Drizzle Studio to view/edit data

## Files Created

- [lib/db/schema.ts](lib/db/schema.ts) - Drizzle schema with Better Auth tables
- [lib/db/index.ts](lib/db/index.ts) - Database connection
- [lib/auth.ts](lib/auth.ts) - Better Auth server configuration
- [lib/auth-client.ts](lib/auth-client.ts) - Better Auth client utilities
- [app/api/auth/[...all]/route.ts](app/api/auth/[...all]/route.ts) - Auth API routes
- [drizzle.config.ts](drizzle.config.ts) - Drizzle Kit configuration
