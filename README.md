# CampusCore - Multi-Tenant School ERP Platform

A modern, scalable multi-tenant School ERP SaaS platform built with **Next.js 14**, **Supabase (PostgreSQL)**, **Clerk Authentication**, and **Razorpay**. 

Ready to manage unlimited schools, teachers, students, and parents with isolated environments.

## Architecture & Features

- **Multi-Tenant Architecture**: Data isolation implemented using `school_id` and Supabase Row Level Security (RLS).
- **Role-Based Access Control (RBAC)**: Separated dashboards and routes for Admin, Teacher, Student, and Parent, protected via Clerk Middleware.
- **Admin Module**: Manage students, teachers, classes, subjects, fee payments, and publish school-wide announcements.
- **Teacher Module**: Manage schedules, take daily attendance, create assignments, and enter exam marks.
- **Student Module**: Access timetables, submit assignments, view exam results, and check attendance.
- **Parent Portal**: Track multiple dependents, view academic progress, and securely pay school invoices via Razorpay integration (supporting UPI, Cards, NetBanking).

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Charts**: Recharts for attendance and revenue visualizations.
- **Backend & Database**: Supabase PostgreSQL.
- **Auth**: Clerk (Role-based authentication).
- **Payments**: Razorpay.
- **Deployment**: Vercel.

## Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/your-username/campuscore.git
cd campuscore
npm install
```

### 2. Environment Variables
Copy the `env.example` file to `.env.local`:
```bash
cp env.example .env.local
```
Fill in the configuration variables from Clerk, Supabase, and Stripe.

### 3. Database Initialization
Go to your Supabase project's SQL editor and execute the `database/schema.sql` file. This establishes the complete database layout, foreign relations, and multi-tenant indexes. 

*Make sure to configure Row Level Security (RLS) in Supabase based on your Clerk JWT integration to ensure data isolation.*

### 4. Run Locally
```bash
npm run dev
```

## Vercel Deployment Instructions

1. Push your repository to GitHub.
2. Sign in or create a Vercel account.
3. Click **Add New Project** and select your GitHub repository.
4. Set the **Framework Preset** to Next.js.
5. Under **Environment Variables**, configure all variables found in your `.env.local` file (Clerk keys, Supabase URLs, Razorpay secrets).
6. Click **Deploy**. Vercel will build the application, and handle the App Router and API routes perfectly!

## License
MIT License
