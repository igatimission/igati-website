import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, CheckCircle2, ImagePlus, LoaderCircle, Save,
  AlertCircle, X, Package, UploadCloud,
} from "lucide-react";
import { organisationMarketplaceApi as api } from "../../../api/organisationMarketplaceApi";

const INITIAL_FORM = {
  title: "", description: "", category_id: "", price: "", currency: "KES",
  price_negotiable: false, image: "", contact_phone: "", contact_email: "",
  sku: "", stock_quantity: "0", low_stock_threshold: "5", track_inventory: true,
  unit: "piece", allow_online_purchase: false, status: "draft", is_public: true,
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#073B4C] outline-none transition focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10 disabled:bg-slate-50 disabled:text-slate-400";

function Field({ label, required = false, hint, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#073B4C]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-lg font-bold text-[#073B4C]">{title}</h2>
      {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function normalizeCategories(response) {
  const items = Array.isArray(response)
    ? response
    : Array.isArray(response?.categories)
      ? response.categories
      : Array.isArray(response?.results)
        ? response.results
        : Array.isArray(response?.data)
          ? response.data
          : [];
  return items.filter((item) => item && item.id != null && item.is_active !== false);
}

function getErrorMessage(err, fallback) {
  if (typeof err?.message === "string") return err.message;
  if (typeof err?.detail === "string") return err.detail;
  return fallback;
}

export default function MarketplaceProductForm() {
  const { slug, productId } = useParams();
  const editing = Boolean(productId);
  const navigate = useNavigate();
  const root = `/organisations/${slug}/dashboard/marketplace/products`;
  const fileInputRef = useRef(null);
  const uploadSequence = useRef(0);

  const [form, setForm] = useState(INITIAL_FORM);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(editing);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const setField = (name, value) =>
    setForm((previous) => ({ ...previous, [name]: value }));

  useEffect(() => {
    let alive = true;
    setCategoriesLoading(true);
    setCategoryError("");

    api.categories(slug)
      .then((response) => {
        if (!alive) return;
        setCategories(normalizeCategories(response));
      })
      .catch((err) => {
        if (!alive) return;
        setCategoryError(getErrorMessage(err, "Could not load categories."));
        setCategories([]);
      })
      .finally(() => { if (alive) setCategoriesLoading(false); });

    if (editing) {
      setLoading(true);
      api.product(slug, productId)
        .then((response) => {
          if (!alive) return;
          const product = response?.product || response;
          setForm({
            ...INITIAL_FORM,
            ...product,
            category_id: product?.category_id ?? product?.category?.id ?? "",
            price: product?.price ?? "",
            stock_quantity: String(product?.stock_quantity ?? 0),
            low_stock_threshold: String(product?.low_stock_threshold ?? 5),
            image: product?.image || "",
          });
          setImagePreview("");
        })
        .catch((err) => {
          if (alive) setError(getErrorMessage(err, "Unable to load product."));
        })
        .finally(() => { if (alive) setLoading(false); });
    } else {
      setForm(INITIAL_FORM);
      setLoading(false);
    }

    return () => { alive = false; };
  }, [slug, productId, editing]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Ignore responses from an upload if the user has since removed/replaced the image.
  async function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    setImageError("");

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImageError("Please select a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("The image must be 5 MB or smaller.");
      return;
    }

    const sequence = ++uploadSequence.current;
    setImagePreview(URL.createObjectURL(file));
    setField("image", "");
    setUploadingImage(true);

    try {
      const response = await api.uploadProductImage(slug, file);
      if (sequence !== uploadSequence.current) return;
      const url = response?.image || response?.secure_url || response?.url || response?.data?.image;
      if (typeof url !== "string" || !url.startsWith("https://")) {
        throw new Error("Upload completed without a valid HTTPS image URL.");
      }
      setField("image", url);
    } catch (err) {
      if (sequence !== uploadSequence.current) return;
      setImageError(getErrorMessage(err, "Unable to upload image to Cloudinary."));
    } finally {
      if (sequence === uploadSequence.current) setUploadingImage(false);
    }
  }

  function removeImage() {
    if (uploadingImage) return;
    uploadSequence.current += 1;
    setImagePreview("");
    setImageError("");
    setField("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function submit(event) {
    event.preventDefault();
    if (saving || uploadingImage) return;
    setError("");
    setFieldErrors({});

    if (imagePreview && !form.image) {
      setImageError("Image upload failed. Select the image again or remove it before saving.");
      return;
    }
    if (!form.title.trim() || !form.description.trim() || form.price === "") {
      setError("Complete the product name, description and price.");
      return;
    }
    const price = Number(form.price);
    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a valid product price.");
      return;
    }
    const stock = Number(form.stock_quantity);
    const threshold = Number(form.low_stock_threshold);
    if (![stock, threshold].every((n) => Number.isInteger(n) && n >= 0)) {
      setError("Stock quantity and low-stock threshold must be non-negative whole numbers.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category_id: form.category_id === "" ? null : Number(form.category_id),
      price: form.price,
      currency: form.currency,
      price_negotiable: Boolean(form.price_negotiable),
      image: form.image,
      contact_phone: form.contact_phone.trim(),
      contact_email: form.contact_email.trim(),
      sku: form.sku.trim(),
      stock_quantity: stock,
      low_stock_threshold: threshold,
      track_inventory: Boolean(form.track_inventory),
      unit: form.unit.trim(),
      allow_online_purchase: Boolean(form.allow_online_purchase),
      status: form.status,
      is_public: Boolean(form.is_public),
    };

    setSaving(true);
    try {
      if (editing) await api.updateProduct(slug, productId, payload);
      else await api.createProduct(slug, payload);
      navigate(root);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to save product."));
      if (err?.errors && typeof err.errors === "object") setFieldErrors(err.errors);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><LoaderCircle className="animate-spin text-[#6C994E]" size={34} /></div>;
  }

  return (
    <main className="min-h-screen bg-[#F8FAF7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link to={root} className="inline-flex items-center gap-2 text-sm font-semibold text-[#527A3A] hover:underline"><ArrowLeft size={16} /> Back to products</Link>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-xl bg-[#EAF1E4] p-3 text-[#527A3A]"><Package size={23} /></div>
            <div>
              <h1 className="text-2xl font-bold text-[#073B4C] sm:text-3xl">{editing ? "Edit product" : "Add new product"}</h1>
              <p className="mt-1 text-sm text-slate-500">Create and manage products for your organisation's marketplace.</p>
            </div>
          </div>
        </div>

        {error && (
          <div role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={19} className="shrink-0" />
            <div><p>{error}</p>
              {Object.entries(fieldErrors).length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {Object.entries(fieldErrors).map(([name, message]) => <li key={name}>{name}: {Array.isArray(message) ? message.join(", ") : String(message)}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          <Section title="Basic information" description="Introduce your product to buyers.">
            <Field label="Product name" required>
              <input className={inputClass} value={form.title} onChange={(e) => setField("title", e.target.value)} required maxLength={255} placeholder="e.g. Pure Meru Honey 500g" />
            </Field>
            <Field label="Description" required>
              <textarea className={inputClass} rows={5} value={form.description} onChange={(e) => setField("description", e.target.value)} required placeholder="Describe the product, quality, packaging and use." />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Product category" hint={categoriesLoading ? "Loading categories..." : "Choose the category that best describes this product."}>
                <select className={inputClass} value={form.category_id} onChange={(e) => setField("category_id", e.target.value)} disabled={categoriesLoading}>
                  <option value="">{categoriesLoading ? "Loading categories..." : "Select category"}</option>
                  {categories.filter((category) => ["products", "agriculture"].includes(category.category_type) || !category.category_type).map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {categoryError && <p className="mt-2 text-xs text-red-600">{categoryError}</p>}
                {!categoriesLoading && !categoryError && categories.length === 0 && (
                  <p className="mt-2 text-xs text-amber-700">No active categories found. Add categories in Django admin.</p>
                )}
                {!categoriesLoading && !categoryError && categories.length > 0 && !categories.some((c) => ["products", "agriculture"].includes(c.category_type) || !c.category_type) && (
                  <p className="mt-2 text-xs text-amber-700">No product categories are available. Add a category of type Products or Agriculture.</p>
                )}
              </Field>
              <Field label="SKU / product code">
                <input className={inputClass} value={form.sku} onChange={(e) => setField("sku", e.target.value)} maxLength={80} placeholder="HONEY-500G" />
              </Field>
            </div>
          </Section>

          <Section title="Pricing & inventory" description="Set the selling price and available stock.">
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Price" required><input className={inputClass} type="number" min="0" step="0.01" value={form.price} onChange={(e) => setField("price", e.target.value)} required placeholder="0.00" /></Field>
              <Field label="Currency"><select className={inputClass} value={form.currency} onChange={(e) => setField("currency", e.target.value)}><option value="KES">KES</option><option value="USD">USD</option></select></Field>
              <Field label="Unit"><input className={inputClass} value={form.unit} onChange={(e) => setField("unit", e.target.value)} maxLength={30} placeholder="piece, kg, litre" /></Field>
              <Field label="Available stock"><input className={inputClass} type="number" min="0" step="1" disabled={!form.track_inventory} value={form.stock_quantity} onChange={(e) => setField("stock_quantity", e.target.value)} /></Field>
              <Field label="Low-stock alert at"><input className={inputClass} type="number" min="0" step="1" disabled={!form.track_inventory} value={form.low_stock_threshold} onChange={(e) => setField("low_stock_threshold", e.target.value)} /></Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 text-sm text-[#073B4C]"><input type="checkbox" checked={form.track_inventory} onChange={(e) => setField("track_inventory", e.target.checked)} className="accent-[#6C994E]" /> Track inventory</label>
              <label className="flex items-center gap-3 text-sm text-[#073B4C]"><input type="checkbox" checked={form.price_negotiable} onChange={(e) => setField("price_negotiable", e.target.checked)} className="accent-[#6C994E]" /> Price is negotiable</label>
            </div>
          </Section>

          <Section title="Product image" description="Upload an image from your device. It will be stored securely on Cloudinary.">
            <label className={`block rounded-2xl border-2 border-dashed border-[#9BC36B] bg-[#F8FAF7] p-6 text-center transition ${uploadingImage || saving ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-[#EAF1E4]"}`}>
              <UploadCloud size={35} className="mx-auto text-[#6C994E]" />
              <span className="mt-3 block text-sm font-semibold text-[#073B4C]">Click to choose a product image</span>
              <span className="mt-1 block text-xs text-slate-500">JPG, PNG or WebP · Maximum 5 MB</span>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} disabled={uploadingImage || saving} className="sr-only" />
            </label>
            {imageError && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"><AlertCircle size={17} className="mt-0.5 shrink-0" /> {imageError}</p>}
            {(imagePreview || form.image) ? (
              <div className="space-y-3">
                <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <img src={imagePreview || form.image} alt="Product preview" className="h-full w-full object-contain" />
                  {uploadingImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 text-[#073B4C]"><LoaderCircle size={30} className="animate-spin text-[#6C994E]" /><p className="mt-3 text-sm font-semibold">Uploading to Cloudinary...</p></div>
                  )}
                </div>
                {form.image && !uploadingImage && !imageError && <p className="flex items-center gap-2 text-sm font-medium text-green-700"><CheckCircle2 size={18} /> Image uploaded successfully</p>}
                <button type="button" onClick={removeImage} disabled={uploadingImage} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 disabled:opacity-50"><X size={16} /> Remove image</button>
              </div>
            ) : (
              <div className="flex h-36 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400"><ImagePlus size={30} /><p className="mt-2 text-sm">Image preview will appear here</p></div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Contact phone"><input className={inputClass} value={form.contact_phone} onChange={(e) => setField("contact_phone", e.target.value)} placeholder="+254..." /></Field>
              <Field label="Contact email"><input className={inputClass} type="email" value={form.contact_email} onChange={(e) => setField("contact_email", e.target.value)} placeholder="sales@example.com" /></Field>
            </div>
          </Section>

          <Section title="Visibility & availability" description="Control when your product is visible to buyers.">
            <Field label="Product status"><select className={inputClass} value={form.status} onChange={(e) => setField("status", e.target.value)}><option value="draft">Draft</option><option value="active">Published</option><option value="paused">Paused</option><option value="closed">Closed</option></select></Field>
            <label className="flex items-center gap-3 text-sm text-[#073B4C]"><input type="checkbox" checked={form.is_public} onChange={(e) => setField("is_public", e.target.checked)} className="accent-[#6C994E]" /> Publicly visible when published</label>
            <label className="flex items-center gap-3 text-sm text-[#073B4C]"><input type="checkbox" checked={form.allow_online_purchase} onChange={(e) => setField("allow_online_purchase", e.target.checked)} className="accent-[#6C994E]" /> Enable online purchase (requires checkout integration)</label>
            <p className="text-xs text-slate-500">Online purchasing will only work after checkout and payment APIs are implemented.</p>
          </Section>

          <div className="flex flex-wrap justify-end gap-3 pb-10">
            <Link to={root} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#073B4C]">Cancel</Link>
            <button type="submit" disabled={saving || uploadingImage || Boolean(imagePreview && !form.image)} className="inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#07505E] disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? <LoaderCircle size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : uploadingImage ? "Uploading image..." : editing ? "Save changes" : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}