import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../assets/Style/welcome.css";
import ArenaLogo from "../assets/images/HeaderLogos/arena3.png";

const Welcome = ({ onFinish }) => {
  const { token, status } = useSelector((state) => state.userAuth);

  useEffect(() => {
    let count = 0;

    const interval = setInterval(() => {
      if (!token || status === "succeeded" || status === "failed" || count >= 10) {
        clearInterval(interval);
        onFinish();
      }
      count += 1;
    }, 500);

    return () => clearInterval(interval);
  }, [token, status, onFinish]);

  return (
    <div className="welcome-screen">
      <div className="welcome-screen__card">
        <div className="welcome-loader" />
        <img src={ArenaLogo} alt="XARENA" className="welcome-screen__logo" />
      </div>
    </div>
  );
};

export default Welcome;
