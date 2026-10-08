import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { Summary } from '../components/CartItem.jsx';

export default function Payment() {
  const { state } = useLocation();
  const nav = useNavigate();
  const { items, clear } = useCart();
  const [method, setMethod] = useState('UPI');
  const [pay, setPay] = useState({ upi: '', card: '', exp: '', cvv: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  if (!state?.customer || !items.length) return <Navigate to="/checkout" replace />;
  const set = (k) => (ev) => setPay({ ...pay, [k]: ev.target.value });

  const check = () => {
    if (method === 'UPI' && !/^[\w.\-]{2,}@[a-z]{2,}$/i.test(pay.upi.trim())) return 'Enter a valid UPI ID like name@bank.';
    if (method === 'Card') {
      if (!/^\d{16}$/.test(pay.card.replace(/\s/g, ''))) return 'Card number must be 16 digits.';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(pay.exp.trim())) return 'Expiry must be MM/YY.';
      if (!/^\d{3}$/.test(pay.cvv.trim())) return 'CVV must be 3 digits.';
    }
    return '';
  };

  const placeOrder = async () => {
    const msg = check();
    setErr(msg);
    if (msg) return;
    setBusy(true);
    try {
      // Card and UPI details are only validated here and are never sent or stored
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { ...state.customer, method },
          items: items.map((i) => ({ id: i.id, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      clear();
      nav('/track/' + data.order_code);
    } catch (e) {
      setErr(e.message || 'Could not place the order. Try again.');
      setBusy(false);
    }
  };

  return (
    <div className="page narrow">
      <h2>Payment</h2>
      <div className="pay">
        {['UPI', 'Card', 'COD'].map((m) => (
          <label key={m} className={method === m ? 'on' : ''}>
            <input type="radio" checked={method === m} onChange={() => { setMethod(m); setErr(''); }} />
            {m === 'COD' ? 'Cash on delivery' : m}
          </label>
        ))}
      </div>
      {method === 'UPI' && <label>UPI ID<input className="field" placeholder="name@bank" value={pay.upi} onChange={set('upi')} /></label>}
      {method === 'Card' && (
        <>
          <label>Card number<input className="field" inputMode="numeric" placeholder="16 digits" value={pay.card} onChange={set('card')} /></label>
          <div className="two">
            <label>Expiry<input className="field" placeholder="MM/YY" value={pay.exp} onChange={set('exp')} /></label>
            <label>CVV<input className="field" inputMode="numeric" placeholder="3 digits" value={pay.cvv} onChange={set('cvv')} /></label>
          </div>
        </>
      )}
      {method === 'COD' && <p className="muted">Pay in cash when your order arrives.</p>}
      <div className="err">{err}</div>
      <Summary />
      <button className="btn wide" disabled={busy} onClick={placeOrder}>{busy ? 'Processing…' : 'Pay and place order'}</button>
    </div>
  );
}
