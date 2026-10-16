
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Handshake,
  Leaf,
  LoaderCircle,
  MapPin,
  Microscope,
  ShoppingBasket,
  Sprout,
  Users,
} from "lucide-react";

import { apicultureApi } from "../api/apicultureApi";

const pathways = [
  {
    title: "Farmers & Beekeepers",
    value: "farmer",
    icon: Sprout,
    description:
      "Join training, beekeeping development and community support initiatives.",
  },
  {
    title: "Community Groups",
    value: "community_group",
    icon: Users,
    description:
      "Register a cooperative, CBO, youth group or women's group.",
  },
  {
    title: "Buyers & Suppliers",
    value: "buyer_supplier",
    icon: ShoppingBasket,
    description:
      "Connect with honey producers, bee-product buyers and equipment suppliers.",
  },
  {
    title: "Partners & Investors",
    value: "partner",
    icon: Handshake,
    description:
      "Explore investment, training, market access and development partnerships.",
  },
  {
    title: "Researchers & Learners",
    value: "researcher",
    icon: Microscope,
    description:
      "Collaborate through research, student learning and innovation.",
  },
];

const initialForm = {
  application_type: "farmer",
  full_name: "",
  phone: "",
  email: "",
  ward: "",
  organisation_name: "",
  message: "",
  consent: false,
};

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] ${
          light ? "text-[#9BC36B]" : "text-[#6C994E]"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-[#073B4C]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-sm leading-7 sm:text-base ${
            light ? "text-white/65" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function StatCard({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/55">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold text-white">
        {typeof value === "number" ? value.toLocaleString() : value ?? "—"}
      </p>

      <p className="mt-2 text-xs leading-5 text-white/45">{note}</p>
    </div>
  );
}

export default function ApicultureProgrammePage() {
  const [stats, setStats] = useState(null);
  const [statsError, setStatsError] = useState("");

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [wards, setWards] = useState([]);
const [wardsLoading, setWardsLoading] = useState(true);
const [wardsError, setWardsError] = useState("");

  useEffect(() => {
    let active = true;

    apicultureApi
      .getPublicStats()
      .then((data) => {
        if (active) setStats(data);
      })
      .catch(() => {
        if (active) {
          setStatsError(
            "Live figures are temporarily unavailable. Please try again later."
          );
        }
      });

    return () => {
      active = false;
    };
  }, []);


  useEffect(() => {
  let active = true;

  apicultureApi
    .getWards()
    .then((data) => {
      if (active) {
        setWards(Array.isArray(data) ? data : data.wards || []);
        setWardsError("");
      }
    })
    .catch((error) => {
      if (active) {
        setWardsError(
          error.message || "Unable to load wards. Please try again."
        );
      }
    })
    .finally(() => {
      if (active) {
        setWardsLoading(false);
      }
    });

  return () => {
    active = false;
  };
}, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function selectPathway(value) {
    setForm((previous) => ({
      ...previous,
      application_type: value,
    }));

    document.getElementById("join")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!form.consent) {
      setFormError(
        "Please agree to be contacted about your expression of interest."
      );
      return;
    }

    setSubmitting(true);

    try {
      const result = await apicultureApi.submitApplication({
        ...form,
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        ward: form.ward.trim(),
        organisation_name: form.organisation_name.trim(),
        message: form.message.trim(),
        consent_given: form.consent,
      });

      setSuccessMessage(
        result.message ||
          "Your expression of interest has been received for review."
      );

      setForm({ ...initialForm });
    } catch (error) {
      setFormError(
        error.message || "Unable to submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAF7] text-slate-800">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#073B4C]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#6C994E]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#F2B632]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
          <Link
            to="/ecosystem"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/65 hover:text-white"
          >
            <ArrowRight className="rotate-180" size={16} />
            Back to the Ecosystem
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9BC36B]">
                <Leaf size={14} />
                MUST–IGATI Community Ecosystem
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Meru County Communities
                <span className="mt-2 block text-[#F2B632]">
                  Apiculture Programme
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                Connecting beekeepers, community groups, researchers,
                trainers, suppliers and buyers to build a productive,
                knowledge-driven and sustainable bee-products value chain
                across Meru County.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
                <span className="rounded-full bg-white/10 px-4 py-2">
                  2026–2036 vision
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2">
                  Community enterprise
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2">
                  Research & innovation
                </span>
              </div>

              <p className="mt-5 text-sm font-bold text-[#9BC36B]">
                Vision: One Million Productive Bee Hives
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#join"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition hover:-translate-y-0.5 hover:bg-[#e5aa26]"
                >
                  Express Your Interest
                  <ArrowRight size={17} />
                </a>

                <a
                  href="#programme"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Explore the Programme
                </a>
              </div>
            </div>

            {/* LIVE DASHBOARD */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9BC36B]">
                Programme snapshot
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                Community impact dashboard
              </h2>

              <p className="mt-2 text-xs leading-5 text-white/45">
                Figures come from recorded programme data.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatCard
                  label="Participants"
                  value={stats?.participants}
                  note="Active registered participants"
                />
                <StatCard
                  label="Community groups"
                  value={stats?.community_groups}
                  note="Verified groups and cooperatives"
                />
                <StatCard
                  label="Apiaries"
                  value={stats?.apiaries}
                  note="Verified apiary sites"
                />
                <StatCard
                  label="Bee hives"
                  value={stats?.hives}
                  note="Recorded hives at verified apiaries"
                />
              </div>

              {statsError && (
                <p className="mt-4 text-xs text-white/55">{statsError}</p>
              )}

              <p className="mt-4 text-[11px] leading-5 text-white/40">
                Public totals are aggregated. Personal records and exact
                apiary locations are kept private.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME OVERVIEW */}
      <section
        id="programme"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <SectionHeading
          eyebrow="A living laboratory for enterprise"
          title="From community beekeeping to a stronger value chain"
          description="The programme brings community knowledge, research, training and enterprise together to improve livelihoods and strengthen sustainable bee-product production."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Support community-led and sustainable beekeeping.",
            "Connect producers to training, suppliers and buyers.",
            "Strengthen aggregation and visibility of bee products.",
            "Use verified information to monitor programme progress.",
          ].map((item, index) => (
            <article
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E]">
                <CheckCircle2 size={20} />
              </div>

              <p className="mt-5 text-sm font-semibold leading-6 text-[#073B4C]">
                {item}
              </p>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                Priority 0{index + 1}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PARTICIPATION PATHWAYS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Find your pathway"
            title="There is a place for you in the programme"
            description="Select the pathway that best describes your interest and submit an expression of interest."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {pathways.map(({ title, value, icon: Icon, description }) => (
              <article
                key={value}
                className="group rounded-2xl border border-slate-200 bg-[#F8FAF7] p-6 transition hover:-translate-y-1 hover:border-[#9BC36B] hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073B4C] text-[#F2B632]">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#073B4C]">
                  {title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                  {description}
                </p>

                <button
                  type="button"
                  onClick={() => selectPathway(value)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#07505E] hover:text-[#6C994E]"
                >
                  Select this pathway
                  <ArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LONG-TERM VISION */}
      <section className="bg-[#073B4C] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div>
            <SectionHeading
              eyebrow="A ten-year vision"
              title="One Million Productive Bee Hives"
              description="The 2026–2036 vision creates a shared direction for strengthening beekeeping, community enterprise, applied research and the bee-products value chain."
              light
            />

            <div className="mt-7 space-y-5">
              {[
                [
                  "Build capacity",
                  "Training, extension and practical knowledge sharing.",
                ],
                [
                  "Connect the value chain",
                  "Stronger relationships between producers, suppliers and buyers.",
                ],
                [
                  "Measure responsibly",
                  "Use verified data to guide decisions and track progress.",
                ],
              ].map(([title, description]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-[#9BC36B]"
                    size={20}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/55">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: BookOpen,
                title: "Learning & research",
                text: "Connect community practice with student learning and innovation.",
              },
              {
                icon: ShoppingBasket,
                title: "Markets & aggregation",
                text: "Improve product visibility and producer-to-buyer connections.",
              },
              {
                icon: MapPin,
                title: "Community monitoring",
                text: "Use aggregate ward-level information for responsible planning.",
              },
              {
                icon: Handshake,
                title: "Partnerships",
                text: "Connect community groups, institutions and development partners.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
              >
                <Icon className="text-[#F2B632]" size={24} />
                <h3 className="mt-4 font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section
        id="join"
        className="scroll-mt-8 py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <SectionHeading
              eyebrow="Take the next step"
              title="Express your interest"
              description="Tell the programme team how you would like to participate. Your submission will be reviewed; it does not automatically guarantee acceptance or funding."
            />

            <div className="mt-7 rounded-2xl border border-[#9BC36B]/30 bg-[#6C994E]/[0.07] p-5">
              <div className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-[#6C994E]"
                  size={20}
                />
                <div>
                  <h3 className="text-sm font-bold text-[#073B4C]">
                    Your information matters
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Share only information needed to follow up. Do not include
                    passwords, M-Pesa PINs or precise apiary GPS coordinates.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 text-sm text-slate-500">
              Looking to buy or sell bee products? Visit the{" "}
              <Link
                className="font-bold text-[#07505E] underline underline-offset-4"
                to="/marketplace"
              >
                Marketplace
              </Link>
              .
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-[#073B4C]">
                  I am applying as *
                </span>
                <select
                  required
                  name="application_type"
                  value={form.application_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10"
                >
                  {pathways.map((pathway) => (
                    <option key={pathway.value} value={pathway.value}>
                      {pathway.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#073B4C]">
                  Full name *
                </span>
                <input
                  required
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  maxLength={150}
                  autoComplete="name"
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#073B4C]">
                  Phone number *
                </span>
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="+254 7xx xxx xxx"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#073B4C]">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </label>

              <label className="block">
  <span className="mb-2 block text-sm font-semibold text-[#073B4C]">
    Ward <span className="text-red-500">*</span>
  </span>

  <select
    required
    name="ward"
    value={form.ward}
    onChange={handleChange}
    disabled={wardsLoading || wards.length === 0}
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10 disabled:cursor-not-allowed disabled:bg-slate-100"
  >
    <option value="">
      {wardsLoading
        ? "Loading wards..."
        : wards.length === 0
          ? "No wards available"
          : "Select your ward"}
    </option>

    {wards.map((ward) => (
      <option key={ward.id} value={String(ward.id)}>
        {ward.name}
      </option>
    ))}
  </select>

  {wardsError && (
    <span role="alert" className="mt-2 block text-xs text-red-600">
      {wardsError}
    </span>
  )}

  {!wardsLoading && !wardsError && wards.length === 0 && (
    <span className="mt-2 block text-xs text-slate-500">
      No active wards were found. Please contact the programme team.
    </span>
  )}
</label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-[#073B4C]">
                  Organisation or group name
                </span>
                <input
                  name="organisation_name"
                  value={form.organisation_name}
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="Optional: cooperative, CBO, business or institution"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-[#073B4C]">
                  Tell us about your interest
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={3000}
                  placeholder="Describe your experience, products, support needed or potential collaboration."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3.5 text-sm leading-6 outline-none focus:border-[#6C994E] focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </label>

              <label className="flex items-start gap-3 sm:col-span-2">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-[#6C994E]"
                />
                <span className="text-xs leading-5 text-slate-600">
                  I agree that the programme team may use the information I
                  provide to respond to this expression of interest. *
                </span>
              </label>
            </div>

            {formError && (
              <p
                role="alert"
                className="mt-5 whitespace-pre-line rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {formError}
              </p>
            )}

            {successMessage && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#07505E] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? (
                <>
                  <LoaderCircle className="animate-spin" size={17} />
                  Submitting…
                </>
              ) : (
                <>
                  Submit expression of interest
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-xs leading-5 text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>
            Meru County Communities Apiculture Programme · MUST–IGATI Community
            Ecosystem
          </p>
          <p>WE ARE THE LIGHT AND THE SALT OF THE EARTH</p>
        </div>
      </footer>
    </main>
  );
}
