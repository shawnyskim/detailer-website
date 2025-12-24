# DetailerStack - Car Detailing Website Service

A modern, minimal landing page for a service that creates websites and marketing systems for car detailing businesses. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Modern dark mode design inspired by https://mapo.studio/
- Fully responsive (mobile, tablet, desktop)
- Smooth scroll animations with Framer Motion
- Fixed/sticky navigation with smooth scrolling
- Interactive application form with Airtable + Resend integration
- Server-side API routes for form submission
- TypeScript for type safety
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

### Build

```bash
# Create a production build
npm run build

# Start the production server
npm start
```

## Project Structure

```
detailer-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── AnimatedSection.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── SectionHeadline.tsx
│   │   └── SectionLabel.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── StatsBar.tsx
│   ├── ProblemSection.tsx
│   ├── CredibilitySection.tsx
│   ├── OfferSection.tsx
│   ├── GuaranteeSection.tsx
│   ├── ProcessSection.tsx
│   ├── FeaturesSection.tsx
│   ├── PricingSection.tsx
│   ├── QualifierSection.tsx
│   ├── ComparisonTable.tsx
│   ├── ApplicationForm.tsx
│   └── Footer.tsx
└── public/                 # Static assets
```

## Design System

### Colors (Dark Mode)
- Background Primary: `#0a0a0a`
- Background Secondary: `#141414`
- Text Primary: `#ffffff`
- Text Secondary: `#a1a1a1`
- Accent: `#3b82f6` (blue)
- Border: `#262626`

### Typography
- Font: Inter
- Headlines: 48-72px, font-weight 700, line-height 1.1
- Subheads: 24-32px, font-weight 600
- Body: 16-18px, font-weight 400, line-height 1.6
- Labels: 12-14px, uppercase, letter-spacing 0.1em

### Animations
- Subtle fade-in on scroll with 30px upward movement
- 300ms duration with ease-out timing
- Trigger when elements enter viewport

## Customization

### Update Brand Name
The brand name "DetailerStack" appears in:
- [Navbar.tsx](components/Navbar.tsx)
- [Footer.tsx](components/Footer.tsx)
- [layout.tsx](app/layout.tsx) (metadata)

### Update Colors
Colors are defined in:
- [tailwind.config.ts](tailwind.config.ts)
- [globals.css](app/globals.css) (CSS variables)

### Form Submission
The application form submits to `/api/submit-application` which:
1. Stores submissions in Airtable
2. Sends email notifications via Resend

Required environment variables:
- `AIRTABLE_API_KEY` - Airtable personal access token
- `AIRTABLE_BASE_ID` - Airtable base ID
- `AIRTABLE_TABLE_NAME` - Table name (e.g., "Applications")
- `RESEND_API_KEY` - Resend API key
- `RESEND_FROM_EMAIL` - Sender email address
- `NOTIFICATION_EMAIL` - Email to receive notifications

## Deployment

This site must be deployed to a platform that supports Next.js server-side features:
- **Vercel** (recommended)
- Netlify (with Next.js adapter)

**IMPORTANT:** Do NOT add `output: 'export'` to `next.config.ts`. This would disable API routes and break form submission. The site requires server-side functionality for the Airtable/Resend integration.

## License

All rights reserved.
