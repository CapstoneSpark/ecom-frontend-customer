
// // src/App.jsx

// import React, { useContext, useState } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import { AuthProvider, AuthContext } from "./context/AuthContext";
// import ProtectedRoute from "./routes/ProtectedRoute";

// import LoginPage from "./components/LoginPage";
// import RegisterPage from "./components/RegisterPage";

// import Header from "./components/Header";
// import { Footer } from "./components/Footer";
// import { NotificationPanel } from "./components/NotificationPanel";

// import { HomePage } from "./components/HomePage";
// import { ProductListPage } from "./components/ProductListPage";
// import { ProductDetailsPage } from "./components/ProductDetailsPage";
// import CartPage from "./components/CartPage";
// import { CategoriesPage } from "./components/CategoriesPage";
// import CheckoutPage from "./components/CheckoutPage";
// import { OrderConfirmationPage } from "./components/OrderConfirmationPage";
// import { OrderFailedConfirmationPage } from "./components/OrderFailedConfirmationPage";
// import { WishlistPage } from "./components/WishlistPage";
// import ProfilePage from "./components/ProfilePage";
// import { OrderProcessingPage } from "./components/OrderProcessingPage";
// import { OrdersPage } from "./components/OrdersPage";

// import { AdminDashboard } from "./components/AdminDashboard";
// import { AddProductPage } from "./components/AddProductPage";

// import { CartAPI } from "./api/cartApi";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { Toaster } from "sonner";

// // ⭐⭐⭐ ADD CHATBOT
// import Chatbot from "./components/Chatbot";

// // import AdminDashboard from "./components/AdminDashboard";
// // import { AddProductPage } from "./components/AddProductPage";
// // import AdminUsersPage from "./admin/AdminUsersPage";
// // import AdminCategoriesPage from "./admin/AdminCategoriesPage";
// // import AdminProductsPage from "./admin/AdminProductsPage";
// // import AdminOrdersPage from "./admin/AdminOrdersPage";


// function AppContent() {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const location = useLocation();
//   const { user } = useContext(AuthContext);

//   const hideLayout =
//     location.pathname === "/login" || location.pathname === "/register";

//   const navigate = useNavigate();

//   const onNavigate = (path, data) => {
//     if (data) navigate(path, { state: data });
//     else navigate(path);
//   };

//   const handleAddToCart = async (product, qty = 1) => {
//     try {
//       const userId = user?.id || user?.userId;

//       if (!userId) {
//         toast.error("Please login to add items to your cart");
//         return;
//       }

//       await CartAPI.addItem(
//         userId,
//         product.sku || product.productId || product.id,
//         qty
//       );

//       window.dispatchEvent(new Event("cartUpdated"));
//       toast.success(`${product.name} added to cart`);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to add item to cart");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       {!hideLayout && (
//         <Header onNotificationsClick={() => setShowNotifications(true)} />
//       )}

//       <NotificationPanel
//         isOpen={showNotifications}
//         onClose={() => setShowNotifications(false)}
//       />

//       <main className="flex-1">
//         <Routes>
//           {/* Auth */}
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />

//           {/* Pages */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <HomePage onAddToCart={handleAddToCart} onNavigate={onNavigate} />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/products"
//             element={
//               <ProtectedRoute>
//                 <ProductListPage onAddToCart={handleAddToCart} />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/product/:id"
//             element={
//               <ProtectedRoute>
//                 <ProductDetailsPage onAddToCart={handleAddToCart} />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <CartPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <CheckoutPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/orders"
//             element={
//               <ProtectedRoute>
//                 <OrdersPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/order/processing/:id"
//             element={
//               <ProtectedRoute>
//                 <OrderProcessingPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/order/success/:id"
//             element={
//               <ProtectedRoute>
//                 <OrderConfirmationPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/order/failed/:id"
//             element={
//               <ProtectedRoute>
//                 <OrderFailedConfirmationPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/wishlist"
//             element={
//               <ProtectedRoute>
//                 <WishlistPage onAddToCart={handleAddToCart} />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin/dashboard"
//             element={
//               <ProtectedRoute adminOnly>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/categories"
//             element={
//               <ProtectedRoute>
//                 <CategoriesPage onAddToCart={handleAddToCart} onNavigate={onNavigate} />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/admin/add-product"
//             element={
//               <ProtectedRoute adminOnly>
//                 <AddProductPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>

//       {!hideLayout && <Footer />}

//       {/* ⭐⭐⭐ Add Chatbot here */}
//       {!hideLayout && <Chatbot />}

//       <Toaster richColors position="top-center" />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }


// src/App.jsx

import React, { useContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { NotificationPanel } from "./components/NotificationPanel";

import { HomePage } from "./components/HomePage";
import { ProductListPage } from "./components/ProductListPage";
import { ProductDetailsPage } from "./components/ProductDetailsPage";
import CartPage from "./components/CartPage";
import { CategoriesPage } from "./components/CategoriesPage";
import CheckoutPage from "./components/CheckoutPage";
import { OrderConfirmationPage } from "./components/OrderConfirmationPage";
import { OrderFailedConfirmationPage } from "./components/OrderFailedConfirmationPage";
import { WishlistPage } from "./components/WishlistPage";
import ProfilePage from "./components/ProfilePage";
import { OrderProcessingPage } from "./components/OrderProcessingPage";
import { OrdersPage } from "./components/OrdersPage";

import Chatbot from "./components/Chatbot";

// ⭐ ADD ADMIN PAGES
import AdminDashboard from "./admin/Dashboard";
import AdminUsersPage from "./admin/AdminUsersPage";
import AdminCategoriesPage from "./admin/AdminCategoriesPage";
import AdminProductsPage from "./admin/AdminProductsPage";
import AdminOrdersPage from "./admin/AdminOrdersPage";

import { CartAPI } from "./api/cartApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

function AppContent() {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  const navigate = useNavigate();

  const onNavigate = (path, data) => {
    if (data) navigate(path, { state: data });
    else navigate(path);
  };

  const handleAddToCart = async (product, qty = 1) => {
    try {
      const userId = user?.id || user?.userId;

      if (!userId) {
        toast.error("Please login to add items to your cart");
        return;
      }

      await CartAPI.addItem(
        userId,
        product.sku || product.productId || product.id,
        qty
      );

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add item to cart");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && (
        <Header onNotificationsClick={() => setShowNotifications(true)} />
      )}

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <main className="flex-1">
        <Routes>

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* NORMAL USER ROUTES */}
          {/* <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage onAddToCart={handleAddToCart} onNavigate={onNavigate} />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onNavigate={onNavigate}
                onProductClick={onNavigate}
              />
            }
          />


          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductListPage onAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage onAddToCart={handleAddToCart} onNavigate={onNavigate} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetailsPage onAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/processing/:id"
            element={
              <ProtectedRoute>
                <OrderProcessingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/success/:id"
            element={
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order/failed/:id"
            element={
              <ProtectedRoute>
                <OrderFailedConfirmationPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage onAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute adminOnly>
                <AdminCategoriesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
      {!hideLayout && <Chatbot />}
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
