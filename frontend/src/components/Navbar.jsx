import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

export default function Navbar() {
  const { count } = useCart();
  return (
    <header className="nav">
      <div className="bar">
        <Link to="/" className="logo">Kart<span>ly</span></Link>
        <nav>
          <NavLink to="/products">Shop</NavLink>
          <NavLink to="/orders">My orders</NavLink>
          <NavLink to="/track">Track</NavLink>
          <NavLink to="/cart">Cart <b className="badge">{count}</b></NavLink>
        </nav>
      </div>
    </header>
  );
}
