# Easy Business Management

A simple business management application for tracking inventory, generating invoices, managing sales, and keeping your finances organized.

## Features

- ✅ **Business & Outlet Management** — Create, view, update, and delete businesses and their outlets with full search, sort, and pagination
- ✅ **Authentication** — Login, registration, password reset, email verification, and two-factor authentication (2FA)
- ✅ **User Settings** — Profile editing, password management, appearance/theme preferences
- 🔜 **Product Management** — Define and manage products that your business sells
- 🔜 **Inventory Tracking** — Monitor stock levels across outlets based on your products
- 🔜 **Invoice Generation** — Create and manage invoices for customers
- 🔜 **Sales Reports** — View sales data and generate reports
- 🔜 **Financial Tracking** — Monitor cash, assets, payables, and receivables
- 🔜 **Dashboard** — Real-time overview of your business data

## Tech Stack

- **Backend:** Laravel 12, PHP 8.3, Fortify, Wayfinder
- **Frontend:** React 19, Inertia.js v2, Tailwind CSS v4, shadcn/ui
- **Testing:** Pest v4, PHPUnit v12

## Requirements

- PHP 8.3+
- Node.js 18+
- Composer

## Getting Started

```bash
git clone https://github.com/simply-samin/easy-business-management.git
cd easy-business-management
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

The app will be available at `http://localhost:8000`.
