import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import khareedLe from "../assets/images/HeaderLogos/khareedLe.png";

import Facebook from "../assets/Socialicons/facebook.png";

import Instagram from "../assets/Socialicons/instagram.png";

import Twitter from "../assets/Socialicons/twitter.png";

import whatsapp from "../assets/Socialicons/whatsapp.png";

import upi from "../assets/Socialicons/upi.png";

import visa from "../assets/Socialicons/visa.png";

import master from "../assets/Socialicons/card.png";

import ssl from "../assets/Socialicons/ssl2.png";

import KhareedLeLogo from "../assets/images/HeaderLogos/arena3.png";



function Footer() {

  const navigate = useNavigate();

  const [isLaunching, setIsLaunching] = useState(false);



  const handleLaunch = () => {

    if (isLaunching) return;

    setIsLaunching(true);



    const launchDelayMs = 3000;

    window.setTimeout(() => {

      navigate("/users/VR");

    }, launchDelayMs);

  };



  return (

    <footer className="relative mt-12 overflow-hidden bg-[#05070b] text-white">

      {/* Ambient glow */}

      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-24 right-[-10%] h-64 w-64 rounded-full bg-emerald-400/15 blur-[120px]" />



      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 pt-14">

        {/* Headline strip */}

        <div className="flex flex-col gap-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-[#0a1320] via-[#0c0f1a] to-[#0b1b18] p-6 shadow-[0_0_60px_rgba(0,255,255,0.12)] sm:p-8">

          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <img src={KhareedLeLogo} alt="X Arena" className="h-12 w-12 rounded-xl border border-cyan-400/30 bg-black/40 p-1" />

              <div>

                <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Future Commerce</p>

                <h2 className="text-2xl font-semibold sm:text-3xl">X-ARENA Hub Command Deck</h2>

                <p className="text-sm text-slate-300">Precision shopping, instant delivery, zero friction.</p>

              </div>

            </div>



            <div className="glass-panel w-full max-w-md rounded-xl border border-cyan-500/30 p-4 sm:w-auto sm:min-w-[320px]">

              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/70">Signal Updates</p>

              <div className="mt-3 flex items-center gap-3">

                <input

                  type="email"

                  placeholder="Enter your email"

                  className="w-full rounded-lg border border-slate-700/60 bg-black/60 px-3 py-2 text-sm text-white outline-none ring-1 ring-transparent transition focus:border-cyan-400/60 focus:ring-cyan-400/40"

                />

                <button className="rounded-lg bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_16px_rgba(0,255,255,0.35)] transition hover:-translate-y-0.5 hover:bg-green-400 hover:shadow-[0_0_26px_rgba(0,255,255,0.55)]">

                  Connect

                </button>

              </div>

            </div>

          </div>



          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">

            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 transition hover:-translate-y-0.5 hover:border-cyan-400/70 hover:text-white">

              AR Delivery ETA: 2 hrs

            </span>

            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 transition hover:-translate-y-0.5 hover:border-emerald-400/70 hover:text-white">

              Secure Quantum Checkout

            </span>

            <span className="rounded-full border border-slate-700 bg-white/5 px-3 py-1 transition hover:-translate-y-0.5 hover:border-slate-400/70 hover:text-white">

              24/7 Live Support

            </span>

          </div>

        </div>



        {/* Main grid */}

        <div className="mt-12 grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">

          <div className="space-y-4">

            <img src={khareedLe} alt="KhareedLe" className="h-10" />

            <p className="text-sm text-slate-300">

              A hyper-modern marketplace for smart tech, immersive shopping, and verified delivery pathways.

            </p>

            <div className="flex gap-3">

              <button

                type="button"

                onClick={handleLaunch}

                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:-translate-y-0.5 hover:border-white/30 hover:text-white"

              >

                {isLaunching ? "Launching..." : "Launch App"}

              </button>

              <Link

                to="/"

                className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-400/70 hover:text-cyan-100"

              >

                Learn More

              </Link>

            </div>

          </div>



          <div>

            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Company</h3>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">

              <li>

                <Link to="/" className="transition hover:translate-x-1 hover:text-cyan-200">

                  About Us

                </Link>

              </li>

              <li>

                <Link to="/" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Careers

                </Link>

              </li>

              <li>

                <Link to="/" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Press Room

                </Link>

              </li>

              <li>

                <Link to="/users/chatbot" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Contact

                </Link>

              </li>

            </ul>

          </div>



          <div>

            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Support</h3>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">

              <li>

                <Link to="/users/chatbot" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Help Center

                </Link>

              </li>

              <li>

                <Link to="/" className="transition hover:translate-x-1 hover:text-cyan-200">

                  FAQs

                </Link>

              </li>

              <li>

                <Link to="/users/my-orders" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Order Tracking

                </Link>

              </li>

              <li>

                <Link to="/users/my-orders" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Returns Portal

                </Link>

              </li>

            </ul>

          </div>



          <div>

            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Account</h3>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">

              <li>

                <Link to="/users/address" className="transition hover:translate-x-1 hover:text-cyan-200">

                  My Account

                </Link>

              </li>

              <li>

                <Link to="/users/Cart" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Wishlist

                </Link>

              </li>

              <li>

                <Link to="/users/login" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Login

                </Link>

              </li>

              <li>

                <Link to="/users/signup" className="transition hover:translate-x-1 hover:text-cyan-200">

                  Membership

                </Link>

              </li>

            </ul>

          </div>

        </div>



        {/* Highlights */}

        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 py-8 text-sm text-slate-300">

          <div className="flex flex-wrap items-center gap-3">

            <span className="text-white/80">Popular Categories:</span>

            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 transition hover:-translate-y-0.5 hover:border-cyan-400/70 hover:text-white">

              Smartphones

            </span>

            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 transition hover:-translate-y-0.5 hover:border-cyan-400/70 hover:text-white">

              Laptops

            </span>

            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 transition hover:-translate-y-0.5 hover:border-cyan-400/70 hover:text-white">

              Tablets

            </span>

          </div>

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-emerald-200">

            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>

            Live Inventory Sync

          </div>

        </div>



        {/* Payments + security */}

        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 py-8">

          <div>

            <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Payment Matrix</p>

            <div className="mt-3 flex gap-4">

              <img src={upi} className="h-8" alt="upi" />

              <img src={visa} className="h-8" alt="visa" />

              <img src={master} className="h-8" alt="mastercard" />

            </div>

          </div>

          <div className="glass-panel flex items-center gap-3 rounded-xl border border-emerald-500/30 px-4 py-3 text-sm text-emerald-100">

            <img src={ssl} className="h-6" alt="ssl secure" />

            Secure Checkout Layer

          </div>

        </div>



        {/* Base row */}

        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">

          <div className="flex items-center gap-3">

            <h1 className="text-2xl font-bold text-green-300">X-ARENA</h1>

            <span className="text-xs text-slate-400">Registered</span>

          </div>

          <div className="flex gap-4">

            <a href="#" className="transition hover:-translate-y-0.5 hover:opacity-100">

              <img src={Facebook} alt="Facebook" className="h-6 opacity-80" />

            </a>

            <a href="#" className="transition hover:-translate-y-0.5 hover:opacity-100">

              <img src={Instagram} alt="Instagram" className="h-6 opacity-80" />

            </a>

            <a href="#" className="transition hover:-translate-y-0.5 hover:opacity-100">

              <img src={Twitter} alt="Twitter" className="h-6 opacity-80" />

            </a>

            <a href="#" className="transition hover:-translate-y-0.5 hover:opacity-100">

              <img src={whatsapp} alt="WhatsApp" className="h-6 opacity-80" />

            </a>

          </div>

        </div>

      </div>



      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">

        © {new Date().getFullYear()} X-ARENA Hub. All Rights Reserved.

      </div>



      {isLaunching && (

        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#03060c]/85 backdrop-blur-sm">

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-cyan-400/30 bg-black/70 px-6 py-5 text-center shadow-[0_0_50px_rgba(0,255,255,0.22)]">

            <div className="h-10 w-10 animate-spin rounded-full border-2 border-green-300/40 border-t-green-300" />

            <div>

              <p className="text-xs uppercase tracking-[0.32em] text-green-400/80">

                Initializing 3D Arena

              </p>

              <p className="mt-1 text-sm text-slate-200">

                Aligning spatial racks and lighting.

              </p>

            </div>

          </div>

        </div>

      )}



    </footer>

  );

}



export default Footer;

