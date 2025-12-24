# DetailerStack Portal - Data Models

**Version:** 1.0
**Last Updated:** December 23, 2024

---

## 1. Overview

This document defines all data models (database schema) for the DetailerStack platform. The schema is designed for PostgreSQL using Prisma ORM.

---

## 2. Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Business  │───────│    User     │       │  Customer   │
│  (Tenant)   │       │   (Staff)   │       │             │
└──────┬──────┘       └─────────────┘       └──────┬──────┘
       │                                           │
       │    ┌─────────────┐                       │
       ├────│   Service   │                       │
       │    └─────────────┘                       │
       │                                          │
       │    ┌─────────────┐    ┌─────────────┐   │
       ├────│ Appointment │────│  Vehicle    │───┤
       │    └──────┬──────┘    └─────────────┘   │
       │           │                              │
       │    ┌──────┴──────┐                      │
       │    │   Payment   │                      │
       │    └─────────────┘                      │
       │                                          │
       │    ┌─────────────┐    ┌─────────────┐   │
       ├────│   Reward    │────│ Redemption  │───┤
       │    └─────────────┘    └─────────────┘   │
       │                                          │
       │    ┌─────────────┐                      │
       └────│   Review    │──────────────────────┘
            └─────────────┘
```

---

## 3. Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// PLATFORM LEVEL (DetailerStack Admin)
// ============================================

model PlatformUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      PlatformRole @default(SUPPORT)
  status    UserStatus @default(ACTIVE)
  lastLogin DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("platform_users")
}

enum PlatformRole {
  SUPER_ADMIN
  ADMIN
  SUPPORT
}

model WebsiteTemplate {
  id          String   @id @default(cuid())
  name        String
  description String?
  version     String
  previewUrl  String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  businesses  Business[]

  @@map("website_templates")
}

// ============================================
// BUSINESS (Tenant)
// ============================================

model Business {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  email           String
  phone           String?
  address         String?
  city            String?
  state           String?
  zip             String?
  timezone        String   @default("America/Los_Angeles")
  logoUrl         String?
  websiteUrl      String?

  // Subscription & Billing
  stripeCustomerId    String?
  stripeSubscriptionId String?
  subscriptionStatus  SubscriptionStatus @default(TRIAL)
  trialEndsAt         DateTime?

  // Settings
  templateId      String?
  template        WebsiteTemplate? @relation(fields: [templateId], references: [id])

  // Working Hours (JSON)
  workingHours    Json?

  // Policies
  cancellationPolicy  CancellationPolicy @default(HOURS_24)
  depositRequired     Boolean @default(false)
  depositPercent      Int     @default(0)

  // Review Settings
  googleBusinessUrl   String?
  yelpBusinessUrl     String?
  reviewRequestDelay  Int     @default(24) // hours
  reviewIncentiveEnabled Boolean @default(false)
  reviewIncentiveType ReviewIncentiveType @default(POINTS)
  reviewIncentiveValue Int    @default(50)

  // Loyalty Settings
  pointsPerDollar     Int     @default(1)

  status          BusinessStatus @default(ACTIVE)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  users           User[]
  customers       Customer[]
  services        Service[]
  appointments    Appointment[]
  transactions    Transaction[]
  reviews         Review[]
  rewards         Reward[]
  redemptions     Redemption[]
  emailTemplates  EmailTemplate[]
  auditLogs       AuditLog[]

  @@map("businesses")
}

enum SubscriptionStatus {
  TRIAL
  ACTIVE
  PAST_DUE
  CANCELLED
  SUSPENDED
}

enum BusinessStatus {
  PENDING
  ACTIVE
  SUSPENDED
  CANCELLED
}

enum CancellationPolicy {
  HOURS_24
  HOURS_48
  HOURS_72
  NO_REFUND
}

enum ReviewIncentiveType {
  POINTS
  DISCOUNT
}

// ============================================
// USERS (Business Staff)
// ============================================

model User {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  email         String
  password      String
  name          String
  phone         String?
  avatarUrl     String?

  role          UserRole  @default(STAFF)
  status        UserStatus @default(ACTIVE)

  // Services this user can perform
  services      Service[] @relation("UserServices")

  // Availability (JSON)
  availability  Json?

  lastLogin     DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  appointments  Appointment[]

  @@unique([businessId, email])
  @@map("users")
}

enum UserRole {
  OWNER
  MANAGER
  STAFF
}

enum UserStatus {
  ACTIVE
  INACTIVE
  PENDING
}

// ============================================
// CUSTOMERS
// ============================================

model Customer {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  email         String
  password      String?   // Optional for customer portal access
  name          String
  phone         String?

  // Loyalty
  points        Int       @default(0)
  totalSpent    Decimal   @default(0) @db.Decimal(10, 2)
  visitCount    Int       @default(0)

  // Metadata
  notes         String?   @db.Text
  tags          String[]

  // Stripe
  stripeCustomerId String?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  vehicles      Vehicle[]
  appointments  Appointment[]
  transactions  Transaction[]
  reviews       Review[]
  redemptions   Redemption[]
  pointsHistory PointsTransaction[]

  @@unique([businessId, email])
  @@index([businessId, name])
  @@map("customers")
}

model Vehicle {
  id          String    @id @default(cuid())
  customerId  String
  customer    Customer  @relation(fields: [customerId], references: [id], onDelete: Cascade)

  make        String
  model       String
  year        Int
  color       String?
  licensePlate String?

  isDefault   Boolean   @default(false)

  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  // Relations
  appointments Appointment[]

  @@map("vehicles")
}

// ============================================
// SERVICES
// ============================================

model Service {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  name          String
  description   String?   @db.Text

  // Pricing
  price         Decimal   @db.Decimal(10, 2)
  priceType     PriceType @default(FIXED)
  minPrice      Decimal?  @db.Decimal(10, 2)
  maxPrice      Decimal?  @db.Decimal(10, 2)

  // Duration in minutes
  duration      Int

  category      String?

  // Display
  displayOrder  Int       @default(0)
  isActive      Boolean   @default(true)

  // Points
  bonusPoints   Int       @default(0)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  users         User[]    @relation("UserServices")
  appointments  Appointment[]
  lineItems     AppointmentLineItem[]

  @@index([businessId, isActive])
  @@map("services")
}

enum PriceType {
  FIXED
  STARTING_AT
  RANGE
  CUSTOM
}

// ============================================
// APPOINTMENTS
// ============================================

model Appointment {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id])

  vehicleId     String?
  vehicle       Vehicle?  @relation(fields: [vehicleId], references: [id])

  // Primary service (backwards compatibility)
  serviceId     String?
  service       Service?  @relation(fields: [serviceId], references: [id])

  // Assigned staff
  userId        String?
  user          User?     @relation(fields: [userId], references: [id])

  // Scheduling
  date          DateTime  @db.Date
  startTime     DateTime
  endTime       DateTime

  // Status
  status        AppointmentStatus @default(PENDING)

  // Location
  locationType  LocationType @default(SHOP)
  address       String?

  // Notes
  notes         String?   @db.Text
  internalNotes String?   @db.Text

  // Financials
  subtotal      Decimal   @db.Decimal(10, 2)
  discount      Decimal   @default(0) @db.Decimal(10, 2)
  tip           Decimal   @default(0) @db.Decimal(10, 2)
  total         Decimal   @db.Decimal(10, 2)
  depositPaid   Decimal   @default(0) @db.Decimal(10, 2)

  // Tracking
  confirmedAt   DateTime?
  checkedInAt   DateTime?
  startedAt     DateTime?
  completedAt   DateTime?
  cancelledAt   DateTime?
  cancellationReason String?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  lineItems     AppointmentLineItem[]
  photos        AppointmentPhoto[]
  payments      Payment[]

  @@index([businessId, date])
  @@index([businessId, status])
  @@index([customerId])
  @@map("appointments")
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  CHECKED_IN
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum LocationType {
  SHOP
  MOBILE
}

model AppointmentLineItem {
  id            String    @id @default(cuid())
  appointmentId String
  appointment   Appointment @relation(fields: [appointmentId], references: [id], onDelete: Cascade)

  serviceId     String
  service       Service   @relation(fields: [serviceId], references: [id])

  name          String
  price         Decimal   @db.Decimal(10, 2)
  quantity      Int       @default(1)

  createdAt     DateTime  @default(now())

  @@map("appointment_line_items")
}

model AppointmentPhoto {
  id            String    @id @default(cuid())
  appointmentId String
  appointment   Appointment @relation(fields: [appointmentId], references: [id], onDelete: Cascade)

  type          PhotoType
  url           String
  caption       String?

  createdAt     DateTime  @default(now())

  @@map("appointment_photos")
}

enum PhotoType {
  BEFORE
  AFTER
}

// ============================================
// PAYMENTS & TRANSACTIONS
// ============================================

model Payment {
  id            String    @id @default(cuid())
  appointmentId String
  appointment   Appointment @relation(fields: [appointmentId], references: [id])

  amount        Decimal   @db.Decimal(10, 2)
  tip           Decimal   @default(0) @db.Decimal(10, 2)
  total         Decimal   @db.Decimal(10, 2)

  method        PaymentMethod
  status        PaymentStatus @default(PENDING)

  // Stripe
  stripePaymentIntentId String?
  stripeChargeId        String?

  processedAt   DateTime?
  refundedAt    DateTime?
  refundAmount  Decimal?  @db.Decimal(10, 2)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("payments")
}

enum PaymentMethod {
  CARD
  CASH
  APPLE_PAY
  GOOGLE_PAY
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  PARTIAL_REFUND
}

model Transaction {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  customerId    String?
  customer      Customer? @relation(fields: [customerId], references: [id])

  type          TransactionType
  amount        Decimal   @db.Decimal(10, 2)
  description   String

  // Reference to source
  referenceType String?
  referenceId   String?

  createdAt     DateTime  @default(now())

  @@index([businessId, createdAt])
  @@map("transactions")
}

enum TransactionType {
  PAYMENT
  REFUND
  TIP
  DEPOSIT
  ADJUSTMENT
}

// ============================================
// LOYALTY & REWARDS
// ============================================

model Reward {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  name          String
  description   String?

  pointsCost    Int
  discountType  DiscountType
  discountValue Decimal   @db.Decimal(10, 2)

  isActive      Boolean   @default(true)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  redemptions   Redemption[]

  @@map("rewards")
}

enum DiscountType {
  PERCENT
  FIXED
}

model Redemption {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id])

  rewardId      String
  reward        Reward    @relation(fields: [rewardId], references: [id])

  pointsSpent   Int
  couponCode    String    @unique

  status        RedemptionStatus @default(ACTIVE)

  redeemedAt    DateTime  @default(now())
  usedAt        DateTime?
  expiresAt     DateTime?

  @@index([businessId, status])
  @@index([couponCode])
  @@map("redemptions")
}

enum RedemptionStatus {
  ACTIVE
  USED
  EXPIRED
}

model PointsTransaction {
  id            String    @id @default(cuid())
  customerId    String
  customer      Customer  @relation(fields: [customerId], references: [id], onDelete: Cascade)

  type          PointsTransactionType
  amount        Int
  balance       Int       // Balance after this transaction

  description   String
  referenceType String?
  referenceId   String?

  createdAt     DateTime  @default(now())

  @@index([customerId, createdAt])
  @@map("points_transactions")
}

enum PointsTransactionType {
  EARN
  REDEEM
  ADJUST
  EXPIRE
  BONUS
}

// ============================================
// REVIEWS
// ============================================

model Review {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  customerId    String?
  customer      Customer? @relation(fields: [customerId], references: [id])

  platform      ReviewPlatform
  rating        Int
  text          String?   @db.Text
  authorName    String?

  // Review Request Tracking
  requestSentAt DateTime?
  respondedAt   DateTime?

  externalId    String?   // ID from Google/Yelp if available
  externalUrl   String?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@map("reviews")
}

enum ReviewPlatform {
  GOOGLE
  YELP
  FACEBOOK
  INTERNAL
}

// ============================================
// COMMUNICATIONS
// ============================================

model EmailTemplate {
  id            String    @id @default(cuid())
  businessId    String
  business      Business  @relation(fields: [businessId], references: [id], onDelete: Cascade)

  type          EmailTemplateType
  subject       String
  body          String    @db.Text

  isActive      Boolean   @default(true)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@unique([businessId, type])
  @@map("email_templates")
}

enum EmailTemplateType {
  BOOKING_CONFIRMATION
  BOOKING_REMINDER
  REVIEW_REQUEST
  PAYMENT_RECEIPT
  WELCOME
}

model MessageLog {
  id            String    @id @default(cuid())
  businessId    String

  customerId    String?
  recipientEmail String?
  recipientPhone String?

  type          MessageType
  channel       MessageChannel
  subject       String?
  body          String    @db.Text

  status        MessageStatus
  sentAt        DateTime?
  deliveredAt   DateTime?
  failedAt      DateTime?
  failureReason String?

  createdAt     DateTime  @default(now())

  @@index([businessId, createdAt])
  @@map("message_logs")
}

enum MessageType {
  BOOKING_CONFIRMATION
  BOOKING_REMINDER
  REVIEW_REQUEST
  MARKETING
  CUSTOM
}

enum MessageChannel {
  EMAIL
  SMS
}

enum MessageStatus {
  PENDING
  SENT
  DELIVERED
  FAILED
}

// ============================================
// AUDIT & LOGGING
// ============================================

model AuditLog {
  id            String    @id @default(cuid())
  businessId    String?
  business      Business? @relation(fields: [businessId], references: [id], onDelete: SetNull)

  userId        String?
  userEmail     String?

  action        String
  resourceType  String
  resourceId    String?

  details       Json?

  ipAddress     String?
  userAgent     String?

  createdAt     DateTime  @default(now())

  @@index([businessId, createdAt])
  @@index([resourceType, resourceId])
  @@map("audit_logs")
}
```

