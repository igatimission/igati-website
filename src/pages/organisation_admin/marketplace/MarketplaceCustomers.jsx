import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Users, ShoppingBag, Repeat2, ChevronLeft, ChevronRight, X, LoaderCircle, Mail, Phone } from 'lucide-react';
import { organisationMarketplaceApi } from '../../../api/organisationMarketplaceApi';

const money = (currency, value) => `${currency} ${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const date = (value) => value ? new Date(value).toLocaleDateString() : '—';

export default function MarketplaceCustomers() {
  const { slug } = useParams();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], count: 0, stats: {} });
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await organisationMarketplaceApi.customers(slug, { search, sort, page, page_size: 20 });
      setData(response);
    } catch (err) { setError(err.message || 'Could not load customers.'); }
    finally { setLoading(false); }
  }, [slug, search, sort, page]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!selected) { setDetail(null); return; }
    let cancelled = false;
    setDetailLoading(true);
    organisationMarketplaceApi.customerDetail(slug, selected)
      .then((result) => { if (!cancelled) setDetail(result); })
      .catch((err) => { if (!cancelled) setDetail({ error: err.message }); })
      .finally(() => { if (!cancelled) setDetailLoading(false); });
    return () => { cancelled = true; };
  }, [slug, selected]);

  const stats = data.stats || {};
  const totalPages = Math.max(1, Math.ceil((data.count || 0) / 20));
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <p className="text-sm font-semibold text-[#6C994E]">Organisation marketplace</p>
          <h1 className="mt-1 text-3xl font-bold text-[#073B4C]">Customers</h1>
          <p className="mt-2 text-sm text-slate-500">Customers who have placed orders with your organisation.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Total customers', stats.total_customers ?? 0, Users],
            ['Repeat customers', stats.repeat_customers ?? 0, Repeat2],
            ['Total orders', stats.total_orders ?? 0, ShoppingBag],
          ].map(([label, value, Icon]) => (
            <div key={label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <Icon className="text-[#6C994E]" size={22} />
              <p className="mt-3 text-2xl font-bold text-[#073B4C]">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
            <form onSubmit={(e) => { e.preventDefault(); setPage(1); setSearch(query.trim()); }} className="flex w-full max-w-lg gap-2">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone or email" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 outline-none focus:border-[#6C994E]" />
              </div>
              <button type="submit" className="rounded-xl bg-[#073B4C] px-4 py-2 text-sm font-semibold text-white">Search</button>
            </form>
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
              <option value="recent">Most recent</option>
              <option value="orders">Most orders</option>
              <option value="name">Customer name</option>
            </select>
          </div>
          {error && <div className="m-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error} <button onClick={load} className="ml-2 font-bold underline">Retry</button></div>}
          {loading ? <div className="flex justify-center gap-2 p-14 text-slate-500"><LoaderCircle className="animate-spin" /> Loading customers...</div> : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-500"><tr>{['Customer', 'Phone', 'Orders', 'Paid spending', 'Last order', ''].map((h) => <th key={h} className="px-5 py-3 font-semibold">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {data.results?.map((c) => <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4"><div className="font-semibold text-[#073B4C]">{c.name || 'Unnamed customer'}</div><div className="text-xs text-slate-500">{c.email || 'No email'}</div></td>
                    <td className="px-5 py-4">{c.phone || '—'}</td><td className="px-5 py-4">{c.total_orders}</td>
                    <td className="px-5 py-4">{Object.entries(c.currency_totals || {}).map(([cur, amt]) => <div key={cur}>{money(cur, amt)}</div>)}{!Object.keys(c.currency_totals || {}).length && '—'}</td>
                    <td className="px-5 py-4">{date(c.last_order_at)}</td>
                    <td className="px-5 py-4"><button onClick={() => setSelected(c.id)} className="font-semibold text-[#6C994E] hover:underline">View details</button></td>
                  </tr>)}
                </tbody>
              </table>
              {!data.results?.length && <div className="p-12 text-center text-slate-500">No customers found.</div>}
            </div>
          )}
          <div className="flex items-center justify-between border-t px-5 py-4 text-sm text-slate-500">
            <span>{data.count || 0} customers · Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border p-2 disabled:opacity-30"><ChevronLeft size={18} /></button>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded-lg border p-2 disabled:opacity-30"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
      {selected && <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
        <aside className="h-full w-full max-w-xl overflow-y-auto bg-white p-5 shadow-2xl sm:p-7" role="dialog" aria-modal="true" aria-label="Customer details">
          <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-[#073B4C]">Customer details</h2><button onClick={() => setSelected(null)} aria-label="Close"><X /></button></div>
          {detailLoading ? <div className="mt-10 flex gap-2 text-slate-500"><LoaderCircle className="animate-spin" /> Loading...</div> : detail?.error ? <p className="mt-8 text-red-600">{detail.error}</p> : detail && <>
            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-[#073B4C]">{detail.customer.name || 'Unnamed customer'}</h3>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Phone size={16} /> {detail.customer.phone || 'Not provided'}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Mail size={16} /> {detail.customer.email || 'Not provided'}</p>
              <p className="mt-3 text-sm text-slate-600">{detail.customer.total_orders} orders · {detail.customer.completed_orders} completed</p>
            </div>
            <h3 className="mt-8 mb-4 font-bold text-[#073B4C]">Order history</h3>
            <div className="space-y-3">{detail.orders.map(o => <div key={o.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex justify-between gap-2"><span className="font-semibold text-[#073B4C]">Order #{o.id}</span><span className="text-sm text-slate-500">{date(o.created_at)}</span></div>
              <p className="mt-1 text-sm">{money(o.currency, o.total_amount)} · {o.status} · {o.payment_status}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-500">{o.items.map((i, idx) => <li key={idx}>{i.product_name} × {i.quantity}</li>)}</ul>
            </div>)}</div>
            {detail.orders.length >= detail.orders_limit && <p className="mt-3 text-xs text-slate-500">Showing the latest {detail.orders_limit} orders.</p>}
          </>}
        </aside>
      </div>}
    </div>
  );
}