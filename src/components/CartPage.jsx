// src/components/CartPage.jsx
import { useEffect, useState, useContext } from "react";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CartAPI } from "../api/cartApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CartPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = user?.id || user?.userId;
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    if (!userId) {
      setCart({ items: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await CartAPI.getCart(userId);
        console.log("CART ITEM:", res.data);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  const dispatchCartUpdated = () => window.dispatchEvent(new Event("cartUpdated"));

  const handleRemove = async (sku) => {
    if (!userId) return;
    try {
      await CartAPI.removeItem(userId, sku);
      toast.success("Item removed");
      await loadCart();
      dispatchCartUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const handleSetQuantity = async (sku, qty) => {
    if (!userId) return;
    try {
      // simple approach: remove then add with new qty
      await CartAPI.removeItem(userId, sku);
      await CartAPI.addItem(userId, sku, qty);
      toast.success("Cart updated");
      await loadCart();
      dispatchCartUpdated();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl text-gray-600">Loading cart...</h2>
      </div>
    );
  }

  const items = cart?.items || [];
  const subtotal = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0);
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 15) : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-3xl mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <button
          onClick={() => navigate("/products")}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl mb-8">Shopping Cart ({items.reduce((s, it) => s + (it.quantity || 1), 0)} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.sku || item.productId} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6">
              <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback src={item.image || item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                  </div>

                  <button onClick={() => handleRemove(item.sku || item.productId)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => handleSetQuantity(item.sku || item.productId, Math.max(1, (item.quantity || 1) - 1))} className="px-3 py-2 hover:bg-gray-50">
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="px-6 py-2 border-x border-gray-300">{item.quantity || 1}</span>

                    <button onClick={() => handleSetQuantity(item.sku || item.productId, Math.min((item.stock || 9999), (item.quantity || 1) + 1))} className="px-3 py-2 hover:bg-gray-50">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-blue-600 text-xl">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
                    {(item.quantity || 1) > 1 && <div className="text-sm text-gray-600">${(item.price || 0).toFixed(2)} each</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 py-4">
            <ArrowLeft className="w-5 h-5" /> Continue Shopping
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between text-gray-700">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex items-center justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between text-xl">
                  <span>Total</span>
                  <span className="text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button onClick={() => navigate("/checkout")} className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors mb-3">
              Proceed to Checkout
            </button>

            <div className="text-center text-sm text-gray-600">
              <p>Secure checkout with SSL encryption</p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="mb-3 text-sm">Have a promo code?</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter code" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
