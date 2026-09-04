import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  Lightbulb,
  Megaphone,
  Microscope,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

const Opportunities = () => {
  const opportunities = [
    {
      title: "Funding Opportunities",
      category: "Finance & Growth",
      description:
        "Discover grants, funding calls, impact-financing opportunities and resources that can support projects, enterprises and community initiatives.",
      icon: BadgeDollarSign,
      path: "/opportunities?type=funding",
    },
    {
      title: "Partnership Opportunities",
      category: "Collaboration",
      description:
        "Connect with institutions, corporates, development partners, communities and ecosystem actors seeking strategic collaboration.",
      icon: Handshake,
      path: "/opportunities?type=partnerships",
    },
    {
      title: "Innovation Challenges",
      category: "Innovation",
      description:
        "Participate in challenges that connect real community problems with researchers, students, innovators and solution builders.",
      icon: Lightbulb,
      path: "/opportunities?type=innovation",
    },
    {
      title: "Research Collaboration",
      category: "Research",
      description:
        "Explore living laboratories, community research needs, collaborative studies and research-to-impact opportunities.",
      icon: Microscope,
      path: "/opportunities?type=research",
    },
    {
      title: "Training & Mentorship",
      category: "Skills Development",
      description:
        "Access learning, mentorship, enterprise-development programmes and capacity-building opportunities across the ecosystem.",
      icon: GraduationCap,
      path: "/opportunities?type=training",
    },
    {
      title: "Market Access",
      category: "Enterprise & Markets",
      description:
        "Connect enterprises, community products, innovations and services with customers, institutions and wider market opportunities.",
      icon: ShoppingBag,
      path: "/opportunities?type=market",
    },
  ];

  return (
    <section
      id="opportunities"
      className="relative overflow-hidden bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F2B632]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-white px-4 py-2">
              <Megaphone size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                Opportunities
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              Discover opportunities.
              <span className="block text-[#6C994E]">
                Turn potential into action.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 lg:text-lg">
              Explore opportunities to learn, research, innovate, partner,
              access markets, mobilize resources and grow enterprises across
              the IGATI ecosystem.
            </p>
          </div>

          <Link
            to="/opportunities"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
          >
            View All Opportunities

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Featured opportunity banner */}
        <div className="mt-14 overflow-hidden rounded-[30px] bg-[#073B4C] text-white shadow-xl shadow-[#073B4C]/10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left */}
            <div className="relative p-7 sm:p-9 lg:p-11">
              <div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />

              <div className="relative">
                <span className="inline-flex rounded-full bg-[#F2B632] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#073B4C]">
                  Ecosystem Opportunities
                </span>

                <h3 className="mt-6 max-w-xl text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Find the opportunity that moves
                  <span className="block text-[#9BC36B]">
                    your idea, project or enterprise forward.
                  </span>
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                  IGATI brings together opportunities from communities,
                  institutions, researchers, partners, enterprises, investors
                  and development actors so people can move from interest to
                  participation and impact.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/opportunities"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
                  >
                    Explore Opportunities

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/join"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.09]"
                  >
                    Join the Network
                  </Link>
                </div>
              </div>
            </div>

            {/* Right */}
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
                  Opportunity Pathways
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Discover",
                    "Connect",
                    "Apply",
                    "Collaborate",
                    "Build",
                    "Grow",
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

                      <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.05] px-4 py-3">
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

        {/* Opportunity cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opportunity) => {
            const Icon = opportunity.icon;

            return (
              <Link
                key={opportunity.title}
                to={opportunity.path}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
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

                <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
                  {opportunity.category}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-6 text-[#073B4C]">
                  {opportunity.title}
                </h3>

                <p className="mt-3 flex-1 text-xs leading-6 text-gray-500">
                  {opportunity.description}
                </p>

                <p className="mt-5 border-t border-gray-100 pt-4 text-xs font-bold text-[#073B4C]">
                  Explore Opportunity
                </p>
              </Link>
            );
          })}
        </div>

        {/* Bottom action area */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* For opportunity seekers */}
          <div className="rounded-[24px] border border-[#6C994E]/15 bg-white p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E]">
              <BriefcaseBusiness size={20} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6C994E]">
              Looking for an Opportunity?
            </p>

            <h3 className="mt-2 text-xl font-bold text-[#073B4C]">
              Find pathways that match your goals.
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              Browse opportunities for funding, research, innovation,
              enterprise development, partnerships, training and markets.
            </p>

            <Link
              to="/opportunities"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
            >
              Browse Opportunities

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* For partners */}
          <div className="rounded-[24px] border border-[#F2B632]/20 bg-[#FFF9EC] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
              <Handshake size={20} />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D99A16]">
              Have an Opportunity to Share?
            </p>

            <h3 className="mt-2 text-xl font-bold text-[#073B4C]">
              Connect your opportunity with the ecosystem.
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              Institutions, corporates, development partners, investors and
              other ecosystem actors can collaborate with IGATI to connect
              opportunities with relevant people and communities.
            </p>

            <Link
              to="/join"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#073B4C] transition-colors hover:text-[#D99A16]"
            >
              Partner With IGATI

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;