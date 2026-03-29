import { motion } from "framer-motion";
import { X, FastForward, Check } from "lucide-react";

interface QuizActionButtonsProps {
  onFalse: () => void;
  onSkip: () => void;
  onTrue: () => void;
  disabled: boolean;
}

const QuizActionButtons = ({ onFalse, onSkip, onTrue, disabled }: QuizActionButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-7 px-8 pb-8 pt-4">
      {/* FALSE */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        disabled={disabled}
        onClick={onFalse}
        className="flex flex-col items-center gap-2 disabled:opacity-50"
      >
        <div
          className="w-[88px] h-[88px] rounded-[22px] flex items-center justify-center"
          style={{
            background: "hsl(var(--card))",
            border: "2px solid hsl(var(--destructive))",
          }}
        >
          <X size={26} strokeWidth={2.5} className="text-destructive" />
        </div>
        <span
          className="font-body font-medium text-muted-foreground uppercase"
          style={{ fontSize: 13, letterSpacing: "0.04em" }}
        >
          FALSE
        </span>
      </motion.button>

      {/* SKIP */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        disabled={disabled}
        onClick={onSkip}
        className="flex flex-col items-center gap-2 disabled:opacity-50"
      >
        <div
          className="w-[88px] h-[88px] rounded-[22px] flex items-center justify-center"
          style={{
            background: "hsl(var(--card))",
            border: "2px solid hsl(var(--accent))",
          }}
        >
          <FastForward size={26} strokeWidth={2.5} className="text-accent" />
        </div>
        <span
          className="font-body font-medium text-muted-foreground uppercase"
          style={{ fontSize: 13, letterSpacing: "0.04em" }}
        >
          SKIP
        </span>
      </motion.button>

      {/* TRUE */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        disabled={disabled}
        onClick={onTrue}
        className="flex flex-col items-center gap-2 disabled:opacity-50"
      >
        <div
          className="w-[88px] h-[88px] rounded-[22px] flex items-center justify-center"
          style={{
            background: "hsl(var(--card))",
            border: "2px solid hsl(var(--primary))",
          }}
        >
          <Check size={26} strokeWidth={2.5} className="text-primary" />
        </div>
        <span
          className="font-body font-medium text-muted-foreground uppercase"
          style={{ fontSize: 13, letterSpacing: "0.04em" }}
        >
          TRUE
        </span>
      </motion.button>
    </div>
  );
};

export default QuizActionButtons;
