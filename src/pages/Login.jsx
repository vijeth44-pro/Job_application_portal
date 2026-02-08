import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

const Login = ({ onLogin, onNavigate }) => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-blue-800 to-blue-500 p-3 rounded-xl mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              placeholder="you@example.com"
              className="
                w-full px-4 py-3
                border border-slate-300 rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-blue-200
                focus:border-blue-500
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              placeholder="••••••••"
              className="
                w-full px-4 py-3
                border border-slate-300 rounded-lg
                focus:outline-none
                focus:ring-2 focus:ring-blue-200
                focus:border-blue-500
              "
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('register')}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
