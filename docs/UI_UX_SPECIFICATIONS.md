# DetailerStack Portal - UI/UX Specifications

**Version:** 1.0
**Last Updated:** December 23, 2024

---

## 1. Design System

### 1.1 Brand Colors

#### DetailerStack Admin (Platform)
```css
--ds-primary: #7c3aed;       /* Purple 600 */
--ds-primary-dark: #6d28d9;  /* Purple 700 */
--ds-primary-light: #a78bfa; /* Purple 400 */
--ds-bg-accent: #f3e8ff;     /* Purple 50 */
```

#### Car Detailer (Business)
```css
--cd-primary: #2563eb;       /* Blue 600 */
--cd-primary-dark: #1d4ed8;  /* Blue 700 */
--cd-primary-light: #60a5fa; /* Blue 400 */
--cd-bg-accent: #dbeafe;     /* Blue 50 */
```

#### Customer Portal
```css
--cust-primary: #059669;       /* Emerald 600 */
--cust-primary-dark: #047857;  /* Emerald 700 */
--cust-primary-light: #34d399; /* Emerald 400 */
--cust-bg-accent: #d1fae5;     /* Emerald 50 */
```

#### Shared Colors
```css
/* Grays */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;

/* Semantic */
--success: #10b981;  /* Emerald 500 */
--warning: #f59e0b;  /* Amber 500 */
--error: #ef4444;    /* Red 500 */
--info: #3b82f6;     /* Blue 500 */
```

### 1.2 Typography

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 13px;
--text-base: 14px;
--text-lg: 16px;
--text-xl: 18px;
--text-2xl: 24px;
--text-3xl: 30px;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### 1.3 Spacing

```css
/* Spacing Scale (4px base) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### 1.4 Border Radius

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
--radius-full: 9999px;
```

### 1.5 Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## 2. Layout Structure

### 2.1 Application Shell

```
┌─────────────────────────────────────────────────────────┐
│                    Role Switcher (48px)                 │ ← Demo only
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│   Sidebar    │              Main Content                │
│   (260px)    │                                          │
│              │                                          │
│  ┌────────┐  │  ┌────────────────────────────────────┐ │
│  │ Logo   │  │  │        Page Header                  │ │
│  └────────┘  │  └────────────────────────────────────┘ │
│              │                                          │
│  ┌────────┐  │  ┌────────────────────────────────────┐ │
│  │ Client │  │  │                                    │ │
│  │Switcher│  │  │        Content Area                │ │
│  └────────┘  │  │                                    │ │
│              │  │                                    │ │
│  ┌────────┐  │  │                                    │ │
│  │  Nav   │  │  │                                    │ │
│  │ Items  │  │  │                                    │ │
│  │        │  │  │                                    │ │
│  └────────┘  │  └────────────────────────────────────┘ │
│              │                                          │
│  ┌────────┐  │                                          │
│  │ User   │  │                                          │
│  │ Menu   │  │                                          │
│  └────────┘  │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### 2.2 Responsive Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 2.3 Sidebar Behavior

| Breakpoint | Behavior |
|------------|----------|
| < 768px | Hidden, hamburger menu overlay |
| >= 768px | Always visible, 260px width |

---

## 3. Component Specifications

### 3.1 Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover {
  background: var(--primary-dark);
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Secondary Button
```css
.btn-secondary {
  background: white;
  color: var(--gray-700);
  padding: 10px 16px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
.btn-secondary:hover {
  background: var(--gray-50);
}
```

#### Button Sizes
| Size | Padding | Font Size |
|------|---------|-----------|
| sm | 6px 12px | 13px |
| md | 10px 16px | 14px |
| lg | 12px 24px | 16px |

#### Loading State
```css
.btn-loading {
  position: relative;
  color: transparent;
}
.btn-loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
```

### 3.2 Form Inputs

#### Text Input
```css
.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.15s;
}
.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
}
.input::placeholder {
  color: var(--gray-400);
}
.input.error {
  border-color: var(--error);
}
```

#### Form Group
```html
<div class="form-group">
  <label class="form-label">Email Address</label>
  <input type="email" class="input" placeholder="email@example.com">
  <span class="form-error">Please enter a valid email</span>
