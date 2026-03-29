import { motion } from "framer-motion";
import { Check, X, Zap } from "lucide-react";

interface QuizFeedbackCardProps {
  type: "correct" | "wrong" | "skip";
  explanation: string;
}

const config = {
  correct: {
    icon: Check,
    label: "Correct",
    emoji: "✓",
    borderColor: "hsl(var(--primary))",
    glowColor: "hsla(90, 100%, 70%, 0.25)",
    labelColor: "hsl(var(--primary))",
  },
  wrong: {
    icon: X,
    label: "Not quite right",
    emoji: "✕",
    borderColor: "hsl(var(--destructive))",
    glowColor: "hsla(0, 84%, 60%, 0.25)",
    labelColor: "hsl(var(--destructive))",
  },
  skip: {
    icon: Zap,
    label: "Skipped",
    emoji: "⏭️",
    borderColor: "hsl(var(--accent))",
    glowColor: "hsla(217, 91%, 60%, 0.25)",
    labelColor: "hsl(var(--accent))",
  },
};

const QuizFeedbackCard = ({ type, explanation }: QuizFeedbackCardProps) => {
  const c = config[type];

  return (
    <motion.div
      key="feedback"
      className="w-full max-w-sm p-7"
      style={{
        borderRadius: 20,
        background: "hsl(var(--card))",
        border: `2px solid ${c.borderColor}`,
        boxShadow: `0 0 18px ${c.glowColor}`,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Status label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-display font-bold uppercase text-lg" style={{ color: c.labelColor }}>
          {c.emoji} {c.label}
        </span>
      </div>

      {/* AI Insight badge */}
      <div className="flex items-center gap-1.5 mb-3">
        <Zap size={14} className="text-warning" />
        <span className="font-body font-semibold text-warning text-xs uppercase tracking-wider">
          AI Insight
        </span>
      </div>

      {/* Explanation */}
      <p className="text-foreground font-body leading-relaxed" style={{ fontSize: 15 }}>
        {explanation}
      </p>
    </motion.div>
  );
};

export default QuizFeedbackCard;
