import {
  ArrowRight,
  Globe2,
  Handshake,
  Network,
  Sparkles,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] bg-[#073B4C] px-6 py-12 text-white shadow-2xl shadow-[#073B4C]/15 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Background glows */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#6C994E]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#F2B632]/15 blur-3xl" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
                  <Sparkles size={14} className="text-[#F2B632]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-xs">
                    Your Place Is Here
                  </span>
                </div>

                <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Explore.
                  <span className="text-[#F2B632]"> Connect.</span>
                  <span className="block text-[#9BC36B]">
                    Participate.
                  </span>
                </h2>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base lg:text-lg lg:leading-8">
                  The IGATI ecosystem is open to people, ideas, knowledge,
                  enterprises, partnerships, investment and action. Find the
                  pathway that matches your interests and become part of a
                  growing university–community mission network.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/ecosystem"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
                  >
                    Explore the Ecosystem

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to="/join"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/[0.09]"
                  >
                    Join the Network

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>

              {/* Right */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {/* Participate */}
                <Link
                  to="/join"
                  className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F2B632]/25 hover:bg-white/[0.08]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6C994E] text-white">
                      <Users size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9BC36B]">
                        Participate
                      </p>

                      <h3 className="mt-1 text-base font-bold text-white">
                        Find Your Place
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-white/50">
                        Join as a farmer, student, researcher, innovator,
                        entrepreneur, mentor or change maker.
                      </p>
                    </div>

                    <ArrowRight
                      size={15}
                      className="mt-1 text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>

                {/* Partner */}
                <Link
                  to="/join"
                  className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F2B632]/25 hover:bg-white/[0.08]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
                      <Handshake size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F2B632]">
                        Collaborate
                      </p>

                      <h3 className="mt-1 text-base font-bold text-white">
                        Partner With IGATI
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-white/50">
                        Collaborate through research, projects, enterprise,
                        markets, funding and community transformation.
                      </p>
                    </div>

                    <ArrowRight
                      size={15}
                      className="mt-1 text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>

                {/* Ecosystem */}
                <Link
                  to="/ecosystem"
                  className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F2B632]/25 hover:bg-white/[0.08] sm:col-span-2 lg:col-span-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[#9BC36B]">
                      <Network size={20} />
                    </div>

                    <div className="flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#9BC36B]">
                        Discover
                      </p>

                      <h3 className="mt-1 text-base font-bold text-white">
                        Enter the Living Ecosystem
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-white/50">
                        See how community, university, research, innovation,
                        enterprise, markets and investment connect.
                      </p>
                    </div>

                    <ArrowRight
                      size={15}
                      className="mt-1 text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-[#F2B632]">
                    <Globe2 size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Local to Global
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/40">
                      Meru → Kenya → Africa → Global
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-[#9BC36B]">
                    <Network size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      One Ecosystem
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/40">
                      Many pathways to participate
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-[#F2B632]">
                    <Handshake size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Shared Impact
                    </p>

                    <p className="mt-0.5 text-[10px] text-white/40">
                      Knowledge, enterprise & community
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Motto */}
            <div className="mt-8 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
                IGATI Global Mission Network
              </p>

              <p className="mt-2 text-sm font-semibold italic text-white/70">
                “We Are the Light and the Salt of the Earth”
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F2B632]">
                Matthew 5:13–19
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;