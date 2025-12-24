# DetailerStack Portal - Implementation Guide

**Version:** 1.0
**Last Updated:** December 23, 2024

---

## 1. Quick Start

### 1.1 Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn
- Git
- Stripe account (for payments)
- Resend account (for emails)

### 1.2 Initial Setup

```bash
# Clone the repository
git clone https://github.com/shawnyskim/detailer-website.git
cd detailer-website

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
# See Section 2 for required variables

# Set up database
npx prisma migrate dev

# Seed demo data (optional)
npx prisma db seed

# Start development server
npm run dev
```

### 1.3 View Demo Portal

The current demo portal is available at:
- **Development:** http://localhost:3000/portal/
- **Production:** https://detailerstack.vercel.app/portal/

---

## 2. Environment Configuration

### 2.1 Required Variables

```bash
# .env.local

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/detailerstack"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@detailerstack.com"

# Optional: SMS (Twilio)
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1234567890"

# Optional: File Storage (S3/R2)
S3_BUCKET="detailerstack-uploads"
S3_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
```

### 2.2 Production vs Development

| Variable | Development | Production |
|----------|-------------|------------|
| `DATABASE_URL` | Local Postgres | Supabase/Railway |
| `STRIPE_SECRET_KEY` | `sk_test_...` | `sk_live_...` |
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://detailerstack.com` |

---

## 3. Project Structure

### 3.1 Converting Demo to Production

The current demo (`public/portal.html`) is a single HTML file. To convert to a production Next.js app:

```
Current Demo Structure:
public/
└── portal.html          ← Single file demo (8,000+ lines)

Target Production Structure:
app/
├── (auth)/
│   └── login/page.tsx
├── admin/
│   ├── layout.tsx       ← Admin sidebar layout
│   ├── page.tsx         ← Dashboard
│   └── clients/
│       └── page.tsx
├── portal/
│   ├── layout.tsx       ← Detailer sidebar layout
│   ├── page.tsx         ← Dashboard
│   ├── appointments/
│   │   └── page.tsx
│   ├── customers/
│   │   └── page.tsx
│   └── [other sections]
└── customer/
    └── [customer portal pages]

components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Table.tsx
│   └── Toast.tsx
├── forms/
│   ├── AppointmentForm.tsx
│   ├── CustomerForm.tsx
│   └── ServiceForm.tsx
├── modals/
│   ├── EditAppointmentModal.tsx
│   ├── PaymentModal.tsx
│   └── ConfirmModal.tsx
└── layouts/
    ├── AdminLayout.tsx
    ├── PortalLayout.tsx
    └── CustomerLayout.tsx
```

### 3.2 Extracting from Demo

The demo contains working UI for reference. Extract styles and markup:

```typescript
// Example: Extracting the stats grid from demo

// From portal.html (lines ~2600-2650)
// <div class="stats-grid">
//   <div class="stat-card">...</div>
// </div>

// Convert to React component:
// components/ui/StatsGrid.tsx

interface Stat {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative';
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ label, value, change, changeType }: Stat) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {change && (
        <div className={`text-sm mt-1 ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </div>
      )}
    </div>
  );
}
```

---

## 4. Database Setup

### 4.1 Initial Migration

```bash
# Generate Prisma client
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init

