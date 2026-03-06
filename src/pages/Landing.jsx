import React from "react";
import { useNavigate } from "react-router-dom";
import ColorBends from "../components/ColorBlends";
import FooterBeforeLogin from "../components/FooterBeforeLogin";

import {
  Search,
  FileText,
  ChartSpline,
  MapPin,
  DollarSign,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from "lucide-react";
import BlurText from "../components/BlurText";

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300">
    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-3">
      {title}
    </h3>
    <p className="text-slate-600 text-sm leading-relaxed">
      {desc}
    </p>
  </div>
);

const Landing = ({ jobs = [], currentUser }) => {
  const navigate = useNavigate();

  const go = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">

        <div className="absolute inset-0 z-0">
          <ColorBends
            colors={["#1239e7ff", "#1239e7ff", "#000000ff"]}
            rotation={0}
            speed={0.2}
            scale={1}
            frequency={1}
            warpStrength={1}
            mouseInfluence={1}
            parallax={0.5}
            noise={0.1}
            transparent
            autoRotate={0}
            color="#000000ff"
          />
        </div>

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 text-center px-6 max-w-4xl">
          <BlurText
            text="Find Your Dream Job"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-6xl font-bold text-white mb-6 justify-center"
          />

          <p className="text-xl text-white/90 mb-8">
            Connect with top employers and discover opportunities that match your skills and ambitions
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold border border-white/30 hover:bg-white/30 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative mt-16 px-4 max-w-7xl mx-auto w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-blue-700/20 blur-3xl opacity-40 rounded-3xl"></div>

        <div className="relative grid md:grid-cols-3 gap-8 p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_60px_rgba(37,99,235,0.25)]">
          <FeatureCard
            icon={<Search size={26} className="text-blue-500" />}
            title="Search Jobs"
            desc="Browse thousands of job listings from top companies worldwide"
          />

          <FeatureCard
            icon={<FileText size={26} className="text-blue-500" />}
            title="Easy Application"
            desc="Apply to multiple jobs with just one click using your profile"
          />

          <FeatureCard
            icon={<ChartSpline size={26} className="text-blue-500" />}
            title="Track Progress"
            desc="Monitor your applications and stay updated on your job search"
          />
        </div>
      </section>

      {/* LATEST JOBS */}
      <section className="relative mt-20 px-4 max-w-7xl mx-auto w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/10 to-blue-500/20 blur-3xl opacity-50 rounded-3xl"></div>

        <div className="relative p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-blue-200 shadow-xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
            Latest Opportunities
          </h2>

          <div className="grid gap-6">
            {jobs.slice(0, 3).map((job) => (
              <div
                key={job._id || job.id}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {job.title}
                    </h3>
                    <p className="text-slate-600">{job.company}</p>
                  </div>

                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {job.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    {job.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-xl font-semibold hover:scale-[1.03] transition-all duration-300"
            >
              View All Jobs →
            </button>
          </div>
        </div>
      </section>
<FooterBeforeLogin />
    </div>
  );
};

export default Landing;