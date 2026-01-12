
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, AlertCircle, Loader2 } from 'lucide-react';
import { MusicTrack } from '../types';

interface MusicPlayerProps {
  tracks: MusicTrack[];
  externalControl?: boolean;
  onPlaybackChange?: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, externalControl, onPlaybackChange }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const displayTracks = tracks.slice(0, 12);
  const currentTrack = currentTrackIndex !== null ? displayTracks[currentTrackIndex] : null;

  useEffect(() => {
    if (externalControl !== undefined) setIsPlaying(externalControl);
  }, [externalControl]);

  // 當音軌改變時重新載入
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      setIsLoading(true);
      setHasError(false);
      audioRef.current.load(); // 強制瀏覽器重新載入新 src
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback failed for URL:", currentTrack.url, error);
            setIsPlaying(false);
            onPlaybackChange?.(false);
          });
        }
      }
    }
  }, [currentTrackIndex]);

  // 當播放/暫停狀態改變時
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error("Audio play error:", err);
          setIsPlaying(false);
          onPlaybackChange?.(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

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
    <div id="music-section" className="px-6 py-24 max-w-[1400px] mx-auto bg-[#000]">
      
      {/* 藝文引言 */}
      <div className="flex flex-col items-start text-left mb-24 animate-fade-up max-w-3xl px-4 md:px-20">
        <div className="w-16 h-[1px] bg-white/20 mb-10" />
        <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-[0.25em] mb-10 leading-[1.3]">
          Soul Resonance<br/>
          <span className="text-neutral-700 text-xl tracking-[0.15em] font-sans italic mt-2 block">以琴聲尋找內心的平靜</span>
        </h2>
        <div className="space-y-4">
          <p className="text-[13px] md:text-[15px] text-neutral-500 font-serif font-light tracking-[0.2em] leading-[2.4] italic">
            當世界偶爾變得吵雜，願流動的音符能帶給你一點安定的力量。<br/>
            此刻，請閉上眼睛，讓心跟著節奏慢下來。
          </p>
        </div>
      </div>

      {/* 歌曲清單 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-0 px-4 md:px-20 border-t border-white/[0.03]">
        {displayTracks.map((track, idx) => (
          <button 
            key={track.id} 
            onClick={() => handleTrackSelect(idx)}
            className={`flex items-center justify-between py-10 px-0 border-b transition-all duration-1000 group text-left ${
              currentTrackIndex === idx 
                ? 'border-white/20' 
                : 'border-white/[0.04] hover:border-white/10'
            }`}
          >
            <div className="flex items-center gap-10">
              <span className={`text-[9px] font-mono transition-colors duration-700 ${currentTrackIndex === idx ? 'text-white' : 'text-neutral-800 group-hover:text-neutral-500'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                 <span className={`text-[14px] font-serif font-light tracking-[0.2em] mb-2.5 transition-all duration-700 ${currentTrackIndex === idx ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                   {track.title}
                 </span>
                 <span className={`text-[10px] leading-relaxed tracking-[0.1em] font-light transition-all duration-700 ${currentTrackIndex === idx ? 'text-neutral-500' : 'text-neutral-800 group-hover:text-neutral-700'}`}>
                   {track.artist}
                 </span>
              </div>
            </div>
            
            <div className={`flex-shrink-0 transition-all duration-700 ${
              currentTrackIndex === idx 
                ? 'text-white scale-125' 
                : 'text-neutral-900 opacity-0 group-hover:opacity-100 group-hover:text-neutral-600'
            }`}>
              {currentTrackIndex === idx && isPlaying ? (
                <div className="flex gap-1.5 items-end h-3.5">
                  <div className="w-[1px] h-2.5 bg-current animate-[music-bar_0.6s_ease-in-out_infinite]" />
                  <div className="w-[1px] h-3.5 bg-current animate-[music-bar_0.8s_ease-in-out_infinite_0.1s]" />
                  <div className="w-[1px] h-2 bg-current animate-[music-bar_0.7s_ease-in-out_infinite_0.2s]" />
                </div>
              ) : (
                <Play size={12} strokeWidth={1} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 底部播放器 */}
      {currentTrack && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-2xl z-[100] bg-black/90 backdrop-blur-3xl border border-white/[0.1] rounded-full p-2.5 flex items-center gap-6 shadow-[0_40px_100px_rgba(0,0,0,0.9)] animate-fade-up">
          <audio 
            ref={audioRef} 
            src={currentTrack.url} 
            onEnded={() => setCurrentTrackIndex((currentTrackIndex! + 1) % displayTracks.length)}
            onCanPlay={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onError={(e) => {
              console.error("Audio element error on URL:", currentTrack.url, e);
              setIsLoading(false);
              setHasError(true);
              setIsPlaying(false);
              onPlaybackChange?.(false);
            }}
          />
          <div className="relative shrink-0 overflow-hidden rounded-full ml-1 bg-neutral-900">
            <img 
              src={currentTrack.coverUrl} 
              className={`w-12 h-12 object-cover transition-all duration-[4s] ${isPlaying ? 'scale-110 rotate-6' : 'grayscale opacity-30'}`} 
              onError={(e) => (e.currentTarget.src = 'https://placehold.co/100x100/000/fff?text=Music')}
            />
          </div>
          <div className="flex-grow overflow-hidden px-2">
            <p className="text-white text-[12px] font-serif font-light truncate tracking-[0.15em] mb-1">{currentTrack.title}</p>
            <div className="flex items-center gap-3">
               {hasError ? (
                 <span className="text-red-500 text-[8px] tracking-[0.3em] uppercase font-bold italic flex items-center gap-1">
                   <AlertCircle size={8} /> File Not Found
                 </span>
               ) : (
                 <>
                   <span className="text-neutral-600 text-[8px] tracking-[0.3em] uppercase font-bold italic">
                     {isLoading ? 'Buffering' : 'Playing'}
                   </span>
                   <div className="flex gap-1 items-center">
                      <div className={`w-1 h-1 rounded-full bg-white/20 ${isLoading ? 'animate-bounce' : 'animate-pulse'}`} />
                      <div className={`w-1 h-1 rounded-full bg-white/40 ${isLoading ? 'animate-bounce delay-75' : 'animate-pulse delay-75'}`} />
                      <div className={`w-1 h-1 rounded-full bg-white/20 ${isLoading ? 'animate-bounce delay-150' : 'animate-pulse delay-150'}`} />
                   </div>
                 </>
               )}
            </div>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={hasError}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0 group mr-1 shadow-xl ${hasError ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200'}`}
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : (isPlaying ? <Pause size={16} strokeWidth={2} /> : <Play size={16} strokeWidth={2} className="ml-1" />)}
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `}} />
    </div>
  );
};
