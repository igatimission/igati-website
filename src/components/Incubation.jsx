import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

const Incubation = () => {
  const supportAreas = [
    {
      icon: Lightbulb,
      title: "Innovation Support",
      description:
        "Strengthening community-driven ideas and practical innovations through an institutional innovation ecosystem.",
    },
    {
      icon: FlaskConical,
      title: "Research Connection",
      description:
        "Linking research, knowledge, living laboratories, and practical community solutions.",
    },
    {
      icon: BookOpenCheck,
      title: "Extension & Knowledge",
      description:
        "Connecting academic knowledge with communities through practical extension and knowledge exchange.",
    },
    {
      icon: Building2,
      title: "Commercialization Pathways",
      description:
        "Creating pathways that help promising ideas and innovations move toward sustainable ventures.",
    },
  ];

  return (
    <section
      id="incubation"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-[#6C994E]/10 blur-3xl" />
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#F2B632]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2B632]/30 bg-[#F2B632]/10 px-4 py-2">
            <Award size={16} className="text-[#D99A16]" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B7830F]">
              Institutional Incubation
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
            Incubated by{" "}
            <span className="text-[#6C994E]">MUST RICE</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
            IGATI Global Mission Network is connected to the innovation
            ecosystem of Meru University of Science and Technology through the
            Division of Research, Innovation, Commercialization & Extension.
          </p>
        </div>

        {/* Main Feature */}
        <div className="mt-12 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* LEFT CARD */}
          <div className="relative overflow-hidden rounded-[32px] bg-[#073B4C] p-7 text-white shadow-xl sm:p-9 lg:p-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#F2B632]/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#6C994E]/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C]">
                <GraduationCap size={28} />
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                Meru University of Science and Technology
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                Research. Innovation. Commercialization. Extension.
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
                The MUST RICE relationship strengthens IGATI&apos;s connection
                to research, innovation, enterprise development, and practical
                community transformation.
              </p>

              <div className="mt-7 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#8FB85A]"
                  />

                  <p className="text-sm leading-6 text-white/75">
                    Institutional connection to research and innovation.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#8FB85A]"
                  />

                  <p className="text-sm leading-6 text-white/75">
                    Practical pathways for community-focused solutions.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#8FB85A]"
                  />

                  <p className="text-sm leading-6 text-white/75">
                    Collaboration across knowledge, enterprise, and impact.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="grid gap-5 sm:grid-cols-2">
            {supportAreas.map((area) => {
              const Icon = area.icon;

              return (
                <article
                  key={area.title}
                  className="group rounded-3xl border border-gray-200 bg-[#F8FAF7] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-lg sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073B4C] text-[#F2B632] transition-colors duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#073B4C]">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#6C994E]/20 bg-[#F8FAF7] px-6 py-7 sm:px-8 lg:mt-16 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-9">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#6C994E]">
              Knowledge Into Impact
            </p>

            <h3 className="mt-2 text-xl font-bold leading-tight text-[#073B4C] sm:text-2xl">
              Bridging institutional knowledge with community transformation.
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              Through the MUST RICE incubation relationship, IGATI is positioned
              within an ecosystem that connects research, innovation, practical
              solutions, and community-driven development.
            </p>
          </div>

          <a
            href="#contact"
            className="group mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#07505E] lg:mt-0"
          >
            Connect With Us

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Incubation;