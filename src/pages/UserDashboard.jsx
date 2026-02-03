import React from 'react';
import { FileText, Clock, Briefcase, Search, User, CheckCircle, AlertCircle } from 'lucide-react';

const UserDashboard = ({ currentUser, applications, jobs, onNavigate }) => {
  const pendingApps = applications.filter(app => app.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, {currentUser?.profile?.name || 'User'}!</h2>
          <p className="text-slate-600 mt-2">Here's your job search overview</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-3xl font-bold text-slate-900">{pendingApps}</span>
            </div>
            <p className="text-slate-600 font-medium">Pending</p>
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
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('search-jobs')}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition text-left flex items-center gap-3"
              >
                <Search className="w-5 h-5" />
                Browse Jobs
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-left flex items-center gap-3"
              >
                <User className="w-5 h-5" />
                Update Profile
              </button>
              <button
                onClick={() => onNavigate('my-applications')}
                className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition text-left flex items-center gap-3"
              >
                <FileText className="w-5 h-5" />
                View Applications
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Profile Status</h3>
            {currentUser?.profile ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>Profile Complete</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2"><strong>Name:</strong> {currentUser.profile.name}</p>
                  <p className="text-sm text-slate-600 mb-2"><strong>Location:</strong> {currentUser.profile.location}</p>
                  <p className="text-sm text-slate-600"><strong>Experience:</strong> {currentUser.profile.experience}</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-yellow-600 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <span>Profile Incomplete</span>
                </div>
                <p className="text-slate-600 mb-4">Complete your profile to apply for jobs</p>
                <button
                  onClick={() => onNavigate('profile')}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                  Complete Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
