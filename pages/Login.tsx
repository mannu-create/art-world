
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { LogIn, Mail, Lock, UserCheck, ShieldAlert } from 'lucide-react';

const Login: React.FC = () => {
  const { setUser, users } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication: in a real app, this would be an API call
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      if (foundUser.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Invalid email or password. Use client@example.com or admin@Artworld Photography.com');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-zinc-50 dark:bg-zinc-900 p-10 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 mb-6">
            <LogIn className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-2">Welcome Back</h2>
          <p className="text-zinc-500">Enter your credentials to access your portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" /> Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:outline-none transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <ShieldAlert className="w-4 h-4" />
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            Sign In <UserCheck className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-500">
          <p>Mock accounts:</p>
          <p className="mt-1 font-mono">admin@Artworld Photography.com (Admin)</p>
          <p className="mt-1 font-mono">client@example.com (Client)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
