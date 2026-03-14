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

      <section className="smartphoneContainer relative z-30 overflow-visible px-4 pb-8 pt-32 sm:px-6 lg:px-10 lg:pt-36">
        <div className="pointer-events-none absolute left-0 top-28 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-44 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,#fff7ed_0%,#ffffff_42%,#eff6ff_100%)] px-5 py-8 shadow-[0_28px_90px_rgba(15,23,42,0.1)] backdrop-blur-sm sm:px-7 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-700 shadow-sm">
                <Sparkles size={14} />
                Smartphone Spotlight
              </span>

              <h1 className="HeadingPlayFair mt-5 text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Powerful Smartphones,
                <span className="block text-orange-600">Presented Like a Flagship Drop</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Explore premium devices, standout launches, and customer-favorite
                phones in a section built to feel faster, sharper, and more
                intentional than a normal product strip.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  <Smartphone size={16} className="text-orange-500" />
                  Flagship Picks
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  <Zap size={16} className="text-cyan-500" />
                  Fast Discovery
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:gap-3 hover:bg-slate-800"
                  onClick={handleVr}
                >
                  Explore 3D Shopping
                  <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/users/filter")}
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:bg-slate-50"
                >
                  Browse All Phones
                </button>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/80 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                    Trending Devices
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-950">
                    Curated Smartphone Lineup
                  </p>
                </div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
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
