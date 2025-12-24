
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Sun, Moon, LogOut, User, Camera, Shield, Github, Star } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Sync state with the actual class on the document
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-zinc-200/10 dark:border-white/5 bg-white/70 dark:bg-black/50 backdrop-blur-xl px-8 py-5 flex items-center justify-between transition-colors duration-500">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center transition-colors duration-500">
            <Camera className="w-5 h-5 text-white dark:text-black" />
          </div>
          <span className="font-sans text-xl font-extrabold tracking-tighter text-zinc-900 dark:text-white transition-colors duration-500">Artworld Photography</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</Link>
          <Link to="/" className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-white transition-colors">Resources</Link>
          <Link to="/contact" className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Community</Link>
          <Link to="/" className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Download</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all group"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 group-hover:-rotate-12 transition-transform" />
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-6">
            <Link 
              to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} 
              className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              {user.role === 'ADMIN' ? 'Admin Portal' : 'Dashboard'}
            </Link>
            <button 
              onClick={handleLogout}
              className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Sign In</Link>
            <Link to="/contact" className="bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-lg text-[13px] font-bold hover:opacity-80 transition-all">Get started</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
