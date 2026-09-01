import {
  ArrowRight,
  BookOpen,
  Coins,
  Lightbulb,
  Store,
} from "lucide-react";

const SolutionCentre = () => {
  const solutions = [
    {
      number: "01",
      title: "Innovation & Incubation",
      description:
        "Support for grassroots innovations, social enterprises, and community-driven business models as they grow into sustainable ventures.",
      icon: Lightbulb,
      link: "#pillars",
    },
    {
      number: "02",
      title: "Research & Extension",
      description:
        "Connecting academic knowledge, living laboratories, and practical community solutions through research and extension.",
      icon: BookOpen,
      link: "#incubation",
    },
    {
      number: "03",
      title: "Enterprise & Market Access",
      description:
        "Connecting local enterprises, agricultural projects, and artisans with supply chains and digital market opportunities.",
      icon: Store,
      link: "#pillars",
    },
    {
      number: "04",
      title: "Impact Capital",
      description:
        "Supporting access to catalytic capital, blended finance, research grants, and collaborative partnerships for measurable impact.",
      icon: Coins,
      link: "#pillars",
    },
  ];

  return (
    <section
      id="solutions"
      className="relative overflow-hidden bg-[#F8FAF7] py-16 sm:py-20 lg:py-24"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#6C994E]/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-[#6C994E]/20 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#567A3D]">
              Solution Centre
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
            Turning Potential Into{" "}
            <span className="text-[#6C994E]">Practical Solutions</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
            Explore the key pathways within the IGATI ecosystem that connect
            innovation, knowledge, enterprise, markets, and capital for
            sustainable community transformation.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <article
                key={solution.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-xl"
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.15em] text-gray-400">
                    {solution.number}
                  </span>

                  <div className="h-1.5 w-1.5 rounded-full bg-[#F2B632]" />
                </div>

                {/* Icon */}
                <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#073B4C] text-[#F2B632] transition-all duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold leading-snug text-[#073B4C]">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="mt-4 flex-1 text-sm leading-7 text-gray-600">
                  {solution.description}
                </p>

                {/* Link */}
                <a
                  href={solution.link}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#07505E] transition-colors hover:text-[#D99A16]"
                >
                  Explore

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                {/* Bottom Hover Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F2B632] transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        {/* Bottom Feature Panel */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-[#073B4C] lg:mt-16">
          <div className="grid items-center gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#F2B632]">
                An Integrated Ecosystem
              </p>

              <h3 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl">
                Connecting ideas, knowledge, enterprise and capital in one
                mission-driven network.
              </h3>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                The Solution Centre brings together the core areas of the IGATI
                ecosystem so that community-driven ideas can access the
                knowledge, markets, partnerships and resources needed to grow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="#opportunities"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:bg-[#e0a521]"
              >
                Explore Opportunities

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#submit"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
              >
                Submit an Innovation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionCentre;