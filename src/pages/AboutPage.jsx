import {
  ArrowRight,
  Building2,
  ExternalLink,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Lightbulb,
  Network,
  Rocket,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

const AboutPage = () => {
  const institutions = [
    {
      name: "IGATI Global Mission Network",
      description:
        "The umbrella network connecting people, institutions, programmes, enterprises and opportunities.",
      icon: Network,

      // Confirmed IGATI website
      website: "https://www.igatikenya.org",
    },
    {
      name: "IGATI Creatives and Innovators NGO",
      description:
        "Our community development and social innovation platform working with communities and partners to create practical solutions and sustainable impact.",
      icon: HeartHandshake,

      // Replace with official website
      website: "#",
    },
    {
      name: "IGATI Creative & Innovative Ventures",
      description:
        "Our enterprise and commercialization platform developing innovative products, services, businesses and investment opportunities.",
      icon: Rocket,

      // Replace with official website
      website: "#",
    },
    {
      name: "IGATI School of Social Entrepreneurship",
      description:
        "Our learning and enterprise-development platform equipping students, youth, communities and aspiring entrepreneurs with practical entrepreneurial skills.",
      icon: GraduationCap,

      // Replace with official website
      website: "#",
    },
    {
      name: "MUST–RICE Incubation",
      description:
        "Our university-community research, innovation, incubation, commercialization and extension pathway connecting knowledge with real-world challenges and opportunities.",
      icon: Lightbulb,

      // Meru University website
      website: "https://www.must.ac.ke",
    },
    {
      name: "IGATI Global Mission Foundation",
      description:
        "Our resource mobilization and impact financing platform connecting philanthropy, corporate partnerships, development resources and investment with transformative programmes.",
      icon: HandCoins,

      // Replace with official website
      website: "#",
    },
  ];

  const ecosystemImpact = [
    "People discover opportunities.",
    "Ideas become innovations.",
    "Innovations become enterprises.",
    "Enterprises create livelihoods.",
    "Research reaches communities.",
    "Communities create solutions.",
    "Partnerships accelerate impact.",
  ];

  const isExternalWebsite = (website) => {
    return website && website !== "#";
  };

  return (
    <div className="bg-white">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#073B4C]">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6C994E]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-48 right-0 h-[500px] w-[500px] rounded-full bg-[#F2B632]/10 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
              <Sparkles size={14} className="text-[#F2B632]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                About IGATI
              </span>
            </div>

            {/* Exact client heading */}
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              One Mission.
              <span className="block text-[#F2B632]">
                One Connected Ecosystem.
              </span>
              <span className="block text-[#9BC36B]">
                Many Pathways to Impact.
              </span>
            </h1>

            {/* Exact client paragraph */}
            <p className="mt-7 max-w-4xl text-base leading-8 text-white/70 sm:text-lg">
              <strong className="font-semibold text-white">
                IGATI Global Mission Network
              </strong>{" "}
              is a growing ecosystem connecting communities, students,
              researchers, innovators, entrepreneurs, enterprises,
              institutions, government, industry, investors and development
              partners around practical solutions for social and economic
              transformation.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/ecosystem"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
              >
                Explore the Ecosystem

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/join"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.1]"
              >
                Join the Network

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#6C994E] via-[#F2B632] to-[#6C994E]" />
      </section>

      {/* =========================================================
          ABOUT CONTENT
      ========================================================== */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#6C994E]/[0.06] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            {/* Left heading */}
            <div>
              <div className="sticky top-36">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#073B4C] text-[#F2B632]">
                  <Network size={22} />
                </div>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C994E]">
                  About IGATI
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-[#073B4C] sm:text-4xl">
                  One Mission.
                  <span className="block text-[#6C994E]">
                    One Connected Ecosystem.
                  </span>
                  <span className="block">Many Pathways to Impact.</span>
                </h2>
              </div>
            </div>

            {/* Exact approved copy */}
            <div>
              <p className="text-base leading-8 text-gray-600 sm:text-lg">
                <strong className="font-semibold text-[#073B4C]">
                  IGATI Global Mission Network
                </strong>{" "}
                is a growing ecosystem connecting communities, students,
                researchers, innovators, entrepreneurs, enterprises,
                institutions, government, industry, investors and development
                partners around practical solutions for social and economic
                transformation.
              </p>

              <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
                IGATI brings together complementary institutional platforms for{" "}
                <em className="font-medium text-[#073B4C]">
                  community development, social innovation, entrepreneurship,
                  education, research, incubation, commercialization,
                  enterprise development and resource mobilization.
                </em>
              </p>

              <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
                Our work moves ideas from{" "}
                <em className="font-medium text-[#073B4C]">
                  challenge to solution, solution to innovation, innovation to
                  enterprise, enterprise to market, and market to sustainable
                  community impact.
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INSTITUTIONAL ECOSYSTEM
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#F8FAF7] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/15 bg-white px-4 py-2 shadow-sm">
              <Building2 size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A]">
                Institutional Ecosystem
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Explore Our Institutional Ecosystem
            </h2>
          </div>

          {/* Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {institutions.map((institution) => {
              const Icon = institution.icon;
              const hasWebsite = isExternalWebsite(institution.website);

              return (
                <article
                  key={institution.name}
                  className="group flex h-full flex-col rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-xl hover:shadow-[#073B4C]/[0.06] sm:p-7"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-all duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    {hasWebsite && (
                      <a
                        href={institution.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${institution.name} website`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 text-gray-400 transition-all duration-300 hover:border-[#6C994E]/30 hover:bg-[#F2F7EE] hover:text-[#6C994E]"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>

                  {/* Name */}
                  {hasWebsite ? (
                    <a
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title mt-6 inline-flex items-start gap-2"
                    >
                      <h3 className="text-lg font-bold leading-6 text-[#073B4C] transition-colors group-hover/title:text-[#6C994E]">
                        {institution.name}
                      </h3>

                      <ExternalLink
                        size={13}
                        className="mt-1 shrink-0 text-[#D99A16]"
                      />
                    </a>
                  ) : (
                    <h3 className="mt-6 text-lg font-bold leading-6 text-[#073B4C]">
                      {institution.name}
                    </h3>
                  )}

                  {/* Exact description */}
                  <p className="mt-4 flex-1 text-sm leading-7 text-gray-500">
                    {institution.description}
                  </p>

                  {/* Website link */}
                  {hasWebsite ? (
                    <a
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link mt-6 inline-flex w-fit items-center gap-2 text-xs font-bold text-[#6C994E]"
                    >
                      Visit Website

                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </a>
                  ) : (
                    <span className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-gray-300">
                      Website link coming soon
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          TOGETHER WE BUILD
      ========================================================== */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            {/* Heading */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C994E]">
                Together
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#073B4C] sm:text-4xl">
                Together, We Build
                <span className="block text-[#6C994E]">
                  an Ecosystem Where:
                </span>
              </h2>
            </div>

            {/* Approved statements */}
            <div className="grid gap-3 sm:grid-cols-2">
              {ecosystemImpact.map((statement, index) => (
                <div
                  key={statement}
                  className={`group flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                    index === ecosystemImpact.length - 1
                      ? "border-[#F2B632]/30 bg-[#FFF9EC] sm:col-span-2"
                      : "border-gray-100 bg-[#F8FAF7]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      index === ecosystemImpact.length - 1
                        ? "bg-[#F2B632] text-[#073B4C]"
                        : "bg-[#6C994E] text-white"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <strong className="text-sm leading-6 text-[#073B4C] sm:text-base">
                    {statement}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-[#073B4C] px-6 py-12 text-center text-white sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#F2B632]/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <Network size={28} className="mx-auto text-[#F2B632]" />

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F2B632]">
                IGATI Global Mission Network
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/ecosystem"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
                >
                  Explore the Ecosystem

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/join"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#6C994E] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5f8845]"
                >
                  Join the Network

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/join"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.1]"
                >
                  Partner With IGATI

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;