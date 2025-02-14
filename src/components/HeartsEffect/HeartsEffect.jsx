import { useEffect } from "react";
import confetti from "canvas-confetti";

const HeartsEffect = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
        const createHeart = (x, y) => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { x, y },
            shapes: ["heart"],
            colors: ["#ff0000", "#ff69b4", "#ff1493"],
          });
        };
        createHeart(0, 0.5); // Левая сторона на 20% высоты
        createHeart(1, 0.5); // Правая сторона на 20% высоты
        createHeart(0, 1); // Левая сторона на 80% высоты
        createHeart(1, 1); // Правая сторона на 80% высоты
      }, 6600);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default HeartsEffect;