# View database in browser
npx prisma studio
```

### 4.2 Seed Data

```typescript
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create demo business
  const business = await prisma.business.create({
    data: {
      name: 'Elite Auto Spa',
      slug: 'elite-auto-spa',
      email: 'demo@eliteautospa.com',
      phone: '(555) 123-4567',
      subscriptionStatus: 'ACTIVE',
    },
  });

  // Create owner user
  const hashedPassword = await hash('demo123', 10);
  await prisma.user.create({
    data: {
      businessId: business.id,
      name: 'Mike Johnson',
      email: 'mike@eliteautospa.com',
      password: hashedPassword,
      role: 'OWNER',
    },
  });

  // Create services
  await prisma.service.createMany({
    data: [
      {
        businessId: business.id,
        name: 'Express Wash',
        price: 35,
        duration: 30,
        category: 'Wash',
      },
      {
        businessId: business.id,
        name: 'Full Detail',
        price: 199,
        duration: 180,
        category: 'Detail',
      },
      // Add more...
    ],
  });

  console.log('Seed complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run with:
```bash
npx prisma db seed
```

---

## 5. Authentication Implementation

### 5.1 NextAuth Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { prisma } from '@/lib/db';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // Try platform user first
        const platformUser = await prisma.platformUser.findUnique({
          where: { email: credentials.email },
        });

        if (platformUser) {
          const valid = await compare(credentials.password, platformUser.password);
          if (!valid) throw new Error('Invalid password');

          return {
            id: platformUser.id,
            email: platformUser.email,
            name: platformUser.name,
            role: platformUser.role,
            type: 'platform',
          };
        }

        // Try business user
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
          include: { business: true },
        });

        if (!user) throw new Error('User not found');

        const valid = await compare(credentials.password, user.password);
        if (!valid) throw new Error('Invalid password');

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          type: 'business',
          businessId: user.businessId,
          businessName: user.business.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.type = user.type;
        token.businessId = user.businessId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.type = token.type;
      session.user.businessId = token.businessId;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
```

### 5.2 Protected Routes

```typescript
// middleware.ts

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Platform admin routes
    if (pathname.startsWith('/admin')) {
      if (token?.type !== 'platform') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Business portal routes
    if (pathname.startsWith('/portal')) {
      if (token?.type !== 'business') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*', '/customer/:path*'],
};
```

---

## 6. API Implementation

### 6.1 API Route Structure

```typescript
// app/api/portal/customers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.businessId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    const where = {
      businessId: session.user.businessId,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: { vehicles: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      prisma.customer.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: customers,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.businessId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Name and email required' } },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existing = await prisma.customer.findFirst({
      where: {
        businessId: session.user.businessId,
        email: body.email,
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'CONFLICT', message: 'Email already exists' } },
        { status: 409 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        businessId: session.user.businessId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        notes: body.notes,
        tags: body.tags || [],
        vehicles: body.vehicles?.length ? {
          create: body.vehicles,
        } : undefined,
      },
      include: { vehicles: true },
    });

    return NextResponse.json({ success: true, data: customer }, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
```

### 6.2 Reusable API Utilities

```typescript
// lib/api.ts

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from './auth';

export async function withAuth(
  handler: (session: Session, req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.businessId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED' } },
        { status: 401 }
      );
    }
    return handler(session, req);
  };
}

export function apiError(code: string, message: string, status = 400) {
  return NextResponse.json(
    { success: false, error: { code, message } },
    { status }
  );
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}
```

---

## 7. Stripe Integration

### 7.1 Stripe Connect Setup

```typescript
// lib/stripe.ts

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Create connected account for new business
export async function createConnectedAccount(businessId: string, email: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    email,
    metadata: { businessId },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  // Create onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.NEXTAUTH_URL}/portal/settings/stripe?refresh=true`,
    return_url: `${process.env.NEXTAUTH_URL}/portal/settings/stripe?success=true`,
    type: 'account_onboarding',
  });

  return { accountId: account.id, onboardingUrl: accountLink.url };
}

// Create payment intent for customer payment
export async function createPaymentIntent(
  amount: number,
  connectedAccountId: string,
  metadata: Record<string, string>
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    application_fee_amount: Math.round(amount * 0.029 * 100), // 2.9% platform fee
    transfer_data: {
      destination: connectedAccountId,
    },
    metadata,
  });

  return paymentIntent;
}
```

### 7.2 Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object as Stripe.Subscription);
      break;
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const { appointmentId } = paymentIntent.metadata;
  if (!appointmentId) return;

  await prisma.payment.update({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: {
      status: 'COMPLETED',
      processedAt: new Date(),
    },
  });

  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: 'COMPLETED', completedAt: new Date() },
  });
}
```

---

## 8. Email Implementation

### 8.1 Resend Setup

