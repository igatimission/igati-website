import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, ChevronLeft, ChevronRight, Edit3, ImageOff, LoaderCircle, Package, Plus, Search, Trash2 } from "lucide-react";
import { organisationMarketplaceApi as api } from "../../../api/organisationMarketplaceApi";

const money = (v, currency = "KES") => `${currency} ${Number(v || 0).toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;
const statuses = ["all", "draft", "active", "paused", "closed"];

export default function MarketplaceProducts() {
  const { slug } = useParams();
  const root = `/organisations/${slug}/dashboard/marketplace`;
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const data = await api.products(slug, { search, status, category, page });
      setRows(data.results || []); setCount(data.count || 0);
    } catch (err) { setError(err.message || "Could not load products."); }
    finally { setLoading(false); }
  }, [slug, search, status, category, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { api.categories(slug).then(setCategories).catch(() => {}); }, [slug]);

  async function changeStatus(item) {
    const next = item.status === "active" ? "paused" : "active";
    setBusyId(item.id); setError("");
    try { await api.setProductStatus(slug, item.id, next); await load(); }
    catch (err) { setError(err.message || "Could not change status."); }
    finally { setBusyId(null); }
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.title}"? Products with orders cannot be deleted.`)) return;
    setBusyId(item.id); setError("");
    try { await api.deleteProduct(slug, item.id); await load(); }
    catch (err) { setError(err.message || "Could not delete product. Close it instead if it has orders."); }
    finally { setBusyId(null); }
  }

  return (
    <main className="min-h-screen bg-[#F8FAF7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to={root} className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#527A3A]"><ArrowLeft size={16}/> Marketplace overview</Link>
            <h1 className="text-3xl font-bold text-[#073B4C]">Products</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your organisation's marketplace catalogue.</p>
          </div>
          <Link to={`${root}/products/new`} className="inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#07505E]"><Plus size={18}/> Add Product</Link>
        </div>
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
          <label className="relative block sm:col-span-1">
            <Search size={18} className="absolute left-3 top-3 text-slate-400"/>
            <input value={search} onChange={e => {setSearch(e.target.value); setPage(1);}} placeholder="Search name, SKU or description" className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#6C994E]" />
          </label>
          <select value={status} onChange={e => {setStatus(e.target.value); setPage(1);}} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#6C994E]">
            {statuses.map(s => <option key={s} value={s}>{s === "all" ? "All statuses" : s[0].toUpperCase() + s.slice(1)}</option>)}
          </select>
          <select value={category} onChange={e => {setCategory(e.target.value); setPage(1);}} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#6C994E]">
            <option value="">All categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        {error && <div role="alert" className="flex gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700"><AlertCircle size={18}/>{error}</div>}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-[#073B4C]">Product catalogue</h2><span className="text-sm text-slate-500">{count} products</span></div>
          {loading ? <div className="flex justify-center p-20"><LoaderCircle size={30} className="animate-spin text-[#6C994E]"/></div> : rows.length === 0 ? (
            <div className="px-5 py-20 text-center"><Package size={40} className="mx-auto text-slate-300"/><h3 className="mt-4 font-bold text-[#073B4C]">No products found</h3><p className="mt-2 text-sm text-slate-500">Add a product or change your filters.</p></div>
          ) : <div className="overflow-x-auto"><table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-4">Product</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Price</th><th className="px-5 py-4">Stock</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{rows.map(item => <tr key={item.id} className="hover:bg-slate-50">
              <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">{item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover"/> : <ImageOff size={20} className="text-slate-400"/>}</div><div><p className="font-semibold text-[#073B4C]">{item.title}</p><p className="text-xs text-slate-500">{item.sku || "No SKU"}</p></div></div></td>
              <td className="px-5 py-4 text-slate-600">{item.category_name || "Uncategorised"}</td>
              <td className="px-5 py-4 font-semibold text-[#073B4C]">{money(item.price, item.currency)}</td>
              <td className="px-5 py-4">{item.track_inventory ? <span className={item.stock_quantity <= item.low_stock_threshold ? "font-semibold text-red-600" : "text-slate-700"}>{item.stock_quantity} {item.unit}</span> : <span className="text-slate-500">Not tracked</span>}</td>
              <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${item.status === "active" ? "bg-green-50 text-green-700" : item.status === "draft" ? "bg-slate-100 text-slate-600" : "bg-amber-50 text-amber-700"}`}>{item.status}</span></td>
              <td className="px-5 py-4"><div className="flex items-center gap-2"><Link title="Edit product" to={`${root}/products/${item.id}/edit`} className="rounded-lg border border-slate-200 p-2 text-[#073B4C] hover:bg-slate-100"><Edit3 size={17}/></Link><button disabled={busyId === item.id} onClick={() => changeStatus(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-[#073B4C] disabled:opacity-50">{item.status === "active" ? "Pause" : "Publish"}</button><button title="Delete product" disabled={busyId === item.id} onClick={() => remove(item)} className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"><Trash2 size={17}/></button></div></td>
            </tr>)}</tbody>
          </table></div>}
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4"><span className="text-xs text-slate-500">Page {page} of {Math.max(1, Math.ceil(count / 20))}</span><div className="flex gap-2"><button disabled={page === 1 || loading} onClick={() => setPage(p => p - 1)} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={18}/></button><button disabled={page * 20 >= count || loading} onClick={() => setPage(p => p + 1)} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight size={18}/></button></div></div>
        </section>
      </div>
    </main>
  );
}