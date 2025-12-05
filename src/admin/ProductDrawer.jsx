


import { useState } from "react";
import {
  X,
  Trash2,
  Package,
  DollarSign,
  Hash,
  Folder,
  FileText,
  Image,
  AlertTriangle,
} from "lucide-react";

import { ProductAPI } from "../api/productApi";
import { toast } from "sonner";

export default function ProductDrawer({ data, close, refresh }) {
  const mode = data.mode;
  const product = data.product || {};
  const categories = data.categories || [];

  const [form, setForm] = useState({
    name: product.name || "",
    price: product.price || "",
    stock: product.stock || "",
    sku: product.sku || "",
    description: product.description || "",
    imageUrl: product.imageUrl || product.image || "",
    categoryId: product.categories?.[0]?.categoryId || "",
  });

  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!form.name.trim() || !form.categoryId || !form.imageUrl.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!form.price || form.price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    if (form.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    const payload = {
      name: form.name,
      price: form.price,
      stock: form.stock,
      sku: form.sku,
      description: form.description,
      imageUrl: form.imageUrl,
    };

    try {
      setLoading(true);

      let saved;

      // -------------------------------------------
      // CREATE PRODUCT
      // -------------------------------------------
      if (mode === "add") {
        const res = await ProductAPI.createProduct(payload);

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        saved = res.data;

        // MAP TO CATEGORY
        const map = await ProductAPI.mapToCategory(
          saved.productId,
          Number(form.categoryId)
        );

        if (!map.ok) {
          toast.error("Product saved but category mapping failed");
          return;
        }

        toast.success("Product created!");
      }

      // -------------------------------------------
      // UPDATE PRODUCT
      // -------------------------------------------
      else {
        const res = await ProductAPI.updateProduct(product.productId, payload);

        if (!res.ok) {
          toast.error(res.message);
          return;
        }

        saved = res.data;

        // REMOVE OLD MAPPINGS
        const oldMappings = await ProductAPI.getCategoriesByProduct(
          product.productId
        );

        if (oldMappings.ok && Array.isArray(oldMappings.data)) {
          for (const m of oldMappings.data) {
            await ProductAPI.unmapCategory(m.id);
          }
        }

        // SET NEW MAPPING
        const map = await ProductAPI.mapToCategory(
          product.productId,
          Number(form.categoryId)
        );

        if (!map.ok) {
          toast.error("Product updated but mapping failed");
          return;
        }

        toast.success("Product updated!");
      }

      await refresh();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    try {
      setLoading(true);

      const del = await ProductAPI.deleteProduct(product.productId);

      if (!del.ok) {
        toast.error(del.message);
        return;
      }

      toast.success("Product deleted");
      await refresh();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={close}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {mode === "add"
                  ? "Add New Product"
                  : mode === "edit"
                  ? "Edit Product"
                  : "Delete Product"}
              </h2>
            </div>
          </div>

          <button onClick={close} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6">
          {mode === "delete" ? (
            <div className="text-center space-y-4">
              <Trash2 size={40} className="mx-auto text-red-500" />
              <h3 className="text-xl font-semibold">Delete Product?</h3>
              <p>
                Are you sure you want to delete{" "}
                <b>{product?.name || "this product"}</b>?
              </p>
              <button
                onClick={remove}
              className="flex-1  py-2 flex justify-center px-8 rounded-lg font-medium text-red-600 hover:bg-red-50 border border-transparent disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {form.imageUrl && (
                <div className="text-center">
                  <img
                    src={form.imageUrl}
                    className="w-32 h-32 rounded-lg border mx-auto"
                  />
                </div>
              )}

              <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
                <Input label="Product Name" value={form.name} icon={<Package size={16} />} required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <Input label="Price" type="number" value={form.price} icon={<DollarSign size={16} />}
                  required onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />

                <Input label="Stock" type="number" value={form.stock} icon={<Hash size={16} />}
                  required onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                />

                <Input label="SKU" value={form.sku} icon={<Hash size={16} />}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                />

                {/* Category dropdown */}
                <div>
                  <label className="text-sm font-medium flex gap-2 mb-2">
                    <Folder size={16} /> Category *
                  </label>
                  <select
                    className="border p-3 rounded-lg w-full"
                    value={form.categoryId}
                    onChange={(e) =>
                      setForm({ ...form, categoryId: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.categoryId} value={c.categoryId}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input label="Image URL" value={form.imageUrl} icon={<Image size={16} />} required
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
              </div>

              <textarea
                className="w-full border p-3 rounded-lg"
                rows={4}
                placeholder="Description..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <button
                onClick={save}
                className="w-full bg-blue-600 text-white p-3 rounded-lg"
              >
                {loading
                  ? mode === "add"
                    ? "Creating..."
                    : "Updating..."
                  : mode === "add"
                  ? "Create Product"
                  : "Update Product"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, required, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium flex gap-2 mb-2">
        {icon} {label} {required && "*"}
      </label>
      <input {...props} className="border p-3 rounded-lg w-full" />
    </div>
  );
}
