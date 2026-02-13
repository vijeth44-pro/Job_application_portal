import React from 'react';
import {
  FileText,
  Clock,
  Briefcase,
  Search,
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const UserDashboard = ({ currentUser, applications, jobs, onNavigate }) => {
  const pendingApps = applications.filter(app => app.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex flex-col">

      {/* MAIN CONTENT */}
      <div className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back, {currentUser?.profile?.name || 'User'}!
            </h2>
            <p className="text-slate-600 mt-2">
              Here's your job search overview
            </p>
          </div>

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
              <p className="text-slate-600 font-medium">Total Applications</p>
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
              <p className="text-slate-600 font-medium">Available Jobs</p>
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
                  onClick={() => onNavigate('search-jobs')}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg hover:shadow-lg transition flex items-center gap-3"
                >
                  <Search className="w-5 h-5" />
                  Browse Jobs
                </button>

                <button
                  onClick={() => onNavigate('profile')}
                  className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
                >
                  <User className="w-5 h-5" />
                  Update Profile
                </button>

                <button
                  onClick={() => onNavigate('my-applications')}
                  className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-3"
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

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">
                      <strong>Name:</strong> {currentUser.profile.name}
                    </p>
                    <p className="text-sm text-slate-600 mb-2">
                      <strong>Location:</strong> {currentUser.profile.location}
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Experience:</strong> {currentUser.profile.experience}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-yellow-600 mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span>Profile Incomplete</span>
                  </div>

                  <button
                    onClick={() => onNavigate('profile')}
                    className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg"
                  >
                    Complete Profile
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 🔥 TOP HIRINGS (MIDDLE) */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-1 text-center">
              Top Hirings
            </h3>
            <p className="text-slate-600 mb-6 text-center">
              Companies actively hiring right now
            </p>

            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-6 text-slate-600 text-center">
                No job openings available at the moment.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.slice(0, 6).map(job => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                  >
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {job.title}
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <button
                      onClick={() => onNavigate('search-jobs')}
                      className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
                    >
                      View & Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Jobs Banner */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Find Your Next Opportunity
              </h3>
              <p className="text-slate-600">
                Explore top hiring companies and apply instantly
              </p>
            </div>

            <button
              onClick={() => onNavigate('search-jobs')}
              className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Jobs
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
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