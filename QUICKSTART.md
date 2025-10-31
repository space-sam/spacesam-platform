# SpaceSam Platform - Quick Start Deployment Guide

This guide will get you deployed to Vercel with your custom domain in under 10 minutes.

## Step 1: Push to GitHub

Your repository is configured with the remote: `https://github.com/space-sam/spacesam-platform.git`

### Option A: Using GitHub CLI (Recommended - Easiest)

```bash
# Install GitHub CLI if not already installed
brew install gh

# Authenticate with GitHub
gh auth login

# Push to GitHub
git push -u origin main
```

Follow the prompts:
- What account do you want to log into? **GitHub.com**
- What is your preferred protocol? **HTTPS**
- Authenticate? **Login with a web browser**
- Copy the one-time code and press Enter to open browser

### Option B: Using Personal Access Token

1. Create a token at [github.com/settings/tokens/new](https://github.com/settings/tokens/new)
   - Note: "SpaceSam Platform"
   - Expiration: 90 days (or your preference)
   - Scopes: Select **repo** (all checkboxes under repo)
   - Click **Generate token**
   - Copy the token (starts with `ghp_...`)

2. Push with token:
```bash
# Use token as password when prompted
git push -u origin main
Username: your-github-username
Password: ghp_your_token_here
```

3. Cache credentials (optional):
```bash
git config --global credential.helper osxkeychain
```

### Option C: Using SSH (Most Secure)

1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
# Press Enter to accept default location
# Enter passphrase (optional)
```

2. Add SSH key to GitHub:
```bash
# Copy public key to clipboard
pbcopy < ~/.ssh/id_ed25519.pub
```

3. Go to [github.com/settings/ssh/new](https://github.com/settings/ssh/new)
   - Title: "MacBook Pro"
   - Key: Paste from clipboard
   - Click **Add SSH key**

4. Update remote URL and push:
```bash
git remote set-url origin git@github.com:space-sam/spacesam-platform.git
git push -u origin main
```

## Step 2: Set Up Database

Before deploying, you need a PostgreSQL database. **Choose one:**

### Supabase (Recommended - Free tier includes 500MB)

1. Go to [supabase.com](https://supabase.com) and create account
2. Click **New Project**
   - Name: `spacesam-platform`
   - Database Password: Generate strong password (save it!)
   - Region: Northeast Asia (Seoul) or closest to you
   - Click **Create new project**

3. Wait 2-3 minutes for provisioning

4. Get connection string:
   - Go to **Project Settings** (gear icon) > **Database**
   - Scroll to **Connection string** > **URI**
   - Copy the connection pooling string
   - Replace `[YOUR-PASSWORD]` with your actual password
   - Add `?pgbouncer=true&connection_limit=1` to the end

Your final string should look like:
```
postgresql://postgres.xxx:password@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

### Neon (Alternative - Generous free tier)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create new project:
   - Name: `spacesam-platform`
   - Region: Seoul (AWS ap-northeast-2)
3. Copy the connection string from the dashboard

### Railway (Alternative - Easy setup)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **New Project** > **Provision PostgreSQL**
3. Click on the database > **Variables** tab
4. Copy the `DATABASE_URL` value

## Step 3: Prepare Environment Variables

Before deploying to Vercel, gather these values:

### Required Right Now

- ✅ **DATABASE_URL**: (from Step 2 above)
- ✅ **NEXTAUTH_SECRET**: Run: `openssl rand -base64 32`

### Can Configure Later (But needed for full functionality)

- **TOSS_CLIENT_KEY**: Get from [Toss Payments Dashboard](https://developers.tosspayments.com/)
- **TOSS_SECRET_KEY**: Get from Toss Payments Dashboard
- **SLACK_BOT_TOKEN**: Get from [Slack API Apps](https://api.slack.com/apps)
- **SLACK_WEBHOOK_URL**: Get from Slack Incoming Webhooks
- **SLACK_SIGNING_SECRET**: Get from Slack app settings

## Step 4: Deploy to Vercel

### Quick Deploy (Using Vercel CLI)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```
Choose your preferred login method (GitHub, GitLab, Bitbucket, or Email)

3. Deploy:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No
- **What's your project's name?** spacesam-platform (or press Enter)
- **In which directory is your code located?** ./ (press Enter)
- **Want to override settings?** No

4. Add environment variables:
```bash
# Add DATABASE_URL
vercel env add DATABASE_URL production
# Paste your database URL when prompted

# Add NEXTAUTH_SECRET
vercel env add NEXTAUTH_SECRET production
# Paste the output from: openssl rand -base64 32

# Add NEXTAUTH_URL (use your Vercel preview URL for now)
vercel env add NEXTAUTH_URL production
# Enter: https://spacesam-platform.vercel.app (or your custom domain if ready)
```

5. Deploy to production:
```bash
vercel --prod
```

### Deploy via Vercel Dashboard (Alternative)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your repository: `space-sam/spacesam-platform`
4. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** ./
   - Leave other settings as default
5. Click **Deploy** (first deployment will fail - this is expected)
6. Go to **Settings** > **Environment Variables**
7. Add variables:
   - `DATABASE_URL` = your database connection string
   - `NEXTAUTH_SECRET` = output from `openssl rand -base64 32`
   - `NEXTAUTH_URL` = `https://your-project.vercel.app`
8. Go to **Deployments** tab
9. Click **Redeploy** on the latest deployment

## Step 5: Run Database Migration

After first deployment, you need to run Prisma migrations:

```bash
# Set environment variable temporarily
export DATABASE_URL="your-production-database-url"

# Run migration
npx prisma migrate deploy

# Verify
npx prisma studio
```

This creates all the necessary tables in your database.

## Step 6: Connect Custom Domain

### In Vercel Dashboard

1. Go to your project > **Settings** > **Domains**
2. Click **Add**
3. Enter your domain (e.g., `spacesam.com`)
4. Click **Add**

### Configure DNS at Your Domain Registrar

You'll see instructions in Vercel. Typically:

#### For Root Domain (spacesam.com)

Add **A Record**:
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600
```

#### For www Subdomain

Add **CNAME Record**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Common Domain Registrars

**GoDaddy:**
1. Go to DNS Management
2. Click **Add** under Records
3. Enter values above

**Namecheap:**
1. Go to Domain List > Manage
2. Advanced DNS tab
3. Add records

**Cloudflare:**
1. Go to DNS settings
2. Add records
3. Ensure Proxy status is "DNS only" (gray cloud)

**Google Domains:**
1. Go to DNS settings
2. Manage custom records
3. Add entries

### Verify Domain

1. Return to Vercel dashboard
2. Click **Verify** next to your domain
3. Wait for DNS propagation (usually 5-15 minutes, max 48 hours)
4. Once verified, SSL certificate is automatically provisioned

### Update NEXTAUTH_URL

After domain is verified:

```bash
# Update the production environment variable
vercel env rm NEXTAUTH_URL production
vercel env add NEXTAUTH_URL production
# Enter: https://spacesam.com (your actual domain)

# Redeploy
vercel --prod
```

Or update in dashboard:
1. **Settings** > **Environment Variables**
2. Edit `NEXTAUTH_URL`
3. Change to your custom domain
4. Redeploy from **Deployments** tab

## Step 7: Test Your Deployment

Visit your site:
- Vercel URL: `https://your-project.vercel.app`
- Custom domain: `https://spacesam.com` (after DNS propagation)

### Quick Test Checklist

- [ ] Homepage loads with landing page
- [ ] Theme toggle works (light/dark mode)
- [ ] All sections visible (hero, features, testimonials, CTA)
- [ ] SSL certificate is active (🔒 in browser)
- [ ] Custom domain redirects correctly

### Test API Health

Create a test endpoint to verify everything is connected:

```bash
# Test if environment variables are loaded
curl https://your-domain.com/api/test-env
```

If you created the test endpoint from DEPLOYMENT.md, you should see all values as `true`.

## Step 8: Enable Continuous Deployment

Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches and PRs

Test it:
```bash
# Make a small change
echo "# Auto-deploy test" >> README.md
git add README.md
git commit -m "test: verify auto-deployment"
git push

# Check Vercel dashboard - you should see a new deployment
```

## Troubleshooting

### Push to GitHub Failed

**Error:** `fatal: could not read Username`

**Solution:** Follow Step 1 options above for authentication

### Build Failed on Vercel

**Error:** `@prisma/client did not initialize yet`

**Solution:**
- The `vercel.json` should handle this automatically
- If it persists, go to **Settings** > **General** > **Build Command**
- Set to: `prisma generate && next build`

### Database Connection Failed

**Error:** `Can't reach database server`

**Solution:**
- Verify `DATABASE_URL` in Vercel environment variables
- For Supabase, ensure you're using the connection pooling URL
- Add `?pgbouncer=true&connection_limit=1` to the connection string

### Domain Not Working

**Issue:** Shows "Domain Not Found"

**Solution:**
1. Check DNS records are correct in your registrar
2. Use [dnschecker.org](https://dnschecker.org) to verify propagation
3. Wait up to 48 hours for full propagation
4. Clear browser cache or try incognito mode

### SSL Certificate Error

**Issue:** "Your connection is not private"

**Solution:**
1. Wait 10-15 minutes after domain verification
2. Vercel automatically provisions Let's Encrypt certificate
3. Check **Settings** > **Domains** for certificate status
4. If stuck, remove and re-add domain

## Next Steps

### Add Remaining Environment Variables

Once you have accounts set up:

```bash
# Toss Payments
vercel env add TOSS_CLIENT_KEY production
vercel env add TOSS_SECRET_KEY production

# Slack
vercel env add SLACK_BOT_TOKEN production
vercel env add SLACK_WEBHOOK_URL production
vercel env add SLACK_SIGNING_SECRET production
```

Then redeploy:
```bash
vercel --prod
```

### Monitor Your Application

1. Enable **Analytics** in Vercel dashboard
2. Enable **Speed Insights** for performance monitoring
3. Set up **Error Tracking** (Sentry recommended)

### Set Up Development Workflow

```bash
# Create new feature branch
git checkout -b feature/your-feature

# Make changes
# ...

# Commit and push
git add .
git commit -m "feat: add your feature"
git push -u origin feature/your-feature

# Create PR on GitHub
# Vercel automatically creates preview deployment

# After review, merge to main
# Automatic production deployment
```

## Resources

- **Full Deployment Guide:** See `DEPLOYMENT.md` for detailed troubleshooting
- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **GitHub Repository:** [github.com/space-sam/spacesam-platform](https://github.com/space-sam/spacesam-platform)
- **Project Documentation:** See `CLAUDE.md` for project overview
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)

## Quick Reference Commands

```bash
# Local development
npm run dev

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Environment variables
vercel env ls
vercel env add VAR_NAME production
vercel env rm VAR_NAME production

# Database
npx prisma studio          # GUI for database
npx prisma migrate dev     # Local migration
npx prisma migrate deploy  # Production migration
npx prisma generate        # Generate client
```

---

**Estimated Setup Time:** 10-15 minutes (plus DNS propagation time)

**Need Help?** Check `DEPLOYMENT.md` for detailed troubleshooting or visit [vercel.com/support](https://vercel.com/support)
