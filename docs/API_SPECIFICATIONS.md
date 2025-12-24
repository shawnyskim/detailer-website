# DetailerStack Portal - API Specifications

**Version:** 1.0
**Last Updated:** December 23, 2024
**Base URL:** `https://api.detailerstack.com` or `/api` (Next.js)

---

## 1. Overview

### 1.1 Authentication

All API endpoints (except public routes) require authentication via session cookie or Bearer token.

```http
Authorization: Bearer <token>
```

### 1.2 Response Format

All responses follow this structure:

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "field": "fieldName",  // For validation errors
    "details": { ... }     // Additional context
  }
}
```

### 1.3 Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Not authenticated |
| FORBIDDEN | 403 | Not authorized for this action |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid input |
| CONFLICT | 409 | Resource already exists |
| INTERNAL_ERROR | 500 | Server error |

### 1.4 Pagination

```http
GET /api/portal/customers?page=1&limit=20&sort=name&order=asc
```

---

## 2. Authentication Endpoints

### 2.1 Login

```http
POST /api/auth/login
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx...",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "OWNER",
      "businessId": "clx..."
    },
    "token": "eyJhbGc...",
    "expiresAt": "2024-12-24T10:00:00Z"
  }
}
```

### 2.2 Register Business

```http
POST /api/auth/register
```

**Request:**
```json
{
  "businessName": "Elite Auto Spa",
  "ownerName": "Mike Johnson",
  "email": "mike@eliteautospa.com",
  "password": "securePassword123",
  "phone": "(555) 123-4567"
}
```

### 2.3 Logout

```http
POST /api/auth/logout
```

### 2.4 Forgot Password

```http
POST /api/auth/forgot-password
```

**Request:**
```json
{
  "email": "user@example.com"
}
```

### 2.5 Reset Password

```http
POST /api/auth/reset-password
```

**Request:**
```json
{
  "token": "reset-token-from-email",
  "password": "newSecurePassword123"
}
```

---

## 3. Admin Portal Endpoints

### 3.1 Clients

#### List Clients
```http
GET /api/admin/clients
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |
| status | string | Filter by status |
| search | string | Search by name/email |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clx...",
      "name": "Elite Auto Spa",
      "email": "mike@eliteautospa.com",
      "owner": "Mike Johnson",
      "status": "ACTIVE",
      "subscriptionStatus": "ACTIVE",
      "bookingsCount": 342,
      "revenue": 28500,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

#### Get Client Details
```http
GET /api/admin/clients/:id
```

#### Create Client
```http
POST /api/admin/clients
```

**Request:**
```json
{
  "name": "New Detail Shop",
  "ownerName": "Jane Doe",
  "email": "jane@newdetailshop.com",
  "phone": "(555) 987-6543"
}
```

#### Update Client
```http
PUT /api/admin/clients/:id
```

#### Suspend Client
```http
POST /api/admin/clients/:id/suspend
```

#### Activate Client
```http
POST /api/admin/clients/:id/activate
```

#### Delete Client
```http
DELETE /api/admin/clients/:id
```

### 3.2 Templates

#### List Templates
```http
GET /api/admin/templates
```

#### Upload Template
```http
POST /api/admin/templates
Content-Type: multipart/form-data
```

---

## 4. Car Detailer Portal Endpoints

### 4.1 Dashboard

#### Get Dashboard Data
```http
GET /api/portal/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "todayAppointments": [
      {
        "id": "clx...",
        "customer": { "name": "Sarah Smith" },
        "service": { "name": "Full Detail" },
        "time": "09:00",
        "status": "CONFIRMED"
      }
    ],
    "stats": {
      "todayBookings": 6,
      "todayRevenue": 1250,
      "weeklyBookings": 28,
      "weeklyRevenue": 5800,
      "averageRating": 4.8
    },
    "recentActivity": [...]
  }
}
```

### 4.2 Appointments

