import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/adminSignup.css";
import { BASE_URL } from "../../config/config.js";
import Arena3 from "../../assets/images/HeaderLogos/arena3.png";

const initialForm = {
  role: "seller",
  name: "",
  email: "",
  password: "",
  phone: "",
  storeName: "",
  businessAddress: "",
  gstNumber: "",
  bankAccount: "",
  ifscCode: "",
};

function AdminSignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "ifscCode" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      role,
      name,
      email,
      password,
      phone,
      storeName,
      businessAddress,
      gstNumber,
      bankAccount,
      ifscCode,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !phone.trim() ||
      !storeName.trim() ||
      !businessAddress.trim() ||
      !bankAccount.trim() ||
      !ifscCode.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!/^\d{10,15}$/.test(phone.trim())) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode.trim())) {
      alert("Please enter a valid IFSC code.");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post(`${BASE_URL}/users/signup-admin`, {
        firstname: name.trim(),
        email: email.trim(),
        password: password.trim(),
        phonenumber: Number(phone),
        role,
        storeName: storeName.trim(),
        businessAddress: businessAddress.trim(),
        gstNumber: gstNumber.trim(),
        bankAccount: bankAccount.trim(),
        ifscCode: ifscCode.trim(),
      });

      alert(`${role === "seller" ? "Seller" : "Admin"} account created successfully.`);
      setFormData(initialForm);
      navigate("/users/admin-login");
    } catch (error) {
      console.error("admin signup failed", error);
      alert(error?.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-signup">
      <div className="admin-signup__ambient admin-signup__ambient--left" />
      <div className="admin-signup__ambient admin-signup__ambient--right" />

      <div className="admin-signup__shell">
        <section className="admin-signup__hero">
          <div className="admin-signup__badge">Merchant Onboarding</div>
          <img className="admin-signup__logo" src={Arena3} alt="X Arena" />
          <h1>
            Launch a premium
            <span> seller or admin workspace</span>
          </h1>
          <p>
            Create a commerce-ready account for marketplace operations, catalog control,
            finance tracking, and seller onboarding.
          </p>

          <div className="admin-signup__highlights">
            <article>
              <strong>Fast Approval</strong>
              <span>Ready for store operations with structured business details.</span>
            </article>
            <article>
              <strong>Secure Payouts</strong>
              <span>Collect bank and IFSC information in one verified flow.</span>
            </article>
            <article>
              <strong>Role Based</strong>
              <span>Choose between seller onboarding or full admin access.</span>
            </article>
          </div>
        </section>

        <section className="admin-signup__panel">
          <div className="admin-signup__panel-header">
            <p className="admin-signup__eyebrow">Account Setup</p>
            <h2>Admin / Seller Signup</h2>
            <p>Fill in the business details to create your operational account.</p>
          </div>

          <form className="admin-signup__form" onSubmit={handleSubmit}>
            <div className="admin-signup__role-grid">
              <label className={`admin-signup__role-card ${formData.role === "seller" ? "is-active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={formData.role === "seller"}
                  onChange={handleChange}
                />
                <span>Seller</span>
                <small>Manage your store and product operations.</small>
              </label>

              <label className={`admin-signup__role-card ${formData.role === "admin" ? "is-active" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                <span>Admin</span>
                <small>Access platform-level control and oversight.</small>
              </label>
            </div>

            <div className="admin-signup__grid">
              <label className="admin-signup__field">
                <span>Name</span>
                <input name="name" type="text" placeholder="Hamza Ali" value={formData.name} onChange={handleChange} required />
              </label>

              <label className="admin-signup__field">
                <span>Email</span>
                <input name="email" type="email" placeholder="seller@xarena.com" value={formData.email} onChange={handleChange} required />
              </label>

              <label className="admin-signup__field">
                <span>Password</span>
                <input name="password" type="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} required />
              </label>

              <label className="admin-signup__field">
                <span>Phone</span>
                <input name="phone" type="tel" inputMode="numeric" placeholder="9876543210" value={formData.phone} onChange={handleChange} required />
              </label>

              <label className="admin-signup__field">
                <span>Store Name</span>
                <input name="storeName" type="text" placeholder="X Arena Gadgets" value={formData.storeName} onChange={handleChange} required />
              </label>

              <label className="admin-signup__field">
                <span>GST Number (optional)</span>
                <input name="gstNumber" type="text" placeholder="22AAAAA0000A1Z5" value={formData.gstNumber} onChange={handleChange} />
              </label>

              <label className="admin-signup__field admin-signup__field--wide">
                <span>Business Address</span>
                <textarea
                  name="businessAddress"
                  rows="3"
                  placeholder="Enter your registered business address"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="admin-signup__field">
                <span>Bank Account</span>
                <input name="bankAccount" type="text" placeholder="Account number" value={formData.bankAccount} onChange={handleChange} required />
              </label>

              <label className="admin-signup__field">
                <span>IFSC Code</span>
                <input name="ifscCode" type="text" placeholder="SBIN0001234" value={formData.ifscCode} onChange={handleChange} required />
              </label>
            </div>

            <button type="submit" className="admin-signup__submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : `Create ${formData.role === "seller" ? "Seller" : "Admin"} Account`}
            </button>

            <p className="admin-signup__footnote">
              Already registered?{" "}
              <button type="button" onClick={() => navigate("/users/admin-login")}>
                Go to admin login
              </button>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AdminSignupPage;
