import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Users, Building2, Newspaper, FolderKanban,
  BriefcaseBusiness, Settings, ExternalLink,
} from "lucide-react";

const links = [
  { label: "Overview", path: "", icon: LayoutDashboard, end: true },
  { label: "Membership requests", path: "members", icon: Users },
  { label: "Posts & activities", path: "posts", icon: Newspaper },
  { label: "Projects", path: "projects", icon: FolderKanban },
  { label: "Opportunities", path: "opportunities", icon: BriefcaseBusiness },
  { label: "Marketplace", path: "marketplace", icon: BriefcaseBusiness },
  { label: "Organisation details", path: "settings", icon: Settings },
];

export default function OrganisationAdminSidebar({
  organisation,
  mobile = false,
  onNavigate,
}) {
  return (
    <aside className={`${mobile ? "block" : "hidden md:flex"} w-full md:w-64 md:shrink-0 flex-col bg-[#073B4C] text-white`}>
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          {organisation?.logo ? (
            <img src={organisation.logo} alt="" className="h-11 w-11 rounded-xl bg-white object-cover" />
          ) : (
            <div className="rounded-xl bg-white/10 p-3"><Building2 size={22} /></div>
          )}
          <div className="min-w-0">
            <p className="font-bold">IGATI</p>
            <p className="truncate text-xs text-white/60">Organisation workspace</p>
          </div>
        </div>
        <p className="mt-4 truncate text-sm font-semibold">{organisation?.name}</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={path}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive ? "bg-white/15 font-semibold text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>

      {organisation?.slug && (
        <button
          onClick={() => {
            onNavigate?.();
            window.location.href = `/organisations/${organisation.slug}`;
          }}
          className="m-4 inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
        >
          <ExternalLink size={17} /> View public profile
        </button>
      )}
    </aside>
  );
}