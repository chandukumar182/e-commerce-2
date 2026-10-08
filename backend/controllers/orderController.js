import * as Order from '../models/Order.js';
import * as Product from '../models/Product.js';

export const createOrder = (req, res) => {
  const { customer, items } = req.body;
  // Prices are read from the database, never trusted from the browser
  const priced = items.map((i) => {
    const p = Product.findById(i.id);
    if (!p) throw Object.assign(new Error(`Product ${i.id} not found.`), { status: 400 });
    return { id: p.id, name: p.name, price: p.price, qty: i.qty };
  });
  const sub = priced.reduce((s, i) => s + i.price * i.qty, 0);
  const total = sub + (sub >= 999 ? 0 : 49) + Math.round(sub * 0.18);
  const code = Order.create(customer, priced, total);
  res.status(201).json(Order.findByCode(code));
};

export const listOrders = (req, res) => res.json(Order.findAll());

export const trackOrder = (req, res) => {
  const o = Order.findByCode(req.params.code);
  if (!o) return res.status(404).json({ message: 'No order found with that ID. Check the ID and try again.' });
  res.json(o);
};
