import { useState } from "react";
import { motion } from "framer-motion";

function FloatingHearts() {
  const hearts = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // Random horizontal position
    delay: Math.random() * 5, // Random delay
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-red-500 text-2xl"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: 1 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: heart.delay,
          }}
          style={{
            left: `${50 + heart.x}%`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingHearts;
