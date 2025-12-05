
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { CategoryAPI } from "../api/categoryApi";
import { Search, Plus, Edit, Trash2, Folder, FolderOpen, FolderPlus } from "lucide-react";
import CategoryDrawer from "./CategoryDrawer";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [drawerData, setDrawerData] = useState(null);

  const load = async () => {
    const res = await CategoryAPI.getCategories();

    if (res.ok === false) {
      toast.error(res.message || "Failed to load categories");
      return;
    }

    setCategories(res);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.description &&
        c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">Create, update and manage product categories</p>
          </div>

          <button
            onClick={() => setDrawerData({ mode: "add" })}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm w-full sm:w-auto"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Folder className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">With Description</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.filter(c => c.description).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FolderPlus className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">No Description</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.filter(c => !c.description).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search categories by name or description..."
            className="w-full pl-12 pr-4 py-2 px-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((cat) => (
                  <tr key={cat.categoryId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Folder className="text-white" size={18} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{cat.name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            ID: {cat.categoryId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 max-w-md">
                        {cat.description || (
                          <span className="text-gray-400 italic">No description provided</span>
                        )}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setDrawerData({ mode: "edit", category: cat })}
                          className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200 border border-blue-200"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => setDrawerData({ mode: "delete", category: cat })}
                          className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200 border border-red-200"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search ? "No categories found" : "No categories yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {search 
                  ? "Try adjusting your search terms" 
                  : "Get started by creating your first category"
                }
              </p>
              {!search && (
                <button
                  onClick={() => setDrawerData({ mode: "add" })}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <Plus size={18} />
                  Create Category
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filtered.map((cat) => (
            <div key={cat.categoryId} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Folder className="text-white" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg">{cat.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">ID: {cat.categoryId}</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="text-sm text-gray-500 mb-2">Description</div>
                  <p className="text-gray-600">
                    {cat.description || (
                      <span className="text-gray-400 italic">No description provided</span>
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setDrawerData({ mode: "edit", category: cat })}
                    className="flex-1 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-blue-200"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => setDrawerData({ mode: "delete", category: cat })}
                    className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-red-200"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search ? "No categories found" : "No categories yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {search 
                  ? "Try adjusting your search terms" 
                  : "Get started by creating your first category"
                }
              </p>
              {!search && (
                <button
                  onClick={() => setDrawerData({ mode: "add" })}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full justify-center"
                >
                  <Plus size={18} />
                  Create Category
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {drawerData && (
        <CategoryDrawer
          data={drawerData}
          close={() => setDrawerData(null)}
          refresh={load}
        />
      )}
    </AdminLayout>
  );
}