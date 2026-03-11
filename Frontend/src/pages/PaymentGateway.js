import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCheckCircle,
  faChevronRight,
  faClock,
  faCreditCard,
  faLock,
  faMobileAlt,
  faMoneyCheckAlt,
  faShieldHalved,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderChange.js";
import Upi from "../assets/PaymentPageIcons/upi.png";
import Emi from "../assets/PaymentPageIcons/emi.png";
import Visa from "../assets/PaymentPageIcons/visa.png";
import Wallet from "../assets/PaymentPageIcons/wallet.png";
import { BASE_URL } from "../config/config.js";

const paymentMethods = [
  {
    key: "upi",
    title: "UPI",
    subtitle: "Instant approval with UPI apps",
    icon: Upi,
    accent: "from-emerald-500/20 to-teal-500/10",
    label: "Recommended",
  },
  {
    key: "card",
    title: "Credit / Debit Card",
    subtitle: "Visa, Mastercard and RuPay supported",
    icon: Visa,
    accent: "from-sky-500/20 to-cyan-500/10",
    label: "Popular",
  },
  {
    key: "emi",
    title: "EMI",
    subtitle: "Split into smaller monthly payments",
    icon: Emi,
    accent: "from-amber-500/20 to-orange-500/10",
    label: "Flexible",
  },
  {
    key: "paylater",
    title: "Pay Later",
    subtitle: "Buy now and settle on your next cycle",
    icon: Wallet,
    accent: "from-violet-500/20 to-fuchsia-500/10",
    label: "Fast",
  },
];

const methodCopy = {
  upi: {
    icon: faMobileAlt,
    title: "UPI checkout enabled",
    description: "Best for fast mobile payments with a quick approval flow.",
  },
  card: {
    icon: faCreditCard,
    title: "Card payment enabled",
    description: "Use your saved or new card details in Razorpay checkout.",
  },
  emi: {
    icon: faMoneyCheckAlt,
    title: "EMI checkout enabled",
    description: "A good choice when you want to reduce the upfront payment.",
  },
  paylater: {
    icon: faWallet,
    title: "Pay Later enabled",
    description: "Checkout now and complete payment on the provider schedule.",
  },
};

