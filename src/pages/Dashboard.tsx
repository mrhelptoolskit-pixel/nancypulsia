import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Brain, Compass, Settings, LogOut } from "lucide-react";
import pulsiaLogo from "@/assets/pulsia-logo.png";
import CandidateQueue from "@/components/dashboard/CandidateQueue";
import NeuroProfile from "@/components/dashboard/NeuroProfile";
import NeuralLink from "@/components/dashboard/NeuralLink";
import { useCandidates } from "@/hooks/useCandidates";
import { useAuth } from "@/hooks/useAuth";
import { mockCandidates } from "@/data/mockCandidates";

const navItems = [
  { icon: Radio, label: "Signals", active: true },
  { icon: Brain, label: "Diagnostics", active: false },
  { icon: Compass, label: "Expeditions", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const Dashboard = () => {
  const { candidates: liveCandidates, loading } = useCandidates();
  const { signOut } = useAuth();
  const candidates = liveCandidates.length > 0 ? liveCandidates : mockCandidates;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const activeId = selectedId || candidates[0]?.id;
  const selected = candidates.find((c) => c.id === activeId) || candidates[0];

  return (
    <div className="flex h-screen bg-background noise-bg overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-16 flex flex-col items-center py-5 border-r border-white/5 bg-card/40 backdrop-blur-xl relative z-10 flex-shrink-0"
      >
        <img src={pulsiaLogo} alt="PULSIA" className="w-10 h-10 object-contain breathing mb-8" />

        <nav className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              title={item.label}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ripple ${
                item.active
                  ? "bg-primary/15 text-primary cyan-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-xs font-semibold text-accent">
            OP
          </div>
          <button
            title="Logout"
            onClick={signOut}
            className="text-muted-foreground/50 hover:text-destructive transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </motion.aside>

      {/* Main Content — 3 columns */}
      <div className="flex-1 flex min-w-0 relative z-10">
        {/* Queue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-72 border-r border-white/5 bg-card/20 backdrop-blur-sm flex-shrink-0"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <CandidateQueue
              candidates={candidates}
              selectedId={activeId}
              onSelect={setSelectedId}
            />
          )}
        </motion.div>

        {/* Neuro Profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 border-r border-white/5 bg-card/10 backdrop-blur-sm min-w-0"
        >
          {selected && <NeuroProfile candidate={selected} />}
        </motion.div>

        {/* Neural Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-80 bg-card/20 backdrop-blur-sm flex-shrink-0"
        >
          {selected && <NeuralLink candidate={selected} />}
        </motion.div>
      </div>

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />
    </div>
  );
};

export default Dashboard;