#### List Appointments
```http
GET /api/portal/appointments
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| date | string | Filter by date (YYYY-MM-DD) |
| dateFrom | string | Start date range |
| dateTo | string | End date range |
| status | string | Filter by status |
| customerId | string | Filter by customer |
| userId | string | Filter by staff |

#### Get Appointment
```http
GET /api/portal/appointments/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "customer": {
      "id": "clx...",
      "name": "Sarah Smith",
      "email": "sarah@email.com",
      "phone": "(555) 123-4567"
    },
    "vehicle": {
      "make": "BMW",
      "model": "X5",
      "year": 2022,
      "color": "Black"
    },
    "service": {
      "id": "clx...",
      "name": "Full Detail",
      "price": 199
    },
    "user": {
      "id": "clx...",
      "name": "Mike J."
    },
    "date": "2024-12-23",
    "startTime": "09:00",
    "endTime": "12:00",
    "status": "CONFIRMED",
    "notes": "Customer prefers unscented products",
    "subtotal": 199,
    "discount": 0,
    "tip": 0,
    "total": 199,
    "photos": [
      { "type": "BEFORE", "url": "https://..." },
      { "type": "AFTER", "url": "https://..." }
    ]
  }
}
```

#### Create Appointment
```http
POST /api/portal/appointments
```

**Request:**
```json
{
  "customerId": "clx...",
  "vehicleId": "clx...",
  "serviceId": "clx...",
  "userId": "clx...",
  "date": "2024-12-24",
  "startTime": "10:00",
  "locationType": "SHOP",
  "notes": "Customer notes here"
}
```

#### Update Appointment
```http
PUT /api/portal/appointments/:id
```

**Request:**
```json
{
  "date": "2024-12-25",
  "startTime": "11:00",
  "userId": "clx...",
  "status": "CONFIRMED"
}
```

#### Update Appointment Status
```http
PATCH /api/portal/appointments/:id/status
```

**Request:**
```json
{
  "status": "COMPLETED",
  "completedAt": "2024-12-23T14:30:00Z"
}
```

#### Cancel Appointment
```http
POST /api/portal/appointments/:id/cancel
```

**Request:**
```json
{
  "reason": "Customer requested cancellation"
}
```

#### Upload Appointment Photos
```http
POST /api/portal/appointments/:id/photos
Content-Type: multipart/form-data
```

**Form Data:**
- `type`: "BEFORE" or "AFTER"
- `file`: Image file

### 4.3 Customers

#### List Customers
```http
GET /api/portal/customers
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search name/email/phone |
| tag | string | Filter by tag |
| sort | string | Sort field |
| order | string | asc/desc |

#### Get Customer
```http
GET /api/portal/customers/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx...",
    "name": "Sarah Smith",
    "email": "sarah@email.com",
    "phone": "(555) 123-4567",
    "points": 2450,
    "totalSpent": 2450,
    "visitCount": 12,
    "notes": "VIP customer",
    "tags": ["VIP", "Referral Source"],
    "vehicles": [
      {
        "id": "clx...",
        "make": "BMW",
        "model": "X5",
        "year": 2022,
        "color": "Black",
        "isDefault": true
      }
    ],
    "appointments": [
      {
        "id": "clx...",
        "service": "Full Detail",
        "date": "2024-12-20",
        "status": "COMPLETED",
        "total": 199
      }
    ],
    "redemptions": [
      {
        "id": "clx...",
        "reward": "10% Off",
        "couponCode": "LOYAL-SS-10OFF-A7X2",
        "status": "ACTIVE",
        "redeemedAt": "2024-12-20"
      }
    ]
  }
}
```

#### Create Customer
```http
POST /api/portal/customers
```

**Request:**
```json
{
  "name": "New Customer",
  "email": "new@email.com",
  "phone": "(555) 999-8888",
  "notes": "Referred by Sarah",
  "tags": ["New Customer"],
  "vehicles": [
    {
      "make": "Tesla",
      "model": "Model 3",
      "year": 2023,
      "color": "White"
    }
  ]
}
```

#### Update Customer
```http
PUT /api/portal/customers/:id
```

#### Delete Customer
```http
DELETE /api/portal/customers/:id
```

