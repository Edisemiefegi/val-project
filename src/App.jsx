import { useState, useEffect, useRef } from "react";
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
  const [noPosition, setNoPosition] = useState({ x: 100, y: 0 });
  // const [name, setName] = useState("");

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const name = params.get("to") || "";

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  };

  useEffect(() => {
    playMusic();
    window.history.replaceState(null, "", `?to=${name}`);
    console.log(name, "namemm");
  }, []);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === "english" ? "pidgin" : "english");
    setNoPosition({ x: 100, y: 0 });
  };

  const handleNoClick = () => {
    setNoClicks(noClicks + 1);
    setYesSize(yesSize + 0.2);

    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;

    const newX = noPosition.x + directionX * (50 + Math.random() * 50);
    const newY = noPosition.y + directionY * (30 + Math.random() * 50);

    setNoPosition({
      x: Math.min(200, Math.max(-200, newX)),
      y: Math.min(150, Math.max(-150, newY)),
    });
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  return (
    <div className="flex flex-col items-center overflow-hidden justify-center h-screen bg-pink-100 text-center p-4">
      <audio onClick={playMusic} ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>
      {accepted && <FloatingHearts />}

      {!accepted ? (
        <>
          <img src="/val.gif" alt="Happy Gif" className="w-48 h-48 mb-4" />
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            {lang === "english"
              ? `Will you be my Val? ${name}`
              : `You go be my Val? ${name}`}
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
              className={`bg-red-500 text-white rounded-lg text-lg absolute transition-all duration-100 ${
                lang === "english" ? "px-6 py-2" : "px-2 py-2"
              }`}
              onClick={handleNoClick}
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: "spring", stiffness: 100 }}
              initial={{ x: 120 }}
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
          <img
            src="/pic2.webp"
            alt="Very Happy Gif"
            className="w-48 h-48 mb-4"
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

      <button
        onClick={toggleMusic}
        className="absolute top-4 left-4 bg-blue-500 rounded-full p-2 text-white"
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>
    </div>
  );
}

export default App;
