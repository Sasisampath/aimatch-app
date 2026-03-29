import { motion } from "framer-motion";

interface TactileButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  fullWidth?: boolean;
}

const TactileButton = ({ children, onClick, className = "", fullWidth = false }: TactileButtonProps) => {
  return (
    <motion.div
      className={`btn-tactile ${fullWidth ? "w-full" : ""} ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      <div className="btn-tactile-base" />
      <button className={`btn-tactile-top ${fullWidth ? "w-full" : ""}`} onClick={onClick}>
        {children}
        <div className="btn-tactile-shine" />
      </button>
    </motion.div>
  );
};

export default TactileButton;
