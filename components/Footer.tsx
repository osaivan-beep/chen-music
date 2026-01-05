
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            {/* 調整間距 gap 從 3 縮小至 1.5，讓視覺重心更集中 */}
            <div className="flex items-baseline gap-1.5 md:gap-2">
              <span className="text-3xl md:text-4xl font-serif font-light text-gold-enhanced tracking-[0.3em]">
                禎真
              </span>
              {/* 將 music 字體從 text-xl md:text-2xl 調大至 text-3xl md:text-4xl */}
              <span className="text-3xl md:text-4xl font-extralight tracking-[0.1em] text-neutral-700 lowercase italic">
                music
              </span>
            </div>
          </div>
          
          <p className="text-neutral-500 max-w-xs mx-auto leading-relaxed mb-8 text-[12px] tracking-widest font-light">
            以真摯的心弦，奏響靈魂的共鳴
          </p>
          
          <div className="flex items-center justify-center gap-5">
            <a href="#" className="opacity-40 hover:opacity-100 transition-opacity duration-500">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-neutral-600 group-hover:fill-neutral-400">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" opacity=".1"/>
                  <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm-1.5-16.5l6 4.5-6 4.5v-9z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-neutral-700 uppercase tracking-[0.4em] gap-4">
        <p>© 2024 禎真音樂. ALL RIGHTS RESERVED.</p>
        <p className="font-serif italic text-neutral-800">PURE SOUND EXPERIENCE</p>
      </div>
    </footer>
  );
};