---

## 4. Data Dictionary

### 4.1 Business

| Field | Type | Description |
|-------|------|-------------|
| id | String | Primary key (CUID) |
| name | String | Business display name |
| slug | String | URL-friendly identifier |
| email | String | Primary contact email |
| phone | String | Contact phone number |
| address | String | Street address |
| city | String | City |
| state | String | State/Province |
| zip | String | Postal code |
| timezone | String | IANA timezone identifier |
| logoUrl | String | URL to business logo |
| stripeCustomerId | String | Stripe customer ID for billing |
| stripeSubscriptionId | String | Stripe subscription ID |
| subscriptionStatus | Enum | TRIAL, ACTIVE, PAST_DUE, CANCELLED, SUSPENDED |
| templateId | String | FK to website template |
| workingHours | JSON | Weekly schedule |
| cancellationPolicy | Enum | HOURS_24, HOURS_48, HOURS_72, NO_REFUND |
| depositRequired | Boolean | Whether deposits are required |
| depositPercent | Int | Deposit percentage (0-100) |
| googleBusinessUrl | String | Google Business review URL |
| yelpBusinessUrl | String | Yelp review URL |
| reviewRequestDelay | Int | Hours to wait before sending review request |
| reviewIncentiveEnabled | Boolean | Whether to offer incentive for reviews |
| reviewIncentiveType | Enum | POINTS or DISCOUNT |
| reviewIncentiveValue | Int | Points amount or discount percentage |
| pointsPerDollar | Int | Loyalty points earned per dollar spent |
| status | Enum | PENDING, ACTIVE, SUSPENDED, CANCELLED |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Last update timestamp |

