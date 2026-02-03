import React from 'react';
import { FileText, Calendar, MapPin } from 'lucide-react';

const MyApplications = ({ applications, jobs, onWithdraw, onNavigate }) => {
  const myApps = applications.map(app => ({
    ...app,
    job: jobs.find(j => j.id === app.jobId)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">My Applications</h2>

        {myApps.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-4">You haven't applied to any jobs yet.</p>
            <button
              onClick={() => onNavigate('search-jobs')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {myApps.map(app => (
              <div key={app.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{app.job?.title}</h3>
                    <p className="text-slate-600">{app.job?.company}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    app.status === 'withdrawn' ? 'bg-red-100 text-red-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Applied {app.appliedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {app.job?.location}
                  </span>
                </div>

                {app.status === 'pending' && (
                  <button
                    onClick={() => onWithdraw(app.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    Withdraw Application
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
