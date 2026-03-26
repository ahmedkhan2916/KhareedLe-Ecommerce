import React, { useEffect, useState } from "react";
import Arena3 from "../../assets/images/HeaderLogos/arena3.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/dataSlice.js";

const highlights = [
  {
    title: "Live Operations",
    description: "Step back into inventory, sales, and fulfillment controls instantly.",
  },
  {
    title: "Protected Access",
    description: "Your admin and seller workflows stay behind a secure sign-in layer.",
  },
  {
    title: "Commerce Ready",
    description: "Built for daily marketplace management with a fast, focused interface.",
  },
];

const fieldBaseClasses =
  "w-full rounded-2xl border px-4 py-3.5 text-[0.98rem] text-slate-900 transition duration-200 placeholder:text-slate-400 focus:-translate-y-0.5 focus:outline-none";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [errorTick, setErrorTick] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, error, loading } = useSelector((state) => state.auth);

  const errorMessage = formError || error?.error || error?.message || error || "";
  const hasError = Boolean(errorMessage);

  const triggerErrorFeedback = (message) => {
    setFormError(message);
    setErrorTick((current) => current + 1);
  };

  useEffect(() => {
    if (users?.user?.role === "admin") {
      navigate("/users/admindash");
      return;
    }

    if (error) {
      triggerErrorFeedback(
        error?.error ||
          error?.message ||
          "Incorrect login details. Please review your email and password."
      );
    }
  }, [navigate, users, error]);

  const handleAdminLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      triggerErrorFeedback("Please enter both email and password before signing in.");
      return;
    }

    setFormError("");

    dispatch(
      loginUser({
        EMAILORPHONENO: email,
        password,
      })
    );
  };

  const clearInlineError = () => {
    if (hasError) {
      setFormError("");
    }
  };

  return (
    <>
      {/* <style>
        {`
          @keyframes adminAlertEnter {
            0% { opacity: 0; transform: translateY(-10px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes adminAlertShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-3px); }
          }
          @keyframes adminFieldShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
            75% { transform: translateX(-2px); }
          }
          @keyframes adminFlagWave {
            0%, 100% { transform: perspective(40px) rotateY(0deg); }
            50% { transform: perspective(40px) rotateY(-16deg); }
          }
          .admin-alert-enter {
            animation: adminAlertEnter 360ms ease, adminAlertShake 420ms ease 80ms;
            transform-origin: top center;
          }
          .admin-field-shake {
            animation: adminFieldShake 360ms ease;
          }
          .admin-flag-wave {
            animation: adminFlagWave 1.2s ease-in-out infinite;
          }
        `}
      </style> */}

      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#0d1321_0%,#121c2d_45%,#f7f3ec_45%,#f4efe7_100%)] px-4 py-4 sm:px-5 sm:py-8">
        <div className="pointer-events-none absolute -left-24 -top-28 h-[420px] w-[420px] rounded-full bg-[rgba(255,153,0,0.26)] blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-[420px] w-[420px] rounded-full bg-[rgba(0,187,255,0.24)] blur-[90px]" />

        <div className="relative z-10 mx-auto grid max-w-[1280px] overflow-hidden rounded-[32px] bg-white/80 shadow-[0_24px_80px_rgba(5,10,20,0.22)] backdrop-blur-[14px] lg:grid-cols-[minmax(320px,1.05fr)_minmax(320px,0.95fr)]">
          <section className="order-2 flex flex-col justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_100%),linear-gradient(155deg,#07111f_0%,#12243a_52%,#183c53_100%)] px-5 py-7 text-slate-50 sm:px-7 sm:py-10 lg:order-1 lg:px-12 lg:py-14">
            <div className="mb-6 inline-flex w-fit items-center rounded-full bg-[linear-gradient(90deg,#ffd166_0%,#ff9f1c_100%)] px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-950">
              Secure Access
            </div>

            <img
              className="mb-7 w-[130px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
              src={Arena3}
              alt="X Arena"
            />

            <h1 className="m-0 text-[2.2rem] leading-[0.98] sm:text-[2.7rem] lg:text-[clamp(2.4rem,5vw,4.4rem)]">
              Return to your
              <span className="block text-sky-200"> seller or admin workspace</span>
            </h1>

            <p className="mt-4 max-w-[520px] text-base leading-7 text-slate-100/75">
              Access the same premium commerce control center to manage catalogs,
              monitor orders, and operate your storefront with clarity.
            </p>

            <div className="mt-9 grid gap-4">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[20px] border border-white/10 bg-white/5 px-5 py-[18px]"
                >
                  <strong className="mb-1.5 block text-base">{item.title}</strong>
                  <span className="block leading-6 text-slate-100/70">{item.description}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="order-1 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,242,234,0.95)_100%)] px-5 py-7 sm:px-7 sm:py-10 lg:order-2 lg:px-10 lg:py-12">
            <div>
              <p className="inline-flex w-fit items-center rounded-full bg-orange-400/15 px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-amber-800">
                Welcome Back
              </p>
              <h2 className="mb-2.5 mt-3.5 text-[2rem] font-semibold text-slate-900 sm:text-[2.2rem] lg:text-[clamp(1.9rem,3vw,2.6rem)]">
                Admin / Seller Login
              </h2>
              <p className="mb-7 text-[15px] leading-7 text-slate-500">
                Sign in to continue to your dashboard and business controls.
              </p>
            </div>

            <form className="grid gap-6" onSubmit={handleAdminLogin}>
              {hasError ? (
                <div
                  key={errorTick}
                  className="admin-alert-enter grid grid-cols-[auto_1fr] items-start gap-3.5 rounded-[18px] border border-red-600/20 bg-[linear-gradient(180deg,rgba(254,242,242,0.98)_0%,rgba(255,233,233,0.98)_100%)] px-[18px] py-4 shadow-[0_18px_34px_rgba(220,38,38,0.09)]"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="relative mt-0.5 h-[38px] w-[34px]" aria-hidden="true">
                    <span className="absolute left-2 top-0.5 h-[30px] w-[3px] rounded-full bg-[linear-gradient(180deg,#5b5b5b_0%,#2f2f2f_100%)]" />
                    <span className="admin-flag-wave absolute left-[11px] top-1 h-[14px] w-[19px] rounded-[3px_10px_10px_3px] bg-[linear-gradient(135deg,#ff6b6b_0%,#dc2626_100%)] shadow-[0_8px_20px_rgba(220,38,38,0.28)] [clip-path:polygon(0_0,100%_8%,82%_52%,100%_100%,0_100%)]" />
                  </div>
                  <div className="grid gap-1">
                    <strong className="text-[0.98rem] text-red-800">
                      Sign in needs attention
                    </strong>
                    <span className="text-[0.94rem] leading-6 text-red-900">
                      {errorMessage}
                    </span>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4">
                <label className={`grid gap-2 ${hasError ? "admin-field-shake" : ""}`}>
                  <span className="text-[0.95rem] font-semibold text-slate-800">Email</span>
                  <input
                    type="email"
                    placeholder="seller@xarena.com"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearInlineError();
                    }}
                    className={`${fieldBaseClasses} ${
                      hasError
                        ? "border-red-500 bg-red-50/90 shadow-[0_0_0_4px_rgba(239,68,68,0.10)] focus:border-red-600 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.16)]"
                        : "border-slate-300 bg-white/90 focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.12)]"
                    }`}
                    aria-invalid={hasError}
                    required
                  />
                </label>

                <label className={`grid gap-2 ${hasError ? "admin-field-shake" : ""}`}>
                  <span className="text-[0.95rem] font-semibold text-slate-800">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      clearInlineError();
                    }}
                    className={`${fieldBaseClasses} ${
                      hasError
                        ? "border-red-500 bg-red-50/90 shadow-[0_0_0_4px_rgba(239,68,68,0.10)] focus:border-red-600 focus:shadow-[0_0_0_4px_rgba(220,38,38,0.16)]"
                        : "border-slate-300 bg-white/90 focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(34,197,94,0.12)]"
                    }`}
                    aria-invalid={hasError}
                    required
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-[18px] bg-[linear-gradient(90deg,#16a34a_0%,#22c55e_45%,#4ade80_100%)] bg-[length:220%_100%] px-[22px] py-4 text-base font-bold text-white shadow-[0_18px_36px_rgba(34,197,94,0.24)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(34,197,94,0.30)] disabled:cursor-wait disabled:opacity-75 motion-safe:animate-bg-flow"
              >
                {loading ? "Checking your access..." : "Sign In To Dashboard"}
              </button>

              <p className="m-0 text-center text-slate-500">
                Authorized personnel only. Activity may be monitored for security.
              </p>

              <p className="m-0 text-center text-slate-500">
                Need a seller or admin account?{" "}
                <button
                  type="button"
                  className="font-bold text-sky-700 transition hover:text-sky-800"
                  onClick={() => navigate("/users/admin-signup")}
                >
                  Create one here
                </button>
              </p>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;
