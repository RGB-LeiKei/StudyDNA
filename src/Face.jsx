import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CompanionFace({
  mood = "happy",
  animate = true,
}) {
  const [blink, setBlink] = useState(false);
  const [activeMood, setActiveMood] = useState(mood);

  const mouth = {
    happy: "M50 75 Q70 115 90 75",
    neutral: "M45 85 L95 85",
    thinking: "M45 89 Q70 95 95 80",
    listening: "M45 80 Q70 90 95 80",
  };

  useEffect(() => {
    setActiveMood(mood);
  }, [mood]);

  useEffect(() => {
    if (!animate) return;

    let blinkTimeout;
    const interval = setInterval(() => {
      setBlink(true);
      blinkTimeout = window.setTimeout(() => setBlink(false), 120);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(blinkTimeout);
    };
  }, [animate]);

  return (
    <motion.svg
        viewBox="0 0 140 140"
        className="
        drop-shadow-lg
        w-24
        h-24
        md:w-32
        md:h-32
        lg:w-40
        lg:h-40
        "
        animate={{
            y: [0, -10, 0]
        }}
        transition={{
            duration: 3,
            repeat: Infinity
        }}
    >
      <circle
        cx="70"
        cy="70"
        r="68"
        fill="white"
        stroke="#14D9C4"
        strokeWidth="2"
      />

      {blink ? (
        <>
          <path
            d="M42 55 H58"
            stroke="#0F172A"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M82 55 H98"
            stroke="#0F172A"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <circle cx="50" cy="55" r="6" fill="#0F172A" />
          <circle cx="90" cy="55" r="6" fill="#0F172A" />
        </>
      )}

      <path
        d={mouth[activeMood] ?? mouth.happy}
        stroke="#0F172A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}