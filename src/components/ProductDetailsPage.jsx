

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { WishlistAPI } from "../api/wishlistApi";

export function ProductDetailsPage({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const productId = id;

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch product from backend
  useEffect(() => {
    if (productId) loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/products/${productId}`);

      setProduct({
        id: res.data.productId,
        name: res.data.name,
        brand: res.data.brand,
        description: res.data.description,
        price: res.data.price,
        imageUrl: res.data.imageUrl,
        stock: res.data.stock,
        sku: res.data.sku,
      });
    } catch (err) {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  // Ensure quantity respects stock limit
  useEffect(() => {
    if (product && product.stock === 0) setQuantity(0);
    else if (product && quantity > product.stock) setQuantity(product.stock);
  }, [product]);

  // SHARE
  const handleShare = () => {
    if (!product) return;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  // ❤️ ADD TO WISHLIST (WITH TOAST)
  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist!");
      return;
    }

    try {
      await WishlistAPI.add(user.id || user.userId, product.id);
      toast.success("Added to wishlist ❤️");

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  // 🛒 ADD TO CART (WITH TOAST)
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    toast.success("Added to cart 🛒");
  };

  if (loading)
    return (
      <div className="text-center py-16">
        <h2 className="text-xl text-gray-600">Loading product...</h2>
      </div>
    );

  if (!product)
    return (
      <div className="text-center py-16">
        <h2 className="text-xl mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );

  const images = [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <button onClick={() => navigate("/")} className="hover:text-blue-600">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate("/products")} className="hover:text-blue-600">
          Products
        </button>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* LEFT: Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <ImageWithFallback
              src={images[selectedImage]}
              className="w-full h-full object-cover"
              alt={product.name}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-blue-600" : "border-gray-200"
                }`}
              >
                <ImageWithFallback src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div>
          <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
          <h1 className="text-3xl mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm">(4.0 rating)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl text-blue-600">₹{product.price.toFixed(2)}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                disabled={quantity <= 1 || product.stock === 0}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={`px-4 py-3 ${
                  quantity <= 1 || product.stock === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="px-6 py-3 border-x">
                {product.stock === 0 ? 0 : quantity}
              </span>

              <button
                disabled={quantity >= product.stock || product.stock === 0}
                onClick={() => setQuantity(quantity + 1)}
                className={`px-4 py-3 ${
                  quantity >= product.stock || product.stock === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm">
              {product.stock > 0 ? (
                <span className="text-gray-600">{product.stock} items available</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mb-6">
            {/* ADD TO CART */}
            <button
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                product.stock === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>

            {/* BUY NOW */}
            <button
              disabled={product.stock === 0}
              onClick={() => {
                handleAddToCart();
                navigate("/checkout");
              }}
              className={`px-6 py-4 border-2 rounded-lg transition-colors ${
                product.stock === 0
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* WISHLIST + SHARE */}
          <div className="flex gap-4">
            <button
              onClick={handleWishlist}
              disabled={product.stock === 0}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition ${
                product.stock === 0
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Heart className="w-5 h-5" /> Add to Wishlist
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5" /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
