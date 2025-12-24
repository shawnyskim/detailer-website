# DetailerStack Website

## Project Overview
Next.js marketing site for DetailerStack (B2B SaaS for car detailers) with embedded demo pages.

## Key Directories
- `app/` - Next.js app router pages
- `components/` - React components
- `public/demo/` - Static HTML demo pages (standalone, no React)

## Commands
```bash
npm run dev          # Development server (port 3000)
npm run build        # Production build
npx vercel --prod    # Deploy to production
```

## Demo Pages
The `/public/demo/` folder contains standalone HTML demos:
- `index.html` - Demo homepage
- `book/index.html` - Booking funnel

**Important**: Demo pages are pure HTML/CSS/JS with no build step. Changes are live immediately in production after deployment.

## File Syncing
When updating demo files, sync to standalone folder:
```bash
cp public/demo/book/index.html ../car-detailer-demo/book.html
```

## Development Workflow

### Before Marking Complete
1. Run `npm run build` - ensure no build errors
2. Test on `npm run dev` at localhost:3000
3. Test the specific feature in browser
4. For responsive changes: test at 390px (iPhone 12) and 375px (iPhone SE)
5. Deploy: `npx vercel --prod`

### Testing Checklist
- [ ] Desktop viewport works
- [ ] Mobile viewport works (390px width)
- [ ] All buttons/interactions functional
- [ ] No console errors
- [ ] Navigation between pages works

## Deployment
Deployed to Vercel at https://detailerstack.com
- Deploy via `npx vercel --prod` (CLI deployment, not GitHub auto-deploy)
- **CRITICAL: Do NOT add `output: 'export'` to next.config.ts** - this breaks API routes

## Form Submission (API Route)
The application form at `/api/submit-application` requires server-side execution:
- Stores data in Airtable
- Sends email notifications via Resend
- **Will NOT work with static export** - API routes need a server

Required Vercel environment variables:
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NOTIFICATION_EMAIL`

## Code Style

### Demo Pages (HTML)
- Embedded CSS in `<style>` tags
- Vanilla JavaScript (no frameworks)
- Lucide icons via CDN
- Mobile-first responsive breakpoints: 640px, 414px, 380px, 340px

### Next.js Pages
- TypeScript
- Tailwind CSS
- React components in `/components`

## Design System
```css
--obsidian-950: #0a0a0a   /* Background */
--obsidian-900: #141414   /* Cards */
--obsidian-800: #1f1f1f   /* Borders */
--champagne-500: #c9a66b  /* Primary accent */
--champagne-400: #d4b896  /* Light accent */
```
Font: Oswald (headings), Inter (body)
