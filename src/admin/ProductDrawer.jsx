// import { useState } from "react";
// import { X, Trash2 } from "lucide-react";
// import { ProductAPI } from "../api/productApi";
// import { ProductCategoryAPI } from "../api/productCategoryApi";
// import { toast } from "sonner";

// export default function ProductDrawer({ data, close, refresh }) {
//   const mode = data.mode;
//   const product = data.product;
//   const categories = data.categories;

//   const [form, setForm] = useState({
//     name: product?.name || "",
//     price: product?.price || "",
//     stock: product?.stock || "",
//     sku: product?.sku || "",
//     description: product?.description || "",
//     imageUrl: product?.imageUrl || product?.image || "",
//     categoryId: product?.categories?.[0]?.categoryId || "",
//   });

//   const [loading, setLoading] = useState(false);

//   // ---------------------------
//   // SAVE PRODUCT
//   // ---------------------------
//   const save = async () => {
//     if (!form.name.trim() || !form.categoryId) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     const payload = {
//       name: form.name,
//       price: form.price,
//       stock: form.stock,
//       sku: form.sku,
//       description: form.description,
//       imageUrl: form.imageUrl
//     };

//     try {
//       setLoading(true);

//       let saved;

//       if (mode === "add") {
//         saved = await ProductAPI.create(payload);

//         // Map product → category
//         await ProductCategoryAPI.create({
//           productId: saved.data.productId,
//           categoryId: Number(form.categoryId)
//         });

//         toast.success("Product created successfully");

//       } else {
//         saved = await ProductAPI.update(product.productId, payload);

//         // Update category mapping
//         await ProductCategoryAPI.create({
//           productId: product.productId,
//           categoryId: Number(form.categoryId)
//         });

//         toast.success("Product updated");
//       }

//       await refresh();
//       close();

//     } catch (err) {
//       console.error(err);
//       toast.error(err.message || "Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------
//   // DELETE PRODUCT
//   // ---------------------------
//   const remove = async () => {
//     try {
//       setLoading(true);
//       await ProductAPI.delete(product.productId);
//       toast.success("Product deleted");
//       await refresh();
//       close();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 flex justify-end z-50"
//       onClick={close}
//     >
//       <div
//         className="bg-white w-[420px] h-full p-7 shadow-2xl overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* CLOSE */}
//         <button className="absolute right-6 top-6" onClick={close}>
//           <X size={24} />
//         </button>

//         {/* TITLE */}
//         <h2 className="text-2xl font-bold mb-6">
//           {mode === "add" && "Add Product"}
//           {mode === "edit" && "Edit Product"}
//           {mode === "delete" && "Delete Product"}
//         </h2>

//         {/* DELETE MODE */}
//         {mode === "delete" ? (
//           <>
//             <p className="text-lg mb-4">
//               Are you sure you want to delete
//               <b> {product.name}</b>?
//             </p>

//             <button
//               className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 mt-4 hover:bg-red-700 transition"
//               disabled={loading}
//               onClick={remove}
//             >
//               <Trash2 size={18} />
//               {loading ? "Deleting..." : "Delete Product"}
//             </button>
//           </>
//         ) : (
//           <>
//             {/* FORM */}
//             <div className="space-y-4">
//               {/* NAME */}
//               <div>
//                 <label className="font-semibold">Name *</label>
//                 <input
//                   className="border w-full p-3 rounded-lg mt-1"
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   disabled={loading}
//                 />
//               </div>

//               {/* PRICE */}
//               <div>
//                 <label className="font-semibold">Price *</label>
//                 <input
//                   type="number"
//                   className="border w-full p-3 rounded-lg mt-1"
//                   value={form.price}
//                   onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
//                   disabled={loading}
//                 />
//               </div>

//               {/* STOCK */}
//               <div>
//                 <label className="font-semibold">Stock *</label>
//                 <input
//                   type="number"
//                   className="border w-full p-3 rounded-lg mt-1"
//                   value={form.stock}
//                   onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
//                   disabled={loading}
//                 />
//               </div>

