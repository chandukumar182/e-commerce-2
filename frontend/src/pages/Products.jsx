import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

const CATS = ['All', 'Electronics', 'Fashion', 'Home', 'Stationery', 'Sports'];

export default function Products() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const url = `/api/products?q=${encodeURIComponent(q)}&category=${cat === 'All' ? '' : cat}`;
    fetch(url).then((r) => r.json()).then((d) => { setList(d); setErr(''); })
      .catch(() => setErr('Cannot reach the server. Start the backend, then refresh.'));
  }, [q, cat]);

  const shown = [...list];
  if (sort === 'lo') shown.sort((a, b) => a.price - b.price);
  if (sort === 'hi') shown.sort((a, b) => b.price - a.price);
  if (sort === 'rt') shown.sort((a, b) => b.rating - a.rating);

  return (
    <div className="page">
      <h2>Shop</h2>
      <input className="field" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
      <div className="tools">
        {CATS.map((c) => (
          <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
          <option value="">Sort: Featured</option>
          <option value="lo">Price: low to high</option>
          <option value="hi">Price: high to low</option>
          <option value="rt">Rating</option>
        </select>
      </div>
      {err && <p className="error">{err}</p>}
      {!err && !shown.length && <p className="empty">No products match your search. Try another word or category.</p>}
      <div className="grid">{shown.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </div>
  );
}
