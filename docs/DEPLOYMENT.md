# Deployment Configuration

This document contains all the deployment details, URLs, and environment variables for the **hazman5540** project after its migration to the Cloudflare-native stack (Pages + Workers + D1).

## 1. Architecture Overview

- **Frontend**: Vue 3 SPA hosted on Cloudflare Pages
- **Backend API**: Hono framework hosted on Cloudflare Workers
- **Database**: Cloudflare D1 (Serverless SQLite)
- **Photo Storage**: External storage at `https://storage.bijokdev.com`

---

## 2. Live URLs

| Service | URL | Notes |
|---------|-----|-------|
| **Frontend (Production)** | [https://hazman5540.pages.dev](https://hazman5540.pages.dev) | The main portfolio and portal. |
| **Backend API (Production)** | `https://hazman5540.hazman5001.workers.dev` | Handles all `/api/*` requests. *Note: `.workers.dev` domains may be blocked by some local adblockers or antivirus.* |

---

## 3. Cloudflare D1 Database

All project data (Attendance, Birthdays, Org Charts, Photo Collections, Family, Office) is consolidated into a single D1 database.

- **Database Name**: `hazman5540db`
- **Database ID**: `fdae8e3e-4eb6-4a0b-8d24-2e72b2d72133`
- **Region**: APAC (Singapore)

### Useful Database Commands (Run in `backend/` directory)

```bash
# Run migrations locally
npm run db:migrate:local

# Run migrations in production
npm run db:migrate

# Open local database studio (D1)
npx wrangler d1 studio hazman5540db --local
```

---

## 4. Environment Variables & Secrets

### Frontend Environment Variables (`frontend/.env.production`)
These are used during the `npm run build` step for Cloudflare Pages.

```env
VITE_API_URL=https://hazman5540.hazman5001.workers.dev
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

### Backend Secrets (Cloudflare Workers)
These are securely stored in Cloudflare and are **not** committed to Git. They are required for the Hono backend to function.

| Secret Name | Purpose | How to Set |
|-------------|---------|------------|
| `JWT_SECRET` | Used to securely sign and verify JWT tokens for auth. | `npx wrangler secret put JWT_SECRET` |
| `GOOGLE_CLIENT_ID` | Validates Google OAuth `idToken` during login. | `npx wrangler secret put GOOGLE_CLIENT_ID` |

---

## 5. Deployment Commands

### Deploy Frontend (Cloudflare Pages)
The frontend uses Wrangler to build and deploy directly to Cloudflare Pages.

```bash
cd frontend
npm run build
npx wrangler pages deploy dist --project-name=hazman5540 --branch=main
```

### Deploy Backend (Cloudflare Workers)
The backend uses Wrangler to bundle and upload the Worker script.

```bash
cd backend
npx wrangler deploy
```

---

## 6. Known Issues / Important Notes

1. **Local DNS Blocking**: If the backend API `https://hazman5540.hazman5001.workers.dev` returns `ERR_CONNECTION_REFUSED` on your local network, it is because security software or DNS adblockers (like Pi-hole, AdGuard) often block the `workers.dev` domain. 
   - **Solution**: Bind a custom domain (e.g., `api.yourdomain.com`) to the Worker in the Cloudflare Dashboard.

2. **Google OAuth Configuration**: For Google Sign-In to work, you must add `https://hazman5540.pages.dev` and `http://localhost:8080` to your **Authorized JavaScript origins** in the Google Cloud Console.
