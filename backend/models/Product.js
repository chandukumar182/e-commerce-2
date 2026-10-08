import db from '../config/db.js';

export const findAll = ({ q = '', category = '' }) =>
  db.prepare("SELECT * FROM products WHERE name LIKE ? AND (? = '' OR category = ?) ORDER BY id")
    .all(`%${q}%`, category, category);

export const findById = (id) => db.prepare('SELECT * FROM products WHERE id = ?').get(id);
