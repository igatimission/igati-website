import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  LineChart,
  Network,
  Sprout,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const Impact = () => {
  const impactAreas = [
    {
      title: "People Connected",
      description:
        "Connecting communities, students, researchers, innovators, entrepreneurs, enterprises and partners through one shared ecosystem.",
      icon: Users,
    },
    {
      title: "Research to Community",
      description:
        "Helping research, knowledge and innovation move beyond institutions and contribute to practical community solutions.",
      icon: Lightbulb,
    },
    {
      title: "Enterprise Development",
      description:
        "Supporting ideas and innovations as they move toward viable enterprises, livelihoods and sustainable market opportunities.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Community Transformation",
      description:
        "Strengthening local participation, skills, enterprise and partnerships that contribute to long-term social and economic transformation.",
      icon: HeartHandshake,
    },
    {
      title: "Learning & Skills",
      description:
        "Creating pathways for training, mentorship, research participation, entrepreneurship and practical capability development.",
      icon: GraduationCap,
    },
    {
      title: "Partnership & Scale",
      description:
        "Connecting institutions, government, industry, investors and development partners around scalable community impact.",
      icon: Network,
    },
  ];

  const measurementAreas = [
    {
      title: "Participants",
      description:
        "People participating in programmes, projects, research, training and ecosystem activities.",
      icon: Users,
    },
    {
      title: "Projects",
      description:
        "Living-laboratory programmes and community initiatives implemented across the ecosystem.",
      icon: Sprout,
    },
    {
      title: "Enterprises",
      description:
        "Community enterprises, social enterprises and ventures supported through ecosystem pathways.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Partners",
      description:
        "Universities, institutions, corporates, government and development partners working with the network.",
      icon: Building2,
    },
  ];

  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-36 top-20 h-96 w-96 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-36 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-white px-4 py-2">
              <BarChart3 size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                Our Impact
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              From participation
              <span className="block text-[#6C994E]">
                to measurable impact.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-8 text-gray-600 lg:ml-auto lg:text-lg">
              IGATI is designed to create practical pathways where people,
              knowledge, innovation, enterprise and partnerships contribute to
              sustainable community transformation.
            </p>
          </div>
        </div>

        {/* Main impact feature */}
        <div className="mt-14 overflow-hidden rounded-[30px] bg-[#073B4C] text-white shadow-xl shadow-[#073B4C]/10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* Left */}
            <div className="relative p-7 sm:p-9 lg:p-11">
              <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-[#F2B632]/10 blur-3xl" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                  Impact Pathway
                </p>

                <h3 className="mt-4 max-w-xl text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                  Impact begins when
                  <span className="block text-[#9BC36B]">
                    people can participate.
                  </span>
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                  The ecosystem connects community needs with research,
                  innovation, learning, entrepreneurship, enterprise, markets
                  and partnerships so that ideas can become practical and
                  sustainable outcomes.
                </p>

                {/* Pathway */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "People",
                    "Knowledge",
                    "Innovation",
                    "Enterprise",
                    "Market",
                    "Impact",
                  ].map((item, index, array) => (
                    <div key={item} className="flex items-center gap-2">
                      <span
                        className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                          index === 0
                            ? "bg-[#F2B632] text-[#073B4C]"
                            : index === array.length - 1
                            ? "bg-[#6C994E] text-white"
                            : "border border-white/10 bg-white/[0.05] text-white/65"
                        }`}
                      >
                        {item}
                      </span>

                      {index < array.length - 1 && (
                        <ArrowRight
                          size={11}
                          className="hidden text-white/20 sm:block"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to="/ecosystem"
                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
                >
                  See How Impact Is Created

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Right visual */}
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
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C] shadow-lg">
                    <LineChart size={28} />
                  </div>
                </div>

                <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                  Measuring What Matters
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {measurementAreas.map((area) => {
                    const Icon = area.icon;

                    return (
                      <div
                        key={area.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] text-[#9BC36B]">
                          <Icon size={17} />
                        </div>

                        <p className="mt-3 text-xs font-bold text-white">
                          {area.title}
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-white/40">
                          Tracked as verified data becomes available.
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-5 text-center text-[10px] leading-5 text-white/35">
                  Public impact figures should be based on verified programme
                  and institutional data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact areas */}
        <div className="mt-14">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
              What Impact Looks Like
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#073B4C] sm:text-3xl">
              Connected outcomes across the ecosystem.
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
              Impact is created across people, communities, research,
              innovation, enterprise, learning and partnerships.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {impactAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-all duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-[#073B4C]">
                    {area.title}
                  </h4>

                  <p className="mt-3 text-xs leading-6 text-gray-500">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Measurement principles */}
        <div className="mt-16 overflow-hidden rounded-[28px] border border-[#073B4C]/10 bg-white">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-[#F2F7EE] p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Impact Measurement
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#073B4C] sm:text-3xl">
                Evidence before
                <span className="block text-[#6C994E]">
                  impressive numbers.
                </span>
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                The platform can grow into a transparent impact dashboard where
                programme outcomes are published using verified and traceable
                data.
              </p>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                {measurementAreas.map((area) => {
                  const Icon = area.icon;

                  return (
                    <div
                      key={area.title}
                      className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#FCFDFB] p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E]">
                        <Icon size={18} />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#073B4C]">
                          {area.title}
                        </h4>

                        <p className="mt-2 text-xs leading-6 text-gray-500">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Final statement */}
        <div className="mt-14 flex flex-col gap-6 rounded-[26px] bg-[#073B4C] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
              Shared Impact
            </p>

            <h3 className="mt-2 text-xl font-bold sm:text-2xl">
              From one living laboratory to a growing global network.
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/60">
              IGATI is building an ecosystem where community projects,
              university knowledge, enterprise development and partnerships can
              connect locally and scale through wider networks.
            </p>
          </div>

          <Link
            to="/ecosystem"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
          >
            Explore the Ecosystem

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

export default Impact;