### 4.2 Customer

| Field | Type | Description |
|-------|------|-------------|
| id | String | Primary key (CUID) |
| businessId | String | FK to business (tenant) |
| email | String | Customer email |
| password | String | Hashed password (optional) |
| name | String | Full name |
| phone | String | Phone number |
| points | Int | Current loyalty points balance |
| totalSpent | Decimal | Lifetime spending |
| visitCount | Int | Number of completed appointments |
| notes | String | Internal notes about customer |
| tags | String[] | Array of tags/labels |
| stripeCustomerId | String | Stripe customer ID |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Last update timestamp |

### 4.3 Appointment

| Field | Type | Description |
|-------|------|-------------|
| id | String | Primary key (CUID) |
| businessId | String | FK to business (tenant) |
| customerId | String | FK to customer |
| vehicleId | String | FK to vehicle |
| serviceId | String | FK to primary service |
| userId | String | FK to assigned staff member |
| date | Date | Appointment date |
| startTime | DateTime | Start time |
| endTime | DateTime | End time |
| status | Enum | PENDING, CONFIRMED, CHECKED_IN, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW |
| locationType | Enum | SHOP or MOBILE |
| address | String | Address for mobile service |
| notes | String | Customer-facing notes |
| internalNotes | String | Staff-only notes |
| subtotal | Decimal | Pre-discount total |
| discount | Decimal | Discount amount |
| tip | Decimal | Tip amount |
| total | Decimal | Final total |
| depositPaid | Decimal | Deposit amount collected |
| confirmedAt | DateTime | When customer confirmed |
| checkedInAt | DateTime | When customer arrived |
| startedAt | DateTime | When service started |
| completedAt | DateTime | When service completed |
| cancelledAt | DateTime | When cancelled |
| cancellationReason | String | Reason for cancellation |
| createdAt | DateTime | Record creation timestamp |
| updatedAt | DateTime | Last update timestamp |

