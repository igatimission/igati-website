import {
  ArrowRight,
  Beaker,
  Building2,
  GraduationCap,
  MapPin,
  PackageCheck,
  Sprout,
  Wheat,
} from "lucide-react";

import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "Smart Agricultural Clusters",
      category: "Agriculture & Community Enterprise",
      description:
        "Connecting farmers, producer groups, research, production, value addition, branding, markets and investment through coordinated agricultural value chains.",
      icon: Wheat,
      path: "/projects/smart-agricultural-clusters",
    },
    {
      title: "Value Addition & Commercialization",
      category: "Enterprise Development",
      description:
        "Supporting community resources and innovations through product development, compliance, branding, market access and enterprise scaling.",
      icon: PackageCheck,
      path: "/projects/value-addition-commercialization",
    },
    {
      title: "Community Branding",
      category: "Markets & Identity",
      description:
        "Helping community enterprises transform products into recognizable brands that connect producers with consumers and sustainable markets.",
      icon: Building2,
      path: "/projects/community-branding",
    },
    {
      title: "Social Enterprise Labs",
      category: "Skills & Entrepreneurship",
      description:
        "Creating pathways from skills and mentorship to enterprise, employment, income, independence and leadership.",
      icon: GraduationCap,
      path: "/projects/social-enterprise-labs",
    },
  ];

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#6C994E]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F2B632]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-white px-4 py-2">
              <Sprout size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                Featured Projects
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              Living projects.
              <span className="block text-[#6C994E]">
                Practical pathways to impact.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600 lg:text-lg">
              IGATI projects connect community challenges with research,
              innovation, training, enterprise development, markets and
              investment to create sustainable social and economic impact.
            </p>
          </div>

          <Link
            to="/projects"
            className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
          >
            View All Projects

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Flagship project */}
        <div className="mt-14 overflow-hidden rounded-[30px] bg-[#073B4C] text-white shadow-2xl shadow-[#073B4C]/10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left */}
            <div className="relative overflow-hidden p-7 sm:p-9 lg:p-12">
              <div className="pointer-events-none absolute -left-20 -top-16 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[#F2B632]/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#F2B632] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#073B4C]">
                    Flagship Programme
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/45">
                    2026–2036
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] text-[#F2B632]">
                    <Beaker size={25} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#9BC36B]">
                      Meru County Apiculture Community Programme
                    </p>

                    <h3 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
                      One Million Productive Bee Hives
                    </h3>
                  </div>
                </div>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                  A flagship living-laboratory programme connecting farmers,
                  community apiaries, training, research, innovation, value
                  addition, markets, enterprise and investment through one
                  integrated apiculture ecosystem.
                </p>

                {/* Journey */}
                <div className="mt-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Programme Journey
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "Recruit",
                      "Train",
                      "Establish",
                      "Manage",
                      "Harvest",
                      "Aggregate",
                      "Process",
                      "Brand",
                      "Market",
                      "Scale",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-2"
                      >
                        <span
                          className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                            index === 0
                              ? "bg-[#F2B632] text-[#073B4C]"
                              : index === 9
                              ? "bg-[#6C994E] text-white"
                              : "border border-white/10 bg-white/[0.05] text-white/65"
                          }`}
                        >
                          {item}
                        </span>

                        {index < 9 && (
                          <ArrowRight
                            size={11}
                            className="hidden text-white/20 sm:block"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/projects/one-million-productive-bee-hives"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
                  >
                    Explore Project

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/join"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.09]"
                  >
                    Become a Bee Farmer
                  </Link>

                  <Link
                    to="/join"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-[#F2B632]/40 hover:text-white"
                  >
                    Partner / Invest
                  </Link>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative flex min-h-[420px] items-center justify-center bg-[#062F3D] p-7 sm:p-9 lg:min-h-full lg:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />
              </div>

              <div className="relative w-full max-w-sm">
                {/* Location */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2B632]/15 text-[#F2B632]">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/35">
                      Living Laboratory
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      Meru County, Kenya
                    </p>
                  </div>
                </div>

                {/* Ecosystem map */}
                <div className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                    Connected Apiculture Ecosystem
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      "Farmers & Community Apiaries",
                      "Training & Research",
                      "Innovation & Production",
                      "Processing & Value Addition",
                      "Branding & Market Access",
                      "Enterprise & Investment",
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                            index === 0
                              ? "bg-[#F2B632] text-[#073B4C]"
                              : index === 5
                              ? "bg-[#6C994E] text-white"
                              : "bg-white/10 text-white/70"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div className="flex-1 rounded-xl bg-white/[0.05] px-4 py-3">
                          <p className="text-xs font-semibold text-white/75">
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-5 text-center text-[10px] leading-5 text-white/35">
                  From community participation to sustainable enterprise and
                  measurable impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <Link
                key={project.title}
                to={project.path}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-colors group-hover:bg-[#6C994E] group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F2B632]"
                  />
                </div>

                <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
                  {project.category}
                </p>

                <h3 className="mt-2 text-lg font-bold leading-6 text-[#073B4C]">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-xs leading-6 text-gray-500">
                  {project.description}
                </p>

                <p className="mt-5 border-t border-gray-100 pt-4 text-xs font-bold text-[#073B4C]">
                  Explore Project
                </p>
              </Link>
            );
          })}
        </div>

        {/* Ecosystem CTA */}
        <div className="mt-14 flex flex-col gap-6 rounded-[26px] border border-[#6C994E]/15 bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#6C994E]">
              See How Everything Connects
            </p>

            <h3 className="mt-2 text-xl font-bold text-[#073B4C] sm:text-2xl">
              Projects are pathways inside a larger living ecosystem.
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
              Explore how community participation, research, innovation,
              entrepreneurship, enterprise, markets and investment connect
              across the MUST–IGATI Community Ecosystem.
            </p>
          </div>

          <Link
            to="/ecosystem"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E]"
          >
            Enter the Ecosystem

            <ArrowRight
              size={16}
              className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;