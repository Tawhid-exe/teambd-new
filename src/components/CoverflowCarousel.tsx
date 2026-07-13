import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Grid3X3, ChevronDown } from "lucide-react";

export type CarouselItem = {
  id: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  year?: number;
};

// Generate a larger library of items from a base set
function generateLibrary(base: CarouselItem[]): CarouselItem[] {
  const years = [2024, 2025, 2026];
  const library: CarouselItem[] = [];
  years.forEach((year) => {
    // ~18 items per year
    for (let i = 0; i < 18; i++) {
      const src = base[i % base.length];
      library.push({
        ...src,
        id: `${year}-${i}`,
        year,
        // Vary unsplash images slightly so they look different
        src: src.type === "image"
          ? src.src.replace(/w=\d+/, `w=${800 + i * 10}`)
          : src.src,
      });
    }
  });
  return library;
}

export function CoverflowCarousel({ items }: { items: CarouselItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomedItem, setZoomedItem] = useState<CarouselItem | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [expandedYear, setExpandedYear] = useState<number | null>(2026);
  const dragStartX = useRef(0);
  const library = generateLibrary(items);
  const years = [2026, 2025, 2024];

  useEffect(() => {
    if (isHovered || zoomedItem || showLibrary) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, zoomedItem, showLibrary, items.length, currentIndex]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const getSlot = (index: number): number | null => {
    const diff = (index - currentIndex + items.length) % items.length;
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    if (diff === items.length - 1) return -1;
    return null;
  };

  return (
    <>
      <div
        className="relative w-full flex flex-col items-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={(e) => { dragStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const delta = dragStartX.current - e.changedTouches[0].clientX;
          if (delta > 50) handleNext();
          else if (delta < -50) handlePrev();
        }}
      >
        {/* Cards */}
        <div
          className="relative flex items-center justify-center w-full"
          style={{ height: "clamp(200px, 48vw, 560px)" }}
        >
          {items.map((item, i) => {
            const slot = getSlot(i);
            if (slot === null) return null;
            const isCenter = slot === 0;
            const xPercent = slot === 0 ? "0%" : slot === 1 ? "70%" : "-70%";
            const scale = isCenter ? 1 : 0.85;
            const opacity = isCenter ? 1 : 0.65;
            const zIndex = isCenter ? 10 : 5;

            return (
              <motion.div
                key={item.id}
                animate={{ x: xPercent, scale, opacity, zIndex }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute cursor-pointer rounded-2xl overflow-hidden shadow-xl bg-black"
                style={{
                  width: isCenter ? "clamp(280px, 56%, 720px)" : "clamp(180px, 38%, 520px)",
                  aspectRatio: "16/9",
                }}
                onClick={() => {
                  if (isCenter) setZoomedItem(item);
                  else if (slot > 0) handleNext();
                  else handlePrev();
                }}
              >
                {item.type === "image" ? (
                  <img src={item.src} alt={item.alt || ""} className="w-full h-full object-cover pointer-events-none select-none" draggable={false} />
                ) : (
                  <video src={item.src} className="w-full h-full object-cover pointer-events-none select-none" muted loop playsInline autoPlay={isCenter} />
                )}
                {!isCenter && <div className="absolute inset-0 bg-black/35 pointer-events-none" />}
              </motion.div>
            );
          })}

          {/* Desktop side arrows — hidden on mobile */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-2 z-20 h-11 w-11 rounded-full bg-black/30 backdrop-blur border border-white/20 text-white items-center justify-center hover:bg-leaf hover:border-leaf transition-all shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-2 z-20 h-11 w-11 rounded-full bg-black/30 backdrop-blur border border-white/20 text-white items-center justify-center hover:bg-leaf hover:border-leaf transition-all shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Bottom controls row: arrows + dots (mobile) / dots only (desktop) */}
        <div className="flex items-center justify-center gap-3 mt-5 w-full">
          {/* Mobile prev arrow */}
          <button
            onClick={handlePrev}
            className="md:hidden h-9 w-9 rounded-full bg-leaf/10 border border-leaf/30 text-leaf flex items-center justify-center hover:bg-leaf hover:text-white transition-all shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-leaf" : "w-2 bg-black/20"}`}
              />
            ))}
          </div>

          {/* Mobile next arrow */}
          <button
            onClick={handleNext}
            className="md:hidden h-9 w-9 rounded-full bg-leaf/10 border border-leaf/30 text-leaf flex items-center justify-center hover:bg-leaf hover:text-white transition-all shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* View All button */}
        <motion.button
          onClick={() => setShowLibrary(true)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-leaf text-leaf px-7 py-2.5 font-bold text-sm uppercase tracking-wider hover:bg-leaf hover:text-white transition-all"
        >
          <Grid3X3 className="h-4 w-4" />
          View All
        </motion.button>
      </div>

      {/* ── Full Library Modal ── */}
      <AnimatePresence>
        {showLibrary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-ink/97 backdrop-blur-sm overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-ink/95 backdrop-blur border-b border-white/10 px-5 py-4 flex items-center justify-between">
              <h2 className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
                <Grid3X3 className="h-5 w-5 text-amber-glow" />
                Full Gallery
              </h2>
              <button
                onClick={() => setShowLibrary(false)}
                className="h-9 w-9 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-amber-glow hover:text-ink flex items-center justify-center transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Year sections */}
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
              {years.map((year) => {
                const yearItems = library.filter((it) => it.year === year);
                const isOpen = expandedYear === year;
                return (
                  <div key={year} className="rounded-2xl border border-white/10 overflow-hidden">
                    {/* Year header / accordion toggle */}
                    <button
                      onClick={() => setExpandedYear(isOpen ? null : year)}
                      className="w-full flex items-center justify-between px-6 py-4 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-white font-bold text-lg">{year}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-white/50 text-sm">{yearItems.length} items</span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="h-5 w-5 text-white/60" />
                        </motion.span>
                      </div>
                    </button>

                    {/* Grid */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4">
                            {yearItems.map((item, idx) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.02, duration: 0.3 }}
                                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group bg-white/5"
                                onClick={() => { setZoomedItem(item); setShowLibrary(false); }}
                              >
                                {item.type === "image" ? (
                                  <img src={item.src} alt={item.alt || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                  <video src={item.src} className="w-full h-full object-cover" muted loop playsInline />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                    <Grid3X3 className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {zoomedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setZoomedItem(null)}
          >
            <button
              onClick={() => setZoomedItem(null)}
              className="absolute top-5 right-5 z-10 h-10 w-10 rounded-full bg-white/10 backdrop-blur text-white/80 hover:text-white hover:bg-amber-glow flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl bg-black"
              style={{ aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              {zoomedItem.type === "image" ? (
                <img src={zoomedItem.src} alt={zoomedItem.alt || ""} className="w-full h-full object-contain" />
              ) : (
                <video src={zoomedItem.src} className="w-full h-full object-contain" controls autoPlay playsInline />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
