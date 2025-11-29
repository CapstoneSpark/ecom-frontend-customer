// // import { useEffect, useState } from "react";
// // import AdminLayout from "./AdminLayout";
// // import { ProductAPI } from "../api/productApi";
// // import { CategoryAPI } from "../api/categoryApi"; // your Category API file
// // import { Plus, Edit, Trash2, Search } from "lucide-react";
// // import ProductDrawer from "./ProductDrawer";
// // import { toast } from "sonner";

// // export default function AdminProductsPage() {
// //   const [products, setProducts] = useState([]);
// //   const [cats, setCats] = useState([]);
// //   const [mappings, setMappings] = useState({});
// //   const [search, setSearch] = useState("");
// //   const [drawerData, setDrawerData] = useState(null);

// //   const loadAll = async () => {
// //     const p = await ProductAPI.getAll();
// //     const c = await CategoryAPI.getCategories();

// //     if (!p.ok) {
// //       toast.error(p.message);
// //       return;
// //     }

// //     setProducts(p.data || []);
// //     setCats(c || []);

// //     // load category mapping for each product
// //     const mapObj = {};
// //     for (const prod of p.data) {
// //       const m = await ProductAPI.getCategoriesByProduct(prod.productId || prod.id);
// //       mapObj[prod.productId || prod.id] = m.ok ? m.data : [];
// //     }

// //     setMappings(mapObj);
// //   };

// //   useEffect(() => {
// //     loadAll();
// //   }, []);

// //   const filtered = products.filter((p) =>
// //     p.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <AdminLayout>
// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-3xl font-bold">Products</h1>

// //         <button
// //           onClick={() =>
// //             setDrawerData({ mode: "add", categories: cats })
// //           }
// //           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
// //         >
// //           <Plus size={18} /> Add Product
// //         </button>
// //       </div>

// //       {/* SEARCH */}
// //       <div className="flex items-center gap-3 mb-4">
// //         <Search size={20} className="text-gray-600" />
// //         <input
// //           placeholder="Search products..."
// //           className="border px-4 py-2 rounded-lg w-80 focus:ring-2 focus:ring-blue-500 outline-none"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //       </div>

// //       {/* TABLE */}
// //       <div className="bg-white shadow rounded-lg overflow-x-auto">
// //         <table className="w-full text-left">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="p-3">Image</th>
// //               <th className="p-3">Name</th>
// //               <th className="p-3">Price</th>
// //               <th className="p-3">Stock</th>
// //               <th className="p-3">Categories</th>
// //               <th className="p-3">Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {filtered.map((p) => {
// //               const pid = p.productId || p.id;
// //               const mapped = mappings[pid] || [];

// //               return (
// //                 <tr key={pid} className="border-b hover:bg-gray-50">
// //                   <td className="p-3">
// //                     <img
// //                       src={p.imageUrl || p.image}
// //                       className="w-14 h-14 rounded object-cover border"
// //                     />
// //                   </td>

// //                   <td className="p-3 font-medium">{p.name}</td>
// //                   <td className="p-3">₹{p.price}</td>
// //                   <td className="p-3">{p.stock}</td>

// //                   <td className="p-3">
// //                     {mapped.length > 0 ? (
// //                       <div className="flex flex-wrap gap-2">
// //                         {mapped.map((m) => (
// //                           <span
// //                             key={m.id}
// //                             className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-700"
// //                           >
// //                             {m.category?.name}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     ) : (
// //                       <span className="text-gray-400 italic">No Categories</span>
// //                     )}
// //                   </td>

// //                   <td className="p-3 flex gap-4">
// //                     <button
// //                       onClick={() =>
// //                         setDrawerData({
// //                           mode: "edit",
// //                           product: p,
// //                           categories: cats,
// //                           mappings: mapped,
// //                         })
// //                       }
// //                       className="text-blue-600 flex items-center gap-1 hover:underline"
// //                     >
// //                       <Edit size={18} /> Edit
// //                     </button>

// //                     <button
// //                       onClick={() =>
// //                         setDrawerData({
// //                           mode: "delete",
// //                           product: p,
// //                         })
// //                       }
// //                       className="text-red-600 flex items-center gap-1 hover:underline"
// //                     >
// //                       <Trash2 size={18} /> Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {drawerData && (
// //         <ProductDrawer
// //           data={drawerData}
// //           close={() => setDrawerData(null)}
// //           refresh={loadAll}
// //         />
// //       )}
// //     </AdminLayout>
// //   );
// // }


