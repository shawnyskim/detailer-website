# DetailerStack Portal - Product Requirements Document (PRD)

**Version:** 1.0
**Last Updated:** December 23, 2024
**Product Owner:** DetailerStack Team

---

## 1. Executive Summary

### 1.1 Product Vision
DetailerStack is a white-label SaaS platform that provides car detailing businesses with professional booking websites and comprehensive business management tools. The platform serves three distinct user types through a unified portal system.

### 1.2 Business Model
- **Pricing:** Single plan at $299/month per detailing business
- **Revenue Model:** Subscription-based with payment processing fees via Stripe Connect
- **Target Market:** Independent car detailing businesses and mobile detailing operators

### 1.3 Core Value Proposition
- White-label booking websites for car detailers
- Complete business management portal
- Customer self-service portal
- Automated review collection system
- Loyalty/rewards program management

---

## 2. User Personas

### 2.1 DetailerStack Admin (Platform Owner)
**Role:** Platform administrators who manage the entire SaaS platform

**Goals:**
- Onboard and manage detailing business clients
- Monitor platform-wide metrics and health
- Manage website templates
- Configure platform integrations

**Access Level:** Full platform control, can "jump into" any client portal

### 2.2 Car Detailer (Business Owner/Staff)
**Role:** Detailing business owners and their team members

**Goals:**
- Manage daily bookings and appointments
- Process payments and track revenue
- Manage customer relationships (CRM)
- Run loyalty programs and promotions
- Collect and manage reviews
- Communicate with customers

**Access Level:** Full access to their own business data only

### 2.3 Customer (End User)
**Role:** Customers who book and receive detailing services

**Goals:**
- Book appointments easily
- Manage their vehicles
- Track loyalty points and rewards
- View service history
- Reschedule or cancel appointments

**Access Level:** Self-service access to their own bookings and profile

---

## 3. Feature Requirements

### 3.1 DetailerStack Admin Portal

#### 3.1.1 Dashboard
| Feature | Priority | Status |
|---------|----------|--------|
| Platform-wide metrics (total clients, bookings, revenue) | P0 | Built |
| Active clients overview | P0 | Built |
| Recent activity feed | P2 | Built |
| Quick actions (add client, view alerts) | P1 | Built |

#### 3.1.2 Client Management
| Feature | Priority | Status |
|---------|----------|--------|
| View all clients list | P0 | Built |
| Add new client | P0 | Built |
| Edit client details | P0 | Needs Work |
| Suspend/activate client | P1 | Built |
| Delete client | P2 | Built |
| "Jump into" client portal (impersonation) | P1 | Built |
| View client subscription status | P1 | Built |

#### 3.1.3 Website Templates
| Feature | Priority | Status |
|---------|----------|--------|
| View available templates | P0 | Built |
| Template usage statistics | P2 | Built |
| Upload new template version | P0 | Not Built |
| Assign template to client | P0 | Not Built |

#### 3.1.4 User Management
| Feature | Priority | Status |
|---------|----------|--------|
| View all platform users | P0 | Built |
| Add DetailerStack team member | P1 | Not Built |
| Manage user roles | P1 | Built (display) |
| View user activity | P2 | Built (display) |

#### 3.1.5 Settings
| Feature | Priority | Status |
|---------|----------|--------|
| Platform configuration | P1 | Built |
| Integration settings (Stripe, Twilio) | P1 | Not Built |

---

### 3.2 Car Detailer Portal

#### 3.2.1 Dashboard
| Feature | Priority | Status |
|---------|----------|--------|
| Today's appointments list | P0 | Built |
| Key metrics (bookings, revenue, rating) | P0 | Built |
| Quick actions (new booking, add customer) | P0 | Built |
| Next up queue | P1 | Built |

#### 3.2.2 Calendar
| Feature | Priority | Status |
|---------|----------|--------|
| Week view with time slots | P0 | Built |
| View appointments on calendar | P0 | Partial |
| Click time slot to book | P1 | Built |
| Drag-and-drop reschedule | P2 | Built |
| Staff filter | P1 | Not Built |
| Day/Week/Month toggle | P2 | Partial |

#### 3.2.3 Appointments (Bookings)
| Feature | Priority | Status |
|---------|----------|--------|
| View all appointments list | P0 | Built |
| Create new booking | P0 | Built |
| View appointment details | P0 | Built |
| Edit appointment | P0 | Built |
| Mark as complete | P0 | Built |
| Cancel appointment | P0 | Built |
| Filter by status | P1 | UI Only |
| Search appointments | P1 | Not Built |
| Upload before/after photos | P2 | Built |
| Add service notes | P2 | Built |

