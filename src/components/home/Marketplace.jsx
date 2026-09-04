import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  Lightbulb,
  Package,
  ShoppingBag,
  Store,
  Wrench,
} from "lucide-react";

import { Link } from "react-router-dom";

const Marketplace = () => {
  const categories = [
    {
      title: "Products",
      description:
        "Discover value-added community products, branded goods and locally developed solutions.",
      icon: Package,
      path: "/marketplace?category=products",
    },
    {
      title: "Services",
      description:
        "Explore professional, community-based and enterprise services available through the ecosystem.",
      icon: Wrench,
      path: "/marketplace?category=services",
    },
    {
      title: "Innovations",
      description:
        "Find practical innovations, technologies and solutions developed across the IGATI ecosystem.",
      icon: Lightbulb,
      path: "/marketplace?category=innovations",
    },
    {
      title: "Consultancy",
      description:
        "Connect with experts, researchers, professionals and institutions offering specialized support.",
      icon: BriefcaseBusiness,
      path: "/marketplace?category=consultancy",
    },
    {
      title: "Training",
      description:
        "Access entrepreneurship, technical, research and community-development training opportunities.",
      icon: GraduationCap,
      path: "/marketplace?category=training",
    },
    {
      title: "Community Enterprises",
      description:
        "Explore enterprises and products emerging from communities, projects and social enterprise pathways.",
      icon: Store,
      path: "/marketplace?category=community-enterprises",
    },
  ];

  const featuredListings = [
    {
      title: "Community Value-Added Products",
      enterprise: "IGATI Ecosystem Enterprises",
      location: "Meru County, Kenya",
      description:
        "Explore products developed through community value addition, branding and enterprise-development pathways.",
      tag: "Products",
      icon: Package,
    },
    {
      title: "Research & Innovation Services",
      enterprise: "MUST–IGATI Ecosystem",
      location: "Meru, Kenya",
      description:
        "Connect with research, innovation, technical support and commercialization-oriented services.",
      tag: "Innovation",
      icon: Lightbulb,
    },
    {
      title: "Entrepreneurship & Skills Training",
      enterprise: "IGATI School of Social Entrepreneurship",
      location: "Meru, Kenya",
      description:
        "Access learning and capacity-building opportunities designed to support entrepreneurship and enterprise growth.",
      tag: "Training",
      icon: BookOpen,
    },
  ];

  return (
    <section
      id="marketplace"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#F2B632]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-[#F4F8F0] px-4 py-2">
              <ShoppingBag size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                IGATI Marketplace
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              From enterprise
              <span className="block text-[#6C994E]">
                to market opportunity.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-8 text-gray-600 lg:ml-auto lg:text-lg">
              Discover products, services, innovations, training and community
              enterprises emerging from the IGATI ecosystem and connect
              directly with the people and organizations behind them.
            </p>
          </div>
        </div>

        {/* Marketplace feature panel */}
        <div className="mt-14 overflow-hidden rounded-[30px] bg-[#073B4C] text-white shadow-xl shadow-[#073B4C]/10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left */}
            <div className="relative p-7 sm:p-9 lg:p-11">
              <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-[#F2B632]/10 blur-3xl" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                  Market Access
                </p>

                <h3 className="mt-4 max-w-xl text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Connecting community enterprise,
                  <span className="block text-[#9BC36B]">
                    innovation and markets.
                  </span>
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                  The marketplace gives enterprises, innovators, trainers and
                  service providers a place to showcase what they offer while
                  helping buyers, partners and institutions discover practical
                  opportunities within the ecosystem.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/marketplace"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
                  >
                    Explore Marketplace

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/join"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.09]"
                  >
                    List With IGATI
                  </Link>
                </div>
              </div>
            </div>

            {/* Right process visual */}
            <div className="relative flex items-center justify-center bg-[#062F3D] p-7 sm:p-9 lg:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />

              <div className="relative w-full max-w-sm">
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                  From Creation to Market
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Create",
                    "Develop",
                    "Value Add",
                    "Brand",
                    "Showcase",
                    "Connect to Market",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          index === 0
                            ? "bg-[#F2B632] text-[#073B4C]"
                            : index === 5
                            ? "bg-[#6C994E] text-white"
                            : "bg-white/10 text-white/65"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                        <p className="text-xs font-semibold text-white/75">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Browse by Category
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#073B4C] sm:text-3xl">
                Explore what the ecosystem offers.
              </h3>
            </div>

            <Link
              to="/marketplace"
              className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
            >
              View Full Marketplace

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  to={category.path}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-[#FCFDFB] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:bg-white hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-all duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <ArrowRight
                      size={16}
                      className="text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F2B632]"
                    />
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-[#073B4C]">
                    {category.title}
                  </h4>

                  <p className="mt-3 flex-1 text-xs leading-6 text-gray-500">
                    {category.description}
                  </p>

                  <p className="mt-5 border-t border-gray-100 pt-4 text-xs font-bold text-[#073B4C]">
                    Browse Category
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured listings */}
        <div className="mt-16">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D99A16]">
              Marketplace Preview
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#073B4C] sm:text-3xl">
              Featured ecosystem offerings.
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
              A preview of the kinds of products, services and opportunities
              that can be showcased through the IGATI Marketplace.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredListings.map((listing) => {
              const Icon = listing.icon;

              return (
                <div
                  key={listing.title}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
                >
                  {/* Placeholder visual */}
                  <div className="flex h-44 items-center justify-center bg-[#F2F7EE]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#6C994E] shadow-sm">
                      <Icon size={28} />
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="inline-flex rounded-full bg-[#F4F8F0] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#6C994E]">
                      {listing.tag}
                    </span>

                    <h4 className="mt-4 text-lg font-bold leading-6 text-[#073B4C]">
                      {listing.title}
                    </h4>

                    <p className="mt-3 text-xs leading-6 text-gray-500">
                      {listing.description}
                    </p>

                    <div className="mt-5 space-y-1 border-t border-gray-100 pt-4">
                      <p className="text-xs font-semibold text-[#073B4C]">
                        {listing.enterprise}
                      </p>

                      <p className="text-[11px] text-gray-400">
                        {listing.location}
                      </p>
                    </div>

                    <Link
                      to="/marketplace"
                      className="group mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
                    >
                      View Listing

                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 overflow-hidden rounded-[26px] border border-[#F2B632]/20 bg-[#FFF9EC]">
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
                <Handshake size={21} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D99A16]">
                  Market Connection
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#073B4C] sm:text-2xl">
                  Have a product, service or innovation?
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
                  Join the network and connect your enterprise or solution with
                  customers, partners, institutions and wider market
                  opportunities.
                </p>
              </div>
            </div>

            <Link
              to="/join"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E]"
            >
              Join the Marketplace

              <ArrowRight
                size={16}
                className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;