// import { useEffect, useState } from "react";
// import AdminLayout from "./AdminLayout";
// import { ProductAPI } from "../api/productApi";
// import { CategoryAPI } from "../api/categoryApi";
// import { Plus, Edit, Trash2, Search } from "lucide-react";
// import ProductDrawer from "./ProductDrawer";
// import { toast } from "sonner";

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [cats, setCats] = useState([]);
//   const [mappings, setMappings] = useState({});
//   const [search, setSearch] = useState("");
//   const [drawerData, setDrawerData] = useState(null);

//   const loadAll = async () => {
//     const p = await ProductAPI.getAll();
//     const c = await CategoryAPI.getCategories();

//     if (!p.ok) {
//       toast.error(p.message);
//       return;
//     }

//     setProducts(p.data || []);
//     setCats(c || []);

//     const mapObj = {};
//     for (const prod of p.data) {
//       const m = await ProductAPI.getCategoriesByProduct(prod.productId || prod.id);
//       mapObj[prod.productId || prod.id] = m.ok ? m.data : [];
//     }

//     setMappings(mapObj);
//   };

//   useEffect(() => {
//     loadAll();
//   }, []);

//   const filtered = products.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <AdminLayout>
//       {/* ⭐ FIX: Proper padded container */}
//       <div className="px-6 py-8 max-w-7xl mx-auto space-y-8">

//         {/* HEADER */}
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-semibold text-gray-900">Products</h1>

//           <button
//             onClick={() => setDrawerData({ mode: "add", categories: cats })}
//             className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5
//                        rounded-lg text-sm font-medium hover:bg-blue-700 transition"
//           >
//             <Plus size={18} /> Add Product
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="w-full max-w-md">
//           <div className="relative">
//             <Search
//               size={18}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               placeholder="Search products..."
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg
//                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                          text-sm text-gray-700"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* ⭐ FIX: Table scroll + Controlled width */}
//         <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
//           <table className="w-full min-w-[1000px] text-left">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-sm font-semibold text-gray-700">Image</th>
//                 <th className="px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
//                 <th className="px-6 py-3 text-sm font-semibold text-gray-700">Price</th>
//                 <th className="px-6 py-3 text-sm font-semibold text-gray-700">Stock</th>
//                 <th className="px-6 py-3 text-sm font-semibold text-gray-700">Categories</th>
//                 <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filtered.map((p) => {
//                 const pid = p.productId || p.id;
//                 const mapped = mappings[pid] || [];

//                 return (
//                   <tr
//                     key={pid}
//                     className="border-b border-gray-100 hover:bg-gray-50 transition"
//                   >
//                     <td className="px-6 py-4">
//                       <img
//                         src={p.imageUrl || p.image}
//                         className="w-14 h-14 rounded-lg object-cover border"
//                       />
//                     </td>

//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">
//                       {p.name}
//                     </td>

//                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">
//                       ₹{p.price}
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-700">{p.stock}</td>

//                     <td className="px-6 py-4">
//                       {mapped.length > 0 ? (
//                         <div className="flex flex-wrap gap-2">
//                           {mapped.map((m) => (
//                             <span
//                               key={m.id}
//                               className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700"
//                             >
//                               {m.category?.name}
//                             </span>
//                           ))}
//                         </div>
//                       ) : (
//                         <span className="text-gray-400 italic text-sm">No Categories</span>
//                       )}
//                     </td>

//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-5">
//                         <button
//                           onClick={() =>
//                             setDrawerData({
//                               mode: "edit",
//                               product: p,
//                               categories: cats,
//                               mappings: mapped,
//                             })
//                           }
//                           className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
//                         >
//                           <Edit size={16} /> Edit
//                         </button>

//                         <button
//                           onClick={() =>
//                             setDrawerData({ mode: "delete", product: p })
//                           }
//                           className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
//                         >
//                           <Trash2 size={16} /> Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {filtered.length === 0 && (
//             <div className="p-10 text-center text-gray-500 text-sm">
//               No products found.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* DRAWER */}
//       {drawerData && (
//         <ProductDrawer
//           data={drawerData}
//           close={() => setDrawerData(null)}
//           refresh={loadAll}
//         />
//       )}
//     </AdminLayout>
//   );
// }


