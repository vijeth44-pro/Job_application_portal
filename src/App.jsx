import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SearchJobs from "./pages/SearchJobs";
import MyApplications from "./pages/MyApplications";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import { initialJobs, initialUsers } from "./utils/data";
import { storage } from "./utils/storage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("landing");

  const [jobs, setJobs] = useState(initialJobs);
  const [users, setUsers] = useState(initialUsers);
  const [applications, setApplications] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= LOAD FROM STORAGE (FIXED) ================= */
  useEffect(() => {
    const savedJobs = storage.getJobs();
    const savedUsers = storage.getUsers();
    const savedApplications = storage.getApplications();
    const savedCurrentUser = storage.getCurrentUser();

    if (savedJobs) setJobs(savedJobs);

    // ✅ SAFE MERGE USERS (ADMIN + NEW USERS)
    if (savedUsers) {
      const mergedUsers = [...initialUsers];

      savedUsers.forEach(user => {
        if (!mergedUsers.some(u => u.email === user.email)) {
          mergedUsers.push(user);
        }
      });

      setUsers(mergedUsers);
    } else {
      setUsers(initialUsers);
    }

    if (savedApplications) setApplications(savedApplications);

    if (savedCurrentUser) {
      setCurrentUser(savedCurrentUser);
      setView(
        savedCurrentUser.role === "admin"
          ? "admin-dashboard"
          : "user-dashboard"
      );
    }
  }, []);

  /* ================= URL ↔ VIEW ================= */
  useEffect(() => {
    const pathToView = {
      "/": "landing",
      "/login": "login",
      "/register": "register",
      "/profile": "profile",
      "/jobs": "search-jobs",
      "/applications": "my-applications",
      "/user-dashboard": "user-dashboard",
      "/admin-dashboard": "admin-dashboard"
    };

    setView(pathToView[location.pathname] || "landing");
  }, [location.pathname]);

  useEffect(() => {
    const viewToPath = {
      landing: "/",
      login: "/login",
      register: "/register",
      profile: "/profile",
      "search-jobs": "/jobs",
      "my-applications": "/applications",
      "user-dashboard": "/user-dashboard",
      "admin-dashboard": "/admin-dashboard"
    };

    navigate(viewToPath[view] || "/");
  }, [view, navigate]);

  /* ================= SAVE TO STORAGE ================= */
  useEffect(() => storage.setJobs(jobs), [jobs]);
  useEffect(() => storage.setUsers(users), [users]);
  useEffect(() => storage.setApplications(applications), [applications]);
  useEffect(() => storage.setCurrentUser(currentUser), [currentUser]);

  /* ================= AUTO CLEAR ALERT ================= */
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  /* ================= LOGIN ================= */
  const handleLogin = (loginForm) => {
    const user = users.find(
      u =>
        u.email === loginForm.email &&
        u.password === loginForm.password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    if (user.blocked) {
      setError("Your account has been blocked");
      return;
    }

    setCurrentUser(user);
    setView(user.role === "admin" ? "admin-dashboard" : "user-dashboard");
    setSuccess("Login successful!");
  };

  /* ================= REGISTER ================= */
  const handleRegister = (registerForm) => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (users.some(u => u.email === registerForm.email)) {
      setError("Email already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      email: registerForm.email,
      password: registerForm.password,
      role: "user",
      blocked: false,
      profile: {
        name: registerForm.fullName,
        phone: "",
        location: "",
        experience: "",
        skills: "",
        resume: null
      }
    };

    setUsers(prev => [...prev, newUser]);
    setSuccess("Registration successful! Please login.");
    setView("login");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("landing");
    setSuccess("Logged out successfully");
  };

  /* ================= PROFILE UPDATE ================= */
  const handleUpdateProfile = (profileForm) => {
    setUsers(users =>
      users.map(u =>
        u.id === currentUser.id ? { ...u, profile: profileForm } : u
      )
    );

    setCurrentUser({ ...currentUser, profile: profileForm });
    setSuccess("Profile updated successfully!");
  };

  /* ================= JOB APPLY ================= */
  const handleApplyJob = (jobId) => {
    if (!currentUser.profile) {
      setError("Please complete your profile first");
      return;
    }

    const exists = applications.some(
      a =>
        a.jobId === jobId &&
        a.userId === currentUser.id &&
        a.status !== "withdrawn"
    );

    if (exists) {
      setError("Already applied");
      return;
    }

    const newApp = {
      id: Date.now(),
      jobId,
      userId: currentUser.id,
      userName: currentUser.profile.name,
      userEmail: currentUser.email,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "pending"
    };

    setApplications(prev => [...prev, newApp]);
    setSuccess("Application submitted");
  };

  const handleWithdrawApplication = (appId) => {
    setApplications(apps =>
      apps.map(a =>
        a.id === appId ? { ...a, status: "withdrawn" } : a
      )
    );
    setSuccess("Application withdrawn");
  };

  /* ================= ADMIN ACTIONS ================= */
  const handleAddJob = (jobForm) => {
    const newJob = {
      id: Date.now(),
      ...jobForm,
      postedDate: new Date().toISOString().split("T")[0],
      status: "active"
    };

    setJobs(prev => [...prev, newJob]);
    setSuccess("Job added successfully!");
  };

  const handleDeleteJob = (jobId) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    setSuccess("Job deleted successfully!");
  };

  const handleBlockUser = (userId) => {
    setUsers(users =>
      users.map(u =>
        u.id === userId ? { ...u, blocked: !u.blocked } : u
      )
    );
    setSuccess("User status updated");
  };

  const userApplications = currentUser
    ? applications.filter(a => a.userId === currentUser.id)
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={setView}
      />

      <Routes>
        <Route path="/" element={<Landing onNavigate={setView} jobs={jobs} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onNavigate={setView} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} onNavigate={setView} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} onUpdateProfile={handleUpdateProfile} />} />
        <Route path="/jobs" element={<SearchJobs jobs={jobs} onApply={handleApplyJob} />} />
        <Route
          path="/applications"
          element={<MyApplications applications={userApplications} jobs={jobs} onWithdraw={handleWithdrawApplication} onNavigate={setView} />}
        />
        <Route
          path="/user-dashboard"
          element={<UserDashboard currentUser={currentUser} applications={userApplications} jobs={jobs} onNavigate={setView} />}
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminDashboard
              users={users}
              jobs={jobs}
              applications={applications}
              onAddJob={handleAddJob}
              onDeleteJob={handleDeleteJob}
              onBlockUser={handleBlockUser}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
