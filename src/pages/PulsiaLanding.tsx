import React, { useState, useEffect, useRef } from 'react';
import { Compass, Mic, Hexagon, Sprout, Volume2, VolumeX } from 'lucide-react';

// Utilitaire pour les classes conditionnelles
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

const PulsiaLanding = () => {
  const [activeCol, setActiveCol] = useState<number>(1); // La colonne 1 est active par défaut (comme sur le screen)
  const [sound, setSound] = useState(false);
  
  // Refs pour l'animation du curseur
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // États de position pour le lissage (Lerp)
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorIds = useRef({ currentX: 0, currentY: 0 });

  // Gestion du mouvement fluide (Inertie type Spline)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Facteur d'inertie plus bas = plus fluide/lourd (0.06 est très "smooth")
      const ease = 0.06; 
      
      const distX = mousePos.current.x - cursorIds.current.currentX;
      const distY = mousePos.current.y - cursorIds.current.currentY;

      cursorIds.current.currentX += distX * ease;
      cursorIds.current.currentY += distY * ease;

      if (cursorGlowRef.current) {
        // Déplacement du halo lumineux
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
    { 
      id: 1, 
      title: "I SEEK TRANSFORMATION", 
      icon: <Compass strokeWidth={1.5} size={28} />, 
      description: "Join an expedition to reset your nervous system." 
    },
    { 
      id: 2, 
      title: "I LEAD A COMMUNITY", 
      icon: <Mic strokeWidth={1.5} size={28} />, 
      description: "Co-create a signature expedition for your audience." 
    },
    { 
      id: 3, 
      title: "I WANT TO INVEST", 
      icon: <Hexagon strokeWidth={1.5} size={28} />, 
      description: "Become part of the Pulsia ecosystem and assets." 
    },
    { 
      id: 4, 
      title: "I BUILD THE FUTURE", 
      icon: <Sprout strokeWidth={1.5} size={28} />, 
      description: "Join our R&D on neuro-somatic architecture." 
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050808] text-white overflow-hidden flex flex-col font-sans selection:bg-teal-500/30">
      
      {/* --- CURSOR LIGHT EFFECT (SPLINE STYLE) --- */}
      {/* C'est ce div qui crée l'effet de lampe torche/lumière volumétrique */}
      <div 
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2 will-change-transform mix-blend-screen"
        style={{
          background: `radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(13, 148, 136, 0.05) 40%, rgba(0,0,0,0) 70%)`
        }}
      />
      
      {/* Un deuxième point plus petit pour le centre intense (le curseur physique) */}
      <div 
        ref={(el) => {
             if (el) {
                 const loop = () => {
                    el.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
                    requestAnimationFrame(loop);
                 }
                 loop();
             }
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-teal-200 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_2px_rgba(45,212,191,0.8)] mix-blend-normal"
      />

      {/* --- GRAIN TEXTURE (Optionnel pour le réalisme) --- */}
      <div className="absolute inset-0 opacity-[0.04] z-[1] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* --- PARTICLES / STARS (Subtle) --- */}
      <div className="absolute inset-0 z-0">
         {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute bg-teal-500/20 rounded-full blur-[1px]" 
                 style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 3}px`,
                    height: `${Math.random() * 3}px`,
                    opacity: Math.random() * 0.5
                 }}
            />
         ))}
      </div>

      {/* --- HEADER --- */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-start px-8 py-6 md:px-10 md:py-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-sm md:text-base font-bold tracking-[0.1em] text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"></span>
            pulsia
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-6 text-[10px] font-medium tracking-[0.2em] text-gray-500">
            <div className="cursor-pointer hover:text-white transition-colors duration-300 border-b border-transparent hover:border-teal-500/50 pb-0.5">anglais</div>
            <div className="cursor-pointer hover:text-white transition-colors duration-300 pb-0.5">français</div>
            </div>
            
            <button 
                onClick={() => setSound(!sound)}
                className="flex items-center gap-2 text-[10px] font-medium tracking-[0.2em] text-gray-500 hover:text-teal-400 transition-colors mt-2"
            >
                {sound ? <Volume2 size={12} /> : <VolumeX size={12} />}
                <span>{sound ? "SOUND ON" : "SOUND OFF"}</span>
            </button>
        </div>
      </header>

      {/* --- MAIN CONTENT (COLUMNS) --- */}
      <div className="relative z-10 flex-1 flex w-full h-full pt-20">
        {columns.map((col) => {
          const isActive = activeCol === col.id;
          
          return (
            <div
              key={col.id}
              onMouseEnter={() => setActiveCol(col.id)}
              className={cn(
                "relative h-full border-r border-white/[0.03] transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-none overflow-hidden flex flex-col justify-end pb-16 px-8 md:px-12 group",
                isActive ? "flex-[2] bg-gradient-to-t from-teal-950/[0.2] to-transparent" : "flex-1 hover:bg-white/[0.01]"
              )}
            >
              
              {/* Contenu de la colonne */}
              <div className="relative z-20 flex flex-col items-start gap-6 mb-12 transform transition-transform duration-500">
                
                {/* Icone */}
                <div className={cn(
                    "p-3 rounded-full border transition-all duration-500",
                    isActive 
                        ? "border-teal-500/30 text-teal-400 bg-teal-500/[0.05] shadow-[0_0_30px_-5px_rgba(45,212,191,0.3)]" 
                        : "border-white/10 text-gray-600 group-hover:text-gray-400 group-hover:border-white/20"
                )}>
                  {col.icon}
                </div>

                {/* Titre */}
                <h2 className={cn(
                    "text-xs md:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-500", 
                    isActive ? "text-white translate-x-1" : "text-gray-700 group-hover:text-gray-500"
                )}>
                  {col.title}
                </h2>

                {/* Description (Révélée uniquement si actif) */}
                <div className={cn(
                    "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.215,0.61,0.355,1)]", 
                    isActive ? "max-h-24 opacity-80 translate-y-0" : "max-h-0 opacity-0 translate-y-4"
                )}>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-[260px] font-light tracking-wide border-l border-teal-500/30 pl-3">
                    {col.description}
                  </p>
                </div>
              </div>

              {/* Effet de lueur en bas de colonne active */}
              {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-teal-500/[0.08] to-transparent pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PulsiaLanding;
