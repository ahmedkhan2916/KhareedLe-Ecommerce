import React from "react";
import {
  ArrowUpRight,
  Cpu,
  Gamepad2,
  Headset,
  Sparkles,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataAccCategory } from "../store/dataSlice.js";
import "../assets/Style/Headings.css";

const gamingCollections = [
  {
    title: "Game Consoles",
    description:
      "High-performance console picks built for cinematic single-player sessions and competitive online play.",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1400&q=80",
    accent: "from-cyan-400 via-sky-400 to-blue-500",
    badge: "Power Hardware",
    icon: Cpu,
    tags: ["PS5", "Xbox", "Next Gen"],
  },
  {
    title: "Top-Tier Games",
    description:
      "Story-rich releases, multiplayer favorites, and high-hype titles selected to keep the section dynamic and current.",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-500",
    badge: "Hot Releases",
    icon: Gamepad2,
    tags: ["AAA", "Action", "Multiplayer"],
  },
  {
    title: "Gaming Accessories",
    description:
      "Controllers, headsets, and setup gear that sharpen comfort, precision, and immersion for longer sessions.",
    image:
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=1400&q=80",
    accent: "from-emerald-400 via-teal-400 to-cyan-400",
    badge: "Setup Boost",
    icon: Headset,
    tags: ["Audio", "Controllers", "RGB"],
  },
];

function GamingConsoleSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleExploreGaming = () => {
    dispatch(getDataAccCategory({ category: "Gaming" }));
    navigate("/users/ProductByCategory");
  };

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 text-center lg:mb-14">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-sm">
            <Sparkles size={14} />
            Console Gaming Reimagined
          </span>
          <h2 className="HeadingPlayFair text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Step Into a Cleaner, Bolder Gaming Collection
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            This section should feel like a curated gaming showcase, not a basic
            card row. Strong visuals, sharper copy, and faster entry points make
            the browsing experience feel more intentional.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(160deg,#020617_0%,#111827_40%,#3b0764_100%)] p-6 text-white shadow-[0_26px_90px_rgba(15,23,42,0.2)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
              Featured Zone
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Designed for players who want the catalog to feel alive.
            </h3>
            <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
              Browse a tighter gaming ecosystem with strong visual focus across
              consoles, games, and accessories. The goal is a section that feels
              premium before the customer even clicks.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">
                  Response
                </p>
                <p className="mt-2 text-4xl font-semibold">120Hz</p>
                <p className="mt-2 text-sm text-slate-300">
                  Fast feel, fast decisions, fast navigation.
                </p>
              </div>
              <div className="rounded-[24px] border border-cyan-300/20 bg-cyan-300/10 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/70">
                  Immersion
                </p>
                <p className="mt-2 text-4xl font-semibold text-white">4K</p>
                <p className="mt-2 text-sm text-cyan-50/85">
                  A more cinematic mood across the full gaming section.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleExploreGaming}
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:gap-3 hover:bg-slate-100"
            >
              Explore Gaming Collection
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
            {gamingCollections.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/80 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_90px_rgba(15,23,42,0.14)]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.58)_48%,rgba(2,6,23,0.28)_100%)]" />
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
                  />

                  <div className="relative flex h-full flex-col justify-between gap-8 p-6 sm:p-7">
                    <div className="max-w-xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-slate-950`}
                        >
                          <Icon size={22} strokeWidth={2.2} />
                        </span>
                        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="mt-5 text-3xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleExploreGaming}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:gap-3 hover:bg-slate-100"
                      >
                        Explore
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GamingConsoleSection;
