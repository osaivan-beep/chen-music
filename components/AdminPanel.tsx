
import React, { useState, useRef } from 'react';
import { Plus, Trash2, Save, X, Upload, Code, Check, Music } from 'lucide-react';
import { CarouselImage, MusicTrack } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
  images: CarouselImage[];
  tracks: MusicTrack[];
  onUpdateImages: (imgs: CarouselImage[]) => void;
  onUpdateTracks: (trks: MusicTrack[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ images, tracks, onUpdateImages, onUpdateTracks, onClose }) => {
  const [activeTab, setActiveTab] = useState<'images' | 'music'>('images');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [newImage, setNewImage] = useState({ title: '', subtitle: '', url: '' });
  const [newTrack, setNewTrack] = useState({ title: '', artist: '', category: CATEGORIES[0], url: '', coverUrl: '' });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert("圖片太大囉（請小於 1.5MB），建議使用網址或是縮小圖片。");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(prev => ({ ...prev, url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    if (!newImage.url.trim() || !newImage.title.trim()) {
      alert("請完整填寫圖片資訊！");
      return;
    }
    const newEntry: CarouselImage = { ...newImage, id: `img_${Date.now()}` };
    onUpdateImages([...images, newEntry]);
    setNewImage({ title: '', subtitle: '', url: '' });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 1500);
  };

  const removeImage = (id: string) => {
    if (confirm("確定要刪除這張圖片嗎？")) {
      onUpdateImages(images.filter(img => img.id !== id));
    }
  };

  const addTrack = () => {
    if (!newTrack.title.trim() || !newTrack.url.trim()) {
      alert("請填寫曲名與音樂網址！");
      return;
    }
    const newEntry: MusicTrack = { ...newTrack, id: `t_${Date.now()}` };
    onUpdateTracks([...tracks, newEntry]);
    setNewTrack({ title: '', artist: '', category: CATEGORIES[0], url: '', coverUrl: '' });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 1500);
  };

  const removeTrack = (id: string) => {
    if (confirm("確定要刪除這首音樂嗎？")) {
      onUpdateTracks(tracks.filter(t => t.id !== id));
    }
  };

  const exportConfig = () => {
    const code = `
export const INITIAL_CAROUSEL: CarouselImage[] = ${JSON.stringify(images, null, 2)};
export const INITIAL_TRACKS: MusicTrack[] = ${JSON.stringify(tracks, null, 2)};
    `;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'new_constants.txt';
    a.click();
    alert("配置代碼已導出，您可以將內容貼回 constants.ts 以永久保存。");
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-12">
      <div className="bg-[#0c0c0c] w-full max-w-7xl h-full md:h-[90vh] flex flex-col md:rounded-[3.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 md:p-10 pb-6 shrink-0">
          <div className="flex items-center gap-10">
            <h2 className="text-xl md:text-2xl font-serif font-light text-white tracking-[0.2em] uppercase">後台管理</h2>
            <div className="flex bg-[#1a1a1a] p-1.5 rounded-2xl border border-white/5">
              <button 
                onClick={() => setActiveTab('images')}
                className={`px-8 py-2 rounded-xl text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase transition-all ${activeTab === 'images' ? 'bg-[#333333] text-white' : 'text-white/20 hover:text-white/40'}`}
              >
                Carousel
              </button>
              <button 
                onClick={() => setActiveTab('music')}
                className={`px-8 py-2 rounded-xl text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase transition-all ${activeTab === 'music' ? 'bg-[#333333] text-white' : 'text-white/20 hover:text-white/40'}`}
              >
                Music
              </button>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all border border-white/5">
            <X size={20} className="text-white/40" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 pb-10">
          
          <div className="flex justify-end mb-8">
            <button onClick={exportConfig} className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white bg-white/5 px-6 py-3 rounded-2xl border border-white/5 transition-all tracking-widest uppercase group">
              <Code size={14} className="opacity-40 group-hover:opacity-100" /> 導出當前配置代碼
            </button>
          </div>

          {activeTab === 'images' ? (
            <div className="space-y-12">
              <div className="bg-white/[0.02] p-8 md:p-10 rounded-[3rem] border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">標題</label>
                    <input value={newImage.title} onChange={e => setNewImage(prev => ({...prev, title: e.target.value}))} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-amber-500/50" placeholder="標題..." />
                  </div>
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">副標題</label>
                    <input value={newImage.subtitle} onChange={e => setNewImage(prev => ({...prev, subtitle: e.target.value}))} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-amber-500/50" placeholder="副標題..." />
                  </div>
                  <div className="md:col-span-4 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">圖片路徑</label>
                    <input value={newImage.url} onChange={e => setNewImage(prev => ({...prev, url: e.target.value}))} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white/50 text-xs truncate" placeholder="GitHub 連結或 Base64..." />
                  </div>
                  <div className="md:col-span-2 flex gap-3 h-[60px]">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    <button onClick={() => fileInputRef.current?.click()} className="w-16 h-full bg-[#1a1a1a] text-white/40 flex items-center justify-center rounded-2xl hover:text-white border border-white/5">
                      <Upload size={22} />
                    </button>
                    <button onClick={addImage} className={`flex-1 h-full flex items-center justify-center rounded-2xl transition-all ${isSuccess ? 'bg-green-500' : 'bg-[#f39c12] hover:brightness-110'}`}>
                      {isSuccess ? <Check size={28} /> : <Plus size={32} strokeWidth={3} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {images.map(img => (
                  <div key={img.id} className="group relative aspect-[10/14] rounded-[2rem] overflow-hidden border border-white/5 bg-black/50">
                    <img src={img.url} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" />
                    <button onClick={() => removeImage(img.id)} className="absolute top-3 right-3 p-2 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
               {/* 音樂新增區塊 */}
               <div className="bg-white/[0.02] p-8 md:p-10 rounded-[3rem] border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">曲名</label>
                    <input value={newTrack.title} onChange={e => setNewTrack(prev => ({...prev, title: e.target.value}))} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-amber-500/50" placeholder="歌曲名稱..." />
                  </div>
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">分類</label>
                    <select value={newTrack.category} onChange={e => setNewTrack(prev => ({...prev, category: e.target.value}))} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-4 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">音樂 MP3 URL</label>
                    <input value={newTrack.url} onChange={e => setNewTrack(prev => ({...prev, url: e.target.value}))} className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white/50 text-xs truncate" placeholder="音檔連結..." />
                  </div>
                  <div className="md:col-span-2">
                    <button onClick={addTrack} className={`w-full h-[60px] flex items-center justify-center rounded-2xl transition-all ${isSuccess ? 'bg-green-500' : 'bg-white text-black hover:bg-amber-500'}`}>
                      {isSuccess ? <Check size={28} /> : <Plus size={32} strokeWidth={3} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 音樂列表 */}
              <div className="space-y-4">
                {tracks.map(track => (
                  <div key={track.id} className="flex items-center justify-between p-6 bg-white/[0.02] rounded-3xl border border-white/5 group hover:bg-white/[0.05] transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center border border-white/5">
                        <Music size={18} className="text-white/20" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium tracking-wider">{track.title}</p>
                        <p className="text-white/20 text-[10px] uppercase tracking-widest mt-1">{track.category}</p>
                      </div>
                    </div>
                    <button onClick={() => removeTrack(track.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 md:p-10 border-t border-white/5 flex items-center justify-between bg-black/50 shrink-0">
          <p className="hidden md:block text-[10px] text-white/20 tracking-widest uppercase italic">
            Changes are saved to local storage temporarily.
          </p>
          <div className="flex w-full md:w-auto gap-4">
            <button onClick={onClose} className="flex-1 md:flex-none px-10 py-4 rounded-2xl bg-white/5 text-white/40 hover:text-white transition-all text-[11px] font-bold tracking-widest uppercase">DISCARD</button>
            <button onClick={onClose} className="flex-[2] md:flex-none px-12 py-4 rounded-2xl bg-white text-black text-[11px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-amber-500 transition-all">
              <Save size={16} /> SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
