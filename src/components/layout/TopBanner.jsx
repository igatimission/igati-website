import {
  Globe2,
  MapPin,
  Sparkles,
} from "lucide-react";

const TopBanner = () => {
  return (
    <div className="relative overflow-hidden bg-[#073B4C] text-white">
      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute -left-10 top-0 h-20 w-20 rounded-full bg-[#6C994E]/20 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[38px] items-center justify-center py-2 lg:justify-between">
          {/* Scripture / Mission Identity */}
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F2B632] opacity-40" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F2B632]" />
            </span>

            <p className="text-center text-[10px] font-medium leading-5 text-white/85 sm:text-xs lg:text-left">
              <span className="font-semibold text-white">
                “We Are the Light and the Salt of the Earth”
              </span>

              <span className="ml-1.5 text-[#F2B632]">
                — Matthew 5:13–19
              </span>
            </p>
          </div>

          {/* Desktop ecosystem information */}
          <div className="hidden items-center gap-5 lg:flex">
            {/* MUST RICE */}
            <div className="flex items-center gap-2">
              <Sparkles
                size={13}
                className="text-[#F2B632]"
              />

              <span className="text-[11px] font-medium text-white/65">
                Incubated by
              </span>

              <span className="text-[11px] font-semibold text-white">
                Meru University of Science and Technology - RICE
              </span>
            </div>

            {/* Divider */}
            <span className="h-4 w-px bg-white/15" />

            {/* Location */}
            <div className="flex items-center gap-1.5 text-white/65">
              <MapPin
                size={12}
                className="text-[#F2B632]"
              />

              <span className="text-[11px]">
                Meru, Kenya
              </span>
            </div>

            {/* Divider */}
            <span className="h-4 w-px bg-white/15" />

            {/* Global Network */}
            <div className="flex items-center gap-1.5 text-white/65">
              <Globe2
                size={13}
                className="text-[#6C994E]"
              />

              <span className="text-[11px]">
                Igati Global Mission Network
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#6C994E] via-[#F2B632] to-[#6C994E]" />
    </div>
  );
};

export default TopBanner;