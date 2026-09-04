import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Lightbulb,
  Network,
  Rocket,
} from "lucide-react";

import { Link } from "react-router-dom";

const InstitutionalEcosystem = () => {
  const institutions = [
    {
      number: "01",
      icon: Network,
      title: "IGATI Global Mission Network",
      shortTitle: "Global Mission Network",
      description:
        "The umbrella network connecting people, institutions, programmes, enterprises and opportunities.",
      label: "Umbrella Network",
      featured: true,
    },
    {
      number: "02",
      icon: HeartHandshake,
      title: "IGATI Creatives and Innovators NGO",
      shortTitle: "Community & Social Innovation",
      description:
        "The community development and social innovation platform connecting communities to practical pathways for transformation.",
      label: "Community Platform",
    },
    {
      number: "03",
      icon: Rocket,
      title: "IGATI Creative & Innovative Ventures",
      shortTitle: "Enterprise & Commercialization",
      description:
        "The enterprise and commercialization platform supporting innovations, products and ventures toward sustainable markets.",
      label: "Enterprise Platform",
    },
    {
      number: "04",
      icon: GraduationCap,
      title: "IGATI School of Social Entrepreneurship",
      shortTitle: "Learning & Enterprise Development",
      description:
        "The learning and enterprise-development platform supporting entrepreneurship, skills and social enterprise development.",
      label: "Learning Platform",
    },
    {
      number: "05",
      icon: Building2,
      title: "MUST–RICE Incubation",
      shortTitle: "Research & Innovation",
      description:
        "The university–community pathway connecting research, innovation, incubation, commercialization and extension.",
      label: "University Pathway",
      must: true,
    },
    {
      number: "06",
      icon: HandCoins,
      title: "IGATI Global Mission Foundation",
      shortTitle: "Impact Financing",
      description:
        "The resource mobilization and impact financing platform supporting programmes, partnerships and sustainable community impact.",
      label: "Resource Platform",
    },
  ];

  return (
    <section
      id="institutional-ecosystem"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#6C994E]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-[#F2B632]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-[#F4F8F0] px-4 py-2">
              <Network size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                Institutional Ecosystem
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              One Network.
              <span className="block text-[#6C994E]">
                Complementary Platforms.
              </span>
            </h2>
          </div>

          <div className="lg:pb-1">
            <p className="max-w-2xl text-base leading-8 text-gray-600 lg:ml-auto lg:text-lg">
              IGATI brings together complementary institutional platforms for
              community development, social innovation, entrepreneurship,
              education, research, incubation, commercialization, enterprise
              development and resource mobilization.
            </p>
          </div>
        </div>

        {/* Umbrella visual */}
        <div className="mt-14">
          <div className="relative overflow-hidden rounded-[28px] bg-[#073B4C] px-6 py-8 text-white shadow-xl shadow-[#073B4C]/10 sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6C994E]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-[#F2B632]/10 blur-3xl" />

            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C] shadow-lg">
                  <Network size={29} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                      Umbrella Network
                    </p>

                    <span className="h-1 w-1 rounded-full bg-white/30" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                      Connecting the Ecosystem
                    </p>
                  </div>

                  <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                    IGATI Global Mission Network
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                    Connecting people, institutions, programmes, enterprises
                    and opportunities through one shared mission for social and
                    economic transformation.
                  </p>
                </div>
              </div>

              <Link
                to="/ecosystem"
                className="group inline-flex w-fit items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#F2B632]/40 hover:bg-white/[0.1]"
              >
                Explore the Network

                <ArrowRight
                  size={16}
                  className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Visual connector */}
          <div className="mx-auto hidden h-10 w-px bg-gradient-to-b from-[#073B4C]/30 to-[#6C994E]/20 sm:block" />

          <div className="relative hidden sm:block">
            <div className="absolute left-[10%] right-[10%] top-0 h-px bg-gradient-to-r from-transparent via-[#6C994E]/30 to-transparent" />
          </div>
        </div>

        {/* Institutional cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {institutions.slice(1).map((institution) => {
            const Icon = institution.icon;

            return (
              <div
                key={institution.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:shadow-xl hover:shadow-[#073B4C]/[0.06]"
              >
                {/* Number */}
                <span className="absolute right-4 top-3 text-3xl font-black text-[#073B4C]/[0.035]">
                  {institution.number}
                </span>

                {/* Icon */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
                    institution.must
                      ? "bg-[#F2B632]/15 text-[#D99A16]"
                      : "bg-[#6C994E]/10 text-[#6C994E]"
                  } group-hover:scale-105`}
                >
                  <Icon size={20} />
                </div>

                <p
                  className={`mt-5 text-[9px] font-bold uppercase tracking-[0.14em] ${
                    institution.must
                      ? "text-[#D99A16]"
                      : "text-[#6C994E]"
                  }`}
                >
                  {institution.label}
                </p>

                <h3 className="mt-2 text-base font-bold leading-6 text-[#073B4C]">
                  {institution.title}
                </h3>

                <p className="mt-3 flex-1 text-xs leading-6 text-gray-500">
                  {institution.description}
                </p>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-[11px] font-semibold leading-5 text-[#073B4C]/70">
                    {institution.shortTitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* How they connect */}
        <div className="mt-16 overflow-hidden rounded-[28px] border border-[#073B4C]/10 bg-[#F8FAF7]">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left */}
            <div className="bg-[#F3F7EF] p-6 sm:p-8 lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#073B4C] text-white">
                <Lightbulb size={20} />
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                How They Connect
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#073B4C] sm:text-3xl">
                Different roles.
                <span className="block text-[#6C994E]">
                  One shared pathway.
                </span>
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                Each platform contributes a distinct capability while
                remaining connected to the wider IGATI mission.
              </p>
            </div>

            {/* Right */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <BookOpen size={20} className="text-[#6C994E]" />

                  <h4 className="mt-4 text-sm font-bold text-[#073B4C]">
                    Knowledge & Learning
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    Research, education, skills, innovation and practical
                    knowledge connect people with solutions.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <Rocket size={20} className="text-[#6C994E]" />

                  <h4 className="mt-4 text-sm font-bold text-[#073B4C]">
                    Enterprise & Markets
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    Innovations and community solutions move toward enterprise,
                    commercialization and sustainable markets.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <HeartHandshake size={20} className="text-[#6C994E]" />

                  <h4 className="mt-4 text-sm font-bold text-[#073B4C]">
                    Community & Partnership
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    Communities and partners work together to identify needs,
                    mobilize action and expand impact.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <HandCoins size={20} className="text-[#D99A16]" />

                  <h4 className="mt-4 text-sm font-bold text-[#073B4C]">
                    Resources & Scale
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-gray-500">
                    Resource mobilization and impact financing help promising
                    programmes and enterprises grow sustainably.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MUST + IGATI relationship */}
        <div className="mt-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D99A16]">
              University–Community Collaboration
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#073B4C] sm:text-3xl">
              MUST + IGATI
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600">
              University research and innovation connect with communities,
              entrepreneurship and enterprise through the MUST–IGATI Community
              Ecosystem.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            {/* MUST */}
            <div className="rounded-2xl border border-[#F2B632]/20 bg-[#FFF9EC] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
                <GraduationCap size={21} />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#D99A16]">
                MUST
              </p>

              <h4 className="mt-2 text-lg font-bold text-[#073B4C]">
                Research • Innovation
              </h4>

              <p className="mt-3 text-xs leading-6 text-gray-600">
                Research, innovation, students, academics and
                commercialization support.
              </p>
            </div>

            {/* Connector */}
            <div className="flex items-center justify-center py-2 md:py-0">
              <div className="flex h-11 w-11 rotate-90 items-center justify-center rounded-full bg-[#073B4C] text-white shadow-lg md:rotate-0">
                <ArrowRight size={18} />
              </div>
            </div>

            {/* IGATI */}
            <div className="rounded-2xl border border-[#6C994E]/20 bg-[#F4F8F0] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E] text-white">
                <Network size={21} />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#6C994E]">
                IGATI
              </p>

              <h4 className="mt-2 text-lg font-bold text-[#073B4C]">
                Community • Enterprise
              </h4>

              <p className="mt-3 text-xs leading-6 text-gray-600">
                Communities, entrepreneurship, enterprises, partnerships and
                social transformation.
              </p>
            </div>
          </div>

          {/* Shared result */}
          <div className="mx-auto mt-4 max-w-4xl">
            <Link
              to="/ecosystem"
              className="group flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#073B4C] px-6 py-5 text-white transition-all duration-300 hover:bg-[#07505E] sm:flex-row sm:items-center"
            >
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                  Shared Ecosystem
                </p>

                <p className="mt-1 text-base font-bold">
                  MUST–IGATI Community Ecosystem
                </p>

                <p className="mt-1 text-xs leading-5 text-white/55">
                  Where university knowledge and community action connect.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
                Experience the Ecosystem

                <ArrowRight
                  size={16}
                  className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-16 border-t border-gray-100 pt-9 text-center">
          <p className="mx-auto max-w-3xl text-base font-medium leading-8 text-[#073B4C]">
            Together, these platforms create pathways where{" "}
            <span className="font-bold text-[#6C994E]">
              research reaches communities, innovations become enterprises,
              enterprises create livelihoods, and partnerships accelerate
              impact.
            </span>
          </p>

          <Link
            to="/ecosystem"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
          >
            Discover How the Ecosystem Works

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalEcosystem;