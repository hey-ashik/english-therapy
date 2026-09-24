const { Router } = require('express');

const healthRoutes = require('./health.routes');
const leadsRoutes = require('./leads.routes');
const ordersRoutes = require('./orders.routes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/leads', leadsRoutes);
router.use('/orders', ordersRoutes);

module.exports = router;
