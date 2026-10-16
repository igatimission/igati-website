
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  Users,
} from "lucide-react";
import { apiRequest } from "../api/api";

const API = import.meta.env.VITE_API_URL;

const tabs = [
  "Overview",
  "Activities",
  "Projects",
  "Opportunities",
  "Members",
  "Join",
];

export default function OrganisationProfilePage() {
  const { slug } = useParams();

  const [organisation, setOrganisation] = useState(null);
  const [activities, setActivities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadOrganisation() {
      setLoading(true);
      setError("");

      try {
        // Public profile endpoint should support a slug or ID.
        const detail = await apiRequest(
          `/organisations/${encodeURIComponent(slug)}/`
        );

        if (cancelled) return;

        const org = detail.organisation || detail;
        setOrganisation(org);

        // These endpoints should allow public GET requests for
        // approved, public organisations.
        const id = org.id;

        const results = await Promise.allSettled([
          apiRequest(`/organisations/${id}/activities/`),
          apiRequest(`/organisations/${id}/projects/`),
          apiRequest(`/organisations/${id}/opportunities/`),
          apiRequest(`/organisations/${encodeURIComponent(slug)}/members/`),
        ]);

        if (cancelled) return;

        const unwrap = (result, key) => {
          if (result.status !== "fulfilled") return [];
          const value = result.value;
          if (Array.isArray(value)) return value;
          return value?.[key] || value?.results || [];
        };

        setActivities(unwrap(results[0], "activities"));
        setProjects(unwrap(results[1], "projects"));
        setOpportunities(unwrap(results[2], "opportunities"));
        setMembers(unwrap(results[3], "members"));
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message ||
              "Unable to load this organisation. Please try again."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrganisation();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const updateForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  async function submitJoinRequest(event) {
    event.preventDefault();
    setSubmitting(true);
    setSuccess("");
    setFormError("");

    try {
      await apiRequest(
        `/organisations/${organisation.id}/join-requests/`,
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      setSuccess(
        "Your request has been submitted. The organisation will review it."
      );

      setForm({
        full_name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setFormError(
        err.message ||
          "We could not submit your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="animate-spin text-[#6C994E]" size={36} />
      </div>
    );
  }

  if (error || !organisation) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <Building2 className="mx-auto text-gray-400" size={40} />
        <h1 className="mt-5 text-2xl font-bold text-[#073B4C]">
          Organisation unavailable
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          {error || "This organisation could not be found."}
        </p>
        <Link
          to="/ecosystem"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[#527A3A]"
        >
          <ArrowLeft size={16} /> Back to ecosystem
        </Link>
      </div>
    );
  }

  const description =
    organisation.description ||
    organisation.summary ||
    "Learn about this organisation and its contribution to the IGATI ecosystem.";

  return (
    <main className="min-h-screen bg-[#F8FAF7] pb-20">
      <div className="bg-[#073B4C] text-white">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/ecosystem"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} /> Explore ecosystem
          </Link>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            {organisation.logo ? (
              <img
                src={organisation.logo}
                alt={`${organisation.name} logo`}
                className="h-24 w-24 rounded-2xl bg-white object-contain p-2"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 text-[#9BC36B]">
                <Building2 size={42} />
              </div>
            )}

            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9BC36B]">
                IGATI Ecosystem Organisation
              </p>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {organisation.name}
              </h1>

              {organisation.tagline && (
                <p className="mt-2 text-sm text-white/80">
                  {organisation.tagline}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
                {organisation.address && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {organisation.address}
                  </span>
                )}

                {organisation.email && (
                  <a
                    href={`mailto:${organisation.email}`}
                    className="flex items-center gap-1.5 hover:text-white"
                  >
                    <Mail size={14} /> {organisation.email}
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveTab("Join")}
              className="rounded-xl bg-[#F2B632] px-6 py-3 text-sm font-bold text-[#073B4C] transition hover:bg-[#ffd16b]"
            >
              Join this organisation
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 border-b-2 px-4 py-4 text-sm font-semibold transition ${
                activeTab === tab
                  ? "border-[#6C994E] text-[#073B4C]"
                  : "border-transparent text-gray-500 hover:text-[#073B4C]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {activeTab === "Overview" && (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#073B4C]">
                About this organisation
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
                {description}
              </p>

              {organisation.website && (
                <a
                  href={organisation.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block font-semibold text-[#527A3A] underline"
                >
                  Visit website
                </a>
              )}
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="text-lg font-bold text-[#073B4C]">
                At a glance
              </h2>

              <div className="mt-5 space-y-4">
                {[
                  [Users, members.length, "Members"],
                  [Building2, projects.length, "Projects"],
                  [CalendarDays, activities.length, "Activities"],
                ].map(([Icon, count, label]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl bg-[#F8FAF7] p-4"
                  >
                    <span className="flex items-center gap-3 text-sm text-gray-600">
                      <Icon size={18} className="text-[#6C994E]" />
                      {label}
                    </span>
                    <strong className="text-lg text-[#073B4C]">
                      {count}
                    </strong>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "Activities" && (
          <ContentList
            title="Activities and achievements"
            items={activities}
            empty="This organisation has not published activities yet."
          />
        )}

        {activeTab === "Projects" && (
          <ContentList
            title="Projects"
            items={projects}
            empty="No public projects are listed yet."
          />
        )}

        {activeTab === "Opportunities" && (
          <ContentList
            title="Opportunities"
            items={opportunities}
            empty="No public opportunities are listed yet."
          />
        )}

        {activeTab === "Members" && (
          <section>
            <h2 className="text-2xl font-bold text-[#073B4C]">
              Organisation members
            </h2>

            {members.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                  <article
                    key={member.id}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5"
                  >
                    {member.profile_image ? (
                      <img
                        src={member.profile_image}
                        alt=""
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF1E4] font-bold text-[#527A3A]">
                        {(member.full_name || "M").charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-[#073B4C]">
                        {member.full_name || "Organisation member"}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {member.role || "Member"}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="Member profiles will appear here when available." />
            )}
          </section>
        )}

        {activeTab === "Join" && (
          <section className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-[#EAF1E4] p-3 text-[#527A3A]">
                <Users size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#073B4C]">
                  Join {organisation.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Tell the organisation a little about yourself and why you
                  would like to become a member. Your request will be reviewed
                  by its team.
                </p>
              </div>
            </div>

            {success ? (
              <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
                <CheckCircle2 className="mb-2" size={22} />
                {success}
              </div>
            ) : (
              <form onSubmit={submitJoinRequest} className="mt-8 space-y-5">
                {formError && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {formError}
                  </p>
                )}

                {[
                  ["full_name", "Full name", "Jane Doe", "text"],
                  ["email", "Email address", "you@example.com", "email"],
                  ["phone", "Phone number", "+254...", "tel"],
                ].map(([name, label, placeholder, type]) => (
                  <div key={name}>
                    <label className="mb-2 block text-sm font-semibold text-[#073B4C]">
                      {label}
                    </label>
                    <input
                      name={name}
                      type={type}
                      required={name !== "phone"}
                      value={form[name]}
                      onChange={updateForm}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#6C994E] focus:ring-2 focus:ring-[#6C994E]/10"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#073B4C]">
                    Why would you like to join?
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={updateForm}
                    required
                    rows={4}
                    placeholder="Tell us about your interests, experience and how you hope to contribute..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#6C994E] focus:ring-2 focus:ring-[#6C994E]/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#07505E] disabled:opacity-60"
                >
                  {submitting && (
                    <LoaderCircle size={17} className="animate-spin" />
                  )}
                  {submitting ? "Submitting..." : "Submit membership request"}
                </button>

                <p className="text-xs leading-5 text-gray-500">
                  Submitting this form sends a membership request. It does not
                  automatically make you a member.
                </p>
              </form>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function ContentList({ title, items, empty }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-[#073B4C]">{title}</h2>

      {items.length ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-[#073B4C]">
                {item.title || item.name}
              </h3>
              <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-gray-600">
                {item.description ||
                  item.summary ||
                  item.content ||
                  "Explore this organisation's work and contribution."}
              </p>
              {(item.deadline || item.activity_date) && (
                <p className="mt-4 text-xs text-gray-500">
                  {item.deadline
                    ? `Deadline: ${item.deadline}`
                    : `Published: ${new Date(
                        item.activity_date
                      ).toLocaleDateString()}`}
                </p>
              )}
              {item.application_url && (
                <a
                  href={item.application_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-bold text-[#527A3A] underline"
                >
                  View opportunity
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <EmptyState text={empty} />
      )}
    </section>
  );
}

function EmptyState({ text }) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
      {text}
    </div>
  );
}
