import React, { useState, useEffect } from "react";
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut, Menu, X, Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SideBarAdDashboard from "./SideBarAdDashboard";

export default function AdminDashboard() {
  // --- logic unchanged ---
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dataDash, setDataDash] = useState([]);
  const [lengthSize, setLengthSize] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDash = async () => {
      try {
        const res = await axios.get("http://localhost:1000/users/DashboardData");
        setDataDash(res.data || []);
        const data2 = res?.data?.filter((item) => item.inStock === false) || [];
        setLengthSize(data2.length);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDash();
  }, []);

  // --- purely presentational / design layer below ---
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar for mobile */}
      <header className="md:hidden bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              aria-label="open menu"
              onClick={() => setMobileNavOpen((s) => !s)}
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
        {/* mobile nav when open */}
        {mobileNavOpen && (
          <nav className="px-4 pb-4">
            <SideBarAdDashboard />
          </nav>
        )}
      </header>

      <div className="md:flex">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block md: bg-white border-r min-h-screen">
          <div className="">
            <SideBarAdDashboard />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold">Welcome, Admin 👋</h1>
                <p className="text-sm text-gray-500 mt-1">Manage inventory, view quick stats, and edit products.</p>
              </div>

              <div className="hidden sm:flex items-center gap-3">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="pl-9 pr-3 py-2 rounded-md border bg-white text-sm shadow-sm focus:outline-none"
                    onChange={(e) => { /* purely UI — keep logic untouched */ }}
                  />
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60"><Search size={16} /></div>
                </div>

                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
                  <PlusCircle size={16} /> Add Product
                </button>
              </div>
            </div>

            {/* stats */}
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

            {/* product list header */}
            <div className="mt-8 flex items-center justify-between">
              <h2 className="text-lg font-medium">Products</h2>
              <p className="text-sm text-gray-500">{loading ? 'Loading...' : `${dataDash.length} total`}</p>
            </div>

            {/* product list - table for md+, cards for small screens */}
            <section className="mt-4">
              {/* desktop/tablet */}
              <div className="hidden md:block bg-white rounded-lg border overflow-hidden shadow-sm">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3">Product</th>
                      <th className="text-left px-4 py-3">Price</th>
                      <th className="text-left px-4 py-3">Quantity</th>
                      <th className="text-left px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={4} className="p-6 text-center text-gray-500">Loading products...</td></tr>
                    ) : (
                      dataDash.map((dat, ind) => (
                        <tr key={ind} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-3">{dat.product_name}</td>
                          <td className="px-4 py-3">₹{dat.price}</td>
                          <td className="px-4 py-3">{dat.quantity}</td>
                          <td className="px-4 py-3">{dat.inStock ? <span className="text-sm text-green-600">In stock</span> : <span className="text-sm text-red-600">Out of stock</span>}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* mobile cards */}
              <div className="md:hidden mt-3 space-y-3">
                {loading ? (
                  <div className="p-4 bg-white rounded-lg border">Loading...</div>
                ) : (
                  dataDash.map((dat, ind) => (
                    <div key={ind} className="p-4 bg-white rounded-lg border shadow-sm flex justify-between items-start">
                      <div>
                        <div className="font-medium">{dat.product_name}</div>
                        <div className="text-xs text-gray-500 mt-1">Qty: {dat.quantity} • ₹{dat.price}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${dat.inStock ? 'text-green-600' : 'text-red-600'}`}>{dat.inStock ? 'In stock' : 'Out'}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* footer actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-sm text-gray-500">Need more detailed reports? Export CSV or connect analytics.</div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border hover:bg-gray-50">Export</button>
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Create product</button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
