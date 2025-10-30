# SpaceSam Landing Page

## Overview

A premium, modern landing page with LOVABLE-style aesthetics featuring animated mesh gradients, glassmorphism effects, and smooth animations.

## Features

### 1. Animated Mesh Gradient Background
- Purple, blue, and pink gradient orbs with blob animations
- Grid pattern overlay for depth
- Smooth 7-second animation cycle

### 2. Navigation Bar
- Fixed position with blur effect on scroll
- Glassmorphism backdrop
- Gradient logo and CTA buttons
- Responsive mobile menu

### 3. Hero Section
- Animated badge with pulsing dot
- Large gradient headlines with Korean text
- Glassmorphism stat cards
- Dual CTA buttons with hover effects
- Animated scroll indicator

### 4. Features Section
- 4 gradient feature cards:
  - **Smart Matching** (AI 매칭) - Purple/Pink gradient
  - **Project Management** (프로젝트 관리) - Blue/Cyan gradient
  - **Secure Payments** (토스 페이먼츠) - Pink/Rose gradient
  - **Slack Integration** (슬랙 연동) - Violet/Purple gradient
- Icon-based cards with hover effects
- Gradient backgrounds on hover

### 5. How It Works Section
- 4-step process with numbered cards
- Gradient numbers (01-04)
- Glassmorphism cards with hover scaling
- Responsive grid layout

### 6. Testimonials Section
- 3 customer testimonials
- Avatar with gradient backgrounds
- 5-star ratings
- Glassmorphism cards

### 7. CTA Section
- Full-width gradient background
- Animated gradient orbs
- Trust indicators (no credit card, cancel anytime, 24/7 support)
- Dual CTA buttons

### 8. Footer
- Multi-column layout with links
- Social media icons with hover effects
- Gradient accents (top and bottom borders)
- Made with love in Korea

## Design System

### Color Palette
- **Purple**: `#a855f7` (purple-500)
- **Pink**: `#ec4899` (pink-500)
- **Blue**: `#3b82f6` (blue-500)
- **Cyan**: `#06b6d4` (cyan-500)
- **Rose**: `#f43f5e` (rose-500)

### Animations
- `blob` - 7s infinite floating animation
- `fade-in` - 0.8s fade in effect
- `fade-in-up` - 0.8s fade in with upward movement
- `scroll` - 2s infinite scroll indicator
- Animation delays: 200ms, 400ms, 600ms, 2s, 4s

### Typography
- Primary font: Geist Sans (variable)
- Monospace: Geist Mono (variable)
- Gradient text using `bg-clip-text`

### Effects
- Glassmorphism: `backdrop-blur-xl` + `bg-white/5`
- Border glow: `border-white/10` to `border-white/20` on hover
- Shadow: `shadow-2xl` with color variants
- Scale on hover: `hover:scale-105`
- Smooth transitions: `duration-300` to `duration-500`

## Component Structure

```
components/landing/
├── mesh-gradient.tsx       # Animated background
├── navigation.tsx          # Top navigation bar
├── hero-section.tsx        # Hero with headline and CTAs
├── features-section.tsx    # 4 feature cards
├── how-it-works-section.tsx # 4-step process
├── testimonials-section.tsx # Customer testimonials
├── cta-section.tsx         # Final call-to-action
└── footer.tsx              # Footer with links
```

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Grid layouts adapt to screen size
- Stacked navigation on mobile

### Performance
- Smooth 60fps animations
- Optimized blend modes
- Efficient CSS animations
- Minimal re-renders

### Accessibility
- Semantic HTML
- ARIA labels for icons
- Smooth scroll behavior
- High contrast text

## Customization

### Changing Colors
Edit gradient classes in components:
- `from-purple-500 to-pink-500`
- `from-blue-500 to-cyan-500`
- etc.

### Modifying Animations
Edit `app/globals.css`:
- Blob animation speed
- Fade-in duration
- Animation delays

### Adding Sections
Create new component in `components/landing/`
Import and add to `app/page.tsx`

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance Metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+

## Live Preview
Development: http://localhost:3000
