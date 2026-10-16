
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FolderKanban,
  Plus,
  Search,
  RefreshCw,
  Pencil,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  CalendarDays,
  MapPin,
  Star,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  ExternalLink,
} from "lucide-react";
import { apiRequest } from "../../api/api";

const STATUSES = [
  { value: "planned", label: "Planned" },
  { value: "upcoming", label: "Upcoming" },
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
];

const EMPTY_FORM = {
  title: "",
  description: "",
  problem_addressed: "",
  current_activity: "",
  resources_required: "",
  achievements: "",
  status: "active",
  start_date: "",
  end_date: "",
  image: "",
  cover_image: "",
  is_public: true,
  is_featured: false,
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#07505E] focus:ring-2 focus:ring-[#07505E]/10";

const labelClass = "block text-sm font-semibold text-slate-700";

function formatDate(value) {
  if (!value) return "Not set";

  const date = new Date(`${value}`.slice(0, 10) + "T00:00:00");

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusClasses(status) {
  const styles = {
    planned: "bg-slate-100 text-slate-700",
    upcoming: "bg-blue-50 text-blue-700",
    active: "bg-emerald-50 text-emerald-700",
    paused: "bg-amber-50 text-amber-700",
    completed: "bg-purple-50 text-purple-700",
  };

  return styles[status] || "bg-slate-100 text-slate-700";
}

function Notice({ notice, onClose }) {
  if (!notice) return null;

  const isError = notice.type === "error";

  return (
    <div
      role="status"
      className={`mb-5 flex items-start gap-3 rounded-xl border p-4 ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {isError ? (
        <AlertCircle size={19} className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
      )}
      <p className="flex-1 text-sm">{notice.message}</p>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-1 hover:bg-black/5"
        aria-label="Dismiss notice"
      >
        <X size={16} />
      </button>
    </div>
  );
}

function ProjectImageField({
  label,
  url,
  file,
  onFileChange,
  onRemove,
  inputId,
}) {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const imageUrl = preview || url;

  return (
    <div>
      <label className={labelClass}>{label}</label>

      {imageUrl ? (
        <div className="relative mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <img
            src={imageUrl}
            alt={label}
            className="h-44 w-full object-cover"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute right-2 top-2 rounded-lg bg-white/95 p-2 text-red-600 shadow hover:bg-red-50"
            aria-label={`Remove ${label.toLowerCase()}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 px-4 py-7 text-center transition hover:border-[#07505E] hover:bg-slate-50"
        >
          <Upload className="text-slate-400" size={25} />
          <span className="mt-2 text-sm font-semibold text-slate-700">
            Choose an image
          </span>
          <span className="mt-1 text-xs text-slate-500">
            JPG, PNG or WebP · Maximum 5 MB
          </span>
        </label>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => onFileChange(event.target.files?.[0] || null)}
      />
    </div>
  );
}

export default function OrganisationProjectsPage() {
  const { slug } = useParams();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [removeCoverImage, setRemoveCoverImage] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState(null);

  const baseUrl = useMemo(
    () => `/organisations/${slug}/dashboard/projects/`,
    [slug]
  );

  const showNotice = (type, message) => setNotice({ type, message });

  const loadProjects = useCallback(async () => {
    if (!slug) return;

    setLoading(true);

    try {
      const response = await apiRequest(baseUrl);
      setProjects(
        Array.isArray(response)
          ? response
          : response.projects || []
      );
    } catch (error) {
      showNotice(
        "error",
        error.message || "Unable to load organisation projects."
      );
    } finally {
      setLoading(false);
    }
  }, [baseUrl, slug]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingProject(null);
    setImageFile(null);
    setCoverImageFile(null);
    setRemoveImage(false);
    setRemoveCoverImage(false);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setForm({
      ...EMPTY_FORM,
      ...project,
      start_date: project.start_date || "",
      end_date: project.end_date || "",
      image: project.image || "",
      cover_image: project.cover_image || "",
      is_public: project.is_public ?? true,
      is_featured: project.is_featured ?? false,
    });
    setImageFile(null);
    setCoverImageFile(null);
    setRemoveImage(false);
    setRemoveCoverImage(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setIsModalOpen(false);
    resetForm();
  };

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateImage = (file) => {
    if (!file) return true;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      showNotice("error", "Choose a JPG, PNG, or WebP image.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotice("error", "Each image must be 5 MB or smaller.");
      return false;
    }

    return true;
  };

  const handleImageChange = (file, type) => {
    if (!file) return;
    if (!validateImage(file)) return;

    if (type === "image") {
      setImageFile(file);
      setRemoveImage(false);
    } else {
      setCoverImageFile(file);
      setRemoveCoverImage(false);
    }
  };

  const saveProject = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      showNotice("error", "Project title and description are required.");
      return;
    }

    if (!form.problem_addressed.trim()) {
      showNotice(
        "error",
        "Please describe the problem this project addresses."
      );
      return;
    }

    if (
      form.start_date &&
      form.end_date &&
      form.end_date < form.start_date
    ) {
      showNotice("error", "End date cannot be before start date.");
      return;
    }

    setSaving(true);

    try {
      const payload = new FormData();

      [
        "title",
        "description",
        "problem_addressed",
        "current_activity",
        "resources_required",
        "achievements",
        "status",
        "start_date",
        "end_date",
      ].forEach((key) => {
        payload.append(key, form[key] || "");
      });

      payload.append("is_public", String(form.is_public));
      payload.append("is_featured", String(form.is_featured));

      if (imageFile) payload.append("image_file", imageFile);
      else if (form.image && !removeImage) {
        payload.append("image_url", form.image);
      }

      if (coverImageFile) {
        payload.append("cover_image_file", coverImageFile);
      } else if (form.cover_image && !removeCoverImage) {
        payload.append("cover_image_url", form.cover_image);
      }

      if (removeImage) payload.append("remove_image", "true");
      if (removeCoverImage) {
        payload.append("remove_cover_image", "true");
      }

      const endpoint = editingProject
        ? `${baseUrl}${editingProject.id}/`
        : baseUrl;

      const response = await apiRequest(endpoint, {
        method: editingProject ? "PATCH" : "POST",
        body: payload,
      });

      const savedProject = response.project;

      if (savedProject) {
        setProjects((current) => {
          const exists = current.some(
            (item) => item.id === savedProject.id
          );

          return exists
            ? current.map((item) =>
                item.id === savedProject.id ? savedProject : item
              )
            : [savedProject, ...current];
        });
      } else {
        await loadProjects();
      }

      setIsModalOpen(false);
      resetForm();

      showNotice(
        "success",
        response.detail ||
          (editingProject
            ? "Project updated successfully."
            : "Project created successfully.")
      );
    } catch (error) {
      showNotice(
        "error",
        error.message || "Unable to save this project."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (project) => {
    const confirmed = window.confirm(
      `Delete "${project.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(project.id);

    try {
      const response = await apiRequest(
        `${baseUrl}${project.id}/`,
        { method: "DELETE" }
      );

      setProjects((current) =>
        current.filter((item) => item.id !== project.id)
      );

      showNotice(
        "success",
        response.detail || "Project deleted successfully."
      );
    } catch (error) {
      showNotice(
        "error",
        error.message || "Unable to delete this project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const toggleProjectFlag = async (project, field) => {
    try {
      const response = await apiRequest(
        `${baseUrl}${project.id}/`,
        {
          method: "PATCH",
          body: { [field]: !project[field] },
        }
      );

      const updated = response.project || {
        ...project,
        [field]: !project[field],
      };

      setProjects((current) =>
        current.map((item) =>
          item.id === project.id ? updated : item
        )
      );

      showNotice(
        "success",
        field === "is_public"
          ? updated.is_public
            ? "Project is now public."
            : "Project is now hidden."
          : updated.is_featured
            ? "Project marked as featured."
            : "Featured status removed."
      );
    } catch (error) {
      showNotice(
        "error",
        error.message || "Unable to update project."
      );
    }
  };

  const filteredProjects = useMemo(() => {
    const term = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !term ||
        [
          project.title,
          project.description,
          project.problem_addressed,
          project.location,
          project.status,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term));

      const matchesFilter =
        filter === "all" ||
        (filter === "public" && project.is_public) ||
        (filter === "hidden" && !project.is_public) ||
        (filter === "featured" && project.is_featured) ||
        project.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  const counts = useMemo(
    () => ({
      total: projects.length,
      public: projects.filter((item) => item.is_public).length,
      active: projects.filter((item) => item.status === "active").length,
      featured: projects.filter((item) => item.is_featured).length,
    }),
    [projects]
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#073B4C]/10 p-3 text-[#073B4C]">
              <FolderKanban size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#073B4C]">
                Projects
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage projects connected to your organisation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadProjects}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#073B4C]"
          >
            <Plus size={18} />
            New project
          </button>
        </div>
      </div>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Total projects", value: counts.total, icon: FolderKanban },
          { label: "Public projects", value: counts.public, icon: Eye },
          { label: "Active projects", value: counts.active, icon: CheckCircle2 },
          { label: "Featured projects", value: counts.featured, icon: Star },
        ].map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500 sm:text-sm">
                {label}
              </span>
              <Icon size={18} className="shrink-0 text-[#6C994E]" />
            </div>
            <p className="mt-3 text-2xl font-bold text-[#073B4C]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects by title, description or location..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#07505E] focus:ring-2 focus:ring-[#07505E]/10"
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#07505E]"
          >
            <option value="all">All projects</option>
            <option value="public">Public</option>
            <option value="hidden">Hidden</option>
            <option value="featured">Featured</option>
            {STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-48 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="text-center">
            <LoaderCircle className="mx-auto animate-spin text-[#07505E]" size={30} />
            <p className="mt-3 text-sm text-slate-500">Loading projects...</p>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <FolderKanban size={28} className="text-slate-400" />
          </div>
          <h3 className="mt-4 font-semibold text-slate-800">
            {projects.length === 0
              ? "No projects yet"
              : "No matching projects"}
          </h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            {projects.length === 0
              ? "Create your first project to share the work your organisation is doing."
              : "Try another search term or change the selected filter."}
          </p>
          {projects.length === 0 && (
            <button
              type="button"
              onClick={openCreateModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#073B4C]"
            >
              <Plus size={17} />
              Create project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {project.cover_image || project.image ? (
                <img
                  src={project.cover_image || project.image}
                  alt={project.title}
                  className="h-48 w-full bg-slate-100 object-cover"
                />
              ) : (
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#073B4C]/10 to-[#9BC36B]/20">
                  <ImageIcon size={36} className="text-[#07505E]/40" />
                </div>
              )}

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClasses(project.status)}`}
                  >
                    {project.status || "active"}
                  </span>
                  {project.is_featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                      <Star size={12} />
                      Featured
                    </span>
                  )}
                  <span
                    className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      project.is_public
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {project.is_public ? <Eye size={12} /> : <EyeOff size={12} />}
                    {project.is_public ? "Public" : "Hidden"}
                  </span>
                </div>

                <h2 className="mt-3 text-lg font-bold text-[#073B4C]">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                  {project.description}
                </p>

                {project.problem_addressed && (
                  <div className="mt-4 rounded-xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Problem addressed
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-700">
                      {project.problem_addressed}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                  {project.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} />
                      {project.location}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {formatDate(project.start_date)}
                    {project.end_date
                      ? ` – ${formatDate(project.end_date)}`
                      : ""}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => openEditModal(project)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleProjectFlag(project, "is_public")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {project.is_public ? <EyeOff size={15} /> : <Eye size={15} />}
                    {project.is_public ? "Hide" : "Publish"}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleProjectFlag(project, "is_featured")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Star size={15} />
                    {project.is_featured ? "Unfeature" : "Feature"}
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProject(project)}
                    disabled={deletingId === project.id}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === project.id ? (
                      <LoaderCircle size={15} className="animate-spin" />
                    ) : (
                      <Trash2 size={15} />
                    )}
                    Delete
                  </button>

                  {project.slug && (
                    <span className="sr-only">
                      <ExternalLink size={1} />
                      {project.slug}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-3 sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-[#073B4C]">
                  {editingProject ? "Edit project" : "Create a project"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add the project details and choose its visibility.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveProject}>
              <div className="space-y-5 px-5 py-6 sm:px-7">
                <div>
                  <label className={labelClass} htmlFor="project-title">
                    Project title *
                  </label>
                  <input
                    id="project-title"
                    name="title"
                    value={form.title}
                    onChange={updateField}
                    className={inputClass}
                    placeholder="Enter the project title"
                    maxLength={255}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="project-description">
                    Description *
                  </label>
                  <textarea
                    id="project-description"
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    className={inputClass}
                    rows={4}
                    placeholder="Describe the project, its purpose and activities..."
                    required
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="project-problem">
                    Problem addressed *
                  </label>
                  <textarea
                    id="project-problem"
                    name="problem_addressed"
                    value={form.problem_addressed}
                    onChange={updateField}
                    className={inputClass}
                    rows={3}
                    placeholder="What challenge is this project addressing?"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="project-status">
                      Status
                    </label>
                    <select
                      id="project-status"
                      name="status"
                      value={form.status}
                      onChange={updateField}
                      className={inputClass}
                    >
                      {STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="project-start">
                      Start date
                    </label>
                    <input
                      id="project-start"
                      name="start_date"
                      type="date"
                      value={form.start_date || ""}
                      onChange={updateField}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="project-end">
                      End date
                    </label>
                    <input
                      id="project-end"
                      name="end_date"
                      type="date"
                      value={form.end_date || ""}
                      onChange={updateField}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="project-activity">
                    Current activities
                  </label>
                  <textarea
                    id="project-activity"
                    name="current_activity"
                    value={form.current_activity}
                    onChange={updateField}
                    className={inputClass}
                    rows={3}
                    placeholder="What is happening now?"
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="project-resources">
                    Resources required
                  </label>
                  <textarea
                    id="project-resources"
                    name="resources_required"
                    value={form.resources_required}
                    onChange={updateField}
                    className={inputClass}
                    rows={2}
                    placeholder="People, equipment, funding or other resources..."
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="project-achievements">
                    Achievements
                  </label>
                  <textarea
                    id="project-achievements"
                    name="achievements"
                    value={form.achievements}
                    onChange={updateField}
                    className={inputClass}
                    rows={3}
                    placeholder="Record results and achievements so far..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <ProjectImageField
                    label="Project image"
                    inputId="project-image"
                    url={removeImage ? "" : form.image}
                    file={imageFile}
                    onFileChange={(file) => handleImageChange(file, "image")}
                    onRemove={() => {
                      setImageFile(null);
                      setForm((current) => ({ ...current, image: "" }));
                      setRemoveImage(true);
                    }}
                  />
                  <ProjectImageField
                    label="Cover image"
                    inputId="project-cover-image"
                    url={removeCoverImage ? "" : form.cover_image}
                    file={coverImageFile}
                    onFileChange={(file) =>
                      handleImageChange(file, "cover")
                    }
                    onRemove={() => {
                      setCoverImageFile(null);
                      setForm((current) => ({
                        ...current,
                        cover_image: "",
                      }));
                      setRemoveCoverImage(true);
                    }}
                  />
                </div>

                <div className="space-y-3 rounded-xl border border-slate-200 p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="is_public"
                      checked={form.is_public}
                      onChange={updateField}
                      className="mt-1 h-4 w-4 accent-[#07505E]"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-slate-800">
                        Public project
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Allow this project to appear in public listings where applicable.
                      </span>
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="is_featured"
                      checked={form.is_featured}
                      onChange={updateField}
                      className="mt-1 h-4 w-4 accent-[#07505E]"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-slate-800">
                        Feature this project
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        Mark it as featured for interfaces that display featured projects.
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#07505E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#073B4C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && <LoaderCircle size={17} className="animate-spin" />}
                  {saving
                    ? "Saving..."
                    : editingProject
                      ? "Save changes"
                      : "Create project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
