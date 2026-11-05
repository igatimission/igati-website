import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Search, ShoppingBag, Clock3, CheckCircle2, Wallet,
  Eye, X, LoaderCircle, ChevronLeft, ChevronRight, RefreshCw,
  MapPin, Phone, Mail, Package, Truck,
} from "lucide-react";
import { organisationMarketplaceApi as api } from "../../../api/organisationMarketplaceApi";

const ORDER_STATUSES = ["pending", "confirmed", "processing", "ready", "shipped", "delivered", "completed", "cancelled"];
const PAYMENT_STATUSES = ["unpaid", "pending", "paid", "failed", "refunded"];
const NEXT = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["ready", "shipped", "cancelled"],
  ready: ["delivered", "completed", "cancelled"],
  shipped: ["delivered"],
  delivered: ["completed"],
  completed: [],
  cancelled: [],
};

const label = (s) => s ? s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "—";
const money = (value, currency = "KES") => {
  const amount = Number(value);
  return `${currency} ${Number.isFinite(amount) ? amount.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}`;
};
const dateTime = (value) => value ? new Date(value).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" }) : "—";
const statusStyle = (s) => ({
  pending: "bg-amber-50 text-amber-700", confirmed: "bg-sky-50 text-sky-700",
  processing: "bg-indigo-50 text-indigo-700", ready: "bg-teal-50 text-teal-700",
  shipped: "bg-violet-50 text-violet-700", delivered: "bg-emerald-50 text-emerald-700",
  completed: "bg-green-50 text-green-700", paid: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700", failed: "bg-red-50 text-red-700",
  refunded: "bg-slate-100 text-slate-700", unpaid: "bg-orange-50 text-orange-700",
}[s] || "bg-slate-100 text-slate-700");
const Badge = ({ value }) => <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle(value)}`}>{label(value)}</span>;

function Stat({ icon: Icon, title, value }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="flex items-center justify-between gap-2"><span className="text-xs font-medium text-slate-500 sm:text-sm">{title}</span><Icon className="text-[#6C994E]" size={19}/></div>
    <p className="mt-3 break-words text-xl font-bold text-[#073B4C] sm:text-2xl">{value}</p>
  </div>;
}

function OrderDetails({ slug, orderId, onClose, onChanged }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [nextStatus, setNextStatus] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.order(slug, orderId);
      setOrder(data);
      setNextStatus("");
    } catch (err) {
      setError(err.message || "Could not load this order.");
    } finally {
      setLoading(false);
    }
  }, [slug, orderId]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const keyDown = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, [onClose]);

  const updateStatus = async () => {
    if (!nextStatus || !order || saving) return;
    if (!window.confirm(`Change this order's status to ${label(nextStatus)}?`)) return;
    setSaving(true);
    setError("");
    try {
      await api.updateOrderStatus(slug, order.id, nextStatus);
      await load();
      onChanged();
    } catch (err) {
      setError(err.message || "Could not update order status.");
    } finally {
      setSaving(false);
    }
  };

  return <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-label="Order details" className="flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl">
      <header className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
        <div><p className="text-xs font-semibold uppercase tracking-wide text-[#6C994E]">Order details</p><h2 className="mt-1 text-lg font-bold text-[#073B4C]">{order ? `#${order.reference.slice(0, 8).toUpperCase()}` : "Loading order"}</h2></div>
        <button type="button" onClick={onClose} aria-label="Close order details" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={20}/></button>
      </header>
      <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
        {loading ? <div className="flex justify-center py-20"><LoaderCircle className="animate-spin text-[#6C994E]" size={30}/></div> : null}
        {error && <div role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {order && !loading && <>
          <div className="flex flex-wrap items-center gap-3"><Badge value={order.status}/><Badge value={order.payment_status}/><span className="text-xs text-slate-500">{dateTime(order.created_at)}</span></div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4"><h3 className="mb-3 text-sm font-bold text-[#073B4C]">Customer</h3><p className="font-medium text-slate-800">{order.customer_name || "Guest"}</p><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><Phone size={15}/>{order.customer_phone || "Not provided"}</p><p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-600"><Mail size={15}/>{order.customer_email || "Not provided"}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><h3 className="mb-3 text-sm font-bold text-[#073B4C]">Fulfilment</h3><p className="flex items-center gap-2 text-sm font-medium text-slate-800"><Truck size={16}/>{label(order.fulfilment_method)}</p><p className="mt-2 flex items-start gap-2 text-sm text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0"/>{order.delivery_address || "No delivery address"}</p></div>
          </div>
          <div><h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#073B4C]"><Package size={17}/> Purchased products</h3><div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
            {(order.items || []).map((item) => <div key={item.id} className="flex items-center justify-between gap-4 p-4"><div><p className="font-semibold text-slate-800">{item.product_name}</p><p className="mt-1 text-xs text-slate-500">Qty {item.quantity} × {money(item.unit_price, order.currency)}</p></div><p className="whitespace-nowrap text-sm font-bold text-[#073B4C]">{money(item.total_price, order.currency)}</p></div>)}
            {!order.items?.length && <p className="p-4 text-sm text-slate-500">No items found for this order.</p>}
          </div></div>
          <div className="rounded-xl bg-[#F8FAF7] p-4 text-sm"><div className="flex justify-between py-1"><span className="text-slate-600">Subtotal</span><span>{money(order.subtotal, order.currency)}</span></div><div className="flex justify-between py-1"><span className="text-slate-600">Delivery</span><span>{money(order.delivery_fee, order.currency)}</span></div><div className="mt-2 flex justify-between border-t border-slate-200 pt-3 font-bold text-[#073B4C]"><span>Total</span><span>{money(order.total_amount, order.currency)}</span></div></div>
          {order.notes && <div><h3 className="text-sm font-bold text-[#073B4C]">Customer notes</h3><p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{order.notes}</p></div>}
          <div className="rounded-xl border border-slate-200 p-4"><h3 className="mb-2 text-sm font-bold text-[#073B4C]">Update fulfilment status</h3><p className="mb-3 text-xs text-slate-500">Payment status is updated only through your verified payment workflow.</p>
            {(NEXT[order.status] || []).length ? <div className="flex flex-col gap-2 sm:flex-row"><select className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm" value={nextStatus} onChange={(e) => setNextStatus(e.target.value)}><option value="">Choose next status</option>{NEXT[order.status].filter((s) => s !== "completed" || order.payment_status === "paid").map((s) => <option key={s} value={s}>{label(s)}</option>)}</select><button type="button" onClick={updateStatus} disabled={!nextStatus || saving} className="rounded-xl bg-[#073B4C] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Updating..." : "Update status"}</button></div> : <p className="text-sm text-slate-500">No further status changes are available.</p>}
          </div>
        </>}
      </div>
    </section>
  </div>;
}

export default function MarketplaceOrders() {
  const { slug } = useParams();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.orders(slug, { search, status, payment_status: paymentStatus, page, page_size: 20 });
      setOrders(Array.isArray(data?.results) ? data.results : []);
      setStats(data?.stats || {});
      setCount(data?.count || 0);
      setPages(data?.total_pages || 1);
    } catch (err) {
      setError(err.message || "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, [slug, search, status, paymentStatus, page, revision]);

  useEffect(() => { load(); }, [load]);
  const refresh = () => setRevision((v) => v + 1);
  const field = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-[#073B4C] outline-none focus:border-[#6C994E]";

  return <main className="min-h-screen bg-[#F8FAF7] px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><Link to={`/my-organisations/${slug}/marketplace`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#527A3A]"><ArrowLeft size={16}/> Marketplace dashboard</Link><h1 className="mt-3 text-2xl font-bold text-[#073B4C] sm:text-3xl">Orders</h1><p className="mt-1 text-sm text-slate-500">Review customer purchases and manage fulfilment for your organisation.</p></div><button type="button" onClick={refresh} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#073B4C] hover:bg-slate-50"><RefreshCw size={16}/> Refresh</button></div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><Stat icon={ShoppingBag} title="Total orders" value={stats.total_orders ?? 0}/><Stat icon={Clock3} title="Pending" value={stats.pending_orders ?? 0}/><Stat icon={CheckCircle2} title="Completed" value={stats.completed_orders ?? 0}/><Stat icon={Wallet} title="Paid revenue" value={money(stats.paid_revenue, "KES")}/></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"><form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_auto]" onSubmit={(e) => { e.preventDefault(); setPage(1); setSearch(searchInput.trim()); }}><div className="relative"><Search size={17} className="absolute left-3 top-3 text-slate-400"/><input className={`${field} pl-10`} placeholder="Search customer, phone or full order reference" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/></div><select className={field} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}><option value="">All order statuses</option>{ORDER_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select><select className={field} value={paymentStatus} onChange={(e) => { setPaymentStatus(e.target.value); setPage(1); }}><option value="">All payment statuses</option>{PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{label(s)}</option>)}</select><button type="submit" className="rounded-xl bg-[#073B4C] px-5 py-2.5 text-sm font-semibold text-white">Search</button></form></div>
      {error && <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5"><h2 className="font-bold text-[#073B4C]">Customer orders</h2><span className="text-sm text-slate-500">{count} results</span></div>
        <div className="overflow-x-auto"><table className="min-w-[820px] w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Total</th><th className="px-5 py-3">Payment</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100">
          {orders.map((order) => <tr key={order.id} className="hover:bg-slate-50"><td className="px-5 py-4 font-semibold text-[#073B4C]">#{order.reference.slice(0, 8).toUpperCase()}</td><td className="px-5 py-4"><p className="font-medium text-slate-800">{order.customer_name || "Guest"}</p><p className="text-xs text-slate-500">{order.customer_phone || "—"}</p></td><td className="whitespace-nowrap px-5 py-4 font-semibold">{money(order.total_amount, order.currency)}</td><td className="px-5 py-4"><Badge value={order.payment_status}/></td><td className="px-5 py-4"><Badge value={order.status}/></td><td className="whitespace-nowrap px-5 py-4 text-slate-500">{dateTime(order.created_at)}</td><td className="px-5 py-4"><button type="button" onClick={() => setSelected(order.id)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 font-semibold text-[#527A3A] hover:bg-green-50"><Eye size={16}/> View</button></td></tr>)}
          {!loading && orders.length === 0 && <tr><td colSpan={7} className="px-5 py-16 text-center text-slate-500">No orders found for these filters.</td></tr>}
          {loading && <tr><td colSpan={7} className="px-5 py-16 text-center"><LoaderCircle className="mx-auto animate-spin text-[#6C994E]" size={27}/></td></tr>}
        </tbody></table></div>
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4"><span className="text-sm text-slate-500">Page {page} of {pages}</span><div className="flex gap-2"><button type="button" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={18}/></button><button type="button" disabled={page >= pages || loading} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight size={18}/></button></div></div>
      </div>
    </div>
    {selected !== null && <OrderDetails slug={slug} orderId={selected} onClose={() => setSelected(null)} onChanged={refresh}/>}
  </main>;
}