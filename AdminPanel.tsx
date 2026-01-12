
import React, { useState, useRef } from 'react';
import { Plus, Trash2, Save, X, Upload, Code, Check } from 'lucide-react';
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
  const [newTrack, setNewTrack] = useState({ title: '', artist: '', category: CATEGORIES[1], url: '', coverUrl: '' });

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
    // 檢查必填項
    if (!newImage.url.trim()) {
      alert("請上傳圖片或輸入網址！");
      return;
    }
    if (!newImage.title.trim()) {
      alert("請輸入圖片標題！");
      return;
    }

    try {
      const newEntry: CarouselImage = { 
        ...newImage, 
        id: `img_${Date.now()}` 
      };
      
      const updated = Array.isArray(images) ? [...images, newEntry] : [newEntry];
      onUpdateImages(updated);
      
      // 重置輸入框
      setNewImage({ title: '', subtitle: '', url: '' });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500);
    } catch (e) {
      alert("新增失敗，可能是瀏覽器儲存空間已滿。建議點擊「導出配置」並清理本地數據。");
    }
  };

  const removeImage = (id: string) => {
    if (confirm("確定要刪除這張圖片嗎？")) {
      onUpdateImages(images.filter(img => img.id !== id));
    }
  };

  const exportConfig = () => {
    const code = `export const INITIAL_CAROUSEL: CarouselImage[] = ${JSON.stringify(images, null, 2)};`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'new_constants.txt';
    a.click();
    alert("代碼已導出。若要永久生效，請將此內容貼回 constants.ts。");
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-12">
      {/* 主要容器：確保有固定高度且內部可捲動 */}
      <div className="bg-[#0c0c0c] w-full max-w-7xl h-full md:h-[90vh] flex flex-col md:rounded-[3.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Header - 固定頂部 */}
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

        {/* 捲動內容區域 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 pb-10">
          
          <div className="flex justify-end mb-8">
            <button 
              onClick={exportConfig}
              className="flex items-center gap-2 text-[10px] text-white/40 hover:text-white bg-white/5 px-6 py-3 rounded-2xl border border-white/5 transition-all tracking-widest uppercase group"
            >
              <Code size={14} className="opacity-40 group-hover:opacity-100" /> 導出當前配置代碼
            </button>
          </div>

          {activeTab === 'images' ? (
            <div className="space-y-12">
              {/* 新增區塊 */}
              <div className="bg-white/[0.02] p-8 md:p-10 rounded-[3rem] border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">標題</label>
                    <input 
                      value={newImage.title} 
                      onChange={e => setNewImage(prev => ({...prev, title: e.target.value}))} 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-amber-500/50 transition-all"
                      placeholder="標題..."
                    />
                  </div>
                  <div className="md:col-span-3 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">副標題</label>
                    <input 
                      value={newImage.subtitle} 
                      onChange={e => setNewImage(prev => ({...prev, subtitle: e.target.value}))} 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-amber-500/50 transition-all"
                      placeholder="副標題..."
                    />
                  </div>
                  <div className="md:col-span-4 space-y-3">
                    <label className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">圖片路徑</label>
                    <input 
                      value={newImage.url} 
                      onChange={e => setNewImage(prev => ({...prev, url: e.target.value}))} 
                      className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white/50 text-xs outline-none focus:border-amber-500/50 transition-all truncate"
                      placeholder="GitHub 連結或 Base64..."
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-3 h-[60px]">
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-16 h-full bg-[#1a1a1a] text-white/40 flex items-center justify-center rounded-2xl hover:text-white border border-white/5"
                    >
                      <Upload size={22} />
                    </button>
                    <button 
                      onClick={addImage} 
                      className={`flex-1 h-full flex items-center justify-center rounded-2xl transition-all shadow-xl active:scale-95 ${isSuccess ? 'bg-green-500 text-white' : 'bg-[#f39c12] text-black hover:brightness-110'}`}
                    >
                      {isSuccess ? <Check size={28} /> : <Plus size={32} strokeWidth={3} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 圖片列表 */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {images.map(img => (
                  <div key={img.id} className="group relative aspect-[10/14] rounded-[2rem] overflow-hidden border border-white/5 bg-black/50">
                    <img src={img.url} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-5 flex flex-col justify-end">
                       <p className="text-white text-xs truncate font-medium">{img.title}</p>
                    </div>
                    <button 
                      onClick={() => removeImage(img.id)}
                      className="absolute top-3 right-3 p-2 bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-white/10 uppercase tracking-[0.5em] text-xs">
              Music Management Feature Coming Soon
            </div>
          )}
        </div>

        {/* Footer - 固定底部 */}
        <div className="p-8 md:p-10 border-t border-white/5 flex items-center justify-between bg-black/50 shrink-0">
          <p className="hidden md:block text-[10px] text-white/20 tracking-widest uppercase italic">
            Changes are saved to local storage temporarily.
          </p>
          <div className="flex w-full md:w-auto gap-4">
            <button 
              onClick={onClose} 
              className="flex-1 md:flex-none px-10 py-4 rounded-2xl bg-white/5 text-white/40 hover:text-white transition-all text-[11px] font-bold tracking-widest uppercase"
            >
              DISCARD
            </button>
            <button 
              onClick={onClose} 
              className="flex-[2] md:flex-none px-12 py-4 rounded-2xl bg-white text-black text-[11px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-amber-500 transition-all"
            >
              <Save size={16} /> SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
