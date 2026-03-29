import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Flame, HelpCircle } from "lucide-react";
import { quizQuestions } from "@/data/quizData";
import QuizCardIcon from "./QuizCardIcon";
import QuizActionButtons from "./QuizActionButtons";
import QuizFeedbackCard from "./QuizFeedbackCard";
import QuizTutorialOverlay, { isTutorialSeen } from "./QuizTutorialOverlay";

interface QuizAnswer {
  questionId: number;
  answer: "true" | "false" | "skip";
  correct: boolean;
  score: number;
}

interface QuizScreenProps {
  onComplete: (answers: QuizAnswer[], totalScore: number, correctCount: number) => void;
}

const SWIPE_THRESHOLD = 80;

const QuizScreen = ({ onComplete }: QuizScreenProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [dragDirection, setDragDirection] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<{
    type: "correct" | "wrong" | "skip";
    explanation: string;
  } | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const isAnimating = useRef(false);
  const [showTutorial, setShowTutorial] = useState(!isTutorialSeen());

  const handleSwipe = useCallback(
    (direction: "right" | "left" | "down") => {
      if (isAnimating.current || currentIndex >= quizQuestions.length) return;
      isAnimating.current = true;

      const q = quizQuestions[currentIndex];
      let userAnswer: "true" | "false" | "skip";
      if (direction === "right") userAnswer = "true";
      else if (direction === "left") userAnswer = "false";
      else userAnswer = "skip";

      let score = 0;
      let correct = false;
      if (userAnswer === "skip") {
        score = 5;
      } else {
        const userBool = userAnswer === "true";
        correct = userBool === q.correct_answer;
        score = correct ? 10 : 0;
      }

      const answer: QuizAnswer = { questionId: q.id, answer: userAnswer, correct, score };
      const newAnswers = [...answers, answer];
      const newTotal = totalScore + score;
      setAnswers(newAnswers);
      setTotalScore(newTotal);
      setFeedbackState({
        type: userAnswer === "skip" ? "skip" : correct ? "correct" : "wrong",
        explanation: q.explanation,
      });
      setDragDirection(null);

      setTimeout(() => {
        setFeedbackState(null);
        const nextIndex = currentIndex + 1;
        if (nextIndex >= quizQuestions.length) {
          const correctCount = newAnswers.filter((a) => a.correct).length;
          onComplete(newAnswers, newTotal, correctCount);
        } else {
          setCurrentIndex(nextIndex);
        }
        isAnimating.current = false;
      }, 1400);
    },
    [currentIndex, answers, totalScore, onComplete]
  );

  const handleDragEnd = (_: any, info: PanInfo) => {
    setDragDirection(null);
    const { offset } = info;
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (offset.x > SWIPE_THRESHOLD) handleSwipe("right");
      else if (offset.x < -SWIPE_THRESHOLD) handleSwipe("left");
    } else {
      if (offset.y > SWIPE_THRESHOLD) handleSwipe("down");
    }
  };

  const handleDrag = (_: any, info: PanInfo) => {
    const { offset } = info;
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      setDragDirection(offset.x > 30 ? "right" : offset.x < -30 ? "left" : null);
    } else {
      setDragDirection(offset.y > 30 ? "down" : null);
    }
  };

  const question = quizQuestions[currentIndex];

  return (
    <div className="relative z-10 flex flex-col min-h-screen px-5 pt-4 pb-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-full bg-card border border-border" />
        <div className="status-pill flex items-center gap-2">
          <Flame size={16} className="text-warning" />
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Score</p>
            <p className="text-lg font-bold font-display text-primary">{totalScore}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-card border border-border" />
      </div>

      {/* Progress */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-body">
          AI Quiz • {currentIndex + 1} / {quizQuestions.length}
        </p>
        <div className="flex gap-1">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                background:
                  i <= currentIndex
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
              }}
            />
          ))}
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {!feedbackState && (
            <motion.div
              key={currentIndex}
              className="glass-card w-full max-w-sm p-7 cursor-grab active:cursor-grabbing relative overflow-hidden"
              style={{
                borderRadius: 20,
                minHeight: 340,
                borderColor:
                  dragDirection === "right"
                    ? "hsl(var(--primary))"
                    : dragDirection === "left"
                    ? "hsl(var(--destructive))"
                    : dragDirection === "down"
                    ? "hsl(var(--accent))"
                    : undefined,
                borderWidth: dragDirection ? 2 : undefined,
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={0.8}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              {/* Direction overlays */}
              <AnimatePresence>
                {dragDirection === "right" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 left-4 px-3 py-1 rounded-full border-2 font-bold text-sm border-primary text-primary"
                  >
                    TRUE ✓
                  </motion.div>
                )}
                {dragDirection === "left" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 right-4 px-3 py-1 rounded-full border-2 font-bold text-sm border-destructive text-destructive"
                  >
                    FALSE ✗
                  </motion.div>
                )}
                {dragDirection === "down" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border-2 font-bold text-sm border-accent text-accent"
                  >
                    SKIP ↓
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Category label */}
              <p className="text-[11px] tracking-[1px] text-muted-foreground uppercase text-center mb-5 font-body">
                {question.categoryLabel}
              </p>

              {/* Icon */}
              <div className="mb-5">
                <QuizCardIcon question={question} />
              </div>

              {/* Question */}
              <p className="text-xl font-semibold font-body text-foreground leading-7 text-center">
                {question.question}
              </p>

              {/* Swipe hint */}
              <p className="text-sm text-muted-foreground text-center mt-6 font-body">
                Swipe to answer
              </p>
            </motion.div>
          )}

          {feedbackState && (
            <QuizFeedbackCard
              type={feedbackState.type}
              explanation={feedbackState.explanation}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <QuizActionButtons
        onFalse={() => handleSwipe("left")}
        onSkip={() => handleSwipe("down")}
        onTrue={() => handleSwipe("right")}
        disabled={isAnimating.current || !!feedbackState}
      />

      <AnimatePresence>
        {showTutorial && (
          <QuizTutorialOverlay onComplete={() => setShowTutorial(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizScreen;
