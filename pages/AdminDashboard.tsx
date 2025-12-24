
import React, { useState } from 'react';
import { useApp } from '../store';
import { 
  Plus, Calendar, Users, Image as ImageIcon, Trash2, 
  Settings, CheckCircle, BarChart, ExternalLink, Shield,
  Upload, X, Link as LinkIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminDashboard: React.FC = () => {
  const { events, photos, users, stats, addEvent, addPhoto, deleteEvent } = useApp();
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  
  const [newEvent, setNewEvent] = useState({ name: '', type: 'Wedding', date: '' });
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', eventId: '' });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event = {
      id: `e-${Date.now()}`,
      ...newEvent,
      assignedUserIds: [],
      isLocked: false,
    };
    addEvent(event);
    setShowAddEvent(false);
    setNewEvent({ name: '', type: 'Wedding', date: '' });
  };

  const handleUploadPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.eventId) {
      alert("Please select an event");
      return;
    }
    const photo = {
      id: `p-${Date.now()}`,
      url: newPhoto.url || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200',
      thumbnailUrl: newPhoto.url || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400',
      title: newPhoto.title || 'Untitled Moment',
      eventId: newPhoto.eventId,
      uploadDate: new Date().toISOString().split('T')[0],
      dimensions: { width: 1200, height: 800 }
    };
    addPhoto(photo);
    setShowUploadPhoto(false);
    setNewPhoto({ title: '', url: '', eventId: '' });
  };

  // Process stats for chart
  const chartData = events.map(ev => ({
    name: ev.name.substring(0, 10) + '...',
    downloads: stats.filter(s => photos.find(p => p.id === s.photoId)?.eventId === ev.id).length
  }));

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto w-full">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Studio Manager</h1>
          <p className="text-zinc-500">Overview of your photography operations</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowUploadPhoto(true)}
            className="border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all"
          >
            <Upload className="w-5 h-5" /> Add Images
          </button>
          <button 
            onClick={() => setShowAddEvent(true)}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" /> New Event
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Events', val: events.length, icon: <Calendar className="w-5 h-5" /> },
          { label: 'Cloud Storage', val: `${photos.length} Photos`, icon: <ImageIcon className="w-5 h-5" /> },
          { label: 'Client Base', val: users.length, icon: <Users className="w-5 h-5" /> },
          { label: 'Total Downloads', val: stats.length, icon: <CheckCircle className="w-5 h-5" /> },
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm">{s.label}</p>
              <h3 className="text-2xl font-bold">{s.val}</h3>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-zinc-400">
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Events Table */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2"><Calendar className="w-5 h-5" /> Recent Events</h2>
              <button className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/50 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <th className="px-6 py-4">Event Name</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{ev.name}</td>
                      <td className="px-6 py-4 text-zinc-500 text-sm">{ev.type}</td>
                      <td className="px-6 py-4 text-zinc-500 text-sm">{ev.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${ev.isLocked ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {ev.isLocked ? 'Private' : 'Open'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                        <Link to={`/event/${ev.id}`} title="View Gallery" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button onClick={() => deleteEvent(ev.id)} title="Delete" className="text-zinc-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <h2 className="font-bold flex items-center gap-2 mb-6"><BarChart className="w-5 h-5" /> Download Insights</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', background: '#18181b', border: 'none', color: '#fff' }} 
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="downloads" fill="#8e8e8e" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-900 text-white p-6 rounded-2xl overflow-hidden relative">
            <Shield className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10" />
            <h3 className="font-serif text-xl mb-2">Security Hub</h3>
            <p className="text-zinc-400 text-sm mb-6">Manage global watermarking and expiry settings for all client galleries.</p>
            <button className="bg-white text-zinc-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-100 transition-colors">
              Access Settings
            </button>
          </div>
        </div>
      </div>

      {/* Modal for adding event */}
      {showAddEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Create New Event</h2>
              <button onClick={() => setShowAddEvent(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Name</label>
                <input 
                  autoFocus
                  required
                  type="text" 
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" 
                  placeholder="e.g. Smith Wedding 2024"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <option>Wedding</option>
                    <option>Portrait</option>
                    <option>Corporate</option>
                    <option>Birthday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input 
                    required
                    type="date" 
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" 
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:opacity-90 transition-opacity"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for uploading photo */}
      {showUploadPhoto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold">Add Images</h2>
              <button onClick={() => setShowUploadPhoto(false)}><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleUploadPhoto} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Target Event</label>
                <select 
                  required
                  value={newPhoto.eventId}
                  onChange={(e) => setNewPhoto({...newPhoto, eventId: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                >
                  <option value="">Select an event...</option>
                  {events.map(ev => <option key={ev.id} value={ev.id}>{ev.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo Title</label>
                <input 
                  required
                  type="text" 
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" 
                  placeholder="e.g. The First Dance"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" /> Image URL (Simulation)
                </label>
                <input 
                  type="url" 
                  value={newPhoto.url}
                  onChange={(e) => setNewPhoto({...newPhoto, url: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" 
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-[10px] text-zinc-400 mt-1">Note: In production, this would be a file upload to S3/Cloudinary.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
