import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import AdminUsers from "./pages/AdminUsers";
import AdminJobs from "./pages/AdminJobs";
import "./styles.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER */}
        <Route path="/home" element={<Home />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* ADMIN */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
      </Routes>
    </BrowserRouter>
  );
}
