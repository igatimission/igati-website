import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About IGATI", to: "/about" },
    { name: "Explore the Ecosystem", to: "/ecosystem" },
    { name: "Projects", to: "/projects" },
    { name: "Marketplace", to: "/marketplace" },
    { name: "Learn", to: "/learn" },
  ];

  const participationLinks = [
    { name: "Join the Network", to: "/join" },
    { name: "Explore Opportunities", to: "/opportunities" },
    { name: "Find Your Place", to: "/ecosystem#find-your-place" },
    { name: "Partner With IGATI", to: "/join" },
    { name: "Sign In", to: "/login" },
  ];

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#073B4C] text-white"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[#F2B632]/10 blur-3xl" />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-[74px] w-[74px] items-center justify-center rounded-xl bg-white p-1.5 shadow-sm">
                <img
                  src={logo}
                  alt="IGATI Global Mission Network"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-wide text-white">
                  IGATI
                </h2>

                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#F2B632]">
                  Global Mission Network
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Connecting communities, university, research, innovation,
              entrepreneurship, enterprises, markets and partners through
              one living ecosystem for sustainable community impact.
            </p>

            <p className="mt-4 text-sm font-semibold italic text-[#F2B632]">
              One Mission. One Connected Ecosystem.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-[#F2B632] hover:bg-[#F2B632] hover:text-[#073B4C]"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-[#F2B632] hover:bg-[#F2B632] hover:text-[#073B4C]"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-[#F2B632] hover:bg-[#F2B632] hover:text-[#073B4C]"
              >
                <FaInstagram size={17} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:border-[#F2B632] hover:bg-[#F2B632] hover:text-[#073B4C]"
              >
                <FaXTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Explore
            </h3>

            <div className="mt-2 h-0.5 w-10 rounded-full bg-[#F2B632]" />

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-[#F2B632]"
                  >
                    <span>{link.name}</span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Participate */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Participate
            </h3>

            <div className="mt-2 h-0.5 w-10 rounded-full bg-[#F2B632]" />

            <ul className="mt-6 space-y-3">
              {participationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-[#F2B632]"
                  >
                    <span>{link.name}</span>

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Get In Touch
            </h3>

            <div className="mt-2 h-0.5 w-10 rounded-full bg-[#F2B632]" />

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#F2B632]">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                    Location
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Meru, Kenya
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    P.O. Box 972–60200
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#F2B632]">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                    Email
                  </p>

                  <a
                    href="mailto:info@igatikenya.org"
                    className="mt-1 block break-all text-sm text-white/70 transition-colors hover:text-[#F2B632]"
                  >
                    info@igatikenya.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#F2B632]">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                    Phone
                  </p>

                  <a
                    href="tel:+254724133852"
                    className="mt-1 block text-sm text-white/70 transition-colors hover:text-[#F2B632]"
                  >
                    +254 724 133 852
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Entry */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2B632]">
                Explore the Ecosystem
              </p>

              <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                One Ecosystem. Many Pathways. Shared Impact.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                Enter the MUST–IGATI Community Ecosystem and discover how
                research, innovation, enterprise, markets, investment and
                community impact connect.
              </p>
            </div>

            <div className="lg:text-right">
              <Link
                to="/ecosystem"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-5 py-3 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0a521]"
              >
                Enter the Ecosystem
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* MUST RICE */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2B632]">
                Incubated By
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Meru University of Science and Technology — MUST RICE
              </p>
            </div>

            <p className="max-w-lg text-xs leading-6 text-white/50 sm:text-right">
              Research, Innovation, Commercialization & Extension
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="space-y-1">
            <p className="text-xs text-white/50">
              © {currentYear} IGATI Global Mission Network. All rights reserved.
            </p>

            <p className="text-xs text-white/40">
              Developed by{" "}
              <a
                href="https://gurucrafts.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F2B632] transition-colors hover:text-white"
              >
                GuruCrafts Agency
              </a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-5 text-xs text-white/50 sm:justify-end">
            <a
              href="#privacy"
              className="transition-colors hover:text-[#F2B632]"
            >
              Privacy Policy
            </a>

            <a
              href="#terms"
              className="transition-colors hover:text-[#F2B632]"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;