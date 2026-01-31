import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">Jobie</div>

      <nav>
        <Link className="active">Dashboard</Link>
        <Link to="/companies">Search Job</Link>
        <Link to="/">Applications</Link>
        <Link>Message</Link>
        <Link>Statistics</Link>
        <Link>News</Link>
      </nav>
    </div>
  );
}
