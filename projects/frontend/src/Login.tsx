// src/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Simulate async auth — replace with real API call if needed
    setTimeout(() => {
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('isLoggedIn', 'true');
      setLoading(false);
      navigate('/team-setup');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-2xl font-black">C</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-1 tracking-tight">ContribChain</h1>
          <p className="text-blue-300 text-sm font-medium tracking-wide uppercase">
            Blockchain · Contributions · Algorand
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/15">

          <h2 className="text-2xl font-bold text-white mb-1">Student Login</h2>
          <p className="text-blue-200/70 text-sm mb-8">
            Sign in to log and track your group contributions
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-blue-200 mb-2 text-sm font-semibold">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-blue-200 mb-2 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300/40 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all
                bg-gradient-to-r from-blue-500 to-cyan-500
                hover:from-blue-600 hover:to-cyan-600
                hover:scale-[1.02] active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                text-sm tracking-wide"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-blue-200/50 text-xs">
              Your activity is recorded immutably on the Algorand blockchain
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-blue-300/40 text-xs">
          © 2025 ContribChain · Secured by Algorand
        </p>
      </div>
    </div>
  );
};

export default Login;
