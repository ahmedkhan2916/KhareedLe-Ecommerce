import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  PlusCircle,
  Trash2,
  Edit2,
  Download,
  ChevronLeft,
  ChevronRight,
  Box,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBarAdDashboard from "./SideBarAdDashboard";
import { BASE_URL } from "../../config/config.js";

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.users?.accessToken || state.userAuth.token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("name-asc");
  const [editItem, setEditItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [deleteTargets, setDeleteTargets] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/users/DashboardData`);
        if (cancelled) return;
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data.map((p, i) => ({ id: p._id || i, ...p })));
        setCategories(Array.from(new Set(data.map((d) => d.category || "Uncategorized"))));
      } catch (err) {
        console.error("fetch products error", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let out = products.slice();

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (p) =>
          (p.product_name || "").toLowerCase().includes(q) ||
          (p._id || "").toString().includes(q)
      );
    }

    if (categoryFilter !== "All") {
      out = out.filter((p) => (p.category || "Uncategorized") === categoryFilter);
    }

    if (stockFilter === "in") out = out.filter((p) => p.inStock === true);
    if (stockFilter === "out") out = out.filter((p) => p.inStock === false);

    if (sortBy === "name-asc") {
      out.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
    }
    if (sortBy === "name-desc") {
      out.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""));
    }
    if (sortBy === "price-asc") {
      out.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    }
    if (sortBy === "price-desc") {
      out.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }

    return out;
  }, [products, query, categoryFilter, stockFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleSelect(id) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function selectAllOnPage() {
    const next = new Set(selected);
    pageData.forEach((p) => next.add(p.id));
    setSelected(next);
  }

  function clearSelection() {
    setSelected(new Set());
  }

  function exportCSV() {
    const rows = filtered.map((p) => ({
      id: p.id,
      name: p.product_name,
      price: p.price,
      quantity: p.quantity,
      inStock: p.inStock,
      category: p.category,
    }));
    const header = Object.keys(rows[0] || {}).join(",");
    const csv = [
      header,
      ...rows.map((r) =>
        Object.values(r)
          .map((v) => `"${(v ?? "").toString().replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function openDeleteModal(targets) {
    const normalizedTargets = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
    if (normalizedTargets.length === 0) return;
    setDeleteError("");
    setDeleteTargets(normalizedTargets);
  }

  function closeDeleteModal() {
    if (deleteLoading) return;
    setDeleteTargets([]);
    setDeleteError("");
  }

  async function handleDeleteConfirm() {
    if (deleteTargets.length === 0) return;

    if (!token) {
      setDeleteError("Admin token is missing. Please sign in again.");
      return;
    }

    const idsToDelete = deleteTargets.map((item) => item.id);
    const previousProducts = products;
    const previousSelected = new Set(selected);

    setDeleteLoading(true);
    setDeleteError("");

    try {
      setProducts((prev) => prev.filter((p) => !idsToDelete.includes(p.id)));
      setSelected((current) => {
        const next = new Set(current);
        idsToDelete.forEach((id) => next.delete(id));
        return next;
      });

      await Promise.all(
        idsToDelete.map((id) =>
          axios.delete(`${BASE_URL}/users/product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          })
        )
      );

      setDeleteTargets([]);
    } catch (err) {
      console.error(err);
      setProducts(previousProducts);
      setSelected(previousSelected);
      setDeleteError(err.response?.data?.message || "Failed to delete product. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  }

  async function toggleStock(id) {
    try {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
      );
      await axios.patch(`http://localhost:1000/users/product/${id}/toggleStock`);
    } catch (err) {
      console.error(err);
    }
  }

  async function saveEdit(updated) {
    try {
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditItem(null);
      await axios.put(`http://localhost:1000/users/product/${updated.id}`, updated);
    } catch (err) {
      console.error(err);
      alert("Failed to save. Check console.");
    }
  }

  const selectedProducts = products.filter((item) => selected.has(item.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {deleteTargets.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(165deg,rgba(255,255,255,0.98)_0%,rgba(255,246,246,0.96)_60%,rgba(255,255,255,0.98)_100%)] p-7 shadow-[0_32px_90px_rgba(15,23,42,0.3)]">
            <div className="absolute -left-14 top-0 h-36 w-36 rounded-full bg-rose-200/60 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-amber-200/45 blur-3xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#dc2626_0%,#f43f5e_100%)] text-white shadow-[0_18px_36px_rgba(244,63,94,0.28)]">
                  <Trash2 size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-rose-500">
                    Delete Product
                  </p>
                  <h2 className="mt-2 text-[28px] font-semibold leading-tight text-slate-900">
                    {deleteTargets.length === 1
                      ? "Remove this product from your store?"
                      : `Delete ${deleteTargets.length} selected products?`}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {deleteTargets.length === 1 ? (
                      <>
                        This will permanently remove{" "}
                        <span className="font-semibold text-slate-900">
                          {deleteTargets[0].product_name}
                        </span>{" "}
                        from the database.
                      </>
                    ) : (
                      <>
                        These selected products will be permanently removed from the database and the
                        list will update immediately.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-rose-100 bg-white/80 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {deleteTargets.length === 1 ? "Selected Product" : "Selected Products"}
                </p>

                <div className="mt-3 space-y-2">
                  {deleteTargets.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.product_name}</p>
                        <p className="text-xs text-slate-500">ID: {item.id}</p>
                      </div>
                      <div className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                        Delete
                      </div>
                    </div>
                  ))}

                  {deleteTargets.length > 3 && (
                    <p className="text-sm text-slate-500">
                      + {deleteTargets.length - 3} more selected products
                    </p>
                  )}
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
                  disabled={deleteLoading}
                  className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  No, keep product
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading}
                  className="rounded-2xl bg-[linear-gradient(135deg,#dc2626_0%,#f43f5e_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(244,63,94,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(244,63,94,0.34)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {deleteLoading ? "Deleting..." : "Yes, delete now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:flex">
        <aside className="hidden md:sticky md:top-0 md:block md:h-screen md:shrink-0">
          <SideBarAdDashboard />
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Products</h1>
                <p className="text-sm text-gray-500">
                  Manage your store products, search, filter, edit, and export.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search product name or id"
                    className="w-64 rounded-md border bg-white py-2 pl-10 pr-3 text-sm shadow-sm"
                  />
                </div>

                <button
                  onClick={() => navigate("/users/adminadd")}
                  className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white shadow hover:bg-green-700"
                >
                  <PlusCircle /> Add
                </button>

                <button
                  onClick={exportCSV}
                  className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 shadow hover:bg-gray-50"
                >
                  <Download /> Export
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-sm">
                <Filter />
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent text-sm outline-none"
                >
                  <option>All</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 rounded-md bg-white p-2 shadow-sm">
                <select
                  value={stockFilter}
                  onChange={(e) => {
                    setStockFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent text-sm outline-none"
                >
                  <option value="All">All stock</option>
                  <option value="in">In stock</option>
                  <option value="out">Out of stock</option>
                </select>
              </div>

              <div className="ml-auto flex items-center gap-2 rounded-md bg-white p-2 shadow-sm">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm outline-none"
                >
                  <option value="name-asc">Name Asc</option>
                  <option value="name-desc">Name Desc</option>
                  <option value="price-asc">Price Low-High</option>
                  <option value="price-desc">Price High-Low</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex items-center gap-2">
                <button onClick={selectAllOnPage} className="rounded-md border bg-white px-3 py-2">
                  Select page
                </button>
                <button
                  onClick={() => openDeleteModal(selectedProducts)}
                  disabled={selectedProducts.length === 0}
                  className="rounded-md bg-red-600 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Delete selected
                </button>
                <div className="text-sm text-gray-500">{selected.size} selected</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="text-sm text-gray-500">Per page</span>
                  <select
                    value={perPage}
                    onChange={(e) => {
                      setPerPage(Number(e.target.value));
                      setPage(1);
                    }}
                    className="rounded-md border px-2 py-1"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <div className="inline-flex items-center gap-2 rounded-md border bg-white p-1">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                    <ChevronLeft />
                  </button>
                  <div className="px-3">
                    {page} / {totalPages}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="hidden overflow-x-auto rounded-lg border bg-white shadow-sm md:block">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => (e.target.checked ? selectAllOnPage() : clearSelection())}
                          checked={pageData.every((p) => selected.has(p.id)) && pageData.length > 0}
                        />
                      </th>
                      <th className="p-3 text-left">Product</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : pageData.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center">
                          No products match your filters.
                        </td>
                      </tr>
                    ) : (
                      pageData.map((p) => (
                        <tr key={p.id} className="border-t hover:bg-gray-50">
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={selected.has(p.id)}
                              onChange={() => toggleSelect(p.id)}
                            />
                          </td>
                          <td className="flex items-center gap-3 p-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                              {p.images?.[0] ? (
                                <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                              ) : (
                                <Box />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{p.product_name}</div>
                              <div className="text-xs text-gray-500">ID: {p.id}</div>
                            </div>
                          </td>
                          <td className="p-3">{p.category || "Uncategorized"}</td>
                          <td className="p-3">Rs {p.price}</td>
                          <td className="p-3">{p.quantity}</td>
                          <td className="p-3">
                            {p.inStock ? (
                              <span className="text-green-600">In stock</span>
                            ) : (
                              <span className="text-red-600">Out</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => setEditItem(p)}
                                className="rounded-md border bg-white px-3 py-1"
                              >
                                <Edit2 size={14} /> Edit
                              </button>
                              <button
                                onClick={() => openDeleteModal(p)}
                                className="rounded-md bg-red-600 px-3 py-1 text-white"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                              <button
                                onClick={() => toggleStock(p.id)}
                                className="rounded-md bg-gray-100 px-3 py-1"
                              >
                                Toggle stock
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 space-y-3 md:hidden">
                {loading ? (
                  <div className="rounded-md bg-white p-4">Loading...</div>
                ) : pageData.length === 0 ? (
                  <div className="rounded-md bg-white p-4 text-center">No products</div>
                ) : (
                  pageData.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-start justify-between rounded-md border bg-white p-4 shadow-sm"
                    >
                      <div className="flex gap-3">
                        <div className="h-14 w-14 overflow-hidden rounded-md bg-gray-100">
                          {p.images?.[0] ? (
                            <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <Box />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{p.product_name}</div>
                          <div className="text-xs text-gray-500">Rs {p.price}</div>
                          <div className="text-xs text-gray-500">Qty: {p.quantity}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div
                          className={`text-sm font-medium ${
                            p.inStock ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {p.inStock ? "In" : "Out"}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditItem(p)}
                            className="rounded-md border bg-white px-2 py-1 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(p)}
                            className="rounded-md bg-red-600 px-2 py-1 text-xs text-white"
                          >
                            Delete
                          </button>
                        </div>
                        <input
                          type="checkbox"
                          checked={selected.has(p.id)}
                          onChange={() => toggleSelect(p.id)}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} of{" "}
                {filtered.length} products
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-md border px-3 py-1"
                >
                  <ChevronLeft />
                </button>
                <div className="px-3">{page}</div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-md border px-3 py-1"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {editItem !== null && (
        <EditModal item={editItem} onClose={() => setEditItem(null)} onSave={saveEdit} />
      )}
    </div>
  );
}

function EditModal({ item, onClose, onSave }) {
  const [state, setState] = useState(item || {});

  useEffect(() => setState(item || {}), [item]);

  function handleChange(e) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-xl rounded-lg bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{item && item.id ? "Edit Product" : "Add Product"}</h3>
          <button onClick={onClose} className="text-gray-500">
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="text-sm">
            Name
            <input
              name="product_name"
              value={state.product_name || ""}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            />
          </label>
          <label className="text-sm">
            Price
            <input
              name="price"
              value={state.price || ""}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            />
          </label>
          <label className="text-sm">
            Quantity
            <input
              name="quantity"
              value={state.quantity || ""}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            />
          </label>
          <label className="text-sm">
            Category
            <input
              name="category"
              value={state.category || ""}
              onChange={handleChange}
              className="w-full rounded-md border p-2"
            />
          </label>
          <label className="text-sm md:col-span-2">
            Description
            <textarea
              name="description"
              value={state.description || ""}
              onChange={handleChange}
              className="h-24 w-full rounded-md border p-2"
            />
          </label>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-md border px-4 py-2">
            Cancel
          </button>
          <button onClick={() => onSave(state)} className="rounded-md bg-green-600 px-4 py-2 text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
