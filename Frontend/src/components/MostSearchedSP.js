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
    <section className="relative overflow-hidden px-3 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-orange-200/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 text-center sm:mb-10 sm:gap-4 lg:mb-14">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-700 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
            <Flame size={14} />
            Search Trends
          </span>
          <h2 className="HeadingPlayFair text-[2.2rem] leading-[1.08] text-slate-950 sm:text-5xl lg:text-6xl">
            Most Searched Smartphones
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            These are the devices shoppers keep coming back to. Treat this as a
            live interest board showing the phones currently pulling the most
            attention.
          </p>
        </div>

        <div className="mb-6 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mb-8 sm:overflow-visible sm:pb-0">
          <div className="flex w-max gap-3 px-1 sm:grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:px-0 xl:grid-cols-3">
            {data.map((item, index) => (
              <Link
                key={item.productId}
                to={`/product/${item.productId}`}
                onClick={() => handleProductOpen(item.productId)}
                className="group relative w-[252px] min-w-[252px] overflow-hidden rounded-[24px] border border-white/70 bg-white/90 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:shadow-[0_26px_90px_rgba(15,23,42,0.14)] sm:w-auto sm:min-w-0 sm:rounded-[28px] sm:shadow-[0_18px_70px_rgba(15,23,42,0.08)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-500" />

                <div className="p-3 sm:p-4">
                  <div className="relative overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] sm:rounded-[22px]">
                    <div
                      className="h-[210px] bg-contain bg-center bg-no-repeat transition duration-700 group-hover:scale-[1.04] sm:h-[240px]"
                      style={{ backgroundImage: `url(${item.product_image})` }}
                    />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-slate-950/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:left-4 sm:top-4 sm:px-3 sm:text-[11px] sm:tracking-[0.24em]">
                      <Search size={12} />
                      #{index + 1}
                    </div>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3 sm:mt-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs sm:tracking-[0.24em]">
                        Most searched
                      </p>
                      <h3 className="mt-2 text-base font-semibold leading-6 text-slate-950 sm:text-lg sm:leading-7">
                        {item.product_name}
                      </h3>
                    </div>

                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition duration-300 group-hover:bg-orange-500 group-hover:text-white sm:h-10 sm:w-10">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MostSearchedSP;
