import React, { useEffect, useState } from "react";
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut, Menu, X, Search, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarAdDashboard from "./SideBarAdDashboard";
import { BASE_URL } from "../../config/config.js";

export default function AdminDashboard() {
  const token = useSelector((state) => state.auth.users?.accessToken || state.userAuth.token);
  const [dataDash, setDataDash] = useState([]);
  const [lengthSize, setLengthSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    productId: "",
    colors: [{ color: "", imageText: "" }],
  });
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [colorUploadIndex, setColorUploadIndex] = useState(null);
  const [galleryMessage, setGalleryMessage] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDash = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/DashboardData`);
        const dashboardData = Array.isArray(res.data) ? res.data : [];

        setDataDash(dashboardData);
        setLengthSize(dashboardData.filter((item) => item.inStock === false).length);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDash();
  }, []);

  function handleGalleryFieldChange(index, field, value) {
    setGalleryForm((current) => ({
      ...current,
      colors: current.colors.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      ),
    }));
    setGalleryMessage("");
    setGalleryError("");
  }

  function addColorBlock() {
    setGalleryForm((current) => ({
      ...current,
      colors: [...current.colors, { color: "", imageText: "" }],
    }));
  }

  function removeColorBlock(index) {
    setGalleryForm((current) => ({
      ...current,
      colors: current.colors.filter((_, itemIndex) => itemIndex !== index),
    }));
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

  async function handleColorImageUpload(index, event) {
    const files = event.target.files;

    if (!files?.length) {
      return;
    }

    setColorUploadIndex(index);
    setGalleryMessage("");
    setGalleryError("");

    try {
      const uploadedImages = await uploadImagesToCloudinary(
        files,
        "khareedle/admin-products/color-gallery"
      );

      const uploadedText = uploadedImages.map((item) => item.url).join("\n");

      setGalleryForm((current) => ({
        ...current,
        colors: current.colors.map((item, itemIndex) => {
          if (itemIndex !== index) {
            return item;
          }

          const nextText = item.imageText
            ? `${item.imageText.trim()}\n${uploadedText}`
            : uploadedText;

          return { ...item, imageText: nextText };
        }),
      }));
    } catch (error) {
      setGalleryError(
        error.response?.data?.message || error.message || "Color image upload failed."
      );
    } finally {
      setColorUploadIndex(null);
      event.target.value = "";
    }
  }

  async function handleGallerySubmit(event) {
    event.preventDefault();

    if (!galleryForm.productId.trim()) {
      setGalleryError("Product ID is required before saving color images.");
      return;
    }

    if (!token) {
      setGalleryError("Admin token is missing. Please sign in again.");
      return;
    }

    const payloadColors = galleryForm.colors
      .map((item) => ({
        color: item.color.trim(),
        image_urls: item.imageText
          .split(/\r?\n/)
          .map((url) => url.trim())
          .filter(Boolean),
      }))
      .filter((item) => item.color && item.image_urls.length > 0);

    if (payloadColors.length === 0) {
      setGalleryError("Add at least one color and one image URL.");
      return;
    }

    setGalleryLoading(true);
    setGalleryMessage("");
    setGalleryError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/users/updateproductimage`,
        {
          productId: galleryForm.productId.trim(),
          product_color: payloadColors,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setGalleryMessage(response.data?.message || "Product image gallery updated successfully.");
      setGalleryForm({
        productId: galleryForm.productId,
        colors: [{ color: "", imageText: "" }],
      });
    } catch (error) {
      setGalleryError(
        error.response?.data?.message || "Unable to update product images right now."
      );
    } finally {
      setGalleryLoading(false);
    }
  }

  function openDeleteModal(product) {
    if (!product?._id) {
      return;
    }

    setDeleteError("");
    setProductToDelete(product);
  }

  function closeDeleteModal() {
    if (deleteLoadingId) {
      return;
    }

    setProductToDelete(null);
    setDeleteError("");
  }

  async function handleDeleteProduct() {
    if (!productToDelete?._id) {
      return;
    }

    const productId = productToDelete._id;

    if (!token) {
      setDeleteError("Admin token is missing. Please sign in again.");
      return;
    }

    setDeleteLoadingId(productId);
    setDeleteError("");

    try {
      await axios.delete(`${BASE_URL}/users/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setDataDash((current) => {
        const updatedProducts = current.filter((item) => item._id !== productId);
        setLengthSize(updatedProducts.filter((item) => item.inStock === false).length);
        return updatedProducts;
      });
      setProductToDelete(null);
    } catch (error) {
      setDeleteError(error.response?.data?.message || "Failed to delete product.");
    } finally {
      setDeleteLoadingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.98)_0%,rgba(255,247,247,0.96)_55%,rgba(255,255,255,0.98)_100%)] p-7 shadow-[0_28px_80px_rgba(15,23,42,0.28)]">
            <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-rose-200/55 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-orange-200/50 blur-3xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ef4444_0%,#fb7185_100%)] text-white shadow-[0_18px_36px_rgba(244,63,94,0.28)]">
                  <Trash2 size={24} />
                </div>

                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-rose-500">
                    Delete Product
                  </p>
                  <h2 className="mt-2 text-[28px] font-semibold leading-tight text-slate-900">
                    Remove this product from your store?
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    This action will permanently remove{" "}
                    <span className="font-semibold text-slate-900">{productToDelete.product_name}</span>{" "}
                    from the database and update the admin dashboard instantly.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-rose-100 bg-white/75 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Selected Product
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900">
                      {productToDelete.product_name}
                    </p>
                  </div>
                  <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                    Permanent delete
                  </div>
                </div>
              </div>

              {deleteError && (
                <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50/95 px-4 py-3 text-sm text-rose-700">
                  {deleteError}
                </div>
              )}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={deleteLoadingId === productToDelete._id}
                  className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  No, keep product
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProduct}
                  disabled={deleteLoadingId === productToDelete._id}
                  className="rounded-2xl bg-[linear-gradient(135deg,#dc2626_0%,#f43f5e_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(244,63,94,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(244,63,94,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {deleteLoadingId === productToDelete._id ? "Deleting product..." : "Yes, delete now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="md:hidden bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              aria-label="open menu"
              onClick={() => setMobileNavOpen((value) => !value)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="text-lg font-semibold">Admin</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Settings size={18} />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <LogOut size={18} />
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <nav className="px-4 pb-4">
            <SideBarAdDashboard />
          </nav>
        )}
      </header>

      <div className="md:flex">
        <aside className="hidden md:sticky md:top-0 md:block md:h-screen md:shrink-0">
          <SideBarAdDashboard />
        </aside>

        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Welcome, Admin</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Manage inventory, view quick stats, and jump straight into product creation.
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="pl-9 pr-3 py-2 rounded-md border bg-white text-sm shadow-sm focus:outline-none"
                    onChange={() => {}}
                  />
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60">
                    <Search size={16} />
                  </div>
                </div>

                <button
                  onClick={() => navigate("/users/adminadd")}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
                >
                  <PlusCircle size={16} /> Add Product
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Products</p>
                    <p className="text-xl font-semibold mt-1">{loading ? "..." : dataDash.length}</p>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">
                    <Package size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Out of Stock</p>
                    <p className="text-xl font-semibold mt-1 text-red-600">{loading ? "..." : lengthSize}</p>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">
                    <Package size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Orders</p>
                    <p className="text-xl font-semibold mt-1 text-green-600">256</p>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">
                    <LayoutDashboard size={20} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Users</p>
                    <p className="text-xl font-semibold mt-1 text-blue-600">1,023</p>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">
                    <Settings size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <h2 className="text-lg font-medium">Products</h2>
              <p className="text-sm text-gray-500">{loading ? "Loading..." : `${dataDash.length} total`}</p>
            </div>

            <section className="mt-6 rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    Product Gallery
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">
                    Add more product images by color
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Enter the product ID, then create one or more color sections. You can upload files
                    from device or paste image URLs manually. Each URL should stay on its own line.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addColorBlock}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Add color block
                </button>
              </div>

              <form onSubmit={handleGallerySubmit} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Product ID</label>
                  <input
                    value={galleryForm.productId}
                    onChange={(event) => {
                      setGalleryForm((current) => ({ ...current, productId: event.target.value }));
                      setGalleryMessage("");
                      setGalleryError("");
                    }}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                    placeholder="Paste Mongo product ID"
                  />
                </div>

                <div className="space-y-4">
                  {galleryForm.colors.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-slate-800">Color block {index + 1}</h3>
                        {galleryForm.colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeColorBlock(index)}
                            className="text-sm font-medium text-rose-600 hover:text-rose-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-[220px_1fr]">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-800">Color name</label>
                          <input
                            value={item.color}
                            onChange={(event) => handleGalleryFieldChange(index, "color", event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                            placeholder="Black"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-800">
                            Image URLs
                          </label>
                          <div className="space-y-3">
                            <textarea
                              value={item.imageText}
                              onChange={(event) => handleGalleryFieldChange(index, "imageText", event.target.value)}
                              className="min-h-[150px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                              placeholder={"https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg"}
                            />
                            <label className="inline-flex cursor-pointer items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                              {colorUploadIndex === index ? "Uploading images..." : "Upload images from device"}
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(event) => handleColorImageUpload(index, event)}
                                className="hidden"
                                disabled={colorUploadIndex === index}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {(galleryError || galleryMessage) && (
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      galleryError
                        ? "border border-red-200 bg-red-50 text-red-700"
                        : "border border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {galleryError || galleryMessage}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={galleryLoading}
                    className="rounded-2xl bg-[linear-gradient(90deg,#047857_0%,#10b981_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(16,185,129,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {galleryLoading ? "Saving gallery..." : "Save color images"}
                  </button>
                </div>
              </form>
            </section>

            <section className="mt-4">
              <div className="hidden md:block bg-white rounded-lg border overflow-hidden shadow-sm">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3">Product</th>
                      <th className="text-left px-4 py-3">Price</th>
                      <th className="text-left px-4 py-3">Quantity</th>
                      <th className="text-left px-4 py-3">Status</th>
                      <th className="text-left px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-gray-500">
                          Loading products...
                        </td>
                      </tr>
                    ) : (
                      dataDash.map((dat, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3">{dat.product_name}</td>
                          <td className="px-4 py-3">Rs {dat.price}</td>
                          <td className="px-4 py-3">{dat.quantity}</td>
                          <td className="px-4 py-3">
                            {dat.inStock ? (
                              <span className="text-sm text-green-600">In stock</span>
                            ) : (
                              <span className="text-sm text-red-600">Out of stock</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => openDeleteModal(dat)}
                              disabled={deleteLoadingId === dat._id}
                              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              <Trash2 size={14} />
                              {deleteLoadingId === dat._id ? "Deleting..." : "Delete"}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden mt-3 space-y-3">
                {loading ? (
                  <div className="p-4 bg-white rounded-lg border">Loading...</div>
                ) : (
                  dataDash.map((dat, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border shadow-sm flex justify-between items-start"
                    >
                      <div>
                        <div className="font-medium">{dat.product_name}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Qty: {dat.quantity} | Rs {dat.price}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${dat.inStock ? "text-green-600" : "text-red-600"}`}>
                          {dat.inStock ? "In stock" : "Out"}
                        </div>
                        <button
                          onClick={() => openDeleteModal(dat)}
                          disabled={deleteLoadingId === dat._id}
                          className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <Trash2 size={12} />
                          {deleteLoadingId === dat._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-sm text-gray-500">
                Need more detailed reports? Export CSV or connect analytics.
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border hover:bg-gray-50">Export</button>
                <button
                  onClick={() => navigate("/users/adminadd")}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create product
                </button>
              </div>
            </div>
            </div>
          </main>
        </div>
    </div>
  );
}
