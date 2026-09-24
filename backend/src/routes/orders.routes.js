const { Router } = require('express');

const { createOrder, listOrders } = require('../controllers/orders.controller');
const { validate } = require('../middleware/validate');
const { requireAdminKey } = require('../middleware/requireAdminKey');

const router = Router();

const orderSchema = {
  orderNumber: { required: false, max: 40 },
  product: { required: true, max: 120 },
  quantity: { required: true, type: 'number', default: 1 },
  name: { required: true, max: 120 },
  phone: { required: true, max: 30, type: 'phone' },
  altPhone: { required: false, max: 30 },
  email: { required: false, max: 160, type: 'email' },
  district: { required: true, max: 60 },
  address: { required: true, max: 300 },
  deliveryNote: { required: false, max: 500 },
  submittedAt: { required: false, max: 60 },
};

router.post('/', validate(orderSchema), createOrder);
router.get('/', requireAdminKey, listOrders);

module.exports = router;
