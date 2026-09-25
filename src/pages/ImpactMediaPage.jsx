import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  HeartHandshake,
  Image,
  Lightbulb,
  LineChart,
  Network,
  Newspaper,
  Play,
  Quote,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const ImpactMediaPage = () => {
  const impactAreas = [
    {
      title: "People Connected",
      description:
        "Connecting communities, students, researchers, innovators, entrepreneurs, enterprises and partners through one shared ecosystem.",
      icon: Users,
    },
    {
      title: "Research to Community",
      description:
        "Helping research, knowledge and innovation move beyond institutions and contribute to practical community solutions.",
      icon: Lightbulb,
    },
    {
      title: "Enterprise Development",
      description:
        "Supporting ideas and innovations as they move toward viable enterprises, livelihoods and sustainable market opportunities.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Community Transformation",
      description:
        "Strengthening local participation, skills, enterprise and partnerships that contribute to long-term social and economic transformation.",
      icon: HeartHandshake,
    },
    {
      title: "Learning & Skills",
      description:
        "Creating pathways for training, mentorship, research participation, entrepreneurship and practical capability development.",
      icon: GraduationCap,
    },
    {
      title: "Partnership & Scale",
      description:
        "Connecting institutions, government, industry, investors and development partners around scalable community impact.",
      icon: Network,
    },
  ];

  const measurementAreas = [
    {
      title: "Participants",
      description:
        "People participating in programmes, projects, research, training and ecosystem activities.",
      icon: Users,
    },
    {
      title: "Projects",
      description:
        "Living-laboratory programmes and community initiatives implemented across the ecosystem.",
      icon: Sprout,
    },
    {
      title: "Enterprises",
      description:
        "Community enterprises, social enterprises and ventures supported through ecosystem pathways.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Partners",
      description:
        "Universities, institutions, corporates, government and development partners working with the network.",
      icon: Building2,
    },
  ];

  const stories = [
    {
      type: "Community Story",
      title:
        "From Community Challenge to Practical Opportunity",
      description:
        "Stories from people, communities and ecosystem participants showing how challenges can become pathways for learning, enterprise and transformation.",
      icon: Users,
    },
    {
      type: "Innovation Story",
      title:
        "Turning Ideas Into Solutions That Matter",
      description:
        "Discover how researchers, students, innovators and entrepreneurs can work with communities to develop practical and relevant solutions.",
      icon: Lightbulb,
    },
    {
      type: "Enterprise Story",
      title:
        "Building Livelihoods Through Social Enterprise",
      description:
        "Explore stories of skills, entrepreneurship, value addition and enterprise development creating new pathways for economic participation.",
      icon: Sparkles,
    },
  ];

  const knowledgeItems = [
    {
      category: "Research",
      title: "Research & Community Knowledge",
      description:
        "Access research insights, community knowledge, emerging questions and learning from living laboratories.",
      icon: FileText,
      path: "/learn?category=research",
    },
    {
      category: "Learning",
      title: "Training & Learning Resources",
      description:
        "Explore practical resources for entrepreneurship, innovation, agriculture, enterprise development and community transformation.",
      icon: GraduationCap,
      path: "/learn?category=training",
    },
    {
      category: "Insights",
      title: "Ideas, Insights & Perspectives",
      description:
        "Read insights from practitioners, researchers, partners and ecosystem participants working across different pathways.",
      icon: Newspaper,
      path: "/learn?category=insights",
    },
  ];

  /*
   * These are intentionally placeholders rather than
   * invented IGATI news stories.
   *
   * Replace them with API data when your media/news
   * backend is ready.
   */
  const mediaItems = [];

  return (
    <div className="bg-white">
      {/* ====================================== */}
      {/* HERO */}
      {/* ====================================== */}

      <section className="relative overflow-hidden bg-[#073B4C] text-white">
        <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#6C994E]/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#F2B632]/10 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
              <BarChart3
                size={14}
                className="text-[#F2B632]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-xs">
                Impact & Media
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Stories, knowledge and
              <span className="block text-[#F2B632]">
                measurable impact.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg lg:text-xl lg:leading-9">
              Follow the people, projects,
              research, innovations,
              enterprises and partnerships
              contributing to social and
              economic transformation
              across the IGATI ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#impact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition hover:bg-[#e1a520]"
              >
                Explore Our Impact
                <ArrowRight size={16} />
              </a>

              <a
                href="#media"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
              >
                Media & Stories
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#6C994E] via-[#F2B632] to-[#6C994E]" />
      </section>

      {/* ====================================== */}
      {/* IMPACT INTRODUCTION */}
      {/* ====================================== */}

      <section
        id="impact"
        className="relative overflow-hidden bg-[#F8FAF7] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Our Impact
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
                From participation
                <span className="block text-[#6C994E]">
                  to measurable impact.
                </span>
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-8 text-gray-600 lg:ml-auto lg:text-lg">
              IGATI is designed to create
              practical pathways where
              people, knowledge, innovation,
              enterprise and partnerships
              contribute to sustainable
              community transformation.
            </p>
          </div>

          {/* Impact pathway */}

          <div className="mt-14 overflow-hidden rounded-[30px] bg-[#073B4C] text-white shadow-xl">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative p-7 sm:p-9 lg:p-11">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />

                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                    Impact Pathway
                  </p>

                  <h3 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                    Impact begins when
                    <span className="block text-[#9BC36B]">
                      people can participate.
                    </span>
                  </h3>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                    The ecosystem connects
                    community needs with
                    research, innovation,
                    learning,
                    entrepreneurship,
                    enterprise, markets and
                    partnerships so ideas
                    can become practical and
                    sustainable outcomes.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {[
                      "People",
                      "Knowledge",
                      "Innovation",
                      "Enterprise",
                      "Market",
                      "Impact",
                    ].map(
                      (
                        item,
                        index,
                        array
                      ) => (
                        <div
                          key={item}
                          className="flex items-center gap-2"
                        >
                          <span
                            className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                              index === 0
                                ? "bg-[#F2B632] text-[#073B4C]"
                                : index ===
                                  array.length -
                                    1
                                ? "bg-[#6C994E] text-white"
                                : "border border-white/10 bg-white/[0.05] text-white/65"
                            }`}
                          >
                            {item}
                          </span>

                          {index <
                            array.length -
                              1 && (
                            <ArrowRight
                              size={11}
                              className="hidden text-white/20 sm:block"
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <Link
                    to="/ecosystem"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C]"
                  >
                    See How Impact Is Created
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Measurement */}

              <div className="relative bg-[#062F3D] p-7 sm:p-9 lg:p-10">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C]">
                    <LineChart size={28} />
                  </div>
                </div>

                <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                  Measuring What Matters
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {measurementAreas.map(
                    (area) => {
                      const Icon =
                        area.icon;

                      return (
                        <div
                          key={
                            area.title
                          }
                          className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] text-[#9BC36B]">
                            <Icon
                              size={17}
                            />
                          </div>

                          <p className="mt-3 text-xs font-bold">
                            {area.title}
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-white/40">
                            Tracked as
                            verified data
                            becomes
                            available.
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>

                <p className="mt-5 text-center text-[10px] leading-5 text-white/35">
                  Public impact figures are
                  presented as verified
                  programme and
                  institutional data becomes
                  available.
                </p>
              </div>
            </div>
          </div>

          {/* Impact cards */}

          <div className="mt-16 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
              What Impact Looks Like
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#073B4C] sm:text-3xl">
              Connected outcomes across the
              ecosystem.
            </h3>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {impactAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] group-hover:bg-[#6C994E] group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-[#073B4C]">
                    {area.title}
                  </h4>

                  <p className="mt-3 text-xs leading-6 text-gray-500">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* STORIES OF CHANGE */}
      {/* ====================================== */}

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F2F7EE] px-4 py-2">
              <Quote
                size={14}
                className="text-[#6C994E]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A]">
                Stories of Change
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Every impact has
              <span className="text-[#6C994E]">
                {" "}
                a human story.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Behind projects, innovations,
              enterprises and partnerships
              are people learning,
              collaborating and creating new
              possibilities.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {stories.map((story) => {
              const Icon = story.icon;

              return (
                <article
                  key={story.title}
                  className="group rounded-[24px] border border-gray-100 bg-[#FCFDFB] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] group-hover:bg-[#6C994E] group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
                    {story.type}
                  </p>

                  <h3 className="mt-2 text-lg font-bold leading-7 text-[#073B4C]">
                    {story.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-gray-500">
                    {story.description}
                  </p>

                  <Link
                    to="/learn"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#073B4C]"
                  >
                    Explore Stories
                    <ArrowRight
                      size={13}
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* MEDIA */}
      {/* ====================================== */}

      <section
        id="media"
        className="bg-[#F8FAF7] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-white px-4 py-2">
                <Newspaper
                  size={14}
                  className="text-[#6C994E]"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A]">
                  Media Centre
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-[#073B4C] sm:text-4xl">
                News, media &
                <span className="text-[#6C994E]">
                  {" "}
                  ecosystem updates.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                Follow developments,
                activities, events,
                partnerships and stories
                emerging from across the
                IGATI network.
              </p>
            </div>
          </div>

          {mediaItems.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-[24px] border border-gray-100 bg-white"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-56 w-full object-cover"
                    />
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <CalendarDays
                        size={13}
                      />

                      {item.date}
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-[#073B4C]">
                      {item.title}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /*
             * Empty state instead of
             * inventing IGATI news.
             */
            <div className="mt-10 overflow-hidden rounded-[28px] border border-[#073B4C]/10 bg-white">
              <div className="grid lg:grid-cols-3">
                <div className="flex flex-col justify-center bg-[#073B4C] p-8 text-white lg:p-10">
                  <Newspaper
                    size={28}
                    className="text-[#F2B632]"
                  />

                  <h3 className="mt-5 text-2xl font-bold">
                    IGATI Media Centre
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/60">
                    This area will bring
                    together official news,
                    announcements and
                    ecosystem updates.
                  </p>
                </div>

                <MediaPlaceholder
                  icon={Image}
                  title="Photo Stories"
                  description="Photos and visual stories from programmes, communities, events and ecosystem activities."
                />

                <MediaPlaceholder
                  icon={Play}
                  title="Videos & Features"
                  description="Interviews, project features, event highlights and stories from across the network."
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====================================== */}
      {/* KNOWLEDGE & PUBLICATIONS */}
      {/* ====================================== */}

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Knowledge Hub
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#073B4C]">
                Knowledge that can be used.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                Research and experience
                become more valuable when
                people can access,
                understand and apply what
                has been learned.
              </p>
            </div>

            <Link
              to="/learn"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#073B4C]"
            >
              Visit Knowledge Hub
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {knowledgeItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] group-hover:bg-[#6C994E] group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
                    {item.category}
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-[#073B4C]">
                    {item.title}
                  </h3>

                  <p className="mt-3 flex-1 text-xs leading-6 text-gray-500">
                    {item.description}
                  </p>

                  <span className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-bold text-[#073B4C]">
                    Explore Resources
                    <ArrowRight
                      size={13}
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* KNOWLEDGE FLOW */}
      {/* ====================================== */}

      <section className="bg-[#F8FAF7] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] border border-[#073B4C]/10 bg-white">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-[#F2F7EE] p-7 sm:p-9 lg:p-10">
                <BookOpen
                  size={25}
                  className="text-[#6C994E]"
                />

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                  Knowledge in Action
                </p>

                <h3 className="mt-3 text-2xl font-bold text-[#073B4C] sm:text-3xl">
                  Learn.
                  <span className="block text-[#6C994E]">
                    Apply. Share.
                  </span>
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  IGATI connects formal
                  research, practical
                  experience and community
                  knowledge so learning can
                  lead to better decisions,
                  innovations and
                  enterprises.
                </p>
              </div>

              <div className="p-7 sm:p-9 lg:p-10">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Community Knowledge",
                    "Research Findings",
                    "Innovation Lessons",
                    "Enterprise Experience",
                    "Training Resources",
                    "Impact Stories",
                  ].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#FCFDFB] p-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#073B4C] text-[10px] font-bold text-[#F2B632]">
                          {index + 1}
                        </span>

                        <p className="text-sm font-semibold text-[#073B4C]">
                          {item}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* FINAL CTA */}
      {/* ====================================== */}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[30px] bg-[#073B4C] p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                  Shared Impact
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">
                  Help build a growing
                  ecosystem of knowledge,
                  enterprise and community
                  transformation.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
                  Communities,
                  researchers, innovators,
                  entrepreneurs,
                  institutions and partners
                  can participate,
                  contribute knowledge and
                  connect through the IGATI
                  network.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link
                  to="/ecosystem"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C]"
                >
                  Explore Ecosystem
                  <ArrowRight
                    size={16}
                  />
                </Link>

                <Link
                  to="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white"
                >
                  Join IGATI
                  <ArrowRight
                    size={16}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function MediaPlaceholder({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="border-t border-gray-100 p-8 lg:border-l lg:border-t-0 lg:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E]">
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#073B4C]">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-6 text-gray-500">
        {description}
      </p>

      <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-gray-400">
        Content coming from the platform
      </span>
    </div>
  );
}

export default ImpactMediaPage;