const storage = require('../services/storage.service');
const sheets = require('../services/sheets.service');
const logger = require('../utils/logger');
const { createId } = require('../utils/id');
const { dhakaTimestamp } = require('../utils/time');

/**
 * POST /api/leads
 * Accepts eBook downloads, free workshop registrations and quiz registrations.
 */
async function createLead(req, res, next) {
  try {
    const data = req.validated;
    const lead = {
      id: createId('LEAD'),
      formId: data.formId,
      name: data.name,
      phone: data.phone,
      email: data.email,
      district: data.district,
      type: data.type,
      attribution: req.body.attribution || {},
      submittedAt: data.submittedAt || dhakaTimestamp(),
      createdAt: new Date().toISOString(),
      ip: req.ip,
      userAgent: req.get('user-agent') || '',
    };

    await storage.insert('leads', lead);
    logger.info('Lead received', { id: lead.id, formId: lead.formId, district: lead.district });

    // Fire-and-forget: mirror to Google Sheets when configured.
    sheets.forwardToSheet({
      formId: lead.formId,
      Name: lead.name,
      'Mobile Number': lead.phone,
      Email: lead.email,
      District: lead.district,
      Type: lead.type,
      'Date & Time': lead.submittedAt,
    });

    res.status(201).json({ ok: true, id: lead.id });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/leads  (admin)
 */
async function listLeads(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 100, 500);
    const offset = Number(req.query.offset) || 0;
    const result = await storage.list('leads', { limit, offset });
    res.json({ ok: true, ...result });
  } catch (error) {
    next(error);
  }
}

module.exports = { createLead, listLeads };