import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { ProductAPI } from "../api/productApi";
import { CategoryAPI } from "../api/categoryApi";
import { Plus, Edit, Trash2, Search, Package } from "lucide-react";
import ProductDrawer from "./ProductDrawer";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [mappings, setMappings] = useState({});
  const [search, setSearch] = useState("");
  const [drawerData, setDrawerData] = useState(null);

  const loadAll = async () => {
    const p = await ProductAPI.getAll();
    const c = await CategoryAPI.getCategories();

    if (!p.ok) {
      toast.error(p.message);
      return;
    }

    setProducts(p.data || []);
    setCats(c || []);

    const mapObj = {};
    for (const prod of p.data) {
      const m = await ProductAPI.getCategoriesByProduct(prod.productId || prod.id);
      mapObj[prod.productId || prod.id] = m.ok ? m.data : [];
    }

    setMappings(mapObj);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>

          <button
            onClick={() => setDrawerData({ mode: "add", categories: cats })}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm w-full sm:w-auto"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.stock > 0).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.stock === 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search
            size={20}
            className="absolute left-3   top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search products by name..."
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
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Categories
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => {
                  const pid = p.productId || p.id;
                  const mapped = mappings[pid] || [];

                  return (
                    <tr key={pid} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={p.imageUrl || p.image}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                            alt={p.name}
                          />
                          <div>
                            <div className="font-medium text-gray-900">{p.name}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              ID: #{pid}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">₹{p.price}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          p.stock > 10 
                            ? "bg-green-100 text-green-800" 
                            : p.stock > 0 
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {p.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {mapped.length > 0 ? (
                          <div className="flex flex-wrap gap-2 max-w-xs">
                            {mapped.slice(0, 3).map((m) => (
                              <span
                                key={m.id}
                                className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 border border-blue-200"
                              >
                                {m.category?.name}
                              </span>
                            ))}
                            {mapped.length > 3 && (
                              <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600 border border-gray-200">
                                +{mapped.length - 3} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-sm">No categories</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setDrawerData({
                                mode: "edit",
                                product: p,
                                categories: cats,
                                mappings: mapped,
                              })
                            }
                            className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200 border border-blue-200"
                          >
                            <Edit size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              setDrawerData({ mode: "delete", product: p })
                            }
                            className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-colors duration-200 border border-red-200"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search ? "No products found" : "No products yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {search 
                  ? "Try adjusting your search terms" 
                  : "Get started by adding your first product"
                }
              </p>
              {!search && (
                <button
                  onClick={() => setDrawerData({ mode: "add", categories: cats })}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  <Plus size={18} />
                  Add Product
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filtered.map((p) => {
            const pid = p.productId || p.id;
            const mapped = mappings[pid] || [];

            return (
              <div key={pid} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="space-y-4">
                  {/* Product Header */}
                  <div className="flex items-start gap-4">
                    <img
                      src={p.imageUrl || p.image}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                      alt={p.name}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg truncate">{p.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">ID: #{pid}</div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Price</div>
                      <div className="font-semibold text-gray-900">₹{p.price}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Stock</div>
                      <div className={`font-medium ${
                        p.stock > 10 
                          ? "text-green-600" 
                          : p.stock > 0 
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}>
                        {p.stock} units
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Categories</div>
                    {mapped.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {mapped.map((m) => (
                          <span
                            key={m.id}
                            className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 border border-blue-200"
                          >
                            {m.category?.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-sm">No categories</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() =>
                        setDrawerData({
                          mode: "edit",
                          product: p,
                          categories: cats,
                          mappings: mapped,
                        })
                      }
                      className="flex-1 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-blue-200"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setDrawerData({ mode: "delete", product: p })
                      }
                      className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 border border-red-200"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {search ? "No products found" : "No products yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {search 
                  ? "Try adjusting your search terms" 
                  : "Get started by adding your first product"
                }
              </p>
              {!search && (
                <button
                  onClick={() => setDrawerData({ mode: "add", categories: cats })}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition w-full justify-center"
                >
                  <Plus size={18} />
                  Add Product
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drawer */}
      {drawerData && (
        <ProductDrawer
          data={drawerData}
          close={() => setDrawerData(null)}
          refresh={loadAll}
        />
      )}
    </AdminLayout>
  );
}