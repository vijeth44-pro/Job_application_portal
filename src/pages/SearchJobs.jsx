import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Search, Building, MapPin, DollarSign, Calendar, X } from 'lucide-react';
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FooterAfterLogin from "../components/FooterAfterLogin";

const SearchJobs = ({ onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const navigate = useNavigate();

  const go = (page) => {
    navigate(`/${page}`);
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:9000/jobs/all");
      if (res.data.success) {
        setJobs(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Jobs Error:", err.response?.data || err.message);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Find Your Next Opportunity
          </h2>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="       Search by title, company, or location..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border shadow-md"
            />
          </div>
        </div>

        <div className="grid gap-8">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-3xl p-8 shadow-sm">

              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Building className="w-4 h-4" />
                    <span>{job.company}</span>
                  </div>
                </div>

                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {job.jobType || "Not specified"}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-5 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  {job.salary ? `₹ ${job.salary}` : "Not specified"}
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  Posted {new Date(job.createdAt).toDateString()}
                </div>
              </div>

              <button
                onClick={() => setSelectedJob(job)}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-bold">{selectedJob.title}</h3>
                <p className="text-lg text-slate-600">
                  {selectedJob.company}
                </p>
              </div>
              <button onClick={() => setSelectedJob(null)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-slate-700">
              <p><strong>Title:</strong> {selectedJob.title}</p>
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> {selectedJob.location}</p>
              <p><strong>Job Type:</strong> {selectedJob.jobType || "Not specified"}</p>
              <p><strong>Category:</strong> {selectedJob.category || "Not specified"}</p>
              <p><strong>Work Experience:</strong> {selectedJob.workExperience || "Not specified"}</p>
              <p><strong>Contact Email:</strong> {selectedJob.contactEmail || "Not specified"}</p>
              <p><strong>Salary:</strong> {selectedJob.salary ? `₹ ${selectedJob.salary}` : "Not specified"}</p>
              <p><strong>Description:</strong></p>
              <p>{selectedJob.description || "No description provided."}</p>
            </div>

            <button
              onClick={() => {
                if (selectedJob.applyLink) {
                  window.open(selectedJob.applyLink, "_blank");
                }

                if (onApply) {
                  onApply(selectedJob._id);
                }

                setSelectedJob(null);
              }}
              className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      <FooterAfterLogin />
    </div>

  );
};

export default SearchJobs;