import {
  ArrowUpRight,
  BookOpen,
  Coins,
  Lightbulb,
  Store,
} from "lucide-react";

const Pillars = () => {
  const pillars = [
    {
      number: "01",
      title: "Social Entrepreneurship & Incubation",
      description:
        "Nurturing grassroots innovations, social enterprises, and community-driven business models into sustainable ventures.",
      icon: Lightbulb,
    },
    {
      number: "02",
      title: "Research, Innovation & Extension",
      description:
        "Bridging academic knowledge, living laboratories, and practical community solutions in partnership with MUST RICE.",
      icon: BookOpen,
    },
    {
      number: "03",
      title: "Enterprise & Market Access",
      description:
        "Connecting local enterprises, agricultural projects, and artisans directly to global supply chains and digital platforms.",
      icon: Store,
    },
    {
      number: "04",
      title: "Impact Capital & Mobilization",
      description:
        "Unlocking catalytic capital, blended finance, research grants, and collaborative partnerships for measurable impact.",
      icon: Coins,
    },
  ];

  return (
    <section
      id="pillars"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#6C994E]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#F2B632]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#6C994E]/20 bg-[#6C994E]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#567A3D]">
            Our Ecosystem
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
            Four Pillars.{" "}
            <span className="text-[#6C994E]">One Shared Mission.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
            An interconnected ecosystem designed to transform ideas,
            knowledge, enterprises, and capital into sustainable community
            impact.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.number}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-[#F8FAF7] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-xl sm:p-8"
              >
                {/* Top accent */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#F2B632] transition-all duration-500 group-hover:w-full" />

                <div className="flex items-start justify-between gap-6">
                  {/* Icon */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#073B4C] text-[#F2B632] shadow-sm">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  {/* Number */}
                  <span className="text-4xl font-bold tracking-tight text-[#073B4C]/10 sm:text-5xl">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="mt-7 max-w-md text-xl font-bold leading-snug text-[#073B4C] sm:text-2xl">
                  {pillar.title}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                  {pillar.description}
                </p>

                <a
                  href="#solutions"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#07505E] transition-colors hover:text-[#D99A16]"
                >
                  Learn More
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Decorative circle */}
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#6C994E]/5 transition-transform duration-500 group-hover:scale-125" />
              </article>
            );
          })}
        </div>

        {/* Bottom summary strip */}
        <div className="mt-10 rounded-3xl bg-[#073B4C] px-6 py-7 text-white sm:px-8 lg:mt-14 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#F2B632]">
              Integrated Approach
            </p>

            <h3 className="mt-2 text-xl font-bold sm:text-2xl">
              From grassroots innovation to measurable impact.
            </h3>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 lg:mt-0">
            Each pillar works together to strengthen community-driven
            innovation, knowledge exchange, enterprise growth, market access,
            and access to catalytic capital.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pillars;