import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SearchJobs from './pages/SearchJobs';
import MyApplications from './pages/MyApplications';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { initialJobs, initialUsers } from './utils/data';
import { storage } from './utils/storage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('landing');
  const [jobs, setJobs] = useState(initialJobs);
  const [users, setUsers] = useState(initialUsers);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedJobs = storage.getJobs();
    const savedUsers = storage.getUsers();
    const savedApplications = storage.getApplications();
    const savedCurrentUser = storage.getCurrentUser();

    if (savedJobs) setJobs(savedJobs);
    if (savedUsers) setUsers(savedUsers);
    if (savedApplications) setApplications(savedApplications);
    if (savedCurrentUser) {
      setCurrentUser(savedCurrentUser);
      setView(savedCurrentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    }
  }, []);

  // URL → view
  useEffect(() => {
    const pathToView = {
      '/': 'landing',
      '/login': 'login',
      '/register': 'register',
      '/profile': 'profile',
      '/jobs': 'search-jobs',
      '/applications': 'my-applications',
      '/user-dashboard': 'user-dashboard',
      '/admin-dashboard': 'admin-dashboard',
    };

    setView(pathToView[location.pathname] || 'landing');
  }, [location.pathname]);

  // view → URL
  useEffect(() => {
    const viewToPath = {
      landing: '/',
      login: '/login',
      register: '/register',
      profile: '/profile',
      'search-jobs': '/jobs',
      'my-applications': '/applications',
      'user-dashboard': '/user-dashboard',
      'admin-dashboard': '/admin-dashboard',
    };

    navigate(viewToPath[view] || '/');
  }, [view, navigate]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    storage.setJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    storage.setUsers(users);
  }, [users]);

  useEffect(() => {
    storage.setApplications(applications);
  }, [applications]);

  useEffect(() => {
    storage.setCurrentUser(currentUser);
  }, [currentUser]);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Authentication handlers
  const handleLogin = (loginForm) => {
    const user = users.find(
      u => u.email === loginForm.email && u.password === loginForm.password
    );

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    if (user.blocked) {
      setError('Your account has been blocked. Contact admin.');
      return;
    }

    setCurrentUser(user);
    setView(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    setSuccess('Login successful!');
  };

  const handleRegister = (registerForm) => {
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (users.find(u => u.email === registerForm.email)) {
      setError('Email already registered');
      return;
    }

    const newUser = {
      id: users.length + 1,
      email: registerForm.email,
      password: registerForm.password,
      role: 'user',
      profile: null,
      blocked: false
    };

    setUsers([...users, newUser]);
    setSuccess('Registration successful! Please login.');
    setView('login');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('landing');
    setSuccess('Logged out successfully');
  };

  // Profile handlers
  const handleUpdateProfile = (profileForm) => {
    const updatedUsers = users.map(u =>
      u.id === currentUser.id ? { ...u, profile: profileForm } : u
    );
    setUsers(updatedUsers);
    setCurrentUser({ ...currentUser, profile: profileForm });
    setSuccess('Profile updated successfully!');
  };

  // Job application handlers
  const handleApplyJob = (jobId) => {
    if (!currentUser.profile) {
      setError('Please complete your profile before applying');
      return;
    }

    const existingApp = applications.find(
      app =>
        app.jobId === jobId &&
        app.userId === currentUser.id &&
        app.status !== 'withdrawn'
    );

    if (existingApp) {
      setError('You have already applied for this job');
      return;
    }

    const newApplication = {
      id: applications.length + 1,
      jobId,
      userId: currentUser.id,
      userName: currentUser.profile.name,
      userEmail: currentUser.email,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setApplications([...applications, newApplication]);
    setSuccess('Application submitted successfully!');
  };

  const handleWithdrawApplication = (appId) => {
    const updatedApps = applications.map(app =>
      app.id === appId ? { ...app, status: 'withdrawn' } : app
    );
    setApplications(updatedApps);
    setSuccess('Application withdrawn');
  };

  // Admin handlers
  const handleAddJob = (jobForm) => {
    const newJob = {
      id: jobs.length + 1,
      ...jobForm,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setJobs([...jobs, newJob]);
    setSuccess('Job posted successfully!');
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter(j => j.id !== jobId));
    setSuccess('Job deleted successfully!');
  };

  const handleBlockUser = (userId) => {
    const updatedUsers = users.map(u =>
      u.id === userId ? { ...u, blocked: !u.blocked } : u
    );
    setUsers(updatedUsers);
    setSuccess('User status updated');
  };

  const userApplications = currentUser
    ? applications.filter(app => app.userId === currentUser.id)
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <Navbar currentUser={currentUser} onLogout={handleLogout} onNavigate={setView} />

      <Routes>
        <Route path="/" element={<Landing onNavigate={setView} jobs={jobs} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onNavigate={setView} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} onNavigate={setView} />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} onUpdateProfile={handleUpdateProfile} />} />
        <Route path="/jobs" element={<SearchJobs jobs={jobs} onApply={handleApplyJob} />} />
        <Route
          path="/applications"
          element={
            <MyApplications
              applications={userApplications}
              jobs={jobs}
              onWithdraw={handleWithdrawApplication}
              onNavigate={setView}
            />
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <UserDashboard
              currentUser={currentUser}
              applications={userApplications}
              jobs={jobs}
              onNavigate={setView}
            />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminDashboard
              users={users}
              jobs={jobs}
              applications={applications}
              onBlockUser={handleBlockUser}
              onDeleteJob={handleDeleteJob}
              onAddJob={handleAddJob}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
