import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Factory,
  Globe2,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  Landmark,
  Leaf,
  Lightbulb,
  MapPin,
  Network,
  Search,
  Sprout,
  Target,
  Telescope,
  Users,
  Wheat,
} from "lucide-react";

const EcosystemPage = () => {
  const [activeGeo, setActiveGeo] = useState("Meru County");
  const [selectedNode, setSelectedNode] = useState("Communities");
  const [selectedLab, setSelectedLab] = useState(
    "One Million Productive Bee Hives"
  );
  const [selectedIdentity, setSelectedIdentity] = useState("Farmer");
  const [selectedTheme, setSelectedTheme] = useState("Agriculture & Food Systems");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const themes = [
    {
      name: "Agriculture & Food Systems",
      icon: Wheat,
      description:
        "Smart agriculture, farmer clusters, apiculture, food production and sustainable value chains.",
    },
    {
      name: "Apiculture & Environmental Sustainability",
      icon: Leaf,
      description:
        "One Million Productive Bee Hives, biodiversity, livelihoods and community conservation.",
    },
    {
      name: "Value Addition & Manufacturing",
      icon: Factory,
      description:
        "Processing, product development, standards, branding, packaging and commercialization.",
    },
    {
      name: "Social Entrepreneurship & Enterprise Development",
      icon: Building2,
      description:
        "Turning community challenges into enterprises, jobs, livelihoods and scalable solutions.",
    },
    {
      name: "Youth & Young Mothers",
      icon: Users,
      description:
        "Social enterprise, skills development, entrepreneurship and economic empowerment.",
    },
    {
      name: "Innovation, Technology & Digital Transformation",
      icon: Lightbulb,
      description:
        "Technology-enabled solutions, digital platforms and community technologies.",
    },
    {
      name: "Research, Knowledge & Learning",
      icon: Telescope,
      description:
        "Research, community knowledge, evidence, publications, experimentation and new knowledge.",
    },
    {
      name: "Partnerships, Investment & Resource Mobilisation",
      icon: Handshake,
      description:
        "Connecting ecosystem needs with institutions, investors, donors and strategic partners.",
    },
    {
      name: "Markets & Exchange",
      icon: CircleDollarSign,
      description:
        "Connecting producers, enterprises, buyers, consumers and value-chain actors.",
    },
    {
      name: "Community & Global Transformation",
      icon: Globe2,
      description:
        "Local community action connected to the wider African and global IGATI Mission Network.",
    },
  ];

  const geography = [
    {
      name: "Africa",
      description:
        "The wider continental network through which local ecosystems can connect, collaborate and scale.",
    },
    {
      name: "Kenya",
      description:
        "The national context connecting community action, research, enterprise and partnership.",
    },
    {
      name: "Meru County",
      description:
        "The current geographic home of the flagship MUST–IGATI Community Ecosystem.",
    },
    {
      name: "MUST–IGATI Community Ecosystem",
      description:
        "A university-community ecosystem connecting knowledge, communities, enterprise, innovation and opportunity.",
    },
    {
      name: "Emerging Ecosystems",
      description:
        "Future community ecosystems that can be connected to the wider IGATI Global Mission Network.",
    },
  ];

  const ecosystemNodes = [
    {
      name: "Communities",
      icon: Users,
      description:
        "Community challenges, needs, knowledge, opportunities and participation form the starting point.",
      connectsTo: ["Projects", "People", "Research", "Impact"],
    },
    {
      name: "Projects",
      icon: Target,
      description:
        "Projects translate community challenges into practical interventions and action.",
      connectsTo: ["Communities", "Programmes", "People", "Opportunities"],
    },
    {
      name: "Programmes",
      icon: BookOpen,
      description:
        "Programmes coordinate long-term interventions, training, learning and community transformation.",
      connectsTo: ["Projects", "Institutions", "People", "Impact"],
    },
    {
      name: "People",
      icon: Users,
      description:
        "Farmers, students, researchers, entrepreneurs, mentors, investors and partners make the ecosystem work.",
      connectsTo: ["Projects", "Institutions", "Opportunities", "Research"],
    },
    {
      name: "Institutions",
      icon: Landmark,
      description:
        "Universities, community organisations, government, NGOs, businesses and partners contribute capabilities.",
      connectsTo: ["People", "Research", "Enterprises", "Opportunities"],
    },
    {
      name: "Enterprises",
      icon: Building2,
      description:
        "Enterprises create livelihoods and connect practical solutions with sustainable economic activity.",
      connectsTo: ["Innovations", "Markets", "People", "Impact"],
    },
    {
      name: "Innovations",
      icon: Lightbulb,
      description:
        "Technologies, products, processes and social innovations emerge from practical challenges and knowledge.",
      connectsTo: ["Research", "Enterprises", "Projects", "Impact"],
    },
    {
      name: "Research",
      icon: Telescope,
      description:
        "Research connects university knowledge and community realities to evidence, experimentation and learning.",
      connectsTo: ["Innovations", "Communities", "People", "Knowledge"],
    },
    {
      name: "Opportunities",
      icon: CircleDollarSign,
      description:
        "Training, funding, research, partnerships, mentorship, markets and investment opportunities.",
      connectsTo: ["People", "Projects", "Institutions", "Enterprises"],
    },
    {
      name: "Impact",
      icon: Sprout,
      description:
        "The ecosystem ultimately seeks sustainable community and socio-economic transformation.",
      connectsTo: ["Communities", "Projects", "Enterprises", "Research"],
    },
  ];

  const labs = [
    {
      name: "One Million Productive Bee Hives",
      icon: Leaf,
      tagline: "Flagship Living Laboratory",
      description:
        "A flagship living laboratory connecting farmers, community participation, training, research, innovation, value chains, enterprise, markets, investment and impact.",
      journey: [
        "Challenge",
        "Community",
        "Intervention",
        "People & Partners",
        "Innovation",
        "Enterprise / Value Chain",
        "Research & Learning",
        "Investment / Resources",
        "Results & Impact",
        "Scale",
      ],
    },
    {
      name: "Smart Agriculture",
      icon: Wheat,
      tagline: "Agriculture Living Laboratory",
      description:
        "A living laboratory connecting farmers, knowledge, production, innovation, value addition, markets and enterprise.",
      journey: [
        "Challenge",
        "Community",
        "Intervention",
        "Research",
        "Production",
        "Value Addition",
        "Market",
        "Impact",
      ],
    },
    {
      name: "Value Addition & Manufacturing",
      icon: Factory,
      tagline: "Enterprise Living Laboratory",
      description:
        "Connecting resources and production with processing, standards, product development, branding and commercialization.",
      journey: [
        "Resource",
        "Product",
        "Compliance",
        "Brand",
        "Market",
        "Enterprise",
        "Scale",
      ],
    },
    {
      name: "Social Entrepreneurship",
      icon: HeartHandshake,
      tagline: "Social Enterprise Living Laboratory",
      description:
        "Turning social and community challenges into practical enterprise pathways, livelihoods and sustainable solutions.",
      journey: [
        "Challenge",
        "Training",
        "Mentorship",
        "Incubation",
        "Enterprise",
        "Market",
        "Income",
        "Impact",
      ],
    },
    {
      name: "Young Mothers Social Enterprise",
      icon: HandHeart,
      tagline: "Economic Empowerment",
      description:
        "A social-enterprise pathway focused on skills, entrepreneurship, dignity, livelihoods and economic participation.",
      journey: [
        "Identify",
        "Mentor",
        "Train",
        "Incubate",
        "Create",
        "Enterprise",
        "Income",
      ],
    },
    {
      name: "Innovation & Technology",
      icon: Lightbulb,
      tagline: "Innovation Living Laboratory",
      description:
        "Testing technology-enabled solutions and practical innovations in real community environments.",
      journey: [
        "Challenge",
        "Research",
        "Prototype",
        "Test",
        "Innovate",
        "Commercialize",
        "Scale",
      ],
    },
    {
      name: "Research & Knowledge",
      icon: Telescope,
      tagline: "Knowledge Living Laboratory",
      description:
        "Connecting research, academic knowledge, community knowledge, experimentation, evidence and learning.",
      journey: [
        "Community Challenge",
        "Research",
        "Evidence",
        "Innovation",
        "Learning",
        "Knowledge Output",
        "Impact",
      ],
    },
    {
      name: "Emerging Living Laboratories",
      icon: Sprout,
      tagline: "Future Ecosystems",
      description:
        "A flexible pathway for onboarding future living laboratories without redesigning the ecosystem platform.",
      journey: [
        "Challenge",
        "Community",
        "Intervention",
        "People",
        "Innovation",
        "Resources",
        "Impact",
      ],
    },
  ];

  const identities = [
    {
      name: "Farmer",
      icon: Wheat,
      recommendations: [
        "Living Laboratories",
        "Agricultural Projects",
        "Training Opportunities",
        "Markets & Exchange",
      ],
    },
    {
      name: "Student",
      icon: GraduationCap,
      recommendations: [
        "Research Opportunities",
        "Innovation Challenges",
        "Mentorship",
        "Living Laboratories",
      ],
    },
    {
      name: "Researcher",
      icon: Telescope,
      recommendations: [
        "Research Questions",
        "Living Laboratories",
        "Communities",
        "Knowledge Outputs",
      ],
    },
    {
      name: "Entrepreneur",
      icon: Building2,
      recommendations: [
        "Enterprise Development",
        "Incubation",
        "Markets",
        "Partnership Opportunities",
      ],
    },
    {
      name: "Innovator",
      icon: Lightbulb,
      recommendations: [
        "Innovation Labs",
        "Research",
        "Commercialization",
        "Enterprise Opportunities",
      ],
    },
    {
      name: "Investor",
      icon: CircleDollarSign,
      recommendations: [
        "Investment Opportunities",
        "Enterprises",
        "Projects",
        "Impact Pathways",
      ],
    },
    {
      name: "Partner",
      icon: Handshake,
      recommendations: [
        "Partnership Opportunities",
        "Projects",
        "Institutions",
        "Resource Mobilisation",
      ],
    },
    {
      name: "Organisation",
      icon: Landmark,
      recommendations: [
        "Collaboration",
        "Living Laboratories",
        "Programmes",
        "Partnerships",
      ],
    },
    {
      name: "Community Member",
      icon: Users,
      recommendations: [
        "Community Projects",
        "Training",
        "Enterprise Opportunities",
        "Participation",
      ],
    },
  ];

  const knowledgeStreams = [
    {
      title: "Research",
      icon: Telescope,
      text: "Research projects, student research, academic research and community research.",
    },
    {
      title: "Innovation",
      icon: Lightbulb,
      text: "Technologies, products, processes and social innovations.",
    },
    {
      title: "Community Knowledge",
      icon: Users,
      text: "Indigenous knowledge, farmer knowledge, community solutions and local practices.",
    },
    {
      title: "Knowledge Outputs",
      icon: BookOpen,
      text: "Publications, reports, case studies, learning briefs, data and stories.",
    },
  ];

  const opportunities = [
    "Training",
    "Incubation",
    "Research",
    "Funding",
    "Investment",
    "Partnership",
    "Mentorship",
    "Markets",
    "Volunteering",
    "Innovation Challenges",
  ];

  const currentNode = useMemo(
    () => ecosystemNodes.find((node) => node.name === selectedNode),
    [selectedNode]
  );

  const currentLab = useMemo(
    () => labs.find((lab) => lab.name === selectedLab),
    [selectedLab]
  );

  const currentIdentity = useMemo(
    () => identities.find((identity) => identity.name === selectedIdentity),
    [selectedIdentity]
  );

  const currentTheme = useMemo(
    () => themes.find((theme) => theme.name === selectedTheme),
    [selectedTheme]
  );

  return (
    <div className="bg-white text-[#16313B]">
      {/* =========================================================
          PAGE HERO
      ========================================================== */}
      <section className="relative overflow-hidden bg-[#073B4C] text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6C994E]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-56 right-0 h-[600px] w-[600px] rounded-full bg-[#F2B632]/10 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
              <Network size={15} className="text-[#F2B632]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                Explore the Ecosystem
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              One Ecosystem.
              <span className="block text-[#F2B632]">Many Pathways.</span>
              <span className="block text-[#9BC36B]">Shared Impact.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
              Explore the living IGATI ecosystem connecting communities,
              university, research, innovation, entrepreneurship, enterprises,
              markets, partners and opportunities.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("global-mission")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2B632] px-6 py-3.5 text-sm font-bold text-[#073B4C] transition-all hover:-translate-y-0.5 hover:bg-[#e1a520]"
              >
                Enter the Ecosystem
                <ArrowDown size={16} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("find-your-place")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.1]"
              >
                Find Your Place
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#6C994E] via-[#F2B632] to-[#6C994E]" />
      </section>

      {/* =========================================================
          PERSISTENT THEMATIC NAVIGATION
      ========================================================== */}
      <div className="sticky top-[90px] z-40 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl lg:top-[105px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {themes.map((theme) => {
              const Icon = theme.icon;
              const active = selectedTheme === theme.name;

              return (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => setSelectedTheme(theme.name)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                    active
                      ? "border-[#073B4C] bg-[#073B4C] text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#6C994E]/40 hover:text-[#073B4C]"
                  }`}
                >
                  <Icon
                    size={14}
                    className={active ? "text-[#F2B632]" : "text-[#6C994E]"}
                  />
                  {theme.name}
                </button>
              );
            })}
          </div>

          {currentTheme && (
            <div className="hidden border-t border-gray-100 py-2 lg:block">
              <p className="text-center text-[11px] text-gray-500">
                <span className="font-semibold text-[#073B4C]">
                  {currentTheme.name}:
                </span>{" "}
                {currentTheme.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================
          STEP 1 — GLOBAL MISSION
      ========================================================== */}
      <section
        id="global-mission"
        className="scroll-mt-44 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel number="01" text="Landing on the Global Mission" />

          <div className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Matthew 5:13–19
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#073B4C] sm:text-4xl">
                From inspiration to
                <span className="block text-[#6C994E]">
                  community transformation.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
                IGATI Global Mission Network is a people-centred ecosystem
                connecting communities, knowledge, enterprise, innovation,
                institutions and resources to turn local challenges into
                sustainable and scalable solutions.
              </p>
            </div>

            <div className="rounded-[28px] border border-gray-100 bg-[#F8FAF7] p-6 sm:p-8">
              <JourneyLine
                items={[
                  "Inspiration",
                  "Mission",
                  "Community Transformation",
                  "Ecosystem Building",
                  "Global Network",
                ]}
              />

              <div className="mt-8 border-t border-gray-200 pt-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D99A16]">
                  Geographic Journey
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["Meru County", "Kenya", "Africa", "Global"].map(
                    (location, index) => (
                      <div
                        key={location}
                        className="flex items-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => scrollToSection("geography")}
                          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-[#073B4C] transition-all hover:border-[#6C994E]/40 hover:bg-[#F4F8F0]"
                        >
                          {location}
                        </button>

                        {index < 3 && (
                          <ArrowRight
                            size={14}
                            className="text-[#6C994E]"
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <NextStep onClick={() => scrollToSection("geography")} />
        </div>
      </section>

      {/* =========================================================
          STEP 2 — GEOGRAPHY
      ========================================================== */}
      <section
        id="geography"
        className="scroll-mt-44 bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel number="02" text="Explore the Ecosystems" />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Explore where IGATI works.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Move from the wider African mission into the flagship community
              ecosystem in Meru County.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Drill-down pathway */}
            <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="space-y-3">
                {geography.map((item, index) => {
                  const active = activeGeo === item.name;

                  return (
                    <div key={item.name}>
                      <button
                        type="button"
                        onClick={() => setActiveGeo(item.name)}
                        className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                          active
                            ? "border-[#6C994E]/30 bg-[#F2F7EE]"
                            : "border-gray-100 bg-white hover:border-[#6C994E]/20"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                              active
                                ? "bg-[#6C994E] text-white"
                                : "bg-[#073B4C] text-[#F2B632]"
                            }`}
                          >
                            {index + 1}
                          </div>

                          <span className="text-sm font-bold text-[#073B4C]">
                            {item.name}
                          </span>
                        </div>

                        <ChevronRight
                          size={18}
                          className={
                            active ? "text-[#6C994E]" : "text-gray-300"
                          }
                        />
                      </button>

                      {index < geography.length - 1 && (
                        <div className="ml-5 h-4 w-px bg-[#6C994E]/25" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected location */}
            <div className="relative overflow-hidden rounded-[28px] bg-[#073B4C] p-7 text-white sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#6C994E]/20 blur-3xl" />

              <div className="relative">
                <MapPin size={25} className="text-[#F2B632]" />

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                  Selected Ecosystem
                </p>

                <h3 className="mt-3 text-2xl font-bold">{activeGeo}</h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {
                    geography.find((item) => item.name === activeGeo)
                      ?.description
                  }
                </p>

                {activeGeo === "Meru County" ||
                activeGeo === "MUST–IGATI Community Ecosystem" ? (
                  <button
                    type="button"
                    onClick={() => scrollToSection("must-igati")}
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F2B632] px-5 py-3 text-xs font-bold text-[#073B4C]"
                  >
                    Enter MUST–IGATI Ecosystem
                    <ArrowRight size={15} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <NextStep onClick={() => scrollToSection("must-igati")} />
        </div>
      </section>

      {/* =========================================================
          STEP 3 — MUST-IGATI
      ========================================================== */}
      <section
        id="must-igati"
        className="scroll-mt-44 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel
            number="03"
            text="MUST–IGATI Community Ecosystem"
          />

          <div className="mx-auto mt-6 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-[#073B4C] sm:text-4xl lg:text-5xl">
              Experience the MUST–IGATI
              <span className="block text-[#6C994E]">
                Community Ecosystem.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
              A living ecosystem where community challenges, university
              knowledge, innovation, enterprise, markets and opportunity meet.
            </p>
          </div>

          {/* Connected node network */}
          <div className="mt-12 rounded-[32px] border border-gray-100 bg-[#F8FAF7] p-5 sm:p-8 lg:p-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {ecosystemNodes.map((node) => {
                const Icon = node.icon;
                const active = selectedNode === node.name;

                return (
                  <button
                    key={node.name}
                    type="button"
                    onClick={() => setSelectedNode(node.name)}
                    className={`group rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                      active
                        ? "border-[#6C994E]/40 bg-[#073B4C] text-white shadow-xl"
                        : "border-gray-100 bg-white hover:border-[#6C994E]/30"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        active
                          ? "bg-[#F2B632] text-[#073B4C]"
                          : "bg-[#6C994E]/10 text-[#6C994E]"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <p
                      className={`mt-4 text-sm font-bold ${
                        active ? "text-white" : "text-[#073B4C]"
                      }`}
                    >
                      {node.name}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected relationship */}
            {currentNode && (
              <div className="mt-8 rounded-[26px] bg-[#073B4C] p-6 text-white sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                      Selected Node
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {currentNode.name}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/60">
                      {currentNode.description}
                    </p>
                  </div>

                  <ArrowRight className="hidden text-[#F2B632] lg:block" />

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#9BC36B]">
                      Connected To
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {currentNode.connectsTo.map((connection) => (
                        <button
                          key={connection}
                          type="button"
                          onClick={() => setSelectedNode(connection)}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.1]"
                        >
                          {connection}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bee hive exact worked example */}
          <div className="mt-8 rounded-[28px] border border-[#F2B632]/30 bg-[#FFF9EC] p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D99A16]">
              Worked Ecosystem Example
            </p>

            <h3 className="mt-3 text-xl font-bold text-[#073B4C]">
              One Million Productive Bee Hives
            </h3>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {[
                "Community",
                "Farmers",
                "MUST",
                "Researchers",
                "Trainers",
                "Enterprises",
                "Innovation",
                "Markets",
                "Investors",
                "Impact",
              ].map((item, index, array) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#073B4C] shadow-sm">
                    {item}
                  </span>

                  {index < array.length - 1 && (
                    <ArrowRight size={13} className="text-[#6C994E]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <NextStep onClick={() => scrollToSection("living-labs")} />
        </div>
      </section>

      {/* =========================================================
          STEP 4 — LIVING LABS
      ========================================================== */}
      <section
        id="living-labs"
        className="scroll-mt-44 bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel number="04" text="Living Laboratories" />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Explore active living laboratories.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Select a laboratory to explore how challenge, community,
              intervention, people, innovation, enterprise, research, resources
              and impact connect.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {labs.map((lab) => {
              const Icon = lab.icon;
              const active = selectedLab === lab.name;

              return (
                <button
                  key={lab.name}
                  type="button"
                  onClick={() => setSelectedLab(lab.name)}
                  className={`rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? "border-[#6C994E]/40 bg-[#073B4C] text-white shadow-xl"
                      : "border-gray-100 bg-white hover:-translate-y-1 hover:border-[#6C994E]/30"
                  }`}
                >
                  <Icon
                    size={22}
                    className={
                      active ? "text-[#F2B632]" : "text-[#6C994E]"
                    }
                  />

                  <p
                    className={`mt-4 text-sm font-bold leading-6 ${
                      active ? "text-white" : "text-[#073B4C]"
                    }`}
                  >
                    {lab.name}
                  </p>

                  <p
                    className={`mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      active ? "text-[#9BC36B]" : "text-gray-400"
                    }`}
                  >
                    {lab.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {currentLab && (
            <div className="mt-8 rounded-[30px] bg-white p-6 shadow-sm sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6C994E]">
                    Selected Living Laboratory
                  </p>

                  <h3 className="mt-3 text-2xl font-bold text-[#073B4C]">
                    {currentLab.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {currentLab.description}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D99A16]">
                    Living Laboratory Journey
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {currentLab.journey.map((item, index, array) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="rounded-xl border border-gray-100 bg-[#F8FAF7] px-3 py-2 text-[11px] font-semibold text-[#073B4C]">
                          {item}
                        </span>

                        {index < array.length - 1 && (
                          <ChevronRight size={13} className="text-[#6C994E]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <NextStep onClick={() => scrollToSection("projects")} />
        </div>
      </section>

      {/* =========================================================
          STEP 5 — PROJECTS
      ========================================================== */}
      <section
        id="projects"
        className="scroll-mt-44 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel number="05" text="Explore Projects & Communities" />

          <div className="mt-8 rounded-[30px] border border-gray-100 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <h2 className="text-3xl font-bold text-[#073B4C]">
                  Discover what is happening.
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  This directory will eventually be powered by the backend and
                  allow visitors to search projects, programmes, communities,
                  groups, enterprises and community initiatives.
                </p>

                <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-[#F8FAF7] px-4 py-3">
                  <Search size={17} className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search projects, communities or programmes..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "What is it?",
                  "Where is it?",
                  "What problem does it address?",
                  "Who is involved?",
                  "What is happening now?",
                  "Who are the partners?",
                  "What resources are required?",
                  "What has been achieved?",
                  "What opportunities are available?",
                ].map((question, index) => (
                  <div
                    key={question}
                    className="flex gap-3 rounded-xl bg-[#F8FAF7] p-4"
                  >
                    <span className="text-xs font-bold text-[#6C994E]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-xs font-semibold text-[#073B4C]">
                      {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <NextStep onClick={() => scrollToSection("people")} />
        </div>
      </section>

      {/* =========================================================
          STEP 6 — PEOPLE
      ========================================================== */}
      <section
        id="people"
        className="scroll-mt-44 bg-[#073B4C] py-20 text-white sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel
            number="06"
            text="Explore People & Organisations"
            dark
          />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Discover the people behind
              <span className="text-[#9BC36B]"> the ecosystem.</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Profiles will connect people and organisations directly to their
              laboratories, projects, expertise and opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              "Farmers",
              "Students",
              "Researchers",
              "Entrepreneurs",
              "Innovators",
              "Community Groups",
              "CBOs",
              "NGOs",
              "Institutions",
              "Investors",
              "Partners",
              "Mentors",
              "Volunteers",
            ].map((person) => (
              <div
                key={person}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition-all hover:bg-white/[0.08]"
              >
                <Users size={19} className="text-[#F2B632]" />

                <p className="mt-4 text-sm font-bold">{person}</p>

                <p className="mt-2 text-xs leading-6 text-white/45">
                  Profile → Work → Location → Ecosystem → Projects → Expertise →
                  Opportunities
                </p>
              </div>
            ))}
          </div>

          <NextStep
            dark
            onClick={() => scrollToSection("knowledge")}
          />
        </div>
      </section>

      {/* =========================================================
          STEP 7 — KNOWLEDGE
      ========================================================== */}
      <section
        id="knowledge"
        className="scroll-mt-44 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel
            number="07"
            text="Explore Innovation & Knowledge"
          />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Connect community work
              <span className="text-[#6C994E]"> to knowledge.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {knowledgeStreams.map((stream) => {
              const Icon = stream.icon;

              return (
                <div
                  key={stream.title}
                  className="rounded-[24px] border border-gray-100 bg-[#F8FAF7] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#073B4C] text-[#F2B632]">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#073B4C]">
                    {stream.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-gray-500">
                    {stream.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-[26px] bg-[#F2F7EE] p-6 sm:p-8">
            <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#6C994E]">
              The Knowledge Loop
            </p>

            <JourneyLine
              items={[
                "Community Challenge",
                "Research",
                "Innovation",
                "Solution",
                "Enterprise",
                "Impact",
                "New Knowledge",
              ]}
            />
          </div>

          <NextStep onClick={() => scrollToSection("opportunities")} />
        </div>
      </section>

      {/* =========================================================
          STEP 8 — OPPORTUNITIES
      ========================================================== */}
      <section
        id="opportunities"
        className="scroll-mt-44 bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel number="08" text="Explore Opportunities" />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Discover opportunities to participate.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Live opportunities will later come from the backend with
              eligibility, location, requirements, status, deadlines and
              application methods.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity}
                className="rounded-2xl border border-gray-100 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-lg"
              >
                <CircleDollarSign
                  size={21}
                  className="mx-auto text-[#6C994E]"
                />

                <p className="mt-4 text-sm font-bold text-[#073B4C]">
                  {opportunity}
                </p>
              </div>
            ))}
          </div>

          <NextStep onClick={() => scrollToSection("find-your-place")} />
        </div>
      </section>

      {/* =========================================================
          STEP 9 — FIND YOUR PLACE
      ========================================================== */}
      <section
        id="find-your-place"
        className="scroll-mt-44 py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel
            number="09"
            text="Find Your Place in the Ecosystem"
          />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D99A16]">
              I Am A...
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#073B4C] sm:text-4xl">
              Where do you fit?
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Choose your identity and discover the parts of the ecosystem most
              relevant to you.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {identities.map((identity) => {
              const Icon = identity.icon;
              const active = selectedIdentity === identity.name;

              return (
                <button
                  key={identity.name}
                  type="button"
                  onClick={() => setSelectedIdentity(identity.name)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                    active
                      ? "border-[#073B4C] bg-[#073B4C] text-white"
                      : "border-gray-200 bg-white text-[#073B4C] hover:border-[#6C994E]/40"
                  }`}
                >
                  <Icon
                    size={17}
                    className={
                      active ? "text-[#F2B632]" : "text-[#6C994E]"
                    }
                  />

                  {identity.name}
                </button>
              );
            })}
          </div>

          {currentIdentity && (
            <div className="mx-auto mt-10 max-w-4xl rounded-[30px] bg-[#073B4C] p-7 text-white sm:p-9">
              <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                    Your Ecosystem Path
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    I am a {currentIdentity.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    Based on this identity, the platform can prioritize the
                    programmes, people, knowledge, opportunities and markets
                    most relevant to your journey.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {currentIdentity.recommendations.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4"
                    >
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-[#9BC36B]"
                      />

                      <span className="text-xs font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <NextStep onClick={() => scrollToSection("take-action")} />
        </div>
      </section>

      {/* =========================================================
          STEP 10 — TAKE ACTION
      ========================================================== */}
      <section
        id="take-action"
        className="scroll-mt-44 bg-[#073B4C] py-20 text-white sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StepLabel number="10" text="Take Action" dark />

          <div className="mx-auto mt-6 max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Your place is
              <span className="text-[#9BC36B]"> here.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Every journey through the ecosystem should lead to meaningful
              participation.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <ActionCard
              title="Join the Network"
              description="Register and become part of the IGATI Global Mission Network."
              to="/join"
              icon={Network}
            />

            <ActionCard
              title="Explore Market & Exchange"
              description="Discover products, services, enterprises, producers, buyers and value chains."
              to="/marketplace"
              icon={CircleDollarSign}
            />

            <ActionCard
              title="Partnership & Investment"
              description="Connect projects and ecosystem actors with partners, investors, sponsors and resource opportunities."
              to="/join"
              icon={Handshake}
            />

            <ActionCard
              title="Support a Project"
              description="Find a project, understand its needs and contribute resources, expertise, technology, markets or funding."
              to="/projects"
              icon={HandHeart}
            />
          </div>

          <div className="mt-14 border-t border-white/10 pt-8 text-center">
            <p className="text-sm font-semibold italic text-white/65">
              “You are the salt of the earth... you are the light of the
              world... let your light shine.”
            </p>

            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
              Matthew 5:13–19
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

/* =============================================================
   SHARED COMPONENTS
============================================================= */

const StepLabel = ({ number, text, dark = false }) => {
  return (
    <div className="flex justify-center">
      <div
        className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 ${
          dark
            ? "border-white/10 bg-white/[0.05]"
            : "border-[#6C994E]/15 bg-[#F2F7EE]"
        }`}
      >
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${
            dark
              ? "bg-[#F2B632] text-[#073B4C]"
              : "bg-[#073B4C] text-[#F2B632]"
          }`}
        >
          {number}
        </span>

        <span
          className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
            dark ? "text-white/65" : "text-[#527A3A]"
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

const JourneyLine = ({ items }) => {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <div key={item} className="flex items-center gap-2">
          <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-xs font-bold text-[#073B4C] shadow-sm">
            {item}
          </div>

          {index < items.length - 1 && (
            <ArrowRight
              size={15}
              className="shrink-0 text-[#6C994E]"
            />
          )}
        </div>
      ))}
    </div>
  );
};

const NextStep = ({ onClick, dark = false }) => {
  return (
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className={`group flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] ${
          dark ? "text-white/45" : "text-gray-400"
        }`}
      >
        Continue Exploring

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all group-hover:translate-y-1 ${
            dark
              ? "border-white/10 bg-white/[0.05] text-[#F2B632]"
              : "border-gray-200 bg-white text-[#6C994E]"
          }`}
        >
          <ArrowDown size={15} />
        </span>
      </button>
    </div>
  );
};

const ActionCard = ({ title, description, to, icon: Icon }) => {
  return (
    <Link
      to={to}
      className="group rounded-[24px] border border-white/10 bg-white/[0.05] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#F2B632]/30 hover:bg-white/[0.08] sm:p-7"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2B632] text-[#073B4C]">
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-white/50">
        {description}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#F2B632]">
        Explore

        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
};

export default EcosystemPage;