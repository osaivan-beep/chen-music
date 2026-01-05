
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/60 backdrop-blur-2xl">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 h-24 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-serif font-light text-gold-enhanced tracking-[0.4em] uppercase">
              禎真
            </span>
            <span className="text-lg md:text-xl font-extralight tracking-[0.2em] text-neutral-600 lowercase italic">
              music
            </span>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/20 to-transparent mt-1" />
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={onToggleMusic}
            className="group flex items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 group-hover:text-amber-500 transition-colors">
              {isMusicPlaying ? 'Audio On' : 'Audio Off'}
            </span>
            <div className={`p-2 rounded-full border transition-all ${isMusicPlaying ? 'border-amber-500/40 text-amber-500' : 'border-white/5 text-neutral-700'}`}>
              {isMusicPlaying ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
            </div>
          </button>
          
          <button 
            onClick={onAdminClick}
            className={`transition-colors ${isAdmin ? 'text-amber-500' : 'text-neutral-700 hover:text-white'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
