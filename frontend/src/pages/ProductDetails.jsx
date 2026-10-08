import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart, money } from '../CartContext.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { add } = useCart();
  const [p, setP] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetch('/api/products/' + id).then(async (r) => {
      const d = await r.json();
      r.ok ? setP(d) : setErr(d.message);
    }).catch(() => setErr('Cannot reach the server.'));
  }, [id]);

  if (err) return <p className="error page">{err}</p>;
  if (!p) return <p className="empty">Loading…</p>;
  return (
    <div className="page detail">
      <div className="img big-img">{p.emoji}</div>
      <div>
        <h2>{p.name}</h2>
        <div className="muted">{p.category} · ★ {p.rating}</div>
        <p className="price large">{money(p.price)}</p>
        <p>{p.description}</p>
        <div className="actions">
          <button className="btn" onClick={() => add(p)}>Add to cart</button>
          <button className="btn alt" onClick={() => { add(p); nav('/cart'); }}>Buy now</button>
        </div>
      </div>
    </div>
  );
}
