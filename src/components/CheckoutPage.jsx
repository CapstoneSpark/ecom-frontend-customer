// // src/components/CheckoutPage.jsx
// import { useState, useEffect, useContext } from "react";
// import { CreditCard, ArrowLeft, Lock, CheckCircle, ShoppingBag } from "lucide-react";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { CartAPI } from "../api/cartApi";
// import { AuthContext } from "../context/AuthContext";
// import { PaymentAPI } from "../api/paymentApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// export default function CheckoutPage() {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const userId = user?.id || user?.userId;

//   const [step, setStep] = useState("shipping");
//   const [processing, setProcessing] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [shippingAddress, setShippingAddress] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "India",
//   });

//   const [paymentMethod, setPaymentMethod] = useState({
//     cardNumber: "",
//     cardHolder: "",
//     expiryDate: "",
//     cvv: "",
//   });

//   const loadCart = async () => {
//     try {
//       const res = await CartAPI.getCart(userId);
//       setCartItems(res.data.items || []);
//     } catch (err) {
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!userId) return navigate("/login");
//     loadCart();
//     // loadCart only when userId available
//   }, [userId]);

//   const subtotal = cartItems.reduce(
//     (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
//     0
//   );
//   const shipping = subtotal > 100 ? 0 : 15;
//   const tax = subtotal * 0.1;
//   const total = subtotal + shipping + tax;

//   const handleShippingSubmit = (e) => {
//     e.preventDefault();
//     setStep("payment");
//   };

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setStep("processing");

//     try {
//       // 1) Create a backend razorpay order (backend will save paymentRecord)
//       const rpOrder = await PaymentAPI.createOrder({
//         amount: Math.round(total * 100), // paise
//         currency: "INR",
//         userId,
//         shipping: {
//           fullName: shippingAddress.fullName,
//           phone: shippingAddress.phone,
//           addressLine1: shippingAddress.address,
//           addressLine2: "",
//           city: shippingAddress.city,
//           state: shippingAddress.state,
//           postalCode: shippingAddress.zipCode,
//           country: shippingAddress.country,
//         },
//         items: cartItems.map((it) => ({
//           productId: it.productId,
//           quantity: it.quantity,
//           unitPrice: Math.round((it.price || 0) * 100),
//           name: it.name,
//           image: it.image || it.imageUrl,
//         })),
//       });

//       // 2) Open Razorpay checkout using returned key/order id
//       const options = {
//         key: rpOrder.key,
//         amount: rpOrder.amount,
//         currency: rpOrder.currency || "INR",
//         order_id: rpOrder.orderId,
//         name: "Ecommerce Store",
//         description: "Order Payment",
//         handler: function (response) {
//           // UI shows immediate success; real processing will happen on server webhook
//           toast.success("Payment successful — completing order on server");
//           navigate(`/order/processing/${rpOrder.orderId}`);
//         },
//         prefill: {
//           name: shippingAddress.fullName,
//           contact: shippingAddress.phone,
//         },
//         theme: { color: "#3399cc" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to initialize payment");
//       setStep("payment");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="py-20 text-center">
//         <h2 className="text-xl text-gray-600">Loading checkout...</h2>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="py-20 text-center">
//         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//           <ShoppingBag className="w-12 h-12 text-gray-400" />
//         </div>
//         <h2 className="text-3xl mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate("/products")}
//           className="px-8 py-4 bg-blue-600 text-white rounded-lg"
//         >
//           <ArrowLeft /> Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <button
//           onClick={() => navigate("/cart")}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
//         >
//           <ArrowLeft /> Back to Cart
//         </button>

//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-4 mb-8">
//               <div className={`flex items-center gap-2 ${step === "shipping" ? "text-blue-600" : "text-green-600"}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" ? "bg-blue-600" : "bg-green-600"} text-white`}>
//                   {step === "payment" ? <CheckCircle className="w-5 h-5" /> : "1"}
//                 </div>
//                 <span>Shipping</span>
//               </div>

//               <div className="flex-1 h-1 bg-gray-300" />

//               <div className={`flex items-center gap-2 ${step === "payment" ? "text-blue-600" : "text-gray-400"}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>
//                   2
//                 </div>
//                 <span>Payment</span>
//               </div>
//             </div>

//             {step === "shipping" && (
//               <div className="bg-white rounded-xl border p-8">
//                 <h2 className="text-2xl mb-6">Shipping Information</h2>

//                 <form onSubmit={handleShippingSubmit}>
//                   {Object.keys(shippingAddress).map((field) => (
//                     <div className="mb-6" key={field}>
//                       <label className="block text-sm mb-2 capitalize">{field}</label>
//                       <input
//                         type="text"
//                         required
//                         className="w-full px-4 py-2 border rounded-lg"
//                         value={shippingAddress[field]}
//                         onChange={(e) =>
//                           setShippingAddress({ ...shippingAddress, [field]: e.target.value })
//                         }
//                       />
//                     </div>
//                   ))}

//                   <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
//                     Continue to Payment
//                   </button>
//                 </form>
//               </div>
//             )}

//             {step === "payment" && (
//               <div className="bg-white rounded-xl border p-8">
//                 <h2 className="text-2xl mb-6">Payment Method</h2>

