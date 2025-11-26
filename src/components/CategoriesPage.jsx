import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Smartphone, Shirt, Sparkles, Gamepad2, ShoppingBag, Footprints, Sofa } from "lucide-react";
import { products } from "../data/mockData";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
export function CategoriesPage({ onAddToCart, onProductClick, onNavigate }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    // Get unique categories with product counts
    const categoryData = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = {
                name: product.category,
                count: 0,
                products: []
            };
        }
        acc[product.category].count++;
        acc[product.category].products.push(product);
        return acc;
    }, {});
    const categories = Object.values(categoryData);
    // Icon mapping for categories
    const categoryIcons = {
        "Electronics": Smartphone,
        "Fashion": Shirt,
        "Home & Living": Sofa,
        "Beauty": Sparkles,
        "Sports": Footprints,
        "Gaming": Gamepad2,
        "Accessories": ShoppingBag,
    };
    const getCategoryIcon = (categoryName) => {
        return categoryIcons[categoryName] || ShoppingBag;
    };
    const filteredProducts = selectedCategory
        ? categoryData[selectedCategory]?.products || []
        : [];
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8", children: [_jsxs("div", { className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12 mb-12 text-center", children: [_jsx("h1", { className: "text-5xl mb-4", children: "Shop by Category" }), _jsx("p", { className: "text-xl text-blue-100", children: "Browse our wide selection of products organized by category" })] }), !selectedCategory ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl mb-8", children: "All Categories" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: categories.map((category) => {
                                    const Icon = getCategoryIcon(category.name);
                                    return (_jsx("button", { onClick: () => setSelectedCategory(category.name), className: "bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all group text-left", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors flex-shrink-0", children: _jsx(Icon, { className: "w-8 h-8 text-blue-600 group-hover:text-white transition-colors" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl mb-2", children: category.name }), _jsxs("p", { className: "text-gray-600", children: [category.count, " ", category.count === 1 ? "product" : "products"] }), _jsxs("div", { className: "mt-4 text-blue-600 group-hover:text-blue-700 flex items-center gap-2", children: ["Browse ", category.name, _jsx("span", { className: "group-hover:translate-x-1 transition-transform", children: "\u2192" })] })] })] }) }, category.name));
                                }) })] }), _jsx("div", { className: "space-y-16", children: categories.slice(0, 3).map((category) => {
                            const Icon = getCategoryIcon(category.name);
                            return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(Icon, { className: "w-6 h-6 text-blue-600" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl", children: category.name }), _jsxs("p", { className: "text-gray-600", children: [category.count, " products available"] })] })] }), _jsx("button", { onClick: () => setSelectedCategory(category.name), className: "px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors", children: "View All" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: category.products.slice(0, 4).map((product) => (_jsx(ProductCard, { product: product, onAddToCart: onAddToCart, onProductClick: onProductClick }, product.id))) })] }, category.name));
                        }) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-8", children: [_jsx("button", { onClick: () => setSelectedCategory(null), className: "flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6", children: "\u2190 Back to all categories" }), _jsxs("div", { className: "flex items-center gap-4 mb-6", children: [(() => {
                                        const Icon = getCategoryIcon(selectedCategory);
                                        return (_jsx("div", { className: "w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center", children: _jsx(Icon, { className: "w-8 h-8 text-blue-600" }) }));
                                    })(), _jsxs("div", { children: [_jsx("h2", { className: "text-3xl", children: selectedCategory }), _jsxs("p", { className: "text-gray-600", children: [filteredProducts.length, " ", filteredProducts.length === 1 ? "product" : "products"] })] })] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: filteredProducts.map((product) => (_jsx(ProductCard, { product: product, onAddToCart: onAddToCart, onProductClick: onProductClick }, product.id))) }), filteredProducts.length === 0 && (_jsxs("div", { className: "text-center py-16", children: [_jsx("p", { className: "text-gray-500 text-lg", children: "No products found in this category." }), _jsx("button", { onClick: () => setSelectedCategory(null), className: "mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700", children: "Browse All Categories" })] }))] }))] }));
}
