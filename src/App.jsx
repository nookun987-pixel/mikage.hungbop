import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, Music, Layers, ShieldCheck, 
  Camera, Zap, Wand2, Monitor, Plus, Trash2, 
  Volume2, Mic2, Sparkles, Image as ImageIcon, Upload, X,
  Maximize2, Settings, Film, Eye, Activity, ChevronRight, Download, RefreshCw
} from 'lucide-react';

const App = () => {
  // --- Quản lý trạng thái Studio ---
  const [activePersona, setActivePersona] = useState('Cyberpunk');
  const [activeSlot, setActiveSlot] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(true);
  const [selectedOutfit, setSelectedOutfit] = useState('o1');
  const [inputImage, setInputImage] = useState(null);
  
  // Trạng thái cho các bảng điều khiển
  const [activeCamera, setActiveCamera] = useState('Dolly Zoom');
  const [activeVFX, setActiveVFX] = useState('Neon Pulse');
  const [activePreset, setActivePreset] = useState('Trailer Reveal');
  const [prompt, setPrompt] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  
  // Trạng thái sản phẩm đầu ra
  const [renderedVideo, setRenderedVideo] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const cameraModes = ['Dolly Zoom', '360° Orbital', 'Eye Tracking', 'Hand Focus'];
  const vfxModes = ['Cyber Glitch', 'Particle Dissolve', 'Neon Pulse', 'Slow Motion'];
  const scenePresets = ['Trailer Reveal', 'Costume Film', 'Expression', 'Action Sequence'];

  const slots = [
    { id: 1, time: '0-5s', title: 'Giới thiệu', thumbnail: inputImage, video: renderedVideo },
    { id: 2, time: '5-10s', title: 'Hành động', thumbnail: null, video: null },
    { id: 3, time: '10-15s', title: 'Trình diễn đồ', thumbnail: null, video: null },
    { id: 4, time: '15-20s', title: 'Kết thúc', thumbnail: null, video: null },
  ];

  const outfits = [
    { id: 'o1', name: 'Neon Rebel', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=100' },
    { id: 'o2', name: 'Gothic Lace', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=100' },
    { id: 'o3', name: 'Tech Samurai', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=100' },
    { id: 'o4', name: 'Ethereal Silk', img: 'https://images.unsplash.com/photo-1539109132304-391550218a10?auto=format&fit=crop&q=80&w=100' },
  ];

  // --- Xử lý sự kiện ---
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInputImage(imageUrl);
      setRenderedVideo(null); 
      setIsPlaying(false);
    }
  };

  const addTagToPrompt = (tag) => {
    setPrompt(prev => prev ? `${prev}, ${tag}` : tag);
  };

  const handleRender = () => {
    if (!inputImage) return;
    setIsRendering(true);
    setRenderedVideo(null);
    setVideoError(false);
    
    // Giả lập quá trình AI render
    setTimeout(() => {
      setIsRendering(false);
      setRenderedVideo('veo-animation.mp4'); 
      setIsPlaying(true);
    }, 4000);
  };

  const togglePlayback = () => {
    if (renderedVideo && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getVFXFilter = () => {
    if (activeVFX === 'Cyber Glitch') return 'hue-rotate-90 contrast-150 saturate-200';
    if (activeVFX === 'Particle Dissolve') return 'blur-sm opacity-60 grayscale';
    if (activeVFX === 'Neon Pulse') return 'brightness-125 contrast-125';
    if (activeVFX === 'Slow Motion') return 'sepia-20';
    return '';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

      {/* Thanh Tiêu Đề */}
      <header className="border-b border-white/5 px-6 py-3 flex justify-between items-center bg-black/60 backdrop-blur-xl z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Wand2 size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase italic">Veo Pro Studio <span className="text-[10px] not-italic bg-purple-500 text-white px-2 py-0.5 rounded ml-2 border border-purple-400 font-bold uppercase tracking-widest">V3.3 PRO</span></h1>
            <p className="text-[9px] text-white/30 font-bold tracking-widest uppercase">AI Cinematic Video Producer</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isRendering ? 'bg-yellow-500 animate-ping' : 'bg-green-500 animate-pulse'}`}></div> 
              {isRendering ? 'Đang tổng hợp...' : 'Hệ thống Sẵn sàng'}
            </span>
            <span className="flex items-center gap-2 text-blue-400"><Activity size={12} /> GPU: {isRendering ? '98%' : '12%'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"><Settings size={18} /></button>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider hover:bg-purple-400 transition-all">Xuất Bản</button>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-12 h-[calc(100vh-65px)]">
        
        {/* Bảng Điều Khiển Trái */}
        <aside className="col-span-12 lg:col-span-3 border-r border-white/5 p-4 space-y-5 overflow-y-auto custom-scrollbar bg-black/20">
          
          <section>
            <h2 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <ShieldCheck size={14} /> 01. CHỌN NHÂN VẬT
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {['Cyberpunk', 'Gothic Lolita', 'Ethereal', 'Tech Samurai'].map(p => (
                <button 
                  key={p}
                  onClick={() => { setActivePersona(p); setRenderedVideo(null); }}
                  className={`py-3 rounded-xl border text-[10px] font-bold transition-all ${activePersona === p ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:text-white'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <ImageIcon size={14} /> 02. ẢNH NGUỒN (REFERENCE)
            </h2>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 group cursor-pointer"
            >
              {inputImage ? (
                <>
                  <img src={inputImage} className={`w-full h-full object-cover transition-all duration-500 ${getVFXFilter()}`} alt="Source" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm">
                    <div className="p-3 bg-white/10 rounded-full border border-white/20">
                       <Upload size={24} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-blue-500/40 transition-all p-6 text-center">
                  <Upload size={24} className="text-white/20 mb-2" />
                  <span className="text-[9px] font-bold text-white/30 uppercase">Nhấn để tải ảnh người mẫu</span>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Layers size={14} /> 03. TỦ ĐỒ ẢO
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {outfits.map(o => (
                <div 
                  key={o.id}
                  onClick={() => { setSelectedOutfit(o.id); setRenderedVideo(null); }}
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

          <section>
            <h2 className="text-[10px] font-black text-green-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <Sparkles size={14} /> 04. GHI CHÚ ĐẠO DIỄN
            </h2>
            <div className="bg-black/40 border border-white/5 rounded-2xl p-3 space-y-3">
               <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent border-none text-[11px] text-white/70 placeholder:text-white/20 focus:outline-none min-h-[100px] resize-none leading-relaxed"
                placeholder="Mô tả chi tiết chuyển động, ánh sáng..."
               ></textarea>
               <div className="flex flex-wrap gap-1.5">
                  {['8K Ultra', 'Slow Motion', 'Mắt đỏ rực', 'Phố mưa', 'Ánh sáng Neon'].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => addTagToPrompt(tag)}
                      className="text-[8px] font-bold px-2 py-1 bg-white/5 rounded border border-white/5 text-white/40 cursor-pointer hover:bg-white/10 hover:text-white"
                    >
                      +{tag}
                    </button>
                  ))}
               </div>
            </div>
          </section>

        </aside>

        {/* Màn Hình Monitor */}
        <div className="col-span-12 lg:col-span-9 flex flex-col bg-black">
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto custom-scrollbar">
            
            <div className="grid grid-cols-12 gap-6">
               <div className="col-span-12 xl:col-span-8 space-y-4">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-white/10 rounded-[32px] relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center">
                       {isRendering ? (
                          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
                            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                              <div className="h-full bg-purple-500 animate-[loading_4s_ease-in-out_infinite]"></div>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Đang tổng hợp các lớp tế bào thần kinh...</p>
                          </div>
                       ) : renderedVideo ? (
                          <video 
                            ref={videoRef}
                            src={renderedVideo}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                       ) : inputImage ? (
                         <div className="relative w-full h-full">
                            <img src={inputImage} className={`w-full h-full object-cover transition-all duration-1000 ${getVFXFilter()}`} alt="Preview" />
                         </div>
                       ) : (
                         <div className="text-center opacity-20 group-hover:opacity-40 transition-opacity p-12">
                            <Play size={48} className="mx-auto mb-4" />
                            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-center">Nạp ảnh mẫu để bắt đầu</p>
                         </div>
                       )}
                    </div>
                    
                    <div className="absolute top-6 left-6 flex items-center gap-4">
                       <div className="flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full border border-white/10 backdrop-blur-md">
                          <div className={`w-2 h-2 rounded-full ${renderedVideo ? 'bg-green-500 shadow-lg shadow-green-500/50' : isRendering ? 'bg-yellow-500 animate-ping' : 'bg-white/20'}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{renderedVideo ? 'SẢN PHẨM HOÀN TẤT' : isRendering ? 'ĐANG XỬ LÝ' : 'CHỜ TÍN HIỆU'}</span>
                       </div>
                    </div>

                    {renderedVideo && !isRendering && (
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="flex gap-2">
                           <button onClick={togglePlayback} className="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
                              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                           </button>
                           <button onClick={() => { setRenderedVideo(null); setIsPlaying(false); }} className="w-10 h-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-all text-white/60 hover:text-white">
                              <RefreshCw size={18} />
                           </button>
                         </div>
                         <a 
                           href={renderedVideo} 
                           download="veo-cinematic-output.mp4" 
                           className="bg-white text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-xl flex items-center gap-2"
                         >
                            <Download size={14} /> Tải Video 4K
                         </a>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-pink-400 shadow-lg transition-all ${isPlaying ? 'bg-pink-500/30 animate-pulse scale-110' : 'bg-pink-500/10'}`}>
                      <Music size={20} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">
                        <span>Đồng bộ: Cyberpunk_Theme.mp3</span>
                        <span className="text-pink-400">128 BPM // Bass Peak: {isPlaying ? 'ĐANG CHẠY' : 'SẴN SÀNG'}</span>
                      </div>
                      <div className="flex items-end gap-[2px] h-8">
                        {[...Array(60)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-gradient-to-t from-pink-600 to-purple-500 opacity-80' : 'bg-white/5'}`} 
                            style={{ height: isPlaying ? `${20 + Math.random() * 80}%` : '20%' }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
               </div>

               {/* Cài đặt nhanh */}
               <div className="col-span-12 xl:col-span-4 space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Film size={14} className="text-blue-400" /> Kịch bản mẫu
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                       {scenePresets.map(s => (
                         <button 
                           key={s} 
                           onClick={() => { setActivePreset(s); setRenderedVideo(null); }}
                           className={`w-full py-2.5 px-4 rounded-xl text-[10px] font-bold text-left transition-all flex justify-between items-center group ${activePreset === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border border-white/5 text-white/40 hover:bg-white/10'}`}
                         >
                           {s} <ChevronRight size={12} className={activePreset === s ? 'opacity-100' : 'opacity-0'} />
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Camera size={14} className="text-purple-400" /> Chuyển động Camera
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                       {cameraModes.map(c => (
                         <button 
                           key={c} 
                           onClick={() => { setActiveCamera(c); setRenderedVideo(null); }}
                           className={`py-2 px-3 rounded-lg text-[9px] font-bold transition-all border ${activeCamera === c ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-transparent text-white/40 hover:border-white/20'}`}
                         >
                           {c}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Zap size={14} className="text-yellow-400" /> Hiệu ứng VFX
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                       {vfxModes.map(v => (
                         <button 
                           key={v} 
                           onClick={() => { setActiveVFX(v); setRenderedVideo(null); }}
                           className={`py-2 px-3 rounded-lg text-[9px] font-bold transition-all border ${activeVFX === v ? 'bg-yellow-600 border-yellow-400 text-black font-black' : 'bg-white/5 border-transparent text-white/40 hover:border-white/20'}`}
                         >
                           {v}
                         </button>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Dòng thời gian Trailer */}
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                      <Layers size={18} />
                   </div>
                   <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Dòng thời gian Trailer</h3>
                </div>
                <button 
                  onClick={handleRender}
                  disabled={!inputImage || isRendering}
                  className={`flex items-center gap-2 px-8 py-2 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest shadow-lg ${!inputImage ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/30 active:scale-95'}`}
                >
                  {isRendering ? (
                    <> <RefreshCw size={14} className="animate-spin" /> Đang render... </>
                  ) : (
                    <> <Wand2 size={14} /> Xuất Video Toàn Cảnh </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4">
                 {slots.map(slot => (
                   <div 
                    key={slot.id} 
                    onClick={() => setActiveSlot(slot.id)}
                    className={`relative aspect-[16/10] rounded-2xl border-2 transition-all cursor-pointer group overflow-hidden ${activeSlot === slot.id ? 'border-purple-500 shadow-2xl shadow-purple-500/20 scale-[1.02]' : 'border-white/5 opacity-40 hover:opacity-100 hover:border-white/20'}`}
                   >
                     {slot.video && activeSlot === slot.id ? (
                        <video src={slot.video} className="w-full h-full object-cover" muted loop autoPlay />
                     ) : slot.thumbnail ? (
                       <img src={slot.thumbnail} className={`w-full h-full object-cover ${activeSlot === slot.id ? getVFXFilter() : ''}`} alt={slot.title} />
                     ) : (
                       <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center gap-2">
                         <Plus size={16} className="text-white/10" />
                         <span className="text-[8px] mt-1 font-black text-white/10 uppercase tracking-widest">Slot 0{slot.id}</span>
                       </div>
                     )}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}} />
    </div>
  );
};

export default App;
