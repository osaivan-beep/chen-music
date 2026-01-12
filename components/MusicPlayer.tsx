
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { MusicTrack } from '../types';

interface MusicPlayerProps {
  tracks: MusicTrack[];
  externalControl?: boolean;
  onPlaybackChange?: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, externalControl, onPlaybackChange }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const displayTracks = tracks.slice(0, 12);
  const currentTrack = currentTrackIndex !== null ? displayTracks[currentTrackIndex] : null;

  useEffect(() => {
    if (externalControl !== undefined) setIsPlaying(externalControl);
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

  return (
    <div id="music-section" className="px-6 py-20 max-w-[1200px] mx-auto bg-[#000]">
      
      {/* 藝文引言 - 增加呼吸感 */}
      <div className="flex flex-col items-start text-left mb-20 animate-fade-up max-w-2xl">
        <div className="w-12 h-[1px] bg-amber-500/50 mb-8" />
        <h2 className="text-3xl md:text-4xl font-serif font-light text-white tracking-[0.2em] mb-8 leading-tight">
          Soul Resonance<br/>
          <span className="text-neutral-600 text-lg tracking-[0.1em] font-sans italic">以琴聲尋找內心的平靜</span>
        </h2>
        <p className="text-[14px] text-neutral-500 font-serif font-light tracking-widest leading-[2.2] italic">
          當世界偶爾變得吵雜，願流動的音符能帶給你一點安定的力量。<br/>
          此刻，請閉上眼睛，讓心跟著節奏慢下來。
        </p>
      </div>

      {/* 歌曲清單 - 模仿高品質專輯列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
        {displayTracks.map((track, idx) => (
          <button 
            key={track.id} 
            onClick={() => handleTrackSelect(idx)}
            className={`flex items-center justify-between py-8 px-2 border-b transition-all duration-1000 group text-left ${
              currentTrackIndex === idx 
                ? 'border-white/20' 
                : 'border-white/[0.04] hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-8">
              <span className={`text-[10px] font-mono transition-colors duration-700 ${currentTrackIndex === idx ? 'text-amber-500' : 'text-neutral-700 group-hover:text-neutral-400'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                 <span className={`text-[15px] font-serif font-light tracking-[0.15em] mb-2 transition-all duration-700 ${currentTrackIndex === idx ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                   {track.title}
                 </span>
                 <span className={`text-[11px] leading-relaxed tracking-wider font-light transition-all duration-700 ${currentTrackIndex === idx ? 'text-neutral-400' : 'text-neutral-700 group-hover:text-neutral-600'}`}>
                   {track.artist.split('\n')[0]}
                 </span>
              </div>
            </div>
            
            <div className={`flex-shrink-0 transition-all duration-700 ${
              currentTrackIndex === idx 
                ? 'text-amber-500 scale-125' 
                : 'text-neutral-800 opacity-0 group-hover:opacity-100 group-hover:text-neutral-400'
            }`}>
              {currentTrackIndex === idx && isPlaying ? (
                <div className="flex gap-1 items-end h-4">
                  <div className="w-[2px] h-3 bg-current animate-[music-bar_0.6s_ease-in-out_infinite]" />
                  <div className="w-[2px] h-4 bg-current animate-[music-bar_0.8s_ease-in-out_infinite_0.1s]" />
                  <div className="w-[2px] h-2 bg-current animate-[music-bar_0.7s_ease-in-out_infinite_0.2s]" />
                </div>
              ) : (
                <Play size={14} strokeWidth={1.5} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 底部播放器 */}
      {currentTrack && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-xl z-[100] bg-[#0c0c0c]/90 backdrop-blur-3xl border border-white/[0.08] rounded-2xl p-4 flex items-center gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)] animate-fade-up">
          <audio ref={audioRef} src={currentTrack.url} onEnded={() => setCurrentTrackIndex((currentTrackIndex! + 1) % displayTracks.length)} />
          <div className="relative shrink-0 overflow-hidden rounded-lg">
            <img src={currentTrack.coverUrl} className={`w-14 h-14 object-cover transition-all duration-[3s] ${isPlaying ? 'scale-110 rotate-3' : 'grayscale opacity-50'}`} />
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-white text-[13px] font-serif font-light truncate tracking-[0.2em] mb-1">{currentTrack.title}</p>
            <p className="text-neutral-600 text-[9px] tracking-[0.4em] uppercase font-bold italic">Now Playing</p>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all shrink-0 border border-white/10 group"
          >
            {isPlaying ? <Pause size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" /> : <Play size={18} strokeWidth={1.5} className="ml-1 group-hover:scale-110 transition-transform" />}
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}} />
    </div>
  );
};
