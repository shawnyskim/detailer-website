# DetailerStack Portal - Technical Architecture

**Version:** 1.0
**Last Updated:** December 23, 2024

---

## 1. System Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTS                                  │
├─────────────────┬─────────────────┬─────────────────────────────┤
│  Admin Portal   │ Detailer Portal │    Customer Portal          │
│  (DetailerStack)│ (Car Detailers) │    (End Users)              │
└────────┬────────┴────────┬────────┴─────────────┬───────────────┘
         │                 │                       │
         └─────────────────┼───────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Next.js   │
                    │   Frontend  │
                    │   + API     │
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐      ┌─────▼─────┐
    │ Database│      │  Stripe │      │   Email   │
    │(Postgres)│     │ Connect │      │  (Resend) │
    └─────────┘      └─────────┘      └───────────┘
```

### 1.2 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 15+ | React framework with SSR |
| Styling | Tailwind CSS | Utility-first CSS |
| Backend | Next.js API Routes | Serverless functions |
| Database | PostgreSQL | Primary data store |
| ORM | Prisma | Database access |
| Auth | NextAuth.js / Clerk | Authentication |
| Payments | Stripe Connect | Payment processing |
| Email | Resend | Transactional email |
| SMS | Twilio | Text notifications |
| Hosting | Vercel | Deployment platform |
| File Storage | AWS S3 / Cloudflare R2 | Photo uploads |

---

## 2. Application Structure

### 2.1 Directory Structure

```
detailer-website/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public marketing pages
│   │   ├── page.tsx              # Landing page
│   │   ├── pricing/
│   │   └── contact/
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── admin/                    # DetailerStack Admin Portal
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard
│   │   ├── clients/
│   │   ├── templates/
│   │   ├── users/
│   │   └── settings/
│   ├── portal/                   # Car Detailer Portal
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard
│   │   ├── calendar/
│   │   ├── appointments/
│   │   ├── customers/
│   │   ├── services/
│   │   ├── staff/
│   │   ├── payments/
│   │   ├── loyalty/
│   │   ├── reviews/
│   │   ├── communications/
│   │   ├── reports/
│   │   └── settings/
│   ├── customer/                 # Customer Portal
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard
│   │   ├── book/
│   │   ├── appointments/
│   │   ├── vehicles/
│   │   ├── loyalty/
│   │   └── profile/
│   └── api/                      # API Routes
│       ├── auth/
│       ├── admin/
│       ├── portal/
│       ├── customer/
│       ├── webhooks/
│       └── public/
├── components/                   # Shared components
│   ├── ui/                       # Base UI components
│   ├── forms/                    # Form components
│   ├── modals/                   # Modal components
│   ├── tables/                   # Table components
│   └── layouts/                  # Layout components
├── lib/                          # Utility functions
│   ├── db.ts                     # Database client
│   ├── auth.ts                   # Auth utilities
│   ├── stripe.ts                 # Stripe utilities
│   ├── email.ts                  # Email utilities
│   └── utils.ts                  # General utilities
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed data
├── public/
│   └── portal.html               # Demo portal (current)
└── types/                        # TypeScript types
    └── index.ts
```

### 2.2 Route Protection

```typescript
// Middleware for route protection
// middleware.ts

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*', '/customer/:path*']
}

// Route access by role:
// /admin/*     → Platform Admin only
// /portal/*    → Detailer Owner, Manager, Staff
// /customer/*  → Authenticated customers
```

---

## 3. Multi-Tenant Architecture

### 3.1 Tenant Isolation

DetailerStack uses a **shared database with tenant isolation** approach:

```
┌─────────────────────────────────────────┐
│            Shared Database              │
├─────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │Tenant A │ │Tenant B │ │Tenant C │   │
│  │ (Elite) │ │(Pristine)││(Mobile) │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│  All tables include `businessId` column │
│  Queries always filter by businessId    │
└─────────────────────────────────────────┘
```

### 3.2 Tenant Context

```typescript
// Every API request includes tenant context
interface TenantContext {
  businessId: string;
  userId: string;
  role: 'owner' | 'manager' | 'staff';
}

