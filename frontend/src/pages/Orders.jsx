import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { money } from '../CartContext.jsx';

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    fetch('/api/orders').then((r) => r.json()).then(setOrders).catch(() => setErr('Cannot reach the server.'));
  }, []);

  if (err) return <p className="error page">{err}</p>;
  if (!orders) return <p className="empty">Loading…</p>;
  return (
    <div className="page narrow">
      <h2>My orders</h2>
      {!orders.length && <p className="empty">No orders yet. <Link to="/products">Start shopping</Link></p>}
      {orders.map((o) => (
        <Link key={o.id} to={'/track/' + o.order_code} className="order link">
          <div className="between"><b>{o.order_code}</b><span>{money(o.total)}</span></div>
          <div className="muted">{o.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}</div>
          <div>Status: <b>{o.stages[o.stage]}</b></div>
        </Link>
      ))}
    </div>
  );
}
