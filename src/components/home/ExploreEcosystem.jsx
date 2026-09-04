import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Lightbulb,
  Microscope,
  Rocket,
  Sprout,
} from "lucide-react";

import { Link } from "react-router-dom";

const ExploreEcosystem = () => {
  const ecosystemItems = [
    {
      title: "Community",
      icon: Sprout,
    },
    {
      title: "University",
      icon: GraduationCap,
    },
    {
      title: "Research",
      icon: Microscope,
    },
    {
      title: "Innovation",
      icon: Lightbulb,
    },
    {
      title: "Enterprise",
      icon: Rocket,
    },
    {
      title: "Partnership",
      icon: Handshake,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#6C994E]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F2B632]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#073B4C] px-6 py-12 text-white shadow-2xl shadow-[#073B4C]/15 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          {/* Card background glow */}
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#F2B632]/15 blur-3xl" />

          {/* Grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative mx-auto max-w-5xl text-center">
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F2B632]">
              Explore the Ecosystem
            </p>

            {/* Heading */}
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Enter the Living Ecosystem of
              <span className="mt-1 block text-[#F2B632]">
                IGATI Global Mission
              </span>
            </h2>

            {/* Intro */}
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/70 sm:text-base lg:text-lg lg:leading-8">
              Discover how communities, university, research, innovation,
              entrepreneurship, enterprises, markets and partners connect to
              create sustainable community impact.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <Link
                to="/ecosystem"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-7 py-4 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e2a51f] hover:shadow-xl"
              >
                Enter the Ecosystem

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Ecosystem nodes */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {ecosystemItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#F2B632]/30 hover:bg-white/[0.08]"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.08] text-[#F2B632] transition-all duration-300 group-hover:bg-[#F2B632] group-hover:text-[#073B4C]">
                      <Icon size={20} />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-white/80">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Supporting line */}
            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
                Community → Research → Innovation → Enterprise → Market →
                Impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreEcosystem;