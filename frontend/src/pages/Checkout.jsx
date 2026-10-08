import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';
import { Summary } from '../components/CartItem.jsx';

export default function Checkout() {
  const { items } = useCart();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', phone: '', address: '' });
  const [e, setE] = useState({});
  if (!items.length) return <Navigate to="/cart" replace />;

  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.value });
  const next = () => {
    const er = {};
    if (f.name.trim().length < 2) er.name = 'Enter your full name.';
    if (!/^[6-9]\d{9}$/.test(f.phone.trim())) er.phone = 'Enter a valid 10-digit mobile number.';
    if (f.address.trim().length < 10) er.address = 'Enter your full delivery address.';
    setE(er);
    if (!Object.keys(er).length) nav('/payment', { state: { customer: f } });
  };

  return (
    <div className="page narrow">
      <h2>Delivery details</h2>
      <label>Full name<input className="field" value={f.name} onChange={set('name')} /></label>
      <div className="err">{e.name}</div>
      <label>Phone<input className="field" inputMode="numeric" placeholder="10-digit mobile" value={f.phone} onChange={set('phone')} /></label>
      <div className="err">{e.phone}</div>
      <label>Delivery address<textarea className="field" rows="3" value={f.address} onChange={set('address')} /></label>
      <div className="err">{e.address}</div>
      <Summary />
      <button className="btn wide" onClick={next}>Continue to payment</button>
    </div>
  );
}
