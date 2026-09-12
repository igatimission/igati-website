import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Plus,
  Loader2,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertTriangle,
  Eye,
  Settings,
  Users,
  FileText,
  RefreshCw,
  ArrowRight,
  MapPin,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import { organisationApi } from "../api/organisationApi";

const statusConfig = {
  draft: {
    label: "Draft",
    description: "Not yet submitted for IGATI review.",
    icon: FileText,
    classes:
      "bg-slate-100 text-slate-700 border-slate-200",
  },

  pending: {
    label: "Pending Review",
    description: "Waiting for IGATI administrator review.",
    icon: Clock3,
    classes:
      "bg-amber-50 text-amber-700 border-amber-200",
  },

  approved: {
    label: "Approved",
    description: "Approved and available in the IGATI ecosystem.",
    icon: CheckCircle2,
    classes:
      "bg-green-50 text-green-700 border-green-200",
  },

  changes_requested: {
    label: "Changes Requested",
    description: "IGATI has requested updates before approval.",
    icon: AlertTriangle,
    classes:
      "bg-orange-50 text-orange-700 border-orange-200",
  },

  rejected: {
    label: "Rejected",
    description: "The organisation application was not approved.",
    icon: XCircle,
    classes:
      "bg-red-50 text-red-700 border-red-200",
  },

  suspended: {
    label: "Suspended",
    description: "This organisation is currently suspended.",
    icon: AlertTriangle,
    classes:
      "bg-red-50 text-red-700 border-red-200",
  },
};