#### Adjust Points
```http
POST /api/portal/customers/:id/points
```

**Request:**
```json
{
  "type": "ADD",
  "amount": 100,
  "reason": "Birthday bonus",
  "notes": "Annual birthday gift"
}
```

### 4.4 Services

#### List Services
```http
GET /api/portal/services
```

#### Create Service
```http
POST /api/portal/services
```

**Request:**
```json
{
  "name": "Premium Detail",
  "description": "Our top-tier detailing package",
  "price": 299,
  "priceType": "FIXED",
  "duration": 240,
  "category": "Detail",
  "bonusPoints": 50
}
```

#### Update Service
```http
PUT /api/portal/services/:id
```

#### Delete Service
```http
DELETE /api/portal/services/:id
```

### 4.5 Staff

#### List Staff
```http
GET /api/portal/staff
```

#### Create Staff
```http
POST /api/portal/staff
```

**Request:**
```json
{
  "name": "New Team Member",
  "email": "team@business.com",
  "phone": "(555) 111-2222",
  "role": "STAFF",
  "serviceIds": ["clx...", "clx..."]
}
```

#### Update Staff
```http
PUT /api/portal/staff/:id
```

#### Delete Staff
```http
DELETE /api/portal/staff/:id
```

### 4.6 Payments

#### List Transactions
```http
GET /api/portal/payments
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| dateFrom | string | Start date |
| dateTo | string | End date |
| status | string | Payment status |
| method | string | Payment method |

#### Process Payment
```http
POST /api/portal/payments
```

**Request:**
```json
{
  "appointmentId": "clx...",
  "amount": 199,
  "tip": 30,
  "method": "CARD"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "paymentId": "clx...",
    "clientSecret": "pi_xxx_secret_xxx",
    "requiresAction": true
  }
}
```

#### Confirm Payment
```http
POST /api/portal/payments/:id/confirm
```

#### Issue Refund
```http
POST /api/portal/payments/:id/refund
```

**Request:**
```json
{
  "amount": 50,
  "reason": "Partial service not completed"
}
```

### 4.7 Loyalty

#### Get Loyalty Dashboard
```http
GET /api/portal/loyalty
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalMembers": 156,
      "totalPointsIssued": 45000,
      "totalPointsRedeemed": 12000,
      "activeRedemptions": 23
    },
    "rewards": [
      {
        "id": "clx...",
        "name": "10% Off",
        "pointsCost": 200,
        "discountType": "PERCENT",
        "discountValue": 10,
        "redemptionCount": 45
      }
    ],
    "recentRedemptions": [...]
  }
}
```

#### List Rewards
```http
GET /api/portal/loyalty/rewards
```

#### Create Reward
```http
POST /api/portal/loyalty/rewards
```

**Request:**
```json
{
  "name": "15% Off Your Next Service",
  "pointsCost": 300,
  "discountType": "PERCENT",
  "discountValue": 15
}
```

#### Update Reward
```http
PUT /api/portal/loyalty/rewards/:id
```

#### Delete Reward
```http
DELETE /api/portal/loyalty/rewards/:id
```

#### Issue Coupon to Customer
```http
POST /api/portal/loyalty/issue
```

**Request:**
```json
{
  "customerId": "clx...",
  "rewardId": "clx..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "redemptionId": "clx...",
    "couponCode": "LOYAL-SS-10OFF-A7X2",
    "pointsSpent": 200,
    "expiresAt": "2025-01-23T00:00:00Z"
  }
}
```

#### Validate/Apply Coupon
```http
POST /api/portal/loyalty/validate
```

**Request:**
```json
{
  "couponCode": "LOYAL-SS-10OFF-A7X2",
  "appointmentId": "clx..."
}
```

### 4.8 Reviews

#### List Reviews
```http
GET /api/portal/reviews
```

#### Get Review Settings
```http
GET /api/portal/reviews/settings
```

#### Update Review Settings
```http
PUT /api/portal/reviews/settings
```

**Request:**
```json
{
  "googleBusinessUrl": "https://g.page/business/review",
  "yelpBusinessUrl": "https://yelp.com/biz/business",
  "requestDelay": 24,
  "satisfactionCheck": true,
  "minimumRating": 4,
  "incentiveEnabled": true,
  "incentiveType": "POINTS",
  "incentiveValue": 50,
  "emailTemplate": {
    "subject": "How was your visit?",
    "body": "Hi {{customer_name}},\n\nThank you for visiting..."
  }
}
```

#### Send Review Request
```http
POST /api/portal/reviews/request
```

**Request:**
```json
{
  "customerId": "clx...",
  "appointmentId": "clx..."
}
```

### 4.9 Communications

#### Send Email
```http
POST /api/portal/communications/email
```

**Request:**
```json
{
  "to": "all",
  "subject": "Holiday Special!",
  "body": "Dear valued customers..."
}
```

**Or for segment:**
```json
{
  "to": "segment",
  "segment": {
    "tags": ["VIP"],
    "lastVisitDays": 30
  },
  "subject": "We miss you!",
  "body": "It's been a while..."
}
```

**Or for individual:**
```json
{
  "to": "individual",
  "customerId": "clx...",
  "subject": "Your appointment confirmation",
  "body": "Dear Sarah..."
}
```

### 4.10 Reports

#### Get Revenue Report
```http
GET /api/portal/reports/revenue
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| period | string | day, week, month, year |
| dateFrom | string | Start date |
| dateTo | string | End date |
| groupBy | string | service, staff, day |

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRevenue": 28500,
      "totalBookings": 342,
      "averageTicket": 83.33,
      "growth": 12.5
    },
    "byService": [
      { "name": "Full Detail", "revenue": 15000, "count": 75 },
      { "name": "Ceramic Coating", "revenue": 8000, "count": 13 }
    ],
    "byStaff": [
      { "name": "Mike J.", "revenue": 12000, "count": 120 }
    ],
    "timeline": [
      { "date": "2024-12-01", "revenue": 1200 },
      { "date": "2024-12-02", "revenue": 1500 }
    ]
  }
}
```

#### Export Report
```http
GET /api/portal/reports/export
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | revenue, bookings, customers |
| format | string | csv, pdf |
| dateFrom | string | Start date |
| dateTo | string | End date |

