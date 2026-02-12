import React, { useState } from 'react';
import { Compass, Mic, Hexagon, Sprout, Volume2, VolumeX } from 'lucide-react';
import { cn } from "@/lib/utils"; // Assure-toi que ce chemin existe, sinon retire 'cn' et utilise des string templates

const Index = () => {
  const [activeCol, setActiveCol] = useState<number | null>(2); // Le 2ème est actif par défaut comme sur l'image
  const [sound, setSound] = useState(false);

  const columns = [
    {
      id: 1,
      title: "I SEEK TRANSFORMATION",
      subtitle: "THE VOYAGER",
      icon: <Compass strokeWidth={1} size={40} />,
      description: "Discover the power of extreme disconnect to reconnect."
    },
    {
      id: 2,
      title: "I LEAD A COMMUNITY",
      subtitle: "THE CREATOR",
      icon: <Mic strokeWidth={1} size={40} />,
      description: "Co-create a signature expedition for your audience."
    },
    {
      id: 3,
      title: "I WANT TO INVEST",
      subtitle: "THE PARTNER",
      icon: <Hexagon strokeWidth={1} size={40} />,
      description: "Become part of the Pulsia ecosystem and assets."
    },
    {
      id: 4,
      title: "I BUILD THE FUTURE",
      subtitle: "THE VISIONARY",
      icon: <Sprout strokeWidth={1} size={40} />,
      description: "Join our R&D on neuro-somatic architecture."
    }
  ];

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col font-sans">
      
      {/* --- HEADER --- */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-6 mix-blend-difference">
        <img src="/https://i.postimg.cc/QCxFp8Xt/Gemini-Generated-Image-thmiidthmiidthmi-removebg-preview.png" alt="Pulsia" className="w-24 opacity-80" />
        <div className="flex items-center gap-8 text-xs font-medium tracking-widest text-gray-400">
          <div className="cursor-pointer hover:text-white transition-colors">FR | <span className="text-white">EN</span></div>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
            onClick={() => setSound(!sound)}
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {sound ? "SOUND ON" : "SOUND OFF"}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT (LES 4 COLONNES) --- */}
      <div className="flex-1 flex w-full h-full">
        {columns.map((col) => (
          <div
            key={col.id}
            onMouseEnter={() => setActiveCol(col.id)}
            className={cn(
              "relative h-full border-r border-white/5 transition-all duration-700 ease-in-out cursor-pointer group flex flex-col justify-end pb-24 px-8",
              activeCol === col.id ? "flex-[2] bg-white/5" : "flex-1 bg-transparent hover:bg-white/[0.02]"
            )}
          >
            {/* Background subtil ou Image de fond si tu en as */}
            <div className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-700",
              activeCol === col.id ? "opacity-20 bg-gradient-to-t from-orange-900/40 to-transparent" : ""
            )} />

            {/* Contenu */}
            <div className="relative z-10 space-y-6">
              {/* Icone */}
              <div className={cn(
                "transition-all duration-500 text-gray-400 group-hover:text-white",
                activeCol === col.id ? "text-orange-500 scale-110" : ""
              )}>
                {col.icon}
              </div>

              {/* Titre */}
              <h2 className={cn(
                "text-lg font-bold tracking-[0.2em] uppercase transition-all duration-500",
                activeCol === col.id ? "text-white translate-x-0" : "text-gray-600"
              )}>
                {col.title}
              </h2>

              {/* Description (Visible seulement si actif) */}
              <div className={cn(
                "overflow-hidden transition-all duration-700 ease-in-out max-h-0 opacity-0",
                activeCol === col.id ? "max-h-40 opacity-100" : ""
              )}>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                  {col.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- FOOTER --- */}
      <footer className="absolute bottom-0 w-full py-4 text-center z-50 pointer-events-none">
        <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">
          Pulsia Ecosystem © 2026
        </p>
      </footer>

      {/* --- PARTICLES (Les étoiles) --- */}
      {/* Petite astuce CSS pour les étoiles statiques */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40" 
           style={{
             backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }}>
      </div>
    </div>
  );
};

export default Index;
