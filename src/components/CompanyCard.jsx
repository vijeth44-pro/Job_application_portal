export default function CompanyCard({ name, role }) {
  return (
    <div className="company-card">
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}
