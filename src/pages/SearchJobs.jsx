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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
            Find Your Next Opportunity
          </h2>

          {/* Glass Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, company, or location..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl
                bg-white/70 backdrop-blur-xl
                border border-white/60
                shadow-md
                focus:outline-none focus:ring-2 focus:ring-blue-400/30
                transition-all duration-300"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8">
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className="bg-white/70 backdrop-blur-2xl
                border border-white/60
                rounded-3xl p-8
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                hover:scale-[1.01]
                transition-all duration-500 ease-out
                animate-fadeUp"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Building className="w-4 h-4" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                </div>

                <span className="px-4 py-2
                  bg-blue-100/80
                  text-blue-700
                  rounded-full text-sm font-medium">
                  {job.type}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-5 text-sm">
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

              <p className="text-slate-600 mb-6 line-clamp-2">
                {job.description}
              </p>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3
                  bg-blue-600 text-white
                  rounded-xl font-semibold
                  shadow-md
                  hover:shadow-lg
                  hover:scale-105
                  active:scale-95
                  transition-all duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm
          flex items-center justify-center p-4 z-50
          animate-fadeIn"
        >
          <div className="bg-white/90 backdrop-blur-2xl
            border border-white/50
            rounded-3xl max-w-3xl w-full
            max-h-[90vh] overflow-y-auto
            p-10
            shadow-2xl
            animate-scaleIn
            transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedJob.title}
                </h3>
                <p className="text-lg text-slate-600">
                  {selectedJob.company}
                </p>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-5 h-5" />
                {selectedJob.location}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-5 h-5" />
                {selectedJob.type}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <DollarSign className="w-5 h-5" />
                {selectedJob.salary}
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-5 h-5" />
                Posted {selectedJob.postedDate}
              </div>
            </div>

            <button
              onClick={() => {
                onApply(selectedJob.id);
                setSelectedJob(null);
              }}
              className="w-full py-4
                bg-blue-600 text-white
                rounded-2xl font-semibold
                shadow-lg
                hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-300"
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
