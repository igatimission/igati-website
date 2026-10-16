
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Check,
  ExternalLink,
  Globe,
  LayoutDashboard,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  ShieldCheck,
  Users,
  X,
  BriefcaseBusiness,
  FolderKanban,
  Newspaper,
} from "lucide-react";

import { apiRequest } from "../api/api";

const initialForm = {
  tagline: "",
  description: "",
  mission: "",
  vision: "",
  website: "",
  email: "",
  phone: "",
  logo: "",
  cover_image: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#07505E] focus:ring-2 focus:ring-[#07505E]/10";

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#073B4C]">
            {value ?? 0}
          </p>
          <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>
        <div className="rounded-xl bg-[#07505E]/10 p-3 text-[#07505E]">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    approved: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    draft: "bg-slate-100 text-slate-600",
    changes_requested: "bg-orange-50 text-orange-700",
    rejected: "bg-rose-50 text-rose-700",
    suspended: "bg-rose-50 text-rose-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {(status || "unknown").replaceAll("_", " ")}
    </span>
  );
}

export default function OrganisationDashboardPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [organisation, setOrganisation] = useState(null);
  const [activities, setActivities] = useState([]);
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyMember, setBusyMember] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [dashboardResponse, membersResponse] = await Promise.all([
        apiRequest(
          `/organisations/${encodeURIComponent(slug)}/dashboard/`
        ),
        apiRequest(
          `/organisations/${encodeURIComponent(slug)}/dashboard/members/`
        ),
      ]);

      const org = dashboardResponse?.organisation;
      if (!org) {
        throw new Error("The organisation details were not returned.");
      }

      setOrganisation(org);
      setActivities(dashboardResponse?.recent_activities || []);
      setMembers(membersResponse?.members || []);

      setForm({
        tagline: org.tagline || "",
        description: org.description || "",
        mission: org.mission || "",
        vision: org.vision || "",
        website: org.website || "",
        email: org.email || "",
        phone: org.phone || "",
        logo: org.logo || "",
        cover_image: org.cover_image || "",
      });
    } catch (err) {
      setError(
        err?.message ||
          "Could not load this dashboard. Check your access and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const saveOrganisation = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await apiRequest(
        `/organisations/${encodeURIComponent(slug)}/dashboard/update/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (response?.organisation) {
        setOrganisation(response.organisation);
      }

      setSuccess(response?.message || "Organisation details saved.");
    } catch (err) {
      setError(err?.message || "Could not save organisation details.");
    } finally {
      setSaving(false);
    }
  };

  const decideMembership = async (membershipId, decision) => {
    setBusyMember(membershipId);
    setError("");
    setSuccess("");

    try {
      const response = await apiRequest(
        `/organisations/${encodeURIComponent(slug)}/dashboard/members/${membershipId}/decision/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ decision }),
        }
      );

      setMembers((previous) =>
        previous.filter((member) => member.id !== membershipId)
      );
      setSuccess(response?.message || "Membership request updated.");
      setOrganisation((previous) =>
        previous
          ? {
              ...previous,
              members:
                decision === "approved"
                  ? (previous.members || 0) + 1
                  : previous.members,
              pending_members: Math.max(
                0,
                (previous.pending_members || 0) - 1
              ),
            }
          : previous
      );
    } catch (err) {
      setError(err?.message || "Could not update the membership request.");
    } finally {
      setBusyMember(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAF7]">
        <LoaderCircle className="animate-spin text-[#07505E]" size={34} />
      </div>
    );
  }

  if (error && !organisation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAF7] px-5">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <ShieldCheck className="mx-auto text-[#07505E]" size={38} />
          <h1 className="mt-4 text-xl font-bold text-[#073B4C]">
            Dashboard unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{error}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate("/my-profile")}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold"
            >
              Back to profile
            </button>
            <button
              onClick={loadDashboard}
              className="rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!organisation) return null;

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#16313B]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col bg-[#073B4C] text-white md:flex">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              {organisation.logo ? (
                <img
                  src={organisation.logo}
                  alt=""
                  className="h-11 w-11 rounded-xl bg-white object-cover"
                />
              ) : (
                <div className="rounded-xl bg-white/10 p-3">
                  <Building2 size={22} />
                </div>
              )}
              <div className="min-w-0">
                <p className="font-bold">IGATI</p>
                <p className="truncate text-xs text-white/60">
                  Organisation workspace
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            <a
              href="#overview"
              className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
            >
              <LayoutDashboard size={18} /> Overview
            </a>
            <a
              href="#members"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/10"
            >
              <Users size={18} /> Membership requests
            </a>
            <a
              href="#settings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/10"
            >
              <Building2 size={18} /> Organisation details
            </a>
          </nav>

          <div className="border-t border-white/10 p-5">
            <p className="truncate text-sm font-semibold">{organisation.name}</p>
            <p className="mt-1 text-xs text-white/60">Administrator workspace</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => navigate("/my-profile")}
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                  title="Back to profile"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6C994E]">
                    Organisation workspace
                  </p>
                  <h1 className="truncate text-lg font-bold text-[#073B4C] sm:text-xl">
                    {organisation.name}
                  </h1>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={loadDashboard}
                  className="rounded-xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50"
                  title="Refresh dashboard"
                >
                  <RefreshCw size={17} />
                </button>
                <button
                  onClick={() => navigate(`/organisations/${slug}`)}
                  className="hidden items-center gap-2 rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#073B4C] sm:inline-flex"
                >
                  <ExternalLink size={16} /> Public profile
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 px-4 py-7 sm:px-6 lg:px-8">
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                {success}
              </div>
            )}

            <section id="overview" className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#073B4C]">
                    Dashboard overview
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Monitor your organisation and manage its information.
                  </p>
                </div>
                <StatusBadge status={organisation.approval_status} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  icon={Users}
                  label="Approved members"
                  value={organisation.members}
                  description="Active approved memberships"
                />
                <StatCard
                  icon={ShieldCheck}
                  label="Pending requests"
                  value={organisation.pending_members}
                  description="Requests awaiting review"
                />
                <StatCard
                  icon={Newspaper}
                  label="Activities"
                  value={organisation.posts}
                  description="Organisation posts"
                />
                <StatCard
                  icon={FolderKanban}
                  label="Projects"
                  value={organisation.projects}
                  description={`${organisation.opportunities || 0} opportunities`}
                />
              </div>

              {organisation.approval_status !== "approved" && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="font-semibold text-amber-900">
                    Organisation status:{" "}
                    {organisation.approval_status.replaceAll("_", " ")}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-amber-800">
                    Some public-facing features may be limited until the
                    organisation is approved by IGATI.
                  </p>
                </div>
              )}
            </section>

            <section
              id="members"
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
                <div>
                  <h2 className="text-lg font-bold text-[#073B4C]">
                    Membership requests
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review people who want to join your organisation.
                  </p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  {members.length} pending
                </span>
              </div>

              {members.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Users className="mx-auto text-slate-300" size={34} />
                  <p className="mt-3 font-semibold text-slate-700">
                    No pending membership requests
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    New requests will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#073B4C]">
                          {member.name || "IGATI member"}
                        </p>
                        <p className="mt-1 text-xs capitalize text-slate-500">
                          Requested {member.created_at
                            ? new Date(member.created_at).toLocaleDateString()
                            : "recently"}
                        </p>
                        {member.request_message && (
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {member.request_message}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          disabled={busyMember === member.id}
                          onClick={() =>
                            decideMembership(member.id, "approved")
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                          {busyMember === member.id ? (
                            <LoaderCircle size={16} className="animate-spin" />
                          ) : (
                            <Check size={16} />
                          )}
                          Approve
                        </button>
                        <button
                          disabled={busyMember === member.id}
                          onClick={() =>
                            decideMembership(member.id, "rejected")
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                        >
                          <X size={16} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section
              id="settings"
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-[#073B4C]">
                  Organisation information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep your organisation's public information up to date.
                </p>
              </div>

              <form onSubmit={saveOrganisation} className="space-y-5 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Tagline
                    <input
                      name="tagline"
                      value={form.tagline}
                      onChange={updateField}
                      className={`${inputClass} mt-2`}
                      maxLength={255}
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Website
                    <span className="mt-2 flex items-center gap-2">
                      <Globe size={17} className="shrink-0 text-slate-400" />
                      <input
                        name="website"
                        type="url"
                        value={form.website}
                        onChange={updateField}
                        className={inputClass}
                        placeholder="https://example.org"
                      />
                    </span>
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Email
                    <span className="mt-2 flex items-center gap-2">
                      <Mail size={17} className="shrink-0 text-slate-400" />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateField}
                        className={inputClass}
                      />
                    </span>
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Phone
                    <span className="mt-2 flex items-center gap-2">
                      <Phone size={17} className="shrink-0 text-slate-400" />
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={updateField}
                        className={inputClass}
                      />
                    </span>
                  </label>

                  <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
                    Description
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={updateField}
                      rows={4}
                      className={`${inputClass} mt-2`}
                      required
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Mission
                    <textarea
                      name="mission"
                      value={form.mission}
                      onChange={updateField}
                      rows={3}
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Vision
                    <textarea
                      name="vision"
                      value={form.vision}
                      onChange={updateField}
                      rows={3}
                      className={`${inputClass} mt-2`}
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
                    Logo image URL
                    <input
                      name="logo"
                      type="url"
                      value={form.logo}
                      onChange={updateField}
                      className={`${inputClass} mt-2`}
                      placeholder="https://..."
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
                    Cover image URL
                    <input
                      name="cover_image"
                      type="url"
                      value={form.cover_image}
                      onChange={updateField}
                      className={`${inputClass} mt-2`}
                      placeholder="https://..."
                    />
                  </label>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-5">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#07505E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#073B4C] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <Save size={17} />
                    )}
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <h2 className="text-lg font-bold text-[#073B4C]">
                  Recent activities
                </h2>
              </div>

              {activities.length === 0 ? (
                <p className="p-6 text-sm text-slate-500">
                  No organisation activities have been posted yet.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start justify-between gap-4 p-5"
                    >
                      <div>
                        <p className="font-semibold text-[#073B4C]">
                          {activity.title}
                        </p>
                        <p className="mt-1 text-xs capitalize text-slate-500">
                          {(activity.post_type || "activity").replaceAll("_", " ")}
                          {" · "}
                          {activity.created_at
                            ? new Date(activity.created_at).toLocaleDateString()
                            : ""}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          activity.is_public
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {activity.is_public ? "Public" : "Private"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <footer className="pb-4 text-center text-xs text-slate-400">
              IGATI Global Mission Network · Organisation workspace
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
