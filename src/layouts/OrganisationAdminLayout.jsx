import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { apiRequest } from "../api/api";
import OrganisationAdminTopbar from "../components/layout/organisation_admin/OrganisationAdminTopbar";
import OrganisationAdminSidebar from "../components/layout/organisation_admin/OrganisationAdminSidebar";


const WorkspaceContext = createContext(null);

export function useOrganisationWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useOrganisationWorkspace must be used inside OrganisationDashboardLayout");
  return context;
}

export default function OrganisationAdminLayout() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [organisation, setOrganisation] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiRequest(`/organisations/${encodeURIComponent(slug)}/dashboard/`);
      if (!response?.organisation) throw new Error("Organisation details were not returned.");
      setOrganisation(response.organisation);
      setRecentActivities(response.recent_activities || []);
    } catch (err) {
      setError(err?.message || "Could not load this organisation workspace.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);
  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#F8FAF7]"><LoaderCircle className="animate-spin text-[#07505E]" size={34} /></div>;
  }

  if (error && !organisation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAF7] px-5">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <ShieldCheck className="mx-auto text-[#07505E]" size={38} />
          <h1 className="mt-4 text-xl font-bold text-[#073B4C]">Dashboard unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{error}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => navigate("/my-profile")} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold">Back to profile</button>
            <button onClick={loadDashboard} className="rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white">Try again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WorkspaceContext.Provider value={{ slug, organisation, setOrganisation, recentActivities, setRecentActivities, reloadDashboard: loadDashboard }}>
      <div className="min-h-screen bg-[#F8FAF7] text-[#16313B]">
        <div className="flex min-h-screen">
          <OrganisationAdminSidebar organisation={organisation} />
          <div className="min-w-0 flex-1">
            <OrganisationAdminTopbar
              organisation={organisation}
              onRefresh={loadDashboard}
              mobileMenuOpen={mobileMenuOpen}
              onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
            />
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-40 md:hidden">
                <button className="absolute inset-0 bg-slate-950/40" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)} />
                <div className="relative h-full w-[min(19rem,85vw)] shadow-2xl">
                  <OrganisationAdminSidebar organisation={organisation} mobile onNavigate={() => setMobileMenuOpen(false)} />
                </div>
              </div>
            )}
            <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
              {error && <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
}