</div>
```

```css
.form-group {
  margin-bottom: 16px;
}
.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 6px;
}
.form-error {
  font-size: 12px;
  color: var(--error);
  margin-top: 4px;
}
```

### 3.3 Cards

```css
.card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
}
```

### 3.4 Tables

```css
.table-container {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--gray-500);
  border-bottom: 1px solid var(--gray-200);
}
td {
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--gray-100);
}
tr:hover {
  background: var(--gray-50);
}
```

### 3.5 Status Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

/* Status variants */
.badge-success { background: #d1fae5; color: #065f46; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-error { background: #fee2e2; color: #991b1b; }
.badge-info { background: #dbeafe; color: #1e40af; }
.badge-neutral { background: var(--gray-100); color: var(--gray-600); }
```

### 3.6 Modals

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title {
  font-size: 18px;
  font-weight: 600;
}
.modal-body {
  padding: 24px;
}
.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--gray-200);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

### 3.7 Stats Cards

```css
.stat-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  padding: 20px;
}
.stat-label {
  font-size: 13px;
  color: var(--gray-500);
  margin-bottom: 8px;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--gray-900);
}
.stat-change {
  font-size: 13px;
  margin-top: 4px;
}
.stat-change.positive { color: var(--success); }
.stat-change.negative { color: var(--error); }
```

### 3.8 Navigation

```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.nav-item:hover {
  background: var(--gray-100);
  color: var(--gray-800);
}
.nav-item.active {
  background: var(--bg-accent);
  color: var(--primary);
}
.nav-item svg {
  width: 20px;
  height: 20px;
}
```

### 3.9 Toast Notifications

```css
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: var(--shadow-lg);
  min-width: 300px;
  animation: slideIn 0.3s ease;
}
.toast-success {
  background: #065f46;
  color: white;
}
.toast-error {
  background: #991b1b;
  color: white;
}
.toast-info {
  background: var(--gray-800);
  color: white;
}
```

---

## 4. Page Layouts

### 4.1 Dashboard Layout

```
┌────────────────────────────────────────────────────┐
│ Page Title                           [Actions]     │
├────────────────────────────────────────────────────┤
│                                                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│ │  Stat 1  │ │  Stat 2  │ │  Stat 3  │ │ Stat 4 │ │
│ └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                    │
│ ┌──────────────────────┐ ┌────────────────────────┐│
│ │                      │ │                        ││
│ │   Today's Schedule   │ │    Recent Activity     ││
│ │                      │ │                        ││
│ │                      │ │                        ││
│ └──────────────────────┘ └────────────────────────┘│
│                                                    │
└────────────────────────────────────────────────────┘
```

### 4.2 List Page Layout

```
┌────────────────────────────────────────────────────┐
│ Page Title                        [+ Add New]      │
├────────────────────────────────────────────────────┤
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ [Search...         ] [Filter ▼] [Status ▼]    │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ Name        │ Email       │ Status  │ Actions │ │
│ ├─────────────┼─────────────┼─────────┼─────────┤ │
│ │ John Doe    │ john@...    │ Active  │ ⋮       │ │
│ │ Jane Smith  │ jane@...    │ Active  │ ⋮       │ │
│ │ Bob Wilson  │ bob@...     │ Pending │ ⋮       │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
│ ← 1 2 3 ... 10 →                                  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 4.3 Detail Page Layout

```
┌────────────────────────────────────────────────────┐
│ ← Back    Customer Name               [Edit] [⋮]   │
├────────────────────────────────────────────────────┤
│                                                    │
│ ┌──────────────────┐ ┌────────────────────────────┐│
│ │   ┌─────────┐    │ │  Contact Info             ││
│ │   │  Avatar │    │ │  email@example.com        ││
│ │   └─────────┘    │ │  (555) 123-4567           ││
│ │   John Doe       │ │                           ││
│ │   VIP Customer   │ │  Stats                    ││
│ │                  │ │  12 visits │ $2,450 spent ││
│ └──────────────────┘ └────────────────────────────┘│
│                                                    │
│ ┌────────────────────────────────────────────────┐ │
│ │ Vehicles       Service History       Rewards   │ │
│ ├────────────────────────────────────────────────┤ │
│ │ Tab content here...                            │ │
│ │                                                │ │
│ └────────────────────────────────────────────────┘ │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 4.4 Calendar Layout

```
┌────────────────────────────────────────────────────┐
│ December 2024                [Day][Week][Month]    │
│ ← →                        [Staff: All ▼]          │
├─────────┬────────┬────────┬────────┬────────┬─────┤
│  Mon 23 │ Tue 24 │ Wed 25 │ Thu 26 │ Fri 27 │ ... │
├─────────┼────────┼────────┼────────┼────────┼─────┤
│ 9:00 AM │ ■ Appt │        │        │        │     │
├─────────┼────────┼────────┼────────┼────────┼─────┤
│10:00 AM │        │ ■ Appt │        │        │     │
├─────────┼────────┼────────┼────────┼────────┼─────┤
│11:00 AM │        │        │ ■ Appt │        │     │
├─────────┼────────┼────────┼────────┼────────┼─────┤
│12:00 PM │        │        │        │        │     │
└─────────┴────────┴────────┴────────┴────────┴─────┘
```

