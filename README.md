# English Therapy — Website

> **Experience English. Express You.**
> Full-stack website for [englishtherapy.com.bd](https://englishtherapy.com.bd): a React single-page application served by a Node.js / Express API, ready to deploy on Hostinger from GitHub.

## Contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [API](#api)
- [Deployment (Hostinger + GitHub)](#deployment)
- [Editing content](#editing-content)

## Tech stack

| Layer      | Technology                                                                     |
| ---------- | ------------------------------------------------------------------------------ |
| Frontend   | React 18, React Router 6, Vite 5, Zustand (UI state), jsPDF (invoice download) |
| Styling    | Hand-written CSS with design tokens (`--indigo`, `--gold`, `--cream`, `--ink`) |
| Fonts      | DM Sans + Space Grotesk (Google Fonts)                                          |
| Backend    | Node.js 18+, Express 4, Helmet, CORS, compression, rate limiting                |
| Storage    | JSON files in `backend/data/` (swap for a database in one module)              |
| Analytics  | Google Tag Manager + Meta Pixel (optional, via env)                             |

## Project structure

```
english-therapy/
├── frontend/                 # React + Vite single-page app
│   ├── public/               # Static assets served as-is
│   │   ├── brand/            # Logos, favicon, social cover
│   │   ├── images/           # books/, courses/, gallery/, icons/, press/, sections/
│   │   ├── pdf/              # Free downloads (practice book, prospectus)
│   │   └── video/            # Hero video
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Header, Footer, SeoHead, RouteLoader, ScrollToTop, WhatsAppFloat
│   │   │   ├── ui/           # Modal, SectionHeading, DistrictField
│   │   │   └── books/        # OrderModal, OrderInvoice
│   │   ├── pages/            # Home, Courses, OurStory, FAQ, Books, Contact, Experience, Quiz
│   │   ├── data/             # All page content (text, prices, links) — edit here
│   │   ├── hooks/            # useBodyScrollLock, useRotatingIndex
│   │   ├── lib/              # api, analytics, attribution, download, quiz helpers
│   │   ├── store/            # Zustand UI store
│   │   ├── styles/           # global.css, quiz.css
│   │   ├── App.jsx           # Routes + layout shell
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   └── vite.config.js
│
├── backend/                  # Express API + static host for the built frontend
│   ├── src/
│   │   ├── config/           # env loading
│   │   ├── routes/           # /api/health, /api/leads, /api/orders
│   │   ├── controllers/      # request handlers
│   │   ├── services/         # storage (JSON) + Google Sheets forwarding
│   │   ├── middleware/       # validation, admin key, error handling
│   │   ├── utils/            # logger, ids, time helpers
│   │   ├── app.js            # Express app factory
│   │   └── server.js         # Entry point
│   ├── data/                 # Runtime data (git-ignored)
│   └── .env.example
│
├── docs/                     # Deployment + architecture notes
├── .github/workflows/        # CI (build + lint on every push)
├── Resources/                # Original reference material (git-ignored)
├── package.json              # npm workspaces + root scripts
└── README.md
```

## Getting started

Requirements: **Node.js 18 or newer** (20 LTS recommended) and npm 9+.

```bash
# 1. Install every workspace (frontend + backend)
npm install

# 2. Create the backend environment file
cp backend/.env.example backend/.env

# 3. Start both apps in development
npm run dev
#   → frontend: http://localhost:5173  (proxies /api to the backend)
#   → backend:  http://localhost:5000
```

Production build and run (this is exactly what Hostinger executes):

```bash
npm run build     # builds frontend/dist
npm start         # Express serves the API and the built site on $PORT
```

## Available scripts

| Command                | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Frontend (Vite) + backend (nodemon) together                       |
| `npm run dev:frontend` | Vite dev server only                                               |
| `npm run dev:backend`  | Express with auto-reload only                                      |
| `npm run build`        | Production build of the frontend into `frontend/dist`              |
| `npm start`            | Start the production server (serves API + built frontend)          |
| `npm run lint`         | ESLint over the frontend                                           |

## Environment variables

Backend (`backend/.env`, see `backend/.env.example`):

| Variable            | Default            | Purpose                                                             |
| ------------------- | ------------------ | ------------------------------------------------------------------- |
| `PORT`              | `5000`             | Port to listen on (Hostinger injects its own)                       |
| `NODE_ENV`          | `development`      | Set to `production` on the server                                   |
| `CORS_ORIGINS`      | _(empty = any)_    | Comma-separated allowed origins for cross-domain API calls          |
| `FRONTEND_DIST`     | `../frontend/dist` | Where the built frontend lives                                      |
| `DATA_DIR`          | `./data`           | Folder for `leads.json` and `orders.json`                           |
| `GOOGLE_SCRIPT_URL` | _(empty)_          | Optional Google Apps Script URL to mirror submissions into a Sheet  |
| `ADMIN_API_KEY`     | _(empty)_          | Key required to read `/api/leads` and `/api/orders`                 |

Frontend (`frontend/.env`, see `frontend/.env.example`):

| Variable            | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| `VITE_API_BASE_URL` | Leave empty when the API is on the same domain (recommended) |
| `VITE_GTM_ID`       | Google Tag Manager container id (empty disables GTM)         |
| `VITE_FB_PIXEL_ID`  | Meta Pixel id (empty disables the pixel)                     |

## API

| Method | Endpoint       | Auth        | Body / notes                                                                 |
| ------ | -------------- | ----------- | ---------------------------------------------------------------------------- |
| GET    | `/api/health`  | –           | Liveness check                                                               |
| POST   | `/api/leads`   | –           | `{ formId, name, phone, email?, district?, type? }` — formId is `eBookAdmin`, `Free Workshop` or `QuizRegistrationAdmin` |
| GET    | `/api/leads`   | `x-api-key` | Lists leads, newest first (`?limit=&offset=`)                                |
| POST   | `/api/orders`  | –           | `{ product, quantity, name, phone, altPhone?, email?, district, address, deliveryNote? }` — totals are recalculated server-side |
| GET    | `/api/orders`  | `x-api-key` | Lists orders, newest first                                                   |

All responses are JSON: `{ ok: true, ... }` or `{ ok: false, message, errors? }`. Requests are rate-limited (120 per 15 minutes per IP).

## Deployment

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for the step-by-step Hostinger + GitHub guide. In short:

1. Push this repository to GitHub.
2. In Hostinger hPanel create a **Node.js** application connected to that repository.
3. Build command `npm install && npm run build`, start command `npm start`, entry `backend/src/server.js`.
4. Add the environment variables from `backend/.env.example`.
5. Every push to `main` redeploys automatically.

## Editing content

All copy, prices, course details, books, FAQ entries and contact details live in **`frontend/src/data/`** as plain JavaScript objects. Change a value there, commit, push, and the site updates. Images live in `frontend/public/images/` and are referenced by path from the same data files.

---

© English Therapy. All rights reserved · E = YOU²
