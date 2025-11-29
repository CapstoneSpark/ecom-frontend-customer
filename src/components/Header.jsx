

// import { Search, ShoppingCart, User, Menu, Bell, Heart } from "lucide-react";
// import { useState, useEffect, useContext, useRef } from "react";
// import { NotificationAPI } from "../api/notificationApi";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { CartAPI } from "../api/cartApi";
// import axiosInstance from "../api/axiosInstance";
// import { WishlistAPI } from "../api/wishlistApi";


// export function Header({ onNotificationsClick }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [unreadNotifications, setUnreadNotifications] = useState(0);
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);




//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const searchRef = useRef(null);
//   let searchTimeout = useRef(null);

//   useEffect(() => {
//     const handler = () => fetchWishlistCount(user?.id || user?.userId);
//     window.addEventListener("wishlistUpdated", handler);
//     return () => window.removeEventListener("wishlistUpdated", handler);
//   }, [user]);


//   // ---------- SEARCH AUTOCOMPLETE ----------
//   const fetchSuggestions = async (query) => {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const res = await axiosInstance.get(`/api/v1/products/search?q=${query}`);
//       const list = res.data || [];

//       const mapped = list.map((p) => ({
//         id: p.productId,
//         name: p.name,
//         image: p.imageUrl,
//         price: p.price,
//         sku: p.sku,
//       }));

//       setSuggestions(mapped);
//       setShowSuggestions(true);
//     } catch (err) {
//       console.warn("Search failed:", err);
//     }
//   };


//   const fetchWishlistCount = async (userId) => {
//     if (!userId) {
//       setWishlistCount(0);
//       return;
//     }

//     try {
//       const res = await WishlistAPI.getUserWishlist(userId);
//       setWishlistCount(res.data.length || 0);
//     } catch (err) {
//       setWishlistCount(0);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);

//     // Debounce API calls
//     if (searchTimeout.current) clearTimeout(searchTimeout.current);

//     searchTimeout.current = setTimeout(() => {
//       fetchSuggestions(value);
//     }, 300);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     window.addEventListener("click", handleClickOutside);
//     return () => window.removeEventListener("click", handleClickOutside);
//   }, []);

//   // ---------- NOTIFICATIONS ----------
//   const fetchUnreadNotifications = async () => {
//     if (!user) return;

//     try {
//       const res = await NotificationAPI.getForUser(user.id || user.userId);
//       const list = res.data?.notifications || [];
//       setUnreadNotifications(list.filter((n) => n.status !== "READ").length);
//     } catch (err) {
//       console.warn("Failed to fetch notifications:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUnreadNotifications();
//   }, [user]);

//   useEffect(() => {
//   fetchWishlistCount(user?.id || user?.userId);
// }, [user]);


//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchUnreadNotifications();
//     }, 10000);
//     return () => clearInterval(interval);
//   }, [user]);

//   // ---------- CART COUNT ----------
//   const fetchCartCount = async (userId) => {
//     if (!userId) {
//       setCartCount(0);
//       return;
//     }

//     try {
//       const res = await CartAPI.getCart(userId);
//       const cart = res.data;

//       const totalQuantity =
//         cart?.items?.reduce((sum, item) => sum + (item.quantity ?? 1), 0) || 0;

//       setCartCount(totalQuantity);
//     } catch (err) {
//       setCartCount(0);
//     }
//   };

//   useEffect(() => {
//     fetchCartCount(user?.id || user?.userId);
//   }, [user]);

//   useEffect(() => {
//     const handler = () => fetchCartCount(user?.id || user?.userId);
//     window.addEventListener("cartUpdated", handler);
//     return () => window.removeEventListener("cartUpdated", handler);
//   }, [user]);

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="flex items-center justify-between gap-6">

//           {/* LOGO */}
//           <div className="flex items-center gap-3">
//             <button className="lg:hidden">
//               <Menu className="w-6 h-6" />
//             </button>

//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2"
//             >
//               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <ShoppingCart className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-xl hidden sm:block">ShopHub</span>
//             </button>
//           </div>

//           {/* SEARCH BAR + AUTOCOMPLETE */}
//           <div className="flex-1 max-w-2xl relative" ref={searchRef}>
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//             <input
//               type="text"
//               placeholder="Search for products..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 if (suggestions.length > 0) setShowSuggestions(true);
//               }}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
//                 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* SUGGESTION DROPDOWN */}
//             {showSuggestions && suggestions.length > 0 && (
//               <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-72 overflow-y-auto z-50">
//                 {suggestions.map((item) => (
//                   <div
//                     key={item.id}
//                     onClick={(event) => {
//                       event.stopPropagation();
//                       navigate(`/product/${item.id}`);
//                       setShowSuggestions(false);
//                     }}
//                     className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-10 h-10 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-500">₹{item.price}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* RIGHT SIDE ICONS */}
//           <div className="flex items-center gap-4">
//             <nav className="hidden lg:flex items-center gap-6">
//               <button onClick={() => navigate("/")} className="hover:text-blue-600">Home</button>
//               <button onClick={() => navigate("/products")} className="hover:text-blue-600">Products</button>
//               <button onClick={() => navigate("/categories")} className="hover:text-blue-600">Categories</button>
//             </nav>