### 4.11 Settings

#### Get Settings
```http
GET /api/portal/settings
```

#### Update Settings
```http
PUT /api/portal/settings
```

**Request:**
```json
{
  "name": "Elite Auto Spa",
  "phone": "(555) 123-4567",
  "address": "123 Detail Lane",
  "city": "Los Angeles",
  "state": "CA",
  "zip": "90001",
  "workingHours": {
    "monday": { "enabled": true, "start": "09:00", "end": "18:00" }
  },
  "cancellationPolicy": "HOURS_24",
  "depositRequired": true,
  "depositPercent": 20
}
```

---

## 5. Customer Portal Endpoints

### 5.1 Profile

#### Get Profile
```http
GET /api/customer/profile
```

#### Update Profile
```http
PUT /api/customer/profile
```

### 5.2 Vehicles

#### List Vehicles
```http
GET /api/customer/vehicles
```

#### Add Vehicle
```http
POST /api/customer/vehicles
```

**Request:**
```json
{
  "make": "Tesla",
  "model": "Model Y",
  "year": 2024,
  "color": "Red",
  "licensePlate": "ABC123"
}
```

#### Delete Vehicle
```http
DELETE /api/customer/vehicles/:id
```

### 5.3 Services

#### List Available Services
```http
GET /api/customer/services
```

#### Get Service Availability
```http
GET /api/customer/services/:id/availability
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| date | string | Date to check (YYYY-MM-DD) |

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-12-24",
    "slots": [
      { "time": "09:00", "available": true },
      { "time": "10:00", "available": false },
      { "time": "11:00", "available": true }
    ]
  }
}
```

### 5.4 Booking

#### Create Booking
```http
POST /api/customer/book
```

