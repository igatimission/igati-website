import {
  ArrowRight,
  Building2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Lightbulb,
  Network,
  Rocket,
  Sprout,
} from "lucide-react";

import { Link } from "react-router-dom";

const About = () => {
  const institutions = [
    {
      icon: HeartHandshake,
      name: "IGATI Creatives & Innovators NGO",
      description: "Community development & social innovation",
    },
    {
      icon: Rocket,
      name: "IGATI Creative & Innovative Ventures",
      description: "Enterprise development & commercialization",
    },
    {
      icon: GraduationCap,
      name: "IGATI School of Social Entrepreneurship",
      description: "Learning, skills & enterprise development",
    },
    {
      icon: Building2,
      name: "MUST–RICE Incubation",
      description: "Research, innovation, incubation & extension",
    },
    {
      icon: HandCoins,
      name: "IGATI Global Mission Foundation",
      description: "Resource mobilization & impact financing",
    },
  ];

  const journey = [
    "Challenge",
    "Solution",
    "Innovation",
    "Enterprise",
    "Market",
    "Impact",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#6C994E]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F2B632]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-[#6C994E]/8 px-4 py-2">
            <Network size={14} className="text-[#6C994E]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#527A3A]">
              About IGATI
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
            One Mission. One Connected Ecosystem.
            <span className="mt-1 block text-[#6C994E]">
              Many Pathways to Impact.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 lg:text-lg">
            IGATI Global Mission Network connects people, institutions,
            knowledge and opportunities around practical solutions for social
            and economic transformation.
          </p>
        </div>

        {/* Main About Content */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D99A16]">
              A Connected Mission Network
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-tight text-[#073B4C] sm:text-3xl">
              Connecting communities, knowledge and enterprise for lasting
              transformation.
            </h3>

            <div className="mt-6 space-y-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              <p>
                IGATI Global Mission Network is a growing ecosystem connecting
                communities, students, researchers, innovators, entrepreneurs,
                enterprises, institutions, government, industry, investors and
                development partners around practical solutions for social and
                economic transformation.
              </p>

              <p>
                IGATI brings together complementary institutional platforms for
                community development, social innovation, entrepreneurship,
                education, research, incubation, commercialization, enterprise
                development and resource mobilization.
              </p>

              <p>
                Through this connected approach, ideas can move from community
                challenges to practical solutions, from solutions to
                innovations, and from innovations to sustainable enterprises
                that create livelihoods and community impact.
              </p>
            </div>

            {/* Transformation Journey */}
            <div className="mt-8 rounded-2xl border border-[#073B4C]/8 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-2">
                <Lightbulb size={17} className="text-[#F2B632]" />

                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#073B4C]">
                  From Challenge to Impact
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {journey.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                        index === journey.length - 1
                          ? "bg-[#073B4C] text-white"
                          : "bg-[#F4F8F0] text-[#527A3A]"
                      }`}
                    >
                      {item}
                    </span>

                    {index < journey.length - 1 && (
                      <ArrowRight
                        size={13}
                        className="text-[#D99A16]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/ecosystem"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E] hover:shadow-lg"
              >
                Explore the Ecosystem

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-[#073B4C] transition-colors hover:text-[#6C994E]"
              >
                Learn More About IGATI

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Right - Institutional Network */}
          <div className="relative">
            <div className="rounded-[28px] border border-gray-100 bg-white p-5 shadow-xl shadow-[#073B4C]/5 sm:p-7">
              {/* Umbrella */}
              <div className="relative overflow-hidden rounded-2xl bg-[#073B4C] p-6 text-white">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#6C994E]/25 blur-2xl" />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
                    <Network size={22} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                      Umbrella Network
                    </p>

                    <h4 className="mt-1 text-lg font-bold">
                      IGATI Global Mission Network
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-white/60">
                      Connecting people, institutions, programmes,
                      enterprises and opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="mx-auto h-6 w-px bg-[#6C994E]/30" />

              {/* Institutions */}
              <div className="space-y-3">
                {institutions.map((institution, index) => {
                  const Icon = institution.icon;

                  return (
                    <div
                      key={institution.name}
                      className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#FCFDFB] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6C994E]/25 hover:bg-white hover:shadow-md"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          index === 3
                            ? "bg-[#F2B632]/15 text-[#D99A16]"
                            : "bg-[#6C994E]/10 text-[#6C994E]"
                        }`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <h5 className="text-sm font-bold leading-5 text-[#073B4C]">
                          {institution.name}
                        </h5>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {institution.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Small impact badge */}
            {/* <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white bg-[#6C994E] px-5 py-4 text-white shadow-xl sm:block lg:-left-6">
              <div className="flex items-center gap-3">
                <Sprout size={20} />

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70">
                    Shared Purpose
                  </p>

                  <p className="mt-0.5 text-sm font-bold">
                    Sustainable Community Impact
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-20 border-t border-[#073B4C]/10 pt-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F2B632]" />

              <p className="text-sm font-medium leading-6 text-[#073B4C]">
                People discover opportunities.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F2B632]" />

              <p className="text-sm font-medium leading-6 text-[#073B4C]">
                Ideas become innovations.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F2B632]" />

              <p className="text-sm font-medium leading-6 text-[#073B4C]">
                Innovations become enterprises.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6C994E]" />

              <p className="text-sm font-medium leading-6 text-[#073B4C]">
                Enterprises create livelihoods.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6C994E]" />

              <p className="text-sm font-medium leading-6 text-[#073B4C]">
                Research reaches communities.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6C994E]" />

              <p className="text-sm font-medium leading-6 text-[#073B4C]">
                Partnerships accelerate impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;