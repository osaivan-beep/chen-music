
import React, { useEffect, useRef, useState } from 'react';
import { CarouselImage } from '../types';

interface CarouselProps {
  images: CarouselImage[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.clientWidth * 0.9; 
      const desktopCardWidth = 600; 
      
      const effectiveWidth = window.innerWidth < 768 ? cardWidth : desktopCardWidth;
      const index = Math.round(scrollPosition / effectiveWidth);
      setActiveIndex(Math.min(index, images.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    const autoScroll = () => {
      if (!container) return;
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 50)) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: window.innerWidth < 768 ? window.innerWidth * 0.85 : 600, behavior: 'smooth' });
      }
    };

    const timer = setInterval(autoScroll, 10000);
    return () => {
      clearInterval(timer);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section className="relative pt-36 pb-12 overflow-hidden bg-[#000]">
      {/* 裝飾性背景文字 - 模仿 ivan-ai 风格 */}
      <div className="absolute top-20 left-12 pointer-events-none opacity-[0.03] select-none">
        <span className="text-[15vw] font-serif font-black tracking-tighter uppercase leading-none block">Gallery</span>
      </div>

      <div 
        ref={scrollRef}
        className="relative z-10 flex overflow-x-auto gap-6 md:gap-10 px-6 md:px-[10vw] no-scrollbar snap-x snap-mandatory scroll-smooth pb-12"
      >
        {images.slice(0, 6).map((image, idx) => (
          <div
            key={image.id}
            className="flex-none w-[88vw] md:w-[560px] aspect-[4/5] relative rounded-[2px] overflow-hidden snap-center group border border-white/[0.03] bg-neutral-900 transition-all duration-1000"
          >
            {/* 圖片層 - 緩慢縮放效果 */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover img-zoom opacity-50 group-hover:opacity-100 transition-all duration-[4s] ease-out scale-105 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-90 group-hover:opacity-40 transition-opacity duration-[2s]" />
            </div>

            {/* 文字與資訊 - 極簡風格 */}
            <div className="absolute inset-0 p-10 md:p-12 flex flex-col justify-end z-20">
              <div className="overflow-hidden">
                <p className="text-[10px] text-amber-500/80 tracking-[0.6em] uppercase font-bold mb-3 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-1000">
                  {image.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-[0.1em] font-light leading-tight transform translate-y-10 group-hover:translate-y-0 transition-transform duration-1000 delay-100">
                  {image.title}
                </h3>
              </div>
            </div>
            
            {/* 編號裝飾 */}
            <div className="absolute top-8 right-8 text-[10px] font-mono text-white/20 tracking-widest">
              {String(idx + 1).padStart(2, '0')} / 06
            </div>
          </div>
        ))}
      </div>

      {/* 進度控制條 */}
      <div className="mt-4 max-w-[1400px] mx-auto px-10 flex items-center justify-center">
        <div className="flex gap-4 items-center">
           {images.slice(0, 6).map((_, i) => (
             <button 
               key={i} 
               onClick={() => {
                 const cardWidth = window.innerWidth < 768 ? (window.innerWidth * 0.88 + 24) : 600;
                 scrollRef.current?.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
               }}
               className={`h-[1px] transition-all duration-700 ${activeIndex === i ? 'w-16 bg-white' : 'w-6 bg-white/10 hover:bg-white/30'}`} 
             />
           ))}
        </div>
      </div>
    </section>
  );
};
