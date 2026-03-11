import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddToBag, fetchBagTotal2 } from "../store/dataSlice.js";

const BuyButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const token = useSelector((state) => state.userAuth.token);
  const UserID = useSelector((state) => state.fetchID.UserID);

  const handleBuyNow = async () => {
    if (!token || !UserID) {
      setShowLoginModal(true);
      return;
    }

    if (id) {
      await dispatch(fetchAddToBag({ userId: UserID, productId: id, Signal: false }));
      await dispatch(fetchBagTotal2({ ID: UserID }));
    }

    navigate("/users/Cart");
  };

  const handleLoginRedirect = () => {
    window.location.href = `/users/login?redirect=${encodeURIComponent("/users/Cart")}`;
  };

  return (
    <>
      <button
        onClick={handleBuyNow}
        className="h-12 w-full rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
      >
        Buy Now
      </button>

      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm transition-all duration-300 ${
          showLoginModal ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
          <h2 className="text-xl font-bold text-slate-950">Login Required</h2>
          <p className="mt-2 text-sm text-slate-600">
            Please login to continue shopping.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={handleLoginRedirect}
              className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              Login
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className="rounded-xl bg-slate-300 px-4 py-2 font-semibold text-slate-800 transition hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyButton;