---

## 5. Working Hours JSON Schema

```json
{
  "monday": {
    "enabled": true,
    "start": "09:00",
    "end": "18:00",
    "breaks": [
      { "start": "12:00", "end": "13:00" }
    ]
  },
  "tuesday": {
    "enabled": true,
    "start": "09:00",
    "end": "18:00"
  },
  "wednesday": {
    "enabled": true,
    "start": "09:00",
    "end": "18:00"
  },
  "thursday": {
    "enabled": true,
    "start": "09:00",
    "end": "18:00"
  },
  "friday": {
    "enabled": true,
    "start": "09:00",
    "end": "18:00"
  },
  "saturday": {
    "enabled": true,
    "start": "10:00",
    "end": "16:00"
  },
  "sunday": {
    "enabled": false
  }
}
```

---

## 6. User Availability JSON Schema

```json
{
  "monday": {
    "available": true,
    "start": "09:00",
    "end": "17:00"
  },
  "tuesday": {
    "available": true,
    "start": "09:00",
    "end": "17:00"
  },
  "exceptions": [
    {
      "date": "2024-12-25",
      "available": false,
      "reason": "Holiday"
    },
    {
      "date": "2024-12-31",
      "available": true,
      "start": "09:00",
      "end": "14:00"
    }
  ]
}
```