//               {/* SKU */}
//               <div>
//                 <label className="font-semibold">SKU</label>
//                 <input
//                   className="border w-full p-3 rounded-lg mt-1"
//                   value={form.sku}
//                   onChange={(e) => setForm({ ...form, sku: e.target.value })}
//                   disabled={loading}
//                 />
//               </div>

//               {/* CATEGORY */}
//               <div>
//                 <label className="font-semibold">Category *</label>
//                 <select
//                   className="border w-full p-3 rounded-lg mt-1"
//                   value={form.categoryId}
//                   onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
//                   disabled={loading}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((c) => (
//                     <option value={c.categoryId} key={c.categoryId}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* DESCRIPTION */}
//               <div>
//                 <label className="font-semibold">Description</label>
//                 <textarea
//                   rows={4}
//                   className="border w-full p-3 rounded-lg mt-1 resize-none"
//                   value={form.description}
//                   onChange={(e) =>
//                     setForm({ ...form, description: e.target.value })
//                   }
//                   disabled={loading}
//                 />
//               </div>

//               {/* IMAGE URL */}
//               <div>
//                 <label className="font-semibold">Image URL *</label>
//                 <input
//                   className="border w-full p-3 rounded-lg mt-1"
//                   value={form.imageUrl}
//                   onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* SAVE BUTTON */}
//             <button
//               className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition"
//               disabled={loading}
//               onClick={save}
//             >
//               {loading ? "Saving..." : mode === "add" ? "Create Product" : "Update Product"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { X, Trash2, Package, DollarSign, Hash, Folder, FileText, Image, AlertTriangle } from "lucide-react";
// import { ProductAPI } from "../api/productApi";
// import { ProductCategoryAPI } from "../api/productCategoryApi";
// import { toast } from "sonner";

// export default function ProductDrawer({ data, close, refresh }) {
//   const mode = data.mode;
//   const product = data.product;
//   const categories = data.categories;

//   const [form, setForm] = useState({
//     name: product?.name || "",
//     price: product?.price || "",
//     stock: product?.stock || "",
//     sku: product?.sku || "",
//     description: product?.description || "",
//     imageUrl: product?.imageUrl || product?.image || "",
//     categoryId: product?.categories?.[0]?.categoryId || "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const save = async () => {
//     if (!form.name.trim() || !form.categoryId || !form.imageUrl.trim()) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     if (!form.price || form.price <= 0) {
//       toast.error("Please enter a valid price");
//       return;
//     }

//     if (form.stock < 0) {
//       toast.error("Stock cannot be negative");
//       return;
//     }

//     const payload = {
//       name: form.name,
//       price: form.price,
//       stock: form.stock,
//       sku: form.sku,
//       description: form.description,
//       imageUrl: form.imageUrl
//     };

//     try {
//       setLoading(true);

//       let saved;

//       if (mode === "add") {
//         saved = await ProductAPI.createProduct(payload);

//         // Map product → category
//         await ProductCategoryAPI.createProduct({
//           productId: saved.data.productId,
//           categoryId: Number(form.categoryId)
//         });

//         toast.success("Product created successfully");

//       } else {
//         saved = await ProductAPI.update(product.productId, payload);

//         // Update category mapping
//         await ProductCategoryAPI.createProduct({
//           productId: product.productId,
//           categoryId: Number(form.categoryId)
//         });

//         toast.success("Product updated");
//       }

//       await refresh();
//       close();

