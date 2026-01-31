import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ApplicationRow from "../components/ApplicationRow";

export default function Applications() {
  const apps = [
    { id:"#APL-0003", date:"June 1, 2020", company:"Mosciski Inc.", type:"Freelance", role:"Intern UI Designer", status:"Pending" },
    { id:"#APL-0002", date:"June 1, 2020", company:"Funk Inc.", type:"Part Time", role:"Junior UI", status:"OnHold" },
    { id:"#APL-0001", date:"June 1, 2020", company:"Highspeed Studios", type:"Full Time", role:"Senior UX", status:"Candidate" }
  ];

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Applications" />

        <div className="filters">
          <button className="active">All</button>
          <button>Pending</button>
          <button>On-Hold</button>
          <button>Candidate</button>
        </div>

        <table className="app-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date Applied</th>
              <th>Company</th>
              <th>Type</th>
              <th>Position</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a,i)=><ApplicationRow key={i} app={a} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
