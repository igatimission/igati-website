import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Lightbulb,
  Newspaper,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const StoriesKnowledge = () => {
  const stories = [
    {
      type: "Community Story",
      title: "From Community Challenge to Practical Opportunity",
      description:
        "Stories from people, communities and ecosystem participants showing how challenges can become pathways for learning, enterprise and transformation.",
      icon: Users,
    },
    {
      type: "Innovation Story",
      title: "Turning Ideas Into Solutions That Matter",
      description:
        "Discover how researchers, students, innovators and entrepreneurs can work with communities to develop practical and relevant solutions.",
      icon: Lightbulb,
    },
    {
      type: "Enterprise Story",
      title: "Building Livelihoods Through Social Enterprise",
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

  return (
    <section
      id="stories-knowledge"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#6C994E]/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-[#F4F8F0] px-4 py-2">
              <BookOpen size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                Stories & Knowledge
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              Learn from the ecosystem.
              <span className="block text-[#6C994E]">
                Share what works.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-8 text-gray-600 lg:ml-auto lg:text-lg">
              Discover stories, research, lessons, ideas and practical
              knowledge emerging from communities, universities, innovators,
              entrepreneurs and partners across the IGATI ecosystem.
            </p>
          </div>
        </div>

        {/* Main stories feature */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Main story */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#073B4C] p-7 text-white shadow-xl shadow-[#073B4C]/10 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#F2B632]/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2B632] text-[#073B4C]">
                <Quote size={25} />
              </div>

              <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                Stories of Change
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                Every pathway has
                <span className="block text-[#9BC36B]">
                  a human story.
                </span>
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
                Behind every project, innovation, enterprise and partnership
                are people learning, experimenting, collaborating and creating
                new possibilities for their communities.
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
                  The Story Journey
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Challenge",
                    "Action",
                    "Learning",
                    "Innovation",
                    "Growth",
                    "Impact",
                  ].map((item, index, array) => (
                    <div
                      key={item}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                          index === 0
                            ? "bg-[#F2B632] text-[#073B4C]"
                            : index === array.length - 1
                            ? "bg-[#6C994E] text-white"
                            : "bg-white/[0.06] text-white/65"
                        }`}
                      >
                        {item}
                      </span>

                      {index < array.length - 1 && (
                        <ArrowRight
                          size={11}
                          className="hidden text-white/20 sm:block"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/learn"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e1a520]"
              >
                Explore Stories

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Story cards */}
          <div className="grid gap-5">
            {stories.map((story) => {
              const Icon = story.icon;

              return (
                <div
                  key={story.title}
                  className="group rounded-2xl border border-gray-100 bg-[#FCFDFB] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:bg-white hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-all duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <div className="flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
                        {story.type}
                      </p>

                      <h3 className="mt-2 text-lg font-bold text-[#073B4C]">
                        {story.title}
                      </h3>

                      <p className="mt-3 text-xs leading-6 text-gray-500">
                        {story.description}
                      </p>

                      <Link
                        to="/learn"
                        className="group/link mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
                      >
                        Read Story

                        <ArrowRight
                          size={13}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Knowledge hub */}
        <div className="mt-16">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Knowledge Hub
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#073B4C] sm:text-3xl">
                Knowledge that can be used.
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                Research and experience become more valuable when people can
                access, understand and apply what has been learned.
              </p>
            </div>

            <Link
              to="/learn"
              className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-[#073B4C] transition-colors hover:text-[#6C994E]"
            >
              Visit Knowledge Hub

              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {knowledgeItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6C994E]/25 hover:shadow-xl hover:shadow-[#073B4C]/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6C994E]/10 text-[#6C994E] transition-all duration-300 group-hover:bg-[#6C994E] group-hover:text-white">
                      <Icon size={20} />
                    </div>

                    <ArrowRight
                      size={15}
                      className="text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#F2B632]"
                    />
                  </div>

                  <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
                    {item.category}
                  </p>

                  <h4 className="mt-2 text-lg font-bold text-[#073B4C]">
                    {item.title}
                  </h4>

                  <p className="mt-3 flex-1 text-xs leading-6 text-gray-500">
                    {item.description}
                  </p>

                  <p className="mt-5 border-t border-gray-100 pt-4 text-xs font-bold text-[#073B4C]">
                    Explore Resources
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Knowledge flow */}
        <div className="mt-16 overflow-hidden rounded-[28px] border border-[#073B4C]/10 bg-[#F8FAF7]">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="bg-[#F2F7EE] p-6 sm:p-8 lg:p-10">
              <BookOpen size={22} className="text-[#6C994E]" />

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Knowledge in Action
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight text-[#073B4C] sm:text-3xl">
                Learn.
                <span className="block text-[#6C994E]">
                  Apply. Share.
                </span>
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                IGATI connects formal research, practical experience and
                community knowledge so learning can lead to better decisions,
                innovations and enterprises.
              </p>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Community Knowledge",
                  "Research Findings",
                  "Innovation Lessons",
                  "Enterprise Experience",
                  "Training Resources",
                  "Impact Stories",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#073B4C] text-[10px] font-bold text-[#F2B632]">
                      {index + 1}
                    </span>

                    <p className="text-sm font-semibold text-[#073B4C]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col gap-6 rounded-[26px] border border-[#F2B632]/20 bg-[#FFF9EC] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#D99A16]">
              Contribute Knowledge
            </p>

            <h3 className="mt-2 text-xl font-bold text-[#073B4C] sm:text-2xl">
              Have a story, research insight or lesson to share?
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
              Researchers, communities, innovators, entrepreneurs and partners
              can contribute knowledge that helps strengthen the wider
              ecosystem.
            </p>
          </div>

          <Link
            to="/join"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E]"
          >
            Contribute to the Network

            <ArrowRight
              size={16}
              className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoriesKnowledge;