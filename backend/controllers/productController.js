import * as Product from '../models/Product.js';

export const listProducts = (req, res) => res.json(Product.findAll(req.query));

export const getProduct = (req, res) => {
  const p = Product.findById(Number(req.params.id));
  if (!p) return res.status(404).json({ message: 'Product not found.' });
  res.json(p);
};
