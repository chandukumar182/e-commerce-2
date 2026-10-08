import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { money } from '../CartContext.jsx';

export default function Tracking() {
  const { code } = useParams();
  const nav = useNavigate();
  const [id, setId] = useState(code || '');
  const [o, setO] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!code) return;
    let live = true;
    const load = () =>
      fetch('/api/orders/track/' + encodeURIComponent(code)).then(async (r) => {
        const d = await r.json();
        if (!live) return;
        if (r.ok) { setO(d); setErr(''); } else { setO(null); setErr(d.message); }
      }).catch(() => live && setErr('Cannot reach the server.'));
    load();
    const t = setInterval(load, 5000); // refresh every 5 seconds
    return () => { live = false; clearInterval(t); };
  }, [code]);

  return (
    <div className="page narrow">
      <h2>Track your order</h2>
      <div className="trackbox">
        <input className="field" placeholder="Order ID, e.g. KL-1001" value={id} onChange={(e) => setId(e.target.value)} />
        <button className="btn" onClick={() => id.trim() && nav('/track/' + id.trim())}>Track</button>
      </div>
      {err && <p className="error">{err}</p>}
      {o && (
        <div className="order">
          <div className="between"><b>{o.order_code}</b><span>{new Date(o.created_at).toLocaleString('en-IN')}</span></div>
          <div>{o.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}</div>
          <div className="muted">
            {o.payment_method === 'COD' ? 'Pay on delivery' : `Paid via ${o.payment_method}`} · Total {money(o.total)} · Ship to {o.customer_name}, {o.address}
          </div>
          <div className="steps">
            {o.stages.map((s, i) => <div key={s} className={'step' + (i <= o.stage ? ' done' : '')}><i />{s}</div>)}
          </div>
          <b className={o.stage === 4 ? 'okc' : ''}>{o.stage === 4 ? 'Delivered' : 'Status: ' + o.stages[o.stage]}</b>
        </div>
      )}
    </div>
  );
}
