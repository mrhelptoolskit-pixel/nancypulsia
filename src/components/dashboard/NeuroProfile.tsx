import { Candidate } from "@/data/mockCandidates";
import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface NeuroProfileProps {
  candidate: Candidate;
}

const SuitabilityCircle = ({ score }: { score: number }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "hsl(187, 94%, 43%)" : score >= 60 ? "hsl(24, 95%, 53%)" : "hsl(0, 84%, 60%)";

  return (
    <div className="relative w-32 h-32 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} stroke="hsl(217, 33%, 18%)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="60" cy="60" r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground font-display">{score}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Score</span>
      </div>
    </div>
  );
};

const NeuroProfile = ({ candidate }: NeuroProfileProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/5">
        <h2 className="heading-display text-xs text-muted-foreground">Neuro-Profile</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Header */}
        <motion.div
          key={candidate.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-5"
        >
          <SuitabilityCircle score={candidate.diagnostic_score} />
          <div>
            <h3 className="text-xl font-bold text-foreground font-display uppercase tracking-wide">
              {candidate.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{candidate.role}</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">{candidate.phone}</p>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          key={`radar-${candidate.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-surface p-4"
        >
          <h4 className="heading-display text-[10px] text-muted-foreground mb-2">Diagnostic Matrix</h4>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={candidate.radar_data}>
              <PolarGrid stroke="hsl(217, 33%, 18%)" />
              <PolarAngleAxis
                dataKey="trait"
                tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Profile"
                dataKey="value"
                stroke="hsl(187, 94%, 43%)"
                fill="hsl(187, 94%, 43%)"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          key={`insights-${candidate.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <h4 className="heading-display text-[10px] text-muted-foreground mb-3">AI Insights</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.ai_insights.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NeuroProfile;
