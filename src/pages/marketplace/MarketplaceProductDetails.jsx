import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Package, LoaderCircle, MapPin } from "lucide-react";
import { marketplaceShoppingApi } from "../../api/marketplaceShoppingApi";
import { useCart } from "../../context/CartContext";

export default function MarketplaceProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem, count } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true); setError(""); setProduct(null); setQuantity(1);
    marketplaceShoppingApi.product(slug)
      .then((data) => { if (active) setProduct(data); })
      .catch((e) => { if (active) setError(e.message || "Product not found."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  const purchasable = product?.listing_type === "product" && product?.allow_online_purchase && product?.price != null &&
    (!product.track_inventory || product.stock_quantity > 0);
  const maxQuantity = product?.track_inventory ? product.stock_quantity : 1000;
  function add(buyNow = false) {
    try {
      addItem(product, quantity);
      setNotice("Added to cart successfully.");
      if (buyNow) navigate("/marketplace/checkout");
    } catch (e) { setNotice(e.message); }
  }

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><LoaderCircle className="animate-spin text-[#6C994E]" /></div>;
  if (error || !product) return <main className="mx-auto max-w-5xl p-8"><p className="text-red-600">{error || "Listing not found."}</p><Link to="/marketplace" className="text-[#6C994E]">Back to marketplace</Link></main>;

  return <main className="min-h-screen bg-[#F8FAF7] px-4 py-8 text-[#073B4C] sm:px-6">
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm font-semibold text-[#527A3A]"><ArrowLeft size={17}/> Marketplace</Link>
        <Link to="/marketplace/cart" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold"><ShoppingCart size={18}/> Cart ({count})</Link>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white">
          <div className="flex aspect-square items-center justify-center bg-[#EFF4EA]">
            {product.image ? <img src={product.image} alt={product.title} className="h-full w-full object-contain"/> : <Package size={88} className="text-[#6C994E]"/>}
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
          <div><p className="text-sm font-semibold uppercase tracking-wide text-[#6C994E]">{product.category?.name || product.listing_type}</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.title}</h1></div>
          {product.organisation && <p className="inline-flex items-center gap-2 text-sm text-slate-500"><MapPin size={16}/>{product.organisation.name}</p>}
          <p className="text-3xl font-bold">{product.price != null ? `${product.currency} ${Number(product.price).toLocaleString()}` : "Contact for price"}</p>
          <p className="whitespace-pre-wrap leading-7 text-slate-600">{product.description}</p>
          {product.listing_type === "product" && <p className="text-sm font-semibold text-slate-600">{product.track_inventory ? (product.stock_quantity > 0 ? `${product.stock_quantity} ${product.unit || "units"} available` : "Out of stock") : "Availability: contact seller"}</p>}
          {purchasable ? <div className="space-y-4 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-4"><span className="text-sm font-semibold">Quantity</span><div className="inline-flex items-center rounded-xl border border-slate-200"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3"><Minus size={17}/></button><span className="min-w-10 text-center font-semibold">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))} className="p-3"><Plus size={17}/></button></div></div>
            <div className="flex flex-wrap gap-3"><button type="button" onClick={() => add(false)} className="inline-flex items-center gap-2 rounded-xl border border-[#6C994E] px-5 py-3 font-semibold text-[#527A3A]"><ShoppingCart size={18}/> Add to cart</button><button type="button" onClick={() => add(true)} className="rounded-xl bg-[#073B4C] px-6 py-3 font-semibold text-white">Buy now</button></div>
          </div> : <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Online checkout is not available for this listing. Contact the seller for more information.</p>}
          {notice && <p role="status" className="rounded-xl bg-[#EFF4EA] p-3 text-sm">{notice}</p>}
          {(product.contact_phone || product.contact_email) && <div className="border-t border-slate-100 pt-5 text-sm text-slate-600"><p className="mb-2 font-bold text-[#073B4C]">Seller contact</p>{product.contact_phone && <p>Phone: {product.contact_phone}</p>}{product.contact_email && <p>Email: {product.contact_email}</p>}</div>}
        </div>
      </div>
    </div>
  </main>;
}