

// export default WishlistPage;
import React, { useEffect, useState, useContext } from "react";
import { Heart, ShoppingCart, X, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { WishlistAPI } from "../api/wishlistApi";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function WishlistPage({ onAddToCart }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // ----------------------------------------------------
    // FETCH PRODUCT DETAILS
    // ----------------------------------------------------
    const fetchProductDetails = async (productId) => {
        try {
            const res = await axiosInstance.get(`/api/v1/products/${productId}`);
            return res.data;
        } catch (e) {
            console.error("Failed to fetch product:", e);
            return null;
        }
    };

    // ----------------------------------------------------
    // LOAD WISHLIST
    // ----------------------------------------------------
    const loadWishlist = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const res = await WishlistAPI.getUserWishlist(user.id || user.userId);
            const raw = res.data || [];

            const detailed = await Promise.all(
                raw.map(async (entry) => {
                    const product = await fetchProductDetails(entry.productId);
                    return {
                        mappingId: entry.id,
                        productId: entry.productId,
                        product,
                    };
                })
            );

            const mapped = detailed
  .filter((d) => d.product)
  .map((d) => ({
      ...d.product,
      productId: d.productId,   // <-- KEEP THE REAL PRODUCT ID
      mappingId: d.mappingId,
  }));


            setItems(mapped);
        } catch (e) {
            console.error("Failed wishlist load:", e);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadWishlist();
    }, [user]);

    // ----------------------------------------------------
    // REMOVE FROM WISHLIST (USE mappingId!)
    // ----------------------------------------------------
    const handleRemove = async (product) => {
        try {
            await WishlistAPI.remove(product.mappingId);
setItems(prev => prev.filter(item => item.mappingId !== product.mappingId));

  toast.success(`${product.name} removed from wishlist ❤️`);
            window.dispatchEvent(new Event("wishlistUpdated"));
        } catch (e) {
            console.error("REMOVE FAILED:", e);
        }
    };

    // ----------------------------------------------------
    // ADD TO CART
    // ----------------------------------------------------
    const handleAddToCart = (product) => {
        onAddToCart?.({ ...product, sku: product.sku });
    };

    // ----------------------------------------------------
    // OPEN PRODUCT PAGE
    // ----------------------------------------------------
    const openProduct = (p) => {
        navigate(`/product/${p.productId}`);
    };

    // ----------------------------------------------------
    // RENDER
    // ----------------------------------------------------
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-8 text-center text-gray-600">
                Loading wishlist...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl mb-8">My Wishlist ({items.length})</h1>

            {items.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-10 h-10 text-gray-400" />
                    </div>

                    <h2 className="text-2xl mb-4">Your wishlist is empty</h2>

                    <button
                        onClick={() => navigate("/products")}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((p) => (
                        <div
                            key={p.mappingId}
                            className="bg-white rounded-xl border hover:shadow-lg transition relative"
                        >
                            {/* REMOVE */}
                            {/* REMOVE BUTTON */}
                            <button
                                onClick={() => handleRemove(p)}
                                className="
    absolute top-3 right-3 
    z-50 
    bg-white/90 backdrop-blur 
    p-2 rounded-full 
    shadow-lg border 
    hover:bg-red-100 
    transition
  "
                            >
                                <X className="w-5 h-5 text-red-600" />
                            </button>

                            {/* IMAGE */}
                            <div
                                className="
    relative aspect-square 
    bg-gray-100 cursor-pointer 
    overflow-hidden
  "
                                onClick={() => openProduct(p)}
                            >
                                <ImageWithFallback
                                    src={p.imageUrl}
                                    alt={p.name}
                                    className="w-full h-full object-cover hover:scale-105 transition"
                                />
                            </div>


                            {/* DETAILS */}
                            <div className="p-4">
                                <div className="text-sm text-gray-500">{p.brand}</div>

                                <h3
                                    className="line-clamp-2 cursor-pointer hover:text-blue-600"
                                    onClick={() => openProduct(p)}
                                >
                                    {p.name}
                                </h3>

                                <div className="flex items-center gap-1 my-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(p.rating ?? 4)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <span className="text-blue-600">₹{p.price}</span>
                                    {p.originalPrice && (
                                        <span className="line-through text-gray-400">
                                            ₹{p.originalPrice}
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleAddToCart(p)}
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;
