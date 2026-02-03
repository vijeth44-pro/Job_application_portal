import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function AdminJobs() {
  /* =====================
     COMPANIES STATE
     ===================== */
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    role: ""
  });

  const addCompany = () => {
    if (!newCompany.name || !newCompany.role) return;

    setCompanies([
      ...companies,
      { id: Date.now(), ...newCompany }
    ]);

    setNewCompany({ name: "", role: "" });
  };

  const removeCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  /* =====================
     JOBS STATE
     ===================== */
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    type: ""
  });

  const addJob = () => {
    if (!newJob.title || !newJob.company || !newJob.type) return;

    setJobs([
      ...jobs,
      { id: Date.now(), ...newJob }
    ]);

    setNewJob({ title: "", company: "", type: "" });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        {/* TOPBAR */}
        <div className="topbar">
          <h2>Admin Dashboard</h2>
          <div className="profile">Admin</div>
        </div>

        {/* =====================
            COMPANIES SECTION
           ===================== */}
        <h3>Manage Companies</h3>

        <div className="company-form">
          <input
            placeholder="Company Name"
            value={newCompany.name}
            onChange={(e) =>
              setNewCompany({ ...newCompany, name: e.target.value })
            }
          />

          <input
            placeholder="Industry / Role"
            value={newCompany.role}
            onChange={(e) =>
              setNewCompany({ ...newCompany, role: e.target.value })
            }
          />

          <button className="small-btn" onClick={addCompany}>
            Add Company
          </button>
        </div>

        {companies.length === 0 && (
          <p style={{ color: "#777" }}>No companies added yet.</p>
        )}

        <div className="dashboard-company-grid">
          {companies.map((company) => (
            <div className="dashboard-company-card" key={company.id}>
              <div className="company-avatar"></div>
              <h4>{company.name}</h4>
              <p>{company.role}</p>
              <button
                className="danger-btn"
                onClick={() => removeCompany(company.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* =====================
            JOBS SECTION
           ===================== */}
        <h3 style={{ marginTop: "40px" }}>Manage Jobs</h3>

        <div className="job-form">
          <input
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) =>
              setNewJob({ ...newJob, title: e.target.value })
            }
          />

          <input
            placeholder="Company Name"
            value={newJob.company}
            onChange={(e) =>
              setNewJob({ ...newJob, company: e.target.value })
            }
          />

          <select
            value={newJob.type}
            onChange={(e) =>
              setNewJob({ ...newJob, type: e.target.value })
            }
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

        {jobs.length === 0 && (
          <p style={{ color: "#777" }}>No jobs added yet.</p>
        )}

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
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.type}</td>
                <td>
                  <button
                    className="danger-btn"
                    onClick={() => deleteJob(job.id)}
                  >
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
