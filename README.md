# SpaceSam Platform

A modern platform connecting clients with freelancers, built with Next.js 14, TypeScript, and integrated with Toss Payments and Slack.

## Features

- **Authentication**: Secure user authentication with NextAuth.js
- **Dual User Roles**: Separate profiles and dashboards for clients and freelancers
- **Project Management**: Create, manage, and track projects with milestones
- **Payment Integration**: Seamless payment processing with Toss Payments
- **Slack Notifications**: Real-time notifications for important events
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL + Prisma ORM
- **Payments**: Toss Payments
- **Notifications**: Slack API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Toss Payments account (for payment integration)
- Slack workspace (for notifications)

### Installation

1. Clone the repository:
```bash
cd ~/Documents/spacesam-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration values.

4. Set up the database:
```bash
# Install Prisma
npm install @prisma/client prisma

# Initialize Prisma (already done)
npx prisma init

# Create your schema in prisma/schema.prisma
# Then run migrations
npx prisma migrate dev --name init
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
spacesam-platform/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (dashboard)/         # Protected pages
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── auth/                # Authentication components
│   ├── profile/             # Profile components
│   ├── projects/            # Project components
│   └── payments/            # Payment components
├── lib/                     # Core libraries
│   ├── auth/                # Authentication utilities
│   ├── db/                  # Database client
│   ├── payments/            # Payment integrations
│   ├── slack/               # Slack integration
│   └── validations/         # Schema validations
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Development

### Running Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Adding UI Components

This project uses shadcn/ui. To add components:

```bash
npx shadcn@latest add button
npx shadcn@latest add form
npx shadcn@latest add dialog
```

### Database Management

```bash
npx prisma studio                    # Open database GUI
npx prisma migrate dev --name <name> # Create migration
npx prisma generate                  # Regenerate Prisma client
```

## Configuration

### Toss Payments

1. Sign up at [Toss Payments](https://www.tosspayments.com/)
2. Get your Client Key and Secret Key
3. Add them to your `.env.local`
4. Test in sandbox mode before going live

### Slack Integration

1. Create a Slack App at [api.slack.com](https://api.slack.com/apps)
2. Add required OAuth scopes
3. Install the app to your workspace
4. Copy the Bot Token and Webhook URL to `.env.local`

## Next Steps

1. **Database Schema**: Define your Prisma schema in `prisma/schema.prisma`
2. **Authentication**: Configure providers in `lib/auth/config.ts`
3. **API Routes**: Implement CRUD operations in `app/api/`
4. **UI Components**: Build page components using shadcn/ui
5. **Testing**: Add tests for critical flows

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Toss Payments API](https://docs.tosspayments.com)
- [Slack API](https://api.slack.com)

## License

Private project - All rights reserved
