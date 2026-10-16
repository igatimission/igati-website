import { useEffect, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { apiRequest } from "../../api/api";
import { useOrganisationWorkspace } from "../../layouts/OrganisationAdminLayout";

const fields = [
  ["tagline", "Tagline", "text"],
  ["website", "Website", "url"],
  ["email", "Email", "email"],
  ["phone", "Phone", "text"],
  ["description", "Description", "textarea"],
  ["mission", "Mission", "textarea"],
  ["vision", "Vision", "textarea"],
  ["logo", "Logo image URL", "url"],
  ["cover_image", "Cover image URL", "url"],
];
const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#07505E] focus:ring-2 focus:ring-[#07505E]/10";

export default function OrganisationSettingsPage() {
  const { slug, organisation, setOrganisation } = useOrganisationWorkspace();
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setForm(Object.fromEntries(fields.map(([key]) => [key, organisation?.[key] || ""])));
  }, [organisation]);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true); setError(""); setSuccess("");
    try {
      const response = await apiRequest(`/organisations/${encodeURIComponent(slug)}/dashboard/update/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response?.organisation) setOrganisation(response.organisation);
      setSuccess(response?.message || "Organisation details saved.");
    } catch (err) {
      setError(err?.message || "Could not save organisation details.");
    } finally { setSaving(false); }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6"><h2 className="text-xl font-bold text-[#073B4C]">Organisation details</h2><p className="mt-1 text-sm text-slate-500">Update the information displayed on your public profile.</p></div>
      <form onSubmit={submit} className="space-y-5 p-5 sm:p-6">
        {error && <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
        {success && <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{success}</div>}
        <div className="grid gap-5 md:grid-cols-2">
          {fields.map(([name, label, type]) => (
            <label key={name} className={`block text-sm font-semibold text-slate-700 ${["description", "logo", "cover_image"].includes(name) ? "md:col-span-2" : ""}`}>
              {label}
              {type === "textarea" ? <textarea name={name} value={form[name] || ""} onChange={update} rows={name === "description" ? 4 : 3} className={inputClass} required={name === "description"} /> : <input name={name} type={type} value={form[name] || ""} onChange={update} className={inputClass} />}
            </label>
          ))}
        </div>
        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-[#07505E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#073B4C] disabled:opacity-60">
            {saving ? <LoaderCircle size={17} className="animate-spin" /> : <Save size={17} />}{saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}