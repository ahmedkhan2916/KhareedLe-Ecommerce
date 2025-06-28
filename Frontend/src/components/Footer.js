import React from 'react';
import khareedLe from "../assets/images/HeaderLogos/khareedLe.png";
import Facebook from "../assets/Socialicons/facebook.png";
import Instagram from "../assets/Socialicons/instagram.png";
import Twitter from "../assets/Socialicons/twitter.png";
import whatsapp from "../assets/Socialicons/whatsapp.png";
import upi from "../assets/Socialicons/upi.png";
import visa from "../assets/Socialicons/visa.png";
import master from "../assets/Socialicons/card.png";
import ssl from "../assets/Socialicons/ssl2.png";

function Footer() {
  return (
    <footer className="bg-black text-white pt-10 mt-10">
      {/* Top Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-10 border-b border-gray-700">
        <div>
          <h3 className="font-semibold text-lg mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Wishlist</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookies Policy</li>
          </ul>
        </div>
      </div>

      {/* Product Category Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-wrap gap-4 justify-between border-b border-gray-700">
        <p className="font-medium">Popular Categories:</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <span>Smartphones</span>
          <span>Laptops</span>
          <span>Tablets</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-wrap items-center justify-between border-b border-gray-700">
        <p className="font-medium">Payment Methods:</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <img src={upi} className="h-8" alt="upi" />
          <img src={visa} className="h-8" alt="visa" />
          <img src={master} className="h-8" alt="mastercard" />
        </div>
      </div>

      {/* Secure Checkout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-wrap items-center justify-between border-b border-gray-700">
        <p className="font-medium">Secure Checkout</p>
        <img src={ssl} className="h-6" alt="ssl secure" />
      </div>

      {/* Brand Logo + Social Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-green-500">
          KHAREEDLAY<span className="text-base align-top ml-1">®</span>
        </h1>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <img src={Facebook} alt="Facebook" className="h-6" />
          <img src={Instagram} alt="Instagram" className="h-6" />
          <img src={Twitter} alt="Twitter" className="h-6" />
          <img src={whatsapp} alt="WhatsApp" className="h-6" />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-700">
        © 2024 KhareedLay Hub. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
