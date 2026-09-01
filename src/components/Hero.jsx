import {
  ArrowRight,
  Award,
  CheckCircle2,
  Globe2,
  Lightbulb,
  Users,
} from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#073B4C] text-white"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#6C994E]/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/10 blur-3xl" />

        <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.03]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            {/* Incubation badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm sm:text-sm">
              <Award size={17} className="text-[#F2B632]" />

              <span>
                Incubated by Meru University of Science and Technology
              </span>
            </div>

            {/* Heading */}
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl xl:text-[64px]">
              Transforming Communities Through{" "}
              <span className="relative inline-block text-[#F2B632]">
                Mission-Driven
              </span>{" "}
              Social Entrepreneurship
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl">
              Connecting people, ideas, knowledge, enterprises, and capital
              across Kenya and globally to build sustainable livelihoods and
              transform communities.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#opportunities"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-7 py-3.5 text-sm font-bold text-[#073B4C] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0a521] hover:shadow-xl sm:w-auto sm:px-8 sm:py-4"
              >
                Explore Opportunities

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12] sm:w-auto sm:px-8 sm:py-4"
              >
                Submit an Innovation

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Supporting trust points */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/60 sm:text-sm lg:justify-start">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#8FB85A]" />
                Community Focused
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#8FB85A]" />
                Innovation Driven
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#8FB85A]" />
                Global Network
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            {/* Large visual card */}
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-7">
              {/* Decorative glow */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#F2B632]/15 blur-3xl" />

              <div className="relative">
                {/* Top */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F2B632]">
                      IGATI Ecosystem
                    </p>

                    <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                      Community Transformation
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C]">
                    <Globe2 size={23} />
                  </div>
                </div>

                {/* Cards */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Card 1 */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:bg-white/[0.1] sm:p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C994E]/20 text-[#9BC36B]">
                      <Lightbulb size={20} />
                    </div>

                    <p className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                      4
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/55 sm:text-sm">
                      Integrated Ecosystem Pillars
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-all duration-300 hover:bg-white/[0.1] sm:p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2B632]/15 text-[#F2B632]">
                      <Users size={20} />
                    </div>

                    <p className="mt-4 text-lg font-bold text-white sm:text-xl">
                      Kenya + Global
                    </p>

                    <p className="mt-1 text-xs leading-5 text-white/55 sm:text-sm">
                      Connected Mission Network
                    </p>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="mt-4 rounded-2xl border border-[#F2B632]/20 bg-[#F2B632]/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F2B632]" />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F2B632]">
                        Our Mission
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/70 sm:text-base">
                        Empowering communities through innovation,
                        entrepreneurship, collaboration, knowledge, and
                        sustainable opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Institutional badge */}
                <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-white/[0.04] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
                      Institutional Partner
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white/90">
                      MUST RICE
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/60">
                    Meru, Kenya
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-white px-4 py-3 shadow-xl sm:flex sm:items-center sm:gap-3 lg:-left-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6C994E]/15">
                <Globe2 size={20} className="text-[#6C994E]" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#073B4C]">
                  Global Mission
                </p>

                <p className="text-[10px] text-gray-500">
                  Compassionate for Communities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
};

export default Hero;