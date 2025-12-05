import { useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { WishlistAPI } from "../api/wishlistApi";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

export function ProductCard({ product, onAddToCart, onProductClick }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Discount logic
  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    if (onProductClick) onProductClick(product.id);
    else navigate(`/product/${product.id}`);
  };

  // ⭐ Add to wishlist
  const handleWishlist = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login first!");
      return;
    }

    try {
      await WishlistAPI.add(user.id || user.userId, product.id);

      setIsWishlisted(true);
      toast.success("Added to wishlist ❤️");

      // update header live count
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">

      {/* IMAGE + WISHLIST ICON */}
      <div
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
        onClick={handleCardClick}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            -{discount}%
          </div>
        )}

        {/* ❤️ Wishlist Icon */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.brand}</div>

        <h3
          className="mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={handleCardClick}
        >
          {product.name}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product?.rating ?? 4)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* PRICES */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-blue-600">₹{(product.price ?? 0).toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* ADD TO CART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.({ ...product, sku: product.sku, quantity: 1 });
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
