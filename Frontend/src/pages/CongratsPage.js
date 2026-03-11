import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faGift,
  faHouse,
  faRocket,
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import Celebrate from "./Confetti.js";
import { fetchID } from "../Services/apiService.js";
import { setSignal } from "../../src/store/dataSlice.js";
import { BASE_URL } from "../config/config.js";

function CongratsPage() {
  const location = useLocation();
  const { token } = useSelector((state) => state.userAuth);
  const product = useSelector((state) => state.product.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timers = [];

    Celebrate();
    timers.push(setTimeout(() => Celebrate(), 850));
    timers.push(setTimeout(() => Celebrate(), 1700));

    const finalizeOrder = async () => {
      try {
        const ID = await fetchID(token);

        if (ID && product?.id) {
          await axios.post(`${BASE_URL}/users/addbag`, {
            userId: ID,
            productId: product.id,
            Signal: true,
          });
        }

        dispatch(setSignal({ Signal: true }));
      } catch (error) {
        console.log("Congrats page finalization failed:", error);
      }
    };

    timers.push(setTimeout(finalizeOrder, 2400));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [dispatch, location, product, token]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-16 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-0 top-12 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-500/12 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.06] shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="border-b border-white/10 px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
                <FontAwesomeIcon icon={faCheckCircle} />
                Order successful
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl">
                Payment complete. Your order is officially placed.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Your checkout is complete, the celebration is live, and your order is
                moving into the next fulfillment step.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Status
                  </p>
                  <p className="mt-3 text-lg font-bold text-emerald-300">Confirmed</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Delivery
                  </p>
                  <p className="mt-3 text-lg font-bold text-white">Processing next</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Next step
                  </p>
                  <p className="mt-3 text-lg font-bold text-cyan-300">Go home manually</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3 rounded-[1.5rem] bg-white/5 px-4 py-4 text-sm text-slate-200">
                  <FontAwesomeIcon icon={faTruckFast} className="mt-0.5 text-emerald-300" />
                  <span>Your order has been recorded and moved into the delivery workflow.</span>
                </div>
                <div className="flex items-start gap-3 rounded-[1.5rem] bg-white/5 px-4 py-4 text-sm text-slate-200">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="mt-0.5 text-cyan-300"
                  />
                  <span>Payment confirmation has completed with a secured success state.</span>
                </div>
                <div className="flex items-start gap-3 rounded-[1.5rem] bg-white/5 px-4 py-4 text-sm text-slate-200">
                  <FontAwesomeIcon icon={faGift} className="mt-0.5 text-amber-300" />
                  <span>Your reward and purchase flow now continue into the post-order stage.</span>
                </div>
              </div>
            </section>

            <section className="px-6 py-8 sm:px-8">
              <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 p-[1px] shadow-[0_24px_80px_rgba(14,165,233,0.22)]">
                <div className="rounded-[1.95rem] bg-slate-950 p-6 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-emerald-100/80">
                        Celebration mode
                      </p>
                      <h2 className="mt-3 text-3xl font-black">Confetti and fireworks live</h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3 text-emerald-100">
                      <FontAwesomeIcon icon={faRocket} className="text-xl" />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-center">
                    <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <div className="absolute h-56 w-56 animate-ping rounded-full bg-emerald-400/10" />
                      <div className="absolute h-44 w-44 rounded-full border border-cyan-300/25" />
                      <div className="absolute h-32 w-32 rounded-full border border-amber-300/25" />
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-white shadow-[0_20px_50px_rgba(16,185,129,0.28)]">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-4xl" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3 text-sm">
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Order state</span>
                      <span className="font-semibold text-white">Placed successfully</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Status</span>
                      <span className="font-semibold text-white">Verified</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Next action</span>
                      <span className="font-semibold text-white">Wait for your tap</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  What happens next
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">
                  Your order is now in the system
                </h3>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <FontAwesomeIcon icon={faStar} className="mt-0.5 text-amber-500" />
                    <span>A success celebration is triggered immediately on this page.</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <FontAwesomeIcon icon={faRocket} className="mt-0.5 text-cyan-600" />
                    <span>Order finalization runs in the background before redirecting.</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <FontAwesomeIcon icon={faHouse} className="mt-0.5 text-emerald-600" />
                    <span>You stay on this page until you choose to return home.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-slate-950 px-6 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700"
                >
                  Go to Home Now
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CongratsPage;