export default function MyOrganisationsPage() {
  const navigate = useNavigate();

  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrganisations();
  }, []);

  const loadOrganisations = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await organisationApi.getMine();

      const data =
        response?.organisations ||
        response?.results ||
        [];

      setOrganisations(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load your organisations."
      );
    } finally {
      setLoading(false);
    }
  };

  const statistics = useMemo(() => {
    const total = organisations.length;

    const approved = organisations.filter(
      (item) =>
        item.approval_status === "approved"
    ).length;

    const pending = organisations.filter(
      (item) =>
        item.approval_status === "pending"
    ).length;

    const attention = organisations.filter(
      (item) =>
        item.approval_status ===
          "changes_requested" ||
        item.approval_status === "rejected"
    ).length;

    return {
      total,
      approved,
      pending,
      attention,
    };
  }, [organisations]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#F8FAF7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#07505E] animate-spin mx-auto" />

          <p className="mt-4 text-slate-600">
            Loading your organisations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#07505E]/10 px-3 py-1.5 text-sm font-semibold text-[#07505E]">
              <Building2 className="w-4 h-4" />
              People & Organisations
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#073B4C]">
              My Organisations
            </h1>

            <p className="mt-3 max-w-3xl text-slate-600 leading-7">
              Manage organisations you have registered
              or administer, follow approval status,
              manage members and publish ecosystem
              updates.
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                "/organisations/register"
              )
            }
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] transition"
          >
            <Plus className="w-4 h-4" />
            Register Organisation
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-red-800">
                Unable to load organisations
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>

            <button
              onClick={loadOrganisations}
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:text-red-900"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Organisations"
            value={statistics.total}
            icon={Building2}
          />

          <StatCard
            label="Approved"
            value={statistics.approved}
            icon={CheckCircle2}
          />

          <StatCard
            label="Pending"
            value={statistics.pending}
            icon={Clock3}
          />

          <StatCard
            label="Needs Attention"
            value={statistics.attention}
            icon={AlertTriangle}
          />
        </div>

        {/* Empty */}
        {!error &&
        organisations.length === 0 ? (
          <EmptyState
            onRegister={() =>
              navigate(
                "/organisations/register"
              )
            }
          />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {organisations.map(
              (organisation) => (
                <OrganisationCard
                  key={organisation.id}
                  organisation={
                    organisation
                  }
                  navigate={navigate}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function OrganisationCard({
  organisation,
  navigate,
}) {
  const config =
    statusConfig[
      organisation.approval_status
    ] || statusConfig.draft;

  const StatusIcon = config.icon;

  const isApproved =
    organisation.approval_status ===
    "approved";

  const needsChanges =
    organisation.approval_status ===
    "changes_requested";

  const isDraft =
    organisation.approval_status ===
    "draft";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">

      {/* Cover */}
      <div className="relative h-36 bg-gradient-to-br from-[#073B4C] via-[#07505E] to-[#6C994E] overflow-hidden">
        {organisation.cover_image && (
          <>
            <img
              src={
                organisation.cover_image
              }
              alt={organisation.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-[#073B4C]/45" />
          </>
        )}

        <div className="absolute top-4 right-4">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${config.classes}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {config.label}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">

        {/* Logo */}
        <div className="-mt-10 relative z-10">
          <div className="w-20 h-20 rounded-2xl border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
            {organisation.logo ? (
              <img
                src={organisation.logo}
                alt={`${organisation.name} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-8 h-8 text-slate-400" />
            )}
          </div>
        </div>

        {/* Identity */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[#073B4C]">
                  {organisation.name}
                </h2>

                {isApproved && (
                  <ShieldCheck className="w-5 h-5 text-[#6C994E]" />
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-[#07505E]">
                {organisation.organisation_type_display ||
                  formatLabel(
                    organisation.organisation_type
                  )}
              </p>
            </div>
          </div>

          {organisation.tagline && (
            <p className="mt-3 text-sm text-slate-600 leading-6">
              {organisation.tagline}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            {organisation.location?.name && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {
                  organisation.location
                    .name
                }
              </span>
            )}

            {organisation.created_at && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                Registered{" "}
                {formatDate(
                  organisation.created_at
                )}
              </span>
            )}
          </div>
        </div>

        {/* Status explanation */}
        <div
          className={`mt-5 rounded-2xl border p-4 ${config.classes}`}
        >
          <div className="flex items-start gap-3">
            <StatusIcon className="w-5 h-5 shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold">
                {config.label}
              </p>

              <p className="mt-1 text-sm opacity-90 leading-6">
                {config.description}
              </p>
            </div>
          </div>
        </div>

        {/* Review notes */}
        {organisation.review_notes && (
          <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-700 shrink-0 mt-0.5" />

              <div>
                <p className="font-semibold text-orange-800">
                  Review Notes
                </p>

                <p className="mt-1 text-sm leading-6 text-orange-700 whitespace-pre-line">
                  {
                    organisation.review_notes
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Approval dates */}
        {(organisation.submitted_at ||
          organisation.approved_at) && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {organisation.submitted_at && (
              <SmallInfo
                label="Submitted"
                value={formatDateTime(
                  organisation.submitted_at
                )}
              />
            )}

            {organisation.approved_at && (
              <SmallInfo
                label="Approved"
                value={formatDateTime(
                  organisation.approved_at
                )}
              />
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-3">
          {isApproved && (
            <>
              <button
                onClick={() =>
                  navigate(
                    `/organisations/${organisation.slug}`
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#07505E] text-white text-sm font-semibold hover:bg-[#073B4C] transition"
              >
                <Eye className="w-4 h-4" />
                View Profile
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/my-organisations/${organisation.slug}/members`
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
              >
                <Users className="w-4 h-4" />
                Manage Members
              </button>

              <button
                onClick={() =>
                  navigate(
                    `/organisations/${organisation.slug}/posts/create`
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
              >
                <FileText className="w-4 h-4" />
                Create Post
              </button>
            </>
          )}

          {(isDraft ||
            needsChanges) && (
            <button
              onClick={() =>
                navigate(
                  `/my-organisations/${organisation.slug}/edit`
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#07505E] text-white text-sm font-semibold hover:bg-[#073B4C] transition"
            >
              <Settings className="w-4 h-4" />

              {needsChanges
                ? "Edit & Resubmit"
                : "Continue Application"}
            </button>
          )}

          {organisation.approval_status ===
            "pending" && (
            <button
              onClick={() =>
                navigate(
                  `/my-organisations/${organisation.slug}`
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition"
            >
              <Eye className="w-4 h-4" />
              View Application
            </button>
          )}

          {organisation.approval_status ===
            "rejected" && (
            <button
              onClick={() =>
                navigate(
                  `/my-organisations/${organisation.slug}`
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-700 bg-red-50 text-sm font-semibold hover:bg-red-100 transition"
            >
              View Decision
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-[#073B4C]">
            {value}
          </p>
        </div>

        <div className="w-11 h-11 rounded-2xl bg-[#07505E]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#07505E]" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onRegister }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 md:p-16 text-center">
      <div className="w-16 h-16 rounded-3xl bg-[#07505E]/10 flex items-center justify-center mx-auto">
        <Building2 className="w-8 h-8 text-[#07505E]" />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-[#073B4C]">
        No organisations yet
      </h2>

      <p className="mt-3 max-w-xl mx-auto text-slate-600 leading-7">
        Register a community group,
        enterprise, NGO, institution,
        business or other organisation to
        become part of the IGATI ecosystem.
      </p>

      <button
        onClick={onRegister}
        className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] transition"
      >
        <Plus className="w-4 h-4" />
        Register Organisation
      </button>
    </div>
  );
}

function SmallInfo({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-700">
        {value}
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

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime()))
    return "";

  return date.toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

function formatDateTime(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime()))
    return "";

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