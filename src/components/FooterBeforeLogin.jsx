import React from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const go = (page) => {
    navigate(`/${page}`);
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <footer className="bg-gradient-to-r from-[#0f172a] via-[#0b1f3a] to-[#1e3a8a] text-slate-300 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="text-blue-400">Job</span>Portal
            </h2>
            <p className="text-sm text-slate-400">
              Find your dream job with top companies worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 border-l-4 border-blue-500 pl-3">
              Links
            </h3>

            <ul className="space-y-3 text-sm">

              {!currentUser ? (
                <>
                  <li onClick={() => go("")} className="cursor-pointer hover:text-blue-400">
                    Home
                  </li>

                  <li onClick={() => go("login")} className="cursor-pointer hover:text-blue-400">
                    Login
                  </li>

                  <li onClick={() => go("register")} className="cursor-pointer hover:text-blue-400">
                    Sign Up
                  </li>
                </>
              ) : (
                <>
                  <li onClick={() => go("dashboard")} className="cursor-pointer hover:text-blue-400">
                    Dashboard
                  </li>

                  <li onClick={() => go("jobs")} className="cursor-pointer hover:text-blue-400">
                    Find Jobs
                  </li>

                  <li onClick={() => go("about")} className="cursor-pointer hover:text-blue-400">
                    About
                  </li>
                </>
              )}

            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 border-l-4 border-blue-500 pl-3">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4 border-l-4 border-blue-500 pl-3">
              Follow Us
            </h3>

            <div className="flex gap-5">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-400" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-500" />
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 text-sm text-slate-400 text-center">
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;