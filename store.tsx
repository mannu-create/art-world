
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Event, Photo, DownloadStat } from './types';
import { INITIAL_USERS, INITIAL_EVENTS, INITIAL_PHOTOS } from './constants';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  events: Event[];
  photos: Photo[];
  users: User[];
  stats: DownloadStat[];
  addEvent: (event: Event) => void;
  addPhoto: (photo: Photo) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  logDownload: (photoId: string, userId: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('Artworld Photography_auth');
    return saved ? JSON.parse(saved) : null;
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('Artworld Photography_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [photos, setPhotos] = useState<Photo[]>(() => {
    const saved = localStorage.getItem('Artworld Photography_photos');
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('Artworld Photography_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [stats, setStats] = useState<DownloadStat[]>(() => {
    const saved = localStorage.getItem('Artworld Photography_stats');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('Artworld Photography_auth', JSON.stringify(user));
    localStorage.setItem('Artworld Photography_events', JSON.stringify(events));
    localStorage.setItem('Artworld Photography_photos', JSON.stringify(photos));
    localStorage.setItem('Artworld Photography_users', JSON.stringify(users));
    localStorage.setItem('Artworld Photography_stats', JSON.stringify(stats));
  }, [user, events, photos, users, stats]);

  const addEvent = (e: Event) => setEvents(prev => [...prev, e]);
  const addPhoto = (p: Photo) => setPhotos(prev => [...prev, p]);
  const updateEvent = (e: Event) => setEvents(prev => prev.map(ev => ev.id === e.id ? e : ev));
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(ev => ev.id !== id));
  
  const logDownload = (photoId: string, userId: string) => {
    const newStat: DownloadStat = {
      id: Math.random().toString(36).substr(2, 9),
      photoId,
      userId,
      timestamp: new Date().toISOString()
    };
    setStats(prev => [...prev, newStat]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('Artworld Photography_auth');
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, events, photos, users, stats,
      addEvent, addPhoto, updateEvent, deleteEvent, logDownload, logout 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
