# DetailerStack Portal - Complete Feature List

## Overview

DetailerStack is a SaaS platform providing white-label booking websites and business management tools for car detailing businesses.

---

## Access Levels

### 1. DetailerStack Admin (Platform Owner)
Full platform control and multi-tenant management.

### 2. Car Detailer (Client Business)
Business management for their own detailing company. Can invite team members.

### 3. Customer (End User)
Self-service portal for booking and managing their services.

---

## DetailerStack Admin Portal

### Dashboard
- [ ] Overview of all active clients
- [ ] Platform-wide metrics (total bookings, revenue, active users)
- [ ] Recent activity feed
- [ ] System health indicators

### Client Management
- [ ] Add new car detailer clients
- [ ] View/edit client business details
- [ ] Suspend/activate client accounts
- [ ] "Jump into" any client portal (impersonation mode)
- [ ] View client subscription status and billing

### Website Management
- [ ] Upload new website versions for clients
- [ ] Manage client website assets (logo, images, content)
- [ ] Preview client websites
- [ ] Toggle website live/maintenance mode
- [ ] Configure booking funnel fields per client
  - [ ] Mobile service fields (address, travel radius)
  - [ ] Shop location fields (location selection, bay availability)
  - [ ] Custom intake questions

### User Management
- [ ] Add/edit/remove DetailerStack team members
- [ ] Manage all client users across the platform
- [ ] Role and permission management
- [ ] View user activity logs

### Service Menu Templates
- [ ] Create service templates clients can adopt
- [ ] Manage global service categories
- [ ] Set default pricing guidelines

### Platform Settings
- [ ] Stripe Connect configuration
- [ ] Twilio SMS configuration
- [ ] Email provider settings
- [ ] Review platform integrations (Google, Facebook, Yelp)

---

## Car Detailer Portal

### Dashboard
- [ ] Today's appointments overview
- [ ] Key metrics (bookings, revenue, reviews)
- [ ] Recent customer activity
- [ ] Quick actions (new booking, add customer)

### Booking Calendar
- [ ] View all appointments (day/week/month views)
- [ ] Create new bookings manually
- [ ] Edit/reschedule appointments
- [ ] Cancel appointments with notifications
- [ ] Filter by staff member
- [ ] Google Calendar sync (two-way)
- [ ] Color-coded by service type or status

### Service Menu
- [ ] Add new services
  - [ ] Name
  - [ ] Description
  - [ ] Price (fixed or variable)
  - [ ] Duration
  - [ ] Category
  - [ ] Availability (which staff can perform)
- [ ] Edit existing services
- [ ] Deactivate/archive services
- [ ] Create service bundles/packages
- [ ] Set bundle pricing and included services

### Staff Management
- [ ] Add team members
- [ ] Set individual working hours/availability
- [ ] Assign services each staff member can perform
- [ ] View individual staff calendars
- [ ] Set staff permissions (admin, limited, view-only)

### Customer Management (CRM)
- [ ] View all customers
- [ ] Customer profile details:
  - [ ] Contact information (name, email, phone)
  - [ ] Vehicle information (make, model, year, color, plate)
  - [ ] Multiple vehicles per customer
  - [ ] Service history with dates
  - [ ] Loyalty points balance
  - [ ] Pre-purchased services/bundles
  - [ ] Notes and tags
  - [ ] Photo gallery (before/after per visit)
- [ ] Add customers manually
- [ ] Import customers (CSV)
- [ ] Search and filter customers
- [ ] Customer segments/tags

### Appointments
- [ ] View all appointments (list view)
- [ ] Filter by status (upcoming, completed, cancelled, no-show)
- [ ] Appointment details:
  - [ ] Customer info
  - [ ] Service(s) booked
  - [ ] Date/time
  - [ ] Assigned staff
  - [ ] Location (shop or customer address)
  - [ ] Payment status
  - [ ] Notes
- [ ] Mark as complete
- [ ] Upload before/after photos
- [ ] Add post-service notes

### Payments
- [ ] View all transactions
- [ ] Process payments (via Stripe Connect)
- [ ] Accept deposits
- [ ] Collect full payments
- [ ] Accept tips
- [ ] Issue refunds
- [ ] View payout history
- [ ] Sell bundles/packages
- [ ] Track pre-paid service redemptions

