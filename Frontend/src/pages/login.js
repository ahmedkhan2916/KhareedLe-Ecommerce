import React, { useEffect, useState } from "react";
import Instagram from "../assets/Socialicons/instagram.png";
import Whatsapp from "../assets/Socialicons/whatsapp.png";
import Facebook from "../assets/Socialicons/facebook.png";
import headphone from "../assets/LoginLogos/headphone.png";
import apple from "../assets/LoginLogos/apple.png";
import samsung from "../assets/LoginLogos/samsung.png";
import applelogo from "../assets/LoginLogos/applelogo.png";
import kitchenware from "../assets/LoginLogos/kitchenware2.png";
import livingroom from "../assets/LoginLogos/livingroom.png";



import playstation from "../assets/LoginLogos/playstation.png";

import airpods from "../assets/LoginLogos/airpods.png";
import hanger from "../assets/LoginLogos/hanger.png";
import { loginUser, refreshToken } from "../store/dataSlice.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccessTK, setUserId, setUsername, fetchUserID } from "../store/dataSlice.js";
import "../assets/Style/Headings.css";
import GELOGO2 from "../assets/images/HeaderLogos/arena3.png";

function Login() {
  const imgArray = [headphone,hanger, airpods,kitchenware, samsung, applelogo, playstation,livingroom];
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [phNO, setPHNO] = useState("");
  const [typeSet, setTypeSet] = useState(false);
  const [password, setPassword] = useState("");
  const [signal, setSignal] = useState(false);

  const { token } = useSelector((state) => state.userAuth);
  const { users } = useSelector((state) => state.auth);
  const { UserID } = useSelector((state) => state.fetchID);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imgArray.length - 1 ? 0 : prevIndex + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, [imgArray.length]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserID(token));
      setSignal(true);
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (signal === true) {
      const searchParams = new URLSearchParams(location.search);
      setSignal(false);
      const redirectPath = searchParams.get("redirect") || "/";
      navigate(redirectPath);
    }
  }, [UserID, location.search, navigate, signal]);

  useEffect(() => {
    if (users && users.user && users.accessToken) {
      dispatch(setUserId(users.user.id));
      dispatch(setAccessTK(users.accessToken));
      dispatch(setUsername(users.user.name));
      dispatch(refreshToken());
    }
  }, [users, dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const EMAILORPHONENO = email || phNO;

    const bodyData = {
      EMAILORPHONENO,
      password,
    };

    dispatch(loginUser(bodyData));
  };

  const handleSetPHOREMAIL = (event) => {
    const value = event.target.value;

    if (value === "") {
      setEmail("");
      setPHNO("");
      setTypeSet(false);
      return;
    }

    if (/^\d+$/.test(value)) {
      setTypeSet(true);
      setPHNO(value);
      setEmail("");
      return;
    }

    setTypeSet(false);
    setEmail(value);
    setPHNO("");
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-[clamp(12px,3vh,32px)] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] max-[640px]:p-3 max-[420px]:p-2"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255, 122, 61, 0.2), transparent 32%), radial-gradient(circle at bottom right, rgba(0, 198, 255, 0.18), transparent 28%), linear-gradient(135deg, #0d1321 0%, #121c2d 45%, #f7f3ec 45%, #f4efe7 100%)",
      }}
    >
      <div className="pointer-events-none absolute left-[-100px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[rgba(255,153,0,0.26)] opacity-70 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-[-120px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[rgba(0,187,255,0.24)] opacity-70 blur-[90px]" />

      <div className="relative z-[1] mx-auto grid max-h-[calc(100dvh-clamp(24px,6vh,64px))] w-full max-w-[1280px] grid-cols-[minmax(320px,0.95fr)_minmax(320px,1.05fr)] overflow-hidden rounded-[32px] bg-[rgba(255,255,255,0.82)] shadow-[0_24px_80px_rgba(5,10,20,0.22)] backdrop-blur-[14px] max-[900px]:max-h-none max-[900px]:max-w-[720px] max-[900px]:grid-cols-1 max-[640px]:max-h-none max-[640px]:w-full max-[640px]:rounded-[24px]">
        <section
          className="flex flex-col justify-center px-[clamp(22px,3vw,48px)] py-[clamp(24px,5vh,56px)] text-[#f8fbff] max-[900px]:order-1 max-[900px]:px-6 max-[900px]:py-7 max-[640px]:order-1 max-[640px]:px-4 max-[640px]:py-5 max-[420px]:px-[14px] max-[420px]:py-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 100%), linear-gradient(155deg, #006b34 0%, #12243a 52%, #000000 100%)",
          }}
        >
          <div className="mb-[clamp(14px,2vh,24px)] inline-flex w-fit items-center rounded-full bg-[linear-gradient(90deg,#ffd166_0%,#ff9f1c_100%)] px-[14px] py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#08111d] max-[640px]:px-[10px] max-[640px]:py-1.5 max-[640px]:text-[0.62rem]">Customer Access</div>
          <img
            className="mb-[clamp(14px,2.5vh,28px)] w-[clamp(72px,12vh,130px)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] max-[900px]:mb-[14px] max-[900px]:w-[90px] max-[640px]:mb-3 max-[640px]:w-[72px] max-[420px]:mb-[10px] max-[420px]:w-[64px]"
            src={GELOGO2}
            alt="X Arena"
          />
          <h1 className="mb-[clamp(10px,1.8vh,18px)] text-[clamp(2rem,5vh,4.4rem)] leading-[0.98] max-[900px]:mb-[10px] max-[900px]:text-[1.9rem] max-[640px]:mb-[10px] max-[640px]:text-[1.45rem] max-[640px]:leading-[1.08] max-[420px]:mb-2 max-[420px]:text-[1.28rem]">
            Return to your
            <span className="block text-[#7ee0ff]"> immersive shopping account</span>
          </h1>
          <p className="m-0 max-w-[520px] text-[clamp(0.9rem,1.55vh,1rem)] leading-[1.55] text-[rgba(241,248,255,0.78)] max-[900px]:text-[0.92rem] max-[900px]:leading-[1.45] max-[640px]:max-w-none max-[640px]:text-[0.88rem] max-[640px]:leading-[1.45]">
            Enter the same premium storefront experience with faster checkout,
            saved preferences, and product discovery built around your journey.
          </p>

          <div className="mt-[clamp(16px,3vh,36px)] grid gap-[clamp(10px,1.6vh,16px)] max-[900px]:mt-[18px] max-[900px]:gap-[10px]">
            <article className="rounded-[20px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.9vh,18px)] max-[900px]:px-[14px] max-[900px]:py-3">
              <strong className="mb-1.5 block text-base">3D Ready</strong>
              <span className="block text-[clamp(0.84rem,1.35vh,1rem)] leading-[1.4] text-[rgba(232,242,249,0.72)]">Jump back into the VR-inspired storefront with your saved flow.</span>
            </article>
            <article className="rounded-[20px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.9vh,18px)] max-[900px]:px-[14px] max-[900px]:py-3">
              <strong className="mb-1.5 block text-base">Fast Checkout</strong>
              <span className="block text-[clamp(0.84rem,1.35vh,1rem)] leading-[1.4] text-[rgba(232,242,249,0.72)]">Access your account, bag, and orders without friction.</span>
            </article>
            <article className="rounded-[20px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-[clamp(14px,1.8vw,20px)] py-[clamp(12px,1.9vh,18px)] max-[900px]:px-[14px] max-[900px]:py-3">
              <strong className="mb-1.5 block text-base">Personalized Feed</strong>
              <span className="block text-[clamp(0.84rem,1.35vh,1rem)] leading-[1.4] text-[rgba(232,242,249,0.72)]">Continue exploring devices, accessories, and deals in one place.</span>
            </article>
          </div>

          <div className="mt-[clamp(14px,2vh,28px)] flex gap-[18px]">
            <img className="h-6 w-6 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-[1.05]" style={{ filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22))" }} src={Whatsapp} alt="whatsapp" />
            <img className="h-6 w-6 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-[1.05]" style={{ filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22))" }} src={Instagram} alt="instagram" />
            <img className="h-6 w-6 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-[1.05]" style={{ filter: "drop-shadow(0 10px 18px rgba(0, 0, 0, 0.22))" }} src={Facebook} alt="facebook" />
          </div>
        </section>

        <section
          className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(247,242,234,0.95)_100%)] px-[clamp(22px,2.6vw,40px)] py-[clamp(24px,4.4vh,48px)] max-[900px]:order-[-1] max-[900px]:px-6 max-[900px]:py-7 max-[640px]:order-[-1] max-[640px]:px-4 max-[640px]:py-5 max-[420px]:px-[14px] max-[420px]:py-4"
        >
          <div>
            <p className="inline-flex w-fit items-center rounded-full bg-[rgba(255,167,38,0.14)] px-[14px] py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#8a4b00] max-[640px]:px-[10px] max-[640px]:py-1.5 max-[640px]:text-[0.62rem]">Welcome Back</p>
            <h2 className="my-[clamp(10px,1.6vh,14px)] mb-[clamp(8px,1.2vh,10px)] text-[clamp(1.8rem,3.8vh,2.6rem)] text-[#111827] max-[640px]:my-[10px] max-[640px]:mb-2 max-[640px]:text-[1.6rem] max-[420px]:my-2 max-[420px]:mb-1.5 max-[420px]:text-[1.45rem]">User Login</h2>
            <p className="mb-[clamp(14px,2.6vh,28px)] leading-[1.5] text-[#5b6472] max-[900px]:mb-4 max-[640px]:mb-[14px]">Sign in to continue shopping, manage your bag, and view your orders.</p>
          </div>

          <div className="mb-[clamp(14px,2vh,24px)] overflow-hidden rounded-[20px] border border-[#d3dae6] bg-white py-[clamp(6px,1vh,10px)]">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {imgArray.map((img, index) => (
                <img key={index} src={img} alt="brand icon" className="h-[clamp(44px,6vh,60px)] min-w-full object-contain" />
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="grid gap-[clamp(16px,2.2vh,24px)] max-[900px]:gap-4 max-[640px]:gap-[14px] max-[420px]:gap-3">
            <div className="grid grid-cols-2 gap-[clamp(12px,1.6vh,16px)] max-[640px]:grid-cols-1 max-[640px]:gap-3">
              <label className="col-span-full grid gap-2 max-[640px]:gap-1.5">
                <span className="text-[0.95rem] font-semibold text-[#1f2937] max-[640px]:text-[0.82rem]">Email or Phone</span>
                <input
                  className="w-full rounded-2xl border border-[#d3dae6] bg-[rgba(255,255,255,0.86)] px-4 py-[clamp(11px,1.6vh,14px)] text-[0.98rem] text-slate-900 transition duration-200 ease-in-out placeholder:text-[#8a94a6] focus:-translate-y-px focus:border-[#22c55e] focus:outline-none focus:ring-4 focus:ring-[rgba(34,197,94,0.12)] max-[640px]:rounded-xl max-[640px]:px-3 max-[640px]:py-[11px] max-[640px]:text-[0.9rem] max-[420px]:px-[11px] max-[420px]:py-[10px]"
                  type={typeSet ? "number" : "text"}
                  placeholder="Enter email or phone number"
                  value={email || phNO}
                  onChange={handleSetPHOREMAIL}
                  required
                />
              </label>

              <label className="col-span-full grid gap-2 max-[640px]:gap-1.5">
                <span className="text-[0.95rem] font-semibold text-[#1f2937] max-[640px]:text-[0.82rem]">Password</span>
                <input
                  className="w-full rounded-2xl border border-[#d3dae6] bg-[rgba(255,255,255,0.86)] px-4 py-[clamp(11px,1.6vh,14px)] text-[0.98rem] text-slate-900 transition duration-200 ease-in-out placeholder:text-[#8a94a6] focus:-translate-y-px focus:border-[#22c55e] focus:outline-none focus:ring-4 focus:ring-[rgba(34,197,94,0.12)] max-[640px]:rounded-xl max-[640px]:px-3 max-[640px]:py-[11px] max-[640px]:text-[0.9rem] max-[420px]:px-[11px] max-[420px]:py-[10px]"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="animate-bg-flow cursor-pointer rounded-[18px] px-[22px] py-[clamp(12px,1.8vh,16px)] text-base font-bold text-white shadow-[0_18px_36px_rgba(34,197,94,0.24)] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(34,197,94,0.3)] max-[640px]:rounded-[14px] max-[640px]:px-4 max-[640px]:py-3 max-[640px]:text-[0.92rem] max-[420px]:px-[14px] max-[420px]:py-[11px]"
              style={{
                background: "linear-gradient(90deg, #16a34a 0%, #22c55e 45%, #4ade80 100%)",
                backgroundSize: "220% 100%",
                animationDuration: "3.6s",
              }}
            >
              Sign In To Shop
            </button>
          </form>

          <p className="mt-[clamp(14px,2vh,24px)] text-center text-[#5f6978] max-[640px]:mt-3 max-[640px]:text-[0.82rem]">
            New to X Arena?{" "}
            <button type="button" className="border-none bg-transparent font-bold text-[#0f7abf]" onClick={() => navigate("/users/signup")}>
              Create your account
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Login;
