import React, { useState } from 'react';
import {
  Users,
  Shield,
  Briefcase,
  Activity,
  Eye,
  Trash2,
  X
} from 'lucide-react';

const AdminDashboard = ({
  users = [],
  jobs = [],
  applications = [],
  onBlockUser,
  onDeleteJob,
  onAddJob
}) => {
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

  /* ================= STATS ================= */
  const totalUsers = users.filter(u => u.role === 'user').length;
  const blockedUsers = users.filter(u => u.blocked).length;
  const totalApplications = applications.length;

  /* ================= ADD JOB ================= */
  const handleAddJob = (e) => {
    e.preventDefault();

    if (!jobForm.title || !jobForm.company) return;

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
        <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

        {/* ================= NAVIGATION ================= */}
        <div className="bg-white rounded-xl shadow p-2 mb-8 flex gap-2">
          {['overview', 'users', 'jobs', 'applications'].map(view => (
            <button
              key={view}
              onClick={() => setAdminView(view)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                adminView === view
                  ? 'bg-gradient-to-r from-blue-800 to-blue-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {view.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ================= OVERVIEW ================= */}
        {adminView === 'overview' && (
          <div className="grid md:grid-cols-4 gap-6">
            <Stat title="Users" value={totalUsers} />
            <Stat title="Blocked Users" value={blockedUsers} />
            <Stat title="Jobs" value={jobs.length} />
            <Stat title="Applications" value={totalApplications} />
          </div>
        )}

        {/* ================= USERS ================= */}
        {adminView === 'users' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-6">User Management</h3>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th>Email</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.filter(u => u.role === 'user').map(user => (
                  <tr key={user.id} className="border-b">
                    <td>{user.email}</td>
                    <td>{user.profile?.name || 'N/A'}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.blocked
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {user.blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td>
                      {applications.filter(a => a.userId === user.id).length}
                    </td>
                    <td className="flex gap-3">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-blue-600"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onBlockUser(user.id)}
                        className="text-red-600"
                        title="Block / Unblock"
                      >
                        <Shield size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= USER DETAILS MODAL ================= */}
            {editingUser && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl max-w-xl w-full">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-bold">User Details</h3>
                    <button onClick={() => setEditingUser(null)}>
                      <X />
                    </button>
                  </div>

                  <p><b>Email:</b> {editingUser.email}</p>
                  <p><b>Name:</b> {editingUser.profile?.name || 'N/A'}</p>
                  <p><b>Phone:</b> {editingUser.profile?.phone || 'N/A'}</p>
                  <p><b>Location:</b> {editingUser.profile?.location || 'N/A'}</p>
                  <p><b>Experience:</b> {editingUser.profile?.experience || 'N/A'}</p>
                  <p><b>Skills:</b> {editingUser.profile?.skills || 'N/A'}</p>

                  {/* RESUME */}
                  {editingUser.profile?.resume && (
                    <div className="mt-4">
                      <b>Resume:</b>{' '}
                      <a
                        href={editingUser.profile.resume.data}
                        download={editingUser.profile.resume.name}
                        className="text-blue-600 underline"
                      >
                        {editingUser.profile.resume.name}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= JOBS ================= */}
        {adminView === 'jobs' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Add New Job</h3>

            <form onSubmit={handleAddJob} className="grid gap-3">
              <input placeholder="Title" value={jobForm.title}
                onChange={e => setJobForm({ ...jobForm, title: e.target.value })} className="border p-2 rounded" />

              <input placeholder="Company" value={jobForm.company}
                onChange={e => setJobForm({ ...jobForm, company: e.target.value })} className="border p-2 rounded" />

              <input placeholder="Location" value={jobForm.location}
                onChange={e => setJobForm({ ...jobForm, location: e.target.value })} className="border p-2 rounded" />

              <input placeholder="Salary" value={jobForm.salary}
                onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} className="border p-2 rounded" />

              <textarea placeholder="Description" value={jobForm.description}
                onChange={e => setJobForm({ ...jobForm, description: e.target.value })} className="border p-2 rounded" />

              <textarea placeholder="Requirements" value={jobForm.requirements}
                onChange={e => setJobForm({ ...jobForm, requirements: e.target.value })} className="border p-2 rounded" />

              <button className="bg-blue-600 text-white py-2 rounded">
                Post Job
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {jobs.map(job => (
                <div key={job.id} className="border p-4 rounded">
                  <h4 className="font-bold">{job.title}</h4>
                  <p className="text-sm text-gray-500">{job.company}</p>

                  <button
                    onClick={() => onDeleteJob(job.id)}
                    className="text-red-600 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= APPLICATIONS ================= */}
        {adminView === 'applications' && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Applications</h3>

            {applications.map(app => (
              <div key={app.id} className="border p-4 rounded mb-2">
                <p><b>{app.userName}</b> ({app.userEmail})</p>
                <p>Status: {app.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */
const Stat = ({ title, value }) => (
  <div className="bg-white shadow p-6 rounded-xl">
    <p className="text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
