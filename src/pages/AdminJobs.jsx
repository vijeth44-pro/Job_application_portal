import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "UI Designer", company: "Highspeed Studios", type: "Full Time" },
    { id: 2, title: "React Developer", company: "Funk Inc", type: "Part Time" }
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    type: ""
  });

  const addJob = () => {
    if (!newJob.title || !newJob.company || !newJob.type) return;

    setJobs([...jobs, { ...newJob, id: Date.now() }]);
    setNewJob({ title: "", company: "", type: "" });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Topbar title="Manage Jobs" />

        {/* ADD JOB FORM */}
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
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Freelance">Freelance</option>
          </select>

          <button className="primary-btn" onClick={addJob}>
            Add Job
          </button>
        </div>

        {/* JOB LIST */}
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
