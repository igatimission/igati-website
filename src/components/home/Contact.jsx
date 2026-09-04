import {
  ArrowRight,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import { Link } from "react-router-dom";

const Contact = () => {
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "info@igatikenya.org",
      href: "mailto:info@igatikenya.org",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+254 724 133 852",
      href: "tel:+254724133852",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Meru, Kenya",
      href: null,
    },
    {
      icon: Globe2,
      label: "Website",
      value: "www.igatikenya.org",
      href: "https://www.igatikenya.org",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F8FAF7] py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#6C994E]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F2B632]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-white px-4 py-2">
              <MessageCircle size={14} className="text-[#6C994E]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527A3A] sm:text-xs">
                Contact IGATI
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
              Connect with
              <span className="block text-[#6C994E]">
                the IGATI network.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-base leading-8 text-gray-600 lg:ml-auto lg:text-lg">
              Whether you want to join a programme, collaborate on research,
              support an enterprise, partner with a community initiative or
              simply learn more, we would be glad to hear from you.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact info */}
          <div className="relative overflow-hidden rounded-[28px] bg-[#073B4C] p-7 text-white shadow-xl shadow-[#073B4C]/10 sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#6C994E]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#F2B632]/10 blur-3xl" />

            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B632]">
                IGATI Global Mission Network
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                Start a conversation.
                <span className="block text-[#9BC36B]">
                  Build something meaningful.
                </span>
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                We welcome conversations with communities, students,
                researchers, innovators, entrepreneurs, institutions,
                corporates, investors and development partners.
              </p>

              <div className="mt-8 space-y-3">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all duration-300 hover:border-[#F2B632]/25 hover:bg-white/[0.08]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-[#F2B632]">
                        <Icon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
                          {item.label}
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold text-white/85">
                          {item.value}
                        </p>
                      </div>

                      {item.href && (
                        <ArrowRight
                          size={15}
                          className="text-white/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#F2B632]"
                        />
                      )}
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              {/* Incubation note */}
              <div className="mt-8 rounded-2xl border border-[#F2B632]/20 bg-[#F2B632]/[0.08] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#F2B632]">
                  Incubated Through
                </p>

                <p className="mt-2 text-sm font-bold text-white">
                  Division of Research, Innovation, Commercialization and
                  Extension (RICE)
                </p>

                <p className="mt-1 text-xs leading-5 text-white/50">
                  Meru University of Science and Technology (MUST)
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-[10px] leading-5 text-white/35">
                  P.O. Box 972–60200
                  <br />
                  Meru, Kenya
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6C994E]">
                Send a Message
              </p>

              <h3 className="mt-3 text-2xl font-bold text-[#073B4C] sm:text-3xl">
                How can we work together?
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
                Tell us a little about yourself and what you would like to
                explore within the IGATI ecosystem.
              </p>
            </div>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-bold text-[#073B4C]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 bg-[#FCFDFB] px-4 py-3.5 text-sm text-[#073B4C] outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-bold text-[#073B4C]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-[#FCFDFB] px-4 py-3.5 text-sm text-[#073B4C] outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-bold text-[#073B4C]"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+254..."
                    className="w-full rounded-xl border border-gray-200 bg-[#FCFDFB] px-4 py-3.5 text-sm text-[#073B4C] outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="interest"
                    className="mb-2 block text-xs font-bold text-[#073B4C]"
                  >
                    I Am Interested In
                  </label>

                  <select
                    id="interest"
                    defaultValue=""
                    className="w-full rounded-xl border border-gray-200 bg-[#FCFDFB] px-4 py-3.5 text-sm text-[#073B4C] outline-none transition-all focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="joining">Joining the Network</option>
                    <option value="project">Joining a Project</option>
                    <option value="research">
                      Research Collaboration
                    </option>
                    <option value="innovation">
                      Innovation & Commercialization
                    </option>
                    <option value="enterprise">
                      Enterprise Development
                    </option>
                    <option value="partnership">
                      Partnership & Collaboration
                    </option>
                    <option value="investment">
                      Investment & Resource Mobilization
                    </option>
                    <option value="training">
                      Training & Learning
                    </option>
                    <option value="marketplace">Marketplace</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs font-bold text-[#073B4C]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  className="w-full rounded-xl border border-gray-200 bg-[#FCFDFB] px-4 py-3.5 text-sm text-[#073B4C] outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold text-[#073B4C]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell us how you would like to connect with IGATI..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#FCFDFB] px-4 py-3.5 text-sm leading-6 text-[#073B4C] outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E] sm:w-auto"
              >
                Send Message

                <Send
                  size={16}
                  className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-5 text-[11px] leading-5 text-gray-400">
              This form is currently the frontend interface. Connect it to your
              backend or email service when you implement message submission.
            </p>
          </div>
        </div>

        {/* Final quick actions */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Link
            to="/join"
            className="group rounded-2xl border border-[#6C994E]/15 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6C994E]">
              Participate
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-[#073B4C]">
                Join the IGATI Network
              </p>

              <ArrowRight
                size={15}
                className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            to="/ecosystem"
            className="group rounded-2xl border border-[#6C994E]/15 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#6C994E]">
              Discover
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-[#073B4C]">
                Explore the Ecosystem
              </p>

              <ArrowRight
                size={15}
                className="text-[#F2B632] transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </Link>

          <a
            href="mailto:info@igatikenya.org"
            className="group rounded-2xl border border-[#F2B632]/20 bg-[#FFF9EC] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#D99A16]">
              Direct Contact
            </p>

            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-[#073B4C]">
                Email IGATI
              </p>

              <Mail
                size={15}
                className="text-[#D99A16] transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;