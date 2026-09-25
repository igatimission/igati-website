import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  Sprout,
} from "lucide-react";

import { Link } from "react-router-dom";

import hero1 from "../../assets/images/hero-1.jpg";
import hero2 from "../../assets/images/hero-2.jpg";
import hero3 from "../../assets/images/hero-3.jpg";

const Hero = () => {
  const [currentSlide, setCurrentSlide] =
    useState(0);

  const slides = [
    {
      image: hero1,
      label: "Community",
    },
    {
      image: hero2,
      label: "Research & Innovation",
    },
    {
      image: hero3,
      label: "Enterprise & Impact",
    },
  ];

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
      icon: Handshake,
      label: "Partnership",
    },
  ];

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (previous) =>
          (previous + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide(
      (previous) =>
        (previous + 1) % slides.length
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0
        ? slides.length - 1
        : previous - 1
    );
  };

  return (
    <section
      id="home"
      className="
        relative
        min-h-[720px]
        overflow-hidden
        text-white
        lg:min-h-[780px]
      "
    >
      {/* =============================== */}
      {/* BACKGROUND IMAGE SLIDER */}
      {/* =============================== */}

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute
              inset-0
              transition-all
              duration-[1400ms]
              ease-in-out

              ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }
            `}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="
                h-full
                w-full
                object-cover
                object-center
              "
            />
          </div>
        ))}
      </div>

      {/* =============================== */}
      {/* DARK OVERLAYS */}
      {/* =============================== */}

      {/* Main dark overlay */}
      <div className="absolute inset-0 bg-[#031F29]/60" />

      {/* Stronger darkness behind text */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#031F29]/95
          via-[#073B4C]/80
          to-[#073B4C]/25
        "
      />

      {/* Bottom gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#031F29]/80
          via-transparent
          to-black/20
        "
      />

      {/* Slight pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* =============================== */}
      {/* HERO CONTENT */}
      {/* =============================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[720px]
          max-w-[1500px]
          items-center
          px-4
          py-16
          sm:px-6
          lg:min-h-[780px]
          lg:px-8
          lg:py-20
          xl:px-10
        "
      >
        {/*
          Wider content container.
          There is no longer a right-side
          slider column.
        */}
        <div className="w-full max-w-[1050px]">
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/20
              bg-black/15
              px-4
              py-2
              backdrop-blur-md
            "
          >
            <Network
              size={14}
              className="text-[#F2B632]"
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.17em]
                text-white/90
                sm:text-xs
              "
            >
              IGATI Global Mission Network
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              mt-6
              max-w-[1050px]
              text-[38px]
              font-bold
              leading-[1.06]
              tracking-tight
              sm:text-[48px]
              lg:text-[58px]
              xl:text-[66px]
              2xl:text-[72px]
            "
          >
            Connecting People,{" "}

            <span className="text-[#F2B632]">
              Research, Innovation
            </span>

            <span>
              {" "}& Social Entrepreneurship
            </span>

            <span className="mt-2 block text-[#9BC36B]">
              for Socio-Economic
              Transformation.
            </span>
          </h1>

          {/* Main description */}

          <p
            className="
              mt-6
              max-w-[900px]
              text-base
              leading-8
              text-white/85
              sm:text-lg
              lg:text-xl
              lg:leading-9
            "
          >
            IGATI Global Mission Network is
            a startup social
            entrepreneurship digital
            platform connecting communities,
            students, researchers,
            innovators, entrepreneurs,
            enterprises, institutions,
            government, industry, investors
            and development partners around
            practical solutions for social
            and economic transformation.
          </p>

          {/* Supporting description */}

          <p
            className="
              mt-4
              max-w-[850px]
              text-sm
              leading-7
              text-white/65
              sm:text-base
            "
          >
            Enter a living ecosystem where
            community challenges connect
            with universities, knowledge,
            innovators, entrepreneurs,
            investors, partnerships, markets
            and opportunities for
            sustainable transformation.
          </p>

          {/* CTA */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/ecosystem"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#F2B632]
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#073B4C]
                shadow-xl
                shadow-black/20
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#e4aa25]
              "
            >
              Explore the Ecosystem

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            <Link
              to="/join"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/25
                bg-black/15
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-white/40
                hover:bg-white/10
              "
            >
              Join the Network

              <ArrowRight
                size={16}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* Ecosystem indicators */}

          <div
            className="
              mt-9
              flex
              max-w-[900px]
              flex-wrap
              gap-x-6
              gap-y-3
              border-t
              border-white/15
              pt-6
            "
          >
            {ecosystemItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-medium
                    text-white/75
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/10
                      bg-black/15
                      text-[#F2B632]
                      backdrop-blur
                    "
                  >
                    <Icon size={14} />
                  </div>

                  <span>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =============================== */}
      {/* SLIDER CONTROLS */}
      {/* =============================== */}

      <div
        className="
          absolute
          bottom-7
          right-4
          z-20
          flex
          items-center
          gap-3
          sm:right-6
          lg:bottom-10
          lg:right-10
        "
      >
        {/* Previous */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous hero image"
          className="
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/15
            sm:flex
          "
        >
          <ArrowLeft size={17} />
        </button>

        {/* Dots */}

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-black/20
            px-4
            py-3
            backdrop-blur-md
          "
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${
                index + 1
              }`}
              onClick={() =>
                setCurrentSlide(index)
              }
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-300

                ${
                  currentSlide === index
                    ? "w-8 bg-[#F2B632]"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }
              `}
            />
          ))}
        </div>

        {/* Next */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next hero image"
          className="
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/20
            text-white
            backdrop-blur-md
            transition
            hover:bg-white/15
            sm:flex
          "
        >
          <ArrowRight size={17} />
        </button>
      </div>

      {/* Current slide label */}

      <div
        className="
          absolute
          bottom-8
          left-4
          z-20
          hidden
          items-center
          gap-3
          sm:left-6
          lg:left-auto
          lg:right-[230px]
          lg:flex
        "
      >
        <span className="h-[2px] w-8 bg-[#F2B632]" />

        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-white/70
          "
        >
          {slides[currentSlide].label}
        </span>
      </div>

      {/* Bottom transition */}

      <div
        className="
          absolute
          bottom-0
          left-0
          z-30
          h-1
          w-full
          bg-gradient-to-r
          from-[#6C994E]
          via-[#F2B632]
          to-[#6C994E]
        "
      />
    </section>
  );
};

export default Hero;