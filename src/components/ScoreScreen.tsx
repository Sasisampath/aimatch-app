import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TactileButton from "./TactileButton";

interface ScoreScreenProps {
  totalScore: number;
  correctCount: number;
  onContinue: () => void;
}

const ScoreScreen = ({ totalScore, correctCount, onContinue }: ScoreScreenProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = Math.min(Math.round(40 + totalScore * 0.5), 99);

  useEffect(() => {
    let start = 0;
    const target = correctCount;
    const duration = 1200;
    const stepTime = duration / target || duration;
    const timer = setInterval(() => {
      start++;
      setAnimatedScore(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [correctCount]);

  const radius = 100;
  const circumference = Math.PI * radius;
  const fillPercent = (totalScore / 100) * circumference;

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <motion.h2
        className="font-display font-black text-foreground uppercase mb-8"
        style={{ fontSize: 32, letterSpacing: "-0.02em", lineHeight: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI AWARENESS
        <br />
        SCORE
      </motion.h2>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative mb-8"
      >
        <svg width="240" height="140" viewBox="0 0 240 140">
          <path
            d="M 20 130 A 100 100 0 0 1 220 130"
            className="gauge-track"
            strokeWidth="12"
          />
          <motion.path
            d="M 20 130 A 100 100 0 0 1 220 130"
            className="gauge-fill"
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - fillPercent }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <span className="text-5xl font-bold font-display text-primary">{animatedScore}</span>
          <span className="text-2xl text-muted-foreground font-display ml-1">/ 10</span>
        </div>
      </motion.div>

      <motion.p
        className="text-muted-foreground font-body text-sm mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        You're ahead of <span className="text-primary font-semibold">{percentage}%</span> of professionals this week
      </motion.p>

      <motion.p
        className="text-foreground font-body text-sm mb-10 max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        You're actively keeping up with the latest AI updates
      </motion.p>

      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <TactileButton onClick={onContinue} fullWidth>
          SEE THIS WEEK'S AI BADGE
        </TactileButton>
      </motion.div>
    </div>
  );
};

export default ScoreScreen;
