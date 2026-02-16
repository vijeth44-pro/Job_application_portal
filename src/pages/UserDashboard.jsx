import React from "react";
import GradientBlinds from "../components/GradientBlinds";
import BlurText from "../components/BlurText";

import {
  FileText,
  Clock,
  Briefcase,
  Search,
  User,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const UserDashboard = ({ currentUser, applications = [], jobs = [], onNavigate }) => {
  const pendingApps = applications.filter(
    (app) => app.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col">

      {/* 🔥 HERO SECTION - FULL WIDTH */}
      <div className="relative w-full h-[450px] overflow-hidden bg-black">

        {/* Gradient Animation */}
        <GradientBlinds
          gradientColors={['#2c478cff', '#0266f1ff']}
          angle={45}
          noise={0.3}
          blindCount={20}
          blindMinWidth={20}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="normal"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">

          <BlurText
            text={`Welcome back, ${currentUser?.profile?.name || "User"}!`}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          />

          <BlurText
            text="Here's your job search overview"
            delay={300}
            animateBy="words"
            direction="top"
            className="text-white/80 text-lg"
          />

        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}


      {/* MAIN CONTENT */}
      <div className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  {applications.length}
                </span>
              </div>
              <p className="text-slate-600 font-medium">
                Total Applications
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  {pendingApps}
                </span>
              </div>
              <p className="text-slate-600 font-medium">Pending</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  {jobs.length}
                </span>
              </div>
              <p className="text-slate-600 font-medium">
                Available Jobs
              </p>
            </div>

          </div>

          {/* Quick Actions + Profile Status */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => onNavigate("search-jobs")}
                  className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
                >
                  <Search className="w-5 h-5" />
                  Browse Jobs
                </button>

                <button
                  onClick={() => onNavigate("profile")}
                  className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
                >
                  <User className="w-5 h-5" />
                  Update Profile
                </button>

                <button
                  onClick={() => onNavigate("my-applications")}
                  className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
                >
                  <FileText className="w-5 h-5" />
                  View Applications
                </button>
              </div>
            </div>

            {/* Profile Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Profile Status
              </h3>

              {currentUser?.profile ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Profile Complete</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-yellow-600 mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span>Profile Incomplete</span>
                  </div>

                  <button
                    onClick={() => onNavigate("profile")}
                    className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg"
                  >
                    Complete Profile
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>


      {/* ===================================================== */}
      {/* DASHBOARD EXTENDED SECTIONS – BLUE LIQUID GLASS */}
      {/* ===================================================== */}

      <section className="space-y-20">

        {/* ===================== 1. JOB STATS ===================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Live Jobs", value: "1,75,324" },
            { title: "Companies", value: "97,354" },
            { title: "Candidates", value: "38,47,154" },
            { title: "New Jobs", value: "7,532" },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-4"
            >
              <div
                className="relative rounded-3xl 
          bg-gradient-to-br from-[#5A86E8] to-[#3B6EDC]
          border border-white/20
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          p-8 overflow-hidden"
              >
                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl pointer-events-none z-0" />

                {/* Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60 rounded-3xl pointer-events-none z-0" />

                {/* Content */}
                <div className="relative z-10">
                  <h4 className="text-sm text-white/80">{item.title}</h4>
                  <p className="text-3xl font-bold text-white mt-3">
                    {item.value}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>


        {/* ===================== 2. MOST POPULAR VACANCIES ===================== */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            Most Popular Vacancies
          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-sm">
            {[
              "Software Developer",
              "Data Scientist",
              "Financial Manager",
              "IT Manager",
              "Management Analysis",
              "Operations Research Analysis",
              "Psychiatrists",
              "Orthodontists",
            ].map((job, index) => (
              <div
                key={index}
                className="group relative rounded-3xl p-[1px] transition duration-500 hover:-translate-y-3"
              >
                <div
                  className="relative rounded-3xl 
            bg-gradient-to-br from-[#5A86E8] to-[#3B6EDC]
            border border-white/20
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            p-6 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl pointer-events-none z-0" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60 rounded-3xl pointer-events-none z-0" />

                  <div className="relative z-10">
                    <p className="font-semibold text-white">
                      {job}
                    </p>
                    <span className="text-xs text-white/80">
                      {Math.floor(Math.random() * 50000)} Open Positions
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ===================== 3. HOW JOBPORTAL WORKS ===================== */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">
            How JobPortal Works
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { title: "Create Account", icon: User },
              { title: "Upload Resume", icon: FileText },
              { title: "Find Suitable Job", icon: Search },
              { title: "Apply Job", icon: CheckCircle },
            ].map((step, index) => (
              <div
                key={index}
                className="group relative rounded-3xl p-[1px] transition duration-500 hover:-translate-y-5"
              >
                <div
                  className="relative rounded-3xl 
            bg-gradient-to-br from-[#5A86E8] to-[#3B6EDC]
            border border-white/20
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            p-10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl pointer-events-none z-0" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60 rounded-3xl pointer-events-none z-0" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl text-white shadow-lg">
                      <step.icon size={22} />
                    </div>

                    <h4 className="font-semibold text-white">
                      {step.title}
                    </h4>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>


        {/* ===================== 4. POPULAR CATEGORY ===================== */}
        <div>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Popular Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Graphics & Design",
              "Code & Programming",
              "Digital Marketing",
              "Video & Animation",
              "Music & Audio",
              "Account & Finance",
              "Health & Care",
              "Data & Science",
            ].map((cat, index) => (
              <div
                key={index}
                className="group relative rounded-3xl p-[1px] transition duration-500 hover:-translate-y-4"
              >
                <div
                  className="relative rounded-3xl 
            bg-gradient-to-br from-[#5A86E8] to-[#3B6EDC]
            border border-white/20
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            p-8 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl pointer-events-none z-0" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60 rounded-3xl pointer-events-none z-0" />

                  <div className="relative z-10">
                    <p className="font-semibold text-white">
                      {cat}
                    </p>
                    <span className="text-xs text-white/80">
                      {Math.floor(Math.random() * 500)} Open Positions
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </section>





      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#0f172a] via-[#0b1f3a] to-[#1e3a8a] text-slate-300 pt-16 pb-8 mt-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                <span className="text-blue-400">Job</span>Portal
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Find your dream job with top companies worldwide.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 border-l-4 border-blue-500 pl-3">
                Links
              </h3>
              <ul className="space-y-3 text-sm">
                <li
                  onClick={() => onNavigate("landing")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home
                </li>
                <li
                  onClick={() => onNavigate("register")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Sign Up
                </li>
                <li
                  onClick={() => onNavigate("login")}
                  className="hover:text-white transition cursor-pointer"
                >
                  Login
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4 border-l-4 border-blue-500 pl-3">
                Legal
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white transition cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white transition cursor-pointer">
                  Terms of Service
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-white font-semibold mb-4 border-l-4 border-blue-500 pl-3">
                Follow Us
              </h3>

              <div className="flex gap-5">
                <Facebook className="w-5 h-5 cursor-pointer text-slate-400 hover:text-blue-400 transition" />
                <Instagram className="w-5 h-5 cursor-pointer text-slate-400 hover:text-pink-400 transition" />
                <Twitter className="w-5 h-5 cursor-pointer text-slate-400 hover:text-sky-400 transition" />
                <Linkedin className="w-5 h-5 cursor-pointer text-slate-400 hover:text-blue-500 transition" />
              </div>
            </div>

          </div>

          {/* Bottom Line */}
          <div className="border-t border-white/10 pt-6 text-sm text-slate-400 text-center">
            © {new Date().getFullYear()} Job Portal. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
};

export default UserDashboard;
