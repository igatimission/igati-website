import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";

const About = () => {
  const focusAreas = [
    "Community-driven innovation",
    "Sustainable social enterprises",
    "Research & knowledge exchange",
    "Enterprise & market access",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F8FAF7] py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#6C994E]/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F2B632]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-[#6C994E]/10 px-4 py-2">
            <HeartHandshake size={16} className="text-[#6C994E]" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#567A3D]">
              About IGATI
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
            Building Sustainable Communities Through{" "}
            <span className="text-[#6C994E]">Collaboration</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
            A mission-driven network connecting people, ideas, knowledge,
            enterprises, and capital to create meaningful and sustainable
            community impact.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D99A16]">
              Who We Are
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-tight text-[#073B4C] sm:text-3xl lg:text-4xl">
              Turning ideas and knowledge into opportunities that transform
              communities.
            </h3>

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
              IGATI Global Mission Network brings together communities,
              innovators, researchers, entrepreneurs, institutions, and
              partners within an ecosystem designed to support sustainable
              livelihoods and community transformation.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Through social entrepreneurship, research, enterprise
              development, market access, and impact capital, the network
              creates connections that help community-driven ideas grow into
              sustainable solutions.
            </p>

            {/* Focus areas */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#6C994E]"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#pillars"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E] hover:shadow-lg"
            >
              Discover Our Ecosystem

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Mission */}
              <div className="rounded-3xl bg-[#073B4C] p-6 text-white shadow-xl sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C]">
                  <Target size={23} />
                </div>

                <h4 className="mt-6 text-xl font-bold">Our Mission</h4>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  To connect people, knowledge, enterprises, innovation, and
                  resources in ways that support sustainable livelihoods and
                  meaningful community transformation.
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:mt-8 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6C994E]/15 text-[#6C994E]">
                  <Eye size={23} />
                </div>

                <h4 className="mt-6 text-xl font-bold text-[#073B4C]">
                  Our Vision
                </h4>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Thriving communities connected to knowledge, opportunity,
                  innovation, enterprise, and collaborative networks locally
                  and globally.
                </p>
              </div>

              {/* Innovation */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2B632]/15 text-[#D99A16]">
                  <Lightbulb size={23} />
                </div>

                <h4 className="mt-6 text-lg font-bold text-[#073B4C]">
                  Innovation
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Supporting grassroots ideas and community-driven solutions
                  with the potential to create sustainable impact.
                </p>
              </div>

              {/* Community */}
              <div className="rounded-3xl bg-[#6C994E] p-6 text-white shadow-lg sm:mt-8 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Users size={23} />
                </div>

                <h4 className="mt-6 text-lg font-bold">Community</h4>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Building networks where communities, institutions, and
                  partners work together toward shared transformation.
                </p>
              </div>
            </div>

            {/* Floating Global Network Card */}
            <div className="absolute -bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-xl md:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#073B4C]/10">
                <Globe2 size={20} className="text-[#073B4C]" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#073B4C]">
                  Kenya & Global
                </p>

                <p className="text-[10px] text-gray-500">
                  Connecting communities beyond borders
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Values Strip */}
        <div className="mt-16 border-t border-gray-200 pt-10 lg:mt-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#F2B632]">01</span>

              <div>
                <p className="font-bold text-[#073B4C]">People</p>
                <p className="text-xs text-gray-500">
                  Communities at the centre
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#F2B632]">02</span>

              <div>
                <p className="font-bold text-[#073B4C]">Knowledge</p>
                <p className="text-xs text-gray-500">
                  Research into solutions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#F2B632]">03</span>

              <div>
                <p className="font-bold text-[#073B4C]">Enterprise</p>
                <p className="text-xs text-gray-500">
                  Ideas into sustainable ventures
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#F2B632]">04</span>

              <div>
                <p className="font-bold text-[#073B4C]">Impact</p>
                <p className="text-xs text-gray-500">
                  Transformation that matters
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;