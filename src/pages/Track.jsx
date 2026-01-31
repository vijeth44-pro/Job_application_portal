import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Track() {
  const applications = [
    { id: 1, job: "UI Designer", status: "Pending" },
    { id: 2, job: "React Developer", status: "Candidate" }
  ];

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Track Applications" />

        <table className="app-table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.job}</td>
                <td>
                  <span className={`badge ${app.status}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