//     } catch (err) {
//       console.error(err);
//       toast.error(err.message || "Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const remove = async () => {
//     try {
//       setLoading(true);
//       await ProductAPI.delete(product.productId);
//       toast.success("Product deleted successfully");
//       await refresh();
//       close();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//       onClick={close}
//     >
//       <div
//         className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Package className="text-blue-600" size={20} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">
//                 {mode === "add" && "Add New Product"}
//                 {mode === "edit" && "Edit Product"}
//                 {mode === "delete" && "Delete Product"}
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 {mode === "add" && "Create a new product listing"}
//                 {mode === "edit" && "Update product details"}
//                 {mode === "delete" && "Remove product from catalog"}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={close}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X size={20} className="text-gray-500" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {/* DELETE MODE */}
//           {mode === "delete" ? (
//             <div className="space-y-6">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Trash2 size={24} className="text-red-600" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   Delete Product?
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Are you sure you want to delete <strong>"{product?.name}"</strong>? 
//                   This action cannot be undone and will remove the product from your catalog.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button
//                   onClick={close}
//                   disabled={loading}
//                   className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 order-2 sm:order-1"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={remove}
//                   disabled={loading}
//                   className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2 order-1 sm:order-2"
//                 >
//                   {loading ? (
//                     "Deleting..."
//                   ) : (
//                     <>
//                       <Trash2 size={18} />
//                       Delete Product
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           ) : (
//             /* ADD / EDIT MODE */
//             <div className="space-y-6">
//               {/* Product Image Preview */}
//               {form.imageUrl && (
//                 <div className="flex justify-center">
//                   <div className="relative">
//                     <img
//                       src={form.imageUrl}
//                       alt="Product preview"
//                       className="w-32 h-32 rounded-lg object-cover border border-gray-200"
//                     />
//                     {!form.imageUrl.startsWith('http') && (
//                       <div className="absolute inset-0 bg-yellow-100 bg-opacity-50 rounded-lg flex items-center justify-center">
//                         <span className="text-xs text-yellow-800 font-medium text-center px-2">
//                           Invalid URL
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Left Column */}
//                 <div className="space-y-4">
//                   {/* Name */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <Package size={16} />
//                       Product Name *
//                     </label>
//                     <input
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
//                       placeholder="Enter product name"
//                       value={form.name}
//                       onChange={(e) => setForm({ ...form, name: e.target.value })}
//                       disabled={loading}
//                     />
//                   </div>

//                   {/* Price */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <DollarSign size={16} />
//                       Price *
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       step="0.01"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
//                       placeholder="0.00"
//                       value={form.price}
//                       onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
//                       disabled={loading}
//                     />
//                   </div>

//                   {/* Stock */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <Hash size={16} />
//                       Stock *
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
//                       placeholder="0"
//                       value={form.stock}
//                       onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
//                       disabled={loading}
//                     />
//                   </div>

