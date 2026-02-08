import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, Music, Layers, ShieldCheck, 
  Camera, Zap, Wand2, Monitor, Plus, Trash2, 
  Volume2, Mic2, Sparkles, Image as ImageIcon, Upload, X,
  Maximize2, Settings, Film, Eye, Activity
} from 'lucide-react';

const App = () => {
  const [activePersona, setActivePersona] = useState('Cyberpunk');
  const [activeSlot, setActiveSlot] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(true); // Giả lập đã nạp nhạc
  const [selectedOutfit, setSelectedOutfit] = useState('o1');
  const [inputImage, setInputImage] = useState('https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=800');

  // Dữ liệu mẫu cho các tính năng nâng cấp
  const cameraModes = ['Dolly Zoom', '360° Orbital', 'Eye Tracking', 'Hand Focus'];
  const vfxModes = ['Cyber Glitch', 'Particle Dissolve', 'Neon Pulse', 'Slow Motion'];
  const scenePresets = ['Trailer Reveal', 'Costume Film', 'Expression', 'Action Sequence'];

  const slots = [
    { id: 1, time: '0-5s', title: 'Intro Reveal', thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=200' },
    { id: 2, time: '5-10s', title: 'Action Scene', thumbnail: null },
    { id: 3, time: '10-15s', title: 'Outfit Showcase', thumbnail: null },
    { id: 4, time: '15-20s', title: 'Ending Outro', thumbnail: null },
  ];

  const outfits = [
    { id: 'o1', name: 'Neon Rebel', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=100' },
    { id: 'o2', name: 'Gothic Lace', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=100' },
    { id: 'o3', name: 'Tech Samurai', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=100' },
    { id: 'o4', name: 'Ethereal Silk', img: 'https://images.unsplash.com/photo-1539109132304-391550218a10?auto=format&fit=crop&q=80&w=100' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="border-b border-white/5 px-6 py-3 flex justify-between items-center bg-black/60 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Wand2 size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase italic">Veo Pro Studio <span className="text-[10px] not-italic bg-purple-500 text-white px-2 py-0.5 rounded ml-2 border border-purple-400 font-bold">V3.2 ULTRA</span></h1>
            <p className="text-[9px] text-white/30 font-bold tracking-widest uppercase">Cinematic AI Production Engine</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Cloud Engine Active</span>
            <span className="flex items-center gap-2 text-blue-400"><Activity size={12} /> GPU Usage: 42%</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"><Settings size={18} /></button>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider hover:bg-purple-400 transition-all">Publish Trailer</button>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-12 h-[calc(100vh-65px)]">
        
        {/* 2. LEFT SIDEBAR: CREATIVE CONTROLS */}
        <aside className="col-span-12 lg:col-span-3 border-r border-white/5 p-4 space-y-5 overflow-y-auto custom-scrollbar bg-black/20">
          
          {/* Persona Selection */}
          <section>
            <h2 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <ShieldCheck size={14} /> 01. Persona Identity
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {['Cyberpunk', 'Gothic Lolita', 'Ethereal', 'Tech Samurai'].map(p => (
                <button 
                  key={p}
                  onClick={() => setActivePersona(p)}
                  className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${activePersona === p ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:text-white'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          {/* Source Image - Trái tim của quá trình */}
          <section>
            <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <ImageIcon size={14} /> 02. Source Reference
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 group">
              {inputImage ? (
                <>
                  <img src={inputImage} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" alt="Source" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <button onClick={() => setInputImage(null)} className="p-3 bg-red-500 rounded-full"><Trash2 size={20} /></button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-blue-500/40 transition-all cursor-pointer">
                  <Upload size={24} className="text-white/20 mb-2" />
                  <span className="text-[9px] font-bold text-white/30 uppercase">Upload Reference</span>
                </div>
              )}
            </div>
          </section>

          {/* Virtual Closet - Tủ đồ ảo nâng cấp */}
          <section>
            <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Layers size={14} /> 03. Virtual Closet
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {outfits.map(o => (
                <div 
                  key={o.id}
                  onClick={() => setSelectedOutfit(o.id)}
                  className={`aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedOutfit === o.id ? 'border-indigo-500 scale-95 shadow-lg shadow-indigo-500/20' : 'border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`}
                >
                  <img src={o.img} className="w-full h-full object-cover" alt={o.name} />
                </div>
              ))}
              <div className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center text-white/10 hover:text-white/30 cursor-pointer">
                <Plus size={16} />
              </div>
            </div>
          </section>

          {/* Director's Directives - Prompt nạp vào */}
          <section>
            <h2 className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Sparkles size={14} /> 04. Director Directives
            </h2>
            <div className="bg-black/40 border border-white/5 rounded-2xl p-3 space-y-3">
               <textarea 
                className="w-full bg-transparent border-none text-[11px] text-white/70 placeholder:text-white/20 focus:outline-none min-h-[100px] resize-none leading-relaxed"
                placeholder="Ex: Cinematic opening, girl with glowing red eyes looking up, neon rain, slow motion..."
               ></textarea>
               <div className="flex flex-wrap gap-1.5">
                  {['8K Detail', 'Slow Motion', 'Rain FX', 'Neon Glow'].map(tag => (
                    <span key={tag} className="text-[8px] font-bold px-2 py-1 bg-white/5 rounded border border-white/5 text-white/40 cursor-pointer hover:bg-white/10 hover:text-white">+{tag}</span>
                  ))}
               </div>
            </div>
          </section>

        </aside>

        {/* 3. CENTER & RIGHT: MONITOR & TIMELINE */}
        <div className="col-span-12 lg:col-span-9 flex flex-col bg-black">
          
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto custom-scrollbar">
            
            <div className="grid grid-cols-12 gap-6">
               {/* Main Monitor */}
               <div className="col-span-12 xl:col-span-8 space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-white/10 rounded-[32px] relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="text-center opacity-20 group-hover:opacity-40 transition-opacity">
                          <Play size={48} className="mx-auto mb-4" />
                          <p className="text-[10px] font-black tracking-[0.4em] uppercase">Ready for Synthesis</p>
                       </div>
                    </div>
                    
                    {/* Monitor HUD Overlay */}
                    <div className="absolute top-6 left-6 flex items-center gap-4">
                       <div className="flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full border border-white/10 backdrop-blur-md">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Master Feed</span>
                       </div>
                       <span className="text-[10px] font-mono text-white/30">REC: 00:05:12 / 00:20:00</span>
                    </div>

                    <div className="absolute top-6 right-6 flex gap-2">
                       <div className="bg-black/40 p-1 rounded-xl border border-white/10 flex gap-1 backdrop-blur-md">
                          <button className="px-3 py-1.5 bg-white text-black text-[10px] font-black rounded-lg">16:9</button>
                          <button className="px-3 py-1.5 text-white/40 text-[10px] font-black rounded-lg">9:16</button>
                       </div>
                    </div>

                    <div className="absolute bottom-6 right-6">
                        <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                          <Maximize2 size={18} />
                        </button>
                    </div>
                  </div>

                  {/* Audio Visualizer Bar - ĐỒNG BỘ NHẠC */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-6">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-400 shadow-lg shadow-pink-500/10">
                      <Music size={20} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">
                        <span>Audio Sync: Digital_Night_MV.mp3</span>
                        <span className="text-pink-400">128 BPM // Bass Peak: Sync ON</span>
                      </div>
                      <div className="flex items-end gap-[2px] h-8">
                        {[...Array(60)].map((_, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-gradient-to-t from-pink-600 to-purple-500 rounded-full opacity-40 animate-pulse" 
                            style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.05}s` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
               </div>

               {/* Right Quick Settings: Camera & VFX - ĐƯA CÁC NÚT TỪ ẢNH TRƯỚC VÀO ĐÂY */}
               <div className="col-span-12 xl:col-span-4 space-y-4">
                  
                  {/* Scene Presets (Mục 03 trong ảnh cũ) */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Film size={14} className="text-blue-400" /> Scene Presets
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                       {scenePresets.map(s => (
                         <button key={s} className="w-full py-2.5 px-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-left hover:bg-blue-500 hover:text-white transition-all flex justify-between items-center group">
                           {s} <ChevronRight size={12} className="opacity-0 group-hover:opacity-100" />
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Camera Movements (Mục 04 trong ảnh cũ) */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Camera size={14} className="text-purple-400" /> Camera Dynamics
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                       {cameraModes.map(c => (
                         <button key={c} className="py-2 px-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold hover:border-purple-500 hover:text-purple-400 transition-all">{c}</button>
                       ))}
                    </div>
                  </div>

                  {/* VFX & FX (Mục 05 trong ảnh cũ) */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Zap size={14} className="text-yellow-400" /> VFX Overlays
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                       {vfxModes.map(v => (
                         <button key={v} className="py-2 px-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold hover:border-yellow-500 hover:text-yellow-400 transition-all">{v}</button>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* 4. PRODUCTION TIMELINE - XÂU CHUỖI VIDEO */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                      <Layers size={18} />
                   </div>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Trailer Sequence <span className="text-white/20 font-mono ml-4 text-[10px]">00:20:00 TOTAL</span></h3>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest"><Mic2 size={12} /> Add Lip Sync</button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-xl text-[10px] font-bold hover:bg-purple-500 transition-all uppercase tracking-widest shadow-lg shadow-purple-600/20">Render Sequence</button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                 {slots.map(slot => (
                   <div 
                    key={slot.id} 
                    onClick={() => setActiveSlot(slot.id)}
                    className={`relative aspect-[16/10] rounded-2xl border-2 transition-all cursor-pointer group overflow-hidden ${activeSlot === slot.id ? 'border-purple-500 shadow-2xl shadow-purple-500/20 scale-[1.02]' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'}`}
                   >
                     {slot.thumbnail ? (
                       <img src={slot.thumbnail} className="w-full h-full object-cover" alt={slot.title} />
                     ) : (
                       <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                           <Plus size={16} className="text-white/20" />
                         </div>
                         <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Scene 0{slot.id}</span>
                       </div>
                     )}
                     
                     {/* Slot Info Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                     <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[8px] font-mono border border-white/10">{slot.time}</div>
                     <div className="absolute bottom-3 left-3 flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-tight">{slot.title || 'Draft Sequence'}</span>
                        <div className="flex gap-1 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                        </div>
                     </div>
                   </div>
                 ))}
              </div>

              {/* Playback Progress Bar */}
              <div className="relative pt-4">
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg shadow-purple-500/50"></div>
                 </div>
                 <div className="flex justify-center gap-10 mt-6">
                    <button className="text-white/40 hover:text-white transition-all"><SkipForward size={22} className="rotate-180" /></button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl shadow-white/20 hover:scale-110 active:scale-95 transition-all"
                    >
                      {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1.5" />}
                    </button>
                    <button className="text-white/40 hover:text-white transition-all"><SkipForward size={22} /></button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
};

const ChevronRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

export default App;
