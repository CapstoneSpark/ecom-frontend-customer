


import { useState } from "react";
import { CategoryAPI } from "../api/categoryApi";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CategoryDrawer({ data, close, refresh }) {
  const mode = data.mode;
  const category = data.category;

  const [form, setForm] = useState({
    name: category?.name || "",
    description: category?.description || "",
  });

  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!form.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);
    let res;

    try {
      if (mode === "add") {
        res = await CategoryAPI.createCategory(form);
      } else if (mode === "edit") {
        res = await CategoryAPI.updateCategory(category.categoryId, form);
      }

      if (!res.ok) {
        toast.error(res.message);
      } else {
        toast.success(mode === "add" ? "Category created!" : "Category updated!");
        refresh();
        close();
      }
    } catch {
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    setLoading(true);

    try {
      const res = await CategoryAPI.deleteCategory(category.categoryId);

      if (!res.ok) {
        toast.error(res.message);
      } else {
        toast.success("Category deleted");
        refresh();
        close();
      }
    } catch {
      toast.error("Unexpected error");
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
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "add" && "Add New Category"}
            {mode === "edit" && "Edit Category"}
            {mode === "delete" && "Delete Category"}
          </h2>

          <button
            onClick={close}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* CONTENT */}
        {mode === "delete" ? (
          <>
            {/* Delete content */}
            <div className="flex-1 overflow-y-auto p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={26} className="text-red-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Category?
              </h3>

              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <strong>"{category?.name}"</strong>?<br />
                This action cannot be undone.
              </p>
            </div>

            {/* FIXED FOOTER WITH DELETE BUTTON */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={close}
                  disabled={loading}
                  className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={remove}
                  disabled={loading}
                 className="flex-1 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 border border-transparent disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ADD / EDIT FORM */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  disabled={loading}
                ></textarea>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t bg-gray-50">
              <button
                onClick={save}
                disabled={loading || !form.name.trim()}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Saving..."
                  : mode === "add"
                  ? "Create Category"
                  : "Update Category"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
