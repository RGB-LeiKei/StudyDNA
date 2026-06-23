import { motion } from "framer-motion";

export default function VoiceWaves() {
  return (
    <div className="flex items-center gap-2 h-16">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 bg-teal-500 rounded-full"
          animate={{
            height: [10, 50, 20, 40, 10],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}