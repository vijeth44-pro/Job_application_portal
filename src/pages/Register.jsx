import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

const Register = ({ onRegister, onNavigate }) => {
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onRegister(registerForm);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full Name"
            value={registerForm.fullName}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, fullName: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, email: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={(e) =>
              setRegisterForm({ ...registerForm, password: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={registerForm.confirmPassword}
            onChange={(e) =>
              setRegisterForm({
                ...registerForm,
                confirmPassword: e.target.value
              })
            }
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <button className="w-full py-3 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-blue-600">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
