import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCircleCheck,
  faGift,
  faLock,
  faShieldHalved,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/Style/ferris.css";
import Downarrow from "../assets/images/downarrow.png";
import Celebrate from "../pages/Confetti.js";

const prizes = [
  { name: "Powerbank", tone: "from-amber-400 to-orange-500" },
  { name: "Headphone", tone: "from-fuchsia-500 to-pink-500" },
  { name: "Glass", tone: "from-sky-400 to-cyan-500" },
  { name: "Cases", tone: "from-emerald-400 to-teal-500" },
  { name: "Neckband", tone: "from-violet-500 to-purple-600" },
  { name: "Watch", tone: "from-rose-500 to-red-500" },
  { name: "Charger", tone: "from-lime-400 to-green-500" },
  { name: "Smartwatch", tone: "from-indigo-500 to-blue-600" },
];

const SPIN_DURATION = 5200;
const REDIRECT_DELAY = 4200;

const FerrisWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningPrize, setWinningPrize] = useState(null);
  const navigate = useNavigate();
  const timeoutsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

  const queueTimeout = (callback, delay) => {
    const timerId = setTimeout(callback, delay);
    timeoutsRef.current.push(timerId);
  };

  const spinWheel = () => {
    if (isSpinning) {
      return;
    }

    setIsSpinning(true);
    setWinningPrize(null);

    const segmentAngle = 360 / prizes.length;
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const targetSegment = 360 - prizeIndex * segmentAngle;
    const centeredTarget = targetSegment - segmentAngle / 2;
    const finalRotation = rotation + 360 * 7 + centeredTarget;

    setRotation(finalRotation);

    queueTimeout(() => {
      const prize = prizes[prizeIndex];
      setWinningPrize(prize);
      setIsSpinning(false);
      Celebrate();

      queueTimeout(() => {
        navigate("/users/payment");
      }, REDIRECT_DELAY);
    }, SPIN_DURATION);
  };

  return (
    <div className="ferris-page">
      <div className="ferris-page__orb ferris-page__orb--left" />
      <div className="ferris-page__orb ferris-page__orb--right" />
      <div className="ferris-page__grid">
        <section className="ferris-hero">
          <span className="ferris-badge">
            <FontAwesomeIcon icon={faStar} />
            Reward checkpoint
          </span>

          <h1 className="ferris-title">Spin the reward wheel before payment.</h1>
          <p className="ferris-subtitle">
            A stronger prize experience with a more visual stage, smoother motion,
            and a cleaner reveal before checkout continues.
          </p>

          <div className="ferris-feature-list">
            <div className="ferris-feature-card">
              <FontAwesomeIcon icon={faGift} />
              <div>
                <strong>8 rotating rewards</strong>
                <p>Every segment is clearly visible before and after the spin.</p>
              </div>
            </div>
            <div className="ferris-feature-card">
              <FontAwesomeIcon icon={faBolt} />
              <div>
                <strong>Smoother wheel motion</strong>
                <p>The wheel now lands with a cleaner eased finish.</p>
              </div>
            </div>
            <div className="ferris-feature-card">
              <FontAwesomeIcon icon={faShieldHalved} />
              <div>
                <strong>Checkout continuity</strong>
                <p>The prize reveal stays visible before redirecting to payment.</p>
              </div>
            </div>
          </div>

          <div className="ferris-trust-row">
            <span>
              <FontAwesomeIcon icon={faLock} />
              Secure flow
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
              Premium UI
            </span>
          </div>
        </section>

        <section className="ferris-stage">
          <div className="ferris-stage__top">
            <div>
              <p className="ferris-kicker">Lucky draw</p>
              <h2 className="ferris-stage__title">Pick your surprise reward</h2>
            </div>
            <div className="ferris-stage__status">
              {isSpinning ? "Wheel in motion" : winningPrize ? "Prize unlocked" : "Ready to spin"}
            </div>
          </div>

          <div className="ferris-wheel-shell">
            <div className="ferris-pointer-wrap">
              <img src={Downarrow} alt="Pointer" className="ferris-pointer" />
            </div>

            <div
              className={`circle ${isSpinning ? "circle--spinning" : ""}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: `transform ${SPIN_DURATION}ms cubic-bezier(0.12, 0.8, 0.18, 1)`,
              }}
            >
              <div className="circle__innerRing" />
              <div className="circle__center">
                <FontAwesomeIcon icon={faGift} />
              </div>

              {prizes.map((prize, index) => (
                <div
                  key={prize.name}
                  className={`item item--${index + 1}`}
                  style={getPositionStyle(index, prizes.length)}
                >
                  <div className={`item__pill bg-gradient-to-br ${prize.tone}`}>
                    <span>{prize.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={spinWheel}
            disabled={isSpinning}
            className="buttonFerris"
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel"}
          </button>

          <p className="ferris-note">
            The winning reward is revealed first, then checkout continues automatically.
          </p>

          <div className={`winning-message ${winningPrize ? "winning-message--visible" : ""}`}>
            {winningPrize ? (
              <div className="winning-message__card">
                <span className="winning-message__eyebrow">
                  <FontAwesomeIcon icon={faCircleCheck} />
                  Reward unlocked
                </span>
                <h3>You won {winningPrize.name}</h3>
                <p>Your reward has been added to this checkout flow. Redirecting to payment.</p>
              </div>
            ) : (
              <div className="winning-message__placeholder">
                Your reward will appear here after the spin stops.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const getPositionStyle = (index, totalItems) => {
  const screenWidth = window.innerWidth;
  const isMobile = screenWidth <= 768;
  const radius = isMobile ? 118 : 176;
  const center = isMobile ? 140 : 210;
  const angle = (index / totalItems) * 2 * Math.PI - Math.PI / 2;
  const x = center + radius * Math.cos(angle);
  const y = center + radius * Math.sin(angle);

  return {
    left: `${x}px`,
    top: `${y}px`,
  };
};

export default FerrisWheel;
