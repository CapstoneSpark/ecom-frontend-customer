// src/components/AddProductPage.jsx
import React, { useState } from "react";

export function AddProductPage({ onNavigate, onAddProduct }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddProduct({
      name: form.name,
      brand: form.brand,
      category: form.category || "General",
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      image:
        form.image ||
        "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg",
      description: form.description || "New product",
    });

    onNavigate("admin-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Brand</label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
              rows={3}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Product
            </button>

            <button
              type="button"
              onClick={() => onNavigate("admin-dashboard")}
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
