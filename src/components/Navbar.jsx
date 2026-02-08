import React, { useState } from 'react';
import { Briefcase, LogOut, Menu } from 'lucide-react';

const Navbar = ({ currentUser, onLogout, onNavigate }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-800 to-blue-500 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-transparent">
              JobPortal
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {currentUser ? (
              <>
                <button
                  onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}
                  className="text-slate-600 hover:text-slate-900 transition"
                >
                  Dashboard
                </button>
                {currentUser.role === 'user' && (
                  <>
                    <button onClick={() => onNavigate('search-jobs')} className="text-slate-600 hover:text-slate-900 transition">
                      Find Jobs
                    </button>
                    <button onClick={() => onNavigate('my-applications')} className="text-slate-600 hover:text-slate-900 transition">
                      My Applications
                    </button>
                    <button onClick={() => onNavigate('profile')} className="text-slate-600 hover:text-slate-900 transition">
                      Profile
                    </button>
                  </>
                )}
                <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onNavigate('landing')} className="text-slate-600 hover:text-slate-900 transition">
                  Home
                </button>
                <button onClick={() => onNavigate('login')} className="px-4 py-2 text-slate-700 hover:text-slate-900 transition">
                  Login
                </button>
                <button onClick={() => onNavigate('register')} className="px-4 py-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg hover:shadow-lg transition">
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-slate-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-slate-200">
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { onNavigate(currentUser.role === 'admin' ? 'admin-dashboard' : 'user-dashboard'); setShowMobileMenu(false); }}
                  className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded"
                >
                  Dashboard
                </button>
                {currentUser.role === 'user' && (
                  <>
                    <button onClick={() => { onNavigate('search-jobs'); setShowMobileMenu(false); }} className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded">
                      Find Jobs
                    </button>
                    <button onClick={() => { onNavigate('my-applications'); setShowMobileMenu(false); }} className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded">
                      My Applications
                    </button>
                    <button onClick={() => { onNavigate('profile'); setShowMobileMenu(false); }} className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded">
                      Profile
                    </button>
                  </>
                )}
                <button onClick={() => { onLogout(); setShowMobileMenu(false); }} className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button onClick={() => { onNavigate('landing'); setShowMobileMenu(false); }} className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded">
                  Home
                </button>
                <button onClick={() => { onNavigate('login'); setShowMobileMenu(false); }} className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded">
                  Login
                </button>
                <button onClick={() => { onNavigate('register'); setShowMobileMenu(false); }} className="px-4 py-2 text-left text-slate-700 hover:bg-slate-50 rounded">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
