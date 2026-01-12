
import React from 'react';
import { Settings, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick, isAdmin, isMusicPlaying, onToggleMusic }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/40 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
        <div className="flex flex-col group cursor-default">
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-serif font-light text-gold-enhanced tracking-[0.4em] uppercase">
              禎真
            </span>
            <span className="text-xs md:text-sm font-extralight tracking-[0.2em] text-white/20 lowercase italic">
              music
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8 md:gap-12">
          <button 
            onClick={onToggleMusic}
            className="group flex items-center gap-3"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-neutral-600 group-hover:text-amber-500/60 transition-colors hidden md:block font-bold">
              {isMusicPlaying ? 'On Air' : 'Mute'}
            </span>
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-700 ${isMusicPlaying ? 'border-amber-500/20 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-white/5 text-neutral-700'}`}>
              {isMusicPlaying ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </div>
          </button>
          
          <button 
            onClick={onAdminClick}
            className={`transition-all duration-700 ${isAdmin ? 'text-amber-500' : 'text-neutral-800 hover:text-white/40'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
