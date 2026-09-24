# Deploying to Hostinger (Node.js) from GitHub

This project is a single Node.js application: Express serves both the API (`/api/*`) and the built React site (everything else). That is the layout Hostinger's Node.js hosting expects.

## 1. Push the code to GitHub

```bash
git init
git add .
git commit -m "English Therapy website"
git branch -M main
git remote add origin https://github.com/<your-account>/english-therapy.git
git push -u origin main
```

`frontend/dist`, `node_modules`, `.env` files and `backend/data/*.json` are git-ignored, so only source code is pushed. The hero video (56 MB) and prospectus PDF (29 MB) are committed as regular files; both are under GitHub's 100 MB per-file limit.

## 2. Create the Node.js app in hPanel

1. Log in to **hPanel → Websites → Add website → Node.js** (on Business/Cloud plans this appears under *Web apps*; on VPS use the Node.js template).
2. Choose **Deploy from Git / GitHub**, authorise Hostinger and pick the repository and the `main` branch.
3. Fill in the build settings:

   | Setting          | Value                              |
   | ---------------- | ---------------------------------- |
   | Node version     | 20 (18 minimum)                    |
   | Root directory   | `/` (repository root)              |
   | Install command  | `npm install`                      |
   | Build command    | `npm run build`                    |
   | Start command    | `npm start`                        |
   | Entry file       | `backend/src/server.js`            |

   Hostinger injects `PORT`; the server reads it automatically.

4. Add environment variables (hPanel → your app → *Environment variables*):

   ```
   NODE_ENV=production
   CORS_ORIGINS=https://englishtherapy.com.bd,https://www.englishtherapy.com.bd
   ADMIN_API_KEY=<a long random string>
   GOOGLE_SCRIPT_URL=<optional Apps Script URL to mirror leads into Google Sheets>
   ```

5. Click **Deploy**. Hostinger clones the repo, runs the install + build commands and starts the server. Subsequent pushes to `main` trigger a redeploy automatically (enable *Auto deploy* if it is off).

## 3. Point the domain

In hPanel → *Domains*, attach `englishtherapy.com.bd` (and `www`) to the Node.js app and enable the free SSL certificate. Hostinger's proxy forwards HTTPS traffic to the app on the injected port.

## 4. Verify

```
https://englishtherapy.com.bd/api/health   → {"ok":true,...}
https://englishtherapy.com.bd/courses      → renders the Courses page (SPA fallback)
```

## Where submissions go

- Every lead and order is appended to `backend/data/leads.json` / `backend/data/orders.json` on the server.
- Read them with the admin key:

  ```bash
  curl -H "x-api-key: <ADMIN_API_KEY>" https://englishtherapy.com.bd/api/orders
  ```

- If `GOOGLE_SCRIPT_URL` is set, each submission is also POSTed to that Apps Script as form-data with the same column names the original site used (`Name`, `Mobile Number`, `District`, `formId`, …), so an existing Google Sheet keeps working.
- To move to a real database later, replace `backend/src/services/storage.service.js` only; controllers and routes stay unchanged.

## Alternative: VPS with PM2

```bash
git clone https://github.com/<your-account>/english-therapy.git
cd english-therapy
npm install && npm run build
cp backend/.env.example backend/.env   # edit values
npm i -g pm2
pm2 start backend/src/server.js --name english-therapy
pm2 save && pm2 startup
```

Put Nginx in front as a reverse proxy to port 5000 and add SSL with Certbot.

## Rolling back

Hostinger keeps previous deployments; pick an earlier commit in the app's *Deployments* tab, or `git revert` the commit and push.
