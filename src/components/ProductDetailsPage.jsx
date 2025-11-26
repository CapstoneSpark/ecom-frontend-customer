import React, { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import { products, reviews } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

export function ProductDetailsPage({
  productId,
  onAddToCart,
  onAddToWishlist,
  onNavigate,
}) {
  const product = products.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // ✅ SHARE FUNCTION ADDED HERE
  const handleShare = () => {
    const shareData = {
      title: product.name,
      text: product.description || "Check out this product on ShopHub!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => {
          toast.success("Product link copied to clipboard");
        })
        .catch(() => {
          toast.error("Could not copy link. Please copy manually.");
        });
    } else {
      alert("Share this link: " + shareData.url);
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <button
          onClick={() => onNavigate("home")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-blue-600"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate("products")}
          className="hover:text-blue-600"
        >
          Products
        </button>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      {/* Main layout */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Images */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
            <ImageWithFallback
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-blue-600" : "border-gray-200"
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div className="text-sm text-gray-600 mb-2">{product.brand}</div>
          <h1 className="text-3xl mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-3 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="px-4 py-3 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {product.stock} items in stock
            </div>
          </div>

          {/* Add to cart / buy */}
<div className="flex gap-4 mb-6">
  <button
    onClick={() => onAddToCart(product, quantity)}
    className="flex-1 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
  >
    <ShoppingCart className="w-5 h-5" />
    Add to Cart
  </button>

  {/* ⭐ BUY NOW UPDATED */}
  <button
    onClick={() => {
      onAddToCart(product, quantity);  // instantly add to cart
      onNavigate("checkout");          // go to checkout
    }}
    className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
  >
    Buy Now
  </button>
</div>


          {/* Wishlist + Share */}
          <div className="flex gap-4">
            <button
              onClick={() => onAddToWishlist(product)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Heart className="w-5 h-5" />
              Add to Wishlist
            </button>

            {/* ✅ UPDATED SHARE BUTTON */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {product.specifications && (
        <div className="mb-16">
          <h2 className="text-2xl mb-6">Specifications</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(
                  ([key, value], index) => (
                    <tr
                      key={key}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 w-1/3">{key}</td>
                      <td className="px-6 py-4 text-gray-700">{value}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Customer Reviews</h2>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Write a Review
          </button>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="mb-1">{review.author}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
