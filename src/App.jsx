
// src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import { OrdersPage } from "./components/OrdersPage";
import { WishlistPage } from "./components/WishlistPage";
import ProfilePage from "./components/ProfilePage";

import { AdminDashboard } from "./components/AdminDashboard";
import { AddProductPage } from "./components/AddProductPage";

import { CartAPI } from "./api/cartApi";
import { toast } from "sonner";
import { OrderProcessingPage } from "./components/OrderProcessingPage";

function AppContent() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  // add to cart -> call backend, then notify header + toast
  const handleAddToCart = async (product, qty = 1) => {
    try {
      const userId = user?.id || user?.userId;
      if (!userId) {
        toast.error("Please login to add items to your cart");
        return;
      }

      await CartAPI.addItem(userId, product.sku || product.productId || product.id, qty);

      // notify header to reload cart count
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success(`${product.name} added to cart`);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to add item to cart";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <Header />}
      <NotificationPanel />

      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage onAddToCart={handleAddToCart} />
              </ProtectedRoute>
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
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetailsPage onAddToCart={handleAddToCart} />
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
            path="/order/processing/:id"
            element={
              <ProtectedRoute>
                <OrderProcessingPage />
              </ProtectedRoute>
            }
          />

          <Route path="/categories" element={<ProtectedRoute><CategoriesPage onAddToCart={handleAddToCart} /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/order/success/:id" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
          <Route path="/order/failed/:id" element={<ProtectedRoute><OrderFailedConfirmationPage /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><WishlistPage onAddToCart={handleAddToCart} /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/order/processing/:id" element={<ProtectedRoute><OrderProcessingPage /></ProtectedRoute>} />
          <Route path="/order/success/:id" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
          <Route path="/order/failed/:id" element={<ProtectedRoute><OrderFailedConfirmationPage /></ProtectedRoute>} />


          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-product" element={<ProtectedRoute adminOnly={true}><AddProductPage /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
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
