import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, BadgeIndianRupee, Boxes, ClipboardList, ImagePlus, PackagePlus } from "lucide-react";
import SideBarAdDashboard from "./SideBarAdDashboard";
import { BASE_URL } from "../../config/config.js";

const initialForm = {
  category: "",
  company_name: "",
  product_name: "",
  mrp: "",
  price: "",
  product_details: "",
  product_image: "",
  rating: "",
  description: "",
  quantity: "",
  inStock: true,
  sku: "",
};

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.users?.accessToken || state.userAuth.token);
  const currentUser = useSelector((state) => state.auth.users?.user);

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [mainImageUploading, setMainImageUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const discount = useMemo(() => {
    const mrp = Number(form.mrp);
    const price = Number(form.price);

    if (!mrp || !price || mrp <= 0 || price <= 0 || price >= mrp) {
      return 0;
    }

    return Math.round(((mrp - price) / mrp) * 100);
  }, [form.mrp, form.price]);

  const stockHint = useMemo(() => {
    if (!form.quantity) {
      return "Quantity will decide how much inventory is available right now.";
    }

    if (Number(form.quantity) === 0) {
      return "This product will be saved with zero quantity.";
    }

    return `${form.quantity} unit(s) ready to publish.`;
  }, [form.quantity]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  }

  function validateForm() {
    if (!form.product_name.trim()) return "Product name is required.";
    if (!form.company_name.trim()) return "Company name is required.";
    if (!form.category.trim()) return "Category is required.";
    if (!form.product_details.trim()) return "Product details are required.";
    if (!form.product_image.trim()) return "Product image URL is required.";
    if (!form.price || Number(form.price) <= 0) return "Enter a valid selling price.";
    if (!form.mrp || Number(form.mrp) <= 0) return "Enter a valid MRP.";
    if (Number(form.price) > Number(form.mrp)) return "Price cannot be greater than MRP.";
    if (form.rating !== "" && (Number(form.rating) < 0 || Number(form.rating) > 5)) {
      return "Rating must stay between 0 and 5.";
    }
    if (form.quantity === "" || Number(form.quantity) < 0) return "Enter a valid quantity.";

    return "";
  }

  async function uploadImagesToCloudinary(files, folder) {
    if (!token) {
      throw new Error("Admin token is missing. Please sign in again.");
    }

    if (!files?.length) {
      return [];
    }

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));
    formData.append("folder", folder);

    const response = await axios.post(`${BASE_URL}/users/admin-upload-images`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data?.images || [];
  }

  async function handleMainImageUpload(event) {
    const files = event.target.files;

    if (!files?.length) {
      return;
    }

    setMainImageUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const uploadedImages = await uploadImagesToCloudinary(
        files,
        "khareedle/admin-products/main-images"
      );

      if (uploadedImages[0]?.url) {
        setForm((current) => ({
          ...current,
          product_image: uploadedImages[0].url,
        }));
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || "Main image upload failed."
      );
    } finally {
      setMainImageUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationMessage = validateForm();
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    if (!token) {
      setErrorMessage("Your admin session is missing. Please sign in again before adding a product.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post(
        `${BASE_URL}/users/uploadpost`,
        {
          category: form.category.trim(),
          company_name: form.company_name.trim(),
          product_name: form.product_name.trim(),
          price: Number(form.price),
          product_details: form.product_details.trim(),
          product_image: form.product_image.trim(),
          rating: form.rating === "" ? 0 : Number(form.rating),
          description: form.description.trim(),
          quantity: Number(form.quantity),
          inStock: Boolean(form.inStock),
          mrp: Number(form.mrp),
          sku: form.sku.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setSuccessMessage("Product added successfully. Redirecting to products...");
      setForm(initialForm);
      setTimeout(() => navigate("/users/adminproducts"), 900);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to add product right now. Please verify the details and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,#f5f7fb_0%,#eef3f7_100%)]">
      <div className="md:flex">
        <aside className="hidden md:sticky md:top-0 md:block md:h-screen md:shrink-0">
          <SideBarAdDashboard />
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/users/admindash")}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-700"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    Catalog Control
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold text-slate-900 md:text-3xl">
                    Add a new product
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    This form matches the backend upload fields in the product controller, so whatever
                    you enter here can be saved directly to inventory.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                Signed in as <span className="font-semibold">{currentUser?.firstname || "Admin"}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.05fr_1.45fr]">
              <section className="space-y-6">
                <div className="rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,#0f172a_0%,#12243c_100%)] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white/10 p-3">
                      <PackagePlus size={22} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Publish preview</h2>
                      <p className="text-sm text-slate-200/80">
                        A quick look at how this product is shaping up before submission.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
                    <div className="flex min-h-[260px] items-center justify-center bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4">
                      {form.product_image ? (
                        <img
                          src={form.product_image}
                          alt={form.product_name || "Product preview"}
                          className="max-h-[220px] w-full rounded-2xl object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-center text-slate-200/80">
                          <ImagePlus size={36} />
                          <span>Paste a product image URL to preview it here.</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 p-5">
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-emerald-300/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                        {mainImageUploading ? "Uploading main image..." : "Pick main product image"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMainImageUpload}
                          className="hidden"
                          disabled={mainImageUploading}
                        />
                      </label>

                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                          {form.category || "Category"}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">
                          {form.product_name || "Product name"}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-200/75">
                          {form.product_details || "Short product details will appear here."}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Selling price</p>
                          <p className="mt-2 text-xl font-semibold">Rs {form.price || "0"}</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Inventory</p>
                          <p className="mt-2 text-xl font-semibold">{form.quantity || "0"} units</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                        {discount > 0
                          ? `${discount}% discount from MRP based on current price.`
                          : "Add both MRP and price to see a discount preview."}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <InfoCard icon={<Boxes size={18} />} label="SKU" value={form.sku || "Not added yet"} />
                  <InfoCard
                    icon={<BadgeIndianRupee size={18} />}
                    label="Stock state"
                    value={form.inStock ? "Available" : "Hidden from stock"}
                  />
                  <InfoCard icon={<ClipboardList size={18} />} label="Quantity note" value={stockHint} />
                </div>
              </section>

              <section className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Product name" required>
                    <input
                      name="product_name"
                      value={form.product_name}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Samsung Galaxy S25 Ultra"
                    />
                  </Field>

                  <Field label="Company name" required>
                    <input
                      name="company_name"
                      value={form.company_name}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Samsung"
                    />
                  </Field>

                  <Field label="Category" required>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Mobiles"
                    />
                  </Field>

                  <Field label="SKU">
                    <input
                      name="sku"
                      value={form.sku}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="SAM-S25U-256"
                    />
                  </Field>

                  <Field label="MRP" required>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="mrp"
                      value={form.mrp}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="149999"
                    />
                  </Field>

                  <Field label="Selling price" required>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="134999"
                    />
                  </Field>

                  <Field label="Quantity" required>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="12"
                    />
                  </Field>

                  <Field label="Rating">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="4.7"
                    />
                  </Field>

                  <div className="md:col-span-2">
                    <Field label="Product details" required>
                      <input
                        name="product_details"
                        value={form.product_details}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="12GB RAM, 256GB storage, Snapdragon chipset"
                      />
                    </Field>
                  </div>

                  <div className="md:col-span-2">
                    <Field label="Product image URL" required>
                      <div className="space-y-3">
                        <input
                          name="product_image"
                          value={form.product_image}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="https://example.com/product-image.jpg"
                        />
                        <label className="inline-flex cursor-pointer items-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          {mainImageUploading ? "Uploading..." : "Upload from device"}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageUpload}
                            className="hidden"
                            disabled={mainImageUploading}
                          />
                        </label>
                      </div>
                    </Field>
                  </div>

                  <div className="md:col-span-2">
                    <Field label="Description">
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className={`${inputClasses} min-h-[132px] resize-y`}
                        placeholder="Write the longer product description shown on the product page."
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">In stock status</p>
                    <p className="text-xs text-slate-500">
                      Toggle whether the product should appear as available immediately.
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={form.inStock}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    {form.inStock ? "In stock" : "Out of stock"}
                  </label>
                </div>

                {(errorMessage || successMessage) && (
                  <div
                    className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
                      errorMessage
                        ? "border border-red-200 bg-red-50 text-red-700"
                        : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {errorMessage || successMessage}
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/users/adminproducts")}
                    className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-2xl bg-[linear-gradient(90deg,#047857_0%,#10b981_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Adding product..." : "Add product"}
                  </button>
                </div>
              </section>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ label, children, required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-800">
        {label} {required ? <span className="text-rose-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-2 text-emerald-700">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{value}</p>
    </div>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";