#### 3.2.4 Customers (CRM)
| Feature | Priority | Status |
|---------|----------|--------|
| View all customers | P0 | Built |
| Add new customer | P0 | Built |
| View customer detail | P0 | Built |
| Edit customer | P0 | Built |
| Multiple vehicles per customer | P0 | Built |
| Service history | P1 | Built |
| Customer notes | P1 | Built |
| Customer tags | P2 | Built |
| Search customers | P1 | UI Only |
| Adjust loyalty points | P1 | Built |

#### 3.2.5 Services
| Feature | Priority | Status |
|---------|----------|--------|
| View all services | P0 | Built |
| Add new service | P0 | Built |
| Edit service | P0 | Built |
| Delete/deactivate service | P1 | Built |
| Set pricing, duration, category | P0 | Built |
| Create packages/bundles | P2 | Not Built |

#### 3.2.6 Staff Management
| Feature | Priority | Status |
|---------|----------|--------|
| View staff list | P0 | Built |
| Add staff member | P0 | Built |
| Edit staff member | P0 | Built |
| Remove staff member | P1 | Built |
| Assign services to staff | P1 | Built |
| Set staff availability | P2 | Not Built |

#### 3.2.7 Payments
| Feature | Priority | Status |
|---------|----------|--------|
| View transactions list | P0 | Built |
| Process payment | P0 | Built |
| Accept tips | P0 | Built |
| Multiple payment methods (Card, Cash, Apple Pay) | P0 | Built |
| Issue refund | P1 | Not Built |
| Apply discount | P1 | Not Built |
| View daily totals | P1 | Built |
| Export transactions | P2 | Not Built |

#### 3.2.8 Loyalty Program
| Feature | Priority | Status |
|---------|----------|--------|
| View program dashboard | P0 | Built |
| Create/edit rewards | P0 | Built |
| View redemption history | P1 | Built |
| Issue coupon to customer | P1 | Built |
| Manual point adjustment | P1 | Built |
| Configure points rate | P2 | Not Built |

#### 3.2.9 Reviews
| Feature | Priority | Status |
|---------|----------|--------|
| View reviews | P0 | Built |
| Automated review request flow | P0 | Built |
| Configure request timing | P1 | Built |
| Satisfaction check (filter 4+ stars) | P1 | Built |
| Email template for review requests | P1 | Built |
| Review incentives (points or discount) | P2 | Built |
| Platform URLs (Google, Yelp) | P1 | Built |

#### 3.2.10 Communications
| Feature | Priority | Status |
|---------|----------|--------|
| Email individual customer | P0 | Built |
| Bulk email (all/segment) | P1 | Built |
| Appointment confirmation emails | P0 | Not Built (Backend) |
| Reminder emails | P1 | Not Built (Backend) |
| SMS capability | P2 | Not Built |

#### 3.2.11 Reports
| Feature | Priority | Status |
|---------|----------|--------|
| Revenue overview | P0 | Built |
| Revenue by service | P1 | Built |
| Revenue by staff | P1 | Built |
| Booking statistics | P1 | Built |
| Date range filter | P2 | Not Built |
| Export reports | P2 | Not Built |

#### 3.2.12 Settings
| Feature | Priority | Status |
|---------|----------|--------|
| Business information | P0 | Built |
| Working hours | P1 | Built (display) |
| Cancellation policy | P1 | Built |
| Deposit settings | P1 | Built |
| Save settings | P0 | Built |

---

### 3.3 Customer Portal

#### 3.3.1 Dashboard
| Feature | Priority | Status |
|---------|----------|--------|
| Upcoming appointments | P0 | Built |
| Loyalty points balance | P0 | Built |
| Quick book button | P0 | Built |
| Recent activity | P1 | Built |

#### 3.3.2 Services & Booking
| Feature | Priority | Status |
|---------|----------|--------|
| View available services | P0 | Built |
| Book a service | P0 | Built |
| Select date/time | P0 | Built |
| Select vehicle | P0 | Built |
| Add special requests | P1 | Built |
| View pricing | P0 | Built |

