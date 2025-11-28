
import { useEffect, useState } from "react";
import {
  Smartphone,
  Shirt,
  Sparkles,
  Gamepad2,
  ShoppingBag,
  Footprints,
  Sofa
} from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import { ProductCard } from "./ProductCard";

export function CategoriesPage({ onAddToCart, onProductClick, onNavigate }) {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Category icon mapping
  const categoryIcons = {
    Electronics: Smartphone,
    Fashion: Shirt,
    "Home & Living": Sofa,
    Beauty: Sparkles,
    Sports: Footprints,
    Gaming: Gamepad2,
    Accessories: ShoppingBag
  };

  const getIcon = (name) => categoryIcons[name] || ShoppingBag;

  // ---------- LOAD ALL CATEGORIES ----------
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/categories");
      setCategories(res.data);

      // Fetch product count for each category
      res.data.forEach((cat) => loadProductsByCategory(cat.categoryId));
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  // ---------- LOAD PRODUCTS FOR A CATEGORY ----------
  // inside CategoriesPage.jsx (replace existing loadProductsByCategory)
const loadProductsByCategory = async (categoryId) => {
  try {
    const res = await axiosInstance.get(`/api/v1/product-categories/category/${categoryId}`);

    // DEBUG: inspect the raw response shape in console
    console.log(`[CategoriesPage] /product-categories/category/${categoryId} ->`, res.data);

    // ensure we have an array
    const raw = Array.isArray(res.data) ? res.data : (res.data?.content ?? res.data);
    if (!Array.isArray(raw)) {
      console.warn(`[CategoriesPage] unexpected payload for category ${categoryId}`, res.data);
      setCategoryProducts(prev => ({ ...prev, [categoryId]: [] }));
      return;
    }

    // filter out invalid entries and map only the valid ones
    const productList = raw
  .filter(pc => pc && typeof pc === "object" && pc.product)
  .map(pc => {
    const p = pc.product;
    return {
      id: p.productId ?? p.id,
      name: p.name,
      brand: p.brand,
      description: p.description,   // 🆕 ADD
      image: p.imageUrl ?? p.image,
      price: p.price,
      stock: p.stock ?? 0,
      sku: p.sku,                   // 🆕 ADD
      categories: p.productCategories // 🆕 ADD
    };
  });


    setCategoryProducts(prev => ({ ...prev, [categoryId]: productList }));
  } catch (err) {
    // log full error so you can inspect network / status
    console.error("Failed to load category products", err, err?.response?.data ?? err?.message);
    // keep UI stable
    setCategoryProducts(prev => ({ ...prev, [categoryId]: [] }));
  }
};


  const getCategoryProducts = (categoryId) =>
    categoryProducts[categoryId] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 mb-12 text-center">
        <h1 className="text-5xl mb-4">Shop by Category</h1>
        <p className="text-xl text-blue-100">
          Browse our wide selection of products organized by category
        </p>
      </div>

      {/* IF NO CATEGORY SELECTED → SHOW CATEGORY LIST */}
      {!selectedCategory ? (
        <>
          <div className="mb-12">
            <h2 className="text-3xl mb-8">All Categories</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const Icon = getIcon(cat.name);
                const productsInCat = getCategoryProducts(cat.categoryId);

                return (
                  <button
                    key={cat.categoryId}
                    onClick={() => setSelectedCategory(cat)}
                    className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all group text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0">
                        <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl mb-2">{cat.name}</h3>
                        <p className="text-gray-600">
                          {productsInCat.length} products
                        </p>

                        <div className="mt-4 text-blue-600 group-hover:text-blue-700 flex items-center gap-2">
                          Browse {cat.name}
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured sections for first 3 categories */}
          <div className="space-y-16">
            {categories.slice(0, 3).map((cat) => {
              const Icon = getIcon(cat.name);
              const productsInCat = getCategoryProducts(cat.categoryId);

              return (
                <div key={cat.categoryId}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>

                      <div>
                        <h2 className="text-2xl">{cat.name}</h2>
                        <p className="text-gray-600">
                          {productsInCat.length} products available
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {productsInCat.slice(0, 4).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onProductClick={onProductClick}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* SELECTED CATEGORY PAGE */}
          <div className="mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
            >
              ← Back to all categories
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                {(() => {
                  const Icon = getIcon(selectedCategory.name);
                  return <Icon className="w-8 h-8 text-blue-600" />;
                })()}
              </div>

              <div>
                <h2 className="text-3xl">{selectedCategory.name}</h2>
                <p className="text-gray-600">
                  {getCategoryProducts(selectedCategory.categoryId).length}{" "}
                  products
                </p>
              </div>
            </div>
          </div>

          {/* PRODUCT LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getCategoryProducts(selectedCategory.categoryId).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
            ))}
          </div>

          {getCategoryProducts(selectedCategory.categoryId).length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No products found in this category.
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse All Categories
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
