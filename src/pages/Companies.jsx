import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CompanyCard from "../components/CompanyCard";

export default function Companies() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Companies" />

        <div className="company-grid">
          <CompanyCard name="Simonis Ltd" role="Internet Service Provider" />
          <CompanyCard name="Funk Inc" role="IT Department" />
          <CompanyCard name="Highspeed Studios" role="Creative Agency" />
          <CompanyCard name="Mosciski Inc" role="Design Agency" />
        </div>
      </div>
    </div>
  );
}
