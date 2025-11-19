# SpaceSam Platform - Complete Setup Guide

## Overview

SpaceSam is a comprehensive freelancer-client matching platform with the following features:

1. **Google OAuth Login** - Secure authentication with Google
2. **Service Introduction Landing Page** - Professional landing page (already exists)
3. **Portfolio & Profile Management** - Separate profiles for clients and freelancers
4. **Subscription Flow** - Multi-tier subscription plans with Toss Payments
5. **Google Meet Integration** - Schedule meetings directly from the platform
6. **Electronic Contract Signing** - Digital contract creation and signing
7. **Real-time Chat** - Project-based chat rooms using Pusher
8. **Dark/Light Mode** - Theme switching (already implemented)

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Backend**: Next.js API Routes
- **Database**: Prisma + PostgreSQL (Supabase)
- **Authentication**: NextAuth.js with Google Provider
- **Real-time**: Pusher for chat
- **Payments**: Toss Payments
- **Calendar**: Google Calendar API for Google Meet
- **UI**: Tailwind CSS + shadcn/ui

## Prerequisites

1. Node.js 18+ and npm
2. PostgreSQL database (Supabase recommended)
3. Google Cloud Console project
4. Pusher account
5. Toss Payments account (sandbox for testing)

## Step 1: Clone and Install

```bash
cd Documents/spacesam-platform
npm install
```

## Step 2: Database Setup

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string from Project Settings > Database

### 2.2 Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the DATABASE_URL in `.env.local` with your Supabase connection string.

### 2.3 Run Prisma Migrations

```bash
npx prisma generate
npx prisma db push
```

## Step 3: Google Cloud Setup

### 3.1 Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable APIs:
   - Google Calendar API
   - Google+ API
4. Go to "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Set authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Copy Client ID and Client Secret

### 3.2 Update .env.local

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Step 4: NextAuth Setup

Generate a secret for NextAuth:

```bash
openssl rand -base64 32
```

Add to `.env.local`:

```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generated-secret-here"
```

## Step 5: Pusher Setup (Real-time Chat)

### 5.1 Create Pusher Account

1. Go to [pusher.com](https://pusher.com)
2. Create a new Channels app
3. Select a cluster (e.g., ap3 for Asia Pacific)
4. Copy credentials

### 5.2 Update .env.local

```env
PUSHER_APP_ID="your-app-id"
PUSHER_SECRET="your-secret"
NEXT_PUBLIC_PUSHER_KEY="your-key"
NEXT_PUBLIC_PUSHER_CLUSTER="ap3"
```

## Step 6: Toss Payments Setup

### 6.1 Create Toss Payments Account

1. Go to [Toss Payments](https://www.tosspayments.com)
2. Sign up and get test credentials
3. Copy Client Key and Secret Key

### 6.2 Update .env.local

```env
TOSS_CLIENT_KEY="test_ck_..."
TOSS_SECRET_KEY="test_sk_..."
```

## Step 7: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Features Guide

### 1. Authentication

- **Login Page**: `/login`
- **Register Page**: `/register`
- Supports both Google OAuth and email/password
- Role selection (Client or Freelancer) during registration

### 2. Dashboard

After login, users are redirected to role-specific dashboards:

- **Client Dashboard**: Manage projects, view subscriptions
- **Freelancer Dashboard**: View assigned projects, manage profile

### 3. Profile Management

#### Client Profile (`/client/profile`)
- Company information
- Industry and company size
- Bio

#### Freelancer Profile (`/freelancer/profile`)
- Skills and portfolio
- Hourly rate
- Experience and education
- Availability status

### 4. Subscription Plans (`/subscriptions`)

Four tiers available:
- **Free**: Basic features
- **Basic** (₩29,000/month): Unlimited projects, real-time chat, Google Meet
- **Pro** (₩59,000/month): Advanced analytics, automation
- **Enterprise**: Custom pricing

### 5. Project Management

#### Client Projects (`/client/projects`)
- Create new projects
- View all projects
- Track progress

#### Freelancer Projects (`/freelancer/projects`)
- View assigned projects
- Track deadlines

### 6. Project Chat (`/projects/[id]`)

Each project has a dedicated chat room with:
- Real-time messaging powered by Pusher
- Message history
- Participant info
- Project details sidebar

### 7. Google Meet Integration

API endpoint: `POST /api/meetings/create`

Create meetings with:
- Title and description
- Scheduled time and duration
- Attendee list
- Automatic Google Calendar event creation
- Google Meet link generation

### 8. Electronic Contracts

#### Create Contract
API: `POST /api/contracts`
- Attach to project
- Upload document
- Add terms and conditions

#### Sign Contract
API: `PUT /api/contracts`
- Both parties can sign
- Status updates automatically
- Signature timestamps

### 9. Real-time Chat

Powered by Pusher:
- Project-based chat rooms
- Real-time message delivery
- Message persistence in database
- Read receipts

## Database Schema

### Key Models

1. **User** - Core user model with role (CLIENT/FREELANCER/ADMIN)
2. **ClientProfile** - Extended profile for clients
3. **FreelancerProfile** - Extended profile with skills, portfolio, rates
4. **Project** - Project management
5. **Subscription** - Subscription plans and billing
6. **Contract** - Electronic contracts with signatures
7. **Meeting** - Google Meet integration data
8. **ChatMessage** - Real-time chat messages

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth handler

### Profile
- `PUT /api/profile/client` - Update client profile
- `PUT /api/profile/freelancer` - Update freelancer profile

### Subscriptions
- `POST /api/subscriptions/create` - Create subscription
- `POST /api/subscriptions/cancel` - Cancel subscription

### Chat
- `POST /api/chat/send` - Send message
- `POST /api/pusher/auth` - Pusher authentication

### Meetings
- `POST /api/meetings/create` - Create Google Meet

### Contracts
- `POST /api/contracts` - Create contract
- `PUT /api/contracts` - Sign contract

## Deployment

### Environment Variables for Production

Update these for production:

```env
NEXTAUTH_URL="https://your-domain.com"
GOOGLE_CLIENT_ID="production-client-id"
TOSS_CLIENT_KEY="live_ck_..."
DATABASE_URL="production-database-url"
```

### Recommended Deployment

- **Frontend**: Vercel
- **Database**: Supabase
- **File Storage**: Cloudinary or AWS S3 (for contract documents)

### Build for Production

```bash
npm run build
npm start
```

## Testing

### Test Accounts

Create test accounts with different roles:

1. Register as CLIENT
2. Register as FREELANCER
3. Test authentication flows
4. Test chat in projects

### Test Payments

Use Toss Payments sandbox credentials for testing subscriptions.

### Test Google Meet

Ensure Google Calendar API is properly configured and authorized.

## Troubleshooting

### Database Issues

```bash
# Reset database
npx prisma migrate reset

# Regenerate Prisma client
npx prisma generate
```

### Authentication Issues

- Check NEXTAUTH_SECRET is set
- Verify Google OAuth redirect URIs
- Check callback URL configuration

### Chat Not Working

- Verify Pusher credentials
- Check browser console for Pusher connection errors
- Ensure Pusher cluster matches your account

### Google Meet Integration

- Verify Calendar API is enabled
- Check OAuth scopes include calendar access
- Ensure user has granted calendar permissions

## Support

For issues or questions:
- Check existing documentation
- Review error logs
- Contact support team

## Next Steps

1. Add payment webhook handlers for Toss Payments
2. Implement file upload for contract documents
3. Add email notifications
4. Enhance analytics dashboard
5. Add admin panel
6. Implement project milestones
7. Add review/rating system

## License

Proprietary - SpaceSam Platform
