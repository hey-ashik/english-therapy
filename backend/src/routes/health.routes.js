const { Router } = require('express');

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'english-therapy-api',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
