import React, { useState } from "react";
import { ArrowRight, Sparkles, Smartphone, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductSlider from "../components/ProductSlider.js";
import Specification from "../components/Specification.js";
import ExploreContainer from "../components/ExploreContainer.js";
import Footer from "./Footer.js";
import Header from "./HeaderChange.js";
import Why from "../components/why.js";
import GameConsole from "./GameConsole.js";
import MostSearchedSP from "./MostSearchedSP.js";
import ShopByCategory from "./ShopByCategory.js";
import Welcome from "./Welcome.js";
import GamingConsoleSection from "./GamingConsoleSection.js";
import "../App.css";
import "../assets/Style/Headings.css";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  const user = location.state?.user;

  const handleVr = () => {
    navigate("/users/VR");
  };

  if (showWelcome) {
    return <Welcome onFinish={() => setShowWelcome(false)} />;
  }

  return (
    <div className="Home relative isolate w-screen overflow-x-hidden overflow-y-visible">
      <Header user={user} />

      <section className="smartphoneContainer relative z-30 overflow-visible px-3 pb-6 pt-24 sm:px-6 sm:pb-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="pointer-events-none absolute left-0 top-28 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-44 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_42%,#eff6ff_100%)] px-4 py-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:rounded-[36px] sm:px-7 sm:py-10 sm:shadow-[0_28px_90px_rgba(15,23,42,0.1)] lg:px-10 lg:py-12">
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-700 shadow-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
                <Sparkles size={14} />
                Smartphone Spotlight
              </span>

              <h1 className="HeadingPlayFair mt-4 text-[2.1rem] leading-[1.05] text-slate-950 sm:mt-5 sm:text-5xl lg:text-6xl">
                Powerful Smartphones,
                <span className="block text-orange-600">Presented Like a Flagship Drop</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
                Explore premium devices, standout launches, and customer-favorite
                phones in a section built to feel faster, sharper, and more
                intentional than a normal product strip.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 sm:px-4 sm:py-2 sm:text-sm">
                  <Smartphone size={16} className="text-orange-500" />
                  Flagship Picks
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 sm:px-4 sm:py-2 sm:text-sm">
                  <Zap size={16} className="text-cyan-500" />
                  Fast Discovery
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <button
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:gap-3 hover:bg-slate-800 sm:px-6"
                  onClick={handleVr}
                >
                  Explore 3D Shopping
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/users/filter")}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:bg-slate-50 sm:px-6"
                >
                  Browse All Phones
                </button>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/80 bg-white/70 p-3 shadow-[0_14px_40px_rgba(15,23,42,0.08)] sm:rounded-[30px] sm:p-5 sm:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs sm:tracking-[0.26em]">
                    Trending Devices
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-950 sm:text-lg">
                    Curated Smartphone Lineup
                  </p>
                </div>
                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-700 sm:px-3 sm:text-xs sm:tracking-[0.22em]">
                  Updated
                </span>
              </div>

              <ProductSlider />
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-0">
        {/* <Specification /> */}
        <ExploreContainer />
        <Why />
        <ShopByCategory />
        {/* <GameConsole /> */}
        <GamingConsoleSection />
        <MostSearchedSP />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
