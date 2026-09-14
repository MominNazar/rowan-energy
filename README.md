# Rowan Energy — SolarAdmin / SurveyPro / Hover Lens

Frontend demo for a solar/drone survey operations platform with three portals:

| Portal | Brand | Who it's for |
|--------|--------|----------------|
| **Admin** | SolarAdmin | Operations managers |
| **Customer** | SurveyPro | Property / site customers |
| **Engineer** | Hover Lens | Field drone engineers |

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **shadcn/ui**. UI matches Figma designs; filters and actions work on the **frontend only** (no backend).

---

## Getting started

**Requirements:** Node.js 18+ and npm.

```bash
cd rowan-energy
npm install --legacy-peer-deps
npm run dev
```

App runs at **http://localhost:8080** (or the port Vite prints).

> Use `--legacy-peer-deps` if install fails on React peer dependency conflicts (`next-themes`).

### Other scripts

```bash
npm run build     # production build
npm run preview   # preview production build
npm run lint      # ESLint
```

---

## App routes

### Public
| Path | Page |
|------|------|
| `/` | Landing |

### Customer (SurveyPro)
| Path | Page |
|------|------|
| `/customer` | Redirects to dashboard |
| `/customer/login` | Login |
| `/customer/dashboard` | Dashboard |
| `/customer/bookings` | My Bookings |
| `/customer/bookings/:id` | Booking details |
| `/customer/reports` | Reports |
| `/customer/book` | Book a survey |
| `/customer/profile` | Profile |

### Engineer (Hover Lens)
| Path | Page |
|------|------|
| `/engineer` | Redirects to dashboard |
| `/engineer/login` | Login |
| `/engineer/dashboard` | Dashboard |
| `/engineer/schedule` | My Schedule |
| `/engineer/route-planner` | My Route Planner |
| `/engineer/job-details` / `:id` | Job details |
| `/engineer/checklist` / `:id` | Pre-survey checklist |
| `/engineer/upload` / `:id` | Upload survey results |
| `/engineer/availability` | My Availability |

### Admin (SolarAdmin)
| Path | Page |
|------|------|
| `/admin/dashboard` | Dashboard |
| `/admin/leads` | Leads |
| `/admin/jobs` | All survey jobs |
| `/admin/jobs/:id` | Job details |
| `/admin/calendar` | Weekly job calendar |
| `/admin/route-planner` | Engineer route planner |
| `/admin/engineers` | Engineer directory |
| `/admin/reports` | Survey reports |
| `/admin/settings` | Settings |

---

## Features (frontend demo)

- Figma-aligned layouts for admin, customer, and engineer portals
- Working search/filters, pagination, and list/grid toggles (client-side)
- Forms, modals, date calendars, and toasts for actions
- Demo auth via `localStorage` / `sessionStorage` (customer & engineer login)
- Responsive from **320px** upward (mobile drawer sidebars, stacked filters, scrollable tables)

---

## Tech stack

- React 19 + TypeScript
- Vite 7
- React Router
- Tailwind CSS + shadcn/ui (Radix)
- TanStack Query, React Hook Form, Zod
- Lucide icons, Sonner toasts, date-fns / react-day-picker

---

## Project structure

```
rowan-energy/
├── src/
│   ├── pages/
│   │   ├── admin/       # SolarAdmin pages
│   │   ├── customer/    # SurveyPro pages
│   │   ├── engineer/    # Hover Lens pages
│   │   └── Index.tsx    # Landing
│   ├── components/
│   │   ├── admin/
│   │   ├── engineer/
│   │   ├── layout/      # SurveyProLayout, etc.
│   │   └── ui/          # shadcn components
│   ├── data/            # Mock job data
│   ├── App.tsx          # Routes
│   └── main.tsx
├── package.json
└── README.md
```

---

## Notes

- This is a **UI/frontend prototype**. API calls and real persistence are not implemented.
- Demo credentials: any non-empty email/password on customer or engineer login screens.
- Port may vary if 8080 is busy — check the Vite terminal output.
