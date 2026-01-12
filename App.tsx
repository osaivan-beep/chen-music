
import React, { useState, useEffect, ReactNode } from 'react';
import { Header } from './components/Header';
import { Carousel } from './components/Carousel';
import { MusicPlayer } from './components/MusicPlayer';
import { PlatformLinks } from './components/PlatformLinks';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_CAROUSEL, INITIAL_TRACKS } from './constants';
import { CarouselImage, MusicTrack } from './types';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(_error: any): ErrorBoundaryState {
    return { hasError: true };
  }
  
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-2xl font-serif mb-4">系統資源載入異常</h1>
          <p className="text-neutral-500 mb-8 text-sm tracking-widest uppercase">已偵測到舊版快取衝突</p>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-colors"
          >
            清除緩存並強制重置
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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // 版本號升級至 v35
  const VERSION_KEY = 'v35';

  useEffect(() => {
    try {
      const savedImages = localStorage.getItem(`chen_music_carousel_${VERSION_KEY}`);
      const savedTracks = localStorage.getItem(`chen_music_tracks_${VERSION_KEY}`);
      
      if (savedImages) {
        setImages(JSON.parse(savedImages));
      } else {
        setImages(INITIAL_CAROUSEL);
        // 清除舊版本的殘留資料，避免路徑衝突
        localStorage.removeItem('chen_music_carousel_v30');
        localStorage.removeItem('chen_music_tracks_v30');
      }
      
      if (savedTracks) {
        setTracks(JSON.parse(savedTracks));
      } else {
        setTracks(INITIAL_TRACKS);
      }
    } catch (e) {
      console.error("LocalStorage load error:", e);
    }
  }, []);

  const handleUpdateImages = (newImages: CarouselImage[]) => {
    setImages(newImages);
    localStorage.setItem(`chen_music_carousel_${VERSION_KEY}`, JSON.stringify(newImages));
  };

  const handleUpdateTracks = (newTracks: MusicTrack[]) => {
    setTracks(newTracks);
    localStorage.setItem(`chen_music_tracks_${VERSION_KEY}`, JSON.stringify(newTracks));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#000000] text-neutral-300">
        <Header 
          onAdminClick={() => setIsAdminOpen(true)} 
          isAdmin={isAdminOpen}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={() => setIsMusicPlaying(!isMusicPlaying)}
        />
        <main className="flex-grow relative z-10">
          <Carousel images={images} />
          <MusicPlayer 
            tracks={tracks} 
            externalControl={isMusicPlaying}
            onPlaybackChange={setIsMusicPlaying}
          />
          <div className="pb-10">
            <PlatformLinks />
          </div>
        </main>
        <Footer />

        {isAdminOpen && (
          <AdminPanel 
            images={images}
            tracks={tracks}
            onUpdateImages={handleUpdateImages}
            onUpdateTracks={handleUpdateTracks}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
