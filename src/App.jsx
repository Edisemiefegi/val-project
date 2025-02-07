import { useState } from "react";
import FloatingHearts from "./FloatingHearts";
import { motion } from "framer-motion";

function App() {
  const messages = {
    english: [
      "Please, you won’t regret it!",
      "I promise to make you smile! 😊",
      "Just say yes already! 🥺",
      "I’ll buy you food! 🍕🍔",
      "You are my happiness! ❤️",
    ],
    pidgin: [
      "Abeg, you no go regret am!",
      "I go make you smile well well! 😊",
      "Just say yes na! 🥺",
      "I go buy you food chop! 🍕🍔",
      "Na you be my joy! ❤️",
    ],
  };

  const [lang, setLang] = useState("english");
  const [noClicks, setNoClicks] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 100, y: 0 }); // Start away from "Yes"

  const toggleLang = () => {
    setLang(lang === "english" ? "pidgin" : "english");
  };

  const handleNoClick = () => {
    setNoClicks(noClicks + 1);
    setYesSize(yesSize + 0.2);

    // Generate random movement while keeping the button inside a safe range
    const randomX = (Math.random() - 0.5) * 300; // Moves left/right
    const randomY = (Math.random() - 0.5) * 200; // Moves up/down

    setNoPosition((prev) => ({
      x: Math.max(-150, Math.min(150, prev.x + randomX)),
      y: Math.max(-100, Math.min(100, prev.y + randomY)),
    }));
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <div className="flex flex-col items-center overflow-hidden justify-center h-screen bg-pink-100 text-center p-4">
      {accepted && <FloatingHearts />}

      {!accepted ? (
        <>
          <motion.img
            src="/val.gif"
            alt="Happy Gif"
            className="w-48 h-48 mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            {lang === "english" ? "Will you be my Val?" : "You go be my Val?"}
          </h1>
          <div className="relative flex justify-center gap-4">
            <motion.button
              className="bg-green-500 cursor-pointer text-white px-6 py-2 rounded-lg text-lg"
              style={{ transform: `scale(${yesSize})` }}
              onClick={handleYesClick}
            >
              {lang === "english" ? "Yes" : "Yes na"}
            </motion.button>
            <motion.button
              className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg absolute"
              onClick={handleNoClick}
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: "spring", stiffness: 100 }}
              initial={{ x: 120 }} // Ensure it starts away from "Yes"
            >
              {lang === "english" ? "No" : "Mbok no"}
            </motion.button>
          </div>
          {noClicks > 0 && (
            <p className="mt-4 text-lg font-semibold text-gray-700">
              {messages[lang][noClicks % messages[lang].length]}
            </p>
          )}
        </>
      ) : (
        <>
          <motion.img
            src="/pic.gif"
            alt="Very Happy Gif"
            className="w-48 h-48 mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            {lang === "english"
              ? "Yay! You made me the happiest person! ❤️"
              : "Ayyyeee! You don make me happiest person! ❤️"}
          </h1>
        </>
      )}
      <button
        onClick={toggleLang}
        className="absolute top-4 right-4 bg-red-500 rounded-full p-2 text-white"
      >
        {lang === "english" ? "Switch to Pidgin" : "Switch to English"}
      </button>
    </div>
  );
}

export default App;
