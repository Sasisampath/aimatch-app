import { motion } from "framer-motion";
import TactileButton from "./TactileButton";

interface OnboardingScreenProps {
  onStart: () => void;
}

const OnboardingScreen = ({ onStart }: OnboardingScreenProps) => {
  return (
    <div className="relative z-10 flex flex-col justify-center min-h-screen pl-8 pr-8 pt-12 pb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="font-display font-black text-primary uppercase"
          style={{
            fontSize: 52,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            textShadow: "0px 0px 20px rgba(178,255,102,0.35)",
          }}
        >
          AI
          <br />
          COMPASS
        </h1>
        <p className="text-muted-foreground text-sm mt-3 font-body">by JAZZHQ</p>
      </motion.div>

      <motion.p
        className="text-muted-foreground font-body mt-6 max-w-[280px] leading-relaxed"
        style={{ fontSize: 16 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Stay ahead in AI — in just 60 seconds a week
      </motion.p>

      <motion.div
        className="mt-12 max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <TactileButton onClick={onStart} fullWidth>
          START EXPLORING
        </TactileButton>
        <p className="text-muted-foreground text-xs mt-4 font-body">
          10 quick swipe questions • Takes under 60 seconds
        </p>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
