import { useCallback, useEffect, useState } from "react";
import { Check, LoaderCircle, Users, X } from "lucide-react";
import { apiRequest } from "../../api/api";
import { useOrganisationWorkspace } from "../../layouts/OrganisationAdminLayout";

export default function MembershipRequestsPage() {
  const { slug, setOrganisation } = useOrganisationWorkspace();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiRequest(`/organisations/${encodeURIComponent(slug)}/dashboard/members/`);
      setMembers(response?.members || []);
    } catch (err) {
      setError(err?.message || "Could not load membership requests.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  const decide = async (id, decision) => {
    setBusyId(id);
    setError("");
    setMessage("");
    try {
      const response = await apiRequest(
        `/organisations/${encodeURIComponent(slug)}/dashboard/members/${id}/decision/`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ decision }) }
      );
      setMembers((current) => current.filter((member) => member.id !== id));
      setMessage(response?.message || "Membership request updated.");
      setOrganisation((current) => current ? ({
        ...current,
        members: decision === "approved" ? (current.members || 0) + 1 : current.members,
        pending_members: Math.max(0, (current.pending_members || 0) - 1),
      }) : current);
    } catch (err) {
      setError(err?.message || "Could not update this request.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
        <div><h2 className="text-xl font-bold text-[#073B4C]">Membership requests</h2><p className="mt-1 text-sm text-slate-500">Approve or reject requests to join your organisation.</p></div>
        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">{members.length} pending</span>
      </div>
      <div className="p-5 sm:p-6">
        {error && <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
        {message && <div className="mb-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div>}
        {loading ? (
          <div className="flex justify-center py-12"><LoaderCircle className="animate-spin text-[#07505E]" size={30} /></div>
        ) : members.length === 0 ? (
          <div className="py-12 text-center"><Users className="mx-auto text-slate-300" size={36} /><p className="mt-3 font-semibold text-slate-700">No pending requests</p><p className="mt-1 text-sm text-slate-500">New join requests will appear here.</p></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {members.map((member) => (
              <article key={member.id} className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0"><h3 className="font-semibold text-[#073B4C]">{member.name || "IGATI member"}</h3><p className="mt-1 text-xs text-slate-500">Requested {member.created_at ? new Date(member.created_at).toLocaleDateString() : "recently"}</p>{member.request_message && <p className="mt-2 text-sm leading-6 text-slate-600">{member.request_message}</p>}</div>
                <div className="flex shrink-0 gap-2">
                  <button disabled={busyId === member.id} onClick={() => decide(member.id, "approved")} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50">
                    {busyId === member.id ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />} Approve
                  </button>
                  <button disabled={busyId === member.id} onClick={() => decide(member.id, "rejected")} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"><X size={16} /> Reject</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}