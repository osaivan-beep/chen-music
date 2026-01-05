
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music as MusicIcon, ChevronRight, ListMusic } from 'lucide-react';
import { MusicTrack } from '../types';
import { CATEGORIES } from '../constants';

interface MusicPlayerProps {
  tracks: MusicTrack[];
  externalControl?: boolean;
  onPlaybackChange?: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, externalControl, onPlaybackChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('禎心推薦');
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredTracks = tracks.filter(t => selectedCategory === '禎心推薦' || t.category === selectedCategory);
  const currentTrack = currentTrackIndex !== null ? filteredTracks[currentTrackIndex] : null;

  useEffect(() => {
    if (externalControl !== undefined) {
      setIsPlaying(externalControl);
    }
  }, [externalControl]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch(() => {
            setIsPlaying(false);
            onPlaybackChange?.(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, currentTrack]);

  const handleTrackSelect = (idx: number) => {
    if (currentTrackIndex === idx) {
      const newState = !isPlaying;
      setIsPlaying(newState);
      onPlaybackChange?.(newState);
    } else {
      setCurrentTrackIndex(idx);
      setIsPlaying(true);
      onPlaybackChange?.(true);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex !== null && filteredTracks.length > 0) {
      setCurrentTrackIndex((currentTrackIndex + 1) % filteredTracks.length);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex !== null && filteredTracks.length > 0) {
      setCurrentTrackIndex((currentTrackIndex - 1 + filteredTracks.length) % filteredTracks.length);
    }
  };

  return (
    <div id="music-section" className="px-6 py-16 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/5 pb-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-serif font-light text-grey-matte mb-3 tracking-[0.15em]">禎藏律動</h3>
            <p className="text-neutral-600 text-[10px] md:text-xs tracking-[0.3em] uppercase font-light">Curated collection of favorite rhythms</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentTrackIndex(null); setIsPlaying(false); onPlaybackChange?.(false); }}
                className={`px-7 py-2.5 rounded-full text-[11px] font-medium tracking-[0.1em] transition-all duration-500 border ${
                  selectedCategory === cat 
                    ? 'bg-gold-matte text-black/70' 
                    : 'bg-transparent border-white/10 text-neutral-600 hover:border-white/30 hover:text-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTracks.map((track, idx) => (
            <div 
              key={track.id} 
              onClick={() => handleTrackSelect(idx)}
              className={`group flex items-center gap-5 p-4 rounded-[2rem] border transition-all duration-700 cursor-pointer ${
                currentTrackIndex === idx 
                  ? 'bg-white/[0.05] border-white/20 shadow-xl' 
                  : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10'
              }`}
            >
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-none">
                <img src={track.coverUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {currentTrackIndex === idx && isPlaying ? <Pause size={16} fill="#888" /> : <Play size={16} fill="#888" className="ml-1" />}
                </div>
              </div>
              <div className="flex-grow overflow-hidden">
                <h4 className={`font-medium text-[13px] truncate tracking-wide ${currentTrackIndex === idx ? 'text-amber-500/80' : 'text-neutral-400'}`}>{track.title}</h4>
                <p className="text-neutral-600 text-[9px] tracking-[0.15em] uppercase mt-1.5 truncate font-light">{track.artist}</p>
              </div>
              <div className="flex-none opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                <ChevronRight size={14} className="text-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentTrack && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-[100] bg-[#0a0a0b]/90 backdrop-blur-3xl border border-white/10 rounded-full p-2 shadow-2xl animate-fade-up flex items-center gap-4">
          <audio 
            ref={audioRef}
            src={currentTrack.url}
            onEnded={nextTrack}
            autoPlay={isPlaying}
          />
          <div className="relative flex-none">
            <img src={currentTrack.coverUrl} className={`w-11 h-11 rounded-full object-cover border border-white/10 opacity-70 ${isPlaying ? 'animate-spin-slow opacity-100' : ''}`} />
            {isPlaying && (
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-[#0a0a0b] animate-pulse" />
            )}
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-neutral-400 text-[11px] font-medium truncate tracking-wide">{currentTrack.title}</p>
            <p className="text-neutral-600 text-[9px] tracking-[0.1em] uppercase truncate font-light mt-0.5">{currentTrack.artist}</p>
          </div>
          <div className="flex items-center gap-2.5 pr-3">
            <button onClick={prevTrack} className="text-neutral-700 hover:text-neutral-400 transition-colors"><SkipBack size={14} /></button>
            <button 
              onClick={() => {
                  const s = !isPlaying;
                  setIsPlaying(s);
                  onPlaybackChange?.(s);
              }}
              className="w-9 h-9 bg-neutral-800 text-neutral-400 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-white/5"
            >
              {isPlaying ? <Pause size={16} fill="#888" /> : <Play size={16} fill="#888" className="ml-0.5" />}
            </button>
            <button onClick={nextTrack} className="text-neutral-700 hover:text-neutral-400 transition-colors"><SkipForward size={14} /></button>
          </div>
        </div>
      )}
    </div>
  );
};
