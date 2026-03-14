import React from "react";
import { ArrowUpRight, Gamepad2, Headphones, Smartphone } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataAccCategory } from "../store/dataSlice.js";
import "../assets/Style/Headings.css";

const categories = [
  {
    title: "Smartphones",
    categoryKey: "Smartphone",
    description:
      "Flagship phones, camera-first devices, and everyday performers picked for your next upgrade.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80",
    accent: "from-orange-500 via-amber-400 to-yellow-300",
    surface: "from-slate-950 via-slate-900 to-orange-950",
    ring: "group-hover:ring-orange-300/60",
    icon: Smartphone,
    stats: "120+ models",
    tags: ["5G", "Flagship", "Camera"],
  },
  {
    title: "Accessories",
    categoryKey: "Accessories",
    description:
      "Chargers, wearables, audio gear, and desk-ready essentials that complete the setup.",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    accent: "from-cyan-400 via-sky-400 to-blue-500",
    surface: "from-slate-950 via-cyan-950 to-slate-900",
    ring: "group-hover:ring-cyan-300/60",
    icon: Headphones,
    stats: "200+ add-ons",
    tags: ["Audio", "Power", "Lifestyle"],
  },
  {
    title: "Gaming",
    categoryKey: "Gaming",
    description:
      "Consoles, controllers, and performance gear for immersive sessions and competitive play.",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1200&q=80",
    accent: "from-fuchsia-500 via-violet-500 to-indigo-400",
    surface: "from-slate-950 via-violet-950 to-slate-900",
    ring: "group-hover:ring-fuchsia-300/60",
    icon: Gamepad2,
    stats: "50+ setups",
    tags: ["Console", "Controllers", "RGB"],
  },
];

function ShopByCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategory = (category) => {
    dispatch(getDataAccCategory({ category }));
    navigate("/users/ProductByCategory");
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.14),transparent_26%),linear-gradient(180deg,#fffdf9_0%,#fff8ef_45%,#f8fafc_100%)] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),transparent)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-600 shadow-sm">
            Curated Collections
          </p>
          <h2 className="HeadingPlayFair text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Jump into the products that match your mood faster. Each category is
            organized to get you from discovery to checkout with less friction.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.categoryKey}
                className={`group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)] sm:p-6`}
                onClick={() => handleCategory(item.categoryKey)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-slate-950/50" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.surface} opacity-[0.86] transition duration-500`}
                />
                <div
                  className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r ${item.accent} opacity-90`}
                />
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition duration-500 group-hover:scale-125" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <span
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 transition duration-500 ${item.ring}`}
                      >
                        <Icon size={28} strokeWidth={2.1} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                          {item.stats}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-white/70">
                      Featured
                    </span>
                  </div>

                  <p className="mt-6 text-sm leading-7 text-slate-200">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`mt-8 rounded-[22px] bg-gradient-to-r ${item.accent} p-[1px]`}
                  >
                    <div className="rounded-[21px] bg-slate-950/85 px-4 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                            Browse collection
                          </p>
                          <p className="mt-1 text-sm text-white/85">
                            Explore products with a cleaner filtered view.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCategory(item.categoryKey)}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:gap-3 hover:bg-slate-100"
                        >
                          Explore
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ShopByCategory;
