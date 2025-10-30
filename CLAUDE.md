# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SpaceSam Platform is a Next.js 14 application built with TypeScript that connects clients with freelancers. The platform includes authentication, user profiles, project management, Toss Payments integration, and Slack notifications.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Database Commands (after Prisma setup)
```bash
npx prisma generate  # Generate Prisma client
npx prisma migrate dev --name <name>  # Create and apply migration
npx prisma studio    # Open Prisma Studio GUI
npx prisma db push   # Push schema changes without migration
```

### Adding shadcn/ui Components
```bash
npx shadcn@latest add <component-name>  # Add specific component
npx shadcn@latest add button            # Example: add button component
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: NextAuth.js (to be installed)
- **Database**: PostgreSQL with Prisma ORM (to be installed)
- **Payments**: Toss Payments API
- **Notifications**: Slack API

### Project Structure

#### App Directory (App Router)
- `app/(auth)/*` - Authentication pages (login, register, forgot-password)
  - Grouped route that shares auth-specific layout
  - Not authenticated pages

- `app/(dashboard)/*` - Protected dashboard pages
  - `client/` - Client-specific pages (profile, projects)
  - `freelancer/` - Freelancer-specific pages (profile, projects)
  - `projects/[id]` - Dynamic project detail pages
  - `settings/` - User settings

- `app/api/*` - API routes
  - `auth/[...nextauth]` - NextAuth.js handler
  - `users/` - User management endpoints
  - `projects/` - Project CRUD endpoints
  - `payments/toss/` - Toss Payments endpoints
  - `webhooks/` - Webhook handlers for Slack and Toss

#### Core Libraries (`lib/`)
- `lib/auth/` - Authentication configuration and utilities
  - `config.ts` - NextAuth options and auth helpers

- `lib/db/` - Database client configuration
  - `index.ts` - Prisma client setup (singleton pattern)

- `lib/payments/toss/` - Toss Payments integration
  - `client.ts` - TossPaymentsClient class with methods for payment operations
  - Methods: `confirmPayment()`, `getPayment()`, `cancelPayment()`

- `lib/slack/` - Slack integration
  - `client.ts` - SlackClient class for notifications
  - Methods: `sendMessage()`, `notifyNewProject()`, `notifyMilestoneCompleted()`, `notifyPaymentReceived()`

- `lib/validations/` - Zod validation schemas (to be implemented)

#### Components (`components/`)
- `components/ui/` - shadcn/ui components
- `components/auth/` - Authentication-related components
- `components/profile/` - User profile components
- `components/projects/` - Project management components
- `components/payments/` - Payment UI components

#### Type Definitions (`types/`)
- `types/index.ts` - Core TypeScript types and enums
  - User types: `User`, `ClientProfile`, `FreelancerProfile`, `UserRole`
  - Project types: `Project`, `ProjectMilestone`, `ProjectStatus`
  - Payment types: `Payment`, `PaymentStatus`, `TossPaymentRequest`, `TossPaymentResponse`
  - Slack types: `SlackNotification`, `SlackWebhookPayload`

## User Roles and Flows

### User Roles
1. **CLIENT** - Posts projects, hires freelancers, makes payments
2. **FREELANCER** - Browses projects, submits proposals, completes work
3. **ADMIN** - Platform administration

### Key User Flows

#### Client Flow
1. Register/Login as CLIENT
2. Create project with budget and requirements
3. Review freelancer proposals
4. Hire freelancer and set milestones
5. Make payments via Toss Payments
6. Review and approve completed work

#### Freelancer Flow
1. Register/Login as FREELANCER
2. Browse available projects
3. Submit proposals
4. Work on accepted projects
5. Complete milestones
6. Receive payments

## Integration Details

### Toss Payments Integration
- Client class: `lib/payments/toss/client.ts`
- API endpoints: `app/api/payments/toss/`
- Webhook handler: `app/api/webhooks/toss/`
- Flow: Request → User approval → Confirm → Handle webhook

### Slack Integration
- Client class: `lib/slack/client.ts`
- Webhook handler: `app/api/webhooks/slack/`
- Notifications sent for:
  - New project creation
  - Milestone completion
  - Payment received

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

- **Database**: `DATABASE_URL`
- **NextAuth**: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- **Toss Payments**: `TOSS_CLIENT_KEY`, `TOSS_SECRET_KEY`
- **Slack**: `SLACK_BOT_TOKEN`, `SLACK_WEBHOOK_URL`, `SLACK_SIGNING_SECRET`

## Next Steps for Full Implementation

1. **Install Dependencies**:
   ```bash
   npm install next-auth @prisma/client prisma zod @slack/web-api
   npm install -D @types/node
   ```

2. **Set up Prisma**:
   ```bash
   npx prisma init
   # Define schema in prisma/schema.prisma
   npx prisma migrate dev --name init
   ```

3. **Configure NextAuth**:
   - Implement providers in `lib/auth/config.ts`
   - Add API route handler in `app/api/auth/[...nextauth]/route.ts`

4. **Implement API Routes**:
   - User CRUD in `app/api/users/`
   - Project CRUD in `app/api/projects/`
   - Payment endpoints in `app/api/payments/toss/`
   - Webhook handlers in `app/api/webhooks/`

5. **Build UI Components**:
   - Add required shadcn/ui components
   - Create authentication forms
   - Build project creation and management UI
   - Implement payment flow UI

6. **Test Integrations**:
   - Test Toss Payments in sandbox mode
   - Set up Slack webhook and test notifications
   - Test end-to-end user flows

## Code Conventions

- Use TypeScript strict mode
- Follow Next.js App Router patterns (Server Components by default)
- Use Zod for runtime validation
- Keep API routes thin, business logic in `lib/`
- Use proper HTTP status codes in API responses
- Handle errors gracefully with try-catch blocks
- Use environment variables for all secrets and configuration
