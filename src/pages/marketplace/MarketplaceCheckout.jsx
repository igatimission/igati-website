
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, LockKeyhole, ShieldCheck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { marketplaceShoppingApi } from "../../api/marketplaceShoppingApi";

const input =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#6C994E]";

export default function MarketplaceCheckout() {
  const { items } = useCart();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    fulfilment_method: "pickup",
    delivery_address: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const currency = items[0]?.currency || "KES";
  const mixedCurrencies = items.some(
    (item) => item.currency !== currency
  );

  async function submit(e) {
    e.preventDefault();

    if (!items.length || loading) return;

    if (mixedCurrencies) {
      setError("Checkout requires products in one currency.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await marketplaceShoppingApi.checkout({
        ...form,
        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });

      const payment = data.payment || data;

      if (!payment.authorization_url || !payment.reference) {
        throw new Error(
          "The order was created, but Paystack payment was not initialized. " +
          "Please contact support before trying again."
        );
      }

      // Keep a record of the pending transaction.
      sessionStorage.setItem(
        "igati_pending_payment",
        JSON.stringify({
          reference: payment.reference,
          orders: data.orders || [],
        })
      );

      window.location.assign(payment.authorization_url);
    } catch (err) {
      setError(err.message || "Unable to initialize payment.");
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <p>Your cart is empty.</p>
        <Link to="/marketplace" className="text-[#6C994E]">
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAF7] px-4 py-10 text-[#073B4C] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/marketplace/cart"
          className="text-sm font-semibold text-[#6C994E]"
        >
          ← Back to cart
        </Link>

        <h1 className="mt-4 text-3xl font-bold">Secure Checkout</h1>
        <p className="mt-2 text-sm text-slate-500">
          Complete your order securely through Paystack.
        </p>

        <form
          onSubmit={submit}
          className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]"
        >
          <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Customer details</h2>

            <label className="block text-sm font-semibold">
              Full name *
              <input
                required
                className={input}
                value={form.customer_name}
                onChange={(e) => set("customer_name", e.target.value)}
              />
            </label>

            <label className="block text-sm font-semibold">
              Email address *
              <input
                required
                type="email"
                className={input}
                value={form.customer_email}
                onChange={(e) => set("customer_email", e.target.value)}
              />
            </label>

            <label className="block text-sm font-semibold">
              Phone number *
              <input
                required
                type="tel"
                className={input}
                value={form.customer_phone}
                onChange={(e) => set("customer_phone", e.target.value)}
              />
            </label>

            <label className="block text-sm font-semibold">
              Fulfilment method
              <select
                className={input}
                value={form.fulfilment_method}
                onChange={(e) =>
                  set("fulfilment_method", e.target.value)
                }
              >
                <option value="pickup">Pickup</option>
                <option value="delivery">Delivery</option>
              </select>
            </label>

            {form.fulfilment_method === "delivery" && (
              <label className="block text-sm font-semibold">
                Delivery address *
                <textarea
                  required
                  rows={3}
                  className={input}
                  value={form.delivery_address}
                  onChange={(e) =>
                    set("delivery_address", e.target.value)
                  }
                />
              </label>
            )}

            <label className="block text-sm font-semibold">
              Additional notes
              <textarea
                rows={3}
                className={input}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </p>
            )}
          </section>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Order summary</h2>

            <div className="mt-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b pb-3 text-sm"
                >
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-slate-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    {currency}{" "}
                    {(
                      Number(item.price) * item.quantity
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between font-bold">
              <span>Estimated total</span>
              <span>
                {currency} {total.toLocaleString()}
              </span>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Final prices and any delivery fees are calculated
              by the backend before payment.
            </p>

            <button
              type="submit"
              disabled={loading || mixedCurrencies}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-4 py-3 font-semibold text-white transition hover:bg-[#052d3a] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Connecting to Paystack...
                </>
              ) : (
                <>
                  <LockKeyhole size={18} />
                  Pay securely with Paystack
                </>
              )}
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={16} className="text-green-600" />
              Secure payment processing by Paystack
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}
