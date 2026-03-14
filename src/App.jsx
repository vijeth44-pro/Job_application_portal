import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import SearchJobs from "./pages/SearchJobs";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import About from "./pages/About";
import Track from "./pages/Track";


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchProfile();
    fetchApplications();
  }, []);

  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:9000/jobs/all");
      if (res.data.success) setJobs(res.data.data); // FIXED: was res.data.data
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH PROFILE ================= */
  const fetchProfile = async () => {
    const token = localStorage.getItem("mytoken");
    if (!token) return;

    try {
      const res = await axios.get(
        "http://localhost:9000/auth/profile",
        { headers: { "auth-token": token } }
      );

      if (res.data.success) setCurrentUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH APPLICATIONS ================= */
  const fetchApplications = async () => {
    const token = localStorage.getItem("mytoken");
    if (!token) return;

    try {
      const res = await axios.get(
        "http://localhost:9000/api/applications/my",
        { headers: { "auth-token": token } }
      );

      if (res.data.success) setApplications(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOGIN ================= */
  const handleLogin = () => {
    fetchProfile();
    fetchApplications();
    navigate("/dashboard");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("mytoken");
    setCurrentUser(null);
    setApplications([]);
    navigate("/");
  };

  /* ================= APPLY JOB ================= */
  const handleApply = async (jobId) => {
    const token = localStorage.getItem("mytoken");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:9000/api/applications/apply/${jobId}`,
        {},
        { headers: { "auth-token": token } }
      );

      if (res.data.success) {
        alert("Applied Successfully");
        fetchApplications();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  /* ================= WITHDRAW APPLICATION ================= */
  const handleWithdraw = async (id) => {
    const token = localStorage.getItem("mytoken");

    try {
      await axios.delete(
        `http://localhost:9000/api/applications/withdraw/${id}`,
        { headers: { "auth-token": token } }
      );

      fetchApplications();
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async (data) => {
    const token = localStorage.getItem("mytoken");

    const res = await axios.put(
      "http://localhost:9000/auth/profile/update",
      data,
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      alert("Profile Updated Successfully");
      fetchProfile();
    }
  };

  return (
    <div className="app-container">

      {location.pathname !== "/login" &&
        location.pathname !== "/register" && (
          <Navbar currentUser={currentUser} onLogout={handleLogout} />
        )}

      {(location.pathname === "/login" ||
        location.pathname === "/register") && (
          <div className="p-4">
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              &larr; Back to Home
            </Link>
          </div>
        )}

      <Routes>
        <Route path="/" element={<Landing jobs={jobs} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/dashboard"
          element={
            <UserDashboard
              currentUser={currentUser}
              applications={applications}
              jobs={jobs}
            />
          }
        />

        <Route
          path="/jobs"
          element={<SearchJobs onApply={handleApply} />}
        />

        <Route
          path="/profile"
          element={
            <Profile
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          }
        />

        <Route
          path="/applications"
          element={
            <MyApplications
              applications={applications}
              jobs={jobs}
              onWithdraw={handleWithdraw}
            />
          }
        />

        <Route
          path="/track"
          element={
            <Track
              applications={applications}
              refreshApplications={fetchApplications}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;