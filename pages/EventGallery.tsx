
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { 
  Download, Image as ImageIcon, Search, Filter, 
  ArrowLeft, Maximize2, X, Share2, Sparkles, Wand2, Calendar
} from 'lucide-react';
import { geminiService } from '../geminiService';

const EventGallery: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, photos, user, logDownload } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, { caption: string, tags: string[] }>>({});

  const event = events.find(e => e.id === eventId);
  const eventPhotos = photos.filter(p => p.eventId === eventId);
  const filteredPhotos = eventPhotos.filter(p => 
    p.title.toLowerCase().includes(filter.toLowerCase()) || 
    (aiAnalysis[p.id]?.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())))
  );

  const handleDownload = (photoId: string, url: string) => {
    if (user) logDownload(photoId, user.id);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Artworld Photography-${photoId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const analyzeWithAi = async (photoId: string, url: string) => {
    setIsAiProcessing(photoId);
    try {
      const [caption, tags] = await Promise.all([
        geminiService.generateAltText(url),
        geminiService.suggestTags(url)
      ]);
      setAiAnalysis(prev => ({ ...prev, [photoId]: { caption, tags } }));
    } finally {
      setIsAiProcessing(null);
    }
  };

  const activePhoto = photos.find(p => p.id === selectedPhoto);

  if (!event) return <div className="p-20 text-center text-zinc-500">Event not found.</div>;

  return (
    <div className="px-6 py-24 max-w-[1600px] mx-auto w-full">
      <button 
        onClick={() => navigate(-1)}
        className="mb-12 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">{event.name}</h1>
          <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-sm font-medium">
            <span className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/5">
              <Calendar className="w-4 h-4 text-orange-400" /> {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/5">
              <ImageIcon className="w-4 h-4 text-teal-400" /> {eventPhotos.length} High-Res Photos
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Filter by title or tag..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all placeholder:text-zinc-500"
            />
          </div>
          <button className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95">
            <Download className="w-4 h-4" /> Download All
          </button>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="relative group rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-700"
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            
            {/* Refined Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8 backdrop-blur-[2px]">
              <div className="flex justify-end gap-3 -translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                <button 
                  onClick={() => analyzeWithAi(photo.id, photo.url)}
                  disabled={!!isAiProcessing}
                  title="AI Insights"
                  className="p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all disabled:opacity-50 border border-white/10"
                >
                  {isAiProcessing === photo.id ? <Wand2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                </button>
                <button className="p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-all border border-white/10">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                <div className="max-w-[60%]">
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{photo.title}</h3>
                  <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                    {photo.dimensions.width} × {photo.dimensions.height}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedPhoto(photo.id)}
                    className="p-4 rounded-full bg-white text-zinc-900 hover:scale-110 active:scale-90 transition-all shadow-2xl"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDownload(photo.id, photo.url)}
                    className="p-4 rounded-full bg-zinc-900 text-white hover:scale-110 active:scale-90 transition-all shadow-2xl border border-white/10"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Tags Chip */}
            {aiAnalysis[photo.id] && (
              <div className="absolute top-6 left-6 flex flex-wrap gap-2 max-w-[80%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {aiAnalysis[photo.id].tags.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="bg-white/10 backdrop-blur-xl border border-white/20 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-white shadow-xl">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && activePhoto && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 animate-fade-in">
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-10 right-10 p-4 rounded-full bg-white/5 text-white hover:bg-white/20 transition-all border border-white/10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-6xl h-[75vh] flex items-center justify-center relative">
            <img 
              src={activePhoto.url} 
              alt={activePhoto.title} 
              className="max-w-full max-h-full object-contain shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] rounded-2xl"
            />
            
            <div className="absolute bottom-16 right-16 opacity-10 select-none pointer-events-none">
              <span className="font-serif text-5xl text-white font-bold italic tracking-[0.3em] border-[4px] border-white/40 p-10 rounded-2xl rotate-12">
                Artworld Photography STUDIOS
              </span>
            </div>
          </div>

          <div className="mt-12 text-center text-white max-w-3xl animate-fade-in-up">
            <h2 className="text-4xl font-serif font-bold mb-4">{activePhoto.title}</h2>
            {aiAnalysis[activePhoto.id] ? (
               <p className="text-zinc-400 mb-8 italic text-lg leading-relaxed">"{aiAnalysis[activePhoto.id].caption}"</p>
            ) : (
               <p className="text-zinc-500 mb-8 uppercase tracking-widest text-xs font-bold">Standard Resolution Proof</p>
            )}
            <div className="flex justify-center gap-6">
               <button 
                onClick={() => handleDownload(activePhoto.id, activePhoto.url)}
                className="bg-white text-zinc-900 px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-zinc-200 transition-all shadow-2xl active:scale-95"
               >
                 <Download className="w-5 h-5" /> Download Master File
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
