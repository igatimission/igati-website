import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import { authApi } from "../api/authApi";


const personTypes = [
  { value: "farmer", label: "Farmer" },
  { value: "student", label: "Student" },
  { value: "researcher", label: "Researcher" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "innovator", label: "Innovator" },
  { value: "investor", label: "Investor" },
  { value: "partner", label: "Partner" },
  { value: "mentor", label: "Mentor" },
  { value: "volunteer", label: "Volunteer" },
  { value: "trainer", label: "Trainer" },
  { value: "academic", label: "Academic" },
  { value: "service_provider", label: "Service Provider" },
  { value: "professional", label: "Professional" },
  { value: "community_member", label: "Community Member" },
  { value: "other", label: "Other" },
];


const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    person_type: "community_member",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.full_name.trim() ||
      !form.username.trim() ||
      !form.email.trim() ||
      !form.password
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authApi.register({
        ...form,
        full_name: form.full_name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone_number: form.phone_number.trim(),
      });

      navigate("/marketplace");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-[#F8FAF7] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-5">

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm lg:grid lg:grid-cols-[0.8fr_1.2fr]">

          {/* LEFT */}
          <div className="bg-[#073B4C] p-8 text-white sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-[#F2B632]/15 px-4 py-2 text-sm font-bold text-[#F2B632]">
              Join IGATI
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight">
              Your identity in the
              <span className="text-[#9BC36B]">
                {" "}IGATI ecosystem.
              </span>
            </h1>

            <p className="mt-5 leading-7 text-white/70">
              Create your ecosystem profile and connect with
              people, enterprises, projects, markets and
              opportunities.
            </p>

            <div className="mt-10 space-y-4 text-sm">
              {[
                "Discover products and services",
                "Post what you need",
                "Offer your skills and value",
                "Connect with ecosystem members",
                "Discover projects and opportunities",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6C994E] text-xs font-bold">
                    ✓
                  </span>

                  <span className="text-white/85">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>


          {/* RIGHT */}
          <div className="p-6 sm:p-10 lg:p-12">
            <p className="font-semibold text-[#6C994E]">
              IGATI Ecosystem Profile
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#073B4C]">
              Create your account
            </h2>

            <p className="mt-3 text-gray-600">
              Start with the basics. You can complete the rest
              of your ecosystem profile after joining.
            </p>


            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}


            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-5 sm:grid-cols-2"
            >

              <InputField
                label="Full name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Your full name"
                icon={UserRound}
                required
              />

              <InputField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                icon={UserRound}
                required
              />

              <InputField
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                icon={Mail}
                required
              />

              <InputField
                label="Phone number"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="+254..."
                icon={Phone}
              />


              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#16313B]">
                  I am joining as
                </label>

                <select
                  name="person_type"
                  value={form.person_type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none transition focus:border-[#6C994E] focus:ring-2 focus:ring-[#6C994E]/10"
                >
                  {personTypes.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <label className="mb-2 block text-sm font-semibold text-[#16313B]">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-11 pr-11 outline-none focus:border-[#6C994E] focus:ring-2 focus:ring-[#6C994E]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>


              <InputField
                label="Confirm password"
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="Repeat password"
                icon={LockKeyhole}
                required
              />


              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-6 py-4 font-bold text-white transition hover:bg-[#07505E] disabled:opacity-60"
                >
                  {loading
                    ? "Creating your account..."
                    : "Join IGATI"}

                  {!loading && <ArrowRight size={19} />}
                </button>
              </div>
            </form>


            <p className="mt-7 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-[#6C994E]"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};


const InputField = ({
  label,
  icon: Icon,
  ...props
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#16313B]">
        {label}
        {props.required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          {...props}
          className={`w-full rounded-xl border border-gray-200 py-3.5 pr-4 outline-none transition focus:border-[#6C994E] focus:ring-2 focus:ring-[#6C994E]/10 ${
            Icon ? "pl-11" : "pl-4"
          }`}
        />
      </div>
    </div>
  );
};


export default RegisterPage;