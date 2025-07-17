import React from "react";

const orders = [
  {
    id: "ORD12345",
    date: "2025-07-11",
    status: "Delivered",
    total: "₹56,999",
    product: {
      title: "Samsung Galaxy S23 Ultra",
      image: "https://via.placeholder.com/80", // Replace with real image
    },
  },
  {
    id: "ORD12346",
    date: "2025-07-09",
    status: "Shipped",
    total: "₹34,999",
    product: {
      title: "Redmi Note 13 Pro",
      image: "https://via.placeholder.com/80",
    },
  },
];

export default function OrdersPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={order.product.image}
                alt={order.product.title}
                className="w-20 h-20 rounded-xl object-cover border"
              />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">{order.product.title}</h2>
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                <p className="text-sm text-gray-500">Placed on: {order.date}</p>
              </div>
            </div>

            <div className="text-right space-y-2">
              <p
                className={`text-sm font-medium ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : order.status === "Shipped"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                {order.status}
              </p>
              <p className="text-lg font-semibold text-gray-800">{order.total}</p>
              <button className="px-4 py-1 text-sm rounded-xl bg-gray-200 hover:bg-gray-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
