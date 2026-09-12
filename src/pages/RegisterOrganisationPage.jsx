import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  MapPin,
  Globe2,
  Mail,
  Phone,
  FileText,
  Users,
  Target,
  Handshake,
  Lightbulb,
  BriefcaseBusiness,
  Save,
  Send,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Image,
  CalendarDays,
  Landmark,
} from "lucide-react";

import { organisationApi } from "../api/organisationApi";
import { ecosystemApi } from "../api/ecosystemApi";

const organisationTypes = [
  { value: "university", label: "University" },
  { value: "institution", label: "Institution" },
  { value: "ngo", label: "NGO" },
  { value: "cbo", label: "Community Based Organisation" },
  { value: "community_group", label: "Community Group" },
  { value: "enterprise", label: "Enterprise" },
  { value: "government", label: "Government" },
  { value: "industry", label: "Industry" },
  { value: "investor", label: "Investor" },
  { value: "partner", label: "Partner" },
  { value: "donor", label: "Donor" },
  { value: "foundation", label: "Foundation" },
  { value: "cooperative", label: "Cooperative" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
];

const initialForm = {
  name: "",
  organisation_type: "",
  tagline: "",
  description: "",

  mission: "",
  vision: "",

  what_we_do: "",
  what_we_offer: "",
  what_we_need: "",
  partnership_interests: "",
  how_to_engage: "",

  location_id: "",
  address: "",

  year_established: "",
  registration_number: "",
  registration_document: "",

  website: "",
  email: "",
  phone: "",

  logo: "",
  cover_image: "",
};

export default function RegisterOrganisationPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] =
    useState(true);

  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      setLoadingLocations(true);

      const response = await ecosystemApi.locations();

      const data =
        response?.locations ||
        response?.results ||
        response ||
        [];

      setLocations(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(
        "Unable to load locations:",
        err
      );
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError(
        "Organisation name is required."
      );
      return false;
    }

    if (!form.organisation_type) {
      setError(
        "Please select the organisation type."
      );
      return false;
    }

    if (!form.description.trim()) {
      setError(
        "Please provide a short description of the organisation."
      );
      return false;
    }

    return true;
  };

  const createOrganisation = async () => {
    const payload = {
      ...form,

      location_id:
        form.location_id || null,

      year_established:
        form.year_established
          ? Number(form.year_established)
          : null,
    };

    return organisationApi.create(
      payload
    );
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response =
        await createOrganisation();

      const organisation =
        response?.organisation;

      setSuccess(
        response?.message ||
          "Organisation saved as draft."
      );

      if (organisation?.slug) {
        setTimeout(() => {
          navigate(
            `/my-organisations/${organisation.slug}`
          );
        }, 1200);
      }
    } catch (err) {
      setError(
        err?.message ||
          "Unable to create organisation."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitForReview = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      // First create the organisation.
      const createResponse =
        await createOrganisation();

      const organisation =
        createResponse?.organisation;

      if (!organisation?.slug) {
        throw new Error(
          "Organisation created but no slug was returned."
        );
      }

      // Then submit it for review.
      const submitResponse =
        await organisationApi.submit(
          organisation.slug
        );

      setSuccess(
        submitResponse?.message ||
          "Organisation submitted for IGATI review."
      );

      setTimeout(() => {
        navigate("/my-organisations");
      }, 1500);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to submit organisation."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const currentYear =
    new Date().getFullYear();

  return (
    <section className="min-h-screen bg-[#F8FAF7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#07505E] transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#07505E]/10 px-3 py-1.5 text-sm font-semibold text-[#07505E]">
            <Building2 className="w-4 h-4" />
            People & Organisations Engine
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-[#073B4C]">
            Register an Organisation
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600 leading-7">
            Register your organisation,
            community group, enterprise,
            institution or other entity to
            participate in the IGATI Global
            Mission Network ecosystem.
          </p>
        </div>

        {/* Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ProcessCard
            number="1"
            title="Register"
            description="Provide information about your organisation."
          />

          <ProcessCard
            number="2"
            title="IGATI Review"
            description="Your organisation will be reviewed by an administrator."
          />

          <ProcessCard
            number="3"
            title="Go Public"
            description="Approved organisations receive a public ecosystem profile."
          />
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold text-green-800">
                Success
              </p>

              <p className="mt-1 text-sm text-green-700">
                {success}
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSaveDraft}
          className="space-y-6"
        >

          {/* Basic */}
          <FormSection
            icon={Building2}
            title="Organisation Information"
            description="Tell us who the organisation is."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Organisation Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Meru Youth Innovation Network"
                required
              />

              <SelectField
                label="Organisation Type"
                name="organisation_type"
                value={form.organisation_type}
                onChange={handleChange}
                options={organisationTypes}
                placeholder="Select organisation type"
                required
              />
            </div>

            <InputField
              label="Tagline"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              placeholder="A short statement about your organisation"
            />

            <TextareaField
              label="Organisation Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Briefly describe the organisation, who it serves and its purpose..."
              required
            />
          </FormSection>

          {/* Mission */}
          <FormSection
            icon={Target}
            title="Mission & Vision"
            description="Describe the organisation's purpose and direction."
          >
            <TextareaField
              label="Mission"
              name="mission"
              value={form.mission}
              onChange={handleChange}
              placeholder="What is your organisation's mission?"
            />

            <TextareaField
              label="Vision"
              name="vision"
              value={form.vision}
              onChange={handleChange}
              placeholder="What future does your organisation want to create?"
            />
          </FormSection>

          {/* Ecosystem */}
          <FormSection
            icon={Lightbulb}
            title="Ecosystem Profile"
            description="Help IGATI members understand the value your organisation brings and what it needs."
          >
            <TextareaField
              label="What We Do"
              name="what_we_do"
              value={form.what_we_do}
              onChange={handleChange}
              placeholder="Describe your activities, programmes, projects or areas of work..."
            />

            <TextareaField
              label="What We Offer"
              name="what_we_offer"
              value={form.what_we_offer}
              onChange={handleChange}
              placeholder="Services, products, expertise, resources, technology, mentorship..."
            />

            <TextareaField
              label="What We Need"
              name="what_we_need"
              value={form.what_we_need}
              onChange={handleChange}
              placeholder="Funding, markets, equipment, expertise, researchers, partnerships..."
            />

            <TextareaField
              label="Partnership Interests"
              name="partnership_interests"
              value={form.partnership_interests}
              onChange={handleChange}
              placeholder="What types of partnerships or collaborations are you looking for?"
            />

            <TextareaField
              label="How People Can Engage With Us"
              name="how_to_engage"
              value={form.how_to_engage}
              onChange={handleChange}
              placeholder="Explain how other members, partners or institutions can engage with your organisation..."
            />
          </FormSection>

          {/* Location */}
          <FormSection
            icon={MapPin}
            title="Location"
            description="Where is the organisation based?"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-sm font-semibold text-slate-800">
                  Location
                </span>

                <select
                  name="location_id"
                  value={form.location_id}
                  onChange={handleChange}
                  disabled={loadingLocations}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10 disabled:bg-slate-100"
                >
                  <option value="">
                    {loadingLocations
                      ? "Loading locations..."
                      : "Select location"}
                  </option>

                  {locations.map((location) => (
                    <option
                      key={location.id}
                      value={location.id}
                    >
                      {location.name}
                      {location.location_type
                        ? ` — ${formatLabel(
                            location.location_type
                          )}`
                        : ""}
                    </option>
                  ))}
                </select>
              </label>

              <InputField
                label="Physical Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Town, street, building or postal address"
              />
            </div>
          </FormSection>

          {/* Registration */}
          <FormSection
            icon={Landmark}
            title="Registration Information"
            description="Provide official registration information where applicable."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Year Established"
                name="year_established"
                type="number"
                value={form.year_established}
                onChange={handleChange}
                min="1800"
                max={currentYear}
                placeholder="e.g. 2020"
              />

              <InputField
                label="Registration Number"
                name="registration_number"
                value={form.registration_number}
                onChange={handleChange}
                placeholder="Official registration number"
              />
            </div>

            <InputField
              label="Registration / Supporting Document URL"
              name="registration_document"
              value={form.registration_document}
              onChange={handleChange}
              placeholder="https://..."
            />

            <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />

                <p className="text-sm text-amber-800 leading-6">
                  Registration documentation may
                  help IGATI administrators verify
                  the organisation during the
                  approval process.
                </p>
              </div>
            </div>
          </FormSection>

          {/* Contact */}
          <FormSection
            icon={Globe2}
            title="Contact Information"
            description="How can ecosystem members reach your organisation?"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                icon={Mail}
                label="Organisation Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="info@organisation.org"
              />

              <InputField
                icon={Phone}
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+254..."
              />

              <InputField
                icon={Globe2}
                label="Website"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </FormSection>

          {/* Branding */}
          <FormSection
            icon={Image}
            title="Organisation Branding"
            description="Add organisation images to improve its public profile."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Logo URL"
                name="logo"
                value={form.logo}
                onChange={handleChange}
                placeholder="https://..."
              />

              <InputField
                label="Cover Image URL"
                name="cover_image"
                value={form.cover_image}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            {(form.logo ||
              form.cover_image) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">

                {form.logo && (
                  <ImagePreview
                    title="Logo Preview"
                    src={form.logo}
                    square
                  />
                )}

                {form.cover_image && (
                  <ImagePreview
                    title="Cover Preview"
                    src={form.cover_image}
                  />
                )}
              </div>
            )}
          </FormSection>

          {/* Review note */}
          <div className="rounded-3xl border border-[#07505E]/20 bg-[#07505E]/5 p-6">
            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#07505E]" />
              </div>

              <div>
                <h3 className="font-bold text-[#073B4C]">
                  What happens after submission?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  IGATI administrators will review
                  the organisation information.
                  The organisation may be approved,
                  rejected or returned with requested
                  changes. Approved organisations
                  become visible in the public
                  ecosystem directory.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate("/profile")
              }
              disabled={
                saving || submitting
              }
              className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving || submitting
              }
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#07505E] text-[#07505E] bg-white font-semibold hover:bg-[#07505E]/5 disabled:opacity-50 transition"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Draft
                </>
              )}
            </button>

            <button
              type="button"
              onClick={
                handleSubmitForReview
              }
              disabled={
                saving || submitting
              }
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#07505E] text-white font-semibold hover:bg-[#073B4C] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit for Review
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ProcessCard({
  number,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="w-9 h-9 rounded-xl bg-[#07505E] text-white flex items-center justify-center font-bold shrink-0">
          {number}
        </div>

        <div>
          <h3 className="font-bold text-[#073B4C]">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormSection({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
      <div className="flex items-start gap-4 mb-7">
        <div className="w-11 h-11 rounded-2xl bg-[#07505E]/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#07505E]" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#073B4C]">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  min,
  max,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
      />
    </label>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none resize-y transition focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
  required,
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#07505E] focus:ring-4 focus:ring-[#07505E]/10"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ImagePreview({
  title,
  src,
  square = false,
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-700">
        {title}
      </p>

      <div
        className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${
          square
            ? "w-32 h-32"
            : "w-full h-40"
        }`}
      >
        <img
          src={src}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display =
              "none";
          }}
        />
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