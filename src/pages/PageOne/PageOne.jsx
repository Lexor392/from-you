import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './PageOne.css';
import PageTwo from "../PageTwo/PageTwo";

const text = "Знайди відмінне сердечко)";

function PageOne() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [shakeIndex, setShakeIndex] = useState(null);
  const [showPageTwo, setShowPageTwo] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeHearts, setActiveHearts] = useState(new Set());
  const [bigHeartActive, setBigHeartActive] = useState(false);

  const handleActivate = () => {
    const availableIndexes = Array.from({ length: 14 }, (_, i) => i);
    let delay = 500;

    const activateHeart = () => {
      if (availableIndexes.length === 0) {
        return;
      }
      const randomIndex = Math.floor(Math.random() * availableIndexes.length);
      const newActiveIndex = availableIndexes.splice(randomIndex, 1)[0];
      setActiveHearts((prev) => new Set([...prev, newActiveIndex]));

      if (availableIndexes.length > 0) {
        delay *= 0.9; // ускорение на 10% на каждом шаге
        setTimeout(activateHeart, delay);
      }
    };

    // Запускаем анимацию для 14 маленьких сердечек
    activateHeart();

    // После 3860 мс активируем bigHeart
    setTimeout(() => setBigHeartActive(true), 3860);
  };

  useEffect(() => {
    setActiveIndex(Math.floor(Math.random() * 40));

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (event) => {
    const button = event.currentTarget;
    if (button.classList.contains("active")) {
      setTimeout(() => {
        setShowPageTwo(true); // Переключение страницы после анимации
      }, 6000);
    }
  };

  return (
    <>
      {showPageTwo ? (
        <PageTwo />
      ) : (
        <div className='pageone'>
          <div className="hearts-container">
            {[...Array(14)].map((_, index) => (
              <img
                key={index}
                src="./images/heart-red.svg"
                alt="heart"
                className={activeHearts.has(index) ? "activeHeart" : ""}
              />
            ))}

            <img
              src="./images/heart-red.svg"
              alt="big heart"
              className={`bigHeart ${bigHeartActive ? "activeHeart" : ""}`}
            />
          </div>
          <div className={`red-bg ${bigHeartActive ? "activeBg" : ""}`}></div>
          {isVisible && <div className="bg-block"></div>}
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
          <div className="container">
            <div className="button-grid">
              {[...Array(40)].map((_, index) => (
                <button
                  key={index}
                  onClick={(event) => {
                    if (index === activeIndex) {
                      handleClick(event);

                      // Активировать сердце
                      handleActivate();

                      // автоматом показать кнопку при клике
                      const activeButtons = document.querySelectorAll('.active');
                      activeButtons.forEach(button => {
                        button.classList.add('red-active');
                      });

                      // Скрыть все кнопки с классом inactive
                      const inactiveButtons = document.querySelectorAll('.inactive');
                      inactiveButtons.forEach(button => {
                        button.classList.add('hidden');
                      });
                    } else {
                      setShakeIndex(index);
                      setTimeout(() => setShakeIndex(null), 500); // Сбросить эффект через 500 мс
                    }
                  }}
                  className={`button ${index === activeIndex ? "active" : "inactive"} ${index === shakeIndex ? "shake" : ""}`}
                // disabled={index !== activeIndex}
                >
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default PageOne;