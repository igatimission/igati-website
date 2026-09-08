import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { authApi } from "../api/authApi";


const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
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

    if (!form.identifier.trim() || !form.password) {
      setError("Please enter your username/email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await authApi.login(
        form.identifier.trim(),
        form.password
      );

      const destination =
        location.state?.from?.pathname || "/marketplace";

      navigate(destination, {
        replace: true,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8FAF7]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl lg:grid-cols-2">

        {/* LEFT */}
        <div className="hidden bg-[#073B4C] px-12 py-16 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#F2B632]">
              IGATI Global Mission Network
            </div>

            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight">
              Connect. Exchange.
              <span className="text-[#9BC36B]">
                {" "}Create value.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-white/75">
              Join an ecosystem connecting people, enterprises,
              projects, opportunities, knowledge and markets.
            </p>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-sm font-semibold text-[#F2B632]">
              WE ARE THE LIGHT AND THE SALT OF THE EARTH
            </p>

            <p className="mt-2 text-sm text-white/60">
              Matthew 5:13–19
            </p>
          </div>
        </div>


        {/* FORM */}
        <div className="flex items-center justify-center px-5 py-12 sm:px-10">
          <div className="w-full max-w-md">

            <div className="mb-8 lg:hidden">
              <span className="text-xl font-bold text-[#073B4C]">
                IGATI
              </span>
            </div>

            <p className="font-semibold text-[#6C994E]">
              Welcome back
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#073B4C]">
              Sign in to My IGATI
            </h2>

            <p className="mt-3 text-gray-600">
              Access your profile, marketplace activity,
              connections and opportunities.
            </p>


            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}


            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#16313B]">
                  Username or email
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="identifier"
                    value={form.identifier}
                    onChange={handleChange}
                    placeholder="Enter username or email"
                    autoComplete="username"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 outline-none transition focus:border-[#6C994E] focus:ring-2 focus:ring-[#6C994E]/10"
                  />
                </div>
              </div>


              <div>
                <label className="mb-2 block text-sm font-semibold text-[#16313B]">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-12 outline-none transition focus:border-[#6C994E] focus:ring-2 focus:ring-[#6C994E]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#073B4C]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>


              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#073B4C] px-5 py-3.5 font-semibold text-white transition hover:bg-[#07505E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}

                {!loading && <ArrowRight size={18} />}
              </button>
            </form>


            <p className="mt-8 text-center text-sm text-gray-600">
              Not yet part of IGATI?{" "}
              <Link
                to="/register"
                className="font-bold text-[#6C994E] hover:text-[#073B4C]"
              >
                Join the ecosystem
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};


export default LoginPage;