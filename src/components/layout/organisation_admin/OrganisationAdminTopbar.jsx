import { ArrowLeft, ExternalLink, RefreshCw, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrganisationAdminTopbar({
  organisation,
  onRefresh,
  mobileMenuOpen,
  onToggleMobileMenu,
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            title="Back to profile"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={onToggleMobileMenu}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 md:hidden"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6C994E]">
              Organisation workspace
            </p>
            <h1 className="truncate text-lg font-bold text-[#073B4C] sm:text-xl">
              {organisation?.name || "Organisation"}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onRefresh}
            className="rounded-xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50"
            title="Refresh"
          >
            <RefreshCw size={17} />
          </button>
          {organisation?.slug && (
            <button
              onClick={() => navigate(`/organisations/${organisation.slug}`)}
              className="hidden items-center gap-2 rounded-xl bg-[#07505E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#073B4C] sm:inline-flex"
            >
              <ExternalLink size={16} /> Public profile
            </button>
          )}
        </div>
      </div>
    </header>
  );
}