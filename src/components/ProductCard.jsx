import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
export function ProductCard({ product, onAddToCart, onProductClick }) {
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;
    return (_jsxs("div", { className: "bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group", children: [_jsxs("div", { className: "relative aspect-square overflow-hidden bg-gray-100 cursor-pointer", onClick: () => onProductClick?.(product.id), children: [_jsx(ImageWithFallback, { src: product.image, alt: product.name, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }), discount > 0 && (_jsxs("div", { className: "absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm", children: ["-", discount, "%"] }))] }), _jsxs("div", { className: "p-4", children: [_jsx("div", { className: "text-sm text-gray-500 mb-1", children: product.brand }), _jsx("h3", { className: "mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors", onClick: () => onProductClick?.(product.id), children: product.name }), _jsxs("div", { className: "flex items-center gap-1 mb-3", children: [_jsx("div", { className: "flex items-center", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: `w-4 h-4 ${i < Math.floor(product.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"}` }, i))) }), _jsxs("span", { className: "text-sm text-gray-600", children: ["(", product.reviews, ")"] })] }), _jsxs("div", { className: "flex items-baseline gap-2 mb-4", children: [_jsxs("span", { className: "text-blue-600", children: ["$", product.price.toFixed(2)] }), product.originalPrice && (_jsxs("span", { className: "text-sm text-gray-400 line-through", children: ["$", product.originalPrice.toFixed(2)] }))] }), _jsxs("button", { onClick: (e) => {
                            e.stopPropagation();
                            onAddToCart?.(product);
                        }, className: "w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2", children: [_jsx(ShoppingCart, { className: "w-4 h-4" }), "Add to Cart"] })] })] }));
}
