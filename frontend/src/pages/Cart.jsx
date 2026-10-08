import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import CartItem, { Summary } from '../components/CartItem.jsx';

export default function Cart() {
  const { items } = useCart();
  const nav = useNavigate();
  return (
    <div className="page narrow">
      <h2>Your cart</h2>
      {items.length ? (
        <>
          {items.map((i) => <CartItem key={i.id} item={i} />)}
          <Summary />
          <button className="btn wide" onClick={() => nav('/checkout')}>Proceed to checkout</button>
        </>
      ) : (
        <p className="empty">Your cart is empty. <Link to="/products">Browse products</Link></p>
      )}
    </div>
  );
}
