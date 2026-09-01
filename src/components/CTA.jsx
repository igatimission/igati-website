import {
  ArrowRight,
  Lightbulb,
  Network,
  Sparkles,
  Users,
} from "lucide-react";

const CTA = () => {
  return (
    <section
      id="join"
      className="relative overflow-hidden bg-[#073B4C] py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#6C994E]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/15 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-sm">
          <div className="grid items-center gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F2B632]/20 bg-[#F2B632]/10 px-4 py-2">
                <Sparkles size={16} className="text-[#F2B632]" />

                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                  Be Part of the Mission
                </span>
              </div>

              <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Have an idea that can{" "}
                <span className="text-[#F2B632]">
                  transform communities?
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base lg:text-lg">
                Connect with a mission-driven network of innovators,
                entrepreneurs, researchers, institutions, and communities
                working toward sustainable social and economic transformation.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#opportunities"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-7 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0a521] hover:shadow-lg"
                >
                  Explore Opportunities

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]"
                >
                  Submit an Innovation

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>

            {/* Right Cards */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2B632]/15 text-[#F2B632]">
                    <Lightbulb size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Bring Your Idea
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Share community-driven innovations with potential for
                      meaningful impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6C994E]/20 text-[#9BC36B]">
                    <Users size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Join the Network
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Connect with people and institutions working across the
                      IGATI ecosystem.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Network size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Build Partnerships
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-white/55">
                      Explore collaboration around innovation, enterprise,
                      research, and community transformation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="border-t border-white/10 bg-black/10 px-6 py-4 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p className="text-xs text-white/50">
                IGATI Global Mission Network
              </p>

              <p className="text-xs font-medium text-[#F2B632]">
                Compassionate for Communities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;