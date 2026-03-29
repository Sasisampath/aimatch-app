import { Zap, Presentation, Brain, FileText, Play, Bot } from "lucide-react";
import type { QuizQuestion } from "@/data/quizData";

import chatgptLogo from "@/assets/logos/chatgpt.png";
import geminiLogo from "@/assets/logos/gemini.png";
import copilotLogo from "@/assets/logos/copilot.png";
import claudeLogo from "@/assets/logos/claude.png";
import runwayLogo from "@/assets/logos/runway.png";
import midjourneyLogo from "@/assets/logos/midjourney.png";
import perplexityLogo from "@/assets/logos/perplexity.png";

const toolLogoMap: Record<string, string> = {
  chatgpt: chatgptLogo,
  gemini: geminiLogo,
  copilot: copilotLogo,
  claude: claudeLogo,
  runway: runwayLogo,
  midjourney: midjourneyLogo,
  perplexity: perplexityLogo,
};

const conceptIconMap: Record<string, React.ComponentType<any>> = {
  Zap,
  Presentation,
  Brain,
  FileText,
  Play,
  Bot,
};

interface QuizCardIconProps {
  question: QuizQuestion;
}

const QuizCardIcon = ({ question }: QuizCardIconProps) => {
  if (question.type === "tool" && question.tool) {
    const logo = toolLogoMap[question.tool];
    if (logo) {
      return (
        <div className="w-16 h-16 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-border flex items-center justify-center mx-auto glow-cyan">
          <img
            src={logo}
            alt={question.tool}
            width={40}
            height={40}
            className="object-contain"
            loading="lazy"
          />
        </div>
      );
    }
  }

  if (question.type === "concept" && question.iconName) {
    const IconComp = conceptIconMap[question.iconName];
    if (IconComp) {
      return (
        <div className="w-16 h-16 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-border flex items-center justify-center mx-auto glow-cyan">
          <IconComp size={32} className="text-primary" />
        </div>
      );
    }
  }

  return (
    <div className="w-16 h-16 rounded-2xl bg-secondary/60 backdrop-blur-sm border border-border flex items-center justify-center mx-auto glow-cyan">
      <Brain size={32} className="text-primary" />
    </div>
  );
};

export default QuizCardIcon;
