import React, { useState } from 'react';
import { FileText, Calendar, MapPin, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const MyApplications = ({ applications, jobs, onWithdraw, onNavigate }) => {

const navigate = useNavigate();
const [selectedJob, setSelectedJob] = useState(null);

const myApps = applications.map(app => ({
  ...app,
  job:
    app.job ||
    jobs?.find(
      j => j._id === (app.jobId?._id || app.jobId || app.job?._id)
    ),
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
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg hover:shadow-lg transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {myApps.map(app => (
              <div key={app._id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{app.job?.title}</h3>
                    <p className="text-slate-600">{app.job?.company}</p>
                  </div>
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

                <div className="flex gap-3 justify-end items-center -mt-10">
                  <button
                    onClick={() => setSelectedJob(app.job)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>

                  {app.status === 'pending' && (
                    <button
                      onClick={() => onWithdraw(app._id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                    >
                      Withdraw Application
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                <p className="text-slate-600">{selectedJob.company}</p>
              </div>
              <button onClick={() => setSelectedJob(null)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-slate-700">
              <p><strong>Location:</strong> {selectedJob.location || "Not specified"}</p>
              <p><strong>Job Type:</strong> {selectedJob.jobType || "Not specified"}</p>
              <p><strong>Category:</strong> {selectedJob.category || "Not specified"}</p>
              <p><strong>Work Experience:</strong> {selectedJob.workExperience || "Not specified"}</p>
              <p><strong>Salary:</strong> {selectedJob.salary ? `₹ ${selectedJob.salary}` : "Not specified"}</p>
              <p><strong>Contact Email:</strong> {selectedJob.contactEmail || "Not specified"}</p>
              <p><strong>Description:</strong></p>
              <p>{selectedJob.description || "No description provided."}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;