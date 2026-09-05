import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Globe2,
  Menu,
  Network,
  X,
} from "lucide-react";

import logo from "../../assets/logo.png";
import mustLogo from "../../assets/must-logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl">
      {/* =========================================================
          DESKTOP / MAIN NAVBAR
      ========================================================== */}
      <div className="mx-auto max-w-[1550px] px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="flex h-[90px] items-center justify-between lg:h-[105px]">
          {/* =====================================================
              LEFT: IGATI LOGO
          ====================================================== */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex shrink-0 items-center"
            aria-label="IGATI Global Mission Network"
          >
            <img
              src={logo}
              alt="IGATI Global Mission Network"
              className="h-20 w-20 shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-24 sm:w-24 lg:h-24 lg:w-24 xl:h-28 xl:w-28"
            />
          </Link>

          {/* =====================================================
              CENTER: DESKTOP NAVIGATION
          ====================================================== */}
          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
            <Link
              to="/"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
            >
              About
            </Link>

            {/* Main Ecosystem Entry */}
            <Link
              to="/ecosystem"
              className="group mx-1 inline-flex items-center gap-2 rounded-xl border border-[#6C994E]/20 bg-[#F4F8F0] px-3 py-2.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6C994E]/40 hover:bg-[#EDF5E7] hover:shadow-sm xl:px-4"
            >
              <Network size={16} className="text-[#6C994E]" />

              <span>Explore the Ecosystem</span>

              <ArrowRight
                size={14}
                className="text-[#6C994E] transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>

            {/* <Link
              to="/projects"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
            >
              Projects
            </Link> */}

            <Link
              to="/marketplace"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
            >
              Marketplace
            </Link>

            <Link
              to="/our-stories"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
            >
              Our stories
            </Link>

            <Link
              to="/impact"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
            >
              Impact
            </Link>

            {/* <Link
              to="/learn"
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
            >
              Learn
            </Link> */}

            {/* More Dropdown */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C] xl:px-3"
              >
                More

                <ChevronDown
                  size={14}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute right-0 top-full z-50 w-56 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                  <Link
                    to="/opportunities"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C]"
                  >
                    Opportunities
                  </Link>

                  <Link
                    to="/join"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C]"
                  >
                    Participate
                  </Link>

                  <a
                    href="/#contact"
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-[#F8FAF7] hover:text-[#073B4C]"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* =====================================================
              DESKTOP RIGHT SIDE
          ====================================================== */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            {/* Actions - wider desktops */}
            <div className="hidden items-center gap-2 xl:flex">
              {/* <Link
                to="/login"
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#073B4C] transition-colors hover:bg-gray-50"
              >
                Sign In
              </Link> */}

              <Link
                to="/join"
                className="group flex items-center gap-2 rounded-xl bg-[#073B4C] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E] hover:shadow-md"
              >
                Join Network

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Divider */}
            <div className="hidden h-12 w-px bg-gray-200 xl:block" />

            {/* MUST Logo */}
            <a
              href="https://www.must.ac.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 items-center"
              aria-label="Meru University of Science and Technology"
            >
              <img
                src={mustLogo}
                alt="Meru University of Science and Technology"
                className="h-20 w-20 shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03] lg:h-20 lg:w-20 xl:h-24 xl:w-24"
              />
            </a>
          </div>

          {/* =====================================================
              TABLET JOIN BUTTON
          ====================================================== */}
          <Link
            to="/join"
            className="ml-auto mr-2 hidden rounded-xl bg-[#073B4C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#07505E] sm:block lg:hidden"
          >
            Join Network
          </Link>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#073B4C] transition-colors hover:bg-gray-100 lg:hidden"
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

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================== */}
      <div
        className={`border-t border-gray-100 bg-white transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "max-h-[calc(100dvh-90px)] overflow-y-auto overscroll-contain opacity-100"
            : "max-h-0 overflow-hidden border-t-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          {/* Mobile institution logos */}
          <div className="mb-5 flex items-center justify-between rounded-2xl border border-gray-100 bg-[#F8FAF7] px-4 py-3">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="IGATI Global Mission Network"
                className="h-14 w-14 object-contain"
              />

              <div className="h-8 w-px bg-gray-200" />

              <img
                src={mustLogo}
                alt="Meru University of Science and Technology"
                className="h-12 w-12 object-contain"
              />
            </div>

            <div className="text-right">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6C994E]">
                University–Community
              </p>

              <p className="mt-1 text-[9px] font-semibold text-[#073B4C]">
                MUST–IGATI
              </p>
            </div>
          </div>

          {/* Ecosystem Feature */}
          <Link
            to="/ecosystem"
            onClick={closeMobileMenu}
            className="group relative mb-5 block overflow-hidden rounded-2xl bg-[#073B4C] p-5 text-white"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#6C994E]/30 blur-2xl" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <Network size={16} className="text-[#F2B632]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                  Explore the Ecosystem
                </p>
              </div>

              <h3 className="mt-2 text-base font-bold">
                One Ecosystem. Many Pathways.
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-white/60">
                Enter the MUST–IGATI Community Ecosystem and discover how
                people, research, innovation and enterprise connect.
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-white">
                Enter Ecosystem

                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>

          {/* Main Links */}
          <div className="flex flex-col">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#07505E]"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#07505E]"
            >
              About IGATI
            </Link>

            {/* <Link
              to="/projects"
              onClick={closeMobileMenu}
              className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#07505E]"
            >
              Projects
            </Link> */}

            <Link
              to="/marketplace"
              onClick={closeMobileMenu}
              className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#07505E]"
            >
              Marketplace
            </Link>

            <Link
              to="/our-stories"
              onClick={closeMobileMenu}
              className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#07505E]"
            >
              Our Stories
            </Link>


            <Link
              to="/impact"
              onClick={closeMobileMenu}
              className="border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#07505E]"
            >
              Impact
            </Link>


            

            {/* <Link
              to="/learn"
              onClick={closeMobileMenu}
              className="flex items-center justify-between border-b border-gray-100 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#07505E]"
            >
              <span>Learn</span>

              <BookOpen size={15} className="text-gray-400" />
            </Link> */}

            {/* More */}
            <div className="border-b border-gray-100">
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium text-gray-700"
              >
                More

                <ChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  moreOpen
                    ? "max-h-64 pb-3 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-3 border-l-2 border-[#6C994E]/20 pl-4">
                  <Link
                    to="/opportunities"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600"
                  >
                    Opportunities
                  </Link>

                  <Link
                    to="/join"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600"
                  >
                    Participate
                  </Link>

                  <a
                    href="/#contact"
                    onClick={closeMobileMenu}
                    className="block py-2.5 text-sm text-gray-600"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {/* <Link
              to="/login"
              onClick={closeMobileMenu}
              className="flex items-center justify-center rounded-xl border border-[#073B4C] px-5 py-3 text-sm font-semibold text-[#073B4C] transition-colors hover:bg-[#F8FAF7]"
            >
              Sign In
            </Link> */}

            <Link
              to="/join"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#07505E]"
            >
              Join the Network

              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Global Network Note */}
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#F8FAF7] px-4 py-3">
            <Globe2
              size={15}
              className="shrink-0 text-[#6C994E]"
            />

            <p className="text-[11px] leading-5 text-gray-500">
              From the MUST–IGATI Community Ecosystem in Meru to a global
              mission network.
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;