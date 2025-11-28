import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderAPI } from "../api/orderApi";
import { toast } from "sonner";

export function OrderProcessingPage() {
  const { id } = useParams(); // Razorpay order ID (used as idempotency key)
  const navigate = useNavigate();

  useEffect(() => {
    async function checkStatus() {
      try {
        console.log("Checking:", id);

        const res = await OrderAPI.getByIdempotency(id);
        const order = res.data;

        if (order.paymentStatus === "PAID") {
          navigate(`/order/success/${order.orderId}`);
        } else {
          navigate(`/order/failed/${order.orderId}`);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to verify order");
        navigate(`/order/failed/${id}`);
      }
    }

    checkStatus();
  }, [id, navigate]);

  return (
    <div className="py-20 text-center text-xl">
      Verifying your payment...
    </div>
  );
}
