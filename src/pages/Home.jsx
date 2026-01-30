import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h2>Welcome Home 🎉</h2>
      <p>You are successfully logged in.</p>

      <button onClick={() => navigate("/login")}>
        Logout
      </button>
    </div>
  );
}
