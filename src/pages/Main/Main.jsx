import React, { useEffect, useState } from 'react';
import './Main.css';
import PageOne from '../PageOne/PageOne'; // Импортируйте ваш компонент PageOne
import { motion } from "framer-motion";
import HeartsEffect from '../../components/HeartsEffect/HeartsEffect';
import PageTwo from '../PageTwo/PageTwo';

const text = "Вітаю тебе з днем закоханих, сонечко!!!";

function Main() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPageOne, setShowPageOne] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledText, setIsDisabledText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 8000); // 8.0 секунд

    const timerText = setTimeout(() => {
      setIsDisabledText(false);
    }, 10000); // 8.0 секунд

    return () => clearTimeout(timer, timerText); // Очистка таймера при размонтировании
  }, []);

  const handleClick = () => {
    if (!isDisabled) {
      setIsAnimating(true); // Запуск анимации
      setTimeout(() => {
        setShowPageOne(true); // Переключение страницы после анимации
      }, 1000);
    }
  };

  return (
    <div className='main'>
      {showPageOne ? (
        <PageOne />
      ) : (
        <>
          <h2 className="text-2xl font-bold">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5, // Длительность анимации 2 секунды
                  delay: 2 + index * 0.1, // Задержка перед стартом 2 секунды
                  ease: "easeInOut", // Плавный эффект
                }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <HeartsEffect />
          <div
            className={`btn ${isDisabled ? "disabled" : ""} ${isAnimating ? "animating" : ""}`}
            onClick={handleClick}
            style={{ pointerEvents: isDisabled ? "none" : "auto", opacity: isDisabled ? 1 : 1 }}
          >
            <p
              className={`${isDisabledText ? "disabled" : ""}`}
            >Натисни</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;