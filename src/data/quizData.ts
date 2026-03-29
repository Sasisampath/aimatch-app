export type QuestionType = "tool" | "news" | "concept";

export interface QuizQuestion {
  id: number;
  question: string;
  correct_answer: boolean;
  explanation: string;
  type: QuestionType;
  tool?: string;
  categoryLabel: string;
  iconName?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "ChatGPT can now remember your conversations across sessions",
    correct_answer: true,
    explanation: "Correct. ChatGPT memory now persists across sessions.",
    type: "tool",
    tool: "chatgpt",
    categoryLabel: "AI TOOL",
  },
  {
    id: 2,
    question: "Gemini can control apps on your phone",
    correct_answer: true,
    explanation: "Correct. Gemini agents can interact with apps on Android devices.",
    type: "tool",
    tool: "gemini",
    categoryLabel: "AI TOOL",
  },
  {
    id: 3,
    question: "Copilot only works inside Microsoft Word",
    correct_answer: false,
    explanation: "False. Copilot works across Excel, PowerPoint, Teams, and more.",
    type: "tool",
    tool: "copilot",
    categoryLabel: "AI TOOL",
  },
  {
    id: 4,
    question: "Claude supports editable artifacts documents",
    correct_answer: true,
    explanation: "Correct. Claude's artifacts feature allows interactive editable documents.",
    type: "tool",
    tool: "claude",
    categoryLabel: "AI TOOL",
  },
  {
    id: 5,
    question: "Runway can generate cinematic AI videos",
    correct_answer: true,
    explanation: "Correct. Runway Gen-3 produces high-quality cinematic video generation.",
    type: "tool",
    tool: "runway",
    categoryLabel: "AI TOOL",
  },
  {
    id: 6,
    question: "Midjourney can generate spreadsheets",
    correct_answer: false,
    explanation: "False. Midjourney is an image generation tool, not a spreadsheet tool.",
    type: "tool",
    tool: "midjourney",
    categoryLabel: "AI TOOL",
  },
  {
    id: 7,
    question: "Perplexity provides cited answers from web sources",
    correct_answer: true,
    explanation: "Correct. Perplexity provides answers with inline citations from the web.",
    type: "tool",
    tool: "perplexity",
    categoryLabel: "AI TOOL",
  },
  {
    id: 8,
    question: "ChatGPT cannot analyze PDFs",
    correct_answer: false,
    explanation: "False. ChatGPT can upload and analyze PDF documents.",
    type: "tool",
    tool: "chatgpt",
    categoryLabel: "AI TOOL",
  },
  {
    id: 9,
    question: "AI agents can now automate workflows",
    correct_answer: true,
    explanation: "Correct. AI agents can chain tasks and automate complex workflows.",
    type: "concept",
    iconName: "Zap",
    categoryLabel: "AI CAPABILITY",
  },
  {
    id: 10,
    question: "AI cannot write presentation slides automatically",
    correct_answer: false,
    explanation: "False. Tools like Gamma and Copilot can auto-generate slides.",
    type: "concept",
    iconName: "Presentation",
    categoryLabel: "AI CAPABILITY",
  },
];

export interface AIBite {
  id: number;
  title: string;
  explanation: string;
  emoji: string;
  badge: string;
  gradient: string;
}

export const aiBites: AIBite[] = [
  {
    id: 1,
    title: "ChatGPT memory released",
    explanation: "Your workflows can persist across sessions — ChatGPT now remembers previous conversations and preferences.",
    emoji: "⚡",
    badge: "THIS WEEK'S UPDATE",
    gradient: "",
  },
  {
    id: 2,
    title: "Gemini app control agents announced",
    explanation: "Google's Gemini can now interact with and control apps on your Android phone through agent capabilities.",
    emoji: "🤖",
    badge: "NEW FEATURE",
    gradient: "",
  },
  {
    id: 3,
    title: "Runway cinematic video generation improved",
    explanation: "Runway Gen-3 Alpha delivers dramatically better cinematic AI video with improved motion and consistency.",
    emoji: "🎬",
    badge: "VIDEO AI UPDATE",
    gradient: "",
  },
  {
    id: 4,
    title: "Claude artifacts editing upgraded",
    explanation: "Anthropic's Claude now supports richer interactive artifacts with inline editing and real-time preview.",
    emoji: "🧠",
    badge: "AI TOOL UPDATE",
    gradient: "",
  },
  {
    id: 5,
    title: "Copilot Excel automation expanded",
    explanation: "Microsoft Copilot in Excel can now generate complex formulas, charts, and pivot tables from natural language.",
    emoji: "🚀",
    badge: "PRODUCTIVITY BOOST",
    gradient: "",
  },
];

export interface BadgeLevel {
  name: string;
  minScore: number;
  maxScore: number;
}

export const badgeLevels: BadgeLevel[] = [
  { name: "Starter", minScore: 0, maxScore: 20 },
  { name: "Explorer", minScore: 21, maxScore: 40 },
  { name: "Aware", minScore: 41, maxScore: 60 },
  { name: "Practitioner", minScore: 61, maxScore: 80 },
  { name: "AI Insider", minScore: 81, maxScore: 90 },
  { name: "AI Native", minScore: 91, maxScore: 100 },
];

export function getBadge(score: number): BadgeLevel {
  return badgeLevels.find((b) => score >= b.minScore && score <= b.maxScore) || badgeLevels[0];
}

// Tool logo imports map
export const toolLogos: Record<string, string> = {};