---

## 7. Sample Seed Data

```typescript
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a demo business
  const business = await prisma.business.create({
    data: {
      name: 'Elite Auto Spa',
      slug: 'elite-auto-spa',
      email: 'info@eliteautospa.com',
      phone: '(555) 123-4567',
      address: '123 Detail Lane',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      subscriptionStatus: 'ACTIVE',
      googleBusinessUrl: 'https://g.page/eliteautospa/review',
      yelpBusinessUrl: 'https://yelp.com/biz/elite-auto-spa',
      pointsPerDollar: 1,
    },
  });

  // Create owner
  const owner = await prisma.user.create({
    data: {
      businessId: business.id,
      name: 'Mike Johnson',
      email: 'mike@eliteautospa.com',
      password: '$2b$10$...', // bcrypt hash of password
      role: 'OWNER',
    },
  });

  // Create services
  const services = await prisma.service.createMany({
    data: [
      {
        businessId: business.id,
        name: 'Express Wash',
        description: 'Quick exterior wash and dry',
        price: 35,
        duration: 30,
        category: 'Wash',
      },
      {
        businessId: business.id,
        name: 'Full Detail',
        description: 'Complete interior and exterior detail',
        price: 199,
        duration: 180,
        category: 'Detail',
      },
      {
        businessId: business.id,
        name: 'Ceramic Coating',
        description: 'Professional ceramic coating application',
        price: 599,
        duration: 480,
        category: 'Protection',
      },
    ],
  });

  // Create sample customer
  const customer = await prisma.customer.create({
    data: {
      businessId: business.id,
      name: 'Sarah Smith',
      email: 'sarah@email.com',
      phone: '(555) 234-5678',
      points: 2450,
      totalSpent: 2450,
      visitCount: 12,
      vehicles: {
        create: [
          {
            make: 'BMW',
            model: 'X5',
            year: 2022,
            color: 'Black',
            isDefault: true,
          },
        ],
      },
    },
  });

  // Create rewards
  await prisma.reward.createMany({
    data: [
      {
        businessId: business.id,
        name: '5% Off Your Next Service',
        pointsCost: 100,
        discountType: 'PERCENT',
        discountValue: 5,
      },
      {
        businessId: business.id,
        name: '10% Off Your Next Service',
        pointsCost: 200,
        discountType: 'PERCENT',
        discountValue: 10,
      },
      {
        businessId: business.id,
        name: '$25 Off Your Next Service',
        pointsCost: 300,
        discountType: 'FIXED',
        discountValue: 25,
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 8. Database Migrations

### Initial Migration

```bash
# Generate migration
npx prisma migrate dev --name init

