const storage = require('../services/storage.service');
const sheets = require('../services/sheets.service');
const logger = require('../utils/logger');
const { createId } = require('../utils/id');
const { dhakaTimestamp } = require('../utils/time');

const BOOK_PRICE = 499;
const SHIPPING_INSIDE_DHAKA = 70;
const SHIPPING_OUTSIDE_DHAKA = 99;

/**
 * POST /api/orders
 * Cash-on-delivery book orders. Totals are recalculated server-side.
 */
async function createOrder(req, res, next) {
  try {
    const data = req.validated;
    const quantity = Math.min(Math.max(Math.round(data.quantity) || 1, 1), 20);
    const insideDhaka = data.district === 'Dhaka';
    const shipping = insideDhaka ? SHIPPING_INSIDE_DHAKA : SHIPPING_OUTSIDE_DHAKA;
    const subtotal = BOOK_PRICE * quantity;
    const total = subtotal + shipping;

    const order = {
      id: createId('ORD'),
      orderNumber: data.orderNumber || createId('ET'),
      status: 'pending',
      product: data.product,
      quantity,
      unitPrice: BOOK_PRICE,
      subtotal,
      shipping,
      shippingMethod: `Delivery Charge (${insideDhaka ? 'Inside' : 'Outside'} Dhaka)`,
      total,
      currency: 'BDT',
      paymentMethod: 'Cash on delivery',
      customer: {
        name: data.name,
        phone: data.phone,
        altPhone: data.altPhone,
        email: data.email,
        district: data.district,
        address: data.address,
        deliveryNote: data.deliveryNote,
      },
      attribution: req.body.attribution || {},
      submittedAt: data.submittedAt || dhakaTimestamp(),
      createdAt: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('user-agent') || '',
    };

    await storage.insert('orders', order);
    logger.info('Order received', { id: order.id, product: order.product, total: order.total });

    sheets.forwardToSheet({
      formId: 'Book Orders',
      'Full Name': order.customer.name,
      'Phone number': order.customer.phone,
      'Alternative Mobile Number': order.customer.altPhone,
      'Email Address': order.customer.email,
      District: order.customer.district,
      'Street address': order.customer.address,
      'Delivery Note': order.customer.deliveryNote,
      'Product name': order.product,
      Quantity: order.quantity,
      'Product subtotal': order.subtotal.toFixed(2),
      'Shipping charge': order.shipping.toFixed(2),
      'Total amount': order.total.toFixed(2),
      'Shipping method / Delivery area': order.shippingMethod,
      'Date & Time': order.submittedAt,
    });

    res.status(201).json({
      ok: true,
      id: order.id,
      orderNumber: order.orderNumber,
      totals: { subtotal, shipping, total, currency: 'BDT' },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/orders  (admin)
 */
async function listOrders(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 100, 500);
    const offset = Number(req.query.offset) || 0;
    const result = await storage.list('orders', { limit, offset });
    res.json({ ok: true, ...result });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, listOrders };
