import React, { useState } from 'react';
import { Search, Building, MapPin, DollarSign, Calendar, Clock, X } from 'lucide-react';

const SearchJobs = ({ jobs, onApply }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Find Your Next Opportunity</h2>
          <div className="relative">
           
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, company, or location..."
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h3>
                  <div className="flex items-center gap-2 text-slate-600 mb-2">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                </div>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  {job.type}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  Posted {job.postedDate}
                </div>
              </div>

              <p className="text-slate-600 mb-4 line-clamp-2">{job.description}</p>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg hover:shadow-lg transition"
              >
                View Details
              </button>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No jobs found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.title}</h3>
                <p className="text-lg text-slate-600">{selectedJob.company}</p>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-5 h-5" />
                <span>{selectedJob.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-5 h-5" />
                <span>{selectedJob.type}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <DollarSign className="w-5 h-5" />
                <span>{selectedJob.salary}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-5 h-5" />
                <span>Posted {selectedJob.postedDate}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Job Description</h4>
              <p className="text-slate-600 whitespace-pre-line">{selectedJob.description}</p>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-bold text-slate-900 mb-3">Requirements</h4> 
              <p className="text-slate-600">{selectedJob.requirements}</p>
            </div>

            <button
              onClick={() => {
                onApply(selectedJob.id);
                setSelectedJob(null);
              }}
              className="w-full py-4 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchJobs;
