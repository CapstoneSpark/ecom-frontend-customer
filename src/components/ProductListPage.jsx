

import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../api/axiosInstance";
import { ProductCard } from "./ProductCard";
import { SlidersHorizontal } from "lucide-react";
import { Range } from "react-range";

export function ProductListPage({ onAddToCart, onProductClick }) {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 20;

  const MAX_PRICE_LIMIT = 500000;

  // Price Slider
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE_LIMIT]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("relevance");

  // ------------------------------------------------------------
  // FETCH ALL PRODUCTS (PAGINATED)
  // ------------------------------------------------------------
  const fetchAllProducts = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get("/api/v1/products", {
        params: { page, size: PAGE_SIZE },
      });

      const list = res.data?.content || [];

      const normalized = list.map((p) => ({
        id: p.productId ?? p.id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        stock: p.stock ?? 0,
        image: p.imageUrl,
        sku: p.sku,
      }));

      setAllProducts(normalized);
      setTotalPages(res.data.totalPages);
      setBrands([...new Set(normalized.map((p) => p.brand).filter(Boolean))]);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // FETCH PRODUCTS BY CATEGORY
  // ------------------------------------------------------------
  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/v1/product-categories/category/${categoryId}`);

      const raw = Array.isArray(res.data)
        ? res.data
        : res.data?.content ?? res.data;

      const mapped = raw
        .filter((pc) => pc && pc.product)
        .map((pc) => {
          const p = pc.product;
          return {
            id: p.productId,
            name: p.name,
            price: p.price,
            stock: p.stock,
            brand: p.brand,
            image: p.imageUrl,
            sku: p.sku,
          };
        });

      setAllProducts(mapped);
      setBrands([...new Set(mapped.map((p) => p.brand).filter(Boolean))]);
      setTotalPages(1); // Because category fetch loads all at once
      setPage(0);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // FETCH CATEGORIES
  // ------------------------------------------------------------
  const fetchCategories = async () => {
    const res = await axiosInstance.get("/api/v1/categories");
    setCategories(res.data.map((c) => ({ id: c.categoryId, name: c.name })));
  };

  // ------------------------------------------------------------
  // INITIAL LOAD
  // ------------------------------------------------------------
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch products when page changes OR category changes
  useEffect(() => {
    if (!selectedCategory) fetchAllProducts();
  }, [page]);

  useEffect(() => {
    if (!selectedCategory) {
      setPage(0);
      fetchAllProducts();
    } else fetchProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  // ------------------------------------------------------------
  // LOCAL FILTERING (brand/price/stock/sort)
  // ------------------------------------------------------------
  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    const [minPrice, maxPrice] = priceRange;
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (selectedBrand) list = list.filter((p) => p.brand === selectedBrand);
    if (inStock) list = list.filter((p) => p.stock > 0);

    if (sort === "priceLow") list.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") list.sort((a, b) => b.price - a.price);

    return list;
  }, [allProducts, selectedBrand, priceRange, inStock, sort]);

  // ------------------------------------------------------------
  // CLEAR FILTERS
  // ------------------------------------------------------------
  const clearFilters = () => {
    setSelectedBrand("");
    setInStock(false);
    setSort("relevance");
    setPriceRange([0, MAX_PRICE_LIMIT]);
  };

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-6">

        {/* ---------------- FILTER SIDEBAR ---------------- */}
        <aside className="hidden lg:block w-64">
          <div className="bg-white rounded-xl border p-4 space-y-6 shadow-sm">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button className="text-red-500 text-sm" onClick={clearFilters}>
                Clear
              </button>
            </div>

            {/* CATEGORY */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700">Category</h4>
              <select
                className="w-full border px-3 py-2 rounded-lg text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* BRAND */}
            <div>
              <h4 className="text-sm font-medium mb-2 text-gray-700">Brand</h4>
              <select
                className="w-full border px-3 py-2 rounded-lg text-sm"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* PRICE SLIDER */}
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">Price Range</h4>

              <Range
                step={500}
                min={0}
                max={MAX_PRICE_LIMIT}
                values={priceRange}
                onChange={(values) => setPriceRange(values)}
                renderTrack={({ props, children }) => (
                  <div {...props} className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{
                        width: `${((priceRange[1] - priceRange[0]) / MAX_PRICE_LIMIT) * 100}%`,
                        marginLeft: `${(priceRange[0] / MAX_PRICE_LIMIT) * 100}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="w-4 h-4 bg-blue-600 rounded-full shadow-md cursor-pointer" />
                )}
              />

              <div className="flex justify-between text-sm mt-2 text-gray-700">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* STOCK */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              <label className="text-sm">In Stock Only</label>
            </div>

          </div>
        </aside>

        {/* ---------------- PRODUCT GRID ---------------- */}
        <main className="flex-1">

          {/* SORTING */}
          <div className="flex justify-between mb-6 items-center">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow-sm"
            >
              <SlidersHorizontal size={18} /> Filters
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 rounded-lg bg-white text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="priceLow">Price Low → High</option>
              <option value="priceHigh">Price High → Low</option>
            </select>
          </div>

          {/* NO PRODUCTS */}
          {!loading && filteredProducts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">No products found</h2>
              <p className="text-gray-500 mb-6">No items match your applied filters.</p>
              <button
                onClick={() => {
                  clearFilters();
                  setSelectedCategory("");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* PRODUCT GRID */}
          {!loading && filteredProducts.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              {!selectedCategory && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 border rounded-lg ${page === 0 ? "opacity-50" : ""}`}
                  >
                    Previous
                  </button>

                  <span className="text-sm font-medium">
                    Page {page + 1} of {totalPages}
                  </span>

                  <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                      page + 1 >= totalPages ? "opacity-50" : ""
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

          {loading && <p className="text-gray-600">Loading...</p>}
        </main>
      </div>
    </div>
  );
}
