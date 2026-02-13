import React from 'react';
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
} from 'lucide-react';

const Landing = ({ onNavigate, jobs }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50">

      {/* MAIN CONTENT */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-20">

          {/* HERO */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Connect with top employers and discover opportunities that match your skills and ambitions
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => onNavigate('register')}
                className="px-8 py-4 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg font-semibold hover:shadow-xl transition"
              >
                Get Started
              </button>

              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-4 bg-white text-slate-700 rounded-lg font-semibold border-2 border-slate-200 hover:border-indigo-600 transition"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* FEATURES */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <FeatureCard icon={<Search color="#244BD1" />} title="Search Jobs" desc="Browse thousands of job listings from top companies worldwide" />
            <FeatureCard icon={<FileText color="#244BD1" />} title="Easy Application" desc="Apply to multiple jobs with just one click using your profile" />
            <FeatureCard icon={<ChartSpline color="#244BD1" />} title="Track Progress" desc="Monitor your applications and stay updated on your job search" />
          </div>

          {/* LATEST JOBS */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Latest Opportunities
            </h2>

            <div className="grid gap-6">
              {jobs.slice(0, 3).map(job => (
                <div key={job.id} className="border border-slate-200 rounded-lg p-6 hover:border-indigo-600 transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                      <p className="text-slate-600">{job.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => onNavigate('register')}
                className="text-indigo-600 font-semibold hover:text-indigo-700"
              >
                View All Jobs →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#0f1b3d] text-slate-300 pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                <span className="text-blue-400">Job</span>Portal
              </h2>
              <p className="text-sm text-slate-400">
                Find your dream job with top companies worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 border-l-2 border-blue-500 pl-3">
                Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li onClick={() => onNavigate('landing')} className="hover:text-white cursor-pointer">Home</li>
                <li onClick={() => onNavigate('register')} className="hover:text-white cursor-pointer">Sign Up</li>
                <li onClick={() => onNavigate('login')} className="hover:text-white cursor-pointer">Login</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 border-l-2 border-blue-500 pl-3">
                Legal
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms of Service</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 border-l-2 border-blue-500 pl-3">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-400" />
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-500" />
              </div>
            </div>

          </div>

          <div className="border-t border-slate-700 pt-6 text-sm text-slate-400 text-center">
            © {new Date().getFullYear()} Job Portal. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600">{desc}</p>
  </div>
);

export default Landing;
