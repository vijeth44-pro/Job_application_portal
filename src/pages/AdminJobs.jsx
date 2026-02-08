import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { storage } from "../utils/storage";

export default function AdminJobs() {

  /* ===================== USERS (FIXED) ===================== */
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = storage.getUsers();
    if (savedUsers) {
      setUsers(savedUsers.filter(u => u.role === "user"));
    }
  }, []);

  /* ===================== COMPANIES ===================== */
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem("admin_companies");
    return saved ? JSON.parse(saved) : [];
  });

  const [newCompany, setNewCompany] = useState({
    name: "",
    role: ""
  });

  const addCompany = () => {
    if (!newCompany.name || !newCompany.role) return;

    const updated = [...companies, { id: Date.now(), ...newCompany }];
    setCompanies(updated);
    localStorage.setItem("admin_companies", JSON.stringify(updated));

    setNewCompany({ name: "", role: "" });
  };

  const removeCompany = (id) => {
    const updated = companies.filter(c => c.id !== id);
    setCompanies(updated);
    localStorage.setItem("admin_companies", JSON.stringify(updated));
  };

  /* ===================== JOBS ===================== */
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("admin_jobs");
    return saved ? JSON.parse(saved) : [];
  });

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    type: ""
  });

  const addJob = () => {
    if (!newJob.title || !newJob.company || !newJob.type) return;

    const updated = [...jobs, { id: Date.now(), ...newJob }];
    setJobs(updated);
    localStorage.setItem("admin_jobs", JSON.stringify(updated));

    setNewJob({ title: "", company: "", type: "" });
  };

  const deleteJob = (id) => {
    const updated = jobs.filter(job => job.id !== id);
    setJobs(updated);
    localStorage.setItem("admin_jobs", JSON.stringify(updated));
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <div className="topbar">
          <h2>Admin Dashboard</h2>
          <div className="profile">Admin</div>
        </div>

        {/* ================= USERS (NEW FIX) ================= */}
        <h3>Registered Users</h3>

        {users.length === 0 && (
          <p style={{ color: "#777" }}>No users registered yet.</p>
        )}

        <table className="app-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.profile?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= COMPANIES ================= */}
        <h3 style={{ marginTop: "40px" }}>Manage Companies</h3>

        <div className="company-form">
          <input
            placeholder="Company Name"
            value={newCompany.name}
            onChange={e => setNewCompany({ ...newCompany, name: e.target.value })}
          />

          <input
            placeholder="Industry / Role"
            value={newCompany.role}
            onChange={e => setNewCompany({ ...newCompany, role: e.target.value })}
          />

          <button className="small-btn" onClick={addCompany}>
            Add Company
          </button>
        </div>

        <div className="dashboard-company-grid">
          {companies.map(company => (
            <div key={company.id} className="dashboard-company-card">
              <h4>{company.name}</h4>
              <p>{company.role}</p>
              <button className="danger-btn" onClick={() => removeCompany(company.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* ================= JOBS ================= */}
        <h3 style={{ marginTop: "40px" }}>Manage Jobs</h3>

        <div className="job-form">
          <input
            placeholder="Job Title"
            value={newJob.title}
            onChange={e => setNewJob({ ...newJob, title: e.target.value })}
          />

          <input
            placeholder="Company Name"
            value={newJob.company}
            onChange={e => setNewJob({ ...newJob, company: e.target.value })}
          />

          <select
            value={newJob.type}
            onChange={e => setNewJob({ ...newJob, type: e.target.value })}
          >
            <option value="">Select Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Freelance</option>
          </select>

          <button className="primary-btn" onClick={addJob}>
            Add Job
          </button>
        </div>

        <table className="app-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.type}</td>
                <td>
                  <button className="danger-btn" onClick={() => deleteJob(job.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
