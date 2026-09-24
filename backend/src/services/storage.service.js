const fs = require('node:fs/promises');
const path = require('node:path');

const env = require('../config/env');

/**
 * Simple append-only JSON storage. Each collection is one file:
 *   <DATA_DIR>/<collection>.json   ->  [ {...}, {...} ]
 *
 * Swap this module for a database client (MySQL, MongoDB, PostgreSQL)
 * without touching the controllers.
 */
const queues = new Map();

function filePath(collection) {
  return path.join(env.dataDir, `${collection}.json`);
}

async function readCollection(collection) {
  try {
    const raw = await fs.readFile(filePath(collection), 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeCollection(collection, records) {
  await fs.mkdir(env.dataDir, { recursive: true });
  const target = filePath(collection);
  const temp = `${target}.tmp`;
  await fs.writeFile(temp, JSON.stringify(records, null, 2), 'utf8');
  await fs.rename(temp, target);
}

/** Serialises writes per collection so concurrent requests cannot clobber the file. */
function withLock(collection, task) {
  const previous = queues.get(collection) || Promise.resolve();
  const next = previous.then(task, task);
  queues.set(collection, next.catch(() => {}));
  return next;
}

async function insert(collection, record) {
  return withLock(collection, async () => {
    const records = await readCollection(collection);
    records.push(record);
    await writeCollection(collection, records);
    return record;
  });
}

async function list(collection, { limit = 100, offset = 0 } = {}) {
  const records = await readCollection(collection);
  const sorted = [...records].reverse();
  return { total: records.length, items: sorted.slice(offset, offset + limit) };
}

module.exports = { insert, list };