// Middleware injects tenant context
async function getTenantContext(req: Request): Promise<TenantContext> {
  const session = await getServerSession(authOptions);
  return {
    businessId: session.user.businessId,
    userId: session.user.id,
    role: session.user.role
  };
}
```

### 3.3 Query Scoping

```typescript
// All database queries must be scoped to tenant
// BAD: Fetches all customers across all tenants
const customers = await prisma.customer.findMany();

// GOOD: Fetches only this tenant's customers
const customers = await prisma.customer.findMany({
  where: { businessId: ctx.businessId }
});
```

---

## 4. Authentication & Authorization

### 4.1 Authentication Flow

```
User Login
    │
    ▼
┌─────────────────┐
│ Enter Credentials│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Verify Password │
│ (bcrypt compare)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create Session  │
│ (JWT or Session)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Redirect to     │
│ Appropriate     │
│ Portal          │
└─────────────────┘
```

### 4.2 Role Hierarchy

```
Platform Admin (DetailerStack)
    │
    ├── Can access all tenants
    ├── Can impersonate any user
    └── Can modify platform settings

Business Owner
    │
    ├── Full access to their business
    ├── Can add/remove staff
    └── Can modify all business settings

Manager
    │
    ├── Access to daily operations
    ├── Cannot modify billing
    └── Cannot remove other managers

Staff
    │
    ├── Limited to assigned functions
    ├── Can view own schedule
    └── Can process bookings

Customer
    │
    ├── Self-service only
    ├── Own bookings and profile
    └── No access to business data
```

### 4.3 Permission Matrix

| Action | Admin | Owner | Manager | Staff | Customer |
|--------|-------|-------|---------|-------|----------|
| View all clients | ✓ | - | - | - | - |
| Jump into client | ✓ | - | - | - | - |
| View dashboard | ✓ | ✓ | ✓ | ✓ | - |
| Create booking | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edit booking | ✓ | ✓ | ✓ | ✓ | Own |
| Process payment | ✓ | ✓ | ✓ | ✓ | - |
| Add customer | ✓ | ✓ | ✓ | ✓ | - |
| Edit customer | ✓ | ✓ | ✓ | - | Own |
| Add staff | ✓ | ✓ | - | - | - |
| Edit settings | ✓ | ✓ | - | - | - |
| View reports | ✓ | ✓ | ✓ | - | - |
| Manage billing | ✓ | ✓ | - | - | - |

---

## 5. Database Design

### 5.1 Core Tables

See [DATA_MODELS.md](./DATA_MODELS.md) for complete schema.

### 5.2 Key Relationships

```
Business (Tenant)
    │
    ├── Users (Staff)
    ├── Customers
    │       └── Vehicles
    │       └── LoyaltyTransactions
    ├── Services
    ├── Appointments
    │       └── AppointmentPhotos
    │       └── Payments
    ├── Transactions
    └── Reviews
```

### 5.3 Indexing Strategy

```sql
-- Primary indexes (auto-created)
-- businessId on all tenant tables
-- Foreign key indexes

