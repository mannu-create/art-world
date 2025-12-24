import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image, Users, Lock, Download, BookOpen, Clock, ChevronRight, Play, Check, Paperclip, MessageSquare } from 'lucide-react';
import { INITIAL_BLOG_POSTS } from '../constants';
import heroImage from '../assets/hero-ferris.png';

const SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1465495910483-4c56a45a6c57?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1540575861501-7ad05823c93e?auto=format&fit=crop&q=80&w=1600"
];

const Home: React.FC = () => {
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="flex flex-col pt-20 bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      {/* Hero Section - Updated with Ferris wheel cityscape background */}
      <section 
        className="relative min-h-screen w-full flex flex-col items-center justify-center pt-20 bg-cover bg-center scroll-mt-20"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%), url(${heroImage})`
        }}
      >
        {/* Updated Cinematic Lighting for Teal/Orange palette */}
        <div className="moving-light bg-orange-600/20 top-[20%] right-[-10%] animate-float"></div>
        <div className="moving-light bg-teal-500/10 bottom-[-10%] left-[-10%] animate-float-delayed"></div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <h1 className="font-sans text-6xl md:text-[110px] font-extrabold text-white mb-8 tracking-tighter leading-[0.95] animate-fade-in-up drop-shadow-2xl">
            Capture every moment<br />
            <span className="text-orange-400">in light</span>
          </h1>
          
          <p className="text-teal-50/80 text-lg md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed opacity-0 animate-[fade-in-up_1s_ease-out_0.2s_forwards] font-medium drop-shadow-lg">
            Artworld Photography transforms the ordinary into the cinematic.<br className="hidden md:block" />
            High-performance delivery for the modern creator.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 opacity-0 animate-[fade-in-up_1s_ease-out_0.4s_forwards]">
            <Link 
              to="/login" 
              className="action-button-glow group px-12 py-5 rounded-full font-bold flex items-center gap-3 transition-all transform active:scale-95 shadow-2xl"
            >
              <span className="uppercase tracking-[0.2em] text-[11px] font-black">See in action</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Floating cards matching the refined aesthetic */}
        {/* Left Side Floating Card */}
        <div className="absolute bottom-[15%] left-[10%] hidden xl:block opacity-0 animate-[fade-in-up_1.5s_ease-out_0.8s_forwards] scale-110">
           <div className="glass-card p-5 rounded-2xl w-64 shadow-2xl">
              <div className="flex gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500/40"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                <div className="h-2 w-1/2 bg-white/5 rounded"></div>
                <div className="flex gap-1 pt-2">
                   <div className="w-5 h-5 rounded bg-orange-500/20"></div>
                   <div className="w-5 h-5 rounded bg-teal-500/20"></div>
                </div>
              </div>
           </div>
        </div>

        {/* Right Side Floating UI */}
        <div className="absolute top-[25%] right-[8%] hidden xl:block opacity-0 animate-[fade-in-up_1.5s_ease-out_1s_forwards] scale-105">
           <div className="glass-card p-6 rounded-2xl w-80 shadow-2xl">
              <h4 className="text-[12px] font-bold text-white mb-4">Cinematic Post-Processing Engine</h4>
              <div className="flex gap-2 mb-6">
                <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 text-[10px] font-bold">Vibrant</span>
                <span className="px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 text-[10px] font-bold">Golden Hour</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-900 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-full h-full object-cover" />
                  </div>)}
                </div>
                <div className="flex items-center gap-3 text-zinc-500">
                  <span className="flex items-center gap-1 text-[10px]"><Paperclip className="w-3 h-3" /> 4</span>
                  <span className="flex items-center gap-1 text-[10px]"><MessageSquare className="w-3 h-3" /> 12</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-white/5 pt-4">
                 <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-teal-500/40 flex items-center justify-center bg-teal-500/10">
                       <Check className="w-3 h-3 text-teal-400" />
                    </div>
                    <span className="text-[11px] text-zinc-300">Tone mapping calibration</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-white/10"></div>
                    <span className="text-[11px] text-zinc-500">High-bitrate export</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border border-white/10"></div>
                    <span className="text-[11px] text-zinc-500">Watermark integration</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Subtle bottom indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase tracking-widest font-bold">Discover our vision</span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>



      {/* Single Big Sliding Image Section */}
      <section ref={addToRefs} className="fade-reveal py-40 bg-zinc-950/50 border-y border-white/5 scroll-mt-20">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="uppercase tracking-[0.5em] text-[11px] font-black text-zinc-500 mb-6 block">Exhibition Mode</span>
              <h2 className="font-sans text-5xl md:text-8xl font-bold tracking-tighter leading-tight">Masterpieces in<br />Motion.</h2>
            </div>
            <Link to="/login" className="px-10 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl">
              Enter Gallery
            </Link>
          </div>
          
          <div className="relative aspect-[21/9] overflow-hidden rounded-[3rem] bg-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] group cursor-none">
            <img 
              key={currentSlide}
              src={SHOWCASE_IMAGES[currentSlide]} 
              alt="Gallery showcase" 
              className="w-full h-full object-cover transition-all duration-[5s] ease-in-out scale-100 group-hover:scale-105 animate-[fade-in_2.5s_ease-out]"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
              <div>
                <span className="uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block text-zinc-400">Archived Work</span>
                <h3 className="text-4xl font-bold tracking-tighter">Volume 0{currentSlide + 1}</h3>
              </div>
              <div className="flex gap-4">
                {SHOWCASE_IMAGES.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 transition-all duration-700 rounded-full ${idx === currentSlide ? 'w-16 bg-white' : 'w-4 bg-white/10'}`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
               <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journal / Blog */}
      <section ref={addToRefs} className="fade-reveal py-40 px-6 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <div className="text-left">
            <span className="uppercase tracking-[0.5em] text-[11px] font-black text-zinc-500 mb-6 block">Editorial</span>
            <h2 className="font-sans text-5xl md:text-7xl font-bold tracking-tighter">The Journal</h2>
          </div>
          <Link to="/contact" className="flex items-center gap-3 text-white font-bold group text-sm uppercase tracking-widest">
            Explore All <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {INITIAL_BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-[2.5rem] mb-10 relative bg-zinc-900 border border-white/5">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-black/80 border border-white/10 backdrop-blur-xl px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-zinc-500 text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
                <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                <span>/</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight leading-tight group-hover:text-zinc-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-base leading-relaxed line-clamp-2 mb-10">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-3 text-white font-bold text-[11px] uppercase tracking-[0.4em] border-b border-white/10 pb-4 w-fit group-hover:border-white transition-all">
                Read Narrative <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
