import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { marketplaceShoppingApi } from "../../api/marketplaceShoppingApi";

const input = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#6C994E]";
export default function MarketplaceCheckout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customer_name: "", customer_email: "", customer_phone: "", fulfilment_method: "pickup", delivery_address: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  async function submit(e) {
    e.preventDefault();
    if (!items.length || loading) return;
    setLoading(true); setError("");
    try {
      const data = await marketplaceShoppingApi.checkout({ ...form, items: items.map((x) => ({ product_id: x.id, quantity: x.quantity })) });
      setResult(data); clearCart();
    } catch (e) { setError(e.message || "Unable to place order."); }
    finally { setLoading(false); }
  }
  if (result) return <main className="min-h-screen bg-[#F8FAF7] px-4 py-16"><div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center"><h1 className="text-2xl font-bold text-[#073B4C]">Order placed!</h1><p className="mt-3 text-slate-600">Your order has been recorded. Payment has not yet been collected.</p><div className="mt-5 space-y-2 text-left">{result.orders?.map((o) => <div key={o.reference} className="rounded-xl bg-slate-50 p-3 text-sm"><p className="font-semibold">Reference: {o.reference}</p><p>{o.currency} {Number(o.total_amount).toLocaleString()} · {o.payment_status}</p></div>)}</div><Link to="/marketplace" className="mt-7 inline-block rounded-xl bg-[#073B4C] px-6 py-3 font-semibold text-white">Back to marketplace</Link></div></main>;
  if (!items.length) return <main className="mx-auto max-w-3xl p-8"><p>Your cart is empty.</p><Link to="/marketplace" className="text-[#6C994E]">Browse products</Link></main>;
  return <main className="min-h-screen bg-[#F8FAF7] px-4 py-10 text-[#073B4C] sm:px-6"><div className="mx-auto max-w-4xl"><Link to="/marketplace/cart" className="text-sm font-semibold text-[#6C994E]">← Back to cart</Link><h1 className="mt-4 text-3xl font-bold">Checkout</h1><p className="mt-2 text-sm text-slate-500">Your order will be submitted as unpaid. The seller will coordinate payment and fulfilment.</p>
    <form onSubmit={submit} className="mt-7 grid gap-6 lg:grid-cols-[1fr_300px]">
      <section className="space-y-4 rounded-2xl bg-white p-6"><h2 className="text-lg font-bold">Customer details</h2><label className="block text-sm font-semibold">Full name *<input required className={`${input} mt-2`} value={form.customer_name} onChange={(e) => set("customer_name", e.target.value)}/></label><label className="block text-sm font-semibold">Phone number *<input required type="tel" className={`${input} mt-2`} value={form.customer_phone} onChange={(e) => set("customer_phone", e.target.value)}/></label><label className="block text-sm font-semibold">Email<input type="email" className={`${input} mt-2`} value={form.customer_email} onChange={(e) => set("customer_email", e.target.value)}/></label><label className="block text-sm font-semibold">Fulfilment<select className={`${input} mt-2`} value={form.fulfilment_method} onChange={(e) => set("fulfilment_method", e.target.value)}><option value="pickup">Pickup</option><option value="delivery">Delivery</option></select></label>{form.fulfilment_method === "delivery" && <label className="block text-sm font-semibold">Delivery address *<textarea required className={`${input} mt-2`} rows={3} value={form.delivery_address} onChange={(e) => set("delivery_address", e.target.value)}/></label>}<label className="block text-sm font-semibold">Notes<textarea className={`${input} mt-2`} rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)}/></label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}</section>
      <aside className="h-fit rounded-2xl bg-white p-6"><h2 className="text-lg font-bold">Review order</h2>{items.map((x) => <div key={x.id} className="mt-4 border-b pb-3 text-sm"><p className="font-semibold">{x.title} × {x.quantity}</p><p className="text-slate-500">{x.currency} {(Number(x.price) * x.quantity).toLocaleString()}</p></div>)}<p className="mt-4 text-xs text-slate-500">Final totals are recalculated by the backend. Delivery fees are currently zero; delivery arrangements require seller confirmation.</p><button type="submit" disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-4 py-3 font-semibold text-white disabled:opacity-50">{loading && <LoaderCircle size={18} className="animate-spin"/>} Place order</button></aside>
    </form>
  </div></main>;
}