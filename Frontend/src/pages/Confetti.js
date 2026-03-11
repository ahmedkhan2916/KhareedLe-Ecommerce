import confetti from "canvas-confetti";

const fireBurst = (originX, originY, colors) => {
  confetti({
    particleCount: 90,
    startVelocity: 42,
    spread: 120,
    ticks: 180,
    origin: { x: originX, y: originY },
    gravity: 0.82,
    scalar: 1.05,
    colors,
  });

  confetti({
    particleCount: 36,
    startVelocity: 26,
    spread: 70,
    ticks: 220,
    origin: { x: originX, y: originY },
    gravity: 0.95,
    scalar: 1.3,
    shapes: ["circle"],
    colors,
  });
};

const Celebrate = () => {
  const duration = 1600;
  const animationEnd = Date.now() + duration;

  fireBurst(0.2, 0.35, ["#34d399", "#10b981", "#fbbf24", "#f97316"]);
  fireBurst(0.8, 0.35, ["#60a5fa", "#818cf8", "#e879f9", "#f43f5e"]);

  const frame = () => {
    confetti({
      particleCount: 14,
      angle: 60,
      spread: 58,
      startVelocity: 28,
      origin: { x: 0, y: 0.7 },
      colors: ["#34d399", "#22c55e", "#facc15"],
    });

    confetti({
      particleCount: 14,
      angle: 120,
      spread: 58,
      startVelocity: 28,
      origin: { x: 1, y: 0.7 },
      colors: ["#38bdf8", "#818cf8", "#f472b6"],
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

export default Celebrate;
