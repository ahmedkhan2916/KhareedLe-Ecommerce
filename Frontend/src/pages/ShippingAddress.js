import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxOpen,
  faCheckCircle,
  faLocationDot,
  faShieldHalved,
  faStar,
  faTrashCan,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from "../assets/Brandlogo/trash.png";
import bag from "../assets/images/shoppingbag3.png";
import Header from "../components/HeaderChange";
import { BASE_URL } from "../config/config.js";
import { fetchID } from "../Services/apiService.js";
import { fetchBagData } from "../store/dataSlice.js";

const formatPrice = (amount) => `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

function ShippingAddress() {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.userAuth);
  const bagData = useSelector((state) => state.bag.data);
  const loading = useSelector((state) => state.bag.loading);

  useEffect(() => {
    const fetchBagItemsFunction = async () => {
      const ID = await fetchID(token);
      dispatch(fetchBagData(ID));
    };

    if (token) {
      fetchBagItemsFunction();
    }
  }, [dispatch, token]);

  useEffect(() => {
    const fetchTotalPrice = async () => {
      try {
        const userId = await fetchID(token);
        const response = await axios.post(`${BASE_URL}/users/totalprice`, {
          userId,
        });

        setTotal(response.data.Price);
      } catch (error) {
        console.error("Error fetching total price:", error);
      }
    };

    if (token) {
      fetchTotalPrice();
    }
  }, [bagData, token]);

  const bagItems = bagData?.bagItems || [];
  const itemCount = useMemo(
    () => bagItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0),
    [bagItems]
  );
  const platformFee = bagItems.length > 0 ? 50 : 0;
  const grandTotal = total + platformFee;

  const handleConfirm = async () => {
    navigate("/users/address");
  };

  const deleteQuantity = async (productId) => {
    try {
      const ID = await fetchID(token);

      await axios.post(`${BASE_URL}/users/deletequantity`, {
        userId: ID,
        productId,
      });

      dispatch(fetchBagData(ID));
    } catch (error) {
      console.error("Error deleting quantity:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen overflow-hidden bg-stone-950 px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute right-0 top-12 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-white/10 px-6 py-8 sm:px-8 lg:border-b-0 lg:border-r">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-orange-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-100">
                  <FontAwesomeIcon icon={faLocationDot} />
                  Shipping step
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                      Review your bag before adding delivery details.
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                      A cleaner pre-shipping screen with stronger hierarchy, better
                      spacing, and a clearer order review flow.
                    </p>
                  </div>
                  <div className="hidden rounded-[1.5rem] bg-white/10 p-4 text-orange-100 sm:block">
                    <img src={bag} alt="Bag" className="h-12 w-12 object-contain" />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Total items
                    </p>
                    <p className="mt-3 text-3xl font-black text-white">{itemCount}</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Delivery speed
                    </p>
                    <p className="mt-3 text-lg font-bold text-white">Express available</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                      Protected checkout
                    </p>
                    <p className="mt-3 text-lg font-bold text-white">Secured order flow</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {loading ? (
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-6 text-sm text-stone-300">
                      Loading your bag items...
                    </div>
                  ) : bagItems.length === 0 ? (
                    <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-stone-200">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-2xl" />
                      </div>
                      <h2 className="mt-5 text-2xl font-black text-white">
                        Your bag is empty
                      </h2>
                      <p className="mt-2 text-sm text-stone-300">
                        Add products to continue with shipping and payment.
                      </p>
                    </div>
                  ) : (
                    bagItems.map((item, index) => (
                      <article
                        key={`${item.productId}-${index}`}
                        className="group grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 transition duration-200 hover:border-orange-300/30 hover:bg-white/[0.08] sm:grid-cols-[88px_1fr_auto]"
                      >
                        <div className="overflow-hidden rounded-2xl bg-white p-2">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-20 w-20 object-contain"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-white">
                              {item.productName}
                            </h2>
                            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                              Ready to ship
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-3 text-sm text-stone-300">
                            <div className="rounded-full bg-white/5 px-3 py-2">
                              Qty: <span className="font-semibold text-white">{item.quantity}</span>
                            </div>
                            <div className="rounded-full bg-white/5 px-3 py-2">
                              Price:{" "}
                              <span className="font-semibold text-white">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                            <span className="text-stone-400">
                              Original Price{" "}
                              <span className="pl-1 font-bold text-stone-300 line-through">
                                {formatPrice(80000)}
                              </span>
                            </span>
                            <span className="font-semibold text-emerald-300">
                              You are paying {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
                          <div className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
                            Bag item
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteQuantity(item.productId)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                            Remove
                            <img src={DeleteIcon} alt="Delete" className="h-4 w-4 object-contain" />
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>

              <aside className="px-6 py-8 sm:px-8">
                <div className="rounded-[1.75rem] bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-500 p-[1px]">
                  <div className="rounded-[1.7rem] bg-stone-950 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-orange-100/80">
                          Order snapshot
                        </p>
                        <h2 className="mt-3 text-3xl font-black text-white">
                          {formatPrice(grandTotal)}
                        </h2>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-3 text-orange-100">
                        <FontAwesomeIcon icon={faStar} className="text-xl" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 text-sm text-stone-200">
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                        <span>Bag subtotal</span>
                        <span className="font-semibold text-white">{formatPrice(total)}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                        <span>Delivery charges</span>
                        <span className="font-semibold text-emerald-300">Free</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                        <span>Platform fee</span>
                        <span className="font-semibold text-white">{formatPrice(platformFee)}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                        <span>Total items</span>
                        <span className="font-semibold text-white">{itemCount}</span>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.2em] text-stone-400">
                          Final amount
                        </p>
                        <p className="text-2xl font-black text-white">
                          {formatPrice(grandTotal)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4 rounded-[1.75rem] border border-stone-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                      Next step
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-stone-950">
                      Add shipping address
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-500">
                      Confirm this order review, then continue to your delivery
                      address page to complete checkout.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                      <FontAwesomeIcon icon={faTruckFast} className="mt-0.5 text-orange-500" />
                      <span>Fast delivery options stay available after address selection.</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                      <FontAwesomeIcon
                        icon={faShieldHalved}
                        className="mt-0.5 text-emerald-600"
                      />
                      <span>Your order summary remains consistent through checkout.</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                      <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 text-cyan-600" />
                      <span>Cleaner spacing and stronger contrast improve readability.</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={bagItems.length === 0}
                    className="flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-stone-950 px-6 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue to Address
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ShippingAddress;
