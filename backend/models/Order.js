import db from '../config/db.js';

export const STAGES = ['Placed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];
const STAGE_MS = 20000; // demo speed: one stage every 20 seconds

const itemsOf = (id) =>
  db.prepare('SELECT product_id, name, price, quantity FROM order_items WHERE order_id = ?').all(id);

const withStatus = (o) => ({
  ...o,
  items: itemsOf(o.id).map((i) => ({ ...i })),
  stages: STAGES,
  stage: Math.min(STAGES.length - 1, Math.floor((Date.now() - o.created_at) / STAGE_MS)),
});

export const create = (customer, items, total) => {
  db.exec('BEGIN');
  try {
    const count = db.prepare('SELECT COUNT(*) AS c FROM orders').get().c;
    const code = 'KL-' + (1001 + count);
    const info = db.prepare(
      `INSERT INTO orders (order_code, customer_name, phone, address, payment_method, payment_status, total, created_at)
       VALUES (?,?,?,?,?,?,?,?)`
    ).run(code, customer.name.trim(), customer.phone, customer.address.trim(), customer.method,
          customer.method === 'COD' ? 'Pending' : 'Paid', total, Date.now());
    const add = db.prepare('INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?,?,?,?,?)');
    items.forEach((i) => add.run(info.lastInsertRowid, i.id, i.name, i.price, i.qty));
    db.exec('COMMIT');
    return code;
  } catch (e) {
    db.exec('ROLLBACK');
    throw e;
  }
};

export const findByCode = (code) => {
  const o = db.prepare('SELECT * FROM orders WHERE order_code = ? COLLATE NOCASE').get(code);
  return o ? withStatus({ ...o }) : null;
};

export const findAll = () =>
  db.prepare('SELECT * FROM orders ORDER BY id DESC').all().map((o) => withStatus({ ...o }));