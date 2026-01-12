
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-serif font-light text-gold-enhanced tracking-[0.3em]">
                禎真
              </span>
              <span className="text-2xl md:text-3xl font-extralight tracking-[0.1em] text-gold-enhanced lowercase italic opacity-60">
                music
              </span>
            </div>
          </div>
          
          <p className="text-neutral-600 max-w-xs mx-auto leading-relaxed mb-6 text-[10px] tracking-widest font-light">
            以真摯的心弦，奏響靈魂的共鳴
          </p>
          
          <div className="flex items-center justify-center">
            <a href="#" className="opacity-30 hover:opacity-100 transition-opacity duration-500">
              <div className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neutral-500">
                  <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-1.5-16.5l6 4.5-6 4.5v-9z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] text-neutral-800 uppercase tracking-[0.4em] gap-2">
        <p></p>
        <p className="font-serif italic opacity-40">PURE SOUND EXPERIENCE</p>
      </div>
    </footer>
  );
};
