import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import "./PageTwo.css";

const text =
  "Вітаю!!! Ти знайшла моє сердечко, серед тих, які явно тобі не підходять. Ти знайшла його так само, як і колись я знайшов твоє)";
const textTwo =
  "Я тебе дуже кохаю, сонечко) дякую що ти у мене є)";

function PageTwo() {
  const [activeHearts, setActiveHearts] = useState(new Set());
  const removalTimers = useRef({});
  const activationTimer = useRef(null);

  // Тексты для кнопки и состояние текущего индекса
  const buttonTexts = ["Кохаю тебе)", "Клікай:3"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Меняем текст кнопки каждые 3 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % buttonTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activateRandomHeart = () => {
      const index = Math.floor(Math.random() * 14);

      setActiveHearts((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });

      if (removalTimers.current[index]) {
        clearTimeout(removalTimers.current[index]);
      }
      removalTimers.current[index] = setTimeout(() => {
        setActiveHearts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
        removalTimers.current[index] = null;
      }, 5000);

      const nextDelay = Math.random() * 1000 + 500;
      activationTimer.current = setTimeout(activateRandomHeart, nextDelay);
    };

    activateRandomHeart();

    return () => {
      if (activationTimer.current) clearTimeout(activationTimer.current);
      Object.values(removalTimers.current).forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  const handleConfettiClick = () => {
    const createHeart = (x, y) => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x, y },
        shapes: ["heart"],
        colors: ["#FFFFFF"], // Белые конфетти
      });
    };

    createHeart(0, 0.5);
    createHeart(1, 0.5);
    createHeart(0, 1);
    createHeart(1, 1);
  };

  return (
    <div className="pagetwo">
      <div className="hearts-container">
        {[...Array(14)].map((_, index) => (
          <img
            key={index}
            src="./images/heart-white.svg"
            alt="heart"
            className={activeHearts.has(index) ? "activeHeart" : ""}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </h2>

      <button className="click" onClick={handleConfettiClick}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentTextIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {buttonTexts[currentTextIndex]}
          </motion.span>
        </AnimatePresence>
      </button>

      <h2 className="text-2xl font-bold">
        {textTwo.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 13 + index * 0.1,
              ease: "easeInOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}

export default PageTwo;
