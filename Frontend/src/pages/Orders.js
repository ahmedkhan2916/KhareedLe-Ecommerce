import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCalendarDays,
  faCheckCircle,
  faClock,
  faCube,
  faReceipt,
  faShieldHalved,
  faTruckFast,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer.js";
import Header from "../components/HeaderChange.js";
import { BASE_URL } from "../config/config.js";

const formatPrice = (amount) => `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

const getStatusTone = (status = "") => {
  const normalized = status.toLowerCase();

  if (normalized.includes("delivered")) {
    return "bg-emerald-500/10 text-emerald-200 border-emerald-400/20";
  }

  if (normalized.includes("shipped")) {
    return "bg-cyan-500/10 text-cyan-200 border-cyan-400/20";
  }

  if (normalized.includes("cancel")) {
    return "bg-red-500/10 text-red-200 border-red-400/20";
  }

  return "bg-amber-500/10 text-amber-100 border-amber-400/20";
};

function Orders() {
  const { UserID } = useSelector((state) => state.fetchID);

  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderedData = async () => {
      if (!UserID) {
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(`${BASE_URL}/users/fetch-Ordered-data`, {
          UserID,
        });
        setOrderData(response.data.orders || []);
      } catch (err) {
        console.log("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderedData();
  }, [UserID]);

  const summary = useMemo(() => {
    const totalOrders = orderData.length;
    const totalItems = orderData.reduce(
      (sum, order) => sum + (order.products?.length || 0),
      0
    );
    const totalSpent = orderData.reduce(
      (sum, order) => sum + Number(order.totalPrice || 0),
      0
    );

    return { totalOrders, totalItems, totalSpent };
  }, [orderData]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <>
      <Header />

      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-cyan-500/12 blur-3xl" />
          <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">
                  <FontAwesomeIcon icon={faReceipt} />
                  Order history
                </span>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  A cleaner view of every order you placed.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Review recent purchases, track status at a glance, and open full
                  order details from a more structured, premium interface.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Orders</p>
                  <p className="mt-2 text-3xl font-black text-white">{summary.totalOrders}</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Items</p>
                  <p className="mt-2 text-3xl font-black text-white">{summary.totalItems}</p>
                </div>
                <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Spent</p>
                  <p className="mt-2 text-xl font-black text-white">
                    {formatPrice(summary.totalSpent)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="space-y-4">
              {loading ? (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-10 text-center text-sm text-slate-300 shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  Loading your orders...
                </div>
              ) : orderData.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.05] px-6 py-12 text-center shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-slate-100">
                    <FontAwesomeIcon icon={faBoxOpen} className="text-2xl" />
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-white">No orders found</h2>
                  <p className="mt-2 text-sm text-slate-300">
                    Your completed purchases will appear here once you place an order.
                  </p>
                </div>
              ) : (
                orderData.map((order, i) => (
                  <button
                    key={order.orderID || i}
                    type="button"
                    onClick={() => handleOrderClick(order)}
                    className="group w-full rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 text-left shadow-[0_18px_60px_rgba(0,0,0,0.2)] transition duration-200 hover:border-cyan-300/25 hover:bg-white/[0.08] backdrop-blur-xl"
                  >
                    <div className="grid gap-5 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                      <div className="overflow-hidden rounded-[1.5rem] bg-white p-3">
                        <img
                          className="h-20 w-full object-contain"
                          src={
                            order.products?.[0]?.productId?.product_image ||
                            "https://via.placeholder.com/96"
                          }
                          alt={order.products?.[0]?.productId?.product_name || "Product"}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold text-white">
                            Order #{order.orderID}
                          </h2>
                          <span
                            className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${getStatusTone(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-3 text-sm">
                          <div className="rounded-full bg-white/5 px-3 py-2 text-slate-300">
                            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                            {new Date(order.orderDate).toLocaleString()}
                          </div>
                          <div className="rounded-full bg-white/5 px-3 py-2 text-slate-300">
                            <FontAwesomeIcon icon={faCube} className="mr-2" />
                            {order.products?.length || 0} items
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Total
                        </p>
                        <p className="mt-2 text-2xl font-black text-white">
                          {formatPrice(order.totalPrice || 0)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </section>

            <aside className="space-y-6 lg:sticky lg:top-32 h-fit">
              <div className="rounded-[2rem] bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
                <div className="rounded-[1.95rem] bg-slate-950 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/80">
                    Account snapshot
                  </p>
                  <h2 className="mt-3 text-3xl font-black">{formatPrice(summary.totalSpent)}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Total recorded spending across your current visible order history.
                  </p>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Completed orders</span>
                      <span className="font-semibold text-white">{summary.totalOrders}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Products purchased</span>
                      <span className="font-semibold text-white">{summary.totalItems}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                      <span className="text-slate-300">Support protection</span>
                      <span className="font-semibold text-white">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.15)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  Purchase experience
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">
                  Better clarity across your order timeline
                </h3>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <FontAwesomeIcon icon={faTruckFast} className="mt-0.5 text-cyan-600" />
                    <span>Order cards surface timing, product count, and totals immediately.</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <FontAwesomeIcon icon={faShieldHalved} className="mt-0.5 text-emerald-600" />
                    <span>Detail modal keeps products readable without leaving the page.</span>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 text-violet-600" />
                    <span>The summary panel gives a cleaner overview of order activity.</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-6 sm:px-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  Order details
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Order #{selectedOrder.orderID}
                </h2>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">
                    <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                    {new Date(selectedOrder.orderDate).toLocaleString()}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-2 font-semibold ${getStatusTone(
                      selectedOrder.status
                    )}`}
                  >
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_0.42fr]">
              <div className="space-y-4 max-h-[26rem] overflow-y-auto pr-1">
                {selectedOrder.products?.map((item, index) => (
                  <div
                    key={`${item.productId?._id || index}`}
                    className="flex items-center gap-4 rounded-[1.5rem] bg-slate-50 p-4"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white p-2">
                      <img
                        src={item.productId?.product_image || "https://via.placeholder.com/80"}
                        alt={item.productId?.product_name || "Product"}
                        className="h-16 w-16 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-slate-950">
                        {item.productId?.product_name || "Product"}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Product snapshot from this order
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Price
                      </p>
                      <p className="mt-2 text-lg font-black text-slate-950">
                        {formatPrice(item.productId?.price || 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Order summary
                </p>
                <p className="mt-3 text-3xl font-black">
                  {formatPrice(selectedOrder.totalPrice || 0)}
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <span className="text-slate-300">Items</span>
                    <span className="font-semibold text-white">
                      {selectedOrder.products?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <span className="text-slate-300">Status</span>
                    <span className="font-semibold text-white">{selectedOrder.status}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                    <span className="text-slate-300">Protection</span>
                    <span className="font-semibold text-white">Buyer secured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Orders;
