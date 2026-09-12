import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  FileText,
  Image,
  Link2,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  CalendarDays,
} from "lucide-react";

import { organisationApi } from "../api/organisationApi";

const postTypes = [
  {
    value: "update",
    label: "Update",
  },
  {
    value: "project",
    label: "Project",
  },
  {
    value: "achievement",
    label: "Achievement",
  },
  {
    value: "event",
    label: "Event",
  },
  {
    value: "opportunity",
    label: "Opportunity",
  },
  {
    value: "partnership",
    label: "Partnership",
  },
  {
    value: "announcement",
    label: "Announcement",
  },
  {
    value: "other",
    label: "Other",
  },
];

const initialForm = {
  post_type: "update",
  title: "",
  content: "",
  image: "",
  external_url: "",
};

export default function CreateOrganisationPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.post_type) {
      setError(
        "Please select a post type."
      );
      return false;
    }

    if (!form.title.trim()) {
      setError(
        "Post title is required."
      );
      return false;
    }

    if (!form.content.trim()) {
      setError(
        "Post content is required."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const payload = {
        post_type: form.post_type,
        title: form.title.trim(),
        content: form.content.trim(),
        image: form.image.trim(),
        external_url:
          form.external_url.trim(),
      };

      const response =
        await organisationApi.createPost(
          slug,
          payload
        );

      setSuccess(
        response?.message ||
          "Organisation post published successfully."
      );

      setTimeout(() => {
        navigate(
          `/organisations/${slug}`
        );
      }, 1200);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to publish organisation post."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Back */}
        <button
          type="button"
          onClick={() =>
            navigate(
              `/organisations/${slug}`
            )
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#07505E] transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Organisation
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#07505E]/10 px-3 py-1.5 text-sm font-semibold text-[#07505E]">
            <Megaphone className="w-4 h-4" />
            Organisation Updates
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#073B4C]">
            Create Organisation Post
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600 leading-7">
            Share what your organisation
            is doing with the IGATI
            ecosystem. Publish updates,
            achievements, projects,
            opportunities, events and
            partnership announcements.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />

            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />

            <p className="text-sm font-medium text-green-800">
              {success}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 space-y-6"
          >

            {/* Type */}
            <div>
              <label className="text-sm font-semibold text-slate-800">
                Post Type
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <select
                name="post_type"
                value={form.post_type}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
              >
                {postTypes.map(
                  (type) => (
                    <option
                      key={type.value}
                      value={type.value}
                    >
                      {type.label}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-semibold text-slate-800">
                Post Title
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Launch of our new youth innovation programme"
                maxLength={200}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
              />

              <div className="mt-1 text-right text-xs text-slate-400">
                {form.title.length}/200
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="text-sm font-semibold text-slate-800">
                Content
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={10}
                placeholder="Tell the ecosystem what your organisation is doing, who is involved, what has been achieved, or how people can participate..."
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none resize-y focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
              />
            </div>

            {/* Image */}
            <div>
              <label className="text-sm font-semibold text-slate-800">
                Image URL
              </label>

              <div className="relative mt-2">
                <Image className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 outline-none focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Add a public image URL
                if you want the post to
                include an image.
              </p>
            </div>

            {/* Preview */}
            {form.image && (
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Image Preview
                </p>

                <div className="h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img
                    src={form.image}
                    alt="Post preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display =
                        "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* External URL */}
            <div>
              <label className="text-sm font-semibold text-slate-800">
                External Link
              </label>

              <div className="relative mt-2">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  type="url"
                  name="external_url"
                  value={
                    form.external_url
                  }
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 outline-none focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Optional. Link to an
                article, registration
                page, project website or
                other relevant resource.
              </p>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  navigate(
                    `/organisations/${slug}`
                  )
                }
                className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <aside className="space-y-5">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-[#07505E]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#07505E]" />
              </div>

              <h3 className="mt-4 font-bold text-[#073B4C]">
                Organisation Post
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Posts appear on your
                organisation's public
                profile and help people
                understand what your
                organisation is actively
                doing.
              </p>
            </div>

            <div className="rounded-3xl border border-[#07505E]/20 bg-[#07505E]/5 p-6">
              <h3 className="font-bold text-[#073B4C]">
                Good posts include
              </h3>

              <div className="mt-4 space-y-3">
                <Tip>
                  Clear and specific title
                </Tip>

                <Tip>
                  What happened or is
                  happening
                </Tip>

                <Tip>
                  Who is involved
                </Tip>

                <Tip>
                  Why it matters
                </Tip>

                <Tip>
                  How other ecosystem
                  members can participate
                </Tip>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-3">
                <CalendarDays className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />

                <div>
                  <h3 className="font-bold text-amber-900">
                    Keep information current
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Avoid publishing
                    outdated opportunities
                    or events. Keep dates,
                    links and contact
                    details accurate.
                  </p>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
}

function Tip({ children }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 text-[#6C994E] shrink-0 mt-0.5" />

      <p className="text-sm text-slate-600">
        {children}
      </p>
    </div>
  );
}