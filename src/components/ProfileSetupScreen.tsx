import { useState } from "react";
import { motion } from "framer-motion";
import TactileButton from "./TactileButton";

const AVATARS = ["🤖", "🧠", "🚀", "⚡", "🧑‍💻", "📡", "🔍", "🧪", "🌐", "🛰️"];

interface ProfileSetupScreenProps {
  onContinue: (username: string, avatar: string) => void;
}

const ProfileSetupScreen = ({ onContinue }: ProfileSetupScreenProps) => {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleContinue = () => {
    const name = username.trim() || "Player";
    const avatar = selectedAvatar || "🤖";
    localStorage.setItem("aimatch_username", name);
    localStorage.setItem("aimatch_avatar", avatar);
    onContinue(name, avatar);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full flex flex-col items-center"
      >
        {/* Title */}
        <h2
          className="font-display font-bold text-foreground uppercase text-center"
          style={{ fontSize: 34, letterSpacing: "-0.02em" }}
        >
          Choose your name
        </h2>

        {/* Username input */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          maxLength={20}
          className="w-full mt-8 h-14 rounded-[14px] bg-card px-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary font-body"
          style={{ border: "none" }}
        />

        {/* Avatar section */}
        <p
          className="font-body font-medium text-muted-foreground mt-8 mb-4"
          style={{ fontSize: 14 }}
        >
          Pick your avatar
        </p>

        <div className="grid grid-cols-5 gap-3">
          {AVATARS.map((emoji) => (
            <motion.button
              key={emoji}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedAvatar(emoji)}
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors"
              style={{
                background: selectedAvatar === emoji ? "hsl(var(--card))" : "transparent",
                border:
                  selectedAvatar === emoji
                    ? "2px solid hsl(var(--primary))"
                    : "1px solid hsl(var(--border))",
              }}
            >
              {emoji}
            </motion.button>
          ))}
        </div>

        {/* Continue CTA */}
        <div className="w-4/5 mt-8">
          <TactileButton onClick={handleContinue} fullWidth>
            Continue
          </TactileButton>
        </div>

        {/* Skip */}
        <button
          className="font-body text-muted-foreground mt-4"
          style={{ fontSize: 14 }}
          onClick={() => onContinue("Player", "🤖")}
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  );
};

export default ProfileSetupScreen;
