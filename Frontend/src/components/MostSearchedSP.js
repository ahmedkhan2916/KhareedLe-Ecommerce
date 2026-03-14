import React, { useEffect, useState } from "react";
import { ArrowUpRight, Flame, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchData } from "../store/dataSlice.js";
import { BASE_URL } from "../config/config.js";
import "../assets/Style/Headings.css";

function MostSearchedSP() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/users/fetch-search-history`);
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log("Unable to load search history right now.");
      }
    };

    fetchSearchHistory();
  }, []);

  const handleProductOpen = (productId) => {
    dispatch(fetchData(productId));
  };

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 text-center lg:mb-14">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-orange-700">
            <Flame size={14} />
            Search Trends
          </span>
          <h2 className="HeadingPlayFair text-4xl leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Most Searched Smartphones
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            These are the devices shoppers keep coming back to. Treat this as a
            live interest board showing the phones currently pulling the most
            attention.
          </p>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((item, index) => (
              <Link
                key={item.productId}
                to={`/product/${item.productId}`}
                onClick={() => handleProductOpen(item.productId)}
                className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-[0_18px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_26px_90px_rgba(15,23,42,0.14)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-500" />

                <div className="p-4">
                  <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)]">
                    <div
                      className="h-[240px] bg-contain bg-center bg-no-repeat transition duration-700 group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url(${item.product_image})` }}
                    />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                      <Search size={12} />
                      #{index + 1}
                    </div>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        Most searched
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-950">
                        {item.product_name}
                      </h3>
                    </div>

                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default MostSearchedSP;
