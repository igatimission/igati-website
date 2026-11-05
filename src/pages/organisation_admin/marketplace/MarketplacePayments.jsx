import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreditCard, CheckCircle2, Clock3, Search, RefreshCw, X, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { organisationMarketplaceApi } from '../../../api/organisationMarketplaceApi';

const fmt = (currency, amount) => `${currency || 'KES'} ${Number(amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const when = (date) => date ? new Date(date).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
const badge = (status) => ({ paid: 'bg-green-50 text-green-700', pending: 'bg-amber-50 text-amber-700', unpaid: 'bg-slate-100 text-slate-700', failed: 'bg-red-50 text-red-700', refunded: 'bg-purple-50 text-purple-700' }[status] || 'bg-slate-100 text-slate-700');

export default function MarketplacePayments() {
  const { slug } = useParams();
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], count: 0, summary: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await organisationMarketplaceApi.payments(slug, { search, status, page, page_size: pageSize });
      setData(response);
    } catch (e) { setError(e.message || 'Unable to load payments.'); }
    finally { setLoading(false); }
  }, [slug, search, status, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    if (selectedId == null) { setDetail(null); return; }
    let active = true;
    setDetail(null); setDetailLoading(true);
    organisationMarketplaceApi.paymentDetail(slug, selectedId)
      .then(value => { if (active) setDetail(value); })
      .catch(e => { if (active) setDetail({ error: e.message || 'Could not load payment.' }); })
      .finally(() => { if (active) setDetailLoading(false); });
    return () => { active = false; };
  }, [slug, selectedId]);

  const summary = data.summary || [];
  const totalPages = Math.max(1, Math.ceil((data.count || 0) / pageSize));
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-sm font-semibold text-[#6C994E]">Organisation marketplace</p><h1 className="text-3xl font-bold text-[#073B4C]">Payments</h1><p className="mt-1 text-sm text-slate-500">Payment status from marketplace orders. Gateway transaction details are not included.</p></div>
          <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"><RefreshCw size={16}/> Refresh</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {summary.length ? summary.map(row => (
            <div key={row.currency} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-500">{row.currency} payments</p>
              <p className="mt-3 text-2xl font-bold text-[#073B4C]">{fmt(row.currency, row.paid_amount)}</p>
              <p className="text-xs text-slate-500">Paid total</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600"><span className="inline-flex items-center gap-1"><CheckCircle2 size={14}/> {row.paid_count} paid</span><span className="inline-flex items-center gap-1"><Clock3 size={14}/> {row.pending_count} pending</span><span>{row.unpaid_count} unpaid</span><span>{row.failed_count} failed</span><span>{row.refunded_count} refunded</span></div>
            </div>
          )) : <div className="rounded-2xl border bg-white p-5 text-sm text-slate-500">No orders recorded yet.</div>}
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-3 border-b p-4">
            <form onSubmit={e => { e.preventDefault(); setPage(1); setSearch(searchInput.trim()); }} className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2 sm:max-w-md"><Search size={17} className="text-slate-400"/><input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Name, email, phone or order UUID" value={searchInput} onChange={e => setSearchInput(e.target.value)}/><button type="submit" className="text-sm font-semibold text-[#073B4C]">Search</button></form>
            <select aria-label="Filter by payment status" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className="rounded-xl border bg-white px-3 py-2 text-sm"><option value="">All statuses</option>{['paid','pending','unpaid','failed','refunded'].map(s => <option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}</select>
          </div>
          {error && <div className="m-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"><AlertCircle size={17}/>{error}</div>}
          <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{['Order reference','Customer','Amount','Payment status','Order date','Action'].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{loading ? <tr><td colSpan={6} className="p-8 text-center text-slate-500">Loading payments...</td></tr> : !data.results?.length ? <tr><td colSpan={6} className="p-8 text-center text-slate-500">No matching orders found.</td></tr> : data.results.map(p => <tr key={p.id} className="hover:bg-slate-50"><td className="px-4 py-3 font-mono text-xs">{p.reference?.slice(0,12)}...</td><td className="px-4 py-3"><div className="font-medium text-slate-800">{p.customer_name || 'Guest'}</div><div className="text-xs text-slate-500">{p.customer_phone || p.customer_email || '—'}</div></td><td className="px-4 py-3 font-semibold">{fmt(p.currency,p.amount)}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${badge(p.payment_status)}`}>{p.payment_status}</span></td><td className="px-4 py-3 text-slate-600">{when(p.created_at)}</td><td className="px-4 py-3"><button onClick={() => setSelectedId(p.id)} className="font-semibold text-[#073B4C] hover:underline">View details</button></td></tr>)}</tbody></table></div>
          <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-slate-500"><span>{data.count || 0} orders · Page {page} of {totalPages}</span><div className="flex gap-2"><button disabled={page <= 1 || loading} onClick={() => setPage(p => p-1)} className="rounded-lg border p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={17}/></button><button disabled={page >= totalPages || loading} onClick={() => setPage(p => p+1)} className="rounded-lg border p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight size={17}/></button></div></div>
        </div>
      </div>
      {selectedId != null && <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40" onMouseDown={e => { if (e.target === e.currentTarget) setSelectedId(null); }}><div role="dialog" aria-modal="true" aria-label="Payment details" className="h-full w-full max-w-lg overflow-y-auto bg-white p-5 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-[#073B4C]">Payment details</h2><button aria-label="Close" onClick={() => setSelectedId(null)} className="rounded-lg p-2 hover:bg-slate-100"><X size={20}/></button></div>{detailLoading ? <p className="mt-8 text-slate-500">Loading...</p> : detail?.error ? <p className="mt-8 text-red-600">{detail.error}</p> : detail && <div className="mt-6 space-y-4 text-sm"><div className="rounded-xl bg-slate-50 p-4"><CreditCard className="mb-3 text-[#6C994E]"/><p className="text-2xl font-bold">{fmt(detail.currency,detail.amount)}</p><span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${badge(detail.payment_status)}`}>{detail.payment_status}</span></div>{[['Order reference',detail.reference],['Customer',detail.customer_name],['Email',detail.customer_email],['Phone',detail.customer_phone],['Order status',detail.order_status],['Ordered',when(detail.created_at)],['Paid at',when(detail.paid_at)],['Subtotal',fmt(detail.currency,detail.subtotal)],['Delivery fee',fmt(detail.currency,detail.delivery_fee)],['Fulfilment',detail.fulfilment_method]].map(([key,value]) => <div key={key} className="flex justify-between gap-4 border-b pb-2"><span className="text-slate-500">{key}</span><span className="break-all text-right font-medium">{value || '—'}</span></div>)}<h3 className="font-bold">Items</h3>{detail.items?.map(item => <div key={item.id} className="flex justify-between gap-3 rounded-lg bg-slate-50 p-3"><span>{item.product_name} × {item.quantity}</span><span>{fmt(detail.currency,item.total_price)}</span></div>)}</div>}</div></div>}
    </div>
  );
}