import { Candidate } from "@/data/mockCandidates";
import { motion } from "framer-motion";

interface CandidateQueueProps {
  candidates: Candidate[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusClass = (status: string) => {
  switch (status) {
    case "New": return "status-new";
    case "Qualifying": return "status-qualifying";
    case "Approved": return "status-approved";
    default: return "";
  }
};

const CandidateQueue = ({ candidates, selectedId, onSelect }: CandidateQueueProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/5">
        <h2 className="heading-display text-xs text-muted-foreground">Incoming Signals</h2>
        <p className="text-xs text-muted-foreground/60 mt-1">{candidates.length} candidates</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {candidates.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            onClick={() => onSelect(c.id)}
            className={`glass-surface-hover cursor-pointer p-3.5 ${
              selectedId === c.id ? "border-primary/50 cyan-glow" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground truncate">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.last_message_time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{c.role}</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusClass(c.status)}`}>
                {c.status}
              </span>
              <span className="text-[10px] text-muted-foreground">Score: {c.diagnostic_score}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CandidateQueue;
