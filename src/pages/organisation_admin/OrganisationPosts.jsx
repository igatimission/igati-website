
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Newspaper,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ImagePlus,
  X,
  LoaderCircle,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { apiRequest } from "../../api/api";

const POST_TYPES = [
  { value: "update", label: "Update" },
  { value: "project", label: "Project" },
  { value: "achievement", label: "Achievement" },
  { value: "event", label: "Event" },
  { value: "opportunity", label: "Opportunity" },
  { value: "partnership", label: "Partnership" },
  { value: "announcement", label: "Announcement" },
  { value: "other", label: "Other" },
];

const EMPTY_FORM = {
  title: "",
  post_type: "update",
  content: "",
  external_url: "",
  is_public: true,
  is_featured: false,
};

function getErrorMessage(error, fallback) {
  if (typeof error === "string") return error;

  if (error?.detail) return error.detail;

  if (error && typeof error === "object") {
    const firstValue = Object.values(error)[0];

    if (Array.isArray(firstValue)) return firstValue[0];
    if (typeof firstValue === "string") return firstValue;
  }

  return fallback;
}

function formatDate(value) {
  if (!value) return "Recently";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Recently";

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function PostFormModal({
  post,
  onClose,
  onSave,
  saving,
}) {
  const [form, setForm] = useState(() => ({
    ...EMPTY_FORM,
    ...(post || {}),
  }));

  const [imageFile, setImageFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [preview, setPreview] = useState(post?.image || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!imageFile) return undefined;

    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Choose a JPG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    setError("");
    setImageFile(file);
    setRemoveImage(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.title.trim() || !form.content.trim()) {
      setError("Please provide both a title and post content.");
      return;
    }

    const data = new FormData();

    data.append("title", form.title.trim());
    data.append("post_type", form.post_type);
    data.append("content", form.content.trim());
    data.append("external_url", form.external_url.trim());
    data.append("is_public", String(form.is_public));
    data.append("is_featured", String(form.is_featured));

    if (imageFile) {
      data.append("image", imageFile);
    }

    if (removeImage && post?.image && !imageFile) {
      data.append("remove_image", "true");
    }

    try {
      await onSave(data, post?.id);
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to save this post. Please try again.")
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h3 className="text-lg font-bold text-[#073B4C]">
              {post ? "Edit post" : "Create a post"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Share updates with your organisation's community.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Post title *
            </label>
            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              maxLength={255}
              required
              placeholder="Give your post a clear title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#07505E] focus:ring-2 focus:ring-[#07505E]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Post category *
            </label>
            <select
              value={form.post_type}
              onChange={(event) => updateField("post_type", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#07505E]"
            >
              {POST_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Post content *
            </label>
            <textarea
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
              required
              rows={6}
              placeholder="Write your update, announcement or achievement..."
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#07505E] focus:ring-2 focus:ring-[#07505E]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Post image
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            {preview && !removeImage ? (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <img
                  src={preview}
                  alt="Post preview"
                  className="max-h-64 w-full bg-slate-50 object-cover"
                />
                <div className="flex flex-wrap gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Change image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setPreview("");
                      setRemoveImage(true);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-5 py-8 text-center transition hover:border-[#07505E] hover:bg-slate-50"
              >
                <ImagePlus size={28} className="text-slate-400" />
                <span className="mt-2 text-sm font-semibold text-slate-700">
                  Click to upload an image
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  JPG, PNG or WebP · Maximum 5 MB
                </span>
              </button>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              External link (optional)
            </label>
            <input
              type="url"
              value={form.external_url || ""}
              onChange={(event) =>
                updateField("external_url", event.target.value)
              }
              placeholder="https://example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#07505E]"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                checked={Boolean(form.is_public)}
                onChange={(event) =>
                  updateField("is_public", event.target.checked)
                }
                className="mt-1 accent-[#07505E]"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Publish post
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Public posts can appear on your organisation profile.
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                checked={Boolean(form.is_featured)}
                onChange={(event) =>
                  updateField("is_featured", event.target.checked)
                }
                className="mt-1 accent-[#07505E]"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Feature post
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Give this post featured placement where supported.
                </span>
              </span>
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={saving}
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#07505E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#073B4C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <LoaderCircle size={17} className="animate-spin" />}
              {saving ? "Saving..." : post ? "Save changes" : "Create post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OrganisationPostsPage() {
  const { slug } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const baseUrl = `/organisations/${slug}/dashboard/posts/`;

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest(baseUrl);

      setPosts(
        Array.isArray(response?.posts)
          ? response.posts
          : Array.isArray(response)
            ? response
            : []
      );
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Could not load posts. Check your connection and try again."
        )
      );
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  async function savePost(formData, postId) {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (postId) {
        await apiRequest(`${baseUrl}${postId}/`, {
          method: "PATCH",
          body: formData,
        });
        setNotice("Post updated successfully.");
      } else {
        await apiRequest(baseUrl, {
          method: "POST",
          body: formData,
        });
        setNotice("Post created successfully.");
      }

      setModalOpen(false);
      setEditingPost(null);
      await loadPosts();
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  }

  async function toggleVisibility(post) {
    setError("");
    setNotice("");

    try {
      await apiRequest(`${baseUrl}${post.id}/`, {
        method: "PATCH",
        body: {
          is_public: !post.is_public,
        },
      });

      setPosts((current) =>
        current.map((item) =>
          item.id === post.id
            ? { ...item, is_public: !post.is_public }
            : item
        )
      );

      setNotice(
        post.is_public
          ? "Post unpublished successfully."
          : "Post published successfully."
      );
    } catch (err) {
      setError(getErrorMessage(err, "Could not update post visibility."));
    }
  }

  async function toggleFeatured(post) {
    setError("");
    setNotice("");

    try {
      await apiRequest(`${baseUrl}${post.id}/`, {
        method: "PATCH",
        body: {
          is_featured: !post.is_featured,
        },
      });

      await loadPosts();
      setNotice(
        post.is_featured
          ? "Post removed from featured posts."
          : "Post marked as featured."
      );
    } catch (err) {
      setError(getErrorMessage(err, "Could not update featured status."));
    }
  }

  async function deletePost(post) {
    const confirmed = window.confirm(
      `Delete "${post.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(post.id);
    setError("");
    setNotice("");

    try {
      await apiRequest(`${baseUrl}${post.id}/`, {
        method: "DELETE",
      });

      setPosts((current) =>
        current.filter((item) => item.id !== post.id)
      );

      setNotice("Post deleted successfully.");
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete this post."));
    } finally {
      setDeletingId(null);
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = [
      post.title,
      post.content,
      post.post_type,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "published" && post.is_public) ||
      (filter === "drafts" && !post.is_public) ||
      (filter === "featured" && post.is_featured);

    return matchesSearch && matchesFilter;
  });

  const publishedCount = posts.filter((post) => post.is_public).length;
  const draftCount = posts.length - publishedCount;
  const featuredCount = posts.filter((post) => post.is_featured).length;

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-[#07505E]/10 p-2.5 text-[#07505E]">
              <Newspaper size={23} />
            </div>
            <h2 className="text-xl font-bold text-[#073B4C] sm:text-2xl">
              Posts & activities
            </h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Create updates, share achievements, announce events and manage
            what visitors see on your organisation profile.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingPost(null);
            setModalOpen(true);
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#073B4C]"
        >
          <Plus size={18} />
          Create post
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <div className="flex-1">{error}</div>
          <button
            type="button"
            onClick={() => setError("")}
            className="rounded p-1 hover:bg-red-100"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {notice && (
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          <div className="flex-1">{notice}</div>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="rounded p-1 hover:bg-green-100"
            aria-label="Dismiss message"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            label: "Total posts",
            value: posts.length,
            icon: Newspaper,
          },
          {
            label: "Published",
            value: publishedCount,
            icon: Eye,
          },
          {
            label: "Drafts / hidden",
            value: draftCount,
            icon: EyeOff,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-500">{item.label}</span>
                <Icon size={19} className="text-[#07505E]" />
              </div>
              <p className="mt-3 text-3xl font-bold text-[#073B4C]">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search posts by title or content..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#07505E]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              ["all", "All posts"],
              ["published", "Published"],
              ["drafts", "Hidden"],
              ["featured", "Featured"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  filter === value
                    ? "bg-[#07505E] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            ))}

            <button
              type="button"
              onClick={loadPosts}
              disabled={loading}
              title="Refresh posts"
              className="rounded-lg border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <div className="flex min-h-56 flex-col items-center justify-center text-slate-500">
              <LoaderCircle size={30} className="animate-spin text-[#07505E]" />
              <p className="mt-3 text-sm">Loading your posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
              <div className="rounded-2xl bg-slate-100 p-4">
                <Newspaper size={30} className="text-slate-400" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">
                {posts.length === 0
                  ? "No posts yet"
                  : "No matching posts"}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {posts.length === 0
                  ? "Share your first organisation update, event, announcement or achievement."
                  : "Try another search or filter to find your posts."}
              </p>
              {posts.length === 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingPost(null);
                    setModalOpen(true);
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#073B4C]"
                >
                  <Plus size={17} />
                  Create your first post
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="min-w-0 overflow-hidden rounded-xl border border-slate-200 transition hover:border-slate-300 hover:shadow-sm"
                >
                  {post.image ? (
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-44 w-full bg-slate-50 object-cover"
                      />
                      {post.is_featured && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                          <Star size={13} fill="currentColor" />
                          Featured
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-28 items-center justify-center bg-gradient-to-br from-[#073B4C]/5 to-[#9BC36B]/20">
                      <Newspaper size={32} className="text-[#07505E]/40" />
                    </div>
                  )}

                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#07505E]/10 px-2.5 py-1 text-xs font-semibold capitalize text-[#07505E]">
                        {post.post_type?.replaceAll("_", " ")}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          post.is_public
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {post.is_public ? "Published" : "Hidden"}
                      </span>

                      {post.is_featured && !post.image && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                          <Star size={13} fill="currentColor" />
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 line-clamp-2 text-lg font-bold text-[#073B4C]">
                      {post.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                      {post.content}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                      <span className="text-xs text-slate-400">
                        {formatDate(post.created_at)}
                      </span>

                      {post.external_url && (
                        <a
                          href={post.external_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#07505E] hover:underline"
                        >
                          External link
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPost(post);
                          setModalOpen(true);
                        }}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleVisibility(post)}
                        title={post.is_public ? "Unpublish post" : "Publish post"}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        {post.is_public ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                        <span className="hidden sm:inline">
                          {post.is_public ? "Hide" : "Publish"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleFeatured(post)}
                        title={post.is_featured ? "Remove featured status" : "Feature post"}
                        className={`inline-flex items-center justify-center rounded-lg border px-3 py-2.5 ${
                          post.is_featured
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Star
                          size={16}
                          fill={post.is_featured ? "currentColor" : "none"}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => deletePost(post)}
                        disabled={deletingId === post.id}
                        title="Delete post"
                        className="inline-flex items-center justify-center rounded-lg border border-red-100 px-3 py-2.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === post.id ? (
                          <LoaderCircle size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredPosts.length > 0 && (
            <p className="mt-5 text-center text-xs text-slate-400">
              Showing {filteredPosts.length} of {posts.length} posts
              {featuredCount > 0 ? ` · ${featuredCount} featured` : ""}
            </p>
          )}
        </div>
      </div>

      {modalOpen && (
        <PostFormModal
          post={editingPost}
          saving={saving}
          onClose={() => {
            if (saving) return;
            setModalOpen(false);
            setEditingPost(null);
          }}
          onSave={savePost}
        />
      )}
    </section>
  );
}
