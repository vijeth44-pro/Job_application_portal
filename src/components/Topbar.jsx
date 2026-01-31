export default function Topbar({ title }) {
  return (
    <div className="topbar">
      <h2>{title}</h2>

      <input className="search" placeholder="Search something here..." />

      <div className="profile">
        <span>Oda Dink</span>
        <small>Super Admin</small>
      </div>
    </div>
  );
}
