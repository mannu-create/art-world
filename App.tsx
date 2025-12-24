
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import EventGallery from './pages/EventGallery';
import Contact from './pages/Contact';
import { Mail, Phone, MapPin } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode, role?: 'ADMIN' | 'USER' }> = ({ children, role }) => {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-300">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute role="USER">
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/event/:eventId" 
            element={
              <ProtectedRoute>
                <EventGallery />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="pt-20 pb-12 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 text-center md:text-left mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="font-serif text-2xl font-bold tracking-widest block mb-6">Artworld Photography</Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Capturing the raw beauty of human connection and life's most precious moments with an artistic, timeless lens.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-400">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-3 text-zinc-500">
                <Mail className="w-4 h-4" /> hello@Artworld Photography.studio
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-zinc-500">
                <Phone className="w-4 h-4" /> +1 (555) 000-LUMI
              </li>
              <li className="flex items-start justify-center md:justify-start gap-3 text-zinc-500">
                <MapPin className="w-4 h-4 mt-0.5" /> 
                <span>123 Artisan Way, Studio City<br />Los Angeles, CA 91604</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-400">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link></li>
              <li><Link to="/contact" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Book Session</Link></li>
              <li><Link to="/login" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Client Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-400">Social</h4>
            <div className="flex justify-center md:justify-start gap-4 text-zinc-500">
              <a href="#" className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Instagram</a>
              <a href="#" className="p-2 rounded-full bg-zinc-50 dark:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Pinterest</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2024 Artworld Photography Photography Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
