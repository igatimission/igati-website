import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function MarketplaceCart() {
  const { items, setQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const totals = Object.entries(items.reduce((acc, x) => {
    acc[x.currency] = (acc[x.currency] || 0) + Number(x.price) * x.quantity;
    return acc;
  }, {}));
  return <main className="min-h-screen bg-[#F8FAF7] px-4 py-10 text-[#073B4C] sm:px-6"><div className="mx-auto max-w-5xl">
    <Link to="/marketplace" className="text-sm font-semibold text-[#6C994E]">← Continue shopping</Link>
    <h1 className="mt-5 text-3xl font-bold">Your shopping cart</h1>
    {!items.length ? <div className="mt-8 rounded-2xl bg-white p-12 text-center"><ShoppingBag className="mx-auto text-[#6C994E]" size={48}/><p className="mt-4 text-slate-500">Your cart is empty.</p><Link to="/marketplace" className="mt-4 inline-block font-semibold text-[#6C994E]">Browse marketplace</Link></div> :
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-3">{items.map((item) => <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:flex-row sm:items-center">
          <Link to={`/marketplace/${item.slug}`} className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#EFF4EA] sm:w-28">{item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover"/> : <ShoppingBag className="m-auto mt-9 text-[#6C994E]"/>}</Link>
          <div className="min-w-0 flex-1"><Link to={`/marketplace/${item.slug}`} className="font-bold">{item.title}</Link><p className="mt-1 text-xs text-slate-500">{item.organisation?.name}</p><p className="mt-2 font-bold">{item.currency} {Number(item.price).toLocaleString()}</p></div>
          <div className="flex items-center gap-2"><button type="button" aria-label="Decrease" onClick={() => setQuantity(item.id, item.quantity - 1)} className="rounded-lg border p-2"><Minus size={15}/></button><span className="w-7 text-center">{item.quantity}</span><button type="button" aria-label="Increase" onClick={() => setQuantity(item.id, item.quantity + 1)} className="rounded-lg border p-2"><Plus size={15}/></button><button type="button" aria-label="Remove" onClick={() => removeItem(item.id)} className="ml-2 rounded-lg p-2 text-red-600"><Trash2 size={18}/></button></div>
        </div>)}</div>
        <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6"><h2 className="text-lg font-bold">Order summary</h2><p className="mt-3 text-xs text-slate-500">Prices are grouped by currency. Delivery charges are not included.</p>{totals.map(([currency, amount]) => <div key={currency} className="mt-4 flex justify-between font-bold"><span>{currency}</span><span>{Number(amount).toLocaleString()}</span></div>)}<button type="button" onClick={() => navigate("/marketplace/checkout")} className="mt-6 w-full rounded-xl bg-[#073B4C] px-4 py-3 font-semibold text-white">Proceed to checkout</button></aside>
      </div>}
  </div></main>;
}