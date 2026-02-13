import React, { useState } from 'react';
import {
  FileText,
  Clock,
  Briefcase,
  Search,
  User,
  CheckCircle,
  AlertCircle,
  Heart
} from 'lucide-react';

const badgeColors = {
  Remote: 'bg-green-100 text-green-700',
  'Full-Time': 'bg-blue-100 text-blue-700',
  Internship: 'bg-purple-100 text-purple-700',
  'Part-Time': 'bg-yellow-100 text-yellow-700'
};

const statStyles = [
  { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  { bg: 'bg-purple-100', text: 'text-purple-600' }
];

const UserDashboard = ({ currentUser, applications, jobs, onNavigate }) => {
  const pendingApps = applications.filter(app => app.status === 'pending').length;
  const [savedJobs, setSavedJobs] = useState([]);

  const toggleSave = (jobId) => {
    setSavedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      <div className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back, {currentUser?.profile?.name || 'User'}!
            </h2>
            <p className="text-slate-600 mt-2">
              Here's your job search overview
            </p>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: FileText, label: 'Total Applications', value: applications.length },
              { icon: Clock, label: 'Pending', value: pendingApps },
              { icon: Briefcase, label: 'Available Jobs', value: jobs.length }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${statStyles[i].bg} rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 ${statStyles[i].text}`} />
                  </div>
                  <span className="text-3xl font-bold text-slate-900">
                    {item.value}
                  </span>
                </div>
                <p className="text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS + PROFILE */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('search-jobs')}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Search className="w-5 h-5" /> Browse Jobs
                </button>

                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
                >
                  <User className="w-5 h-5" /> Update Profile
                </button>

                <button
                  onClick={() => onNavigate('my-applications')}
                  className="w-full flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
                >
                  <FileText className="w-5 h-5" /> View Applications
                </button>
              </div>
            </div>

            {/* Profile */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Profile Status</h3>

              {currentUser?.profile ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  Profile Complete
                </div>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertCircle className="w-5 h-5" />
                  Profile Incomplete
                </div>
              )}
            </div>
          </div>

          {/* TOP HIRINGS */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-slate-900 mb-6">
              Top Hirings
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 6).map(job => (
                <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 relative">

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSave(job.id)}
                    className="absolute top-4 right-4"
                  >
                    <Heart
                      className={`w-5 h-5 ${savedJobs.includes(job.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-slate-400'
                        }`}
                    />
                  </button>

                  {/* Logo */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center font-bold">
                      {job.company[0]}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">{job.title}</h4>
                      <p className="text-sm text-slate-500">{job.company}</p>
                    </div>
                  </div>

                  {/* Badge */}
                  {job.type && (
                    <span className={`inline-block px-3 py-1 text-xs rounded-full mb-3 ${badgeColors[job.type]}`}>
                      {job.type}
                    </span>
                  )}

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <button
                    onClick={() => onNavigate('search-jobs')}
                    className="w-full px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                  >
                    View & Apply
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => onNavigate('search-jobs')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View All Jobs
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Job Portal</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <span className="hover:text-slate-900 cursor-pointer">Privacy</span>
            <span className="hover:text-slate-900 cursor-pointer">Terms</span>
            <span className="hover:text-slate-900 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default UserDashboard;
