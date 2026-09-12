import {
  useEffect,
  useMemo,
  useState,
} from "react";

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
  LoaderCircle,
  MapPin,
  Network,
  Search,
  Sprout,
  Target,
  Telescope,
  Users,
  Wheat,
} from "lucide-react";

import { ecosystemApi } from "../api/ecosystemApi";

const EcosystemPage = () => {
  // =========================================================
  // UI STATE
  // =========================================================

  const [activeGeo, setActiveGeo] = useState("Meru County");

  const [selectedNode, setSelectedNode] = useState("Communities");

  const [selectedLab, setSelectedLab] = useState(null);

  const [selectedIdentity, setSelectedIdentity] = useState("Farmer");

  const [selectedTheme, setSelectedTheme] = useState(null);

  const [projectSearch, setProjectSearch] = useState("");

  // =========================================================
  // BACKEND DATA
  // =========================================================

  const [themes, setThemes] = useState([]);

  const [locations, setLocations] = useState([]);

  const [communities, setCommunities] = useState([]);

  const [labs, setLabs] = useState([]);

  const [projects, setProjects] = useState([]);

  const [people, setPeople] = useState([]);

  const [matchedPeople, setMatchedPeople] = useState([]);

  const [organisations, setOrganisations] = useState([]);

  const [programmes, setProgrammes] = useState([]);

  const [research, setResearch] = useState([]);

  const [markets, setMarkets] = useState([]);

  const [innovations, setInnovations] = useState([]);

  const [knowledgeOutputs, setKnowledgeOutputs] = useState([]);

  const [opportunities, setOpportunities] = useState([]);

  const [impact, setImpact] = useState([]);


  // =========================================================
  // LOADING / ERROR
  // =========================================================

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  // =========================================================
  // ICON MAP
  // Backend sends names/data.
  // React still decides which Lucide icon to render.
  // =========================================================

  const themeIconMap = {
    "Agriculture & Food Systems": Wheat,

    "Apiculture & Environmental Sustainability": Leaf,

    "Value Addition & Manufacturing": Factory,

    "Social Entrepreneurship & Enterprise Development": Building2,

    "Youth & Young Mothers": Users,

    "Innovation, Technology & Digital Transformation": Lightbulb,

    "Research, Knowledge & Learning": Telescope,

    "Partnerships, Investment & Resource Mobilisation": Handshake,

    "Markets & Exchange": CircleDollarSign,

    "Community & Global Transformation": Globe2,
  };


  const labIconMap = {
    "One Million Productive Bee Hives": Leaf,
    "Smart Agriculture": Wheat,
    "Value Addition & Manufacturing": Factory,
    "Social Entrepreneurship": HeartHandshake,
    "Young Mothers Social Enterprise": HandHeart,
    "Innovation & Technology": Lightbulb,
    "Research & Knowledge": Telescope,
    "Emerging Living Laboratories": Sprout,
  };


  // =========================================================
  // SCROLL
  // =========================================================

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  // =========================================================
  // LOAD INITIAL ECOSYSTEM DATA
  // =========================================================

  useEffect(() => {
    const loadEcosystem = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          overviewResponse,
          locationsResponse,
          communitiesResponse,
          peopleResponse,
          organisationsResponse,
          programmesResponse,
          researchResponse,
          innovationsResponse,
          knowledgeResponse,
          marketsResponse,
          impactResponse,
        ] = await Promise.all([
          ecosystemApi.overview(),
          ecosystemApi.locations(),
          ecosystemApi.communities(),
          ecosystemApi.people(),
          ecosystemApi.organisations(),
          ecosystemApi.programmes(),
          ecosystemApi.research(),
          ecosystemApi.innovations(),
          ecosystemApi.knowledge(),
          ecosystemApi.markets(),
          ecosystemApi.impact("?verified=true"),
        ]);

        const loadedThemes =
          overviewResponse?.themes || [];

        const loadedLabs =
          overviewResponse?.living_laboratories || [];

        const loadedProjects =
          overviewResponse?.projects || [];

        const loadedOpportunities =
          overviewResponse?.opportunities || [];


        setThemes(loadedThemes);

        setLabs(loadedLabs);

        setProjects(loadedProjects);

        setOpportunities(loadedOpportunities);

        setLocations(
          locationsResponse?.locations || []
        );

        setCommunities(
          communitiesResponse?.communities || []
        );

        const loadedPeople =
          peopleResponse?.people || [];

        setPeople(loadedPeople);

        setMatchedPeople(
          loadedPeople.filter(
            (person) => person.person_type === "farmer"
          )
        );

        setOrganisations(
          organisationsResponse?.organisations || []
        );

        setProgrammes(
          programmesResponse?.programmes || []
        );

        setResearch(
          researchResponse?.research || []
        );

        setInnovations(
          innovationsResponse?.innovations || []
        );

        setKnowledgeOutputs(
          knowledgeResponse?.knowledge || []
        );

        setMarkets(
          marketsResponse?.markets || []
        );

        setImpact(
          impactResponse?.impact || []
        );


        if (loadedThemes.length > 0) {
          setSelectedTheme(loadedThemes[0].name);
        }

        if (loadedLabs.length > 0) {
          setSelectedLab(loadedLabs[0].slug);
        }
      } catch (err) {
        console.error(
          "Failed to load ecosystem:",
          err
        );

        setError(
          err.message ||
            "Unable to load ecosystem information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEcosystem();
  }, []);


  // =========================================================
  // PROJECT SEARCH
  // =========================================================

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        let query = "?";

        if (projectSearch.trim()) {
          query += `search=${encodeURIComponent(
            projectSearch.trim()
          )}&`;
        }

        const currentThemeObject =
          themes.find(
            (theme) =>
              theme.name === selectedTheme
          );

        if (currentThemeObject?.slug) {
          query += `theme=${encodeURIComponent(
            currentThemeObject.slug
          )}&`;
        }

        const response =
          await ecosystemApi.projects(query);

        setProjects(response?.projects || []);
      } catch (err) {
        console.error(
          "Project search failed:",
          err
        );
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [
    projectSearch,
    selectedTheme,
    themes,
  ]);


  // =========================================================
  // IDENTITY DEFINITIONS
  //
  // These are UI personas rather than CMS records,
  // so keeping these client-side is appropriate.
  // =========================================================

  const identities = [
    {
      name: "Farmer",
      apiType: "farmer",
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
      apiType: "student",
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
      apiType: "researcher",
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
      apiType: "entrepreneur",
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
      apiType: "innovator",
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
      apiType: "investor",
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
      apiType: "partner",
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
      apiType: "organisation",
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
      apiType: "community_member",
      icon: Users,
      recommendations: [
        "Community Projects",
        "Training",
        "Enterprise Opportunities",
        "Participation",
      ],
    },
  ];


  // =========================================================
  // ECOSYSTEM NODE UI
  // =========================================================

  const ecosystemNodes = [
    {
      name: "Communities",
      icon: Users,
      description:
        "Community challenges, needs, knowledge, opportunities and participation form the starting point.",
      connectsTo: [
        "Projects",
        "People",
        "Research",
        "Impact",
      ],
      count: communities.length,
    },

    {
      name: "Projects",
      icon: Target,
      description:
        "Projects translate community challenges into practical interventions and action.",
      connectsTo: [
        "Communities",
        "Programmes",
        "People",
        "Opportunities",
      ],
      count: projects.length,
    },

    {
      name: "Programmes",
      icon: BookOpen,
      description:
        "Programmes coordinate long-term interventions, training, learning and community transformation.",
      connectsTo: [
        "Projects",
        "Institutions",
        "People",
        "Impact",
      ],
      count: programmes.length,
    },

    {
      name: "People",
      icon: Users,
      description:
        "Farmers, students, researchers, entrepreneurs, mentors, investors and partners make the ecosystem work.",
      connectsTo: [
        "Projects",
        "Institutions",
        "Opportunities",
        "Research",
      ],
      count: people.length,
    },

    {
      name: "Institutions",
      icon: Landmark,
      description:
        "Universities, community organisations, government, NGOs, businesses and partners contribute capabilities.",
      connectsTo: [
        "People",
        "Research",
        "Enterprises",
        "Opportunities",
      ],
      count: organisations.length,
    },

    {
      name: "Enterprises",
      icon: Building2,
      description:
        "Enterprises create livelihoods and connect practical solutions with sustainable economic activity.",
      connectsTo: [
        "Innovations",
        "Markets",
        "People",
        "Impact",
      ],
      count: organisations.filter(
        (organisation) =>
          organisation.organisation_type ===
          "enterprise"
      ).length,
    },

    {
      name: "Innovations",
      icon: Lightbulb,
      description:
        "Technologies, products, processes and social innovations emerge from practical challenges and knowledge.",
      connectsTo: [
        "Research",
        "Enterprises",
        "Projects",
        "Impact",
      ],
      count: innovations.length,
    },

    {
      name: "Research",
      icon: Telescope,
      description:
        "Research connects university knowledge and community realities to evidence, experimentation and learning.",
      connectsTo: [
        "Innovations",
        "Communities",
        "People",
        "Impact",
      ],
      count: research.length,
    },

    {
      name: "Opportunities",
      icon: CircleDollarSign,
      description:
        "Training, funding, research, partnerships, mentorship, markets and investment opportunities.",
      connectsTo: [
        "People",
        "Projects",
        "Institutions",
        "Enterprises",
      ],
      count: opportunities.length,
    },

    {
      name: "Impact",
      icon: Sprout,
      description:
        "The ecosystem ultimately seeks sustainable community and socio-economic transformation.",
      connectsTo: [
        "Communities",
        "Projects",
        "Enterprises",
        "Research",
      ],
      count: impact.length,
    },
  ];


  // =========================================================
  // GEOGRAPHY
  // =========================================================

  const geography = useMemo(() => {
    if (!locations.length) {
      return [];
    }

    return locations.map((location) => ({
      id: location.id,
      name: location.name,
      slug: location.slug,
      description:
        location.description ||
        `${location.name} is part of the IGATI ecosystem.`,
      location_type:
        location.location_type,
    }));
  }, [locations]);


  // =========================================================
  // KNOWLEDGE STREAM UI
  // =========================================================

  const knowledgeStreams = [
    {
      title: "Research",
      icon: Telescope,
      text: "Research projects, student research, academic research and community research.",
      count: research.length,
    },

    {
      title: "Innovation",
      icon: Lightbulb,
      text: "Technologies, products, processes and social innovations.",
      count: innovations.length,
    },

    {
      title: "Community Knowledge",
      icon: Users,
      text: "Indigenous knowledge, farmer knowledge, community solutions and local practices.",
      count: knowledgeOutputs.filter(
        (item) =>
          item.knowledge_type ===
            "community_knowledge" ||
          item.knowledge_type ===
            "indigenous_knowledge"
      ).length,
    },

    {
      title: "Knowledge Outputs",
      icon: BookOpen,
      text: "Publications, reports, case studies, learning briefs, data and stories.",
      count: knowledgeOutputs.length,
    },
  ];


  // =========================================================
  // FIND MY PLACE
  // =========================================================

  const handleIdentityChange = async (identity) => {
    setSelectedIdentity(identity.name);

    try {
      const response = await ecosystemApi.people(
        `?person_type=${encodeURIComponent(identity.apiType)}`
      );

      setMatchedPeople(response?.people || []);
    } catch (err) {
      console.error("Unable to personalize ecosystem:", err);
      setMatchedPeople([]);
    }
  };


  // =========================================================
  // SELECTED DATA
  // =========================================================

  const currentNode = useMemo(
    () =>
      ecosystemNodes.find(
        (node) =>
          node.name === selectedNode
      ),
    [
      selectedNode,
      communities,
      projects,
      people,
      organisations,
      programmes,
      innovations,
      research,
      markets,
      opportunities,
      impact,
    ]
  );


  const currentLab = useMemo(
    () =>
      labs.find(
        (lab) =>
          lab.slug === selectedLab
      ),
    [
      labs,
      selectedLab,
    ]
  );


  const currentIdentity = useMemo(
    () =>
      identities.find(
        (identity) =>
          identity.name ===
          selectedIdentity
      ),
    [selectedIdentity]
  );


  const currentTheme = useMemo(
    () =>
      themes.find(
        (theme) =>
          theme.name === selectedTheme
      ),
    [
      themes,
      selectedTheme,
    ]
  );


  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white">
        <div className="text-center">
          <LoaderCircle
            size={40}
            className="mx-auto animate-spin text-[#6C994E]"
          />

          <p className="mt-4 text-sm font-semibold text-[#073B4C]">
            Loading the IGATI ecosystem...
          </p>
        </div>
      </div>
    );
  }


  // =========================================================
  // ERROR SCREEN
  // =========================================================

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Network
              size={24}
              className="text-red-500"
            />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#073B4C]">
            Unable to load the ecosystem
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-xl bg-[#073B4C] px-5 py-3 text-sm font-bold text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

            {/* <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
            </div> */}
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-[#6C994E] via-[#F2B632] to-[#6C994E]" />
      </section>

      {/* =========================================================
          PERSISTENT THEMATIC NAVIGATION
      ========================================================== */}
      {/* <div className="sticky top-[90px] z-40 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl lg:top-[105px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {themes.map((theme) => {
              const Icon = themeIconMap[theme.name] || Sprout;
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
      </div> */}

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
                From word inspiration to
                <span className="block text-[#6C994E]">
                  communities transformation.
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

          {/* <NextStep onClick={() => scrollToSection("geography")} /> */}
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
            {labs.length > 0 ? (
              labs.map((lab) => {
                const Icon = labIconMap[lab.name] || Sprout;
                const active = selectedLab === lab.slug;

                return (
                  <button
                    key={lab.id}
                    type="button"
                    onClick={() => setSelectedLab(lab.slug)}
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
                      {lab.tagline || lab.status_display || "Living Laboratory"}
                    </p>
                  </button>
                );
              })
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
                <Sprout size={25} className="mx-auto text-gray-300" />
                <p className="mt-4 text-sm font-semibold text-[#073B4C]">
                  No living laboratories have been published yet.
                </p>
              </div>
            )}
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

                  {currentLab.tagline && (
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#D99A16]">
                      {currentLab.tagline}
                    </p>
                  )}

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {currentLab.summary ||
                      "Explore this living laboratory and the people, communities, research, innovation and opportunities connected to it."}
                  </p>

                  {currentLab.communities?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Communities
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {currentLab.communities.map((community) => (
                          <span
                            key={community.id}
                            className="rounded-full bg-[#F2F7EE] px-3 py-2 text-[11px] font-semibold text-[#527A3A]"
                          >
                            {community.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentLab.partners?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                        Partners
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {currentLab.partners.map((partner) => (
                          <span
                            key={partner.id}
                            className="rounded-full border border-gray-200 px-3 py-2 text-[11px] font-semibold text-[#073B4C]"
                          >
                            {partner.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#D99A16]">
                    Living Laboratory Journey
                  </p>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        label: "Challenge",
                        value: currentLab.challenge,
                      },
                      {
                        label: "Intervention",
                        value: currentLab.intervention,
                      },
                      {
                        label: "Innovation",
                        value: currentLab.innovation_summary,
                      },
                      {
                        label: "Enterprise / Value Chain",
                        value: currentLab.enterprise_value_chain,
                      },
                      {
                        label: "Research & Learning",
                        value: currentLab.research_learning,
                      },
                      {
                        label: "Investment / Resources",
                        value: currentLab.investment_resources,
                      },
                      {
                        label: "Results & Impact",
                        value: currentLab.results_impact,
                      },
                      {
                        label: "Scale",
                        value: currentLab.scale,
                      },
                    ]
                      .filter((item) => item.value)
                      .map((item, index) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-gray-100 bg-[#F8FAF7] p-4"
                        >
                          <div className="flex gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#073B4C] text-[10px] font-bold text-[#F2B632]">
                              {index + 1}
                            </span>

                            <div>
                              <p className="text-xs font-bold text-[#073B4C]">
                                {item.label}
                              </p>

                              <p className="mt-2 text-xs leading-6 text-gray-500">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    {![
                      currentLab.challenge,
                      currentLab.intervention,
                      currentLab.innovation_summary,
                      currentLab.enterprise_value_chain,
                      currentLab.research_learning,
                      currentLab.investment_resources,
                      currentLab.results_impact,
                      currentLab.scale,
                    ].some(Boolean) && (
                      <div className="rounded-2xl border border-dashed border-gray-200 bg-[#F8FAF7] p-6 text-center">
                        <p className="text-xs text-gray-500">
                          Journey details will appear here as they are added to
                          the backend.
                        </p>
                      </div>
                    )}
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
                  Search active projects and discover the communities, living
                  laboratories, themes and programmes connected to them.
                </p>

                <div className="mt-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-[#F8FAF7] px-4 py-3">
                  <Search size={17} className="text-gray-400" />

                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search projects, communities or programmes..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  />
                </div>

                {currentTheme && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">
                      Theme:
                    </span>

                    <span className="rounded-full bg-[#F2F7EE] px-3 py-1.5 text-[10px] font-bold text-[#527A3A]">
                      {currentTheme.name}
                    </span>
                  </div>
                )}
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

          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6C994E]">
                  Live Project Directory
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#073B4C]">
                  Projects
                </h3>
              </div>

              <span className="rounded-full bg-[#F8FAF7] px-3 py-2 text-xs font-semibold text-gray-500">
                {projects.length} {projects.length === 1 ? "result" : "results"}
              </span>
            </div>

            {projects.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group overflow-hidden rounded-[22px] border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-lg"
                  >
                    {project.image ? (
                      <div className="overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-[#F2F7EE]">
                        <Target size={34} className="text-[#6C994E]/50" />
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {project.status_display && (
                          <span className="rounded-full bg-[#F2F7EE] px-2.5 py-1 text-[9px] font-bold uppercase text-[#527A3A]">
                            {project.status_display}
                          </span>
                        )}

                        {project.location && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-[9px] font-semibold text-gray-500">
                            <MapPin size={10} />
                            {project.location.name}
                          </span>
                        )}
                      </div>

                      <h4 className="mt-4 text-lg font-bold text-[#073B4C]">
                        {project.title}
                      </h4>

                      <p className="mt-3 line-clamp-3 text-xs leading-6 text-gray-500">
                        {project.description ||
                          project.problem_addressed ||
                          "Explore this project and its connected ecosystem."}
                      </p>

                      {project.themes?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.themes.slice(0, 3).map((theme) => (
                            <span
                              key={theme.id}
                              className="rounded-full border border-gray-100 px-2.5 py-1 text-[9px] font-semibold text-gray-400"
                            >
                              {theme.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#6C994E]">
                        Explore project
                        <ArrowRight
                          size={13}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-[#F8FAF7] p-10 text-center">
                <Search size={25} className="mx-auto text-gray-300" />

                <p className="mt-4 text-sm font-semibold text-[#073B4C]">
                  No projects found
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Try another search term or select a different theme.
                </p>
              </div>
            )}
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
              Explore public profiles and organisations connected to projects,
              living laboratories, research, communities and opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {people.length > 0 ? (
              people.slice(0, 6).map((person) => (
                <div
                  key={person.id}
                  className="rounded-[22px] border border-white/10 bg-white/[0.05] p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <div className="flex items-center gap-4">
                    {person.profile_image ? (
                      <img
                        src={person.profile_image}
                        alt={person.full_name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F2B632] text-[#073B4C]">
                        <Users size={19} />
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-white">
                        {person.full_name}
                      </h3>

                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#9BC36B]">
                        {person.person_type_display || person.person_type}
                      </p>
                    </div>
                  </div>

                  {person.role && (
                    <p className="mt-4 text-xs leading-6 text-white/55">
                      {person.role}
                    </p>
                  )}

                  {person.expertise && (
                    <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/45">
                      {person.expertise}
                    </p>
                  )}

                  {person.location && (
                    <div className="mt-4 flex items-center gap-2 text-[11px] text-white/40">
                      <MapPin size={12} />
                      {person.location.name}
                    </div>
                  )}

                  {person.organisations?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {person.organisations.slice(0, 2).map((organisation) => (
                        <span
                          key={organisation.id}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold text-white/50"
                        >
                          {organisation.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-[24px] border border-dashed border-white/15 bg-white/[0.04] p-10 text-center">
                <Users size={28} className="mx-auto text-white/30" />
                <p className="mt-4 text-sm font-semibold">
                  No public people profiles have been published yet.
                </p>
              </div>
            )}
          </div>

          {organisations.length > 0 && (
            <div className="mt-12 border-t border-white/10 pt-10">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                    Organisations
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Institutions, enterprises and partners
                  </h3>
                </div>

                <span className="text-xs text-white/40">
                  {organisations.length} public organisations
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {organisations.slice(0, 8).map((organisation) => (
                  <div
                    key={organisation.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                  >
                    <Landmark size={18} className="text-[#F2B632]" />

                    <p className="mt-4 text-sm font-bold">
                      {organisation.name}
                    </p>

                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9BC36B]">
                      {organisation.organisation_type_display ||
                        organisation.organisation_type}
                    </p>

                    {organisation.location && (
                      <div className="mt-3 flex items-center gap-2 text-[10px] text-white/40">
                        <MapPin size={11} />
                        {organisation.location.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Research, innovation and community knowledge are connected to the
              projects, people and communities where learning happens.
            </p>
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

                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <p className="text-2xl font-bold text-[#6C994E]">
                      {stream.count}
                    </p>

                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                      Available records
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {(research.length > 0 ||
            innovations.length > 0 ||
            knowledgeOutputs.length > 0) && (
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#073B4C]">
                    Latest Research
                  </h3>
                  <Telescope size={18} className="text-[#6C994E]" />
                </div>

                <div className="mt-5 space-y-3">
                  {research.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-[#F8FAF7] p-4"
                    >
                      <p className="text-xs font-bold text-[#073B4C]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-gray-400">
                        {item.research_type_display || item.research_type}
                      </p>
                    </div>
                  ))}

                  {research.length === 0 && (
                    <p className="text-xs text-gray-400">
                      No research records published yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#073B4C]">
                    Innovations
                  </h3>
                  <Lightbulb size={18} className="text-[#D99A16]" />
                </div>

                <div className="mt-5 space-y-3">
                  {innovations.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-[#F8FAF7] p-4"
                    >
                      <p className="text-xs font-bold text-[#073B4C]">
                        {item.name}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-gray-400">
                        {item.status_display || item.status}
                      </p>
                    </div>
                  ))}

                  {innovations.length === 0 && (
                    <p className="text-xs text-gray-400">
                      No innovation records published yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#073B4C]">
                    Knowledge Outputs
                  </h3>
                  <BookOpen size={18} className="text-[#6C994E]" />
                </div>

                <div className="mt-5 space-y-3">
                  {knowledgeOutputs.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl bg-[#F8FAF7] p-4"
                    >
                      <p className="text-xs font-bold text-[#073B4C]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-gray-400">
                        {item.knowledge_type_display || item.knowledge_type}
                      </p>
                    </div>
                  ))}

                  {knowledgeOutputs.length === 0 && (
                    <p className="text-xs text-gray-400">
                      No knowledge outputs published yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

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
              Explore live opportunities for training, research, funding,
              investment, partnership, mentorship, markets, volunteering and
              innovation challenges.
            </p>
          </div>

          <div className="mt-12">
            {opportunities.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {opportunities.map((opportunity) => (
                  <Link
                    key={opportunity.id}
                    to={`/opportunities/${opportunity.slug}`}
                    className="group rounded-[24px] border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#6C994E]/30 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F7EE] text-[#6C994E]">
                        <CircleDollarSign size={20} />
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-[9px] font-bold uppercase ${
                          opportunity.status === "open"
                            ? "bg-green-50 text-green-700"
                            : opportunity.status === "upcoming"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {opportunity.status_display || opportunity.status}
                      </span>
                    </div>

                    <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#D99A16]">
                      {opportunity.opportunity_type_display ||
                        opportunity.opportunity_type}
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-[#073B4C]">
                      {opportunity.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-xs leading-6 text-gray-500">
                      {opportunity.description}
                    </p>

                    {opportunity.location && (
                      <div className="mt-4 flex items-center gap-2 text-[11px] text-gray-400">
                        <MapPin size={12} />
                        {opportunity.location.name}
                      </div>
                    )}

                    {opportunity.deadline && (
                      <p className="mt-3 text-[11px] text-gray-400">
                        Deadline:{" "}
                        {new Date(opportunity.deadline).toLocaleDateString()}
                      </p>
                    )}

                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#6C994E]">
                      View Opportunity
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
                <CircleDollarSign
                  size={26}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-sm font-semibold text-[#073B4C]">
                  No open opportunities currently.
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  New opportunities will appear here when they are published.
                </p>
              </div>
            )}
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
              Choose your identity and discover the people and opportunities
              most relevant to your place in the ecosystem.
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
                  onClick={() => handleIdentityChange(identity)}
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
            <div className="mx-auto mt-10 max-w-5xl rounded-[30px] bg-[#073B4C] p-7 text-white sm:p-9">
              <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                    Your Ecosystem Path
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    I am a {currentIdentity.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    The ecosystem is now showing public people records that
                    match this identity while keeping open participation
                    opportunities visible.
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

              <div className="mt-8 border-t border-white/10 pt-7">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9BC36B]">
                    Matching People
                  </p>

                  <span className="text-[10px] text-white/40">
                    {matchedPeople.length}{" "}
                    {matchedPeople.length === 1 ? "profile" : "profiles"}
                  </span>
                </div>

                {matchedPeople.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {matchedPeople.slice(0, 6).map((person) => (
                      <div
                        key={person.id}
                        className="rounded-xl border border-white/10 bg-white/[0.05] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F2B632] text-[#073B4C]">
                            <Users size={15} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-bold">
                              {person.full_name}
                            </p>

                            <p className="mt-1 truncate text-[9px] uppercase tracking-[0.1em] text-white/40">
                              {person.role ||
                                person.person_type_display ||
                                person.person_type}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-white/[0.03] p-5 text-center">
                    <p className="text-xs text-white/45">
                      No public profiles matching this identity have been
                      published yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <NextStep onClick={() => scrollToSection("take-action")} />
        </div>
      </section>

      {/* =========================================================
          STEP 10 — TAKE ACTIONSTEP 10 — TAKE ACTION
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