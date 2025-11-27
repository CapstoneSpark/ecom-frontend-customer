// import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { Search, ShoppingCart, User, Menu, Bell, Heart } from "lucide-react";
// import { useState, useEffect } from "react";
// import { NotificationService } from "../services/notificationService";

// import { useNavigate } from "react-router-dom";


// export function Header({
//   cartCount = 0,
//   wishlistCount = 0,
//   onCartClick,
//   onNavigate,
//   onNotificationsClick,
//   onWishlistClick,
// }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [unreadNotifications, setUnreadNotifications] = useState(0);

//   const navigate = useNavigate();


//   useEffect(() => {
//     const unsubscribe = NotificationService.subscribe(() => {
//       setUnreadNotifications(NotificationService.getUnreadCount());
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex items-center justify-between gap-6">

//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <button className="lg:hidden">
//               <Menu className="w-6 h-6" />
//             </button>

//             <button
//               onClick={() => onNavigate?.("/")}
//               className="flex items-center gap-2"
//             >
//               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <ShoppingCart className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl hidden sm:block">ShopHub</span>
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-1 max-w-2xl">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
//                 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center gap-4">

//             {/* Navigation links */}
//             <nav className="hidden lg:flex items-center gap-6">
//               <button
//                 onClick={() => onNavigate?.("/")}
//                 className="hover:text-blue-600"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => onNavigate?.("products")}
//                 className="hover:text-blue-600"
//               >
//                 Products
//               </button>
//               <button
//                 onClick={() => onNavigate?.("categories")}
//                 className="hover:text-blue-600"
//               >
//                 Categories
//               </button>
//             </nav>

//             {/* Cart */}
//             <button
//               onClick={onCartClick}
//               className="relative p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
//                 rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </button>

//             {/* Wishlist */}
//             <button
//               onClick={onWishlistClick}
//               className="relative p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <Heart className="w-6 h-6" />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
//                 rounded-full w-5 h-5 flex items-center justify-center">
//                   {wishlistCount}
//                 </span>
//               )}
//             </button>

//             {/* Notifications */}
//             <button
//               onClick={onNotificationsClick}
//               className="relative p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <Bell className="w-6 h-6" />
//               {unreadNotifications > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
//                 rounded-full w-5 h-5 flex items-center justify-center">
//                   {unreadNotifications}
//                 </span>
//               )}
//             </button>

//             {/* ⭐ UPDATED LOGIN BUTTON ⭐ */}
//             <button
//               onClick={() => onNavigate("login")}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600
//               text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <User className="w-5 h-5" />
//               <span className="hidden sm:inline">Login</span>
//             </button>

//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
// src/components/Header.jsx
import { Search, ShoppingCart, User, Menu, Bell, Heart } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { NotificationService } from "../services/notificationService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartAPI } from "../api/cartApi";

export function Header({
  wishlistCount = 0,
  onNotificationsClick,
  onWishlistClick,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // notifications subscription
  useEffect(() => {
    const unsubscribe = NotificationService.subscribe(() => {
      setUnreadNotifications(NotificationService.getUnreadCount());
    });
    return unsubscribe;
  }, []);

  // fetch cart count from backend
  const fetchCartCount = async (userId) => {
    if (!userId) {
      setCartCount(0);
      return;
    }
    try {
      const res = await CartAPI.getCart(userId);
      const cart = res.data;
      const count =
        (cart?.items && cart.items.reduce((s, it) => s + (it.quantity ?? 1), 0)) ||
        (cart?.items?.length ?? 0);
      setCartCount(count);
    } catch (err) {
      // ignore, show zero
      setCartCount(0);
    }
  };

  // initial fetch when user changes
  useEffect(() => {
    fetchCartCount(user?.id || user?.userId);
  }, [user]);

  // auto refresh when cartUpdated event is fired
  useEffect(() => {
    const handler = () => fetchCartCount(user?.id || user?.userId);
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [user]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>

            <button onClick={() => navigate("/")} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl hidden sm:block">ShopHub</span>
            </button>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-6">
              <button onClick={() => navigate("/")} className="hover:text-blue-600">Home</button>
              <button onClick={() => navigate("/products")} className="hover:text-blue-600">Products</button>
              <button onClick={() => navigate("/categories")} className="hover:text-blue-600">Categories</button>
            </nav>

            {/* CART: navigate directly to /cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-lg"
              title="View cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button onClick={() => navigate("/wishlist")} className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button onClick={onNotificationsClick} className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={() => navigate(user ? "/profile" : "/login")}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
              title={user ? "My Profile" : "Login"}
            >
              <User size={22} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
