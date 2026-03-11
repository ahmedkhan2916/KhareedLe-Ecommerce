import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheckCircle,
  faGift,
  faLock,
  faMinus,
  faPlus,
  faShieldHalved,
  faShoppingBag,
  faTrashCan,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/HeaderChange.js";
import DeleteIcon from "../assets/Brandlogo/trash.png";
import {
  fetchUserID,
  refreshToken,
  fetchProductQuantity,
  fetchBagData,
  fetchBagTotal2,
} from "../store/dataSlice.js";
import { BASE_URL } from "../config/config.js";

const formatPrice = (amount) => `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

const CartPage = () => {
  const { token } = useSelector((state) => state.userAuth);
  const { UserID } = useSelector((state) => state.fetchID);
  const bagData = useSelector((state) => state.bag.data);
  const loading = useSelector((state) => state.bag.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!token) {
      dispatch(refreshToken());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserID(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (UserID) {
      dispatch(fetchBagData(UserID));
    }
  }, [UserID, dispatch]);

  const fetchTotalPrice = async () => {
    try {
      if (!UserID) {
        setTotal(0);
        return;
      }

      const response = await axios.post(`${BASE_URL}/users/totalprice`, {
        UserID,
      });

      setTotal(response.data.Price);
    } catch (error) {
      console.error("Error fetching total price:", error);
    }
  };

  useEffect(() => {
    fetchTotalPrice();
  }, [UserID, bagData]);

  const handleRemoveQuantity = async (value, productId) => {
    try {
      await dispatch(fetchProductQuantity({ UserID, productId, value }));
      await dispatch(fetchBagData(UserID));
      fetchTotalPrice();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuantity = async (productId) => {
    try {
      const ID = UserID;

      await axios.post(`${BASE_URL}/users/deletequantity`, {
        userId: ID,
        productId,
      });

      dispatch(fetchBagData(ID));
      dispatch(fetchBagTotal2(ID));
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  const bagItems = bagData?.bagItems || [];
  const itemCount = useMemo(
    () => bagItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0),
    [bagItems]
  );
  const platformFee = bagItems.length > 0 ? 49 : 0;
  const grandTotal = total + platformFee;
  const showEmptyState = !loading && bagItems.length === 0;

  return (
    <>
      <Header />
      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-24 h-80 w-80 rounded-full bg-emerald-500/12 blur-3xl" />
          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-cyan-500/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
                <FontAwesomeIcon icon={faShoppingBag} />
                Cart review
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Your cart, redesigned for faster checkout.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Review quantities, remove items, and move to shipping with a clearer
                layout, stronger hierarchy, and better mobile behavior.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Items</p>
                <p className="mt-2 text-3xl font-black text-white">{itemCount}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Subtotal</p>
                <p className="mt-2 text-xl font-black text-white">{formatPrice(total)}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Delivery</p>
                <p className="mt-2 text-xl font-black text-emerald-300">Free</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-5">
              {loading ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-10 text-center text-sm text-slate-300 shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  Loading your cart...
                </div>
              ) : showEmptyState ? (
                <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.05] px-6 py-12 text-center shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-slate-100">
                    <FontAwesomeIcon icon={faShoppingBag} className="text-2xl" />
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-white">Your cart is empty</h2>
                  <p className="mt-2 text-sm text-slate-300">
                    Add products to continue to shipping and payment.
                  </p>
                </div>
              ) : (
                bagItems.map((item, index) => (
                  <article
                    key={`${item.productId}-${index}`}
                    className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)] transition duration-200 hover:border-emerald-300/25 hover:bg-white/[0.08] backdrop-blur-xl"
                  >
                    <div className="grid gap-5 sm:grid-cols-[112px_1fr_auto] sm:items-center">
                      <div className="overflow-hidden rounded-[1.5rem] bg-white p-3">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="h-24 w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold text-white">{item.productName}</h2>
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-200">
                            In cart
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-3">
                          <div className="rounded-full bg-white/5 px-3 py-2 text-sm text-slate-300">
                            Price{" "}
                            <span className="font-semibold text-white">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <div className="rounded-full bg-white/5 px-3 py-2 text-sm text-slate-300">
                            Quantity{" "}
                            <span className="font-semibold text-white">{item.quantity}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            value="min"
                            onClick={(e) => handleRemoveQuantity(e.currentTarget.value, item.productId)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>

                          <div className="flex min-w-[64px] items-center justify-center rounded-xl bg-white text-lg font-bold text-slate-950 px-4 py-3">
                            {item.quantity}
                          </div>

                          <button
                            type="button"
                            value="add"
                            onClick={(e) => handleRemoveQuantity(e.currentTarget.value, item.productId)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/15 text-emerald-100 transition hover:bg-emerald-500/25"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            Line total
                          </p>
                          <p className="mt-2 text-2xl font-black text-white">
                            {formatPrice(Number(item.price) * Number(item.quantity || 1))}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteQuantity(item.productId)}
                          className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                          Remove
                          <img
                            src={DeleteIcon}
                            className="h-4 w-4 object-contain"
                            alt="delete"
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}

              {!showEmptyState && !loading && (
                <div className="rounded-[2rem] border border-amber-300/15 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
                        <FontAwesomeIcon icon={faGift} />
                        Surprise bonus
                      </p>
                      <h3 className="mt-3 text-2xl font-black text-white">
                        A gift may unlock during checkout
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-slate-200">
                        Proceed through the shopping flow to reveal a surprise reward
                        before payment.
                      </p>
                    </div>
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white/10 text-amber-100 shadow-lg">
                      <FontAwesomeIcon icon={faGift} className="text-3xl" />
                    </div>
                  </div>
                </div>
              )}
            </section>

            <aside className="lg:sticky lg:top-32 h-fit">
              <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      Order summary
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                      Ready for checkout
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      Total items
                    </p>
                    <p className="text-xl font-black text-emerald-900">{itemCount}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-950">{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-slate-600">
                    <span>Delivery</span>
                    <span className="font-semibold text-emerald-700">Free</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-slate-600">
                    <span>Platform fee</span>
                    <span className="font-semibold text-slate-950">{formatPrice(platformFee)}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.5rem] bg-slate-950 px-5 py-5 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Payable now</p>
                  <p className="mt-3 text-4xl font-black">{formatPrice(grandTotal)}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                      <FontAwesomeIcon icon={faTruckFast} />
                      Fast delivery
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                      <FontAwesomeIcon icon={faLock} />
                      Secure checkout
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                    <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 text-emerald-600" />
                    <span>Quantity controls are available directly in the cart for faster review.</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <FontAwesomeIcon icon={faShieldHalved} className="mt-0.5 text-slate-900" />
                    <span>Your order summary carries forward into the shipping and payment flow.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/users/address")}
                  disabled={bagItems.length === 0}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-emerald-600 px-6 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue to Checkout
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
