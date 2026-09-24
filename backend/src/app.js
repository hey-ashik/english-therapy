const fs = require('node:fs');
const path = require('node:path');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const logger = require('./utils/logger');

function createApp() {
  const app = express();

  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  // --- Security & performance -------------------------------------------------
  app.use(
    helmet({
      // The SPA embeds YouTube / Google Maps and loads fonts + analytics from third parties,
      // so a strict CSP would break the site. Keep the other Helmet protections.
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
  app.use(compression());
  app.use(
    cors((req, callback) => {
      const origin = req.headers.origin;
      // Browsers send an Origin header on POST even for same-origin requests, so compare it
      // against the Host the request arrived on (works on the Hostinger preview domain too).
      let sameOrigin = false;
      if (origin) {
        try {
          sameOrigin = new URL(origin).host === req.headers.host;
        } catch {
          sameOrigin = false;
        }
      }
      const allowed =
        !origin || sameOrigin || env.corsOrigins.length === 0 || env.corsOrigins.includes(origin);
      // origin:false simply omits the CORS headers, so the browser blocks cross-site callers
      // without the server throwing a 500 for every disallowed request.
      callback(null, { origin: allowed });
    }),
  );
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: false, limit: '100kb' }));
  app.use(morgan(env.isProduction ? 'combined' : 'dev'));

  // --- API --------------------------------------------------------------------
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 120,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { ok: false, message: 'Too many requests. Please try again in a few minutes.' },
  });
  app.use('/api', apiLimiter, apiRoutes);

  // --- Static frontend (production) ------------------------------------------
  const indexFile = path.join(env.frontendDist, 'index.html');
  if (fs.existsSync(indexFile)) {
    app.use(
      express.static(env.frontendDist, {
        index: false,
        maxAge: '1y',
        setHeaders(res, filePath) {
          // Never cache the HTML shell so deployments are picked up immediately.
          if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
        },
      }),
    );

    // SPA fallback: every non-API route renders index.html and React Router takes over.
    app.get(/^(?!\/api\/).*/, (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(indexFile);
    });
  } else {
    logger.warn(`Frontend build not found at ${env.frontendDist}. Run "npm run build" to serve the website.`);
  }

  // --- Errors -----------------------------------------------------------------
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
