
import React, { useState, useEffect, ReactNode, Component } from 'react';
import { Header } from './components/Header';
import { Carousel } from './components/Carousel';
import { MusicPlayer } from './components/MusicPlayer';
import { AdminPanel } from './components/AdminPanel';
import { PlatformLinks } from './components/PlatformLinks';
import { Footer } from './components/Footer';
import { INITIAL_CAROUSEL, INITIAL_TRACKS, ADMIN_PASSWORD } from './constants';
import { CarouselImage, MusicTrack } from './types';

// 更新版本號至 v17 確保使用者看到的是最新設定的網址
const STORAGE_KEY_IMAGES = 'chen_music_carousel_v17';
const STORAGE_KEY_TRACKS = 'chen_music_tracks_v17';

interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

// Fixed: Using React.Component and providing an explicit constructor to resolve 'props' visibility in TypeScript
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-2xl font-serif mb-4">系統資源載入異常</h1>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="px-8 py-3 bg-amber-500 text-black rounded-full font-bold uppercase tracking-widest text-xs"
          >
            重置並恢復
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [images, setImages] = useState<CarouselImage[]>(INITIAL_CAROUSEL);
  const [tracks, setTracks] = useState<MusicTrack[]>(INITIAL_TRACKS);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isGlobalMusicOn, setIsGlobalMusicOn] = useState(false);

  useEffect(() => {
    try {
      // 檢查舊版快取並清理 (針對 v16 或更早版本)
      const oldKeys = Object.keys(localStorage);
      oldKeys.forEach(key => {
        if (key.startsWith('chen_music') && !key.includes('v17')) {
          localStorage.removeItem(key);
        }
      });

      const savedImages = localStorage.getItem(STORAGE_KEY_IMAGES);
      const savedTracks = localStorage.getItem(STORAGE_KEY_TRACKS);
      
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setImages(parsed);
        } else {
          setImages(INITIAL_CAROUSEL);
        }
      } else {
        setImages(INITIAL_CAROUSEL);
      }

      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        if (Array.isArray(parsed) && parsed.length > 0) setTracks(parsed);
      }
    } catch (e) {
      setImages(INITIAL_CAROUSEL);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = showAdmin ? 'hidden' : 'auto';
  }, [showAdmin]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(images));
      localStorage.setItem(STORAGE_KEY_TRACKS, JSON.stringify(tracks));
    } catch (e) {
      console.warn("Storage write error");
    }
  }, [images, tracks]);

  const handleAdminClick = () => {
    if (isAuthorized) {
      setShowAdmin(true);
    } else {
      const password = prompt('管理員驗證：');
      if (password === ADMIN_PASSWORD) {
        setIsAuthorized(true);
        setShowAdmin(true);
      } else if (password !== null) {
        alert('密碼錯誤');
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#050505]">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/5 blur-[150px] rounded-full" />
        </div>

        <Header 
          onAdminClick={handleAdminClick} 
          isAdmin={isAuthorized} 
          isMusicPlaying={isGlobalMusicOn}
          onToggleMusic={() => setIsGlobalMusicOn(!isGlobalMusicOn)}
        />
        
        <main className="flex-grow relative z-10">
          <Carousel images={images} />
          <MusicPlayer 
             tracks={tracks} 
             externalControl={isGlobalMusicOn} 
             onPlaybackChange={setIsGlobalMusicOn} 
          />
          <PlatformLinks />
        </main>
        <Footer />
        {showAdmin && (
          <AdminPanel 
            images={images} 
            tracks={tracks}
            onUpdateImages={setImages}
            onUpdateTracks={setTracks}
            onClose={() => setShowAdmin(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