-- Performance indexes
CREATE INDEX idx_appointments_business_date ON appointments(business_id, date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_customers_business_email ON customers(business_id, email);
CREATE INDEX idx_transactions_business_date ON transactions(business_id, created_at);
```

---

## 6. API Design

### 6.1 API Structure

```
/api
├── /auth
│   ├── POST /login
│   ├── POST /register
│   ├── POST /logout
│   └── POST /forgot-password
├── /admin                    # Platform admin endpoints
│   ├── GET  /clients
│   ├── POST /clients
│   ├── GET  /clients/:id
│   ├── PUT  /clients/:id
│   └── DELETE /clients/:id
├── /portal                   # Car detailer endpoints
│   ├── /appointments
│   ├── /customers
│   ├── /services
│   ├── /staff
│   ├── /payments
│   ├── /loyalty
│   ├── /reviews
│   └── /settings
├── /customer                 # Customer endpoints
│   ├── /profile
│   ├── /appointments
│   ├── /vehicles
│   └── /loyalty
├── /webhooks
│   ├── POST /stripe
│   └── POST /twilio
└── /public                   # Unauthenticated endpoints
    ├── GET /business/:slug/services
    └── POST /business/:slug/book
```

### 6.2 Response Format

```typescript
// Success response
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email"
  }
}
```

See [API_SPECIFICATIONS.md](./API_SPECIFICATIONS.md) for complete API documentation.

---

## 7. External Integrations

### 7.1 Stripe Connect

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   DetailerStack │     │     Stripe      │     │  Car Detailer   │
│   (Platform)    │     │    Connect      │     │  (Connected)    │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │ Platform Fee (%)      │                       │
         │◄──────────────────────│                       │
         │                       │     Payment           │
         │                       │◄──────────────────────│
         │                       │                       │
         │                       │     Payout            │
         │                       │──────────────────────►│
         │                       │                       │
```

**Integration Points:**
- Customer payments → Stripe Checkout
- Platform subscription → Stripe Billing
- Payouts → Stripe Connect transfers
- Refunds → Stripe Refund API

### 7.2 Email (Resend)

```typescript
// Email types
enum EmailType {
  BOOKING_CONFIRMATION = 'booking_confirmation',
  BOOKING_REMINDER = 'booking_reminder',
  REVIEW_REQUEST = 'review_request',
  PAYMENT_RECEIPT = 'payment_receipt',
  WELCOME = 'welcome',
  PASSWORD_RESET = 'password_reset'
}

// Sending email
await resend.emails.send({
  from: 'Elite Auto Spa <noreply@eliteautospa.detailerstack.com>',
  to: customer.email,
  subject: 'Your appointment is confirmed',
  react: BookingConfirmationEmail({ booking })
});
```

### 7.3 SMS (Twilio)

```typescript
// SMS types
enum SMSType {
  BOOKING_CONFIRMATION = 'booking_confirmation',
  BOOKING_REMINDER = 'booking_reminder',
  REVIEW_REQUEST = 'review_request'
}

// Sending SMS
await twilio.messages.create({
  body: `Your appointment at Elite Auto Spa is confirmed for tomorrow at 9:00 AM.`,
  from: '+1234567890',
  to: customer.phone
});
```

---

## 8. File Storage

### 8.1 Photo Upload Flow

```
User uploads photo
        │
        ▼
┌─────────────────┐
│ Client-side     │
│ resize/compress │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Upload to S3    │
│ (presigned URL) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Save URL to DB  │
└─────────────────┘
```

### 8.2 File Organization

```
s3://detailerstack-uploads/
├── businesses/
│   └── {businessId}/
│       ├── logo.png
│       └── photos/
│           └── appointments/
│               └── {appointmentId}/
│                   ├── before-1.jpg
│                   └── after-1.jpg
└── templates/
    └── {templateId}/
        └── preview.png
```

---

## 9. Caching Strategy

### 9.1 Cache Layers

```
Request
   │
   ▼
┌─────────────────┐
│ Browser Cache   │  (Static assets, 1 year)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ CDN Cache       │  (API responses, 5 min)
│ (Vercel Edge)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Application     │  (In-memory, session)
│ Cache           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Database        │
└─────────────────┘
```

### 9.2 Cache Invalidation

```typescript
// Invalidate on write operations
async function updateAppointment(id: string, data: UpdateData) {
  await prisma.appointment.update({ where: { id }, data });

  // Invalidate related caches
  await revalidatePath('/portal/appointments');
  await revalidatePath('/portal/calendar');
  await revalidatePath(`/portal/customers/${data.customerId}`);
}
```

---

## 10. Security Considerations

### 10.1 Security Measures

