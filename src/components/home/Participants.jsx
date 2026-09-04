import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Microscope,
  Sprout,
  UserRoundCog,
} from "lucide-react";

import { Link } from "react-router-dom";

const Participants = () => {
  const participants = [
    {
      title: "Farmer",
      description:
        "Join agricultural programmes, producer groups, value chains and market opportunities.",
      icon: Sprout,
    },
    {
      title: "Student",
      description:
        "Learn, participate in projects, develop ideas and connect with innovation opportunities.",
      icon: GraduationCap,
    },
    {
      title: "Researcher",
      description:
        "Work with living laboratories, communities, research questions, data and practical innovation.",
      icon: Microscope,
    },
    {
      title: "Innovator",
      description:
        "Test ideas, validate solutions, connect with users and move innovations toward commercialization.",
      icon: Lightbulb,
    },
    {
      title: "Entrepreneur",
      description:
        "Build enterprises, access mentorship, markets, networks and enterprise-development pathways.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Investor",
      description:
        "Discover enterprises, projects and impact opportunities with potential for growth and scale.",
      icon: UserRoundCog,
    },
    {
      title: "Corporate Partner",
      description:
        "Partner with communities, innovators and enterprises through collaboration, markets and investment.",
      icon: Building2,
    },
    {
      title: "Community Worker",
      description:
        "Mobilize communities, identify challenges and support practical pathways for social transformation.",
      icon: HeartHandshake,
    },
    {
      title: "Government & Partners",
      description:
        "Collaborate on programmes, policy, capacity building, partnerships and scalable community solutions.",
      icon: Landmark,
    },
  ];

  return (
    <section
      id="participants"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-[#F4F8F0] px-4 py-2">
              <Handshake size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                Who Can Participate?
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              There is a place for
              <span className="block text-[#6C994E]">
                everyone in the ecosystem.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-8 text-gray-600 lg:ml-auto lg:text-lg">
              IGATI connects people with practical pathways to learn, research,
              innovate, build enterprises, partner, invest and create community
              impact.
            </p>
          </div>
        </div>

        {/* Main participation area */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          {/* Left feature card */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#073B4C] p-7 text-white shadow-xl shadow-[#073B4C]/10 sm:p-8 lg:p-9">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6C994E]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-[#F2B632]/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C]">
                <Handshake size={23} />
              </div>

              <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                Find Your Place
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                Where do you fit in the
                <span className="block text-[#9BC36B]">
                  MUST–IGATI Community Ecosystem?
                </span>
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/65">
                Whether you are a farmer, student, researcher, innovator,
                entrepreneur, investor, institution or community change maker,
                the ecosystem connects you with relevant pathways,
                opportunities and partnerships.
              </p>

              {/* Example pathway */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/35">
                  Example: Researcher Pathway
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {[
                    "Living Labs",
                    "Research",
                    "Communities",
                    "Data",
                    "Innovation",
                  ].map((item, index, array) => (
                    <div key={item} className="flex items-center gap-2">
                      <span
                        className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                          index === 0
                            ? "bg-[#F2B632] text-[#073B4C]"
                            : index === array.length - 1
                            ? "bg-[#6C994E] text-white"
                            : "bg-white/[0.06] text-white/65"
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
              </div>

              <Link
                to="/ecosystem#find-your-place"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
              >
                Find Your Place

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Participants cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {participants.map((participant) => {
              const Icon = participant.icon;

              return (
                <Link
                  key={participant.title}
                  to="/ecosystem#find-your-place"
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-[#FCFDFB] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:bg-white hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-all duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <ArrowRight
                      size={15}
                      className="text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F2B632]"
                    />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-[#073B4C]">
                    {participant.title}
                  </h3>

                  <p className="mt-2 flex-1 text-xs leading-6 text-gray-500">
                    {participant.description}
                  </p>

                  <p className="mt-4 border-t border-gray-100 pt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#6C994E]">
                    Discover Your Path
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Action pathways */}
        <div className="mt-14 overflow-hidden rounded-[28px] border border-[#073B4C]/10 bg-[#F8FAF7]">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-[#F2F7EE] p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                I Want To...
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#073B4C] sm:text-3xl">
                Start with what you
                <span className="block text-[#6C994E]">
                  want to do.
                </span>
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                The ecosystem is designed around action. Choose your interest,
                then discover the projects, programmes and people connected to
                it.
              </p>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Learn",
                  "Research",
                  "Innovate",
                  "Start Enterprise",
                  "Join a Project",
                  "Invest",
                  "Partner",
                  "Volunteer",
                  "Mentor",
                  "Become a Change Maker",
                ].map((action) => (
                  <Link
                    key={action}
                    to="/ecosystem#find-your-place"
                    className="group inline-flex items-center gap-2 rounded-xl border border-[#073B4C]/10 bg-white px-4 py-3 text-xs font-semibold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#6C994E]/30 hover:shadow-sm"
                  >
                    {action}

                    <ArrowRight
                      size={12}
                      className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>

              <div className="mt-7">
                <Link
                  to="/join"
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#07505E]"
                >
                  Join the MUST–IGATI Ecosystem

                  <ArrowRight
                    size={16}
                    className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-14 text-center">
          <p className="mx-auto max-w-3xl text-base font-medium leading-8 text-[#073B4C]">
            Your background does not define one fixed role.{" "}
            <span className="font-bold text-[#6C994E]">
              The ecosystem allows people to learn, contribute, collaborate,
              build and grow through multiple pathways.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Participants;