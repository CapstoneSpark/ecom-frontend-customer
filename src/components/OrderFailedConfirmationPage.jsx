import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

export function OrderFailedConfirmationPage({ orderId, onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">

        <div className="bg-white rounded-2xl border border-gray-200 p-12">
          
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>

          <h1 className="text-4xl mb-4">Payment Failed</h1>

          <p className="text-gray-600 text-lg mb-8">
            Something went wrong while processing your transaction.
            Please try again or choose a different payment method.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="text-sm text-gray-600 mb-2">Order Reference</div>
            <div className="text-2xl mb-4">{orderId}</div>
            <div className="text-sm text-gray-600">
              No money was deducted from your account.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate("checkout")}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
            >
              Retry Payment
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>

          <button
            onClick={() => onNavigate("orders")}
            className="mt-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
