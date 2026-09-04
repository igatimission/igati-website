import {
  ArrowRight,
  Globe2,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  Rocket,
  Sprout,
} from "lucide-react";

import { Link } from "react-router-dom";

const Hero = () => {
  const ecosystemItems = [
    {
      icon: Sprout,
      label: "Community",
    },
    {
      icon: GraduationCap,
      label: "University",
    },
    {
      icon: Lightbulb,
      label: "Innovation",
    },
    {
      icon: Rocket,
      label: "Enterprise",
    },
    {
      icon: Handshake,
      label: "Partnership",
    },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#073B4C] text-white"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#6C994E]/15 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[#F2B632]/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Left Content */}
          <div className="max-w-3xl">
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur">
              <Network
                size={14}
                className="text-[#F2B632]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-white/75 sm:text-xs">
                IGATI Global Mission Network
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px] xl:text-[64px]">
              Connecting People,
              <span className="block text-[#F2B632]">
                Knowledge & Enterprise
              </span>
              <span className="block">
                for Community Impact.
              </span>
            </h1>

            {/* Main positioning */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg lg:text-xl lg:leading-9">
              IGATI Global Mission Network is a university–community ecosystem
              connecting people, research, innovation, entrepreneurship,
              enterprises, markets and community impact.
            </p>

            {/* Supporting statement */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Enter a living ecosystem where community challenges connect with
              university knowledge, innovation, enterprise development,
              partnerships, markets and opportunities for sustainable
              transformation.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/ecosystem"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e4aa25] hover:shadow-xl"
              >
                Explore the Ecosystem

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/join"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.09]"
              >
                Join the Network

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Ecosystem quick indicators */}
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-white/10 pt-6">
              {ecosystemItems.slice(0, 3).map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-xs font-medium text-white/60"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] text-[#F2B632]">
                      <Icon size={13} />
                    </div>

                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            {/* Main ecosystem card */}
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-md sm:p-7">
              {/* Internal glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#F2B632]/10 blur-3xl" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#F2B632]">
                      Living Ecosystem
                    </p>

                    <h2 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl">
                      From Community Challenge
                      <span className="block text-[#9BC36B]">
                        to Shared Impact
                      </span>
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
                    <Globe2 size={21} />
                  </div>
                </div>

                {/* Flow */}
                <div className="mt-7 space-y-3">
                  {[
                    "Community Challenge",
                    "Research & Knowledge",
                    "Innovation",
                    "Entrepreneurship",
                    "Enterprise & Market",
                    "Community Impact",
                  ].map((step, index, array) => (
                    <div key={step}>
                      <div
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                          index === 0
                            ? "border-[#F2B632]/25 bg-[#F2B632]/10"
                            : index === array.length - 1
                            ? "border-[#6C994E]/30 bg-[#6C994E]/15"
                            : "border-white/10 bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${
                              index === 0
                                ? "bg-[#F2B632] text-[#073B4C]"
                                : index === array.length - 1
                                ? "bg-[#6C994E] text-white"
                                : "bg-white/10 text-white/70"
                            }`}
                          >
                            {index + 1}
                          </span>

                          <span className="text-xs font-semibold text-white/80 sm:text-sm">
                            {step}
                          </span>
                        </div>

                        {index < array.length - 1 && (
                          <ArrowRight
                            size={14}
                            className="text-white/20"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ecosystem nodes */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {ecosystemItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center"
                      >
                        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] text-[#F2B632]">
                          <Icon size={15} />
                        </div>

                        <p className="mt-2 text-[10px] font-semibold text-white/60">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating MUST card */}
            <div className="absolute -bottom-6 -left-3 hidden max-w-[245px] rounded-2xl border border-white/10 bg-white p-4 text-[#073B4C] shadow-2xl sm:block lg:-left-8">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E]">
                  <GraduationCap size={19} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#D99A16]">
                    University–Community
                  </p>

                  <p className="mt-1 text-xs font-bold leading-5">
                    Incubated through MUST–RICE
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-gray-500">
                    Research, innovation, commercialization & extension.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating network badge */}
            <div className="absolute -right-3 top-10 hidden rounded-2xl border border-white/10 bg-[#6C994E] px-4 py-3 text-white shadow-xl sm:block lg:-right-6">
              <div className="flex items-center gap-2">
                <Globe2 size={16} />

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/65">
                    Network
                  </p>

                  <p className="text-xs font-bold">
                    Meru → Global
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="h-1 w-full bg-gradient-to-r from-[#6C994E] via-[#F2B632] to-[#6C994E]" />
    </section>
  );
};

export default Hero;