import { useState, useCallback } from "react";
import StarBackground from "@/components/StarBackground";
import OnboardingScreen from "@/components/OnboardingScreen";
import ProfileSetupScreen from "@/components/ProfileSetupScreen";
import QuizScreen from "@/components/QuizScreen";
import ScoreScreen from "@/components/ScoreScreen";
import BadgeScreen from "@/components/BadgeScreen";
import AIBitesScreen from "@/components/AIBitesScreen";

type Screen = "onboarding" | "profile" | "quiz" | "score" | "badge" | "bites";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [totalScore, setTotalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const handleQuizComplete = useCallback(
    (_answers: any[], score: number, correct: number) => {
      setTotalScore(score);
      setCorrectCount(correct);

      const sessionId = crypto.randomUUID();
      const session = {
        sessionId,
        score,
        correctCount: correct,
        timestamp: new Date().toISOString(),
      };
      const sessions = JSON.parse(localStorage.getItem("aimatch_sessions") || "[]");
      sessions.push(session);
      localStorage.setItem("aimatch_sessions", JSON.stringify(sessions));

      setScreen("score");
    },
    []
  );

  return (
    <div className="bg-background min-h-screen max-w-[430px] mx-auto relative overflow-hidden">
      <StarBackground />
      {screen === "onboarding" && <OnboardingScreen onStart={() => setScreen("profile")} />}
      {screen === "profile" && (
        <ProfileSetupScreen onContinue={() => setScreen("quiz")} />
      )}
      {screen === "quiz" && <QuizScreen onComplete={handleQuizComplete} />}
      {screen === "score" && (
        <ScoreScreen
          totalScore={totalScore}
          correctCount={correctCount}
          onContinue={() => setScreen("badge")}
        />
      )}
      {screen === "badge" && (
        <BadgeScreen totalScore={totalScore} onContinue={() => setScreen("bites")} />
      )}
      {screen === "bites" && <AIBitesScreen />}
    </div>
  );
};

export default Index;
