import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "#about" },
    { name: "Ecosystem Pillars", href: "#pillars" },
    { name: "Solution Centre", href: "#solutions" },
    { name: "MUST RICE", href: "#incubation" },
    { name: "Contact", href: "#contact" },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scripture Top Bar */}
      <div className="bg-[#073B4C] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 sm:px-6 lg:justify-between lg:px-8">
          {/* Scripture */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#F2B632]" />

            <p className="text-center text-[11px] font-medium sm:text-xs lg:text-left">
              “We Are the Light and the Salt of the Earth”
              <span className="hidden sm:inline">
                {" "}
                — Matthew 5:13–19
              </span>
            </p>
          </div>

          {/* Incubation Info */}
          <div className="hidden items-center gap-2 text-xs text-white/70 lg:flex">
            <span>Incubated by MUST RICE</span>

            <span className="text-[#F2B632]">•</span>

            <span>Meru, Kenya & Global Network</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[76px] items-center justify-between lg:h-[82px]">
            
            {/* Logo */}
            <a
              href="#home"
              onClick={closeMobileMenu}
              className="flex min-w-0 items-center gap-3"
            >
              <img
                src={logo}
                alt="Igati Global Mission Network"
                className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20"
              />

              <div className="hidden min-w-0 sm:block">
                <h1 className="text-base font-bold leading-tight tracking-wide text-[#073B4C] lg:text-lg">
                  IGATI
                </h1>

                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6C994E] lg:text-[10px]">
                  Global Mission Network
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative py-2 text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-[#07505E]"
                >
                  {link.name}

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#F2B632] transition-all duration-300 hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-2 xl:flex">
              <a
                href="#signin"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#073B4C] transition-colors hover:bg-gray-50"
              >
                Sign In
              </a>

              <a
                href="#join"
                className="flex items-center gap-2 rounded-lg bg-[#073B4C] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#07505E] hover:shadow-md"
              >
                Join the Network
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Tablet Join Button */}
            <a
              href="#join"
              className="ml-auto mr-2 hidden rounded-lg bg-[#073B4C] px-4 py-2 text-sm font-semibold text-white sm:block xl:hidden"
            >
              Join Network
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-[#073B4C] transition-colors hover:bg-gray-100 lg:hidden"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={25} strokeWidth={2} />
              ) : (
                <Menu size={27} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ease-in-out lg:hidden ${
            mobileMenuOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 border-t-0 opacity-0"
          }`}
        >
          <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:pl-2 hover:text-[#07505E]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href="#signin"
                onClick={closeMobileMenu}
                className="flex flex-1 items-center justify-center rounded-lg border border-[#073B4C] px-5 py-3 text-sm font-semibold text-[#073B4C] transition-colors hover:bg-gray-50"
              >
                Sign In
              </a>

              <a
                href="#join"
                onClick={closeMobileMenu}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#073B4C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#07505E]"
              >
                Join the Network
                <ArrowRight size={17} />
              </a>
            </div>

            {/* Mobile Incubation */}
            <div className="mt-5 rounded-lg bg-[#F8FAF7] px-4 py-3">
              <p className="text-xs font-semibold text-[#073B4C]">
                Incubated by MUST RICE
              </p>

              <p className="mt-1 text-[11px] text-gray-500">
                Meru, Kenya & Global Network
              </p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;