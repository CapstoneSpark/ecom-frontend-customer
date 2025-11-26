import React from "react";
import { Trash2, ArrowLeft, PlusCircle } from "lucide-react";

export default function AdminProductsPage({ products, onNavigate, onDeleteProduct }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Back Button */}
      <button
        onClick={() => onNavigate("admin-dashboard")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Products</h2>

        <button
          onClick={() => onNavigate("admin-add-product")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="border rounded-lg p-4 bg-white shadow-sm flex items-start gap-4"
          >
            <img
              src={prod.image}
              alt={prod.name}
              className="w-24 h-24 rounded object-cover"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{prod.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{prod.category}</p>
              <p className="text-blue-600 font-bold">${prod.price}</p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => onDeleteProduct(prod.id)}
              className="p-2 bg-red-100 rounded hover:bg-red-200"
            >
              <Trash2 className="text-red-600 w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
