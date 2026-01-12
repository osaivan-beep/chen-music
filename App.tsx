
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

/**
 * ErrorBoundary class component to catch rendering errors.
 */
// Fix: Use React.Component to ensure inherited properties like 'props' and 'state' are correctly recognized by TypeScript.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Explicitly declare state at the class level to resolve "Property 'state' does not exist" errors.
  state: ErrorBoundaryState = { hasError: false };

  // Fix: Explicitly declare props at the class level to resolve "Property 'props' does not exist" errors.
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  // Static getDerivedStateFromError correctly updates state when an error is caught.
  static getDerivedStateFromError(_error: any): ErrorBoundaryState {
    return { hasError: true };
  }
  
  render(): ReactNode {
    // Fix: Accessing state inherited from React.Component now recognized by TypeScript.
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-2xl font-serif mb-4">系統資源載入異常</h1>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs"
          >
            重置並恢復
          </button>
        </div>
      );
    }
    // Fix: Accessing props inherited from React.Component now recognized by TypeScript.
    return this.props.children;
  }
}

function App() {
  const [images, setImages] = useState<CarouselImage[]>(INITIAL_CAROUSEL);
  const [tracks, setTracks] = useState<MusicTrack[]>(INITIAL_TRACKS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    try {
      const savedImages = localStorage.getItem('chen_music_carousel_v19');
      const savedTracks = localStorage.getItem('chen_music_tracks_v19');
      if (savedImages) setImages(JSON.parse(savedImages));
      if (savedTracks) setTracks(JSON.parse(savedTracks));
    } catch (e) {
      console.error("LocalStorage load error:", e);
    }
  }, []);

  const handleUpdateImages = (newImages: CarouselImage[]) => {
    setImages(newImages);
    localStorage.setItem('chen_music_carousel_v19', JSON.stringify(newImages));
  };

  const handleUpdateTracks = (newTracks: MusicTrack[]) => {
    setTracks(newTracks);
    localStorage.setItem('chen_music_tracks_v19', JSON.stringify(newTracks));
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