# Apply to production
npx prisma migrate deploy
```

### Common Migration Patterns

```sql
-- Add new column with default
ALTER TABLE businesses ADD COLUMN review_incentive_enabled BOOLEAN DEFAULT false;

-- Add index for performance
CREATE INDEX idx_appointments_status ON appointments(business_id, status, date);

-- Backfill data
UPDATE customers SET points = 0 WHERE points IS NULL;
```

---

## 9. Data Validation Rules

### Business
- `name`: 2-100 characters
- `slug`: 3-50 characters, lowercase, alphanumeric + hyphens
- `email`: Valid email format
- `phone`: Valid phone format
- `depositPercent`: 0-100

### Customer
- `name`: 2-100 characters
- `email`: Valid email, unique per business
- `phone`: Valid phone format
- `points`: >= 0

### Appointment
- `date`: Must be in the future (for new bookings)
- `startTime` < `endTime`
- `subtotal`, `total`: >= 0
- `tip`: >= 0

### Service
- `name`: 2-100 characters
- `price`: > 0
- `duration`: > 0 (minutes)

---

## 10. Soft Delete Strategy

For data that should be retained for historical/reporting purposes:

```prisma
model Service {
  // ...existing fields
  deletedAt   DateTime?

  @@index([businessId, deletedAt])
}
```

Query pattern:
```typescript
// Get only active services
const services = await prisma.service.findMany({
  where: {
    businessId: ctx.businessId,
    deletedAt: null,
  },
});

// Soft delete
await prisma.service.update({
  where: { id: serviceId },
  data: { deletedAt: new Date() },
});
```
