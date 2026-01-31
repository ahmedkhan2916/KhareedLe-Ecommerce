import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, PlusCircle, Trash2, Edit2, Download, ChevronLeft, ChevronRight, Box, Filter } from "lucide-react";
import SideBarAdDashboard from "./SideBarAdDashboard";

// AdminProductsPage - fully responsive product management UI (Tailwind CSS)
// - Features: fetch products, search, filters, sort, pagination, bulk select, export CSV, edit/delete, responsive cards/table

export default function AdminProductsPage() {
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

  // fetch products
  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:1000/users/DashboardData");
        if (cancelled) return;
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(data.map((p, i) => ({ id: p._id || i, ...p })));
        const cats = Array.from(new Set(data.map((d) => d.category || "Uncategorized")));
        setCategories(cats);
      } catch (err) {
        console.error("fetch products error", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => (cancelled = true);
  }, []);

  // derived filtered + sorted list
  const filtered = useMemo(() => {
    let out = products.slice();
    // search
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((p) => (p.product_name || "").toLowerCase().includes(q) || (p._id || "").toString().includes(q));
    }
    // category
    if (categoryFilter !== "All") out = out.filter((p) => (p.category || "Uncategorized") === categoryFilter);
    // stock
    if (stockFilter === "in") out = out.filter((p) => p.inStock === true);
    if (stockFilter === "out") out = out.filter((p) => p.inStock === false);

    // sort
    if (sortBy === "name-asc") out.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
    if (sortBy === "name-desc") out.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""));
    if (sortBy === "price-asc") out.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    if (sortBy === "price-desc") out.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));

    return out;
  }, [products, query, categoryFilter, stockFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);

  // selection handling
  function toggleSelect(id) {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id);
    else s.add(id);
    setSelected(s);
  }
  function selectAllOnPage() {
    const s = new Set(selected);
    pageData.forEach((p) => s.add(p.id));
    setSelected(s);
  }
  function clearSelection() {
    setSelected(new Set());
  }

  // export CSV (client-side)
  function exportCSV() {
    const rows = filtered.map((p) => ({ id: p.id, name: p.product_name, price: p.price, quantity: p.quantity, inStock: p.inStock, category: p.category }));
    const header = Object.keys(rows[0] || {}).join(",");
    const csv = [header, ...rows.map((r) => Object.values(r).map((v) => `"${(v ?? "").toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `products_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // delete product
  async function handleDelete(id) {
    // if (!confirm("Delete this product?")) return;
    try {
      // optimistic UI
      setProducts((prev) => prev.filter((p) => p.id !== id));
      await axios.delete(`http://localhost:1000/users/product/${id}`);
      setSelected((s) => { const n = new Set(s); n.delete(id); return n; });
    } catch (err) {
      console.error(err);
      alert("Failed to delete — refresh and try again.");
    }
  }

  // toggle stock
  async function toggleStock(id) {
    try {
      setProducts((prev) => prev.map((p) => p.id === id ? { ...p, inStock: !p.inStock } : p));
      await axios.patch(`http://localhost:1000/users/product/${id}/toggleStock`);
    } catch (err) {
      console.error(err);
    }
  }

  // update product (from modal)
  async function saveEdit(updated) {
    try {
      setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
      setEditItem(null);
      // send to server (endpoint assumed)
      await axios.put(`http://localhost:1000/users/product/${updated.id}`, updated);
    } catch (err) {
      console.error(err);
      alert("Failed to save. Check console.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:flex">
        <aside className="hidden md:block md: bg-gradient-to-b from-emerald-900 to-emerald-800 text-white min-h-screen">
          <div className="">
            <SideBarAdDashboard />
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Products</h1>
                <p className="text-sm text-gray-500">Manage your store products — search, filter, edit, export.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search product name or id" className="pl-10 pr-3 py-2 rounded-md border bg-white text-sm shadow-sm w-64" />
                </div>

                <button onClick={() => setEditItem({})} className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"><PlusCircle /> Add</button>

                <button onClick={exportCSV} className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-md border shadow hover:bg-gray-50"><Download /> Export</button>
              </div>
            </div>

            {/* filters */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm">
                <Filter />
                <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }} className="text-sm bg-transparent outline-none">
                  <option>All</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm">
                <select value={stockFilter} onChange={(e) => { setStockFilter(e.target.value); setPage(1); }} className="text-sm bg-transparent outline-none">
                  <option value="All">All stock</option>
                  <option value="in">In stock</option>
                  <option value="out">Out of stock</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm ml-auto">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm bg-transparent outline-none">
                  <option value="name-asc">Name ↑</option>
                  <option value="name-desc">Name ↓</option>
                  <option value="price-asc">Price ↑</option>
                  <option value="price-desc">Price ↓</option>
                </select>
              </div>
            </div>

            {/* bulk actions + pagination controls top */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
              <div className="flex items-center gap-2">
                <button onClick={selectAllOnPage} className="px-3 py-2 rounded-md bg-white border">Select page</button>
                <button onClick={() => { Array.from(selected).forEach((id) => handleDelete(id)); clearSelection(); }} className="px-3 py-2 rounded-md bg-red-600 text-white">Delete selected</button>
                <div className="text-sm text-gray-500">{selected.size} selected</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-gray-500">Per page</span>
                  <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="px-2 py-1 border rounded-md">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <div className="inline-flex items-center gap-2 bg-white p-1 rounded-md border">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft /></button>
                  <div className="px-3">{page} / {totalPages}</div>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight /></button>
                </div>
              </div>
            </div>
            
            {/* table for md+ */}
            <div className="mt-4">
              <div className="hidden md:block bg-white rounded-lg border shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left"> <input type="checkbox" onChange={(e) => e.target.checked ? selectAllOnPage() : clearSelection()} checked={pageData.every(p=>selected.has(p.id)) && pageData.length>0} /> </th>
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
                      <tr><td colSpan={7} className="p-6 text-center">Loading...</td></tr>
                    ) : pageData.length === 0 ? (
                      <tr><td colSpan={7} className="p-6 text-center">No products match your filters.</td></tr>
                    ) : (
                      pageData.map((p) => (
                        <tr key={p.id} className="border-t hover:bg-gray-50">
                          <td className="p-3"><input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                          <td className="p-3 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                              {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <Box />}
                            </div>
                            <div>
                              <div className="font-medium">{p.product_name}</div>
                              <div className="text-xs text-gray-500">ID: {p.id}</div>
                            </div>
                          </td>
                          <td className="p-3">{p.category || 'Uncategorized'}</td>
                          <td className="p-3">₹{p.price}</td>
                          <td className="p-3">{p.quantity}</td>
                          <td className="p-3">{p.inStock ? <span className="text-green-600">In stock</span> : <span className="text-red-600">Out</span>}</td>
                          <td className="p-3 text-right">
                            <div className="inline-flex gap-2">
                              <button onClick={() => setEditItem(p)} className="px-3 py-1 rounded-md bg-white border"><Edit2 size={14}/> Edit</button>
                              <button onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded-md bg-red-600 text-white"><Trash2 size={14}/> Delete</button>
                              <button onClick={() => toggleStock(p.id)} className="px-3 py-1 rounded-md bg-gray-100">Toggle stock</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* mobile cards */}
              <div className="md:hidden mt-3 space-y-3">
                {loading ? (
                  <div className="p-4 bg-white rounded-md">Loading...</div>
                ) : pageData.length === 0 ? (
                  <div className="p-4 bg-white rounded-md text-center">No products</div>
                ) : (
                  pageData.map((p) => (
                    <div key={p.id} className="p-4 bg-white rounded-md border shadow-sm flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden">{p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <Box />}</div>
                        <div>
                          <div className="font-medium">{p.product_name}</div>
                          <div className="text-xs text-gray-500">₹{p.price}</div>
                          <div className="text-xs text-gray-500">Qty: {p.quantity}</div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 items-end">
                        <div className={`text-sm font-medium ${p.inStock ? 'text-green-600' : 'text-red-600'}`}>{p.inStock ? 'In' : 'Out'}</div>
                        <div className="flex gap-2">
                          <button onClick={() => setEditItem(p)} className="px-2 py-1 rounded-md bg-white border text-xs">Edit</button>
                          <button onClick={() => handleDelete(p.id)} className="px-2 py-1 rounded-md bg-red-600 text-white text-xs">Delete</button>
                        </div>
                        <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* bottom pagination controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">Showing {(page-1)*perPage + 1} - {Math.min(page*perPage, filtered.length)} of {filtered.length} products</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded-md border"><ChevronLeft /></button>
                <div className="px-3">{page}</div>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded-md border"><ChevronRight /></button>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Edit Modal (simple) */}
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{item && item.id ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm">Name <input name="product_name" value={state.product_name || ''} onChange={handleChange} className="w-full border p-2 rounded-md"/></label>
          <label className="text-sm">Price <input name="price" value={state.price || ''} onChange={handleChange} className="w-full border p-2 rounded-md"/></label>
          <label className="text-sm">Quantity <input name="quantity" value={state.quantity || ''} onChange={handleChange} className="w-full border p-2 rounded-md"/></label>
          <label className="text-sm">Category <input name="category" value={state.category || ''} onChange={handleChange} className="w-full border p-2 rounded-md"/></label>
          <label className="text-sm col-span-1 md:col-span-2">Description <textarea name="description" value={state.description || ''} onChange={handleChange} className="w-full border p-2 rounded-md h-24"/></label>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
          <button onClick={() => onSave(state)} className="px-4 py-2 rounded-md bg-green-600 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
