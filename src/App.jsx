import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import SearchJobs from "./pages/SearchJobs";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import About from "./pages/About";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  
  // Mock data for demonstration
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "Remote",
      type: "Full-time",
      salary: "$120k",
      postedDate: "2 days ago",
      description: "React developer needed.",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Data Systems",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k",
      postedDate: "1 week ago",
      description: "Node.js expert.",
    },
  ]);
  const [applications, setApplications] = useState([]);

  const handleNavigate = (page) => {
    switch (page) {
      case "landing":
        navigate("/");
        break;
      case "login":
        navigate("/login");
        break;
      case "register":
        navigate("/register");
        break;
      case "user-dashboard":
        navigate("/dashboard");
        break;
      case "search-jobs":
        navigate("/jobs");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "my-applications":
        navigate("/applications");
        break;
      case "about":
        navigate("/about");
        break;
      default:
        navigate("/");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate("/dashboard");
  };

  return (
    <div className="app-container">
      {location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/dashboard" && (
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {(location.pathname === "/login" || location.pathname === "/register") && (
        <div className="p-4">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">&larr; Back to Home</Link>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Landing onNavigate={handleNavigate} jobs={jobs} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<UserDashboard currentUser={currentUser} applications={applications} jobs={jobs} onNavigate={handleNavigate} onLogout={handleLogout} />} />
        <Route path="/jobs" element={<SearchJobs jobs={jobs} onApply={() => {}} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} onUpdateProfile={() => {}} />} />
        <Route path="/applications" element={<MyApplications applications={applications} jobs={jobs} onWithdraw={() => {}} onNavigate={handleNavigate} />} />
      </Routes>
    </div>
  );
}

export default App;