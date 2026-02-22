import React, { useEffect, useState } from "react";
import "../assets/Style/login.css";
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmpass) {
      return alert("Password is not Matching..!!!");
    }

    const bodyData = {
      firstname,
      lastname,
      email,
      phonenumber,
      password,
    };

    console.log("this is signup data...>>>>>", bodyData);

    try {
      await axios.post(`${BASE_URL}/users/signup`, bodyData);
      alert("success");
      console.log("signup successfully");
      navigate("/users/login");
    } catch (error) {
      console.error(error, "error in Signup");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      <div className="md:w-1/2 w-full flex flex-col items-center justify-center px-6 py-10 loginLeftPanel">
        <div className="flex items-center gap-2 mb-6 flex-col">
          <div className="GETEXTCONTAINER flex">
            <img src={GELOGO2} className="GELOGO2 h-64" alt="X Arena logo" />
          </div>
        </div>

        <h3 className="text-center text-2xl md:text-3xl font-bold mb-2 loginLeftHeading">
          <span className="inline-flex items-center gap-2 loginHeadingBadge flex-col md:flex-row">
            <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="signupGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <circle cx="32" cy="32" r="26" stroke="url(#signupGradient)" strokeWidth="4" />
              <path d="M14 32h14l4 12 4-12h14" stroke="url(#signupGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M42 20h8c5 0 8 3 8 8s-3 8-8 8h-8" stroke="url(#signupGradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="loginHeadingText">Create Your X Arena Account</span>
          </span>
        </h3>

        <p className="text-center text-sm md:text-lg max-w-md mb-4 font-semibold loginLeftSub">
          Join the immersive shopping experience with your own account and unlock a faster, smarter checkout flow.
        </p>

        <div className="flex gap-3 mb-5">
          <span className="loginBadge">Quick Setup</span>
          <span className="loginBadge">Secure Profile</span>
          <span className="loginBadge">Fast Checkout</span>
        </div>

        <div className="flex gap-5 loginSocialRow">
          <img src={Whatsapp} alt="whatsapp" className="h-6 cursor-pointer" />
          <img src={Instagram} alt="instagram" className="h-6 cursor-pointer" />
          <img src={Facebook} alt="facebook" className="h-6 cursor-pointer" />
        </div>
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-white p-6 rounded-xl loginCard">
          <div className="w-full h-16 overflow-hidden rounded-xl mb-3 mx-auto loginIconTile">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {imgArray.map((img, i) => (
                <img key={i} src={img} alt="icon" className="h-16 min-w-full object-contain" />
              ))}
            </div>
          </div>

          <div className="loginText">
            <h2 className="text-3xl font-bold HeadingPlayFair mb-1 text-center bitcount-single-Nothing loginHeading">Signup</h2>
            <p className="text-center text-gray-600 mb-6 loginSubheading">Enter your details to create your account</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <input
              type="tel"
              placeholder="Phone number"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmpass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
              className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />

            <button type="submit" className="w-full h-11 bg-black text-white rounded-md font-semibold transition loginButton">
              Create Account
            </button>
          </form>

          <p
            className="text-center mt-6 text-green-600 underline cursor-pointer bitcount-single-Nothing hover:text-red-500"
            onClick={() => navigate("/users/login")}
          >
            Back to Login Page
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
