import React, { useEffect, useState } from "react";
import "../assets/Style/signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/config.js";
import GELOGO2 from "../assets/images/HeaderLogos/arena3.png";
import Whatsapp from "../assets/Socialicons/whatsapp.png";
import Instagram from "../assets/Socialicons/instagram.png";
import Facebook from "../assets/Socialicons/facebook.png";
import headphone from "../assets/LoginLogos/headphone.png";
import apple from "../assets/LoginLogos/apple.png";
import airpods from "../assets/LoginLogos/airpods.png";
import samsung from "../assets/LoginLogos/samsung.png";
import applelogo from "../assets/LoginLogos/applelogo.png";
import oneplus from "../assets/LoginLogos/one-plus.png";
import oppo from "../assets/LoginLogos/oppo.png";
import vivo from "../assets/LoginLogos/vivo.png";
import moto from "../assets/LoginLogos/motorola.png";
import playstation from "../assets/LoginLogos/playstation.png";
import xbox from "../assets/LoginLogos/xbox.png";
import "../assets/Style/Headings.css";

function Signup() {
  const imgArray = [headphone, apple, airpods, samsung, applelogo, oneplus, oppo, vivo, moto, playstation, xbox];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imgArray.length - 1 ? 0 : prevIndex + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [imgArray.length]);

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmpass) {
      alert("Password is not Matching..!!!");
      return;
    }

    const bodyData = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
    };

    try {
      await axios.post(`${BASE_URL}/users/signup`, bodyData);
      alert("success");
      navigate("/users/login");
    } catch (error) {
      console.error(error, "error in Signup");
    }
  };

  return (
    <div className="user-signup">
      <div className="user-signup__ambient user-signup__ambient--left" />
      <div className="user-signup__ambient user-signup__ambient--right" />

      <div className="user-signup__shell">
        <section className="user-signup__hero">
          <div className="user-signup__badge">Customer Onboarding</div>
          <img className="user-signup__logo" src={GELOGO2} alt="X Arena logo" />
          <h1>
            Create your
            <span> immersive shopping account</span>
          </h1>
          <p>
            Join X Arena to unlock faster checkout, saved preferences, and a smoother
            journey through the interactive storefront.
          </p>

          <div className="user-signup__highlights">
            <article>
              <strong>Quick Setup</strong>
              <span>Create your account in one clean flow and start exploring faster.</span>
            </article>
            <article>
              <strong>Secure Profile</strong>
              <span>Keep your details, orders, and shopping activity in one place.</span>
            </article>
            <article>
              <strong>Fast Checkout</strong>
              <span>Save time with a smoother entry into purchases and bag management.</span>
            </article>
          </div>

          <div className="user-signup__socials">
            <img src={Whatsapp} alt="whatsapp" />
            <img src={Instagram} alt="instagram" />
            <img src={Facebook} alt="facebook" />
          </div>
        </section>

        <section className="user-signup__panel">
          <div className="user-signup__panel-header">
            <p className="user-signup__eyebrow">Get Started</p>
            <h2>User Signup</h2>
            <p>Enter your details to create your account and start shopping.</p>
          </div>

          <div className="user-signup__carousel">
            <div
              className="user-signup__carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {imgArray.map((img, index) => (
                <img key={index} src={img} alt="brand icon" className="user-signup__carousel-item" />
              ))}
            </div>
          </div>

          <form onSubmit={handleSignup} className="user-signup__form">
            <div className="user-signup__grid">
              <label className="user-signup__field">
                <span>First Name</span>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={firstname}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </label>

              <label className="user-signup__field">
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastname}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </label>

              <label className="user-signup__field user-signup__field--wide">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label className="user-signup__field user-signup__field--wide">
                <span>Phone Number</span>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phonenumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                />
              </label>

              <label className="user-signup__field">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>

              <label className="user-signup__field">
                <span>Confirm Password</span>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmpass}
                  onChange={(event) => setConfirmPass(event.target.value)}
                  required
                />
              </label>
            </div>

            <button type="submit" className="user-signup__submit">
              Create Account
            </button>
          </form>

          <p className="user-signup__footnote">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/users/login")}>
              Go to login
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Signup;
