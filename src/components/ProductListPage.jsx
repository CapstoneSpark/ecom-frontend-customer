import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { products } from "../data/mockData";
export function ProductListPage({ onAddToCart, onProductClick }) {
    const [priceRange, setPriceRange] = useState([0, 3000]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(true);
    const itemsPerPage = 12;
    // Get unique categories and brands
    const categories = ["All", ...new Set(products.map(p => p.category))];
    const brands = ["All", ...new Set(products.map(p => p.brand))];
    // Filter products
    let filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesRating = product.rating >= minRating;
        return matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });
    // Sort products
    filteredProducts.sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "rating":
                return b.rating - a.rating;
            case "newest":
                return b.id.localeCompare(a.id);
            default:
                return 0;
        }
    });
    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6 sticky top-20 bg-white z-10 py-4 border-b", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { onClick: () => setShowFilters(!showFilters), className: "lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50", children: [_jsx(SlidersHorizontal, { className: "w-4 h-4" }), "Filters"] }), _jsx("div", { children: _jsxs("span", { className: "text-gray-600", children: [filteredProducts.length, " products found"] }) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600 hidden sm:inline", children: "Sort by:" }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { value: "featured", children: "Featured" }), _jsx("option", { value: "price-low", children: "Price: Low to High" }), _jsx("option", { value: "price-high", children: "Price: High to Low" }), _jsx("option", { value: "rating", children: "Rating" }), _jsx("option", { value: "newest", children: "Newest" })] })] })] }), _jsxs("div", { className: "flex gap-8", children: [_jsx("aside", { className: `w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`, children: _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 sticky top-36", children: [_jsxs("h3", { className: "mb-6 flex items-center gap-2", children: [_jsx(SlidersHorizontal, { className: "w-5 h-5" }), "Filters"] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "mb-3 text-gray-700", children: "Category" }), _jsx("div", { className: "space-y-2", children: categories.map((category) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", name: "category", checked: selectedCategory === category, onChange: () => setSelectedCategory(category), className: "w-4 h-4 text-blue-600" }), _jsx("span", { className: "text-sm", children: category })] }, category))) })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "mb-3 text-gray-700", children: "Brand" }), _jsx("div", { className: "space-y-2", children: brands.map((brand) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", name: "brand", checked: selectedBrand === brand, onChange: () => setSelectedBrand(brand), className: "w-4 h-4 text-blue-600" }), _jsx("span", { className: "text-sm", children: brand })] }, brand))) })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "mb-3 text-gray-700", children: "Price Range" }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "range", min: "0", max: "3000", value: priceRange[1], onChange: (e) => setPriceRange([0, parseInt(e.target.value)]), className: "w-full" }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("span", { children: ["$", priceRange[0]] }), _jsxs("span", { children: ["$", priceRange[1]] })] })] })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "mb-3 text-gray-700", children: "Minimum Rating" }), _jsx("div", { className: "space-y-2", children: [4, 3, 2, 1, 0].map((rating) => (_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "radio", name: "rating", checked: minRating === rating, onChange: () => setMinRating(rating), className: "w-4 h-4 text-blue-600" }), _jsxs("span", { className: "text-sm", children: [rating, "\u2605 & above"] })] }, rating))) })] }), _jsx("button", { onClick: () => {
                                        setSelectedCategory("All");
                                        setSelectedBrand("All");
                                        setPriceRange([0, 3000]);
                                        setMinRating(0);
                                    }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm", children: "Clear All Filters" })] }) }), _jsx("main", { className: "flex-1", children: paginatedProducts.length > 0 ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: paginatedProducts.map((product) => (_jsx(ProductCard, { product: product, onAddToCart: onAddToCart, onProductClick: onProductClick }, product.id))) }), totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-center gap-2 mt-12", children: [_jsx("button", { onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed", children: "Previous" }), [...Array(totalPages)].map((_, i) => (_jsx("button", { onClick: () => setCurrentPage(i + 1), className: `px-4 py-2 rounded-lg ${currentPage === i + 1
                                                ? "bg-blue-600 text-white"
                                                : "border border-gray-300 hover:bg-gray-50"}`, children: i + 1 }, i))), _jsx("button", { onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, className: "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed", children: "Next" })] }))] })) : (_jsxs("div", { className: "text-center py-16", children: [_jsx("p", { className: "text-gray-500 text-lg", children: "No products found matching your filters." }), _jsx("button", { onClick: () => {
                                        setSelectedCategory("All");
                                        setSelectedBrand("All");
                                        setPriceRange([0, 3000]);
                                        setMinRating(0);
                                    }, className: "mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700", children: "Clear Filters" })] })) })] })] }));
}
