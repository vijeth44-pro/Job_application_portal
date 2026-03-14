import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GradientBlinds from "../components/GradientBlinds";
import BlurText from "../components/BlurText";
import { motion } from "framer-motion";
import FooterAfterLogin from "../components/FooterAfterLogin";
import { FileText, Clock, Briefcase, Search, User, CheckCircle, AlertCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const UserDashboard = ({
  currentUser,
  applications = [],
  jobs = [],          // ← comes from App.jsx, no need to fetch again
  onNavigate,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [candidateCount, setCandidateCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:9000/admin/users/count")
      .then((res) => res.json())
      .then((data) => { if (data.success) setCandidateCount(data.count); })
      .catch((err) => console.error("Error fetching user count:", err));
  }, []);

  const pendingApps = applications.filter((app) => app.status === "Pending").length

  const go = (page) => {
    if (onNavigate) { onNavigate(page); return; }
    switch (page) {
      case "search-jobs": navigate("/jobs"); break;
      case "profile": navigate("/profile"); break;
      case "my-applications": navigate("/applications"); break;
      case "landing": navigate("/"); break;
      case "register": navigate("/register"); break;
      case "login": navigate("/login"); break;
      default: navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col">

      {/* HERO */}
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
            text={`Welcome, ${currentUser?.name || "User"}!`}
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

      {/* MAIN CONTENT */}
      <div className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Top Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-3xl font-bold text-slate-900">{applications.length}</span>
              </div>
              <p className="text-slate-600 font-medium">Total Applications</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-3xl font-bold text-slate-900">{jobs.length}</span>
              </div>
              <p className="text-slate-600 font-medium">Available Jobs</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-3xl font-bold text-slate-900">{pendingApps}</span>
              </div>
              <p className="text-slate-600 font-medium">Pending Applications</p>
            </div>
          </div>

          {/* Quick Actions + Profile */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="grid md:grid-cols-2 gap-6 mb-24">

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: "Browse Jobs", icon: <Search className="w-5 h-5" />, page: "search-jobs" },
                    { label: "Update Profile", icon: <User className="w-5 h-5" />, page: "profile" },
                    { label: "View Applications", icon: <FileText className="w-5 h-5" />, page: "my-applications" },
                  ].map(({ label, icon, page }) => (
                    <button
                      key={page}
                      onClick={() => go(page)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-br from-blue-500/90 to-blue-700/60 backdrop-blur-xl border border-white/40 text-white font-semibold shadow-[0_10px_40px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_50px_rgba(37,99,235,0.65)] hover:scale-[1.03] transition-all duration-300 flex items-center gap-3"
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Profile Status</h3>
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

          {/* Extended Sections */}
          <section className="space-y-24">

            {/* Platform Stats */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
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
                    <h4 className="text-sm text-slate-500">{item.title}</h4>
                    <p className="text-3xl font-bold text-slate-900 mt-3">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Jobs */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="text-center mb-5">
                <h2 className="text-3xl font-bold text-slate-900">Recommended Jobs</h2>
                <p className="text-slate-500 mt-2">Hand-picked opportunities just for you</p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {jobs.slice(0, 3).map((job, index) => (
                  <div
                    key={job._id || index}
                    className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{job.title}</h3>
                        <p className="text-slate-500 text-xs">{job.company}</p>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500 mb-4">
                      {job.location && <p>📍 {job.location}</p>}
                      {job.jobType && <p>💼 {job.jobType}</p>}
                      {job.salary && <p>💰 ₹{job.salary}</p>}
                    </div>

                    <button
                      onClick={() => go("search-jobs")}
                      className="w-full py-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-md transition-all"
                    >
                      View Job
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

          </section>
        </div>
      </div>

      <FooterAfterLogin />

    </div>
  );
};

export default UserDashboard;