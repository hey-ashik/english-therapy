const { Router } = require('express');

const { createLead, listLeads } = require('../controllers/leads.controller');
const { validate } = require('../middleware/validate');
const { requireAdminKey } = require('../middleware/requireAdminKey');

const router = Router();

const leadSchema = {
  formId: { required: true, max: 60, oneOf: ['eBookAdmin', 'Free Workshop', 'QuizRegistrationAdmin'] },
  name: { required: true, max: 120 },
  phone: { required: true, max: 30, type: 'phone' },
  email: { required: false, max: 160, type: 'email' },
  district: { required: false, max: 60 },
  type: { required: false, max: 30 },
  submittedAt: { required: false, max: 60 },
};

router.post('/', validate(leadSchema), createLead);
router.get('/', requireAdminKey, listLeads);

module.exports = router;
