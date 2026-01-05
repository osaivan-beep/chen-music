
import React from 'react';

export const PlatformLinks: React.FC = () => {
  const platforms = [
    {
      name: 'SoundOn',
      color: '#00A3E0',
      icon: (
        <div className="relative flex items-center justify-center scale-75">
          <div className="w-10 h-10 rounded-full border-2 border-current"></div>
          <div className="absolute w-5 h-5 rounded-full border-2 border-current"></div>
          <div className="absolute w-2 h-2 rounded-full bg-current"></div>
        </div>
      ),
      url: '#'
    },
    {
      name: 'Spotify',
      color: '#1DB954',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.674.464-1.027.249-2.812-1.718-6.35-2.106-10.518-1.154-.403.093-.811-.157-.904-.56-.093-.403.157-.811.56-.904 4.564-1.044 8.468-.6 11.64 1.34.353.215.464.674.249 1.027zm1.465-3.264c-.27.44-.846.58-1.286.31-3.218-1.977-8.125-2.55-11.93-1.396-.5-.152-.832-.516-.682-1.016.151-.5.516-.832 1.016-.682 4.35 1.319 9.758.804 13.483-1.487.44-.27 1.016-.13 1.286.31.27.44.13 1.016-.31 1.286zm.126-3.414c-3.86-2.292-10.232-2.504-13.913-1.386-.593.18-1.23-.153-1.41-.746-.18-.593.153-1.23.746-1.41 4.232-1.285 11.272-1.028 15.69 1.593.533.317.708 1.004.392 1.537-.317.533-1.004.708-1.537.392z"/>
        </svg>
      ),
      url: '#'
    },
    {
      name: 'KKBOX Podcast',
      color: '#00AFE5',
      icon: (
        <div className="w-6 h-6 bg-white clip-path-hexagon flex items-center justify-center">
          <span className="text-[#00AFE5] text-[10px] font-black">K</span>
        </div>
      ),
      url: '#'
    },
    {
      name: 'Apple Podcast',
      color: '#A259FF',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-18c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8z" opacity=".4"/>
          <path d="M12 6c-3.314 0-6 2.686-6 6 0 1.455.518 2.788 1.378 3.82l1.418-1.418C8.293 13.738 8 12.903 8 12c0-2.209 1.791-4 4-4s4 1.791 4 4c0 .903-.293 1.738-.796 2.402l1.418 1.418C17.482 14.788 18 13.455 18 12c0-3.314-2.686-6-6-6z" />
        </svg>
      ),
      url: '#'
    }
  ];

  return (
    <section className="px-6 py-16 bg-[#0a0a0b]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-grey-matte mb-3 tracking-[0.2em]">聲韻迴響</h3>
          <p className="text-white/20 text-[10px] md:text-xs tracking-[0.3em] uppercase font-light mb-6">Explore our musical footprints across platforms</p>
          <div className="w-8 h-[1px] bg-white/10 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {platforms.map((p) => (
            <a 
              key={p.name}
              href={p.url}
              className="group relative flex flex-col items-center justify-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl" 
                style={{ backgroundColor: p.color }}
              ></div>
              
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-2xl transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: p.name === 'KKBOX Podcast' ? p.color : (p.name === 'Apple Podcast' ? p.color : 'transparent'), color: p.color, border: p.name === 'SoundOn' || p.name === 'Spotify' ? `2px solid ${p.color}` : 'none' }}
              >
                {p.icon}
              </div>
              
              <span className="text-xs font-bold tracking-[0.2em] text-white/40 group-hover:text-white transition-colors uppercase">
                {p.name}
              </span>
            </a>
          ))}
        </div>
      </div>
      
      <style>{`
        .clip-path-hexagon {
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
      `}</style>
    </section>
  );
};
