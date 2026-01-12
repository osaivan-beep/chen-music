
import React from 'react';

export const PlatformLinks: React.FC = () => {
  const platforms = [
    {
      name: 'SoundOn',
      color: '#00A3E0',
      icon: (
        <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-white/30">
           <div className="relative flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border border-current opacity-40"></div>
              <div className="absolute w-1 h-1 rounded-full bg-current"></div>
           </div>
        </div>
      ),
      url: 'https://player.soundon.fm/p/5c071ed8-ffae-4c89-8d34-ff56b44f73c4'
    },
    {
      name: 'Spotify',
      color: '#1DB954',
      icon: (
        <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-white/30">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current opacity-60 group-hover:opacity-100 transition-opacity">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.674.464-1.027.249-2.812-1.718-6.35-2.106-10.518-1.154-.403.093-.811-.157-.904-.56-.093-.403.157-.811.56-.904 4.564-1.044 8.468-.6 11.64 1.34.353.215.464.674.249 1.027zm1.465-3.264c-.27.44-.846.58-1.286.31-3.218-1.977-8.125-2.55-11.93-1.396-.5-.152-.832-.516-.682-1.016.151-.5.516-.832 1.016-.682 4.35 1.319 9.758.804 13.483-1.487.44-.27 1.016-.13 1.286.31.27.44.13 1.016-.31 1.286zm.126-3.414c-3.86-2.292-10.232-2.504-13.913-1.386-.593.18-1.23-.153-1.41-.746-.18-.593.153-1.23.746-1.41 4.232-1.285 11.272-1.028 15.69 1.593.533.317.708 1.004.392 1.537-.317.533-1.004.708-1.537.392z"/>
          </svg>
        </div>
      ),
      url: '#'
    }
  ];

  return (
    <div className="py-10 flex flex-col items-center gap-6 bg-[#000000]">
      <span className="text-[9px] tracking-[0.4em] uppercase text-neutral-700 font-bold">Listen Everywhere</span>
      <div className="flex gap-10">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
            style={{ color: platform.color }}
          >
            {platform.icon}
            <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-600 group-hover:text-white transition-colors font-medium">{platform.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
