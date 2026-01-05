
import React, { useEffect, useRef } from 'react';
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
      const cardWidth = 420; // 調整卡片滾動寬度
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 50)) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    };

    const timer = setInterval(autoScroll, 5000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div className="pt-36 pb-24 text-center text-white/20 italic tracking-widest">
        Loading Curated Gallery...
      </div>
    );
  }

  return (
    <section className="relative pt-36 pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div 
        ref={scrollRef}
        onMouseEnter={() => isAutoScrolling.current = false}
        onMouseLeave={() => isAutoScrolling.current = true}
        className="relative z-10 flex overflow-x-auto gap-8 md:gap-14 px-8 md:px-[15vw] no-scrollbar snap-x snap-mandatory scroll-smooth pb-10"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="flex-none w-[80vw] md:w-[400px] aspect-[9/13] relative rounded-[3.5rem] overflow-hidden snap-center group border border-white/5 bg-neutral-900 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] transition-all duration-1000 hover:border-amber-500/40 hover:shadow-amber-500/5 hover:-translate-y-2"
          >
            {/* 圖片層 */}
            <div className="absolute inset-0 overflow-hidden bg-neutral-950">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-[15s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1514119412350-e174d90d280e?auto=format&fit=crop&q=80&w=800"; // 備用優美背景
                  console.error(`圖片路徑無效: ${image.url}`);
                }}
              />
              {/* 高級漸層遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            </div>

            {/* 文字內容區 */}
            <div className="absolute inset-x-0 bottom-0 p-8 transform transition-all duration-700">
              <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-7 rounded-[2.5rem] transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 shadow-2xl overflow-hidden relative">
                {/* 內部微光 */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl -mr-16 -mt-16 pointer-events-none" />
                
                <div className="mb-4">
                  <span className="inline-block text-[8px] tracking-[0.5em] text-amber-500 uppercase font-black bg-amber-500/5 px-4 py-1.5 rounded-full border border-amber-500/10 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform scale-75 group-hover:scale-100 origin-left">
                    Masterpiece
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-widest leading-tight group-hover:text-gold-enhanced transition-colors duration-500">
                  {image.title}
                </h3>
                <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase font-light italic">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部裝飾性進度條 */}
      <div className="flex justify-center items-center gap-10">
        <div className="h-[0.5px] w-32 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="flex gap-2">
           {images.slice(0, 6).map((_, i) => (
             <div key={i} className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-amber-500/50 transition-colors" />
           ))}
        </div>
        <div className="h-[0.5px] w-32 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>
    </section>
  );
};
