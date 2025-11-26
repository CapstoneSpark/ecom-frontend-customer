// import React, { useState } from "react";

// import { products as mockProducts } from "./data/mockData";

// import AccountDetailsPage from "./components/AccountDetailsPage.jsx";
// import UserOrdersPage from "./components/UserOrdersPage.jsx";
// import UserSettingsPage from "./components/UserSettingsPage.jsx";
// import { AccountPage } from "./components/AccountPage.jsx";

// import { Header } from "./components/Header";
// import { Footer } from "./components/Footer";
// import { HomePage } from "./components/HomePage.jsx";
// import { ProductListPage } from "./components/ProductListPage";
// import { ProductDetailsPage } from "./components/ProductDetailsPage.jsx";
// import { CartPage } from "./components/CartPage";
// import { CategoriesPage } from "./components/CategoriesPage.jsx";
// import { CheckoutPage } from "./components/CheckoutPage";
// import { OrderConfirmationPage } from "./components/OrderConfirmationPage";
// import { OrderFailedConfirmationPage } from "./components/OrderFailedConfirmationPage.jsx";
// import { OrdersPage } from "./components/OrdersPage.jsx";
// import { WishlistPage } from "./components/WishlistPage";
// import { NotificationPanel } from "./components/NotificationPanel";
// import { AdminDashboard } from "./components/AdminDashboard.jsx";
// import { AddProductPage } from "./components/AddProductPage";

// import LoginPage from "./components/LoginPage.jsx";
// import ProfilePage from "./components/ProfilePage.jsx";

// import { toast } from "sonner";
// import { NotificationService } from "./services/notificationService";

// function App() {
//   const [currentPage, setCurrentPage] = useState("home");

//   // ⭐ Logged in user
//   const [user, setUser] = useState(null);

//   // ⭐ Product State (used by Admin panel)
//   const [productList, setProductList] = useState(mockProducts);

//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // ⭐ Handle Navigation
//   const handleNavigate = (page, id) => {
//     setCurrentPage(page);

//     if (page === "product-details") setSelectedProductId(id);
//     if (page === "order-confirmation") setSelectedOrderId(id);
//     if (page === "order-failed") setSelectedOrderId(id);

//     window.scrollTo(0, 0);
//   };

//   // ⭐ Logout
//   const logout = () => {
//     setUser(null);
//     setCurrentPage("login");
//   };

//   // ⭐ ADD product (called from AddProductPage)
//   const handleAddProduct = (productData) => {
//     const newProduct = {
//       id: Date.now(), // simple unique id
//       rating: 4.5,
//       reviews: 10,
//       ...productData,
//     };

//     setProductList((prev) => [...prev, newProduct]);
//     toast.success("Product added successfully");
//   };

//   // ⭐ DELETE product (called from AdminDashboard)
//   const handleDeleteProduct = (id) => {
//     setProductList((prev) => prev.filter((p) => p.id !== id));
//     toast.success("Product deleted successfully");
//   };

//   // ⭐ CART FUNCTIONS
//   const handleAddToCart = (product, quantity = 1) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id);

//       if (existing) {
//         toast.success(`Updated ${product.name} quantity`);
//         return prev.map((i) =>
//           i.id === product.id
//             ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
//             : i
//         );
//       }

//       toast.success(`Added ${product.name} to cart`);
//       return [...prev, { ...product, quantity }];
//     });
//   };

//   const handleUpdateQuantity = (productId, quantity) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const handleRemoveItem = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== productId));
//     toast.success("Item removed from cart");
//   };

//   // ⭐ WISHLIST
//   const handleAddToWishlist = (product) => {
//     setWishlistItems((prev) => {
//       const exists = prev.find((i) => i.id === product.id);
//       if (exists) {
//         toast.info("Already in wishlist");
//         return prev;
//       }
//       toast.success(`Added ${product.name} to wishlist`);
//       return [...prev, product];
//     });
//   };

//   const handleRemoveFromWishlist = (productId) => {
//     setWishlistItems((prev) => prev.filter((i) => i.id !== productId));
//     toast.success("Removed from wishlist");
//   };

//   // ⭐ ORDER COMPLETION
//   const handleOrderComplete = (orderId) => {
//     const subtotal = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
//     const shipping = subtotal > 100 ? 0 : 15;
//     const tax = subtotal * 0.1;

//     const newOrder = {
//       id: orderId,
//       orderNumber: orderId,
//       date: new Date().toISOString(),
//       items: cartItems,
//       subtotal,
//       shipping,
//       tax,
//       total: subtotal + shipping + tax,
//     };

//     setOrders((prev) => [newOrder, ...prev]);
//     setCartItems([]);

//     NotificationService.addNotification({
//       type: "order",
//       title: "Order Placed!",
//       message: `Order ${orderId} is being processed`,
//     });
//   };

//   const totalCartItems = cartItems.reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );

