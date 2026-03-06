import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradientBlinds from "../components/GradientBlinds";
import BlurText from "../components/BlurText";
import { motion } from "framer-motion";
import FooterAfterLogin from "../components/FooterAfterLogin";

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
  LogOut,
} from "lucide-react";



const UserDashboard = ({
  currentUser,
  applications = [],
  jobs = [],
  onNavigate,
  onLogout,
}) => {

  const navigate = useNavigate();
  const [candidateCount, setCandidateCount] = useState(0);

  useEffect(() => {
  fetch("http://localhost:9000/admin/users/count")
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setCandidateCount(data.count);
      }
    })
    .catch((err) => console.error("Error fetching user count:", err));
}, []);



  const go = (page) => {
    if (onNavigate) {
      onNavigate(page);
      return;
    }

    switch (page) {
      case "search-jobs":
        navigate("/jobs");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "my-applications":
        navigate("/applications");
        break;
      case "landing":
        navigate("/");
        break;
      case "register":
        navigate("/register");
        break;
      case "login":
        navigate("/login");
        break;
      default:
        navigate("/");
    }
  };

  const pendingApps = applications.filter(
    (app) => app.status === "pending"
  ).length;

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col">

      {/* ================= HERO ================= */}
      <div className="relative w-full h-[450px] overflow-hidden bg-black">



        <GradientBlinds
          gradientColors={["#2c478cff", "#0266f1ff"]}
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

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <BlurText
            text={`Welcome , ${currentUser?.name || "User"}!`}
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

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">

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

          {/* Quick Actions + Profile */}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >


            <div className="grid md:grid-cols-2 gap-6 mb-24">

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-3">

                  <button
                    onClick={() => go("search-jobs")}
                    className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
                  >
                    <Search className="w-5 h-5" />
                    Browse Jobs
                  </button>

                  <button
                    onClick={() => go("profile")}
                    className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
                  >
                    <User className="w-5 h-5" />
                    Update Profile
                  </button>

                  <button
                    onClick={() => go("my-applications")}
                    className="w-full py-3 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
                  >
                    <FileText className="w-5 h-5" />
                    View Applications
                  </button>

                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Profile Status
                </h3>

                {currentUser?.profile ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Profile Complete</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-yellow-600 mb-4">
                      <AlertCircle className="w-5 h-5" />
                      <span>Profile Incomplete</span>
                    </div>

                    <button
                      onClick={() => go("profile")}
                      className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg"
                    >
                      Complete Profile
                    </button>
                  </div>
                )}
              </div>
            </div>

          </motion.div>

          {/* ================= EXTENDED SECTIONS ================= */}

          {/* Job Stats */}


          <section className="space-y-24">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { title: "Live Jobs", value: jobs.length },
                  { title: "Companies", value: "100+" },
                  { title: "Candidates", value: candidateCount },
                  { title: "New Jobs", value: jobs.length },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-3xl p-8 border border-blue-500 bg-white/80 backdrop-blur-lg shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-2"
                  >
                    <h4 className="text-sm text-slate-500">
                      {item.title}
                    </h4>

                    <p className="text-3xl font-bold text-slate-900 mt-3">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Popular Vacancies */}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
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
                      className="rounded-2xl p-6 border border-blue-500 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <p className="font-semibold text-slate-800 hover:text-blue-600 transition">
                        {job}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </section>

        </div>
      </div>
      

      <FooterAfterLogin />

    </div >
  );
};

export default UserDashboard;