# Personal Finance Management Dashboard

FinanceHub is a MERN personal finance management dashboard for tracking income, expenses, budgets, linked bank accounts, net worth, savings goals, and occupation-specific financial insights.

The app supports three main user categories:

- `salaried` users who need salary, bills, savings, and investment tracking.
- `business` users who need revenue, expense, GST, vendor/client, and current-account tracking.
- `student` users who need allowance, family support, simple budgets, and education goals.

## Tech Stack

- **MongoDB**: database for users, accounts, transactions, goals, clients, and transaction groups.
- **Express.js**: REST API server.
- **React**: frontend UI.
- **Node.js**: server runtime.
- **Tailwind CSS**: frontend styling.
- **Vite**: frontend build tool.

## Project Structure

```txt
PFM(P-01)/
  client/
    Pfm-UI/
      src/
        api/
        components/
        context/
        data/
        pages/
        routes/
        utils/
  server/
    src/
      controllers/
      db/
      middlewares/
      models/
      routes/
      services/
      utils/
```

## Current Status

Frontend pages completed first:

- Landing page
- Login page
- Registration page
- Profile setup page
- Connect bank page
- Dashboard page
- Placeholder routes for budgets, transactions, analytics, and settings

Backend currently connected:

- `POST /api/auth/register`
- `POST /api/auth/login`
- MongoDB connection
- JWT generation
- Mongoose models for users, accounts, transactions, transaction groups, goals, and clients

Backend still required:

- Auth middleware implementation
- Profile read/update API
- Account CRUD API
- Plaid bank-link API
- Transaction sync/import API
- Dashboard summary API
- Budget API
- Goal API
- Analytics API

## Environment Variables

Create `server/.env`:

```env
PORT=4000
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>
JWT_SECRET=replace_with_long_random_secret
JWT_EXPIRES_IN=7d

# Frontend origin for CORS
CLIENT_URL=http://127.0.0.1:5173

# Plaid sandbox configuration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_sandbox_secret
PLAID_ENV=sandbox
PLAID_PRODUCTS=transactions
PLAID_COUNTRY_CODES=US
PLAID_REDIRECT_URI=

# Optional email / OTP configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Create `client/Pfm-UI/.env`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=FinanceHub
```
## Install and Run

Install backend dependencies:

```bash
cd server
npm init -y
```

Start backend:

```bash
node server.js
```

Install frontend dependencies:

```bash
cd client/Pfm-UI
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend default URL:

```txt
http://127.0.0.1:5173
```

Backend default URL:

```txt
http://localhost:4000
```

## API Plan Needed For Full Functionality

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Profile

- `GET /api/users/me`
- `PATCH /api/users/me`
- Store `phone`, `currency`, `location`, `dateOfBirth`, occupation-specific profile fields, financial goals, and risk comfort.

### Plaid / Bank Connection

- `POST /api/plaid/create-link-token`
- `POST /api/plaid/exchange-public-token`
- `GET /api/accounts`
- `POST /api/accounts/sync`
- Store Plaid `item_id` and encrypted `access_token`.
- Never expose Plaid secrets to the frontend.

### Transactions

- `GET /api/transactions`
- `POST /api/transactions`
- `PATCH /api/transactions/:id`
- `DELETE /api/transactions/:id`
- Support filters by account, category, date range, transaction type, and status.

### Dashboard

- `GET /api/dashboard/summary`
- Return total balance, monthly income, monthly spending, savings rate, account balances, recent transactions, spending by category, monthly summary chart data, budget progress, goal progress, and AI insights.

### Budgets and Goals

- `GET /api/budgets`
- `POST /api/budgets`
- `PATCH /api/budgets/:id`
- `DELETE /api/budgets/:id`
- `GET /api/goals`
- `POST /api/goals`
- `PATCH /api/goals/:id`
- `DELETE /api/goals/:id`

## Dashboard Chart Status

The current frontend dashboard uses mock data and lightweight CSS/SVG charts. It does **not** yet use Recharts, and there is no backend summary endpoint yet.

Recommended next step:

- Add `recharts` to the frontend.
- Create `GET /api/dashboard/summary` on the backend.
- Replace mock dashboard data with API data.
- Use Recharts for:
  - Pie chart: spending breakdown by category.
  - Bar chart: monthly income vs spending.
  - Line chart: net worth trend.

## Connected Accounts Status

The current UI displays a static/mock list of connected accounts and balances. It is not yet functionally connected to the backend.

To make it functional:

- Add account routes and controllers.
- Save linked accounts in the `Account` model.
- Add Plaid link-token and token-exchange endpoints.
- Fetch real accounts with `GET /api/accounts`.
- Display balances from MongoDB/Plaid sync instead of mock frontend data.