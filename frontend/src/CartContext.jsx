import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext();
export const useCart = () => useContext(Ctx);
export const money = (n) => '₹' + n.toLocaleString('en-IN');

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kl_cart')) || []; } catch { return []; }
  });
  useEffect(() => localStorage.setItem('kl_cart', JSON.stringify(items)), [items]);

  const add = (p) => setItems((l) =>
    l.find((i) => i.id === p.id)
      ? l.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      : [...l, { id: p.id, name: p.name, price: p.price, emoji: p.emoji, qty: 1 }]);
  const change = (id, d) => setItems((l) =>
    l.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));
  const clear = () => setItems([]);

  const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = sub === 0 || sub >= 999 ? 0 : 49;
  const gst = Math.round(sub * 0.18);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, change, clear, sub, ship, gst, total: sub + ship + gst, count }}>
      {children}
    </Ctx.Provider>
  );
}
