import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";

export default function Home() {
  const jobs = [
    { id: 1, title: "UI Designer", company: "Highspeed Studios" },
    { id: 2, title: "React Developer", company: "Funk Inc" },
    { id: 3, title: "UX Researcher", company: "Mosciski Inc" }
  ];

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <Topbar title="Available Jobs" />

        <div className="job-list">
          {jobs.map(job => (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>

              <div className="job-actions">
                <Link to={`/job/${job.id}`}>
                  <button className="small-btn">View</button>
                </Link>

                <button className="primary-btn">Apply</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
