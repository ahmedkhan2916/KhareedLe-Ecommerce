import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  clearBag,
  fetchBagTotal2,
  fetchUserID,
  logout,
  logoutAccessTK,
  refreshToken,
  setProducts,
  setTotalBagNull,
  userIDNULL,
} from "../store/dataSlice.js";
import Search from "../assets/images/Search.png";
import cart from "../assets/images/HeaderLogos/cart.png";
import XArenaLogo from "../assets/images/HeaderLogos/arena3.png";
import { fetchSearchItems } from "../Services/apiService.js";
import { BASE_URL } from "../config/config.js";

const desktopNavItems = [
  "Electronics",
  "Clothing",
  "Home Decor",
  "Kitchenware",
  "Books",
  "Gaming",
];

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.userAuth);
  const { UserID } = useSelector((state) => state.fetchID);
  const { totalBag } = useSelector((state) => state.fetchBagTotalStore);
  const reduxUsername = useSelector((state) => state.username.username);
  const authUser = useSelector((state) => state.auth.users?.user);

  const username =
    reduxUsername ||
    authUser?.name ||
    localStorage.getItem("username") ||
    "";

  const [searchQuery, setSearchQuery] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserID(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (UserID && token) {
      dispatch(fetchBagTotal2({ ID: UserID }));
    }
  }, [dispatch, UserID, token]);

  const hasSearchResults = Array.isArray(searchQuery) && searchQuery.length > 0;

  const handleSearchInput = async (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (!inputValue.trim()) {
      dispatch(setProducts({}));
      setSearchQuery([]);
      return;
    }

    const searchedQuery = await fetchSearchItems(inputValue);
    const searchedItems = searchedQuery?.data?.searchedItems || [];

    setSearchQuery(searchedItems);
    dispatch(setProducts(searchedItems));
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchQuery([]);
    dispatch(setProducts({}));
  };

  const handleRoute = async (UID) => {
    if (!UID) {
      return;
    }

    clearSearch();
    navigate(`/product/${UID}`);
  };

  const handleLogin = () => {
    navigate("/users/login");
  };

  const handleLogout = async () => {
    localStorage.clear();

    try {
      await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      dispatch(logout());
      dispatch(logoutAccessTK());
      dispatch(clearBag());
      dispatch(setTotalBagNull());
      dispatch(userIDNULL());

      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/users/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleCartRoute = () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setIsMobileMenuOpen(false);
    navigate("/users/Cart");
  };

  const handleOrders = () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/users/my-orders");
  };

  const mobileMenuItems = useMemo(
    () => [
      { label: "Home", action: () => navigate("/") },
      { label: "Electronics", action: () => navigate("/") },
      { label: "Clothing", action: () => navigate("/") },
      { label: "Home Decor", action: () => navigate("/") },
      { label: "Kitchenware", action: () => navigate("/") },
      { label: "Books", action: () => navigate("/") },
      { label: "Gaming", action: () => navigate("/") },
      { label: "My Orders", action: handleOrders },
      { label: "Address", action: () => navigate("/users/address") },
      { label: "Cart", action: handleCartRoute },
    ],
    [navigate, handleOrders, handleCartRoute]
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/85 text-white backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:scale-[1.03] hover:bg-white/10 active:scale-95 sm:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <div className="space-y-1.5">
                  <span className="block h-0.5 w-5 origin-center rounded-full bg-white transition-transform duration-300" />
                  <span className="block h-0.5 w-5 rounded-full bg-white transition-all duration-300" />
                  <span className="block h-0.5 w-5 origin-center rounded-full bg-white transition-transform duration-300" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-3"
              >
                <img
                  src={XArenaLogo}
                  alt="X Arena"
                  className="h-12 w-auto sm:h-14"
                />
              </button>
            </div>

            <div className="hidden flex-1 px-6 lg:block">
              <div className="relative mx-auto max-w-2xl">
                <img
                  src={Search}
                  alt="Search"
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-70"
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInput}
                  placeholder="Search products..."
                  className="h-12 w-full rounded-full border border-white/10 bg-white/8 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-emerald-400/50 focus:bg-white/10"
                />

                {(searchInput || hasSearchResults) && (
                  <div className="absolute left-0 right-0 top-14 z-40 rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                    {hasSearchResults ? (
                      <ul className="space-y-1">
                        {searchQuery.map((company) => (
                          <li
                            key={company._id}
                            className="cursor-pointer rounded-xl px-4 py-3 text-sm text-slate-100 transition hover:bg-white/8"
                            onClick={() => handleRoute(company._id)}
                          >
                            {company.product_name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-400">No results</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleCartRoute}
                className="relative inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <img src={cart} alt="Cart" className="h-5 w-5" />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -right-1 -top-1 inline-flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[11px] font-bold text-white">
                  {totalBag || 0}
                </span>
              </button>

              <div
                className="relative z-50"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="group inline-flex h-11 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-white/10 hover:shadow-[0_14px_30px_rgba(16,185,129,0.12)]"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-100 transition duration-300 group-hover:scale-110 group-hover:bg-emerald-500/30">
                    {username ? username.charAt(0).toUpperCase() : "L"}
                  </div>
                  <span className="hidden md:inline transition duration-300 group-hover:text-emerald-100">
                    {username || "Login"}
                  </span>
                  <span className="hidden text-xs text-emerald-200/80 transition duration-300 group-hover:translate-x-0.5 md:inline">
                    v
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full z-[70] w-64 animate-[profileMenuIn_220ms_cubic-bezier(0.16,1,0.3,1)] rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                    <div className="rounded-[1.25rem] bg-white/5 px-4 py-4">
                      <p className="text-sm font-semibold text-white">
                        {username || "Guest"}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {username ? "Welcome back" : "Sign in to manage your account"}
                      </p>
                    </div>

                    <div className="mt-2 space-y-1 text-sm">
                      {username ? (
                        <>
                          <button
                            type="button"
                            onClick={handleOrders}
                            className="w-full rounded-xl px-4 py-3 text-left text-slate-100 transition duration-300 hover:translate-x-1 hover:bg-white/8"
                          >
                            My Orders
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate("/users/address")}
                            className="w-full rounded-xl px-4 py-3 text-left text-slate-100 transition duration-300 hover:translate-x-1 hover:bg-white/8"
                          >
                            My Address
                          </button>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full rounded-xl px-4 py-3 text-left text-red-200 transition duration-300 hover:translate-x-1 hover:bg-red-500/12"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={handleLogin}
                          className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-left font-semibold text-white transition duration-300 hover:translate-x-1 hover:bg-emerald-700"
                        >
                          Login
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pb-4 lg:hidden">
            <div className="relative">
              <img
                src={Search}
                alt="Search"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 opacity-70"
              />
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Search products..."
                className="h-12 w-full rounded-full border border-white/10 bg-white/8 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-300 focus:border-emerald-400/50 focus:bg-white/10"
              />

              {(searchInput || hasSearchResults) && (
                <div className="absolute left-0 right-0 top-14 z-40 rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  {hasSearchResults ? (
                    <ul className="space-y-1">
                      {searchQuery.map((company) => (
                        <li
                          key={company._id}
                          className="cursor-pointer rounded-xl px-4 py-3 text-sm text-slate-100 transition hover:bg-white/8"
                          onClick={() => handleRoute(company._id)}
                        >
                          {company.product_name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-400">No results</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="hidden border-t border-white/10 py-3 xl:block">
            <div className="flex flex-wrap items-center gap-2">
              {desktopNavItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full px-4 py-2 text-sm text-slate-200 transition hover:bg-white/8 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] sm:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_220ms_ease-out]"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="absolute left-0 top-0 h-full w-[84%] max-w-sm border-r border-white/10 bg-slate-950 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] animate-[slideInLeft_320ms_cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
              <div>
                <p className="translate-y-0 animate-[fadeUp_320ms_ease-out] text-lg font-black">Menu</p>
                <p className="animate-[fadeUp_380ms_ease-out] text-sm text-slate-400">
                  {username || "Browse your account and cart"}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 transition duration-300 hover:bg-white/12 active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl leading-none transition-transform duration-300 hover:rotate-90">x</span>
              </button>
            </div>

            <div className="px-5 py-5">
              <div className="rounded-[1.5rem] bg-white/5 p-4 animate-[fadeUp_420ms_ease-out]">
                <p className="text-sm font-semibold text-white">
                  {username || "Guest user"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {username
                    ? "Manage orders, address, and shopping activity"
                    : "Login to access orders and checkout"}
                </p>
              </div>

              <div className="mt-5 space-y-2">
                {mobileMenuItems.map((item, index) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="w-full rounded-[1.25rem] bg-white/5 px-4 py-3 text-left text-sm font-semibold text-slate-100 transition duration-300 hover:translate-x-1 hover:bg-white/10 active:scale-[0.98]"
                    style={{
                      animation: `fadeUp 320ms ease-out ${460 + index * 70}ms both`,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div
                className="mt-5 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/10 p-4"
                style={{ animation: "fadeUp 320ms ease-out 760ms both" }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Cart items
                </p>
                <p className="mt-2 text-3xl font-black text-white">{totalBag || 0}</p>
              </div>

              <div
                className="mt-5 space-y-2"
                style={{ animation: "fadeUp 320ms ease-out 860ms both" }}
              >
                {username ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-[1.25rem] bg-red-500/12 px-4 py-3 text-left text-sm font-semibold text-red-200 transition duration-300 hover:bg-red-500/18 active:scale-[0.98]"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full rounded-[1.25rem] bg-emerald-600 px-4 py-3 text-left text-sm font-semibold text-white transition duration-300 hover:bg-emerald-700 active:scale-[0.98]"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-32px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes profileMenuIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

      {showLoginModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[1.75rem] bg-white p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
            <h2 className="text-2xl font-black text-slate-950">Login Required</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Please login to continue shopping and access your cart.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/users/login");
                }}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="flex-1 rounded-xl bg-slate-200 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
