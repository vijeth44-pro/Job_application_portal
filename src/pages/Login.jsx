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
          <div className="inline-block bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('register')} className="text-indigo-600 font-semibold hover:text-indigo-700">
            Sign up
          </button>
        </p>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>User: user@example.com / user123</p>
          <p>Admin: admin@example.com / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
