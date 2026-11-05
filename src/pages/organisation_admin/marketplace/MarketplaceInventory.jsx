import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Boxes, Search, RefreshCw, AlertTriangle, PackageX, PackageCheck, Plus, Minus, SlidersHorizontal, History, LoaderCircle, X } from "lucide-react";
import { organisationMarketplaceApi as api } from "../../../api/organisationMarketplaceApi";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#073B4C] outline-none focus:border-[#6C994E]";
const statusLabels = { in_stock: "In stock", low_stock: "Low stock", out_of_stock: "Out of stock", not_tracked: "Not tracked" };
const statusStyles = { in_stock: "bg-green-50 text-green-700", low_stock: "bg-amber-50 text-amber-700", out_of_stock: "bg-red-50 text-red-700", not_tracked: "bg-slate-100 text-slate-600" };
const emptySummary = { total_products: 0, tracked_products: 0, in_stock: 0, low_stock: 0, out_of_stock: 0, total_units: 0 };

export default function MarketplaceInventory() {
  const { slug } = useParams();
  const root = `/organisations/${slug}/dashboard/marketplace`;
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [stockStatus, setStockStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState("add");
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [movements, setMovements] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await api.inventory(slug, { page, page_size: pageSize, search, stock_status: stockStatus });
      setItems(Array.isArray(result?.results) ? result.results : []);
      setSummary(result?.summary || emptySummary);
      setCount(Number(result?.count || 0));
    } catch (err) {
      setError(err.message || "Unable to load inventory.");
    } finally {
      setLoading(false);
    }
  }, [slug, page, search, stockStatus]);

  useEffect(() => { load(); }, [load]);

  function openAdjustment(product, nextAction = "add") {
    setSelected(product);
    setAction(nextAction);
    setQuantity(nextAction === "set" ? String(product.stock_quantity) : "1");
    setReason("");
    setError("");
  }

  async function saveAdjustment(event) {
    event.preventDefault();
    if (!selected) return;
    setSubmitting(true);
    setError("");
    try {
      await api.adjustInventory(slug, selected.id, { action, quantity: Number(quantity), reason: reason.trim() });
      setSelected(null);
      await load();
      if (showHistory) await loadHistory();
    } catch (err) {
      setError(err.message || "Unable to adjust inventory.");
    } finally {
      setSubmitting(false);
    }
  }

  async function loadHistory() {
    setHistoryLoading(true);
    try {
      const data = await api.inventoryMovements(slug, { page_size: 30 });
      setMovements(Array.isArray(data?.results) ? data.results : []);
    } catch (err) {
      setError(err.message || "Unable to load stock history.");
    } finally {
      setHistoryLoading(false);
    }
  }

  async function toggleHistory() {
    if (showHistory) { setShowHistory(false); return; }
    setShowHistory(true);
    await loadHistory();
  }

  const stats = [
    { label: "Products", value: summary.total_products, Icon: Boxes },
    { label: "In stock", value: summary.in_stock, Icon: PackageCheck },
    { label: "Low stock", value: summary.low_stock, Icon: AlertTriangle },
    { label: "Out of stock", value: summary.out_of_stock, Icon: PackageX },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAF7] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link to={root} className="inline-flex items-center gap-2 text-sm font-medium text-[#527A3A]"><ArrowLeft size={16} /> Marketplace dashboard</Link>
            <h1 className="mt-3 text-3xl font-bold text-[#073B4C]">Inventory</h1>
            <p className="mt-1 text-sm text-slate-500">Monitor stock and record every adjustment for this organisation.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={toggleHistory} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#073B4C]"><History size={17} /> {showHistory ? "Hide history" : "Stock history"}</button>
            <button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-4 py-2.5 text-sm font-semibold text-white"><RefreshCw size={17} /> Refresh</button>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <Icon className="mb-3 text-[#6C994E]" size={22} />
              <div className="text-2xl font-bold text-[#073B4C]">{value}</div>
              <div className="text-xs text-slate-500 sm:text-sm">{label}</div>
            </div>
          ))}
        </div>

        {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search size={18} className="absolute left-3 top-3 text-slate-400" />
              <input aria-label="Search inventory" className={`${inputClass} pl-10`} value={search} onChange={(e) => { setPage(1); setSearch(e.target.value); }} placeholder="Search product or SKU" />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={17} className="text-slate-400" />
              <select aria-label="Filter by stock status" className={inputClass} value={stockStatus} onChange={(e) => { setPage(1); setStockStatus(e.target.value); }}>
                <option value="all">All stock</option>
                <option value="in_stock">In stock</option>
                <option value="low_stock">Low stock</option>
                <option value="out_of_stock">Out of stock</option>
                <option value="not_tracked">Not tracked</option>
              </select>
            </div>
          </div>
          {loading ? <div className="flex justify-center p-12"><LoaderCircle size={28} className="animate-spin text-[#6C994E]" /></div> : items.length === 0 ? <div className="p-12 text-center text-sm text-slate-500">No matching products found.</div> : (
            <div className="overflow-x-auto">
              <table className="min-w-[750px] w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Product</th><th className="px-5 py-4">SKU</th><th className="px-5 py-4">Quantity</th><th className="px-5 py-4">Alert at</th><th className="px-5 py-4">Stock status</th><th className="px-5 py-4 text-right">Action</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((product) => <tr key={product.id}>
                    <td className="px-5 py-3"><div className="flex items-center gap-3">{product.image ? <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100"><Boxes size={18} className="text-slate-400" /></div>}<span className="font-semibold text-[#073B4C]">{product.title}</span></div></td>
                    <td className="px-5 py-3 text-slate-500">{product.sku || "—"}</td>
                    <td className="px-5 py-3 font-semibold">{product.track_inventory ? `${product.stock_quantity} ${product.unit || "units"}` : "—"}</td>
                    <td className="px-5 py-3">{product.track_inventory ? product.low_stock_threshold : "—"}</td>
                    <td className="px-5 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[product.stock_status] || statusStyles.not_tracked}`}>{statusLabels[product.stock_status] || product.stock_status}</span></td>
                    <td className="px-5 py-3 text-right"><button type="button" disabled={!product.track_inventory} onClick={() => openAdjustment(product)} className="rounded-lg border border-[#6C994E] px-3 py-2 text-xs font-semibold text-[#527A3A] hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40">Adjust stock</button></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-slate-100 p-4 text-sm text-slate-500">
            <span>{count} products · Page {page} of {Math.max(1, Math.ceil(count / pageSize))}</span>
            <div className="flex gap-2"><button type="button" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border px-3 py-1.5 disabled:opacity-40">Previous</button><button type="button" disabled={page * pageSize >= count} onClick={() => setPage(p => p + 1)} className="rounded-lg border px-3 py-1.5 disabled:opacity-40">Next</button></div>
          </div>
        </section>

        {showHistory && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-[#073B4C]">Recent stock movements</h2>
          {historyLoading ? <LoaderCircle className="animate-spin text-[#6C994E]" /> : movements.length === 0 ? <p className="text-sm text-slate-500">No stock adjustments recorded yet.</p> : <div className="overflow-x-auto"><table className="min-w-[650px] w-full text-left text-sm"><thead><tr className="text-slate-500"><th className="pb-3">Product</th><th className="pb-3">Change</th><th className="pb-3">Before → After</th><th className="pb-3">Reason</th><th className="pb-3">Date</th></tr></thead><tbody className="divide-y divide-slate-100">{movements.map(m => <tr key={m.id}><td className="py-3 pr-4">{m.product_title}</td><td className="py-3 pr-4 capitalize">{m.action} {m.quantity}</td><td className="py-3 pr-4">{m.before_quantity} → {m.after_quantity}</td><td className="py-3 pr-4">{m.reason}</td><td className="py-3">{new Date(m.created_at).toLocaleString()}</td></tr>)}</tbody></table></div>}
        </section>}
      </div>

      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget && !submitting) setSelected(null); }}>
        <div role="dialog" aria-modal="true" aria-labelledby="adjust-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-start justify-between"><div><h2 id="adjust-title" className="text-xl font-bold text-[#073B4C]">Adjust inventory</h2><p className="mt-1 text-sm text-slate-500">{selected.title} · Current: {selected.stock_quantity}</p></div><button type="button" disabled={submitting} onClick={() => setSelected(null)} aria-label="Close"><X size={20} /></button></div>
          <form onSubmit={saveAdjustment} className="mt-5 space-y-4">
            <div><label className="mb-1 block text-sm font-semibold">Adjustment type</label><select className={inputClass} value={action} onChange={(e) => { setAction(e.target.value); setQuantity(e.target.value === "set" ? String(selected.stock_quantity) : "1"); }}><option value="add">Add stock</option><option value="remove">Remove stock</option><option value="set">Set exact quantity (correction)</option></select></div>
            <div><label className="mb-1 block text-sm font-semibold">Quantity</label><input className={inputClass} type="number" min={action === "set" ? 0 : 1} max="1000000000" step="1" required value={quantity} onChange={e => setQuantity(e.target.value)} /></div>
            <div><label className="mb-1 block text-sm font-semibold">Reason</label><textarea className={inputClass} required maxLength={500} rows={3} placeholder="e.g. Received new delivery / damaged items / physical stock count" value={reason} onChange={e => setReason(e.target.value)} /></div>
            <div className="flex justify-end gap-3"><button type="button" disabled={submitting} onClick={() => setSelected(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" disabled={submitting || !reason.trim() || quantity === ""} className="inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{submitting ? <LoaderCircle size={16} className="animate-spin" /> : <Plus size={16} />} Save adjustment</button></div>
          </form>
        </div>
      </div>}
    </main>
  );
}