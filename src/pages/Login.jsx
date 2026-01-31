import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // later you will add real authentication here
    navigate("/home"); // ✅ redirect to Home page
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h4>You can easily</h4>
        <h1>Speed up your work<br />with our Web App</h1>

        <div className="partners">
          Discord • Instagram • Spotify • YouTube • TikTok
        </div>
      </div>

      <div className="auth-right">
        <h2>Get Started Now</h2>
        <p>Please login to your account to continue.</p>

        <form onSubmit={handleLogin}>
          <label>Email address</label>
          <input type="email" required placeholder="workmail@gmail.com" />

          <label>
            Password <span className="forgot">Forgot Password?</span>
          </label>
          <input type="password" required placeholder="••••••••" />

          <div className="checkbox">
            <input type="checkbox" required />
            <span>I agree to the Terms & Privacy</span>
          </div>

          <button className="primary-btn" type="submit">
            Login
          </button>
        </form>

        <p className="switch">
          Don’t have an account? <Link to="/register">Signup</Link>
        </p>

        <div className="divider">or</div>

        <div className="social">
          <button className="google">Login with Google</button>
          <button className="apple">Login with Apple</button>
        </div>
      </div>
    </div>
  );
}
