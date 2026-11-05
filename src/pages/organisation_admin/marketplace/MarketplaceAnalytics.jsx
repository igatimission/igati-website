import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis,
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { BarChart3, ShoppingBag, Users, Wallet, TrendingUp, RefreshCw } from "lucide-react";
import { organisationMarketplaceApi } from "../../../api/organisationMarketplaceApi";

const PERIODS = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "12m", label: "12 months" },
];
const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#64748b"];
const number = (value) => new Intl.NumberFormat("en-KE").format(Number(value || 0));
const money = (value, currency = "KES") => `${currency} ${number(Math.round(Number(value || 0)))}`;

function StatCard({ label, value, icon: Icon, color = "text-blue-600" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <Icon size={20} className={color} />
      </div>
      <div className="text-2xl font-bold text-slate-900 break-words">{value}</div>
    </div>
  );
}

export default function MarketplaceAnalytics() {
  const { slug } = useParams();
  const [period, setPeriod] = useState("30d");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    organisationMarketplaceApi.analytics(slug, { period })
      .then((response) => { if (active) setData(response); })
      .catch((err) => { if (active) { setError(err?.message || "Could not load analytics."); setData(null); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug, period, refreshKey]);

  const summary = data?.summary || {};
  const trend = (data?.sales_trend || []).map((item) => ({
    ...item, label: item.date?.slice(5),
  }));
  const statuses = (data?.order_statuses || []).map((item) => ({
    name: item.status || "Unknown", value: item.count,
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Marketplace Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">Sales, orders and customer performance for your organisation.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
            {PERIODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <button onClick={() => setRefreshKey((k) => k + 1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {loading && <p className="rounded-xl bg-white p-5 text-slate-500">Loading analytics…</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-5 text-red-700">{error}</p>}
      {!loading && !error && data && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Paid revenue" value={money(summary.revenue, data.currency)} icon={Wallet} />
            <StatCard label="Orders" value={number(summary.total_orders)} icon={ShoppingBag} color="text-emerald-600" />
            <StatCard label="Customers" value={number(summary.customers)} icon={Users} color="text-violet-600" />
            <StatCard label="Average paid order" value={money(summary.average_order_value, data.currency)} icon={TrendingUp} color="text-amber-600" />
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold">Revenue trend</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="label" minTickGap={22} fontSize={11} />
                    <YAxis fontSize={11} width={50} />
                    <Tooltip formatter={(v) => money(v, data.currency)} />
                    <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="#dbeafe" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold">Orders trend</h2>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="label" minTickGap={22} fontSize={11} />
                    <YAxis allowDecimals={false} fontSize={11} />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold">Order status breakdown</h2>
              <div className="h-72 w-full">
                {statuses.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={statuses} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={85}>
                        {statuses.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip /><Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <p className="text-sm text-slate-500">No orders in this period.</p>}
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center gap-2"><BarChart3 size={20} className="text-blue-600" /><h2 className="text-lg font-semibold">Top-selling products</h2></div>
              <div className="space-y-3">
                {data.top_products?.length ? data.top_products.map((product, index) => (
                  <div key={product.id ?? index} className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
                    <div className="min-w-0"><p className="truncate font-medium text-slate-900">{index + 1}. {product.name || "Untitled product"}</p>
                      <p className="text-xs text-slate-500">{number(product.orders)} orders</p></div>
                    <span className="shrink-0 font-semibold text-blue-700">{number(product.quantity)} sold</span>
                  </div>
                )) : <p className="text-sm text-slate-500">No paid product sales in this period.</p>}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}