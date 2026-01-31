import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h4>You can easily</h4>
        <h1>Speed up your work<br />with our Web App</h1>
      </div>

      <div className="auth-right">
        <h2>Create Account</h2>
        <p>Please fill details to register.</p>

        <form>
          <label>Name</label>
          <input placeholder="Enter your name" />

          <label>Email address</label>
          <input placeholder="workmail@gmail.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <div className="checkbox">
            <input type="checkbox" />
            <span>I agree to the Terms & Privacy</span>
          </div>

          <button className="primary-btn">Signup</button>
        </form>

        <p className="switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
