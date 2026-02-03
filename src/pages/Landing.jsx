import React from 'react';
import { Search, FileText, Activity, MapPin, DollarSign } from 'lucide-react';

const Landing = ({ onNavigate, jobs }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 animate-fadeIn">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills and ambitions
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => onNavigate('register')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition transform hover:scale-105"
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

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Search Jobs</h3>
            <p className="text-slate-600">Browse thousands of job listings from top companies worldwide</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Easy Application</h3>
            <p className="text-slate-600">Apply to multiple jobs with just one click using your profile</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Track Progress</h3>
            <p className="text-slate-600">Monitor your applications and stay updated on your job search</p>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Latest Opportunities</h2>
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
  );
};

export default Landing;
