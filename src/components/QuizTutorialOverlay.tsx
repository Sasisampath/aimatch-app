import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, FastForward, HelpCircle } from "lucide-react";
import TactileButton from "./TactileButton";

interface QuizTutorialOverlayProps {
  onComplete: () => void;
}

const TUTORIAL_KEY = "aimatch_tutorial_seen";

export const isTutorialSeen = () => localStorage.getItem(TUTORIAL_KEY) === "true";

export const markTutorialSeen = () => localStorage.setItem(TUTORIAL_KEY, "true");

type Step = "intro" | 1 | 2 | 3;

const QuizTutorialOverlay = ({ onComplete }: QuizTutorialOverlayProps) => {
  const [step, setStep] = useState<Step>("intro");

  const handleSkip = () => {
    markTutorialSeen();
    onComplete();
  };

  const handleStart = () => setStep(1);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      markTutorialSeen();
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      {/* Dimmed background */}
      <div className="absolute inset-0 bg-background/70" />

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-card relative z-10 w-[85%] max-w-sm p-8 text-center"
            style={{ borderRadius: 20 }}
          >
            <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground mb-4">
              Let's get you ready!
            </h2>
            <div className="space-y-2 mb-8">
              <p className="text-sm text-muted-foreground font-body">
                Swipe right if the statement is <span className="text-primary font-medium">TRUE</span>
              </p>
              <p className="text-sm text-muted-foreground font-body">
                Swipe left if it is <span className="text-destructive font-medium">FALSE</span>
              </p>
              <p className="text-sm text-muted-foreground font-body">
                Tap skip if you're unsure
              </p>
            </div>
            <TactileButton onClick={handleStart}>Start Tutorial</TactileButton>
            <button
              onClick={handleSkip}
              className="mt-3 text-sm text-muted-foreground/70 font-body hover:text-muted-foreground transition-opacity"
            >
              Skip tutorial
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-[85%] max-w-sm flex flex-col items-center gap-6"
          >
            {/* Simulated card nudge right */}
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card w-full p-6 text-center"
              style={{ borderRadius: 20 }}
            >
              <p className="text-muted-foreground text-sm font-body">Example question card</p>
            </motion.div>

            {/* Highlighted TRUE button */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ boxShadow: ["0 0 0px hsl(var(--primary))", "0 0 20px hsl(var(--primary))", "0 0 0px hsl(var(--primary))"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-[88px] h-[88px] rounded-[22px] flex items-center justify-center"
                style={{
                  background: "hsl(var(--card))",
                  border: "2px solid hsl(var(--primary))",
                }}
              >
                <Check size={26} strokeWidth={2.5} className="text-primary" />
              </motion.div>
            </div>

            <div className="glass-card p-4 text-center" style={{ borderRadius: 14 }}>
              <p className="text-sm text-foreground font-body font-medium">
                Swipe right if this is <span className="text-primary">TRUE</span>
              </p>
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-card border border-border text-foreground font-body font-medium text-sm hover:bg-muted transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-[85%] max-w-sm flex flex-col items-center gap-6"
          >
            {/* Simulated card nudge left */}
            <motion.div
              animate={{ x: [0, -20, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card w-full p-6 text-center"
              style={{ borderRadius: 20 }}
            >
              <p className="text-muted-foreground text-sm font-body">Example question card</p>
            </motion.div>

            {/* Highlighted FALSE button */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ boxShadow: ["0 0 0px hsl(var(--destructive))", "0 0 20px hsl(var(--destructive))", "0 0 0px hsl(var(--destructive))"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-[88px] h-[88px] rounded-[22px] flex items-center justify-center"
                style={{
                  background: "hsl(var(--card))",
                  border: "2px solid hsl(var(--destructive))",
                }}
              >
                <X size={26} strokeWidth={2.5} className="text-destructive" />
              </motion.div>
            </div>

            <div className="glass-card p-4 text-center" style={{ borderRadius: 14 }}>
              <p className="text-sm text-foreground font-body font-medium">
                Swipe left if this is <span className="text-destructive">FALSE</span>
              </p>
            </div>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-card border border-border text-foreground font-body font-medium text-sm hover:bg-muted transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-[85%] max-w-sm flex flex-col items-center gap-6"
          >
            <div className="glass-card w-full p-6 text-center" style={{ borderRadius: 20 }}>
              <p className="text-muted-foreground text-sm font-body">Example question card</p>
            </div>

            {/* Highlighted SKIP button */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ boxShadow: ["0 0 0px hsl(var(--accent))", "0 0 20px hsl(var(--accent))", "0 0 0px hsl(var(--accent))"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-[88px] h-[88px] rounded-[22px] flex items-center justify-center"
                style={{
                  background: "hsl(var(--card))",
                  border: "2px solid hsl(var(--accent))",
                }}
              >
                <FastForward size={26} strokeWidth={2.5} className="text-accent" />
              </motion.div>
            </div>

            <div className="glass-card p-4 text-center" style={{ borderRadius: 14 }}>
              <p className="text-sm text-foreground font-body font-medium">
                Tap skip if you're unsure
              </p>
            </div>

            <TactileButton onClick={handleNext}>Start Quiz</TactileButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizTutorialOverlay;
