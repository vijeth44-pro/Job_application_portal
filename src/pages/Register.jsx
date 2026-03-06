import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DarkVeil from "../components/DarkVeil";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    useremail: "",
    userphone: "",
    userpassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerForm.userpassword !== registerForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9000/auth/register",
        {
          username: registerForm.username,
          useremail: registerForm.useremail,
          userphone: registerForm.userphone,
          userpassword: registerForm.userpassword,
        }
      );

      if (res.data.success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center py-6 min-h-screen">
      <div className="w-full max-w-5xl h-[650px] bg-white rounded-4xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex relative overflow-hidden text-white">
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

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 flex flex-col justify-between p-6 w-full">
            <div>
              <p className="text-sm opacity-80 mb-4">You can easily</p>
              <h1 className="text-4xl font-bold leading-snug">
                Speed up your work
                <br />
                with our Web App
              </h1>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Please register to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                required
                value={registerForm.username}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    username: e.target.value,
                  })
                }
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                required
                value={registerForm.useremail}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    useremail: e.target.value,
                  })
                }
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                type="text"
                required
                value={registerForm.userphone}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    userphone: e.target.value,
                  })
                }
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
                  value={registerForm.userpassword}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      userpassword: e.target.value,
                    })
                  }
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

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;