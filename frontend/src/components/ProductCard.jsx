import { Link } from 'react-router-dom';
import { useCart, money } from '../CartContext.jsx';

export default function ProductCard({ p }) {
  const { add } = useCart();
  return (
    <article className="card">
      <Link to={`/products/${p.id}`} className="img">{p.emoji}</Link>
      <div className="body">
        <h3><Link to={`/products/${p.id}`}>{p.name}</Link></h3>
        <div className="muted">{p.category} · ★ {p.rating}</div>
        <div className="foot">
          <span className="price">{money(p.price)}</span>
          <button className="btn" onClick={() => add(p)}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
