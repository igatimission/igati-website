import { BriefcaseBusiness } from "lucide-react";

export default function OrganisationOpportunitiesPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#073B4C]">Opportunities</h2>
      <p className="mt-1 text-sm text-slate-500">Manage opportunities linked to your organisation.</p>
      <div className="mt-8 rounded-xl border border-dashed border-slate-300 px-5 py-12 text-center">
        <BriefcaseBusiness className="mx-auto text-slate-300" size={36} />
        <p className="mt-3 font-semibold text-slate-700">Opportunities page scaffold</p>
        <p className="mt-1 text-sm text-slate-500">Connect this page to the existing Opportunity APIs before enabling create and edit actions.</p>
      </div>
    </section>
  );
}