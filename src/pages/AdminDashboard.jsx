import React, { useState } from 'react';
import { Users, Shield, Briefcase, Activity, Eye, Trash2, X } from 'lucide-react';

const AdminDashboard = ({ users, jobs, applications, onBlockUser, onDeleteJob, onAddJob }) => {
  const [adminView, setAdminView] = useState('overview');
  const [editingUser, setEditingUser] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: ''
  });

  const totalUsers = users.filter(u => u.role === 'user').length;
  const blockedUsers = users.filter(u => u.blocked).length;
  const totalApplications = applications.length;

  const handleAddJob = (e) => {
    e.preventDefault();
    onAddJob(jobForm);
    setJobForm({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h2>

        {/* Admin Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setAdminView('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              adminView === 'overview' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setAdminView('users')}
            className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              adminView === 'users' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setAdminView('jobs')}
            className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              adminView === 'jobs' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Manage Jobs
          </button>
          <button
            onClick={() => setAdminView('applications')}
            className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              adminView === 'applications' 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Applications
          </button>
        </div>

        {/* Overview */}
        {adminView === 'overview' && (
          <div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-3xl font-bold text-slate-900">{totalUsers}</span>
                </div>
                <p className="text-slate-600 font-medium">Total Users</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-3xl font-bold text-slate-900">{blockedUsers}</span>
                </div>
                <p className="text-slate-600 font-medium">Blocked Users</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-3xl font-bold text-slate-900">{jobs.length}</span>
                </div>
                <p className="text-slate-600 font-medium">Active Jobs</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-3xl font-bold text-slate-900">{totalApplications}</span>
                </div>
                <p className="text-slate-600 font-medium">Applications</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {applications.slice(-5).reverse().map(app => {
                  const job = jobs.find(j => j.id === app.jobId);
                  return (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{app.userName}</p>
                        <p className="text-sm text-slate-600">Applied for {job?.title || 'Deleted Job'}</p>
                      </div>
                      <span className="text-sm text-slate-500">{app.appliedDate}</span>
                    </div>
                  );
                })}
                {applications.length === 0 && (
                  <p className="text-slate-500 text-center py-4">No applications yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Manage Users */}
        {adminView === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">User Management</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Applications</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role === 'user').map(user => (
                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.profile?.name || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.blocked 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {user.blocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {applications.filter(app => app.userId === user.id).length}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onBlockUser(user.id)}
                            className={`p-2 rounded-lg ${
                              user.blocked 
                                ? 'text-green-600 hover:bg-green-50' 
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={user.blocked ? 'Unblock' : 'Block'}
                          >
                            <Shield className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editingUser && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">User Details</h3>
                    <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <p className="text-slate-900">{editingUser.email}</p>
                    </div>
                    {editingUser.profile && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                          <p className="text-slate-900">{editingUser.profile.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                          <p className="text-slate-900">{editingUser.profile.phone}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                          <p className="text-slate-900">{editingUser.profile.location}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                          <p className="text-slate-900">{editingUser.profile.experience}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Skills</label>
                          <p className="text-slate-900">{editingUser.profile.skills}</p>
                        </div>
                      </>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Applications</label>
                      <p className="text-slate-900">
                        {applications.filter(app => app.userId === editingUser.id).length} total applications
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Manage Jobs */}
        {adminView === 'jobs' && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Add New Job</h3>
              <form onSubmit={handleAddJob} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      required
                      value={jobForm.title}
                      onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                    <input
                      type="text"
                      required
                      value={jobForm.company}
                      onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                    <input
                      type="text"
                      required
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                    <select
                      value={jobForm.type}
                      onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Salary Range</label>
                    <input
                      type="text"
                      required
                      value={jobForm.salary}
                      onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    required
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Requirements</label>
                  <textarea
                    required
                    value={jobForm.requirements}
                    onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    rows="3"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Post Job
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Existing Jobs</h3>
              <div className="space-y-4">
                {jobs.map(job => (
                  <div key={job.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{job.title}</h4>
                        <p className="text-slate-600">{job.company} - {job.location}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          Posted {job.postedDate} • {applications.filter(app => app.jobId === job.id).length} applications
                        </p>
                      </div>
                      <button
                        onClick={() => onDeleteJob(job.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Applications Monitor */}
        {adminView === 'applications' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Application Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Applicant</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Job</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Applied Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => {
                    const job = jobs.find(j => j.id === app.jobId);
                    return (
                      <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">{app.userName}</td>
                        <td className="py-3 px-4">{app.userEmail}</td>
                        <td className="py-3 px-4">{job?.title || 'Deleted Job'}</td>
                        <td className="py-3 px-4">{app.appliedDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            app.status === 'withdrawn' ? 'bg-red-100 text-red-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {applications.length === 0 && (
                <p className="text-center py-8 text-slate-500">No applications yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
