# Architecture notes

## Request flow (production)

```
Browser ──HTTPS──▶ Hostinger proxy ──▶ Express (backend/src/server.js)
                                          ├── /api/health, /api/leads, /api/orders   (JSON API)
                                          ├── /assets/*, /images/*, /video/*, …      (static, 1-year cache)
                                          └── /*  → frontend/dist/index.html         (SPA fallback, no-cache)
                                                     └── React Router renders the page client-side
```

## Frontend

- **Routing** – `src/App.jsx` declares all routes. Pages are lazy-loaded so each route is its own chunk; `RouteLoader` is the Suspense fallback and `PageTransitionLoader` (thin top bar) shows for 450 ms on every navigation.
- **SEO** – `SeoHead` rewrites `<title>`, description, Open Graph, Twitter and canonical tags per route from `src/data/seo.js`.
- **Content** – every string, price, link and image path lives in `src/data/*.js`. Components only render data.
- **Forms** – `lib/api.js` POSTs JSON to the backend and attaches attribution (landing page, referrer, UTM). Lead forms never block the user on API errors: the download / redirect still happens.
- **Analytics** – `lib/analytics.js` lazily injects GTM and Meta Pixel when ids are set, pushes `page_view`, `Lead` and custom events (`course_enroll_click`, `book_order_submit`, `quiz_complete`, …).
- **Quiz** – one attempt per browser, enforced with a cookie; registration name is remembered in `sessionStorage` for the greeting.
- **Styling** – `styles/global.css` holds the full design system (tokens, sections, modals, responsive rules at 1000px / 900px / 760px). `styles/quiz.css` is loaded only with the quiz route.

## Backend

- `app.js` builds the Express app: Helmet, compression, CORS allow-list, JSON body limit, request logging, rate limiting on `/api`, static hosting of the built frontend with SPA fallback, and a JSON error handler.
- `routes/` → `controllers/` → `services/` layering. Validation schemas sit next to the routes (`middleware/validate.js`).
- `services/storage.service.js` is a per-collection, lock-serialised JSON file store. It exposes only `insert` and `list`, so replacing it with MySQL/Mongo is a one-file change.
- `services/sheets.service.js` optionally mirrors submissions to a Google Apps Script (fire-and-forget, 8 s timeout, never throws).
- Order totals (unit price 499৳, shipping 70৳ inside Dhaka / 99৳ outside) are recomputed on the server; client values are never trusted.
