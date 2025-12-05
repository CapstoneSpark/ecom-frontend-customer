


// src/components/CheckoutPage.jsx

import { useState, useEffect, useContext, useRef } from "react";
import { ArrowLeft, Lock, CheckCircle, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CartAPI } from "../api/cartApi";
import { AuthContext } from "../context/AuthContext";
import { PaymentAPI } from "../api/paymentApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loadRazorpayScript } from "../utils/loadRazorpay";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?.userId;

  const [step, setStep] = useState("shipping"); // shipping -> payment
  const [processing, setProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const isMountedRef = useRef(true);
  useEffect(() => () => { isMountedRef.current = false; }, []);

  // Load cart items
  const loadCart = async () => {
    try {
      const res = await CartAPI.getCart(userId);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return navigate("/login");
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const subtotal = cartItems.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax - discount;

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setDiscount(10); // 10 currency units discount
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code");
      setDiscount(0);
    }
  };

  // STEP 1 — Move to Payment Page
  const goToPaymentStep = (e) => {
    e.preventDefault();
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
      toast.error("Please complete shipping details");
      return;
    }
    setStep("payment");
  };

  // STEP 2 — Create Order & Open Razorpay
  const startPayment = async () => {
    setProcessing(true);

    try {
      // Dynamically load Razorpay SDK
      await loadRazorpayScript();

      const rpOrder = await PaymentAPI.createOrder({
        amount: Math.round(total * 100),
        currency: "INR",
        userId,
        shipping: {
          fullName: shippingAddress.fullName,
          phone: shippingAddress.phone,
          addressLine1: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
        items: cartItems.map((it) => ({
          productId: Number(it.productId || it.id || 0),
          sku: it.sku || null,
          quantity: it.quantity,
          unitPrice: Math.round((it.price || 0) * 100),
          name: it.name,
          image: it.image || it.imageUrl || null,
        })),
      });

      if (!rpOrder?.orderId || !rpOrder?.key) {
        throw new Error("Invalid payment init response");
      }

      const options = {
        key: rpOrder.key,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        order_id: rpOrder.orderId,
        name: "Ecommerce Store",
        description: "Order Payment",
        handler: (response) => {
          toast.success("Payment successful!");
          navigate(`/order/processing/${rpOrder.orderId}`);
        },
        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone,
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled. Try again.");
            setProcessing(false);
          },
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Payment init failed:", err);
      toast.error(err.message || "Failed to initialize payment");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl text-gray-600">Loading checkout...</h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-3xl mb-4">Your cart is empty</h2>
        <button onClick={() => navigate("/products")} className="px-8 py-4 bg-blue-600 text-white rounded-lg">
          <ArrowLeft /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft /> Back to Cart
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              {/* Steps UI */}
              <div className={`flex items-center gap-2 ${step === "shipping" ? "text-blue-600" : "text-green-600"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" ? "bg-blue-600" : "bg-green-600"} text-white`}>
                  {step === "payment" ? <CheckCircle className="w-5 h-5" /> : "1"}
                </div>
                <span>Shipping</span>
              </div>
              <div className="flex-1 h-1 bg-gray-300" />
              <div className={`flex items-center gap-2 ${step === "payment" ? "text-blue-600" : "text-gray-400"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>
                  2
                </div>
                <span>Payment</span>
              </div>
            </div>

            {/* SHIPPING FORM */}
            {step === "shipping" && (
              <div className="bg-white rounded-xl border p-8">
                <h2 className="text-2xl mb-6">Shipping Information</h2>

                <form onSubmit={goToPaymentStep}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Full name</label>
                      <input type="text" required className="w-full px-4 py-2 border rounded-lg"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })} />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Phone</label>
                      <input type="tel" required className="w-full px-4 py-2 border rounded-lg"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm mb-2">Address</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mt-4">
                    <input type="text" placeholder="City" className="px-4 py-2 border rounded-lg"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
                    <input type="text" placeholder="State" className="px-4 py-2 border rounded-lg"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} />
                    <input type="text" placeholder="Zip Code" className="px-4 py-2 border rounded-lg"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })} />
                  </div>

                  <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg">
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* PAYMENT STEP */}
            {step === "payment" && (
              <div className="bg-white rounded-xl border p-8">
                <h2 className="text-2xl mb-4">Ready to Pay</h2>
                <p className="text-sm text-gray-600 mb-6">You will be redirected to the secure Razorpay checkout.</p>

                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg mt-4">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span>Secure Razorpay Payment</span>
                </div>

                {/* Promo Code Input */}
                <div className="mt-6">
                  <label className="block text-sm mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  disabled={processing}
                  onClick={startPayment}
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg"
                >
                  Pay ₹{total.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-xl border p-6 sticky top-24">
            <h3 className="mb-4">Order Summary</h3>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.productId || item.id} className="flex gap-3">
                  <ImageWithFallback src={item.image || item.imageUrl} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div>{item.name}</div>
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                  </div>
                  <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount.toFixed(2)}</span></div>}
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-blue-600">₹{total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
