import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Building2, CalendarDays, CheckCircle2,
  Clock3, ExternalLink, FileText, Globe2, Handshake, HeartHandshake,
  Lightbulb, LoaderCircle, Mail, MapPin, Network, Phone, ShieldCheck,
  Target, Users, BriefcaseBusiness, BookOpen, ChevronRight,
} from "lucide-react";
import { apiRequest } from "../api/api";

const NAV = ["Overview", "About", "Activities", "Projects", "Opportunities", "People", "Join"];
const navy = "#073B4C";

function asArray(value, key) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.[key])) return value[key];
  if (Array.isArray(value?.results)) return value.results;
  return [];
}
function readable(value) {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value && typeof value === "object") return value.name || value.title || value.label || "";
  return "";
}
function pretty(value) {
  return readable(value).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function dateText(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function safeUrl(value) {
  if (!value || typeof value !== "string") return "";
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
}
function imageUrl(value) {
  if (typeof value === "string") return value;
  return value?.url || "";
}
function Panel({ title, icon: Icon, children, action }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
        <h2 className="flex items-center gap-2.5 text-base font-bold text-[#073B4C] sm:text-lg">
          {Icon && <Icon size={19} className="text-[#6C994E]" />}{title}
        </h2>
        {action}
      </div>
      <div className="px-5 py-6 sm:px-7">{children}</div>
    </section>
  );
}
function Paragraph({ children }) {
  return <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">{children}</p>;
}
function Detail({ title, value, icon: Icon }) {
  if (!readable(value)) return null;
  return (
    <div className="flex gap-3 py-3">
      {Icon && <Icon size={17} className="mt-0.5 shrink-0 text-[#6C994E]" />}
      <div className="min-w-0"><p className="text-xs font-medium text-slate-400">{title}</p><p className="mt-0.5 break-words text-sm font-semibold text-[#073B4C]">{readable(value)}</p></div>
    </div>
  );
}
function Empty({ title, description }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center"><Building2 size={30} className="mx-auto text-[#6C994E]" /><h3 className="mt-3 font-bold text-[#073B4C]">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p></div>;
}
function ContentCards({ items, kind }) {
  if (!items.length) return <Empty title={`No ${kind.toLowerCase()} published yet`} description="Public updates will appear here when the organisation publishes them." />;
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((item, index) => {
    const image = imageUrl(item.cover_image || item.image || item.featured_image || item.banner_image || item.thumbnail);
    const title = readable(item.title || item.name) || "Untitled";
    const url = safeUrl(kind === "Opportunities" ? item.application_url : item.external_url);
    const stamp = dateText(item.deadline || item.activity_date || item.start_date || item.created_at);
    return <article key={item.id || item.slug || index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#073B4C] to-[#07505E]">{image ? <img src={image} alt={title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><Building2 size={40} className="text-white/35" /></div>}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#073B4C]">{pretty(item.post_type || item.opportunity_type || kind.slice(0, -1))}</span>
      </div>
      <div className="p-5"><h3 className="text-lg font-bold leading-snug text-[#073B4C]">{title}</h3><p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">{readable(item.description || item.summary || item.content) || "Explore this organisation's work."}</p>
        <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">{stamp && <span className="flex items-center gap-1"><CalendarDays size={13} />{stamp}</span>}{readable(item.location) && <span className="flex items-center gap-1"><MapPin size={13} />{readable(item.location)}</span>}</div>
        {url && <a href={url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#527A3A]">View details <ArrowRight size={15} /></a>}
      </div>
    </article>;
  })}</div>;
}

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
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataWarnings, setDataWarnings] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true); setError(""); setActiveTab("Overview");
      try {
        const detail = await apiRequest(`/organisations/${encodeURIComponent(slug)}/`);
        if (cancelled) return;
        const org = detail.organisation || detail;
        setOrganisation(org);
        const id = org.id;
        const paths = [
          [`/organisations/${id}/activities/`, "activities"],
          [`/organisations/${id}/projects/`, "projects"],
          [`/organisations/${id}/opportunities/`, "opportunities"],
          [`/organisations/${encodeURIComponent(slug)}/members/`, "members"],
        ];
        const results = await Promise.allSettled(paths.map(([path]) => apiRequest(path)));
        if (cancelled) return;
        const values = results.map((result, index) => result.status === "fulfilled" ? asArray(result.value, paths[index][1]) : asArray(detail[paths[index][1]], paths[index][1]));
        setActivities(values[0]); setProjects(values[1]); setOpportunities(values[2]); setMembers(values[3]);
        setDataWarnings(results.flatMap((result, index) => result.status === "rejected" && !Array.isArray(detail[paths[index][1]]) ? [paths[index][1]] : []));
      } catch (err) { if (!cancelled) setError(err.message || "Unable to load organisation."); }
      finally { if (!cancelled) setLoading(false); }
    }
    load(); return () => { cancelled = true; };
  }, [slug]);

  async function submitJoinRequest(e) {
    e.preventDefault(); setSubmitting(true); setFormError(""); setSuccess("");
    try {
      const response = await apiRequest(`/organisations/${encodeURIComponent(organisation.slug || slug)}/join/`, {
        method: "POST", body: JSON.stringify(form),
      });
      setSuccess(response?.message || "Your membership request has been submitted for review.");
      setForm({ full_name: "", email: "", phone: "", message: "" });
    } catch (err) { setFormError(err.message || "Unable to submit your request."); }
    finally { setSubmitting(false); }
  }
  function goToTab(tab) { setActiveTab(tab); document.getElementById("profile-navigation")?.scrollIntoView({ behavior: "smooth", block: "start" }); }

  if (loading) return <div className="flex min-h-[65vh] items-center justify-center"><LoaderCircle size={34} className="animate-spin text-[#6C994E]" /></div>;
  if (error || !organisation) return <div className="mx-auto max-w-xl px-5 py-24 text-center"><Building2 size={42} className="mx-auto text-slate-400" /><h1 className="mt-4 text-2xl font-bold text-[#073B4C]">Organisation unavailable</h1><p className="mt-3 text-slate-500">{error || "This organisation could not be found."}</p><Link to="/ecosystem" className="mt-6 inline-flex items-center gap-2 text-[#527A3A]"><ArrowLeft size={16} />Back to ecosystem</Link></div>;

  const org = organisation;
  const logo = imageUrl(org.logo);
  const cover = imageUrl(org.cover_image);
  const website = safeUrl(org.website);
  const verified = org.approval_status === "approved" || org.is_verified === true;
  const themes = asArray(org.themes, "themes");
  const description = org.description || org.summary || org.short_definition;
  const location = readable(org.location) || org.address;
  const overviewSections = [
    ["Our mission", org.mission, Target], ["Our vision", org.vision, Lightbulb],
    ["What we do", org.what_we_do, BriefcaseBusiness], ["What we offer", org.what_we_offer, HeartHandshake],
    ["What we need", org.what_we_need, Handshake],
  ].filter(([, value]) => readable(value));
  const strategy = [
    ["Purpose", org.primary_purpose], ["The challenge", org.problem_statement],
    ["The opportunity", org.opportunity_statement], ["Long-term transformation", org.ultimate_transformation],
    ["Strategic objectives", org.strategic_objectives], ["Role in the ecosystem", org.ecosystem_role],
    ["Institutional relationships", org.institutional_relationship],
  ].filter(([, value]) => readable(value));
  const info = [
    ["Organisation type", pretty(org.organisation_type), Building2],
    ["Location", location, MapPin], ["Established", org.year_established, CalendarDays],
    ["Registration number", org.registration_number, FileText],
    ["Geographic scope", org.geographic_scope, MapPin], ["Programme reach", org.programme_reach, Network],
  ];

  return <main className="min-h-screen bg-[#F6F8F7] pb-24">
    {/* Cover and identity */}
    <div className="relative h-44 overflow-hidden bg-gradient-to-r from-[#073B4C] via-[#07505E] to-[#6C994E] sm:h-60 lg:h-72">
      {cover && <img src={cover} alt={`${org.name} cover`} className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-[#073B4C]/70 via-[#073B4C]/20 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8"><Link to="/ecosystem" className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm"><ArrowLeft size={14} /> Ecosystem directory</Link></div>
    </div>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-b-2xl border-x border-b border-slate-200 bg-white px-5 pb-7 shadow-sm sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div className="-mt-12 flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[5px] border-white bg-[#EAF1E4] shadow-md sm:-mt-16 sm:h-36 sm:w-36">
              {logo ? <img src={logo} alt={`${org.name} logo`} className="h-full w-full object-contain p-2" /> : <Building2 size={52} className="text-[#527A3A]" />}
            </div>
            <div className="min-w-0 pt-1 sm:pb-1"><div className="mb-2 flex flex-wrap items-center gap-2"><span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#527A3A]">IGATI Ecosystem Organisation</span>{verified && <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700"><ShieldCheck size={13} /> Approved</span>}</div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#073B4C] sm:text-3xl lg:text-4xl">{org.name}</h1>
              {org.tagline && <p className="mt-2 text-sm text-slate-600 sm:text-base">{org.tagline}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 sm:text-sm">{location && <span className="inline-flex items-center gap-1.5"><MapPin size={15} />{location}</span>}{org.organisation_type && <span className="inline-flex items-center gap-1.5"><Building2 size={15} />{pretty(org.organisation_type)}</span>}{website && <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#527A3A] hover:underline"><Globe2 size={15} /> Website <ExternalLink size={12} /></a>}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:pb-1"><button onClick={() => goToTab("Join")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#07505E]"><Users size={16} /> Join organisation</button>{org.email && <a href={`mailto:${org.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#073B4C] hover:bg-slate-50"><Mail size={16} /> Contact</a>}</div>
        </div>
      </div>
    </div>

    {/* Tab navigation */}
    <div id="profile-navigation" className="sticky top-0 z-20 mt-5 scroll-mt-0 border-y border-slate-200 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">{NAV.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`shrink-0 border-b-[3px] px-4 py-4 text-sm font-semibold transition ${activeTab === tab ? "border-[#6C994E] text-[#073B4C]" : "border-transparent text-slate-500 hover:text-[#073B4C]"}`}>{tab}</button>)}</div>
    </div>

    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {activeTab === "Overview" && <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-6">
          <Panel title="About the organisation" icon={Building2}><Paragraph>{description || "This organisation has not added a public description yet."}</Paragraph>{org.short_definition && org.short_definition !== description && <p className="mt-4 text-sm font-medium text-[#527A3A]">{org.short_definition}</p>}{themes.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{themes.map((theme, index) => <span key={theme.id || index} className="rounded-full bg-[#EAF1E4] px-3 py-1.5 text-xs font-semibold text-[#527A3A]">{readable(theme)}</span>)}</div>}</Panel>
          {overviewSections.length > 0 && <div className="grid gap-5 sm:grid-cols-2">{overviewSections.map(([title, value, Icon]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF1E4] text-[#527A3A]"><Icon size={20} /></div><h3 className="mt-4 text-lg font-bold text-[#073B4C]">{title}</h3><p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-600">{value}</p></div>)}</div>}
          {strategy.length > 0 && <Panel title="Our purpose and direction" icon={Target}><div className="space-y-6">{strategy.slice(0, 3).map(([title, value]) => <div key={title}><h3 className="mb-2 text-sm font-bold text-[#073B4C]">{title}</h3><Paragraph>{value}</Paragraph></div>)}</div><button onClick={() => goToTab("About")} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#527A3A]">Read full organisation profile <ChevronRight size={16} /></button></Panel>}
          <Panel title="Latest activity" icon={Clock3} action={<button onClick={() => goToTab("Activities")} className="text-xs font-semibold text-[#527A3A]">View all</button>}>{activities.length ? <div className="space-y-4">{activities.slice(0, 3).map((item, index) => <div key={item.id || index} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"><p className="font-semibold text-[#073B4C]">{readable(item.title || item.name)}</p><p className="mt-1 line-clamp-2 text-sm text-slate-500">{readable(item.description || item.content)}</p></div>)}</div> : <p className="text-sm text-slate-500">No public activities published yet.</p>}</Panel>
        </div>
        <aside className="space-y-6">
          <Panel title="Organisation details" icon={FileText}><div className="divide-y divide-slate-100">{info.map(([title, value, Icon]) => <Detail key={title} title={title} value={value} icon={Icon} />)}</div></Panel>
          <Panel title="Contact information" icon={Mail}><div className="space-y-1">{org.email && <a href={`mailto:${org.email}`} className="flex items-center gap-3 break-all py-2 text-sm text-[#527A3A]"><Mail size={17} className="shrink-0" />{org.email}</a>}{org.phone && <a href={`tel:${org.phone}`} className="flex items-center gap-3 py-2 text-sm text-[#073B4C]"><Phone size={17} className="shrink-0 text-[#6C994E]" />{org.phone}</a>}{website && <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-3 break-all py-2 text-sm text-[#527A3A]"><Globe2 size={17} className="shrink-0" />{org.website}</a>}{!org.email && !org.phone && !website && <p className="text-sm text-slate-500">No public contact details available.</p>}</div></Panel>
          <div className="rounded-2xl bg-[#073B4C] p-6 text-white"><Handshake size={26} className="text-[#F2B632]" /><h3 className="mt-4 text-xl font-bold">Connect and collaborate</h3><p className="mt-3 text-sm leading-6 text-white/70">Discover ways to participate in this organisation's work and community.</p><button onClick={() => goToTab("Join")} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-4 py-3 text-sm font-bold text-[#073B4C]">Request membership <ArrowRight size={16} /></button></div>
        </aside>
      </div>}

      {activeTab === "About" && <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]"><div className="space-y-6"><Panel title="Organisation background" icon={BookOpen}><Paragraph>{description || "Background information has not been published."}</Paragraph></Panel>{strategy.map(([title, value]) => <Panel key={title} title={title} icon={Target}><Paragraph>{value}</Paragraph></Panel>)}{[ ["Partnership interests", org.partnership_interests], ["How to engage", org.how_to_engage] ].filter(([, v]) => readable(v)).map(([title, value]) => <Panel key={title} title={title} icon={Handshake}><Paragraph>{value}</Paragraph></Panel>)}</div><aside className="space-y-6"><Panel title="Organisation information" icon={Building2}><div className="divide-y divide-slate-100">{info.map(([title, value, Icon]) => <Detail key={title} title={title} value={value} icon={Icon} />)}</div></Panel>{themes.length > 0 && <Panel title="Focus areas" icon={Network}><div className="flex flex-wrap gap-2">{themes.map((theme, index) => <span key={theme.id || index} className="rounded-full bg-[#EAF1E4] px-3 py-2 text-xs font-semibold text-[#527A3A]">{readable(theme)}</span>)}</div></Panel>}</aside></div>}

      {activeTab === "Activities" && <><h2 className="mb-6 text-2xl font-bold text-[#073B4C]">Activities and updates</h2><ContentCards items={activities} kind="Activities" /></>}
      {activeTab === "Projects" && <><h2 className="mb-6 text-2xl font-bold text-[#073B4C]">Projects and initiatives</h2><ContentCards items={projects} kind="Projects" /></>}
      {activeTab === "Opportunities" && <><h2 className="mb-6 text-2xl font-bold text-[#073B4C]">Opportunities</h2><ContentCards items={opportunities} kind="Opportunities" /></>}
      {activeTab === "People" && <><div className="mb-6"><h2 className="text-2xl font-bold text-[#073B4C]">People and members</h2><p className="mt-2 text-sm text-slate-500">People publicly associated with this organisation.</p></div>{members.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{members.map((entry, index) => { const person = entry.person && typeof entry.person === "object" ? entry.person : entry; const name = readable(person.full_name || person.name) || "Organisation member"; const avatar = imageUrl(person.profile_image); return <article key={entry.id || index} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">{avatar ? <img src={avatar} alt={name} className="h-16 w-16 rounded-full object-cover" /> : <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EAF1E4] text-xl font-bold text-[#527A3A]">{name.charAt(0)}</div>}<div className="min-w-0"><h3 className="font-bold text-[#073B4C]">{name}</h3><p className="mt-1 text-xs text-slate-500">{pretty(entry.role || person.role || "Member")}</p></div></article>; })}</div> : <Empty title="No public members listed" description="Member profiles will appear when the organisation makes them available." />}</>}
      {activeTab === "Join" && <div className="mx-auto max-w-2xl"><Panel title={`Join ${org.name}`} icon={Users}><p className="mb-6 text-sm leading-7 text-slate-600">Introduce yourself and explain why you would like to join. Your application will be reviewed by the organisation.</p>{success ? <div role="status" className="rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800"><CheckCircle2 size={23} className="mb-2" />{success}</div> : <form onSubmit={submitJoinRequest} className="space-y-5">{formError && <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{formError}</div>}{[["full_name", "Full name", "text", true], ["email", "Email address", "email", true], ["phone", "Phone number", "tel", false]].map(([key, label, type, required]) => <label key={key} className="block text-sm font-semibold text-[#073B4C]">{label}{required && <span className="text-red-500"> *</span>}<input name={key} type={type} required={required} value={form[key]} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} disabled={submitting} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#6C994E]" /></label>)}<label className="block text-sm font-semibold text-[#073B4C]">Why would you like to join? <span className="text-red-500">*</span><textarea name="message" required minLength={10} maxLength={2000} rows={5} value={form.message} onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} disabled={submitting} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#6C994E]" /></label><button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3.5 text-sm font-bold text-white disabled:opacity-60">{submitting ? <><LoaderCircle size={17} className="animate-spin" />Submitting...</> : <>Submit membership request <ArrowRight size={17} /></>}</button><div className="flex gap-3 rounded-xl bg-[#F8FAF7] p-4 text-xs leading-6 text-slate-600"><ShieldCheck size={20} className="shrink-0 text-[#6C994E]" />Submitting a request does not automatically grant membership. The organisation will review your application.</div></form>}</Panel></div>}
      {dataWarnings.length > 0 && activeTab !== "Join" && <p className="mt-8 text-xs text-slate-400">Some public information could not be loaded ({dataWarnings.join(", ")}).</p>}
    </div>
  </main>;
}