//             {/* CART */}
//             <button
//               onClick={() => navigate("/cart")}
//               className="relative p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white 
//                   text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                 >
//                   {cartCount}
//                 </span>
//               )}
//             </button>

//             {/* WISHLIST */}
//             {/* <button
//               onClick={() => navigate("/wishlist")}
//               className="relative p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <Heart className="w-6 h-6" />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white 
//                   text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                 >
//                   {wishlistCount}
//                 </span>
//               )}
//             </button> */}
//             <button
//               onClick={() => navigate("/wishlist")}
//               className="relative p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <Heart className="w-6 h-6" />

//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white 
//       text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                 >
//                   {wishlistCount}
//                 </span>
//               )}
//             </button>


//             {/* NOTIFICATION */}
//             <button
//               onClick={onNotificationsClick}
//               className="relative p-2 hover:bg-gray-100 rounded-lg"
//             >
//               <Bell className="w-6 h-6" />
//               {unreadNotifications > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white 
//                   text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                 >
//                   {unreadNotifications}
//                 </span>
//               )}
//             </button>

//             {/* PROFILE */}
//             <button
//               onClick={() => navigate(user ? "/profile" : "/login")}
//               className="p-2 rounded-full border hover:bg-gray-100 transition"
//             >
//               <User size={22} className="text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;


import { Search, ShoppingCart, User, Bell, Heart, Menu } from "lucide-react";
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

  const searchRef = useRef(null);
  const searchTimeout = useRef(null);

  const navigate = useNavigate();
  const { user, isAdmin } = useContext(AuthContext);

  // ----------------------------------------------------
  // SEARCH AUTOCOMPLETE
  // ----------------------------------------------------
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axiosInstance.get(`/api/v1/products/search?q=${query}`);
      const list = res.data || [];

      const mapped = list.map((p) => ({
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
    const value = e.target.value;
    setSearchQuery(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // ----------------------------------------------------
  // FETCH WISHLIST COUNT
  // ----------------------------------------------------
  const fetchWishlistCount = async (userId) => {
    if (!userId) return setWishlistCount(0);

    try {
      const res = await WishlistAPI.getUserWishlist(userId);
      setWishlistCount(res.data.length || 0);
    } catch {
      setWishlistCount(0);
    }
  };

  // useEffect(() => {
  //   fetchWishlistCount(user?.id || user?.userId);
  // }, [user]);

  useEffect(() => {
  const handler = () =>
    fetchWishlistCount(user?.id || user?.userId);

  window.addEventListener("wishlistUpdated", handler);
  return () => window.removeEventListener("wishlistUpdated", handler);
}, [user]);


  // ----------------------------------------------------
  // NOTIFICATIONS
  // ----------------------------------------------------
  const fetchUnreadNotifications = async () => {
    if (!user) return;

    try {
      const res = await NotificationAPI.getForUser(user.id || user.userId);
      const list = res.data?.notifications || [];
      setUnreadNotifications(list.filter((n) => n.status !== "READ").length);
    } catch {
      console.warn("Notification fetch failed");
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, [user]);

  useEffect(() => {
    const interval = setInterval(fetchUnreadNotifications, 10000);
    return () => clearInterval(interval);
  }, [user]);

  // ----------------------------------------------------
  // CART COUNT
  // ----------------------------------------------------
  const fetchCartCount = async (userId) => {
    if (!userId) return setCartCount(0);

    try {
      const res = await CartAPI.getCart(userId);
      const cart = res.data;

      const total =
        cart?.items?.reduce((sum, item) => sum + (item.quantity ?? 1), 0) || 0;

      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount(user?.id || user?.userId);
  }, [user]);

  useEffect(() => {
    const handler = () => fetchCartCount(user?.id || user?.userId);
    window.addEventListener("cartUpdated", handler);
    return () => window.removeEventListener("cartUpdated", handler);
  }, [user]);

  // ----------------------------------------------------
  // RETURN JSX
  // ----------------------------------------------------
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <button onClick={() => navigate(isAdmin ? "/admin/dashboard" : "/")}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
        </button>

        {/* ===========================
           🔹 ADMIN HEADER
        ============================ */}
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

            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full border hover:bg-gray-100"
            >
              <User size={22} />
            </button>
          </div>
        ) : (
          /* ===========================
             🔹 CUSTOMER HEADER
          ============================ */
          <>
            {/* SEARCH BAR */}
            <div className="flex-1 max-w-2xl relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onClick={(e) => {
                  e.stopPropagation();
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* AUTOCOMPLETE DROPDOWN */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 max-h-72 overflow-y-auto z-50">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/product/${item.id}`);
                        setShowSuggestions(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CUSTOMER MENU */}
            <div className="flex items-center gap-6">

              <button onClick={() => navigate("/")} className="hover:text-blue-600">
                Home
              </button>

              <button onClick={() => navigate("/products")} className="hover:text-blue-600">
                Products
              </button>

              <button onClick={() => navigate("/categories")} className="hover:text-blue-600">
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

              {/* PROFILE */}
              <button
                onClick={() => navigate(user ? "/profile" : "/login")}
                className="p-2 rounded-full border hover:bg-gray-100"
              >
                <User size={22} />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