**Request:**
```json
{
  "serviceId": "clx...",
  "vehicleId": "clx...",
  "date": "2024-12-24",
  "time": "10:00",
  "locationType": "SHOP",
  "notes": "Please use unscented products",
  "couponCode": "LOYAL-SS-10OFF-A7X2"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "appointmentId": "clx...",
    "confirmationNumber": "EA-2024-1234",
    "service": "Full Detail",
    "date": "2024-12-24",
    "time": "10:00",
    "subtotal": 199,
    "discount": 19.90,
    "total": 179.10,
    "depositRequired": 35.82,
    "paymentIntent": {
      "clientSecret": "pi_xxx_secret_xxx"
    }
  }
}
```

### 5.5 Appointments

#### List My Appointments
```http
GET /api/customer/appointments
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | upcoming, past, cancelled |

#### Cancel Appointment
```http
POST /api/customer/appointments/:id/cancel
```

### 5.6 Loyalty

#### Get Loyalty Status
```http
GET /api/customer/loyalty
```

**Response:**
```json
{
  "success": true,
  "data": {
    "points": 2450,
    "tier": "Gold",
    "nextTier": "Platinum",
    "pointsToNextTier": 550,
    "availableRewards": [
      {
        "id": "clx...",
        "name": "10% Off",
        "pointsCost": 200,
        "canRedeem": true
      }
    ],
    "activeRedemptions": [
      {
        "id": "clx...",
        "couponCode": "LOYAL-SS-10OFF-A7X2",
        "reward": "10% Off",
        "expiresAt": "2025-01-23"
      }
    ]
  }
}
```

#### Redeem Points
```http
POST /api/customer/loyalty/redeem
```

**Request:**
```json
{
  "rewardId": "clx..."
}
```

---

## 6. Public Endpoints

### 6.1 Business Public Info

#### Get Business by Slug
```http
GET /api/public/:slug
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Elite Auto Spa",
    "phone": "(555) 123-4567",
    "address": "123 Detail Lane, Los Angeles, CA 90001",
    "workingHours": {...},
    "services": [
      {
        "id": "clx...",
        "name": "Full Detail",
        "description": "Complete interior and exterior detail",
        "price": 199,
        "duration": 180
      }
    ]
  }
}
```

### 6.2 Public Booking (Guest)

#### Check Availability
```http
GET /api/public/:slug/availability
```

#### Create Guest Booking
```http
POST /api/public/:slug/book
```

**Request:**
```json
{
  "customerName": "New Customer",
  "customerEmail": "new@email.com",
  "customerPhone": "(555) 999-8888",
  "vehicle": {
    "make": "Honda",
    "model": "Accord",
    "year": 2022,
    "color": "Blue"
  },
  "serviceId": "clx...",
  "date": "2024-12-24",
  "time": "10:00"
}
```

---

## 7. Webhook Endpoints

### 7.1 Stripe Webhooks

```http
POST /api/webhooks/stripe
```

**Events Handled:**
- `checkout.session.completed` - New subscription
- `invoice.paid` - Subscription renewed
- `invoice.payment_failed` - Payment failed
- `customer.subscription.deleted` - Subscription cancelled
- `payment_intent.succeeded` - Customer payment completed
- `payment_intent.payment_failed` - Customer payment failed

### 7.2 Twilio Webhooks

```http
POST /api/webhooks/twilio
```

**Events Handled:**
- SMS delivery status
- Incoming SMS (future)

---

## 8. Rate Limiting

| Endpoint Category | Rate Limit |
|-------------------|------------|
| Auth endpoints | 10 requests/minute |
| API read endpoints | 100 requests/minute |
| API write endpoints | 30 requests/minute |
| Webhooks | 1000 requests/minute |
| Public endpoints | 50 requests/minute |

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1703347200
```

---

## 9. WebSocket Events (Future)

For real-time updates:

```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.detailerstack.com/ws');

// Events
ws.on('appointment.created', (data) => {...});
ws.on('appointment.updated', (data) => {...});
ws.on('payment.received', (data) => {...});
ws.on('review.received', (data) => {...});
```
