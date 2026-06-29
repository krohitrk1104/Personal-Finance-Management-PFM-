# FinanceHub Frontend

React + Vite frontend for the FinanceHub personal finance management dashboard.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React icons

## Current Pages

- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/profile-setup` - Financial profile setup
- `/connect-bank` - Bank account connection UI
- `/dashboard` - Dashboard overview
- `/budgets` - Placeholder
- `/transactions` - Placeholder
- `/analytics` - Placeholder
- `/settings` - Placeholder

## Folder Structure

```txt
src/
  api/
    axiosClient.js
    authApi.js
  components/
    layout/
    ui/
  context/
    AuthContext.jsx
    authContextValue.js
  data/
    banksData.js
    dashboardData.js
    landingData.js
  pages/
  routes/
  utils/
```

## Environment Variables

Create `client/Pfm-UI/.env`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_APP_NAME=FinanceHub
```

Only variables prefixed with `VITE_` are exposed to the browser.

Do **not** put backend secrets such as `JWT_SECRET`, `MONGODB_URL`, or `PLAID_SECRET` in the frontend `.env`.

## Install

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Default local URL:

```txt
http://127.0.0.1:5173
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Backend Integration Status

Currently connected to backend:

- Register API: `POST /api/auth/register`
- Login API: `POST /api/auth/login`
- JWT stored in browser storage
- Protected dashboard routes

Still using mock frontend data:

- Dashboard cards
- Spending breakdown
- Monthly chart
- Recent transactions
- Linked bank accounts
- Bank balances
- Budget progress
- Savings goals
- AI insights

## Chart Status

The dashboard currently uses simple CSS/SVG charts. Recharts is not installed yet.

Recommended chart package:

```bash
npm install recharts
```

Suggested Recharts components:

- `PieChart` for spending by category.
- `BarChart` for monthly income vs spending.
- `LineChart` for net worth trend.

The best backend endpoint for these charts is:

```txt
GET /api/dashboard/summary
```

Expected response shape:

```json
{
  "metrics": {
    "totalBalance": 47832.54,
    "monthlyIncome": 6450,
    "monthlySpending": 3218.76,
    "savingsRate": 50.1
  },
  "accounts": [
    {
      "id": "account_id",
      "name": "State Bank of India",
      "type": "savings",
      "balance": 24000,
      "currency": "INR"
    }
  ],
  "recentTransactions": [],
  "spendingByCategory": [],
  "monthlySummary": [],
  "budgetProgress": [],
  "goalProgress": []
}
```

## Next Frontend Tasks

- Replace mock dashboard data with API calls.
- Add loading, empty, and error states for dashboard widgets.
- Build full pages for budgets, transactions, analytics, and settings.
- Add Recharts for interactive charts.
- Add bank connection flow using backend Plaid endpoints.
- Display real connected accounts and balances from `GET /api/accounts`.
