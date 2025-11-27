// src/components/OrderProcessingPage.jsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderAPI } from "../api/orderApi";
import { toast } from "sonner";

export function OrderProcessingPage() {
  const { id } = useParams(); // Razorpay orderId
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyOrder() {
      try {
        // call backend order service
        const res = await OrderAPI.getOrder(id);

        if (!res || !res.data) {
          navigate(`/order/failed/${id}`);
          return;
        }

        const order = res.data;

        if (order.paymentStatus === "PAID" &&
            (order.orderStatus === "PLACED" || order.orderStatus === "PROCESSING")) 
        {
          navigate(`/order/success/${id}`);
        } else {
          navigate(`/order/failed/${id}`);
        }

      } catch (err) {
        navigate(`/order/failed/${id}`);
      }
    }

    verifyOrder();
  }, [id, navigate]);

  return (
    <div className="py-20 text-center text-xl text-gray-600">
      Checking payment status...
    </div>
  );
}
