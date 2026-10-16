import { Building2, Users, ShieldCheck, Newspaper, FolderKanban, BriefcaseBusiness } from "lucide-react";
import { useOrganisationWorkspace } from "../../layouts/OrganisationAdminLayout";

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#073B4C]">{value ?? 0}</p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>
        <div className="rounded-xl bg-[#07505E]/10 p-3 text-[#07505E]"><Icon size={21} /></div>
      </div>
    </div>
  );
}

export default function DashboardHomePage() {
  const { organisation, recentActivities } = useOrganisationWorkspace();
  const statusClass = {
    approved: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    draft: "bg-slate-100 text-slate-600",
    changes_requested: "bg-orange-50 text-orange-700",
    rejected: "bg-rose-50 text-rose-700",
    suspended: "bg-rose-50 text-rose-700",
  }[organisation?.approval_status] || "bg-slate-100 text-slate-600";

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#6C994E]">Welcome to your workspace</p>
          <h2 className="mt-1 text-2xl font-bold text-[#073B4C]">Dashboard overview</h2>
          <p className="mt-1 text-sm text-slate-500">Monitor your organisation and manage its ecosystem activity.</p>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${statusClass}`}>
          {(organisation?.approval_status || "unknown").replaceAll("_", " ")}
        </span>
      </div>

      {organisation?.approval_status !== "approved" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="font-semibold text-amber-900">Your organisation is {organisation?.approval_status?.replaceAll("_", " ")}.</p>
          <p className="mt-1 text-sm leading-6 text-amber-800">Some public-facing features may be limited until IGATI approves the organisation.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Approved members" value={organisation?.members} description="Approved memberships" />
        <StatCard icon={ShieldCheck} label="Pending requests" value={organisation?.pending_members} description="Requests awaiting review" />
        <StatCard icon={Newspaper} label="Posts & activities" value={organisation?.posts} description="Organisation updates" />
        <StatCard icon={FolderKanban} label="Projects" value={organisation?.projects} description={`${organisation?.opportunities || 0} opportunities`} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#07505E]/10 p-3 text-[#07505E]"><Building2 size={22} /></div>
            <div><h3 className="font-bold text-[#073B4C]">{organisation?.name}</h3><p className="text-sm text-slate-500">{organisation?.organisation_type || "Organisation"}</p></div>
          </div>
          {organisation?.tagline && <p className="mt-4 font-medium">{organisation.tagline}</p>}
          <p className="mt-3 text-sm leading-6 text-slate-600">{organisation?.description || "Add a description to introduce your organisation to the IGATI ecosystem."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
            {organisation?.location && <span className="inline-flex items-center gap-2"><Building2 size={16} />{organisation.location}</span>}
            {organisation?.website && <a className="text-[#07505E] underline" href={organisation.website} target="_blank" rel="noreferrer">Visit website</a>}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-3"><h3 className="font-bold text-[#073B4C]">Recent posts</h3><Newspaper className="text-[#07505E]" size={20} /></div>
          {recentActivities.length === 0 ? (
            <p className="mt-5 text-sm text-slate-500">No posts yet. The posts management page can be used to add organisation updates.</p>
          ) : (
            <div className="mt-4 divide-y divide-slate-100">
              {recentActivities.map((item) => <div key={item.id} className="py-3"><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs capitalize text-slate-500">{(item.post_type || "activity").replaceAll("_", " ")} · {item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</p></div>)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}