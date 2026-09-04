import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Lightbulb,
  Network,
  Rocket,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const AboutPage = () => {
  const institutions = [
    {
      number: "01",
      name: "IGATI Global Mission Network",
      label: "Umbrella Network",
      description:
        "The umbrella network connecting people, institutions, programmes, enterprises and opportunities.",
      icon: Network,
      featured: true,
    },
    {
      number: "02",
      name: "IGATI Creatives and Innovators NGO",
      label: "Community & Social Innovation",
      description:
        "Our community development and social innovation platform working with communities and partners to create practical solutions and sustainable impact.",
      icon: HeartHandshake,
    },
    {
      number: "03",
      name: "IGATI Creative & Innovative Ventures",
      label: "Enterprise & Commercialization",
      description:
        "Our enterprise and commercialization platform developing innovative products, services, businesses and investment opportunities.",
      icon: Rocket,
    },
    {
      number: "04",
      name: "IGATI School of Social Entrepreneurship",
      label: "Learning & Enterprise Development",
      description:
        "Our learning and enterprise-development platform equipping students, youth, communities and aspiring entrepreneurs with practical entrepreneurial skills.",
      icon: GraduationCap,
    },
    {
      number: "05",
      name: "MUST–RICE Incubation",
      label: "Research, Innovation & Incubation",
      description:
        "Our university-community research, innovation, incubation, commercialization and extension pathway connecting knowledge with real-world challenges and opportunities.",
      icon: Lightbulb,
    },
    {
      number: "06",
      name: "IGATI Global Mission Foundation",
      label: "Resource Mobilization & Impact Financing",
      description:
        "Our resource mobilization and impact financing platform connecting philanthropy, corporate partnerships, development resources and investment with transformative programmes.",
      icon: HandCoins,
    },
  ];

  const impactStatements = [
    "People discover opportunities.",
    "Ideas become innovations.",
    "Innovations become enterprises.",
    "Enterprises create livelihoods.",
    "Research reaches communities.",
    "Communities create solutions.",
    "Partnerships accelerate impact.",
  ];

  const journey = [
    {
      title: "Challenge",
      description: "Understand real community needs and opportunities.",
    },
    {
      title: "Solution",
      description: "Develop practical responses to identified challenges.",
    },
    {
      title: "Innovation",
      description: "Transform solutions into innovative approaches.",
    },
    {
      title: "Enterprise",
      description: "Build sustainable enterprises around viable solutions.",
    },
    {
      title: "Market",
      description: "Connect products, services and enterprises to markets.",
    },
    {
      title: "Impact",
      description: "Create sustainable social and economic transformation.",
    },
  ];

  return (
    <div className="bg-white">
      {/* ================================================================
          HERO
      ================================================================= */}
      <section className="relative overflow-hidden bg-[#073B4C]">
        {/* Decorative backgrounds */}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
              <Sparkles size={14} className="text-[#F2B632]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 sm:text-xs">
                About IGATI
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              One Mission.
              <span className="block text-[#F2B632]">
                One Connected Ecosystem.
              </span>
              <span className="block text-[#9BC36B]">
                Many Pathways to Impact.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
              IGATI Global Mission Network is a growing ecosystem connecting
              communities, students, researchers, innovators, entrepreneurs,
              enterprises, institutions, government, industry, investors and
              development partners around practical solutions for social and
              economic transformation.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/ecosystem"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
              >
                Explore the Ecosystem
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/join"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.1]"
              >
                Join the Network
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Bottom ecosystem indicators */}
          <div className="mt-14 grid gap-3 border-t border-white/10 pt-7 sm:grid-cols-3 lg:max-w-3xl">
            <div className="flex items-center gap-3">
              <Users size={17} className="text-[#9BC36B]" />
              <span className="text-xs font-semibold text-white/60">
                Community
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen size={17} className="text-[#F2B632]" />
              <span className="text-xs font-semibold text-white/60">
                Knowledge & Innovation
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Building2 size={17} className="text-[#9BC36B]" />
              <span className="text-xs font-semibold text-white/60">
                Enterprise & Impact
              </span>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#6C994E] via-[#F2B632] to-[#6C994E]" />
      </section>

      {/* ================================================================
          WHO WE ARE
      ================================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C994E]">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#073B4C] sm:text-4xl">
              A connected mission
              <span className="block text-[#6C994E]">
                ecosystem for transformation.
              </span>
            </h2>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              IGATI brings together complementary institutional platforms for
              community development, social innovation, entrepreneurship,
              education, research, incubation, commercialization, enterprise
              development and resource mobilization.
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
              Instead of these areas operating independently, the IGATI
              ecosystem connects them so that knowledge, people, ideas,
              enterprises and opportunities can move through a shared pathway
              toward sustainable impact.
            </p>
          </div>

          {/* Mission visual */}
          <div className="rounded-[28px] border border-[#073B4C]/10 bg-[#F8FAF7] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#073B4C] text-[#F2B632]">
                <Network size={22} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6C994E]">
                  Our Approach
                </p>

                <h3 className="mt-1 text-lg font-bold text-[#073B4C]">
                  Connect the entire pathway
                </h3>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Community Development",
                "Social Innovation",
                "Entrepreneurship",
                "Education",
                "Research",
                "Incubation",
                "Commercialization",
                "Enterprise Development",
                "Resource Mobilization",
                "Market Connection",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3"
                >
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-[#6C994E]"
                  />

                  <span className="text-xs font-semibold text-[#073B4C]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FROM CHALLENGE TO IMPACT
      ================================================================= */}
      <section className="bg-[#F8FAF7] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C994E]">
              How Our Work Moves
            </p>

            <h2 className="mt-4 text-3xl font-bold text-[#073B4C] sm:text-4xl">
              From challenge to
              <span className="text-[#6C994E]"> sustainable impact.</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
              Our work moves ideas from challenge to solution, solution to
              innovation, innovation to enterprise, enterprise to market, and
              market to sustainable community impact.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {journey.map((item, index) => (
              <div key={item.title} className="relative">
                <div
                  className={`h-full rounded-2xl border p-5 ${
                    index === journey.length - 1
                      ? "border-[#6C994E]/20 bg-[#6C994E] text-white"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                      index === 0
                        ? "bg-[#F2B632] text-[#073B4C]"
                        : index === journey.length - 1
                        ? "bg-white/15 text-white"
                        : "bg-[#073B4C] text-[#F2B632]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className={`mt-5 text-sm font-bold ${
                      index === journey.length - 1
                        ? "text-white"
                        : "text-[#073B4C]"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-2 text-[11px] leading-5 ${
                      index === journey.length - 1
                        ? "text-white/65"
                        : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {index < journey.length - 1 && (
                  <ArrowRight
                    size={15}
                    className="absolute -right-[10px] top-1/2 z-10 hidden -translate-y-1/2 text-[#F2B632] lg:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          INSTITUTIONAL ECOSYSTEM
      ================================================================= */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F7EE] px-4 py-2">
              <Building2 size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A]">
                Institutional Ecosystem
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Explore Our Institutional Ecosystem
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
              IGATI brings together complementary platforms, each contributing
              a distinct role while remaining connected through one shared
              mission.
            </p>
          </div>

          {/* Umbrella */}
          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-[28px] bg-[#073B4C] p-7 text-white sm:p-9">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6C994E]/20 blur-3xl" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C]">
                  <Network size={28} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#F2B632]">
                    Umbrella Network
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    IGATI Global Mission Network
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                    The umbrella network connecting people, institutions,
                    programmes, enterprises and opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* Connector */}
            <div className="mx-auto h-10 w-px bg-[#6C994E]/30" />
          </div>

          {/* Institution cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {institutions.slice(1).map((institution) => {
              const Icon = institution.icon;

              return (
                <div
                  key={institution.name}
                  className="group rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-colors group-hover:bg-[#6C994E] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-bold text-gray-300">
                      {institution.number}
                    </span>
                  </div>

                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
                    {institution.label}
                  </p>

                  <h3 className="mt-2 text-lg font-bold leading-6 text-[#073B4C]">
                    {institution.name}
                  </h3>

                  <p className="mt-4 text-xs leading-6 text-gray-500">
                    {institution.description}
                  </p>
                </div>
              );
            })}

            {/* Shared ecosystem card */}
            <div className="relative overflow-hidden rounded-[24px] bg-[#F2F7EE] p-6">
              <Sprout size={23} className="text-[#6C994E]" />

              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#6C994E]">
                One Shared Mission
              </p>

              <h3 className="mt-2 text-lg font-bold text-[#073B4C]">
                Connected for Community Impact
              </h3>

              <p className="mt-4 text-xs leading-6 text-gray-500">
                Each platform contributes a different capability while
                connecting people, knowledge, enterprise, resources and
                opportunities through one ecosystem.
              </p>

              <Link
                to="/ecosystem"
                className="group mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#073B4C]"
              >
                Explore How They Connect

                <ArrowRight
                  size={13}
                  className="text-[#D99A16] transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MUST–IGATI CONNECTION
      ================================================================= */}
      <section className="bg-[#073B4C] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F2B632]">
              University–Community Connection
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Connecting knowledge with
              <span className="text-[#9BC36B]"> real-world opportunity.</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
              Through MUST–RICE Incubation, university research, innovation,
              incubation, commercialization and extension connect with
              community challenges and opportunities.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            {/* MUST */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
                <GraduationCap size={22} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                University
              </p>

              <h3 className="mt-2 text-xl font-bold">MUST</h3>

              <p className="mt-2 text-sm font-semibold text-[#9BC36B]">
                Research • Innovation
              </p>

              <p className="mt-4 text-xs leading-6 text-white/50">
                Research, innovation, students, academics and
                commercialization support.
              </p>
            </div>

            {/* Connection */}
            <div className="flex items-center justify-center py-2 md:px-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6C994E] text-white">
                <ArrowRight
                  size={18}
                  className="rotate-90 md:rotate-0"
                />
              </div>
            </div>

            {/* IGATI */}
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C994E] text-white">
                <HeartHandshake size={22} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9BC36B]">
                Community
              </p>

              <h3 className="mt-2 text-xl font-bold">IGATI</h3>

              <p className="mt-2 text-sm font-semibold text-[#F2B632]">
                Community • Enterprise
              </p>

              <p className="mt-4 text-xs leading-6 text-white/50">
                Communities, entrepreneurship, enterprises, partnerships and
                social transformation.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-5 max-w-5xl rounded-2xl border border-[#F2B632]/20 bg-[#F2B632]/[0.07] p-5 text-center">
            <p className="text-sm font-bold text-white">
              MUST–IGATI Community Ecosystem
            </p>

            <p className="mt-2 text-xs text-white/50">
              University knowledge + community participation + innovation +
              enterprise + markets + partnerships
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          TOGETHER WE BUILD
      ================================================================= */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6C994E]">
                Together
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#073B4C] sm:text-4xl">
                Together, we build
                <span className="block text-[#6C994E]">
                  an ecosystem where...
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                Our mission is not limited to a single programme or
                institution. It is about creating connections that allow
                people, knowledge, innovation and enterprise to work together.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {impactStatements.map((statement, index) => (
                <div
                  key={statement}
                  className={`flex items-center gap-4 rounded-2xl border p-5 ${
                    index === impactStatements.length - 1
                      ? "border-[#F2B632]/20 bg-[#FFF9EC] sm:col-span-2"
                      : "border-gray-100 bg-[#F8FAF7]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      index === impactStatements.length - 1
                        ? "bg-[#F2B632] text-[#073B4C]"
                        : "bg-[#6C994E] text-white"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <p className="text-sm font-bold text-[#073B4C]">
                    {statement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
      ================================================================= */}
      <section className="pb-20 sm:pb-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] bg-[#073B4C] px-6 py-12 text-center text-white sm:px-10 sm:py-14 lg:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#F2B632]/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl">
              <Network
                size={28}
                className="mx-auto text-[#F2B632]"
              />

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F2B632]">
                IGATI Global Mission Network
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Your place in the ecosystem
                <span className="text-[#9BC36B]"> starts here.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                Explore the ecosystem, discover where you fit and connect with
                people, programmes, enterprises and opportunities working
                toward shared community impact.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/ecosystem"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all hover:-translate-y-0.5 hover:bg-[#e1a520]"
                >
                  Explore the Ecosystem
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/join"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#6C994E] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#5f8845]"
                >
                  Join the Network
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/join"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.1]"
                >
                  Partner With IGATI
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-sm font-semibold italic text-white/65">
                  “We Are the Light and the Salt of the Earth”
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#F2B632]">
                  Matthew 5:13–19
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;