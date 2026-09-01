import { useState } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form submitted:", formData);

    // Connect this to your backend, EmailJS,
    // Formspree, Resend, or another email service later.
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F8FAF7] py-16 sm:py-20 lg:py-24"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-10 h-80 w-80 rounded-full bg-[#6C994E]/10 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#F2B632]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6C994E]/20 bg-white px-4 py-2 shadow-sm">
            <MessageSquare size={16} className="text-[#6C994E]" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#567A3D]">
              Get In Touch
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#073B4C] sm:text-4xl lg:text-5xl">
            Let&apos;s Build Meaningful{" "}
            <span className="text-[#6C994E]">Impact Together</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
            Have a question, partnership opportunity, innovation, or community
            initiative? Reach out and connect with the IGATI Global Mission
            Network.
          </p>
        </div>

        {/* Main Contact Grid */}
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          {/* LEFT CONTACT INFO */}
          <div className="relative overflow-hidden rounded-[30px] bg-[#073B4C] p-7 text-white shadow-xl sm:p-8 lg:p-10">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#F2B632]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#6C994E]/20 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#F2B632]">
                Contact Information
              </p>

              <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                Connect with the IGATI Global Mission Network
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/65">
                We welcome conversations around innovation, research,
                enterprise, partnerships, community transformation, and
                mission-driven opportunities.
              </p>

              <div className="mt-8 space-y-5">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-[#F2B632]">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-white/85">
                      Meru, Kenya
                    </p>

                    <p className="mt-1 text-xs text-white/50">
                      Kenya & Global Network
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-[#F2B632]">
                    <Mail size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                      Email
                    </p>

                    <a
                      href="mailto:info@example.com"
                      className="mt-1 block break-all text-sm font-medium text-white/85 transition-colors hover:text-[#F2B632]"
                    >
                      info@example.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-[#F2B632]">
                    <Phone size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                      Phone
                    </p>

                    <a
                      href="tel:+254700000000"
                      className="mt-1 block text-sm font-medium text-white/85 transition-colors hover:text-[#F2B632]"
                    >
                      +254 700 000 000
                    </a>
                  </div>
                </div>
              </div>

              {/* MUST RICE note */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F2B632]">
                  Institutional Incubation
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  Incubated by MUST RICE
                </p>

                <p className="mt-2 text-xs leading-5 text-white/55">
                  Meru University of Science and Technology — Research,
                  Innovation, Commercialization & Extension.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-[30px] border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#6C994E]">
                Send a Message
              </p>

              <h3 className="mt-2 text-2xl font-bold text-[#073B4C]">
                How can we help?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Fill in the form and the IGATI team can get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#073B4C]"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAF7] px-4 py-3.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#073B4C]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAF7] px-4 py-3.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#073B4C]"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254..."
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAF7] px-4 py-3.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#073B4C]"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#F8FAF7] px-4 py-3.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[#073B4C]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us more..."
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-[#F8FAF7] px-4 py-3.5 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-[#6C994E] focus:bg-white focus:ring-4 focus:ring-[#6C994E]/10"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#07505E] hover:shadow-lg sm:w-auto"
              >
                Send Message

                <Send
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Prompt */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#6C994E]/15 bg-white px-6 py-6 sm:flex-row sm:px-8">
          <div>
            <p className="text-sm font-bold text-[#073B4C]">
              Have an innovation or partnership opportunity?
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Connect with the network and explore ways to collaborate.
            </p>
          </div>

          <a
            href="#join"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#07505E] transition-colors hover:text-[#D99A16]"
          >
            Join the Network

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;