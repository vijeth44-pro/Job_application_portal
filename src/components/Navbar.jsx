import React from "react";
import { Briefcase } from "lucide-react";

const Navbar = ({ currentUser, onLogout, onNavigate, darkMode, setDarkMode }) => {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div
            onClick={() =>
              onNavigate(currentUser ? "user-dashboard" : "landing")
            }
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="bg-white/20 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              JobPortal
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">

            {/* Home */}
            <button
              onClick={() =>
                onNavigate(currentUser ? "user-dashboard" : "landing")
              }
              className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
            >
              Home
            </button>

            {/* About */}
            <button
              onClick={() => onNavigate("about")}
              className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
            >
              About
            </button>

            {!currentUser ? (
              <>
                {/* Not Logged In */}
                <button
                  onClick={() => onNavigate("login")}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
                >
                  Login
                </button>

                <button
                  onClick={() => onNavigate("register")}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Logged In */}
                <button
                  onClick={() => onNavigate("search-jobs")}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
                >
                  Find Job
                </button>

                <button
                  onClick={() => onNavigate("profile")}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
                >
                  Profile
                </button>

                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-medium rounded-xl shadow-lg hover:bg-white/30 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