//   // *************** ADMIN ROUTES ***************
//   if (currentPage === "admin-dashboard") {
//     return (
//       <AdminDashboard
//         products={productList}
//         onNavigate={handleNavigate}
//         onDeleteProduct={handleDeleteProduct}
//       />
//     );
//   }

//   if (currentPage === "admin-add-product") {
//     return (
//       <AddProductPage
//         onNavigate={handleNavigate}
//         onAddProduct={handleAddProduct}
//       />
//     );
//   }

//   // *************** MAIN UI ***************
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header
//         cartCount={totalCartItems}
//         wishlistCount={wishlistItems.length}
//         onCartClick={() => handleNavigate("cart")}
//         onWishlistClick={() => handleNavigate("wishlist")}
//         onNavigate={handleNavigate}
//         onNotificationsClick={() => setShowNotifications(true)}
//       />

//       <NotificationPanel
//         isOpen={showNotifications}
//         onClose={() => setShowNotifications(false)}
//       />

//       <main className="flex-1">
//         {currentPage === "home" && (
//           <HomePage
//             onAddToCart={handleAddToCart}
//             onProductClick={(id) => handleNavigate("product-details", id)}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "products" && (
//           <ProductListPage
//             onAddToCart={handleAddToCart}
//             onProductClick={(id) => handleNavigate("product-details", id)}
//           />
//         )}

//         {currentPage === "product-details" && selectedProductId && (
//           <ProductDetailsPage
//             productId={selectedProductId}
//             onAddToCart={handleAddToCart}
//             onAddToWishlist={handleAddToWishlist}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "cart" && (
//           <CartPage
//             cartItems={cartItems}
//             onUpdateQuantity={handleUpdateQuantity}
//             onRemoveItem={handleRemoveItem}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "categories" && (
//           <CategoriesPage
//             onAddToCart={handleAddToCart}
//             onProductClick={(id) => handleNavigate("product-details", id)}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "checkout" && (
//           <CheckoutPage
//             cartItems={cartItems}
//             onNavigate={handleNavigate}
//             onOrderComplete={handleOrderComplete}
//           />
//         )}

//         {currentPage === "order-confirmation" && (
//           <OrderConfirmationPage
//             orderId={selectedOrderId}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "order-failed" && (
//           <OrderFailedConfirmationPage
//             orderId={selectedOrderId}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "orders" && (
//           <OrdersPage orders={orders} onNavigate={handleNavigate} />
//         )}

//         {currentPage === "wishlist" && (
//           <WishlistPage
//             wishlistItems={wishlistItems}
//             onRemoveFromWishlist={handleRemoveFromWishlist}
//             onAddToCart={handleAddToCart}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "login" && (
//           <LoginPage onNavigate={handleNavigate} setUser={setUser} />
//         )}

//         {currentPage === "profile" && user && (
//           <ProfilePage
//             user={user}
//             logout={logout}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "account-details" && (
//           <AccountDetailsPage
//             user={user}
//             logout={logout}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "user-orders" && (
//           <UserOrdersPage
//             orders={orders}
//             logout={logout}
//             onNavigate={handleNavigate}
//           />
//         )}

//         {currentPage === "user-settings" && (
//           <UserSettingsPage logout={logout} onNavigate={handleNavigate} />
//         )}

//         {currentPage === "account" && (
//           <AccountPage user={user} onNavigate={handleNavigate} />
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default App;


// ------


import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

// UI
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotificationPanel } from "./components/NotificationPanel";

// User pages
import { HomePage } from "./components/HomePage";
import { ProductListPage } from "./components/ProductListPage";
import { ProductDetailsPage } from "./components/ProductDetailsPage";
import { CartPage } from "./components/CartPage";
import { CategoriesPage } from "./components/CategoriesPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { OrderConfirmationPage } from "./components/OrderConfirmationPage";
import { OrderFailedConfirmationPage } from "./components/OrderFailedConfirmationPage";
import { OrdersPage } from "./components/OrdersPage";
import { WishlistPage } from "./components/WishlistPage";
import ProfilePage from "./components/ProfilePage";

// Admin pages
import { AdminDashboard } from "./components/AdminDashboard";
import { AddProductPage } from "./components/AddProductPage";


function AppContent() {
  const location = useLocation();

  // Hide header & footer on login and register pages
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col">

      {/* Header (hidden on login/register) */}
      {!hideLayout && <Header />}

      <NotificationPanel />

      <main className="flex-1">
        <Routes>

          <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>


          {/* ---------- AUTH ROUTES ---------- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ---------- CUSTOMER ROUTES ---------- */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetailsPage />
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
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
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
                <WishlistPage />
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

          {/* ---------- ADMIN ROUTES ---------- */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute adminOnly={true}>
                <AddProductPage />
              </ProtectedRoute>
            }
          />

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer (hidden on login/register) */}
      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