#### 3.3.3 My Appointments
| Feature | Priority | Status |
|---------|----------|--------|
| View upcoming appointments | P0 | Built |
| View past appointments | P0 | Built |
| Cancel appointment | P1 | Built |
| Reschedule (link only) | P2 | Built |

#### 3.3.4 My Vehicles
| Feature | Priority | Status |
|---------|----------|--------|
| View vehicles | P0 | Built |
| Add vehicle | P0 | Built |
| Edit/remove vehicle | P1 | Not Built |

#### 3.3.5 Loyalty & Rewards
| Feature | Priority | Status |
|---------|----------|--------|
| View points balance | P0 | Built |
| View tier status | P0 | Built |
| View available rewards | P0 | Built |
| Redeem points | P0 | Built |
| Points history | P2 | Not Built |

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load time: < 2 seconds
- API response time: < 500ms
- Support 100+ concurrent users per client
- 99.9% uptime SLA

### 4.2 Security
- All data encrypted in transit (HTTPS)
- Data encrypted at rest
- Role-based access control (RBAC)
- PCI-compliant payment processing via Stripe
- Session timeout after 30 minutes of inactivity
- Password requirements: 8+ chars, mixed case, numbers

### 4.3 Scalability
- Multi-tenant architecture
- Horizontal scaling capability
- Database sharding support for growth

### 4.4 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile: iOS Safari, Chrome for Android

---

## 5. Integration Requirements

### 5.1 Payment Processing
**Provider:** Stripe Connect
- Platform receives subscription payments
- Car detailers receive customer payments
- Support for deposits and full payments
- Tip processing
- Refund capability

### 5.2 Communications
**Email Provider:** Resend or SendGrid
- Transactional emails (confirmations, reminders)
- Marketing emails (promotions, campaigns)

**SMS Provider:** Twilio
- Appointment reminders
- Confirmation texts
- Two-way messaging (future)

### 5.3 Calendar
**Provider:** Google Calendar API
- Two-way sync with staff calendars
- Block time from external events

### 5.4 Reviews
**Platforms:**
- Google Business Profile (via URL linking)
- Yelp (via URL linking)
- Facebook (via URL linking)

*Note: Direct API posting of reviews is NOT possible per platform policies. System sends customers to review pages.*

---

## 6. Success Metrics

### 6.1 Platform Metrics
- Monthly Active Clients
- Client Churn Rate (< 5% monthly target)
- Platform Revenue
- Support Ticket Volume

### 6.2 Client Success Metrics
- Bookings per month per client
- Average revenue per client
- Review request conversion rate
- Customer retention rate

### 6.3 End User Metrics
- Booking completion rate
- Mobile vs desktop usage
- Points redemption rate
- Repeat booking rate

---

## 7. Constraints and Assumptions

### 7.1 Constraints
- Single pricing tier ($299/mo) - no feature gating
- Reviews cannot be posted directly to platforms via API
- SMS requires separate Twilio account per client (or pool)
- Mobile app is not in initial scope

### 7.2 Assumptions
- Car detailers have basic computer literacy
- Customers have smartphones for booking
- Businesses operate in single timezone
- English language only initially

---

## 8. Out of Scope (V1)

The following features are explicitly NOT included in the initial release:

1. Native mobile apps (iOS/Android)
2. Multi-location support per client
3. Inventory management
4. Fleet/commercial account management
5. Gift cards
6. Waitlist management
7. Live chat support
8. Referral program
9. Multi-language support
10. Dark mode

---

## 9. Release Phases

### Phase 1: Core Platform (MVP)
- DetailerStack admin portal (basic)
- Car detailer portal (bookings, customers, services)
- Customer portal (booking, appointments)
- Stripe payment integration

### Phase 2: Engagement Features
- Loyalty program
- Review automation
- Email communications

### Phase 3: Advanced Features
- Calendar enhancements
- Advanced reporting
- SMS notifications
- Staff scheduling

### Phase 4: Polish & Scale
- Performance optimization
- Export functionality
- Advanced analytics
- API for third-party integrations

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| Client | A car detailing business using DetailerStack |
| Customer | End user who books services from a client |
| Booking | An appointment for a detailing service |
| Points | Loyalty currency earned from purchases |
| Reward | Something customers can redeem points for |
| Redemption | The act of exchanging points for a reward |
| Coupon | A discount code generated from a redemption |

---

## Appendix B: Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 23, 2024 | DetailerStack Team | Initial PRD |
