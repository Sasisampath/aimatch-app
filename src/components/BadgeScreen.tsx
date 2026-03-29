import { motion } from "framer-motion";
import { getBadge, badgeLevels } from "@/data/quizData";
import TactileButton from "./TactileButton";

interface BadgeScreenProps {
  totalScore: number;
  onContinue: () => void;
}

const badgeIcons: Record<string, string> = {
  Starter: "🌱",
  Explorer: "🔍",
  Aware: "💡",
  Practitioner: "⚡",
  "AI Insider": "🧠",
  "AI Native": "🚀",
};

const BadgeScreen = ({ totalScore, onContinue }: BadgeScreenProps) => {
  const badge = getBadge(totalScore);
  const badgeIndex = badgeLevels.findIndex((b) => b.name === badge.name);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <motion.h2
        className="font-display font-black text-foreground uppercase mb-2"
        style={{ fontSize: 28, letterSpacing: "-0.02em", lineHeight: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        BADGE UNLOCKED
      </motion.h2>

      <motion.div
        className="my-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="w-32 h-32 rounded-full bg-card flex items-center justify-center badge-glow border border-border">
          <span className="text-6xl">{badgeIcons[badge.name] || "🏆"}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="font-display font-black text-primary uppercase mb-2" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
          {badge.name}
        </p>
        <p className="text-muted-foreground text-sm font-body">unlocked</p>
      </motion.div>

      {/* Badge progression */}
      <motion.div
        className="flex gap-2 mt-8 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {badgeLevels.map((level, i) => (
          <div
            key={level.name}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
            style={{
              background: i <= badgeIndex ? "hsla(90, 100%, 70%, 0.15)" : "hsl(var(--muted))",
              border: i <= badgeIndex ? "1px solid hsl(var(--primary))" : "1px solid hsl(var(--border))",
            }}
          >
            {badgeIcons[level.name]?.[0] || "•"}
          </div>
        ))}
      </motion.div>

      <motion.p
        className="text-muted-foreground text-sm font-body mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Return next week to improve your score
      </motion.p>

      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <TactileButton onClick={onContinue} fullWidth>
          SEE THIS WEEK'S AI BITES
        </TactileButton>
      </motion.div>
    </div>
  );
};

export default BadgeScreen;
