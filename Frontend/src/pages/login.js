import React, { useEffect, useState } from "react";
import "../assets/Style/login.css";
import Instagram from "../assets/Socialicons/instagram.png";
import Whatsapp from "../assets/Socialicons/whatsapp.png";
import Facebook from "../assets/Socialicons/facebook.png";
import headphone from "../assets/LoginLogos/headphone.png";
import apple from "../assets/LoginLogos/apple.png";
import samsung from "../assets/LoginLogos/samsung.png";
import applelogo from "../assets/LoginLogos/applelogo.png";
import kitchenware from "../assets/LoginLogos/kitchenware2.png";
import livingroom from "../assets/LoginLogos/livingroom.png";



import playstation from "../assets/LoginLogos/playstation.png";

import airpods from "../assets/LoginLogos/airpods.png";
import hanger from "../assets/LoginLogos/hanger.png";
import { loginUser, refreshToken } from "../store/dataSlice.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessTK, setUserId, setUsername, fetchUserID } from "../store/dataSlice.js";
import "../assets/Style/Headings.css";
import GELOGO2 from "../assets/images/HeaderLogos/arena3.png";

function Login() {
  const imgArray = [headphone,hanger, airpods,kitchenware, samsung, applelogo, playstation,livingroom];
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [phNO, setPHNO] = useState("");
  const [typeSet, setTypeSet] = useState(false);
  const [password, setPassword] = useState("");
  const [signal, setSignal] = useState(false);

  const { token } = useSelector((state) => state.userAuth);
  const { users } = useSelector((state) => state.auth);
  const { UserID } = useSelector((state) => state.fetchID);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imgArray.length - 1 ? 0 : prevIndex + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [imgArray.length]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserID(token));
      setSignal(true);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (signal === true) {
      const searchParams = new URLSearchParams(location.search);
      setSignal(false);
      const redirectPath = searchParams.get("redirect") || "/";
      navigate(redirectPath);
    }
  }, [UserID, location.search, navigate, signal]);

  useEffect(() => {
    if (users && users.user && users.accessToken) {
      dispatch(setUserId(users.user.id));
      dispatch(setAccessTK(users.accessToken));
      dispatch(setUsername(users.user.name));
      dispatch(refreshToken());
    }
  }, [users, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const EMAILORPHONENO = email || phNO;

    const bodyData = {
      EMAILORPHONENO,
      password,
    };

    dispatch(loginUser(bodyData));
  };

  const handleSetPHOREMAIL = (event) => {
    const value = event.target.value;

    if (value === "") {
      setEmail("");
      setPHNO("");
      setTypeSet(false);
      return;
    }

    if (/^\d+$/.test(value)) {
      setTypeSet(true);
      setPHNO(value);
      setEmail("");
      return;
    }

    setTypeSet(false);
    setEmail(value);
    setPHNO("");
  };

  return (
    <div className="user-login">
      <div className="user-login__ambient user-login__ambient--left" />
      <div className="user-login__ambient user-login__ambient--right" />

      <div className="user-login__shell">
        <section className="user-login__hero">
          <div className="user-login__badge">Customer Access</div>
          <img className="user-login__logo" src={GELOGO2} alt="X Arena" />
          <h1>
            Return to your
            <span> immersive shopping account</span>
          </h1>
          <p>
            Enter the same premium storefront experience with faster checkout,
            saved preferences, and product discovery built around your journey.
          </p>

          <div className="user-login__highlights">
            <article>
              <strong>3D Ready</strong>
              <span>Jump back into the VR-inspired storefront with your saved flow.</span>
            </article>
            <article>
              <strong>Fast Checkout</strong>
              <span>Access your account, bag, and orders without friction.</span>
            </article>
            <article>
              <strong>Personalized Feed</strong>
              <span>Continue exploring devices, accessories, and deals in one place.</span>
            </article>
          </div>

          <div className="user-login__socials">
            <img src={Whatsapp} alt="whatsapp" />
            <img src={Instagram} alt="instagram" />
            <img src={Facebook} alt="facebook" />
          </div>
        </section>

        <section className="user-login__panel">
          <div className="user-login__panel-header">
            <p className="user-login__eyebrow">Welcome Back</p>
            <h2>User Login</h2>
            <p>Sign in to continue shopping, manage your bag, and view your orders.</p>
          </div>

          <div className="user-login__carousel">
            <div
              className="user-login__carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {imgArray.map((img, index) => (
                <img key={index} src={img} alt="brand icon" className="user-login__carousel-item" />
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="user-login__form">
            <div className="user-login__grid">
              <label className="user-login__field user-login__field--wide">
                <span>Email or Phone</span>
                <input
                  type={typeSet ? "number" : "text"}
                  placeholder="Enter email or phone number"
                  value={email || phNO}
                  onChange={handleSetPHOREMAIL}
                  required
                />
              </label>

              <label className="user-login__field user-login__field--wide">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>

            <button type="submit" className="user-login__submit">
              Sign In To Shop
            </button>
          </form>

          <p className="user-login__footnote">
            New to X Arena?{" "}
            <button type="button" onClick={() => navigate("/users/signup")}>
              Create your account
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Login;
