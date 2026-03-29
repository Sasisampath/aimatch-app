import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { aiBites } from "@/data/quizData";
import TactileButton from "./TactileButton";

const AIBitesScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSwipedOnce, setHasSwipedOnce] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const weekNumber = (() => {
    const sessions = JSON.parse(localStorage.getItem("aimatch_sessions") || "[]");
    return Math.max(1, sessions.length);
  })();

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -60) {
      if (!hasSwipedOnce) setHasSwipedOnce(true);
      if (currentIndex < aiBites.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setShowCompletion(true);
      }
    } else if (info.offset.y > 60 && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  if (showCompletion) {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-5xl mb-4">🚀</span>
          <h2
            className="font-display font-black text-foreground uppercase"
            style={{ fontSize: 28, letterSpacing: "-0.02em", lineHeight: 0.9 }}
          >
            YOU'RE AHEAD
            <br />
            OF THE CURVE
          </h2>

          <p className="font-body text-foreground mt-5 leading-relaxed max-w-xs" style={{ fontSize: 15, opacity: 0.85 }}>
            You now know what most professionals still haven't explored yet.
          </p>
          <p className="font-body text-foreground mt-3 leading-relaxed max-w-xs" style={{ fontSize: 15, opacity: 0.85 }}>
            Use this edge in your meetings, projects, and conversations this week.
          </p>

          <p className="font-body text-muted-foreground mt-5" style={{ fontSize: 13 }}>
            {weekNumber >= 2 ? `Week ${weekNumber} streak 🔥` : "Week 1 complete"}
          </p>

          <div className="w-full max-w-xs mt-7 flex flex-col items-center">
            <p className="font-display font-bold text-foreground uppercase" style={{ fontSize: 15 }}>
              Get next week's AI update first
            </p>
            <p className="font-body text-muted-foreground mt-1.5 text-center" style={{ fontSize: 12 }}>
              Enter your email or phone number and we'll notify you when the next AI bites drop.
            </p>
            <input
              type="text"
              placeholder="Enter email or phone number"
              className="w-full mt-3 h-11 rounded-xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-body"
            />
            <button
              className="font-body mt-2 text-muted-foreground"
              style={{ fontSize: 13 }}
              onClick={() => window.location.reload()}
            >
              Skip for now
            </button>
          </div>

          <div className="w-full max-w-xs mt-5">
            <TactileButton onClick={() => window.location.reload()} fullWidth>
              Continue →
            </TactileButton>
          </div>

          <p className="font-body text-muted-foreground mt-6" style={{ fontSize: 13 }}>
            Come back next week for new AI updates.
          </p>
        </motion.div>
      </div>
    );
  }

  const bite = aiBites[currentIndex];

  return (
    <div className="relative z-10 flex flex-col min-h-screen px-4 pt-6 pb-8">
      {/* Header */}
      <div className="text-left pl-4 mb-5">
        <h2 className="font-display font-black text-foreground uppercase" style={{ fontSize: 28, letterSpacing: "-0.02em", lineHeight: 0.9 }}>
          THIS WEEK'S
          <br />
          AI BITES
        </h2>
        <p className="text-[13px] text-muted-foreground font-body mt-2">
          {currentIndex === 0 && !hasSwipedOnce
            ? "Swipe up to explore this week's AI updates →"
            : "Swipe up → Next Bite"}
        </p>
      </div>

      {/* Story Card */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={bite.id}
            className="relative overflow-hidden cursor-grab active:cursor-grabbing flex flex-col justify-between"
            style={{
              width: "92%",
              height: 420,
              borderRadius: 20,
              background: "#FFFFFF",
              borderTop: "1px solid #E4E4E7",
            }}
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
          >
            {/* Category Badge */}
            <div className="px-6 pt-6">
              <span
                className="inline-block font-body font-semibold uppercase"
                style={{ fontSize: 11, letterSpacing: 1, color: "#71717A" }}
              >
                {bite.badge}
              </span>
            </div>

            {/* Center Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">
              <span className="text-4xl mb-4">{bite.emoji}</span>
              <h3
                className="font-display font-black uppercase leading-tight mb-1"
                style={{ fontSize: 22, lineHeight: "28px", letterSpacing: "-0.02em", color: "#000000" }}
              >
                {bite.title}
              </h3>
            </div>

            {/* Bottom Section */}
            <div className="px-7 pb-7">
              <p className="font-body font-semibold mb-2 uppercase" style={{ fontSize: 11, letterSpacing: "0.04em", color: "#71717A" }}>
                Why it matters:
              </p>
              <p className="font-body leading-relaxed" style={{ fontSize: 14, color: "#52525B" }}>
                {bite.explanation}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating arrow hint */}
      {currentIndex === 0 && !hasSwipedOnce && (
        <motion.div
          className="flex justify-center mt-3"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronUp className="text-primary" size={28} style={{ opacity: 0.6 }} />
        </motion.div>
      )}

      {/* Story Progress Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {aiBites.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentIndex ? 24 : 8,
              height: 8,
              background: i === currentIndex ? "hsl(var(--primary))" : "hsl(var(--muted))",
            }}
          />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground font-body mt-5">
        Stay updated with AI in 60 seconds a week
      </p>
    </div>
  );
};

export default AIBitesScreen;
