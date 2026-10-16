
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Users,
  LoaderCircle, 
  ArrowRight, 
  ShieldCheck
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

  const [joinForm, setJoinForm] = useState({
  full_name: "",
  email: "",
  phone: "",
  message: "",
});

const [joinLoading, setJoinLoading] = useState(false);
const [joinMessage, setJoinMessage] = useState("");

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
  const { name, value } = event.target;

  setForm((previous) => ({
    ...previous,
    [name]: value,
  }));
};

  const submitJoinRequest = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setFormError("");
  setSuccess("");

  try {
    const response = await apiRequest(
      `/organisations/${encodeURIComponent(organisation.slug)}/join/`,
      {
        method: "POST",
        body: JSON.stringify(form),
      }
    );

    setSuccess(
      response?.message ||
        "Your membership request has been submitted successfully."
    );

    setForm({
      full_name: "",
      email: "",
      phone: "",
      message: "",
    });
  } catch (error) {
    setFormError(
      error?.message || "Failed to submit your request. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};

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
    type="activity"
    empty="This organisation has not published activities yet."
  />
)}

{activeTab === "Projects" && (
  <ContentList
    title="Our projects"
    items={projects}
    type="project"
    empty="No public projects are listed yet."
  />
)}

{activeTab === "Opportunities" && (
  <ContentList
    title="Opportunities"
    items={opportunities}
    type="opportunity"
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
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      <span className="font-bold">!</span>
      <p>{formError}</p>
    </div>
  )}

  {[
    {
      name: "full_name",
      label: "Full name",
      placeholder: "Enter your full name",
      type: "text",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email address",
      placeholder: "you@example.com",
      type: "email",
      autoComplete: "email",
    },
    {
      name: "phone",
      label: "Phone number",
      placeholder: "+254 7XX XXX XXX",
      type: "tel",
      autoComplete: "tel",
    },
  ].map(({ name, label, placeholder, type, autoComplete }) => (
    <div key={name}>
      <label
        htmlFor={`join-${name}`}
        className="mb-2 block text-sm font-semibold text-[#073B4C]"
      >
        {label}
        {name !== "phone" && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        id={`join-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={name !== "phone"}
        value={form[name]}
        onChange={updateForm}
        placeholder={placeholder}
        disabled={submitting}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-[#16313B] outline-none transition placeholder:text-gray-400 focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
      />
    </div>
  ))}

  <div>
    <label
      htmlFor="join-message"
      className="mb-2 block text-sm font-semibold text-[#073B4C]"
    >
      Why would you like to join?
      <span className="ml-1 text-red-500">*</span>
    </label>

    <textarea
      id="join-message"
      name="message"
      value={form.message}
      onChange={updateForm}
      required
      minLength={10}
      maxLength={2000}
      rows={5}
      disabled={submitting}
      placeholder="Tell us about your interests, experience, skills, and how you hope to contribute to this organisation..."
      className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm leading-6 text-[#16313B] outline-none transition placeholder:text-gray-400 focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
    />

    <p className="mt-2 text-xs text-gray-500">
      Explain your interests and how you would like to contribute.
    </p>
  </div>

  <button
    type="submit"
    disabled={submitting}
    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#07505E] focus:outline-none focus:ring-4 focus:ring-[#073B4C]/20 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {submitting ? (
      <>
        <LoaderCircle size={18} className="animate-spin" />
        Submitting your request...
      </>
    ) : (
      <>
        Submit membership request
        <ArrowRight size={18} />
      </>
    )}
  </button>

  <div className="flex items-start gap-3 rounded-xl bg-[#F8FAF7] p-4">
    <ShieldCheck
      size={19}
      className="mt-0.5 shrink-0 text-[#6C994E]"
    />
    <p className="text-xs leading-5 text-gray-600">
      Your request will be sent to the organisation for review. Submitting
      this form does not automatically make you a member. Membership is
      subject to the organisation's approval.
    </p>
  </div>
</form>
            )}
          </section>
        )}
      </div>
    </main>
  );
}


function ContentList({ title, items, empty, type = "activity" }) {
  const getImage = (item) => {
    const candidates =
      type === "project"
        ? [item.cover_image, item.image, item.featured_image, item.thumbnail]
        : [
            item.cover_image,
            item.image,
            item.featured_image,
            item.banner_image,
            item.thumbnail,
          ];

    return candidates.find(
      (value) => typeof value === "string" && value.trim()
    );
  };

  const getDate = (item) => {
    const value =
      item.deadline ||
      item.start_date ||
      item.activity_date ||
      item.event_date ||
      item.created_at;

    if (!value) return null;

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return null;

    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section>
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6C994E]">
            Explore our work
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#073B4C]">
            {title}
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      {items.length ? (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const image = getImage(item);
            const itemTitle = item.title || item.name || "Untitled";
            const description =
              item.description ||
              item.summary ||
              item.content ||
              "Discover more about this organisation's work and contribution.";

            const date = getDate(item);

            return (
              <article
                key={item.id || item.slug || itemTitle}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#9BC36B] hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#073B4C] to-[#07505E]">
                  {image ? (
                    <img
                      src={image}
                      alt={itemTitle}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center text-white">
                      <Building2
                        size={36}
                        className="text-[#9BC36B]"
                      />
                      <p className="mt-3 text-sm font-semibold text-white/90">
                        IGATI Global Mission Network
                      </p>
                      <p className="mt-1 text-xs text-white/60">
                        {type === "project"
                          ? "Project"
                          : type === "opportunity"
                            ? "Opportunity"
                            : "Organisation activity"}
                      </p>
                    </div>
                  )}

                  {/* Category */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/30 bg-[#073B4C]/85 px-3 py-1.5 text-xs font-semibold capitalize text-white backdrop-blur-sm">
                      {item.opportunity_type ||
                        item.post_type ||
                        item.status ||
                        (type === "project"
                          ? "Project"
                          : type === "opportunity"
                            ? "Opportunity"
                            : "Activity")}
                    </span>
                  </div>

                  {item.is_featured && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-[#F2B632] px-3 py-1.5 text-xs font-bold text-[#073B4C]">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug text-[#073B4C] transition group-hover:text-[#527A3A]">
                    {itemTitle}
                  </h3>

                  <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-6 text-gray-600">
                    {description}
                  </p>

                  {item.eligibility && type === "opportunity" && (
                    <div className="mt-4 rounded-xl bg-[#F8FAF7] p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#527A3A]">
                        Eligibility
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {item.eligibility}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto">
                    {(date || item.location) && (
                      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
                        {date && (
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} className="text-[#6C994E]" />
                            {type === "opportunity" && item.deadline
                              ? `Deadline: ${date}`
                              : date}
                          </span>
                        )}

                        {item.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-[#6C994E]" />
                            {typeof item.location === "string"
                              ? item.location
                              : item.location.name || item.location.title || ""}
                          </span>
                        )}
                      </div>
                    )}

                    {type === "opportunity" && item.application_url && (
                      <a
                        href={item.application_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#07505E]"
                      >
                        View opportunity
                        <ArrowRight size={16} />
                      </a>
                    )}

                    {type !== "opportunity" && item.external_url && (
                      <a
                        href={item.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#527A3A] hover:text-[#073B4C]"
                      >
                        Learn more
                        <ArrowRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF1E4] text-[#527A3A]">
            <Building2 size={28} />
          </div>
          <h3 className="mt-4 font-bold text-[#073B4C]">
            Nothing published yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            {empty}
          </p>
        </div>
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