```typescript
// lib/email.ts

import { Resend } from 'resend';
import { BookingConfirmation } from '@/emails/BookingConfirmation';
import { ReviewRequest } from '@/emails/ReviewRequest';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  template: 'booking_confirmation' | 'review_request' | 'payment_receipt';
  data: Record<string, any>;
  from?: string;
}

export async function sendEmail({ to, subject, template, data, from }: SendEmailParams) {
  const templates = {
    booking_confirmation: BookingConfirmation,
    review_request: ReviewRequest,
    payment_receipt: PaymentReceipt,
  };

  const Template = templates[template];

  try {
    const result = await resend.emails.send({
      from: from || process.env.FROM_EMAIL!,
      to,
      subject,
      react: Template(data),
    });

    return { success: true, id: result.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}
```

### 8.2 React Email Template

```typescript
// emails/ReviewRequest.tsx

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ReviewRequestProps {
  customerName: string;
  businessName: string;
  serviceName: string;
  googleReviewUrl: string;
  yelpReviewUrl: string;
  incentive?: {
    type: 'points' | 'discount';
    value: number;
  };
}

export function ReviewRequest({
  customerName,
  businessName,
  serviceName,
  googleReviewUrl,
  yelpReviewUrl,
  incentive,
}: ReviewRequestProps) {
  return (
    <Html>
      <Head />
      <Preview>How was your {serviceName}?</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank you for visiting {businessName}!</Heading>

          <Text style={text}>
            Hi {customerName},
          </Text>

          <Text style={text}>
            We hope you loved your {serviceName}. Would you mind taking a moment to leave us a review?
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={googleReviewUrl}>
              Review on Google
            </Button>
          </Section>

          <Section style={buttonContainer}>
            <Button style={buttonSecondary} href={yelpReviewUrl}>
              Review on Yelp
            </Button>
          </Section>

          {incentive && (
            <Text style={incentiveText}>
              As a thank you, you'll receive{' '}
              {incentive.type === 'points'
                ? `${incentive.value} bonus loyalty points`
                : `${incentive.value}% off your next service`}
              !
            </Text>
          )}

          <Text style={footer}>
            Thank you for your support!<br />
            The {businessName} Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: '#f6f9fc', padding: '40px 0' };
const container = { backgroundColor: '#ffffff', padding: '40px', borderRadius: '8px' };
const h1 = { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' };
const text = { fontSize: '16px', lineHeight: '24px', color: '#374151' };
const buttonContainer = { textAlign: 'center' as const, margin: '20px 0' };
const button = { backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 24px', borderRadius: '6px' };
const buttonSecondary = { backgroundColor: '#6b7280', color: '#ffffff', padding: '12px 24px', borderRadius: '6px' };
const incentiveText = { ...text, backgroundColor: '#fef3c7', padding: '16px', borderRadius: '6px' };
const footer = { ...text, color: '#6b7280', marginTop: '40px' };
```

---

## 9. Frontend Components

### 9.1 Data Fetching with SWR

```typescript
// hooks/useCustomers.ts

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCustomers(page = 1, search = '') {
  const params = new URLSearchParams({ page: String(page), search });
  const { data, error, mutate } = useSWR(
    `/api/portal/customers?${params}`,
    fetcher
  );

  return {
    customers: data?.data || [],
    meta: data?.meta,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
```

### 9.2 Modal Component

```typescript
// components/ui/Modal.tsx

'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
        {footer && (
          <div className="p-6 border-t flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 9.3 Toast Notifications

```typescript
// components/ui/Toast.tsx

'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

