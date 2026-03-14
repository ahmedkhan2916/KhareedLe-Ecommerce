import React from "react";
import { ArrowRight, Gamepad2, Sparkles, Zap } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Video from "../assets/Video/ps5.mp4";
import { getDataAccCategory } from "../store/dataSlice.js";
import "../assets/Style/Headings.css";

function GameConsole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExploreGaming = () => {
    dispatch(getDataAccCategory({ category: "Gaming" }));
    navigate("/users/ProductByCategory");
  };

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 text-center lg:mb-14">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-700">
            <Sparkles size={14} />
            Gaming Zone
          </span>
          <h2 className="HeadingPlayFair text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Console Gaming, Reframed as an Experience
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            More than a video banner. This section should feel like a launch
            moment for players browsing consoles, games, and performance-ready
            accessories.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.72fr]">
          <div className="group relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/10 bg-slate-950 shadow-[0_28px_90px_rgba(15,23,42,0.24)]">
            <video
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={Video} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.22),transparent_28%),linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.68)_45%,rgba(2,6,23,0.32)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(2,6,23,0.9))]" />

            <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur">
                  <Gamepad2 size={14} />
                  PS5 Arena
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur">
                  <Zap size={14} />
                  Immersive Play
                </span>
              </div>

              <div className="max-w-2xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-200">
                  Next Level Visuals
                </p>
                <h3 className="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Experience the future of gaming before you even touch the
                  controller.
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
                  Browse premium consoles, major releases, and gaming gear in a
                  section designed to feel energetic, focused, and premium.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleExploreGaming}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:gap-3 hover:bg-slate-100"
                  >
                    Explore Gaming
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/users/VR")}
                    className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:bg-white/15"
                  >
                    Open 3D Store
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-6">
            <div className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Why it stands out
              </p>
              <div className="mt-6 space-y-5">
                <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
                  <p className="text-3xl font-semibold">4K</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Cinematic visuals and stronger presence with the video-led
                    hero layout.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-3xl font-semibold text-slate-950">120Hz</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Faster interaction cues and cleaner CTAs for better user
                    flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-fuchsia-200 bg-[linear-gradient(135deg,#111827_0%,#581c87_100%)] p-6 text-white shadow-[0_22px_70px_rgba(88,28,135,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-fuchsia-200">
                Ready to play
              </p>
              <h4 className="mt-3 text-2xl font-semibold">
                Build a gaming corner that feels elite.
              </h4>
              <p className="mt-3 text-sm leading-7 text-fuchsia-100/90">
                From controllers to consoles, jump into a tighter gaming
                collection with a single click.
              </p>
              <button
                type="button"
                onClick={handleExploreGaming}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-slate-100"
              >
                Shop Gaming Now
                <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default GameConsole;