| Threat | Mitigation |
|--------|------------|
| SQL Injection | Prisma ORM with parameterized queries |
| XSS | React auto-escaping, CSP headers |
| CSRF | SameSite cookies, CSRF tokens |
| Data Exposure | Tenant isolation, field-level access |
| Brute Force | Rate limiting, account lockout |
| Session Hijacking | Secure cookies, session rotation |

### 10.2 Data Encryption

```typescript
// Sensitive fields encryption
const encryptedData = {
  stripeCustomerId: encrypt(customer.stripeId),
  // Other PII as needed
};

// Environment variables
// Never commit to git
STRIPE_SECRET_KEY=sk_...
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=...
```

### 10.3 Audit Logging

```typescript
// Log sensitive operations
await prisma.auditLog.create({
  data: {
    businessId: ctx.businessId,
    userId: ctx.userId,
    action: 'PAYMENT_PROCESSED',
    resourceType: 'payment',
    resourceId: payment.id,
    details: { amount: payment.amount },
    ipAddress: req.ip,
    userAgent: req.headers['user-agent']
  }
});
```

---

## 11. Deployment Architecture

### 11.1 Vercel Deployment

```
┌─────────────────────────────────────────┐
│              Vercel                      │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │     Edge Network (CDN)          │    │
│  └─────────────────────────────────┘    │
│                   │                      │
│  ┌─────────────────────────────────┐    │
│  │     Serverless Functions        │    │
│  │     (Next.js API Routes)        │    │
│  └─────────────────────────────────┘    │
│                   │                      │
└───────────────────┼─────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼───┐     ┌─────▼─────┐   ┌─────▼─────┐
│Postgres│    │   Stripe   │   │   S3/R2   │
│(Supabase)│  │   Connect  │   │  Storage  │
└─────────┘   └───────────┘   └───────────┘
```

### 11.2 Environment Configuration

```bash
# .env.local (development)
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
TWILIO_ACCOUNT_SID="..."
TWILIO_AUTH_TOKEN="..."
S3_BUCKET="..."
S3_REGION="..."
```

---

## 12. Monitoring & Observability

### 12.1 Monitoring Stack

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Page performance, Web Vitals |
| Sentry | Error tracking, exceptions |
| LogTail/Axiom | Log aggregation |
| Stripe Dashboard | Payment monitoring |

### 12.2 Key Metrics

```typescript
// Business metrics to track
const metrics = {
  // Platform health
  'api.latency': 'API response time',
  'api.errors': 'API error rate',
  'db.connections': 'Database connection pool',

  // Business metrics
  'bookings.created': 'New bookings per hour',
  'payments.processed': 'Payments processed',
  'users.active': 'Active users (DAU/MAU)'
};
```

---

## 13. Development Workflow

### 13.1 Git Workflow

```
main (production)
  │
  ├── develop (staging)
  │     │
  │     ├── feature/calendar-enhancements
  │     ├── feature/payment-modal
  │     └── fix/booking-validation
  │
  └── hotfix/critical-bug
```

### 13.2 CI/CD Pipeline

```yaml
# GitHub Actions
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    - Lint code
    - Type check
    - Run unit tests
    - Run integration tests

  deploy:
    - Deploy to Vercel
    - Run migrations
    - Notify team
```

---

## 14. Scaling Considerations

### 14.1 Database Scaling

- **Read replicas** for reporting queries
- **Connection pooling** via PgBouncer
- **Query optimization** with proper indexes
- **Archiving** old data to cold storage

### 14.2 Application Scaling

- Vercel handles automatic scaling of serverless functions
- Edge functions for geographically distributed users
- Redis for session storage at scale

### 14.3 Growth Projections

| Metric | 100 Clients | 1000 Clients | 10000 Clients |
|--------|-------------|--------------|---------------|
| Monthly Bookings | 50,000 | 500,000 | 5,000,000 |
| Database Size | 5GB | 50GB | 500GB |
| API Requests/day | 500K | 5M | 50M |
| Storage | 50GB | 500GB | 5TB |
