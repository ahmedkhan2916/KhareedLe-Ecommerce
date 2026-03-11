import React, { useEffect, useState } from "react";
import "../../assets/Style/adminLogin.css";
import Arena3 from "../../assets/images/HeaderLogos/arena3.png";
import { loginAdmin } from "../../store/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dataAdmin = useSelector((state) => state?.authAdmin?.admin?.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (dataAdmin === "Login successful!") {
      alert("Login successful!");
      navigate("/users/admindash");
    }
  }, [dataAdmin, navigate]);

  const handleAdminLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("sorry credentials are empty...");
      return;
    }

    const bodyData = {
      EMAILORPHONENO: email,
      password,
    };

    dispatch(loginAdmin(bodyData))
      .unwrap()
      .then((res) => {
        console.log("LOGIN SUCCESS:", res);
      })
      .catch((err) => {
        console.error("LOGIN ERROR:", err);
      });
  };

  return (
    <div className="admin-login">
      <div className="admin-login__ambient admin-login__ambient--left" />
      <div className="admin-login__ambient admin-login__ambient--right" />

      <div className="admin-login__shell">
        <section className="admin-login__hero">
          <div className="admin-login__badge">Secure Access</div>
          <img className="admin-login__logo" src={Arena3} alt="X Arena" />
          <h1>
            Return to your
            <span> seller or admin workspace</span>
          </h1>
          <p>
            Access the same premium commerce control center to manage catalogs,
            monitor orders, and operate your storefront with clarity.
          </p>

          <div className="admin-login__highlights">
            <article>
              <strong>Live Operations</strong>
              <span>Step back into inventory, sales, and fulfillment controls instantly.</span>
            </article>
            <article>
              <strong>Protected Access</strong>
              <span>Your admin and seller workflows stay behind a secure sign-in layer.</span>
            </article>
            <article>
              <strong>Commerce Ready</strong>
              <span>Built for daily marketplace management with a fast, focused interface.</span>
            </article>
          </div>
        </section>

        <section className="admin-login__panel">
          <div className="admin-login__panel-header">
            <p className="admin-login__eyebrow">Welcome Back</p>
            <h2>Admin / Seller Login</h2>
            <p>Sign in to continue to your dashboard and business controls.</p>
          </div>

          <form className="admin-login__form" onSubmit={handleAdminLogin}>
            <div className="admin-login__grid">
              <label className="admin-login__field admin-login__field--wide">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="seller@xarena.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label className="admin-login__field admin-login__field--wide">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>

            <button type="submit" className="admin-login__submit">
              Sign In To Dashboard
            </button>

            <p className="admin-login__footnote">
              Authorized personnel only. Activity may be monitored for security.
            </p>
            <p className="admin-login__footnote">
              Need a seller or admin account?{" "}
              <button type="button" className="admin-login__link-btn" onClick={() => navigate("/users/admin-signup")}>
                Create one here
              </button>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AdminLoginPage;
