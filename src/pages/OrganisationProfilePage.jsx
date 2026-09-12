import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Building2,
  MapPin,
  Globe2,
  Mail,
  Phone,
  Users,
  Handshake,
  Target,
  Lightbulb,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  UserPlus,
  CheckCircle2,
  X,
  BriefcaseBusiness,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

import { organisationApi } from "../api/organisationApi";

export default function OrganisationProfilePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [organisation, setOrganisation] = useState(null);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");

  useEffect(() => {
    loadOrganisation();
  }, [slug]);

  const loadOrganisation = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await organisationApi.getDetail(slug);

      const org =
        response?.organisation || response;

      setOrganisation(org);

      setMembers(
        Array.isArray(response?.members)
          ? response.members
          : []
      );

      setPosts(
        Array.isArray(response?.posts)
          ? response.posts
          : []
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load organisation."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    try {
      setJoining(true);
      setError("");
      setSuccess("");

      const response =
        await organisationApi.join(slug, {
          request_message:
            requestMessage.trim(),
        });

      setSuccess(
        response?.message ||
          "Your membership request has been submitted."
      );

      setShowJoinModal(false);
      setRequestMessage("");
    } catch (err) {
      setError(
        err?.message ||
          "Unable to submit membership request."
      );
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAF7]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#07505E] mx-auto" />
          <p className="mt-4 text-slate-600">
            Loading organisation...
          </p>
        </div>
      </div>
    );
  }

  if (error && !organisation) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAF7] px-4">
        <div className="max-w-md w-full rounded-3xl border border-red-100 bg-white p-8 text-center">
          <X className="w-10 h-10 text-red-500 mx-auto" />

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Unable to load organisation
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            {error}
          </p>

          <button
            onClick={loadOrganisation}
            className="mt-6 px-5 py-3 rounded-xl bg-[#07505E] text-white font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#07505E] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-700 mt-0.5" />
            <p className="text-sm font-medium text-green-800">
              {success}
            </p>
          </div>
        )}

        {error && organisation && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Hero */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="relative h-56 md:h-72 bg-gradient-to-br from-[#073B4C] via-[#07505E] to-[#6C994E]">
            {organisation?.cover_image && (
              <>
                <img
                  src={organisation.cover_image}
                  alt={organisation.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#073B4C]/50" />
              </>
            )}
          </div>

          <div className="px-6 md:px-8 pb-8">
            <div className="-mt-16 relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                <div className="w-32 h-32 rounded-3xl border-4 border-white bg-white shadow-lg overflow-hidden flex items-center justify-center shrink-0">
                  {organisation?.logo ? (
                    <img
                      src={organisation.logo}
                      alt={organisation.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-slate-400" />
                  )}
                </div>

                <div className="pb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#073B4C]">
                      {organisation?.name}
                    </h1>

                    {organisation?.approval_status ===
                      "approved" && (
                      <ShieldCheck className="w-6 h-6 text-[#6C994E]" />
                    )}
                  </div>

                  <p className="mt-2 text-[#07505E] font-semibold">
                    {organisation?.organisation_type_display ||
                      formatLabel(
                        organisation?.organisation_type
                      )}
                  </p>

                  {organisation?.tagline && (
                    <p className="mt-2 text-slate-600">
                      {organisation.tagline}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowJoinModal(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] transition"
              >
                <UserPlus className="w-4 h-4" />
                Join Organisation
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              {organisation?.location?.name && (
                <div className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#07505E]" />
                  {organisation.location.name}
                </div>
              )}

              {organisation?.year_established && (
                <div>
                  Established{" "}
                  {organisation.year_established}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-8 mt-8">

          {/* Main */}
          <main className="space-y-6">

            <Section
              icon={Building2}
              title="About"
            >
              <TextValue
                value={organisation?.description}
                empty="No description available."
              />
            </Section>

            {(organisation?.mission ||
              organisation?.vision) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Section
                  icon={Target}
                  title="Mission"
                >
                  <TextValue
                    value={organisation?.mission}
                    empty="No mission provided."
                  />
                </Section>

                <Section
                  icon={Lightbulb}
                  title="Vision"
                >
                  <TextValue
                    value={organisation?.vision}
                    empty="No vision provided."
                  />
                </Section>
              </div>
            )}

            <Section
              icon={BriefcaseBusiness}
              title="What We Do"
            >
              <TextValue
                value={organisation?.what_we_do}
                empty="No information provided yet."
              />
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section
                icon={CheckCircle2}
                title="What We Offer"
              >
                <TextValue
                  value={organisation?.what_we_offer}
                  empty="No offers listed yet."
                />
              </Section>

              <Section
                icon={Target}
                title="What We Need"
              >
                <TextValue
                  value={organisation?.what_we_need}
                  empty="No needs listed yet."
                />
              </Section>
            </div>

            <Section
              icon={Handshake}
              title="Partnership Interests"
            >
              <TextValue
                value={
                  organisation?.partnership_interests
                }
                empty="No partnership interests listed yet."
              />
            </Section>

            <Section
              icon={Users}
              title={`Members (${members.length})`}
            >
              {members.length === 0 ? (
                <p className="text-sm text-slate-400 italic">
                  No members are publicly listed yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      onClick={() =>
                        navigate(
                          `/people/${member.slug}`
                        )
                      }
                    />
                  ))}
                </div>
              )}
            </Section>

            <Section
              icon={MessageSquare}
              title="Organisation Updates"
            >
              {posts.length === 0 ? (
                <p className="text-sm italic text-slate-400">
                  This organisation has not published any updates yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                    />
                  ))}
                </div>
              )}
            </Section>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-[#073B4C]">
                Contact
              </h3>

              <div className="mt-5 space-y-4">
                <ContactItem
                  icon={Mail}
                  label="Email"
                  value={organisation?.email}
                />

                <ContactItem
                  icon={Phone}
                  label="Phone"
                  value={organisation?.phone}
                />

                <ContactItem
                  icon={Globe2}
                  label="Website"
                  value={organisation?.website}
                  link
                />

                <ContactItem
                  icon={MapPin}
                  label="Address"
                  value={organisation?.address}
                />
              </div>
            </div>

            {organisation?.how_to_engage && (
              <div className="rounded-3xl border border-[#07505E]/20 bg-[#07505E]/5 p-6">
                <Handshake className="w-6 h-6 text-[#07505E]" />

                <h3 className="mt-4 font-bold text-[#073B4C]">
                  How to Engage
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {organisation.how_to_engage}
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>

      {showJoinModal && (
        <JoinModal
          organisationName={
            organisation?.name
          }
          message={requestMessage}
          setMessage={setRequestMessage}
          loading={joining}
          onClose={() =>
            setShowJoinModal(false)
          }
          onSubmit={handleJoin}
        />
      )}
    </section>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-[#07505E]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#07505E]" />
        </div>

        <h2 className="text-xl font-bold text-[#073B4C]">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

function TextValue({ value, empty }) {
  return (
    <p className="text-slate-600 leading-7 whitespace-pre-line">
      {value || (
        <span className="italic text-slate-400">
          {empty}
        </span>
      )}
    </p>
  );
}

function MemberCard({
  member,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="text-left flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:border-[#07505E]/30 hover:bg-[#07505E]/5 transition"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
        {member.profile_image ? (
          <img
            src={member.profile_image}
            alt={member.full_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Users className="w-5 h-5 text-slate-400" />
        )}
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-slate-900 truncate">
          {member.full_name}
        </p>

        <p className="text-sm text-slate-500">
          {member.role_display ||
            formatLabel(member.role)}
        </p>
      </div>
    </button>
  );
}

function PostCard({ post }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-[#07505E]">
            {post.post_type_display ||
              formatLabel(post.post_type)}
          </span>

          <h3 className="mt-1 font-bold text-slate-900">
            {post.title}
          </h3>
        </div>

        {post.created_at && (
          <span className="text-xs text-slate-400 shrink-0">
            {formatDate(post.created_at)}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm text-slate-600 leading-6 whitespace-pre-line">
        {post.content}
      </p>
    </article>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  link = false,
}) {
  if (!value) return null;

  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-xl bg-[#07505E]/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#07505E]" />
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
          {label}
        </p>

        {link ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-[#07505E] hover:underline break-all"
          >
            {value}
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <p className="mt-1 text-sm text-slate-600 break-words">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function JoinModal({
  organisationName,
  message,
  setMessage,
  loading,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#073B4C]">
              Join Organisation
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {organisationName}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 leading-6">
            Your request will be sent to the organisation administrators for review.
          </p>

          <label className="block mt-5">
            <span className="text-sm font-semibold text-slate-800">
              Message
            </span>

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              rows={4}
              placeholder="Introduce yourself and explain why you would like to join..."
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
            />
          </label>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

function formatLabel(value) {
  if (!value) return "";

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}