
import React, { useEffect, useRef, useState } from 'react';
import { CarouselImage } from '../types';

interface CarouselProps {
  images: CarouselImage[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef(true);

  useEffect(() => {
    if (!images || !Array.isArray(images) || images.length === 0) return;
    const container = scrollRef.current;
    if (!container) return;

    const autoScroll = () => {
      if (!isAutoScrolling.current) return;
      const cardWidth = 400; 
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 20)) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    };

    const timer = setInterval(autoScroll, 6000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || !Array.isArray(images) || images.length === 0) return null;

  return (
    <section className="relative pt-36 pb-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div 
        ref={scrollRef}
        onMouseEnter={() => isAutoScrolling.current = false}
        onMouseLeave={() => isAutoScrolling.current = true}
        className="relative z-10 flex overflow-x-auto gap-12 px-8 md:px-[20vw] no-scrollbar snap-x snap-mandatory scroll-smooth pb-16"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="flex-none w-[85vw] md:w-[380px] aspect-[10/14] relative rounded-[3rem] overflow-hidden snap-center group border border-white/10 bg-neutral-900 transition-all duration-700 hover:border-amber-500/30 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
          >
            {/* 圖片層 */}
            <div className="absolute inset-0 overflow-hidden bg-neutral-950">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                loading="eager"
                onError={(e) => {
                  console.error(`圖片載入失敗，請檢查網址是否正確: ${image.url}`);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* 圖片載入失敗時的底色提示 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="text-[10px] text-white/5 tracking-widest uppercase italic">Loading Artistic Work...</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90 opacity-80" />
            </div>

            {/* 文字內容區 */}
            <div className="absolute inset-x-0 bottom-0 p-10 transform transition-all duration-700">
              <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                <div className="mb-4">
                  <span className="inline-block text-[9px] tracking-[0.4em] text-amber-500 uppercase font-bold bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                    Artistic Selection
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-wide leading-tight">
                  {image.title}
                </h3>
                <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-light">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部指示點 */}
      <div className="flex justify-center items-center gap-12 opacity-20">
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-white/20" />
        <div className="flex gap-3">
           {images.slice(0, 6).map((_, i) => (
             <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
           ))}
        </div>
        <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-white/20" />
      </div>
    </section>
  );
};