//                   {/* SKU */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <Hash size={16} />
//                       SKU
//                     </label>
//                     <input
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
//                       placeholder="Product SKU (optional)"
//                       value={form.sku}
//                       onChange={(e) => setForm({ ...form, sku: e.target.value })}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-4">
//                   {/* Category */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <Folder size={16} />
//                       Category *
//                     </label>
//                     <select
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-900"
//                       value={form.categoryId}
//                       onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
//                       disabled={loading}
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map((c) => (
//                         <option value={c.categoryId} key={c.categoryId}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Image URL */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <Image size={16} />
//                       Image URL *
//                     </label>
//                     <input
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900 placeholder-gray-400"
//                       placeholder="https://example.com/image.jpg"
//                       value={form.imageUrl}
//                       onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
//                       disabled={loading}
//                     />
//                     <p className="text-xs text-gray-500 mt-2">
//                       Enter a valid image URL for the product
//                     </p>
//                   </div>

//                   {/* Description */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                       <FileText size={16} />
//                       Description
//                     </label>
//                     <textarea
//                       rows={4}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition text-gray-900 placeholder-gray-400"
//                       placeholder="Product description (optional)"
//                       value={form.description}
//                       onChange={(e) => setForm({ ...form, description: e.target.value })}
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Save Button */}
//               <div className="pt-4 border-t border-gray-200">
//                 <button
//                   onClick={save}
//                   disabled={loading || !form.name.trim() || !form.categoryId || !form.imageUrl.trim()}
//                   className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {loading ? (
//                     <div className="flex items-center gap-2">
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       {mode === "add" ? "Creating..." : "Updating..."}
//                     </div>
//                   ) : mode === "add" ? (
//                     "Create Product"
//                   ) : (
//                     "Update Product"
//                   )}
//                 </button>
//               </div>

//               {/* Danger Zone for Edit Mode */}
//               {mode === "edit" && (
//                 <div className="border-t border-gray-200 pt-6">
//                   <div className="bg-red-50 border border-red-200 rounded-xl p-5">
//                     <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
//                       <AlertTriangle size={20} />
//                       Danger Zone
//                     </h3>
//                     <p className="text-red-700 mb-4">
//                       Once you delete this product, there is no going back. Please be certain.
//                     </p>
//                     <button
//                       onClick={() => setConfirmDelete(true)}
//                       disabled={loading}
//                       className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
//                     >
//                       <Trash2 size={18} />
//                       Delete Product
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   X,
//   Trash2,
//   Package,
//   DollarSign,
//   Hash,
//   Folder,
//   FileText,
//   Image,
//   AlertTriangle,
// } from "lucide-react";

// import { ProductAPI } from "../api/productApi";
// import { ProductCategoryAPI } from "../api/productCategoryApi";
// import { toast } from "sonner";

// export default function ProductDrawer({ data, close, refresh }) {
//   const mode = data.mode; // add | edit | delete
//   const product = data.product;
//   const categories = data.categories;

//   const [form, setForm] = useState({
//     name: product?.name || "",
//     price: product?.price || "",
//     stock: product?.stock || "",
//     sku: product?.sku || "",
//     description: product?.description || "",
//     imageUrl: product?.imageUrl || product?.image || "",
//     categoryId: product?.categories?.[0]?.categoryId || "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   // ---------------------------------------------------------------------------
//   // SAVE PRODUCT (CREATE / UPDATE)
//   // ---------------------------------------------------------------------------
//   const save = async () => {
//     // Validation
//     if (!form.name.trim() || !form.categoryId || !form.imageUrl.trim()) {
//       toast.error("Please fill all required fields");
//       return;
//     }
//     if (!form.price || form.price <= 0) {
//       toast.error("Please enter a valid price");
//       return;
//     }
//     if (form.stock < 0) {
//       toast.error("Stock cannot be negative");
//       return;
//     }

//     const payload = {
//       name: form.name,
//       price: form.price,
//       stock: form.stock,
//       sku: form.sku,
//       description: form.description,
//       imageUrl: form.imageUrl,
//     };

//     try {
//       setLoading(true);

//       let savedProduct;

//       if (mode === "add") {
//         // CREATE PRODUCT
//         const result = await ProductAPI.createProduct(payload);

//         if (!result.ok) {
//           toast.error(result.message);
//           return;
//         }

//         savedProduct = result.data;

//         // MAP PRODUCT → CATEGORY
//         await ProductCategoryAPI.createProduct({
//           productId: savedProduct.productId,
//           categoryId: Number(form.categoryId),
//         });

//         toast.success("Product created successfully");

//       } else {
//         // UPDATE PRODUCT
//         const result = await ProductAPI.updateProduct(product.productId, payload);

//         if (!result.ok) {
//           toast.error(result.message);
//           return;
//         }

//         savedProduct = result.data;

//         // UPDATE MAP
//         await ProductCategoryAPI.createProduct({
//           productId: product.productId,
//           categoryId: Number(form.categoryId),
//         });

//         toast.success("Product updated");
//       }

//       await refresh();
//       close();

//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------------------------------
//   // DELETE PRODUCT
//   // ---------------------------------------------------------------------------
//   const remove = async () => {
//     try {
//       setLoading(true);

//       const result = await ProductAPI.deleteProduct(product.productId);

//       if (!result.ok) {
//         toast.error(result.message);
//         return;
//       }

//       toast.success("Product deleted successfully");
//       await refresh();
//       close();

//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------------------------------
//   // UI STARTS HERE
//   // ---------------------------------------------------------------------------
//   return (
//     <div
//       className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//       onClick={close}
//     >
//       <div
//         className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <Package className="text-blue-600" size={20} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold text-gray-900">
//                 {mode === "add" && "Add New Product"}
//                 {mode === "edit" && "Edit Product"}
//                 {mode === "delete" && "Delete Product"}
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 {mode === "add" && "Create a new product listing"}
//                 {mode === "edit" && "Update product details"}
//                 {mode === "delete" && "Remove product from catalog"}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={close}
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X size={20} className="text-gray-500" />
//           </button>
//         </div>

//         {/* CONTENT */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {/* DELETE MODE */}
//           {mode === "delete" ? (
//             <div className="space-y-6">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Trash2 size={24} className="text-red-600" />
//                 </div>

//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   Delete Product?
//                 </h3>

//                 <p className="text-gray-600 mb-4">
//                   Are you sure you want to delete <b>"{product.name}"</b>?  
//                   This action cannot be undone.
//                 </p>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   onClick={close}
//                   className="flex-1 py-3 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={remove}
//                   className="flex-1 py-3 bg-red-600 text-white rounded-lg"
//                 >
//                   {loading ? "Deleting..." : "Yes, Delete"}
//                 </button>
//               </div>
//             </div>

//           ) : (
//             // ADD / EDIT MODE
//             <div className="space-y-6">

//               {/* PREVIEW */}
//               {form.imageUrl && (
//                 <div className="flex justify-center">
//                   <img
//                     src={form.imageUrl}
//                     className="w-32 h-32 rounded-lg border object-cover"
//                   />
//                 </div>
//               )}

//               {/* FORM */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* NAME */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium">
//                     <Package size={16} /> Product Name *
//                   </label>
//                   <input
//                     className="w-full border p-3 rounded-lg"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   />
//                 </div>

//                 {/* PRICE */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium">
//                     <DollarSign size={16} /> Price *
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full border p-3 rounded-lg"
//                     value={form.price}
//                     onChange={(e) =>
//                       setForm({ ...form, price: Number(e.target.value) })
//                     }
//                   />
//                 </div>

//                 {/* STOCK */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium">
//                     <Hash size={16} /> Stock *
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full border p-3 rounded-lg"
//                     value={form.stock}
//                     onChange={(e) =>
//                       setForm({ ...form, stock: Number(e.target.value) })
//                     }
//                   />
//                 </div>

//                 {/* SKU */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium">
//                     <Hash size={16} /> SKU
//                   </label>
//                   <input
//                     className="w-full border p-3 rounded-lg"
//                     value={form.sku}
//                     onChange={(e) =>
//                       setForm({ ...form, sku: e.target.value })
//                     }
//                   />
//                 </div>

//                 {/* CATEGORY */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium">
//                     <Folder size={16} /> Category *
//                   </label>
//                   <select
//                     className="w-full border p-3 rounded-lg"
//                     value={form.categoryId}
//                     onChange={(e) =>
//                       setForm({ ...form, categoryId: Number(e.target.value) })
//                     }
//                   >
//                     <option value="">Select category</option>
//                     {categories.map((c) => (
//                       <option value={c.categoryId} key={c.categoryId}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* IMAGE URL */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium">
//                     <Image size={16} /> Image URL *
//                   </label>
//                   <input
//                     className="w-full border p-3 rounded-lg"
//                     value={form.imageUrl}
//                     onChange={(e) =>
//                       setForm({ ...form, imageUrl: e.target.value })
//                     }
//                   />
//                 </div>

//                 {/* DESCRIPTION */}
//                 <div className="md:col-span-2">
//                   <label className="flex items-center gap-2 text-sm font-medium">
//                     <FileText size={16} /> Description
//                   </label>
//                   <textarea
//                     rows={4}
//                     className="w-full border p-3 rounded-lg"
//                     value={form.description}
//                     onChange={(e) =>
//                       setForm({ ...form, description: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//               {/* SAVE BUTTON */}
//               <button
//                 onClick={save}
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg"
//               >
//                 {loading
//                   ? mode === "add"
//                     ? "Creating..."
//                     : "Updating..."
//                   : mode === "add"
//                   ? "Create Product"
//                   : "Update Product"}
//               </button>

//               {/* DANGER ZONE */}
//               {mode === "edit" && (
//                 <div className="border-t pt-6">
//                   <button
//                     onClick={() => setConfirmDelete(true)}
//                     className="w-full bg-red-600 text-white py-3 rounded-lg"
//                   >
//                     Delete Product
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


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
