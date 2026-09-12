import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Users,
  ArrowLeft,
  Loader2,
  RefreshCw,
  UserCheck,
  UserX,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  User,
  Briefcase,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";

import { organisationApi } from "../api/organisationApi";

const roleOptions = [
  {
    value: "member",
    label: "Member",
  },
  {
    value: "representative",
    label: "Representative",
  },
  {
    value: "administrator",
    label: "Administrator",
  },
];

export default function ManageOrganisationMembersPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [organisation, setOrganisation] = useState(null);

  const [pendingMembers, setPendingMembers] =
    useState([]);

  const [approvedMembers, setApprovedMembers] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  const [actionType, setActionType] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [role, setRole] = useState("member");

  const [canPost, setCanPost] =
    useState(false);

  const [responseMessage, setResponseMessage] =
    useState("");

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async (
    showRefreshing = false
  ) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [
        pendingResponse,
        membersResponse,
      ] = await Promise.all([
        organisationApi.getPendingMembers(
          slug
        ),
        organisationApi.getMembers(
          slug
        ),
      ]);

      setOrganisation({
        name:
          pendingResponse?.organisation ||
          membersResponse?.organisation
            ?.name ||
          "Organisation",

        slug:
          membersResponse?.organisation
            ?.slug || slug,
      });

      setPendingMembers(
        Array.isArray(
          pendingResponse?.pending_members
        )
          ? pendingResponse.pending_members
          : []
      );

      setApprovedMembers(
        Array.isArray(
          membersResponse?.members
        )
          ? membersResponse.members
          : []
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load organisation members."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filteredPending =
    useMemo(() => {
      if (!search.trim()) {
        return pendingMembers;
      }

      const query =
        search.toLowerCase();

      return pendingMembers.filter(
        (item) => {
          const person =
            item.person || {};

          return (
            person.full_name
              ?.toLowerCase()
              .includes(query) ||
            person.person_type
              ?.toLowerCase()
              .includes(query) ||
            person.what_i_do
              ?.toLowerCase()
              .includes(query) ||
            person.expertise
              ?.toLowerCase()
              .includes(query)
          );
        }
      );
    }, [
      pendingMembers,
      search,
    ]);

  const filteredApproved =
    useMemo(() => {
      if (!search.trim()) {
        return approvedMembers;
      }

      const query =
        search.toLowerCase();

      return approvedMembers.filter(
        (person) =>
          person.full_name
            ?.toLowerCase()
            .includes(query) ||
          person.person_type
            ?.toLowerCase()
            .includes(query) ||
          person.role
            ?.toLowerCase()
            .includes(query)
      );
    }, [
      approvedMembers,
      search,
    ]);

  const openApprove = (request) => {
    setSelectedRequest(request);
    setActionType("approve");
    setRole("member");
    setCanPost(false);
    setResponseMessage("");
  };

  const openReject = (request) => {
    setSelectedRequest(request);
    setActionType("reject");
    setRole("member");
    setCanPost(false);
    setResponseMessage("");
  };

  const closeModal = () => {
    if (actionLoading) return;

    setSelectedRequest(null);
    setActionType(null);
    setResponseMessage("");
    setRole("member");
    setCanPost(false);
  };

  const handleApprove = async () => {
    if (!selectedRequest) return;

    try {
      setActionLoading(true);
      setError("");

      await organisationApi.approveMember(
        slug,
        selectedRequest.membership_id,
        {
          role,
          can_post: canPost,
          response_message:
            responseMessage.trim(),
        }
      );

      closeModal();

      await loadData(true);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to approve member."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;

    try {
      setActionLoading(true);
      setError("");

      await organisationApi.rejectMember(
        slug,
        selectedRequest.membership_id,
        {
          response_message:
            responseMessage.trim(),
        }
      );

      closeModal();

      await loadData(true);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to reject member."
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#F8FAF7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#07505E] mx-auto" />

          <p className="mt-4 text-slate-600">
            Loading organisation
            members...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Back */}
        <button
          onClick={() =>
            navigate(
              "/my-organisations"
            )
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#07505E] transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Organisations
        </button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#07505E]/10 text-[#07505E] text-sm font-semibold">
              <Users className="w-4 h-4" />
              Organisation Membership
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#073B4C]">
              Manage Members
            </h1>

            <p className="mt-2 text-slate-600">
              {organisation?.name}
            </p>
          </div>

          <button
            onClick={() =>
              loadData(true)
            }
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-60 transition"
          >
            <RefreshCw
              className={`w-4 h-4 ${
                refreshing
                  ? "animate-spin"
                  : ""
              }`}
            />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StatCard
            icon={Clock3}
            label="Pending Requests"
            value={pendingMembers.length}
          />

          <StatCard
            icon={CheckCircle2}
            label="Approved Members"
            value={approvedMembers.length}
          />
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search members..."
            className="w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 py-3.5 outline-none focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
          />
        </div>

        {/* Pending */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock3 className="w-5 h-5 text-amber-700" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#073B4C]">
                Pending Requests
              </h2>

              <p className="text-sm text-slate-500">
                Review people who want
                to join this organisation.
              </p>
            </div>
          </div>

          {filteredPending.length === 0 ? (
            <EmptyBox
              title="No pending requests"
              description="There are currently no membership requests waiting for review."
            />
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filteredPending.map(
                (request) => (
                  <PendingMemberCard
                    key={
                      request.membership_id
                    }
                    request={
                      request
                    }
                    onApprove={() =>
                      openApprove(
                        request
                      )
                    }
                    onReject={() =>
                      openReject(
                        request
                      )
                    }
                    onView={() =>
                      navigate(
                        `/people/${request.person.slug}`
                      )
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* Approved */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-700" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#073B4C]">
                Approved Members
              </h2>

              <p className="text-sm text-slate-500">
                Members who currently
                belong to the organisation.
              </p>
            </div>
          </div>

          {filteredApproved.length === 0 ? (
            <EmptyBox
              title="No approved members"
              description="Approved organisation members will appear here."
            />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden">
              <div className="divide-y divide-slate-100">
                {filteredApproved.map(
                  (member) => (
                    <ApprovedMemberRow
                      key={member.id}
                      member={member}
                      onView={() =>
                        navigate(
                          `/people/${member.slug}`
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Modal */}
      {selectedRequest &&
        actionType && (
          <ActionModal
            actionType={actionType}
            request={selectedRequest}
            role={role}
            setRole={setRole}
            canPost={canPost}
            setCanPost={setCanPost}
            responseMessage={
              responseMessage
            }
            setResponseMessage={
              setResponseMessage
            }
            loading={
              actionLoading
            }
            onClose={closeModal}
            onApprove={
              handleApprove
            }
            onReject={
              handleReject
            }
          />
        )}
    </section>
  );
}

function PendingMemberCard({
  request,
  onApprove,
  onReject,
  onView,
}) {
  const person =
    request.person || {};

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start gap-4">
        <Avatar
          image={
            person.profile_image
          }
          name={
            person.full_name
          }
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-[#073B4C]">
            {person.full_name}
          </h3>

          <p className="mt-1 text-sm font-medium text-[#07505E]">
            {formatLabel(
              person.person_type
            )}
          </p>

          {person.what_i_do && (
            <div className="mt-3 flex gap-2 text-sm text-slate-600">
              <Briefcase className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
              <p>
                {
                  person.what_i_do
                }
              </p>
            </div>
          )}

          {person.expertise && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Expertise
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {
                  person.expertise
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {request.request_message && (
        <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4">
          <div className="flex items-center gap-2 text-slate-700">
            <MessageSquare className="w-4 h-4 text-[#07505E]" />

            <p className="text-sm font-semibold">
              Membership message
            </p>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600 whitespace-pre-line">
            {
              request.request_message
            }
          </p>
        </div>
      )}

      {request.requested_at && (
        <p className="mt-4 text-xs text-slate-400">
          Requested{" "}
          {formatDateTime(
            request.requested_at
          )}
        </p>
      )}

      <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap gap-3">
        <button
          onClick={onView}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
        >
          <User className="w-4 h-4" />
          View Profile
        </button>

        <button
          onClick={onApprove}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#07505E] text-white text-sm font-semibold hover:bg-[#073B4C] transition"
        >
          <UserCheck className="w-4 h-4" />
          Approve
        </button>

        <button
          onClick={onReject}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition"
        >
          <UserX className="w-4 h-4" />
          Reject
        </button>
      </div>
    </article>
  );
}

function ApprovedMemberRow({
  member,
  onView,
}) {
  return (
    <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">

      <Avatar
        image={
          member.profile_image
        }
        name={
          member.full_name
        }
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold text-slate-900">
            {member.full_name}
          </h3>

          {member.role ===
            "administrator" && (
            <ShieldCheck className="w-4 h-4 text-[#6C994E]" />
          )}
        </div>

        <p className="mt-1 text-sm text-slate-500">
          {member.person_type_display ||
            formatLabel(
              member.person_type
            )}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#07505E]/10 text-[#07505E] px-3 py-1.5 text-xs font-semibold">
          <BadgeCheck className="w-3.5 h-3.5" />
          {member.role_display ||
            formatLabel(
              member.role
            )}
        </span>

        <button
          onClick={onView}
          className="text-sm font-semibold text-[#07505E] hover:underline"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

function ActionModal({
  actionType,
  request,
  role,
  setRole,
  canPost,
  setCanPost,
  responseMessage,
  setResponseMessage,
  loading,
  onClose,
  onApprove,
  onReject,
}) {
  const person =
    request.person || {};

  const approving =
    actionType === "approve";

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#073B4C]">
              {approving
                ? "Approve Member"
                : "Reject Membership Request"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {person.full_name}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-50"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">

          {approving && (
            <>
              <label className="block">
                <span className="text-sm font-semibold text-slate-800">
                  Organisation Role
                </span>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
                >
                  {roleOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {
                          option.label
                        }
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={canPost}
                  onChange={(e) =>
                    setCanPost(
                      e.target.checked
                    )
                  }
                  className="mt-1 w-4 h-4 accent-[#07505E]"
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    Allow organisation posting
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    This member can
                    publish posts and
                    updates on behalf of
                    the organisation.
                  </p>
                </div>
              </label>
            </>
          )}

          <label className="block">
            <span className="text-sm font-semibold text-slate-800">
              {approving
                ? "Response Message"
                : "Reason / Response"}
            </span>

            <textarea
              value={
                responseMessage
              }
              onChange={(e) =>
                setResponseMessage(
                  e.target.value
                )
              }
              rows={4}
              placeholder={
                approving
                  ? "Optional message to the member..."
                  : "Explain why the membership request was rejected..."
              }
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none resize-y focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
            />
          </label>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          {approving ? (
            <button
              onClick={
                onApprove
              }
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserCheck className="w-4 h-4" />
              )}

              Approve Member
            </button>
          ) : (
            <button
              onClick={
                onReject
              }
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserX className="w-4 h-4" />
              )}

              Reject Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-[#073B4C]">
            {value}
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#07505E]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#07505E]" />
        </div>
      </div>
    </div>
  );
}

function Avatar({
  image,
  name,
}) {
  return (
    <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
      {image ? (
        <img
          src={image}
          alt={name || "Member"}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-6 h-6 text-slate-400" />
      )}
    </div>
  );
}

function EmptyBox({
  title,
  description,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <Users className="w-8 h-8 text-slate-300 mx-auto" />

      <h3 className="mt-4 font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
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

function formatDateTime(value) {
  if (!value) return "";

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date.toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}