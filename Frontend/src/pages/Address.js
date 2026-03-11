import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHouse,
  faLocationDot,
  faMapLocationDot,
  faPhone,
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/HeaderChange.js";
import Map from "./Map.js";
import Footer from "../components/Footer.js";
import { fetchID } from "../Services/apiService.js";
import { BASE_URL } from "../config/config.js";

const fieldClassName =
  "h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100";

function Address() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userAuth);

  const [address, setAddress] = useState(localStorage.getItem("UserAddress") || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    type: "shipping",
    street: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    locality: "",
    alternate: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const updatedAddressFunction = () => {
      const comingAddress = localStorage.getItem("UserAddress");
      if (comingAddress !== address) {
        setAddress(comingAddress || "");
      }
    };

    window.addEventListener("storage", updatedAddressFunction);

    return () => {
      window.removeEventListener("storage", updatedAddressFunction);
    };
  }, [address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressForm = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const userId = await fetchID(token);

      await axios.post(`${BASE_URL}/users/addressadd`, {
        ...formData,
        userId,
      });

      navigate("/users/ferris");
    } catch (error) {
      console.log("Address submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationReady = useMemo(
    () => Boolean(formData.street || formData.city || formData.state || formData.pincode),
    [formData]
  );

  return (
    <>
      <Header />

      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-emerald-500/12 blur-3xl" />
          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-cyan-500/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl space-y-6">
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] px-6 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
                  <FontAwesomeIcon icon={faLocationDot} />
                  Delivery address
                </span>
                <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  Add the address where this order should arrive.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Pick a location on the map, review the auto-filled details, and save
                  the final address before the reward and payment steps.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Type</p>
                  <p className="mt-2 text-xl font-black text-white capitalize">
                    {formData.type}
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Geo linked
                  </p>
                  <p className="mt-2 text-xl font-black text-white">
                    {locationReady ? "Yes" : "Pending"}
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white/8 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Next step</p>
                  <p className="mt-2 text-xl font-black text-emerald-300">Spin reward</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <div className="border-b border-white/10 px-6 py-6 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">
                      Location picker
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-white">
                      Choose address on map
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
                    <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" />
                    Live pin selection
                  </div>
                </div>
              </div>

              <div className="h-[420px] sm:h-[520px]">
                <Map
                  onLocationSelect={(addressData) => {
                    setFormData((prev) => ({
                      ...prev,
                      street: addressData.street,
                      city: addressData.city,
                      state: addressData.state,
                      pincode: addressData.pincode,
                      locality: addressData.locality,
                      latitude: addressData.latitude,
                      longitude: addressData.longitude,
                    }));
                  }}
                />
              </div>

              <div className="border-t border-white/10 px-6 py-5 sm:px-8">
                <div className="flex flex-wrap items-start gap-3 rounded-[1.5rem] bg-white/5 px-4 py-4 text-sm text-slate-200">
                  <FontAwesomeIcon icon={faStar} className="mt-0.5 text-emerald-300" />
                  <span>
                    Selected location details from the map are used to prefill the form
                    fields automatically.
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200/70 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.15)] sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Address form
                  </p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                    Confirm delivery details
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    Fill the remaining details, verify contact information, and save
                    the address for checkout.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-emerald-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Address type
                  </p>
                  <p className="mt-1 text-lg font-black capitalize text-emerald-950">
                    {formData.type}
                  </p>
                </div>
              </div>

              <form className="mt-8 space-y-8" onSubmit={handleAddressForm}>
                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <FontAwesomeIcon icon={faHouse} />
                    Contact and address basics
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      placeholder="Full Name"
                      className={fieldClassName}
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                    <input
                      placeholder="Phone Number"
                      className={fieldClassName}
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                    />

                    <input
                      placeholder="Pincode"
                      className={fieldClassName}
                      name="pincode"
                      onChange={handleChange}
                      value={formData.pincode}
                    />
                    <input
                      placeholder="Locality"
                      className={fieldClassName}
                      name="locality"
                      onChange={handleChange}
                      value={formData.locality}
                    />

                    <input
                      placeholder="Street"
                      className={fieldClassName}
                      name="street"
                      onChange={handleChange}
                      value={formData.street}
                    />
                    <input
                      placeholder="City / District / Town"
                      className={fieldClassName}
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                    />

                    <input
                      placeholder="State"
                      className={fieldClassName}
                      name="state"
                      onChange={handleChange}
                      value={formData.state}
                    />
                    <input
                      placeholder="Landmark"
                      className={fieldClassName}
                      name="landmark"
                      onChange={handleChange}
                      value={formData.landmark}
                    />

                    <div className="sm:col-span-2">
                      <input
                        placeholder="Alternate Phone"
                        className={fieldClassName}
                        name="alternate"
                        onChange={handleChange}
                        value={formData.alternate}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <FontAwesomeIcon icon={faPhone} />
                    Address usage
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        key: "shipping",
                        title: "Shipping address",
                        text: "Use this address for delivery and fulfillment.",
                      },
                      {
                        key: "billing",
                        title: "Billing address",
                        text: "Use this address for invoice and payment records.",
                      },
                    ].map((option) => {
                      const active = formData.type === option.key;

                      return (
                        <label
                          key={option.key}
                          className={`cursor-pointer rounded-[1.5rem] border p-4 transition ${
                            active
                              ? "border-emerald-500 bg-emerald-50 shadow-[0_12px_35px_rgba(16,185,129,0.12)]"
                              : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="radio"
                              checked={active}
                              onChange={(e) =>
                                setFormData({ ...formData, type: e.target.value })
                              }
                              name="type"
                              value={option.key}
                              className="mt-1"
                            />
                            <div>
                              <p className="text-base font-bold text-slate-950">
                                {option.title}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-slate-500">
                                {option.text}
                              </p>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Delivery preview
                      </p>
                      <p className="mt-3 text-xl font-black">
                        {locationReady ? "Address linked with location" : "Waiting for location details"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                        <FontAwesomeIcon icon={faTruckFast} />
                        Fast delivery
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                        <FontAwesomeIcon icon={faShieldHalved} />
                        Verified flow
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-slate-200">
                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 text-emerald-300" />
                      <span>Map data prefills your key address fields for fewer manual edits.</span>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 text-emerald-300" />
                      <span>Saved address moves directly into the reward spin and payment flow.</span>
                    </div>
                  </div>
                </div>

                <button
                  className="flex w-full items-center justify-center rounded-[1.5rem] bg-emerald-600 px-6 py-4 text-lg font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving address..." : "Save Address and Continue"}
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Address;