---

## 5. Interaction Patterns

### 5.1 Form Submission

1. User clicks submit button
2. Button shows loading state
3. Disable all form inputs
4. On success:
   - Show success toast
   - Close modal (if applicable)
   - Refresh data
5. On error:
   - Show error message
   - Highlight invalid fields
   - Keep form open

### 5.2 Delete Confirmation

1. User clicks delete button
2. Show confirmation modal:
   - "Are you sure you want to delete [item]?"
   - "This action cannot be undone."
   - [Cancel] [Delete] (red button)
3. On confirm:
   - Show loading
   - Delete item
   - Show success toast
   - Refresh list

### 5.3 Search & Filter

- Debounce search input (300ms)
- Show loading indicator during search
- Preserve filter state in URL
- Clear filters button when any filter active
- Show result count ("Showing 15 of 156 customers")

### 5.4 Drag & Drop (Calendar)

1. User starts dragging appointment
2. Show ghost/shadow of item
3. Highlight valid drop zones
4. On drop:
   - Show confirmation modal
   - "Reschedule to [new time]?"
   - [Cancel] [Reschedule]
5. On confirm:
   - Update appointment
   - Show success toast

---

## 6. Loading States

### 6.1 Page Loading

```html
<div class="page-loading">
  <div class="spinner"></div>
  <p>Loading...</p>
</div>
```

### 6.2 Skeleton Loading

```html
<!-- Table skeleton -->
<div class="skeleton-row">
  <div class="skeleton-cell" style="width: 40%"></div>
  <div class="skeleton-cell" style="width: 30%"></div>
  <div class="skeleton-cell" style="width: 20%"></div>
</div>
```

```css
.skeleton-cell {
  height: 20px;
  background: linear-gradient(90deg, var(--gray-200) 25%, var(--gray-100) 50%, var(--gray-200) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 6.3 Empty States

```html
<div class="empty-state">
  <svg class="empty-icon">...</svg>
  <h3>No customers yet</h3>
  <p>Add your first customer to get started</p>
  <button class="btn btn-primary">Add Customer</button>
</div>
```

---

## 7. Iconography

Use Heroicons (https://heroicons.com/) for all icons.

### 7.1 Navigation Icons

| Page | Icon |
|------|------|
| Dashboard | home |
| Calendar | calendar |
| Appointments | clipboard-list |
| Customers | users |
| Services | sparkles |
| Staff | user-group |
| Payments | credit-card |
| Loyalty | gift |
| Reviews | star |
| Communications | envelope |
| Reports | chart-bar |
| Settings | cog |

### 7.2 Action Icons

| Action | Icon |
|--------|------|
| Add | plus |
| Edit | pencil |
| Delete | trash |
| View | eye |
| Close | x-mark |
| Search | magnifying-glass |
| Filter | funnel |
| More actions | ellipsis-vertical |
| Check | check |
| Download | arrow-down-tray |

---

## 8. Accessibility

### 8.1 Requirements

- All interactive elements keyboard accessible
- Focus states visible on all interactive elements
- Color contrast ratio minimum 4.5:1
- Form labels associated with inputs
- Error messages linked to inputs
- Skip navigation link
- Screen reader announcements for dynamic content

### 8.2 Focus States

```css
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### 8.3 ARIA Labels

```html
<button aria-label="Close modal">
  <svg>...</svg>
</button>

<div role="alert" aria-live="polite">
  Customer saved successfully
</div>
```

---

## 9. Animation Guidelines

### 9.1 Timing

- Micro-interactions: 150ms
- Page transitions: 300ms
- Modal open/close: 200ms
- Toast notifications: 300ms in, 200ms out

### 9.2 Easing

```css
/* Standard easing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### 9.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Mobile Considerations

### 10.1 Touch Targets

- Minimum touch target: 44px × 44px
- Spacing between targets: minimum 8px

### 10.2 Mobile Navigation

- Hamburger menu icon
- Full-screen overlay navigation
- Swipe to close

### 10.3 Tables on Mobile

- Horizontal scroll for data tables
- Or convert to card layout
- Sticky first column for identifying info

### 10.4 Modals on Mobile

- Full-screen on mobile
- Fixed bottom action buttons
- Swipe down to close
