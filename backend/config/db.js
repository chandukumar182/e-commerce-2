import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(path.join(dir, '..', 'ecommerce.db'));

// First run: build tables and sample products from database/ecommerce.sql
const ready = db.prepare("SELECT name FROM sqlite_master WHERE name='products'").get();
if (!ready) db.exec(fs.readFileSync(path.join(dir, '..', '..', 'database', 'ecommerce.sql'), 'utf8'));

export default db;