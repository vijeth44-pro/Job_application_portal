import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import DarkVeil from "../components/DarkVeil"; // adjust path if needed

const Login = ({ onLogin, onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginForm);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center py-6">
      <div className="w-full max-w-5xl h-[650px] bg-white rounded-4xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT PANEL WITH DARKVEIL */}
        <div className="hidden md:flex relative overflow-hidden text-white">

          {/* DarkVeil Background */}
          <div className="absolute inset-0">
            <DarkVeil
              hueShift={0}
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={1.1}
              scanlineFrequency={0}
              warpAmount={0}
            />
          </div>

          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-6 w-full">
            <div>
              <p className="text-sm opacity-80 mb-4">Welcome Back</p>
              <h1 className="text-4xl font-bold leading-snug">
                Continue your journey
                <br />
                with our Web App
              </h1>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Sign In
          </h2>
          <p className="text-gray-500 mb-8">
            Please login to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => onNavigate("register")}
              className="text-blue-600 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
