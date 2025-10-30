# SpaceSam Platform - Deployment Guide

This guide walks you through deploying the SpaceSam Platform to Vercel with a custom domain.

## Prerequisites

Before you begin, ensure you have:

- [ ] A Vercel account ([sign up at vercel.com](https://vercel.com))
- [ ] A PostgreSQL database (recommended: [Supabase](https://supabase.com), [Neon](https://neon.tech), or [Railway](https://railway.app))
- [ ] Toss Payments account and API keys
- [ ] Slack workspace with webhook URL and bot token
- [ ] Custom domain (optional, but recommended)
- [ ] Git repository pushed to GitHub, GitLab, or Bitbucket

## Step 1: Prepare Your Database

### Option A: Using Supabase (Recommended)

1. Create a new project at [supabase.com](https://supabase.com)
2. Navigate to **Project Settings** > **Database**
3. Find the **Connection String** section
4. Copy the **Connection pooling** URI (format: `postgresql://...`)
5. Add `?pgbouncer=true&connection_limit=1` to the end for serverless optimization

### Option B: Using Neon

1. Create a new project at [neon.tech](https://neon.tech)
2. Copy the connection string from the dashboard
3. Ensure the connection string includes `?sslmode=require`

### Option C: Using Railway

1. Create a new PostgreSQL database at [railway.app](https://railway.app)
2. Copy the **DATABASE_URL** from the Variables tab
3. Add `?sslmode=require` if not present

## Step 2: Deploy to Vercel

### Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - **Set up and deploy?** Yes
   - **Which scope?** Select your account/team
   - **Link to existing project?** No
   - **Project name?** spacesam-platform (or your preferred name)
   - **Directory?** ./
   - **Override settings?** No

### Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure the project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `prisma generate && next build`
   - **Output Directory:** .next
   - **Install Command:** `npm install`

4. Click **Deploy** (don't add environment variables yet)

## Step 3: Configure Environment Variables

### In Vercel Dashboard

1. Go to your project settings: **Settings** > **Environment Variables**
2. Add the following variables for **Production**, **Preview**, and **Development**:

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?sslmode=require` |
| `NEXTAUTH_URL` | Your production URL | `https://spacesam.com` or `https://your-project.vercel.app` |
| `NEXTAUTH_SECRET` | Random secret for NextAuth | Generate with: `openssl rand -base64 32` |
| `TOSS_CLIENT_KEY` | Toss Payments client key | From Toss Payments dashboard |
| `TOSS_SECRET_KEY` | Toss Payments secret key | From Toss Payments dashboard |
| `SLACK_BOT_TOKEN` | Slack bot OAuth token | `xoxb-...` from Slack app settings |
| `SLACK_WEBHOOK_URL` | Slack incoming webhook URL | `https://hooks.slack.com/services/...` |
| `SLACK_SIGNING_SECRET` | Slack app signing secret | From Slack app settings |

### Generate NEXTAUTH_SECRET

Run this command to generate a secure random secret:
```bash
openssl rand -base64 32
```

### Setting Variables via CLI

Alternatively, use the Vercel CLI:
```bash
vercel env add DATABASE_URL production
# Paste your database URL when prompted

vercel env add NEXTAUTH_SECRET production
# Paste your generated secret

# Repeat for all required variables
```

## Step 4: Run Database Migrations

After setting environment variables, you need to run Prisma migrations:

### Option A: Via Vercel CLI

```bash
# Set environment variables locally for migration
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### Option B: Automatic on Build

The `vercel.json` configuration includes `prisma generate` in the build command, so migrations will run automatically on each deployment.

### Option C: Using Prisma Data Platform

1. Create a Prisma Data Platform account
2. Connect your database
3. Enable automatic migrations on deployment

## Step 5: Set Up Custom Domain

### Add Domain to Vercel

1. Go to your project: **Settings** > **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `spacesam.com`)
4. Click **Add**

### Configure DNS Records

You'll need to update your domain's DNS settings with your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

#### For Root Domain (spacesam.com)

Add an **A Record**:
- **Type:** A
- **Name:** @ (or leave blank)
- **Value:** `76.76.21.21`
- **TTL:** 3600 (or auto)

#### For www Subdomain

Add a **CNAME Record**:
- **Type:** CNAME
- **Name:** www
- **Value:** `cname.vercel-dns.com`
- **TTL:** 3600 (or auto)

#### Alternative: Using Nameservers

If you want to use Vercel's nameservers for full DNS management:

1. In Vercel, go to **Domains** and click your domain
2. Select **Use Vercel Nameservers**
3. Update your domain registrar's nameservers to:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

### Verify Domain

1. After updating DNS records, return to Vercel dashboard
2. Click **Verify** next to your domain
3. Wait for DNS propagation (can take 24-48 hours, usually much faster)
4. Once verified, Vercel will automatically provision an SSL certificate

### Set Primary Domain

1. Go to **Settings** > **Domains**
2. Find your preferred domain (e.g., `spacesam.com`)
3. Click the three dots menu
4. Select **Set as Primary**
5. Optionally, enable **Redirect other domains** to automatically redirect `www` to root or vice versa

## Step 6: Configure Redirects and Rewrites (Optional)

If you need custom redirects or rewrites, update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

## Step 7: Set Up Webhooks

### Toss Payments Webhook

1. Log in to [Toss Payments Dashboard](https://developers.tosspayments.com/)
2. Go to **Settings** > **Webhooks**
3. Add webhook URL: `https://your-domain.com/api/webhooks/toss`
4. Select events to subscribe to:
   - Payment approved
   - Payment canceled
   - Virtual account deposited

### Slack Webhook

1. Go to [Slack API](https://api.slack.com/apps)
2. Select your app or create a new one
3. Navigate to **Incoming Webhooks**
4. Activate Incoming Webhooks
5. Click **Add New Webhook to Workspace**
6. Select the channel for notifications
7. Copy the webhook URL and add it to your environment variables

## Step 8: Post-Deployment Testing

### Test Core Functionality

- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Project creation works
- [ ] Payment flow works (use Toss sandbox mode for testing)
- [ ] Slack notifications are received
- [ ] Custom domain resolves correctly
- [ ] SSL certificate is active (check for 🔒 in browser)

### Test Environment Variables

Create a simple API route to verify environment variables (remove after testing):

```typescript
// app/api/test-env/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    database: !!process.env.DATABASE_URL,
    nextauth: !!process.env.NEXTAUTH_SECRET,
    toss: !!process.env.TOSS_CLIENT_KEY,
    slack: !!process.env.SLACK_WEBHOOK_URL,
  })
}
```

Visit: `https://your-domain.com/api/test-env`

Expected response: All values should be `true`

## Step 9: Production Optimizations

### Enable Analytics

1. Go to **Analytics** tab in Vercel
2. Enable Web Analytics for performance monitoring
3. Enable Speed Insights for Core Web Vitals

### Set Up Monitoring

Consider integrating:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Vercel Analytics** for user insights

### Configure Caching

Update `next.config.mjs` for optimal caching:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-cdn.com'],
  },
  // Enable SWC minification
  swcMinify: true,
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig
```

## Troubleshooting

### Build Failures

**Issue:** Prisma Client not generated
```
Error: @prisma/client did not initialize yet
```

**Solution:** Ensure `prisma generate` runs before build:
```json
// vercel.json
{
  "buildCommand": "prisma generate && next build"
}
```

**Issue:** Module not found errors
```
Error: Cannot find module 'next-auth'
```

**Solution:** Ensure all dependencies are in `dependencies`, not `devDependencies`

### Database Connection Errors

**Issue:** Connection pool exhausted
```
Error: Can't reach database server
```

**Solution:** Use connection pooling:
- Add `?pgbouncer=true` to Supabase connection string
- Add `?connection_limit=1` for serverless
- Use Prisma Accelerate for connection pooling

### Domain Not Resolving

**Issue:** Domain shows "Domain Not Found"

**Solution:**
1. Verify DNS records are correct
2. Wait for DNS propagation (use [dnschecker.org](https://dnschecker.org))
3. Clear browser cache
4. Try incognito/private mode

### SSL Certificate Issues

**Issue:** "Your connection is not private"

**Solution:**
1. Wait 24 hours for certificate provisioning
2. Ensure DNS records point to Vercel
3. Check domain verification in Vercel dashboard
4. Contact Vercel support if issue persists

### Environment Variables Not Working

**Issue:** Variables are undefined at runtime

**Solution:**
1. Verify variables are set for the correct environment (Production/Preview)
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)
4. For client-side variables, prefix with `NEXT_PUBLIC_`

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches and pull requests

### Branch Settings

Configure in **Settings** > **Git**:
- **Production Branch:** main
- **Preview Branch:** All branches
- **Ignored Build Step:** Configure if needed

## Rolling Back Deployments

If something goes wrong:

1. Go to **Deployments** tab
2. Find the last working deployment
3. Click the three dots menu
4. Select **Promote to Production**

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Toss Payments Documentation](https://docs.tosspayments.com/)
- [Slack API Documentation](https://api.slack.com/)

## Support

For deployment issues:
- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Community:** [vercel.com/community](https://vercel.com/community)
- **Discord:** [vercel.com/discord](https://vercel.com/discord)

---

Last Updated: October 2025