const ToastContext = createContext<{
  showToast: (message: string, type?: ToastType) => void;
}>({ showToast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: 'bg-green-800',
    error: 'bg-red-800',
    info: 'bg-gray-800',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${colors[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in`}
          >
            {icons[toast.type]}
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => setToasts((p) => p.filter((t) => t.id !== toast.id))}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
```

---

## 10. Deployment

### 10.1 Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### 10.2 Environment Variables in Vercel

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Set appropriate values for Production/Preview/Development

### 10.3 Database Migration in Production

```bash
# Run migrations
npx prisma migrate deploy

# Or via Vercel build command
# In vercel.json:
{
  "buildCommand": "prisma migrate deploy && next build"
}
```

### 10.4 Stripe Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events to listen for
4. Copy webhook secret to environment variables

---

## 11. Testing

### 11.1 Unit Tests

```typescript
// __tests__/api/customers.test.ts

import { createMocks } from 'node-mocks-http';
import { GET, POST } from '@/app/api/portal/customers/route';

describe('/api/portal/customers', () => {
  it('returns 401 when not authenticated', async () => {
    const { req } = createMocks({ method: 'GET' });
    const response = await GET(req as any);
    expect(response.status).toBe(401);
  });

  it('returns customers for authenticated user', async () => {
    // Mock session
    jest.spyOn(require('next-auth'), 'getServerSession').mockResolvedValue({
      user: { businessId: 'test-business' },
    });

    const { req } = createMocks({ method: 'GET' });
    const response = await GET(req as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });
});
```

### 11.2 E2E Tests with Playwright

```typescript
// e2e/booking.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('customer can book an appointment', async ({ page }) => {
    await page.goto('/customer');

    // Select service
    await page.click('text=Full Detail');
    await page.click('button:has-text("Book Now")');

    // Select date
    await page.click('text=December 25');

    // Select time
    await page.click('text=10:00 AM');

    // Fill form
    await page.fill('textarea[name="notes"]', 'Please use unscented products');

    // Confirm
    await page.click('button:has-text("Confirm Booking")');

    // Verify success
    await expect(page.locator('text=Booking Confirmed')).toBeVisible();
  });
});
```

---

## 12. Monitoring & Debugging

### 12.1 Error Tracking with Sentry

```typescript
// sentry.client.config.ts

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

### 12.2 Logging

```typescript
// lib/logger.ts

export function log(level: 'info' | 'warn' | 'error', message: string, meta?: Record<string, any>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };

  if (process.env.NODE_ENV === 'production') {
    // Send to logging service (e.g., LogTail, Axiom)
    fetch(process.env.LOG_ENDPOINT!, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  } else {
    console[level](entry);
  }
}
```

---

## 13. Common Issues & Solutions

### 13.1 Database Connection Issues

```
Error: Can't reach database server at `localhost:5432`
```

**Solution:** Ensure PostgreSQL is running and connection string is correct.

### 13.2 Prisma Migration Conflicts

```
Error: Migration failed to apply
```

**Solution:**
```bash
npx prisma migrate reset  # Development only!
npx prisma migrate dev
```

### 13.3 Stripe Webhook Signature Failure

```
Error: No signatures found matching the expected signature
```

**Solution:** Ensure you're using the correct webhook secret for the environment.

### 13.4 Session Not Persisting

**Solution:** Check `NEXTAUTH_SECRET` is set and consistent across deployments.

---

## 14. Performance Optimization

### 14.1 Database Queries

```typescript
// Use select to limit fields
const customers = await prisma.customer.findMany({
  where: { businessId },
  select: {
    id: true,
    name: true,
    email: true,
    // Only fields needed
  },
});

// Use pagination
const customers = await prisma.customer.findMany({
  where: { businessId },
  skip: (page - 1) * limit,
  take: limit,
});
```

### 14.2 Caching

```typescript
// Use Next.js caching
export const revalidate = 60; // Revalidate every 60 seconds

// Or manual cache
import { unstable_cache } from 'next/cache';

const getCachedServices = unstable_cache(
  async (businessId: string) => {
    return prisma.service.findMany({ where: { businessId } });
  },
  ['services'],
  { revalidate: 300 }
);
```

---

## 15. Checklist for Production

- [ ] All environment variables set in production
- [ ] Database migrations applied
- [ ] Stripe webhooks configured
- [ ] Error tracking (Sentry) configured
- [ ] SSL certificate valid
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] Backup strategy in place
- [ ] Monitoring dashboards set up
- [ ] Load testing completed
- [ ] Security audit completed
