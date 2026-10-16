import { Link } from "react-router-dom";

export default function OrganisationNotFoundPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <h2 className="text-xl font-bold text-[#073B4C]">Page not found</h2>
      <p className="mt-2 text-sm text-slate-500">This organisation workspace page does not exist.</p>
      <Link to=".." className="mt-5 inline-flex rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white">Back to overview</Link>
    </div>
  );
}