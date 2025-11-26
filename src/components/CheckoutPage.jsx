import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { CreditCard, Smartphone, ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { PaymentService } from "../services/paymentService";
import { ImageWithFallback } from "./figma/ImageWithFallback";
export function CheckoutPage({ cartItems, onNavigate, onOrderComplete }) {
    const [step, setStep] = useState("shipping");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
    });
    const [paymentMethod, setPaymentMethod] = useState({
        type: "credit-card",
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
    });
    const [selectedPaymentType, setSelectedPaymentType] = useState("credit-card");
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep("payment");
    };
const handlePaymentSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setProcessing(true);
  setStep("processing");

  // Generate order ID once
  const orderId = `ORD${Date.now()}`;

  try {
    const result = await PaymentService.processPayment(total, {
      ...paymentMethod,
      type: selectedPaymentType,
    });

    if (result.success) {
      // PAYMENT SUCCESS
      onOrderComplete(orderId);
      onNavigate("order-confirmation", orderId);
    } else {
      //  PAYMENT FAILED — GO TO FAILED PAGE
      onNavigate("order-failed", orderId);
      return;
    }
  } catch (err) {
    // ERROR = FAILED
    onNavigate("order-failed", orderId);
    return;
  } finally {
    setProcessing(false);
  }
};





    




    if (step === "processing") {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" }), _jsx("h2", { className: "text-2xl mb-2", children: "Processing Payment..." }), _jsx("p", { className: "text-gray-600", children: "Please wait while we process your payment" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-8", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4", children: [_jsxs("button", { onClick: () => onNavigate("cart"), className: "flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6", children: [_jsx(ArrowLeft, { className: "w-5 h-5" }), "Back to Cart"] }), _jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsxs("div", { className: "flex items-center gap-4 mb-8", children: [_jsxs("div", { className: `flex items-center gap-2 ${step === "shipping" ? "text-blue-600" : "text-green-600"}`, children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" ? "bg-blue-600" : "bg-green-600"} text-white`, children: step === "payment" ? _jsx(CheckCircle, { className: "w-5 h-5" }) : "1" }), _jsx("span", { children: "Shipping" })] }), _jsx("div", { className: "flex-1 h-1 bg-gray-300" }), _jsxs("div", { className: `flex items-center gap-2 ${step === "payment" ? "text-blue-600" : "text-gray-400"}`, children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-blue-600 text-white" : "bg-gray-300"}`, children: "2" }), _jsx("span", { children: "Payment" })] })] }), step === "shipping" && (_jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-8", children: [_jsx("h2", { className: "text-2xl mb-6", children: "Shipping Information" }), _jsxs("form", { onSubmit: handleShippingSubmit, children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm mb-2", children: "Full Name *" }), _jsx("input", { type: "text", required: true, value: shippingAddress.fullName, onChange: (e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "Email *" }), _jsx("input", { type: "email", required: true, value: shippingAddress.email, onChange: (e) => setShippingAddress({ ...shippingAddress, email: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "Phone *" }), _jsx("input", { type: "tel", required: true, value: shippingAddress.phone, onChange: (e) => setShippingAddress({ ...shippingAddress, phone: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm mb-2", children: "Address *" }), _jsx("input", { type: "text", required: true, value: shippingAddress.address, onChange: (e) => setShippingAddress({ ...shippingAddress, address: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "City *" }), _jsx("input", { type: "text", required: true, value: shippingAddress.city, onChange: (e) => setShippingAddress({ ...shippingAddress, city: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "State *" }), _jsx("input", { type: "text", required: true, value: shippingAddress.state, onChange: (e) => setShippingAddress({ ...shippingAddress, state: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "ZIP Code *" }), _jsx("input", { type: "text", required: true, value: shippingAddress.zipCode, onChange: (e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "Country *" }), _jsxs("select", { required: true, value: shippingAddress.country, onChange: (e) => setShippingAddress({ ...shippingAddress, country: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", children: [_jsx("option", { children: "United States" }), _jsx("option", { children: "Canada" }), _jsx("option", { children: "United Kingdom" }), _jsx("option", { children: "Australia" })] })] })] }), _jsx("button", { type: "submit", className: "w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700", children: "Continue to Payment" })] })] })), step === "payment" && (_jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-8", children: [_jsx("h2", { className: "text-2xl mb-6", children: "Payment Method" }), error && (_jsx("div", { className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600", children: error })), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("button", { type: "button", onClick: () => setSelectedPaymentType("credit-card"), className: `p-4 border-2 rounded-lg flex items-center gap-3 ${selectedPaymentType === "credit-card" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`, children: [_jsx(CreditCard, { className: "w-6 h-6" }), _jsx("span", { children: "Credit Card" })] }), _jsxs("button", { type: "button", onClick: () => setSelectedPaymentType("paypal"), className: `p-4 border-2 rounded-lg flex items-center gap-3 ${selectedPaymentType === "paypal" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`, children: [_jsx("div", { className: "w-6 h-6 bg-blue-600 rounded" }), _jsx("span", { children: "PayPal" })] }), _jsxs("button", { type: "button", onClick: () => setSelectedPaymentType("apple-pay"), className: `p-4 border-2 rounded-lg flex items-center gap-3 ${selectedPaymentType === "apple-pay" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`, children: [_jsx(Smartphone, { className: "w-6 h-6" }), _jsx("span", { children: "Apple Pay" })] }), _jsxs("button", { type: "button", onClick: () => setSelectedPaymentType("google-pay"), className: `p-4 border-2 rounded-lg flex items-center gap-3 ${selectedPaymentType === "google-pay" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`, children: [_jsx(Smartphone, { className: "w-6 h-6" }), _jsx("span", { children: "Google Pay" })] })] }), _jsxs("form", { onSubmit: handlePaymentSubmit, children: [selectedPaymentType === "credit-card" && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "Card Number *" }), _jsx("input", { type: "text", required: true, placeholder: "1234 5678 9012 3456", maxLength: 19, value: paymentMethod.cardNumber, onChange: (e) => {
                                                                        const formatted = PaymentService.formatCardNumber(e.target.value);
                                                                        setPaymentMethod({ ...paymentMethod, cardNumber: formatted });
                                                                    }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "Card Holder Name *" }), _jsx("input", { type: "text", required: true, value: paymentMethod.cardHolder, onChange: (e) => setPaymentMethod({ ...paymentMethod, cardHolder: e.target.value }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "Expiry Date *" }), _jsx("input", { type: "text", required: true, placeholder: "MM/YY", maxLength: 5, value: paymentMethod.expiryDate, onChange: (e) => {
                                                                                let value = e.target.value.replace(/\D/g, "");
                                                                                if (value.length >= 2) {
                                                                                    value = value.slice(0, 2) + "/" + value.slice(2, 4);
                                                                                }
                                                                                setPaymentMethod({ ...paymentMethod, expiryDate: value });
                                                                            }, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm mb-2", children: "CVV *" }), _jsx("input", { type: "text", required: true, placeholder: "123", maxLength: 4, value: paymentMethod.cvv, onChange: (e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value.replace(/\D/g, "") }), className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" })] })] })] })), selectedPaymentType !== "credit-card" && (_jsx("div", { className: "text-center py-8", children: _jsxs("p", { className: "text-gray-600 mb-4", children: ["You will be redirected to ", selectedPaymentType.replace("-", " "), " to complete your payment."] }) })), _jsxs("div", { className: "flex items-center gap-2 mt-6 p-4 bg-gray-50 rounded-lg", children: [_jsx(Lock, { className: "w-5 h-5 text-green-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Secure SSL encrypted payment" })] }), _jsxs("div", { className: "flex gap-4 mt-6", children: [_jsx("button", { type: "button", onClick: () => setStep("shipping"), className: "flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50", children: "Back" }), _jsx("button", { type: "submit", disabled: processing, className: "flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50", children: processing ? "Processing..." : `Pay $${total.toFixed(2)}` })] })] })] }))] }), _jsx("div", { className: "lg:col-span-1", children: _jsxs("div", { className: "bg-white rounded-xl border border-gray-200 p-6 sticky top-24", children: [_jsx("h3", { className: "mb-4", children: "Order Summary" }), _jsx("div", { className: "space-y-4 mb-6 max-h-64 overflow-y-auto", children: cartItems.map((item) => (_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden bg-gray-100", children: _jsx(ImageWithFallback, { src: item.image, alt: item.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "text-sm mb-1", children: item.name }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Qty: ", item.quantity] })] }), _jsxs("div", { className: "text-sm", children: ["$", (item.price * item.quantity).toFixed(2)] })] }, item.id))) }), _jsxs("div", { className: "space-y-3 pt-4 border-t", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Subtotal" }), _jsxs("span", { children: ["$", subtotal.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Shipping" }), _jsx("span", { children: shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}` })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Tax" }), _jsxs("span", { children: ["$", tax.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between pt-3 border-t", children: [_jsx("span", { children: "Total" }), _jsxs("span", { className: "text-blue-600", children: ["$", total.toFixed(2)] })] })] })] }) })] })] }) }));
}