### Loyalty Program
- [ ] Configure points earning rules
  - [ ] Points per dollar spent
  - [ ] Bonus points for specific services
  - [ ] Birthday/signup bonuses
- [ ] Set reward tier thresholds
  - [ ] Bronze: X points = $Y off
  - [ ] Silver: X points = $Y off or free service
  - [ ] Gold: X points = premium rewards
- [ ] View customer loyalty standings
- [ ] Manual point adjustments
- [ ] Redemption history

### Reviews Management
- [ ] Automated review request settings
  - [ ] Delay after service (hours/days)
  - [ ] Satisfaction check first (filter unhappy customers)
  - [ ] Platform selection (Google, Facebook, Yelp)
- [ ] View review request status
- [ ] Track reviews received
- [ ] Respond to reviews (if API allows)
- [ ] Review analytics

### Communications
- [ ] Email customers
  - [ ] Individual emails
  - [ ] Bulk email to all customers
  - [ ] Filtered emails (by segment, last visit, etc.)
  - [ ] Email templates
- [ ] SMS notifications (via Twilio)
  - [ ] Appointment confirmations
  - [ ] Appointment reminders (configurable timing)
  - [ ] Follow-up messages
- [ ] Notification settings
  - [ ] Configure what triggers emails/SMS
  - [ ] Set reminder intervals (24hr, 2hr before)
  - [ ] Customer-facing vs staff-facing alerts

### Reports & Analytics
- [ ] Revenue reports
  - [ ] Daily/weekly/monthly/yearly
  - [ ] By service type
  - [ ] By staff member
- [ ] Booking analytics
  - [ ] Volume trends
  - [ ] Popular time slots
  - [ ] Booking sources
- [ ] Customer metrics
  - [ ] New vs returning
  - [ ] Lifetime value
  - [ ] Retention rate
- [ ] No-show tracking
- [ ] Staff performance
- [ ] Exportable reports (CSV/PDF)

### Settings
- [ ] Business information
- [ ] Working hours
- [ ] Location(s) setup
  - [ ] Physical shop address(es)
  - [ ] Mobile service area/radius
- [ ] Booking policies
  - [ ] Cancellation policy
  - [ ] Deposit requirements
  - [ ] Buffer time between appointments
- [ ] Notification preferences
- [ ] Team member management

---

## Customer Portal (End User)

### Account
- [ ] Create account (email/phone)
- [ ] Login/logout
- [ ] Edit profile information
- [ ] Manage vehicles
  - [ ] Add/edit/remove vehicles
  - [ ] Make, model, year, color

### Booking
- [ ] View available services
- [ ] Select service(s)
- [ ] Choose date/time from available slots
- [ ] Select location (if mobile service, enter address)
- [ ] Enter vehicle details
- [ ] Add special requests/notes
- [ ] Review and confirm
- [ ] Pay deposit or full amount

### My Services
- [ ] View upcoming appointments
- [ ] View past appointments with details
- [ ] Reschedule appointments
- [ ] Cancel appointments (per policy)
- [ ] View pre-purchased bundles
- [ ] Redeem bundle services
- [ ] Book using pre-purchased credits

### Loyalty
- [ ] View current points balance
- [ ] View tier status
- [ ] See points history
- [ ] View available rewards
- [ ] Redeem points for rewards
- [ ] Track progress to next tier

### Notifications
- [ ] Receive booking confirmations
- [ ] Receive appointment reminders
- [ ] Confirmation requests (tap to confirm)
- [ ] Review requests post-service

---

## Technical Integrations

### Payments
- **Stripe Connect** - Payment processing with platform fees
  - Client onboarding
  - Split payments
  - Payout management

### Calendar
- **Google Calendar** - Two-way sync for staff calendars

### Communications
- **Twilio** - SMS notifications
  - Appointment reminders
  - Confirmations
  - Two-way messaging (future)

### Reviews
- **Google Business** - Review requests and tracking
- **Facebook** - Review requests
- **Yelp** - Review requests

### Email
- Transactional emails (confirmations, receipts)
- Marketing emails (campaigns, promotions)

---

## Future Considerations (Not in Initial Build)

- [ ] Waitlist/cancellation auto-fill
- [ ] Gift cards
- [ ] Referral program
- [ ] Mobile app for detailers
- [ ] Live chat support
- [ ] Inventory management
- [ ] Fleet/commercial accounts
- [ ] Multi-location management for single client