const formatPrice = (amount) => `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

const PaymentGateway = () => {
  const { UserID } = useSelector((state) => state.fetchID);
  const { totalBag } = useSelector((state) => state.fetchBagTotalStore);
  const { token } = useSelector((state) => state.userAuth);
  const { filteredData } = useSelector((state) => state.filteredData);

  const [selectedOption, setSelectedOption] = useState("upi");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalData = async () => {
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

    fetchTotalData();
  }, [UserID]);

  const itemCount = useMemo(() => {
    if (typeof totalBag === "number" && totalBag > 0) {
      return totalBag;
    }

    if (Array.isArray(filteredData?.data)) {
      return filteredData.data.length;
    }

    return 1;
  }, [filteredData, totalBag]);

  const currentMethod = methodCopy[selectedOption];

  const handleOrderConfirmDataStoreDb = async () => {
    try {
      await axios.post(`${BASE_URL}/users/order-placed`, {
        UserID,
        totalPrice: total,
        status: "ordered",
        orderDate: new Date(),
      });
    } catch (error) {
      console.log("data not stored in db something error....", error);
    }
  };

  const handleCongrats = () => {
    navigate("/users/completed");
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCheckPaymentSuccess = async (RAZR_PAY_ID_) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/verify-payment`,
        { RAZR_PAY_ID_ },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert(`PAYMENT SUCCESS 200 ${response.data.payment}`);
        return true;
      }

      alert(`PAYMENT NOT CONFIRMED. STATUS ${response.data.status}`);
      return false;
    } catch (err) {
      alert("ERROR VERIFYING PAYMENT. PLEASE CONTACT SUPPORT STAFF.");
      return false;
    }
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/users/create-order`,
        { amount: `${total}` },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = response.data;
      const options = {
        key: "rzp_test_wuFJ7sKk68vkn4",
        amount: orderData.amount,
        currency: "INR",
        name: "Khareed Lay",
        description: "Khareed Lay - Big Electronics E-Commerce Platform in India",
        order_id: orderData.id,
        method: {
          upi: selectedOption === "upi",
          card: selectedOption === "card",
          netbanking: false,
          wallet: false,
          emi: selectedOption === "emi",
          paylater: selectedOption === "paylater",
        },
        handler: async function (razorpayResponse) {
          alert(`Payment Successful. Payment ID: ${razorpayResponse.razorpay_payment_id}`);

          const verified = await handleCheckPaymentSuccess(
            razorpayResponse.razorpay_payment_id
          );

          if (verified) {
            await handleOrderConfirmDataStoreDb();
            handleCongrats();
          }
        },
        prefill: {
          name: "Ahmed",
          email: "Ahmedkhandelhi123@gmail.com",
          contact: "8882066763",
        },
        theme: {
          color: "#0f766e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Payment failed or server unreachable.");
    }
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.95fr]">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-6 sm:px-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                <FontAwesomeIcon icon={faLock} />
                Secure checkout
              </span>
              <h1 className="mt-5 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl">
                A cleaner payment experience built for confidence.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Review your order, choose the payment path that fits you best, and
                continue through Razorpay with a stronger visual flow.
              </p>
            </div>

            <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_0.82fr]">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-[1px]">
                <div className="h-full rounded-[1.7rem] bg-slate-950/90 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">
                        Payable now
                      </p>
                      <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                        {formatPrice(total)}
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3 text-emerald-200">
                      <FontAwesomeIcon icon={faBolt} className="text-xl" />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 text-sm text-slate-200">
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Items in this order</span>
                      <span className="font-semibold text-white">{itemCount}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Delivery window</span>
                      <span className="font-semibold text-white">1 hour express</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Protection</span>
                      <span className="font-semibold text-white">Buyer secured</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
                      <FontAwesomeIcon icon={faShieldHalved} />
                      256-bit encryption
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
                      <FontAwesomeIcon icon={faClock} />
                      Fast verification
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Why this layout works</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
                    Visual clarity
                  </span>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-xl bg-emerald-400/10 p-2 text-emerald-200">
                      <FontAwesomeIcon icon={currentMethod.icon} />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{currentMethod.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {currentMethod.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "High contrast hierarchy improves readability on desktop and mobile.",
                    "Selected payment state is clearer before the Razorpay modal opens.",
                    "Order amount and trust cues stay visible throughout checkout.",
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-200"
                    >
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="mt-0.5 text-emerald-300"
                      />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
                    Payment options
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                    Complete your order
                  </h2>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Amount
                  </p>
                  <p className="text-xl font-black text-emerald-900">{formatPrice(total)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 px-6 py-6 sm:px-8">
              <div className="rounded-[1.5rem] bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Choose a payment method</h3>
                    <p className="text-sm text-slate-500">
                      Select one option to continue into Razorpay checkout.
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                    4 methods
                  </span>
                </div>

                <div className="grid gap-3">
                  {paymentMethods.map((method) => {
                    const isActive = selectedOption === method.key;

                    return (
                      <button
                        key={method.key}
                        type="button"
                        onClick={() => setSelectedOption(method.key)}
                        className={`group flex w-full items-center gap-4 rounded-[1.5rem] border p-4 text-left transition duration-200 ${
                          isActive
                            ? "border-emerald-500 bg-white shadow-[0_12px_35px_rgba(16,185,129,0.15)]"
                            : "border-transparent bg-white hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-lg"
                        }`}
                      >
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${method.accent}`}
                        >
                          <img
                            src={method.icon}
                            alt={method.title}
                            className="h-10 w-10 object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-bold text-slate-900">{method.title}</p>
                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                                isActive
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {method.label}
                            </span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {method.subtitle}
                          </p>
                        </div>

                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            isActive
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-slate-300 text-transparent"
                          }`}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Order summary
                    </p>
                    <h3 className="mt-2 text-xl font-black text-slate-900">
                      Final review before payment
                    </h3>
                  </div>
                  <FontAwesomeIcon icon={faChevronRight} className="text-slate-300" />
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Cart subtotal</span>
                    <span className="font-semibold text-slate-900">{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-700">Free</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span>Payment route</span>
                    <span className="font-semibold text-slate-900">
                      {paymentMethods.find((method) => method.key === selectedOption)?.title}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-dashed border-slate-200 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Amount to pay
                    </p>
                    <p className="mt-2 text-3xl font-black text-slate-900">
                      {formatPrice(total)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    Secured by Razorpay
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                disabled={!total}
                className="group flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-slate-950 px-6 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FontAwesomeIcon icon={faLock} />
                Proceed to Pay {formatPrice(total)}
              </button>

              <p className="text-center text-xs leading-6 text-slate-500">
                By continuing, you will be redirected to Razorpay for secure payment
                authorization and verification.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;
