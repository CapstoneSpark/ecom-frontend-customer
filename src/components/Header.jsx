
import { Search, ShoppingCart, User, Bell, Heart } from "lucide-react";
import { useState, useEffect, useContext, useRef } from "react";
import { NotificationAPI } from "../api/notificationApi";
import { WishlistAPI } from "../api/wishlistApi";
import { CartAPI } from "../api/cartApi";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function Header({ onNotificationsClick }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const searchTimeout = useRef(null);

  const navigate = useNavigate();
  const { user, isAdmin, logoutUser } = useContext(AuthContext);

  // ================= AUTH CHECK =================
  const checkAuth = () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("accessToken");
    return Boolean(token || (user && (user.id || user.userId)));
  };

  useEffect(() => {
    setIsLoggedIn(checkAuth());

    const listener = () => setIsLoggedIn(checkAuth());
    window.addEventListener("storage", listener);

    return () => window.removeEventListener("storage", listener);
  }, []);

  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, [user]);

  // ================= SEARCH AUTOCOMPLETE =================
  const fetchSuggestions = async (query) => {
    if (!query.trim()) return setSuggestions([]);

    try {
      const res = await axiosInstance.get(`/api/v1/products/search?q=${query}`);
      const mapped = (res.data || []).map((p) => ({
        id: p.productId,
        name: p.name,
        image: p.imageUrl,
        price: p.price,
        sku: p.sku,
      }));

      setSuggestions(mapped);
      setShowSuggestions(true);
    } catch (err) {
      console.warn("Search failed:", err);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  useEffect(() => {
    const hide = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("click", hide);
    return () => window.removeEventListener("click", hide);
  }, []);

  // ================= WISHLIST COUNT =================
  const fetchWishlistCount = async (userId) => {
    if (!userId) return setWishlistCount(0);
    try {
      const res = await WishlistAPI.getUserWishlist(userId);
      setWishlistCount(res.data.length || 0);
    } catch {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    const handler = () => fetchWishlistCount(user?.id || user?.userId);
    window.addEventListener("wishlistUpdated", handler);
    return () => window.removeEventListener("wishlistUpdated", handler);
  }, [user]);

  // ================= NOTIFICATIONS =================
  const fetchUnreadNotifications = async () => {
    if (!user) return;
    try {
      const res = await NotificationAPI.getForUser(user.id || user.userId);
      const list = res.data?.notifications || [];
      setUnreadNotifications(list.filter((n) => n.status !== "READ").length);
    } catch {}
  };

  useEffect(() => {
    fetchUnreadNotifications();
    const id = setInterval(fetchUnreadNotifications, 10000);
    return () => clearInterval(id);
  }, [user]);

  // ================= CART COUNT =================
  const fetchCartCount = async (userId) => {
    if (!userId) return setCartCount(0);
    try {
      const res = await CartAPI.getCart(userId);
      const total =
        res.data?.items?.reduce((sum, item) => sum + (item.quantity ?? 1), 0) ||
        0;
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount(user?.id || user?.userId);
    const handler = () => fetchCartCount(user?.id || user?.userId);
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [user]);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    if (logoutUser) logoutUser();
    try {
      window.dispatchEvent(new Event("storage"));
    } catch {}

    setShowUserMenu(false);
    navigate("/login");
  };

  const goToProfile = () => {
    setShowUserMenu(false);
    navigate("/profile");
  };

  const goToOrders = () => {
    setShowUserMenu(false);
    navigate("/orders");
  };

  // ================= RETURN JSX =================
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <button onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/")}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
        </button>

        {/* ======================================
                ADMIN HEADER
        ====================================== */}
        {isAdmin ? (
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="hover:text-blue-600"
            >
              Admin Dashboard
            </button>

            <button
              onClick={() => navigate("/admin/users")}
              className="hover:text-blue-600"
            >
              Users
            </button>

            <button
              onClick={() => navigate("/admin/products")}
              className="hover:text-blue-600"
            >
              Products
            </button>

            <button
              onClick={() => navigate("/admin/orders")}
              className="hover:text-blue-600"
            >
              Orders
            </button>

            {/* ADMIN USER DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <button className="p-2 rounded-full border hover:bg-gray-100">
                <User size={22} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0  w-44 bg-white border rounded-xl shadow-xl z-50 py-2">
                  <button
                    onClick={goToProfile}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </button>

                  {/* NO ORDERS for admin */}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* ================= SEARCH BAR ================= */}
            <div className="flex-1 max-w-2xl relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                placeholder="Search for products..."
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-72 overflow-y-auto z-50">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        setShowSuggestions(false);
                      }}
                    >
                      <img
                        src={item.image}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm text-gray-500">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ================= CUSTOMER MENU ================= */}
            <div className="flex items-center gap-6">
              <button onClick={() => navigate("/")} className="hover:text-blue-600">
                Home
              </button>

              <button
                onClick={() => navigate("/products")}
                className="hover:text-blue-600"
              >
                Products
              </button>

              <button
                onClick={() => navigate("/categories")}
                className="hover:text-blue-600"
              >
                Categories
              </button>

              {/* CART */}
              <button onClick={() => navigate("/cart")} className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WISHLIST */}
              <button onClick={() => navigate("/wishlist")} className="relative">
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATIONS */}
              <button onClick={onNotificationsClick} className="relative">
                <Bell className="w-6 h-6" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* ================= USER DROPDOWN ================= */}
              <div className="relative">
                {isLoggedIn ? (
                  <div
                    onMouseEnter={() => setShowUserMenu(true)}
                    onMouseLeave={() => setShowUserMenu(false)}
                    className="relative"
                  >
                    <button className="p-2 rounded-full border hover:bg-gray-100">
                      <User size={22} />
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0  w-44 bg-white border rounded-xl shadow-xl z-50 py-2">
                        <button
                          onClick={goToProfile}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </button>

                        <button
                          onClick={goToOrders}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Orders
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
