import { useCart, money } from '../CartContext.jsx';

export default function CartItem({ item }) {
  const { change } = useCart();
  return (
    <div className="row">
      <div className="emoji">{item.emoji}</div>
      <div className="grow">
        <div>{item.name}</div>
        <div className="muted">{money(item.price)}</div>
      </div>
      <div className="qty">
        <button onClick={() => change(item.id, -1)} aria-label="Decrease">−</button>
        <span>{item.qty}</span>
        <button onClick={() => change(item.id, 1)} aria-label="Increase">+</button>
      </div>
    </div>
  );
}

// Price breakdown, used on the cart, checkout and payment pages
export function Summary() {
  const { sub, ship, gst, total } = useCart();
  return (
    <div className="sum">
      <div><span>Subtotal</span><span>{money(sub)}</span></div>
      <div><span>Delivery</span><span>{ship ? money(ship) : 'Free'}</span></div>
      <div><span>GST (18%)</span><span>{money(gst)}</span></div>
      <div className="tot"><span>Total</span><span>{money(total)}</span></div>
    </div>
  );
}