//                 <form onSubmit={handlePaymentSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-sm mb-2">Card Holder *</label>
//                     <input
//                       type="text"
//                       required
//                       className="w-full px-4 py-2 border rounded-lg"
//                       value={paymentMethod.cardHolder}
//                       onChange={(e) =>
//                         setPaymentMethod({ ...paymentMethod, cardHolder: e.target.value })
//                       }
//                     />
//                   </div>

//                   <div className="flex items-center gap-2 mt-6 p-4 bg-gray-50 rounded-lg">
//                     <Lock className="w-5 h-5 text-green-600" />
//                     <span className="text-sm text-gray-600">Secure Razorpay Payment</span>
//                   </div>

//                   <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
//                     Pay ₹{total.toFixed(2)}
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>

//           <div className="bg-white rounded-xl border p-6 sticky top-24">
//             <h3 className="mb-4">Order Summary</h3>
//             <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
//               {cartItems.map((item) => (
//                 <div key={item.productId} className="flex gap-3">
//                   <ImageWithFallback
//                     src={item.image}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <div>{item.name}</div>
//                     <div className="text-gray-600 text-sm">Qty: {item.quantity}</div>
//                   </div>
//                   <div>₹{(item.price * item.quantity).toFixed(2)}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="pt-4 border-t space-y-3">
//               <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
//               <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
//               <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
//               <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-blue-600">₹{total.toFixed(2)}</span></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/CheckoutPage.jsx
import { useState, useEffect, useContext } from "react";
import { CreditCard, ArrowLeft, Lock, CheckCircle, ShoppingBag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CartAPI } from "../api/cartApi";
import { AuthContext } from "../context/AuthContext";
import { PaymentAPI } from "../api/paymentApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?.id || user?.userId;

  const [step, setStep] = useState("shipping");
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

  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const loadCart = async () => {
    try {
      const res = await CartAPI.getCart(userId);
      setCartItems(res.data.items || []);
    } catch (err) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return navigate("/login");
    loadCart();
  }, [userId]);

  const subtotal = cartItems.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setStep("processing");

    try {
      // Create a backend razorpay order (backend saves payment record)
      const rpOrder = await PaymentAPI.createOrder({
        amount: Math.round(total * 100), // in paise
        currency: "INR",
        userId,
        shipping: {
          fullName: shippingAddress.fullName,
          phone: shippingAddress.phone,
          addressLine1: shippingAddress.address,
          addressLine2: "",
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
        // items: cartItems.map((it) => ({
        //   // productId: it.productId,
        //   productId: Number(it.productId) || null,
        //   quantity: it.quantity,
        //   unitPrice: Math.round((it.price || 0) * 100), // paise
        //   name: it.name,
        //   image: it.image || it.imageUrl,
        // })),
        // items: cartItems.map((it) => ({
        //   productId: Number(it.productId || it.id || it.product_id || it.product?.id) || null,
        //   sku: it.sku || it.product?.sku || null,
        //   quantity: it.quantity,
        //   unitPrice: Math.round((it.price || it.unitPrice || it.product?.price || 0) * 100),
        //   name: it.name || it.product?.name,
        //   image: it.image || it.imageUrl || it.product?.image,
        // })),
        items: cartItems.map((it) => ({
          productId: Number(it.productId || 0),   // backend needs long
          sku: it.sku,                             // sku ALWAYS available from cart
          quantity: it.quantity,
          unitPrice: Math.round(it.price * 100),   // paise
          name: it.name,
          image: it.image || it.imageUrl || null
        })),

      });

      // Open Razorpay checkout
      const options = {
        key: rpOrder.key,
        amount: rpOrder.amount,
        currency: rpOrder.currency || "INR",
        order_id: rpOrder.orderId,
        name: "Ecommerce Store",
        description: "Order Payment",
        handler: function (response) {
          // UI: show processing — webhook will create the order server-side
          toast.success("Payment captured — finishing order on server");
          navigate(`/order/processing/${rpOrder.orderId}`);
        },
        prefill: {
          name: shippingAddress.fullName,
          contact: shippingAddress.phone,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error("Failed to initialize payment");
      setStep("payment");
    } finally {
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

            {step === "shipping" && (
              <div className="bg-white rounded-xl border p-8">
                <h2 className="text-2xl mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  {Object.keys(shippingAddress).map((field) => (
                    <div className="mb-6" key={field}>
                      <label className="block text-sm mb-2 capitalize">{field}</label>
                      <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={shippingAddress[field]} onChange={(e) => setShippingAddress({ ...shippingAddress, [field]: e.target.value })} />
                    </div>
                  ))}
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">Continue to Payment</button>
                </form>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white rounded-xl border p-8">
                <h2 className="text-2xl mb-6">Payment Method</h2>

                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Card Holder *</label>
                    <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={paymentMethod.cardHolder} onChange={(e) => setPaymentMethod({ ...paymentMethod, cardHolder: e.target.value })} />
                  </div>

                  <div className="flex items-center gap-2 mt-6 p-4 bg-gray-50 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Secure Razorpay Payment</span>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">Pay ₹{total.toFixed(2)}</button>
                </form>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border p-6 sticky top-24">
            <h3 className="mb-4">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <ImageWithFallback src={item.image} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div>{item.name}</div>
                    <div className="text-gray-600 text-sm">Qty: {item.quantity}</div>
                  </div>
                  <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-blue-600">₹{total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
