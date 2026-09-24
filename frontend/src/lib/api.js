import { getAttribution } from './attribution.js';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/**
 * Formats the current time in Bangladesh time (Asia/Dhaka).
 */
export function dhakaTimestamp() {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  }).format(new Date());
}

async function post(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, attribution: getAttribution() }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

/**
 * Submit a lead (eBook download, workshop registration, quiz registration).
 * @param {'eBookAdmin'|'Free Workshop'|'QuizRegistrationAdmin'} formId
 */
export function submitLead(formId, fields) {
  return post('/api/leads', {
    formId,
    ...fields,
    submittedAt: dhakaTimestamp(),
  });
}

/**
 * Submit a book order (cash on delivery).
 */
export function submitOrder(order) {
  return post('/api/orders', {
    formId: 'Book Orders',
    ...order,
    submittedAt: dhakaTimestamp(),
  });
}
