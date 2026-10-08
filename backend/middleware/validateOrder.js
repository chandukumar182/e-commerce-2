export default function validateOrder(req, res, next) {
  const { customer: c, items } = req.body || {};
  const bad = (message) => res.status(400).json({ message });
  if (!c || !c.name || c.name.trim().length < 2) return bad('Enter your full name.');
  if (!/^[6-9]\d{9}$/.test(c.phone || '')) return bad('Enter a valid 10-digit mobile number.');
  if (!c.address || c.address.trim().length < 10) return bad('Enter your full delivery address.');
  if (!['UPI', 'Card', 'COD'].includes(c.method)) return bad('Choose a payment method.');
  if (!Array.isArray(items) || !items.length ||
      items.some((i) => !Number.isInteger(i.id) || !Number.isInteger(i.qty) || i.qty < 1))
    return bad('Your cart is empty.');
  next();
}
