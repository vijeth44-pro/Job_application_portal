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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">

      {/* MAIN */}
      <div className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, {currentUser?.profile?.name || 'User'}!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Here's your job search overview
            </p>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: FileText, label: 'Total Applications', value: applications.length, color: 'indigo' },
              { icon: Clock, label: 'Pending', value: pendingApps, color: 'yellow' },
              { icon: Briefcase, label: 'Available Jobs', value: jobs.length, color: 'purple' }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS + PROFILE */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => onNavigate('search-jobs')} className="action-btn-primary">
                  <Search className="w-5 h-5" /> Browse Jobs
                </button>
                <button onClick={() => onNavigate('profile')} className="action-btn">
                  <User className="w-5 h-5" /> Update Profile
                </button>
                <button onClick={() => onNavigate('my-applications')} className="action-btn">
                  <FileText className="w-5 h-5" /> View Applications
                </button>
              </div>
            </div>

            {/* Profile */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Profile Status</h3>
              {currentUser?.profile ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" /> Profile Complete
                  </div>
                </div>
              ) : (
                <div className="text-yellow-600 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Profile Incomplete
                </div>
              )}
            </div>
          </div>

          {/* TOP HIRINGS */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-2">
              Top Hirings
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 6).map(job => (
                <div key={job.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 relative">

                  {/* Save */}
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
                    {job.logo ? (
                      <img src={job.logo} alt={job.company} className="w-10 h-10 rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center font-bold">
                        {job.company[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{job.title}</h4>
                      <p className="text-sm text-slate-500">{job.company}</p>
                    </div>
                  </div>

                  {/* Badge */}
                  {job.type && (
                    <span className={`inline-block px-3 py-1 text-xs rounded-full mb-3 ${badgeColors[job.type]}`}>
                      {job.type}
                    </span>
                  )}

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <button
                    onClick={() => onNavigate('search-jobs')}
                    className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600"
                  >
                    View & Apply
                  </button>
                </div>
              ))}
            </div>

            {/* View All */}
            <div className="text-center mt-8">
              <button
                onClick={() => onNavigate('search-jobs')}
                className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg hover:shadow-lg"
              >
                View All Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between text-sm text-slate-600 dark:text-slate-400">
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
