


import { useEffect, useState, useContext } from "react";
import {
  ArrowRight,
  Smartphone,
  Laptop,
  Watch,
  Shirt,
  Home,
  Sparkles,
  Search,
} from "lucide-react";

import axiosInstance from "../api/axiosInstance";
import { ProductCard } from "./ProductCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AuthContext } from "../context/AuthContext";

export function HomePage({ onAddToCart, onProductClick, onNavigate }) {
  const [products, setProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [categoriesFromDb, setCategoriesFromDb] = useState([]);

  const { user } = useContext(AuthContext);

  const isLoggedIn = Boolean(
    user?.id ||
      user?.userId ||
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken")
  );

  // -----------------------------------------------------------
  // STATIC PRODUCTS (FOR PRELOGIN DISPLAY)
  // -----------------------------------------------------------
  const STATIC_PRODUCTS = [
    {
      id: 101,
      name: "Nike Air Force 1",
      brand: "Nike",
      price: 7999,
      originalPrice: 7999,
      rating: 5,
      image:
        "https://ecommercefashion-01.s3.ap-southeast-2.amazonaws.com/Nike+Air+Force+1.png",
      sku: "STATIC-SONY",
    },
    {
      id: 102,
      name: "Woodland Leather Boots",
      brand: "Woodland",
      price: 5999,
      originalPrice: 5999,
      rating: 4,
      image:
        "https://ecommercefashion-01.s3.ap-southeast-2.amazonaws.com/Woodland+Leather+Boots.png",
      sku: "STATIC-WATCH",
    },
    {
      id: 103,
      name: "H&M Hoodie",
      brand: "H&M ",
      price: 1999,
      originalPrice: 1999,
      rating: 5,
      image:
        "https://ecommercefashion-01.s3.ap-southeast-2.amazonaws.com/H%26M+Hoodie.png",
      sku: "STATIC-SONY",
    },
    {
      id: 104,
      name: "Titan Raga Watch",
      brand: "Titan",
      price: 5499,
      originalPrice: 5499,
      rating: 4,
      image:
        "https://ecommercefashion-01.s3.ap-southeast-2.amazonaws.com/Titan+Raga+Watch.png",
      sku: "STATIC-DELL",
    },
  ];

  // -----------------------------------------------------------
  // STATIC CATEGORIES
  // -----------------------------------------------------------
  const STATIC_CATEGORIES = [
    { id: 1, name: "Mobiles", iconName: "Smartphone", count: 120 },
    { id: 2, name: "Laptops", iconName: "Laptop", count: 80 },
    { id: 3, name: "Watches", iconName: "Watch", count: 40 },
    { id: 4, name: "Fashion", iconName: "Shirt", count: 200 },
    { id: 5, name: "Home", iconName: "Home", count: 150 },
    { id: 6, name: "Special Deals", iconName: "Sparkles", count: 65 },
  ];

  // ICON MAP
  const ICONS = {
    Smartphone,
    Laptop,
    Watch,
    Shirt,
    Home,
    Sparkles,
    default: Search,
  };

  // -----------------------------------------------------------
  // LOAD DATA
  // -----------------------------------------------------------
  useEffect(() => {
    if (!isLoggedIn) {
      setProducts(STATIC_PRODUCTS);
      setCategoriesFromDb(STATIC_CATEGORIES);
      setFeaturedProduct(STATIC_PRODUCTS[0]);
      return;
    }

    loadTrendingProducts();
    loadCategories();
  }, [isLoggedIn]);

  const loadTrendingProducts = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/products");
      const list = res.data.content || res.data;

      const mapped = list.map((p) => ({
        id: p.productId,
        name: p.name,
        brand: p.brand,
        description: p.description,
        price: p.price,
        image: p.imageUrl,
        stock: p.stock,
        categories: p.productCategories,
        sku: p.sku,
      }));

      setProducts(mapped);
      if (mapped.length > 0) setFeaturedProduct(mapped[0]);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/categories");
      const list = res.data.content || res.data || [];

      const first6 = list.slice(0, 6);

      const categoriesWithCounts = await Promise.all(
        first6.map(async (cat) => {
          try {
            const resp = await axiosInstance.get(
              `/api/v1/product-categories/category/${cat.categoryId}`
            );

            let raw = Array.isArray(resp.data)
              ? resp.data
              : resp.data?.content ?? resp.data;

            if (!Array.isArray(raw)) raw = [];

            const productCount = raw.filter(
              (pc) => pc?.product && typeof pc.product === "object"
            ).length;

            return {
              id: cat.categoryId,
              name: cat.name,
              iconName: cat.iconName,
              count: productCount,
            };
          } catch {
            return {
              id: cat.categoryId,
              name: cat.name,
              iconName: cat.iconName,
              count: 0,
            };
          }
        })
      );

      setCategoriesFromDb(categoriesWithCounts);
    } catch (err) {
      console.error("Failed to load categories", err);
      setCategoriesFromDb([]);
    }
  };

  // -----------------------------------------------------------
  // SAFE NAVIGATION (PRELOGIN → redirect to login)
  // -----------------------------------------------------------
  const safeNavigate = (...args) => {
    if (!isLoggedIn) return onNavigate("login");
    return onNavigate(...args);
  };

  const safeProductClick = (product) => {
    if (!isLoggedIn) return onNavigate("login");
    return onProductClick(product);
  };

  const safeAddToCart = (product) => {
    if (!isLoggedIn) return onNavigate("login");
    return onAddToCart(product);
  };

  const safeCategoryClick = (cat) => {
    if (!isLoggedIn) return onNavigate("login");
    return onNavigate("categories", cat.id);
  };

  const trendingProducts = products.slice(0, 8);

  // -----------------------------------------------------------
  // UI (UNTOUCHED)
  // -----------------------------------------------------------
  return (
    <div className="">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full mb-4 text-sm">
                New Arrival
              </div>
              <h1 className="text-5xl mb-6">
                Discover Amazing Products at Great Prices
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Shop the latest trends in electronics, fashion, and more.
              </p>

              <button
                onClick={() => safeNavigate("products")}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8">
                {featuredProduct ? (
                  <ImageWithFallback
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-xl" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-3">Shop by Category</h2>
          <p className="text-gray-600">Browse through your favorite categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesFromDb.map((cat) => {
            const Icon = ICONS[cat.iconName] ?? ICONS.default;

            return (
              <button
                key={cat.id}
                onClick={() => safeCategoryClick(cat)}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count} items</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => safeNavigate("categories")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl mb-3">Trending Products</h2>
            <p className="text-gray-600">Check out our most popular items</p>
          </div>
          <button
            onClick={() => safeNavigate("products")}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => safeAddToCart(product)}
              onProductClick={() => safeProductClick(product)}
            />
          ))}
        </div>
      </section>

      {/* SALE */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2l p-12 text-white text-center">
          <h2 className="text-4xl mb-4">Special Holiday Sale!</h2>
          <p className="text-xl mb-6 text-orange-100">
            Get up to 50% off on selected items. Limited time only!
          </p>

          <button
            onClick={() => safeNavigate("products")}
            className="px-8 py-4 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            Shop Sale Items <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
