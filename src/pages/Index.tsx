import React, { useState, useEffect, useRef } from 'react';
import { Compass, Mic, Hexagon, Sprout, Volume2, VolumeX } from 'lucide-react';

const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

const PulsiaLanding = () => {
  const [activeCol, setActiveCol] = useState<number | null>(2);
  const [sound, setSound] = useState(false);
  const [stars, setStars] = useState<{ top: string; left: string; opacity: number; size: string }[]>([]);

  // Refs pour le curseur (pour la performance, on évite les re-renders React)
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  
  // État pour la position de la souris (cible) et la position actuelle (pour le lerp/lissage)
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorIds = useRef({ currentX: 0, currentY: 0 });

  // 1. Génération des étoiles
  useEffect(() => {
    const starCount = 60;
    const newStars = Array.from({ length: starCount }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.1,
      size: `${Math.random() * 2 + 1}px`,
    }));
    setStars(newStars);
  }, []);

  // 2. Gestion du mouvement de la souris et animation fluide (Loop)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Boucle d'animation pour l'inertie (Lerp)
    const animate = () => {
      // Facteur d'inertie (0.1 = lent/smooth, 0.2 = plus rapide)
      const ease = 0.08; 
      
      const dist X = mousePos.current.x - cursorIds.current.currentX;
      const distY = mousePos.current.y - cursorIds.current.currentY;

      cursorIds.current.currentX += dist X * ease;
      cursorIds.current.currentY += distY * ease;

      // Mise à jour du DOM directement pour éviter les lags React
      if (cursorRef.current && cursorGlowRef.current) {
        // Le petit point précis (suit presque instantanément)
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        
        // Le grand halo lumineux (suit avec du retard/smoothness)
        cursorGlowRef.current.style.transform = `translate3d(${cursorIds.current.currentX}px, ${cursorIds.current.currentY}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const columns = [
    { id: 1, title: "I SEEK TRANSFORMATION", subtitle: "THE VOYAGER", icon: <Compass strokeWidth={1} size={32} />, description: "Discover the power of extreme disconnect to reconnect." },
    { id: 2, title: "I LEAD A COMMUNITY", subtitle: "THE CREATOR", icon: <Mic strokeWidth={1} size={32} />, description: "Co-create a signature expedition for your audience." },
    { id: 3, title: "I WANT TO INVEST", subtitle: "THE PARTNER", icon: <Hexagon strokeWidth={1} size={32} />, description: "Become part of the Pulsia ecosystem and assets." },
    { id: 4, title: "I BUILD THE FUTURE", subtitle: "THE VISIONARY", icon: <Sprout strokeWidth={1} size={32} />, description: "Join our R&D on neuro-somatic architecture." }
  ];

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col font-sans cursor-none selection:bg-amber-900/30">
      
      {/* --- CURSOR SYSTEM --- */}
      {/* 1. Le curseur système caché (via cursor-none sur le parent) */}
      
      {/* 2. Le Glow Spot (Lumière d'ambiance type Spline) */}
      <div 
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-orange-500/15 via-orange-900/5 to-transparent rounded-full blur-3xl pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen will-change-transform"
      />

      {/* 3. Le Curseur physique (Petit cercle) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 border border-white/80 rounded-full pointer-events-none z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-difference will-change-transform backdrop-invert"
      />

      {/* --- NOISE TEXTURE --- 
          Ajoute du grain pour que la lumière "accroche" quelque chose (effet réaliste) */}
      <div className="absolute inset-0 opacity-[0.03] z-[1] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- BACKGROUND STARS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              opacity: star.opacity,
              width: star.size,
              height: star.size,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* --- HEADER --- */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-8 mix-blend-difference">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
          <div className="text-sm font-bold tracking-[0.2em] uppercase text-white">pulsia</div>
        </div>
        <div className="flex items-center gap-8 text-[10px] md:text-xs font-medium tracking-[0.2em] text-gray-400">
          <div className="cursor-pointer hover:text-white transition-colors duration-300">FR | <span className="text-white">EN</span></div>
          <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors duration-300" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 size={14} className="text-amber-500" /> : <VolumeX size={14} />}
            <span>{sound ? "SOUND ON" : "SOUND ON"}</span>
          </div>
        </div>
      </header>

      {/* --- MAIN COLUMNS --- */}
      <div className="relative z-10 flex-1 flex w-full h-full pt-0">
        {columns.map((col) => {
          const isActive = activeCol === col.id;
          return (
            <div
              key={col.id}
              onMouseEnter={() => setActiveCol(col.id)}
              className={cn(
                "relative h-full border-r border-white/[0.05] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-none overflow-hidden flex flex-col justify-end pb-24 px-8 md:px-12 group",
                isActive ? "flex-[2.5]" : "flex-1 hover:bg-white/[0.01]"
              )}
            >
              {/* --- L'ORBE ACTIF (FIXE) --- */}
              <div className={cn(
                "absolute top-[15%] left-1/2 -translate-x-1/2 transition-all duration-1000 z-20",
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}>
                 <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,165,0,0.8)] relative z-10"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-600/30 rounded-full blur-[50px]"></div>
              </div>

              {/* Gradient de fond actif */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-1000 pointer-events-none",
                isActive ? "opacity-100 bg-gradient-to-b from-transparent via-amber-950/[0.1] to-amber-900/[0.2]" : "opacity-0"
              )} />

              {/* Contenu */}
              <div className="relative z-20 flex flex-col items-start gap-4 transform transition-transform duration-500 will-change-transform">
                <div className={cn("transition-all duration-500 mb-2", isActive ? "text-amber-400 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "text-gray-700 group-hover:text-gray-500")}>
                  {col.icon}
                </div>

                <h2 className={cn("text-sm md:text-base font-bold tracking-[0.2em] uppercase transition-colors duration-500", isActive ? "text-amber-50" : "text-gray-800 group-hover:text-gray-600")}>
                  {col.title}
                </h2>

                <div className={cn("overflow-hidden transition-all duration-700 ease-out", isActive ? "max-h-32 opacity-100 translate-y-0 delay-100" : "max-h-0 opacity-0 translate-y-4")}>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-[280px] font-light tracking-wide">
                    {col.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="absolute bottom-6 w-full text-center z-50 pointer-events-none mix-blend-screen">
        <p className="text-[9px] text-gray-600 tracking-[0.3em] uppercase opacity-70">Pulsia Ecosystem © 2026</p>
      </footer>
    </div>
  );
};

export default PulsiaLanding;
