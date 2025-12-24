
import React from 'react';
import { useApp } from '../store';
import { Link } from 'react-router-dom';
import { Camera, Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, events, photos } = useApp();

  const assignedEvents = events.filter(ev => user?.assignedEventIds.includes(ev.id));

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto w-full min-h-[70vh]">
      <header className="mb-12">
        <h1 className="text-4xl font-serif font-bold mb-2">Welcome, {user?.name}</h1>
        <p className="text-zinc-500">Your private collection of moments captured by Artworld Photography</p>
      </header>

      {assignedEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assignedEvents.map(event => {
            const eventPhotos = photos.filter(p => p.eventId === event.id);
            const coverPhoto = photos.find(p => p.id === event.coverPhotoId) || eventPhotos[0];

            return (
              <Link 
                key={event.id}
                to={`/event/${event.id}`}
                className="group relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={coverPhoto?.url || 'https://picsum.photos/800/1000'} 
                    alt={event.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-300 mb-2">
                    <Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">{event.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-zinc-300">
                      <ImageIcon className="w-4 h-4" /> {eventPhotos.length} Photos
                    </span>
                    <span className="flex items-center gap-2 text-sm font-bold group-hover:translate-x-2 transition-transform">
                      View Gallery <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <Camera className="w-16 h-16 mx-auto mb-6 text-zinc-300" />
          <h2 className="text-2xl font-serif font-bold mb-2">No galleries found</h2>
          <p className="text-zinc-500 max-w-md mx-auto">
            It looks like you don't have any assigned galleries yet. 
            Once your photos are processed, they will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
