import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('/api/products').then((r) => r.json()).then((d) => setItems(d.slice(0, 4))).catch(() => {});
  }, []);
  return (
    <div className="page">
      <section className="hero">
        <h1>Find it. Order it. Track it.</h1>
        <p>Browse products, pay your way, and follow every delivery.</p>
        <Link to="/products" className="btn big">Start shopping</Link>
      </section>
      <h2>Popular right now</h2>
      <div className="grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </div>
  );
}
