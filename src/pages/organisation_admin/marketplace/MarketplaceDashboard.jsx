
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Boxes,
  CreditCard,
  LayoutDashboard,
  LoaderCircle,
  Package,
  Plus,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

import { organisationMarketplaceApi } from "../../../api/organisationMarketplaceApi";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(Number(value || 0));

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-KE", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

function StatCard({ title, value, icon: Icon, detail, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#073B4C]">
            {value}
          </h3>
          <p className="mt-2 text-xs text-slate-500">{detail}</p>
        </div>
        <div className={`rounded-xl p-3 ${accent}`}>
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function Status({ value }) {
  const colors = {
    paid: "bg-emerald-50 text-emerald-700",
    completed: "bg-emerald-50 text-emerald-700",
    delivered: "bg-emerald-50 text-emerald-700",
    processing: "bg-blue-50 text-blue-700",
    confirmed: "bg-blue-50 text-blue-700",
    pending: "bg-amber-50 text-amber-700",
    unpaid: "bg-amber-50 text-amber-700",
    cancelled: "bg-red-50 text-red-700",
    failed: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
        colors[value] || "bg-slate-100 text-slate-600"
      }`}
    >
      {value?.replaceAll("_", " ") || "Unknown"}
    </span>
  );
}

export default function MarketplaceDashboard() {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await organisationMarketplaceApi.dashboard(slug);
      setData(result);
    } catch (err) {
      setError(err.message || "Unable to load marketplace dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [slug]);

  const base = `/organisations/${slug}/dashboard/marketplace`;

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-[#6C994E]" size={34} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <AlertTriangle className="mx-auto text-amber-500" size={36} />
        <h2 className="mt-4 text-xl font-bold text-[#073B4C]">
          Marketplace unavailable
        </h2>
        <p className="mt-2 text-sm text-slate-500">{error}</p>
        <button
          onClick={loadDashboard}
          className="mt-5 rounded-xl bg-[#073B4C] px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const stats = data?.stats || {};
  const orders = data?.recent_orders || [];

  return (
    <main className="min-h-screen bg-[#F8FAF7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C994E]">
              Organisation Marketplace
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#073B4C]">
              Marketplace Overview
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage products, purchases and sales for{" "}
              <span className="font-semibold text-[#073B4C]">
                {data?.organisation?.name}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadDashboard}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#073B4C] hover:bg-slate-50"
            >
              <RefreshCw size={17} />
              Refresh
            </button>

            <Link
              to={`${base}/products/new`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#07505E]"
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={stats.total_products ?? 0}
            detail={`${stats.active_products ?? 0} active listings`}
            icon={Package}
            accent="bg-blue-50 text-blue-700"
          />
          <StatCard
            title="Total Orders"
            value={stats.total_orders ?? 0}
            detail={`${stats.pending_orders ?? 0} awaiting processing`}
            icon={ShoppingBag}
            accent="bg-amber-50 text-amber-700"
          />
          <StatCard
            title="Paid Revenue"
            value={formatMoney(stats.revenue)}
            detail={`${stats.paid_orders ?? 0} paid orders`}
            icon={TrendingUp}
            accent="bg-emerald-50 text-emerald-700"
          />
          <StatCard
            title="Low Stock"
            value={stats.low_stock_products ?? 0}
            detail="Products requiring attention"
            icon={AlertTriangle}
            accent="bg-red-50 text-red-700"
          />
        </div>

        {/* Management shortcuts */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#073B4C]">
              Manage your marketplace
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quick access to your store operations
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Products",
                description: "Add, edit and publish products.",
                icon: Package,
                path: "products",
              },
              {
                label: "Orders",
                description: "Manage purchases and fulfilment.",
                icon: ShoppingBag,
                path: "orders",
              },
              {
                label: "Inventory",
                description: "Monitor stock and restocking.",
                icon: Boxes,
                path: "inventory",
              },
              {
                label: "Customers",
                description: "View customer purchase history.",
                icon: Users,
                path: "customers",
              },
              {
                label: "Payments",
                description: "Track payments and transactions.",
                icon: CreditCard,
                path: "payments",
              },
              {
                label: "Analytics",
                description: "Review sales and product performance.",
                icon: BarChart3,
                path: "analytics",
              },
            ].map(({ label, description, icon: Icon, path }) => (
              <Link
                key={path}
                to={`${base}/${path}`}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9BC36B] hover:shadow-md"
              >
                <div className="rounded-xl bg-[#EAF1E4] p-3 text-[#527A3A]">
                  <Icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[#073B4C]">{label}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </div>
                <ArrowRight
                  size={17}
                  className="mt-1 text-slate-400 transition group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Recent orders */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-[#073B4C]">
                Recent Orders
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Latest purchases from your marketplace
              </p>
            </div>
            <Link
              to={`${base}/orders`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#527A3A]"
            >
              View all orders
              <ArrowRight size={16} />
            </Link>
          </div>

          {orders.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Order</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-[#073B4C]">
                        {order.reference?.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {order.customer_name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#073B4C]">
                        {formatMoney(order.total_amount)}
                      </td>
                      <td className="px-6 py-4">
                        <Status value={order.payment_status} />
                      </td>
                      <td className="px-6 py-4">
                        <Status value={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <ShoppingBag className="mx-auto text-slate-300" size={36} />
              <h3 className="mt-4 font-bold text-[#073B4C]">
                No orders yet
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Customer purchases will appear here once your marketplace
                starts receiving orders.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
